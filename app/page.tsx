'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import ShirtImg from '../reference/shirt.jpg'
import FrontRunImg from '../reference/frontrun.jpg'
import RunLineImg from '../reference/runline.jpg'
import LandingHeroImg from '../reference/landing-hero.jpg'
import SolothurnCityImg from '../reference/solothurn-city.jpg'

/* ─── Countdown ─────────────────────────────────────────────────────────────── */
function nextTuesday() {
	const now = new Date()
	const d = new Date(now)
	d.setHours(18, 30, 0, 0)
	let add = (2 - d.getDay() + 7) % 7
	if (add === 0 && d <= now) add = 7
	d.setDate(d.getDate() + add)
	return d
}

function Countdown() {
	const [time, setTime] = useState({ d: 0, h: '00', m: '00', s: '00' })
	const targetRef = useRef(nextTuesday())

	useEffect(() => {
		function tick() {
			const ms = targetRef.current.getTime() - Date.now()
			if (ms < 0) {
				targetRef.current = nextTuesday()
				return
			}
			const total = Math.floor(ms / 1000)
			setTime({
				d: Math.floor(total / 86400),
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
					fontSize: 13,
					letterSpacing: '0.2em',
					color: 'var(--red)',
					marginBottom: 12,
				}}
			>
				<strong>COUNTDOWN — NEXT RUN</strong>
			</div>
			<div
				style={{
					fontFamily: 'var(--font-ibm-plex-mono)',
					border: '2px solid var(--black)',
					borderRadius: 18,
					padding: 'clamp(18px,2.4vw,30px) clamp(20px,3vw,36px)',
					display: 'flex',
					gap: 'clamp(20px,3vw,40px)',
					background: 'var(--chalk)',
					boxShadow: '9px 9px 0 var(--red)',
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
								fontVariantNumeric: 'tabular-nums',
								color: 'var(--red)',
							}}
						>
							{val}
						</div>
						<div
							style={{
								fontSize: 11,
								letterSpacing: '0.2em',
								color: 'var(--ash)',
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

/* ─── ScrollReveal ───────────────────────────────────────────────────────────── */
function useReveal() {
	const ref = useRef<HTMLDivElement>(null)
	useEffect(() => {
		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches)
			return
		const el = ref.current
		if (!el) return
		const io = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					el.classList.add('in')
					io.disconnect()
				}
			},
			{ threshold: 0.15 },
		)
		io.observe(el)
		return () => io.disconnect()
	}, [])
	return ref
}

function Reveal({
	children,
	delay = 0,
	className = '',
}: {
	children: React.ReactNode
	delay?: number
	className?: string
}) {
	const ref = useReveal()
	return (
		<div
			ref={ref}
			className={`reveal ${className}`}
			style={{ transitionDelay: `${delay}ms` }}
		>
			{children}
		</div>
	)
}

/* ─── Route Map SVG ──────────────────────────────────────────────────────────── */
function RouteMap() {
	const mapRef = useRef<HTMLDivElement>(null)
	useEffect(() => {
		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches)
			return
		const el = mapRef.current
		if (!el) return
		const io = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					el.classList.add('in')
					io.disconnect()
				}
			},
			{ threshold: 0.2 },
		)
		io.observe(el)
		return () => io.disconnect()
	}, [])

	return (
		<div
			ref={mapRef}
			style={{
				border: '1px solid rgba(244,241,235,0.18)',
				borderRadius: 18,
				padding: 26,
				position: 'relative',
				background: 'rgba(244,241,235,0.03)',
			}}
			className="next-map"
		>
			<div
				style={{
					fontFamily: 'var(--font-ibm-plex-mono)',
					fontSize: 11,
					letterSpacing: '0.2em',
					color: 'var(--ash)',
					display: 'flex',
					justifyContent: 'space-between',
					marginBottom: 10,
					flexWrap: 'wrap',
					gap: '2px 12px',
				}}
			>
				<span>BEISPIEL-ROUTE</span>
				<span>6 KM</span>
			</div>
			<div
				style={{
					position: 'relative',
					width: '100%',
					aspectRatio: '713 / 701',
					borderRadius: 12,
					overflow: 'hidden',
					background: 'rgba(244,241,235,0.04)',
				}}
			>
				<svg
					viewBox="0 0 713 701"
					style={{
						position: 'absolute',
						inset: 0,
						width: '100%',
						height: '100%',
					}}
				>
					{/* Imaginäre Karte — abstrahiertes Strassenraster + Fluss, keine echten Ortsdaten */}
					<path
						d="M-20,630 C110,605 210,565 290,505 C370,445 450,385 550,345 C615,320 675,302 733,292"
						fill="none"
						stroke="rgba(30,59,209,0.32)"
						strokeWidth="26"
						strokeLinecap="round"
					/>
					<g
						fill="none"
						stroke="rgba(244,241,235,0.13)"
						strokeWidth="1.5"
					>
						<path d="M80,-10 C95,120 60,250 100,380 C130,470 90,590 110,711" />
						<path d="M190,-10 C175,110 215,240 180,370 C155,460 200,580 175,711" />
						<path d="M300,-10 C315,130 285,260 310,390 C330,480 295,600 315,711" />
						<path d="M410,-10 C395,120 430,250 400,380 C380,470 420,590 395,711" />
						<path d="M520,-10 C535,110 500,240 530,370 C550,460 515,580 535,711" />
						<path d="M620,-10 C605,130 640,260 615,390 C595,480 630,600 610,711" />
						<path d="M-10,90 C130,105 260,75 390,100 C480,118 600,85 723,105" />
						<path d="M-10,220 C130,205 260,240 390,215 C480,198 600,230 723,210" />
						<path d="M-10,350 C130,365 260,335 390,360 C480,378 600,345 723,365" />
						<path d="M-10,480 C130,465 260,495 390,470 C480,452 600,485 723,465" />
						<path d="M-10,600 C130,615 260,585 390,610 C480,628 600,595 723,615" />
					</g>
					<g fill="rgba(30,140,90,0.13)">
						<ellipse
							cx="120"
							cy="130"
							rx="70"
							ry="50"
							transform="rotate(-12 120 130)"
						/>
						<ellipse
							cx="600"
							cy="470"
							rx="85"
							ry="60"
							transform="rotate(8 600 470)"
						/>
						<ellipse
							cx="560"
							cy="120"
							rx="55"
							ry="40"
							transform="rotate(15 560 120)"
						/>
					</g>
					{/* Route line — nachgezeichnet von einem Lauf, den wir vor ein paar Wochen gemacht haben */}
					<path
						className="route-line"
						d="M230,552 L210,530 L190,500 L175,470 L162,445 L150,430 L162,417 L142,405 L130,390 L137,376 L124,357 L130,345 L148,332 L175,315 L205,296 L230,279 L255,263 L280,249 L300,240 L302,216 L306,191 L317,166 L331,146 L346,129 L361,114 L378,99 L395,86 L410,76 L425,69 L438,64 L449,73 L459,66 L476,86 L496,106 L516,126 L531,146 L541,153 L524,159 L505,161 L486,169 L461,173 L441,171 L421,179 L401,186 L386,196 L376,216 L369,241 L363,261 L351,286 L339,311 L326,336 L316,361 L309,386 L301,406 L296,416 L301,431 L311,451 L321,463 L311,451 L301,431 L296,416 L301,406 L309,386 L316,361 L326,336 L339,311 L351,286 L363,261 L369,241 L376,216 L386,196 L401,186 L421,179 L441,171 L461,173 L486,169 L505,161 L524,159 L541,153 L531,146 L516,126 L496,106 L476,86 L459,66 L449,73 L438,64 L425,69 L410,76 L395,86 L378,99 L361,114 L346,129 L331,146 L317,166 L306,191 L302,216 L300,240 L280,249 L255,263 L230,279 L205,296 L175,315 L148,332 L130,345 L124,357 L137,376 L130,390 L142,405 L162,417 L150,430 L162,445 L175,470 L190,500 L210,530 L230,552"
					/>
					{/* Läufer-Punkt */}
					<circle
						r="9"
						fill="#F4F1EB"
						stroke="#EE3829"
						strokeWidth="4"
					>
						<animateMotion
							dur="15s"
							repeatCount="indefinite"
							begin="2.5s"
							path="M230,552 L210,530 L190,500 L175,470 L162,445 L150,430 L162,417 L142,405 L130,390 L137,376 L124,357 L130,345 L148,332 L175,315 L205,296 L230,279 L255,263 L280,249 L300,240 L302,216 L306,191 L317,166 L331,146 L346,129 L361,114 L378,99 L395,86 L410,76 L425,69 L438,64 L449,73 L459,66 L476,86 L496,106 L516,126 L531,146 L541,153 L524,159 L505,161 L486,169 L461,173 L441,171 L421,179 L401,186 L386,196 L376,216 L369,241 L363,261 L351,286 L339,311 L326,336 L316,361 L309,386 L301,406 L296,416 L301,431 L311,451 L321,463 L311,451 L301,431 L296,416 L301,406 L309,386 L316,361 L326,336 L339,311 L351,286 L363,261 L369,241 L376,216 L386,196 L401,186 L421,179 L441,171 L461,173 L486,169 L505,161 L524,159 L541,153 L531,146 L516,126 L496,106 L476,86 L459,66 L449,73 L438,64 L425,69 L410,76 L395,86 L378,99 L361,114 L346,129 L331,146 L317,166 L306,191 L302,216 L300,240 L280,249 L255,263 L230,279 L205,296 L175,315 L148,332 L130,345 L124,357 L137,376 L130,390 L142,405 L162,417 L150,430 L162,445 L175,470 L190,500 L210,530 L230,552"
						/>
					</circle>
				</svg>
			</div>
			<p
				style={{
					fontFamily: 'var(--font-ibm-plex-mono)',
					fontSize: 12,
					letterSpacing: '0.14em',
					color: 'var(--coral)',
					marginTop: 10,
				}}
			>
				→ Beispielroute: einer unserer Läufe der letzten Wochen. Die
				echte Strecke gibts am Start.
			</p>
			<div
				className="checker"
				style={{ position: 'absolute', bottom: 20, right: 22 }}
			/>
			<style>{`
        .route-line {
          fill: none; stroke: #EE3829; stroke-width: 6;
          stroke-linecap: round; stroke-linejoin: round;
          stroke-dasharray: 6500; stroke-dashoffset: 6500;
          transition: stroke-dashoffset 2.8s cubic-bezier(.45,0,.2,1) .3s;
        }
        .next-map.in .route-line { stroke-dashoffset: 0; }
      `}</style>
		</div>
	)
}

