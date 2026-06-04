'use client';

import { useMemo, useState } from 'react';
import { functionalExercises, functionalFocusLabels, type FunctionalFocus } from '@/lib/functional';

const focusOptions = [
  ['all', 'Todo'],
  ...Object.entries(functionalFocusLabels),
] as Array<[FunctionalFocus | 'all', string]>;

const circuits = [
  {
    name: 'Reset 8',
    time: '8 min',
    detail: 'Dead bug + frog pumps + flexion inclinada. Ideal despues de rehabilitacion.',
  },
  {
    name: 'Power 12',
    time: '12 min',
    detail: 'Sentadilla tempo + bear taps + puente con marcha. Fuerte, corto y sin equipo.',
  },
  {
    name: 'Arcade 15',
    time: '15 min',
    detail: 'Flujo animal + zancadas + plancha con alcance. Mas entretenido y dinamico.',
  },
];

export default function FunctionalPage() {
  const [focus, setFocus] = useState<FunctionalFocus | 'all'>('all');

  const exercises = useMemo(() => {
    return functionalExercises.filter((exercise) => focus === 'all' || exercise.focus === focus);
  }, [focus]);

  return (
    <main className="page-watermark wm-functional min-h-screen bg-[#070d1a]">
      <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
        <section className="rounded-2xl border border-slate-700 bg-[#1e2a38] p-6 shadow-xl shadow-black/20 lg:p-8">
          <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
            <div>
              <p className="text-sm font-bold uppercase tracking-wide text-amber-400">
                Restablecimiento y reforzamiento
              </p>
              <h1 className="mt-3 max-w-3xl text-4xl font-bold leading-tight text-white md:text-5xl">
                Calistenia funcional sin equipo
              </h1>
              <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-300">
                Accede en cualquier momento a ejercicios eficientes y entretenidos para fortalecer brazos, piernas, pecho, gluteos y core despues de la etapa de liberacion.
              </p>
            </div>

            <div className="rounded-2xl border border-amber-500/40 bg-amber-500/10 p-5">
              <p className="text-sm font-bold text-amber-300">Regla de uso</p>
              <p className="mt-2 text-sm leading-6 text-slate-200">
                Si hay dolor agudo, corriente, adormecimiento o perdida de fuerza, vuelve a la parte de evaluacion/liberacion antes de hacer fuerza.
              </p>
            </div>
          </div>

          <div className="mt-6 flex gap-2 overflow-x-auto pb-1">
            {focusOptions.map(([value, label]) => (
              <button
                key={value}
                type="button"
                onClick={() => setFocus(value)}
                className={`shrink-0 rounded-xl border-2 px-4 py-3 text-sm font-semibold transition-all duration-200 ${
                  focus === value
                    ? 'border-amber-500 bg-amber-500/20 text-amber-200 shadow-md'
                    : 'border-slate-600 bg-[#0b1220] text-slate-300 hover:border-amber-500/70 hover:bg-slate-800'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </section>

        <section className="mt-6 grid gap-4 md:grid-cols-3">
          {circuits.map((circuit) => (
            <article key={circuit.name} className="rounded-2xl border border-slate-700 bg-[#1e2a38] p-5 shadow-xl shadow-black/20">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xl font-bold text-white">{circuit.name}</p>
                  <p className="mt-2 text-sm font-semibold text-amber-300">{circuit.time}</p>
                </div>
                <span className="rounded-full bg-amber-500 px-3 py-1 text-xs font-bold text-slate-950">
                  Circuito
                </span>
              </div>
              <p className="mt-4 text-sm leading-6 text-slate-300">{circuit.detail}</p>
            </article>
          ))}
        </section>

        <section className="mt-6 grid gap-5 xl:grid-cols-2">
          {exercises.map((exercise) => (
            <article key={exercise.id} className="rounded-2xl border border-slate-700 bg-[#1e2a38] p-5 shadow-xl shadow-black/20">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="mb-3 flex flex-wrap gap-2">
                    <span className="rounded-full border border-amber-500/50 bg-amber-500/20 px-3 py-1 text-xs font-bold text-amber-300">
                      {functionalFocusLabels[exercise.focus]}
                    </span>
                    <span className="rounded-full border border-slate-600 bg-[#0b1220] px-3 py-1 text-xs font-semibold text-slate-300">
                      {exercise.level}
                    </span>
                  </div>
                  <h2 className="text-2xl font-bold text-white">{exercise.name}</h2>
                  <p className="mt-2 text-sm leading-6 text-slate-300">{exercise.description}</p>
                </div>
                <div className="rounded-xl bg-amber-500 px-4 py-3 text-center font-bold text-slate-950">
                  {exercise.duration}
                </div>
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                {exercise.cues.map((cue) => (
                  <div key={cue} className="rounded-xl border border-slate-700 bg-[#0b1220] p-3 text-sm text-slate-200">
                    {cue}
                  </div>
                ))}
              </div>

              <div className="mt-4 rounded-xl border border-emerald-500/40 bg-emerald-500/10 p-4">
                <p className="text-sm font-bold text-emerald-300">Modo entretenido</p>
                <p className="mt-1 text-sm leading-6 text-slate-200">{exercise.game}</p>
              </div>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}
