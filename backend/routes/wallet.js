const express   = require("express")
const router    = express.Router()
const { PublicKey } = require("@solana/web3.js")

const { getWalletTransactions, getSOLBalance } = require("../services/solana")
const {
  calculateReputation,
  calculateDeveloperScore,
  getRiskLevel,
  classifyWallet,
  getActivityLevel,
  generateInsight,
  getScoreBreakdown,
  getProtocolBreakdown,
  getTxTypeBreakdown,
} = require("../utils/scoring")

router.get("/:address", async (req, res) => {
  const address = req.params.address

  // ── 1. validate ───────────────────────────────────────────────────
  try {
    new PublicKey(address)
  } catch {
    return res.status(400).json({
      error:  "Invalid Solana wallet address",
      detail: "The address provided is not a valid Solana public key.",
    })
  }

  // ── 2. fetch transactions ─────────────────────────────────────────
  const transactions = await getWalletTransactions(address)

  if (!transactions || transactions.length === 0) {
    return res.status(404).json({
      error:  "Wallet appears empty or has no on-chain activity.",
      detail: "No scoreable data found for this address.",
    })
  }

  // ── 3. fetch SOL balance (non-blocking) ───────────────────────────
  const solBalance = await getSOLBalance(address)

  // ── 4. timestamps → wallet age ────────────────────────────────────
  const timestamps = transactions
    .map(tx => tx.timestamp || tx.blockTime)
    .filter(t => t && t > 0)

  let walletAgeDays  = 0
  let firstSeenDate  = null
  let lastActiveDate = null

  if (timestamps.length > 0) {
    const oldest  = timestamps.reduce((min, t) => t < min ? t : min, timestamps[0])
    const newest  = timestamps.reduce((max, t) => t > max ? t : max, timestamps[0])
    const nowSecs = Math.floor(Date.now() / 1000)

    walletAgeDays  = Math.max(0, Math.floor((nowSecs - oldest) / 86400))
    firstSeenDate  = new Date(oldest * 1000).toISOString().split("T")[0]
    lastActiveDate = new Date(newest * 1000).toISOString().split("T")[0]
  }

  // ── 5. breakdowns ─────────────────────────────────────────────────
  const txCount       = transactions.length
  const txTypes       = getTxTypeBreakdown(transactions)
  const protocols     = getProtocolBreakdown(transactions)
  const protocolCount = protocols.length

  // ── 6. scores ─────────────────────────────────────────────────────
  const reputationScore = calculateReputation(txCount, walletAgeDays, protocolCount)
  const developerScore  = calculateDeveloperScore(txCount, txTypes)
  const riskLevel       = getRiskLevel(reputationScore, walletAgeDays, txCount)
  const walletType      = classifyWallet(txCount, walletAgeDays, txTypes, protocolCount)
  const activityLevel   = getActivityLevel(txCount, walletAgeDays)
  const insight         = generateInsight(walletType, riskLevel, txCount, walletAgeDays, protocols)
  const scoreBreakdown  = getScoreBreakdown(txCount, walletAgeDays, protocolCount, txTypes)

  // ── 7. respond ────────────────────────────────────────────────────
  return res.json({
    wallet:             address,
    sol_balance:        solBalance,
    transaction_count:  txCount,
    wallet_age_days:    walletAgeDays,
    first_seen:         firstSeenDate,
    last_active:        lastActiveDate,
    reputation_score:   reputationScore,
    developer_score:    developerScore,
    risk_level:         riskLevel,
    wallet_type:        walletType,
    activity_level:     activityLevel,
    insight:            insight,
    score_breakdown:    scoreBreakdown,
    protocols:          protocols,
    tx_types:           txTypes,
  })
})

module.exports = router