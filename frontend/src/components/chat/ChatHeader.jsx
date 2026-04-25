import { useAuth } from "@/context/AuthContext";
import { useChat } from "@/context/ChatContext";

export default function ChatHeader() {
  const { selectedChat } = useChat();
  const { user } = useAuth();

  if (!selectedChat) {
    return (
      <div className="p-4 border-b font-semibold">
        Select a chat
      </div>
    );
  }

  let name = "Chat";

  // 1:1 chat
  if (!selectedChat.isGroupChat) {
    const otherUser = selectedChat.users.find(
      (u) => u._id !== user._id
    );

    name =
      otherUser?.name ||
      otherUser?.username ||
      "User";
  }
  // group chat
  else {
    name = selectedChat.chatName || "Group";
  }

  return (
    <div className="p-4 border-b font-semibold flex justify-between items-center">
      <span>{name}</span>

      <span className="text-xs text-green-500">
        Online
      </span>
    </div>
  );
}