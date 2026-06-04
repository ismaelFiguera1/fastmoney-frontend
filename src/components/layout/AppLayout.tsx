import React, { useState } from 'react'
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuthStore } from '../../store/auth.store'
import { ROUTES } from '../../constants/routes'

function AppLayout() {
  const { user, logout } = useAuthStore()
  const navigate = useNavigate()
  const location = useLocation()
  const [showProfileMenu, setShowProfileMenu] = useState(false)

  const handleLogout = () => {
    logout()
    navigate(ROUTES.LOGIN)
  }

  // Elementos del menú lateral
  const menuItems = [
    {
      name: 'Inicio',
      path: ROUTES.DASHBOARD,
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      )
    },
    {
      name: 'Movimientos',
      path: ROUTES.HISTORY,
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" />
        </svg>
      )
    },
    {
      name: 'Transferir',
      path: ROUTES.TRANSFER,
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
        </svg>
      )
    },
    {
      name: 'Tasas',
      path: ROUTES.EXCHANGE,
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
        </svg>
      )
    },
    {
      name: 'Ahorros',
      path: ROUTES.SAVINGS,
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      name: 'Perfil',
      path: ROUTES.PROFILE,
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      )
    }
  ]

  const userName = user?.name || user?.nombre || 'Usuario'
  const userLastName = user?.lastName || ''
  const userEmail = user?.email || 'usuario@fastmoney.com'
  const userInitial = userName.charAt(0).toUpperCase()

  return (
    <div className="flex h-screen bg-[#F9FAFB] font-sans overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-100 flex flex-col justify-between flex-shrink-0 z-20">
        <div className="p-6">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-purple-600">
              <span className="text-white text-lg font-bold">⚡</span>
            </div>
            <span className="text-purple-900 font-extrabold text-xl tracking-tight">FastMoney</span>
          </div>

          {/* Menú de Navegación */}
          <nav className="space-y-1.5">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? 'bg-purple-50 text-purple-600'
                      : 'text-gray-500 hover:bg-gray-50 hover:text-gray-800'
                  }`}
                >
                  <span className={isActive ? 'text-purple-600' : 'text-gray-400'}>
                    {item.icon}
                  </span>
                  {item.name}
                </Link>
              )
            })}
          </nav>
        </div>

        {/* Perfil en la parte inferior con menú desplegable */}
        <div className="p-4 border-t border-gray-50 relative">
          {showProfileMenu && (
            <div className="absolute bottom-18 left-4 right-4 bg-white border border-gray-100 rounded-2xl p-2.5 shadow-xl z-30 transition-all duration-200">
              <div className="px-3 py-2 border-b border-gray-50 mb-1">
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Sesión activa</p>
                <p className="text-sm font-bold text-gray-800 mt-0.5">{userName} {userLastName}</p>
                <p className="text-xs text-gray-500 truncate">{userEmail}</p>
              </div>
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm font-semibold text-red-600 hover:bg-red-50 transition-colors text-left cursor-pointer"
              >
                <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Cerrar sesión
              </button>
            </div>
          )}

          {/* Tarjeta clicable del Perfil del Usuario */}
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="w-full flex items-center gap-3 p-3 rounded-2xl hover:bg-gray-50 transition-all border border-transparent hover:border-gray-100 text-left cursor-pointer"
          >
            <div className="w-10 h-10 rounded-full bg-purple-600 text-white font-extrabold flex items-center justify-center shadow-inner">
              {userInitial}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-gray-800 truncate">{userName} {userLastName}</p>
              <p className="text-xs text-gray-400 truncate">{userEmail}</p>
            </div>
            <svg
              className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${showProfileMenu ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      </aside>

      {/* Área del Contenido Principal */}
      <main className="flex-1 overflow-y-auto relative">
        <Outlet />
      </main>
    </div>
  )
}

export default AppLayout