// components/Header.tsx
import ThemeToggle from "./ThemeToggle";

const Header = () => {
  return (
    <header className="w-full px-4 py-3 border-b shadow-sm bg-white dark:bg-gray-900 dark:text-white flex items-center justify-between">
      <h1 className="text-2xl font-semibold">Second Brain</h1>
      <ThemeToggle />
    </header>
  );
};

export default Header;
