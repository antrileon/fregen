'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslation, I18nProvider } from '@/lib/useTranslation';  // ← ADD I18nProvider here
import { signUpWithEmail, getCurrentSession } from '@/lib/auth';
import { RoleSelector } from '@/components/RoleSelector';

function SignupContent() {  // ← Create inner component that uses useTranslation
  const { t } = useTranslation();
  const [step, setStep] = useState<'role' | 'details'>('role');
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const router = useRouter();

  useEffect(() => {
    // Redirect if already logged in
    const checkSession = async () => {
      try {
        const session = await getCurrentSession();
        if (session) {
          router.push('/dashboard');
        }
      } catch (error) {
        // Not logged in, stay on signup page
      }
    };
    checkSession();
  }, [router]);

  const handleRoleSelection = (roleId: string) => {
    setSelectedRole(roleId);
    setStep('details');
  };

  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    // Validation
    if (!selectedRole) {
      setMessage(t('auth.roleRequired'));
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setMessage(t('auth.passwordMismatch'));
      setLoading(false);
      return;
    }

    try {
      await signUpWithEmail(email, password, {
        full_name: fullName,
        role: selectedRole
      });

      setMessage(t('auth.accountCreated') + '. ' + t('auth.checkEmail'));
    } catch (error: any) {
      setMessage(error.message || t('auth.error'));
    } finally {
      setLoading(false);
    }
  };

  const goBackToRoleSelection = () => {
    setStep('role');
    setSelectedRole(null);
  };

  return (
    <main className="page-watermark wm-login flex min-h-screen items-center justify-center bg-[#070d1a] p-6">
      <div className="w-full max-w-md rounded-2xl border border-slate-700 bg-[#1e2a38] p-8 shadow-xl shadow-black/20">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            {t('auth.signupTitle')}
          </h1>
          <p className="text-slate-400">
            {t('auth.signupDescription')}
          </p>
        </div>

        {step === 'role' ? (
          <RoleSelector
            selectedRole={selectedRole}
            onRoleSelect={handleRoleSelection}
          />
        ) : (
          <>
            <button
              onClick={goBackToRoleSelection}
              className="mb-6 flex items-center text-sm font-medium text-amber-400 hover:text-amber-300"
            >
              ← {t('common.back')}
            </button>

            <form onSubmit={handleSignupSubmit} className="space-y-4">
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
                  Nombre completo
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full rounded-xl border border-slate-600 bg-[#0b1220] px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20"
                  required
                  placeholder="Tu nombre completo"
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
                  minLength={6}
                />
              </div>

              <div>
                <label className="block mb-2 font-medium text-white">
                  {t('auth.confirmPassword')}
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full rounded-xl border border-slate-600 bg-[#0b1220] px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20"
                  required
                  placeholder="••••••••"
                  minLength={6}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-amber-500 py-3 font-bold text-slate-950 transition-colors hover:bg-amber-400 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? t('auth.loading') : t('auth.signupButton')}
              </button>
            </form>
          </>
        )}

        {message && (
          <div className={`mt-4 p-3 rounded-lg ${
            message.includes(t('auth.accountCreated'))
              ? 'bg-emerald-500/10 border border-emerald-500/40'
              : 'bg-red-500/10 border border-red-500/40'
          }`}>
            <p className={`text-sm ${
              message.includes(t('auth.accountCreated'))
                ? 'text-emerald-200'
                : 'text-red-200'
            }`}>
              {message}
            </p>
          </div>
        )}

        <div className="mt-6 text-sm text-center">
          <p className="text-slate-400">
            ¿Ya tienes cuenta?{' '}
            <Link href="/login" className="text-amber-400 hover:text-amber-300 underline">
              {t('auth.login')}
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}

// Main exported component with I18nProvider wrapper
export default function SignupPage() {
  return (
    <I18nProvider>
      <SignupContent />
    </I18nProvider>
  );
}
