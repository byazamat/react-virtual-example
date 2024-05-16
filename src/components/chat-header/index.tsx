import { Button } from "@/components/ui/button";

export default function ChatHeader() {
  return (
    <div className="grid w-full grid-cols-[auto_1fr] gap-4 items-center p-[23.5px] border-b border-gray-200">
      <Button variant="outline" size="icon">
        {"<-"}
      </Button>
      <h1 className="text-2xl font-bold max-sm:text-xl">JONAT Chat</h1>
    </div>
  );
}
