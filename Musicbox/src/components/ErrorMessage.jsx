import React from 'react';
import { HiExclamationCircle } from 'react-icons/hi';

const ErrorMessage = ({ message, onRetry }) => (
  <div className="p-4 my-4 bg-red-800 bg-opacity-30 text-red-200 border border-red-700 rounded-lg text-center flex flex-col items-center gap-2">
    <HiExclamationCircle className="text-3xl text-red-400" />
    <p className="font-semibold">¡Ups! Algo salió mal.</p>
    <p className="text-sm">{message || 'Ocurrió un error desconocido.'}</p>
    {onRetry && (
      <button
        onClick={onRetry}
        className="mt-2 px-4 py-1 bg-purple-600 hover:bg-purple-700 text-white text-sm rounded-md transition-colors"
      >
        Reintentar
      </button>
    )}
  </div>
);

export default ErrorMessage;