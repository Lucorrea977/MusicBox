import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="bg-gray-800 text-white p-4 flex space-x-6">
      <NavLink
        to="/albums"
        className={({ isActive }) => isActive ? 'underline' : ''}
      >
        Albums
      </NavLink>
      <NavLink
        to="/playlists"
        className={({ isActive }) => isActive ? 'underline' : ''}
      >
        Playlists
      </NavLink>
      <NavLink
        to="/"
        className={({ isActive }) => isActive ? 'underline' : ''}
      >
        Home
      </NavLink>
    </nav>
  );
}
