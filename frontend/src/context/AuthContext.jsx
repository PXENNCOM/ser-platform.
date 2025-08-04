// src/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from 'react'
import { authService } from '../services/authService'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Sayfa yüklendiğinde token kontrolü yap
    const token = localStorage.getItem('token')
    const userData = authService.getCurrentUser()
    
    if (token && userData) {
      setUser(userData)
    }
    setLoading(false)
  }, [])

  const login = async (credentials) => {
    try {
      const result = await authService.login(credentials)
      if (result.success) {
        setUser(result.data.user)
        return { success: true }
      }
      return { success: false, message: result.message }
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.message || 'Giriş sırasında hata oluştu' 
      }
    }
  }

  const register = async (userData) => {
    try {
      const result = await authService.register(userData)
      if (result.success) {
        setUser(result.data.user)
        return { success: true }
      }
      return { success: false, message: result.message }
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.message || 'Kayıt sırasında hata oluştu' 
      }
    }
  }

  const logout = () => {
    authService.logout()
    setUser(null)
  }

  const updateProfile = async (userData) => {
    try {
      const result = await authService.updateProfile(userData)
      if (result.success) {
        setUser(result.data.user)
        localStorage.setItem('user', JSON.stringify(result.data.user))
        return { success: true }
      }
      return { success: false, message: result.message }
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.message || 'Profil güncellenirken hata oluştu' 
      }
    }
  }

  const value = {
    user,
    login,
    register,
    logout,
    updateProfile,
    loading,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin'
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}