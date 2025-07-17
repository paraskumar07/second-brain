import { Search, Twitter, Youtube, FileText, Link } from "lucide-react";

export default function Sidebar() {
  return (
    <div className="w-64 h-screen bg-white border-r shadow-sm p-6">
      {/* Logo */}
      <div className="flex items-center gap-2 px-4 py-6">
        <h1 className="text-xl font-bold">100xBrainly</h1>
        <img src="/logo.png" alt="Logo" className="w-6 h-6" />
      </div>

      {/* Search Bar */}
      <div className="flex items-center rounded-full border border-gray-300 overflow-hidden mb-6">
        <input
          type="text"
          placeholder="Search..."
          className="px-4 py-2 flex-grow focus:outline-none"
        />
        <div className="bg-blue-400 px-3 py-2">
          <Search size={18} className="text-white" />
        </div>
      </div>

      {/* Navigation Items */}
      <ul className="space-y-2 text-gray-800">
        <li className="flex items-center gap-3 cursor-pointer px-3 py-2 rounded-md hover:bg-blue-100">
          <Twitter size={18} />
          <span>Tweets</span>
        </li>
        <li className="flex items-center gap-3 cursor-pointer px-3 py-2 rounded-md hover:bg-blue-100">
          <Youtube size={18} />
          <span>Videos</span>
        </li>
        <li className="flex items-center gap-3 cursor-pointer px-3 py-2 rounded-md hover:bg-blue-100">
          <FileText size={18} />
          <span>Documents</span>
        </li>
        <li className="flex items-center gap-3 cursor-pointer px-3 py-2 rounded-md hover:bg-blue-100">
          <Link size={18} />
          <span>Links</span>
        </li>
      </ul>
    </div>
  );
}
