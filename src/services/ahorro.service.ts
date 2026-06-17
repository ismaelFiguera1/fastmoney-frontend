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

export const ahorroService = {
  getMeta: async (): Promise<MetaAhorro | null> => {
    const response = await api.get("/api/ahorro");
    return response.data.meta;
  },

  crearMeta: async (datos: {
    nombre: string;
    limite: number;
    divisa: string;
    imagen?: string;
  }): Promise<MetaAhorro> => {
    const response = await api.post("/api/ahorro", datos);
    return response.data.meta;
  },

  aportar: async (monto: number): Promise<MetaAhorro> => {
    const response = await api.post("/api/ahorro/aportar", { monto });
    return response.data.meta;
  },

  retirar: async (monto: number): Promise<MetaAhorro> => {
    const response = await api.post("/api/ahorro/retirar", { monto });
    return response.data.meta;
  },

  eliminarMeta: async (): Promise<void> => {
    await api.delete("/api/ahorro");
  },

  getSaldoDisponible: async (divisa: string): Promise<number> => {
    const response = await api.get("/api/wallet/desglose");
    const { desglose } = response.data;
    const campo = divisa.toLowerCase() as "usd" | "eur" | "ars" | "cop";
    return Number(desglose[campo]);
  },
};
