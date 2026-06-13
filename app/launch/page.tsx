'use client';

import { useMemo, useState } from 'react';
import {
  buildLaunchMessage,
  buildMailtoUrl,
  buildWhatsappUrl,
  launchPainTypes,
  launchRedFlags,
  launchSides,
  launchSymptoms,
  saveLaunchRequest,
  type LaunchPainRequest,
  type LaunchSide,
} from '@/lib/launch';
import { areaLabels, bodyPoints } from '@/lib/routines';
import type { BodyArea } from '@/lib/types';

const areaOptions = Object.entries(areaLabels) as Array<[BodyArea, string]>;

function toggleValue(values: string[], value: string) {
  return values.includes(value) ? values.filter((item) => item !== value) : [...values, value];
}

export default function LaunchPage() {
  const [patientName, setPatientName] = useState('');
  const [contact, setContact] = useState('');
  const [area, setArea] = useState<BodyArea>('lower_back');
  const [side, setSide] = useState<LaunchSide>('not_sure');
  const [intensityNow, setIntensityNow] = useState(5);
  const [intensityWorst, setIntensityWorst] = useState(7);
  const [painType, setPainType] = useState(launchPainTypes[0]);
  const [radiation, setRadiation] = useState('');
  const [triggers, setTriggers] = useState('');
  const [relief, setRelief] = useState('');
  const [timing, setTiming] = useState('');
  const [limitation, setLimitation] = useState('');
  const [symptoms, setSymptoms] = useState<string[]>([]);
  const [redFlags, setRedFlags] = useState<string[]>([]);
  const [goal, setGoal] = useState('');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState<LaunchPainRequest | null>(null);
  const [copied, setCopied] = useState(false);

  const activePoint = bodyPoints.find((point) => point.area === area);

  const draftRequest = useMemo<LaunchPainRequest>(
    () => ({
      id: submitted?.id || `launch-${Date.now()}`,
      patientName,
      contact,
      area,
      side,
      intensityNow,
      intensityWorst,
      painType,
      radiation,
      triggers,
      relief,
      timing,
      limitation,
      symptoms,
      redFlags,
      goal,
      notes,
      createdAt: submitted?.createdAt || new Date().toISOString(),
    }),
    [
      area,
      contact,
      goal,
      intensityNow,
      intensityWorst,
      limitation,
      notes,
      painType,
      patientName,
      radiation,
      redFlags,
      relief,
      side,
      submitted,
      symptoms,
      timing,
      triggers,
    ]
  );

  function submitRequest(event: React.FormEvent) {
    event.preventDefault();
    const request = {
      ...draftRequest,
      id: `launch-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    saveLaunchRequest(request);
    setSubmitted(request);
    setCopied(false);
  }

  async function copySummary() {
    const message = buildLaunchMessage(submitted || draftRequest);
    await navigator.clipboard.writeText(message);
    setCopied(true);
  }

  return (
    <main className="page-watermark wm-assessment min-h-screen bg-[#070d1a]">
      <div className="mx-auto max-w-6xl px-4 py-8 lg:px-8">
        <div className="mb-6">
          <p className="text-sm font-bold uppercase tracking-wide text-amber-400">Lanzamiento privado</p>
          <h1 className="mt-2 text-3xl font-bold text-white md:text-5xl">Evaluacion manual RegenMove</h1>
          <p className="mt-3 max-w-3xl text-lg leading-8 text-slate-300">
            Completa el mapa de dolor y los sintomas. Andres revisa tu caso, conversa contigo y prepara tu rutina
            manualmente. Las fichas mantienen instrucciones, diagrama, posicion inicial y pasos; el video se personaliza.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
          <form onSubmit={submitRequest} className="rounded-2xl border border-slate-700 bg-[#1e2a38] p-5 shadow-xl shadow-black/20">
            <div className="grid gap-4 md:grid-cols-2">
              <label className="block">
                <span className="text-sm font-semibold text-white">Nombre</span>
                <input
                  value={patientName}
                  onChange={(event) => setPatientName(event.target.value)}
                  className="mt-2 w-full rounded-xl border border-slate-600 bg-[#0b1220] px-4 py-3 text-white outline-none focus:border-amber-500"
                  placeholder="Nombre de paciente"
                  required
                />
              </label>

              <label className="block">
                <span className="text-sm font-semibold text-white">Contacto</span>
                <input
                  value={contact}
                  onChange={(event) => setContact(event.target.value)}
                  className="mt-2 w-full rounded-xl border border-slate-600 bg-[#0b1220] px-4 py-3 text-white outline-none focus:border-amber-500"
                  placeholder="WhatsApp o email"
                />
              </label>

              <div className="md:col-span-2">
                <span className="text-sm font-semibold text-white">Mapa de dolor</span>
                <div className="mt-3 grid gap-4 lg:grid-cols-[300px_1fr]">
                  <div className="relative aspect-[5/7] overflow-hidden rounded-2xl border border-slate-700 bg-[#0b1220]">
                    <img src="/default-body-map.svg" alt="Mapa corporal" className="h-full w-full object-contain opacity-80" />
                    {bodyPoints.map((point) => (
                      <button
                        key={point.id}
                        type="button"
                        onClick={() => setArea(point.area)}
                        className={`pain-marker absolute h-5 w-5 rounded-full border-2 ${
                          area === point.area ? 'border-amber-200 bg-amber-500' : 'border-white/60 bg-slate-500/80'
                        }`}
                        style={{ left: `${point.x}%`, top: `${point.y}%` }}
                        title={point.label}
                      />
                    ))}
                  </div>

                  <div>
                    <div className="grid grid-cols-2 gap-2">
                      {areaOptions.map(([value, label]) => (
                        <button
                          key={value}
                          type="button"
                          onClick={() => setArea(value)}
                          className={`rounded-xl border px-3 py-3 text-left text-sm font-bold ${
                            area === value
                              ? 'border-amber-500 bg-amber-500 text-slate-950'
                              : 'border-slate-700 bg-[#0b1220] text-slate-300 hover:border-amber-500/70'
                          }`}
                        >
                          {label}
                        </button>
                      ))}
                    </div>

                    <div className="mt-4 grid grid-cols-2 gap-2">
                      {launchSides.map((item) => (
                        <button
                          key={item.value}
                          type="button"
                          onClick={() => setSide(item.value)}
                          className={`rounded-xl border px-3 py-2 text-sm font-bold ${
                            side === item.value
                              ? 'border-amber-500 bg-amber-500/20 text-amber-200'
                              : 'border-slate-700 bg-[#0b1220] text-slate-300'
                          }`}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <label className="block">
                <span className="flex justify-between text-sm font-semibold text-white">
                  Dolor ahora <strong className="text-amber-400">{intensityNow}/10</strong>
                </span>
                <input
                  type="range"
                  min="0"
                  max="10"
                  value={intensityNow}
                  onChange={(event) => setIntensityNow(Number(event.target.value))}
                  className="mt-3 w-full accent-amber-500"
                />
              </label>

              <label className="block">
                <span className="flex justify-between text-sm font-semibold text-white">
                  Dolor maximo <strong className="text-amber-400">{intensityWorst}/10</strong>
                </span>
                <input
                  type="range"
                  min="0"
                  max="10"
                  value={intensityWorst}
                  onChange={(event) => setIntensityWorst(Number(event.target.value))}
                  className="mt-3 w-full accent-amber-500"
                />
              </label>

              <label className="block">
                <span className="text-sm font-semibold text-white">Tipo principal</span>
                <select
                  value={painType}
                  onChange={(event) => setPainType(event.target.value)}
                  className="mt-2 w-full rounded-xl border border-slate-600 bg-[#0b1220] px-4 py-3 text-white outline-none focus:border-amber-500"
                >
                  {launchPainTypes.map((type) => (
                    <option key={type}>{type}</option>
                  ))}
                </select>
              </label>

              <label className="block">
                <span className="text-sm font-semibold text-white">Hacia donde se corre</span>
                <input
                  value={radiation}
                  onChange={(event) => setRadiation(event.target.value)}
                  className="mt-2 w-full rounded-xl border border-slate-600 bg-[#0b1220] px-4 py-3 text-white outline-none focus:border-amber-500"
                  placeholder="Ej: gluteo, pierna, brazo, dedos"
                />
              </label>

              <label className="block md:col-span-2">
                <span className="text-sm font-semibold text-white">Cuando aparece o empeora</span>
                <textarea
                  value={triggers}
                  onChange={(event) => setTriggers(event.target.value)}
                  rows={3}
                  className="mt-2 w-full rounded-xl border border-slate-600 bg-[#0b1220] px-4 py-3 text-white outline-none focus:border-amber-500"
                  placeholder="Sentada, caminar, dormir, cargar peso, girar, manejar..."
                />
              </label>

              <label className="block">
                <span className="text-sm font-semibold text-white">Que lo alivia</span>
                <input
                  value={relief}
                  onChange={(event) => setRelief(event.target.value)}
                  className="mt-2 w-full rounded-xl border border-slate-600 bg-[#0b1220] px-4 py-3 text-white outline-none focus:border-amber-500"
                  placeholder="Reposo, movimiento, calor, estirar..."
                />
              </label>

              <label className="block">
                <span className="text-sm font-semibold text-white">Momento/duracion</span>
                <input
                  value={timing}
                  onChange={(event) => setTiming(event.target.value)}
                  className="mt-2 w-full rounded-xl border border-slate-600 bg-[#0b1220] px-4 py-3 text-white outline-none focus:border-amber-500"
                  placeholder="Mañana, noche, constante, minutos..."
                />
              </label>

              <label className="block">
                <span className="text-sm font-semibold text-white">Limitacion principal</span>
                <input
                  value={limitation}
                  onChange={(event) => setLimitation(event.target.value)}
                  className="mt-2 w-full rounded-xl border border-slate-600 bg-[#0b1220] px-4 py-3 text-white outline-none focus:border-amber-500"
                  placeholder="Caminar, sentarse, entrenar, dormir..."
                />
              </label>

              <label className="block">
                <span className="text-sm font-semibold text-white">Objetivo</span>
                <input
                  value={goal}
                  onChange={(event) => setGoal(event.target.value)}
                  className="mt-2 w-full rounded-xl border border-slate-600 bg-[#0b1220] px-4 py-3 text-white outline-none focus:border-amber-500"
                  placeholder="Bajar dolor, volver a entrenar..."
                />
              </label>

              <div className="md:col-span-2">
                <p className="text-sm font-semibold text-white">Sintomas</p>
                <div className="mt-2 grid gap-2 sm:grid-cols-2">
                  {launchSymptoms.map((item) => (
                    <label key={item} className="flex items-center gap-3 rounded-xl border border-slate-700 bg-[#0b1220] px-3 py-2 text-sm text-slate-200">
                      <input
                        type="checkbox"
                        checked={symptoms.includes(item)}
                        onChange={() => setSymptoms((current) => toggleValue(current, item))}
                        className="h-4 w-4 accent-amber-500"
                      />
                      {item}
                    </label>
                  ))}
                </div>
              </div>

              <div className="md:col-span-2">
                <p className="text-sm font-semibold text-white">Alertas importantes</p>
                <div className="mt-2 grid gap-2 sm:grid-cols-2">
                  {launchRedFlags.map((item) => (
                    <label key={item} className="flex items-center gap-3 rounded-xl border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-100">
                      <input
                        type="checkbox"
                        checked={redFlags.includes(item)}
                        onChange={() => setRedFlags((current) => toggleValue(current, item))}
                        className="h-4 w-4 accent-red-500"
                      />
                      {item}
                    </label>
                  ))}
                </div>
              </div>

              <label className="block md:col-span-2">
                <span className="text-sm font-semibold text-white">Notas libres</span>
                <textarea
                  value={notes}
                  onChange={(event) => setNotes(event.target.value)}
                  rows={4}
                  className="mt-2 w-full rounded-xl border border-slate-600 bg-[#0b1220] px-4 py-3 text-white outline-none focus:border-amber-500"
                  placeholder="Cualquier detalle que Andres deba saber antes de hablar contigo."
                />
              </label>
            </div>

            <button type="submit" className="mt-6 w-full rounded-xl bg-amber-500 px-5 py-4 text-lg font-bold text-slate-950 hover:bg-amber-400">
              Enviar a Andres para rutina manual
            </button>
          </form>

          <aside className="rounded-2xl border border-slate-700 bg-[#1e2a38] p-5 shadow-xl shadow-black/20 lg:sticky lg:top-24 lg:self-start">
            <p className="text-sm font-bold uppercase tracking-wide text-amber-400">Resumen</p>
            <h2 className="mt-2 text-2xl font-bold text-white">{areaLabels[area]}</h2>
            <p className="mt-2 text-sm leading-6 text-slate-300">
              {launchSides.find((item) => item.value === side)?.label} · {painType} · ahora {intensityNow}/10 · maximo {intensityWorst}/10
            </p>

            <div className="mt-4 rounded-xl border border-slate-700 bg-[#0b1220] p-4">
              <p className="text-xs font-bold uppercase tracking-wide text-slate-400">Estado de rutina</p>
              <p className="mt-2 text-sm font-semibold text-white">
                Pendiente de diseño manual por Andres.
              </p>
              <p className="mt-2 text-xs leading-5 text-slate-400">
                La ficha final conserva diagrama, posicion inicial, pasos e instrucciones. El video se reemplaza por la demo personalizada.
              </p>
            </div>

            {activePoint && (
              <p className="mt-4 rounded-xl border border-amber-500/30 bg-amber-500/10 p-3 text-sm text-amber-100">
                Punto marcado: {activePoint.label}
              </p>
            )}

            {submitted && (
              <div className="mt-5 space-y-3">
                <p className="rounded-xl border border-emerald-500/40 bg-emerald-500/15 p-3 text-sm font-semibold text-emerald-200">
                  Solicitud guardada en este dispositivo.
                </p>
                <button
                  type="button"
                  onClick={copySummary}
                  className="w-full rounded-xl border border-slate-600 px-4 py-3 font-bold text-slate-200 hover:border-amber-500"
                >
                  {copied ? 'Resumen copiado' : 'Copiar resumen'}
                </button>
                <a href={buildMailtoUrl(submitted)} className="block rounded-xl bg-amber-500 px-4 py-3 text-center font-bold text-slate-950">
                  Enviar por email
                </a>
                {buildWhatsappUrl(submitted) && (
                  <a href={buildWhatsappUrl(submitted)} target="_blank" rel="noreferrer" className="block rounded-xl border border-emerald-500/50 px-4 py-3 text-center font-bold text-emerald-200">
                    Enviar por WhatsApp
                  </a>
                )}
              </div>
            )}
          </aside>
        </div>
      </div>
    </main>
  );
}
