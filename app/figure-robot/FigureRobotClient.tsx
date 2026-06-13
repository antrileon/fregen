'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';

export interface FigureExerciseSpec {
  id: number;
  title: string;
  zone: string;
  category: string;
  dose: string;
  objective: string;
  start: string;
  movement: string;
  figure: string;
  avoid: string;
  rule: string;
  prompt: string;
  fileName: string;
}

interface SavedFigure {
  image?: string;
  approved?: boolean;
  notes?: string;
}

const storageKey = 'regenmove.figureRobot.v1';

function readSaved(): Record<number, SavedFigure> {
  if (typeof window === 'undefined') return {};

  try {
    return JSON.parse(window.localStorage.getItem(storageKey) || '{}') as Record<number, SavedFigure>;
  } catch {
    return {};
  }
}

function downloadText(fileName: string, content: string) {
  const blob = new Blob([content], { type: 'application/json;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  link.click();
  URL.revokeObjectURL(url);
}

export function FigureRobotClient({ exercises }: { exercises: FigureExerciseSpec[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [saved, setSaved] = useState<Record<number, SavedFigure>>({});
  const [copied, setCopied] = useState<'prompt' | 'edit' | null>(null);

  useEffect(() => {
    const loaded = readSaved();
    setSaved(loaded);
    const firstPending = exercises.findIndex((exercise) => !loaded[exercise.id]?.approved);
    if (firstPending >= 0) setCurrentIndex(firstPending);
  }, [exercises]);

  useEffect(() => {
    window.localStorage.setItem(storageKey, JSON.stringify(saved));
  }, [saved]);

  const current = exercises[currentIndex] || exercises[0];
  const currentSaved = saved[current.id] || {};
  const approvedCount = exercises.filter((exercise) => saved[exercise.id]?.approved).length;
  const progress = Math.round((approvedCount / exercises.length) * 100);

  const editPrompt = useMemo(
    () => [
      'Edita la imagen anterior para corregirla sin cambiar el estilo general.',
      '',
      `Ejercicio: ${current.title}`,
      `Debe mostrar: ${current.figure}`,
      `Movimiento: ${current.movement}`,
      `Evitar: ${current.avoid}`,
      '',
      'Mantener silueta humana negra, fondo blanco limpio, flechas ambar, sin texto ni logos.',
      'La postura debe coincidir mejor con el ejercicio.',
    ].join('\n'),
    [current]
  );

  async function copy(kind: 'prompt' | 'edit', text: string) {
    await navigator.clipboard.writeText(text);
    setCopied(kind);
    window.setTimeout(() => setCopied(null), 1600);
  }

  function saveImage(file: File) {
    const reader = new FileReader();
    reader.onload = () => {
      setSaved((state) => ({
        ...state,
        [current.id]: {
          ...state[current.id],
          image: String(reader.result),
          approved: false,
        },
      }));
    };
    reader.readAsDataURL(file);
  }

  function approveAndNext() {
    setSaved((state) => ({
      ...state,
      [current.id]: {
        ...state[current.id],
        approved: true,
      },
    }));
    setCurrentIndex((index) => Math.min(index + 1, exercises.length - 1));
  }

  function setNotes(notes: string) {
    setSaved((state) => ({
      ...state,
      [current.id]: {
        ...state[current.id],
        notes,
      },
    }));
  }

  function exportManifest() {
    const manifest = exercises.map((exercise) => ({
      id: exercise.id,
      title: exercise.title,
      fileName: exercise.fileName,
      approved: Boolean(saved[exercise.id]?.approved),
      hasImage: Boolean(saved[exercise.id]?.image),
      notes: saved[exercise.id]?.notes || '',
    }));
    downloadText('regenmove-figure-robot-manifest.json', JSON.stringify(manifest, null, 2));
  }

  return (
    <main className="page-watermark wm-builder min-h-screen bg-[#070d1a]">
      <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
        <section className="grid gap-6 lg:grid-cols-[1fr_360px]">
          <div className="glass-panel rounded-lg p-5 lg:p-7">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
              <p className="text-sm font-bold uppercase tracking-wide text-cyan-300">Robot de figuras + ChatGPT</p>
                <h1 className="mt-3 text-3xl font-bold leading-tight text-white md:text-5xl">
                  Generar 25 imagenes, una por ejercicio
                </h1>
              </div>
              <Link
                href="/app-builder"
                className="rounded-lg border border-slate-600 px-4 py-3 text-sm font-bold text-slate-200 hover:border-cyan-400 hover:text-cyan-200"
              >
                Volver al robot de apps
              </Link>
            </div>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-300">
              Este flujo dicta un ejercicio a la vez, copia el prompt para ChatGPT, recibe la imagen,
              permite aprobarla y avanza hasta completar las 25 figuras.
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              <div className="control-surface rounded-lg p-4">
                <p className="text-xs font-bold uppercase tracking-wide text-slate-400">Ejercicio activo</p>
                <p className="mt-2 text-lg font-bold text-white">
                  {current.id} de {exercises.length}
                </p>
              </div>
              <div className="control-surface rounded-lg p-4">
                <p className="text-xs font-bold uppercase tracking-wide text-slate-400">Aprobadas</p>
                <p className="mt-2 text-lg font-bold text-white">{approvedCount}</p>
              </div>
              <div className="control-surface rounded-lg p-4">
                <p className="text-xs font-bold uppercase tracking-wide text-slate-400">Progreso</p>
                <p className="mt-2 text-lg font-bold text-white">{progress}%</p>
              </div>
            </div>
          </div>

          <aside className="glass-panel rounded-lg p-5 lg:sticky lg:top-8 lg:self-start">
            <p className="text-sm font-bold uppercase tracking-wide text-cyan-300">Accion actual</p>
            <h2 className="mt-2 text-2xl font-bold text-white">{current.title}</h2>
            <p className="mt-3 text-sm leading-6 text-slate-300">
              Copia el prompt, genera la imagen, sube el resultado, corrige si hace falta y aprueba.
            </p>

            <div className="mt-5 grid gap-3">
              <button
                type="button"
                onClick={() => copy('prompt', current.prompt)}
                className="rounded-lg bg-cyan-400 px-4 py-3 font-bold text-slate-950 transition hover:bg-cyan-300"
              >
                {copied === 'prompt' ? 'Prompt copiado' : 'Copiar prompt'}
              </button>
              <button
                type="button"
                onClick={() => window.open('https://chatgpt.com/', '_blank', 'noopener,noreferrer')}
                className="rounded-lg border border-slate-600 bg-[#0b1220] px-4 py-3 font-bold text-slate-200 transition hover:border-cyan-400 hover:text-cyan-200"
              >
                Abrir ChatGPT
              </button>
              <button
                type="button"
                onClick={() => copy('edit', editPrompt)}
                className="rounded-lg border border-slate-600 bg-[#0b1220] px-4 py-3 font-bold text-slate-200 transition hover:border-cyan-400 hover:text-cyan-200"
              >
                {copied === 'edit' ? 'Edicion copiada' : 'Copiar prompt de edicion'}
              </button>
              <button
                type="button"
                onClick={approveAndNext}
                disabled={!currentSaved.image}
                className="rounded-lg border border-emerald-400 bg-emerald-400/15 px-4 py-3 font-bold text-emerald-100 transition hover:bg-emerald-400/25 disabled:cursor-not-allowed disabled:border-slate-700 disabled:bg-[#0b1220] disabled:text-slate-500"
              >
                OK, aprobar y seguir
              </button>
              <button
                type="button"
                onClick={exportManifest}
                className="rounded-lg border border-slate-600 px-4 py-3 font-bold text-slate-200 transition hover:border-cyan-400 hover:text-cyan-200"
              >
                Exportar manifiesto
              </button>
            </div>
          </aside>
        </section>

        <section className="mt-6 grid gap-6 lg:grid-cols-[360px_1fr]">
          <aside className="soft-card rounded-lg p-4">
            <p className="text-sm font-bold uppercase tracking-wide text-cyan-300">Lista de 25</p>
            <div className="mt-4 grid max-h-[680px] gap-2 overflow-auto pr-1">
              {exercises.map((exercise, index) => {
                const itemSaved = saved[exercise.id];
                const active = current.id === exercise.id;
                return (
                  <button
                    key={exercise.id}
                    type="button"
                    onClick={() => setCurrentIndex(index)}
                    className={`rounded-lg border p-3 text-left transition ${
                      active
                        ? 'border-cyan-400 bg-cyan-400/10'
                        : itemSaved?.approved
                          ? 'border-emerald-400/50 bg-emerald-400/10'
                          : 'border-slate-700 bg-[#0b1220] hover:border-cyan-400/70'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <p className="text-sm font-bold text-white">{exercise.id}. {exercise.title}</p>
                      <span className="shrink-0 rounded-full bg-slate-700 px-2 py-1 text-xs font-bold text-slate-200">
                        {itemSaved?.approved ? 'OK' : itemSaved?.image ? 'Revisar' : 'Pendiente'}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-slate-400">{exercise.zone} / {exercise.category}</p>
                  </button>
                );
              })}
            </div>
          </aside>

          <div className="grid gap-6">
            <section className="soft-card rounded-lg p-5">
              <p className="text-sm font-bold uppercase tracking-wide text-cyan-300">Prompt para dictar</p>
              <h2 className="mt-2 text-3xl font-bold text-white">{current.title}</h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                <div className="control-surface rounded-lg p-3">
                  <p className="text-xs font-bold uppercase tracking-wide text-slate-400">Zona</p>
                  <p className="mt-1 font-bold text-white">{current.zone}</p>
                </div>
                <div className="control-surface rounded-lg p-3">
                  <p className="text-xs font-bold uppercase tracking-wide text-slate-400">Categoria</p>
                  <p className="mt-1 font-bold text-white">{current.category}</p>
                </div>
                <div className="control-surface rounded-lg p-3">
                  <p className="text-xs font-bold uppercase tracking-wide text-slate-400">Archivo</p>
                  <p className="mt-1 break-words font-bold text-white">{current.fileName}</p>
                </div>
              </div>
              <pre className="mt-4 max-h-[520px] overflow-auto whitespace-pre-wrap rounded-lg border border-slate-700 bg-[#0b1220] p-4 text-sm leading-6 text-slate-200">
                {current.prompt}
              </pre>
            </section>

            <section className="grid gap-6 lg:grid-cols-[1fr_320px]">
              <div className="soft-card rounded-lg p-5">
                <p className="text-sm font-bold uppercase tracking-wide text-cyan-300">Imagen generada</p>
                <label className="mt-4 flex min-h-[360px] cursor-pointer items-center justify-center overflow-hidden rounded-lg border border-dashed border-slate-600 bg-[#0b1220] p-4 text-center text-slate-300 hover:border-cyan-400">
                  {currentSaved.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={currentSaved.image} alt={current.title} className="max-h-[520px] w-full object-contain" />
                  ) : (
                    <span className="max-w-sm text-sm leading-6">
                      Sube aqui la imagen generada para este ejercicio. Cuando se vea correcta, presiona OK para pasar al siguiente.
                    </span>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    className="sr-only"
                    onChange={(event) => {
                      const file = event.target.files?.[0];
                      if (file) saveImage(file);
                    }}
                  />
                </label>
              </div>

              <aside className="soft-card rounded-lg p-5">
                <p className="text-sm font-bold uppercase tracking-wide text-cyan-300">Revision</p>
                <div className="mt-4 grid gap-3 text-sm leading-6 text-slate-300">
                  <p><strong className="text-white">Debe verse:</strong> {current.figure}</p>
                  <p><strong className="text-white">Movimiento:</strong> {current.movement}</p>
                  <p><strong className="text-white">Evitar:</strong> {current.avoid}</p>
                </div>
                <label className="mt-4 block">
                  <span className="text-sm font-semibold text-white">Notas de correccion</span>
                  <textarea
                    value={currentSaved.notes || ''}
                    onChange={(event) => setNotes(event.target.value)}
                    rows={5}
                    className="mt-2 w-full rounded-lg border border-slate-600 bg-[#0b1220] px-4 py-3 text-white outline-none focus:border-cyan-400"
                    placeholder="Ej: falta pared, flecha va al lado incorrecto, postura no coincide..."
                  />
                </label>
              </aside>
            </section>
          </div>
        </section>
      </div>
    </main>
  );
}
