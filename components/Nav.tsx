'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import LogoImg from '../reference/logo.jpg'

const LINKS = [
  { href: '#next', label: 'Next Run' },
  { href: '#formats', label: 'Runs' },
  // TEMPORÄR AUSGEBLENDET — The Maze ist noch nicht final bestätigt.
  // Zum Wiedereinblenden einfach die Zeile unten einkommentieren:
  // { href: '#events', label: 'Events' },
]

export default function Nav() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [navHeight, setNavHeight] = useState(92)
  const navRef = useRef<HTMLElement>(null)

  const isHome = pathname === '/'

  // Miss den echten Nav-Höhe statt sie zu raten, damit das Mobile-Panel
  // immer exakt darunter anschliesst, egal was im Header steht.
  useEffect(() => {
    const el = navRef.current
    if (!el) return
    const measure = () => setNavHeight(el.getBoundingClientRect().height)
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  useEffect(() => {
    if (!open) return
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const mobileItems = [
    ...LINKS.map(({ href, label }) => ({
      href: isHome ? href : `/${href}`,
      label,
      active: false,
    })),
    { href: '/team', label: 'Team', active: pathname === '/team' },
    { href: '/partner', label: 'Partner', active: pathname === '/partner' },
    { href: isHome ? '#faq' : '/#faq', label: 'FAQ', active: false },
  ]

  return (
    <nav className="nav" ref={navRef}>
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
          href={isHome ? '#faq' : '/#faq'}
          className="no-underline text-[var(--black)] text-sm font-semibold tracking-[0.04em] hover:text-[var(--red)] transition-colors hidden md:block"
        >
          FAQ
        </a>
        <Link
          href={isHome ? '#join' : '/#join'}
          className="btn btn--solid hidden md:inline-block"
          style={{ padding: '11px 20px', fontSize: '12px' }}
        >
          Mitlaufen →
        </Link>

        {/* Mobile menu toggle — 48px Klickfläche */}
        <button
          aria-label={open ? 'Menü schliessen' : 'Menü öffnen'}
          aria-expanded={open}
          aria-controls="mobile-nav-panel"
          onClick={() => setOpen((v) => !v)}
          className="flex md:hidden"
          style={{
            width: 48,
            height: 48,
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
              width: 24,
              height: 2,
              background: 'var(--black)',
              transition: 'transform 0.3s cubic-bezier(.3,0,.2,1), opacity 0.3s ease',
              transform: open ? 'translateY(3.5px) rotate(45deg)' : 'none',
            }}
          />
          <span
            style={{
              width: 24,
              height: 2,
              background: 'var(--black)',
              transition: 'transform 0.3s cubic-bezier(.3,0,.2,1), opacity 0.3s ease',
              opacity: open ? 0 : 1,
            }}
          />
          <span
            style={{
              width: 24,
              height: 2,
              background: 'var(--black)',
              transition: 'transform 0.3s cubic-bezier(.3,0,.2,1), opacity 0.3s ease',
              transform: open ? 'translateY(-3.5px) rotate(-45deg)' : 'none',
            }}
          />
        </button>
      </div>

      {/* Mobile menu panel — immer im DOM, damit Ein- und Ausblenden animiert werden kann */}
      <div
        id="mobile-nav-panel"
        className={`md:hidden mobile-nav-panel${open ? ' is-open' : ''}`}
        aria-hidden={!open}
        style={{
          position: 'fixed',
          top: navHeight,
          left: 0,
          right: 0,
          height: `calc(100svh - ${navHeight}px)`,
          background: 'var(--chalk)',
          zIndex: 90,
          display: 'flex',
          flexDirection: 'column',
          padding: '8px clamp(20px,4vw,56px) 32px',
          overflowY: 'auto',
        }}
      >
        {mobileItems.map(({ href, label, active }, i) => (
          <a
            key={label}
            href={href}
            onClick={() => setOpen(false)}
            className="mobile-nav-link"
            style={{
              fontFamily: 'var(--font-anton)',
              fontSize: 30,
              textTransform: 'uppercase',
              color: active ? 'var(--red)' : 'var(--black)',
              textDecoration: 'none',
              minHeight: 56,
              display: 'flex',
              alignItems: 'center',
              borderBottom: '1px solid rgba(13,12,11,0.12)',
              transitionDelay: open ? `${60 + i * 40}ms` : '0ms',
            }}
          >
            {label}
          </a>
        ))}
        <Link
          href={isHome ? '#join' : '/#join'}
          onClick={() => setOpen(false)}
          className="btn btn--solid mobile-nav-link"
          style={{
            marginTop: 24,
            textAlign: 'center',
            padding: '17px 26px',
            fontSize: 15,
            transitionDelay: open ? `${60 + mobileItems.length * 40}ms` : '0ms',
          }}
        >
          Mitlaufen →
        </Link>
      </div>

      <style>{`
        .mobile-nav-panel {
          opacity: 0;
          transform: translateY(-16px);
          pointer-events: none;
          visibility: hidden;
          transition: opacity 0.35s cubic-bezier(.3,0,.2,1), transform 0.35s cubic-bezier(.3,0,.2,1), visibility 0s linear 0.35s;
        }
        .mobile-nav-panel.is-open {
          opacity: 1;
          transform: translateY(0);
          pointer-events: auto;
          visibility: visible;
          transition: opacity 0.35s cubic-bezier(.3,0,.2,1), transform 0.35s cubic-bezier(.3,0,.2,1), visibility 0s linear 0s;
        }
        .mobile-nav-link {
          opacity: 0;
          transform: translateY(10px);
          transition: opacity 0.3s ease, transform 0.3s ease, background-color 0.15s ease;
        }
        .mobile-nav-panel.is-open .mobile-nav-link {
          opacity: 1;
          transform: translateY(0);
        }
        .mobile-nav-link:active {
          background-color: rgba(13,12,11,0.06);
        }
        @media (prefers-reduced-motion: reduce) {
          .mobile-nav-panel, .mobile-nav-link, .mobile-nav-panel.is-open, .mobile-nav-panel.is-open .mobile-nav-link {
            transition: none !important;
            transform: none !important;
          }
        }
      `}</style>
    </nav>
  )
}
