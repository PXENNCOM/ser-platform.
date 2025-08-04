// src/components/admin/courses/AdminCourses.jsx
import React, { useState } from 'react'
import { Plus, RefreshCw } from 'lucide-react'
import { toast } from 'react-toastify'
import { adminService } from '../../../services/adminService'

import CourseFilters from './CourseFilters'
import CourseTable from './CourseTable'
import CourseStats from './CourseStats'
import CreateCourseModal from '../modals/VideoCourse/CreateCourseModal'
import AddVideoModal from '../modals/VideoCourse/AddVideoModal'
import EditCourseModal from '../modals/VideoCourse/EditCourseModal'
import CourseDetailModal from '../modals/VideoCourse/CourseDetailModal'

const AdminCourses = ({ courses, refreshing, onRefresh, onCoursesUpdate }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('created_at')
  const [sortOrder, setSortOrder] = useState('desc')
  
  // Modal states
  const [showCreateCourseModal, setShowCreateCourseModal] = useState(false)
  const [showVideoModal, setShowVideoModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDetailModal, setShowDetailModal] = useState(false)
  const [selectedCourse, setSelectedCourse] = useState(null)

  // Filter and sort courses
  const filteredCourses = courses
    .filter(course =>
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description?.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      const aValue = a[sortBy] || 0
      const bValue = b[sortBy] || 0
      
      if (sortBy === 'created_at') {
        return sortOrder === 'desc' 
          ? new Date(bValue) - new Date(aValue)
          : new Date(aValue) - new Date(bValue)
      }
      
      return sortOrder === 'desc' ? bValue - aValue : aValue - bValue
    })

  const handleDeleteCourse = async (courseId, courseTitle) => {
    if (!window.confirm(`"${courseTitle}" kursunu silmek istediğinizden emin misiniz?\n\nBu işlem geri alınamaz ve kursa ait tüm videolar da silinecektir.`)) {
      return
    }

    try {
      const result = await adminService.deleteCourse(courseId)
      if (result.success) {
        toast.success('Kurs başarıyla silindi!')
        onCoursesUpdate()
      } else {
        toast.error(result.message || 'Kurs silinirken hata oluştu!')
      }
    } catch (error) {
      console.error('Delete course error:', error)
      toast.error('Kurs silinirken hata oluştu!')
    }
  }

  const handleAddVideo = (course) => {
    setSelectedCourse(course)
    setShowVideoModal(true)
  }

  const handleEditCourse = (course) => {
    setSelectedCourse(course)
    setShowEditModal(true)
  }

  const handleViewCourse = (course) => {
    setSelectedCourse(course)
    setShowDetailModal(true)
  }

  const closeAllModals = () => {
    setShowCreateCourseModal(false)
    setShowVideoModal(false)
    setShowEditModal(false)
    setShowDetailModal(false)
    setSelectedCourse(null)
  }

  const handleModalSuccess = () => {
    onCoursesUpdate()
    closeAllModals()
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Kurs Yönetimi</h2>
          <p className="text-gray-600 mt-1">{courses.length} kurs bulundu</p>
        </div>
        <div className="flex space-x-2">
          <button 
            onClick={onRefresh}
            disabled={refreshing}
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg flex items-center transition-colors"
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
            Yenile
          </button>
          <button 
            onClick={() => setShowCreateCourseModal(true)}
            className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg flex items-center transition-colors"
          >
            <Plus className="w-4 h-4 mr-2" />
            Yeni Kurs
          </button>
        </div>
      </div>

      {/* Filters */}
      <CourseFilters 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        sortBy={sortBy}
        setSortBy={setSortBy}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
        resultCount={filteredCourses.length}
      />
      
      {/* Courses Table */}
      <CourseTable 
        courses={filteredCourses}
        searchTerm={searchTerm}
        onCreateCourse={() => setShowCreateCourseModal(true)}
        onAddVideo={handleAddVideo}
        onEditCourse={handleEditCourse}
        onViewCourse={handleViewCourse}
        onDeleteCourse={handleDeleteCourse}
        sortBy={sortBy}
        sortOrder={sortOrder}
        onSort={(field) => {
          if (sortBy === field) {
            setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc')
          } else {
            setSortBy(field)
            setSortOrder('desc')
          }
        }}
      />

      {/* Statistics */}
      {filteredCourses.length > 0 && (
        <CourseStats courses={filteredCourses} />
      )}

      {/* Modals */}
      {showCreateCourseModal && (
        <CreateCourseModal 
          onClose={closeAllModals}
          onSuccess={handleModalSuccess}
        />
      )}
      
      {showVideoModal && selectedCourse && (
        <AddVideoModal 
          course={selectedCourse}
          onClose={closeAllModals}
          onSuccess={handleModalSuccess}
        />
      )}

      {showEditModal && selectedCourse && (
        <EditCourseModal 
          course={selectedCourse}
          onClose={closeAllModals}
          onSuccess={handleModalSuccess}
        />
      )}

      {showDetailModal && selectedCourse && (
        <CourseDetailModal 
          course={selectedCourse}
          onClose={closeAllModals}
          onAddVideo={handleAddVideo}
          onEditCourse={handleEditCourse}
          onDeleteCourse={handleDeleteCourse}
        />
      )}
    </div>
  )
}

export default AdminCourses