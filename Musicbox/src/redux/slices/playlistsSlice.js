import { createSlice } from "@reduxjs/toolkit";

let nextPlaylistId = 1;

const playlistsSlice = createSlice({
  name: "playlists",
  initialState: [],
  reducers: {
    addPlaylist(state, action) {
      state.push({ id: nextPlaylistId++, name: action.payload });
    },
    removePlaylist(state, action) {
      return state.filter(playlist => playlist.id !== action.payload);
    },
  },
});

export const { addPlaylist, removePlaylist } = playlistsSlice.actions;
export default playlistsSlice.reducer;
