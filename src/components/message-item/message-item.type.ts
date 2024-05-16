import { HTMLAttributes } from "react";

export type MessageItemProps = MessageType & {
  isMe: boolean;
} & HTMLAttributes<HTMLDivElement>;

export type MessageType = {
  id: string;
  user: UserType;
  date: string;
  content: string;
};

export type UserType = { id: string; name: string };
