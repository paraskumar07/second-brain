import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import NotesGrid from "./components/NotesGrid";
import AddContentModal from "./components/AddContentModal";

// ---- Types and Sample Data ----
type Note = {
  id: string;
  title: string;
  type: string;
  tags?: string[];
  date: string;
  link?: string;
};

const sampleNotes: Note[] = [
  {
    id: "1",
    title: "Interesting Tweet",
    type: "tweet",
    tags: ["tech", "ai"],
    date: "2025-07-21",
    link: "https://twitter.com/example",
  },
  {
    id: "2",
    title: "React Docs",
    type: "document",
    tags: ["react", "frontend"],
    date: "2025-07-20",
    link: "https://react.dev/",
  },
  {
    id: "3",
    title: "YouTube Tutorial",
    type: "youtube",
    tags: ["learning"],
    date: "2025-07-19",
    link: "https://youtu.be/example",
  },
];

// ---- Main App Component ----
const App: React.FC = () => {
  const [selectedCat, setSelectedCat] = useState("all");
  const [search, setSearch] = useState("");
  const [notes, setNotes] = useState<Note[]>(sampleNotes);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [copied, setCopied] = useState(false);

  // ------ Add, Edit, Delete, Copy ------
  const handleAddNote = (note: {
    title: string;
    type: string;
    tags: string[];
    link?: string;
  }) => {
    const newNote: Note = {
      ...note,
      id: String(Date.now()),
      date: new Date().toISOString().split("T")[0],
    };
    setNotes([newNote, ...notes]);
  };

  const handleEditNote = (id: string) => {
    const note = notes.find((n) => n.id === id) || null;
    setEditingNote(note);
    setAddModalOpen(true);
  };

  const handleUpdateNote = (updated: {
    id: string;
    title: string;
    type: string;
    tags: string[];
    link?: string;
  }) => {
    setNotes(notes.map((n) => (n.id === updated.id ? { ...n, ...updated } : n)));
    setEditingNote(null);
  };

  const handleDeleteNote = (id: string) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  const handleCopyNote = (id: string) => {
    const note = notes.find(n => n.id === id);
    if (!note) return;
    const textToCopy = note.link || note.title;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const handleCloseModal = () => {
    setAddModalOpen(false);
    setEditingNote(null);
  };

  // ------ Filtering Logic ------
  const filteredNotes = notes.filter(note => {
    const matchesCategory =
      selectedCat === "all" ? true : note.type === selectedCat;
    const matchesSearch =
      search.trim().length === 0
        ? true
        : (
            note.title +
            " " +
            (note.tags ? note.tags.join(" ") : "") +
            " " +
            (note.link || "")
          )
          .toLowerCase()
          .includes(search.trim().toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // ------ Render ------
  return (
    <div className="flex min-h-screen">
      <Sidebar
        selected={selectedCat}
        onSelect={setSelectedCat}
        search={search}
        onSearch={setSearch}
      />
      <div className="flex-1 flex flex-col">
        <Header
          onAddContent={() => {
            setEditingNote(null);
            setAddModalOpen(true);
          }}
          onShare={() => {}}
        />
        {copied && (
          <div className="fixed top-6 right-6 bg-green-600 text-white px-4 py-2 rounded shadow-lg transition">
            Copied!
          </div>
        )}
        <main className="flex-1 bg-gray-50 p-8">
          <NotesGrid
            notes={filteredNotes}
            onEdit={handleEditNote}
            onDelete={handleDeleteNote}
            onCopy={handleCopyNote}
          />
          {filteredNotes.length === 0 && (
            <div className="text-center text-gray-400 mt-8">
              No notes match your filter.
            </div>
          )}
        </main>
      </div>
      <AddContentModal
        open={addModalOpen}
        onClose={handleCloseModal}
        onAdd={handleAddNote}
        onEdit={handleUpdateNote}
        editingNote={editingNote}
      />
    </div>
  );
};

export default App;
