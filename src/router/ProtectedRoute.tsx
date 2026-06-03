import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { ROUTES } from '../constants/routes'
import { useAuthStore } from '../store/auth.store'

function ProtectedRoute() {
  const { token } = useAuthStore()

  if (!token) {
    return <Navigate to={ROUTES.LOGIN} replace />
  }

  return <Outlet />
}

export default ProtectedRoute
