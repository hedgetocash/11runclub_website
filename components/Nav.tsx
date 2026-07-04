'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import LogoImg from '../reference/logo.jpg'

export default function Nav() {
  const pathname = usePathname()

  const isHome = pathname === '/'

  return (
    <nav className="nav">
      <Link href="/" className="flex items-center no-underline text-[var(--black)]">
        <Image
          src={LogoImg}
          alt="11RUNCLUB"
          style={{ height: 56, width: 56, display: 'block' }}
        />
      </Link>

      <div className="flex gap-[clamp(14px,2.5vw,34px)] items-center">
        <a
          href={isHome ? '#next' : '/#next'}
          className="no-underline text-[var(--black)] text-sm font-semibold tracking-[0.04em] hover:text-[var(--red)] transition-colors hidden md:block"
        >
          Next Run
        </a>
        <a
          href={isHome ? '#formats' : '/#formats'}
          className="no-underline text-[var(--black)] text-sm font-semibold tracking-[0.04em] hover:text-[var(--red)] transition-colors hidden md:block"
        >
          Runs
        </a>
        <a
          href={isHome ? '#events' : '/#events'}
          className="no-underline text-[var(--black)] text-sm font-semibold tracking-[0.04em] hover:text-[var(--red)] transition-colors hidden md:block"
        >
          Events
        </a>
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
