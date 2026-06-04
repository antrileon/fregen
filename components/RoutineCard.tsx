import type { Exercise } from '@/lib/types';
import { ExerciseMedia } from './ExerciseMedia';

interface RoutineCardProps {
  exercise: Exercise;
  checked?: boolean;
  onToggle?: () => void;
}

export function RoutineCard({ exercise, checked = false, onToggle }: RoutineCardProps) {
  return (
    <article className="soft-card group overflow-hidden rounded-2xl transition duration-300 hover:-translate-y-0.5">
      <div className="h-1.5 bg-amber-500" />
      <div className="p-5 md:p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-amber-500/50 bg-amber-500/20 px-3 py-1 text-xs font-bold text-amber-300">
              {exercise.category}
            </span>
            <span className="rounded-full border border-slate-600 bg-slate-800 px-3 py-1 text-xs font-semibold text-slate-300">
              {exercise.difficulty}
            </span>
          </div>
          <h3 className="text-2xl font-bold leading-tight text-white">{exercise.name}</h3>
          <p className="mt-2 text-sm leading-6 text-slate-300">{exercise.description}</p>
        </div>

        {onToggle && (
          <button
            type="button"
            onClick={onToggle}
            aria-pressed={checked}
            className={`h-12 w-12 shrink-0 rounded-full border text-sm font-bold transition ${
              checked
                ? 'border-emerald-600 bg-emerald-600 text-white shadow-lg shadow-emerald-600/25'
                : 'border-slate-600 bg-[#0b1220] text-slate-300 shadow-sm hover:border-amber-500'
            }`}
            title={checked ? 'Marcar como pendiente' : 'Marcar como completado'}
          >
            {checked ? '✓' : ''}
          </button>
        )}
      </div>

      <dl className="mt-5 grid grid-cols-3 gap-2 text-sm sm:gap-3">
        <div className="rounded-xl border border-slate-700 bg-[#0b1220] p-3">
          <dt className="text-slate-400">Duracion</dt>
          <dd className="font-semibold text-white">{exercise.durationSeconds}s</dd>
        </div>
        <div className="rounded-xl border border-slate-700 bg-[#0b1220] p-3">
          <dt className="text-slate-400">Series</dt>
          <dd className="font-semibold text-white">{exercise.sets}</dd>
        </div>
        <div className="rounded-xl border border-slate-700 bg-[#0b1220] p-3">
          <dt className="text-slate-400">Reps</dt>
          <dd className="font-semibold text-white">{exercise.reps || 'Tiempo'}</dd>
        </div>
      </dl>

      <div className="mt-4">
        <ExerciseMedia exercise={exercise} />
      </div>

      <div className="mt-4 rounded-xl border border-amber-500/40 bg-amber-500/10 p-4">
        <p className="text-sm font-bold text-amber-300">Objetivo terapeutico</p>
        <p className="mt-1 text-sm leading-6 text-slate-200">{exercise.therapeuticGoal}</p>
      </div>

      <div className="mt-4">
        <p className="text-sm font-semibold text-white">Posicion inicial</p>
        <p className="mt-1 text-sm text-slate-300">{exercise.startingPosition}</p>
      </div>

      <ol className="mt-4 space-y-3">
        {exercise.steps.map((step, index) => (
          <li key={step} className="flex gap-3 text-sm leading-6 text-slate-200">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-amber-500 text-xs font-bold text-slate-950">
              {index + 1}
            </span>
            <span>{step}</span>
          </li>
        ))}
      </ol>

      <p className="mt-4 rounded-xl border border-amber-500/50 bg-amber-500/15 p-4 text-sm leading-6 text-amber-100">
        <strong>Regla de dolor:</strong> {exercise.painRule}
      </p>
      </div>
    </article>
  );
}
