// wallet.service.ts
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

  // GET /api/wallet/balance
  getBalance: async (): Promise<WalletBalance[]> => {
    const response = await api.get("/api/wallet/balance");
    const { saldos } = response.data;

    return [
      { id: "total", currency: saldos.monedaBase, balance: saldos.saldoTotal },
    ];
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
