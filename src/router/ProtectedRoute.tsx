import React from 'react'
import { Navigate } from 'react-router-dom'
import { ROUTES } from '../constants/routes'
import { useAuthStore } from '../store/auth.store'
import AppLayout from '../components/layout/AppLayout'

function ProtectedRoute() {
  const { token } = useAuthStore()

  if (!token) {
    return <Navigate to={ROUTES.LOGIN} replace />
  }

  return <AppLayout />
}

export default ProtectedRoute