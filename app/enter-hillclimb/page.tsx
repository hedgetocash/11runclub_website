'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'

function Reveal({
  children,
  delay = 0,
  style = {},
}: {
  children: React.ReactNode
  delay?: number
  style?: React.CSSProperties
}) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('in')
          io.disconnect()
        }
      },
      { threshold: 0.12 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div ref={ref} className="reveal" style={{ transitionDelay: `${delay}ms`, ...style }}>
      {children}
    </div>
  )
}

function Countdown() {
  const [time, setTime] = useState({ d: '--', h: '--', m: '--', s: '--' })

  useEffect(() => {
    const target = new Date('2026-09-25T00:00:00')
    function tick() {
      const ms = target.getTime() - Date.now()
      if (ms <= 0) {
        setTime({ d: '00', h: '00', m: '00', s: '00' })
        return
      }
      const total = Math.floor(ms / 1000)
      setTime({
        d: String(Math.floor(total / 86400)).padStart(2, '0'),
        h: String(Math.floor(total / 3600) % 24).padStart(2, '0'),
        m: String(Math.floor(total / 60) % 60).padStart(2, '0'),
        s: String(total % 60).padStart(2, '0'),
      })
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <div>
      <div
        style={{
          fontFamily: 'var(--font-ibm-plex-mono)',
          fontSize: 11,
          letterSpacing: '0.2em',
          color: 'rgba(244,241,235,0.55)',
          marginBottom: 12,
        }}
      >
        COUNTDOWN — 25.09.2026
      </div>
      <div
        style={{
          display: 'flex',
          gap: 'clamp(16px,3vw,32px)',
        }}
      >
        {[
          { val: time.d, lbl: 'TAGE' },
          { val: time.h, lbl: 'STD' },
          { val: time.m, lbl: 'MIN' },
          { val: time.s, lbl: 'SEK' },
        ].map(({ val, lbl }) => (
          <div key={lbl} style={{ textAlign: 'center' }}>
            <div
              style={{
                fontFamily: 'var(--font-anton)',
                fontSize: 'clamp(40px,6vw,80px)',
                lineHeight: 1,
                color: 'var(--chalk)',
              }}
            >
              {val}
            </div>
            <div
              style={{
                fontFamily: 'var(--font-ibm-plex-mono)',
                fontSize: 10,
                letterSpacing: '0.2em',
                color: 'rgba(244,241,235,0.45)',
                marginTop: 6,
              }}
            >
              {lbl}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function EnterHillclimbPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section
        style={{
          background: 'var(--black)',
          color: 'var(--chalk)',
          minHeight: '100svh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: 'clamp(60px,8vw,120px) clamp(20px,4vw,56px)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Background: serpentine ramp SVG */}
        <svg
          viewBox="0 0 600 700"
          aria-hidden="true"
          style={{
            position: 'absolute',
            right: '-5%',
            top: '50%',
            transform: 'translateY(-50%)',
            width: 'clamp(280px, 45vw, 620px)',
            opacity: 0.07,
            pointerEvents: 'none',
          }}
        >
          <g fill="none" stroke="#EE3829" strokeWidth="3" strokeLinecap="round">
            {/* Serpentine ramp lines */}
            {[0, 1, 2, 3, 4, 5, 6].map((i) => (
              <path
                key={i}
                d={
                  i % 2 === 0
                    ? `M 60 ${80 + i * 90} C 60 ${80 + i * 90} 200 ${60 + i * 90} 540 ${80 + i * 90}`
                    : `M 540 ${80 + i * 90} C 540 ${80 + i * 90} 400 ${60 + i * 90} 60 ${80 + i * 90}`
                }
              />
            ))}
          </g>
          {/* Arrows */}
          <g fill="#EE3829">
            <path d="M0,-5 L10,0 L0,5" transform="translate(540,80) rotate(0)" />
            <path d="M0,-5 L10,0 L0,5" transform="translate(60,170) rotate(180)" />
            <path d="M0,-5 L10,0 L0,5" transform="translate(540,260) rotate(0)" />
            <path d="M0,-5 L10,0 L0,5" transform="translate(60,350) rotate(180)" />
          </g>
        </svg>

        <div style={{ position: 'relative', maxWidth: 860 }}>
          {/* Back link */}
          <Reveal>
            <Link
              href="/"
              style={{
                fontFamily: 'var(--font-ibm-plex-mono)',
                fontSize: 12,
                letterSpacing: '0.15em',
                color: 'var(--ash)',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                marginBottom: 40,
              }}
            >
              ← 11RUNCLUB
            </Link>
          </Reveal>

          <Reveal delay={40}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10,
                fontFamily: 'var(--font-ibm-plex-mono)',
                fontSize: 12,
                letterSpacing: '0.2em',
                color: 'var(--red)',
                marginBottom: 24,
              }}
            >
              <span
                style={{
                  width: 34,
                  height: 2,
                  background: 'var(--red)',
                  display: 'inline-block',
                }}
              />
              SAVE THE DATE — UNSER RENNEN
            </div>
          </Reveal>

          <Reveal delay={80}>
            <h1
              style={{
                fontFamily: 'var(--font-anton)',
                fontSize: 'clamp(64px,13vw,200px)',
                lineHeight: 0.88,
                textTransform: 'uppercase',
                letterSpacing: '-0.01em',
                marginBottom: 16,
              }}
            >
              <span style={{ color: 'var(--red)' }}>The</span><br />
              <span style={{ color: 'transparent', WebkitTextStroke: '2px var(--chalk)' }}>
                Maze
              </span>
            </h1>
          </Reveal>

          <Reveal delay={120}>
            <div
              style={{
                fontFamily: 'var(--font-ibm-plex-mono)',
                fontSize: 'clamp(13px,1.5vw,18px)',
                letterSpacing: '0.2em',
                color: 'var(--chalk)',
                marginTop: 20,
              }}
            >
              BY SAUCONY × 11RUNCLUB
            </div>
          </Reveal>

          <Reveal delay={140}>
            <div
              style={{
                fontFamily: 'var(--font-ibm-plex-mono)',
                fontSize: 'clamp(13px,1.5vw,18px)',
                letterSpacing: '0.14em',
                color: 'rgba(244,241,235,0.7)',
                lineHeight: 2,
                marginTop: 28,
                marginBottom: 48,
              }}
            >
              FR 25.09.2026 · ENTER TECHNIKWELT, DERENDINGEN<br />
              4ER-STAFFEL · RAUFS PARKDECK UND RUNTER
            </div>
          </Reveal>

          <Reveal delay={200}>
            <Countdown />
          </Reveal>

          <Reveal delay={280}>
            <div
              style={{
                marginTop: 56,
                padding: '24px 30px',
                border: '1.5px dashed rgba(244,241,235,0.25)',
                borderRadius: 16,
                display: 'inline-block',
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-ibm-plex-mono)',
                  fontSize: 11,
                  letterSpacing: '0.2em',
                  color: 'var(--red)',
                  marginBottom: 12,
                }}
              >
                STATUS — ANMELDUNG
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-anton)',
                  fontSize: 'clamp(28px,3.5vw,48px)',
                  textTransform: 'uppercase',
                  lineHeight: 0.95,
                  color: 'var(--chalk)',
                }}
              >
                Infos folgen.
              </div>
              <p
                style={{
                  fontFamily: 'var(--font-archivo)',
                  fontSize: 14,
                  color: 'rgba(244,241,235,0.55)',
                  marginTop: 12,
                  maxWidth: 300,
                  lineHeight: 1.6,
                }}
              >
                Details zu Anmeldung, Ablauf und Format werden bekannt gegeben.
                Folge uns auf Instagram für Updates.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Race Info ── */}
      <section
        style={{
          background: 'var(--red)',
          color: 'var(--chalk)',
          padding: 'clamp(70px,10vw,130px) clamp(20px,4vw,56px)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            right: '-5%',
            top: '-10%',
            fontFamily: 'var(--font-anton)',
            fontSize: 'clamp(200px,35vw,500px)',
            color: 'transparent',
            WebkitTextStroke: '1.5px rgba(244,241,235,0.1)',
            lineHeight: 1,
            userSelect: 'none',
          }}
        >
          11
        </div>

        <div style={{ position: 'relative' }}>
          <Reveal>
            <div className="kicker kicker--chalk">Das Rennen</div>
          </Reveal>
          <Reveal delay={60}>
            <h2
              style={{
                fontFamily: 'var(--font-anton)',
                fontSize: 'clamp(44px,7vw,100px)',
                lineHeight: 0.95,
                textTransform: 'uppercase',
                marginBottom: 40,
              }}
            >
              4er-Staffel.<br />
              <span style={{ color: 'transparent', WebkitTextStroke: '2px var(--chalk)' }}>
                Run the Ramp.
              </span>
            </h2>
          </Reveal>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: 20,
              marginBottom: 48,
            }}
          >
            {[
              { k: 'DATUM', v: 'FR — 25.09.2026' },
              { k: 'ORT', v: 'ENTER Technikwelt', sub: 'Derendingen, CH' },
              { k: 'FORMAT', v: '4er-Staffel' },
              { k: 'TEILNEHMENDE', v: '100+' },
            ].map(({ k, v, sub }, i) => (
              <Reveal key={k} delay={i * 60}>
                <div
                  style={{
                    background: 'rgba(244,241,235,0.12)',
                    border: '1px solid rgba(244,241,235,0.2)',
                    borderRadius: 16,
                    padding: '24px 22px',
                  }}
                >
                  <div
                    style={{
                      fontFamily: 'var(--font-ibm-plex-mono)',
                      fontSize: 11,
                      letterSpacing: '0.2em',
                      color: 'rgba(244,241,235,0.6)',
                      marginBottom: 12,
                    }}
                  >
                    {k}
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--font-anton)',
                      fontSize: 'clamp(22px,2.5vw,36px)',
                      textTransform: 'uppercase',
                      lineHeight: 1,
                    }}
                  >
                    {v}
                  </div>
                  {sub && (
                    <div
                      style={{
                        fontFamily: 'var(--font-archivo)',
                        fontSize: 13,
                        color: 'rgba(244,241,235,0.6)',
                        marginTop: 6,
                      }}
                    >
                      {sub}
                    </div>
                  )}
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={280}>
            <p
              style={{
                fontSize: 17,
                lineHeight: 1.75,
                color: 'rgba(244,241,235,0.85)',
                maxWidth: 620,
                fontFamily: 'var(--font-archivo)',
              }}
            >
              Das Staffel-Rennen in 4er-Teams — rauf aufs Parkdeck der ENTER Technikwelt Derendingen
              und wieder runter. Die Rampen sind steil. Die Stimmung ist heiss.
              100+ Läufer:innen, organisiert vom 11RUNCLUB × Saucony.
              Details zu Ablauf, Anmeldung und Startzeit folgen.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── CTA ── */}
      <section
        style={{
          background: 'var(--black)',
          color: 'var(--chalk)',
          padding: 'clamp(70px,10vw,130px) clamp(20px,4vw,56px)',
          textAlign: 'center',
        }}
      >
        <Reveal>
          <div className="kicker kicker--chalk" style={{ justifyContent: 'center' }}>
            Auf dem Laufenden bleiben
          </div>
        </Reveal>
        <Reveal delay={80}>
          <h2
            style={{
              fontFamily: 'var(--font-anton)',
              fontSize: 'clamp(44px,7vw,104px)',
              lineHeight: 0.95,
              textTransform: 'uppercase',
              marginBottom: 24,
            }}
          >
            Infos kommen.<br />
            <span style={{ color: 'var(--red)' }}>Versprochen.</span>
          </h2>
        </Reveal>
        <Reveal delay={140}>
          <p
            style={{
              fontSize: 17,
              color: 'rgba(244,241,235,0.7)',
              maxWidth: 480,
              margin: '0 auto 40px',
              lineHeight: 1.65,
              fontFamily: 'var(--font-archivo)',
            }}
          >
            Folge uns auf Instagram und tritt der WhatsApp-Community bei.
            Alle Updates zu Anmeldung, Ablauf und Startzeit kommen dort zuerst.
          </p>
        </Reveal>
        <Reveal delay={200}>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a
              href="https://instagram.com/11.runclub"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--solid"
            >
              Instagram folgen →
            </a>
            <a
              href="https://tr.ee/wKzGb4-Rug"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--chalk"
            >
              WhatsApp Community
            </a>
          </div>
        </Reveal>
        <Reveal delay={260}>
          <div style={{ marginTop: 48 }}>
            <Link
              href="/"
              style={{
                fontFamily: 'var(--font-ibm-plex-mono)',
                fontSize: 12,
                letterSpacing: '0.15em',
                color: 'var(--ash)',
                textDecoration: 'none',
              }}
            >
              ← Zurück zur Homepage
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  )
}
