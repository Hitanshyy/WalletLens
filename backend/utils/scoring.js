// ── reputation ────────────────────────────────────────────────────────
function calculateReputation(txCount, walletAgeDays, protocolCount = 0) {
  let score = 0

  // wallet age (max 35)
  if (walletAgeDays > 365)      score += 35
  else if (walletAgeDays > 180) score += 28
  else if (walletAgeDays > 100) score += 22
  else if (walletAgeDays > 50)  score += 15
  else if (walletAgeDays > 20)  score += 8

  // transaction volume (max 35)
  if (txCount > 200)      score += 35
  else if (txCount > 100) score += 28
  else if (txCount > 50)  score += 20
  else if (txCount > 20)  score += 13
  else if (txCount > 10)  score += 7
  else if (txCount > 5)   score += 3

  // protocol diversity (max 30)
  if (protocolCount >= 5)      score += 30
  else if (protocolCount >= 3) score += 20
  else if (protocolCount >= 2) score += 12
  else if (protocolCount >= 1) score += 5

  return Math.min(score, 100)
}

// ── developer score ───────────────────────────────────────────────────
function calculateDeveloperScore(txCount, txTypes = {}) {
  let score = 0

  // raw volume
  if (txCount > 100)     score += 40
  else if (txCount > 50) score += 30
  else if (txCount > 20) score += 20
  else if (txCount > 10) score += 12
  else if (txCount > 5)  score += 6

  // sophisticated tx types signal power usage
  const swaps     = txTypes.SWAP || 0
  const staking   = txTypes.STAKE || 0
  const nft       = (txTypes.NFT_MINT || 0) + (txTypes.NFT_SALE || 0)
  const transfers = txTypes.TRANSFER || 0

  if (swaps > 20)      score += 25
  else if (swaps > 10) score += 18
  else if (swaps > 5)  score += 10
  else if (swaps > 0)  score += 5

  if (staking > 0)    score += 15
  if (nft > 5)        score += 15
  else if (nft > 0)   score += 8
  if (transfers > 10) score += 5

  return Math.min(score, 100)
}

// ── risk ──────────────────────────────────────────────────────────────
function getRiskLevel(reputationScore, walletAgeDays, txCount) {
  // brand new wallet with lots of txns = bot risk
  if (walletAgeDays < 7 && txCount > 50)  return "high"
  if (walletAgeDays < 1 && txCount > 10)  return "high"
  if (reputationScore >= 60)              return "low"
  if (reputationScore >= 30)              return "medium"
  return "high"
}

// ── wallet classification ─────────────────────────────────────────────
function classifyWallet(txCount, walletAgeDays, txTypes = {}, protocolCount = 0) {
  const swaps = txTypes.SWAP || 0
  const age   = walletAgeDays

  if (age < 1 && txCount > 50)                 return "bot"
  if (swaps > 100 || (swaps > 50 && age < 30)) return "trader"
  if (txCount > 200 && protocolCount >= 5)      return "power_user"
  if (protocolCount >= 3 && txCount > 50)       return "defi_user"
  if (txCount > 50 && age > 180)                return "active_user"
  if (txCount <= 5)                             return "new_wallet"
  if (age > 180 && txCount < 20)                return "dormant"
  return "casual_user"
}

// ── activity level ────────────────────────────────────────────────────
function getActivityLevel(txCount, walletAgeDays) {
  const days     = Math.max(walletAgeDays, 1)
  const txPerDay = txCount / days

  if (txPerDay > 10 || txCount > 200) return "high"
  if (txPerDay > 1  || txCount > 50)  return "medium"
  return "low"
}

