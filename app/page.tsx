'use client';

import Link from 'next/link';
import { useTranslation } from '@/lib/useTranslation';
import { BrandHeroImage } from '@/components/BrandHeroImage';

export default function HomePage() {
  const { t } = useTranslation();

  return (
    <div className="page-watermark wm-home min-h-screen bg-[#070d1a]">
      <section className="mx-auto grid max-w-6xl gap-8 px-4 py-10 lg:grid-cols-[1fr_380px] lg:px-8">
        <div className="rounded-2xl border border-slate-700 bg-[#1e2a38] p-6 shadow-xl shadow-black/20 lg:p-8">
          <p className="text-sm font-bold uppercase tracking-wide text-amber-400">
            Rehabilitacion inteligente
          </p>
          <h1 className="mt-4 text-4xl font-bold leading-tight text-white md:text-6xl">
            {t('home.title')}
          </h1>
          <p className="mt-5 max-w-3xl text-xl text-slate-300">
            {t('home.subtitle')}
          </p>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-400">
            {t('home.description')}
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/assessment"
              className="inline-flex items-center justify-center rounded-xl bg-amber-500 px-8 py-4 text-lg font-bold text-slate-950 transition hover:bg-amber-400"
            >
              Crear rutina
              <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            <Link
              href="/body-map"
              className="inline-flex items-center justify-center rounded-xl border border-slate-600 bg-[#0b1220] px-8 py-4 text-lg font-bold text-slate-300 transition hover:border-amber-500 hover:text-amber-300"
            >
              Abrir mapa corporal
            </Link>
            <Link
              href="/functional"
              className="inline-flex items-center justify-center rounded-xl border border-slate-600 bg-[#0b1220] px-8 py-4 text-lg font-bold text-slate-300 transition hover:border-amber-500 hover:text-amber-300"
            >
              Fuerza funcional
            </Link>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-700 bg-[#1e2a38] p-5 shadow-xl shadow-black/20">
          <div className="overflow-hidden rounded-xl bg-[#0b1220] p-4">
            <BrandHeroImage />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-10 lg:px-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-white">Características principales</h2>
          <p className="mt-2 text-slate-400">Tecnología avanzada para una rehabilitación más efectiva</p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {[
            [t('home.features.assessment'), t('home.features.assessmentDesc'), '✓'],
            [t('home.features.personalized'), t('home.features.personalizedDesc'), '↯'],
            ['Calistenia funcional', 'Ejercicios sin equipo para reforzar despues de liberar dolor.', '⌁'],
          ].map(([title, description, icon]) => (
            <div key={title} className="rounded-2xl border border-slate-700 bg-[#1e2a38] p-6 shadow-xl shadow-black/20">
              <div className="mb-5 grid h-12 w-12 place-items-center rounded-xl bg-amber-500/20 text-xl font-bold text-amber-300">
                {icon}
              </div>
              <h3 className="text-xl font-bold text-white">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-400">{description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
