import { MessageItemSkeletonProps } from "./message-item-skeleton.type";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

export default function MessageItemSkeleton(props: MessageItemSkeletonProps) {
  const { className, style } = props;

  return (
    <Skeleton
      className={cn(
        "absolute w-full max-w-[450px] h-[120px] rounded-2xl rounded-bl-none",
        className
      )}
      style={style}
    />
  );
}
