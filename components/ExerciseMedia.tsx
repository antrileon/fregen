import Image from 'next/image';
import type { Exercise } from '@/lib/types';

type SilhouetteKey =
  | 'sciaticSeated'
  | 'medianGlide'
  | 'femoralSide'
  | 'shortBridge'
  | 'birdDog'
  | 'wallSlide'
  | 'chairSquat'
  | 'stepDown'
  | 'anklePump'
  | 'kneeToWall'
  | 'hip9090'
  | 'threadNeedle'
  | 'ulnarGlide'
  | 'suboccipital'
  | 'chinTuck'
  | 'radialGlide'
  | 'scapularRetraction'
  | 'externalRotation'
  | 'thoracicOpener'
  | 'costalBreathing'
  | 'mcgillCurl'
  | 'piriformisRelease'
  | 'hipAirplane'
  | 'spanishSquat'
  | 'heelRaise'
  | 'neckSideGlide';

const silhouetteCells: Record<SilhouetteKey, { sheet: 'v1' | 'v2'; col: number; row: number; rows: number }> = {
  sciaticSeated: { sheet: 'v1', col: 0, row: 0, rows: 3 },
  medianGlide: { sheet: 'v1', col: 1, row: 0, rows: 3 },
  femoralSide: { sheet: 'v1', col: 2, row: 0, rows: 3 },
  shortBridge: { sheet: 'v1', col: 3, row: 0, rows: 3 },
  birdDog: { sheet: 'v1', col: 0, row: 1, rows: 3 },
  wallSlide: { sheet: 'v1', col: 1, row: 1, rows: 3 },
  chairSquat: { sheet: 'v1', col: 2, row: 1, rows: 3 },
  stepDown: { sheet: 'v1', col: 3, row: 1, rows: 3 },
  anklePump: { sheet: 'v1', col: 0, row: 2, rows: 3 },
  kneeToWall: { sheet: 'v1', col: 1, row: 2, rows: 3 },
  hip9090: { sheet: 'v1', col: 2, row: 2, rows: 3 },
  threadNeedle: { sheet: 'v1', col: 3, row: 2, rows: 3 },
  ulnarGlide: { sheet: 'v2', col: 0, row: 0, rows: 4 },
  suboccipital: { sheet: 'v2', col: 1, row: 0, rows: 4 },
  chinTuck: { sheet: 'v2', col: 2, row: 0, rows: 4 },
  radialGlide: { sheet: 'v2', col: 3, row: 0, rows: 4 },
  scapularRetraction: { sheet: 'v2', col: 0, row: 1, rows: 4 },
  externalRotation: { sheet: 'v2', col: 1, row: 1, rows: 4 },
  thoracicOpener: { sheet: 'v2', col: 2, row: 1, rows: 4 },
  costalBreathing: { sheet: 'v2', col: 3, row: 1, rows: 4 },
  mcgillCurl: { sheet: 'v2', col: 0, row: 2, rows: 4 },
  piriformisRelease: { sheet: 'v2', col: 1, row: 2, rows: 4 },
  hipAirplane: { sheet: 'v2', col: 2, row: 2, rows: 4 },
  spanishSquat: { sheet: 'v2', col: 3, row: 2, rows: 4 },
  heelRaise: { sheet: 'v2', col: 0, row: 3, rows: 4 },
  neckSideGlide: { sheet: 'v2', col: 3, row: 3, rows: 4 },
};

const silhouetteByDemo: Record<string, SilhouetteKey> = {
  median: 'medianGlide',
  ulnar: 'ulnarGlide',
  neck: 'suboccipital',
  radial: 'radialGlide',
  scapula: 'scapularRetraction',
  'wall-slide': 'wallSlide',
  'external-rotation': 'externalRotation',
  thoracic: 'thoracicOpener',
  'thread-needle': 'threadNeedle',
  'costal-breathing': 'costalBreathing',
  sciatic: 'sciaticSeated',
  bridge: 'shortBridge',
  mcgill: 'mcgillCurl',
  'bird-dog': 'birdDog',
  piriformis: 'piriformisRelease',
  'hip-90-90': 'hip9090',
  'hip-airplane': 'hipAirplane',
  femoral: 'femoralSide',
  squat: 'chairSquat',
  'step-down': 'stepDown',
  'spanish-squat': 'spanishSquat',
  ankle: 'anklePump',
  'knee-to-wall': 'kneeToWall',
  'heel-raise': 'heelRaise',
};

const silhouetteByExerciseId: Record<string, SilhouetteKey> = {
  'neck-1': 'medianGlide',
  'neck-2': 'suboccipital',
  'neck-3': 'ulnarGlide',
  'neck-4': 'chinTuck',
  'shoulders-1': 'radialGlide',
  'shoulders-2': 'scapularRetraction',
  'shoulders-3': 'wallSlide',
  'shoulders-4': 'externalRotation',
  'upper-back-1': 'thoracicOpener',
  'upper-back-2': 'threadNeedle',
  'upper-back-3': 'costalBreathing',
  'lower-back-1': 'sciaticSeated',
  'lower-back-2': 'shortBridge',
  'lower-back-3': 'mcgillCurl',
  'lower-back-4': 'birdDog',
  'hips-1': 'piriformisRelease',
  'hips-2': 'hip9090',
  'hips-3': 'hipAirplane',
  'knees-1': 'femoralSide',
  'knees-2': 'chairSquat',
  'knees-3': 'stepDown',
  'knees-4': 'spanishSquat',
  'ankles-1': 'anklePump',
  'ankles-2': 'kneeToWall',
  'ankles-3': 'heelRaise',
};

