import './globals.css'
import './watermark-surfaces.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { I18nProvider } from '@/lib/useTranslation'
import { AppHeader } from '@/components/AppHeader'
import { WatermarkRuntime } from '@/components/WatermarkRuntime'

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
    <html lang="es" data-theme="dark">
      <body className={`${inter.className} min-h-screen`}>
        <I18nProvider>
          <WatermarkRuntime />
          <div className="app-shell min-h-screen flex flex-col">
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
