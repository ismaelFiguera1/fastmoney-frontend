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
    nombreDestinatario: string; // ✅ agregar esto
  };
}

export const transferenciaService = {
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

  getTransactionHistory: async (limit?: number): Promise<Transaction[]> => {
    const [resTransferencias, resDepositos] = await Promise.all([
      api.get("/api/transferencia/historial"),
      api.get("/api/deposito/historial"),
    ]);

    const transferencias: Transaction[] = resTransferencias.data.transferencias.map((t: any) => {
      const esEnviada = t.tipo === "ENVIADA";
      const nombre = `${t.contraparte.nombre} ${t.contraparte.apellido}`;
      return {
        id: `transf-${t.id}`,
        type: esEnviada ? "ENVIADO" : "RECIBIDO",
        title: esEnviada ? `Enviado a ${nombre}` : `Recibido de ${nombre}`,
        time: t.fecha,
        amount: esEnviada ? `-${t.monto.toFixed(2)}` : `+${t.monto.toFixed(2)}`,
        status: "Completado",
        currency: t.moneda,
      };
    });

    const depositos: Transaction[] = resDepositos.data.depositos.map((d: any) => ({
      id: `dep-${d.id}`,
      type: "DEPOSITO" as const,
      title: "Depósito",
      time: d.createdAt,
      amount: `+${Number(d.monto).toFixed(2)}`,
      status: "Completado",
      currency: d.moneda,
    }));

    const todas = [...transferencias, ...depositos].sort(
      (a, b) => new Date(b.time).getTime() - new Date(a.time).getTime()
    );

    return limit ? todas.slice(0, limit) : todas;
  },
};
