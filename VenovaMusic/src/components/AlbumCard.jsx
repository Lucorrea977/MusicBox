import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleAlbumLike } from '../redux/slice/likesSlice';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

export default function AlbumCard({ album, onClick }) {
  const dispatch = useDispatch();
  const likedAlbums = useSelector((state) => state.likes.albums);
  const isLiked = likedAlbums.includes(album.albumId);

  const handleLike = (e) => {
    e.stopPropagation(); // Evita que se dispare el click del contenedor
    dispatch(toggleAlbumLike(album.albumId));

    const container = e.currentTarget.closest('.album-card-container');

    const heartClasses = [
      'animate-float-heart-left',
      'animate-float-heart-right',
      'animate-float-heart-up',
      'animate-float-heart-diagonal'
    ];

    const colors = ['#ff69b4', '#ff0000', '#00ffff', '#00ff00', '#ff9900'];

    for (let i = 0; i < 6; i++) {
      const heart = document.createElement('div');
      heart.className = `absolute text-xl pointer-events-none z-50 ${heartClasses[Math.floor(Math.random() * heartClasses.length)]}`;
      heart.style.left = `${e.clientX - container.getBoundingClientRect().left}px`;
      heart.style.top = `${e.clientY - container.getBoundingClientRect().top}px`;
      heart.style.color = colors[i % colors.length];
      heart.innerHTML = '❤️';

      container.appendChild(heart);
      setTimeout(() => heart.remove(), 800);
    }
  };

  return (
    <div
      className="album-card-container relative w-60 bg-galaxy-light border rounded-lg p-3 cursor-pointer hover:shadow-lg transition-all"
      onClick={() => onClick(album)}
    >
      {/* Imagen del álbum */}
      <div className="overflow-hidden rounded-md h-60 w-full">
        <img
          src={album.cover || '/default.jpg'}
          alt={album.title}
          className="h-full w-full object-cover"
        />
      </div>

      {/* Título del álbum */}
      <h3 className="mt-2 font-semibold text-center text-pink drop-shadow-lg">
        {album.title}
      </h3>

      {/* Botón de Like */}
      <div className="flex justify-center mt-2">
        <button
          onClick={handleLike}
          className="text-2xl transition-transform duration-150 hover:scale-110"
        >
          {isLiked ? (
            <FaHeart className="text-red-600 op-shadow" />
          ) : (
            <FaRegHeart className="text-white drop-shadow" />
          )}
        </button>
      </div>
    </div>
  );
}
