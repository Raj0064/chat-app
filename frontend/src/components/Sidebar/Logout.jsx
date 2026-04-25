import { Button } from "@/components/ui/button";
import API from "@/lib/api";

export default function Logout() {
  const handleLogout = async () => {
    await API.post("/auth/logout");
    window.location.href = "/login";
  };

  return (
    <Button variant="destructive" onClick={handleLogout}>
      Logout
    </Button>
  );
}