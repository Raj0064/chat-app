import API from "@/lib/api";
import { useEffect, useState } from "react";
import ChatItem from "./ChatItem";
import { useAuth } from "@/context/AuthContext";

export default function ChatList({ onlineUsers }) {
  const [chats, setChats] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchChats = async () => {
      const res = await API.get("/chat");
      setChats(res.data.chats || []);
    };

    fetchChats();
  }, []);

  return (
    <div className="p-2 space-y-2">

      {chats.map((chat) => {
        let name = "User";
        let isOnline = false;

        if (!chat.isGroupChat) {
          const otherUser = chat.users.find(u => u._id !== user._id);

          name = otherUser?.name;

          isOnline = onlineUsers.includes(otherUser?._id);
        } else {
          name = chat.chatName;
        }

        return (
          <ChatItem
            key={chat._id}
            chat={chat}
            name={name}
            isOnline={isOnline}
          />
        );
      })}

    </div>
  );
}