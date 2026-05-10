import React from 'react'

const RISK_CONFIG = {
  low:    { label: 'Low Risk',    dot: '#2de8c8', color: '#2de8c8', bg: 'rgba(45,232,200,0.1)',  border: 'rgba(45,232,200,0.25)'  },
  medium: { label: 'Medium Risk', dot: '#f5a623', color: '#f5a623', bg: 'rgba(245,166,35,0.1)',  border: 'rgba(245,166,35,0.25)'  },
  high:   { label: 'High Risk',   dot: '#ff4e6a', color: '#ff4e6a', bg: 'rgba(255,78,106,0.1)',  border: 'rgba(255,78,106,0.25)'  },
}

export function RiskBadge({ level }) {
  const cfg = RISK_CONFIG[level?.toLowerCase()] || RISK_CONFIG.medium
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-display font-semibold"
      style={{ color: cfg.color, background: cfg.bg, border: `1px solid ${cfg.border}` }}>
      <span className="relative flex items-center justify-center w-2 h-2">
        <span className="absolute inline-flex w-full h-full rounded-full opacity-60"
          style={{ background: cfg.dot, animation: 'pulseRing 1.5s ease-in-out infinite' }} />
        <span className="relative w-1.5 h-1.5 rounded-full"
          style={{ background: cfg.dot, boxShadow: `0 0 6px ${cfg.dot}` }} />
      </span>
      {cfg.label}
    </span>
  )
}

const ACTIVITY_CONFIG = {
  low:    { label: 'Low Activity',      color: '#6b7fa3' },
  medium: { label: 'Moderate Activity', color: '#f5a623' },
  high:   { label: 'High Activity',     color: '#2de8c8' },
}

export function ActivityBadge({ level }) {
  const cfg = ACTIVITY_CONFIG[level?.toLowerCase()] || ACTIVITY_CONFIG.medium
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-display font-semibold"
      style={{ color: cfg.color, background: `${cfg.color}15`, border: `1px solid ${cfg.color}40` }}>
      {cfg.label}
    </span>
  )
}

const WALLET_TYPE_CONFIG = {
  bot:         { label: 'Bot',         color: '#ff4e6a' },
  trader:      { label: 'Trader',      color: '#f5a623' },
  power_user:  { label: 'Power User',  color: '#2de8c8' },
  defi_user:   { label: 'DeFi User',   color: '#7c6eff' },
  active_user: { label: 'Active User', color: '#7c6eff' },
  new_wallet:  { label: 'New Wallet',  color: '#6b7fa3' },
  dormant:     { label: 'Dormant',     color: '#4a5568' },
  casual_user: { label: 'Casual User', color: '#a0aec0' },
  developer:   { label: 'Developer',   color: '#2de8c8' },
  whale:       { label: 'Whale',       color: '#f5a623' },
}

export function WalletTypeBadge({ type }) {
  const key = type?.toLowerCase().replace(' ', '_')
  const cfg = WALLET_TYPE_CONFIG[key] || { label: type || 'Unknown', color: '#6b7fa3' }
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-display font-semibold"
      style={{ color: cfg.color, background: `${cfg.color}15`, border: `1px solid ${cfg.color}40` }}>
      <span className="w-1.5 h-1.5 rounded-full" style={{ background: cfg.color }} />
      {cfg.label}
    </span>
  )
}

export function ScoreArc({ score, max = 100, label, color = '#2de8c8' }) {
  const radius = 28
  const circumference = 2 * Math.PI * radius
  const dash = Math.max(0, Math.min(score / max, 1)) * circumference
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex items-center gap-2">
        {/* Circle */}
        <div className="relative w-16 h-16">
          <svg viewBox="0 0 72 72" className="w-full h-full -rotate-90">
            <circle cx="36" cy="36" r={radius} fill="none" stroke="rgba(26,37,64,0.8)" strokeWidth="4" />
            <circle cx="36" cy="36" r={radius} fill="none" stroke={color} strokeWidth="4" strokeLinecap="round"
              strokeDasharray={`${dash} ${circumference - dash}`}
              style={{ transition: 'stroke-dasharray 1s ease', filter: `drop-shadow(0 0 4px ${color}80)` }} />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-display font-bold text-base" style={{ color }}>{score}</span>
          </div>
        </div>

        {/* Max outside circle */}
        <div className="flex flex-col justify-center">
          <span className="font-display font-bold text-xs" style={{ color: 'var(--text-muted)' }}>/{max}</span>
        </div>
      </div>
      <span className="text-xs font-display" style={{ color: 'var(--text-secondary)' }}>{label}</span>
    </div>
  )
}

export default RiskBadge