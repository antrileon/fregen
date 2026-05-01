'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function AssessmentPage() {
  const [painLocation, setPainLocation] = useState('');
  const [intensity, setIntensity] = useState(5);
  const [painType, setPainType] = useState('tension');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        setMessage('Debes iniciar sesión.');
        setLoading(false);
        return;
      }

      if (!painLocation) {
        setMessage('Selecciona una zona de dolor.');
        setLoading(false);
        return;
      }

      const { error } = await supabase.from('pain_logs').insert({
        user_id: user.id,
        pain_location: painLocation,
        intensity,
        pain_type: painType,
      });

      if (error) {
        setMessage(`Error guardando evaluación: ${error.message}`);
        setLoading(false);
        return;
      }

      window.location.href = `/routine?area=${encodeURIComponent(painLocation)}`;
    } catch (err) {
      setMessage('Ocurrió un error inesperado.');
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center p-6 bg-slate-100">
      <div className="w-full max-w-md bg-white rounded-2xl shadow p-8">
        <h1 className="text-3xl font-bold mb-6">Evaluación de dolor</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-2 font-medium">Ubicación del dolor</label>
            <select
              value={painLocation}
              onChange={(e) => setPainLocation(e.target.value)}
              className="w-full border rounded-xl px-4 py-3"
              required
            >
              <option value="">Selecciona una zona</option>
              <option value="shoulders">Hombros</option>
              <option value="lower_back">Espalda baja</option>
              <option value="hips">Cadera</option>
              <option value="knees">Rodillas</option>
              <option value="neck">Cuello</option>
            </select>
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Intensidad ({intensity})
            </label>
            <input
              type="range"
              min="0"
              max="10"
              value={intensity}
              onChange={(e) => setIntensity(Number(e.target.value))}
              className="w-full"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">Tipo de dolor</label>
            <select
              value={painType}
              onChange={(e) => setPainType(e.target.value)}
              className="w-full border rounded-xl px-4 py-3"
            >
              <option value="tension">Tensión</option>
              <option value="stiffness">Rigidez</option>
              <option value="sharp">Punzante</option>
              <option value="burning">Ardor</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-slate-900 text-white py-3"
          >
            {loading ? 'Generando...' : 'Generar rutina'}
          </button>
        </form>

        {message && (
          <p className="mt-4 text-sm text-red-600">{message}</p>
        )}
      </div>
    </main>
  );
}