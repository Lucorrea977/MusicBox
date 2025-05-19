// src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomeView from './views/HomeView';
import AlbumsView from './views/AlbumsView';
import AlbumDetailView from './views/AlbumDetailView';
import PlaylistsView from './views/PlaylistsView';
import Player from './components/Player';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomeView />} />
        <Route path="/albums" element={<><Navbar /><AlbumsView /></>} />
        <Route path="/albums/:albumId" element={<><Navbar /><AlbumDetailView /></>} />
        <Route path="/playlists" element={<><Navbar /><PlaylistsView /></>} />
      </Routes>
      <Player />
    </>
  );
}

export default App;
