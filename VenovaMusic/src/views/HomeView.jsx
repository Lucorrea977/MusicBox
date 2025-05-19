// src/views/HomeView.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function HomeView() {
  const navigate = useNavigate();

  const handleEnter = () => {
    navigate('/albums');
  };

  return (
    <div
      className="h-screen flex flex-col items-center justify-center bg-dark-blue px-4"
      style={{ backgroundColor: '#0a0f1c' }}
    >
      {/* Imagen con borde azul y sombra */}
      <div className="relative">
        <img
          src="/image/portada.jpg"
          alt="Logo"
          className="mx-auto rounded-xl border-8 border-blue-700 shadow-lg"
          style={{ maxWidth: '300px', maxHeight: '300px', objectFit: 'contain' }}
        />
      </div>

      {/* Texto motivador */}
      <p className="mt-8 max-w-md text-center text-white text-lg md:text-xl font-semibold drop-shadow-md">
       ¡Venova te conecta con la mejor música: creá tu universo musical y disfrutalo a tu manera!
      </p>

      {/* Botón */}
      <div className="mt-6 flex justify-center w-full">
        <button
          onClick={handleEnter}
          className="
            flex items-center justify-center
            bg-gradient-to-r from-blue-600 via-blue-500 to-blue-700
            text-white text-sm md:text-base font-semibold
            px-6 py-2 rounded-2xl shadow-md shadow-blue-800/60
            transition-transform duration-300 ease-in-out
            hover:scale-105 hover:brightness-110
            focus:outline-none focus:ring-4 focus:ring-blue-400/70
            select-none
            relative
            overflow-hidden
            w-[220px]
            whitespace-nowrap
          "
          aria-label="Entrar a Music Box"
        >
          <span className="drop-shadow-lg relative z-10 flex items-center gap-2">
          Venova Music 
            <svg
              className="w-4 h-4 text-white drop-shadow animate-bounce"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </span>

          {/* Brillo animado */}
          <span className="
            absolute top-0 left-[-50%] w-1/2 h-full
            bg-white opacity-20
            transform -skew-x-12
            animate-slide-brightness
            z-0
          "></span>
        </button>
      </div>

      {/* Estilo para animación de brillo */}
      <style>{`
        @keyframes slide-brightness {
          0% { left: -50%; }
          100% { left: 150%; }
        }
        .animate-slide-brightness {
          animation: slide-brightness 2.5s linear infinite;
        }
      `}</style>
    </div>
  );
}
