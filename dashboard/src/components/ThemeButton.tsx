import { Moon, Sun } from "lucide-react";
import { useTheme } from "./theme-provider";
import { Button } from "./ui/button";

export default function ThemeButton() {
  const { setTheme, theme } = useTheme();

  return (
    <>
      {theme === "light" ? (
        <Button variant='outline' size='icon' onClick={() => setTheme("dark")}>
          <Moon className='transition-all' />
          <span className='sr-only'>Toggle theme</span>
        </Button>
      ) : (
        <Button variant='outline' size='icon' onClick={() => setTheme("light")}>
          <Sun className='transition-all' />
          <span className='sr-only'>Toggle theme</span>
        </Button>
      )}
    </>
  );
}
