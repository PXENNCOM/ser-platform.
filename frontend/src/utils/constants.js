// src/utils/constants.js
export const API_URLS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    PROFILE: '/auth/me',
    UPDATE_PROFILE: '/auth/profile',
    UPLOAD_AVATAR: '/auth/upload-avatar'
  },
  COURSES: {
    ALL: '/courses',
    BY_ID: (id) => `/courses/${id}`,
    MY_COURSES: '/student/my-courses',
    MY_COURSE_DETAIL: (id) => `/student/courses/${id}`
  },
  ADMIN: {
    COURSES: '/admin/courses',
    COURSE_BY_ID: (id) => `/admin/courses/${id}`,
    ADD_VIDEO: (courseId) => `/admin/courses/${courseId}/videos`,
    DELETE_VIDEO: (videoId) => `/admin/videos/${videoId}`,
    STUDENTS: '/admin/students',
    ASSIGN_COURSE: '/admin/assign-course'
  }
}

export const USER_ROLES = {
  ADMIN: 'admin',
  STUDENT: 'student'
}

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  DASHBOARD: '/dashboard',
  ADMIN: '/admin',
  PROFILE: '/profile'
}