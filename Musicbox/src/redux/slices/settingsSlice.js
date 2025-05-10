import { createSlice } from '@reduxjs/toolkit';

const settingsSlice = createSlice({
  name: 'settings',
  initialState: {
    theme: 'dark', // opciones: dark, light, soft
    color: '#1e90ff', // azul por defecto
  },
  reducers: {
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
    setColor: (state, action) => {
      state.color = action.payload;
    },
  },
});

export const { setTheme, setColor } = settingsSlice.actions;
export default settingsSlice.reducer;
