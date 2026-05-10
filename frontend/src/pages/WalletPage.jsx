import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Dashboard from './Dashboard'
import LoadingSpinner from '../components/LoadingSpinner'
import { analyzeWallet } from '../services/walletService'
import { MOCK_DATA } from '../services/mockData'

export default function WalletPage() {
  const { address } = useParams()
  const navigate = useNavigate()

  const [loading, setLoading] = useState(true)
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const [isMock, setIsMock] = useState(false)

  useEffect(() => {
    if (!address) return

    async function fetchWallet() {
      setLoading(true)
      setError(null)
      setData(null)
      setIsMock(false)

      try {
        const result = await analyzeWallet(address)
        setData(result)
      } catch (err) {
        if (err.response) {
          const body = err.response.data || {}
          setError({
            status: err.response.status,
            title: body.error || `Error ${err.response.status}`,
            detail: body.detail || body.message || 'The server returned an error.',
          })
        } else {
          // Genuine network failure — fall back to mock
          setIsMock(true)
          setData({ ...MOCK_DATA, wallet: address })
        }
      } finally {
        setLoading(false)
      }
    }

    fetchWallet()
  }, [address])

  if (loading) return <LoadingSpinner />

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4 gap-6"
        style={{ background: 'var(--void)' }}>
        <div className="w-full max-w-lg rounded-2xl p-6 animate-fade-up"
          style={{ background: 'rgba(255,78,106,0.06)', border: '1px solid rgba(255,78,106,0.3)' }}>
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
              style={{ background: 'rgba(255,78,106,0.12)', border: '1px solid rgba(255,78,106,0.25)' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="#ff4e6a" strokeWidth="1.5" />
                <path d="M12 8v4M12 16h.01" stroke="#ff4e6a" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <p className="font-display font-bold text-sm" style={{ color: '#ff4e6a' }}>
                  {error.title}
                </p>
                {error.status && (
                  <span className="text-xs font-mono px-1.5 py-0.5 rounded"
                    style={{ background: 'rgba(255,78,106,0.15)', color: '#ff4e6a' }}>
                    {error.status}
                  </span>
                )}
              </div>
              <p className="text-sm font-body" style={{ color: 'var(--text-secondary)' }}>
                {error.detail}
              </p>
            </div>
          </div>
        </div>
        <button onClick={() => navigate('/')}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-display font-semibold text-sm transition-all duration-200"
          style={{ border: '1px solid var(--border)', color: 'var(--text-secondary)', background: 'transparent' }}
          onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#2de8c8'; e.currentTarget.style.color = '#2de8c8' }}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-secondary)' }}>
          ← New Analysis
        </button>
      </div>
    )
  }

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center"
        style={{ background: 'var(--void)' }}>
        <div className="flex flex-col items-center gap-4 text-center px-4">
          <p className="font-display font-semibold text-base" style={{ color: 'var(--text-secondary)' }}>
            No data returned for this wallet.
          </p>
          <button onClick={() => navigate('/')}
            className="px-5 py-2.5 rounded-xl font-display font-semibold text-sm"
            style={{ border: '1px solid var(--border)', color: 'var(--text-muted)', background: 'transparent' }}>
            ← Go Home
          </button>
        </div>
      </div>
    )
  }

  return <Dashboard data={data} isMock={isMock} onReset={() => navigate('/')} />
}