import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'THE MAZE BY SAUCONY × 11RUNCLUB — 25.09.2026',
  description:
    'The Maze by Saucony × 11RUNCLUB — das Staffel-Rennen aufs Parkdeck der ENTER Technikwelt Derendingen. 4er-Teams, 100+ Läufer:innen. 25.09.2026.',
}

export default function EnterHillclimbLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