/* ─── Pinned Event Section ───────────────────────────────────────────────────── */
function PinnedEvent() {
	const pinRef = useRef<HTMLDivElement>(null)
	const eventRef = useRef<HTMLElement>(null)

	useEffect(() => {
		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches)
			return
		const pin = pinRef.current
		const ev = eventRef.current
		if (!pin || !ev) return

		const clamp01 = (v: number) => Math.min(1, Math.max(0, v))
		const stage = (p: number, a: number, b: number) =>
			clamp01((p - a) / (b - a))

		let ticking = false
		function update() {
			ticking = false
			const r = pin!.getBoundingClientRect()
			const p = clamp01(-r.top / (r.height - window.innerHeight))
			ev!.style.setProperty('--p', String(p))
			ev!.style.setProperty('--p1', String(stage(p, 0, 0.35)))
			ev!.style.setProperty('--p2', String(stage(p, 0.25, 0.6)))
		}

		const onScroll = () => {
			if (!ticking) {
				ticking = true
				requestAnimationFrame(update)
			}
		}
		window.addEventListener('scroll', onScroll, { passive: true })
		update()
		return () => window.removeEventListener('scroll', onScroll)
	}, [])

	return (
		<>
			<style>{`
        .pin-wrap { height: 170svh; position: relative; }
        .pin-event {
          position: sticky; top: 0;
          min-height: 100svh;
          display: flex; flex-direction: column; justify-content: center;
          background: var(--red); color: var(--chalk);
          padding: clamp(70px,10vw,140px) clamp(20px,4vw,56px);
          overflow: hidden;
        }
        .pin-event__big {
          font-family: var(--font-anton); text-transform: uppercase;
          line-height: 0.9;
          font-size: clamp(58px, 11vw, 170px);
          margin-top: 28px;
          transform: translateY(calc((1 - var(--p1, 0)) * 60px));
        }
        .pin-event__row {
          transform: translateY(calc((1 - var(--p2, 0)) * 36px));
          display: flex; justify-content: space-between;
          align-items: flex-end; flex-wrap: wrap;
          gap: 28px; margin-top: 44px;
          border-top: 1.5px solid rgba(244,241,235,0.5);
          padding-top: 28px;
        }
        .pin-event__circle {
          position: absolute; right: -8%; top: 8%;
          width: clamp(180px,26vw,380px); aspect-ratio: 1;
          border-radius: 50%;
          background:
            radial-gradient(circle at 30% 35%, rgba(244,241,235,0.32), transparent 55%),
            linear-gradient(125deg, #7e1f17, #3c0f0b 60%);
          box-shadow: inset 0 0 0 10px var(--red), inset 0 0 0 12px rgba(244,241,235,0.6);
          transform: rotate(calc(var(--p, 0) * 14deg)) scale(calc(.9 + var(--p, 0) * .14));
        }
        @media (prefers-reduced-motion: reduce) {
          .pin-wrap { height: auto; }
          .pin-event { position: static; min-height: 0; }
          .pin-event__big, .pin-event__row { transform: none; }
          .pin-event__circle { transform: none; }
        }
      `}</style>
			<div className="pin-wrap" id="events" ref={pinRef}>
				<section className="pin-event" ref={eventRef}>
					<div className="pin-event__circle" aria-hidden="true" />
					<div className="kicker kicker--chalk">
						Save the Date — By Saucony × 11RUNCLUB
					</div>
					<div className="pin-event__big">
						The
						<br />
						<span
							style={{
								color: 'transparent',
								WebkitTextStroke: '2px var(--chalk)',
							}}
						>
							Maze
						</span>
					</div>
					<div className="pin-event__row">
						<div
							style={{
								fontFamily: 'var(--font-ibm-plex-mono)',
								fontSize: 14,
								letterSpacing: '0.14em',
								lineHeight: 2.1,
							}}
						>
							FR 25.09.2026 — ENTER TECHNIKWELT, DERENDINGEN
							<br />
							4ER-STAFFEL — RAUFS PARKDECK UND RUNTER
							<br />
							120 LÄUFER:INNEN — INFOS FOLGEN
						</div>
						<Link
							href="/enter-hillclimb"
							className="btn btn--chalk"
						>
							Zur Race-Page →
						</Link>
					</div>
				</section>
			</div>
		</>
	)
}

