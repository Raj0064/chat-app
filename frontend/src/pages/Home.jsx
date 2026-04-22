import ChatArea from "@/components/chat/ChatArea";
import Sidebar from "../components/Sidebar/Sidebar";

export default function Home() {
  return (
    <div className="flex h-screen bg-background text-foreground">
      <Sidebar />
      <ChatArea />
    </div>
  );
}