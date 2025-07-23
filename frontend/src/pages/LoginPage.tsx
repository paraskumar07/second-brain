import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const err = await login(username, password);
    if (!err) navigate("/");
    else setError(err);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto mt-20 p-8 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
      <input
        className="block w-full p-2 mb-4 border rounded"
        value={username}
        onChange={e => setUsername(e.target.value)}
        placeholder="Username"
        required minLength={3} maxLength={30}
      />
      <input
        className="block w-full p-2 mb-4 border rounded"
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        placeholder="Password"
        required minLength={8} maxLength={20}
      />
      {error && <div className="text-red-600 mb-4">{error}</div>}
      <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded font-semibold">Login</button>
      <p className="mt-4 text-center text-sm">
        New user?{" "}
        <Link className="text-blue-500 underline" to="/signup">
          Sign up here
        </Link>
      </p>
    </form>
  );
}



/*
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const err = await login(username, password);
    if (!err) navigate("/");
    else setError(err);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto mt-20 p-8 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
      <input
        className="block w-full p-2 mb-4 border rounded"
        value={username}
        onChange={e => setUsername(e.target.value)}
        placeholder="Username"
        required minLength={3} maxLength={10}
      />
      <input
        className="block w-full p-2 mb-4 border rounded"
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        placeholder="Password"
        required minLength={8} maxLength={20}
      />
      {error && <div className="text-red-600 mb-4">{error}</div>}
      <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded font-semibold">Login</button>
      <p className="mt-4 text-center text-sm">
        New user?{" "}
        <Link className="text-blue-500 underline" to="/signup">
          Sign up here
        </Link>
      </p>
    </form>
  );
}

*/