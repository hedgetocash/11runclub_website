import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'ENTER HILLCLIMB — 25.09.2026 — 11RUNCLUB',
  description:
    'Das Staffel-Rennen aufs Parkdeck der ENTER Technikwelt Derendingen. 4er-Teams, 100+ Läufer:innen, organisiert vom 11RUNCLUB × Saucony. 25.09.2026.',
}

export default function EnterHillclimbLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
