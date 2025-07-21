import React from "react";
import { ClipboardCopy, Edit3, Trash } from "lucide-react";

type NoteCardProps = {
  title: string;
  type: string;
  tags?: string[];
  date: string;
  onEdit: () => void;
  onDelete: () => void;
  onCopy: () => void;
};

const tagColors = [
  "bg-blue-100 text-blue-700",
  "bg-green-100 text-green-700",
  "bg-purple-100 text-purple-700",
  "bg-yellow-100 text-yellow-800",
  "bg-pink-100 text-pink-700",
  "bg-indigo-100 text-indigo-700",
  "bg-orange-100 text-orange-700"
];

const typeLabels: Record<string, string> = {
  tweet: "Tweet",
  youtube: "YouTube",
  document: "Document",
  link: "Link",
};

const NoteCard: React.FC<NoteCardProps> = ({
  title,
  type,
  tags = [],
  date,
  onEdit,
  onDelete,
  onCopy,
}) => (
  <div className="rounded-lg bg-white shadow p-6 border border-gray-100 transition-transform transform hover:scale-[1.03] hover:shadow-xl">
    <div className="flex justify-between items-center mb-2">
      <span className="text-lg font-semibold text-gray-800 truncate">{title}</span>
      <div className="flex gap-2">
        <button className="p-2 rounded-full hover:bg-blue-100" onClick={onCopy} title="Copy Link">
          <ClipboardCopy size={20} strokeWidth={2}/>
        </button>
        <button className="p-2 rounded-full hover:bg-yellow-100" onClick={onEdit} title="Edit">
          <Edit3 size={20} strokeWidth={2}/>
        </button>
        <button className="p-2 rounded-full hover:bg-red-100" onClick={onDelete} title="Delete">
          <Trash size={20} strokeWidth={2}/>
        </button>
      </div>
    </div>
    <span className="text-xs bg-sky-100 text-sky-700 font-semibold rounded px-2 py-0.5 mr-2">
      {typeLabels[type] || type}
    </span>
    <div className="flex flex-wrap mt-2 gap-1">
      {tags.map((tag, i) => (
        <span
          key={tag + i}
          className={`text-xs rounded px-2 py-0.5 font-medium ${tagColors[i % tagColors.length]}`}
        >#{tag}</span>
      ))}
    </div>
    <div className="text-xs text-gray-400 mt-3">Added {date}</div>
  </div>
);

export default NoteCard;
