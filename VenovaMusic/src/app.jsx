import React, { useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { auth } from './firebase';
import { login, logout } from './redux/slice/userSlice';

// Vistas
import HomeView from './views/HomeView';
import LoginView from './views/LoginView';
import RegisterView from './views/RegisterView';
import RecoverView from './views/RecoverPasswordView';
import AlbumsView from './views/AlbumsView';
import AlbumDetailView from './views/AlbumDetailView';
import PlaylistsView from './views/PlaylistsView';

// Componentes
import Navbar from './components/Navbar';
import Player from './components/Player';

function PrivateRoute({ children }) {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const name = useSelector((state) => state.user.name);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user && user.emailVerified) {
        dispatch(
          login({
            name: user.displayName || 'Usuario',
            email: user.email,
          })
        );
      } else {
        dispatch(logout());
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  const hideNavbarRoutes = ['/login', '/register', '/recover'];
  const shouldShowNavbar = !hideNavbarRoutes.includes(location.pathname);

  return (
    <>
      {shouldShowNavbar && <Navbar />}

      <Routes>
        <Route path="/" element={<HomeView />} />
        <Route path="/login" element={<LoginView />} />
        <Route path="/register" element={<RegisterView />} />
        <Route path="/recover" element={<RecoverView />} />

        <Route path="/albums" element={<PrivateRoute><AlbumsView /></PrivateRoute>} />
        <Route path="/albums/:albumId" element={<PrivateRoute><AlbumDetailView /></PrivateRoute>} />
        <Route path="/playlists" element={<PrivateRoute><PlaylistsView /></PrivateRoute>} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {name && <Player />}
    </>
  );
}

export default App;
