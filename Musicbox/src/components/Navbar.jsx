import { Link, NavLink } from 'react-router-dom'; // NavLink para estilos activos
import { HiOutlineMenuAlt2, HiOutlineSearch } from 'react-icons/hi'; // Íconos de ejemplo

export default function Navbar() {
  const activeStyle = "bg-purple-600 text-white";
  const inactiveStyle = "hover:bg-gray-700 hover:text-purple-300";

  return (
    <nav className="fixed top-0 left-0 right-0 z-20 flex items-center justify-between p-3 md:p-4 bg-black bg-opacity-80 backdrop-blur-md text-white shadow-lg">
      {/* Menú (funcionalidad de sidebar no implementada) */}
      <button className="text-2xl p-2 hover:bg-gray-700 rounded-full transition-colors" aria-label="Abrir menú">
        <HiOutlineMenuAlt2 />
      </button>

      <Link to="/" className="text-lg sm:text-xl font-bold hover:text-purple-400 transition-colors">
        Music Box
      </Link>

      {/* Enlace de búsqueda */}
      <NavLink
        to="/search"
        className={({ isActive }) =>
          `text-xl sm:text-2xl p-2 rounded-full transition-colors ${isActive ? activeStyle : inactiveStyle}`
        }
        aria-label="Buscar"
      >
        <HiOutlineSearch />
      </NavLink>
    </nav>
  );
}