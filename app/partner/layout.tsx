import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Partner & Sponsoring — 11RUNCLUB Solothurn',
  description:
    'Werde Partner des 11RUNCLUB. 900+ Follower, 250+ WhatsApp Members. Wir suchen Food & Nutrition Partner. Hydration vergeben (peaq hydration).',
}

export default function PartnerLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
