import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'DIRTY LAPS BY 11RUNCLUB — 25.09.2026',
  description:
    'Dirty Laps by 11RUNCLUB — das 4×400m-Staffel-Rennen aufs Parkdeck der ENTER Technikwelt Derendingen. 30 Teams, 120 Läufer:innen, K.O.-Turnier. Tickets ab CHF 20.–.',
}

export default function EnterHillclimbLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
