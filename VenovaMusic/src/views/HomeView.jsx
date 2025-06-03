import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function HomeView() {
  const navigate = useNavigate();

  const handleEnter = () => {
    navigate('/albums');
  };

  return (
    <div className="relative h-screen flex flex-col items-center justify-center px-4 overflow-hidden text-white">
      {/* Fondo galáctico degradado con más colores */}
      <div
        className="absolute inset-0 z-0 animate-gradient-flow bg-[length:300%_300%]"
        style={{
          background: 'linear-gradient(135deg, #0a0f1c, #4f3d83, #9e4edb, #58f6c1, #f98bc0)',
        }}
      ></div>

      {/* Capa de estrellas sutil */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="w-full h-full bg-transparent animate-twinkle"></div>
      </div>

      {/* Contenido */}
      <div className="z-10 flex flex-col items-center">
        <div className="relative">
          <img
            src="/image/portada.jpg"
            alt="Logo"
            className="mx-auto rounded-xl border-8 border-pink-400 shadow-2xl"
            style={{ maxWidth: '280x', maxHeight: '280px', objectFit: 'contain' }}
          />
        </div>

        {/* Texto legible con sombra intensa */}
        <p className="mt-9 max-w-md text-center text-lg md:text-xl font-semibold drop-shadow-[0_2px_6px_rgba(0,0,0,0.5)]">
          ¡Venova te conecta con la mejor música: creá tu universo musical y disfrutalo a tu manera!
        </p>

        <div className="mt-6 flex justify-center w-full">
          <button
            onClick={handleEnter}
            className="
              flex items-center justify-center
              bg-gradient-to-r from-pink-800 via-purple-700 to-cyan-700
              text-white text-sm md:text-base font-semibold
              px-6 py-2 rounded-2xl shadow-lg
              transition-transform duration-300 ease-in-out
              hover:scale-105 hover:brightness-110
              focus:outline-none focus:ring-4 focus:ring-purple-600/70
              relative overflow-hidden w-[220px]
              whitespace-nowrap
            "
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

            <span className="absolute top-0 left-[-50%] w-1/2 h-full bg-white opacity-20 transform -skew-x-12 animate-slide-brightness z-0"></span>
          </button>
        </div>
      </div>
    </div>
  );
}
