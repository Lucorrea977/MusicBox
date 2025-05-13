import { useEffect } from 'react';
import { useLocation } from 'react-router-dom'; // Para obtener el query de la URL
import { useDispatch, useSelector } from 'react-redux';
import { fetchSongs } from '../redux/actions/songsActions'; // Asegúrate que fetchSongs maneje la búsqueda
import SearchBar from '../components/SearchBar';
import SongCard from '../components/SongCard';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

export default function SearchResults() {
  const dispatch = useDispatch();
  const location = useLocation();
  const { tracks, loading, error } = useSelector((state) => state.songs);

  // Obtener el término de búsqueda de los query params de la URL
  const searchQuery = new URLSearchParams(location.search).get('q');

  useEffect(() => {
    // No necesitamos disparar la búsqueda aquí si SearchBar ya lo hace
    // y actualiza la URL, o si la carga inicial ya ocurrió en SearchBar.
    // Pero si queremos asegurar que los resultados se actualicen si el query param cambia
    // y SearchBar no lo manejó (ej. navegación directa a /search?q=algo):
    if (searchQuery && tracks.length === 0 && !loading) { // O alguna lógica para evitar re-fetch innecesario
        // dispatch(fetchSongs(searchQuery));
    }
  }, [searchQuery, dispatch, tracks.length, loading]);

  const handleRetry = () => {
    if (searchQuery) {
      dispatch(fetchSongs(searchQuery));
    }
  };

  return (
    <div className="p-4 md:p-6">
      <SearchBar /> {/* SearchBar maneja la lógica de búsqueda y actualiza la URL */}

      {loading && <LoadingSpinner />}
      {error && !loading && <ErrorMessage message={error} onRetry={searchQuery ? handleRetry : undefined} />}

      {!loading && !error && (
        <>
          {searchQuery && tracks.length > 0 && (
            <h2 className="text-xl text-white my-4">
              Resultados para: <span className="font-semibold text-purple-400">{searchQuery}</span>
            </h2>
          )}
          {tracks.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {tracks.map((song) => (
                song && song.id ? <SongCard key={song.id} song={song} /> : null
              ))}
            </div>
          ) : (
            searchQuery && ( // Mostrar solo si se realizó una búsqueda
              <p className="text-gray-400 col-span-full text-center py-10">
                No se encontraron resultados para "{searchQuery}".
              </p>
            )
          )}
          {!searchQuery && tracks.length === 0 && ( // Si no hay query y no hay tracks (ej. página /search limpia)
             <p className="text-gray-400 col-span-full text-center py-10">
                Usa la barra de arriba para buscar canciones o artistas.
            </p>
          )}
        </>
      )}
    </div>
  );
}