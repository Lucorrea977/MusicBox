import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchCatalog = createAsyncThunk('albums/fetchCatalog', async () => {
  const res = await fetch('/catalog.json');
  const data = await res.json();
  return data;
});

const albumsSlice = createSlice({
  name: 'albums',
  initialState: {
    catalog: {},
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCatalog.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCatalog.fulfilled, (state, action) => {
        state.loading = false;
        state.catalog = action.payload;
      })
      .addCase(fetchCatalog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export default albumsSlice.reducer;
