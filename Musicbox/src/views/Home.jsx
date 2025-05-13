import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSongs } from '../redux/actions/songsActions';
import SongCard from '../components/SongCard';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

export default function Home() {
  const dispatch = useDispatch();
  const { tracks, loading, error } = useSelector((state) => state.songs);

  useEffect(() => {
    // Obtener canciones populares al montar el componente
    // Solo si no hay canciones ya cargadas (optimización opcional)
    if (tracks.length === 0 && !loading) {
      dispatch(fetchSongs());
    }
  }, [dispatch, tracks.length, loading]);

  const handleRetry = () => {
    dispatch(fetchSongs());
  }

  return (
    <div className="p-4 md:p-6">
      <h1 className="text-2xl md:text-3xl font-bold text-white mb-6">
        Tendencias
      </h1>

      {loading && <LoadingSpinner />}
      {error && !loading && <ErrorMessage message={error} onRetry={handleRetry} />}

      {!loading && !error && (
        <>
          {tracks.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {tracks.map((song) => (
                song && song.id ? <SongCard key={song.id} song={song} /> : null
              ))}
            </div>
          ) : (
            <p className="text-gray-400 col-span-full text-center py-10">
              No hay canciones populares en este momento. Intenta más tarde.
            </p>
          )}
        </>
      )}
    </div>
  );
}