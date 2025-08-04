// src/services/courseService.js
import api from './api'

export const courseService = {
  // Tüm kursları getir
  getAllCourses: async () => {
    const response = await api.get('/courses')
    return response.data
  },

  // Kurs detayı getir
  getCourseById: async (id) => {
    const response = await api.get(`/courses/${id}`)
    return response.data
  },

  // Öğrencinin kursları
  getMyCourses: async () => {
    const response = await api.get('/student/my-courses')
    return response.data
  },

  // Öğrencinin kurs detayı
  getMyCourseDetail: async (id) => {
    const response = await api.get(`/student/courses/${id}`)
    return response.data
  }
}