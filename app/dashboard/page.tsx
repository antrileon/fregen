'use client';

import { useEffect } from 'react';

export default function DashboardRedirectPage() {
  useEffect(() => {
    window.location.href = '/coach';
  }, []);

  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <p>Redirigiendo al panel...</p>
    </main>
  );
}