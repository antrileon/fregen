# RegenMove - Complete Codebase Documentation
**Generated on:** May 2, 2026
**Project:** RegenMove - Intelligent Physical Rehabilitation Platform
**Technology Stack:** Next.js 14, React 18, TypeScript, Tailwind CSS, Supabase

---

## Table of Contents
1. [Project Overview](#project-overview)
2. [Configuration Files](#configuration-files)
3. [Application Structure](#application-structure)
4. [Components](#components)
5. [Library Files](#library-files)
6. [Database Schema](#database-schema)
7. [Public Assets](#public-assets)
8. [Environment Configuration](#environment-configuration)

---

## Project Overview

RegenMove is an intelligent physical rehabilitation platform built with Next.js 14, React 18, TypeScript, and Tailwind CSS. It uses Supabase for backend services including authentication, database, and file storage.

### Key Features:
- **Multi-role Authentication**: Support for patients, coaches, and clinics
- **Pain Assessment**: Interactive body map for pain location tracking
- **Personalized Routines**: AI-powered exercise recommendations
- **Progress Tracking**: Real-time monitoring of rehabilitation progress
- **Internationalization**: Spanish/English language support
- **Responsive Design**: Mobile-first approach with Tailwind CSS

### Technology Stack:
- **Frontend**: Next.js 14 (App Router), React 18, TypeScript
- **Styling**: Tailwind CSS with PostCSS and Autoprefixer
- **Backend**: Supabase (PostgreSQL, Auth, Storage)
- **Deployment**: Vercel-ready configuration

---

## Configuration Files

### `/package.json`
```json
{
  "name": "my-app",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "@supabase/auth-helpers-nextjs": "^0.15.0",
    "@supabase/supabase-js": "^2.103.0",
    "@types/node": "20.6.2",
    "@types/react": "18.2.22",
    "@types/react-dom": "18.2.7",
    "autoprefixer": "10.4.15",
    "eslint": "8.49.0",
    "eslint-config-next": "13.5.1",
    "next": "^14.1.0",
    "postcss": "8.4.30",
    "react": "18.2.0",
    "react-dom": "18.2.0",
    "tailwindcss": "3.3.3",
    "typescript": "5.2.2"
  }
}
```

### `/tsconfig.json`
```json
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

### `/next.config.js`
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = nextConfig
```

### `/tailwind.config.ts`
```typescript
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
export default config
```

### `/postcss.config.js`
```javascript
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

### `/.gitignore`
```
# Dependencies
node_modules
.npm
package-lock.json

# Production / Build
.next/
dist/
build/
out/

# Vercel
.vercel

# Environment variables
.env
.env.local
.env.*.local
.env.production.local

# IDE
.vscode
.idea
*.swp
*.swo
*~

# OS
.DS_ Store
Thumbs.db

# Logs
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Cache
.cache
.turbo
```

### `/next-env.d.ts`
```typescript
/// <reference types="next" />
/// <reference types="next/image-types/global" />

// NOTE: This file should not be edited
// see https://nextjs.org/docs/app/building-your-application/configuring/typescript for more information.
```

---

## Application Structure

### `/app/layout.tsx`
```typescript
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { I18nProvider } from '@/lib/useTranslation'
import { AppHeader } from '@/components/AppHeader'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'RegenMove - Rehabilitación Inteligente',
  description: 'Plataforma de rehabilitación física inteligente con IA',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={`${inter.className} min-h-screen bg-gray-50`}>
        <I18nProvider>
          <div className="min-h-screen flex flex-col">
            <AppHeader />
            <main className="flex-1">
              {children}
            </main>
          </div>
        </I18nProvider>
      </body>
    </html>
  )
}
```

### `/app/page.tsx` (Homepage)
```typescript
'use client';

import Link from 'next/link';
import { useTranslation } from '@/lib/useTranslation';

export default function HomePage() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              {t('home.title')}
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
              {t('home.subtitle')}
            </p>
            <p className="text-lg text-gray-500 mb-12 max-w-2xl mx-auto">
              {t('home.description')}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/signup"
                className="inline-flex items-center px-8 py-4 bg-blue-600 text-white text-lg font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-lg"
              >
                {t('home.getStarted')}
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <Link
                href="/login"
                className="inline-flex items-center px-8 py-4 bg-white text-blue-600 text-lg font-semibold rounded-lg border-2 border-blue-600 hover:bg-blue-50 transition-colors"
              >
                {t('auth.login')}
              </Link>
            </div>
          </div>
        </div>

        {/* Background decoration */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 rounded-full opacity-20"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-200 rounded-full opacity-20"></div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Características principales
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Tecnología avanzada para una rehabilitación más efectiva
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="text-center p-8 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                {t('home.features.assessment')}
              </h3>
              <p className="text-gray-600">
                {t('home.features.assessmentDesc')}
              </p>
            </div>

            {/* Feature 2 */}
            <div className="text-center p-8 rounded-xl bg-gradient-to-br from-green-50 to-green-100">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                {t('home.features.personalized')}
              </h3>
              <p className="text-gray-600">
                {t('home.features.personalizedDesc')}
              </p>
            </div>

            {/* Feature 3 */}
            <div className="text-center p-8 rounded-xl bg-gradient-to-br from-purple-50 to-purple-100">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                {t('home.features.progress')}
              </h3>
              <p className="text-gray-600">
                {t('home.features.progressDesc')}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-24 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Comienza tu recuperación hoy
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Únete a miles de personas que han mejorado su calidad de vida con RegenMove
          </p>
          <Link
            href="/signup"
            className="inline-flex items-center px-8 py-4 bg-white text-blue-600 text-lg font-semibold rounded-lg hover:bg-gray-50 transition-colors shadow-lg"
          >
            Crear cuenta gratuita
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">RegenMove</h3>
            <p className="text-gray-400 mb-8">
              Rehabilitación inteligente para una mejor calidad de vida
            </p>
            <div className="flex justify-center space-x-6">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Privacidad
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Términos
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Contacto
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
```

### `/app/globals.css`
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### `/app/login/page.tsx`
```typescript
'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslation } from '@/lib/useTranslation';
import { signInWithEmail, getCurrentSession } from '@/lib/auth';

export default function LoginPage() {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
        // Not logged in, stay on login page
      }
    };
    checkSession();
  }, [router]);

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
    <main className="min-h-screen flex items-center justify-center p-6 bg-slate-100">
      <div className="w-full max-w-md bg-white rounded-2xl shadow p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {t('auth.loginTitle')}
          </h1>
          <p className="text-gray-600">
            {t('auth.loginDescription')}
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block mb-2 font-medium text-gray-700">
              {t('auth.email')}
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
              placeholder="tu@email.com"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium text-gray-700">
              {t('auth.password')}
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-blue-600 text-white py-3 font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? t('auth.loading') : t('auth.loginButton')}
          </button>
        </form>

        {message && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-600">{message}</p>
          </div>
        )}

        <div className="mt-6 space-y-2 text-sm text-center">
          <p className="text-gray-600">
            {t('auth.forgotPassword')}?{' '}
            <button className="text-blue-600 hover:text-blue-800 underline">
              {t('auth.resetPassword')}
            </button>
          </p>

          <p className="text-gray-600">
            ¿No tienes cuenta?{' '}
            <Link href="/signup" className="text-blue-600 hover:text-blue-800 underline">
              {t('auth.signup')}
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
```

### `/app/signup/page.tsx`
```typescript
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
    <main className="min-h-screen flex items-center justify-center p-6 bg-slate-100">
      <div className="w-full max-w-md bg-white rounded-2xl shadow p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {t('auth.signupTitle')}
          </h1>
          <p className="text-gray-600">
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
              className="mb-6 text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center"
            >
              ← {t('common.back')}
            </button>

            <form onSubmit={handleSignupSubmit} className="space-y-4">
              <div>
                <label className="block mb-2 font-medium text-gray-700">
                  {t('auth.email')}
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                  placeholder="tu@email.com"
                />
              </div>

              <div>
                <label className="block mb-2 font-medium text-gray-700">
                  Nombre completo
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                  placeholder="Tu nombre completo"
                />
              </div>

              <div>
                <label className="block mb-2 font-medium text-gray-700">
                  {t('auth.password')}
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                  placeholder="••••••••"
                  minLength={6}
                />
              </div>

              <div>
                <label className="block mb-2 font-medium text-gray-700">
                  {t('auth.confirmPassword')}
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                  placeholder="••••••••"
                  minLength={6}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-blue-600 text-white py-3 font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? t('auth.loading') : t('auth.signupButton')}
              </button>
            </form>
          </>
        )}

        {message && (
          <div className={`mt-4 p-3 rounded-lg ${
            message.includes(t('auth.accountCreated'))
              ? 'bg-green-50 border border-green-200'
              : 'bg-red-50 border border-red-200'
          }`}>
            <p className={`text-sm ${
              message.includes(t('auth.accountCreated'))
                ? 'text-green-600'
                : 'text-red-600'
            }`}>
              {message}
            </p>
          </div>
        )}

        <div className="mt-6 text-sm text-center">
          <p className="text-gray-600">
            ¿Ya tienes cuenta?{' '}
            <Link href="/login" className="text-blue-600 hover:text-blue-800 underline">
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
```

### `/app/dashboard/page.tsx`
```typescript
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslation } from '@/lib/useTranslation';
import { getCurrentSession, getCurrentUser } from '@/lib/auth';

