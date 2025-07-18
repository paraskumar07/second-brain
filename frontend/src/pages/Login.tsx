// src/pages/Login.tsx
import { Button } from "../components/ui/Button";

export default function Login() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <form className="space-y-4">
        <input type="email" placeholder="Email" className="w-full p-2 border rounded" />
        <input type="password" placeholder="Password" className="w-full p-2 border rounded" />
        <Button type="submit" className="w-full">Login</Button>
      </form>
    </div>
  );
}