/* ─── Strava Section ─────────────────────────────────────────────────────────── */
function StravaSection() {
	return (
		<section
			style={{
				background: 'var(--cobalt)',
				color: 'var(--chalk)',
				padding: 'clamp(70px,10vw,140px) clamp(20px,4vw,56px)',
				position: 'relative',
				overflow: 'hidden',
			}}
			id="strava"
		>
			{/* Background "11" watermark */}
			<div
				aria-hidden="true"
				style={{
					position: 'absolute',
					top: '-10%',
					right: '-5%',
					fontFamily: 'var(--font-anton)',
					fontSize: 'clamp(200px, 35vw, 500px)',
					color: 'transparent',
					WebkitTextStroke: '1.5px rgba(244,241,235,0.08)',
					lineHeight: 1,
					userSelect: 'none',
					pointerEvents: 'none',
				}}
			>
				11
			</div>

			<div style={{ position: 'relative', maxWidth: 900 }}>
				<Reveal>
					<div
						className="kicker"
						style={{ color: 'rgba(244,241,235,0.7)' }}
					>
						<span
							style={{
								display: 'inline-block',
								width: 34,
								height: 2,
								background: 'rgba(244,241,235,0.7)',
								flexShrink: 0,
							}}
						/>
						Kilometer sammeln
					</div>
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
						Wir tracken auf
						<br />
						<span style={{ color: 'var(--red)' }}>Strava.</span>
					</h2>
				</Reveal>

				<Reveal delay={160}>
					<p
						style={{
							fontSize: 17,
							lineHeight: 1.7,
							color: 'rgba(244,241,235,0.8)',
							maxWidth: 560,
							marginBottom: 40,
							fontFamily: 'var(--font-archivo)',
						}}
					>
						Tritt unserem offiziellen Strava-Club bei und sammle mit
						der ganzen Community Kilometer. Jede Runde zählt — egal
						ob Social Run, Longrun oder Solo-Training zwischendurch.
					</p>
				</Reveal>

				<Reveal delay={240}>
					<div
						style={{
							display: 'flex',
							gap: 16,
							flexWrap: 'wrap',
							alignItems: 'center',
						}}
					>
						<a
							href="https://www.strava.com/clubs/11RUNCLUB"
							target="_blank"
							rel="noopener noreferrer"
							style={{
								display: 'inline-flex',
								alignItems: 'center',
								gap: 10,
								textDecoration: 'none',
								background: '#FC4C02',
								color: '#fff',
								fontFamily: 'var(--font-ibm-plex-mono)',
								fontSize: 13,
								letterSpacing: '0.1em',
								padding: '14px 28px',
								borderRadius: 999,
								border: 'none',
								cursor: 'pointer',
								transition: 'transform 0.25s, box-shadow 0.25s',
							}}
							onMouseEnter={(e) => {
								;(
									e.currentTarget as HTMLAnchorElement
								).style.transform = 'translateY(-2px)'
								;(
									e.currentTarget as HTMLAnchorElement
								).style.boxShadow =
									'0 8px 24px rgba(252,76,2,0.4)'
							}}
							onMouseLeave={(e) => {
								;(
									e.currentTarget as HTMLAnchorElement
								).style.transform = ''
								;(
									e.currentTarget as HTMLAnchorElement
								).style.boxShadow = ''
							}}
						>
							{/* Strava Logo Icon */}
							<svg
								width="18"
								height="18"
								viewBox="0 0 24 24"
								fill="white"
							>
								<path d="M15.387 17.944l-2.089-4.116h-3.065L15.387 24l5.15-10.172h-3.066m-7.008-5.599l2.836 5.599h4.172L10.463 0l-7 13.828h4.169" />
							</svg>
							Zum Strava-Club →
						</a>

						<div
							style={{
								fontFamily: 'var(--font-ibm-plex-mono)',
								fontSize: 12,
								letterSpacing: '0.14em',
								color: 'rgba(244,241,235,0.55)',
							}}
						>
							CLUB · 11RUNCLUB · SOLOTHURN
						</div>
					</div>
				</Reveal>

				{/* Stats */}
				<div
					style={{
						display: 'grid',
						gridTemplateColumns:
							'repeat(auto-fit, minmax(140px, 1fr))',
						gap: 1,
						marginTop: 60,
						border: '1px solid rgba(244,241,235,0.15)',
						borderRadius: 16,
						overflow: 'hidden',
					}}
				>
					{[
						{ val: '150+', lbl: 'MEMBERS' },
						{ val: 'Weekly', lbl: 'Runs' },
					].map(({ val, lbl }, i) => (
						<Reveal key={lbl} delay={i * 80}>
							<div
								style={{
									padding: '28px 24px',
									background: 'rgba(244,241,235,0.06)',
									borderRight:
										i < 1
											? '1px solid rgba(244,241,235,0.1)'
											: 'none',
								}}
							>
								<div
									style={{
										fontFamily: 'var(--font-anton)',
										fontSize: 'clamp(36px,5vw,64px)',
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
										color: 'rgba(244,241,235,0.5)',
										marginTop: 8,
									}}
								>
									{lbl}
								</div>
							</div>
						</Reveal>
					))}
				</div>
			</div>
		</section>
	)
}

