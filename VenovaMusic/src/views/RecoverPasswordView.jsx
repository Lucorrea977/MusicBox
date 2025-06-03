import React, { useState } from 'react';
import { auth } from '../firebase';
import { sendPasswordResetEmail } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

export default function RecoverPasswordView() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRecover = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (!email) {
      return setError('Por favor, ingresá un email.');
    }

    try {
      await sendPasswordResetEmail(auth, email);
      setMessage('✅ Revisa tu correo para restablecer tu contraseña.');
    } catch (err) {
      setError('⚠️ No se pudo enviar el correo. Verificá el email ingresado.');
    }
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-900 text-white px-4">
      <h1 className="text-2xl font-bold mb-6">Recuperar Contraseña</h1>

      <form onSubmit={handleRecover} className="space-y-4 w-full max-w-sm">
        <input
          type="email"
          placeholder="Ingresá tu email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 text-black rounded"
        />

        <button
          type="submit"
          className="w-full bg-blue-500 py-2 rounded hover:bg-blue-600 transition"
        >
          Enviar correo de recuperación
        </button>

        <button
          type="button"
          onClick={() => navigate('/login')}
          className="text-sm text-blue-300 underline w-full text-center mt-2"
        >
          Volver al login
        </button>

        {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
        {message && <p className="text-green-400 text-sm mt-2">{message}</p>}
      </form>
    </div>
  );
}
