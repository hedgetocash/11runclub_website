'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import SolidImg from '../../reference/partner-solid.jpg'
import PeaqImg from '../../reference/partner-peaq.jpg'
import PeaqBottlesImg from '../../reference/peaq-bottles.jpg'
import FilandiaImg from '../../reference/partner-filandia.jpg'
import SteinerImg from '../../reference/partner-steiner.jpg'

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

/* ─── Stat Counter ───────────────────────────────────────────────────────────── */
function StatBlock({
  val,
  label,
  sub,
  accent = 'var(--red)',
}: {
  val: string
  label: string
  sub?: string
  accent?: string
}) {
  return (
    <div
      style={{
        padding: 'clamp(24px,3vw,40px)',
        borderRight: '1px solid rgba(244,241,235,0.15)',
      }}
    >
      <div
        style={{
          fontFamily: 'var(--font-anton)',
          fontSize: 'clamp(40px,6vw,80px)',
          lineHeight: 1,
          color: accent,
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
          marginTop: 8,
        }}
      >
        {label}
      </div>
      {sub && (
        <div
          style={{
            fontFamily: 'var(--font-archivo)',
            fontSize: 13,
            color: 'rgba(244,241,235,0.4)',
            marginTop: 4,
          }}
        >
          {sub}
        </div>
      )}
    </div>
  )
}

/* ─── Offering Card ──────────────────────────────────────────────────────────── */
function OfferingCard({
  icon,
  title,
  description,
  available,
}: {
  icon: string
  title: string
  description: string
  available: boolean
}) {
  return (
    <div
      style={{
        background: available ? 'var(--chalk)' : 'rgba(244,241,235,0.04)',
        border: available
          ? '1.5px solid var(--black)'
          : '1.5px solid rgba(244,241,235,0.15)',
        borderRadius: 20,
        padding: 'clamp(24px,3vw,36px)',
        position: 'relative',
        opacity: available ? 1 : 0.65,
      }}
    >
      {/* Status badge */}
      <div
        style={{
          position: 'absolute',
          top: 20,
          right: 20,
          fontFamily: 'var(--font-ibm-plex-mono)',
          fontSize: 10,
          letterSpacing: '0.15em',
          padding: '4px 10px',
          borderRadius: 999,
          background: available ? 'var(--red)' : 'rgba(244,241,235,0.15)',
          color: available ? 'var(--chalk)' : 'rgba(244,241,235,0.5)',
        }}
      >
        {available ? 'VERFÜGBAR' : 'VERGEBEN'}
      </div>

      <div style={{ fontSize: 36, marginBottom: 16 }}>{icon}</div>
      <h3
        style={{
          fontFamily: 'var(--font-anton)',
          fontSize: 'clamp(24px,2.5vw,36px)',
          textTransform: 'uppercase',
          lineHeight: 1,
          color: available ? 'var(--black)' : 'var(--chalk)',
          marginBottom: 12,
        }}
      >
        {title}
      </h3>
      <p
        style={{
          fontSize: 15,
          lineHeight: 1.65,
          color: available ? '#555' : 'rgba(244,241,235,0.55)',
          fontFamily: 'var(--font-archivo)',
        }}
      >
        {description}
      </p>
    </div>
  )
}

