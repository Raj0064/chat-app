import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState, useRef } from "react";
import { useChat } from "@/context/ChatContext";
import API from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import socket from "@/lib/socket";

export default function MessageInput({ setMessages }) {
  const [text, setText] = useState("");
  const { selectedChat } = useChat();
  const { user } = useAuth();

  const typingTimeout = useRef(null);

  const handleTyping = (e) => {
    setText(e.target.value);

    socket.emit("typing", {
      chatId: selectedChat._id,
      user,
    });

    clearTimeout(typingTimeout.current);

    typingTimeout.current = setTimeout(() => {
      socket.emit("stop_typing", selectedChat._id);
    }, 800);
  };

  const handleSend = async () => {
    if (!text.trim()) return;

    const res = await API.post("/message/send", {
      chatId: selectedChat._id,
      content: text,
    });

    setMessages((prev) => [...prev, res.data.message]);

    socket.emit("send_message", res.data.message);

    setText("");
    socket.emit("stop_typing", selectedChat._id);
  };

  return (
    <div className="p-4 flex gap-2">
      <Input
        value={text}
        onChange={handleTyping}
        placeholder="Type message..."
      />

      <Button onClick={handleSend}>
        Send
      </Button>
    </div>
  );
}