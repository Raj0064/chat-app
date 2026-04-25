import ChatHeader from "./ChatHeader";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import { useEffect, useState } from "react";
import socket from "@/lib/socket";
import { useChat } from "@/context/ChatContext";
import NoChat from "./NoChat";

export default function ChatArea() {
  const { selectedChat } = useChat();
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.connect();

    return () => {
      socket.disconnect();
    };
  }, []);

  // join room
  useEffect(() => {
    if (!selectedChat) return;
    socket.emit("join_chat", selectedChat._id);
  }, [selectedChat]);

  // receive messages (ONLY HERE)
  useEffect(() => {
    socket.on("receive_message", (message) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => socket.off("receive_message");
  }, []);

  return (
    <div className="flex-1 flex flex-col">
      {selectedChat ? (
        <>
          <ChatHeader />
          <MessageList messages={messages} />
          <MessageInput setMessages={setMessages} />
        </>
      ) : (
        <NoChat />
      )}
    </div>
  );
}