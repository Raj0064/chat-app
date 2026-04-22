import ThemeToggle from "../ThemeToggle";
import ChatList from "./ChatList";
import Logout from "./Logout";


export default function Sidebar() {
  return (
    <div className="w-1/4 border-r flex flex-col">

      {/* Top Bar */}
      <div className="p-4 flex justify-between items-center border-b">
        <h2 className="font-semibold">Chats</h2>
        <ThemeToggle />
      </div>

      {/* Chat List */}
      <ChatList />
      <Logout/>
    </div>
  );
}