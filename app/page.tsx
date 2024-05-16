"use client";
import { useEffect, useRef, useState } from "react";

import ChatHeader from "@/src/components/chat-header";
import ChatList from "@/src/components/chat-list";

export default function Home() {
  const ref = useRef<HTMLDivElement>(null);
  const [screenHeight, setScreenHeight] = useState(0);

  useEffect(() => {
    const handleResize = (event: UIEvent) => {
      setScreenHeight(window.innerHeight);
    };

    setScreenHeight(window.innerHeight);

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <main
      ref={ref}
      className="grid w-full h-screen grid-rows-[auto_1fr]"
      style={{ height: `${screenHeight}px` }}
    >
      <ChatHeader />
      <ChatList listHeight={screenHeight - 84} />
    </main>
  );
}
