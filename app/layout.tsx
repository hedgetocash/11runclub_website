import type { Metadata } from 'next'
import { Anton, Archivo, IBM_Plex_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
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

const SITE_TITLE = '11RUNCLUB Solothurn | Deine lokale Running Community'
const SITE_DESCRIPTION =
  'Der 11RUNCLUB in Solothurn bringt Läuferinnen und Läufer zusammen. Erfahre alles über unsere wöchentlichen Runs, Events und werde Teil der Community!'

export const metadata: Metadata = {
  metadataBase: new URL('https://www.11runclub.ch'),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  keywords: ['Runclub', 'Solothurn', 'Laufen', 'Running', '11RUNCLUB', 'Laufgruppe', 'Schweiz'],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: 'https://www.11runclub.ch',
    siteName: '11RUNCLUB',
    locale: 'de_CH',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
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

        {/* Analytics */}
        <Analytics />
      </body>
    </html>
  )
}
