'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import ShirtImg from '../reference/shirt.jpg'
import FrontRunImg from '../reference/frontrun.jpg'
import RunLineImg from '../reference/runline.jpg'

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
				COUNTDOWN — SOCIAL RUN
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
				<span>BEISPIEL-ROUTE — VERENASCHLUCHT-RUNDE</span>
				<span>±7.5 KM</span>
			</div>
			<svg
				viewBox="0 0 560 320"
				style={{ width: '100%', height: 'auto' }}
			>
				{/* Höhenlinien Jurahang */}
				<g
					fill="none"
					stroke="rgba(244,241,235,0.13)"
					strokeWidth="1.5"
				>
					<path d="M-10,150 C70,142 130,138 168,132 C180,128 188,112 194,100 C198,92 206,88 214,90 C222,92 228,104 234,116 C244,132 300,124 360,116 C430,108 500,104 570,100" />
					<path d="M-10,122 C70,114 130,110 164,104 C176,100 184,80 190,64 C194,52 204,48 212,50 C220,52 226,66 232,82 C240,98 300,94 360,86 C430,78 500,74 570,70" />
					<path d="M-10,94 C70,86 130,80 160,74 C172,70 180,46 186,30 C190,18 202,14 210,16 C218,18 224,34 230,52 C238,68 300,62 360,54 C430,46 500,42 570,38" />
				</g>
				{/* Aare */}
				<path
					d="M-10,268 C90,262 200,254 270,240 C310,230 345,213 380,180 C415,150 445,130 480,112"
					fill="none"
					stroke="rgba(30,59,209,0.45)"
					strokeWidth="20"
					strokeLinecap="round"
				/>
				{/* Route line */}
				<path
					className="route-line"
					d="M148,237 C160,240 172,243 185,245 C202,244 220,243 237,240 C255,237 272,231 290,222 C305,215 320,209 332,198 C340,191 347,186 351,178 C354,160 351,142 348,124 C344,110 334,101 322,93 C313,86 304,80 295,74 C281,66 267,60 253,54 C240,48 226,41 214,36 C212,44 213,51 211,59 C208,67 206,74 203,82 C201,89 198,96 196,104 C193,112 190,119 187,127 C177,140 166,153 155,166 C146,176 137,185 130,194 C128,203 130,211 132,220 C136,227 141,232 148,237 Z"
				/>
				{/* Richtungspfeile */}
				<g fill="#EE3829">
					<path
						d="M0,-4.5 L8,0 L0,4.5"
						transform="translate(264,232) rotate(-19)"
					/>
					<path
						d="M0,-4.5 L8,0 L0,4.5"
						transform="translate(350,158) rotate(-93)"
					/>
					<path
						d="M0,-4.5 L8,0 L0,4.5"
						transform="translate(199,93) rotate(108)"
					/>
					<path
						d="M0,-4.5 L8,0 L0,4.5"
						transform="translate(131,207) rotate(85)"
					/>
				</g>
				{/* Start/Ziel */}
				<circle
					cx="148"
					cy="237"
					r="9"
					fill="none"
					stroke="#EE3829"
					strokeWidth="2"
				/>
				<circle cx="148" cy="237" r="4.5" fill="#EE3829" />
				{/* Läufer-Punkt */}
				<circle r="5" fill="#F4F1EB" stroke="#EE3829" strokeWidth="3">
					<animateMotion
						dur="18s"
						repeatCount="indefinite"
						begin="2.5s"
						path="M148,237 C160,240 172,243 185,245 C202,244 220,243 237,240 C255,237 272,231 290,222 C305,215 320,209 332,198 C340,191 347,186 351,178 C354,160 351,142 348,124 C344,110 334,101 322,93 C313,86 304,80 295,74 C281,66 267,60 253,54 C240,48 226,41 214,36 C212,44 213,51 211,59 C208,67 206,74 203,82 C201,89 198,96 196,104 C193,112 190,119 187,127 C177,140 166,153 155,166 C146,176 137,185 130,194 C128,203 130,211 132,220 C136,227 141,232 148,237 Z"
					/>
				</circle>
			</svg>
			<p
				style={{
					fontFamily: 'var(--font-ibm-plex-mono)',
					fontSize: 12,
					letterSpacing: '0.14em',
					color: 'var(--coral)',
					marginTop: 10,
				}}
			>
				→ Beispielroute: Aare · Feldbrunnen · St. Niklaus ·
				Verenaschlucht · Steingruben. Die echte Strecke gibts am Start.
			</p>
			<div
				className="checker"
				style={{ position: 'absolute', bottom: 20, right: 22 }}
			/>
			<style>{`
        .route-line {
          fill: none; stroke: #EE3829; stroke-width: 3.5;
          stroke-linecap: round; stroke-linejoin: round;
          stroke-dasharray: 1050; stroke-dashoffset: 1050;
          transition: stroke-dashoffset 2.4s cubic-bezier(.45,0,.2,1) .3s;
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
				WebkitTextStroke: '1.5px rgba(244,241,235,0.16)',
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
const SOCIAL_CARDS = [
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
]

function RunStack() {
	const [index, setIndex] = useState(0)
	const startX = useRef<number | null>(null)

	const next = () => setIndex((i) => (i + 1) % SOCIAL_CARDS.length)
	const prev = () =>
		setIndex((i) => (i - 1 + SOCIAL_CARDS.length) % SOCIAL_CARDS.length)

	const onPointerDown = (e: React.PointerEvent) => {
		startX.current = e.clientX
	}
	const onPointerUp = (e: React.PointerEvent) => {
		if (startX.current === null) return
		const dx = e.clientX - startX.current
		if (dx < -36) next()
		else if (dx > 36) prev()
		startX.current = null
	}

	return (
		<div>
			<div
				style={{
					position: 'relative',
					aspectRatio: '3 / 4.1',
					userSelect: 'none',
					touchAction: 'pan-y',
				}}
				onPointerDown={onPointerDown}
				onPointerUp={onPointerUp}
			>
				{SOCIAL_CARDS.map((c, i) => {
					const rel =
						(i - index + SOCIAL_CARDS.length) % SOCIAL_CARDS.length
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
								zIndex: SOCIAL_CARDS.length - rel,
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
					{SOCIAL_CARDS.map((c, i) => (
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
]

function FAQSection() {
	const [open, setOpen] = useState<number | null>(0)

	return (
		<section
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
										maxHeight: isOpen ? 240 : 0,
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
					color: 'var(--chalk)',
					background: 'var(--chalk)',
				}}
			>
				{/* Hero-Video folgt, sobald die komprimierte RunKanti.MOV bereitsteht:
				    <video autoPlay loop muted playsInline src="/RunKanti.MOV"
				      className="object-cover w-full h-full absolute inset-0 -z-20" />
				    <div aria-hidden="true" className="absolute inset-0 -z-10"
				      style={{ background: 'rgba(13,12,11,0.55)' }} /> */}
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
					<span>SOLOTHURN</span>
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
					}}
				>
					Dein
					<br />
					<span
						style={{
							color: 'var(--grey)',
							WebkitTextStroke: '2.5px var(--chalk)',
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
						<a href="#next" className="btn btn--chalk">
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
						gridTemplateColumns:
							'clamp(1fr,1.1fr,1fr) clamp(1fr,.9fr,1fr)',
						gap: 'clamp(30px,5vw,80px)',
						alignItems: 'center',
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
									{ k: 'PACE', v: '6:00 oder 5:30 MIN/KM' },
								].map(({ k, v, sub }) => (
									<div
										key={k}
										style={{
											display: 'flex',
											justifyContent: 'space-between',
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
												textAlign: 'right',
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
						Dienstags wechseln sich lockerer Social Run und Workout
						ab — Hill Reps, Progression Run oder Out &amp; Back.
						Einmal im Monat kommt an einem Samstag der Longrun dazu.
					</p>
				</Reveal>

				<div
					style={{
						display: 'grid',
						gridTemplateColumns:
							'repeat(auto-fit, minmax(260px, 1fr))',
						gap: 16,
						marginTop: 56,
						maxWidth: 620,
					}}
				>
					<Reveal>
						<RunStack />
					</Reveal>

					<Reveal delay={60}>
						<div
							className="run-card"
							style={{
								background: 'var(--black)',
								color: 'var(--chalk)',
								aspectRatio: '3 / 4.1',
								borderRadius: 16,
								padding: 22,
								display: 'flex',
								flexDirection: 'column',
								justifyContent: 'space-between',
								position: 'relative',
								overflow: 'hidden',
								cursor: 'default',
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
								1× IM MONAT
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
									Longrun
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
									SA · 09:30 · 10 ODER 15 KM
								</div>
							</div>
						</div>
					</Reveal>
				</div>
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
				}}
			>
				<div
					className="hidden md:block"
					style={{
						position: 'absolute',
						top: '8%',
						right: '7%',
						width: 150,
						aspectRatio: '3 / 4',
						borderRadius: 16,
						overflow: 'hidden',
						transform: 'rotate(6deg)',
						boxShadow: '0 20px 40px rgba(13,12,11,0.25)',
					}}
				>
					<Image
						src={ShirtImg}
						alt="11RUNCLUB Shirt"
						fill
						sizes="150px"
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
							ds: 'COMMUNITY BEITRETEN — GRATIS',
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
