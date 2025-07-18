// src/components/AuthLayout.tsx
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

export default function AuthLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}
