import { useAuth } from "@/context/AuthContext";

export default function ChatHeader() {
  const {user}=useAuth()
  return (
    <div className="p-4 border-b font-semibold">
      {user.name} (Online)
    </div>
  );
}