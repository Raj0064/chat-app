import { useAuth } from "@/context/AuthContext";
import API from "@/lib/api";
import { useEffect, useState } from "react";
import ChatItem from "./ChatItem";

export default function ChatList() {
  const [chats, setChats] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const res = await API.get("/chat");
        setChats(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchChats();
  }, []);

  return (
    <div className="flex-1 overflow-y-auto p-2 space-y-2">
      {chats.map((chat) => {
        const otheruser = chat.users.find(
          (person) => person._id !== user._id
        );

        return (
          <ChatItem
            key={chat._id}
            chat={chat}
            name={otheruser?.name || "User"}
          />
        );
      })}
    </div>
  );
}