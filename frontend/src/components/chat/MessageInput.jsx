import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useChat } from "@/context/ChatContext";
import API from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import socket from "@/lib/socket";

export default function MessageInput() {
  const [text, setText] = useState("");
  const {selectedChat}=useChat();
  const {user}=useAuth();

const handleSend=async()=>{
  if(!text.trim()|| !selectedChat) return;

  try {
    const messageData={
      chatId:selectedChat._id,
      content:text,
      sender:user._id,
    }
    console.log(messageData);

    //Send data to backend
    await API.post("/message/send",messageData)
    setText("");
  } catch (error) {
    console.log(error);
  }
}
  
  return (
    <div className="p-4 flex gap-2 ">
      <Input
        value={text}
        onChange={(e)=>setText(e.target.value)}
        placeholder="Type message..."
      />
      <Button onClick={handleSend}>Send</Button>
    </div>
  );
}