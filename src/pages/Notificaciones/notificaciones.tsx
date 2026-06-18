import React, { useState, useEffect } from "react";
import { notificacionService, NotificacionAPI } from "../../services/notificacion.service";

export function NotificacionesComponent() {
  const [notificaciones, setNotificaciones] = useState<NotificacionAPI[]>([]);
  const [mostrarDropdown, setMostrarDropdown] = useState(false);

  // Carga las notificaciones reales desde el backend
  const cargarNotificaciones = async () => {
    try {
      const data = await notificacionService.getNotificaciones();
      setNotificaciones(data);
    } catch (err) {
      console.error("Error al cargar notificaciones:", err);
    }
  };

  // Carga inicial al montar el componente
  useEffect(() => {
    cargarNotificaciones();
  }, []);

  // Refresca cada vez que se abre el dropdown
  useEffect(() => {
    if (mostrarDropdown) {
      cargarNotificaciones();
    }
  }, [mostrarDropdown]);

  const noLeidas = notificaciones.filter((n) => !n.leida).length;

  const marcarComoLeidas = async () => {
    try {
      await notificacionService.marcarLeidas();
      setNotificaciones((prev) => prev.map((n) => ({ ...n, leida: true })));
    } catch (err) {
      console.error("Error al marcar como leídas:", err);
    }
  };

  // Formatea la fecha relativa simple
  const formatearTiempo = (fecha: string) => {
    const diff = Date.now() - new Date(fecha).getTime();
    const minutos = Math.floor(diff / 60000);
    if (minutos < 1) return "Hace un momento";
    if (minutos < 60) return `Hace ${minutos} min`;
    const horas = Math.floor(minutos / 60);
    if (horas < 24) return `Hace ${horas} h`;
    const dias = Math.floor(horas / 24);
    return `Hace ${dias} d`;
  };

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <button
        onClick={() => setMostrarDropdown(!mostrarDropdown)}
        style={{
          background: "rgba(255, 255, 255, 0.05)",
          border: "none",
          padding: "12px",
          borderRadius: "50%",
          cursor: "pointer",
          color: "#FFF",
          position: "relative",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <svg style={{ width: "22px", height: "22px" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>

        {noLeidas > 0 && (
          <span
            style={{
              position: "absolute",
              top: "-2px",
              right: "-2px",
              backgroundColor: "#EF4444",
              color: "#FFF",
              fontSize: "10px",
              fontWeight: "bold",
              padding: "2px 6px",
              borderRadius: "50%"
            }}
          >
            {noLeidas}
          </span>
        )}
      </button>

      {mostrarDropdown && (
        <div
          style={{
            position: "absolute",
            right: 0,
            top: "50px",
            width: "320px",
            backgroundColor: "#FFFFFF",
            color: "#1E293B",
            borderRadius: "16px",
            padding: "20px",
            boxShadow: "0 20px 25px -5px rgba(0,0,0,0.3), 0 10px 10px -5px rgba(0,0,0,0.04)",
            zIndex: 100,
            fontFamily: "sans-serif"
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px" }}>
            <h4 style={{ margin: 0, fontWeight: "700", fontSize: "15px", color: "#0F172A" }}>Notificaciones</h4>
            <button
              onClick={marcarComoLeidas}
              style={{
                background: "none",
                border: "none",
                color: "#4F46E5",
                cursor: "pointer",
                fontSize: "12px",
                fontWeight: "600"
              }}
            >
              Marcar leídas
            </button>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "12px", maxHeight: "240px", overflowY: "auto" }}>
            {notificaciones.length === 0 ? (
              <p style={{ fontSize: "13px", color: "#64748B", margin: "10px 0", textAlign: "center" }}>
                No tienes notificaciones nuevas
              </p>
            ) : (
              notificaciones.map((notif) => (
                <div
                  key={notif.id}
                  style={{
                    borderBottom: "1px solid #F1F5F9",
                    paddingBottom: "10px",
                    textAlign: "left",
                    opacity: notif.leida ? 0.6 : 1,
                  }}
                >
                  <p style={{ margin: "0 0 4px 0", fontSize: "13px", color: "#334155", lineHeight: "1.4" }}>
                    {notif.mensaje}
                  </p>
                  <span style={{ fontSize: "11px", color: "#94A3B8" }}>
                    {formatearTiempo(notif.createdAt)}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}