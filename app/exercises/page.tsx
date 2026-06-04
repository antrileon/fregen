'use client';

import { useMemo, useState } from 'react';
import { RoutineCard } from '@/components/RoutineCard';
import { regenMoveExerciseDNASeed } from '@/lib/regenmove/exerciseSeedData';
import { areaLabels, exerciseLibrary } from '@/lib/routines';
import type { BodyArea } from '@/lib/types';

export default function ExercisesPage() {
  const [area, setArea] = useState<BodyArea | 'all'>('all');
  const [query, setQuery] = useState('');

  const exercises = useMemo(() => {
    return exerciseLibrary.filter((exercise) => {
      const matchesArea = area === 'all' || exercise.area === area;
      const matchesQuery = `${exercise.name} ${exercise.description} ${exercise.category}`
        .toLowerCase()
        .includes(query.toLowerCase());
      return matchesArea && matchesQuery;
    });
  }, [area, query]);

  const areaOptions = [
    ['all', 'Todas'],
    ...Object.entries(areaLabels),
  ] as Array<[BodyArea | 'all', string]>;

  return (
    <main className="page-watermark wm-exercises min-h-screen">
      <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
        <section className="glass-panel overflow-hidden rounded-2xl">
          <div className="grid gap-8 p-6 lg:grid-cols-[1fr_360px] lg:p-8">
            <div>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-amber-500/40 bg-amber-500/15 px-3 py-1 text-xs font-bold uppercase tracking-wide text-amber-300">
                Biblioteca clinica
                <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                {exercises.length} activos
              </div>
              <h1 className="max-w-3xl text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
                Ejercicios de liberacion y refuerzo por zona
              </h1>
              <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-300">
              Consulta ejercicios de liberacion neuromuscular, deslizamiento neural y refuerzo correctivo con imagen y demo visual.
              </p>
            </div>

            <div className="control-surface self-end rounded-xl p-3">
              <label className="block">
                <span className="mb-2 block px-1 text-xs font-bold uppercase tracking-wide text-slate-300">
                  Buscar
                </span>
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Ciatico, hombro, puente..."
                  className="w-full rounded-xl border border-slate-600 bg-[#0b1220] px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20"
                />
              </label>
            </div>
          </div>

          <div className="border-t border-slate-700 px-4 py-4 lg:px-8">
            <div className="flex gap-2 overflow-x-auto pb-1">
              {areaOptions.map(([value, label]) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setArea(value)}
                  className={`shrink-0 rounded-xl border-2 px-4 py-3 text-sm font-semibold transition-all duration-200 ${
                    area === value
                      ? 'border-amber-500 bg-amber-500/20 text-amber-200 shadow-md'
                      : 'border-slate-600 bg-[#0b1220] text-slate-300 hover:border-amber-500/70 hover:bg-slate-800'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </section>

        <div className="mt-6 grid gap-5 xl:grid-cols-2">
          {exercises.map((exercise) => (
            <RoutineCard key={exercise.id} exercise={exercise} />
          ))}
        </div>

        {exercises.length === 0 && (
          <div className="soft-card mt-6 rounded-2xl p-10 text-center text-slate-300">
            No hay ejercicios con ese filtro.
          </div>
        )}

        <section className="mt-8 rounded-2xl border border-slate-700 bg-[#1e2a38] p-6 shadow-xl shadow-black/20">
          <div className="mb-5">
            <p className="text-sm font-bold uppercase tracking-wide text-amber-400">RegenMove V2</p>
            <h2 className="mt-2 text-2xl font-bold text-white">Apoyos neurofasciales y espirales</h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
              Ejercicios base para respiracion, espiral, balance y descarga que complementan las rutinas por zona.
            </p>
          </div>

          <div className="grid gap-4 lg:grid-cols-3">
            {regenMoveExerciseDNASeed.map((exercise) => (
              <article key={exercise.id} className="rounded-xl border border-slate-700 bg-[#0b1220] p-4">
                <div className="mb-3 flex items-center justify-between gap-3">
                  <p className="text-xs font-bold uppercase tracking-wide text-amber-400">{exercise.category}</p>
                  <span className="rounded-full bg-amber-500 px-2.5 py-1 text-xs font-bold text-slate-950">
                    {exercise.durationSeconds}s
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white">{exercise.name}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-400">{exercise.instructions[0]}</p>
                <p className="mt-3 text-xs font-semibold text-amber-300">{exercise.painRule}</p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
