import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="flex justify-between items-center p-4 bg-gray-900 text-white">
      <div className="text-2xl font-bold">🎵 Music Box</div>
      <div className="flex gap-6">
        <Link to="/" className="hover:text-blue-500">Inicio</Link>
        <Link to="/favorites" className="hover:text-blue-500">Favoritos</Link>
        <Link to="/playlists" className="hover:text-blue-500">Playlists</Link>
        <Link to="/settings" className="hover:text-blue-500">Configuración</Link>
      </div>
    </nav>
  );
}

export default Navbar;
