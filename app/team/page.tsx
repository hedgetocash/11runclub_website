'use client'

import { useEffect, useRef } from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'

/* ─── Scroll Reveal ──────────────────────────────────────────────────────────── */
function Reveal({
  children,
  delay = 0,
  className = '',
  style = {},
}: {
  children: React.ReactNode
  delay?: number
  className?: string
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
    <div
      ref={ref}
      className={`reveal ${className}`}
      style={{ transitionDelay: `${delay}ms`, ...style }}
    >
      {children}
    </div>
  )
}

/* ─── Team Data ──────────────────────────────────────────────────────────────── */
const TEAM = [
  {
    name: 'NOA',
    handle: '@ro.an.no',
    initials: 'N',
    accent: 'var(--red)',
    textColor: 'var(--chalk)',
    bg: 'var(--black)',
    bio: 'Hoi zäme :) Ich bin Noa. Sport ist meine Leidenschaft, früher Fussball und heute Ausdauersport. Sei es morgens auf einer Laufrunde oder an einem sonnigen Samstag auf einem Groupride mit meinen Freunden. Das Beste am Ausdauersport? Kaffee & Kuchen nach einer intensiven Trainingseinheit! Das Laufen hat mich im letzten Jahr gepackt, als ich intensiv für den Zürichmarathon trainiert habe. Gerade in den dunklen und kalten Winterstunden hätte ich mir einen regionalen Runclub gewünscht. Es freut mich daher umso mehr, den 11RUNCLUB mit gestalten zu dürfen. Ich freue mich auf eine laufmotivierte Community und spannende Trainings mit euch!',
    tags: ['Zürichmarathon', 'Groupride', 'Kaffee & Kuchen'],
  },
  {
    name: 'EMMA',
    handle: '@emmajacot',
    initials: 'E',
    accent: 'var(--coral)',
    textColor: 'var(--black)',
    bg: 'var(--chalk)',
    bio: 'Hallo Zusammen, Ich bin Emma. Laufen ist eine meiner grossen Leidenschaften, ich laufe gerne und oft in der Region Solothurn. Dabei ist mir des Öfteren aufgefallen, dass es viele weitere Laufsportbegeisterte in der Region gibt. Allerdings laufen die meisten alleine, sowie auch ich. Deshalb dachte ich mir dies zu kombinieren, und eine Laufgemeinschaft zu gründen wo wir gemeinsam laufen und trainieren können. Meiner Meinung nach macht das Laufen noch viel mehr Spass in einer Gruppe und es fällt einem leichter sich zu motivieren und sich gegenseitig zu pushen. Des Weiteren bin ich Triathletin, liebe den Winter vor Allem den Schnee und alles was mit ihm zu tun hat. Ich erkundige gerne neue Gegenden, sei es bei einer Wanderung oder beim Laufen. Meistens laufe ich ohne Plan los, gehe in den Wald und nehme die kuriosesten Abzweigungen, so entdecke ich neue spannende Wege.',
    tags: ['Triathletin', 'Winterliebe', 'Trailrunning'],
  },
  {
    name: 'NILS',
    handle: '@nils.schupbach',
    initials: 'N',
    accent: 'var(--cobalt)',
    textColor: 'var(--chalk)',
    bg: 'var(--black)',
    bio: 'Hallo zusammen, Ich bin Nils. Ich bin schon fast mein ganzes Leben immer wieder mit dem Laufsport verbunden gewesen, sei es durch die Teilnahmen an Rennen als kleiner Junge, während der Offseason oder als Trainingseinheit. Laufen hat mich immer begleitet. Deshalb freut es mich, hier in Solothurn mithelfen zu dürfen, die Laufcommunity zu stärken. Ich habe über 10 Jahre lang Eishockey gespielt. Heute fahre ich gerne Rennrad und liebe alles, was mit Autos zu tun hat, vom Selbst Fahren bis zum Anschauen. Im Sommer ist ein Badi-Tag ein absolutes Muss und die beste Wahl, um auf einer Radtour etwas Erfrischung zu bekommen. Egal, wohin es in die Ferien geht: Eine Fotokamera ist immer dabei. Nur die Motive wechseln, von Löwen über Pinguine bis zu Wolkenkratzern. Ich freue mich auf all die kommenden Events und darauf, diese mit möglichst vielen von euch durchführen zu dürfen.',
    tags: ['Eishockey', 'Rennrad', 'Fotografie'],
  },
  {
    name: 'ANNA',
    handle: '@annaednaa',
    initials: 'A',
    accent: 'var(--red)',
    textColor: 'var(--black)',
    bg: 'var(--chalk)',
    bio: 'Hey, ich bin Anna. Total sportverrückt und am liebsten irgendwo in den Bergen unterwegs – am besten früh morgens wenn noch keiner wach ist. Und immer dabei: Mexx, mein Hund und treuer Alltagsbegleiter. Wenn ich nicht gerade draussen Energie tanke, steh ich wahrscheinlich in der Küche und backe Brot oder teste irgendein neues Rezept. Zum Laufen bin ich eigentlich eher zufällig gekommen. Nach einigen Jahren Leistungssport im Handball musste ich damit aus gesundheitlichen Gründen leider aufhören. Danach habe ich neben dem Bergsteigen auch sehr viel Spass im Crossfit gefunden. Doch eine ausgekugelte Schulter hat mich dann zu einer Crossfit-Pause gezwungen – also bin ich einfach mal mehr laufen gegangen... Inzwischen bin ich Ultra-Trail Finisherin und das Trailrunning meine absolute Herzenssportart. Als Solothurnerin findet man mich super oft auf dem Weissenstein, der Röti oder Hasenmatte. Ich freu mich sehr auf motivierende Trainings, coole Begegnungen und eine harmonische Community!',
    tags: ['Ultra-Trail Finisherin', 'Weissenstein', 'Mit Mexx'],
  },
]

