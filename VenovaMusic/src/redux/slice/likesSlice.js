import { createSlice } from '@reduxjs/toolkit';

const initialLikes = JSON.parse(localStorage.getItem('likes')) || {
  songs: [],
  albums: []
};

const likesSlice = createSlice({
  name: 'likes',
  initialState: initialLikes,
  reducers: {
    toggleSongLike(state, action) {
      const id = action.payload;
      if (state.songs.includes(id)) {
        state.songs = state.songs.filter(songId => songId !== id);
      } else {
        state.songs.push(id);
      }
      localStorage.setItem('likes', JSON.stringify(state));
    },
    toggleAlbumLike(state, action) {
      const id = action.payload;
      if (state.albums.includes(id)) {
        state.albums = state.albums.filter(albumId => albumId !== id);
      } else {
        state.albums.push(id);
      }
      localStorage.setItem('likes', JSON.stringify(state));
    }
  }
});

export const { toggleSongLike, toggleAlbumLike } = likesSlice.actions;
export default likesSlice.reducer;
