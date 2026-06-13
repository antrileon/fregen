'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { useTranslation } from '@/lib/useTranslation';
import { getCurrentSession, signOutUser } from '@/lib/auth';
import { BrandLogo } from '@/components/BrandLogo';

export function AppHeader() {
  const { language, setLanguage, t } = useTranslation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const router = useRouter();
  const pathname = usePathname();

  const isStandaloneTool = pathname?.startsWith('/app-builder') || pathname?.startsWith('/figure-robot');

  useEffect(() => {
    checkAuthStatus();
    const savedTheme = window.localStorage.getItem('regenmove.theme');
    if (savedTheme === 'light' || savedTheme === 'dark') {
      setTheme(savedTheme);
      document.documentElement.dataset.theme = savedTheme;
    } else {
      document.documentElement.dataset.theme = 'dark';
    }
  }, []);

  const checkAuthStatus = async () => {
    try {
      const session = await getCurrentSession();
      setIsLoggedIn(!!session);
    } catch (error) {
      setIsLoggedIn(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOutUser();
      setIsLoggedIn(false);
      router.push('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const toggleLanguage = () => {
    setLanguage(language === 'es' ? 'en' : 'es');
  };

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    document.documentElement.dataset.theme = nextTheme;
    window.localStorage.setItem('regenmove.theme', nextTheme);
  };

  if (isStandaloneTool) {
    return null;
  }

  return (
    <header className="sticky top-0 z-40 border-b border-slate-700 bg-[#0b1220] shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex min-h-16 items-center justify-between gap-2 py-3">
          <Link href="/" className="flex min-w-0 flex-1 flex-col">
            <BrandLogo />
          </Link>

          <nav className="hidden items-center rounded-lg border border-slate-600 bg-[#151e2b] p-1 text-sm font-medium md:flex">
            <Link href="/" className="rounded-md px-4 py-2 text-slate-300 transition hover:bg-amber-500 hover:text-slate-950">
              {t('nav.home')}
            </Link>
            <Link href="/assessment" className="rounded-md px-4 py-2 text-slate-300 transition hover:bg-amber-500 hover:text-slate-950">
              {t('nav.assessment')}
            </Link>
            <Link href="/body-map" className="rounded-md px-4 py-2 text-slate-300 transition hover:bg-amber-500 hover:text-slate-950">
              Mapa
            </Link>
            <Link href="/exercises" className="rounded-md px-4 py-2 text-slate-300 transition hover:bg-amber-500 hover:text-slate-950">
              Ejercicios
            </Link>
            <Link href="/functional" className="rounded-md px-4 py-2 text-slate-300 transition hover:bg-amber-500 hover:text-slate-950">
              Fuerza
            </Link>
            <Link href="/tracking" className="rounded-md px-4 py-2 text-slate-300 transition hover:bg-amber-500 hover:text-slate-950">
              Progreso
            </Link>
            <Link href="/watermarks" className="rounded-md px-4 py-2 text-slate-300 transition hover:bg-amber-500 hover:text-slate-950">
              Fondos
            </Link>
            {isLoggedIn && (
              <Link href="/dashboard" className="rounded-md px-4 py-2 text-slate-300 transition hover:bg-amber-500 hover:text-slate-950">
                {t('nav.dashboard')}
              </Link>
            )}
          </nav>

          <div className="flex shrink-0 items-center gap-1.5 sm:gap-3">
            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="rounded-md bg-amber-500 px-2.5 py-2 text-xs font-bold text-slate-950 transition hover:bg-amber-400 sm:px-3 sm:text-sm"
            >
              {language === 'es' ? 'EN' : 'ES'}
            </button>
            <button
              onClick={toggleTheme}
              className="rounded-md border border-slate-600 bg-[#151e2b] px-2.5 py-2 text-xs font-bold text-slate-300 transition hover:bg-slate-700 sm:px-3 sm:text-sm"
            >
              {theme === 'dark' ? 'Light' : 'Dark'}
            </button>

            {/* Auth Buttons */}
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="rounded-full border border-slate-600 bg-[#151e2b] px-3 py-2 text-xs font-bold text-slate-300 transition hover:bg-amber-500 hover:text-slate-950 sm:px-4 sm:text-sm"
              >
                {t('auth.logout')}
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href="/login"
                  className="rounded-full bg-amber-500 px-3 py-2 text-xs font-bold text-slate-950 transition hover:bg-amber-400 sm:px-4 sm:text-sm"
                >
                  Entrar
                </Link>
                <Link
                  href="/signup"
                  className="hidden rounded-full border border-slate-600 bg-[#151e2b] px-4 py-2 text-sm font-semibold text-slate-300 transition hover:bg-slate-700 sm:inline-flex"
                >
                  {t('auth.signup')}
                </Link>
              </div>
            )}
          </div>
        </div>
        <nav className="flex gap-2 overflow-x-auto border-t border-slate-700 py-2 text-center text-xs font-medium sm:text-sm md:hidden">
          <Link href="/assessment" className="shrink-0 rounded-md px-3 py-2 text-slate-300 hover:bg-amber-500 hover:text-slate-950">
            Evaluacion
          </Link>
          <Link href="/body-map" className="shrink-0 rounded-md px-3 py-2 text-slate-300 hover:bg-amber-500 hover:text-slate-950">
            Mapa
          </Link>
          <Link href="/exercises" className="shrink-0 rounded-md px-3 py-2 text-slate-300 hover:bg-amber-500 hover:text-slate-950">
            Ejercicios
          </Link>
          <Link href="/functional" className="shrink-0 rounded-md px-3 py-2 text-slate-300 hover:bg-amber-500 hover:text-slate-950">
            Fuerza
          </Link>
          <Link href="/tracking" className="shrink-0 rounded-md px-3 py-2 text-slate-300 hover:bg-amber-500 hover:text-slate-950">
            Progreso
          </Link>
          <Link href="/watermarks" className="shrink-0 rounded-md px-3 py-2 text-slate-300 hover:bg-amber-500 hover:text-slate-950">
            Fondos
          </Link>
        </nav>
      </div>
    </header>
  );
}
