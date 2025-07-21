import React, { useState, useEffect } from "react";
import { XCircle } from "lucide-react";

type Props = {
  open: boolean;
  onClose: () => void;
  onAdd: (note: { title: string; type: string; tags: string[]; link?: string }) => void;
  onEdit?: (note: { id: string; title: string; type: string; tags: string[]; link?: string }) => void;
  editingNote?: {
    id: string;
    title: string;
    type: string;
    tags?: string[];
    link?: string;
  } | null;
};

const types = [
  { label: "Tweet", value: "tweet" },
  { label: "YouTube", value: "youtube" },
  { label: "Document", value: "document" },
  { label: "Link", value: "link" },
];

const AddContentModal: React.FC<Props> = ({
  open,
  onClose,
  onAdd,
  onEdit,
  editingNote,
}) => {
  const [title, setTitle] = useState("");
  const [type, setType] = useState(types[0].value);
  const [tags, setTags] = useState("");
  const [link, setLink] = useState("");

  useEffect(() => {
    if (editingNote) {
      setTitle(editingNote.title);
      setType(editingNote.type);
      setTags(editingNote.tags ? editingNote.tags.join(", ") : "");
      setLink(editingNote.link || "");
    } else {
      setTitle("");
      setType(types[0].value);
      setTags("");
      setLink("");
    }
  }, [editingNote, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      title,
      type,
      tags: tags.split(",").map((t) => t.trim()).filter(Boolean),
      link,
    };
    if (editingNote && onEdit) {
      onEdit({ id: editingNote.id, ...payload });
    } else {
      onAdd(payload);
    }
    onClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <form
        className="bg-white rounded-lg shadow-2xl p-8 max-w-md w-[95vw] border flex flex-col items-center py-10 relative"
        onSubmit={handleSubmit}
      >
        <button type="button" onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-red-500">
          <XCircle size={28} />
        </button>
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">
          {editingNote ? "Edit Content" : "Add New Content"}
        </h2>
        <label className="block mb-4 w-full">
          <span className="text-gray-700 font-medium">Title *</span>
          <input
            type="text"
            value={title}
            required
            minLength={2}
            onChange={e => setTitle(e.target.value)}
            className="mt-1 block w-full border rounded px-3 py-2 mb-2 focus:ring-2 focus:ring-blue-400 outline-none"
          />
        </label>
        <label className="block mb-4 w-full">
          <span className="text-gray-700 font-medium">Type *</span>
          <select
            value={type}
            onChange={e => setType(e.target.value)}
            className="mt-1 block w-full border rounded px-3 py-2 mb-2 focus:ring-2 focus:ring-blue-400 outline-none"
          >
            {types.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
          </select>
        </label>
        <label className="block mb-4 w-full">
          <span className="text-gray-700 font-medium">Link (optional)</span>
          <input
            type="text"
            value={link}
            onChange={e => setLink(e.target.value)}
            className="mt-1 block w-full border rounded px-3 py-2 mb-2 focus:ring-2 focus:ring-blue-400 outline-none"
          />
        </label>
        <label className="block mb-4 w-full">
          <span className="text-gray-700 font-medium">Tags (comma separated)</span>
          <input
            type="text"
            value={tags}
            onChange={e => setTags(e.target.value)}
            className="mt-1 block w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
          />
        </label>
        <div className="flex justify-end gap-2 w-full mt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 font-semibold shadow"
          >
            {editingNote ? "Update" : "Add"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddContentModal;
