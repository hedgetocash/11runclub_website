'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import LogoImg from '../reference/logo.jpg'

const LINKS = [
  { href: '#next', label: 'Next Run' },
  { href: '#formats', label: 'Runs' },
  { href: '#events', label: 'Events' },
]

export default function Nav() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  const isHome = pathname === '/'

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  return (
    <nav className="nav">
      <Link href="/" className="flex items-center gap-3 no-underline text-[var(--black)]">
        <Image
          src={LogoImg}
          alt="11RUNCLUB"
          style={{ height: 56, width: 56, display: 'block' }}
        />
        <span
          style={{
            fontFamily: 'var(--font-anton)',
            fontWeight: 400,
            letterSpacing: '0.02em',
            fontSize: 22,
            textTransform: 'uppercase',
            color: 'var(--coral)',
          }}
        >
          11RUNCLUB
        </span>
      </Link>

      <div className="flex gap-[clamp(14px,2.5vw,34px)] items-center">
        {LINKS.map(({ href, label }) => (
          <a
            key={label}
            href={isHome ? href : `/${href}`}
            className="no-underline text-[var(--black)] text-sm font-semibold tracking-[0.04em] hover:text-[var(--red)] transition-colors hidden md:block"
          >
            {label}
          </a>
        ))}
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
          className="btn btn--solid hidden md:inline-block"
          style={{ padding: '11px 20px', fontSize: '12px' }}
        >
          Mitlaufen →
        </Link>

        {/* Mobile menu toggle */}
        <button
          aria-label={open ? 'Menü schliessen' : 'Menü öffnen'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex md:hidden"
          style={{
            width: 40,
            height: 40,
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 5,
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            flexShrink: 0,
          }}
        >
          <span
            style={{
              width: 22,
              height: 2,
              background: 'var(--black)',
              transition: 'transform 0.25s ease, opacity 0.25s ease',
              transform: open ? 'translateY(3.5px) rotate(45deg)' : 'none',
            }}
          />
          <span
            style={{
              width: 22,
              height: 2,
              background: 'var(--black)',
              transition: 'transform 0.25s ease, opacity 0.25s ease',
              opacity: open ? 0 : 1,
            }}
          />
          <span
            style={{
              width: 22,
              height: 2,
              background: 'var(--black)',
              transition: 'transform 0.25s ease, opacity 0.25s ease',
              transform: open ? 'translateY(-3.5px) rotate(-45deg)' : 'none',
            }}
          />
        </button>
      </div>

      {/* Mobile menu panel */}
      {open && (
        <div
          className="md:hidden"
          style={{
            position: 'fixed',
            inset: 0,
            top: 92,
            background: 'var(--chalk)',
            zIndex: 90,
            display: 'flex',
            flexDirection: 'column',
            padding: '20px clamp(20px,4vw,56px) 40px',
            overflowY: 'auto',
          }}
        >
          {LINKS.map(({ href, label }) => (
            <a
              key={label}
              href={isHome ? href : `/${href}`}
              onClick={() => setOpen(false)}
              style={{
                fontFamily: 'var(--font-anton)',
                fontSize: 32,
                textTransform: 'uppercase',
                color: 'var(--black)',
                textDecoration: 'none',
                padding: '16px 0',
                borderBottom: '1px solid rgba(13,12,11,0.12)',
              }}
            >
              {label}
            </a>
          ))}
          <Link
            href="/team"
            onClick={() => setOpen(false)}
            style={{
              fontFamily: 'var(--font-anton)',
              fontSize: 32,
              textTransform: 'uppercase',
              color: pathname === '/team' ? 'var(--red)' : 'var(--black)',
              textDecoration: 'none',
              padding: '16px 0',
              borderBottom: '1px solid rgba(13,12,11,0.12)',
            }}
          >
            Team
          </Link>
          <Link
            href="/partner"
            onClick={() => setOpen(false)}
            style={{
              fontFamily: 'var(--font-anton)',
              fontSize: 32,
              textTransform: 'uppercase',
              color: pathname === '/partner' ? 'var(--red)' : 'var(--black)',
              textDecoration: 'none',
              padding: '16px 0',
              borderBottom: '1px solid rgba(13,12,11,0.12)',
            }}
          >
            Partner
          </Link>
          <a
            href="https://instagram.com/11.runclub"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: 'var(--font-ibm-plex-mono)',
              fontSize: 14,
              letterSpacing: '0.08em',
              color: 'var(--ash)',
              textDecoration: 'none',
              padding: '20px 0 0',
            }}
          >
            @11.runclub ↗
          </a>
          <Link
            href={isHome ? '#join' : '/#join'}
            onClick={() => setOpen(false)}
            className="btn btn--solid"
            style={{ marginTop: 28, textAlign: 'center' }}
          >
            Mitlaufen →
          </Link>
        </div>
      )}
    </nav>
  )
}
