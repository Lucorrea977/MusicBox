import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { login } from '../redux/slice/userSlice';

export default function LoginView() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await signInWithEmailAndPassword(auth, form.email, form.password);

      if (!res.user.emailVerified) {
        return setError('Tu email no está verificado. Revisa tu bandeja de entrada.');
      }

      dispatch(
        login({
          name: res.user.displayName || 'Usuario',
          email: res.user.email,
        })
      );

      navigate('/');
    } catch (err) {
      setError('Credenciales incorrectas o usuario no existe.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white px-4">
      <h1 className="text-2xl font-bold mb-6">Iniciar Sesión</h1>

      <form
        onSubmit={handleLogin}
        className="w-full max-w-sm space-y-4 bg-gray-800 p-6 rounded-lg shadow-md"
      >
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded text-black"
        />

        <input
          name="password"
          type="password"
          placeholder="Contraseña"
          value={form.password}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded text-black"
        />

        <button
          type="submit"
          className="w-full bg-blue-500 py-2 rounded hover:bg-blue-600 font-semibold"
        >
          Entrar
        </button>

        <div className="flex flex-col items-center space-y-2 mt-2">
          <button
            type="button"
            onClick={() => navigate('/register')}
            className="text-sm text-blue-300 hover:underline"
          >
            Crear cuenta
          </button>

          <button
            type="button"
            onClick={() => navigate('/recover')}
            className="text-sm text-blue-300 hover:underline"
          >
            ¿Olvidaste tu contraseña?
          </button>
        </div>

        {error && (
          <p className="text-red-400 text-sm text-center mt-2">{error}</p>
        )}
      </form>
    </div>
  );
}
