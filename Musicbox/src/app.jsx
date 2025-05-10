
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./views/Home";
import Favorites from "./views/Favorites";
import Settings from "./views/Settings";
import Playlists from "./views/Playlists";
import Player from "./components/Player";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/playlists" element={<Playlists />} />
        </Routes>
      </main>
      <Player />
    </div>
  );
}

export default App;
