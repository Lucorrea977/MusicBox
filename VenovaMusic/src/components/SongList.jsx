import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSong } from '../redux/slice/playerSlice';
import { toggleSongLike } from '../redux/slice/likesSlice';

export default function SongList({ songs }) {
  const dispatch = useDispatch();
  const likedSongs = useSelector(state => state.likes.songs);

  return (
    <div>
      {songs.map(song => {
        const isLiked = likedSongs.includes(song.id);
        return (
          <div key={song.id} className="flex items-center justify-between p-2 border-b hover:bg-gray-100">
            <div className="flex-1 cursor-pointer" onClick={() => dispatch(setSong(song))}>
              {song.title}
            </div>
            <button
              onClick={() => dispatch(toggleSongLike(song.id))}
              className={`px-2 py-1 rounded ${isLiked ? 'bg-red-500 text-white' : 'bg-gray-300'}`}
            >
              {isLiked ? '♥' : '♡'}
            </button>
            <a href={song.file} download className="ml-2 text-blue-600 hover:underline">
              Descargar
            </a>
          </div>
        );
      })}
    </div>
  );
}
