'use client';

import Link from 'next/link';
import type { CSSProperties } from 'react';
import { useEffect, useMemo, useState } from 'react';
import {
  defaultWatermarkSetting,
  watermarkImages,
  watermarkPages,
  watermarkStorageKey,
  type WatermarkPageId,
  type WatermarkSetting,
} from '@/lib/watermarks';
import { getWatermarkFilter } from '@/lib/watermarkFilters';
import { WatermarkImageCard } from './WatermarkImageCard';

type SettingsMap = Partial<Record<WatermarkPageId, WatermarkSetting>>;

const surfaceOptions = [
  ['box', 'Cuadro'],
  ['text', 'Texto delineado'],
  ['diffuse', 'Difuso'],
] as const;

function readSettings(): SettingsMap {
  if (typeof window === 'undefined') return {};

  try {
    return JSON.parse(window.localStorage.getItem(watermarkStorageKey) || '{}') as SettingsMap;
  } catch {
    return {};
  }
}

function saveSettings(settings: SettingsMap) {
  window.localStorage.setItem(watermarkStorageKey, JSON.stringify(settings));
  window.dispatchEvent(new Event('regenmove-watermarks-updated'));
}

function getToneLabel(tone: number) {
  if (tone < -15) return 'Frio';
  if (tone > 15) return 'Calido';
  return 'Neutro';
}

