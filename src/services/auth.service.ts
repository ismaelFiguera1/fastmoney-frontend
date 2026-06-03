import api from './api'

export const authService = {
  login: async (email: string, password: string): Promise<any> => {
    const response = await api.post('/auth/login', { email, password })
    return response.data
  },

  register: async (name: string, lastName: string, email: string, password: string): Promise<any> => {
    const response = await api.post('/auth/register', { name, lastName, email, password })
    return response.data
  },
}
