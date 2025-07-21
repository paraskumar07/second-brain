import React from "react";
import { Twitter, Youtube, FileText, Link } from "lucide-react";

const categories = [
  { label: "All", value: "all", icon: null },
  { label: "Tweets", value: "tweet", icon: <Twitter size={18} className="inline mr-1 text-blue-500" /> },
  { label: "YouTube", value: "youtube", icon: <Youtube size={18} className="inline mr-1 text-red-500" /> },
  { label: "Documents", value: "document", icon: <FileText size={18} className="inline mr-1 text-green-600" /> },
  { label: "Links", value: "link", icon: <Link size={18} className="inline mr-1 text-violet-500" /> },
];

type SidebarProps = {
  selected: string;
  onSelect: (val: string) => void;
  search: string;
  onSearch: (val: string) => void;
};

const Sidebar: React.FC<SidebarProps> = ({
  selected,
  onSelect,
  search,
  onSearch,
}) => {
  return (
    <aside className="w-60 min-w-fit bg-white h-screen shadow-lg p-6 flex flex-col md:sticky top-0">
      <h2 className="text-2xl font-extrabold text-blue-700 mb-8 font-mono">
        100xBrainly
      </h2>
      <input
        type="text"
        value={search}
        onChange={(e) => onSearch(e.target.value)}
        placeholder="Search your brain..."
        className="w-full px-3 py-2 mb-6 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-400 transition"
      />
      <div className="flex flex-col gap-1">
        {categories.map((cat) => (
          <button
            key={cat.value}
            className={`flex items-center gap-2 text-left px-3 py-2 rounded-lg font-medium transition
            ${selected === cat.value
              ? "bg-blue-600 text-white scale-105 shadow"
              : "hover:bg-blue-100 text-gray-700"}
            `}
            onClick={() => onSelect(cat.value)}
          >
            {cat.icon}
            {cat.label}
          </button>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
