import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom'; // Para leer/escribir query params
import { fetchSongs } from '../redux/actions/songsActions';
import { HiOutlineSearch } from 'react-icons/hi';

export default function SearchBar() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate(); // Para actualizar URL con término de búsqueda

  // Inicializar query desde URL si existe
  const initialQuery = new URLSearchParams(location.search).get('q') || '';
  const [query, setQuery] = useState(initialQuery);

  // Efecto para buscar si initialQuery existe (al cargar la página /search con ?q=...)
  useEffect(() => {
    if (initialQuery.trim()) {
      dispatch(fetchSongs(initialQuery.trim()));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Solo al montar, para la carga inicial de /search?q=...

  const handleSearch = (e) => {
    e.preventDefault();
    const trimmedQuery = query.trim();
    if (trimmedQuery) {
      dispatch(fetchSongs(trimmedQuery));
      // Actualizar URL con el término de búsqueda
      navigate(`/search?q=${encodeURIComponent(trimmedQuery)}`);
    } else {
      // Opcional: limpiar resultados si la búsqueda está vacía
      // dispatch(fetchSongs()); // Volver a trending o limpiar
      navigate('/search'); // Limpiar query param
    }
  };

  return (
    <form onSubmit={handleSearch} className="flex items-center justify-center my-6 px-4 w-full">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Busca canciones o artistas..."
        className="p-3 rounded-l-full w-full max-w-md bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-shadow"
      />
      <button
        type="submit"
        className="bg-purple-600 hover:bg-purple-700 text-white p-3 rounded-r-full flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500"
        aria-label="Buscar"
      >
        <HiOutlineSearch className="text-xl" />
      </button>
    </form>
  );
}