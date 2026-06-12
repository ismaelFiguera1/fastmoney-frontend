// wallet.service.ts
import api from './api'

export interface WalletBalance {
  id: string
  currency: string
  balance: number
}

export const walletService = {
  // GET /api/wallet/balance
  getBalance: async (): Promise<WalletBalance[]> => {
    const response = await api.get('/api/wallet/balance')
    const { saldos } = response.data
    
    // Obtenemos el ID de usuario desde localStorage para aplicar el offset local de ahorros
    const userStr = localStorage.getItem('user')
    const userId = userStr ? JSON.parse(userStr).id : 'guest'
    const currency = (saldos.monedaBase || 'USD').toUpperCase()
    
    const offsetKey = `wallet_offset_${userId}_${currency}`
    const offset = Number(localStorage.getItem(offsetKey) || 0)
    
    const finalBalance = Math.max(0, saldos.saldoTotal + offset)

    return [{ id: 'total', currency: saldos.monedaBase, balance: finalBalance }]
  },
}