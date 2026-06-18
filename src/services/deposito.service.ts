import api from "./api";

const isMockMode = () => localStorage.getItem('token') === 'mock-token-development-only';

export const depositoService = {
  depositar: async (moneda: string, monto: number): Promise<void> => {
    if (isMockMode()) return;
    await api.post("/api/deposito", { moneda, monto });
  },
};
