import { Card } from "@/components/ui/card";
import { useChat } from "@/context/ChatContext";

export default function ChatItem({ chat, name, isOnline }) {
  const { selectedChat, setSelectedChat } = useChat();

  const active = selectedChat?._id === chat._id;

  return (
    <Card
      onClick={() => setSelectedChat(chat)}
      className={`p-3 cursor-pointer ${active ? "bg-primary text-white" : "hover:bg-muted"
        }`}
    >

      {/* FLEX CONTAINER FIX */}
      <div className="flex items-center justify-between w-full">

        {/* NAME */}
        <span className="truncate">{name}</span>

        {/* DOT */}
        {!chat.isGroupChat && isOnline && (
          <span className="shrink-0 ml-2">
            <span className="block w-2 h-2 bg-green-500 rounded-full" />
          </span>
        )}

      </div>

    </Card>
  );
}