/* ─── Slogan Marquee ─────────────────────────────────────────────────────────── */
function SloganMarquee() {
	const trackRef = useRef<HTMLDivElement>(null)
	useEffect(() => {
		if (trackRef.current) {
			trackRef.current.innerHTML += trackRef.current.innerHTML
		}
	}, [])
	return (
		<div className="slogan" aria-hidden="true">
			<div className="slogan__track" ref={trackRef}>
				<span>Run together.</span>
				<span
					style={{
						color: 'transparent',
						WebkitTextStroke: '1.5px var(--black)',
					}}
				>
					Improve together.
				</span>
				<span>Enjoy together.</span>
				<span
					style={{
						color: 'transparent',
						WebkitTextStroke: '1.5px var(--black)',
					}}
				>
					·
				</span>
			</div>
		</div>
	)
}

/* ─── Hero Parallax ──────────────────────────────────────────────────────────── */
function HeroEleven() {
	const ref = useRef<HTMLDivElement>(null)
	useEffect(() => {
		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches)
			return
		const el = ref.current
		if (!el) return
		const onScroll = () => {
			el.style.transform = `translateY(${window.scrollY * 0.12}px)`
		}
		window.addEventListener('scroll', onScroll, { passive: true })
		return () => window.removeEventListener('scroll', onScroll)
	}, [])
	return (
		<div
			ref={ref}
			aria-hidden="true"
			style={{
				position: 'absolute',
				top: '-4vw',
				right: '-2vw',
				fontFamily: 'var(--font-anton)',
				fontSize: 'clamp(300px,42vw,640px)',
				color: 'transparent',
				WebkitTextStroke: '1.5px rgba(13,12,11,0.10)',
				lineHeight: 1,
				userSelect: 'none',
				pointerEvents: 'none',
			}}
		>
			11
		</div>
	)
}

/* ─── Social Run Card Stack ──────────────────────────────────────────────────── */
const RUN_CARDS = [
	{
		tag: 'DIENSTAGS · SOCIAL',
		title: 'Social Run',
		spec: '18:30 · 6 & 10 KM',
		bg: 'var(--red)',
		color: 'var(--chalk)',
	},
	{
		tag: 'DIENSTAGS · WORKOUT',
		title: 'Hill Reps',
		spec: 'BERGSPRINTS · ALLE LEVELS',
		bg: 'var(--cobalt)',
		color: 'var(--chalk)',
	},
	{
		tag: 'DIENSTAGS · WORKOUT',
		title: 'Progression Run',
		spec: 'START EASY · FINISH FAST',
		bg: '#fff',
		color: 'var(--black)',
		border: '1.5px solid var(--black)',
	},
	{
		tag: 'DIENSTAGS · WORKOUT',
		title: 'Out & Back',
		spec: 'RAUS · WENDEN · ZURÜCK',
		bg: 'var(--coral)',
		color: 'var(--black)',
	},
	{
		tag: '1× IM MONAT',
		title: 'Longrun',
		spec: 'SA · 09:30 · 10 ODER 15 KM',
		bg: 'var(--black)',
		color: 'var(--chalk)',
	},
]

