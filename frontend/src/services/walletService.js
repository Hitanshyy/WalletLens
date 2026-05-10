import axios from 'axios'

const BASE_URL = 'https://walletlens.onrender.com'

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
  headers: { 'Content-Type': 'application/json' },
})

export const analyzeWallet = async (walletAddress) => {
  const response = await api.get(`/wallet/${walletAddress}`)
  return response.data
}

export default api