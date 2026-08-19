'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import EnterBuildingImg from '../../reference/enter-building-cc-by-sa.jpg'

const TICKET_URL =
	'https://eventfrog.ch/de/p/sport-fitness/sonstige-veranstaltungen/dirty-laps-by-11runclub-7492980719297253257.html'
const MAPS_URL =
	'https://www.google.com/maps/search/?api=1&query=Gewerbestrasse+4%2C+4552+Derendingen'

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
			{ threshold: 0.12 },
		)
		io.observe(el)
		return () => io.disconnect()
	}, [])

	return (
		<div
			ref={ref}
			className="reveal"
			style={{ transitionDelay: `${delay}ms`, ...style }}
		>
			{children}
		</div>
	)
}

function Countdown() {
	const [time, setTime] = useState({ d: '--', h: '--', m: '--', s: '--' })

	useEffect(() => {
		const target = new Date('2026-09-25T18:30:00')
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

const RACE_FACTS = [
	{ k: 'DATUM', v: 'Freitag, 25.09.2026' },
	{ k: 'BEGINN', v: '18:30 Uhr' },
	{
		k: 'ORT',
		v: 'Enter Technikwelt Solothurn',
		sub: 'Gewerbestrasse 4, 4552 Derendingen',
	},
	{ k: 'FORMAT', v: '4×400m-Staffel', sub: 'Teams à 4 Personen' },
	{
		k: 'MODUS',
		v: 'K.O.-Turnier',
		sub: 'Immer 5 Teams gleichzeitig — Sieger kommen weiter',
	},
	{ k: 'TEAMS', v: 'Max. 30 Teams', sub: '120 Läufer:innen' },
	{ k: 'PREIS', v: 'CHF 20.–/Person', sub: 'Team-Ticket à 4: CHF 80.–' },
]

const ABLAUF_STEPS = [
	{
		n: '01',
		t: 'Qualifikation',
		d: 'Alle 30 Teams treten in Fünfer-Gruppen gegeneinander an — rauf aufs Parkdeck und wieder runter. Immer 5 Teams gleichzeitig, die Sieger jeder Runde kommen weiter.',
	},
	{
		n: '02',
		t: 'Viertelfinal',
		d: 'Die schnellsten Teams aus der Quali treffen wieder in 5er-Gruppen aufeinander. Das Feld wird kleiner, das Tempo höher.',
	},
	{
		n: '03',
		t: 'Halbfinal',
		d: 'Nur noch die stärksten Teams sind übrig. Wer hier gewinnt, steht im grossen Final.',
	},
	{
		n: '04',
		t: 'Final',
		d: 'Die letzten 5 von ursprünglich 30 Teams kämpfen um den Sieg — mit Sonnenuntergang über Derendingen als Kulisse.',
	},
]

const NEBEN_DER_STRECKE = [
	{ k: 'MUSIK', v: 'DJ-Set den ganzen Abend' },
	{ k: 'GETRÄNKE', v: 'PEAQ Hydration — im Ticket inbegriffen' },
	{ k: 'ESSEN', v: 'Vor Ort im Enter, kein Mindestkonsum' },
	{ k: 'TESTING', v: 'Laufschuh-Testing mit Saucony' },
	{ k: 'AUSSICHT', v: 'Zuschauer-Deck auf dem Dach — Sonnenuntergang beim Final' },
	{ k: 'STARTNUMMER', v: 'Personalisiert, für jede:n Läufer:in' },
	{
		k: 'SIEGEREHRUNG',
		v: 'Mit Preisen von Saucony, PEAQ und SOL-ID',
	},
]

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
					<g
						fill="none"
						stroke="#EE3829"
						strokeWidth="3"
						strokeLinecap="round"
					>
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
						<path
							d="M0,-5 L10,0 L0,5"
							transform="translate(540,80) rotate(0)"
						/>
						<path
							d="M0,-5 L10,0 L0,5"
							transform="translate(60,170) rotate(180)"
						/>
						<path
							d="M0,-5 L10,0 L0,5"
							transform="translate(540,260) rotate(0)"
						/>
						<path
							d="M0,-5 L10,0 L0,5"
							transform="translate(60,350) rotate(180)"
						/>
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
							TICKETS LIVE — UNSER RENNEN
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
							<span style={{ color: 'var(--red)' }}>Dirty</span>
							<br />
							<span
								style={{
									color: 'transparent',
									WebkitTextStroke: '2px var(--chalk)',
								}}
							>
								Laps
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
							BY 11RUNCLUB
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
							FR 25.09.2026 · ENTER TECHNIKWELT, DERENDINGEN
							<br />
							4×400M-STAFFEL · TEAMS À 4 · K.O.-TURNIER
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
								STATUS — TICKETS
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
								CHF 20.–/Person
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
								Team-Ticket à 4 Plätze: CHF 80.–. Limitiert auf 30
								Teams — sicher dir deins.
							</p>
							<a
								href={TICKET_URL}
								target="_blank"
								rel="noopener noreferrer"
								className="btn btn--solid"
								style={{ marginTop: 20, display: 'inline-block' }}
							>
								Tickets sichern →
							</a>
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
							4×400m-Staffel.
							<br />
							<span
								style={{
									color: 'transparent',
									WebkitTextStroke: '2px var(--chalk)',
								}}
							>
								Run the Ramp.
							</span>
						</h2>
					</Reveal>

					<div
						style={{
							display: 'grid',
							gridTemplateColumns:
								'repeat(auto-fit, minmax(200px, 1fr))',
							gap: 20,
							marginBottom: 48,
						}}
					>
						{[
							{ k: 'TEAMS', v: '30' },
							{ k: 'LÄUFER:INNEN', v: '120' },
							{ k: 'STAFFEL', v: '4×400M' },
							{ k: 'TICKET', v: 'CHF 20' },
						].map(({ k, v }, i) => (
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
											fontFamily:
												'var(--font-ibm-plex-mono)',
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
								marginBottom: 44,
							}}
						>
							Vier Läufer:innen, ein Team, eine Staffel. Rauf aufs
							Parkdeck der ENTER Technikwelt Derendingen und wieder
							runter — so schnell es geht, so oft es dein Team
							schafft. Klassisches K.O.-Format: Immer 5 Teams
							gleichzeitig auf der Rampe, die Sieger jeder Runde
							kommen weiter. Von der Qualifikation bis zum Final vor
							Sonnenuntergang.
						</p>
					</Reveal>

					<Reveal delay={320}>
						<div
							style={{
								maxWidth: 640,
								borderTop: '1.5px solid rgba(244,241,235,0.3)',
								fontFamily: 'var(--font-ibm-plex-mono)',
								fontSize: 13,
								letterSpacing: '0.04em',
							}}
						>
							{RACE_FACTS.map(({ k, v, sub }) => (
								<div
									key={k}
									style={{
										display: 'flex',
										gap: 18,
										padding: '16px 2px',
										borderBottom:
											'1.5px solid rgba(244,241,235,0.3)',
									}}
								>
									<span
										style={{
											color: 'rgba(244,241,235,0.65)',
											flex: '0 0 110px',
											flexShrink: 0,
										}}
									>
										{k}
									</span>
									<span
										style={{
											fontFamily: 'var(--font-archivo)',
											letterSpacing: 'normal',
										}}
									>
										{v}
										{sub && (
											<span
												style={{
													display: 'block',
													color: 'rgba(244,241,235,0.6)',
													fontSize: 12,
													marginTop: 3,
												}}
											>
												{sub}
											</span>
										)}
									</span>
								</div>
							))}
						</div>
					</Reveal>
				</div>
			</section>

			{/* ── Ablauf ── */}
			<section
				style={{
					background: 'var(--chalk)',
					padding: 'clamp(70px,10vw,130px) clamp(20px,4vw,56px)',
				}}
			>
				<Reveal>
					<div className="kicker">Ablauf</div>
				</Reveal>
				<Reveal delay={60}>
					<h2
						style={{
							fontFamily: 'var(--font-anton)',
							fontSize: 'clamp(44px,7vw,100px)',
							lineHeight: 0.95,
							textTransform: 'uppercase',
							marginBottom: 20,
						}}
					>
						K.O.-Turnier.
						<br />
						Vier Runden.
					</h2>
				</Reveal>
				<Reveal delay={100}>
					<p
						style={{
							fontFamily: 'var(--font-ibm-plex-mono)',
							fontSize: 13,
							letterSpacing: '0.05em',
							color: 'var(--red)',
							maxWidth: 560,
							marginBottom: 56,
							lineHeight: 1.7,
						}}
					>
						→ Immer 5 Teams gleichzeitig auf der Rampe — die Sieger
						jeder Runde qualifizieren sich für die nächste.
					</p>
				</Reveal>

				<div
					style={{
						display: 'grid',
						gridTemplateColumns:
							'repeat(auto-fit, minmax(240px, 1fr))',
						gap: 'clamp(20px,3vw,36px)',
					}}
				>
					{ABLAUF_STEPS.map(({ n, t, d }, i) => (
						<Reveal key={n} delay={i * 80}>
							<div
								style={{
									borderTop: '2px solid var(--black)',
									paddingTop: 20,
								}}
							>
								<div
									style={{
										fontFamily: 'var(--font-ibm-plex-mono)',
										fontSize: 13,
										letterSpacing: '0.14em',
										color: 'var(--ash)',
										marginBottom: 14,
									}}
								>
									{n}
								</div>
								<h3
									style={{
										fontFamily: 'var(--font-anton)',
										fontSize: 'clamp(22px,2.4vw,30px)',
										textTransform: 'uppercase',
										lineHeight: 1.05,
										marginBottom: 12,
									}}
								>
									{t}
								</h3>
								<p
									style={{
										fontSize: 14.5,
										lineHeight: 1.6,
										color: '#444',
										fontFamily: 'var(--font-archivo)',
									}}
								>
									{d}
								</p>
							</div>
						</Reveal>
					))}
				</div>
			</section>

			{/* ── Der Plan ── */}
			<section
				style={{
					background: 'var(--black)',
					color: 'var(--chalk)',
					padding: 'clamp(50px,7vh,90px) clamp(20px,4vw,56px)',
				}}
			>
				<div
					style={{
						display: 'flex',
						flexWrap: 'wrap',
						alignItems: 'center',
						gap: 'clamp(24px,4vw,70px)',
					}}
				>
					<div
						style={{
							flex: '0 0 auto',
							width: 'clamp(260px,30vw,430px)',
						}}
					>
						<Reveal>
							<div className="kicker kicker--chalk">Der Plan</div>
						</Reveal>
						<Reveal delay={60}>
							<h2
								style={{
									fontFamily: 'var(--font-anton)',
									fontSize: 'clamp(30px,4.5vw,64px)',
									lineHeight: 0.95,
									textTransform: 'uppercase',
								}}
							>
								So kommst du
								<br />
								<span
									style={{
										color: 'transparent',
										WebkitTextStroke: '2px var(--chalk)',
									}}
								>
									Run the Ramp.
								</span>
							</h2>
						</Reveal>
						<Reveal delay={120}>
							<div
								style={{
									marginTop: 34,
									borderTop:
										'1.5px solid rgba(244,241,235,0.18)',
									fontFamily: 'var(--font-ibm-plex-mono)',
									fontSize: 12,
									letterSpacing: '0.14em',
								}}
							>
								{[
									{
										k: 'OBJEKT',
										v: 'ENTER TECHNIKWELT, DERENDINGEN',
									},
									{
										k: 'ZUGANG',
										v: 'RAMPE — AUSSEN UMLAUFEND',
									},
									{ k: 'ZIEL', v: 'PARKDECK, ZUOBERST' },
									{
										k: 'EXIT',
										v: 'GLEICHE RAMPE RUNTER. ABKLATSCHEN.',
									},
								].map(({ k, v }) => (
									<div
										key={k}
										style={{
											display: 'flex',
											gap: 18,
											padding: '12px 2px',
											borderBottom:
												'1.5px solid rgba(244,241,235,0.18)',
										}}
									>
										<span
											style={{
												color: 'var(--ash)',
												flex: '0 0 72px',
											}}
										>
											{k}
										</span>
										<span>{v}</span>
									</div>
								))}
							</div>
						</Reveal>
					</div>

					<div
						style={{
							flex: 1,
							minWidth: 280,
							position: 'relative',
						}}
					>
						<div
							style={{
								position: 'relative',
								width: '100%',
								aspectRatio: '5076 / 2258',
								borderRadius: 16,
								overflow: 'hidden',
							}}
						>
							<Image
								src={EnterBuildingImg}
								alt="ENTER Technikwelt Derendingen — Aussenansicht mit umlaufender Rampe"
								fill
								sizes="(max-width: 860px) 100vw, 700px"
								style={{ objectFit: 'cover' }}
							/>
						</div>
						<div
							style={{
								fontFamily: 'var(--font-ibm-plex-mono)',
								fontSize: 10,
								letterSpacing: '0.1em',
								color: 'var(--ash)',
								marginTop: 8,
							}}
						>
							Foto: 1rhb, CC BY-SA 4.0, Wikimedia Commons
						</div>
					</div>
				</div>
			</section>

			{/* ── Neben der Strecke ── */}
			<section
				style={{
					background: 'var(--chalk)',
					padding: 'clamp(70px,10vw,130px) clamp(20px,4vw,56px)',
				}}
			>
				<Reveal>
					<div className="kicker">Neben der Strecke</div>
				</Reveal>
				<Reveal delay={60}>
					<h2
						style={{
							fontFamily: 'var(--font-anton)',
							fontSize: 'clamp(44px,7vw,100px)',
							lineHeight: 0.95,
							textTransform: 'uppercase',
							marginBottom: 48,
						}}
					>
						Mehr als
						<br />
						nur Rennen.
					</h2>
				</Reveal>

				<div
					style={{
						maxWidth: 720,
						borderTop: '1.5px solid rgba(13,12,11,0.15)',
						fontFamily: 'var(--font-ibm-plex-mono)',
						fontSize: 13,
						letterSpacing: '0.04em',
					}}
				>
					{NEBEN_DER_STRECKE.map(({ k, v }, i) => (
						<Reveal key={k} delay={i * 40}>
							<div
								style={{
									display: 'flex',
									gap: 18,
									padding: '18px 2px',
									borderBottom:
										'1.5px solid rgba(13,12,11,0.15)',
								}}
							>
								<span
									style={{
										color: 'var(--ash)',
										flex: '0 0 130px',
										flexShrink: 0,
									}}
								>
									{k}
								</span>
								<span
									style={{
										fontFamily: 'var(--font-archivo)',
										letterSpacing: 'normal',
										fontSize: 15,
									}}
								>
									{v}
								</span>
							</div>
						</Reveal>
					))}
				</div>
			</section>

			{/* ── Location ── */}
			<section
				style={{
					background: 'var(--black)',
					color: 'var(--chalk)',
					padding: 'clamp(70px,10vw,130px) clamp(20px,4vw,56px)',
				}}
			>
				<Reveal>
					<div className="kicker kicker--chalk">Location</div>
				</Reveal>
				<Reveal delay={60}>
					<h2
						style={{
							fontFamily: 'var(--font-anton)',
							fontSize: 'clamp(36px,5.5vw,80px)',
							lineHeight: 0.95,
							textTransform: 'uppercase',
							marginBottom: 24,
						}}
					>
						Enter Technikwelt
						<br />
						Derendingen.
					</h2>
				</Reveal>
				<Reveal delay={120}>
					<p
						style={{
							fontFamily: 'var(--font-ibm-plex-mono)',
							fontSize: 15,
							letterSpacing: '0.05em',
							color: 'rgba(244,241,235,0.75)',
							marginBottom: 28,
						}}
					>
						Gewerbestrasse 4, 4552 Derendingen
					</p>
				</Reveal>
				<Reveal delay={160}>
					<a
						href={MAPS_URL}
						target="_blank"
						rel="noopener noreferrer"
						className="btn btn--chalk"
					>
						In Google Maps öffnen →
					</a>
				</Reveal>
			</section>

			{/* ── Ticket CTA ── */}
			<section
				style={{
					background: 'var(--red)',
					color: 'var(--chalk)',
					padding: 'clamp(70px,10vw,130px) clamp(20px,4vw,56px)',
					textAlign: 'center',
				}}
			>
				<Reveal>
					<div
						className="kicker kicker--chalk"
						style={{ justifyContent: 'center' }}
					>
						Sichere dir dein Ticket
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
						CHF 20.–
						<br />
						Pro Person.
					</h2>
				</Reveal>
				<Reveal delay={140}>
					<p
						style={{
							fontSize: 17,
							color: 'rgba(244,241,235,0.85)',
							maxWidth: 480,
							margin: '0 auto 40px',
							lineHeight: 1.65,
							fontFamily: 'var(--font-archivo)',
						}}
					>
						Team-Ticket à 4 Plätze: CHF 80.–. Limitiert auf 30 Teams
						— schnapp dir deinen Platz auf der Rampe.
					</p>
				</Reveal>
				<Reveal delay={200}>
					<div
						style={{
							display: 'flex',
							gap: 16,
							justifyContent: 'center',
							flexWrap: 'wrap',
						}}
					>
						<a
							href={TICKET_URL}
							target="_blank"
							rel="noopener noreferrer"
							className="btn btn--chalk"
						>
							Tickets sichern →
						</a>
						<a
							href="https://instagram.com/11.runclub"
							target="_blank"
							rel="noopener noreferrer"
							className="btn btn--chalk"
						>
							Instagram folgen →
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
								color: 'rgba(244,241,235,0.7)',
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
