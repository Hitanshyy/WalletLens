import React from 'react'

export default function AnalyticsCard({ icon: Icon, label, value, sub, subDate, accent, delay = 0, children }) {
  const accentColor = accent || 'var(--teal)'
  return (
    <div className="glass rounded-2xl p-5 flex flex-col gap-3 animate-fade-up"
      style={{ animationDelay: `${delay}s` }}>
      <div className="flex items-start justify-between">
        <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: `${accentColor}12`, border: `1px solid ${accentColor}25` }}>
          {Icon && <Icon size={16} style={{ color: accentColor }} />}
        </div>
        <span className="text-xs font-display font-medium tracking-wider uppercase"
          style={{ color: 'var(--text-muted)' }}>{label}</span>
      </div>
      <div className="mt-1">
        {children ? children : (
          <>
            <p className="font-display font-bold text-2xl leading-none" style={{ color: 'var(--text-primary)' }}>{value}</p>
            {sub && <p className="text-xs mt-1.5" style={{ color: 'var(--text-muted)' }}>{sub}</p>}
            {subDate && <p className="text-xs mt-0.5 font-mono" style={{ color: 'var(--text-muted)', fontSize: '11px' }}>{subDate}</p>}
          </>
        )}
      </div>
      <div className="h-px w-full rounded-full mt-auto opacity-30"
        style={{ background: `linear-gradient(90deg, ${accentColor}, transparent)` }} />
    </div>
  )
}