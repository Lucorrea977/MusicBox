import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCatalog } from '../redux/slice/albumsSlice';
import AlbumCard from '../components/AlbumCard';
import SongList from '../components/SongList';

export default function AlbumsView() {
  const dispatch = useDispatch();
  const { catalog, loading, error } = useSelector((state) => state.albums);
  const [selectedAlbum, setSelectedAlbum] = useState(null);

  useEffect(() => {
    dispatch(fetchCatalog());
  }, [dispatch]);

  if (loading) return <div className="p-4 text-gray-600">Cargando catálogo...</div>;
  if (error) return <div className="p-4 text-red-500">Error: {error}</div>;

  const albums = Object.values(catalog).flat();

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">Catálogo de Álbumes</h1>

      {!selectedAlbum ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {albums.map((album) => (
            <AlbumCard
              key={album.albumId}
              album={album}
              onClick={setSelectedAlbum}
            />
          ))}
        </div>
      ) : (
        <div>
          <button
            onClick={() => setSelectedAlbum(null)}
            className="mb-4 text-blue-600 hover:underline"
          >
            ← Volver al catálogo
          </button>

          <h2 className="text-xl font-semibold mb-3">
            {selectedAlbum.title}
          </h2>

          <SongList songs={selectedAlbum.songs} />
        </div>
      )}
    </div>
  );
}
