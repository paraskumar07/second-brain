// components/Layout.tsx
import Header from "./Header";
import Footer from "./Footer";
import type { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
      <Header />
      <main className="flex-1 p-6">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
