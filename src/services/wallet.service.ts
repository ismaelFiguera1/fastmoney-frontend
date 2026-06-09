// wallet.service.ts
import api from './api'

export interface WalletBalance {
  id: string
  currency: string
  balance: number
}

export interface Transaction {
  id: string
  type: 'ENVIADO' | 'RECIBIDO' | 'SWAP' | 'DEPOSITO'
  title: string
  description?: string
  time: string
  amount: string
  status: 'Completado' | 'Pendiente'
  currency: string
}

export const walletService = {
  // GET /wallets/balance
  getBalance: async (): Promise<WalletBalance[]> => {
    const response = await api.get('/api/wallet/balance')
    const { saldos } = response.data
    return [{ id: 'total', currency: saldos.monedaBase, balance: saldos.saldoTotal }]
  },

  // GET /transactions/history
  getTransactionHistory: async (limit?: number): Promise<Transaction[]> => {
    const response = await api.get('/transactions/history', {
      params: limit ? { limit } : {}
    })
    return response.data
  },
}