// src/components/SongList.jsx
import React from 'react';

export default function SongList({ songs }) {
  return (
    <div className="space-y-4">
      {songs.map(song => (
        <div key={song.id} className="border p-4 rounded shadow-md">
          <h4 className="text-lg font-semibold mb-2">{song.title}</h4>

          {song.isVideo ? (
            <video
              controls
              src={song.file}
              className="w-full rounded"
            >
              Tu navegador no soporta el elemento de video.
            </video>
          ) : (
            <audio
              controls
              src={song.file}
              className="w-full"
            >
              Tu navegador no soporta el elemento de audio.
            </audio>
          )}
          <div className="mt-2">
            <a
              href={song.file}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-blue-600 hover:underline"
            >
              Ver en ventana nueva
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}