function shortCue(text: string) {
  return text
    .replace(/\.$/, '')
    .replace(/^Mant[eé]n/i, 'Mantén')
    .slice(0, 44);
}

function ExerciseSilhouette({ exercise }: { exercise: Exercise }) {
  const key = silhouetteByExerciseId[exercise.id] || silhouetteByDemo[exercise.videoDemo] || 'medianGlide';
  const cell = silhouetteCells[key];
  const image = cell.sheet === 'v1'
    ? '/exercise-silhouettes/regenmove-silhouette-sheet-v1.png'
    : '/exercise-silhouettes/regenmove-silhouette-sheet-v2.png';

  return (
    <div
      aria-label={`Silueta de movimiento para ${exercise.name}`}
      className="absolute inset-0 bg-no-repeat"
      role="img"
      style={{
        backgroundImage: `url('${image}')`,
        backgroundSize: `400% ${cell.rows * 100}%`,
        backgroundPosition: `${cell.col * 33.333}% ${cell.row * (100 / (cell.rows - 1))}%`,
      }}
    />
  );
}

export function ExerciseMedia({ exercise }: { exercise: Exercise }) {
  const printableSteps = exercise.steps.slice(0, 4);
  const demoFrames = [
    shortCue(exercise.startingPosition),
    ...exercise.steps.slice(0, 2).map(shortCue),
  ].slice(0, 3);

  return (
    <div className="grid gap-3 md:grid-cols-2">
      <figure className="overflow-hidden rounded-2xl border border-slate-700 bg-[#0b1220]">
        <div className="flex items-center justify-between border-b border-slate-700 px-4 py-3">
          <span className="text-xs font-bold uppercase tracking-wide text-slate-300">Lamina</span>
          <span className="rounded-full bg-amber-500 px-2.5 py-1 text-[11px] font-bold text-slate-950">Print</span>
        </div>
        <div className="bg-white p-3 text-slate-950">
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wide text-blue-700">
                  Diagrama imprimible
                </p>
                <h4 className="mt-1 text-base font-black leading-tight text-slate-950">
                  {exercise.name}
                </h4>
              </div>
              <div className="rounded-full bg-amber-100 px-3 py-1 text-[11px] font-bold text-amber-800">
                {exercise.durationSeconds}s
              </div>
            </div>

            <div className="mt-3 overflow-hidden rounded-xl border border-slate-200 bg-white">
              <div className="relative aspect-[16/10] bg-slate-100">
                <ExerciseSilhouette exercise={exercise} />
              </div>
              <div className="border-t border-slate-200 bg-slate-50 p-3">
                <p className="text-[11px] font-bold uppercase tracking-wide text-slate-500">
                  Secuencia imprimible
                </p>
                <ol className="mt-2 grid gap-2 sm:grid-cols-2">
                  {printableSteps.map((step, index) => (
                    <li key={step} className="flex gap-2 text-[11px] font-semibold leading-4 text-slate-700">
                      <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-blue-600 text-[10px] font-black text-white">
                        {index + 1}
                      </span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            <div className="mt-3 rounded-lg border border-amber-200 bg-amber-50 p-2">
              <p className="text-[11px] font-bold uppercase tracking-wide text-amber-800">
                Regla visual
              </p>
              <p className="mt-1 text-xs font-semibold leading-4 text-amber-900">
                Movimiento lento, rango comodo y sin dolor electrico.
              </p>
            </div>
          </div>
        </div>
        <figcaption className="border-t border-slate-700 bg-[#0b1220] px-4 py-3 text-xs font-semibold text-slate-300">
          Lamina imprimible con pasos visuales y regla de seguridad
        </figcaption>
      </figure>

      <div className="overflow-hidden rounded-2xl bg-slate-950 text-white ring-1 ring-slate-800">
        <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
          <span className="text-xs font-bold uppercase tracking-wide text-slate-300">Demo personalizada</span>
          <span className="rounded-full bg-white/10 px-2.5 py-1 text-[11px] font-semibold text-white">10s</span>
        </div>
        <div className="relative h-56 overflow-hidden bg-[radial-gradient(circle_at_50%_38%,rgba(45,212,191,0.18),transparent_15rem)]">
          <Image
            src={exercise.image}
            alt=""
            fill
            className="object-contain p-8 opacity-[0.16] grayscale"
            sizes="(min-width: 768px) 50vw, 100vw"
          />
          <div className="absolute inset-x-4 top-4 h-1.5 overflow-hidden rounded-full bg-white/10">
            <div className="h-full animate-demo-progress rounded-full bg-teal-300" />
          </div>
          <div className="relative flex h-full items-center justify-center px-5 pb-14 pt-8">
            <div className="w-full rounded-2xl border border-white/10 bg-slate-950/70 p-4 backdrop-blur">
              <p className="text-xs font-bold uppercase tracking-wide text-teal-200">
                Guion 10s para este ejercicio
              </p>
              <p className="mt-2 text-lg font-black leading-tight text-white">{exercise.name}</p>
              <p className="mt-2 text-sm leading-6 text-slate-300">{exercise.therapeuticGoal}</p>
            </div>
          </div>
          <div className="absolute bottom-3 left-3 right-3 grid grid-cols-3 gap-2 text-center text-[11px] font-semibold">
            {demoFrames.map((frame) => (
              <span key={frame} className="rounded-full bg-white/10 px-2 py-1.5 ring-1 ring-white/10">
                {frame}
              </span>
            ))}
          </div>
        </div>
        <div className="border-t border-white/10 px-4 py-3 text-xs font-medium text-slate-300">
          Base visual y guion corto para generar o reemplazar por video real.
        </div>
      </div>
    </div>
  );
}
