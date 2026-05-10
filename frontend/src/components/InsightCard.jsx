import React from 'react'
import { Brain } from 'lucide-react'

export default function InsightCard({ insight, wallet, delay = 0 }) {
  return (
    <div className="glass rounded-2xl p-6 animate-fade-up relative overflow-hidden"
      style={{ animationDelay: `${delay}s`, borderLeft: '3px solid #2de8c8' }}>
      <div className="absolute -top-8 -right-8 w-40 h-40 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(45,232,200,0.05) 0%, transparent 70%)' }} />
      <div className="flex items-center gap-3 mb-4">
        <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: 'rgba(45,232,200,0.1)', border: '1px solid rgba(45,232,200,0.2)' }}>
          <Brain size={15} style={{ color: '#2de8c8' }} />
        </div>
        <div>
          <p className="font-display font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>
            Wallet Insight
          </p>
          {wallet && (
            <p className="text-xs font-mono" style={{ color: 'var(--text-muted)', fontSize: '11px' }}>
              {wallet.slice(0, 12)}…{wallet.slice(-8)}
            </p>
          )}
        </div>
      </div>
      <div className="h-px w-full mb-4" style={{ background: 'var(--border)' }} />
      <p className="text-sm leading-relaxed font-body" style={{ color: 'var(--text-secondary)', lineHeight: '1.7' }}>
        {insight}
      </p>
    </div>
  )
}