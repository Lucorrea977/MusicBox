import { configureStore } from '@reduxjs/toolkit';
import songsReducer from './slices/songsSlice';
import favoritesReducer from './slices/favoritesSlice';
import settingsReducer from './slices/settingsSlice';

export const store = configureStore({
  reducer: {
    songs: songsReducer,
    favorites: favoritesReducer,
    settings: settingsReducer,
  },
});

export default store;