function RunStack() {
	const [index, setIndex] = useState(0)
	const startX = useRef<number | null>(null)

	const next = () => setIndex((i) => (i + 1) % RUN_CARDS.length)
	const prev = () =>
		setIndex((i) => (i - 1 + RUN_CARDS.length) % RUN_CARDS.length)

	const onPointerDown = (e: React.PointerEvent) => {
		startX.current = e.clientX
		e.currentTarget.setPointerCapture?.(e.pointerId)
	}
	const onPointerUp = (e: React.PointerEvent) => {
		if (startX.current === null) return
		const dx = e.clientX - startX.current
		if (dx < -36) next()
		else if (dx > 36) prev()
		startX.current = null
	}
	const onPointerCancel = () => {
		startX.current = null
	}

	return (
		<div>
			<div
				style={{
					position: 'relative',
					aspectRatio: '3 / 4.1',
					userSelect: 'none',
					touchAction: 'none',
				}}
				onPointerDown={onPointerDown}
				onPointerUp={onPointerUp}
				onPointerCancel={onPointerCancel}
			>
				{RUN_CARDS.map((c, i) => {
					const rel =
						(i - index + RUN_CARDS.length) % RUN_CARDS.length
					if (rel > 2) return null
					return (
						<div
							key={c.title}
							className="run-card"
							style={{
								position: 'absolute',
								inset: 0,
								background: c.bg,
								color: c.color,
								border: c.border || 'none',
								borderRadius: 16,
								padding: 22,
								display: 'flex',
								flexDirection: 'column',
								justifyContent: 'space-between',
								overflow: 'hidden',
								cursor: rel === 0 ? 'grab' : 'default',
								transform: `translateY(${rel * 14}px) scale(${1 - rel * 0.045})`,
								zIndex: RUN_CARDS.length - rel,
								opacity: rel === 0 ? 1 : 0.92 - rel * 0.16,
								transition:
									'transform 0.4s cubic-bezier(.3,0,.2,1), opacity 0.4s',
								pointerEvents: rel === 0 ? 'auto' : 'none',
							}}
						>
							<span
								style={{
									fontFamily: 'var(--font-ibm-plex-mono)',
									fontSize: 11,
									letterSpacing: '0.2em',
									opacity: 0.85,
								}}
							>
								{c.tag}
							</span>
							<div className="ring" />
							<div>
								<h3
									style={{
										fontFamily: 'var(--font-anton)',
										fontWeight: 400,
										fontSize: 'clamp(34px,3.4vw,52px)',
										lineHeight: 0.92,
										textTransform: 'uppercase',
										marginTop: 'auto',
									}}
								>
									{c.title}
								</h3>
								<div
									style={{
										fontFamily: 'var(--font-ibm-plex-mono)',
										fontSize: 12,
										letterSpacing: '0.12em',
										marginTop: 14,
										opacity: 0.85,
									}}
								>
									{c.spec}
								</div>
							</div>
						</div>
					)
				})}
			</div>

			<div
				style={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'space-between',
					marginTop: 14,
				}}
			>
				<div style={{ display: 'flex', gap: 8 }}>
					<button
						aria-label="Vorherige Karte"
						onClick={prev}
						style={{
							width: 30,
							height: 30,
							borderRadius: '50%',
							border: '1.5px solid var(--black)',
							background: 'transparent',
							cursor: 'pointer',
							fontSize: 14,
							lineHeight: 1,
						}}
					>
						‹
					</button>
					<button
						aria-label="Nächste Karte"
						onClick={next}
						style={{
							width: 30,
							height: 30,
							borderRadius: '50%',
							border: '1.5px solid var(--black)',
							background: 'transparent',
							cursor: 'pointer',
							fontSize: 14,
							lineHeight: 1,
						}}
					>
						›
					</button>
				</div>
				<div style={{ display: 'flex', gap: 6 }}>
					{RUN_CARDS.map((c, i) => (
						<button
							key={c.title}
							aria-label={c.title}
							onClick={() => setIndex(i)}
							style={{
								width: 8,
								height: 8,
								borderRadius: '50%',
								border: 'none',
								cursor: 'pointer',
								padding: 0,
								background:
									i === index
										? 'var(--black)'
										: 'rgba(13,12,11,0.2)',
							}}
						/>
					))}
				</div>
				<div
					style={{
						fontFamily: 'var(--font-ibm-plex-mono)',
						fontSize: 11,
						letterSpacing: '0.14em',
						color: 'var(--ash)',
					}}
				>
					← WISCHEN →
				</div>
			</div>
		</div>
	)
}

/* ─── Impressionen Gallery ───────────────────────────────────────────────────── */
function ImpressionenSection() {
	return (
		<section
			style={{
				background: 'var(--chalk)',
				padding: 'clamp(70px,10vw,140px) clamp(20px,4vw,56px)',
			}}
		>
			<Reveal>
				<div className="kicker">Impressionen</div>
			</Reveal>
			<Reveal delay={60}>
				<h2
					style={{
						fontFamily: 'var(--font-anton)',
						fontSize: 'clamp(44px,7vw,104px)',
						lineHeight: 0.95,
						textTransform: 'uppercase',
						marginBottom: 24,
					}}
				>
					Das ist unsere
					<br />
					Energie.
				</h2>
			</Reveal>

			<div
				style={{
					display: 'grid',
					gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
					gap: 24,
					marginTop: 56,
				}}
			>
				<Reveal>
					<div
						style={{
							position: 'relative',
							aspectRatio: '3 / 4',
							borderRadius: 24,
							overflow: 'hidden',
						}}
					>
						<Image
							src={FrontRunImg}
							alt="11RUNCLUB Läufer:innen auf einem Feldweg bei Solothurn"
							fill
							sizes="(max-width: 900px) 100vw, 50vw"
							style={{ objectFit: 'cover' }}
						/>
					</div>
				</Reveal>
				<Reveal delay={100}>
					<div
						style={{
							position: 'relative',
							aspectRatio: '3 / 4',
							borderRadius: 24,
							overflow: 'hidden',
						}}
					>
						<Image
							src={RunLineImg}
							alt="11RUNCLUB Community beim gemeinsamen Aufwärmen an der Bahn"
							fill
							sizes="(max-width: 900px) 100vw, 50vw"
							style={{ objectFit: 'cover' }}
						/>
					</div>
				</Reveal>
			</div>
		</section>
	)
}

