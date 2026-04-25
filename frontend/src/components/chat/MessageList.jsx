import { useChat } from "@/context/ChatContext";
import MessageBubble from "./MessageBubble";
import { useEffect, useState } from "react";
import API from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import socket from "@/lib/socket";

export default function MessageList() {

const {user}=useAuth();
const {selectedChat}=useChat();
const [messages,setMessages]=useState([]);

  useEffect(() => {
    if (!selectedChat) return;

    const fetchMessages = async () => {
      try {
        const res = await API.get(`/message/${selectedChat._id}`);
        console.log(res);
        setMessages(res?.data.messages||[]);
      } catch (err) {
        console.log(err);
      }
    };

    fetchMessages();
  }, [selectedChat]);

  useEffect(() => {
    const handleMessage = (data) => {
      console.log("NEW MSSG", data);

      if (data.chatId === selectedChat?._id) {
        setMessages((prev) => [...prev, data]);
      }
    };

    socket.on("receive_message", handleMessage);

    return () => {
      socket.off("receive_message", handleMessage);
    };
  }, [selectedChat]);

  return (
    <div className="flex-1 p-4 overflow-y-auto space-y-2">
      {
        messages?.map((mssg)=>(
          <MessageBubble key={mssg._id} text={mssg.content} own={mssg.sender === user?._id || mssg.sender?._id === user?._id}/>
        ))
      }
    </div>
  );
}