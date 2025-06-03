// src/components/Navbar.jsx
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/slice/userSlice';
import { auth } from '../firebase';

const navItems = [
  { label: 'Home', path: '/' },
  { label: 'Albums', path: '/albums' },
  { label: 'Playlists', path: '/playlists' },
];

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const name = useSelector((state) => state.user.name);
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  const handleLogout = async () => {
    await auth.signOut();
    dispatch(logout());
    navigate('/login');
  };

  return (
    <nav className="bg-galaxy py-2 px-4 flex justify-between items-center shadow-lg">
      <div className="flex space-x-4">
        {navItems.map(({ label, path }) => {
          const isActive = location.pathname === path;
          return (
            <button
              key={path}
              onClick={() => navigate(path)}
              className={`
                relative px-4 py-2 rounded-full font-semibold transition-all duration-300
                ${isActive
                  ? 'bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400 text-white shadow-xl'
                  : 'bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 text-gray-300 hover:via-gray-700 hover:to-gray-800'}
                border border-gray-600
                overflow-hidden
              `}
            >
              {label}
              <span className="absolute top-0 left-[-50%] w-1/2 h-full bg-white opacity-10 transform -skew-x-12 transition-transform duration-500 ease-in-out group-hover:left-full"></span>
            </button>
          );
        })}
      </div>

      <div className="flex items-center space-x-4">
        {isAuthenticated && (
          <span className="text-sm text-gray-300 font-semibold">
            Hola, {name}
          </span>
        )}
        <button
          onClick={isAuthenticated ? handleLogout : () => navigate('/login')}
          className="px-4 py-2 text-sm font-medium rounded-full border border-gray-400 text-gray-200 hover:bg-gray-600 transition"
        >
          {isAuthenticated ? 'Logout' : 'Login'}
        </button>
      </div>
    </nav>
  );
}
