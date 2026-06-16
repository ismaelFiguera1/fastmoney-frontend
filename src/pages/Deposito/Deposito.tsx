import React, { useState } from 'react';
import { styles } from './depositoEstilos';
import { depositoService } from '../../services/deposito.service';

type Moneda = 'USD' | 'EUR' | 'ARS' | 'COP';

interface Notificacion {
  id: number;
  tipo: 'DEPOSITO' | 'TRANSFERENCIA';
  titulo: string;
  mensaje: string;
  nombre: string;
  monto: number;
  moneda: Moneda;
  createdAt: string;
}

const simbolos: Record<Moneda, string> = {
  USD: '$',
  EUR: '€',
  ARS: '$',
  COP: '$',
};

function Deposito() {
  const [step, setStep] = useState<'form' | 'confirm'>('form');
  const [moneda, setMoneda] = useState<Moneda>('USD');
  const [monto, setMonto] = useState('');
  const [focusInput, setFocusInput] = useState(false);
  const [hoverBtn, setHoverBtn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const simbolo = simbolos[moneda];
  const esInvalido = !monto || parseFloat(monto) <= 0;

  const obtenerMontoFormateado = (valorStr: string) => {
    const valor = parseFloat(valorStr);
    if (isNaN(valor)) return '0,00';
    return new Intl.NumberFormat('es-CO', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(valor);
  };

  const handleConfirmar = async () => {
    if (esInvalido) return;
    setLoading(true);
    setError(null);
    try {
      await depositoService.depositar(moneda, parseFloat(monto));

      const nuevaNotificacion: Notificacion = {
        id: Date.now(),
        tipo: 'DEPOSITO',
        titulo: '¡Depósito exitoso!',
        mensaje: `Has depositado ${obtenerMontoFormateado(monto)} a la moneda ${moneda.toLowerCase()}`,
        nombre: 'FastMoney System',
        monto: parseFloat(monto),
        moneda: moneda,
        createdAt: 'Hace 1 min',
      };
      const actuales = JSON.parse(localStorage.getItem('fastmoney_notificaciones') || '[]');
      localStorage.setItem('fastmoney_notificaciones', JSON.stringify([nuevaNotificacion, ...actuales]));

      setStep('confirm');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error al realizar el depósito');
    } finally {
      setLoading(false);
    }
  };

  const handleNuevo = () => {
    setStep('form');
    setMonto('');
    setMoneda('USD');
    setError(null);
  };

  return (
    <div style={styles.background}>
      <div style={styles.glow1}></div>
      <div style={styles.glow2}></div>

      <div style={{ ...styles.particle, top: '15%', left: '10%' }}></div>
      <div style={{ ...styles.particle, top: '70%', left: '18%' }}></div>

      <div style={styles.container}>
        {step === 'confirm' ? (
          <div style={styles.cardCenter}>
            <div style={styles.checkCircle}>
              <svg style={styles.checkIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
              </svg>
            </div>

            <h2 style={styles.confirmTitulo}>¡Depósito exitoso!</h2>
            <p style={styles.confirmSubtitulo}>Tu saldo ha sido actualizado</p>

            <div style={styles.montoBox}>
              <p style={styles.montoLabel}>Monto depositado</p>
              <p style={styles.montoValor}>
                {simbolo}{obtenerMontoFormateado(monto)} <span style={styles.montoMoneda}>{moneda}</span>
              </p>
            </div>

            <div style={styles.saldoBox}>
              <p style={styles.saldoLabel}>Se acreditó en tu cuenta</p>
              <p style={styles.saldoValor}>Saldo {moneda} actualizado ✓</p>
            </div>

            <button
              onClick={handleNuevo}
              onMouseEnter={() => setHoverBtn(true)}
              onMouseLeave={() => setHoverBtn(false)}
              style={{
                ...styles.btnNuevo,
                backgroundColor: hoverBtn ? 'rgba(255, 255, 255, 0.08)' : 'rgba(255, 255, 255, 0.03)',
              }}
            >
              Nuevo depósito
            </button>
          </div>
        ) : (
          <div style={styles.card}>
            <h1 style={styles.formTitulo}>Depositar fondos</h1>
            <p style={styles.formSubtitulo}>Elige la moneda e ingresa el monto a acreditar.</p>

            <div style={styles.montoWrapper}>
              <label style={styles.label}>Moneda y monto</label>
              <div style={styles.montoRow}>
                <select
                  value={moneda}
                  onChange={(e) => setMoneda(e.target.value as Moneda)}
                  style={styles.select}
                >
                  <option value="USD">🇺🇸 USD</option>
                  <option value="EUR">🇪🇺 EUR</option>
                  <option value="ARS">🇦🇷 ARS</option>
                  <option value="COP">🇨🇴 COP</option>
                </select>

                <div style={{
                  ...styles.montoInputWrapper,
                  border: focusInput ? '1px solid #A855F7' : '1px solid rgba(255, 255, 255, 0.1)',
                  boxShadow: focusInput ? '0 0 14px rgba(168, 85, 247, 0.3)' : 'none',
                }}>
                  <span style={styles.montoSymbol}>{simbolo}</span>
                  <input
                    type="number"
                    value={monto}
                    onChange={(e) => setMonto(e.target.value)}
                    onFocus={() => setFocusInput(true)}
                    onBlur={() => setFocusInput(false)}
                    placeholder="0.00"
                    style={styles.inputMonto}
                  />
                </div>
              </div>
            </div>

            {error && (
              <p style={{ color: '#f87171', fontSize: '0.875rem', fontWeight: 'bold', marginBottom: '1rem', textAlign: 'center' }}>
                {error}
              </p>
            )}

            <button
              onClick={handleConfirmar}
              disabled={esInvalido || loading}
              onMouseEnter={() => setHoverBtn(true)}
              onMouseLeave={() => setHoverBtn(false)}
              style={{
                ...styles.btnDepositar,
                opacity: esInvalido || loading ? 0.4 : 1,
                cursor: esInvalido || loading ? 'not-allowed' : 'pointer',
                background: hoverBtn && !esInvalido && !loading
                  ? 'linear-gradient(135deg, #8B5CF6 0%, #5850EC 100%)'
                  : 'linear-gradient(135deg, #7C3AED 0%, #4F46E5 100%)',
              }}
            >
              {loading ? 'Procesando...' : 'Depositar'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Deposito;
