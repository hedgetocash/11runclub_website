'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import SolidImg from '../../reference/partner-solid.jpg'
import PeaqImg from '../../reference/partner-peaq.jpg'
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
	valSize = 'clamp(40px,6vw,80px)',
}: {
	val: string
	label: string
	sub?: string
	accent?: string
	valSize?: string
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
					fontSize: valSize,
					lineHeight: 1,
					color: accent,
					overflowWrap: 'anywhere',
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

/* ─── Page ───────────────────────────────────────────────────────────────────── */
export default function PartnerPage() {
	return (
		<>
			{/* ── Hero ── */}
			<section
				style={{
					background: 'var(--black)',
					color: 'var(--chalk)',
					padding:
						'clamp(80px,12vw,160px) clamp(20px,4vw,56px) clamp(60px,8vw,120px)',
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
						<div className="kicker kicker--chalk">
							B2B Sponsoring & Partnerschaften
						</div>
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
							Werde Teil
							<br />
							<span style={{ color: 'var(--red)' }}>unserer</span>
							<br />
							<span
								style={{
									color: 'transparent',
									WebkitTextStroke: '2px var(--chalk)',
								}}
							>
								Community
							</span>
							<span
								style={{
									display: 'block',
									fontFamily: 'var(--font-ibm-plex-mono)',
									fontSize: 'clamp(16px,2vw,22px)',
									letterSpacing: '0.14em',
									textTransform: 'uppercase',
									color: 'var(--chalk)',
									marginTop: 16,
								}}
							>
								— als Partner
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
							Der 11RUNCLUB ist Solothurns aktivste Laufcommunity.
							Über 900 engagierte Läufer:innen auf Instagram, 250+
							Personen in unserer WhatsApp-Community — real,
							lokal, wöchentlich aktiv.
						</p>
					</Reveal>
					<Reveal delay={220}>
						<div
							style={{
								display: 'flex',
								gap: 16,
								flexWrap: 'wrap',
							}}
						>
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
						gridTemplateColumns:
							'repeat(auto-fit, minmax(160px, 1fr))',
						overflow: 'hidden',
					}}
				>
					<Reveal>
						<StatBlock
							val="900+"
							label="INSTAGRAM FOLLOWER"
							sub="@11.runclub"
							accent="var(--red)"
						/>
					</Reveal>
					<Reveal delay={60}>
						<StatBlock
							val="250+"
							label="WHATSAPP MEMBERS"
							sub="Aktive Community"
							accent="var(--chalk)"
						/>
					</Reveal>
					<Reveal delay={120}>
						<StatBlock
							val="52×"
							label="RUNS PRO JAHR"
							sub="Jeden Dienstag"
							accent="var(--coral)"
						/>
					</Reveal>
					<Reveal delay={180}>
						<StatBlock
							val="Solothurn"
							valSize="clamp(24px,3.6vw,44px)"
							label="STANDORT"
							sub="Lokal & regional"
							accent="var(--ash)"
						/>
					</Reveal>
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
						gridTemplateColumns:
							'repeat(auto-fit, minmax(260px, 1fr))',
						gap: 20,
					}}
				>
					{[
						{
							name: 'SOL-ID Athletes World',
							role: 'Treffpunkt & Supporter',
							desc: 'Unser Treffpunkt. Das SOL-ID am Klosterplatz 6 ist Start und Ziel jedes Runs.',
							tag: 'HAUPTPARTNER',
							color: 'var(--red)',
							img: SolidImg,
						},
						{
							name: 'PEAQ Hydration',
							role: 'Official Hydration Partner',
							desc: 'Hydrated by PEAQ Hydration. Unsere Läufer:innen werden mit PEAQ Hydration Getränken versorgt.',
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
								<div
									style={{
										position: 'relative',
										aspectRatio: '4 / 5',
									}}
								>
									<Image
										src={img}
										alt={`${name} × 11RUNCLUB`}
										fill
										sizes="(max-width: 640px) 100vw, 400px"
										style={{ objectFit: 'cover' }}
									/>
								</div>
								<div
									style={{
										padding: 'clamp(24px,3vw,36px)',
										position: 'relative',
									}}
								>
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
											fontFamily:
												'var(--font-ibm-plex-mono)',
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
											fontFamily:
												'var(--font-ibm-plex-mono)',
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
					<p
						style={{
							maxWidth: 560,
							fontSize: 15,
							lineHeight: 1.65,
							color: '#555',
							marginBottom: 40,
						}}
					>
						Café Filandia und Steiner Backtradition haben unsere
						Longruns mit frischem Gebäck begleitet — für die tolle
						einmalige Zusammenarbeit sagen wir danke.
					</p>
				</Reveal>

				<div
					style={{
						display: 'grid',
						gridTemplateColumns:
							'repeat(auto-fit, minmax(220px, 1fr))',
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
								<div
									style={{
										position: 'relative',
										aspectRatio: '9 / 16',
									}}
								>
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
						<div
							className="kicker"
							style={{ justifyContent: 'center' }}
						>
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
							Reach out über Instagram oder per Mail. Wir melden
							uns innerhalb weniger Stunden. Kein Pitch-Deck nötig
							— einfach schreiben.
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
							<div
								style={{
									color: 'var(--red)',
									fontSize: 11,
									marginBottom: 12,
								}}
							>
								QUICK FACTS — FÜR DEINE ANFRAGE
							</div>
							<div style={{ color: 'rgba(244,241,235,0.7)' }}>
								📍 Solothurn, Schweiz
								<br />
								📅 52 Social Runs/Jahr + Spezial-Events
								<br />
								👥 900+ Insta · 250+ WhatsApp
								<br />
								🎯 Zielgruppe: Sportbegeisterte, 18–45 Jahre
							</div>
						</div>
					</Reveal>
				</div>
			</section>
		</>
	)
}
