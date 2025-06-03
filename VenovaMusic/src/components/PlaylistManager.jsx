import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addPlaylist, removePlaylist } from '../redux/slice/playlistsSlice';

export default function PlaylistManager() {
  const dispatch = useDispatch();
  const playlists = useSelector((state) => state.playlists.items);
  const [newPlaylistName, setNewPlaylistName] = useState('');

  const handleAddPlaylist = () => {
    const trimmedName = newPlaylistName.trim();
    if (!trimmedName) return;

    dispatch(addPlaylist({ name: trimmedName }));
    setNewPlaylistName('');
  };

  const handleRemovePlaylist = (id) => {
    dispatch(removePlaylist(id));
  };

  return (
    <div className="p-6 max-w-xl mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">
        Playlist Manager
      </h2>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={newPlaylistName}
          onChange={(e) => setNewPlaylistName(e.target.value)}
          placeholder="New playlist name"
          className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100"
        />
        <button
          onClick={handleAddPlaylist}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Add
        </button>
      </div>

      {Array.isArray(playlists) && playlists.length > 0 ? (
        <ul className="space-y-3">
          {playlists.map((playlist) => (
            <li
              key={playlist.id}
              className="flex justify-between items-center p-3 bg-gray-100 dark:bg-gray-700 rounded-md shadow-sm"
            >
              <span className="text-gray-800 dark:text-gray-200">{playlist.name}</span>
              <button
                onClick={() => handleRemovePlaylist(playlist.id)}
                className="text-red-600 font-semibold hover:underline"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 dark:text-gray-400 text-center">
          No playlists yet. Add one above!
        </p>
      )}
    </div>
  );
}
