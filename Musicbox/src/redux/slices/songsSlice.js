import { createSlice } from '@reduxjs/toolkit';

const songsSlice = createSlice({
  name: 'songs',
  initialState: {
    list: [],
  },
  reducers: {
    setSongs: (state, action) => {
      state.list = action.payload;
    },
  },
});

export const { setSongs } = songsSlice.actions;
export default songsSlice.reducer;
