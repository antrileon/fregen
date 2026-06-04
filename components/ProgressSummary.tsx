import type { ProgressLog } from '@/lib/types';

interface ProgressSummaryProps {
  logs: ProgressLog[];
}

export function ProgressSummary({ logs }: ProgressSummaryProps) {
  const completed = logs.reduce((sum, log) => sum + log.completedExercises, 0);
  const total = logs.reduce((sum, log) => sum + log.totalExercises, 0);
  const latest = logs[0];
  const averageImprovement = logs.length
    ? logs.reduce((sum, log) => sum + (log.painBefore - log.painAfter), 0) / logs.length
    : 0;

  return (
    <section className="grid gap-4 md:grid-cols-3">
      <div className="rounded-2xl border border-slate-700 bg-[#1e2a38] p-5 shadow-xl shadow-black/20">
        <p className="text-sm font-medium text-slate-400">Sesiones registradas</p>
        <p className="mt-2 text-3xl font-bold text-white">{logs.length}</p>
      </div>
      <div className="rounded-2xl border border-slate-700 bg-[#1e2a38] p-5 shadow-xl shadow-black/20">
        <p className="text-sm font-medium text-slate-400">Ejercicios completados</p>
        <p className="mt-2 text-3xl font-bold text-white">
          {completed}/{total || 0}
        </p>
      </div>
      <div className="rounded-2xl border border-slate-700 bg-[#1e2a38] p-5 shadow-xl shadow-black/20">
        <p className="text-sm font-medium text-slate-400">Mejora promedio de dolor</p>
        <p className="mt-2 text-3xl font-bold text-white">
          {averageImprovement.toFixed(1)}
        </p>
      </div>

      {latest && (
        <div className="rounded-2xl border border-amber-500/40 bg-amber-500/10 p-5 md:col-span-3">
          <p className="text-sm font-semibold text-amber-300">Ultima sesion</p>
          <p className="mt-1 text-sm text-amber-100">
            Dolor antes {latest.painBefore}/10, despues {latest.painAfter}/10.{' '}
            {latest.notes || 'Sin notas adicionales.'}
          </p>
        </div>
      )}
    </section>
  );
}
