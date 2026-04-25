import { useChat } from "@/context/ChatContext";
import { useEffect, useState } from "react";
import API from "@/lib/api";
import socket from "@/lib/socket";
import { useAuth } from "@/context/AuthContext";
import MessageBubble from "./MessageBubble";

export default function MessageList() {
  const { selectedChat } = useChat();
  const { user } = useAuth();

  const [messages, setMessages] = useState([]);
  const [typingUser, setTypingUser] = useState(null);

  // load messages
  useEffect(() => {
    if (!selectedChat) return;

    const fetchMessages = async () => {
      const res = await API.get(`/message/${selectedChat._id}`);
      setMessages(res.data.messages || []);
    };

    fetchMessages();
  }, [selectedChat]);

  // receive messages
  useEffect(() => {
    const handleMsg = (msg) => {
      if (msg.chat?._id === selectedChat?._id || msg.chatId === selectedChat?._id) {
        setMessages((prev) => [...prev, msg]);
      }
    };

    socket.on("receive_message", handleMsg);

    return () => socket.off("receive_message", handleMsg);
  }, [selectedChat]);

  // typing
  useEffect(() => {
    socket.on("typing", ({ chatId, user }) => {
      if (chatId === selectedChat?._id) setTypingUser(user);
    });

    socket.on("stop_typing", (chatId) => {
      if (chatId === selectedChat?._id) setTypingUser(null);
    });

    return () => {
      socket.off("typing");
      socket.off("stop_typing");
    };
  }, [selectedChat]);

  return (
    <div className="flex-1 p-4 overflow-y-auto space-y-2">

      {messages.map((m) => (
        <MessageBubble
          key={m._id}
          text={m.content}
          own={m.sender === user._id || m.sender?._id === user._id}
          time={new Date(m.createdAt).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        />
      ))}

      {typingUser && (
        <div className="text-xs text-gray-500">
          {typingUser.name} is typing...
        </div>
      )}

    </div>
  );
}