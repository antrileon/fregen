'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  builderSteps,
  builderStorageKey,
  buildPackageText,
  buildStepPrompt,
  type AppPackage,
  type BuilderStageId,
} from '@/lib/appBuilderWorkflow';

const emptyPackage: AppPackage = {
  appName: '',
  audience: '',
  problem: '',
  coreWorkflow: '',
  inputs: '',
  outputs: '',
  visualDirection: '',
  launchTarget: '',
};

function toggleStep(values: BuilderStageId[], value: BuilderStageId) {
  return values.includes(value) ? values.filter((item) => item !== value) : [...values, value];
}

export default function AppBuilderPage() {
  const [appPackage, setAppPackage] = useState<AppPackage>(emptyPackage);
  const [activeStepId, setActiveStepId] = useState<BuilderStageId>('brief');
  const [completedSteps, setCompletedSteps] = useState<BuilderStageId[]>([]);
  const [copied, setCopied] = useState<'package' | BuilderStageId | null>(null);
  const [openedStep, setOpenedStep] = useState<BuilderStageId | null>(null);

  useEffect(() => {
    const saved = window.localStorage.getItem(builderStorageKey);
    if (!saved) return;

    try {
      const parsed = JSON.parse(saved) as { appPackage?: AppPackage; completedSteps?: BuilderStageId[]; activeStepId?: BuilderStageId };
      setAppPackage({ ...emptyPackage, ...parsed.appPackage });
      setCompletedSteps(parsed.completedSteps || []);
      if (parsed.activeStepId) setActiveStepId(parsed.activeStepId);
    } catch (error) {
      console.error('Could not load app builder workflow:', error);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(
      builderStorageKey,
      JSON.stringify({
        appPackage,
        completedSteps,
        activeStepId,
      })
    );
  }, [activeStepId, appPackage, completedSteps]);

  const activeStep = builderSteps.find((step) => step.id === activeStepId) || builderSteps[0];
  const nextStep = builderSteps.find((step) => !completedSteps.includes(step.id)) || builderSteps[builderSteps.length - 1];
  const packageText = useMemo(() => buildPackageText(appPackage), [appPackage]);
  const stepPrompt = useMemo(() => buildStepPrompt(activeStep, appPackage), [activeStep, appPackage]);
  const completion = Math.round((completedSteps.length / builderSteps.length) * 100);

  function updatePackage(field: keyof AppPackage, value: string) {
    setAppPackage((current) => ({ ...current, [field]: value }));
  }

  async function copyText(kind: 'package' | BuilderStageId, text: string) {
    await navigator.clipboard.writeText(text);
    setCopied(kind);
    window.setTimeout(() => setCopied(null), 1800);
  }

  function openStepWebsite() {
    window.open(activeStep.url, '_blank', 'noopener,noreferrer');
    setOpenedStep(activeStep.id);
  }

  return (
    <main className="page-watermark wm-builder min-h-screen bg-[#070d1a]">
      <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
        <section className="grid gap-6 lg:grid-cols-[1fr_360px]">
          <div className="glass-panel rounded-lg p-5 lg:p-7">
            <p className="text-sm font-bold uppercase tracking-wide text-cyan-300">Robot de flujo</p>
            <h1 className="mt-3 text-3xl font-bold leading-tight text-white md:text-5xl">
              Guia el paquete de una app hasta su lanzamiento
            </h1>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-300">
              Este robot no construye la aplicacion por si solo. Ordena la informacion, abre el sitio correcto para cada etapa y entrega el prompt o checklist que debes usar para avanzar.
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              <div className="control-surface rounded-lg p-4">
                <p className="text-xs font-bold uppercase tracking-wide text-slate-400">Siguiente accion</p>
                <p className="mt-2 text-lg font-bold text-white">{nextStep.title}</p>
              </div>
              <div className="control-surface rounded-lg p-4">
                <p className="text-xs font-bold uppercase tracking-wide text-slate-400">Progreso</p>
                <p className="mt-2 text-lg font-bold text-white">{completion}%</p>
              </div>
              <div className="control-surface rounded-lg p-4">
                <p className="text-xs font-bold uppercase tracking-wide text-slate-400">Paquete</p>
                <p className="mt-2 text-lg font-bold text-white">{appPackage.appName || 'Sin nombre'}</p>
              </div>
            </div>
          </div>

          <aside className="glass-panel rounded-lg p-5 lg:sticky lg:top-24 lg:self-start">
            <p className="text-sm font-bold uppercase tracking-wide text-cyan-300">Accion actual</p>
            <h2 className="mt-2 text-2xl font-bold text-white">{activeStep.title}</h2>
            <p className="mt-3 text-sm leading-6 text-slate-300">{activeStep.role}</p>
            <p className="mt-3 rounded-lg border border-cyan-400/30 bg-cyan-400/10 p-3 text-sm font-semibold text-cyan-100">
              Resultado: {activeStep.outcome}
            </p>

            <div className="mt-5 grid gap-3">
              <button
                type="button"
                onClick={openStepWebsite}
                className="rounded-lg bg-cyan-400 px-4 py-3 font-bold text-slate-950 transition hover:bg-cyan-300"
              >
                Abrir {activeStep.website}
              </button>
              <button
                type="button"
                onClick={() => copyText(activeStep.id, stepPrompt)}
                className="rounded-lg border border-slate-600 bg-[#0b1220] px-4 py-3 font-bold text-slate-200 transition hover:border-cyan-400 hover:text-cyan-200"
              >
                {copied === activeStep.id ? 'Prompt copiado' : 'Copiar prompt de etapa'}
              </button>
              <button
                type="button"
                onClick={() => setCompletedSteps((current) => toggleStep(current, activeStep.id))}
                className={`rounded-lg border px-4 py-3 font-bold transition ${
                  completedSteps.includes(activeStep.id)
                    ? 'border-emerald-400 bg-emerald-400/15 text-emerald-200'
                    : 'border-slate-600 bg-[#0b1220] text-slate-200 hover:border-emerald-400'
                }`}
              >
                {completedSteps.includes(activeStep.id) ? 'Etapa completada' : 'Marcar etapa completa'}
              </button>
            </div>

            {openedStep === activeStep.id && (
              <p className="mt-4 text-xs leading-5 text-slate-400">
                Sitio abierto en otra pestana. Usa el prompt copiado y vuelve aqui para marcar la etapa.
              </p>
            )}
          </aside>
        </section>

        <section className="mt-6 grid gap-6 lg:grid-cols-[420px_1fr]">
          <form className="soft-card rounded-lg p-5">
            <div className="mb-5 flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-bold uppercase tracking-wide text-cyan-300">Paquete del software</p>
                <h2 className="mt-1 text-2xl font-bold text-white">Informacion base</h2>
              </div>
              <button
                type="button"
                onClick={() => copyText('package', packageText)}
                className="rounded-lg border border-slate-600 px-3 py-2 text-sm font-bold text-slate-200 hover:border-cyan-400 hover:text-cyan-200"
              >
                {copied === 'package' ? 'Copiado' : 'Copiar'}
              </button>
            </div>

            <div className="grid gap-4">
              <label className="block">
                <span className="text-sm font-semibold text-white">Nombre de la app</span>
                <input
                  value={appPackage.appName}
                  onChange={(event) => updatePackage('appName', event.target.value)}
                  className="mt-2 w-full rounded-lg border border-slate-600 bg-[#0b1220] px-4 py-3 text-white outline-none focus:border-cyan-400"
                  placeholder="Ej: Tangbolt, RegenMove..."
                />
              </label>

              <label className="block">
                <span className="text-sm font-semibold text-white">Usuario principal</span>
                <input
                  value={appPackage.audience}
                  onChange={(event) => updatePackage('audience', event.target.value)}
                  className="mt-2 w-full rounded-lg border border-slate-600 bg-[#0b1220] px-4 py-3 text-white outline-none focus:border-cyan-400"
                  placeholder="Quien usara la aplicacion"
                />
              </label>

              <label className="block">
                <span className="text-sm font-semibold text-white">Problema que resuelve</span>
                <textarea
                  value={appPackage.problem}
                  onChange={(event) => updatePackage('problem', event.target.value)}
                  rows={3}
                  className="mt-2 w-full rounded-lg border border-slate-600 bg-[#0b1220] px-4 py-3 text-white outline-none focus:border-cyan-400"
                  placeholder="Que dolor, necesidad o trabajo resuelve"
                />
              </label>

              <label className="block">
                <span className="text-sm font-semibold text-white">Flujo principal</span>
                <textarea
                  value={appPackage.coreWorkflow}
                  onChange={(event) => updatePackage('coreWorkflow', event.target.value)}
                  rows={4}
                  className="mt-2 w-full rounded-lg border border-slate-600 bg-[#0b1220] px-4 py-3 text-white outline-none focus:border-cyan-400"
                  placeholder="Paso 1, paso 2, paso 3..."
                />
              </label>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="text-sm font-semibold text-white">Informacion que entra</span>
                  <textarea
                    value={appPackage.inputs}
                    onChange={(event) => updatePackage('inputs', event.target.value)}
                    rows={3}
                    className="mt-2 w-full rounded-lg border border-slate-600 bg-[#0b1220] px-4 py-3 text-white outline-none focus:border-cyan-400"
                    placeholder="Formularios, archivos, fotos, texto..."
                  />
                </label>

                <label className="block">
                  <span className="text-sm font-semibold text-white">Resultado que entrega</span>
                  <textarea
                    value={appPackage.outputs}
                    onChange={(event) => updatePackage('outputs', event.target.value)}
                    rows={3}
                    className="mt-2 w-full rounded-lg border border-slate-600 bg-[#0b1220] px-4 py-3 text-white outline-none focus:border-cyan-400"
                    placeholder="Reporte, rutina, video, dashboard..."
                  />
                </label>
              </div>

              <label className="block">
                <span className="text-sm font-semibold text-white">Direccion visual</span>
                <input
                  value={appPackage.visualDirection}
                  onChange={(event) => updatePackage('visualDirection', event.target.value)}
                  className="mt-2 w-full rounded-lg border border-slate-600 bg-[#0b1220] px-4 py-3 text-white outline-none focus:border-cyan-400"
                  placeholder="Serio, clinico, pelicula, deportivo, premium..."
                />
              </label>

              <label className="block">
                <span className="text-sm font-semibold text-white">Meta de lanzamiento</span>
                <input
                  value={appPackage.launchTarget}
                  onChange={(event) => updatePackage('launchTarget', event.target.value)}
                  className="mt-2 w-full rounded-lg border border-slate-600 bg-[#0b1220] px-4 py-3 text-white outline-none focus:border-cyan-400"
                  placeholder="URL publica, prueba privada, primer cliente..."
                />
              </label>
            </div>
          </form>

          <div className="grid gap-6">
            <section className="soft-card rounded-lg p-5">
              <p className="text-sm font-bold uppercase tracking-wide text-cyan-300">Ruta de trabajo</p>
              <div className="mt-4 grid gap-3">
                {builderSteps.map((step) => {
                  const isActive = step.id === activeStep.id;
                  const isDone = completedSteps.includes(step.id);

                  return (
                    <button
                      key={step.id}
                      type="button"
                      onClick={() => setActiveStepId(step.id)}
                      className={`grid gap-2 rounded-lg border p-4 text-left transition ${
                        isActive
                          ? 'border-cyan-400 bg-cyan-400/10'
                          : 'border-slate-700 bg-[#0b1220] hover:border-cyan-400/70'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <h3 className="text-base font-bold text-white">{step.title}</h3>
                        <span
                          className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-bold ${
                            isDone ? 'bg-emerald-400 text-slate-950' : 'bg-slate-700 text-slate-200'
                          }`}
                        >
                          {isDone ? 'Listo' : step.website}
                        </span>
                      </div>
                      <p className="text-sm leading-6 text-slate-400">{step.outcome}</p>
                    </button>
                  );
                })}
              </div>
            </section>

            <section className="soft-card rounded-lg p-5">
              <div className="grid gap-5 lg:grid-cols-2">
                <div>
                  <p className="text-sm font-bold uppercase tracking-wide text-cyan-300">Checklist</p>
                  <ul className="mt-3 grid gap-2">
                    {activeStep.checklist.map((item) => (
                      <li key={item} className="rounded-lg border border-slate-700 bg-[#0b1220] px-3 py-2 text-sm leading-6 text-slate-200">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <p className="text-sm font-bold uppercase tracking-wide text-cyan-300">Prompt generado</p>
                  <pre className="mt-3 max-h-80 overflow-auto whitespace-pre-wrap rounded-lg border border-slate-700 bg-[#0b1220] p-4 text-xs leading-5 text-slate-300">
                    {stepPrompt}
                  </pre>
                </div>
              </div>
            </section>
          </div>
        </section>
      </div>
    </main>
  );
}
