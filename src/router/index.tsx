import React from 'react'
import { createBrowserRouter, Navigate } from 'react-router-dom'
import { ROUTES } from '../constants/routes'
import Auth from '../pages/Auth'
import Dashboard from '../pages/Dashboard'
import Movimientos from '../pages/Movimientos'
import ProtectedRoute from './ProtectedRoute'

export const router = createBrowserRouter([
  {
    path: ROUTES.LOGIN,
    element: <Auth />,
  },
  {
    path: ROUTES.REGISTER,
    element: <Auth />,
  },
  {
    path: '/',
    element: <ProtectedRoute />,
    children: [
      {
        index: true,
        element: <Navigate to={ROUTES.DASHBOARD} replace />,
      },
      {
        path: ROUTES.DASHBOARD,
        element: <Dashboard />,
      },
      {
        path: ROUTES.TRANSFER,
        element: <div className="p-8"><h1 className="text-2xl font-bold">Transferencias</h1></div>,
      },
      {
        path: ROUTES.DEPOSIT,
        element: <div className="p-8"><h1 className="text-2xl font-bold">Depósitos</h1></div>,
      },
      {
        path: ROUTES.EXCHANGE,
        element: <div className="p-8"><h1 className="text-2xl font-bold">Tasas de Cambio</h1></div>,
      },
      {
        path: ROUTES.HISTORY,
        element: <Movimientos />,
      },
      {
        path: ROUTES.SAVINGS,
        element: <div className="p-8"><h1 className="text-2xl font-bold">Ahorros</h1></div>,
      },
      {
        path: ROUTES.PROFILE,
        element: <div className="p-8"><h1 className="text-2xl font-bold">Mi Perfil</h1></div>,
      },
    ],
  },
])