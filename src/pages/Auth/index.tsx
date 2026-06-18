import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { authService } from '../../services/auth.service'
import { useAuthStore } from '../../store/auth.store'
import { ROUTES } from '../../constants/routes'
import { styles } from './authEstilos'


function Auth() {
  const navigate = useNavigate()
  const { setAuth } = useAuthStore()

  const [isLogin, setIsLogin] = useState(true)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [form, setForm] = useState({
    name: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    moneda: 'USD',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setError(null)
  }

  const handleLogin = async () => {
    if (!form.email || !form.password) return setError('Completá todos los campos')
    if (form.password.length < 8) return setError('La contraseña debe tener al menos 8 caracteres')
    try {
      setLoading(true)
      
      // BYPASS DE DESARROLLO (Prueba sin Backend)
      if (form.email === 'test@email.com') {
        const mockUser = {
          id: 'mock-user-123',
          name: 'Juanda',
          lastName: 'Pérez',
          email: 'test@email.com',
          moneda: 'USD',
          saldo: 1250.00,
          saldoAhorrado: 2500.00,
          metaAhorro: 10000.00,
          movimientos: [] // Si está vacío se mostrarán movimientos de prueba, si tiene datos mostrará los reales
        }
        setAuth('mock-token-development-only', mockUser)
        navigate(ROUTES.DASHBOARD)
        return
      }

      const data = await authService.login(form.email, form.password)
      setAuth(data.token, data.user)
      navigate(ROUTES.DASHBOARD)
    } catch (err: any) {
      setError(
        err.response?.data?.message || 
        'Error al iniciar sesión. Tip: podés usar "test@email.com" para entrar en modo prueba sin backend.'
      )
    } finally {
      setLoading(false)
    }
  }

  const handleRegister = async () => {
    if (!form.name || !form.lastName || !form.email || !form.password || !form.confirmPassword || !form.moneda)
      return setError('Completá todos los campos')
    if (form.password.length < 8)
      return setError('La contraseña debe tener al menos 8 caracteres')
    if (form.password !== form.confirmPassword)
      return setError('Las contraseñas no coinciden')
    try {
      setLoading(true)
      await authService.register(form.name, form.lastName, form.email, form.password, form.moneda)
      setIsLogin(true)
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error al registrarse')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.container}>

      {/* Panel izquierdo */}
      <div className={styles.leftPanel} style={styles.leftPanelBg}>

        <div className={styles.logoWrapper}>
          <img src="/logo.svg" alt="FastMoney Logo" className="w-9 h-9 object-contain" />
          <span className={styles.logoText}>FastMoney</span>
        </div>

        <div>
          <h2 className={styles.mainTitle}>
            Mové tu plata<br />sin <span className={styles.titleHighlight} style={styles.limitSpan}>límites</span>
          </h2>
          <p className={styles.subtitle}>
            Enviá, recibí e intercambiá divisas al instante desde cualquier dispositivo.
          </p>
        </div>

        <div className={styles.featureList}>
          {[
            { icon: '🔄', title: 'Swap instantáneo', sub: 'USD, EUR, COP, ARS' },
            { icon: '📤', title: 'Transferencias rápidas', sub: 'Sin costos ocultos' },
            { icon: '📧', title: 'Confirmación por email', sub: 'Cada operación notificada' },
          ].map((f) => (
            <div key={f.title} className={styles.featureCard} style={styles.featureCardBg}>
              <div className={styles.featureIcon} style={styles.logoBg}>
                <span>{f.icon}</span>
              </div>
              <div>
                <p className={styles.featureTitle}>{f.title}</p>
                <p className={styles.featureSub}>{f.sub}</p>
              </div>
            </div>
          ))}
        </div>

        <div>
          <p className={styles.currenciesLabel}>Monedas</p>
          <div className={styles.currenciesList}>
            {['🇺🇸 USD', '🇪🇺 EUR', '🇨🇴 COP', '🇦🇷 ARS'].map((c) => (
              <span key={c} className={styles.currencyBadge} style={styles.currencyBadgeBg}>
                {c}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Panel derecho — formulario */}
      <div className={styles.rightPanel}>

        {/* Toggle */}
        <div className={styles.toggleContainer}>
          <button
            onClick={() => { setIsLogin(true); setError(null) }}
            className={styles.toggleButton(isLogin)}>
            Iniciar sesión
          </button>
          <button
            onClick={() => { setIsLogin(false); setError(null) }}
            className={styles.toggleButton(!isLogin)}>
            Crear cuenta
          </button>
        </div>

        {/* Status */}
        <div className={styles.statusBadge}>
          <div className={styles.statusDot}></div>
          <span className={styles.statusText}>Plataforma operativa</span>
        </div>

        <h1 className={styles.formTitle}>
          {isLogin ? 'Bienvenido de nuevo' : 'Creá tu cuenta'}
        </h1>
        <p className={styles.formSub}>
          {isLogin ? 'Ingresá a tu billetera' : 'Es gratis y tarda menos de un minuto'}
        </p>

        {/* Error */}
        {error && (
          <div className={styles.errorBox}>
            {error}
          </div>
        )}

        {/* Campos register extra */}
        {!isLogin && (
          <div className={styles.inputRow}>
            <div>
              <label className={styles.label}>Nombre</label>
              <input name="name" value={form.name} onChange={handleChange}
                className={styles.input}
                placeholder="Juan" />
            </div>
            <div>
              <label className={styles.label}>Apellido</label>
              <input name="lastName" value={form.lastName} onChange={handleChange}
                className={styles.input}
                placeholder="Pérez" />
            </div>
          </div>
        )}

        {/* Email */}
        <div className={styles.inputContainer}>
          <label className={styles.label}>Email</label>
          <input name="email" type="email" value={form.email} onChange={handleChange}
            className={styles.input}
            placeholder="tu@email.com" />
        </div>

        {/* Password */}
        <div className={styles.inputContainer}>
          <label className={styles.label}>Contraseña</label>
          <input name="password" type="password" value={form.password} onChange={handleChange}
            className={styles.input}
            placeholder="••••••••" />
        </div>

        {/* Confirm password */}
        {!isLogin && (
          <div className={styles.inputContainerMargin}>
            <label className={styles.label}>Confirmar contraseña</label>
            <input name="confirmPassword" type="password" value={form.confirmPassword} onChange={handleChange}
              className={styles.input}
              placeholder="Repetí tu contraseña" />
          </div>
        )}

        {/* Selección de Divisa Principal */}
        {!isLogin && (
          <div className={styles.inputContainerMargin}>
            <label className={styles.label}>Moneda Principal</label>
            <div className={styles.selectWrapper}>
              <select name="moneda" value={form.moneda} onChange={handleChange}
                className={styles.select}>
                <option value="USD">🇺🇸 USD (Dólar Estadounidense)</option>
                <option value="EUR">🇪🇺 EUR (Euro)</option>
                <option value="COP">🇨🇴 COP (Peso Colombiano)</option>
                <option value="ARS">🇦🇷 ARS (Peso Argentino)</option>
              </select>
              <div className={styles.selectIconWrapper}>
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                </svg>
              </div>
            </div>
          </div>
        )}

        {/* Forgot */}
        {isLogin && (
          <div className={styles.forgotContainer}>
            <a href="#" className={styles.forgotLink}>¿Olvidaste tu contraseña?</a>
          </div>
        )}

        {/* Submit */}
        <button
          onClick={isLogin ? handleLogin : handleRegister}
          disabled={loading}
          className={styles.submitBtn}
          style={styles.submitBtnBg}>
          {loading ? 'Cargando...' : isLogin ? 'Ingresar a FastMoney' : 'Crear cuenta gratis'}
        </button>

      </div>
    </div>
  )
}

export default Auth