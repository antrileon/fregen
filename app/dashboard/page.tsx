'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useTranslation } from '@/lib/useTranslation';
import { getCurrentSession, getCurrentUser } from '@/lib/auth';
import { areaLabels, readAssessments, readProgressLogs } from '@/lib/routines';
import type { PainAssessment, ProgressLog } from '@/lib/types';

export default function DashboardPage() {
  const { t } = useTranslation();
  const [user, setUser] = useState<any>(null);
  const [assessments, setAssessments] = useState<PainAssessment[]>([]);
  const [progress, setProgress] = useState<ProgressLog[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const session = await getCurrentSession();
        if (!session) {
          router.push('/login');
          return;
        }

        const userData = await getCurrentUser();
        setUser(userData);
        setAssessments(readAssessments());
        setProgress(readProgressLogs());
      } catch (error) {
        router.push('/login');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#070d1a]">
        <div className="text-center">
          <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-2 border-amber-500 border-t-transparent"></div>
          <p className="text-slate-300">{t('common.loading')}</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect
  }

  return (
    <div className="page-watermark wm-dashboard min-h-screen bg-[#070d1a]">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6">
          <p className="text-sm font-bold uppercase tracking-wide text-amber-400">Panel</p>
          <h1 className="mt-2 text-3xl font-bold text-white">{t('nav.dashboard')}</h1>
          <p className="mt-2 text-slate-400">Continua tu recuperacion desde el ultimo punto guardado.</p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-slate-700 bg-[#1e2a38] p-5 shadow-xl shadow-black/20">
            <p className="text-sm font-semibold text-slate-400">Evaluaciones</p>
            <p className="mt-2 text-3xl font-bold text-white">{assessments.length}</p>
          </div>
          <div className="rounded-2xl border border-slate-700 bg-[#1e2a38] p-5 shadow-xl shadow-black/20">
            <p className="text-sm font-semibold text-slate-400">Sesiones</p>
            <p className="mt-2 text-3xl font-bold text-white">{progress.length}</p>
          </div>
          <div className="rounded-2xl border border-slate-700 bg-[#1e2a38] p-5 shadow-xl shadow-black/20">
            <p className="text-sm font-semibold text-slate-400">Ultima zona</p>
            <p className="mt-2 text-xl font-bold text-white">
              {assessments[0] ? areaLabels[assessments[0].area] : 'Sin datos'}
            </p>
          </div>
          <div className="rounded-2xl border border-slate-700 bg-[#1e2a38] p-5 shadow-xl shadow-black/20">
            <p className="text-sm font-semibold text-slate-400">Dolor actual</p>
            <p className="mt-2 text-3xl font-bold text-white">
              {progress[0] ? `${progress[0].painAfter}/10` : assessments[0] ? `${assessments[0].intensity}/10` : '-'}
            </p>
          </div>
        </div>

        <div className="mt-6 rounded-2xl border border-slate-700 bg-[#1e2a38] p-6 shadow-xl shadow-black/20">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Assessment Card */}
            <div className="rounded-2xl border border-slate-700 bg-[#0b1220] p-6">
              <div className="mb-4 flex items-center">
                <div className="rounded-full bg-amber-500/15 p-3">
                  <svg className="h-6 w-6 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="ml-3 text-lg font-bold text-white">
                  {t('home.features.assessment')}
                </h3>
              </div>
              <p className="mb-4 text-slate-400">
                {t('home.features.assessmentDesc')}
              </p>
              <Link
                href="/assessment"
                className="inline-flex items-center rounded-xl bg-amber-500 px-4 py-2 font-bold text-slate-950 transition hover:bg-amber-400"
              >
                Comenzar evaluación
                <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            {/* Body Map Card */}
            <div className="rounded-2xl border border-slate-700 bg-[#0b1220] p-6">
              <div className="mb-4 flex items-center">
                <div className="rounded-full bg-amber-500/15 p-3">
                  <svg className="h-6 w-6 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h3 className="ml-3 text-lg font-bold text-white">
                  Mapa Corporal
                </h3>
              </div>
              <p className="mb-4 text-slate-400">
                Visualiza y marca las áreas de dolor en tu cuerpo
              </p>
              <Link
                href="/body-map"
                className="inline-flex items-center rounded-xl bg-amber-500 px-4 py-2 font-bold text-slate-950 transition hover:bg-amber-400"
              >
                Abrir mapa corporal
                <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            {/* Progress Card */}
            <div className="rounded-2xl border border-slate-700 bg-[#0b1220] p-6">
              <div className="mb-4 flex items-center">
                <div className="rounded-full bg-amber-500/15 p-3">
                  <svg className="h-6 w-6 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="ml-3 text-lg font-bold text-white">
                  {t('home.features.progress')}
                </h3>
              </div>
              <p className="mb-4 text-slate-400">
                {t('home.features.progressDesc')}
              </p>
              <Link
                href="/tracking"
                className="inline-flex items-center rounded-xl bg-amber-500 px-4 py-2 font-bold text-slate-950 transition hover:bg-amber-400"
              >
                Ver seguimiento
              </Link>
            </div>
          </div>

          {/* User Info */}
          <div className="mt-8 rounded-2xl border border-slate-700 bg-[#0b1220] p-6">
            <h2 className="mb-4 text-xl font-bold text-white">
              Información de la cuenta
            </h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="block text-sm font-semibold text-slate-400">
                  Email
                </label>
                <p className="mt-1 text-sm text-white">{user.email}</p>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-400">
                  Rol
                </label>
                <p className="mt-1 text-sm capitalize text-white">
                  {user.user_metadata?.role || 'No especificado'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
