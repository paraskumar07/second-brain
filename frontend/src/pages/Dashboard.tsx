import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import NotesGrid from "../components/NotesGrid";
import NoteCard from "../components/NoteCard";
import CreateContentModel from "../components/CreateContentModel";

export default function Dashboard() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 p-6">
        <Topbar />
        <NotesGrid />
        <NoteCard title="tweet" date="17-7-2025" />
      </div>
      <CreateContentModel/>
    </div>
  );
}
