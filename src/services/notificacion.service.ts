import api from "./api";

export interface NotificacionAPI {
  id: number;
  tipo: string;
  titulo: string;
  mensaje: string;
  leida: boolean;
  createdAt: string;
}

export const notificacionService = {
  getNotificaciones: async (): Promise<NotificacionAPI[]> => {
    const response = await api.get("/api/notificacion");
    return response.data.notificaciones;
  },

  marcarLeidas: async (): Promise<void> => {
    await api.patch("/api/notificacion/leidas");
  },
};