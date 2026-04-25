import { useAuth } from "@/context/AuthContext";
import ThemeToggle from "../ThemeToggle";
import ChatList from "./ChatList";
import Logout from "./Logout";
import Searchbar from "./Searchbar";
import { useEffect, useState } from "react";
import socket from "@/lib/socket";

export default function Sidebar() {
  const { user } = useAuth();
  const [onlineUsers, setOnlineUsers] = useState([]);

  // setup socket user
  useEffect(() => {
    if (user?._id) {
      socket.emit("setup", user._id);
    }
  }, [user]);

  // receive online users
  useEffect(() => {
    const handleOnline = (users) => setOnlineUsers(users);

    socket.on("online_users", handleOnline);

    return () => socket.off("online_users", handleOnline);
  }, []);

  return (
    <div className="w-[30%] md:w-[320px] border-r flex flex-col h-screen">

      <div className="p-4 flex justify-between border-b">
        <h2 className="font-semibold text-lg">Chats</h2>
        <ThemeToggle />
      </div>

      <div className="p-3 border-b">
        <Searchbar />
      </div>

      {/* PASS ONLINE USERS */}
      <div className="flex-1 overflow-y-auto">
        <ChatList onlineUsers={onlineUsers} />
      </div>

      <div className="p-4 border-t flex justify-between">
        <div>
          <div className="text-sm font-medium">{user?.name}</div>
          <div className="text-xs text-gray-500">@{user?.username}</div>
        </div>
        <Logout />
      </div>

    </div>
  );
}