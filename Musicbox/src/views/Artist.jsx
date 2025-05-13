import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// Corregir la importación aquí:
import { fetchArtistData } from '../redux/actions/songsActions'; // Importar la acción correcta
import SongCard from '../components/SongCard';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import { HiLocationMarker, HiOutlineInformationCircle } from 'react-icons/hi';

export default function Artist() {
  const { handle } = useParams();
  const dispatch = useDispatch();

  const { artistDetails, artistTracks, loading, error } = useSelector((state) => state.songs);

  useEffect(() => {
    if (handle) {
      if (!artistDetails || artistDetails.handle !== handle) {
          // Usar la acción importada correcta
          dispatch(fetchArtistData(handle));
      }
    }
  }, [dispatch, handle, artistDetails]);

  const handleRetry = () => {
    if (handle) {
      // Usar la acción importada correcta
      dispatch(fetchArtistData(handle));
    }
  };

  // ... (resto del código del componente Artist.jsx sin cambios) ...
  // --- Copiar el resto del componente Artist.jsx desde la respuesta anterior ---

    if (loading && !artistDetails) return <LoadingSpinner size="lg" />;
    if (error && !loading) return <ErrorMessage message={error} onRetry={handleRetry} />;
    if (!artistDetails && !loading && !error) {
        return (
        <div className="text-center py-10">
            <HiOutlineInformationCircle className="text-5xl text-gray-500 mx-auto mb-4" />
            <p className="text-xl text-gray-400">No se encontró información del artista.</p>
        </div>
        );
    }

    // Usar datos de artistDetails si existen
    const profilePic = artistDetails?.profile_picture?.['480x480'] || `https://via.placeholder.com/150?text=${encodeURIComponent(artistDetails?.name?.[0] || 'A')}`;
    const coverPhoto = artistDetails?.cover_photo?.['2000x'] || null;
    const artistName = artistDetails?.name || handle || 'Artista';
    const artistLocation = artistDetails?.location || '';
    const artistBio = artistDetails?.bio || '';
    const followers = artistDetails?.follower_count || 0;

    return (
        <div className="text-white">
        {/* Encabezado del Artista con Foto de Portada */}
        <div className="relative h-48 md:h-64 bg-gray-800">
            {coverPhoto && (
            <img
                src={coverPhoto}
                alt={`${artistName} foto de portada`}
                className="w-full h-full object-cover opacity-50"
            />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70"></div>
        </div>

        <div className="container mx-auto px-4 md:px-6 -mt-20 md:-mt-24 relative z-10">
            <div className="flex flex-col md:flex-row items-center md:items-end gap-4 md:gap-6 mb-8">
            <img
                src={profilePic}
                alt={`${artistName} perfil`}
                className="rounded-full w-32 h-32 md:w-40 md:h-40 object-cover shadow-xl border-4 border-gray-800 bg-gray-700"
            />
            <div className="text-center md:text-left pt-4">
                <h1 className="text-3xl md:text-4xl font-bold break-words">{artistName}</h1>
                {artistLocation && (
                <p className="text-gray-400 mt-1 flex items-center justify-center md:justify-start">
                    <HiLocationMarker className="mr-1" /> {artistLocation}
                </p>
                )}
                <p className="text-sm text-gray-500 mt-1">{followers.toLocaleString()} seguidores</p>
            </div>
            </div>

            {/* Biografía del Artista */}
            {artistBio && (
            <div className="mb-8 p-4 bg-white bg-opacity-5 rounded-lg shadow">
                <h2 className="text-xl font-semibold mb-2">Biografía</h2>
                <p className="text-gray-300 whitespace-pre-wrap text-sm leading-relaxed">{artistBio}</p>
            </div>
            )}

            {/* Canciones del Artista */}
            <h2 className="text-2xl font-bold mb-4">Canciones Populares</h2>
            {loading && artistTracks.length === 0 && <LoadingSpinner />} {/* Mostrar spinner si carga inicial de tracks */}
            {!loading && artistTracks.length === 0 && !error && (
            <p className="text-gray-400">No se encontraron canciones para este artista.</p>
            )}

            {artistTracks.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                {artistTracks.map((track) => (
                track && track.id ? <SongCard key={track.id} song={track} /> : null
                ))}
            </div>
            )}
            {loading && artistTracks.length > 0 && <p className="text-center text-gray-400 mt-4">Cargando más canciones...</p>}
        </div>
        </div>
    );
}