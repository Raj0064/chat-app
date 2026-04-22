import { Button } from "@/components/ui/button";
import { useTheme } from "@/context/theme-provider";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant="outline"
      onClick={() =>
        setTheme(theme === "dark" ? "light" : "dark")
      }
    >
      🌙
    </Button>
  );
}