/* ─── FAQ ─────────────────────────────────────────────────────────────────────── */
const FAQ_ITEMS = [
	{
		q: 'Kostet die Teilnahme etwas?',
		a: 'Nein, die Teilnahme ist komplett kostenlos und offen für alle.',
	},
	{
		q: 'Wie schnell wird gelaufen?',
		a: 'Wir laufen während den Social Runs in zwei Gruppen. Eine 6km @6:00min/km und die andere 10km @5:30min/km. Niemand wird zurückgelassen!',
	},
	{
		q: 'Muss ich mich anmelden?',
		a: 'Nein, du kannst einfach spontan vorbeikommen.',
	},
	{
		q: 'Kann ich alleine kommen?',
		a: 'Ja, absolut! Der 11RUNCLUB ist genau dafür da, neue Leute kennenzulernen. Spätestens nach dem ersten Kilometer läufst du nicht mehr allein!',
	},
	{
		q: 'Ich bin komplett neu im Laufen — passt das für mich?',
		a: 'Unser Standard-Tempo bei den Social Runs liegt bei 6:00 min/km in der 6km-Gruppe. Wenn du bereits 5 bis 6 Kilometer am Stück ohne Pause joggen kannst (egal in welchem Tempo), bist du hier goldrichtig!',
	},
	{
		q: 'Ist jeder Dienstag ein lockerer Social Run?',
		a: 'Nein, wir wechseln ab! Unsere Dienstage rotieren wöchentlich, damit es nie langweilig wird: Social Run — eine Runde in Ausdauertempo, bei der das Community-Dasein im Vordergrund steht. Workout — Fokus auf Performance! Hier stehen Intervalle, Hill Reps (Bergläufe) oder Tempotraining auf dem Programm. Das Geniale: Da wir in Schleifen oder auf Zeit laufen, kann hier jeder auf seinem eigenen Level absolut alles geben.',
	},
	{
		q: 'Wie oft findet der Longrun statt?',
		a: 'Unsere längeren Community-Läufe am Wochenende finden einmal pro Monat (jeweils samstags) statt. Die perfekte Gelegenheit, um in der Gruppe ein paar mehr Kilometer zu sammeln und die Ausdauer auszubauen. Die genauen Termine und Distanzen kündigen wir immer rechtzeitig an.',
	},
	{
		q: 'Trackt ihr eure Läufe irgendwo?',
		a: 'Logisch, du findest uns auf Strava! Tritt einfach unserem offiziellen 11RUNCLUB Strava Club bei. Dort tracken wir nicht nur unsere Runs, sondern du siehst auch immer das Programm für die kommenden Wochen.',
	},
	{
		q: 'Wie bleibe ich auf dem Laufenden?',
		a: 'Am schnellsten erfährst du alles über Instagram und unseren WhatsApp-Community-Channel. Folge uns auf @11.runclub für die wöchentlichen Updates und komm in den WhatsApp-Chat, um keine Infos zu verpassen. Die Links dazu findest du direkt hier auf der Seite!',
	},
	{
		q: 'Was ist The Maze?',
		a: 'Unser eigenes Rennen mit Saucony: ein 4er-Staffel-Hillclimb in der ENTER Technikwelt Derendingen, am 25.09.2026. Alle Details dazu findest du auf der Event-Seite.',
	},
]

function FAQSection() {
	const [open, setOpen] = useState<number | null>(0)

	return (
		<section
			id="faq"
			style={{
				background: 'var(--black)',
				color: 'var(--chalk)',
				padding: 'clamp(70px,10vw,140px) clamp(20px,4vw,56px)',
			}}
		>
			<Reveal>
				<div className="kicker kicker--chalk">FAQ</div>
			</Reveal>
			<Reveal delay={60}>
				<h2
					style={{
						fontFamily: 'var(--font-anton)',
						fontSize: 'clamp(44px,7vw,104px)',
						lineHeight: 0.95,
						textTransform: 'uppercase',
						marginBottom: 40,
					}}
				>
					Fragen &amp;
					<br />
					Antworten.
				</h2>
			</Reveal>

			<div
				style={{
					maxWidth: 780,
					borderTop: '1.5px solid rgba(244,241,235,0.2)',
				}}
			>
				{FAQ_ITEMS.map((item, i) => {
					const isOpen = open === i
					return (
						<Reveal key={item.q} delay={i * 60}>
							<div
								style={{
									borderBottom:
										'1.5px solid rgba(244,241,235,0.2)',
								}}
							>
								<button
									onClick={() => setOpen(isOpen ? null : i)}
									style={{
										width: '100%',
										display: 'flex',
										justifyContent: 'space-between',
										alignItems: 'center',
										gap: 20,
										padding: '26px 4px',
										background: 'transparent',
										border: 'none',
										color: 'inherit',
										textAlign: 'left',
										cursor: 'pointer',
										fontFamily: 'var(--font-anton)',
										fontSize: 'clamp(20px,2.6vw,32px)',
										textTransform: 'uppercase',
										lineHeight: 1.1,
									}}
								>
									{item.q}
									<span
										aria-hidden="true"
										style={{
											fontSize: 28,
											flexShrink: 0,
											color: 'var(--red)',
											transition: 'transform 0.3s',
											transform: isOpen
												? 'rotate(45deg)'
												: 'none',
										}}
									>
										+
									</span>
								</button>
								<div
									style={{
										maxHeight: isOpen ? 360 : 0,
										overflow: 'hidden',
										transition: 'max-height 0.35s ease',
									}}
								>
									<p
										style={{
											padding: '0 4px 28px',
											fontFamily: 'var(--font-archivo)',
											fontSize: 16,
											lineHeight: 1.65,
											color: 'rgba(244,241,235,0.75)',
											maxWidth: 640,
										}}
									>
										{item.a}
									</p>
								</div>
							</div>
						</Reveal>
					)
				})}
			</div>
		</section>
	)
}

