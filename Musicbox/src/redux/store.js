import { configureStore } from "@reduxjs/toolkit";
import songsReducer from "./slices/songsSlice";
import favoritesReducer from "./slices/favoritesSlice";
import settingsReducer from "./slices/settingsSlice";
import playlistsReducer from "./slices/playlistsSlice";

const store = configureStore({
  reducer: {
    songs: songsReducer,
    favorites: favoritesReducer,
    settings: settingsReducer,
    playlists: playlistsReducer,
  },
});

export default store;
