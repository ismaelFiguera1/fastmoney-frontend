import React from 'react'
import { createBrowserRouter, Navigate } from 'react-router-dom'
import { ROUTES } from '../constants/routes'
import Auth from '../pages/Auth'
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
        element: <div>Dashboard</div>,
      },
      {
        path: ROUTES.TRANSFER,
        element: <div>Transfer</div>,
      },
      {
        path: ROUTES.DEPOSIT,
        element: <div>Deposit</div>,
      },
      {
        path: ROUTES.EXCHANGE,
        element: <div>Exchange</div>,
      },
      {
        path: ROUTES.HISTORY,
        element: <div>History</div>,
      },
      {
        path: ROUTES.SAVINGS,
        element: <div>Savings</div>,
      },
      {
        path: ROUTES.PROFILE,
        element: <div>Profile</div>,
      },
    ],
  },
])