/* ─── Page ───────────────────────────────────────────────────────────────────── */
export default function HomePage() {
	return (
		<>
			{/* ── Hero ── */}
			<header
				style={{
					minHeight: 'calc(100svh - 110px)',
					padding: 'clamp(30px,5vh,70px) clamp(20px,4vw,56px) 60px',
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'flex-end',
					position: 'relative',
					overflow: 'hidden',
					color: 'var(--black)',
					background: 'var(--chalk)',
					zIndex: 0,
				}}
			>
				{/* Hero-Video folgt, sobald die komprimierte RunKanti.MOV bereitsteht:
				    <video autoPlay loop muted playsInline src="/RunKanti.MOV"
				      className="object-cover w-full h-full absolute inset-0 -z-20" /> */}
				<div
					style={{
						position: 'absolute',
						inset: 0,
						opacity: 0.5,
						zIndex: -2,
					}}
				>
					<Image
						src={SolothurnCityImg}
						alt=""
						fill
						sizes="100vw"
						priority
						style={{
							objectFit: 'cover',
							filter: 'grayscale(1) contrast(0.92) brightness(1.15)',
						}}
					/>
				</div>
				<HeroEleven />
				<div
					style={{
						fontFamily: 'var(--font-ibm-plex-mono)',
						fontSize: 13,
						letterSpacing: '0.18em',
						color: 'var(--black)',
						marginBottom: 22,
						display: 'flex',
						alignItems: 'center',
						gap: 14,
						flexWrap: 'wrap',
					}}
				>
					<span
						style={{
							width: 9,
							height: 9,
							borderRadius: '50%',
							background: 'var(--red)',
							animation: 'pulse 1.6s ease-out infinite',
							flexShrink: 0,
						}}
					/>
					<span></span>
					<span>SEIT 2025</span>
				</div>

				<h1
					style={{
						fontFamily: 'var(--font-anton)',
						fontSize: 'clamp(64px,12.5vw,196px)',
						lineHeight: 0.92,
						textTransform: 'uppercase',
						letterSpacing: '-0.005em',
						fontWeight: 400,
						maxWidth: '12ch',
						color: 'var(--black)',
					}}
				>
					Dein
					<br />
					<span
						style={{
							color: 'transparent',
							WebkitTextStroke: '2.5px var(--black)',
						}}
					>
						Runclub
					</span>{' '}
					in
					<br />
					<span style={{ color: 'var(--red)' }}>Solothurn.</span>
				</h1>

				<div
					style={{
						display: 'flex',
						alignItems: 'flex-end',
						justifyContent: 'space-between',
						gap: 30,
						marginTop: 42,
						flexWrap: 'wrap',
					}}
				>
					<div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
						<a
							href="https://tr.ee/wKzGb4-Rug"
							target="_blank"
							rel="noopener noreferrer"
							className="btn btn--solid"
						>
							WhatsApp beitreten
						</a>
						<a href="#next" className="btn btn--ghost">
							Nächster Run ↓
						</a>
					</div>
					<Countdown />
				</div>
			</header>

			{/* ── Next Run ── */}
			<section
				id="next"
				style={{
					background: 'var(--black)',
					color: 'var(--chalk)',
					padding: 'clamp(70px,10vw,140px) clamp(20px,4vw,56px)',
					position: 'relative',
					overflow: 'hidden',
				}}
			>
				<Reveal>
					<div className="kicker kicker--chalk">Next Run</div>
				</Reveal>
				<Reveal delay={60}>
					<h2
						style={{
							fontFamily: 'var(--font-anton)',
							fontSize: 'clamp(44px,7vw,104px)',
							lineHeight: 0.95,
							textTransform: 'uppercase',
						}}
					>
						Jeden Dienstag.
						<br />
						18:30. @SOL-ID.
					</h2>
				</Reveal>

				<div
					style={{
						display: 'grid',
						gridTemplateColumns: '1fr 1fr',
						gap: 'clamp(30px,5vw,80px)',
						alignItems: 'start',
						marginTop: 50,
					}}
				>
					<Reveal delay={100}>
						<RouteMap />
					</Reveal>

					<div>
						<Reveal delay={140}>
							<div
								style={{
									borderTop:
										'1px solid rgba(244,241,235,0.18)',
								}}
							>
								{[
									{ k: 'WANN', v: 'Di — 18:30' },
									{
										k: 'WO',
										v: 'SOL-ID',
										sub: 'Klosterplatz 6, 4500 Solothurn',
									},
									{ k: 'DISTANZ', v: '6 & 10 KM' },
									{ k: 'PACE', v: '6:00 & 5:30 MIN/KM' },
								].map(({ k, v, sub }) => (
									<div
										key={k}
										style={{
											display: 'flex',
											justifyContent: 'flex-start',
											alignItems: 'baseline',
											padding: '20px 4px',
											borderBottom:
												'1px solid rgba(244,241,235,0.18)',
											gap: 18,
										}}
									>
										<span
											style={{
												fontFamily:
													'var(--font-ibm-plex-mono)',
												fontSize: 15,
												letterSpacing: '0.2em',
												color: 'var(--ash)',
												flex: '0 0 100px',
											}}
										>
											{k}
										</span>
										<span
											style={{
												fontFamily: 'var(--font-anton)',
												fontSize:
													'clamp(24px,3.2vw,42px)',
												textTransform: 'uppercase',
												textAlign: 'left',
											}}
										>
											{v}
											{sub && (
												<small
													style={{
														fontFamily:
															'var(--font-archivo)',
														fontSize: 14,
														textTransform: 'none',
														color: 'var(--ash)',
														display: 'block',
														fontWeight: 400,
													}}
												>
													{sub}
												</small>
											)}
										</span>
									</div>
								))}
							</div>
						</Reveal>
						<Reveal delay={200}>
							<p
								style={{
									fontFamily: 'var(--font-ibm-plex-mono)',
									fontSize: 13,
									color: 'var(--coral)',
									marginTop: 22,
									letterSpacing: '0.04em',
								}}
							>
								→ Keine Anmeldung. Du kommst einfach vorbei.
							</p>
						</Reveal>
					</div>
				</div>
			</section>

			{/* ── Formats ── */}
			<section
				id="formats"
				style={{
					padding: 'clamp(70px,10vw,140px) clamp(20px,4vw,56px)',
				}}
			>
				<div
					style={{
						display: 'grid',
						gridTemplateColumns: '1.1fr 1fr',
						gap: 'clamp(30px,5vw,70px)',
						alignItems: 'start',
					}}
					className="formats-grid"
				>
					<div>
						<Reveal>
							<div className="kicker">Was wir machen</div>
						</Reveal>
						<Reveal delay={60}>
							<h2
								style={{
									fontFamily: 'var(--font-anton)',
									fontSize: 'clamp(44px,7vw,104px)',
									lineHeight: 0.95,
									textTransform: 'uppercase',
								}}
							>
								Mehr als nur
								<br />
								geradeaus laufen.
							</h2>
						</Reveal>
						<Reveal delay={120}>
							<p
								style={{
									maxWidth: 640,
									fontSize: 17,
									lineHeight: 1.6,
									color: '#444',
									marginTop: 24,
								}}
							>
								Dienstags wechseln sich lockerer Social Run und
								Workout ab — Hill Reps, Progression Run oder Out
								&amp; Back. Einmal im Monat kommt an einem
								Samstag der Longrun dazu.
							</p>
						</Reveal>

						<div style={{ marginTop: 56, maxWidth: 380 }}>
							<Reveal>
								<RunStack />
							</Reveal>
						</div>
					</div>

					<Reveal delay={100} className="formats-photo">
						<div
							style={{
								position: 'relative',
								width: '100%',
								height: '100%',
								minHeight: 420,
								borderRadius: 24,
								overflow: 'hidden',
							}}
						>
							<Image
								src={LandingHeroImg}
								alt="11RUNCLUB Läufer:innen auf einem Waldweg"
								fill
								sizes="(max-width: 900px) 100vw, 50vw"
								style={{ objectFit: 'cover' }}
							/>
						</div>
					</Reveal>
				</div>

				<style>{`
					@media (max-width: 900px) {
						.formats-grid { grid-template-columns: 1fr !important; }
						.formats-photo { display: none; }
					}
				`}</style>
			</section>

			{/* ── Pinned Event ── */}
			<PinnedEvent />

			{/* ── Join ── */}
			<section
				id="join"
				style={{
					padding: 'clamp(70px,10vw,140px) clamp(20px,4vw,56px)',
					textAlign: 'center',
					position: 'relative',
					overflow: 'hidden',
					zIndex: 0,
				}}
			>
				<div
					style={{
						position: 'absolute',
						inset: 0,
						opacity: 0.35,
						zIndex: -1,
					}}
				>
					<Image
						src={ShirtImg}
						alt="11RUNCLUB Shirt"
						fill
						sizes="100vw"
						style={{ objectFit: 'cover' }}
					/>
				</div>

				<Reveal>
					<div
						className="kicker"
						style={{ justifyContent: 'center' }}
					>
						Werde Teil davon
					</div>
				</Reveal>
				<Reveal delay={60}>
					<h2
						style={{
							fontFamily: 'var(--font-anton)',
							fontSize: 'clamp(44px,7vw,104px)',
							lineHeight: 0.95,
							textTransform: 'uppercase',
							marginBottom: 14,
						}}
					>
						Du und über
						<br />
						900 Läufer:innen.
					</h2>
				</Reveal>
				<Reveal delay={120}>
					<p
						style={{
							color: '#555',
							maxWidth: 520,
							margin: '18px auto 0',
							lineHeight: 1.6,
						}}
					>
						Alles Wichtige läuft über unsere WhatsApp-Community —
						Termine, Strecken, spontane Runs. Auf Strava sammeln wir
						die Kilometer.
					</p>
				</Reveal>

				<div
					style={{
						display: 'flex',
						gap: 16,
						justifyContent: 'center',
						flexWrap: 'wrap',
						marginTop: 46,
					}}
				>
					{[
						{
							nm: 'WhatsApp',
							ds: 'COMMUNITY BEITRETEN',
							href: 'https://tr.ee/wKzGb4-Rug',
						},
						{
							nm: 'Strava',
							ds: 'CLUB FOLGEN — KMS ZÄHLEN',
							href: 'https://www.strava.com/clubs/11RUNCLUB',
						},
						{
							nm: 'Instagram',
							ds: '@11.RUNCLUB — FOTOS & REELS',
							href: 'https://instagram.com/11.runclub',
						},
					].map(({ nm, ds, href }, i) => (
						<Reveal key={nm} delay={i * 80}>
							<a
								href={href}
								target="_blank"
								rel="noopener noreferrer"
								style={{
									textDecoration: 'none',
									minWidth: 230,
									border: '1.5px solid var(--black)',
									borderRadius: 18,
									padding: '26px 30px',
									color: 'var(--black)',
									textAlign: 'left',
									display: 'block',
									transition:
										'all 0.3s cubic-bezier(0.3,0,0.2,1)',
									position: 'relative',
									overflow: 'hidden',
								}}
								onMouseEnter={(e) => {
									const el =
										e.currentTarget as HTMLAnchorElement
									el.style.background = 'var(--black)'
									el.style.color = 'var(--chalk)'
									el.style.transform = 'translateY(-4px)'
								}}
								onMouseLeave={(e) => {
									const el =
										e.currentTarget as HTMLAnchorElement
									el.style.background = ''
									el.style.color = 'var(--black)'
									el.style.transform = ''
								}}
							>
								<div
									style={{
										fontFamily: 'var(--font-anton)',
										fontSize: 27,
										textTransform: 'uppercase',
									}}
								>
									{nm}
								</div>
								<div
									style={{
										fontFamily: 'var(--font-ibm-plex-mono)',
										fontSize: 11,
										letterSpacing: '0.15em',
										color: 'var(--ash)',
										marginTop: 6,
									}}
								>
									{ds}
								</div>
							</a>
						</Reveal>
					))}
				</div>
			</section>

			{/* ── Strava ── */}
			<StravaSection />

			{/* ── Slogan Marquee ── */}
			<SloganMarquee />

			{/* ── Impressionen ── */}
			<ImpressionenSection />

			{/* ── FAQ ── */}
			<FAQSection />

			<style>{`
        @keyframes pulse {
          0% { box-shadow: 0 0 0 0 rgba(238,56,41,0.55); }
          100% { box-shadow: 0 0 0 14px rgba(238,56,41,0); }
        }
        @media (max-width: 860px) {
          #next > div:last-child {
            grid-template-columns: 1fr !important;
          }
        }
        @media (max-width: 760px) {
          h1 { font-size: clamp(48px,17vw,96px) !important; }
        }
      `}</style>
		</>
	)
}
