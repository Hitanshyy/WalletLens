import React, { useState, useEffect } from 'react'

const STEPS = [
  'Fetching transactions…',
  'Calculating scores…',
  'Analyzing protocols…',
  'Generating insight…',
]

export default function LoadingSpinner() {
  const [stepIndex, setStepIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => setStepIndex((i) => (i + 1) % STEPS.length), 1800)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-10" style={{ background: 'var(--void)' }}>
      <div className="relative w-24 h-24">
        <svg className="absolute inset-0" style={{ animation: 'spinRing 1.6s linear infinite' }} viewBox="0 0 96 96" fill="none">
          <circle cx="48" cy="48" r="44" stroke="url(#outerGrad)" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="70 208" />
          <defs>
            <linearGradient id="outerGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#2de8c8" />
              <stop offset="100%" stopColor="#2de8c8" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
        <svg className="absolute inset-0" style={{ animation: 'spinRing 1.1s linear infinite reverse', inset: '12px' }} viewBox="0 0 72 72" fill="none">
          <circle cx="36" cy="36" r="30" stroke="rgba(124,110,255,0.5)" strokeWidth="1" strokeLinecap="round" strokeDasharray="30 160" />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-4 h-4 rounded-full"
            style={{ background: 'radial-gradient(circle, #2de8c8 0%, #7c6eff 100%)', boxShadow: '0 0 16px rgba(45,232,200,0.7)', animation: 'pulseRing 2s ease-in-out infinite' }} />
        </div>
      </div>

      <div className="flex flex-col items-center gap-3">
        <p className="font-display font-semibold text-base tracking-wide" style={{ color: 'var(--text-primary)' }}>
          Analyzing Wallet
        </p>
        <div className="h-5 overflow-hidden relative w-64 text-center">
          <p key={stepIndex} className="text-sm font-mono absolute inset-x-0"
            style={{ color: '#2de8c8', animation: 'stepFade 0.4s ease both' }}>
            {STEPS[stepIndex]}
          </p>
        </div>
        <div className="flex gap-1.5 mt-1">
          {STEPS.map((_, i) => (
            <span key={i} className="w-1.5 h-1.5 rounded-full transition-all duration-300"
              style={{ background: i === stepIndex ? '#2de8c8' : 'var(--border)', transform: i === stepIndex ? 'scale(1.3)' : 'scale(1)' }} />
          ))}
        </div>
      </div>

      <div className="w-48 h-px rounded-full overflow-hidden" style={{ background: 'var(--border)' }}>
        <div className="h-full rounded-full"
          style={{ background: 'linear-gradient(90deg, #2de8c8, #7c6eff, #2de8c8)', backgroundSize: '200% 100%', animation: 'shimmer 1.8s linear infinite' }} />
      </div>

      <style>{`@keyframes stepFade { from{opacity:0;transform:translateY(6px)} to{opacity:1;transform:translateY(0)} }`}</style>
    </div>
  )
}