export const MOCK_DATA = {
  wallet: '7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU',
  sol_balance: 15.6928,
  transaction_count: 300,
  wallet_age_days: 68,
  first_seen: '2026-03-02',
  last_active: '2026-05-09',
  reputation_score: 80,
  developer_score: 45,
  risk_level: 'low',
  wallet_type: 'power_user',
  activity_level: 'high',
  insight:
    'Power user with deep DeFi engagement. High swap frequency via Jupiter indicates sophisticated trading behavior. Wallet age and protocol diversity contribute to a strong trust score.',
  score_breakdown: {
    wallet_age: 15,
    transaction_volume: 35,
    protocol_diversity: 30,
    transaction_diversity: 14,
  },
  protocols: [
    { name: 'JUPITER', count: 145, pct: 48 },
    { name: 'PHANTOM', count: 60, pct: 20 },
    { name: 'RAYDIUM', count: 42, pct: 14 },
    { name: 'ORCA', count: 30, pct: 10 },
    { name: 'MAGIC EDEN', count: 23, pct: 8 },
  ],
  tx_types: {
    SWAP: 240,
    TRANSFER: 45,
    NFT_SALE: 15,
  },
}