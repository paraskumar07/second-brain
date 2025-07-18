import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="min-h-screen bg-white text-black dark:bg-black dark:text-white transition-colors duration-300">
      <Navbar />
      <main className="p-4">
        <h2 className="text-2xl font-semibold mb-4">Welcome to Second Brain</h2>
        <p>This is a simple dark/light mode setup without context.</p>
      </main>
    </div>
  );
}

export default App;
