import React, { useEffect, useState } from 'react'
import { ArrowLeftRight } from 'lucide-react'

const TYPE_META = {
  SWAP:     { label: 'Swap',     color: '#2de8c8' },
  TRANSFER: { label: 'Transfer', color: '#7c6eff' },
  NFT_SALE: { label: 'NFT Sale', color: '#f5a623' },
  NFT_MINT: { label: 'NFT Mint', color: '#f59e0b' },
  STAKE:    { label: 'Stake',    color: '#5eead4' },
  UNSTAKE:  { label: 'Unstake',  color: '#a78bfa' },
}

function getTypeMeta(key) {
  return TYPE_META[key?.toUpperCase()] || { label: key, color: '#6b7fa3' }
}

const polarToCartesian = (cx, cy, r, angleDeg) => {
  const rad = (angleDeg * Math.PI) / 180
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) }
}

const describeArc = (cx, cy, r, startDeg, endDeg, gap = 3) => {
  const s = polarToCartesian(cx, cy, r, startDeg + gap / 2)
  const e = polarToCartesian(cx, cy, r, endDeg - gap / 2)
  const large = endDeg - startDeg - gap > 180 ? 1 : 0
  return `M ${s.x} ${s.y} A ${r} ${r} 0 ${large} 1 ${e.x} ${e.y}`
}

export default function TxTypesCard({ txTypes, delay = 0 }) {
  const [animated, setAnimated] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setAnimated(true), delay * 1000 + 200)
    return () => clearTimeout(t)
  }, [delay])

  if (!txTypes || Object.keys(txTypes).length === 0) return null

  const total = Object.values(txTypes).reduce((a, b) => a + b, 0)
  const segments = Object.entries(txTypes)
    .sort(([, a], [, b]) => b - a)
    .map(([key, count]) => ({ key, count, pct: Math.round((count / total) * 100), ...getTypeMeta(key) }))

  const R = 38, CX = 50, CY = 50, STROKE = 11
  let cumDeg = -90
  const arcs = segments.map((seg) => {
    const deg = (seg.pct / 100) * 360
    const startDeg = cumDeg
    cumDeg += deg
    return { ...seg, startDeg, deg }
  })

  return (
    <div className="glass rounded-2xl p-6 animate-fade-up" style={{ animationDelay: `${delay}s` }}>
      <div className="flex items-center gap-2.5 mb-5">
        <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: 'rgba(45,232,200,0.1)', border: '1px solid rgba(45,232,200,0.2)' }}>
          <ArrowLeftRight size={14} style={{ color: '#2de8c8' }} />
        </div>
        <div>
          <h3 className="font-display font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>Transaction Types</h3>
          <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{total.toLocaleString()} total transactions</p>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="relative flex-shrink-0 w-28 h-28">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <circle cx={CX} cy={CY} r={R} fill="none" stroke="rgba(26,37,64,0.9)" strokeWidth={STROKE} />
            {arcs.map((arc, i) => (
              <path key={arc.key}
                d={describeArc(CX, CY, R, arc.startDeg, arc.startDeg + arc.deg)}
                fill="none" stroke={arc.color} strokeWidth={STROKE} strokeLinecap="round"
                style={{ opacity: animated ? 1 : 0, transition: `opacity 0.4s ease ${i * 0.1}s` }} />
            ))}
            <text x={CX} y={CY - 4} textAnchor="middle"
              style={{ fill: 'var(--text-primary)', fontSize: '12px', fontFamily: 'Syne, sans-serif', fontWeight: 700 }}>
              {total}
            </text>
            <text x={CX} y={CY + 9} textAnchor="middle"
              style={{ fill: 'var(--text-muted)', fontSize: '7px', fontFamily: 'DM Sans, sans-serif' }}>
              txns
            </text>
          </svg>
        </div>

        <div className="flex-1 space-y-2.5">
          {segments.map((seg) => (
            <div key={seg.key} className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 min-w-0">
                <span className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{ background: seg.color, boxShadow: `0 0 4px ${seg.color}80` }} />
                <span className="text-xs font-display font-medium truncate" style={{ color: 'var(--text-secondary)' }}>
                  {seg.label}
                </span>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <span className="text-xs font-mono font-bold" style={{ color: seg.color }}>{seg.count.toLocaleString()}</span>
                <span className="text-xs font-mono w-8 text-right" style={{ color: 'var(--text-muted)' }}>{seg.pct}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}