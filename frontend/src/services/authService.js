// src/services/authService.js
import api from './api'

export const authService = {
  // Kayıt ol
  register: async (userData) => {
    const response = await api.post('/auth/register', userData)
    return response.data
  },

  // Giriş yap
  login: async (credentials) => {
    const response = await api.post('/auth/login', credentials)
    if (response.data.success) {
      localStorage.setItem('token', response.data.data.token)
      localStorage.setItem('user', JSON.stringify(response.data.data.user))
    }
    return response.data
  },

  // Çıkış yap
  logout: () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  },

  // Profil bilgilerini getir
  getProfile: async () => {
    const response = await api.get('/auth/me')
    return response.data
  },

  // Profil güncelle
  updateProfile: async (userData) => {
    const response = await api.put('/auth/profile', userData)
    return response.data
  },

  // Profil fotoğrafı yükle
  uploadAvatar: async (file) => {
    const formData = new FormData()
    formData.append('avatar', file)
    
    const response = await api.post('/auth/upload-avatar', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return response.data
  },

  // Token'dan kullanıcı bilgilerini getir
  getCurrentUser: () => {
    const userStr = localStorage.getItem('user')
    return userStr ? JSON.parse(userStr) : null
  },

  // Token kontrolü
  isAuthenticated: () => {
    return !!localStorage.getItem('token')
  }
}
