import api from "./api";

export interface Transaction {
  id: string;
  type: "ENVIADO" | "RECIBIDO" | "SWAP" | "DEPOSITO";
  title: string;
  description?: string;
  time: string;
  amount: string;
  status: "Completado" | "Pendiente";
  currency: string;
}

export interface TransferenciaResult {
  mensaje: string;
  detalle: {
    montoEnviado: number;
    comision: number;
    totalDescontado: number;
    moneda: string;
    transferenciaId: string;
    fecha: string;
  };
}

export const transferenciaService = {
  // POST /api/transferencia
  transferir: async (
    codigoCuentaDestino: string,
    moneda: string,
    monto: number
  ): Promise<TransferenciaResult> => {
    const response = await api.post("/api/transferencia", {
      codigoCuentaDestino,
      moneda,
      monto,
    });
    return response.data;
  },

  // GET /api/transferencia/historial
  getTransactionHistory: async (limit?: number): Promise<Transaction[]> => {
    const response = await api.get("/api/transferencia/historial");
    const { transferencias } = response.data;

    const resultado: Transaction[] = transferencias.map((t: any) => {
      const esEnviada = t.tipo === "ENVIADA";
      const nombre = `${t.contraparte.nombre} ${t.contraparte.apellido}`;
      return {
        id: t.id,
        type: esEnviada ? "ENVIADO" : "RECIBIDO",
        title: esEnviada ? `Enviado a ${nombre}` : `Recibido de ${nombre}`,
        time: t.fecha,
        amount: esEnviada ? `-${t.monto.toFixed(2)}` : `+${t.monto.toFixed(2)}`,
        status: "Completado",
        currency: t.moneda,
      };
    });

    return limit ? resultado.slice(0, limit) : resultado;
  },
};
