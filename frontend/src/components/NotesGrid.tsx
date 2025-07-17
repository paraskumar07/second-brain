import NoteCard from "./NoteCard";

export default function NotesGrid() {
  const notes = [
    { title: "hey", date: "7/17/2025" },
    // More mock notes...
  ];

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">All Notes</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {notes.map((note, i) => (
          <NoteCard key={i} title={note.title} date={note.date} />
        ))}
      </div>
    </div>
  );
}
