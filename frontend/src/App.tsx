import React, { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import NotesGrid from "./components/NotesGrid";
import AddContentModal from "./components/AddContentModal";
import ShareModal from "./components/ShareModal";
import * as api from "./api/notesApi"; // << NEW
// ... other imports ...

type Note = {
  id: string;
  title: string;
  type: string;
  tags?: string[];
  date: string;
  link?: string;
  content?: string;
};

function App() {
  const [selectedCat, setSelectedCat] = useState("all");
  const [search, setSearch] = useState("");
  const [notes, setNotes] = useState<Note[]>([]);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [copied, setCopied] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);

  // ==== NEW STATE FOR API ====
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string|null>(null);

  // ==== FETCH NOTES AT MOUNT (and after each change) ====
  async function reloadNotes() {
    setLoading(true);
    setError(null);
    try {
      const res = await api.fetchNotes();
      // backend returns { notes } so setNotes(res.notes)
      setNotes(res.notes.map((n: any) => ({
        id: n._id,
        title: n.title,
        type: n.type,
        tags: n.tags,
        date: n.updatedAt || n.createdAt || new Date().toISOString().split("T")[0],
        link: n.link,
        content: n.content
      })));
    } catch (e) {
      setError("Could not load notes");
    }
    setLoading(false);
  }

  useEffect(() => {
    reloadNotes();
  }, []);

  // ------ Handlers now call API and reload ------
  const handleAddNote = async (note: { title: string; type: string; tags: string[]; link?: string; content?: string }) => {
    setLoading(true);
    setError(null);
    try {
      await api.addNote(note);
      await reloadNotes();
    } catch {
      setError("Could not add note");
    }
    setLoading(false);
  };

  const handleEditNote = (id: string) => {
    const note = notes.find((n) => n.id === id) || null;
    setEditingNote(note);
    setAddModalOpen(true);
  };

  const handleUpdateNote = async (updated: { id: string; title: string; type: string; tags: string[]; link?: string; content?: string }) => {
    setLoading(true);
    setError(null);
    try {
      await api.updateNote(updated.id, updated);
      await reloadNotes();
    } catch {
      setError("Could not update note");
    }
    setEditingNote(null);
    setLoading(false);
  };

  const handleDeleteNote = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      await api.deleteNote(id);
      await reloadNotes();
    } catch {
      setError("Could not delete note");
    }
    setLoading(false);
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

  // --- Filtering ---
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
            (note.link || "") +
            " " +
            (note.content || "")
          )
          .toLowerCase()
          .includes(search.trim().toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const shareUrl = "https://brainly.yourapp.com/share/XXXX"; // (TODO: replace with real share logic)

  // --- RENDER ---
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
          onShare={() => setShareOpen(true)}
        />
        {copied && (
          <div className="fixed top-6 right-6 bg-green-600 text-white px-4 py-2 rounded shadow-lg transition">
            Copied!
          </div>
        )}
        {loading && (
          <div className="text-center mt-10 text-lg text-blue-600">Loading your notes...</div>
        )}
        {error && (
          <div className="text-center mt-4 text-red-500 bg-red-50 rounded p-2">{error}</div>
        )}
        <main className="flex-1 bg-gray-50 p-8">
          <NotesGrid
            notes={filteredNotes}
            onEdit={handleEditNote}
            onDelete={handleDeleteNote}
            onCopy={handleCopyNote}
          />
          {filteredNotes.length === 0 && !loading && (
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
      <ShareModal
        open={shareOpen}
        onClose={() => setShareOpen(false)}
        shareUrl={shareUrl}
      />
    </div>
  );
}

export default App;
