import type { Metadata } from 'next'
import { Anton, Archivo, IBM_Plex_Mono } from 'next/font/google'
import './globals.css'
import Ticker from '@/components/Ticker'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

const anton = Anton({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-anton',
  display: 'swap',
})

const archivo = Archivo({
  subsets: ['latin'],
  variable: '--font-archivo',
  display: 'swap',
})

const ibmPlexMono = IBM_Plex_Mono({
  weight: ['400', '500'],
  subsets: ['latin'],
  variable: '--font-ibm-plex-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: '11RUNCLUB — Dein Runclub in Solothurn',
  description:
    'Jeden Dienstag 18:30 Uhr am SOL-ID, Klosterplatz 6. Keine Anmeldung nötig. Run together. Improve together. Enjoy together.',
  keywords: ['Runclub', 'Solothurn', 'Laufen', 'Running', '11RUNCLUB', 'Laufgruppe', 'Schweiz'],
  openGraph: {
    title: '11RUNCLUB — Dein Runclub in Solothurn',
    description: 'Jeden Dienstag 18:30 Uhr. Keine Anmeldung. Einfach kommen.',
    locale: 'de_CH',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="de"
      className={`${anton.variable} ${archivo.variable} ${ibmPlexMono.variable}`}
    >
      <body>
        {/* Grain overlay */}
        <div className="grain-overlay" aria-hidden="true" />

        {/* Ticker */}
        <Ticker />

        {/* Navigation */}
        <Nav />

        {/* Main content */}
        <main>{children}</main>

        {/* Footer */}
        <Footer />
      </body>
    </html>
  )
}
