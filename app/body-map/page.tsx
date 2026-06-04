'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { areaLabels, bodyPoints, getExercisesForArea } from '@/lib/routines';
import type { BodyArea } from '@/lib/types';

type ViewSide = 'front' | 'back';

const storageKey = 'regenmove.bodyMapPhotos';

export default function BodyMapPage() {
  const [selectedArea, setSelectedArea] = useState<BodyArea>('lower_back');
  const [activeSide, setActiveSide] = useState<ViewSide>('front');
  const [photos, setPhotos] = useState<Record<ViewSide, string | undefined>>({
    front: undefined,
    back: undefined,
  });
  const exercises = getExercisesForArea(selectedArea);

  useEffect(() => {
    const saved = window.localStorage.getItem(storageKey);
    if (saved) {
      setPhotos(JSON.parse(saved));
    }
  }, []);

  function updatePhotos(next: Record<ViewSide, string | undefined>) {
    setPhotos(next);
    window.localStorage.setItem(storageKey, JSON.stringify(next));
  }

  function handlePhotoUpload(event: React.ChangeEvent<HTMLInputElement>, side: ViewSide) {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        updatePhotos({ ...photos, [side]: reader.result });
        setActiveSide(side);
      }
    };
    reader.readAsDataURL(file);
  }

  const activePhoto = photos[activeSide];

  return (
    <main className="page-watermark wm-body-map min-h-screen bg-[#070d1a]">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-8 lg:grid-cols-[minmax(0,1fr)_360px] lg:px-8">
        <section className="space-y-6">
          <div className="rounded-2xl border border-slate-700 bg-[#1e2a38] p-6 shadow-xl shadow-black/20">
            <div className="mx-auto flex max-w-md flex-col items-center text-center">
              <div className="h-28 w-28 overflow-hidden rounded-full border-4 border-amber-500 bg-[#0b1220]">
                {activePhoto ? (
                  <img src={activePhoto} alt={`${activeSide} body reference`} className="h-full w-full object-cover" />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-sm font-semibold text-slate-400">
                    Photo
                  </div>
                )}
              </div>

              <div className="mt-4 flex flex-wrap justify-center gap-3">
                <label className="cursor-pointer rounded-lg bg-amber-500 px-4 py-2 text-sm font-bold text-slate-950 transition hover:bg-amber-400">
                  Upload Front
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(event) => handlePhotoUpload(event, 'front')}
                    className="hidden"
                  />
                </label>
                <label className="cursor-pointer rounded-lg bg-amber-500 px-4 py-2 text-sm font-bold text-slate-950 transition hover:bg-amber-400">
                  Upload Back
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(event) => handlePhotoUpload(event, 'back')}
                    className="hidden"
                  />
                </label>
              </div>

              <h1 className="mt-5 text-xl font-bold text-white">Andres Trimino</h1>
              <p className="text-sm font-medium text-slate-400">Pain map reference photos</p>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-700 bg-[#1e2a38] p-5 shadow-xl shadow-black/20">
            <h2 className="text-lg font-bold text-amber-400">Pain Map</h2>

            <div className="mt-4 grid grid-cols-2 rounded-lg bg-[#070d1a] p-1">
              {[
                ['front', 'Front View'],
                ['back', 'Back View'],
              ].map(([side, label]) => (
                <button
                  key={side}
                  type="button"
                  onClick={() => setActiveSide(side as ViewSide)}
                  className={`rounded-md px-4 py-3 text-sm font-bold transition ${
                    activeSide === side
                      ? 'bg-amber-500 text-slate-950'
                      : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            <div className="mt-4 overflow-hidden rounded-xl bg-[#0b1220] p-4">
              <div className="relative mx-auto aspect-[5/7] w-full max-w-[520px] overflow-hidden rounded-lg bg-[#0b1220]">
                {activePhoto ? (
                  <img src={activePhoto} alt={`${activeSide} uploaded body map`} className="h-full w-full object-contain" />
                ) : (
                  <img src="/default-body-map.svg" alt="Silueta corporal" className="h-full w-full object-contain opacity-70" />
                )}

                {bodyPoints.map((point) => (
                  <button
                    key={`${activeSide}-${point.id}`}
                    type="button"
                    onClick={() => setSelectedArea(point.area)}
                    className="pain-marker group absolute h-11 w-11 rounded-full focus:outline-none focus:ring-2 focus:ring-amber-300"
                    style={{ left: `${point.x}%`, top: `${point.y}%` }}
                    title={point.label}
                    aria-label={point.label}
                  >
                    <span
                      className={`pointer-events-none absolute left-1/2 top-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full ${
                        selectedArea === point.area ? 'animate-ping bg-amber-400/55' : 'animate-ping bg-amber-500/35'
                      }`}
                    />
                    <span
                      className={`pointer-events-none absolute left-1/2 top-1/2 z-10 block h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 shadow-lg transition ${
                        selectedArea === point.area
                          ? 'border-white bg-amber-400 shadow-amber-500/60'
                          : 'border-amber-100 bg-amber-500 shadow-amber-500/40 group-hover:scale-110'
                      }`}
                    />
                    <span
                      className={`pointer-events-none absolute left-9 top-1/2 z-20 -translate-y-1/2 whitespace-nowrap rounded-md border px-2 py-1 text-[11px] font-bold shadow-md transition ${
                        selectedArea === point.area
                          ? 'border-amber-300 bg-amber-500 text-slate-950'
                          : 'border-slate-600 bg-[#1e2a38]/95 text-amber-300 opacity-90 group-hover:opacity-100'
                      }`}
                    >
                      {areaLabels[point.area]}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        <aside className="rounded-2xl border border-slate-700 bg-[#1e2a38] p-5 shadow-xl shadow-black/20 lg:sticky lg:top-24 lg:self-start">
          <p className="text-sm font-bold text-slate-400">Selected Area</p>
          <h2 className="mt-2 text-2xl font-bold text-white">{areaLabels[selectedArea]}</h2>
          <p className="mt-2 text-sm leading-6 text-slate-400">
            Rutina inicial con {exercises.length} ejercicios, imagen imprimible, demo visual y reglas de dolor.
          </p>

          <div className="mt-5 space-y-3">
            {exercises.map((exercise) => (
              <div key={exercise.id} className="rounded-xl border border-slate-700 bg-[#0b1220] p-3">
                <p className="font-semibold text-white">{exercise.name}</p>
                <p className="mt-1 text-xs text-slate-400">
                  {exercise.category} · {exercise.durationSeconds}s · {exercise.difficulty}
                </p>
              </div>
            ))}
          </div>

          <Link
            href={`/routine?area=${selectedArea}`}
            className="mt-5 block rounded-xl bg-amber-500 px-5 py-3 text-center font-bold text-slate-950 transition hover:bg-amber-400"
          >
            Iniciar rutina
          </Link>
        </aside>
      </div>
    </main>
  );
}
