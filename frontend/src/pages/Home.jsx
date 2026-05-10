import React from 'react'
import { Eye, Shield, Zap, Code2, BarChart2 } from 'lucide-react'
import WalletInput from '../components/WalletInput'

function GridOverlay() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" aria-hidden="true" style={{ zIndex: 0 }}>
      <svg className="absolute inset-0 w-full h-full opacity-[0.035]" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="dotGrid" x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="1" fill="#2de8c8" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dotGrid)" />
      </svg>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full"
        style={{ background: 'radial-gradient(ellipse 80% 70% at 50% 0%, rgba(45,232,200,0.09) 0%, transparent 65%)' }} />
      <div className="absolute -left-48 top-1/3 w-96 h-96 rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(124,110,255,0.1) 0%, transparent 70%)', animation: 'floatOrb 8s ease-in-out infinite' }} />
      <div className="absolute -right-48 bottom-1/4 w-80 h-80 rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(45,232,200,0.07) 0%, transparent 70%)', animation: 'floatOrb 10s ease-in-out 2s infinite reverse' }} />
      <style>{`
        @keyframes floatOrb { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-20px)} }
      `}</style>
    </div>
  )
}

const FEATURE_PILLS = [
  { icon: Shield,    label: 'Reputation Score'    },
  { icon: Zap,       label: 'Risk Analysis'        },
  { icon: BarChart2, label: 'Protocol Breakdown'   },
  { icon: Code2,     label: 'AI Insights'          },
]

const STATS = [
  { value: '300+', label: 'Transactions analyzed'  },
  { value: 'Live', label: 'Real-time Helius data'  },
  { value: '8',    label: 'Wallet classifications' },
]

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'var(--void)' }}>
      <GridOverlay />

      <header className="relative z-10 px-6 sm:px-10 pt-6">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, rgba(45,232,200,0.18) 0%, rgba(124,110,255,0.18) 100%)', border: '1px solid rgba(45,232,200,0.3)' }}>
            <Eye size={14} style={{ color: '#2de8c8' }} />
          </div>
          <span className="font-display font-bold text-base" style={{ color: 'var(--text-primary)' }}>
            Wallet<span style={{ color: '#2de8c8' }}>Lens</span>
          </span>
        </div>
      </header>

      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 sm:px-6 py-16">
        <div className="w-full max-w-2xl mx-auto flex flex-col items-center text-center gap-8">

          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full animate-fade-up"
            style={{ background: 'rgba(45,232,200,0.06)', border: '1px solid rgba(45,232,200,0.18)' }}>
            <span className="w-1.5 h-1.5 rounded-full"
              style={{ background: '#2de8c8', boxShadow: '0 0 6px #2de8c8', animation: 'pulseRing 2s infinite' }} />
            <span className="text-xs font-display font-semibold tracking-widest uppercase" style={{ color: '#2de8c8' }}>
              Solana On-Chain Intelligence
            </span>
          </div>

          <div className="space-y-3 animate-fade-up" style={{ animationDelay: '0.08s' }}>
            <h1 className="font-display font-bold leading-[0.95] tracking-tight"
              style={{ fontSize: 'clamp(3rem, 8vw, 5.5rem)', color: 'var(--text-primary)' }}>
              Wallet<span style={{ color: '#2de8c8', textShadow: '0 0 40px rgba(45,232,200,0.35)' }}>Lens</span>
            </h1>
            <p className="text-base sm:text-lg font-body max-w-lg mx-auto leading-relaxed"
              style={{ color: 'var(--text-secondary)', fontWeight: 300 }}>
              Solana wallet intelligence platform for trust, reputation, and risk analysis
            </p>
          </div>

          <div className="w-full animate-fade-up" style={{ animationDelay: '0.16s' }}>
            <WalletInput />
          </div>

          <div className="flex items-center justify-center gap-6 sm:gap-10 flex-wrap animate-fade-up"
            style={{ animationDelay: '0.6s' }}>
            {STATS.map((s, i) => (
              <React.Fragment key={s.label}>
                {i > 0 && <div className="hidden sm:block w-px h-6" style={{ background: 'var(--border)' }} />}
                <div className="flex flex-col items-center gap-0.5">
                  <span className="font-display font-bold text-xl"
                    style={{ color: '#2de8c8', textShadow: '0 0 12px rgba(45,232,200,0.3)' }}>{s.value}</span>
                  <span className="text-xs font-body" style={{ color: 'var(--text-muted)' }}>{s.label}</span>
                </div>
              </React.Fragment>
            ))}
          </div>

          <div className="flex items-center justify-center gap-2 flex-wrap animate-fade-up"
            style={{ animationDelay: '0.68s' }}>
            {FEATURE_PILLS.map(({ icon: Icon, label }) => (
              <span key={label}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-display font-medium"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)', color: 'var(--text-secondary)' }}>
                <Icon size={11} style={{ color: '#2de8c8' }} />
                {label}
              </span>
            ))}
          </div>

        </div>
      </main>

      <footer className="relative z-10 text-center pb-6">
        <p className="text-xs font-body" style={{ color: 'var(--text-muted)' }}>
          Powered by Helius RPC · Solana Mainnet
        </p>
      </footer>
    </div>
  )
}