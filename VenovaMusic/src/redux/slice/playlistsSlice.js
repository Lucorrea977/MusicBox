import { createSlice } from '@reduxjs/toolkit';

// Aseguramos que el estado sea un objeto con una propiedad `items`
const storedPlaylists = JSON.parse(localStorage.getItem('playlists'));

const initialState = {
  items: Array.isArray(storedPlaylists) ? storedPlaylists : []
};

const playlistsSlice = createSlice({
  name: 'playlists',
  initialState,
  reducers: {
    addPlaylist(state, action) {
      const newPlaylist = {
        id: Date.now().toString(),
        name: action.payload.name,
        songs: []
      };
      state.items.push(newPlaylist);
      localStorage.setItem('playlists', JSON.stringify(state.items));
    },

    removePlaylist(state, action) {
      state.items = state.items.filter(pl => pl.id !== action.payload);
      localStorage.setItem('playlists', JSON.stringify(state.items));
    },

    addSongToPlaylist(state, action) {
      const { playlistId, song } = action.payload;
      const playlist = state.items.find(pl => pl.id === playlistId);
      if (playlist && !playlist.songs.find(s => s.id === song.id)) {
        playlist.songs.push(song);
      }
      localStorage.setItem('playlists', JSON.stringify(state.items));
    },

    removeSongFromPlaylist(state, action) {
      const { playlistId, songId } = action.payload;
      const playlist = state.items.find(pl => pl.id === playlistId);
      if (playlist) {
        playlist.songs = playlist.songs.filter(s => s.id !== songId);
      }
      localStorage.setItem('playlists', JSON.stringify(state.items));
    }
  }
});

export const {
  addPlaylist,
  removePlaylist,
  addSongToPlaylist,
  removeSongFromPlaylist
} = playlistsSlice.actions;

export default playlistsSlice.reducer;
