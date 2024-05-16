import { useCallback, useRef, useState } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";

import { ChatListProps } from "./chat-list.type";
import { useGetMessages } from "@/src/fake-api";
import { MessageType, UserType } from "../message-item/message-item.type";
import { Button } from "@/components/ui/button";
import MessageItem from "../message-item";

const USERS: [UserType, UserType] = [
  { id: "0", name: "Petr" },
  { id: "1", name: "Vlad" },
];
const ME: UserType = { id: "1", name: "Vlad" };

const ESITMATE_SIZE = 120;

export default function ChatList(props: ChatListProps) {
  const { listHeight } = props;
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const [list, setList] = useState<MessageType[]>([]);
  const virtualizer = useVirtualizer({
    count: list.length,
    getScrollElement: () => scrollAreaRef.current,
    estimateSize: () => ESITMATE_SIZE,
    paddingStart: 16,
    paddingEnd: 16,
    overscan: 5,
    getItemKey: useCallback((index: number) => list[index].id, [list]),
  });
  const items = virtualizer.getVirtualItems();
  const [getMessages, { isLoading, isError }] = useGetMessages(USERS);

  const load = async (direction: "top" | "bottom" | "first") => {
    try {
      const res = await getMessages({});
      if (direction == "top") {
        setList((prev) => {
          const arr = [...res.data, ...prev];
          return arr;
        });
        const offset = (virtualizer.scrollOffset =
          res.data.length * ESITMATE_SIZE);
        virtualizer.scrollOffset = offset;
        virtualizer.calculateRange();
        virtualizer.scrollToOffset(offset, { align: "start" });
      } else if (direction == "bottom") {
        setList((prev) => {
          const arr = [...prev, ...res.data];
          return arr;
        });
      } else {
        setList(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {list.length ? (
        <div
          ref={scrollAreaRef}
          className="grid w-full justify-items-center overflow-y-scroll"
          style={{ height: listHeight - 52 }}
        >
          <div
            className="grid relative w-full max-w-[800px] h-full"
            style={{
              height: `${virtualizer.getTotalSize()}px`,
            }}
          >
            {items.map((virtualItem) => {
              const item = list[virtualItem.index];
              return (
                <MessageItem
                  key={virtualItem.key}
                  ref={virtualizer.measureElement}
                  data-index={virtualItem.index}
                  dataIndex={virtualItem.index}
                  {...item}
                  isMe={item.user.id == ME.id}
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    willChange: "transform",
                    transform: `translateY(${virtualItem.start}px)`,
                  }}
                />
              );
            })}
          </div>
        </div>
      ) : (
        <div
          className="grid justify-center items-center"
          style={{ height: listHeight - 52 }}
        >
          <h2 className="text-2xl text-muted-foreground font-bold">
            {!isLoading && !isError
              ? "Chat is empty"
              : isLoading
              ? "Loading..."
              : isError
              ? "Error"
              : ""}
          </h2>
        </div>
      )}
      <div className="grid grid-flow-col auto-cols-max justify-center gap-2 py-[7.5px] border-t border-border">
        <Button variant="destructive" onClick={() => load("first")}>
          FIRST LOAD
        </Button>
        <Button variant="outline" onClick={() => load("top")}>
          TOP
        </Button>
        <Button variant="outline" onClick={() => load("bottom")}>
          BOTTOM
        </Button>
      </div>
    </div>
  );
}
