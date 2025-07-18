// src/pages/Signup.tsx
import { Button } from "../components/ui/Button";

export default function Signup() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Signup</h1>
      <form className="space-y-4">
        <input type="email" placeholder="Email" className="w-full p-2 border rounded" />
        <input type="password" placeholder="Password" className="w-full p-2 border rounded" />
        <Button type="submit" className="w-full">Signup</Button>
      </form>
    </div>
  );
}
