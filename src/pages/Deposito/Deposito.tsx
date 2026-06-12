import React, { useState } from 'react'
import { styles } from '../Deposito/DepositoEstilos'

type Moneda = 'USD' | 'EUR' | 'ARS' | 'COP'

const simbolos: Record<Moneda, string> = {
  USD: '$',
  EUR: '€',
  ARS: '$',
  COP: '$',
}

function Deposito() {
  const [step, setStep] = useState<'form' | 'confirm'>('form')
  const [moneda, setMoneda] = useState<Moneda>('USD')
  const [monto, setMonto] = useState('')

  const simbolo = simbolos[moneda]

  const handleConfirmar = () => {
    if (monto && parseFloat(monto) > 0) setStep('confirm')
  }

  const handleNuevo = () => {
    setStep('form')
    setMonto('')
    setMoneda('USD')
  }

  return (
    <div className={styles.container} style={styles.background}>
      {step === 'confirm' ? (
        <div className={styles.cardCenter}>
          <div className={styles.checkCircle}>
            <svg className={styles.checkIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <h2 className={styles.confirmTitulo}>¡Depósito exitoso!</h2>
          <p className={styles.confirmSubtitulo}>Tu saldo ha sido actualizado</p>

          <div className={styles.montoBox}>
            <p className={styles.montoLabel}>Monto depositado</p>
            <p className={styles.montoValor}>
              {simbolo}{monto} <span className={styles.montoMoneda}>{moneda}</span>
            </p>
          </div>

          <div className={styles.saldoBox}>
            <p className={styles.saldoLabel}>Se acreditó en tu cuenta</p>
            <p className={styles.saldoValor}>Saldo {moneda} actualizado ✓</p>
          </div>

          <button onClick={handleNuevo} className={styles.btnNuevo}>
            Nuevo depósito
          </button>
        </div>
      ) : (
        <div className={styles.card}>
          <h1 className={styles.formTitulo}>Depositar fondos</h1>
          <p className={styles.formSubtitulo}>Elige la moneda e ingresa el monto a acreditar.</p>

          <div className={styles.montoWrapper}>
            <label className={styles.label}>Moneda y monto</label>
            <div className={styles.montoRow}>
              <select
                value={moneda}
                onChange={(e) => setMoneda(e.target.value as Moneda)}
                className={styles.select}
              >
                <option value="USD">🇺🇸 USD</option>
                <option value="EUR">🇪🇺 EUR</option>
                <option value="ARS">🇦🇷 ARS</option>
                <option value="COP">🇨🇴 COP</option>
              </select>
              <div className={styles.montoInputWrapper}>
                <span className={styles.montoSymbol}>{simbolo}</span>
                <input
                  type="number"
                  value={monto}
                  onChange={(e) => setMonto(e.target.value)}
                  placeholder="0.00"
                  className={styles.inputMonto}
                />
              </div>
            </div>
          </div>

          <button
            onClick={handleConfirmar}
            disabled={!monto || parseFloat(monto) <= 0}
            className={styles.btnDepositar}
          >
            Depositar
          </button>
        </div>
      )}
    </div>
  )
}

export default Deposito