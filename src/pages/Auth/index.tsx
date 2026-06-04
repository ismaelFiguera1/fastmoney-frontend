import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { authService } from '../../services/auth.service'
import { useAuthStore } from '../../store/auth.store'
import { ROUTES } from '../../constants/routes'

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
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setError(null)
  }

  const handleLogin = async () => {
    if (!form.email || !form.password) return setError('Completá todos los campos')
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
    if (!form.name || !form.lastName || !form.email || !form.password || !form.confirmPassword)
      return setError('Completá todos los campos')
    if (form.password.length < 8)
      return setError('La contraseña debe tener al menos 8 caracteres')
    if (form.password !== form.confirmPassword)
      return setError('Las contraseñas no coinciden')
    try {
      setLoading(true)
      const data = await authService.register(form.name, form.lastName, form.email, form.password)
      setAuth(data.token, data.user)
      navigate(ROUTES.DASHBOARD)
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error al registrarse')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex font-sans">

      {/* Panel izquierdo */}
      <div className="hidden lg:flex w-[44%] flex-col justify-between p-12"
        style={{ background: 'linear-gradient(150deg, #5b21b6 0%, #9333ea 40%, #c026d3 100%)' }}>

        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center"
            style={{ background: 'rgba(255,255,255,0.2)' }}>
            <span className="text-white text-lg">⚡</span>
          </div>
          <span className="text-white font-bold text-lg tracking-tight">FastMoney</span>
        </div>

        <div>
          <h2 className="text-white font-extrabold text-4xl leading-tight mb-4">
            Mové tu plata<br />sin <span className="px-2 rounded-lg" style={{ background: 'rgba(255,255,255,0.22)' }}>límites</span>
          </h2>
          <p className="text-purple-200 text-sm leading-relaxed">
            Enviá, recibí e intercambiá divisas al instante desde cualquier dispositivo.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          {[
            { icon: '🔄', title: 'Swap instantáneo', sub: 'USD, EUR, COP, ARS' },
            { icon: '📤', title: 'Transferencias rápidas', sub: 'Sin costos ocultos' },
            { icon: '📧', title: 'Confirmación por email', sub: 'Cada operación notificada' },
          ].map((f) => (
            <div key={f.title} className="flex items-center gap-3 rounded-xl p-3"
              style={{ background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.18)' }}>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background: 'rgba(255,255,255,0.2)' }}>
                <span>{f.icon}</span>
              </div>
              <div>
                <p className="text-white text-sm font-medium">{f.title}</p>
                <p className="text-purple-200 text-xs">{f.sub}</p>
              </div>
            </div>
          ))}
        </div>

        <div>
          <p className="text-purple-300 text-xs uppercase tracking-widest mb-2">Monedas</p>
          <div className="flex gap-2 flex-wrap">
            {['🇺🇸 USD', '🇪🇺 EUR', '🇨🇴 COP', '🇦🇷 ARS'].map((c) => (
              <span key={c} className="text-white text-xs font-bold px-3 py-1 rounded-full"
                style={{ background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.25)' }}>
                {c}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Panel derecho — formulario */}
      <div className="flex-1 flex flex-col justify-center px-8 lg:px-12 bg-white">

        {/* Toggle */}
        <div className="flex bg-purple-50 rounded-xl p-1 mb-8 border border-purple-100">
          <button
            onClick={() => { setIsLogin(true); setError(null) }}
            className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all ${isLogin ? 'bg-white text-purple-600 shadow-sm' : 'text-gray-400'}`}>
            Iniciar sesión
          </button>
          <button
            onClick={() => { setIsLogin(false); setError(null) }}
            className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all ${!isLogin ? 'bg-white text-purple-600 shadow-sm' : 'text-gray-400'}`}>
            Crear cuenta
          </button>
        </div>

        {/* Status */}
        <div className="inline-flex items-center gap-2 bg-green-50 border border-green-200 rounded-full px-3 py-1 mb-5 w-fit">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <span className="text-green-700 text-xs font-medium">Plataforma operativa</span>
        </div>

        <h1 className="text-2xl font-extrabold text-gray-900 mb-1 tracking-tight">
          {isLogin ? 'Bienvenido de nuevo' : 'Creá tu cuenta'}
        </h1>
        <p className="text-gray-400 text-sm mb-6">
          {isLogin ? 'Ingresá a tu billetera' : 'Es gratis y tarda menos de un minuto'}
        </p>

        {/* Error */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-3 mb-4">
            {error}
          </div>
        )}

        {/* Campos register extra */}
        {!isLogin && (
          <div className="grid grid-cols-2 gap-3 mb-3">
            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Nombre</label>
              <input name="name" value={form.name} onChange={handleChange}
                className="w-full bg-purple-50 border border-purple-100 rounded-xl px-4 py-3 text-sm text-gray-800 outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition"
                placeholder="Juan" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Apellido</label>
              <input name="lastName" value={form.lastName} onChange={handleChange}
                className="w-full bg-purple-50 border border-purple-100 rounded-xl px-4 py-3 text-sm text-gray-800 outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition"
                placeholder="Pérez" />
            </div>
          </div>
        )}

        {/* Email */}
        <div className="mb-3">
          <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Email</label>
          <input name="email" type="email" value={form.email} onChange={handleChange}
            className="w-full bg-purple-50 border border-purple-100 rounded-xl px-4 py-3 text-sm text-gray-800 outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition"
            placeholder="tu@email.com" />
        </div>

        {/* Password */}
        <div className="mb-3">
          <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Contraseña</label>
          <input name="password" type="password" value={form.password} onChange={handleChange}
            className="w-full bg-purple-50 border border-purple-100 rounded-xl px-4 py-3 text-sm text-gray-800 outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition"
            placeholder="••••••••" />
        </div>

        {/* Confirm password */}
        {!isLogin && (
          <div className="mb-4">
            <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Confirmar contraseña</label>
            <input name="confirmPassword" type="password" value={form.confirmPassword} onChange={handleChange}
              className="w-full bg-purple-50 border border-purple-100 rounded-xl px-4 py-3 text-sm text-gray-800 outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition"
              placeholder="Repetí tu contraseña" />
          </div>
        )}

        {/* Forgot */}
        {isLogin && (
          <div className="text-right mb-5 -mt-1">
            <a href="#" className="text-purple-600 text-xs font-semibold hover:underline">¿Olvidaste tu contraseña?</a>
          </div>
        )}

        {/* Submit */}
        <button
          onClick={isLogin ? handleLogin : handleRegister}
          disabled={loading}
          className="w-full text-white font-bold py-3 rounded-xl text-sm transition-all hover:opacity-90 active:scale-95 disabled:opacity-60 cursor-pointer"
          style={{ background: 'linear-gradient(135deg, #9333ea, #c026d3)', boxShadow: '0 4px 18px rgba(147,51,234,0.3)' }}>
          {loading ? 'Cargando...' : isLogin ? 'Ingresar a FastMoney' : 'Crear cuenta gratis'}
        </button>

      </div>
    </div>
  )
}

export default Auth