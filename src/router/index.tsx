import React from 'react'
import { createBrowserRouter, Navigate } from 'react-router-dom'
import { ROUTES } from '../constants/routes'
import Auth from '../pages/Auth'
import Dashboard from '../pages/Dashboard'
import Movimientos from '../pages/Movimientos'
import ProtectedRoute from './ProtectedRoute'
import Transferencias from '../pages/Transferencias/transferencias'
import Perfil from '../pages/Perfil'
import Deposito from '../pages/Deposito/Deposito'
import { TasaCambio } from '../pages/tasasDeCambio/tasasDeCambio'

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
        element: <Transferencias />,
      },
      {
        path: ROUTES.DEPOSIT,
        element: <Deposito />,
      },
      {
        path: ROUTES.EXCHANGE,
        element: <TasaCambio />,
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
        element: <Perfil />,
      },
    ],
  },
])