'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

type Exercise = {
  id: number;
  name: string;
  target_body_area?: string;
  description?: string | null;
};

export default function CoachPage() {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchExercises() {
      const { data, error } = await supabase
        .from('exercises')
        .select('*')
        .order('id');

      if (error) {
        setError(error.message);
        setExercises([]);
      } else {
        setExercises((data || []) as Exercise[]);
      }

      setLoading(false);
    }

    fetchExercises();
  }, []);

  if (loading) {
    return <div className="p-6 text-center">Cargando ejercicios...</div>;
  }

  if (error) {
    return <div className="p-6 text-center text-red-500">Error: {error}</div>;
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Panel del entrenador</h1>

      <div className="flex flex-wrap gap-3 mb-8">
        <Link
          href="/assessment"
          className="px-4 py-3 rounded-xl bg-slate-900 text-white"
        >
          Ir a evaluación
        </Link>

        <Link
          href="/tracking"
          className="px-4 py-3 rounded-xl border border-slate-300"
        >
          Ir a seguimiento
        </Link>

        <Link
          href="/login"
          className="px-4 py-3 rounded-xl border border-slate-300"
        >
          Volver a login
        </Link>
      </div>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Ejercicios</h2>

        {exercises.length === 0 ? (
          <p className="text-gray-500">No hay ejercicios cargados.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {exercises.map((exercise) => (
              <div key={exercise.id} className="border rounded-lg p-4 shadow-sm bg-white">
                <p className="font-medium">{exercise.name}</p>

                {exercise.target_body_area && (
                  <p className="text-sm text-gray-500 mt-1">
                    {exercise.target_body_area}
                  </p>
                )}

                {exercise.description && (
                  <p className="text-sm mt-2 text-slate-700">
                    {exercise.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}