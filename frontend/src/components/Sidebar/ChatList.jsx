import { useAuth } from "@/context/AuthContext";
import API from "@/lib/api";
import { useEffect, useState } from "react";
import ChatItem from "./ChatItem";

export default function ChatList() {
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);

  const { user } = useAuth();

  useEffect(() => {
    const fetchChats = async () => {
      setLoading(true);

      try {
        const res = await API.get("/chat");
        setChats(res.data?.chats || res.data || []);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchChats();
  }, []);

  if (loading) {
    return (
      <div className="p-4 text-sm text-muted-foreground">
        Loading chats...
      </div>
    );
  }

  if (!chats.length) {
    return (
      <div className="p-4 text-sm text-muted-foreground">
        No chats yet
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto p-2 space-y-2">
      {chats.map((chat) => {
        let name = "User";

        if (!chat.isGroupChat) {
          const otherUser = chat.users.find(
            (person) => person._id !== user._id
          );

          name =
            otherUser?.name ||
            otherUser?.username ||
            "User";
        } else {
          name = chat.chatName || "Group";
        }

        return (
          <ChatItem
            key={chat._id}
            chat={chat}
            name={name}
          />
        );
      })}
    </div>
  );
}