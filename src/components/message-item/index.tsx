import { forwardRef } from "react";
import dayjs from "dayjs";

import { MessageItemProps } from "./message-item.type";
import { cn } from "@/lib/utils";

const MessageItem = forwardRef<
  HTMLDivElement,
  MessageItemProps & { dataIndex: number }
>((props, ref) => {
  const { isMe, content, user, date, style, dataIndex } = props;

  return (
    <div
      ref={ref}
      data-index={dataIndex}
      className="grid w-full h-auto py-2 px-6 max-sm:px-4"
      style={style}
    >
      <div
        className={cn(
          "w-fit max-w-[450px] rounded-2xl p-3 text-sm max-sm:max-w-[90%]",
          isMe
            ? "bg-blue-400 justify-self-end rounded-br-none text-white"
            : "bg-border justify-self-start rounded-bl-none"
        )}
      >
        <p className="text-wrap break-words">{content}</p>
        <div className="w-full grid grid-cols-[1fr_auto] gap-1 items-center">
          <span
            className={cn(
              "text-xs mt-0.5",
              isMe ? "text-white/50" : "text-muted-foreground"
            )}
          >
            {user.name}
          </span>
          <span
            className={cn(
              "text-xs mt-0.5",
              isMe ? "text-white/50" : "text-muted-foreground"
            )}
          >
            {dayjs(date).format("HH:mm")}
          </span>
        </div>
      </div>
    </div>
  );
});

MessageItem.displayName = "MessageItem";
export default MessageItem;
