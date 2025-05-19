import { configureStore } from '@reduxjs/toolkit';
import albumsReducer from './slice/albumsSlice';
import playerReducer from './slice/playerSlice';
import likesReducer from './slice/likesSlice';
import playlistsReducer from './slice/playlistsSlice';

export const store = configureStore({
  reducer: {
    albums: albumsReducer,
    player: playerReducer,
    likes: likesReducer,
    playlists: playlistsReducer,
  }
});
