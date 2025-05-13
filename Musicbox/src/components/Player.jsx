import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FaPlay, FaPause, FaStepBackward, FaStepForward, FaVolumeUp, FaVolumeMute } from 'react-icons/fa';
import { selectSong, stopSong, updateProgress, playNextSongInList, playPreviousSongInList } from '../redux/actions/playerActions'; // Asegúrate que estas acciones existan

const Player = () => {
  const dispatch = useDispatch();
  const { currentSong, isPlaying, currentStreamUrl, currentTime, duration, volume, isMuted, error } = useSelector((state) => state.player);
  const { tracks } = useSelector(state => state.songs); // Para Lógica Next/Prev
  const audioRef = useRef(null);
  const previousVolumeRef = useRef(volume); // Para restaurar volumen después de desmutear

  // Efecto para controlar reproducción de audio
  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying && currentStreamUrl) {
        if (audioRef.current.src !== currentStreamUrl) {
          audioRef.current.src = currentStreamUrl;
        }
        audioRef.current.play().catch(e => console.error("Error al reproducir audio:", e));
      } else {
        audioRef.current.pause();
      }
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [isPlaying, currentStreamUrl, volume, isMuted]);

  // Efecto para sincronizar currentTime de Redux con el audio (si hay un gran desfase)
  useEffect(() => {
    if (audioRef.current && Math.abs(audioRef.current.currentTime - currentTime) > 1.5) {
      audioRef.current.currentTime = currentTime;
    }
  }, [currentTime]);


  const handlePlayPause = () => {
    if (!currentSong) return;
    if (currentSong && !currentStreamUrl && !error) { // Si hay canción pero no URL (y no hubo error previo)
      dispatch(selectSong(currentSong)); // re-seleccionar para intentar obtener URL
    } else if (currentSong && currentStreamUrl) {
      if (isPlaying) {
        dispatch(stopSong());
      } else {
        // Dispatch una acción para reanudar (podría ser parte de selectSong o una nueva)
        dispatch({ type: 'player/playAudio' }); // Asumiendo que playAudio solo cambia isPlaying
      }
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      dispatch(updateProgress({
        currentTime: audioRef.current.currentTime,
        duration: audioRef.current.duration || 0
      }));
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      dispatch(updateProgress({
        currentTime: audioRef.current.currentTime,
        duration: audioRef.current.duration || 0
      }));
    }
  };

  const handleSongEnd = () => {
    console.log("Canción terminada, reproduciendo siguiente...");
    dispatch(playNextSongInList(tracks, currentSong?.id));
  };

  const handleSeek = (event) => {
    if (audioRef.current && currentSong) {
      const newTime = parseFloat(event.target.value);
      audioRef.current.currentTime = newTime;
      dispatch(updateProgress({ currentTime: newTime, duration }));
    }
  };

  const handleVolumeChange = (event) => {
    const newVolume = parseFloat(event.target.value);
    dispatch({ type: 'player/setVolume', payload: newVolume });
    if (isMuted && newVolume > 0) {
      dispatch({ type: 'player/toggleMute' }); // Desmutear si se sube el volumen
    }
  };

  const handleToggleMute = () => {
    dispatch({ type: 'player/toggleMute' });
    if (!isMuted) { // Si se va a mutear
      previousVolumeRef.current = volume; // Guardar volumen actual
      dispatch({ type: 'player/setVolume', payload: 0 });
    } else { // Si se va a desmutear
      dispatch({ type: 'player/setVolume', payload: previousVolumeRef.current > 0 ? previousVolumeRef.current : 0.5 });
    }
  };

  const handlePrevious = () => {
    dispatch(playPreviousSongInList(tracks, currentSong?.id));
  };
  const handleNext = () => {
    dispatch(playNextSongInList(tracks, currentSong?.id));
  };


  const formatTime = (time) => {
    if (isNaN(time) || time === 0 || !isFinite(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  if (!currentSong && !error) return null; // No mostrar reproductor si no hay canción seleccionada (y no hay error)
  if (error && !currentSong) { // Mostrar error si no hay canción pero sí hubo un error de carga
    return (
      <div className="fixed bottom-0 left-0 right-0 z-30 bg-red-800 bg-opacity-90 text-white p-3 shadow-lg border-t border-red-600 text-center">
        Error al cargar la canción: {error}
      </div>
    );
  }

  const artworkUrl = currentSong?.artwork?.['150x150'] || `https://via.placeholder.com/150?text=${encodeURIComponent(currentSong?.title || 'N/A')}`;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 bg-black bg-opacity-80 backdrop-blur-lg text-white p-3 shadow-lg border-t border-gray-700">
      <div className="container mx-auto flex items-center justify-between gap-3 md:gap-4">
        {/* Info Canción */}
        <div className="flex items-center gap-3 flex-shrink min-w-0 w-1/4 md:w-1/3">
          <img src={artworkUrl} alt={currentSong?.title} className="w-10 h-10 md:w-12 md:h-12 rounded object-cover" />
          <div className="flex-grow min-w-0">
            <p className="text-xs sm:text-sm font-semibold truncate" title={currentSong?.title}>
              {currentSong?.title || 'Título Desconocido'}
            </p>
            <p className="text-xs text-gray-400 truncate" title={currentSong?.user?.name}>
              {currentSong?.user?.name || 'Artista Desconocido'}
            </p>
          </div>
        </div>

        {/* Controles y Progreso */}
        <div className="flex flex-col items-center justify-center flex-grow w-1/2 md:w-1/3 max-w-xl">
          <div className="flex items-center gap-3 sm:gap-4 mb-1">
            <button onClick={handlePrevious} className="text-gray-400 hover:text-white transition-colors text-sm sm:text-lg disabled:opacity-50" aria-label="Anterior" disabled={!tracks || tracks.length <= 1}>
              <FaStepBackward />
            </button>
            <button
              onClick={handlePlayPause}
              className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center bg-purple-600 hover:bg-purple-700 rounded-full text-white shadow-md transition-colors text-lg"
              aria-label={isPlaying ? 'Pausar' : 'Reproducir'}
              disabled={!currentStreamUrl && !!error} // Deshabilitar si hay error y no hay URL
            >
              {isPlaying ? <FaPause /> : <FaPlay className="ml-0.5" />}
            </button>
            <button onClick={handleNext} className="text-gray-400 hover:text-white transition-colors text-sm sm:text-lg disabled:opacity-50" aria-label="Siguiente" disabled={!tracks || tracks.length <= 1}>
              <FaStepForward />
            </button>
          </div>
          <div className="flex items-center w-full gap-2 text-xs">
            <span className="w-8 text-right tabular-nums">{formatTime(currentTime)}</span>
            <input
              type="range"
              min="0"
              max={duration || 0}
              value={currentTime || 0}
              onChange={handleSeek}
              className="w-full h-1.5 bg-gray-600 rounded-lg appearance-none cursor-pointer accent-purple-500"
              disabled={!currentStreamUrl}
            />
            <span className="w-8 text-left tabular-nums">{formatTime(duration)}</span>
          </div>
        </div>

        {/* Controles de Volumen */}
        <div className="hidden sm:flex items-center gap-2 w-1/4 md:w-1/3 justify-end">
          <button onClick={handleToggleMute} className="text-gray-400 hover:text-white transition-colors text-lg">
            {isMuted || volume === 0 ? <FaVolumeMute /> : <FaVolumeUp />}
          </button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={isMuted ? 0 : volume}
            onChange={handleVolumeChange}
            className="w-16 md:w-20 h-1.5 bg-gray-600 rounded-lg appearance-none cursor-pointer accent-purple-500"
            aria-label="Control de volumen"
          />
        </div>
      </div>
      {error && currentSong && (
        <p className="text-red-400 text-xs text-center mt-1">Error: {error}. Intentando cargar de nuevo...</p>
      )}
      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleSongEnd}
        onError={(e) => {
          console.error("Error en elemento Audio:", e);
          // Intentar re-obtener la URL si hay un error de red o decodificación
          if (currentSong && (e.target.error.code === MediaError.MEDIA_ERR_NETWORK || e.target.error.code === MediaError.MEDIA_ERR_DECODE)) {
            dispatch(selectSong(currentSong)); // Esto re-intentará fetchStreamUrl
          } else {
            dispatch({ type: 'player/setStreamError', payload: `Error de audio (cód: ${e.target.error.code})`});
          }
        }}
        onStalled={() => console.warn("Audio 'stalled': Problema de red o buffer.")}
        crossOrigin="anonymous" // Necesario si la API de Audius lo requiere para algunas fuentes
      />
    </div>
  );
};

export default Player;