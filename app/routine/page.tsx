'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';

type Exercise = {
  id: number;
  name: string;
  target_body_area: string;
  description?: string | null;
};

export default function RoutinePage() {
  const searchParams = useSearchParams();
  const area = searchParams.get('area');

  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchExercises() {
      if (!area) return;

      const { data, error } = await supabase
        .from('exercises')
        .select('*')
        .eq('target_body_area', area);

      if (!error) {
        setExercises((data || []) as Exercise[]);
      }

      setLoading(false);
    }

    fetchExercises();
  }, [area]);

  if (loading) {
    return <div className="p-6 text-center">Generando rutina...</div>;
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">
        Rutina para: {area}
      </h1>

      {exercises.length === 0 ? (
        <p>No hay ejercicios para esta zona.</p>
      ) : (
        <div className="grid gap-4">
          {exercises.map((ex) => (
            <div key={ex.id} className="border p-4 rounded-lg">
              <h2 className="font-semibold">{ex.name}</h2>
              <p>{ex.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}