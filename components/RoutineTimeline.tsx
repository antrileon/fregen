import { RoutineCard } from '@/components/RoutineCard';
import type { RegenMoveExerciseDNA, RegenMoveProfile } from '@/lib/regenmove/types';
import type { Exercise } from '@/lib/types';

interface RoutineTimelineProps {
  exercises: Exercise[];
  supportExercises: RegenMoveExerciseDNA[];
  profile: RegenMoveProfile;
  completed: string[];
  onToggle: (id: string) => void;
}

const styles: Record<Exercise['category'], { icon: string; label: string; className: string }> = {
  'Liberacion neuromuscular': { icon: '↓', label: 'Downshift', className: 'border-amber-500/60 bg-amber-500/12 text-amber-300' },
  Neurodinamia: { icon: '↔', label: 'Neural', className: 'border-sky-400/50 bg-sky-400/12 text-sky-300' },
  Movilidad: { icon: '∞', label: 'Fascial', className: 'border-teal-400/50 bg-teal-400/12 text-teal-300' },
  'Fuerza correctiva': { icon: '↗', label: 'Integracion', className: 'border-orange-400/50 bg-orange-400/12 text-orange-300' },
};

function Dot({ children, className }: { children: React.ReactNode; className: string }) {
  return (
    <div className={`relative z-10 grid h-12 w-12 shrink-0 place-items-center rounded-full border text-xl font-black shadow-xl ${className}`}>
      {children}
    </div>
  );
}

function Row({ dot, children }: { dot: React.ReactNode; children: React.ReactNode }) {
  return (
    <section className="relative z-10 flex gap-4 md:gap-6">
      {dot}
      <div className="min-w-0 flex-1">{children}</div>
    </section>
  );
}

export function RoutineTimeline({ exercises, supportExercises, profile, completed, onToggle }: RoutineTimelineProps) {
  return (
    <div className="relative space-y-10 before:absolute before:left-6 before:top-12 before:h-[calc(100%-4rem)] before:w-px before:bg-[linear-gradient(to_bottom,rgba(245,158,11,.5)_0_45%,transparent_45%_100%)] before:bg-[length:1px_10px]">
      <Row dot={<Dot className="border-red-400/40 bg-red-500/18 text-red-200">!</Dot>}>
        <div className="rounded-2xl border border-red-400/30 bg-red-500/8 p-5 shadow-xl shadow-black/10">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-red-300">Safety protocol · 2 min</p>
              <h2 className="mt-1 text-2xl font-bold text-white">Seguridad y downshift</h2>
            </div>
            <span className="rounded-full border border-red-400/30 bg-red-500/12 px-3 py-1 text-xs font-bold text-red-200">
              {profile.safetyMode}
            </span>
          </div>
          <p className="mt-3 text-sm leading-6 text-slate-200">{profile.safetyMessage}</p>
          <p className="mt-3 text-sm leading-6 text-slate-300">
            Si aparece dolor agudo, corriente intensa, adormecimiento progresivo o perdida de fuerza, detente y vuelve a evaluacion.
          </p>
        </div>
      </Row>

      <Row dot={<Dot className="border-teal-400/40 bg-teal-400/14 text-teal-200">○</Dot>}>
        <div className="rounded-2xl border border-slate-700 bg-[#1e2a38] p-5 shadow-xl shadow-black/10">
          <div className="grid gap-5 md:grid-cols-[1fr_280px]">
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-teal-300">Breath preparation · 3 min</p>
              <h2 className="mt-1 text-2xl font-bold text-white">Preparacion respiratoria</h2>
              <ul className="mt-4 space-y-2 text-sm leading-6 text-slate-200">
                <li>Respira nasal, lento, sin elevar hombros.</li>
                <li>Inhala 4 segundos y exhala 6 segundos.</li>
                <li>Expande costillas laterales y espalda baja suave.</li>
              </ul>
            </div>
            <div className="rounded-xl border border-teal-400/30 bg-teal-400/10 p-4">
              <p className="text-xs font-bold uppercase tracking-wide text-teal-300">Coach cue</p>
              <p className="mt-2 text-sm leading-6 text-slate-200">
                Baja el volumen del sistema nervioso antes de deslizar o reforzar.
              </p>
            </div>
          </div>
        </div>
      </Row>

      {exercises.map((exercise, index) => {
        const style = styles[exercise.category];
        const checked = completed.includes(exercise.id);

        return (
          <Row key={exercise.id} dot={<Dot className={style.className}>{style.icon}</Dot>}>
            <div className="space-y-3">
              <div className={`rounded-2xl border px-5 py-4 shadow-xl shadow-black/10 ${style.className}`}>
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wide opacity-90">
                      Paso {index + 1} · {style.label} · {exercise.durationSeconds}s
                    </p>
                    <h2 className="mt-1 text-2xl font-bold leading-tight text-white">{exercise.name}</h2>
                    <p className="mt-1 text-sm font-semibold text-slate-300">
                      Secuencia diaria con la ficha completa del ejercicio original debajo.
                    </p>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-[#0b1220]/45 px-4 py-3 text-right">
                    <p className="text-xs font-bold uppercase tracking-wide text-slate-400">Dosis</p>
                    <p className="text-xl font-bold text-white">{exercise.reps || `${exercise.durationSeconds}s`} x {exercise.sets}</p>
                  </div>
                </div>
              </div>
              <RoutineCard exercise={exercise} checked={checked} onToggle={() => onToggle(exercise.id)} />
            </div>
          </Row>
        );
      })}

      {supportExercises.length > 0 && (
        <Row dot={<Dot className="border-orange-400/50 bg-orange-400/14 text-orange-200">S</Dot>}>
          <div className="rounded-2xl border border-slate-700 bg-[#1e2a38] p-5 shadow-xl shadow-black/10">
            <p className="text-xs font-bold uppercase tracking-wide text-orange-300">Spiral integration</p>
            <h2 className="mt-1 text-2xl font-bold text-white">Respiracion, espiral y control</h2>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              {supportExercises.map((exercise) => (
                <article key={exercise.id} className="rounded-xl border border-slate-700 bg-[#0b1220] p-4">
                  <p className="font-bold text-white">{exercise.name}</p>
                  <p className="mt-1 text-xs text-slate-400">{exercise.category} · {exercise.durationSeconds}s · {exercise.difficulty}</p>
                  <p className="mt-3 text-sm leading-6 text-slate-300">{exercise.coachCues[0]}</p>
                  <p className="mt-2 text-xs font-semibold text-amber-300">{exercise.painRule}</p>
                </article>
              ))}
            </div>
          </div>
        </Row>
      )}

      <Row dot={<Dot className="border-amber-400/50 bg-amber-400/14 text-amber-200">R</Dot>}>
        <div className="rounded-2xl border border-amber-500/30 bg-[#1e2a38] p-6 shadow-xl shadow-black/10">
          <p className="text-xs font-bold uppercase tracking-wide text-amber-300">Retest panel</p>
          <h2 className="mt-1 text-2xl font-bold text-white">Reevalua antes de terminar</h2>
          <p className="mt-2 text-sm leading-6 text-slate-300">
            Compara dolor, movilidad e irradiacion despues de la rutina. Registra los valores en el panel de sesion.
          </p>
        </div>
      </Row>
    </div>
  );
}
