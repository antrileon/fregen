'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { areaLabels, getExercisesForArea, saveAssessment } from '@/lib/routines';
import { buildRegenMoveProfile } from '@/lib/regenmove/assessmentEngine';
import type { BodyArea } from '@/lib/types';

const painTypes = [
  { value: 'tension', label: 'Tension' },
  { value: 'stiffness', label: 'Rigidez' },
  { value: 'sharp', label: 'Punzante' },
  { value: 'burning', label: 'Ardor' },
  { value: 'fatigue', label: 'Fatiga' },
];

const limitations = ['Caminar', 'Sentarme', 'Levantar peso', 'Dormir', 'Entrenar', 'Trabajo de oficina'];
const goals = ['Bajar dolor', 'Moverme mejor', 'Volver a entrenar', 'Prevenir recaidas'];

const areaOptions = Object.entries(areaLabels) as Array<[BodyArea, string]>;

export default function AssessmentPage() {
  const router = useRouter();
  const [area, setArea] = useState<BodyArea>('lower_back');
  const [intensity, setIntensity] = useState(5);
  const [painType, setPainType] = useState(painTypes[0].value);
  const [limitation, setLimitation] = useState(limitations[0]);
  const [goal, setGoal] = useState(goals[0]);
  const [frontPhotoUrl, setFrontPhotoUrl] = useState<string | undefined>();
  const [backPhotoUrl, setBackPhotoUrl] = useState<string | undefined>();

  const recommended = getExercisesForArea(area, intensity);
  const regenMoveProfile = buildRegenMoveProfile({ area, intensity, painType, limitation, goal });

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    saveAssessment({
      area,
      intensity,
      painType,
      limitation,
      goal,
      photoUrl: frontPhotoUrl,
      frontPhotoUrl,
      backPhotoUrl,
    });
    const params = new URLSearchParams({
      area,
      intensity: String(intensity),
      painType,
      limitation,
      goal,
    });
    router.push(`/routine?${params.toString()}`);
  }

  function handlePhotoUpload(event: React.ChangeEvent<HTMLInputElement>, side: 'front' | 'back') {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        if (side === 'front') {
          setFrontPhotoUrl(reader.result);
        } else {
          setBackPhotoUrl(reader.result);
        }
      }
    };
    reader.readAsDataURL(file);
  }

  const photoSlots = [
    {
      id: 'front' as const,
      label: 'Frente',
      helper: 'Foto frontal de postura o zona visible',
      value: frontPhotoUrl,
      clear: () => setFrontPhotoUrl(undefined),
    },
    {
      id: 'back' as const,
      label: 'Espalda',
      helper: 'Foto posterior para revisar alineacion',
      value: backPhotoUrl,
      clear: () => setBackPhotoUrl(undefined),
    },
  ];

  return (
    <main className="page-watermark wm-assessment min-h-screen">
      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-6 lg:grid-cols-[1fr_320px] lg:px-8">
        <section>
          <div className="mb-6">
            <p className="text-sm font-semibold uppercase tracking-wide text-amber-400">Evaluacion</p>
            <h1 className="mt-2 text-3xl font-bold text-white">Elige la zona de dolor y recibe ejercicios de liberacion</h1>
            <p className="mt-2 max-w-2xl text-slate-300">
              La rutina combina liberacion neuromuscular, deslizamientos neurales y refuerzo correctivo para aliviar compresiones y mejorar la funcion de la zona.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="rounded-2xl border border-slate-700 bg-[#1e2a38]/82 p-4 shadow-xl shadow-black/20 backdrop-blur-sm md:p-5">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="md:col-span-2">
                <span className="text-sm font-semibold text-white">Zona principal</span>
                <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
                  {areaOptions.map(([value, label]) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => setArea(value)}
                      className={`rounded-xl border-2 px-3 py-2.5 text-left transition-all duration-200 ${
                        area === value
                          ? 'border-amber-500 bg-amber-500/20 shadow-md'
                          : 'border-slate-600 bg-[#0b1220] hover:border-amber-500/70 hover:bg-slate-800'
                      }`}
                    >
                      <span className="block text-sm font-semibold text-white">{label}</span>
                      <span className={`mt-2 block h-2 w-10 rounded-full ${area === value ? 'bg-amber-500' : 'bg-slate-600'}`} />
                    </button>
                  ))}
                </div>
              </div>

              <div className="md:col-span-2">
                <span className="text-sm font-semibold text-white">Fotos opcionales</span>
                <div className="mt-2 grid gap-3 md:grid-cols-2">
                  {photoSlots.map((slot) => (
                    <div key={slot.id} className="rounded-xl border border-slate-700 bg-[#0b1220]/72 p-3 backdrop-blur-sm">
                      <div className="mb-3 flex items-center justify-between">
                        <div>
                          <p className="font-semibold text-white">{slot.label}</p>
                          <p className="text-xs text-slate-400">{slot.helper}</p>
                        </div>
                        {slot.value && (
                          <button
                            type="button"
                            onClick={slot.clear}
                            className="rounded-md border border-slate-600 px-3 py-2 text-xs font-semibold text-slate-300 hover:bg-slate-800"
                          >
                            Quitar
                          </button>
                        )}
                      </div>

                      <div className="flex h-40 items-center justify-center overflow-hidden rounded-xl border-2 border-dashed border-slate-600 bg-[#111827]/70">
                        {slot.value ? (
                          <img src={slot.value} alt={`Foto ${slot.label.toLowerCase()}`} className="h-full w-full object-cover" />
                        ) : (
                          <div className="px-4 text-center text-sm text-amber-300">
                            Subir foto {slot.label.toLowerCase()}
                          </div>
                        )}
                      </div>

                      <label className="mt-3 inline-flex w-full cursor-pointer items-center justify-center rounded-lg bg-amber-500 px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-amber-400">
                        Subir {slot.label.toLowerCase()}
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(event) => handlePhotoUpload(event, slot.id)}
                          className="hidden"
                        />
                      </label>
                    </div>
                  ))}
                </div>
                <p className="mt-3 text-sm text-slate-400">
                  Las fotos quedan guardadas solo en este navegador para acompañar la evaluacion.
                </p>
              </div>

              <label className="block">
                <span className="text-sm font-semibold text-white">Tipo de molestia</span>
                <select
                  value={painType}
                  onChange={(event) => setPainType(event.target.value)}
                  className="mt-2 w-full rounded-xl border border-slate-600 bg-[#0b1220] px-4 py-3 text-white outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20"
                >
                  {painTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </label>

              <label className="block md:col-span-2">
                <span className="flex items-center justify-between text-sm font-semibold text-white">
                  Intensidad <strong className="text-amber-400">{intensity}/10</strong>
                </span>
                <input
                  type="range"
                  min="0"
                  max="10"
                  value={intensity}
                  onChange={(event) => setIntensity(Number(event.target.value))}
                  className="mt-3 w-full accent-amber-500"
                />
                <div className="mt-1 flex justify-between text-xs text-slate-400">
                  <span>Leve</span>
                  <span>Moderado</span>
                  <span>Alto</span>
                </div>
              </label>

              <label className="block">
                <span className="text-sm font-semibold text-white">Que limita mas</span>
                <select
                  value={limitation}
                  onChange={(event) => setLimitation(event.target.value)}
                  className="mt-2 w-full rounded-xl border border-slate-600 bg-[#0b1220] px-4 py-3 text-white outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20"
                >
                  {limitations.map((item) => (
                    <option key={item}>{item}</option>
                  ))}
                </select>
              </label>

              <label className="block">
                <span className="text-sm font-semibold text-white">Objetivo</span>
                <select
                  value={goal}
                  onChange={(event) => setGoal(event.target.value)}
                  className="mt-2 w-full rounded-xl border border-slate-600 bg-[#0b1220] px-4 py-3 text-white outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20"
                >
                  {goals.map((item) => (
                    <option key={item}>{item}</option>
                  ))}
                </select>
              </label>
            </div>

            <div className="mt-5 border-l-2 border-amber-500/70 pl-4 text-sm text-amber-300">
              <p className="font-bold text-amber-300">Modo RegenMove V2: {regenMoveProfile.phase}</p>
              <p className="mt-1 text-slate-300">{regenMoveProfile.safetyMessage}</p>
              <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-amber-400">
                Perfil: {regenMoveProfile.neuralPathway} · {regenMoveProfile.fascialChain} · {regenMoveProfile.spiralPattern}
              </p>
            </div>

            <button
              type="submit"
              className="mt-6 w-full rounded-xl bg-amber-500 px-5 py-3 font-bold text-slate-950 transition hover:bg-amber-400"
            >
              Generar rutina
            </button>
          </form>
        </section>

        <aside className="rounded-2xl border border-slate-700 bg-[#1e2a38]/78 p-4 shadow-xl shadow-black/20 backdrop-blur-sm lg:sticky lg:top-24 lg:self-start">
          <p className="text-sm font-semibold text-slate-400">Vista previa</p>
          <h2 className="mt-2 text-xl font-bold text-white">{areaLabels[area]}</h2>
          <p className="mt-1 text-sm text-slate-300">
            {recommended.length} ejercicios recomendados: liberacion, neurodinamia y refuerzo segun intensidad {intensity}/10.
          </p>
          <div className="mt-4 border-l-2 border-amber-500/60 pl-4">
            <p className="text-xs font-bold uppercase tracking-wide text-amber-400">Perfil V2</p>
            <p className="mt-2 text-sm font-semibold text-white">{regenMoveProfile.routineIntent}</p>
            <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-slate-400">
              <span>Neural {regenMoveProfile.neuralScore}</span>
              <span>Fascial {regenMoveProfile.fascialScore}</span>
              <span>Espiral {regenMoveProfile.spiralScore}</span>
              <span>Seguridad {regenMoveProfile.safetyScore}</span>
            </div>
          </div>
          <div className="mt-4 space-y-2">
            {recommended.map((exercise) => (
              <div key={exercise.id} className="rounded-xl border border-slate-700 bg-[#0b1220]/72 p-3">
                <p className="font-semibold text-white">{exercise.name}</p>
                <p className="mt-1 text-xs text-slate-400">
                  {exercise.durationSeconds}s · {exercise.sets} series · {exercise.difficulty}
                </p>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </main>
  );
}
