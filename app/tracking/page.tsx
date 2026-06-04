'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { ProgressSummary } from '@/components/ProgressSummary';
import { areaLabels, readProgressLogs } from '@/lib/routines';
import type { ProgressLog } from '@/lib/types';

export default function TrackingPage() {
  const [logs, setLogs] = useState<ProgressLog[]>([]);

  useEffect(() => {
    setLogs(readProgressLogs());
  }, []);

  return (
    <main className="page-watermark wm-tracking min-h-screen bg-[#070d1a]">
      <div className="mx-auto max-w-6xl px-4 py-8 lg:px-8">
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-amber-400">Seguimiento</p>
            <h1 className="mt-2 text-3xl font-bold text-white">Progreso de recuperacion</h1>
            <p className="mt-2 max-w-2xl text-slate-300">
              Revisa sesiones guardadas, ejercicios completados y cambio de dolor.
            </p>
          </div>
          <Link href="/assessment" className="rounded-xl bg-amber-500 px-5 py-3 text-sm font-bold text-slate-950 hover:bg-amber-400">
            Registrar nueva sesion
          </Link>
        </div>

        <ProgressSummary logs={logs} />

        <section className="mt-6 rounded-2xl border border-slate-700 bg-[#1e2a38] shadow-xl shadow-black/20">
          <div className="border-b border-slate-700 px-5 py-4">
            <h2 className="font-semibold text-white">Historial</h2>
          </div>

          {logs.length === 0 ? (
            <div className="p-8 text-center">
              <p className="font-semibold text-white">Aun no hay sesiones guardadas</p>
              <p className="mt-1 text-sm text-slate-400">Completa una rutina para ver metricas aqui.</p>
            </div>
          ) : (
            <div className="divide-y divide-slate-700">
              {logs.map((log) => (
                <article key={log.id} className="grid gap-3 px-5 py-4 md:grid-cols-[1fr_auto] md:items-center">
                  <div>
                    <p className="font-semibold text-white">{areaLabels[log.routineArea]}</p>
                    <p className="mt-1 text-sm text-slate-400">
                      {new Date(log.createdAt).toLocaleString()} · {log.completedExercises}/{log.totalExercises} ejercicios
                    </p>
                    {log.notes && <p className="mt-2 text-sm text-slate-300">{log.notes}</p>}
                  </div>
                  <div className="rounded-md bg-[#0b1220] px-4 py-3 text-sm text-amber-300">
                    Dolor {log.painBefore}/10 → {log.painAfter}/10
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
