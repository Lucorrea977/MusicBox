import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './views/Home';
import SearchResults from './views/SearchResults';
import Artist from './views/Artist';
import Player from './components/Player';

export default function App() {
  return (
    <div className="relative bg-gradient-to-b from-gray-900 to-black min-h-screen pb-28 selection:bg-purple-500 selection:text-white"> {/* Ajusta pb según altura del Player */}
      <Navbar />
      <main className="pt-16"> {/* Espacio para Navbar fija */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/artist/:handle" element={<Artist />} /> {/* :handle para el nombre de usuario */}
        </Routes>
      </main>
      <Player /> 
    </div>
  );
}