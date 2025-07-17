interface NoteCardProps {
  title: string;
  date: string;
}

export default function NoteCard({ title, date }: NoteCardProps) {
  return (
    <div className="bg-white p-4 rounded shadow hover:shadow-md transition-all">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-semibold">{title}</h3>
        <div className="flex gap-2">
          <button>🔗</button>
          <button>✏️</button>
          <button>🗑️</button>
        </div>
      </div>
      <p className="text-sm text-gray-500">Added on {date}</p>
    </div>
  );
}
