// src/views/AlbumDetailView.jsx
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import SongList from '../components/SongList';

export default function AlbumDetailView() {
  const { albumId } = useParams();
  const navigate = useNavigate();
  const catalog = useSelector(state => state.albums.catalog);

  // Buscar el álbum dentro del catálogo (recuerda que está agrupado por género)
  let album = null;
  for (const genre in catalog) {
    const found = catalog[genre].find(a => a.albumId === albumId);
    if (found) {
      album = found;
      break;
    }
  }

  if (!album) return <div>Álbum no encontrado</div>;

  return (
    <div className="p-4">
      <button onClick={() => navigate(-1)} className="mb-4 text-blue-600 hover:underline">&lt; Volver a álbumes</button>
      <h2 className="text-3xl font-bold mb-2">{album.title}</h2>
      <img src={album.cover} alt={album.title} className="w-64 h-64 object-cover rounded mb-4" />
      <SongList songs={album.songs} />
    </div>
  );
}
