import { Share2, Plus } from "lucide-react";

export default function Topbar() {
  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white border-b">
      {/* Left Section: Logo + Text */}
      <div className="flex items-center gap-2">
        <img
          src="/47087f7d-37a5-4d1c-8e6f-7382e490c601.png"
          alt="logo"
          className="h-8 w-8 object-contain"
        />
        <h1 className="text-xl font-semibold">100xBrainly</h1>
      </div>

      {/* Right Section: Buttons */}
      <div className="flex items-center gap-4">
        {/* Share Brain */}
        <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 border rounded-xl text-sm font-medium">
          <Share2 className="w-4 h-4" />
          Share Brain
        </button>

        {/* Add Content */}
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-medium">
          <Plus className="w-4 h-4" />
          Add Content
        </button>
      </div>
    </header>
  );
}
