import ChatHeader from "./ChatHeader";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import { useEffect } from "react";
import socket from "@/lib/socket";
import { useChat } from "@/context/ChatContext";

export default function ChatArea() {
  const {selectedChat}=useChat();

  useEffect(()=>{
    socket.connect();

    return()=>{
      socket.disconnect();
    }
  },[]);

  useEffect(() => {
    if (!selectedChat) return;
    socket.emit("join_chat", selectedChat._id);
  }, [selectedChat])

  return (
    <div className="flex-1 flex flex-col">
      <ChatHeader />
      <MessageList />
      <MessageInput />
    </div>
  );
}