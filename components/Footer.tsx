import Link from 'next/link'

export default function Footer() {
  return (
    <footer style={{ background: 'var(--black)', color: 'var(--chalk)', padding: '70px clamp(20px,4vw,56px) 30px' }}>
      {/* Wordmark */}
      <div
        style={{
          fontFamily: 'var(--font-anton)',
          textTransform: 'uppercase',
          fontSize: 'clamp(64px, 14vw, 230px)',
          lineHeight: 0.85,
          color: 'transparent',
          WebkitTextStroke: '1.5px rgba(244,241,235,0.4)',
          userSelect: 'none',
        }}
      >
        11Runclub
      </div>

      {/* Bottom row */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 20,
          marginTop: 50,
          paddingTop: 26,
          borderTop: '1px solid rgba(244,241,235,0.18)',
          fontFamily: 'var(--font-ibm-plex-mono)',
          fontSize: 12,
          letterSpacing: '0.12em',
          color: 'var(--ash)',
        }}
      >
        <span>© 2026 11RUNCLUB — SOLOTHURN</span>
        <span>SUPPORTED BY SOL-ID ATHLETES WORLD · HYDRATED BY PEAQ HYDRATION</span>
        <div style={{ display: 'flex', gap: 24 }}>
          <a
            href="https://instagram.com/11.runclub"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'var(--ash)', textDecoration: 'none' }}
            className="hover:text-[var(--chalk)] transition-colors"
          >
            @11.RUNCLUB
          </a>
          <a
            href="https://www.strava.com/clubs/11RUNCLUB"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'var(--ash)', textDecoration: 'none' }}
            className="hover:text-[var(--chalk)] transition-colors"
          >
            STRAVA
          </a>
          <a
            href="https://tr.ee/wKzGb4-Rug"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'var(--ash)', textDecoration: 'none' }}
            className="hover:text-[var(--chalk)] transition-colors"
          >
            WHATSAPP
          </a>
          <Link
            href="/partner"
            style={{ color: 'var(--ash)', textDecoration: 'none' }}
            className="hover:text-[var(--chalk)] transition-colors"
          >
            PARTNER & SPONSORING
          </Link>
          <Link
            href="/team"
            style={{ color: 'var(--ash)', textDecoration: 'none' }}
            className="hover:text-[var(--chalk)] transition-colors"
          >
            TEAM
          </Link>
          <span>IMPRESSUM · DATENSCHUTZ</span>
        </div>
      </div>
    </footer>
  )
}
