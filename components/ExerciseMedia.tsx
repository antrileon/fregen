import type { Exercise } from '@/lib/types';

const demoCopy: Record<string, string[]> = {
  median: ['Brazo abre', 'Muneca extiende', 'Cuello acompana'],
  neck: ['Apoyo suave', 'Barbilla atras', 'Respira'],
  radial: ['Hombro bajo', 'Muneca flexiona', 'Cuello acompana'],
  scapula: ['Omoplatos atras', 'Mantiene', 'Relaja'],
  thoracic: ['Apoya espalda', 'Abre pecho', 'Regresa'],
  sciatic: ['Rodilla extiende', 'Pie hacia ti', 'Regresa'],
  bridge: ['Activa gluteos', 'Eleva cadera', 'Baja lento'],
  piriformis: ['Cruza pierna', 'Acerca suave', 'Respira'],
  femoral: ['Talon atras', 'Pelvis estable', 'Regresa'],
  squat: ['Cadera atras', 'Toca silla', 'Sube'],
  ankle: ['Punta', 'Flexiona', 'Repite'],
};

export function ExerciseMedia({ exercise }: { exercise: Exercise }) {
  const frames = demoCopy[exercise.videoDemo] || ['Inicio', 'Movimiento', 'Regreso'];
  const printableSteps = exercise.steps.slice(0, 3);

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

            <div className="mt-3 grid gap-2 sm:grid-cols-3">
              {['Inicio', 'Movimiento', 'Control'].map((label, index) => (
                <div key={label} className="rounded-lg border border-slate-200 bg-white p-2">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="grid h-6 w-6 place-items-center rounded-full bg-blue-600 text-xs font-black text-white">
                      {index + 1}
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-wide text-slate-500">
                      {label}
                    </span>
                  </div>

                  <div className="relative mx-auto h-24 w-full overflow-hidden rounded-md bg-slate-100">
                    <div className="absolute left-1/2 top-3 h-7 w-7 -translate-x-1/2 rounded-full border-[5px] border-blue-600 bg-blue-100" />
                    <div className="absolute left-1/2 top-11 h-11 w-5 -translate-x-1/2 rounded-full bg-blue-200 ring-4 ring-blue-600" />
                    <div
                      className={`absolute left-[52%] top-[52px] h-16 w-2 origin-top rounded-full bg-blue-600 ${
                        index === 1 ? 'rotate-[28deg]' : index === 2 ? 'rotate-[8deg]' : 'rotate-[-16deg]'
                      }`}
                    />
                    <div
                      className={`absolute left-[45%] top-[52px] h-16 w-2 origin-top rounded-full bg-blue-600 ${
                        index === 1 ? 'rotate-[-28deg]' : index === 2 ? 'rotate-[-8deg]' : 'rotate-[16deg]'
                      }`}
                    />
                    <div
                      className={`absolute left-[30%] top-[48px] h-2 w-16 origin-right rounded-full bg-amber-500 ${
                        index === 1 ? 'rotate-[-22deg]' : index === 2 ? 'rotate-[12deg]' : 'rotate-[0deg]'
                      }`}
                    />
                    {index === 1 && (
                      <div className="absolute right-2 top-8 text-2xl font-black text-amber-500">→</div>
                    )}
                    {index === 2 && (
                      <div className="absolute bottom-2 left-2 rounded bg-emerald-100 px-2 py-1 text-[10px] font-bold text-emerald-700">
                        suave
                      </div>
                    )}
                  </div>

                  <p className="mt-2 min-h-12 text-[11px] font-semibold leading-4 text-slate-700">
                    {printableSteps[index] || exercise.startingPosition}
                  </p>
                </div>
              ))}
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
          <span className="text-xs font-bold uppercase tracking-wide text-slate-300">Demo guiada</span>
          <span className="rounded-full bg-white/10 px-2.5 py-1 text-[11px] font-semibold text-white">10s</span>
        </div>
        <div className="relative h-56 bg-[radial-gradient(circle_at_50%_38%,rgba(45,212,191,0.18),transparent_15rem)]">
          <div className="absolute inset-x-4 top-4 h-1.5 overflow-hidden rounded-full bg-white/10">
            <div className="h-full animate-demo-progress rounded-full bg-teal-300" />
          </div>
          <div className="flex h-full items-center justify-center">
            <div className="relative h-32 w-40">
              <div className="absolute left-[62px] top-1 h-11 w-11 rounded-full border-4 border-white bg-slate-950" />
              <div className="absolute left-[72px] top-12 h-18 w-6 rounded-full bg-white" />
              <div className="absolute left-[84px] top-[84px] h-24 w-4 origin-top animate-demo-limb rounded-full bg-blue-300" />
              <div className="absolute left-[44px] top-[84px] h-24 w-4 origin-top animate-demo-limb-reverse rounded-full bg-blue-300" />
              <div className="absolute left-2 top-[88px] h-4 w-32 origin-right animate-demo-arm rounded-full bg-teal-300" />
              <div className="absolute bottom-0 left-1/2 h-1 w-36 -translate-x-1/2 rounded-full bg-white/10" />
            </div>
          </div>
          <div className="absolute bottom-3 left-3 right-3 grid grid-cols-3 gap-2 text-center text-[11px] font-semibold">
            {frames.map((frame) => (
              <span key={frame} className="rounded-full bg-white/10 px-2 py-1.5 ring-1 ring-white/10">
                {frame}
              </span>
            ))}
          </div>
        </div>
        <div className="border-t border-white/10 px-4 py-3 text-xs font-medium text-slate-300">
          Secuencia visual temporal para reemplazar luego por video real.
        </div>
      </div>
    </div>
  );
}
