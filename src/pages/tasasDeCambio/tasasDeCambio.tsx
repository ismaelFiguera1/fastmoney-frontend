import React, { useState, useEffect } from 'react';
import { estilos, infoDivisas } from '../tasasDeCambio/tasasEstilos';
import { walletService } from '../../services/wallet.service';
import { useAuthStore } from '../../store/auth.store';

// Tipado estricto para las 4 divisas requeridas
type CodigoDivisa = 'USD' | 'ARS' | 'COP' | 'EUR';

interface TasaInfo {
  codigo: CodigoDivisa;
  valor: number;
  cambio24h: number; // Porcentaje simulado de variación
}

// cambio24h es simulado — la API no lo provee
const CAMBIO_24H_SIMULADO: Record<CodigoDivisa, number> = {
  USD: 0.15,
  EUR: -0.22,
  COP: 1.45,
  ARS: -3.10,
};

export const TasaCambio: React.FC = () => {
  const { user } = useAuthStore();
  const monedaBase = (user?.moneda || 'USD').toUpperCase();

  const [tasas, setTasas] = useState<TasaInfo[]>([
    { codigo: 'USD', valor: 1,    cambio24h: 0.15  },
    { codigo: 'EUR', valor: 0.92, cambio24h: -0.22 },
    { codigo: 'COP', valor: 4000, cambio24h: 1.45  },
    { codigo: 'ARS', valor: 900,  cambio24h: -3.10 },
  ]);
  const [matriz, setMatriz] = useState<Record<string, Record<string, number>>>({});

  // Carga las tasas reales del backend al montar el componente
  useEffect(() => {
    walletService.getTasas().then((datos) => {
      const baseRates = datos.tasas[monedaBase] || {};
      setTasas([
        { codigo: 'USD', valor: baseRates.USD ?? 1,    cambio24h: CAMBIO_24H_SIMULADO.USD },
        { codigo: 'EUR', valor: baseRates.EUR ?? 0.92, cambio24h: CAMBIO_24H_SIMULADO.EUR },
        { codigo: 'COP', valor: baseRates.COP ?? 4000, cambio24h: CAMBIO_24H_SIMULADO.COP },
        { codigo: 'ARS', valor: baseRates.ARS ?? 900,  cambio24h: CAMBIO_24H_SIMULADO.ARS },
      ]);
      setMatriz(datos.tasas);
    }).catch(() => {
      // Si falla la API, los valores hardcodeados del estado inicial se mantienen
    });
  }, [monedaBase]);

  // Estados para la calculadora/conversor
  const [cantidad, setCantidad] = useState<number>(100);
  const [deDivisa, setDeDivisa] = useState<CodigoDivisa>(monedaBase as CodigoDivisa);
  const [aDivisa, setADivisa] = useState<CodigoDivisa>('COP');
  const [resultado, setResultado] = useState<number>(0);

  // Lógica de conversión dinámica — usa la tasa directa de la matriz
  useEffect(() => {
    const tasaDirecta = matriz[deDivisa]?.[aDivisa];
    if (tasaDirecta !== undefined) {
      setResultado(cantidad * tasaDirecta);
    }
  }, [cantidad, deDivisa, aDivisa, matriz]);

  // Manejador para efectos visuales hover sin CSS externo
  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.transform = 'translateY(-5px)';
    e.currentTarget.style.boxShadow = '0 12px 40px 0 rgba(103, 58, 183, 0.3)';
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.transform = 'translateY(0)';
    e.currentTarget.style.boxShadow = '0 8px 32px 0 rgba(0, 0, 0, 0.2)';
  };

  return (
    <div style={estilos.contenedorPrincipal}>
      <h1 style={estilos.titulo}>Monitoreo de Divisas</h1>
      <p style={estilos.subtitulo}>Tasas de cambio en tiempo real y conversión directa</p>

      {/* Grid de Tarjetas de Divisas */}
      <div style={estilos.dashboardGrid}>
        {tasas.map((tasa) => {
          const info = infoDivisas[tasa.codigo];
          const esPositivo = tasa.cambio24h >= 0;

          return (
            <div
              key={tasa.codigo}
              style={estilos.tarjetaDivisa}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <div style={estilos.headerTarjeta}>
                <div>
                  <div style={estilos.codigoDivisa}>{tasa.codigo}</div>
                  <div style={estilos.nombreDivisa}>{info.nombre}</div>
                </div>
                <div style={{ fontSize: '1.8rem', opacity: 0.7 }}>
                  {info.simbolo}
                </div>
              </div>

              <div style={estilos.valorDivisa}>
                {info.simbolo} {tasa.valor.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: tasa.valor < 0.01 ? 6 : 2 })}
              </div>

              <div style={{
                ...estilos.cambioPorcentaje,
                color: esPositivo ? '#00e676' : '#ff4081'
              }}>
                {esPositivo ? '▲' : '▼'} {Math.abs(tasa.cambio24h)}% (24h)
              </div>
            </div>
          );
        })}
      </div>

      {/* Panel Conversor */}
      <div style={estilos.seccionConversor}>
        <h2 style={estilos.tituloConversor}>Calculadora de Cambio</h2>
        
        <div style={estilos.grupoInput}>
          <label style={estilos.label}>Cantidad</label>
          <input
            type="number"
            value={cantidad}
            onChange={(e) => setCantidad(Number(e.target.value))}
            style={estilos.input}
            min="0"
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <div style={estilos.grupoInput}>
            <label style={estilos.label}>De</label>
            <select
              value={deDivisa}
              onChange={(e) => setDeDivisa(e.target.value as CodigoDivisa)}
              style={estilos.select}
            >
              {Object.keys(infoDivisas).map((code) => (
                <option key={code} value={code}>{code}</option>
              ))}
            </select>
          </div>

          <div style={estilos.grupoInput}>
            <label style={estilos.label}>A</label>
            <select
              value={aDivisa}
              onChange={(e) => setADivisa(e.target.value as CodigoDivisa)}
              style={estilos.select}
            >
              {Object.keys(infoDivisas).map((code) => (
                <option key={code} value={code}>{code}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Bloque de Resultado */}
        <div style={estilos.resultadoContenedor}>
          <div style={{ ...estilos.label, marginBottom: '4px' }}>Resultado estimado</div>
          <div style={estilos.resultadoTexto}>
            {infoDivisas[aDivisa].simbolo} {resultado.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} {aDivisa}
          </div>
        </div>
      </div>
    </div>
  );
};