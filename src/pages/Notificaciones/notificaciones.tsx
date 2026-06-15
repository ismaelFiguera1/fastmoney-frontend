import React, { useState } from 'react';
import { estilosNotificacion } from '../Notificaciones/notificacionesEstilos';

export type TipoTransaccion = 'deposito' | 'transferencia';
export type TipoMoneda = 'usd' | 'euro' | 'cop' | 'ars';

export interface NotificacionData {
  id: string;
  tipo: TipoTransaccion;
  monto: number;
  moneda: TipoMoneda;
  nombreDestinatario?: string;
  fecha: Date;
  leida: boolean;
}

export const NotificacionesComponent: React.FC = () => {
  const [mostrarDropdown, setMostrarDropdown] = useState<boolean>(false);
  
  const [notificaciones, setNotificaciones] = useState<NotificacionData[]>([
    {
      id: '1',
      tipo: 'deposito',
      monto: 4326.80,
      moneda: 'usd',
      fecha: new Date(Date.now() - 1000 * 60 * 5),
      leida: false,
    },
    {
      id: '2',
      tipo: 'transferencia',
      monto: 865.36,
      moneda: 'usd',
      nombreDestinatario: 'Carlos Mendoza',
      fecha: new Date(Date.now() - 1000 * 60 * 60 * 2),
      leida: false,
    }
  ]);

  const toggleDropdown = () => setMostrarDropdown(!mostrarDropdown);

  const marcarTodasComoLeidas = () => {
    setNotificaciones(prev => prev.map(n => ({ ...n, leida: true })));
  };

  const obtenerMontoFormateado = (monto: number) => {
    return new Intl.NumberFormat('es-CO', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(monto);
  };

  const calcularTiempoRelativo = (fecha: Date): string => {
    const difMs = Date.now() - fecha.getTime();
    const difMinutos = Math.floor(difMs / (1000 * 60));
    const difHoras = Math.floor(difMinutos / 60);

    if (difMinutos < 1) return 'Ahora mismo';
    if (difMinutos < 60) return `Hace ${difMinutos} min`;
    if (difHoras < 24) return `Hace ${difHoras} h`;
    return fecha.toLocaleDateString();
  };

  const numeroSinLeer = notificaciones.filter(n => !n.leida).length;

  return (
    <div style={estilosNotificacion.contenedorCampana}>
      <button onClick={toggleDropdown} style={estilosNotificacion.botonCampana}>
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
          <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
        </svg>
        
        {numeroSinLeer > 0 && (
          <span style={estilosNotificacion.badgeContador}>{numeroSinLeer}</span>
        )}
      </button>

      {mostrarDropdown && (
        <div style={estilosNotificacion.dropdown}>
          <div style={estilosNotificacion.cabeceraDropdown}>
            <h4 style={estilosNotificacion.tituloDropdown}>Notificaciones</h4>
            {numeroSinLeer > 0 && (
              <button onClick={marcarTodasComoLeidas} style={estilosNotificacion.botonLimpiar}>
                Marcar leídas
              </button>
            )}
          </div>
          
          {notificaciones.length === 0 ? (
            <p style={estilosNotificacion.textoVacio}>No tienes movimientos recientes</p>
          ) : (
            <ul style={estilosNotificacion.listaNotificaciones}>
              {notificaciones.map((notif) => (
                <li key={notif.id} style={estilosNotificacion.itemNotificacion}>
                  <div style={estilosNotificacion.contenidoTexto}>
                    
                    {/* Renderizado condicional libre de emojis y con nombre morado */}
                    {notif.tipo === 'deposito' ? (
                      <span>
                        Has depositado {obtenerMontoFormateado(notif.monto)} a la moneda {notif.moneda.toLowerCase()}
                      </span>
                    ) : (
                      <span>
                        Has transferido a{' '}
                        <span style={estilosNotificacion.nombreResaltado}>
                          {notif.nombreDestinatario || 'Usuario'}
                        </span>{' '}
                        con un monto de {obtenerMontoFormateado(notif.monto)} en moneda {notif.moneda.toUpperCase()}
                      </span>
                    )}

                    <span style={estilosNotificacion.tiempoTexto}>
                      {calcularTiempoRelativo(notif.fecha)}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};