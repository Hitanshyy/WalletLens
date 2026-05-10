import React, { useEffect, useState } from 'react'
import { Layers } from 'lucide-react'

const PROTOCOL_COLORS = ['#2de8c8', '#7c6eff', '#f5a623', '#5eead4', '#a78bfa']

function ProtocolRow({ protocol, rank, color, barDelay }) {
  const [width, setWidth] = useState(0)

  useEffect(() => {
    const t = setTimeout(() => setWidth(protocol.pct), barDelay)
    return () => clearTimeout(t)
  }, [protocol.pct, barDelay])

  return (
    <div className="flex items-center gap-3">
      <span className="w-5 text-xs font-display font-bold flex-shrink-0 text-right"
        style={{ color: rank === 0 ? color : 'var(--text-muted)' }}>{rank + 1}</span>
      <span className="font-display font-semibold text-xs w-28 flex-shrink-0 truncate"
        style={{ color: rank === 0 ? 'var(--text-primary)' : 'var(--text-secondary)' }}>{protocol.name}</span>
      <div className="flex-1 relative h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(26,37,64,0.9)' }}>
        <div className="absolute inset-y-0 left-0 rounded-full transition-all duration-700 ease-out"
          style={{ width: `${width}%`, background: `linear-gradient(90deg, ${color}66, ${color})`, transitionDelay: `${barDelay}ms` }} />
      </div>
      <div className="flex items-center gap-2 flex-shrink-0">
        <span className="text-xs font-mono" style={{ color }}>{protocol.count}</span>
        <span className="text-xs font-mono w-8 text-right" style={{ color: 'var(--text-muted)' }}>{protocol.pct}%</span>
      </div>
    </div>
  )
}

export default function ProtocolsCard({ protocols, delay = 0 }) {
  if (!protocols?.length) return null
  return (
    <div className="glass rounded-2xl p-6 animate-fade-up" style={{ animationDelay: `${delay}s` }}>
      <div className="flex items-center gap-2.5 mb-5">
        <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: 'rgba(124,110,255,0.12)', border: '1px solid rgba(124,110,255,0.25)' }}>
          <Layers size={14} style={{ color: '#7c6eff' }} />
        </div>
        <div>
          <h3 className="font-display font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>Protocol Activity</h3>
          <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{protocols.length} protocols used</p>
        </div>
      </div>
      <div className="flex items-center gap-3 mb-3 pb-2" style={{ borderBottom: '1px solid var(--border)' }}>
        <span className="w-5" />
        <span className="text-xs font-display uppercase tracking-wider w-28 flex-shrink-0" style={{ color: 'var(--text-muted)' }}>Protocol</span>
        <span className="flex-1 text-xs font-display uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>Activity</span>
        <span className="text-xs font-display uppercase tracking-wider flex-shrink-0" style={{ color: 'var(--text-muted)' }}>Txns / Share</span>
      </div>
      <div className="space-y-3.5">
        {protocols.map((p, i) => (
          <ProtocolRow key={p.name} protocol={p} rank={i}
            color={PROTOCOL_COLORS[i % PROTOCOL_COLORS.length]}
            barDelay={delay * 1000 + 200 + i * 100} />
        ))}
      </div>
    </div>
  )
}