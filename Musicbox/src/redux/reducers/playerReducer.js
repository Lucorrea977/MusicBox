import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentSong: null,
  isPlaying: false,
  currentStreamUrl: null,
  currentTime: 0,
  duration: 0,
  volume: 0.5, // Volumen por defecto (0 a 1)
  isMuted: false,
  error: null,
};

const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    setSongInternal: (state, action) => {
      // Si es una nueva canción, resetea y marca para reproducir
      if (state.currentSong?.id !== action.payload.song.id) {
        state.currentSong = action.payload.song;
        state.isPlaying = action.payload.autoPlay; // Controlar si debe auto-reproducir
        state.currentTime = 0;
        state.duration = 0;
        state.currentStreamUrl = null; // Limpiar URL vieja, se obtendrá una nueva
        state.error = null;
      } else { // Si es la misma canción, simplemente alterna el estado de reproducción
        state.isPlaying = !state.isPlaying;
      }
    },
    setStreamUrl: (state, action) => {
      state.currentStreamUrl = action.payload;
      state.isPlaying = true; // Asumir reproducción al obtener URL
      state.error = null;
    },
    setStreamError: (state, action) => {
      state.error = action.payload;
      state.isPlaying = false;
      state.currentStreamUrl = null; // Limpiar URL si hay error
    },
    playAudio: (state) => {
      if (state.currentSong && state.currentStreamUrl) {
        state.isPlaying = true;
      }
    },
    pauseAudio: (state) => {
      state.isPlaying = false;
    },
    updatePlaybackProgress: (state, action) => {
      state.currentTime = action.payload.currentTime;
      if (action.payload.duration && !isNaN(action.payload.duration)) {
          state.duration = action.payload.duration;
      }
    },
    setVolume: (state, action) => {
      state.volume = Math.max(0, Math.min(1, action.payload)); // Asegurar que esté entre 0 y 1
      if (state.volume > 0 && state.isMuted) {
          state.isMuted = false; // Desmutear si se sube el volumen
      }
    },
    toggleMute: (state) => {
        state.isMuted = !state.isMuted;
    },
    clearPlayerError: (state) => {
        state.error = null;
    }
  },
});

export const {
  setSongInternal,
  setStreamUrl,
  setStreamError,
  playAudio,
  pauseAudio,
  updatePlaybackProgress,
  setVolume,
  toggleMute,
  clearPlayerError
} = playerSlice.actions;
export default playerSlice.reducer;