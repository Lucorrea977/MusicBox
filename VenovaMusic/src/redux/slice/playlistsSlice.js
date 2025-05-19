import { createSlice } from '@reduxjs/toolkit';

const initialPlaylists = JSON.parse(localStorage.getItem('playlists')) || [];

const playlistsSlice = createSlice({
  name: 'playlists',
  initialState: initialPlaylists,
  reducers: {
    addPlaylist(state, action) {
      state.push({ id: Date.now().toString(), name: action.payload, songs: [] });
      localStorage.setItem('playlists', JSON.stringify(state));
    },
    removePlaylist(state, action) {
      const newState = state.filter(pl => pl.id !== action.payload);
      localStorage.setItem('playlists', JSON.stringify(newState));
      return newState;
    },
    addSongToPlaylist(state, action) {
      const { playlistId, song } = action.payload;
      const playlist = state.find(pl => pl.id === playlistId);
      if (playlist && !playlist.songs.find(s => s.id === song.id)) {
        playlist.songs.push(song);
      }
      localStorage.setItem('playlists', JSON.stringify(state));
    },
    removeSongFromPlaylist(state, action) {
      const { playlistId, songId } = action.payload;
      const playlist = state.find(pl => pl.id === playlistId);
      if (playlist) {
        playlist.songs = playlist.songs.filter(s => s.id !== songId);
      }
      localStorage.setItem('playlists', JSON.stringify(state));
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
