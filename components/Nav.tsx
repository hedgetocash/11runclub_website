'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Nav() {
  const pathname = usePathname()

  const isHome = pathname === '/'

  return (
    <nav className="nav">
      <Link href="/" className="flex items-center gap-3 no-underline text-[var(--black)]">
        <span
          style={{
            width: 44,
            height: 44,
            borderRadius: '50%',
            background: 'var(--coral)',
            display: 'grid',
            placeItems: 'center',
            fontFamily: 'var(--font-anton)',
            color: 'var(--cobalt)',
            fontSize: 19,
            letterSpacing: '0.02em',
            transform: 'rotate(-6deg)',
            flexShrink: 0,
          }}
        >
          11
        </span>
        <span
          style={{
            fontFamily: 'var(--font-ibm-plex-mono)',
            fontWeight: 500,
            letterSpacing: '0.22em',
            fontSize: 14,
          }}
        >
          11RUNCLUB
        </span>
      </Link>

      <div className="flex gap-[clamp(14px,2.5vw,34px)] items-center">
        {isHome ? (
          <>
            <a
              href="#next"
              className="no-underline text-[var(--black)] text-sm font-semibold tracking-[0.04em] hover:text-[var(--red)] transition-colors hidden md:block"
            >
              Next Run
            </a>
            <a
              href="#formats"
              className="no-underline text-[var(--black)] text-sm font-semibold tracking-[0.04em] hover:text-[var(--red)] transition-colors hidden md:block"
            >
              Runs
            </a>
            <a
              href="#events"
              className="no-underline text-[var(--black)] text-sm font-semibold tracking-[0.04em] hover:text-[var(--red)] transition-colors hidden md:block"
            >
              Events
            </a>
          </>
        ) : null}
        <Link
          href="/team"
          className="no-underline text-sm font-semibold tracking-[0.04em] hover:text-[var(--red)] transition-colors hidden md:block"
          style={{ color: pathname === '/team' ? 'var(--red)' : 'var(--black)' }}
        >
          Team
        </Link>
        <Link
          href="/partner"
          className="no-underline text-sm font-semibold tracking-[0.04em] hover:text-[var(--red)] transition-colors hidden md:block"
          style={{ color: pathname === '/partner' ? 'var(--red)' : 'var(--black)' }}
        >
          Partner
        </Link>
        <a
          href="https://instagram.com/11.runclub"
          target="_blank"
          rel="noopener noreferrer"
          className="no-underline text-[var(--black)] text-sm font-semibold tracking-[0.04em] hover:text-[var(--red)] transition-colors hidden md:block"
        >
          @11.runclub
        </a>
        <Link
          href={isHome ? '#join' : '/#join'}
          className="btn btn--solid"
          style={{ padding: '11px 20px', fontSize: '12px' }}
        >
          Mitlaufen →
        </Link>
      </div>
    </nav>
  )
}