// ── insight ───────────────────────────────────────────────────────────
function generateInsight(walletType, riskLevel, txCount, walletAgeDays, topProtocols = []) {
  const topProto = topProtocols[0]?.name || null
  const protoStr = topProto ? ` Most active on ${topProto}.` : ""
  const age      = walletAgeDays < 1 ? "less than a day" : `${walletAgeDays} days`

  const insights = {
    bot:         `Wallet shows bot-like behaviour — ${txCount} transactions in ${age} with rapid-fire patterns. High risk flag.${protoStr}`,
    trader:      `Active trading wallet with ${txCount} transactions. Frequent swap activity detected.${protoStr}`,
    power_user:  `Power user with deep DeFi engagement across ${topProtocols.length} protocols and ${txCount} transactions.${protoStr}`,
    defi_user:   `Consistent DeFi participant interacting with multiple protocols over ${age}.${protoStr}`,
    active_user: `Established wallet with ${txCount} transactions over ${age}. Healthy on-chain footprint.${protoStr}`,
    new_wallet:  `Recently active wallet with limited history (${txCount} transactions). Insufficient data for full scoring.`,
    dormant:     `Wallet shows minimal recent activity despite being ${age} old. Possible cold storage or inactive account.`,
    casual_user: `Casual on-chain user with moderate activity over ${age}.${protoStr}`,
  }

  return insights[walletType] || "Wallet shows moderate blockchain activity."
}

// ── score breakdown ───────────────────────────────────────────────────
function getScoreBreakdown(txCount, walletAgeDays, protocolCount = 0, txTypes = {}) {
  const breakdown = {
    wallet_age:            0,
    transaction_volume:    0,
    protocol_diversity:    0,
    transaction_diversity: 0,
  }

  if (walletAgeDays > 365)      breakdown.wallet_age = 35
  else if (walletAgeDays > 180) breakdown.wallet_age = 28
  else if (walletAgeDays > 100) breakdown.wallet_age = 22
  else if (walletAgeDays > 50)  breakdown.wallet_age = 15
  else if (walletAgeDays > 20)  breakdown.wallet_age = 8

  if (txCount > 200)      breakdown.transaction_volume = 35
  else if (txCount > 100) breakdown.transaction_volume = 28
  else if (txCount > 50)  breakdown.transaction_volume = 20
  else if (txCount > 20)  breakdown.transaction_volume = 13
  else if (txCount > 10)  breakdown.transaction_volume = 7

  if (protocolCount >= 5)      breakdown.protocol_diversity = 30
  else if (protocolCount >= 3) breakdown.protocol_diversity = 20
  else if (protocolCount >= 2) breakdown.protocol_diversity = 12
  else if (protocolCount >= 1) breakdown.protocol_diversity = 5

  const uniqueTypes = Object.keys(txTypes).filter(k => txTypes[k] > 0).length
  if (uniqueTypes >= 4)      breakdown.transaction_diversity = 20
  else if (uniqueTypes >= 3) breakdown.transaction_diversity = 14
  else if (uniqueTypes >= 2) breakdown.transaction_diversity = 8
  else if (uniqueTypes >= 1) breakdown.transaction_diversity = 3

  return breakdown
}

// ── protocol breakdown ────────────────────────────────────────────────
function getProtocolBreakdown(transactions) {
  // filter out low-level Solana internals that aren't real protocols
  const IGNORE = new Set([
    "SYSTEM_PROGRAM",
    "SOLANA_PROGRAM_LIBRARY",
    "ASSOCIATED_TOKEN_PROGRAM",
    "TOKEN_PROGRAM",
    "COMPUTE_BUDGET",
    "UNKNOWN",
    "",
  ])

  const counts = {}
  for (const tx of transactions) {
    const src = tx.source
    if (src && !IGNORE.has(src)) {
      counts[src] = (counts[src] || 0) + 1
    }
  }

  return Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([name, count]) => ({
      name: name.replace(/_/g, " "),
      count,
      pct: Math.round((count / transactions.length) * 100),
    }))
}
// ── transaction type breakdown ────────────────────────────────────────
function getTxTypeBreakdown(transactions) {
  const counts = {}
  for (const tx of transactions) {
    const type = tx.type
    if (type && type !== "UNKNOWN" && type !== "") {
      counts[type] = (counts[type] || 0) + 1
    }
  }
  return counts
}

module.exports = {
  calculateReputation,
  calculateDeveloperScore,
  getRiskLevel,
  classifyWallet,
  getActivityLevel,
  generateInsight,
  getScoreBreakdown,
  getProtocolBreakdown,
  getTxTypeBreakdown,
}