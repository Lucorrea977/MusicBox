import { createSlice } from '@reduxjs/toolkit';

const playerSlice = createSlice({
  name: 'player',
  initialState: {
    currentSong: null,
    isPlaying: false,
    volume: 1,
  },
  reducers: {
    setSong(state, action) {
      state.currentSong = action.payload;
      state.isPlaying = true;
    },
    togglePlay(state) {
      state.isPlaying = !state.isPlaying;
    },
    setVolume(state, action) {
      state.volume = action.payload;
    },
    stop(state) {
      state.isPlaying = false;
      state.currentSong = null;
    }
  }
});

export const { setSong, togglePlay, setVolume, stop } = playerSlice.actions;
export default playerSlice.reducer;