/* ─── Portrait Card ──────────────────────────────────────────────────────────── */
function PortraitCard({
  member,
  index,
}: {
  member: (typeof TEAM)[0]
  index: number
}) {
  const isEven = index % 2 === 0

  return (
    <section
      style={{
        background: member.bg,
        color: member.textColor,
        padding: 'clamp(70px,10vw,130px) clamp(20px,4vw,56px)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Big number watermark */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: isEven ? '-5%' : 'auto',
          bottom: isEven ? 'auto' : '-5%',
          right: isEven ? '-3%' : 'auto',
          left: isEven ? 'auto' : '-3%',
          fontFamily: 'var(--font-anton)',
          fontSize: 'clamp(180px,28vw,380px)',
          color: 'transparent',
          WebkitTextStroke: `1.5px ${member.bg === 'var(--black)' ? 'rgba(244,241,235,0.07)' : 'rgba(13,12,11,0.06)'}`,
          lineHeight: 1,
          userSelect: 'none',
          pointerEvents: 'none',
        }}
      >
        {String(index + 1).padStart(2, '0')}
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: isEven ? '1fr 1.4fr' : '1.4fr 1fr',
          gap: 'clamp(40px,6vw,100px)',
          alignItems: 'center',
          maxWidth: 1100,
          margin: '0 auto',
          position: 'relative',
        }}
      >
        {/* Portrait placeholder */}
        <Reveal delay={isEven ? 0 : 100} style={{ order: isEven ? 1 : 2 }}>
          <div style={{ position: 'relative' }}>
            {/* Outer ring */}
            <div
              style={{
                width: '100%',
                aspectRatio: '1',
                maxWidth: 400,
                margin: '0 auto',
                borderRadius: '50%',
                border: `2px dashed ${member.bg === 'var(--black)' ? 'rgba(244,241,235,0.2)' : 'rgba(13,12,11,0.15)'}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
              }}
            >
              {/* Inner circle (photo placeholder) */}
              <div
                style={{
                  width: '86%',
                  aspectRatio: '1',
                  borderRadius: '50%',
                  background: member.accent,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {/* Initial letter */}
                <div
                  style={{
                    fontFamily: 'var(--font-anton)',
                    fontSize: 'clamp(80px,14vw,160px)',
                    color: 'rgba(255,255,255,0.25)',
                    lineHeight: 1,
                    userSelect: 'none',
                  }}
                >
                  {member.initials}
                </div>
                {/* Photo note */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: '16%',
                    fontFamily: 'var(--font-ibm-plex-mono)',
                    fontSize: 9,
                    letterSpacing: '0.2em',
                    color: 'rgba(255,255,255,0.45)',
                    textAlign: 'center',
                  }}
                >
                  FOTO FOLGT
                </div>
              </div>

              {/* Handle badge */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '8%',
                  right: '5%',
                  background: 'var(--black)',
                  color: 'var(--chalk)',
                  fontFamily: 'var(--font-ibm-plex-mono)',
                  fontSize: 11,
                  letterSpacing: '0.08em',
                  padding: '6px 12px',
                  borderRadius: 999,
                  border: '1px solid rgba(244,241,235,0.2)',
                  ...(member.bg !== 'var(--black)' && {
                    background: 'var(--chalk)',
                    color: 'var(--black)',
                    border: '1px solid rgba(13,12,11,0.15)',
                  }),
                }}
              >
                {member.handle}
              </div>
            </div>
          </div>
        </Reveal>

        {/* Text content */}
        <div style={{ order: isEven ? 2 : 1 }}>
          <Reveal delay={isEven ? 80 : 0}>
            <div
              className="kicker"
              style={{
                color: member.accent,
              }}
            >
              <span
                style={{
                  display: 'inline-block',
                  width: 34,
                  height: 2,
                  background: member.accent,
                  flexShrink: 0,
                }}
              />
              {`0${index + 1} — Gründerin`}
            </div>
          </Reveal>

          <Reveal delay={isEven ? 120 : 40}>
            <h2
              style={{
                fontFamily: 'var(--font-anton)',
                fontSize: 'clamp(64px,9vw,130px)',
                lineHeight: 0.88,
                textTransform: 'uppercase',
                marginBottom: 32,
              }}
            >
              {member.name}
            </h2>
          </Reveal>

          <Reveal delay={isEven ? 180 : 100}>
            <p
              style={{
                fontSize: 16,
                lineHeight: 1.75,
                opacity: member.bg === 'var(--black)' ? 0.85 : 0.8,
                maxWidth: 500,
                fontFamily: 'var(--font-archivo)',
              }}
            >
              {member.bio}
            </p>
          </Reveal>

          {/* Tags */}
          <Reveal delay={isEven ? 240 : 160}>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 28 }}>
              {member.tags.map((tag) => (
                <span
                  key={tag}
                  style={{
                    fontFamily: 'var(--font-ibm-plex-mono)',
                    fontSize: 11,
                    letterSpacing: '0.12em',
                    padding: '6px 14px',
                    borderRadius: 999,
                    border: `1.5px solid ${member.accent}`,
                    color: member.accent,
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </div>

      <style>{`
        @media (max-width: 760px) {
          .portrait-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}

/* ─── Page ───────────────────────────────────────────────────────────────────── */
export default function TeamPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section
        style={{
          background: 'var(--red)',
          color: 'var(--chalk)',
          padding: 'clamp(80px,12vw,160px) clamp(20px,4vw,56px) clamp(60px,8vw,120px)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Giant "11" watermark */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: '-8vw',
            right: '-4vw',
            fontFamily: 'var(--font-anton)',
            fontSize: 'clamp(260px,38vw,560px)',
            color: 'transparent',
            WebkitTextStroke: '2px rgba(244,241,235,0.12)',
            lineHeight: 1,
            userSelect: 'none',
            pointerEvents: 'none',
          }}
        >
          11
        </div>

        {/* Rotating ring */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            bottom: '-15%',
            left: '-10%',
            width: 'clamp(200px,35vw,500px)',
            aspectRatio: '1',
            borderRadius: '50%',
            border: '2px dashed rgba(244,241,235,0.2)',
            animation: 'spin 60s linear infinite',
          }}
        />

        <div style={{ position: 'relative' }}>
          <Reveal>
            <div className="kicker kicker--chalk">Die Menschen dahinter</div>
          </Reveal>
          <Reveal delay={80}>
            <h1
              style={{
                fontFamily: 'var(--font-anton)',
                fontSize: 'clamp(72px,13vw,200px)',
                lineHeight: 0.88,
                textTransform: 'uppercase',
                letterSpacing: '-0.01em',
                maxWidth: '10ch',
              }}
            >
              Unser<br />
              <span style={{ color: 'transparent', WebkitTextStroke: '2px var(--chalk)' }}>
                Team.
              </span>
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p
              style={{
                fontSize: 18,
                lineHeight: 1.7,
                color: 'rgba(244,241,235,0.85)',
                maxWidth: 540,
                marginTop: 36,
                fontFamily: 'var(--font-archivo)',
              }}
            >
              Vier Personen aus Solothurn, die gemeinsam den 11RUNCLUB ins Leben gerufen haben —
              mit einer simplen Idee: Zusammen laufen macht mehr Spass.
            </p>
          </Reveal>

          {/* Community stats */}
          <Reveal delay={240}>
            <div
              style={{
                display: 'flex',
                gap: 48,
                marginTop: 56,
                flexWrap: 'wrap',
              }}
            >
              {[
                { val: '900+', lbl: 'INSTAGRAM FOLLOWER' },
                { val: '250+', lbl: 'WHATSAPP MEMBERS' },
                { val: '2025', lbl: 'GEGRÜNDET' },
              ].map(({ val, lbl }) => (
                <div key={lbl}>
                  <div
                    style={{
                      fontFamily: 'var(--font-anton)',
                      fontSize: 'clamp(36px,5vw,72px)',
                      lineHeight: 1,
                      color: 'var(--chalk)',
                    }}
                  >
                    {val}
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--font-ibm-plex-mono)',
                      fontSize: 11,
                      letterSpacing: '0.2em',
                      color: 'rgba(244,241,235,0.55)',
                      marginTop: 6,
                    }}
                  >
                    {lbl}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Portrait Sections ── */}
      {TEAM.map((member, i) => (
        <PortraitCard key={member.name} member={member} index={i} />
      ))}

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
            Lauf mit uns
          </div>
        </Reveal>
        <Reveal delay={80}>
          <h2
            style={{
              fontFamily: 'var(--font-anton)',
              fontSize: 'clamp(44px,7vw,104px)',
              lineHeight: 0.95,
              textTransform: 'uppercase',
              marginBottom: 20,
            }}
          >
            Jeden Dienstag.<br />
            <span style={{ color: 'var(--red)' }}>18:30.</span>
          </h2>
        </Reveal>
        <Reveal delay={160}>
          <p
            style={{
              color: 'rgba(244,241,235,0.7)',
              maxWidth: 480,
              margin: '0 auto 40px',
              lineHeight: 1.65,
              fontFamily: 'var(--font-archivo)',
            }}
          >
            Keine Anmeldung nötig. Einfach am SOL-ID, Klosterplatz 6 erscheinen.
            Alle Levels willkommen.
          </p>
        </Reveal>
        <Reveal delay={220}>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a
              href="https://chat.whatsapp.com/11runclub"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--solid"
            >
              WhatsApp Community →
            </a>
            <Link href="/" className="btn btn--chalk">
              Zur Homepage
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  )
}
