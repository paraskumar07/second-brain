import React from "react";
import NoteCard from "./NoteCard";

type NoteData = {
  id: string;
  title: string;
  type: string;
  tags?: string[];
  date: string;
  link?: string;
};

type NotesGridProps = {
  notes: NoteData[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onCopy: (id: string) => void;
};

const NotesGrid: React.FC<NotesGridProps> = ({
  notes,
  onEdit,
  onDelete,
  onCopy,
}) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {notes.map(note => (
      <NoteCard
        key={note.id}
        title={note.title}
        type={note.type}
        tags={note.tags}
        date={note.date}
        onEdit={() => onEdit(note.id)}
        onDelete={() => onDelete(note.id)}
        onCopy={() => onCopy(note.id)}
      />
    ))}
  </div>
);

export default NotesGrid;
