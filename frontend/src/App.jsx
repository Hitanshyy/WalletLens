import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import WalletPage from './pages/WalletPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/wallet/:address" element={<WalletPage />} />
      </Routes>
    </BrowserRouter>
  )
}