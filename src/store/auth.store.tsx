import { createContext, useContext, useState, ReactNode } from 'react'

export interface UserType {
  id: number | string;
  name?: string;
  lastName?: string;
  nombre?: string;
  email: string;
  moneda: string;
  saldo?: number;
  [key: string]: any;
}

export interface AuthContextType {
  token: string | null;
  user: UserType | null;
  setAuth: (token: string, user: UserType) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('token'))
  const [user, setUser] = useState<UserType | null>(() => {
    const u = localStorage.getItem('user')
    return u ? JSON.parse(u) : null
  })

  const setAuth = (token: string, user: UserType) => {
    localStorage.setItem('token', token)
    localStorage.setItem('user', JSON.stringify(user))
    setToken(token)
    setUser(user)
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setToken(null)
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ token, user, setAuth, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuthStore(): AuthContextType {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuthStore must be used within an AuthProvider')
  }
  return context
}
