'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslation } from '@/lib/useTranslation';
import { signInWithEmail } from '@/lib/auth';

export default function LoginPage() {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      await signInWithEmail(email, password);
      router.push('/dashboard');
    } catch (error: any) {
      setMessage(error.message || t('auth.invalidCredentials'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="page-watermark wm-login flex min-h-screen items-center justify-center bg-[#070d1a] p-6">
      <div className="w-full max-w-md rounded-2xl border border-slate-700 bg-[#1e2a38] p-8 shadow-xl shadow-black/20">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            {t('auth.loginTitle')}
          </h1>
          <p className="text-slate-400">
            {t('auth.loginDescription')}
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block mb-2 font-medium text-white">
              {t('auth.email')}
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-slate-600 bg-[#0b1220] px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20"
              required
              placeholder="tu@email.com"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium text-white">
              {t('auth.password')}
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-slate-600 bg-[#0b1220] px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20"
              required
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-amber-500 py-3 font-bold text-slate-950 transition-colors hover:bg-amber-400 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? t('auth.loading') : t('auth.loginButton')}
          </button>
        </form>

        {message && (
          <div className="mt-4 rounded-lg border border-red-500/50 bg-red-500/15 p-3">
            <p className="text-sm font-semibold text-red-300">{message}</p>
          </div>
        )}

        <div className="mt-6 space-y-2 text-sm text-center">
          <p className="text-slate-400">
            {t('auth.forgotPassword')}?{' '}
            <button className="text-amber-400 hover:text-amber-300 underline">
              {t('auth.resetPassword')}
            </button>
          </p>

          <p className="text-slate-400">
            ¿No tienes cuenta?{' '}
            <Link href="/signup" className="text-amber-400 hover:text-amber-300 underline">
              {t('auth.signup')}
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
