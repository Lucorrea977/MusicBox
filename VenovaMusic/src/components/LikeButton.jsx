import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleLike } from '../redux/likesSlice';

export default function LikeButton({ songId }) {
  const dispatch = useDispatch();
  const likedSongs = useSelector(state => state.likes.likedSongs);
  const isLiked = likedSongs.includes(songId);

  return (
    <button
      onClick={() => dispatch(toggleLike(songId))}
      className={`text-xl ${isLiked ? 'text-red-500' : 'text-gray-500'}`}
      aria-label={isLiked ? 'Unlike' : 'Like'}
    >
      {isLiked ? '❤️' : '🤍'}
    </button>
  );
}
