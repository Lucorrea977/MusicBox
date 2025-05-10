import { createSlice } from "@reduxjs/toolkit";

const initialSongs = [
  { id: 1, title: "Canción 1", artist: "Artista A", url: "#" },
  { id: 2, title: "Canción 2", artist: "Artista B", url: "#" },
];

const songsSlice = createSlice({
  name: "songs",
  initialState: {
    list: initialSongs,
    allSongs: initialSongs,
  },
  reducers: {
    setSongs(state, action) {
      state.list = action.payload;
      state.allSongs = action.payload;
    },
    searchSongs(state, action) {
      const query = action.payload.toLowerCase();
      state.list = state.allSongs.filter(song =>
        song.title.toLowerCase().includes(query) ||
        song.artist.toLowerCase().includes(query)
      );
    },
  },
});

export const { setSongs, searchSongs } = songsSlice.actions;
export default songsSlice.reducer;
