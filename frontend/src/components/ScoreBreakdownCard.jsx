import React, { useEffect, useState } from 'react'

const BREAKDOWN_META = {
  wallet_age:            { label: 'Wallet Age',            max: 35, color: '#2de8c8' },
  transaction_volume:    { label: 'Transaction Volume',    max: 35, color: '#7c6eff' },
  protocol_diversity:    { label: 'Protocol Diversity',    max: 30, color: '#f5a623' },
  transaction_diversity: { label: 'Transaction Diversity', max: 20, color: '#5eead4' },
}

function BreakdownBar({ label, value, max, color, delay }) {
  const [width, setWidth] = useState(0)
  const pct = Math.min(100, (value / max) * 100)

  useEffect(() => {
    const t = setTimeout(() => setWidth(pct), delay + 100)
    return () => clearTimeout(t)
  }, [pct, delay])

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-body" style={{ color: 'var(--text-secondary)' }}>{label}</span>
        <div className="flex items-center gap-1.5">
          <span className="font-display font-bold text-sm" style={{ color }}>{value}</span>
          <span className="text-xs" style={{ color: 'var(--text-muted)' }}>/ {max}</span>
        </div>
      </div>
      <div className="relative h-2 rounded-full overflow-hidden" style={{ background: 'rgba(26,37,64,0.8)' }}>
        <div className="absolute inset-y-0 left-0 rounded-full transition-all duration-1000 ease-out"
          style={{ width: `${width}%`, background: `linear-gradient(90deg, ${color}88, ${color})`, boxShadow: `0 0 8px ${color}60` }} />
      </div>
    </div>
  )
}

export default function ScoreBreakdownCard({ breakdown, delay = 0 }) {
  if (!breakdown) return null
  const total = Object.values(breakdown).reduce((a, b) => a + b, 0)
  const maxTotal = Object.values(BREAKDOWN_META).reduce((a, m) => a + m.max, 0)

  return (
    <div className="glass rounded-2xl p-6 animate-fade-up" style={{ animationDelay: `${delay}s` }}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-display font-semibold text-base" style={{ color: 'var(--text-primary)' }}>Score Breakdown</h3>
          <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>How your reputation score was calculated</p>
        </div>
        <div className="flex flex-col items-end">
          <span className="font-display font-bold text-xl" style={{ color: '#2de8c8' }}>{total}</span>
          <span className="text-xs" style={{ color: 'var(--text-muted)' }}>/ {maxTotal} total</span>
        </div>
      </div>
      <div className="space-y-5">
        {Object.entries(breakdown).map(([key, value], i) => {
          const meta = BREAKDOWN_META[key] || { label: key, max: 100, color: '#6b7fa3' }
          return (
            <BreakdownBar key={key} label={meta.label} value={value} max={meta.max}
              color={meta.color} delay={delay * 1000 + i * 120} />
          )
        })}
      </div>
    </div>
  )
}