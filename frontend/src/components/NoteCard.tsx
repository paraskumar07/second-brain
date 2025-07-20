import React from "react";

type NoteCardProps = {
  title: string;
  type: string;
  tags?: string[];
  date: string;
  onEdit: () => void;
  onDelete: () => void;
  onCopy: () => void;
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
  <div className="rounded-lg bg-white shadow p-6 border border-gray-100">
    <div className="flex justify-between items-center mb-2">
      <span className="text-lg font-semibold text-gray-800 truncate">{title}</span>
      <div className="flex gap-1">
        <button onClick={onCopy} title="Copy Link" className="p-1 hover:bg-blue-50 rounded">🔗</button>
        <button onClick={onEdit} title="Edit" className="p-1 hover:bg-yellow-50 rounded">✏️</button>
        <button onClick={onDelete} title="Delete" className="p-1 hover:bg-red-50 rounded">🗑️</button>
      </div>
    </div>
    <span className="text-xs bg-blue-100 text-blue-700 rounded px-2 py-0.5 mr-2">{type}</span>
    <div className="flex flex-wrap mt-2 gap-1">
      {tags.map(tag => (
        <span key={tag} className="text-xs bg-gray-200 rounded px-2 py-0.5 text-gray-700">#{tag}</span>
      ))}
    </div>
    <div className="text-xs text-gray-400 mt-3">Added {date}</div>
  </div>
);

export default NoteCard;
