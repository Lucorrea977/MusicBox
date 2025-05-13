import { createSlice } from '@reduxjs/toolkit';

const songsSlice = createSlice({
  name: 'songs',
  initialState: {
    tracks: [], // Para trending y resultados de búsqueda general
    artistDetails: null, // Para detalles del artista (opcional, si se obtiene por separado)
    artistTracks: [], // Para las canciones de un artista específico
    loading: false,
    error: null,
    // query: '', // Para mantener el término de búsqueda actual (opcional)
  },
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    // Acción genérica para establecer canciones (usada para trending)
    setTracks: (state, action) => {
      state.tracks = action.payload;
      state.loading = false;
      state.error = null;
    },
    // Acción para establecer resultados de búsqueda (podría ser la misma que setTracks)
    setSearchResults: (state, action) => {
      state.tracks = action.payload; // Reemplaza tracks con resultados de búsqueda
      // state.query = action.meta.arg; // Si se pasa el query en la acción
      state.loading = false;
      state.error = null;
    },
    setArtistDetails: (state, action) => {
        state.artistDetails = action.payload;
        // loading se maneja en la acción thunk
    },
    setArtistTracks: (state, action) => {
      state.artistTracks = action.payload;
      state.loading = false; // Asumiendo que loading se resetea aquí
      state.error = null;
    },
    clearArtistData: (state) => {
        state.artistDetails = null;
        state.artistTracks = [];
        state.error = null; // También limpiar errores relacionados con el artista
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    clearSongsError: (state) => {
        state.error = null;
    }
  },
});

export const {
  setLoading,
  setTracks,
  setSearchResults,
  setArtistDetails,
  setArtistTracks,
  clearArtistData,
  setError,
  clearSongsError,
} = songsSlice.actions;
export default songsSlice.reducer;