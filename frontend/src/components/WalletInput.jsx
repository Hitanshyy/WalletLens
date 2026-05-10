import React, { useState, useEffect } from 'react'
import { Search, Scan, X } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const SOLANA_ADDRESS_REGEX = /^[1-9A-HJ-NP-Za-km-z]{32,44}$/

const EXAMPLE_WALLETS = [
  '7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU',
  '9WzDXwBbmkg8ZTbNMqUxvQRAyrZzDsGYdLVL9zYtAWWM',
]

export default function WalletInput({ isLoading }) {
  const navigate = useNavigate()
  const [value, setValue] = useState('')
  const [validationError, setValidationError] = useState('')
  const [focused, setFocused] = useState(false)
  const [recentWallets, setRecentWallets] = useState([])

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('recent_wallets') || '[]')
    setRecentWallets(stored)
  }, [])

  const handleSubmit = (e) => {
    e?.preventDefault()
    const trimmed = value.trim()
    if (!trimmed) { setValidationError('Please enter a wallet address.'); return }
    if (!SOLANA_ADDRESS_REGEX.test(trimmed)) { setValidationError('Invalid Solana address format.'); return }
    setValidationError('')
    const recent = JSON.parse(localStorage.getItem('recent_wallets') || '[]')
    const updated = [trimmed, ...recent.filter((w) => w !== trimmed)].slice(0, 5)
    localStorage.setItem('recent_wallets', JSON.stringify(updated))
    setRecentWallets(updated)
    navigate(`/wallet/${trimmed}`)
  }

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">

      {/* Input */}
      <form onSubmit={handleSubmit} className="animate-fade-up" style={{ animationDelay: '0.3s' }}>
        <div className="relative flex items-center gap-3">
          <div className="relative flex-1">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
              <Search size={15} style={{ color: focused ? '#2de8c8' : 'var(--text-muted)', transition: 'color 0.2s' }} />
            </div>
            <input
              type="text" value={value}
              onChange={(e) => { setValue(e.target.value); if (validationError) setValidationError('') }}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              placeholder="Enter Solana wallet address…"
              disabled={isLoading}
              spellCheck={false} autoComplete="off"
              className="w-full pl-10 pr-10 py-3.5 rounded-xl font-mono text-sm transition-all duration-200 disabled:opacity-50 outline-none"
              style={{
                background: 'var(--surface)',
                border: focused ? '1px solid rgba(45,232,200,0.5)' : validationError ? '1px solid rgba(255,78,106,0.5)' : '1px solid var(--border)',
                color: 'var(--text-primary)', fontSize: '13px', letterSpacing: '0.02em',
                boxShadow: focused ? '0 0 0 3px rgba(45,232,200,0.07)' : 'none',
              }}
            />
            {value && (
              <button type="button" onClick={() => { setValue(''); setValidationError('') }}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-md"
                style={{ color: 'var(--text-muted)' }}>
                <X size={13} />
              </button>
            )}
          </div>
          <button type="submit" disabled={isLoading || !value.trim()}
            className="flex items-center gap-2 px-6 py-3.5 rounded-xl font-display font-semibold text-sm whitespace-nowrap transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
            style={{ background: 'transparent', border: '1px solid #2de8c8', color: '#2de8c8' }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(45,232,200,0.1)' }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent' }}>
            <Scan size={14} /><span>Analyze</span>
          </button>
        </div>
        {validationError && (
          <p className="text-xs mt-2 pl-1 animate-fade-in" style={{ color: '#ff4e6a' }}>{validationError}</p>
        )}
        <div className="flex items-center gap-2 flex-wrap mt-2.5">
          <span className="text-xs" style={{ color: 'var(--text-muted)' }}>Try:</span>
          {EXAMPLE_WALLETS.map((addr) => (
            <button key={addr} type="button" onClick={() => { setValue(addr); setValidationError('') }}
              disabled={isLoading}
              className="text-xs font-mono transition-colors duration-150"
              style={{ color: 'var(--text-muted)' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#2de8c8')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}>
              {addr.slice(0, 8)}…{addr.slice(-6)}
            </button>
          ))}
        </div>
      </form>

      {/* OR divider */}
      <div className="relative flex items-center animate-fade-up" style={{ animationDelay: '0.38s' }}>
        <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, transparent, var(--border))' }} />
        <span className="px-4 text-xs font-display font-bold tracking-[0.35em]" style={{ color: 'var(--text-muted)' }}>OR</span>
        <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, var(--border), transparent)' }} />
      </div>

      {/* Phantom button */}
      <div className="flex justify-center animate-fade-up" style={{ animationDelay: '0.45s' }}>
        <button
          className="flex items-center gap-3 px-6 py-3 rounded-xl font-display font-semibold text-sm transition-all duration-200"
          style={{ background: 'rgba(124,110,255,0.12)', border: '1px solid rgba(124,110,255,0.35)', color: '#a78bfa' }}
          onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(124,110,255,0.2)' }}
          onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(124,110,255,0.12)' }}
          onClick={() => {
            if (window.solana?.isPhantom) {
              window.solana.connect().then((res) => setValue(res.publicKey.toString())).catch(console.error)
            } else {
              window.open('https://phantom.app', '_blank')
            }
          }}>
          <svg width="18" height="18" viewBox="0 0 128 128" fill="none">
            <rect width="128" height="128" rx="26" fill="#AB9FF2"/>
            <path d="M110.584 64.032C110.584 89.776 90.296 110.064 65 110.064C39.704 110.064 19.416 89.776 19.416 64.032C19.416 38.288 39.704 18 65 18C90.296 18 110.584 38.288 110.584 64.032Z" fill="white"/>
            <path d="M34 72C34 72 42 58 55 58C68 58 68 72 80 72C92 72 96 64 96 64" stroke="#AB9FF2" strokeWidth="8" strokeLinecap="round"/>
            <circle cx="52" cy="66" r="5" fill="#AB9FF2"/>
            <circle cx="78" cy="66" r="5" fill="#AB9FF2"/>
          </svg>
          Connect Phantom Wallet
        </button>
      </div>

      {/* Recent searches */}
      {recentWallets.length > 0 && (
        <div className="animate-fade-up" style={{ animationDelay: '0.52s' }}>
          <p className="text-xs mb-2.5" style={{ color: 'var(--text-muted)' }}>Recent Searches</p>
          <div className="flex flex-wrap gap-2">
            {recentWallets.map((wallet) => (
              <button key={wallet} type="button" onClick={() => navigate(`/wallet/${wallet}`)}
                className="px-3 py-1.5 rounded-full text-xs font-mono transition-all duration-150"
                style={{ border: '1px solid var(--border)', color: 'var(--text-muted)', background: 'transparent' }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#2de8c8'; e.currentTarget.style.color = '#2de8c8' }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-muted)' }}>
                {wallet.slice(0, 6)}…{wallet.slice(-4)}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}