import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectSong } from '../redux/actions/playerActions';
import { FaPlay, FaPause } from 'react-icons/fa';

export default function SongCard({ song }) {
  const dispatch = useDispatch();
  const { currentSong, isPlaying } = useSelector((state) => state.player);

  if (!song || !song.id || !song.artwork || !song.user) {
    // console.warn("SongCard: Datos de canción incompletos:", song);
    return null; // No renderizar si faltan datos esenciales
  }

  const isCurrentPlayingSong = currentSong?.id === song.id && isPlaying;

  const handlePlayPause = (e) => {
    e.stopPropagation(); // Prevenir que el clic se propague al div principal
    dispatch(selectSong(song)); // selectSong maneja la lógica de play/pause
  };

  const artworkUrl = song.artwork?.['150x150'] || `https://via.placeholder.com/150?text=${encodeURIComponent(song.title || 'N/A')}`;
  const artistLink = song.user?.handle ? `/artist/${song.user.handle}` : '#';
  const artistName = song.user?.name || 'Artista Desconocido';
  const songTitle = song.title || 'Título Desconocido';

  return (
    <div
      className="relative group bg-white bg-opacity-5 backdrop-filter backdrop-blur-sm p-3 rounded-lg shadow-lg hover:bg-opacity-10 transition-all duration-300 cursor-pointer overflow-hidden"
      onClick={handlePlayPause} // Clic en la tarjeta también reproduce/pausa
      title={`Reproducir ${songTitle}`}
    >
      <div className="aspect-square mb-3 relative">
        <img
          src={artworkUrl}
          alt={songTitle}
          className="w-full h-full object-cover rounded-md shadow-md"
          loading="lazy"
        />
        {/* Botón de play/pausa superpuesto, visible al hacer hover */}
        <button
          onClick={handlePlayPause}
          aria-label={isCurrentPlayingSong ? `Pausar ${songTitle}` : `Reproducir ${songTitle}`}
          className="absolute inset-0 flex items-center justify-center w-full h-full bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 focus:outline-none"
        >
          {isCurrentPlayingSong ? (
            <FaPause className="text-white text-3xl drop-shadow-lg" />
          ) : (
            <FaPlay className="text-white text-3xl drop-shadow-lg" />
          )}
        </button>
      </div>

      <div className="min-h-[50px]"> {/* Altura fija para área de texto */}
        <h3 className="text-white font-semibold text-sm truncate" title={songTitle}>
          {songTitle}
        </h3>
        <Link
          to={artistLink}
          onClick={(e) => e.stopPropagation()} // Prevenir que el clic en el artista active la reproducción de la tarjeta
          className={`text-gray-400 text-xs hover:text-purple-300 hover:underline truncate transition-colors ${!song.user?.handle ? 'pointer-events-none' : ''}`}
          title={artistName}
        >
          {artistName}
        </Link>
      </div>
    </div>
  );
}