'use client';

import { useState } from 'react';

export function BrandLogo() {
  const [logoFailed, setLogoFailed] = useState(false);

  if (!logoFailed) {
    return (
      <span className="flex min-w-0 items-center gap-3">
        <img
          src="/brand/logo.png"
          alt="Muscular Neuro Liberation"
          className="h-10 w-10 shrink-0 rounded-xl object-contain"
          onError={() => setLogoFailed(true)}
        />
        <span className="min-w-0">
          <span className="block truncate text-base font-bold leading-tight text-amber-400 sm:text-xl">
            Muscular Neuro Liberation
          </span>
          <span className="hidden truncate text-sm font-medium text-slate-400 sm:block">
            Welcome back, Andres Trimino
          </span>
        </span>
      </span>
    );
  }

  return (
    <>
      <span className="truncate text-base font-bold leading-tight text-amber-400 sm:text-xl">
        Muscular Neuro Liberation
      </span>
      <span className="hidden truncate text-sm font-medium text-slate-400 sm:block">
        Welcome back, Andres Trimino
      </span>
    </>
  );
}
