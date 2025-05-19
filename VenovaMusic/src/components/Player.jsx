import React, { useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { togglePlay, setVolume, stop } from '../redux/slice/playerSlice';

export default function Player() {
  const dispatch = useDispatch();
  const { currentSong, isPlaying, volume } = useSelector(state => state.player);
  const audioRef = useRef(null);

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

  if (!currentSong) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-200 p-4 flex items-center space-x-4">
      <button onClick={() => dispatch(togglePlay())}>
        {isPlaying ? '⏸️' : '▶️'}
      </button>

      <div>{currentSong.title}</div>

      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={volume}
        onChange={e => dispatch(setVolume(Number(e.target.value)))}
        className="w-24"
      />

      <button onClick={() => dispatch(stop())}>⏹️</button>

      <audio ref={audioRef} src={currentSong.file} />
    </div>
  );
}