export default function DashboardPage() {
  const { t } = useTranslation();
  const [user, setUser] = useState<any>(null);
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
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">{t('common.loading')}</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            {t('nav.dashboard')}
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Assessment Card */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <div className="flex items-center mb-4">
                <div className="bg-blue-100 rounded-full p-3">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="ml-3 text-lg font-semibold text-gray-900">
                  {t('home.features.assessment')}
                </h3>
              </div>
              <p className="text-gray-600 mb-4">
                {t('home.features.assessmentDesc')}
              </p>
              <a
                href="/assessment"
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Comenzar evaluación
                <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>

            {/* Body Map Card */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <div className="flex items-center mb-4">
                <div className="bg-green-100 rounded-full p-3">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h3 className="ml-3 text-lg font-semibold text-gray-900">
                  Mapa Corporal
                </h3>
              </div>
              <p className="text-gray-600 mb-4">
                Visualiza y marca las áreas de dolor en tu cuerpo
              </p>
              <a
                href="/body-map"
                className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
              >
                Ver mapa corporal
                <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>

            {/* Exercises Card */}
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
              <div className="flex items-center mb-4">
                <div className="bg-purple-100 rounded-full p-3">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="ml-3 text-lg font-semibold text-gray-900">
                  Biblioteca de Ejercicios
                </h3>
              </div>
              <p className="text-gray-600 mb-4">
                Explora todos los ejercicios disponibles
              </p>
              <a
                href="/exercises"
                className="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
              >
                Ver ejercicios
                <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
```

### `/app/assessment/page.tsx`
```typescript
'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function AssessmentPage() {
  const [painLocation, setPainLocation] = useState('');
  const [intensity, setIntensity] = useState(5);
  const [painType, setPainType] = useState('tension');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        setMessage('Debes iniciar sesión.');
        setLoading(false);
        return;
      }

      if (!painLocation) {
        setMessage('Selecciona una zona de dolor.');
        setLoading(false);
        return;
      }

      const { error } = await supabase.from('pain_logs').insert({
        user_id: user.id,
        pain_location: painLocation,
        intensity,
        pain_type: painType,
      });

      if (error) {
        setMessage(`Error guardando evaluación: ${error.message}`);
        setLoading(false);
        return;
      }

      window.location.href = `/routine?area=${encodeURIComponent(painLocation)}`;
    } catch (err) {
      setMessage('Ocurrió un error inesperado.');
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center p-6 bg-slate-100">
      <div className="w-full max-w-md bg-white rounded-2xl shadow p-8">
        <h1 className="text-3xl font-bold mb-6">Evaluación de dolor</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-2 font-medium">Ubicación del dolor</label>
            <select
              value={painLocation}
              onChange={(e) => setPainLocation(e.target.value)}
              className="w-full border rounded-xl px-4 py-3"
              required
            >
              <option value="">Selecciona una zona</option>
              <option value="shoulders">Hombros</option>
              <option value="lower_back">Espalda baja</option>
              <option value="hips">Cadera</option>
              <option value="knees">Rodillas</option>
              <option value="neck">Cuello</option>
            </select>
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Intensidad ({intensity})
            </label>
            <input
              type="range"
              min="0"
              max="10"
              value={intensity}
              onChange={(e) => setIntensity(Number(e.target.value))}
              className="w-full"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">Tipo de dolor</label>
            <select
              value={painType}
              onChange={(e) => setPainType(e.target.value)}
              className="w-full border rounded-xl px-4 py-3"
            >
              <option value="tension">Tensión</option>
              <option value="sharp">Agudo</option>
              <option value="dull">Sordo</option>
              <option value="burning">Ardor</option>
              <option value="other">Otro</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Guardando...' : 'Guardar evaluación'}
          </button>
        </form>

        {message && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-600">{message}</p>
          </div>
        )}
      </div>
    </main>
  );
}
```

### `/app/body-map/page.tsx`
```typescript
'use client';
import { useState, useEffect } from 'react';

