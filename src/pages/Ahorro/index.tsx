import React, { useState, useEffect } from 'react'
import { useAuthStore } from '../../store/auth.store'
import { walletService } from '../../services/wallet.service'
import { styles } from './ahorrosEstilos'

type Moneda = 'USD' | 'EUR' | 'ARS' | 'COP'

const simbolos: Record<Moneda, string> = {
  USD: '$',
  EUR: '€',
  ARS: '$',
  COP: '$',
}

interface SavingsGoal {
  nombre: string
  limite: number
  divisa: Moneda
  imagen: string | null
  saldoAhorrado: number
}

function Ahorro() {
  const { user, updateUser } = useAuthStore()
  
  // Estados para datos de saldo del usuario
  const [disponible, setDisponible] = useState<number>(0)
  const [walletLoading, setWalletLoading] = useState<boolean>(true)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  
  // Estados del Formulario de Creación
  const [nombre, setNombre] = useState('')
  const [limite, setLimite] = useState('')
  const [divisa, setDivisa] = useState<Moneda>((user?.moneda || 'USD').toUpperCase() as Moneda)
  const [imagen, setImagen] = useState('')

  // Estados de Modales Financieros
  const [modalType, setModalType] = useState<'ahorrar' | 'retirar' | null>(null)
  const [montoAccion, setMontoAccion] = useState('')
  const [modalError, setModalError] = useState<string | null>(null)
  
  // Estado para menú de opciones (tres puntos)
  const [showOptions, setShowOptions] = useState(false)

  const activeGoal: SavingsGoal | null = user?.savingsGoal || null

  // Cargar saldo real disponible para la moneda de la meta (o la base)
  const fetchBalance = async () => {
    try {
      setWalletLoading(true)
      const moneda = (user?.moneda || 'USD').toUpperCase()
      const balances = await walletService.getBalance(moneda)
      // Filtramos por la moneda base actual
      const activeBalance = balances[0]?.balance || 0
      setDisponible(activeBalance)
    } catch (err) {
      console.error('Error al obtener saldo:', err)
      setErrorMsg('No se pudo cargar el saldo disponible')
    } finally {
      setWalletLoading(false)
    }
  }

  useEffect(() => {
    if (user) {
      fetchBalance()
    }
  }, [user])

  // Manejador para crear meta de ahorro
  const handleCrearMeta = (e: React.FormEvent) => {
    e.preventDefault()
    if (!nombre.trim() || !limite || parseFloat(limite) <= 0) return

    const nuevaMeta: SavingsGoal = {
      nombre: nombre.trim(),
      limite: parseFloat(limite),
      divisa: divisa,
      imagen: imagen.trim() || null,
      saldoAhorrado: 0,
    }

    updateUser({
      savingsGoal: nuevaMeta,
      saldoAhorrado: 0,
      metaAhorro: nuevaMeta.limite,
    })
    
    // Resetear formulario
    setNombre('')
    setLimite('')
    setImagen('')
  }

  // Manejador para eliminar/reiniciar la meta
  const handleEliminarMeta = () => {
    if (!window.confirm('¿Estás seguro de que deseas eliminar tu meta de ahorro actual? Se reembolsarán todos los fondos a tu saldo disponible.')) {
      setShowOptions(false)
      return
    }

    // Reembolsar saldo ahorrado a saldo disponible antes de eliminar
    if (activeGoal && activeGoal.saldoAhorrado > 0) {
      const offsetKey = `wallet_offset_${user?.id}_${activeGoal.divisa}`
      const currentOffset = Number(localStorage.getItem(offsetKey) || 0)
      const newOffset = currentOffset + activeGoal.saldoAhorrado
      localStorage.setItem(offsetKey, newOffset.toString())
    }

    updateUser({
      savingsGoal: undefined,
      saldoAhorrado: undefined,
      metaAhorro: undefined,
    })

    setShowOptions(false)
    fetchBalance()
  }

  // Manejo de Ahorro y Retiro
  const handleConfirmarAccion = async () => {
    if (!montoAccion || parseFloat(montoAccion) <= 0 || !activeGoal) return
    const monto = parseFloat(montoAccion)

    const offsetKey = `wallet_offset_${user?.id}_${activeGoal.divisa}`
    const currentOffset = Number(localStorage.getItem(offsetKey) || 0)

    if (modalType === 'ahorrar') {
      // Validamos saldo disponible suficiente
      if (monto > disponible) {
        setModalError('Saldo disponible insuficiente para transferir a ahorros.')
        return
      }

      // Restamos del balance disponible (offset más negativo)
      const newOffset = currentOffset - monto
      localStorage.setItem(offsetKey, newOffset.toString())

      // Sumamos a la meta de ahorro
      const nuevoSaldoAhorrado = activeGoal.saldoAhorrado + monto
      updateUser({
        savingsGoal: {
          ...activeGoal,
          saldoAhorrado: nuevoSaldoAhorrado,
        },
        saldoAhorrado: nuevoSaldoAhorrado,
      })

    } else if (modalType === 'retirar') {
      // Validamos saldo ahorrado suficiente
      if (monto > activeGoal.saldoAhorrado) {
        setModalError('No tienes suficientes fondos guardados en esta meta.')
        return
      }

      // Sumamos al balance disponible (offset más positivo)
      const newOffset = currentOffset + monto
      localStorage.setItem(offsetKey, newOffset.toString())

      // Restamos de la meta de ahorro
      const nuevoSaldoAhorrado = Math.max(0, activeGoal.saldoAhorrado - monto)
      updateUser({
        savingsGoal: {
          ...activeGoal,
          saldoAhorrado: nuevoSaldoAhorrado,
        },
        saldoAhorrado: nuevoSaldoAhorrado,
      })
    }

    // Cerrar modal y refrescar
    setModalType(null)
    setMontoAccion('')
    setModalError(null)
    await fetchBalance()
  }

  // Cálculos de progreso
  const percent = activeGoal
    ? Math.min(Math.round((activeGoal.saldoAhorrado / activeGoal.limite) * 100), 100)
    : 0

  const simbolo = activeGoal ? simbolos[activeGoal.divisa] : '$'

  return (
    <div className={styles.container}>
      {/* Banner Superior violeta */}
      <div className={styles.bannerHeader} style={styles.bannerHeaderBg}>
        <div>
          <p className={styles.bannerSub}>Mis Ahorros</p>
          <h1 className={styles.bannerTitle}>
            {activeGoal ? 'Gestioná tu meta de ahorro' : 'Comenzá a ahorrar hoy'}
          </h1>
        </div>

        {/* Tres puntos de opciones sólo si hay meta activa */}
        {activeGoal && (
          <div className="relative">
            <button
              onClick={() => setShowOptions(!showOptions)}
              className={styles.optionsBtn}
            >
              <svg className={styles.optionsSvg} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
              </svg>
            </button>
            {showOptions && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setShowOptions(false)}></div>
                <div className={styles.dropdownMenu}>
                  <button onClick={handleEliminarMeta} className={styles.dropdownItem}>
                    <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Eliminar meta de ahorro
                  </button>
                </div>
              </>
            )}
          </div>
        )}
      </div>

      {/* Contenido */}
      <div className={styles.contentWrapper}>
        {activeGoal ? (
          <>
            {/* PANEL DE META ACTIVA */}
            <div className={styles.activeGoalCard}>
              <div className={styles.goalGradientBanner} style={styles.goalGradientBg}>
                {/* Imagen del objetivo si existe */}
                {activeGoal.imagen && (
                  <div className="w-56 h-36 rounded-2xl overflow-hidden mb-4 border-2 border-white/40 shadow-md bg-[#13072e] flex items-center justify-center">
                    <img
                      src={activeGoal.imagen}
                      alt={activeGoal.nombre}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        // Ocultar si la URL no carga
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />
                  </div>
                )}
                <h2 className={styles.goalName}>{activeGoal.nombre}</h2>
                <p className={styles.goalTarget}>
                  Meta: {simbolo}{activeGoal.limite.toLocaleString('es-AR', { minimumFractionDigits: 2 })} {activeGoal.divisa}
                </p>
              </div>

              {/* Dinero Actual Ahorrado */}
              <div className={styles.balanceBox}>
                <p className={styles.balanceLabel}>Dinero Actual Ahorrado</p>
                <h3 className={styles.balanceValue}>
                  {simbolo}{activeGoal.saldoAhorrado.toLocaleString('es-AR', { minimumFractionDigits: 2 })} <span className="text-xl font-bold text-pink-400">{activeGoal.divisa}</span>
                </h3>
              </div>

              {/* Progreso */}
              <div className={styles.progressWrapper}>
                <div className={styles.progressLabels}>
                  <span>Inicio</span>
                  <span>Objetivo</span>
                </div>
                <div className={styles.progressBarTrack}>
                  <div
                    className={styles.progressBarThumb}
                    style={{ width: `${percent}%` }}
                  ></div>
                </div>
                <p className={styles.progressPercent}>{percent}% completado</p>
              </div>

              {/* Acciones */}
              <div className={styles.actionsRow}>
                <button
                  onClick={() => {
                    setModalType('ahorrar');
                    setModalError(null);
                  }}
                  className={styles.btnPrimary}
                >
                  Dinero a ahorrar $
                </button>
                <button
                  onClick={() => {
                    setModalType('retirar');
                    setModalError(null);
                  }}
                  className={styles.btnSecondary}
                >
                  Retirar dinero
                </button>
              </div>
            </div>

            {/* PANEL LATERAL DE DETALLES */}
            <div className={styles.lateralCard}>
              <h4 className={styles.lateralTitle}>Resumen Financiero</h4>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-2.5 border-b border-[#3e246e]/40">
                  <span className="text-xs text-purple-300/60 font-bold uppercase tracking-wider">Saldo Disponible</span>
                  <span className="text-sm font-extrabold text-white">
                    {walletLoading ? 'Cargando...' : `${simbolo}${disponible.toLocaleString('es-AR', { minimumFractionDigits: 2 })} ${activeGoal.divisa}`}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2.5 border-b border-[#3e246e]/40">
                  <span className="text-xs text-purple-300/60 font-bold uppercase tracking-wider">Restante Meta</span>
                  <span className="text-sm font-extrabold text-pink-400">
                    {simbolo}{Math.max(0, activeGoal.limite - activeGoal.saldoAhorrado).toLocaleString('es-AR', { minimumFractionDigits: 2 })} {activeGoal.divisa}
                  </span>
                </div>
              </div>

              {/* Tip o consejo de ahorro */}
              <div className="mt-6 p-4 bg-[#13072e] rounded-2xl border border-[#3b2073]">
                <div className={styles.lateralTip}>
                  <div className={styles.lateralTipText}>
                    💡 <strong>Tip de ahorro:</strong> Definir una meta con un nombre claro e imagen de referencia te ayuda a mantener la constancia y lograr tus metas más rápido.
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          /* FORMULARIO DE CREACIÓN (SI NO TIENE META) */
          <div className="col-span-12">
            <div className={styles.formCard}>
              <h2 className={styles.formTitle}>Definir meta de ahorro</h2>
              <p className={styles.formSubtitulo}>
                Creá una meta personalizada para apartar fondos. Se descontarán de tu saldo disponible.
              </p>

              <form onSubmit={handleCrearMeta}>
                <div className={styles.formGroup}>
                  <label className={styles.label}>¿Qué quieres alcanzar?</label>
                  <input
                    type="text"
                    required
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    placeholder="Ej. Mi Moto, Vacaciones en Brasil, Auto"
                    className={styles.input}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="flex flex-col">
                    <label className={styles.label}>Meta a alcanzar (Monto)</label>
                    <input
                      type="number"
                      required
                      min="0.01"
                      step="0.01"
                      value={limite}
                      onChange={(e) => setLimite(e.target.value)}
                      placeholder="0.00"
                      className={styles.input}
                    />
                  </div>

                  <div className="flex flex-col">
                    <label className={styles.label}>Divisa de ahorro</label>
                    <div className={styles.selectWrapper}>
                      <select
                        value={divisa}
                        onChange={(e) => setDivisa(e.target.value as Moneda)}
                        className={styles.select}
                      >
                        <option value="USD">🇺🇸 USD</option>
                        <option value="EUR">🇪🇺 EUR</option>
                        <option value="ARS">🇦🇷 ARS</option>
                        <option value="COP">🇨🇴 COP</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Imagen de referencia (URL opcional)</label>
                  <input
                    type="url"
                    value={imagen}
                    onChange={(e) => setImagen(e.target.value)}
                    placeholder="https://ejemplo.com/moto.jpg"
                    className={styles.input}
                  />
                </div>

                <button type="submit" className={styles.btnSubmit}>
                  Iniciar Meta de Ahorro
                </button>
              </form>
            </div>
          </div>
        )}
      </div>

      {/* MODAL DE DEPOSITAR / RETIRAR AHORRO */}
      {modalType && activeGoal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalCard}>
            <h3 className={styles.modalTitle}>
              {modalType === 'ahorrar' ? 'Dinero a ahorrar' : 'Retirar dinero ahorrado'}
            </h3>
            <p className={styles.modalDesc}>
              {modalType === 'ahorrar'
                ? `Ingresá el monto que vas a transferir desde tu saldo disponible a tu meta: ${activeGoal.nombre}.`
                : `Ingresá el monto que vas a retirar de tus ahorros para devolverlo a tu saldo disponible.`}
            </p>

            <div className={styles.modalInputWrapper}>
              <span className={styles.modalSymbol}>{simbolo}</span>
              <input
                type="number"
                required
                min="0.01"
                step="0.01"
                placeholder="0.00"
                value={montoAccion}
                onChange={(e) => {
                  setMontoAccion(e.target.value);
                  setModalError(null);
                }}
                className={styles.modalInput}
                autoFocus
              />
            </div>

            {modalError && (
              <p className="text-xs font-bold text-rose-400 mb-4 text-center">{modalError}</p>
            )}

            <div className={styles.modalActions}>
              <button
                onClick={() => {
                  setModalType(null);
                  setMontoAccion('');
                  setModalError(null);
                }}
                className={styles.modalBtnCancel}
              >
                Cancelar
              </button>
              <button onClick={handleConfirmarAccion} className={styles.modalBtnConfirm}>
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Ahorro
