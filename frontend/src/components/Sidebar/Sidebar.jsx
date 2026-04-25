import { useAuth } from "@/context/AuthContext";
import ThemeToggle from "../ThemeToggle";
import ChatList from "./ChatList";
import Logout from "./Logout";
import Searchbar from "./Searchbar";

export default function Sidebar() {
  const { user } = useAuth();

  return (
    <div className="w-[320px] border-r flex flex-col h-screen">

      {/* Header */}
      <div className="p-4 flex justify-between items-center border-b">
        <h2 className="font-semibold text-lg">Chats</h2>
        <ThemeToggle />
      </div>

      {/* Search */}
      <div className="p-3 border-b">
        <Searchbar />
      </div>

      {/* Chat List (scrollable) */}
      <div className="flex-1 overflow-y-auto">
        <ChatList />
      </div>

      {/* Footer */}
      <div className="p-4 border-t flex items-center justify-between">

        {/* User Info */}
        <div className="flex flex-col">
          <span className="text-sm font-medium">
            {user?.name}
          </span>
          <span className="text-xs text-gray-500">
            @{user?.username || "user"}
          </span>
        </div>

        {/* Logout */}
        <Logout />

      </div>

    </div>
  );
}