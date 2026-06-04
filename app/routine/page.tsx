'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense, useMemo, useState } from 'react';
import { RoutineCard } from '@/components/RoutineCard';
import { areaLabels, getExercisesForArea, isBodyArea, saveProgressLog } from '@/lib/routines';
import { buildRegenMoveProfile } from '@/lib/regenmove/assessmentEngine';
import { regenMoveExerciseDNASeed } from '@/lib/regenmove/exerciseSeedData';
import { getV2SupportExercises, orderRoutineByProfile } from '@/lib/regenmove/routineGenerator';

function RoutineContent() {
  const searchParams = useSearchParams();
  const areaParam = searchParams.get('area');
  const intensity = Number(searchParams.get('intensity') || 5);
  const painType = searchParams.get('painType') || 'tension';
  const limitation = searchParams.get('limitation') || 'Entrenar';
  const goal = searchParams.get('goal') || 'Moverme mejor';
  const area = isBodyArea(areaParam) ? areaParam : 'lower_back';
  const profile = useMemo(
    () => buildRegenMoveProfile({ area, intensity, painType, limitation, goal }),
    [area, goal, intensity, limitation, painType]
  );
  const exercises = useMemo(
    () => orderRoutineByProfile(getExercisesForArea(area, intensity), profile),
    [area, intensity, profile]
  );
  const supportExercises = useMemo(() => getV2SupportExercises(profile, regenMoveExerciseDNASeed), [profile]);
  const [completed, setCompleted] = useState<string[]>([]);
  const [painBefore, setPainBefore] = useState(Math.min(10, Math.max(0, intensity)));
  const [painAfter, setPainAfter] = useState(Math.max(0, intensity - 1));
  const [notes, setNotes] = useState('');
  const [saved, setSaved] = useState(false);

  function toggleExercise(id: string) {
    setSaved(false);
    setCompleted((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id]
    );
  }

  function saveSession() {
    saveProgressLog({
      routineArea: area,
      painBefore,
      painAfter,
      completedExercises: completed.length,
      totalExercises: exercises.length,
      notes,
    });
    setSaved(true);
  }

  return (
    <main className="page-watermark wm-routine min-h-screen bg-[#070d1a]">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-8 lg:grid-cols-[1fr_340px] lg:px-8">
        <section>
          <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-amber-400">Rutina</p>
              <h1 className="mt-2 text-3xl font-bold text-white">{areaLabels[area]}</h1>
              <p className="mt-2 max-w-2xl text-slate-300">
                Completa primero la liberacion neural y luego el refuerzo. Mantén la molestia bajo control y registra la sesion al final.
              </p>
              <div className="mt-4 rounded-2xl border border-slate-700 bg-[#1e2a38] p-4">
                <p className="text-xs font-bold uppercase tracking-wide text-amber-400">RegenMove V2 · {profile.phase}</p>
                <p className="mt-2 text-sm font-semibold text-white">{profile.routineIntent}</p>
                <p className="mt-1 text-sm leading-6 text-slate-400">{profile.safetyMessage}</p>
              </div>
            </div>
            <Link href="/assessment" className="rounded-xl border border-slate-600 px-4 py-2 text-sm font-semibold text-slate-300 hover:bg-slate-800">
              Nueva evaluacion
            </Link>
          </div>

          <div className="space-y-5">
            {exercises.map((exercise) => (
              <RoutineCard
                key={exercise.id}
                exercise={exercise}
                checked={completed.includes(exercise.id)}
                onToggle={() => toggleExercise(exercise.id)}
              />
            ))}
          </div>

          {supportExercises.length > 0 && (
            <div className="mt-6 rounded-2xl border border-slate-700 bg-[#1e2a38] p-5 shadow-xl shadow-black/20">
              <p className="text-sm font-bold uppercase tracking-wide text-amber-400">Apoyos V2</p>
              <h2 className="mt-2 text-xl font-bold text-white">Respiracion, espiral y control</h2>
              <div className="mt-4 grid gap-3 md:grid-cols-2">
                {supportExercises.map((exercise) => (
                  <article key={exercise.id} className="rounded-xl border border-slate-700 bg-[#0b1220] p-4">
                    <p className="font-bold text-white">{exercise.name}</p>
                    <p className="mt-1 text-xs text-slate-400">
                      {exercise.category} · {exercise.durationSeconds}s · {exercise.difficulty}
                    </p>
                    <p className="mt-3 text-sm leading-6 text-slate-300">{exercise.coachCues[0]}</p>
                    <p className="mt-2 text-xs font-semibold text-amber-300">{exercise.painRule}</p>
                  </article>
                ))}
              </div>
            </div>
          )}
        </section>

        <aside className="rounded-2xl border border-slate-700 bg-[#1e2a38] p-5 shadow-xl shadow-black/20 lg:sticky lg:top-24 lg:self-start">
          <p className="text-sm font-semibold text-slate-400">Sesion</p>
          <p className="mt-2 text-3xl font-bold text-white">
            {completed.length}/{exercises.length}
          </p>
          <p className="text-sm text-slate-400">ejercicios completados</p>

          <div className="mt-5 rounded-xl border border-slate-700 bg-[#0b1220] p-4">
            <p className="text-xs font-bold uppercase tracking-wide text-amber-400">Perfil V2</p>
            <div className="mt-3 space-y-2 text-sm text-slate-300">
              <p>Neural: {profile.neuralScore}/100</p>
              <p>Fascial: {profile.fascialScore}/100</p>
              <p>Espiral: {profile.spiralScore}/100</p>
              <p>Seguridad: {profile.safetyScore}/100</p>
            </div>
          </div>

          <div className="mt-5 space-y-4">
            <label className="block">
              <span className="flex justify-between text-sm font-semibold text-white">
                Dolor antes <strong>{painBefore}/10</strong>
              </span>
              <input
                type="range"
                min="0"
                max="10"
                value={painBefore}
                onChange={(event) => {
                  setSaved(false);
                  setPainBefore(Number(event.target.value));
                }}
                className="mt-2 w-full accent-amber-500"
              />
            </label>

            <label className="block">
              <span className="flex justify-between text-sm font-semibold text-white">
                Dolor despues <strong>{painAfter}/10</strong>
              </span>
              <input
                type="range"
                min="0"
                max="10"
                value={painAfter}
                onChange={(event) => {
                  setSaved(false);
                  setPainAfter(Number(event.target.value));
                }}
                className="mt-2 w-full accent-amber-500"
              />
            </label>

            <label className="block">
              <span className="text-sm font-semibold text-white">Notas</span>
              <textarea
                value={notes}
                onChange={(event) => {
                  setSaved(false);
                  setNotes(event.target.value);
                }}
                rows={4}
                className="mt-2 w-full rounded-xl border border-slate-600 bg-[#0b1220] px-3 py-2 text-white outline-none placeholder:text-slate-500 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20"
                placeholder="Como se sintio la sesion"
              />
            </label>
          </div>

          <button
            type="button"
            onClick={saveSession}
            className="mt-5 w-full rounded-xl bg-amber-500 px-5 py-3 font-bold text-slate-950 transition hover:bg-amber-400"
          >
            Guardar progreso
          </button>

          {saved && (
            <Link href="/tracking" className="mt-3 block rounded-xl border border-emerald-500/40 bg-emerald-500/15 px-4 py-3 text-center text-sm font-semibold text-emerald-200">
              Ver seguimiento
            </Link>
          )}
        </aside>
      </div>
    </main>
  );
}

export default function RoutinePage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-[#070d1a]">
          <div className="h-10 w-10 animate-spin rounded-full border-2 border-amber-500 border-t-transparent" />
        </div>
      }
    >
      <RoutineContent />
    </Suspense>
  );
}
