import React from 'react';
import { useSelector } from 'react-redux';
import PlaylistManager from '../components/PlaylistManager';

export default function PlaylistsView() {
  const playlists = useSelector((state) => state.playlists.items);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Playlists</h2>
      
      <PlaylistManager />

      <ul className="mt-4 space-y-2">
        {playlists.length === 0 ? (
          <p className="text-gray-500">No playlists found.</p>
        ) : (
          playlists.map((playlist) => (
            <li key={playlist.id} className="border p-4 rounded shadow-sm">
              <h3 className="font-semibold text-lg">{playlist.name}</h3>
              <p className="text-sm text-gray-600">{playlist.songs.length} songs</p>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
