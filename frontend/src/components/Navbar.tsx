import { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";

export default function Navbar() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  return (
    <nav className="w-full p-4 flex justify-between items-center shadow bg-white text-black dark:bg-black dark:text-white">
      <h1 className="text-lg font-bold">Second Brain</h1>
      <button onClick={() => setIsDark(!isDark)} className="p-2 rounded-full border">
        {isDark ? <Sun /> : <Moon />}
      </button>
    </nav>
  );
}
