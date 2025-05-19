import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleAlbumLike } from '../redux/slice/likesSlice';

export default function AlbumCard({ album, onClick }) {
  const dispatch = useDispatch();
  const likedAlbums = useSelector(state => state.likes.albums);
  const isLiked = likedAlbums.includes(album.albumId);

  return (
    <div className="border rounded p-4 cursor-pointer hover:shadow-lg" onClick={() => onClick(album)}>
      <img src={album.cover} alt={album.title} className="w-full h-48 object-cover rounded" />
      <h3 className="mt-2 font-semibold">{album.title}</h3>
      <button
        onClick={e => {
          e.stopPropagation();
          dispatch(toggleAlbumLike(album.albumId));
        }}
        className={`mt-2 px-3 py-1 rounded ${isLiked ? 'bg-red-500 text-white' : 'bg-gray-300'}`}
      >
        {isLiked ? 'Liked' : 'Like'}
      </button>
    </div>
  );
}
