import api from "./api";

export const depositoService = {
  depositar: async (moneda: string, monto: number): Promise<void> => {
    await api.post("/api/deposito", { moneda, monto });
  },
};
