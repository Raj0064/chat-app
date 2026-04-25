import { useAuth } from "@/context/AuthContext";
import { useChat } from "@/context/ChatContext";

export default function ChatHeader({ onlineUsers = [] }) {
  const { selectedChat } = useChat();
  const { user } = useAuth();

  if (!selectedChat) {
    return (
      <div className="p-4 border-b font-semibold">
        Select a chat
      </div>
    );
  }

  // default values
  let name = "User";
  let isOnline = false;

  // ONLY 1:1 CHAT
  if (!selectedChat.isGroupChat) {
    const otherUser = selectedChat.users.find(
      (u) => u._id !== user._id
    );

    name = otherUser?.name || otherUser?.username || "User";

    // ✅ ONLINE CHECK (1:1 ONLY)
    isOnline = onlineUsers.includes(otherUser?._id);
  }

  return (
    <div className="p-4 border-b flex justify-between items-center">
      <span className="font-semibold">{name}</span>

      {/* ONLY SHOW FOR 1:1 */}
      {/* {!selectedChat.isGroupChat && (
        <span
          className={`text-xs ${isOnline ? "text-green-500" : "text-gray-400"
            }`}
        >
          {isOnline ? "Online" : "Offline"}
        </span>
      )} */}
    </div>
  );
}