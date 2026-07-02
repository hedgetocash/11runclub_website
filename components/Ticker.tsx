'use client'

import { useEffect, useRef, Fragment } from 'react'

const TICKER_ITEMS = [
  'NÄCHSTER RUN — DIENSTAG 18:30',
  'TREFFPUNKT: SOL-ID, KLOSTERPLATZ 6, 4500 SOLOTHURN',
  'KEINE ANMELDUNG NÖTIG',
  'ENTER HILLCLIMB — 25.09.2026 — SAVE THE DATE',
  'ALLE LEVELS WILLKOMMEN',
  'HYDRATED BY PEAQ HYDRATION',
]

export default function Ticker() {
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (trackRef.current) {
      trackRef.current.innerHTML += trackRef.current.innerHTML
    }
  }, [])

  return (
    <div className="ticker" aria-hidden="true">
      <div className="ticker__track" ref={trackRef}>
        {TICKER_ITEMS.map((item, i) => (
          <Fragment key={i}>
            <span>{item}</span>
            <span className="dot">●</span>
          </Fragment>
        ))}
      </div>
    </div>
  )
}
