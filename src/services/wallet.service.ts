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
    return [{ id: 'total', currency: saldos.monedaBase, balance: saldos.saldoTotal }]
  },
}