export default function WatermarksPage() {
  const [pageId, setPageId] = useState<WatermarkPageId>('functional');
  const [settings, setSettings] = useState<SettingsMap>({});
  const [appliedMessage, setAppliedMessage] = useState('');
  const [previewTheme, setPreviewTheme] = useState<'dark' | 'light'>('dark');

  useEffect(() => {
    setSettings(readSettings());
  }, []);

  const page = watermarkPages.find((item) => item.id === pageId) || watermarkPages[0];
  const setting = {
    ...defaultWatermarkSetting,
    ...(settings[pageId] || {}),
  };

  const previewStyle = useMemo(
    () => {
      return ({
        '--watermark-image': `url('${setting.image}')`,
        '--watermark-opacity': String(previewTheme === 'light' ? Math.min(setting.opacity * 1.35, 0.16) : setting.opacity),
        '--watermark-size': `min(${setting.size}rem, 78vw)`,
        '--watermark-position': `${setting.x}% ${setting.y}%`,
        '--watermark-filter': getWatermarkFilter(setting, previewTheme),
      }) as CSSProperties;
    },
    [previewTheme, setting]
  );

  function updateSetting(partial: Partial<WatermarkSetting>) {
    setSettings((current) => {
      const next = {
        ...current,
        [pageId]: {
          ...setting,
          ...partial,
        },
      };
      saveSettings(next);
      return next;
    });
  }

  function applyCurrent() {
    const next = {
      ...settings,
      [pageId]: setting,
    };
    setSettings(next);
    saveSettings(next);
    setAppliedMessage(`Aplicado a ${page.label}. Abre la pagina real para revisarlo.`);
  }

  function clearCurrent() {
    const next = { ...settings };
    delete next[pageId];
    setSettings(next);
    saveSettings(next);
    setAppliedMessage(`Sello quitado de ${page.label}.`);
  }

  return (
    <main className="min-h-screen bg-[#070d1a]">
      <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
        <div className="mb-6">
          <p className="text-sm font-bold uppercase tracking-wide text-amber-400">Fondos</p>
          <h1 className="mt-2 text-3xl font-bold text-white">Probador de sellos de agua</h1>
          <p className="mt-2 max-w-3xl text-slate-300">
            Elige una imagen por pantalla y mira una muestra con sombra, matiz, opacidad baja y posicion ajustable.
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-[300px_1fr]">
          <aside className="rounded-2xl border border-slate-700 bg-[#1e2a38]/82 p-3 shadow-xl shadow-black/20 backdrop-blur-sm">
            <p className="text-xs font-bold uppercase tracking-wide text-slate-400">Pagina</p>

            <label className="mt-2 block">
              <span className="sr-only">Pagina a configurar</span>
              <select
                value={pageId}
                onChange={(event) => setPageId(event.target.value as WatermarkPageId)}
                className="w-full rounded-xl border border-slate-600 bg-[#0b1220] px-3 py-3 text-sm font-bold text-white outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20"
              >
                {watermarkPages.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.label}
                  </option>
                ))}
              </select>
            </label>

            <div className="mt-3 grid gap-1.5">
              {watermarkPages.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setPageId(item.id)}
                  className={`rounded-lg border px-3 py-2 text-left text-sm font-bold transition ${
                    pageId === item.id
                      ? 'border-amber-500 bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                      : 'border-slate-700 bg-[#0b1220] text-slate-300 hover:border-amber-500/70'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <div className="mt-4 space-y-3 border-t border-slate-700 pt-4">
              <label className="block">
                <span className="flex justify-between text-sm font-semibold text-white">
                  Opacidad <strong>{Math.round(setting.opacity * 1000) / 10}%</strong>
                </span>
                <input
                  type="range"
                  min="0.02"
                  max="0.14"
                  step="0.005"
                  value={setting.opacity}
                  onChange={(event) => updateSetting({ opacity: Number(event.target.value) })}
                  className="mt-2 w-full accent-amber-500"
                />
              </label>

              <label className="block">
                <span className="flex justify-between text-sm font-semibold text-white">
                  Tamano <strong>{setting.size}rem</strong>
                </span>
                <input
                  type="range"
                  min="18"
                  max="72"
                  step="1"
                  value={setting.size}
                  onChange={(event) => updateSetting({ size: Number(event.target.value) })}
                  className="mt-2 w-full accent-amber-500"
                />
              </label>

              <label className="block">
                <span className="flex justify-between text-sm font-semibold text-white">
                  Horizontal <strong>{setting.x}%</strong>
                </span>
                <input
                  type="range"
                  min="-20"
                  max="120"
                  step="1"
                  value={setting.x}
                  onChange={(event) => updateSetting({ x: Number(event.target.value) })}
                  className="mt-2 w-full accent-amber-500"
                />
              </label>

              <label className="block">
                <span className="flex justify-between text-sm font-semibold text-white">
                  Vertical <strong>{setting.y}%</strong>
                </span>
                <input
                  type="range"
                  min="-20"
                  max="120"
                  step="1"
                  value={setting.y}
                  onChange={(event) => updateSetting({ y: Number(event.target.value) })}
                  className="mt-2 w-full accent-amber-500"
                />
              </label>

              <label className="block">
                <span className="flex justify-between text-sm font-semibold text-white">
                  Tono <strong>{getToneLabel(setting.tone ?? defaultWatermarkSetting.tone)}</strong>
                </span>
                <input
                  type="range"
                  min="-50"
                  max="50"
                  step="1"
                  value={setting.tone ?? defaultWatermarkSetting.tone}
                  onChange={(event) => updateSetting({ tone: Number(event.target.value) })}
                  className="mt-2 w-full accent-amber-500"
                />
                <div className="mt-1 flex justify-between text-xs text-slate-400">
                  <span>Frio</span>
                  <span>Neutro</span>
                  <span>Calido</span>
                </div>
              </label>

              <label className="flex items-center justify-between rounded-lg border border-slate-700 bg-[#0b1220]/60 px-3 py-2 text-sm font-semibold text-white">
                Matiz oscuro/claro
                <input
                  type="checkbox"
                  checked={setting.negative}
                  onChange={(event) => updateSetting({ negative: event.target.checked })}
                  className="h-4 w-4 accent-amber-500"
                />
              </label>

              <div>
                <p className="text-sm font-semibold text-white">Recuadro</p>
                <div className="mt-2 grid gap-2">
                  {surfaceOptions.map(([value, label]) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => updateSetting({ surface: value })}
                      className={`rounded-lg border px-3 py-2 text-left text-sm font-bold transition ${
                        (setting.surface || defaultWatermarkSetting.surface) === value
                          ? 'border-amber-500 bg-amber-500 text-slate-950'
                          : 'border-slate-700 bg-[#0b1220]/60 text-slate-300 hover:border-amber-500/70'
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="button"
                onClick={applyCurrent}
                className="w-full rounded-xl bg-amber-500 px-4 py-3 font-bold text-slate-950 hover:bg-amber-400"
              >
                Aplicar a {page.label}
              </button>

              {appliedMessage && (
                <p className="rounded-lg border border-emerald-500/40 bg-emerald-500/15 p-3 text-sm font-semibold text-emerald-200">
                  {appliedMessage}
                </p>
              )}

              <button
                type="button"
                onClick={clearCurrent}
                className="w-full rounded-xl border border-slate-600 px-4 py-3 font-bold text-slate-300 hover:bg-slate-800"
              >
                Quitar de esta pagina
              </button>

              <Link
                href={page.path}
                className="block rounded-xl border border-amber-500/40 px-4 py-3 text-center font-bold text-amber-300 hover:bg-amber-500/10"
              >
                Abrir pagina real
              </Link>
            </div>
          </aside>

          <section className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="text-sm font-semibold text-slate-400">
                Vista previa: misma imagen en oscuro y claro; ajusta el tono frio/calido.
              </p>
              <div className="rounded-xl border border-slate-700 bg-[#1e2a38]/82 p-1">
                {(['dark', 'light'] as const).map((theme) => (
                  <button
                    key={theme}
                    type="button"
                    onClick={() => setPreviewTheme(theme)}
                    className={`rounded-lg px-4 py-2 text-sm font-bold ${
                      previewTheme === theme
                        ? 'bg-amber-500 text-slate-950'
                        : 'text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    {theme === 'dark' ? 'Oscuro' : 'Claro'}
                  </button>
                ))}
              </div>
            </div>

            <div
              className={`page-watermark ${page.className} watermark-surface-${setting.surface || defaultWatermarkSetting.surface} min-h-[520px] rounded-2xl border p-5 shadow-xl backdrop-blur-sm ${
                previewTheme === 'dark'
                  ? 'border-slate-700 bg-[#1e2a38]/70 shadow-black/20'
                  : 'border-[#e7d6c4] bg-[#fff8ef]/80 shadow-[#5c402a]/10'
              }`}
              style={previewStyle}
            >
              <div className="max-w-xl">
                <p className="text-sm font-bold uppercase tracking-wide text-amber-400">{page.label}</p>
                <h2 className="mt-2 text-3xl font-bold text-white">Vista previa del sello</h2>
                <p className="mt-3 leading-7 text-slate-300">
                  Esta muestra usa el mismo sistema que la pagina real. La imagen queda en el fondo, muy tenue,
                  sin bloquear lectura ni controles.
                </p>
                <div className="mt-5 grid gap-2 sm:grid-cols-3">
                  <div className="rounded-xl border border-slate-700 bg-[#0b1220]/58 p-3">
                    <p className="text-xs text-slate-400">Perfil</p>
                    <p className="mt-1 text-xl font-bold text-white">V2</p>
                  </div>
                  <div className="rounded-xl border border-slate-700 bg-[#0b1220]/58 p-3">
                    <p className="text-xs text-slate-400">Opacidad</p>
                    <p className="mt-1 text-xl font-bold text-white">{Math.round(setting.opacity * 1000) / 10}%</p>
                  </div>
                  <div className="rounded-xl border border-slate-700 bg-[#0b1220]/58 p-3">
                    <p className="text-xs text-slate-400">Modo</p>
                    <p className="mt-1 text-xl font-bold text-white">{getToneLabel(setting.tone ?? defaultWatermarkSetting.tone)}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-700 bg-[#1e2a38]/82 p-4 shadow-xl shadow-black/20 backdrop-blur-sm">
              <p className="text-sm font-bold uppercase tracking-wide text-amber-400">Imagenes disponibles</p>
              <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
                {watermarkImages.map((image) => (
                  <WatermarkImageCard
                    key={image.id}
                    image={image}
                    selected={setting.image === image.src}
                    onSelect={(src) => updateSetting({ image: src })}
                  />
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
