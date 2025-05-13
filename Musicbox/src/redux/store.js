import { configureStore } from '@reduxjs/toolkit';
import songsReducer from './reducers/songsReducer';
import playerReducer from './reducers/playerReducer';

const store = configureStore({
  reducer: {
    songs: songsReducer,
    player: playerReducer,
  },
  
});

export default store;