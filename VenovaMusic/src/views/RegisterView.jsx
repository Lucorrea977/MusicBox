import React, { useState } from 'react';
import { auth } from '../firebase';
import {
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
} from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

export default function RegisterView() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirm: '',
  });
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    const { name, email, password, confirm } = form;

    if (!name || !email || !password || !confirm) {
      return setError('Todos los campos son obligatorios.');
    }

    if (password !== confirm) {
      return setError('Las contraseñas no coinciden.');
    }

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(res.user, { displayName: name });
      await sendEmailVerification(res.user);

      setMessage('✅ Registro exitoso. Verificá tu correo electrónico.');
      setTimeout(() => navigate('/login'), 3000);
    } catch (err) {
      setError('Este correo ya está en uso o es inválido.');
    }
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
      <h1 className="text-2xl font-bold mb-6">Crear Cuenta</h1>

      <form onSubmit={handleRegister} className="space-y-4 w-full max-w-sm">
        <input
          name="name"
          placeholder="Nombre"
          onChange={handleChange}
          className="w-full px-4 py-2 text-black rounded"
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          onChange={handleChange}
          className="w-full px-4 py-2 text-black rounded"
        />
        <input
          name="password"
          type="password"
          placeholder="Contraseña"
          onChange={handleChange}
          className="w-full px-4 py-2 text-black rounded"
        />
        <input
          name="confirm"
          type="password"
          placeholder="Confirmar Contraseña"
          onChange={handleChange}
          className="w-full px-4 py-2 text-black rounded"
        />

        <button
          type="submit"
          className="w-full bg-blue-500 py-2 rounded hover:bg-blue-600 transition"
        >
          Registrarse
        </button>

        <button
          type="button"
          onClick={() => navigate('/login')}
          className="text-sm text-blue-300 underline w-full mt-2"
        >
          ¿Ya tenés cuenta? Iniciá sesión
        </button>

        {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
        {message && <p className="text-green-400 text-sm mt-2">{message}</p>}
      </form>
    </div>
  );
}
