import { useState } from "react";
import { Sun, Moon } from "lucide-react";
import Dashboard from "./pages/Dashboard";

export default function Apap() {
  // const [isDark, setIsDark] = useState(false);

  return (
    // <div className={
    //   `${isDark ? "bg-gray-900 text-white" : "bg-white text-gray-900"} min-h-screen flex flex-col items-center justify-center px-4`
    // }>
    //   {/* Theme Toggle */}
    //   <button
    //     onClick={() => setIsDark(!isDark)}
    //     className="absolute top-4 right-4 p-2 rounded-full border border-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
    //     aria-label="Toggle theme"
    //   >
    //     {isDark ? <Sun size={18} /> : <Moon size={18} />}
    //   </button>

    //   {/* Main Content */}
    //   <div className="text-center max-w-2xl">
    //     <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight mb-6">
    //       Your Second Brain for the Web
    //     </h1>
    //     <p className="text-lg sm:text-xl mb-10 font-semibold">
    //       Capture, organize, and share notes, videos, tweets, and links in one beautiful place.
    //     </p>

    //     <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
    //       <button className="px-8 py-3 text-base font-bold bg-blue-700 hover:bg-blue-800 text-white rounded-lg shadow-lg transition-transform transform hover:scale-105">
    //         Get Started
    //       </button>
    //       <button className="px-8 py-3 text-base font-bold bg-gray-800 hover:bg-gray-900 text-white rounded-lg shadow-lg transition-transform transform hover:scale-105">
    //         Login
    //       </button>
    //     </div>
    //   </div>
    // </div>


    <div>
      <Dashboard/>
    </div>

//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//   <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
//     <h2 className="text-2xl font-bold mb-4 text-center">Login to Second Brain</h2>
//     <form className="space-y-4">
//       <input className="w-full p-3 border rounded" placeholder="Email" />
//       <input className="w-full p-3 border rounded" type="password" placeholder="Password" />
//       <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Login</button>
//     </form>
//   </div>
// </div>

  );
}
