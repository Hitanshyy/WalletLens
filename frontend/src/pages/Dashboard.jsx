import React from 'react'
import {
  Hash, Calendar, Shield, Code2, Zap, Wallet,
  Activity, ArrowLeft, Copy, CheckCheck, ExternalLink, AlertTriangle,
} from 'lucide-react'
import AnalyticsCard from '../components/AnalyticsCard'
import { RiskBadge, ActivityBadge, ScoreArc, WalletTypeBadge } from '../components/ScoreBadge'
import InsightCard from '../components/InsightCard'
import ScoreBreakdownCard from '../components/ScoreBreakdownCard'
import ProtocolsCard from '../components/ProtocolsCard'
import TxTypesCard from '../components/TxTypesCard'

function formatDate(iso) {
  if (!iso) return null
  try {
    return new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
  } catch { return iso }
}

function formatSol(num) {
  if (num == null) return '—'
    if (num >= 20000) return '> 20,000 SOL'
  if (num >= 10000) return '> 10,000 SOL'
  if (num >= 1000)  return '> 1,000 SOL'
  if (num >= 100)   return '> 100 SOL'
  if (num >= 10)    return '> 10 SOL'
  return num.toFixed(5) + ' SOL'
}

function CopyButton({ text }) {
  const [copied, setCopied] = React.useState(false)
  const handleCopy = async () => {
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  return (
    <button onClick={handleCopy}
      className="p-1.5 rounded-lg transition-all duration-150"
      style={{ color: copied ? '#2de8c8' : 'var(--text-muted)' }}
      title="Copy address"
      onMouseEnter={(e) => { if (!copied) e.currentTarget.style.color = 'var(--text-secondary)' }}
      onMouseLeave={(e) => { if (!copied) e.currentTarget.style.color = 'var(--text-muted)' }}>
      {copied ? <CheckCheck size={13} /> : <Copy size={13} />}
    </button>
  )
}

function MockBanner() {
  return (
    <div className="rounded-xl px-4 py-2.5 flex items-center gap-2.5 text-xs"
      style={{ background: 'rgba(245,166,35,0.07)', border: '1px solid rgba(245,166,35,0.25)', color: '#f5a623' }}>
      <AlertTriangle size={13} />
      <span className="font-display font-medium">
        Network unreachable — showing demo data. Connect the backend to see live results.
      </span>
    </div>
  )
}

function NetworkBadge({ network }) {
  const config = {
    mainnet:  { label: 'Mainnet',  color: '#2de8c8', bg: 'rgba(45,232,200,0.1)',  border: 'rgba(45,232,200,0.25)'  },
    devnet:   { label: 'Devnet',   color: '#7c6eff', bg: 'rgba(124,110,255,0.1)', border: 'rgba(124,110,255,0.25)' },
    testnet:  { label: 'Testnet',  color: '#f5a623', bg: 'rgba(245,166,35,0.1)',  border: 'rgba(245,166,35,0.25)'  },
    localnet: { label: 'Localnet', color: '#6b7fa3', bg: 'rgba(107,127,163,0.1)', border: 'rgba(107,127,163,0.25)' },
  }
  const cfg = config[network?.toLowerCase()] || config.mainnet
  return (
    <span
      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-display font-semibold"
      style={{ color: cfg.color, background: cfg.bg, border: `1px solid ${cfg.border}` }}
    >
      <span className="w-1.5 h-1.5 rounded-full" style={{ background: cfg.color }} />
      {cfg.label}
    </span>
  )
}

export default function Dashboard({ data, onReset, isMock = false }) {
  const {
    wallet, network, sol_balance, transaction_count, wallet_age_days,
    first_seen, last_active, reputation_score, developer_score,
    risk_level, wallet_type, activity_level, insight,
    score_breakdown, protocols, tx_types,
  } = data

  const reputationColor = reputation_score >= 70 ? '#2de8c8' : reputation_score >= 40 ? '#f5a623' : '#ff4e6a'
  const developerColor  = developer_score  >= 60 ? '#7c6eff' : developer_score  >= 30 ? '#f5a623' : '#6b7fa3'

  const firstSeenFmt  = formatDate(first_seen)
  const lastActiveFmt = formatDate(last_active)
  const ageRange = firstSeenFmt && lastActiveFmt ? `${firstSeenFmt} → ${lastActiveFmt}` : null

  const solscanUrl = network === 'devnet' || network === 'testnet'
    ? `https://solscan.io/account/${wallet}?cluster=${network}`
    : `https://solscan.io/account/${wallet}`

  return (
    <div className="min-h-screen" style={{ background: 'var(--void)' }}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 space-y-5">

        {isMock && <MockBanner />}

        {/* Top bar */}
        <div className="glass rounded-2xl px-5 py-4 flex items-center gap-3 flex-wrap animate-fade-up">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: 'rgba(45,232,200,0.1)', border: '1px solid rgba(45,232,200,0.2)' }}>
            <Wallet size={16} style={{ color: '#2de8c8' }} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-display font-medium mb-0.5" style={{ color: 'var(--text-muted)' }}>Wallet Address</p>
            <p className="font-mono text-sm truncate" style={{ color: 'var(--text-primary)', fontSize: '13px' }}>{wallet}</p>
          </div>
          <div className="flex items-center gap-1">
            <CopyButton text={wallet} />
            <a href={solscanUrl} target="_blank" rel="noopener noreferrer"
              className="p-1.5 rounded-lg transition-all duration-150"
              style={{ color: 'var(--text-muted)' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#2de8c8')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}>
              <ExternalLink size={13} />
            </a>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <NetworkBadge network={network} />
            <RiskBadge level={risk_level} />
            <WalletTypeBadge type={wallet_type} />
            <ActivityBadge level={activity_level} />
          </div>
          <button onClick={onReset}
            className="flex items-center gap-1.5 text-xs font-display font-medium transition-colors duration-150 ml-1 flex-shrink-0"
            style={{ color: 'var(--text-muted)' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#2de8c8')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}>
            <ArrowLeft size={12} /> New Analysis
          </button>
        </div>

        {/* Scores overview */}
        <div className="glass rounded-2xl p-6 animate-fade-up" style={{ animationDelay: '0.05s' }}>
          <p className="text-xs font-display font-medium tracking-wider uppercase mb-6" style={{ color: 'var(--text-muted)' }}>
            Scores Overview
          </p>
          <div className="flex items-center justify-around flex-wrap gap-6">
            <ScoreArc score={reputation_score} label="Reputation" color={reputationColor} />
            <div className="w-px h-12" style={{ background: 'var(--border)' }} />
            <ScoreArc score={developer_score} label="Developer" color={developerColor} />
            <div className="w-px h-12" style={{ background: 'var(--border)' }} />
            <div className="flex flex-col items-center gap-2">
              <div className="h-16 flex items-center"><RiskBadge level={risk_level} /></div>
              <span className="text-xs font-display" style={{ color: 'var(--text-secondary)' }}>Risk</span>
            </div>
            <div className="w-px h-12" style={{ background: 'var(--border)' }} />
            <div className="flex flex-col items-center gap-2">
              <div className="h-16 flex items-center"><ActivityBadge level={activity_level} /></div>
              <span className="text-xs font-display" style={{ color: 'var(--text-secondary)' }}>Activity</span>
            </div>
          </div>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
          <AnalyticsCard icon={Wallet}   label="SOL Balance"   value={formatSol(sol_balance)} sub="On-chain balance" accent="#f5a623" delay={0.08} />
          <AnalyticsCard icon={Hash}     label="Transactions"  value={transaction_count?.toLocaleString()} sub="Total on-chain txns" accent="#7c6eff" delay={0.12} />
          <AnalyticsCard icon={Calendar} label="Wallet Age"    value={wallet_age_days != null ? `${wallet_age_days} days` : '—'} sub={firstSeenFmt ? `First seen: ${firstSeenFmt}` : undefined} subDate={ageRange} accent="#2de8c8" delay={0.16} />
          <AnalyticsCard icon={Activity} label="Last Active"   value={lastActiveFmt || '—'} sub={firstSeenFmt ? `Active since ${firstSeenFmt}` : undefined} accent="#5eead4" delay={0.20} />
          <AnalyticsCard icon={Zap}      label="Wallet Type"   accent="#f5a623" delay={0.32}><WalletTypeBadge type={wallet_type} /></AnalyticsCard>
          <AnalyticsCard icon={Hash}     label="Network"       accent="#2de8c8" delay={0.28}><NetworkBadge network={network} /></AnalyticsCard>
        </div>

        <ScoreBreakdownCard breakdown={score_breakdown} delay={0.4} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <ProtocolsCard protocols={protocols} delay={0.45} />
          <TxTypesCard txTypes={tx_types} delay={0.5} />
        </div>

        {insight && <InsightCard insight={insight} wallet={wallet} delay={0.55} />}

      </div>
    </div>
  )
}