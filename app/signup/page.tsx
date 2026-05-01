'use client';

import Link from 'next/link';
import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function SignupPage() {
  const [fullName, setFullName] = useState('');
  const [role, setRole] = useState<'coach' | 'student'>('student');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setMessage(error.message);
      setLoading(false);
      return;
    }

    if (data.user) {
      const { error: profileError } = await supabase
        .from('profiles')
        .insert({
          id: data.user.id,
          full_name: fullName,
          role,
        });

      if (profileError) {
        setMessage(profileError.message);
        setLoading(false);
        return;
      }
    }

    setMessage('Cuenta creada correctamente. Ahora puedes iniciar sesión.');
    setLoading(false);
  };

  return (
    <main className="min-h-screen flex items-center justify-center p-6 bg-slate-100">
      <div className="w-full max-w-md bg-white rounded-2xl shadow p-8">
        <h1 className="text-3xl font-bold mb-6">Registrarse</h1>

        <form onSubmit={handleSignup} className="space-y-4">
          <input
            type="text"
            placeholder="Nombre completo"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full border rounded-xl px-4 py-3"
            required
          />

          <select
            value={role}
            onChange={(e) => setRole(e.target.value as 'coach' | 'student')}
            className="w-full border rounded-xl px-4 py-3"
          >
            <option value="student">Alumno</option>
            <option value="coach">Entrenador</option>
          </select>

          <input
            type="email"
            placeholder="Correo"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border rounded-xl px-4 py-3"
            required
          />

          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border rounded-xl px-4 py-3"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-slate-900 text-white py-3 rounded-xl"
          >
            {loading ? 'Creando...' : 'Crear cuenta'}
          </button>
        </form>

        {message && (
          <p className="mt-4 text-sm text-slate-600">{message}</p>
        )}

        <div className="mt-6 text-sm">
          <p>
            ¿Ya tienes cuenta?{' '}
            <Link href="/login" className="text-blue-600 underline">
              Iniciar sesión
            </Link>
          </p>

          <p className="mt-2">
            <Link href="/" className="text-blue-600 underline">
              Volver al inicio
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}