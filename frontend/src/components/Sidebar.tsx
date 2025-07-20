import React from "react";

const categories = [
  { label: "All", value: "all" },
  { label: "Tweets", value: "tweet" },
  { label: "YouTube", value: "youtube" },
  { label: "Documents", value: "document" },
  { label: "Links", value: "link" },
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
    <aside className="w-60 bg-white h-screen shadow-lg p-6">
      <h2 className="text-xl font-bold mb-8">100xBrainly</h2>
      <input
        type="text"
        value={search}
        onChange={(e) => onSearch(e.target.value)}
        placeholder="Search your brain..."
        className="w-full px-3 py-2 mb-6 border border-gray-300 rounded outline-none focus:ring-2"
      />
      <div className="flex flex-col gap-1">
        {categories.map((cat) => (
          <button
            key={cat.value}
            className={`text-left px-3 py-2 rounded ${
              selected === cat.value
                ? "bg-blue-600 text-white"
                : "hover:bg-blue-100 text-gray-700"
            } font-medium`}
            onClick={() => onSelect(cat.value)}
          >
            {cat.label}
          </button>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
