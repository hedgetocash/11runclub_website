import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Team — 11RUNCLUB Solothurn',
  description:
    'Lerne Noa, Emma, Nils und Anna kennen — die vier Gründer:innen hinter dem 11RUNCLUB Solothurn. Über 900 Follower, 250+ WhatsApp Members.',
}

export default function TeamLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