export default function Home() {
  const [selectedPoint, setSelectedPoint] = useState<string | null>(null);
  const [mediaUrl, setMediaUrl] = useState<string | null>(null);  // puede ser imagen o video
  const [mediaTipo, setMediaTipo] = useState<'imagen' | 'video'>('imagen');
  const [rotacion, setRotacion] = useState(0);
  const [ejerciciosRecomendados, setEjerciciosRecomendados] = useState<any[]>([]);
  const [mensaje, setMensaje] = useState('');

  const puntosPorDefecto = [
    { id: 0, nombre: 'Cuello', x: 50, y: 20 },
    { id: 1, nombre: 'Hombro izquierdo', x: 30, y: 30 },
    { id: 2, nombre: 'Hombro derecho', x: 70, y: 30 },
    { id: 3, nombre: 'Espalda', x: 50, y: 45 },
    { id: 4, nombre: 'Cadera izquierda', x: 35, y: 60 },
    { id: 5, nombre: 'Cadera derecha', x: 65, y: 60 },
    { id: 6, nombre: 'Rodilla izquierda', x: 35, y: 80 },
    { id: 7, nombre: 'Rodilla derecha', x: 65, y: 80 },
    { id: 8, nombre: 'Tobillo izquierdo', x: 35, y: 92 },
    { id: 9, nombre: 'Tobillo derecho', x: 65, y: 92 },
  ];

  const [puntos, setPuntos] = useState(puntosPorDefecto);

  // ========== CARGAR TODO AL INICIAR ==========
  useEffect(() => {
    const guardado = localStorage.getItem('bodyMapCompleto');
    if (guardado) {
      try {
        const datos = JSON.parse(guardado);
        if (datos.puntos) setPuntos(datos.puntos);
        if (datos.rotacion !== undefined) setRotacion(datos.rotacion);
        if (datos.mediaUrl) setMediaUrl(datos.mediaUrl);
        if (datos.mediaTipo) setMediaTipo(datos.mediaTipo);
        setMensaje('✅ Datos cargados');
        setTimeout(() => setMensaje(''), 2000);
      } catch (e) {}
    }
  }, []);

  // ========== GUARDAR TODO (MANUAL) ==========
  const guardarTodo = () => {
    const datos = {
      puntos: puntos,
      rotacion: rotacion,
      mediaUrl: mediaUrl,
      mediaTipo: mediaTipo,
    };
    localStorage.setItem('bodyMapCompleto', JSON.stringify(datos));
    setMensaje('✅ Todo guardado correctamente');
    setTimeout(() => setMensaje(''), 2000);
  };

  const convertirABase64 = (archivo: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          resolve(reader.result);
        } else {
          reject(new Error('No se pudo convertir el archivo a Base64'));
        }
      };
      reader.onerror = reject;
      reader.readAsDataURL(archivo);
    });
  };

  const subirArchivo = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const archivo = e.target.files?.[0];
    if (!archivo) return;

    const tipo = archivo.type.startsWith('image/') ? 'imagen' : 'video';
    const base64 = await convertirABase64(archivo);
    
    setMediaUrl(base64);
    setMediaTipo(tipo);
    setRotacion(0);
    
    // Guardar automáticamente después de subir
    setTimeout(() => guardarTodo(), 100);
    setMensaje(`${tipo} cargado correctamente. Presiona "Guardar todo"`);
    setTimeout(() => setMensaje(''), 2000);
  };

  const rotarImagen = () => {
    if (mediaTipo === 'video') {
      setMensaje('⚠️ Los videos no se pueden rotar');
      setTimeout(() => setMensaje(''), 1500);
      return;
    }
    setRotacion((prev) => (prev + 90) % 360);
    setMensaje('Rotación aplicada. Presiona "Guardar todo" para guardarla.');
    setTimeout(() => setMensaje(''), 1500);
  };

  const moverPunto = (deltaX: number, deltaY: number) => {
    if (selectedPoint === null) {
      setMensaje('Primero selecciona un punto rojo');
      setTimeout(() => setMensaje(''), 1000);
      return;
    }
    setPuntos(puntos.map(p => {
      if (p.nombre === selectedPoint) {
        return { ...p, x: Math.min(98, Math.max(2, p.x + deltaX)), y: Math.min(98, Math.max(2, p.y + deltaY)) };
      }
      return p;
    }));
    setMensaje(`${selectedPoint} movido. Presiona "Guardar todo"`);
    setTimeout(() => setMensaje(''), 1000);
  };

  const resetearPuntos = () => {
    if (confirm('¿Resetear todos los puntos?')) {
      setPuntos(puntosPorDefecto);
      setMensaje('Puntos reseteados. Presiona "Guardar todo" para guardar.');
      setTimeout(() => setMensaje(''), 2000);
    }
  };

  const limpiarTodo = () => {
    if (confirm('Eliminar todo? Volverás a empezar.')) {
      localStorage.removeItem('bodyMapCompleto');
      setMediaUrl(null);
      setRotacion(0);
      setPuntos(puntosPorDefecto);
      setSelectedPoint(null);
      setEjerciciosRecomendados([]);
      setMensaje('Todo eliminado');
      setTimeout(() => setMensaje(''), 2000);
    }
  };

  const ejerciciosPorZona = {
    'Cuello': [{ nombre: 'Rotación de cuello', duracion: '30', dificultad: 'Baja', instrucciones: 'Gira suavemente la cabeza.' }],
    'Hombro izquierdo': [{ nombre: 'Círculos de hombro', duracion: '30', dificultad: 'Baja', instrucciones: 'Rota los hombros.' }],
    'Hombro derecho': [{ nombre: 'Círculos de hombro', duracion: '30', dificultad: 'Baja', instrucciones: 'Rota los hombros.' }],
    'Espalda': [{ nombre: 'Gato-vaca', duracion: '45', dificultad: 'Baja', instrucciones: 'Arquea y redondea la espalda.' }],
    'Cadera izquierda': [{ nombre: 'Mariposa', duracion: '30', dificultad: 'Baja', instrucciones: 'Plantas de pies juntas.' }],
    'Cadera derecha': [{ nombre: 'Mariposa', duracion: '30', dificultad: 'Baja', instrucciones: 'Plantas de pies juntas.' }],
    'Rodilla izquierda': [{ nombre: 'Flexión de rodilla', duracion: '30', dificultad: 'Baja', instrucciones: 'Desliza el talón.' }],
    'Rodilla derecha': [{ nombre: 'Flexión de rodilla', duracion: '30', dificultad: 'Baja', instrucciones: 'Desliza el talón.' }],
    'Tobillo izquierdo': [{ nombre: 'Círculos de tobillo', duracion: '30', dificultad: 'Baja', instrucciones: 'Rota el tobillo.' }],
    'Tobillo derecho': [{ nombre: 'Círculos de tobillo', duracion: '30', dificultad: 'Baja', instrucciones: 'Rota el tobillo.' }]
  };

  const seleccionarZona = (nombre: string) => {
    setSelectedPoint(nombre);
    setEjerciciosRecomendados((ejerciciosPorZona as Record<string, any>)[nombre] || []);
  };

  const irARutina = () => {
    if (ejerciciosRecomendados.length === 0) {
      alert('Primero selecciona una zona del mapa');
      return;
    }
    const ejerciciosParam = encodeURIComponent(JSON.stringify(ejerciciosRecomendados));
    window.location.href = `/rutina?ejercicios=${ejerciciosParam}`;
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ fontSize: '24px', fontWeight: 'bold' }}>Panel del entrenador - Mapa de dolor</h1>
      
      {mensaje && (
        <div style={{ backgroundColor: '#d1fae5', color: '#065f46', padding: '10px', borderRadius: '8px', marginBottom: '15px' }}>
          {mensaje}
        </div>
      )}

      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap' }}>
        <label style={{ backgroundColor: '#3b82f6', color: 'white', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer' }}>
          📁 Subir imagen o video
          <input type="file" accept="image/*,video/*" onChange={subirArchivo} style={{ display: 'none' }} />
        </label>
        
        {mediaUrl && mediaTipo === 'imagen' && (
          <button onClick={rotarImagen} style={{ backgroundColor: '#10b981', color: 'white', padding: '8px 16px', borderRadius: '8px', border: 'none', cursor: 'pointer' }}>
            🔄 Rotar imagen 90°
          </button>
        )}
        
        <button onClick={guardarTodo} style={{ backgroundColor: '#1e40af', color: 'white', padding: '8px 16px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>
          💾 GUARDAR TODO
        </button>
        
        <button onClick={resetearPuntos} style={{ backgroundColor: '#f59e0b', color: 'white', padding: '8px 16px', borderRadius: '8px', border: 'none', cursor: 'pointer' }}>
          🔄 Resetear puntos
        </button>
        
        <button onClick={limpiarTodo} style={{ backgroundColor: '#ef4444', color: 'white', padding: '8px 16px', borderRadius: '8px', border: 'none', cursor: 'pointer' }}>
          🗑️ Limpiar todo
        </button>
      </div>

      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
        
        {/* MAPA */}
        <div style={{
          position: 'relative',
          width: '650px',
          height: '750px',
          backgroundColor: '#e5e7eb',
          border: '1px solid #ccc',
          borderRadius: '8px',
          overflow: 'hidden'
        }}>
          {mediaUrl && mediaTipo === 'imagen' && (
            <img
              src={mediaUrl}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                transform: `rotate(${rotacion}deg)`,
                transition: 'transform 0.3s ease'
              }}
              alt="mapa"
            />
          )}
          
          {mediaUrl && mediaTipo === 'video' && (
            <video
              src={mediaUrl}
              controls
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain'
              }}
            />
          )}
          
          {!mediaUrl && (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#666' }}>
              Sube una imagen o video
            </div>
          )}

          {puntos.map((p) => (
            <button
              key={p.id}
              onClick={() => seleccionarZona(p.nombre)}
              style={{
                position: 'absolute',
                left: `${p.x}%`,
                top: `${p.y}%`,
                width: '34px',
                height: '34px',
                borderRadius: '50%',
                backgroundColor: selectedPoint === p.nombre ? '#22c55e' : '#ef4444',
                border: '3px solid white',
                cursor: 'pointer',
                transform: 'translate(-50%, -50%)',
                fontSize: '18px',
                color: 'white',
                zIndex: 10,
                boxShadow: '0 1px 3px rgba(0,0,0,0.3)'
              }}
              title={p.nombre}
            >
              ●
            </button>
          ))}
        </div>

        {/* EJERCICIOS */}
        <div style={{
          width: '300px',
          backgroundColor: 'white',
          border: '1px solid #ccc',
          borderRadius: '8px',
          padding: '15px',
          maxHeight: '750px',
          overflowY: 'auto'
        }}>
          <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '15px' }}>
            {selectedPoint ? `📋 Ejercicios para ${selectedPoint}` : '🔍 Selecciona una zona'}
          </h3>
          
          {ejerciciosRecomendados.length === 0 && selectedPoint && (
            <p style={{ color: '#666' }}>No hay ejercicios.</p>
          )}
          
          {ejerciciosRecomendados.length === 0 && !selectedPoint && (
            <p style={{ color: '#666' }}>Haz clic en un punto rojo.</p>
          )}
          
          {ejerciciosRecomendados.map((ej, i) => (
            <div key={i} style={{ borderBottom: '1px solid #eee', padding: '10px 0' }}>
              <h4 style={{ fontWeight: 'bold', color: '#3b82f6' }}>{ej.nombre}</h4>
              <p style={{ fontSize: '12px', color: '#666' }}>⏱️ {ej.duracion} seg | 📊 {ej.dificultad}</p>
              <p style={{ fontSize: '13px' }}>{ej.instrucciones}</p>
            </div>
          ))}

          {ejerciciosRecomendados.length > 0 && (
            <button onClick={irARutina} style={{ backgroundColor: '#22c55e', color: 'white', padding: '10px 20px', borderRadius: '8px', border: 'none', cursor: 'pointer', marginTop: '15px', width: '100%', fontWeight: 'bold' }}>
              🏋️ INICIAR RUTINA ({ejerciciosRecomendados.length} ejercicios)
            </button>
          )}
        </div>

        {/* CONTROLES */}
        {selectedPoint && (
          <div style={{ backgroundColor: 'white', border: '1px solid #ccc', borderRadius: '8px', padding: '15px', width: '170px', textAlign: 'center' }}>
            <h3 style={{ fontSize: '14px' }}>🎯 Ajustar</h3>
            <p style={{ fontWeight: 'bold', color: '#22c55e', fontSize: '12px' }}>{selectedPoint}</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '5px', width: '90px', margin: '0 auto' }}>
              <div></div>
              <button onClick={() => moverPunto(0, -3)} style={{ background: '#3b82f6', color: 'white', border: 'none', borderRadius: '4px', padding: '6px', cursor: 'pointer' }}>▲</button>
              <div></div>
              <button onClick={() => moverPunto(-3, 0)} style={{ background: '#3b82f6', color: 'white', border: 'none', borderRadius: '4px', padding: '6px', cursor: 'pointer' }}>◀</button>
              <button onClick={() => moverPunto(0, 0)} style={{ background: '#6b7280', color: 'white', border: 'none', borderRadius: '4px', padding: '6px', cursor: 'pointer' }}>●</button>
              <button onClick={() => moverPunto(3, 0)} style={{ background: '#3b82f6', color: 'white', border: 'none', borderRadius: '4px', padding: '6px', cursor: 'pointer' }}>▶</button>
              <div></div>
              <button onClick={() => moverPunto(0, 3)} style={{ background: '#3b82f6', color: 'white', border: 'none', borderRadius: '4px', padding: '6px', cursor: 'pointer' }}>▼</button>
              <div></div>
            </div>
            <p style={{ fontSize: '10px', marginTop: '10px' }}>Luego presiona  💾 GUARDAR TODO</p>
          </div>
        )}
      </div>
    </div>
  );
}
```

### `/app/exercises/page.tsx`
```typescript
'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function ExercisesPage() {
  const [exercises, setExercises] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadExercises() {
      const { data, error } = await supabase
        .from('exercises')
        .select('*');

        console.log("DATA:", data);
        console.log("ERROR:", error);
      

      if (error) {
        console.error('Error:', error);
      } else {
        setExercises(data || []);
      }

      setLoading(false);
    }

    loadExercises();
  }, []);

  if (loading) {
    return <div style={{ padding: 20 }}>Loading exercises...</div>;
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Exercises Library</h1>

      {exercises.map((ex) => (
        <div
          key={ex.id}
          style={{
            border: '1px solid #ccc',
            marginBottom: 20,
            padding: 15,
            borderRadius: 10,
          }}
        >
          <h2>{ex.name}</h2>

          <p><strong>Area:</strong> {ex.target_body_area}</p>
          <p><strong>Category:</strong> {ex.category}</p>

          <p>{ex.description}</p>

          {ex.starting_position && (
            <p><strong>Start:</strong> {ex.starting_position}</p>
          )}

          {ex.movement_steps && (
            <ul>
              {ex.movement_steps.map((step: string, i: number) => (
                <li key={i}>{step}</li>
              ))}
            </ul>
          )}

          {ex.common_mistakes && (
            <div>
              <strong>Mistakes:</strong>
              <ul>
                {ex.common_mistakes.map((m: string, i: number) => (
                  <li key={i}>{m}</li>
                ))}
              </ul>
            </div>
          )}

          {ex.pain_rule && (
            <p style={{ color: 'red' }}>
              <strong>Pain Rule:</strong> {ex.pain_rule}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
```

---

## Components

### `/components/AppHeader.tsx`
```typescript
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslation } from '@/lib/useTranslation';
import { getCurrentSession, signOutUser } from '@/lib/auth';

export function AppHeader() {
  const { language, setLanguage, t } = useTranslation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const session = await getCurrentSession();
      setIsLoggedIn(!!session);
    } catch (error) {
      setIsLoggedIn(false);
    } finally {
      setIsLoading(false);
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

  if (isLoading) {
    return (
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-900">RegenMove</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-gray-900">RegenMove</h1>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <a href="/" className="text-gray-700 hover:text-gray-900 transition-colors">
              {t('nav.home')}
            </a>
            {isLoggedIn && (
              <>
                <a href="/assessment" className="text-gray-700 hover:text-gray-900 transition-colors">
                  {t('nav.assessment')}
                </a>
                <a href="/dashboard" className="text-gray-700 hover:text-gray-900 transition-colors">
                  {t('nav.dashboard')}
                </a>
              </>
            )}
          </nav>

          <div className="flex items-center space-x-4">
            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="px-3 py-1 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
            >
              {language === 'es' ? 'EN' : 'ES'}
            </button>

            {/* Auth Buttons */}
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 transition-colors"
              >
                {t('auth.logout')}
              </button>
            ) : (
              <div className="flex items-center space-x-2">
                <a
                  href="/login"
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
                >
                  {t('auth.login')}
                </a>
                <a
                  href="/signup"
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
                >
                  {t('auth.signup')}
                </a>
              </div>
            )}
          </div>
        </div>
      </header>
    );
  );
}
```

### `/components/RoleSelector.tsx`
```typescript
'use client';

import { useTranslation } from '@/lib/useTranslation';

interface Role {
  id: string;
  emoji: string;
  title: string;
  description: string;
}

const roles: Role[] = [
  {
    id: 'patient',
    emoji: '🏥',
    title: 'auth.roles.patient.title',
    description: 'auth.roles.patient.description'
  },
  {
    id: 'coach',
    emoji: '💪',
    title: 'auth.roles.coach.title',
    description: 'auth.roles.coach.description'
  },
  {
    id: 'clinic',
    emoji: '🏥',
    title: 'auth.roles.clinic.title',
    description: 'auth.roles.clinic.description'
  }
];

interface RoleSelectorProps {
  selectedRole: string | null;
  onRoleSelect: (roleId: string) => void;
}

export function RoleSelector({ selectedRole, onRoleSelect }: RoleSelectorProps) {
  const { t } = useTranslation();

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {t('auth.selectRole')}
        </h3>
        <p className="text-sm text-gray-600">
          {t('auth.selectRoleDescription')}
        </p>
      </div>

      <div className="grid gap-3">
        {roles.map((role) => (
          <button
            key={role.id}
            onClick={() => onRoleSelect(role.id)}
            className={`w-full p-4 border-2 rounded-xl text-left transition-all duration-200 ${
              selectedRole === role.id
                ? 'border-blue-500 bg-blue-50 shadow-md'
                : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center space-x-3">
              <span className="text-2xl">{role.emoji}</span>
              <div className="flex-1">
                <h4 className="font-medium text-gray-900">
                  {t(role.title)}
                </h4>
                <p className="text-sm text-gray-600 mt-1">
                  {t(role.description)}
                </p>
              </div>
              {selectedRole === role.id && (
                <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                  <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 8 8">
                    <path d="M6.564.75l-3.59 3.612-1.538-1.55L0 4.26l2.974 2.99L8 2.193z"/>
                  </svg>
                </div>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
```

### `/components/BodyMap.tsx`
```typescript
'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

export function BodyMap({ onSelectArea, selectedArea, coachId }: { onSelectArea: (area: string) => void; selectedArea?: string; coachId?: string }) {
  const [backgroundUrl, setBackgroundUrl] = useState('/default-body-map.svg');
  const [loading, setLoading] = useState(true);

  // Cargar la imagen personalizada del coach (si existe)
  useEffect(() => {
    const fetchCustomMap = async () => {
      const { data, error } = await supabase
        .from('media_assets')
        .select('url')
        .eq('asset_type', 'body_map')
        .eq('owner_id', coachId)
        .single();
      if (data && !error) {
        setBackgroundUrl(data.url);
      }
      setLoading(false);
    };
    if (coachId) fetchCustomMap();
  }, [coachId]);

  // Puntos predefinidos (coordenadas relativas en %)
  const hotspots = [
    { area: 'Cuello', x: 50, y: 15 },
    { area: 'Hombros', x: 30, y: 25 },
    { area: 'Hombros', x: 70, y: 25 },
    { area: 'Espalda alta', x: 50, y: 35 },
    { area: 'Espalda baja', x: 50, y: 55 },
    { area: 'Glúteos', x: 50, y: 70 },
    { area: 'Rodillas', x: 35, y: 85 },
    { area: 'Rodillas', x: 65, y: 85 },
    { area: 'Tobillos', x: 50, y: 95 },
  ];

  if (loading) return <div className="text-center p-4">Cargando mapa...</div>;

  return (
    <div className="relative w-full max-w-md mx-auto">
      <img
        src={backgroundUrl}
        alt="Mapa corporal"
        className="w-full h-auto border rounded-lg shadow"
      />
      {hotspots.map((spot, idx) => (
        <button
          key={idx}
          onClick={() => onSelectArea(spot.area)}
          className={`absolute w-6 h-6 rounded-full transform -translate-x-1/2 -translate-y-1/2 
            ${selectedArea === spot.area ? 'bg-green-500 scale-125' : 'bg-blue-500'} 
            bg-opacity-70 hover:bg-opacity-100 transition-all duration-200 cursor-pointer`}
          style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
          title={spot.area}
        >
          ●
        </button>
      ))}
    </div>
  );
}
```

### `/components/ImageUploader.tsx`
```typescript
'use client';
import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

export function ImageUploader({ onUpload, assetType, entityId }: { onUpload: (url: string) => void; assetType: string; entityId: string }) {
  const [uploading, setUploading] = useState(false);

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const fileExt = file.name.split('.').pop();
    const fileName = `${assetType}_${entityId}_${Date.now()}.${fileExt}`;
    const filePath = `public/${fileName}`;

    const { error } = await supabase.storage.from('media').upload(filePath, file);
    if (error) {
      console.error('Error subiendo:', error);
      setUploading(false);
      return;
    }

    const { data: { publicUrl } } = supabase.storage.from('media').getPublicUrl(filePath);
    onUpload(publicUrl);
    setUploading(false);
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleChange} disabled={uploading} />
      {uploading && <span className="ml-2 text-sm">Subiendo...</span>}
    </div>
  );
}
```

### `/components/AdManager.tsx`
```typescript
'use client';
export function AdManager({ coachId }: { coachId: string }) {
  return <div>Aquí irá la gestión de anuncios (próximamente)</div>;
}
```

**Note:** The following components are empty/placeholder files:
- `/components/Navbar.tsx`
- `/components/PainAssessmentForm.tsx`
- `/components/ProgressSummary.tsx`
- `/components/ProtectedRoute.tsx`
- `/components/RoutineCard.tsx`

---

## Library Files

### `/lib/auth.ts`
```typescript
import { createBrowserClient } from '@supabase/auth-helpers-nextjs'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Client-side Supabase client
export const supabase = createBrowserClient(supabaseUrl, supabaseAnonKey)

// Server-side Supabase client (for API routes)
export const createServerSupabaseClient = () => {
  return createClient(supabaseUrl, supabaseAnonKey)
}

// Auth utilities
export async function getCurrentUser() {
  const { data: { user }, error } = await supabase.auth.getUser()
  if (error) throw error
  return user
}

export async function getCurrentSession() {
  const { data: { session }, error } = await supabase.auth.getSession()
  if (error) throw error
  return session
}

export async function signOutUser() {
  const { error } = await supabase.auth.signOut()
  if (error) throw error
}

export async function signInWithEmail(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })
  if (error) throw error
  return data
}

export async function signUpWithEmail(email: string, password: string, metadata?: any) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: metadata
    }
  })
  if (error) throw error
  return data
}

export async function resetPassword(email: string) {
  const { error } = await supabase.auth.resetPasswordForEmail(email)
  if (error) throw error
}

export async function updatePassword(password: string) {
  const { data, error } = await supabase.auth.updateUser({
    password
  })
  if (error) throw error
  return data
}

// Profile management
export async function getUserProfile(userId: string) {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single()

  if (error) throw error
  return data
}

export async function updateUserProfile(userId: string, updates: any) {
  const { data, error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('id', userId)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function createUserProfile(profile: any) {
  const { data, error } = await supabase
    .from('profiles')
    .insert(profile)
    .select()
    .single()

  if (error) throw error
  return data
}
```

### `/lib/supabaseClient.ts`
```typescript
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

### `/lib/useTranslation.tsx`
```typescript
'use client';

import translations from './translations.json';
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'es' | 'en';

interface TranslationContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

interface I18nProviderProps {
  children: ReactNode;
}

export function I18nProvider({ children }: I18nProviderProps) {
  const [language, setLanguage] = useState<Language>('es');

  useEffect(() => {
    // Load language from localStorage
    const saved = localStorage.getItem('language') as Language;
    if (saved && (saved === 'es' || saved === 'en')) {
      setLanguage(saved);
    }
  }, []);

  const setLanguageAndSave = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };

  const t = (key: string): string => {
    try {
      const keys = key.split('.');
      let value: any = translations[language];
      
      for (const k of keys) {
        if (value && typeof value === 'object') {
          value = value[k];
        } else {
          return key;
        }
      }
      
      return value || key;
    } catch {
      return key;
    }
  };

  return (
    <TranslationContext.Provider value={{ language, setLanguage: setLanguageAndSave, t }}>
      {children}
    </TranslationContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(TranslationContext);
  if (context === undefined) {
    throw new Error('useTranslation must be used within an I18nProvider');
  }
  return context;
}
```

### `/lib/translations.json`
```json
{
  "es": {
    "nav": {
      "home": "Inicio",
      "assessment": "Evaluación",
      "dashboard": "Panel"
    },
    "auth": {
      "login": "Iniciar Sesión",
      "signup": "Registrarse",
      "logout": "Cerrar Sesión",
      "email": "Correo electrónico",
      "password": "Contraseña",
      "confirmPassword": "Confirmar contraseña",
      "forgotPassword": "Olvidé mi contraseña",
      "resetPassword": "Restablecer contraseña",
      "loginTitle": "Inicia sesión en tu cuenta",
      "signupTitle": "Crea tu cuenta",
      "loginDescription": "Ingresa tus credenciales para acceder",
      "signupDescription": "Únete a la comunidad de rehabilitación",
      "selectRole": "Selecciona tu rol",
      "selectRoleDescription": "Elige cómo usarás la plataforma",
      "roles": {
        "patient": {
          "title": "Paciente",
          "description": "Accede a tus rutinas de rehabilitación personalizadas"
        },
        "coach": {
          "title": "Entrenador",
          "description": "Crea y gestiona programas de rehabilitación"
        },
        "clinic": {
          "title": "Clínica",
          "description": "Administra múltiples pacientes y entrenadores"
        }
      },
      "loginButton": "Iniciar Sesión",
      "signupButton": "Crear Cuenta",
      "loading": "Cargando...",
      "error": "Error",
      "success": "Éxito",
      "invalidCredentials": "Credenciales inválidas",
      "emailRequired": "El correo electrónico es requerido",
      "passwordRequired": "La contraseña es requerida",
      "passwordMismatch": "Las contraseñas no coinciden",
      "roleRequired": "Debes seleccionar un rol",
      "accountCreated": "Cuenta creada exitosamente",
      "checkEmail": "Revisa tu correo para confirmar tu cuenta"
    },
    "home": {
      "title": "Bienvenido a RegenMove",
      "subtitle": "Tu compañero inteligente para la rehabilitación física",
      "description": "Utiliza IA avanzada para crear rutinas personalizadas de rehabilitación basadas en tu condición específica.",
      "getStarted": "Comenzar",
      "features": {
        "assessment": "Evaluación Inteligente",
        "assessmentDesc": "Análisis detallado de tu condición física",
        "personalized": "Rutinas Personalizadas",
        "personalizedDesc": "Ejercicios adaptados a tus necesidades",
        "progress": "Seguimiento de Progreso",
        "progressDesc": "Monitorea tu recuperación en tiempo real"
      }
    },
    "common": {
      "loading": "Cargando...",
      "error": "Error",
      "success": "Éxito",
      "cancel": "Cancelar",
      "save": "Guardar",
      "delete": "Eliminar",
      "edit": "Editar",
      "back": "Volver",
      "next": "Siguiente",
      "previous": "Anterior",
      "close": "Cerrar",
      "open": "Abrir"
    }
  },
  "en": {
    "nav": {
      "home": "Home",
      "assessment": "Assessment",
      "dashboard": "Dashboard"
    },
    "auth": {
      "login": "Login",
      "signup": "Sign Up",
      "logout": "Logout",
      "email": "Email",
      "password": "Password",
      "confirmPassword": "Confirm Password",
      "forgotPassword": "Forgot Password",
      "resetPassword": "Reset Password",
      "loginTitle": "Sign in to your account",
      "signupTitle": "Create your account",
      "loginDescription": "Enter your credentials to access",
      "signupDescription": "Join the rehabilitation community",
      "selectRole": "Select your role",
      "selectRoleDescription": "Choose how you'll use the platform",
      "roles": {
        "patient": {
          "title": "Patient",
          "description": "Access your personalized rehabilitation routines"
        },
        "coach": {
          "title": "Coach",
          "description": "Create and manage rehabilitation programs"
        },
        "clinic": {
          "title": "Clinic",
          "description": "Manage multiple patients and coaches"
        }
      },
      "loginButton": "Login",
      "signupButton": "Create Account",
      "loading": "Loading...",
      "error": "Error",
      "success": "Success",
      "invalidCredentials": "Invalid credentials",
      "emailRequired": "Email is required",
      "passwordRequired": "Password is required",
      "passwordMismatch": "Passwords do not match",
      "roleRequired": "You must select a role",
      "accountCreated": "Account created successfully",
      "checkEmail": "Check your email to confirm your account"
    },
    "home": {
      "title": "Welcome to RegenMove",
      "subtitle": "Your intelligent companion for physical rehabilitation",
      "description": "Use advanced AI to create personalized rehabilitation routines based on your specific condition.",
      "getStarted": "Get Started",
      "features": {
        "assessment": "Smart Assessment",
        "assessmentDesc": "Detailed analysis of your physical condition",
        "personalized": "Personalized Routines",
        "personalizedDesc": "Exercises adapted to your needs",
        "progress": "Progress Tracking",
        "progressDesc": "Monitor your recovery in real time"
      }
    },
    "common": {
      "loading": "Loading...",
      "error": "Error",
      "success": "Success",
      "cancel": "Cancel",
      "save": "Save",
      "delete": "Delete",
      "edit": "Edit",
      "back": "Back",
      "next": "Next",
      "previous": "Previous",
      "close": "Close",
      "open": "Open"
    }
  }
}
```

**Note:** The following library files are empty/placeholder files:
- `/lib/types.ts`
- `/lib/routines.ts`

---

## Database Schema

### `/supabase/schema.sql`
```sql
create table if not exists public.profiles (
  id uuid primary key,
  full_name text,
  role text not null check (role in ('coach', 'student'))
);

create table if not exists public.pain_logs (
  id bigserial primary key,
  user_id uuid not null references public.profiles(id) on delete cascade,
  pain_location text not null,
  intensity integer not null check (intensity >= 0 and intensity <= 10),
  pain_type text not null,
  created_at timestamp with time zone default now()
);

create table if not exists public.routines (
  id bigserial primary key,
  user_id uuid not null references public.profiles(id) on delete cascade,
  created_at timestamp with time zone default now()
);

create table if not exists public.routine_items (
  id bigserial primary key,
  routine_id bigint not null references public.routines(id) on delete cascade,
  exercise_id integer not null references public.exercises(id) on delete cascade,
  order_index integer not null default 0
);

create table if not exists public.progress_logs (
  id bigserial primary key,
  user_id uuid not null references public.profiles(id) on delete cascade,
  routine_id bigint references public.routines(id) on delete set null,
  pain_before integer check (pain_before >= 0 and pain_before <= 10),
  pain_after integer check (pain_after >= 0 and pain_after <= 10),
  completed boolean default false,
  created_at timestamp with time zone default now()
);

create table if not exists public.coach_student_links (
  id bigserial primary key,
  coach_id uuid not null references public.profiles(id) on delete cascade,
  student_id uuid not null references public.profiles(id) on delete cascade
);
```

---

## Public Assets

### `/public/body-map/body_map.png`
- **Description**: Default body map image used for pain location visualization
- **Path**: `/public/body-map/body_map.png`
- **Usage**: Displayed as background in the BodyMap component when no custom image is uploaded

### `/public/next.svg`
- **Description**: Next.js logo SVG
- **Path**: `/public/next.svg`

### `/public/vercel.svg`
- **Description**: Vercel logo SVG
- **Path**: `/public/vercel.svg`

---

## Environment Configuration

### `/.env.local`
```bash
NEXT_PUBLIC_SUPABASE_URL=https://aqjpniofouffzvmsazjb.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_JH6ricrIJUAz27AZdysmIg_DeNu4jRM
```

---

## File Structure Summary

```
regenmove-nextjs/
├── app/                          # Next.js App Router pages
│   ├── layout.tsx               # Root layout with I18nProvider
│   ├── page.tsx                 # Homepage with hero section
│   ├── globals.css              # Global Tailwind styles
│   ├── login/
│   │   └── page.tsx            # Authentication login page
│   ├── signup/
│   │   └── page.tsx            # User registration with role selection
│   ├── dashboard/
│   │   └── page.tsx            # User dashboard with feature cards
│   ├── assessment/
│   │   └── page.tsx            # Pain assessment form
│   ├── body-map/
│   │   └── page.tsx            # Interactive body map for pain marking
│   ├── exercises/
│   │   └── page.tsx            # Exercise library display
│   └── favicon.ico
├── components/                   # Reusable React components
│   ├── AppHeader.tsx            # Navigation header with auth/language toggle
│   ├── RoleSelector.tsx         # Role selection component for signup
│   ├── BodyMap.tsx              # Interactive body map component
│   ├── ImageUploader.tsx        # File upload component for Supabase storage
│   ├── AdManager.tsx            # Placeholder for ad management
│   ├── Navbar.tsx               # Empty placeholder
│   ├── PainAssessmentForm.tsx   # Empty placeholder
│   ├── ProgressSummary.tsx      # Empty placeholder
│   ├── ProtectedRoute.tsx       # Empty placeholder
│   └── RoutineCard.tsx          # Empty placeholder
├── lib/                         # Utility libraries and configurations
│   ├── auth.ts                  # Supabase authentication utilities
│   ├── supabaseClient.ts        # Supabase client configuration
│   ├── useTranslation.tsx       # Internationalization hook and provider
│   ├── translations.json        # Translation strings (ES/EN)
│   ├── types.ts                 # Empty placeholder
│   └── routines.ts              # Empty placeholder
├── supabase/                    # Database schema and migrations
│   └── schema.sql               # PostgreSQL database schema
├── public/                      # Static assets
│   ├── body-map/
│   │   └── body_map.png        # Default body map image
│   ├── next.svg                 # Next.js logo
│   └── vercel.svg               # Vercel logo
├── package.json                 # Dependencies and scripts
├── tsconfig.json               # TypeScript configuration
├── next.config.js              # Next.js configuration
├── tailwind.config.ts          # Tailwind CSS configuration
├── postcss.config.js           # PostCSS configuration
├── .gitignore                  # Git ignore rules
├── .env.local                  # Environment variables
└── next-env.d.ts               # Next.js TypeScript declarations
```

---

## Key Features Implemented

1. **Multi-role Authentication System**
   - Patient, Coach, and Clinic roles
   - Supabase Auth integration
   - Session management and protected routes

2. **Internationalization (i18n)**
   - Spanish and English support
   - Context-based translation system
   - Persistent language preferences

3. **Pain Assessment & Body Mapping**
   - Interactive body map with clickable hotspots
   - Pain intensity and type logging
   - Local storage for body map customization

4. **Responsive UI/UX**
   - Tailwind CSS for styling
   - Mobile-first design
   - Modern component architecture

5. **Database Architecture**
   - User profiles with role-based access
   - Pain logs and progress tracking
   - Exercise and routine management
   - Coach-student relationships

---

## Development Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint
```

---

## Deployment

This application is configured for deployment on Vercel with the following considerations:

- **Environment Variables**: Supabase credentials stored in Vercel environment
- **Build Settings**: Automatic Next.js detection
- **Database**: Supabase PostgreSQL (hosted)
- **File Storage**: Supabase Storage for media assets

---

*Documentation generated on May 2, 2026 - RegenMove v0.1.0*
```