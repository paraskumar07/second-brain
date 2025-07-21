import React from "react";
import { Share2, PlusCircle } from "lucide-react";

type HeaderProps = {
  onAddContent: () => void;
  onShare: () => void;
};

const Header: React.FC<HeaderProps> = ({ onAddContent, onShare }) => (
  <header className="w-full flex items-center justify-between bg-white shadow px-8 py-5 mb-2">
    <h1 className="text-2xl font-extrabold text-blue-700 font-mono tracking-tight">100xBrainly</h1>
    <div className="flex gap-3">
      <button
        onClick={onShare}
        className="flex items-center bg-blue-50 text-blue-700 px-4 py-2 rounded font-bold hover:bg-blue-100 border border-blue-200 gap-2"
      >
        <Share2 size={20} />
        Share Brain
      </button>
      <button
        onClick={onAddContent}
        className="flex items-center bg-blue-600 text-white px-4 py-2 rounded font-bold hover:bg-blue-700 shadow gap-2"
      >
        <PlusCircle size={20}/>
        Add Content
      </button>
    </div>
  </header>
);

export default Header;
