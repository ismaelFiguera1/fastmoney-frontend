import api from './api'

export const authService = {
  login: async (email: string, password: string): Promise<any> => {
    const response = await api.post('/api/auth/login', { email, password })
    const data = response.data
    const resultado = {
      token: data.token,
      user: data.usuario,
    }
    return resultado
  },

  register: async (name: string, lastName: string, email: string, password: string): Promise<any> => {
    const body = {
      name: name,
      lastName: lastName,
      email: email,
      password: password,
    }
    const response = await api.post('/api/auth/register', body)
    return response.data
  },
}
