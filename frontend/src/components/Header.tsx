import React from "react";

type HeaderProps = {
  onAddContent: () => void;
  onShare: () => void;
};

const Header: React.FC<HeaderProps> = ({ onAddContent, onShare }) => (
  <header className="w-full flex items-center justify-between bg-white shadow px-8 py-4">
    <h1 className="text-2xl font-bold text-blue-700 tracking-tight">100xBrainly</h1>
    <div className="flex gap-3">
      <button
        onClick={onShare}
        className="bg-blue-50 text-blue-700 px-4 py-2 rounded font-semibold hover:bg-blue-100"
      >
        Share Brain
      </button>
      <button
        onClick={onAddContent}
        className="bg-blue-600 text-white px-4 py-2 rounded font-semibold hover:bg-blue-700"
      >
        + Add Content
      </button>
    </div>
  </header>
);

export default Header;
