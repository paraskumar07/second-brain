// layout/MainLayout.tsx
import Header from "../components/Header";
import type { ReactNode } from "react";

const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-800 transition-colors">
      <Header />
      <main className="p-4">{children}</main>
    </div>
  );
};

export default MainLayout;
