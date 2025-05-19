import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addPlaylist, removePlaylist } from '../redux/slice/playlistsSlice';

export default function PlaylistManager() {
  const dispatch = useDispatch();
  const playlists = useSelector(state => state.playlists.items);
  const [newName, setNewName] = useState('');

  const handleAdd = () => {
    if (newName.trim() === '') return;
    dispatch(addPlaylist({ name: newName.trim() }));
    setNewName('');
  };

  return (
    <div>
      <input
        type="text"
        placeholder="New playlist name"
        value={newName}
        onChange={e => setNewName(e.target.value)}
        className="border p-2 rounded mr-2"
      />
      <button
        onClick={handleAdd}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Add Playlist
      </button>

      <ul className="mt-4 space-y-2">
        {playlists.map(pl => (
          <li key={pl.id} className="flex justify-between items-center border p-2 rounded">
            <span>{pl.name}</span>
            <button
              onClick={() => dispatch(removePlaylist(pl.id))}
              className="text-red-600 font-bold"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
