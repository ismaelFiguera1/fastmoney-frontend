import api from "./api";

export interface WalletBalance {
  id: string;
  currency: string;
  balance: number;
}

export interface TasasDeCambio {
  base: string;
  tasas: {
    USD: number;
    EUR: number;
    ARS: number;
    COP: number;
  };
}

export const walletService = {
  // GET /api/wallet/tasas
  getTasas: async (): Promise<TasasDeCambio> => {
    const response = await api.get("/api/wallet/tasas");
    return response.data;
  },

  // GET /api/wallet/balance/:moneda
  getBalance: async (moneda?: string): Promise<WalletBalance[]> => {
    const url = moneda ? `/api/wallet/balance/${moneda.toUpperCase()}` : '/api/wallet/balance';
    const response = await api.get(url);
    const { saldos } = response.data;
    
    // Obtenemos el ID de usuario desde localStorage para aplicar el offset local de ahorros
    const userStr = localStorage.getItem('user');
    const userId = userStr ? JSON.parse(userStr).id : 'guest';
    const currency = (saldos.monedaBase || 'USD').toUpperCase();
    
    const offsetKey = `wallet_offset_${userId}_${currency}`;
    const offset = Number(localStorage.getItem(offsetKey) || 0);
    
    const finalBalance = Math.max(0, saldos.saldoTotal + offset);

    return [{ id: 'total', currency: saldos.monedaBase, balance: finalBalance }];
  },

  // GET /api/wallet/balance → desglose por moneda (para Perfil)
  getDesglose: async (): Promise<WalletBalance[]> => {
    const response = await api.get("/api/wallet/balance");
    const { saldos } = response.data;
    const { desglose } = saldos;

    return [
      { id: "usd", currency: "USD", balance: Number(desglose.usd) },
      { id: "eur", currency: "EUR", balance: Number(desglose.eur) },
      { id: "ars", currency: "ARS", balance: Number(desglose.ars) },
      { id: "cop", currency: "COP", balance: Number(desglose.cop) },
    ];
  },
};
