import { Card } from "@/components/ui/card";
import { useChat } from "@/context/ChatContext";

export default function ChatItem({ name, chat }) {
  const { selectedChat, setSelectedChat } = useChat();

  const isSelected = selectedChat?._id === chat._id;

  return (
    <Card
      className={`p-3 cursor-pointer transition ${isSelected ? "bg-primary text-primary-foreground" : "hover:bg-muted"
        }`}
      onClick={() => setSelectedChat(chat)}
    >
      {name}
    </Card>
  );
}