/* ─── Page ───────────────────────────────────────────────────────────────────── */
export default function PartnerPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section
        style={{
          background: 'var(--black)',
          color: 'var(--chalk)',
          padding: 'clamp(80px,12vw,160px) clamp(20px,4vw,56px) clamp(60px,8vw,120px)',
          position: 'relative',
          overflow: 'hidden',
          minHeight: '80svh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
        }}
      >
        {/* Giant "11" */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: '-8vw',
            right: '-4vw',
            fontFamily: 'var(--font-anton)',
            fontSize: 'clamp(260px,38vw,560px)',
            color: 'transparent',
            WebkitTextStroke: '1.5px rgba(244,241,235,0.06)',
            lineHeight: 1,
            userSelect: 'none',
            pointerEvents: 'none',
          }}
        >
          11
        </div>

        {/* Animated dashed ring */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: '10%',
            right: '8%',
            width: 'clamp(120px,18vw,260px)',
            aspectRatio: '1',
            borderRadius: '50%',
            border: '1.5px dashed rgba(238,56,41,0.35)',
            animation: 'spin 30s linear infinite',
          }}
        />

        <div style={{ position: 'relative' }}>
          <Reveal>
            <div className="kicker kicker--chalk">B2B Sponsoring & Partnerschaften</div>
          </Reveal>
          <Reveal delay={80}>
            <h1
              style={{
                fontFamily: 'var(--font-anton)',
                fontSize: 'clamp(64px,12vw,180px)',
                lineHeight: 0.88,
                textTransform: 'uppercase',
                letterSpacing: '-0.01em',
                maxWidth: '12ch',
                marginBottom: 36,
              }}
            >
              Werde Teil<br />
              <span style={{ color: 'var(--red)' }}>unserer</span><br />
              <span style={{ color: 'transparent', WebkitTextStroke: '2px var(--chalk)' }}>
                Community.
              </span>
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p
              style={{
                fontSize: 18,
                lineHeight: 1.75,
                color: 'rgba(244,241,235,0.8)',
                maxWidth: 580,
                fontFamily: 'var(--font-archivo)',
                marginBottom: 40,
              }}
            >
              Der 11RUNCLUB ist Solothurns aktivste Laufcommunity. Über 900 engagierte
              Läufer:innen auf Instagram, 250+ Personen in unserer WhatsApp-Community —
              real, lokal, wöchentlich aktiv.
            </p>
          </Reveal>
          <Reveal delay={220}>
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              <a
                href="https://instagram.com/11.runclub"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--solid"
              >
                Kontakt via Instagram →
              </a>
              <a href="#kontakt" className="btn btn--chalk">
                Direkt schreiben ↓
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Stats ── */}
      <section
        style={{
          background: 'var(--black)',
          borderTop: '1px solid rgba(244,241,235,0.1)',
          borderBottom: '1px solid rgba(244,241,235,0.1)',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
            overflow: 'hidden',
          }}
        >
          <Reveal><StatBlock val="900+" label="INSTAGRAM FOLLOWER" sub="@11.runclub" accent="var(--red)" /></Reveal>
          <Reveal delay={60}><StatBlock val="250+" label="WHATSAPP MEMBERS" sub="Aktive Community" accent="var(--chalk)" /></Reveal>
          <Reveal delay={120}><StatBlock val="52×" label="RUNS PRO JAHR" sub="Jeden Dienstag" accent="var(--coral)" /></Reveal>
          <Reveal delay={180}><StatBlock val="SOL" label="SOLOTHURN, CH" sub="Lokal & regional" accent="var(--ash)" /></Reveal>
        </div>
      </section>

      {/* ── Warum 11RUNCLUB? ── */}
      <section
        style={{
          background: 'var(--chalk)',
          padding: 'clamp(70px,10vw,140px) clamp(20px,4vw,56px)',
        }}
      >
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <Reveal>
            <div className="kicker">Warum Partner werden</div>
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
              Echte Menschen.<br />
              <span style={{ color: 'transparent', WebkitTextStroke: '2px var(--black)' }}>
                Echte Runs.
              </span>
            </h2>
          </Reveal>
          <Reveal delay={140}>
            <p
              style={{
                fontSize: 17,
                lineHeight: 1.75,
                color: '#555',
                maxWidth: 660,
                fontFamily: 'var(--font-archivo)',
                marginBottom: 60,
              }}
            >
              Unsere Community besteht nicht aus Followern — sie besteht aus echten Läufer:innen,
              die jeden Dienstag um 18:30 Uhr auftauchen, gemeinsam schwitzen und danach gemeinsam
              feiern. Das ist deine Zielgruppe: aktiv, lokal, loyal.
            </p>
          </Reveal>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: 20,
            }}
          >
            {[
              {
                num: '01',
                title: 'Authentische Reichweite',
                text: 'Keine bezahlten Follower, keine Fake-Engagement. Unsere 900+ Followers sind echte Läufer:innen aus der Region Solothurn und Umgebung.',
              },
              {
                num: '02',
                title: 'Wöchentlicher Kontakt',
                text: 'Jeden Dienstag treffen sich 20–50+ Läufer:innen. Dein Produkt kommt dort an, wo es erlebt wird — nicht nur gesehen.',
              },
              {
                num: '03',
                title: 'Engagierte Zielgruppe',
                text: 'Sportbegeisterte, die aktiv investieren: in Ausrüstung, Ernährung und Erlebnisse. Kaufkräftig, offen für neue Marken.',
              },
              {
                num: '04',
                title: 'Regional verankert',
                text: 'Solothurn ist unsere Heimat. Lokale Präsenz schlägt nationale Werbung — deine Marke wird Teil der Stadtkultur.',
              },
            ].map(({ num, title, text }, i) => (
              <Reveal key={num} delay={i * 60}>
                <div
                  style={{
                    padding: 'clamp(24px,3vw,36px)',
                    border: '1.5px solid rgba(13,12,11,0.1)',
                    borderRadius: 20,
                    height: '100%',
                  }}
                >
                  <div
                    style={{
                      fontFamily: 'var(--font-ibm-plex-mono)',
                      fontSize: 11,
                      letterSpacing: '0.2em',
                      color: 'var(--red)',
                      marginBottom: 16,
                    }}
                  >
                    {num}
                  </div>
                  <h3
                    style={{
                      fontFamily: 'var(--font-anton)',
                      fontSize: 'clamp(22px,2.2vw,30px)',
                      textTransform: 'uppercase',
                      lineHeight: 1.05,
                      marginBottom: 14,
                    }}
                  >
                    {title}
                  </h3>
                  <p
                    style={{
                      fontSize: 15,
                      lineHeight: 1.65,
                      color: '#555',
                      fontFamily: 'var(--font-archivo)',
                    }}
                  >
                    {text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Was wir suchen ── */}
      <section
        style={{
          background: 'var(--red)',
          color: 'var(--chalk)',
          padding: 'clamp(70px,10vw,140px) clamp(20px,4vw,56px)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Dashed ring decoration */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            right: '-8%',
            top: '50%',
            transform: 'translateY(-50%)',
            width: 'clamp(200px,30vw,420px)',
            aspectRatio: '1',
            borderRadius: '50%',
            border: '2px dashed rgba(244,241,235,0.2)',
            animation: 'spin 50s linear infinite',
          }}
        />

        <div style={{ position: 'relative', maxWidth: 780 }}>
          <Reveal>
            <div className="kicker kicker--chalk">Gesuch</div>
          </Reveal>
          <Reveal delay={80}>
            <h2
              style={{
                fontFamily: 'var(--font-anton)',
                fontSize: 'clamp(44px,7vw,104px)',
                lineHeight: 0.95,
                textTransform: 'uppercase',
                marginBottom: 28,
              }}
            >
              Das suchen<br />wir.
            </h2>
          </Reveal>
          <Reveal delay={140}>
            <p
              style={{
                fontSize: 18,
                lineHeight: 1.75,
                color: 'rgba(244,241,235,0.88)',
                fontFamily: 'var(--font-archivo)',
                marginBottom: 48,
              }}
            >
              Wir sind offen für Partnerschaften, die unserer Community echten Mehrwert bringen.
              Unser Fokus liegt auf{' '}
              <strong style={{ color: 'var(--chalk)', fontWeight: 700 }}>
                Food & Nutrition
              </strong>{' '}
              — Produkte, die Läufer:innen vor, während und nach dem Run begleiten.
            </p>
          </Reveal>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: 16,
              marginBottom: 32,
            }}
          >
            {[
              { emoji: '🍫', title: 'Energieriegel', desc: 'Bars, Gels, Pre-Workout Snacks für unterwegs.' },
              { emoji: '🌾', title: 'Oats & Frühstück', desc: 'Porridge, Müsli, Oat-Produkte für den Morgen vor dem Run.' },
              { emoji: '🥗', title: 'Post-Run Recovery', desc: 'Protein-Snacks, Recovery-Shakes, gesunde Mahlzeiten.' },
              { emoji: '🧃', title: 'Nutrition Brands', desc: 'Sportnahrung, Supplements, natürliche Sportprodukte.' },
            ].map(({ emoji, title, desc }, i) => (
              <Reveal key={title} delay={i * 60}>
                <div
                  style={{
                    background: 'rgba(244,241,235,0.12)',
                    border: '1px solid rgba(244,241,235,0.2)',
                    borderRadius: 16,
                    padding: '24px 22px',
                    backdropFilter: 'blur(8px)',
                  }}
                >
                  <div style={{ fontSize: 32, marginBottom: 12 }}>{emoji}</div>
                  <h3
                    style={{
                      fontFamily: 'var(--font-anton)',
                      fontSize: 22,
                      textTransform: 'uppercase',
                      marginBottom: 8,
                    }}
                  >
                    {title}
                  </h3>
                  <p
                    style={{
                      fontSize: 14,
                      lineHeight: 1.6,
                      color: 'rgba(244,241,235,0.75)',
                      fontFamily: 'var(--font-archivo)',
                    }}
                  >
                    {desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Hydration Notice */}
          <Reveal delay={300}>
            <div
              style={{
                background: 'rgba(13,12,11,0.3)',
                border: '1px solid rgba(244,241,235,0.25)',
                borderRadius: 16,
                padding: '24px 28px',
                display: 'flex',
                gap: 20,
                alignItems: 'flex-start',
              }}
            >
              <div
                style={{
                  position: 'relative',
                  width: 64,
                  aspectRatio: '3 / 4',
                  borderRadius: 10,
                  overflow: 'hidden',
                  flexShrink: 0,
                }}
              >
                <Image
                  src={PeaqBottlesImg}
                  alt="peaq hydration Getränke"
                  fill
                  sizes="64px"
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div>
                <div
                  style={{
                    fontFamily: 'var(--font-ibm-plex-mono)',
                    fontSize: 11,
                    letterSpacing: '0.15em',
                    color: 'rgba(244,241,235,0.6)',
                    marginBottom: 8,
                  }}
                >
                  HINWEIS — HYDRATION
                </div>
                <p
                  style={{
                    fontSize: 15,
                    lineHeight: 1.65,
                    color: 'rgba(244,241,235,0.88)',
                    fontFamily: 'var(--font-archivo)',
                  }}
                >
                  Der Bereich <strong>Hydration (Getränke & Trinken)</strong> ist bereits
                  fest vergeben. Wir sind stolz, von{' '}
                  <strong style={{ color: 'var(--chalk)' }}>peaq hydration</strong>{' '}
                  unterstützt zu werden. Anfragen in diesem Segment können wir leider
                  nicht berücksichtigen.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Partnermodelle ── */}
      <section
        style={{
          background: 'var(--chalk)',
          padding: 'clamp(70px,10vw,140px) clamp(20px,4vw,56px)',
        }}
      >
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <Reveal>
            <div className="kicker">Was wir anbieten</div>
          </Reveal>
          <Reveal delay={80}>
            <h2
              style={{
                fontFamily: 'var(--font-anton)',
                fontSize: 'clamp(44px,7vw,104px)',
                lineHeight: 0.95,
                textTransform: 'uppercase',
                marginBottom: 48,
              }}
            >
              Partner-<br />modelle.
            </h2>
          </Reveal>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: 20,
            }}
          >
            {[
              {
                icon: '📢',
                title: 'Visibility',
                description:
                  'Logo & Erwähnung auf der Website, in der WhatsApp-Community und auf unseren Instagram-Posts. Reichweite ohne Aufwand.',
                available: true,
              },
              {
                icon: '🎁',
                title: 'Product Sampling',
                description:
                  'Deine Produkte direkt an unsere Community — am Tuesday Run, am Longrun oder bei Events. Echter Test, echtes Feedback.',
                available: true,
              },
              {
                icon: '🤝',
                title: 'Co-Branding',
                description:
                  'Gemeinsame Events, gebrandete Run-Kits oder spezielle Challenges unter deinem Label. Tief verankert in der Community.',
                available: true,
              },
              {
                icon: '💧',
                title: 'Hydration Partner',
                description:
                  'Diese Kategorie ist bereits fest an peaq hydration vergeben. "Hydrated by peaq hydration."',
                available: false,
              },
            ].map((offer, i) => (
              <Reveal key={offer.title} delay={i * 60}>
                <OfferingCard {...offer} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Bestehende Partner ── */}
      <section
        style={{
          background: 'var(--black)',
          color: 'var(--chalk)',
          padding: 'clamp(60px,8vw,110px) clamp(20px,4vw,56px)',
        }}
      >
        <Reveal>
          <div className="kicker kicker--chalk">Aktuell dabei</div>
        </Reveal>
        <Reveal delay={60}>
          <h2
            style={{
              fontFamily: 'var(--font-anton)',
              fontSize: 'clamp(36px,5vw,72px)',
              lineHeight: 0.95,
              textTransform: 'uppercase',
              marginBottom: 40,
            }}
          >
            Unsere Partner.
          </h2>
        </Reveal>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: 20,
          }}
        >
          {[
            {
              name: 'SOL-ID Athletes World',
              role: 'Treffpunkt & Supporter',
              desc: 'Unser Heimathafen. Das SOL-ID am Klosterplatz 6 ist Start und Ziel jedes Tuesday Runs.',
              tag: 'HAUPTPARTNER',
              color: 'var(--red)',
              img: SolidImg,
            },
            {
              name: 'peaq hydration',
              role: 'Official Hydration Partner',
              desc: 'Hydrated by peaq hydration. Der Bereich Getränke ist fest vergeben.',
              tag: 'HYDRATION · VERGEBEN',
              color: 'var(--cobalt)',
              img: PeaqImg,
            },
          ].map(({ name, role, desc, tag, color, img }, i) => (
            <Reveal key={name} delay={i * 80}>
              <div
                style={{
                  border: '1px solid rgba(244,241,235,0.15)',
                  borderRadius: 20,
                  overflow: 'hidden',
                  position: 'relative',
                }}
              >
                <div style={{ position: 'relative', aspectRatio: '4 / 5' }}>
                  <Image
                    src={img}
                    alt={`${name} × 11RUNCLUB`}
                    fill
                    sizes="(max-width: 640px) 100vw, 400px"
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <div style={{ padding: 'clamp(24px,3vw,36px)', position: 'relative' }}>
                  <div
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      height: 3,
                      background: color,
                    }}
                  />
                  <div
                    style={{
                      fontFamily: 'var(--font-ibm-plex-mono)',
                      fontSize: 10,
                      letterSpacing: '0.2em',
                      color,
                      marginBottom: 16,
                      marginTop: 8,
                    }}
                  >
                    {tag}
                  </div>
                  <h3
                    style={{
                      fontFamily: 'var(--font-anton)',
                      fontSize: 'clamp(20px,2vw,28px)',
                      textTransform: 'uppercase',
                      marginBottom: 6,
                    }}
                  >
                    {name}
                  </h3>
                  <div
                    style={{
                      fontFamily: 'var(--font-ibm-plex-mono)',
                      fontSize: 12,
                      letterSpacing: '0.1em',
                      color: 'var(--ash)',
                      marginBottom: 14,
                    }}
                  >
                    {role}
                  </div>
                  <p
                    style={{
                      fontSize: 14,
                      lineHeight: 1.65,
                      color: 'rgba(244,241,235,0.65)',
                      fontFamily: 'var(--font-archivo)',
                    }}
                  >
                    {desc}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── Ehemalige Partner ── */}
      <section
        style={{
          background: 'var(--chalk)',
          padding: 'clamp(60px,8vw,110px) clamp(20px,4vw,56px)',
        }}
      >
        <Reveal>
          <div className="kicker">Danke für die Zusammenarbeit</div>
        </Reveal>
        <Reveal delay={60}>
          <h2
            style={{
              fontFamily: 'var(--font-anton)',
              fontSize: 'clamp(36px,5vw,72px)',
              lineHeight: 0.95,
              textTransform: 'uppercase',
              marginBottom: 16,
            }}
          >
            Ehemalige Partner.
          </h2>
        </Reveal>
        <Reveal delay={100}>
          <p style={{ maxWidth: 560, fontSize: 15, lineHeight: 1.65, color: '#555', marginBottom: 40 }}>
            Café Filandia und Steiner Backtradition haben unsere Longruns mit
            frischem Gebäck begleitet — für die tolle einmalige Zusammenarbeit sagen wir danke.
          </p>
        </Reveal>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: 20,
            maxWidth: 700,
          }}
        >
          {[
            { name: 'Café Filandia', img: FilandiaImg },
            { name: 'Steiner Backtradition', img: SteinerImg },
          ].map(({ name, img }, i) => (
            <Reveal key={name} delay={i * 80}>
              <div
                style={{
                  border: '1.5px solid rgba(13,12,11,0.1)',
                  borderRadius: 20,
                  overflow: 'hidden',
                  position: 'relative',
                }}
              >
                <div style={{ position: 'relative', aspectRatio: '9 / 16' }}>
                  <Image
                    src={img}
                    alt={`${name} × 11RUNCLUB — vergangener Longrun-Partner`}
                    fill
                    sizes="(max-width: 640px) 100vw, 340px"
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <div
                  style={{
                    position: 'absolute',
                    top: 16,
                    left: 16,
                    fontFamily: 'var(--font-ibm-plex-mono)',
                    fontSize: 10,
                    letterSpacing: '0.15em',
                    padding: '5px 12px',
                    borderRadius: 999,
                    background: 'rgba(13,12,11,0.55)',
                    color: 'var(--chalk)',
                    backdropFilter: 'blur(4px)',
                  }}
                >
                  EHEMALIGER PARTNER
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── Kontakt / CTA ── */}
      <section
        id="kontakt"
        style={{
          background: 'var(--chalk)',
          padding: 'clamp(70px,10vw,140px) clamp(20px,4vw,56px)',
        }}
      >
        <div
          style={{
            maxWidth: 700,
            margin: '0 auto',
            textAlign: 'center',
          }}
        >
          <Reveal>
            <div className="kicker" style={{ justifyContent: 'center' }}>
              Interesse?
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
              Lass uns reden.
            </h2>
          </Reveal>
          <Reveal delay={140}>
            <p
              style={{
                fontSize: 17,
                lineHeight: 1.75,
                color: '#555',
                marginBottom: 48,
                fontFamily: 'var(--font-archivo)',
              }}
            >
              Reach out über Instagram oder per Mail. Wir melden uns innerhalb von 48 Stunden.
              Kein Pitch-Deck nötig — einfach schreiben.
            </p>
          </Reveal>

          <Reveal delay={200}>
            <div
              style={{
                display: 'flex',
                gap: 16,
                justifyContent: 'center',
                flexWrap: 'wrap',
                marginBottom: 48,
              }}
            >
              <a
                href="https://instagram.com/11.runclub"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--solid"
                style={{ minWidth: 220 }}
              >
                Instagram: @11.runclub →
              </a>
              <a
                href="mailto:hello@11runclub.ch"
                className="btn btn--ghost"
                style={{ minWidth: 220 }}
              >
                hello@11runclub.ch
              </a>
            </div>
          </Reveal>

          <Reveal delay={260}>
            <div
              style={{
                padding: '28px 32px',
                background: 'var(--black)',
                color: 'var(--chalk)',
                borderRadius: 20,
                fontFamily: 'var(--font-ibm-plex-mono)',
                fontSize: 13,
                letterSpacing: '0.1em',
                lineHeight: 1.8,
              }}
            >
              <div style={{ color: 'var(--red)', fontSize: 11, marginBottom: 12 }}>
                QUICK FACTS — FÜR DEINE ANFRAGE
              </div>
              <div style={{ color: 'rgba(244,241,235,0.7)' }}>
                📍 Solothurn, Schweiz<br />
                📅 52 Tuesday Runs/Jahr + Spezial-Events<br />
                👥 900+ Insta · 250+ WhatsApp<br />
                🎯 Zielgruppe: Sportbegeisterte, 18–45 Jahre<br />
                ✅ Offen für: Food, Nutrition, Recovery<br />
                ❌ Vergeben: Hydration (peaq hydration)
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
