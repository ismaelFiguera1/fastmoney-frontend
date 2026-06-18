import api from "./api";

export interface WalletBalance {
  id: string;
  currency: string;
  balance: number;
}

export interface TasasDeCambio {
  tasas: Record<string, Record<string, number>>;
}

const isMockMode = () => localStorage.getItem('token') === 'mock-token-development-only';

export const walletService = {
  // GET /api/wallet/tasas
  getTasas: async (): Promise<TasasDeCambio> => {
    if (isMockMode()) {
      return {
        tasas: {
          USD: { USD: 1, EUR: 0.92, ARS: 900, COP: 3800 },
          EUR: { USD: 1.08, EUR: 1, ARS: 980, COP: 4100 },
          ARS: { USD: 0.0011, EUR: 0.001, ARS: 1, COP: 4.2 },
          COP: { USD: 0.00026, EUR: 0.00024, ARS: 0.24, COP: 1 },
        }
      };
    }
    const response = await api.get("/api/wallet/tasas");
    return response.data;
  },

  // GET /api/wallet/balance/:moneda
  getBalance: async (moneda: string): Promise<WalletBalance[]> => {
    if (isMockMode()) {
      const mockBalances = {
        USD: 1250.00,
        EUR: 1150.00,
        ARS: 1125000.00,
        COP: 4750000.00
      };
      const val = mockBalances[moneda.toUpperCase() as keyof typeof mockBalances] || 1250.00;
      return [{ id: 'total', currency: moneda.toUpperCase(), balance: val }];
    }
    
    // Consultamos el desglose para retornar el saldo disponible específico de esta moneda en el Dashboard
    const response = await api.get("/api/wallet/desglose");
    const { desglose } = response.data;
    const campo = moneda.toLowerCase() as "usd" | "eur" | "ars" | "cop";
    const balanceVal = Number(desglose[campo]) || 0;
    return [{ id: 'total', currency: moneda.toUpperCase(), balance: balanceVal }];
  },

  // GET /api/wallet/desglose → desglose por moneda (para Perfil)
  getDesglose: async (): Promise<WalletBalance[]> => {
    if (isMockMode()) {
      return [
        { id: "usd", currency: "USD", balance: 1250.00 },
        { id: "eur", currency: "EUR", balance: 1150.00 },
        { id: "ars", currency: "ARS", balance: 1125000.00 },
        { id: "cop", currency: "COP", balance: 4750000.00 },
      ];
    }
    const response = await api.get("/api/wallet/desglose");
    const { desglose } = response.data;

    return [
      { id: "usd", currency: "USD", balance: Number(desglose.usd) },
      { id: "eur", currency: "EUR", balance: Number(desglose.eur) },
      { id: "ars", currency: "ARS", balance: Number(desglose.ars) },
      { id: "cop", currency: "COP", balance: Number(desglose.cop) },
    ];
  },

  // POST /api/wallet/convertir → realizar conversión de divisas
  convertirSaldo: async (datos: {
    monto: number;
    desdeMoneda: string;
    haciaMoneda: string;
  }): Promise<any> => {
    if (isMockMode()) {
      return { message: "Conversión realizada correctamente (Mock)" };
    }
    const response = await api.post("/api/wallet/convertir", datos);
    return response.data;
  },
};
