import api from "./api";

export interface MetaAhorro {
  id: number;
  cuentaId: number;
  nombre: string;
  limite: number;
  divisa: string;
  imagen: string | null;
  saldoAhorrado: number;
  createdAt: string;
  updatedAt: string;
}

const isMockMode = () => localStorage.getItem('token') === 'mock-token-development-only';

export const ahorroService = {
  getMeta: async (): Promise<MetaAhorro | null> => {
    if (isMockMode()) {
      return {
        id: 1,
        cuentaId: 123,
        nombre: "Mi Meta de Ahorro (Mock)",
        limite: 10000.00,
        divisa: "USD",
        imagen: null,
        saldoAhorrado: 2500.00,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
    }
    const response = await api.get("/api/ahorro");
    return response.data.meta;
  },

  crearMeta: async (datos: {
    nombre: string;
    limite: number;
    divisa: string;
    imagen?: string;
  }): Promise<MetaAhorro> => {
    if (isMockMode()) {
      return {
        id: 1,
        cuentaId: 123,
        nombre: datos.nombre,
        limite: datos.limite,
        divisa: datos.divisa,
        imagen: datos.imagen || null,
        saldoAhorrado: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
    }
    const response = await api.post("/api/ahorro", datos);
    return response.data.meta;
  },

  aportar: async (monto: number): Promise<MetaAhorro> => {
    if (isMockMode()) {
      return {
        id: 1,
        cuentaId: 123,
        nombre: "Mi Meta de Ahorro (Mock)",
        limite: 10000.00,
        divisa: "USD",
        imagen: null,
        saldoAhorrado: 2500.00 + monto,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
    }
    const response = await api.post("/api/ahorro/aportar", { monto });
    return response.data.meta;
  },

  retirar: async (monto: number): Promise<MetaAhorro> => {
    if (isMockMode()) {
      return {
        id: 1,
        cuentaId: 123,
        nombre: "Mi Meta de Ahorro (Mock)",
        limite: 10000.00,
        divisa: "USD",
        imagen: null,
        saldoAhorrado: Math.max(0, 2500.00 - monto),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
    }
    const response = await api.post("/api/ahorro/retirar", { monto });
    return response.data.meta;
  },

  eliminarMeta: async (): Promise<void> => {
    if (isMockMode()) return;
    await api.delete("/api/ahorro");
  },

  getSaldoDisponible: async (divisa: string): Promise<number> => {
    if (isMockMode()) {
      const mockBalances = {
        usd: 1250.00,
        eur: 1150.00,
        ars: 1125000.00,
        cop: 4750000.00
      };
      return mockBalances[divisa.toLowerCase() as keyof typeof mockBalances] || 1250.00;
    }
    const response = await api.get("/api/wallet/desglose");
    const { desglose } = response.data;
    const campo = divisa.toLowerCase() as "usd" | "eur" | "ars" | "cop";
    return Number(desglose[campo]);
  },
};
