// src/services/adminService.js
import api from './api'

export const adminService = {
  // Kurs yönetimi
  createCourse: async (courseData) => {
    const response = await api.post('/admin/courses', courseData)
    return response.data
  },

  updateCourse: async (id, courseData) => {
    const response = await api.put(`/admin/courses/${id}`, courseData)
    return response.data
  },

  deleteCourse: async (id) => {
    const response = await api.delete(`/admin/courses/${id}`)
    return response.data
  },

  // Video yönetimi
  addVideoToCourse: async (courseId, videoData) => {
    const response = await api.post(`/admin/courses/${courseId}/videos`, videoData)
    return response.data
  },

  deleteVideo: async (videoId) => {
    const response = await api.delete(`/admin/videos/${videoId}`)
    return response.data
  },

  // Öğrenci yönetimi
  getStudents: async () => {
    const response = await api.get('/admin/students')
    return response.data
  },

  assignCourse: async (studentId, courseId) => {
    const response = await api.post('/admin/assign-course', {
      studentId,
      courseId
    })
    return response.data
  },

  removeCourseFromStudent: async (studentId, courseId) => {
    const response = await api.delete(`/admin/students/${studentId}/courses/${courseId}`)
    return response.data
  }
}
