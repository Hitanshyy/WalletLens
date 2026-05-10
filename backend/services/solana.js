const axios = require("axios")

const HELIUS_API_KEY = process.env.HELIUS_API_KEY
const BASE_URL       = "https://api.helius.xyz/v0"
const RPC_URL        = `https://mainnet.helius-rpc.com/?api-key=${HELIUS_API_KEY}`

// ── fetch up to 300 recent transactions ──────────────────────────────
async function getWalletTransactions(address) {
  try {
    let allTransactions = []
    let before          = null

    for (let i = 0; i < 3; i++) {
      const url      = `${BASE_URL}/addresses/${address}/transactions?api-key=${HELIUS_API_KEY}&limit=100${before ? `&before=${before}` : ""}`
      const response = await axios.get(url)
      const batch    = response.data

      if (!batch || batch.length === 0) break

      allTransactions = [...allTransactions, ...batch]

      if (batch.length < 100) break

      before = batch[batch.length - 1].signature
    }

    return allTransactions
  } catch (error) {
    console.error("Helius error (transactions):", error.message)
    return []
  }
}

// ── fetch SOL balance via Helius RPC ─────────────────────────────────
async function getSOLBalance(address) {
  try {
    const response = await axios.post(RPC_URL, {
      jsonrpc: "2.0",
      id:      1,
      method:  "getBalance",
      params:  [address],
    })
    const lamports = response.data?.result?.value || 0
    return parseFloat((lamports / 1_000_000_000).toFixed(4))
  } catch (error) {
    console.error("Helius error (balance):", error.message)
    return null
  }
}

module.exports = { getWalletTransactions, getSOLBalance }