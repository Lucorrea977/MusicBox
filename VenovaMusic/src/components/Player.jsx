import React, { useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { togglePlay, setVolume, stop } from '../redux/slice/playerSlice';

export default function Player() {
  const dispatch = useDispatch();
  const { currentSong, isPlaying, volume } = useSelector((state) => state.player);
  const audioRef = useRef(null);

  // Control de reproducción y volumen cuando cambian los estados
  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
      audioRef.current.volume = volume;
    }
  }, [isPlaying, currentSong, volume]);

  // Si no hay canción, no renderiza el reproductor
  if (!currentSong) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-200 dark:bg-gray-800 p-4 flex items-center justify-between space-x-4 shadow-md z-50">
      {/* Botón de play/pausa */}
      <button
        onClick={() => dispatch(togglePlay())}
        className="text-2xl focus:outline-none"
      >
        {isPlaying ? '⏸️' : '▶️'}
      </button>

      {/* Título de la canción actual */}
      <div className="flex-1 text-center text-gray-800 dark:text-gray-100 font-medium">
        {currentSong.title}
      </div>

      {/* Control de volumen */}
      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={volume}
        onChange={(e) => dispatch(setVolume(Number(e.target.value)))}
        className="w-24 accent-blue-600"
      />

      {/* Botón de stop */}
      <button
        onClick={() => dispatch(stop())}
        className="text-xl focus:outline-none text-red-500"
      >
        ⏹️
      </button>

      {/* Elemento de audio */}
      <audio ref={audioRef} src={currentSong.file} />
    </div>
  );
}
