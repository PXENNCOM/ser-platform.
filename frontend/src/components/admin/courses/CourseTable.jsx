// src/components/admin/courses/CourseTable.jsx
import React from 'react'
import { BookOpen, Video, Users, Calendar, Plus, Eye, Edit, Trash2 } from 'lucide-react'

const CourseTable = ({ 
  courses, 
  searchTerm, 
  onCreateCourse, 
  onAddVideo, 
  onEditCourse, 
  onViewCourse, 
  onDeleteCourse,
  sortBy,
  sortOrder,
  onSort
}) => {
  const getSortIcon = (column) => {
    if (sortBy !== column) return null
    return sortOrder === 'desc' ? '↓' : '↑'
  }

  if (courses.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="text-center py-12">
          <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-600 mb-2">
            {searchTerm ? 'Arama sonucu bulunamadı' : 'Henüz kurs yok'}
          </h3>
          <p className="text-gray-500 mb-6">
            {searchTerm 
              ? `"${searchTerm}" araması için sonuç bulunamadı. Farklı bir arama deneyin.`
              : 'Platform\'a ilk kursunuzu ekleyerek başlayın.'
            }
          </p>
          {!searchTerm && (
            <button 
              onClick={onCreateCourse}
              className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg transition-colors font-medium"
            >
              İlk Kursunuzu Oluşturun
            </button>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th 
                className="text-left py-4 px-6 font-medium text-gray-700 cursor-pointer hover:bg-gray-100"
                onClick={() => onSort('title')}
              >
                <div className="flex items-center space-x-1">
                  <span>Kurs Adı</span>
                  <span className="text-xs">{getSortIcon('title')}</span>
                </div>
              </th>
              <th 
                className="text-left py-4 px-6 font-medium text-gray-700 cursor-pointer hover:bg-gray-100"
                onClick={() => onSort('video_count')}
              >
                <div className="flex items-center space-x-1">
                  <Video className="w-4 h-4" />
                  <span>Video</span>
                  <span className="text-xs">{getSortIcon('video_count')}</span>
                </div>
              </th>
              <th className="text-left py-4 px-6 font-medium text-gray-700">
                <div className="flex items-center space-x-1">
                  <Users className="w-4 h-4" />
                  <span>Öğrenci</span>
                </div>
              </th>
              <th 
                className="text-left py-4 px-6 font-medium text-gray-700 cursor-pointer hover:bg-gray-100"
                onClick={() => onSort('created_at')}
              >
                <div className="flex items-center space-x-1">
                  <Calendar className="w-4 h-4" />
                  <span>Oluşturulma</span>
                  <span className="text-xs">{getSortIcon('created_at')}</span>
                </div>
              </th>
              <th className="text-left py-4 px-6 font-medium text-gray-700">İşlemler</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {courses.map((course) => (
              <CourseRow 
                key={course.id}
                course={course}
                onAddVideo={() => onAddVideo(course)}
                onEditCourse={() => onEditCourse(course)}
                onViewCourse={() => onViewCourse(course)}
                onDeleteCourse={() => onDeleteCourse(course.id, course.title)}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

const CourseRow = ({ course, onAddVideo, onEditCourse, onViewCourse, onDeleteCourse }) => {
  return (
    <tr className="hover:bg-gray-50 transition-colors">
      <td className="py-4 px-6">
        <div className="flex items-start space-x-3">
          <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
            <BookOpen className="w-6 h-6 text-primary-600" />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="font-medium text-gray-900 mb-1">
              {course.title}
            </h4>
            {course.description && (
              <p className="text-sm text-gray-600 line-clamp-2">
                {course.description}
              </p>
            )}
            <div className="text-xs text-gray-500 mt-1">
              {course.first_name} {course.last_name}
            </div>
          </div>
        </div>
      </td>
      <td className="py-4 px-6">
        <div className="flex items-center space-x-2">
          <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2 py-1 rounded-full">
            {course.video_count || 0} video
          </span>
          {(course.video_count || 0) > 0 && (
            <span className="text-xs text-gray-500">
              ~{(course.video_count || 0) * 15} dk
            </span>
          )}
        </div>
      </td>
      <td className="py-4 px-6">
        <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full">
          {course.student_count || 0} öğrenci
        </span>
      </td>
      <td className="py-4 px-6">
        <div className="text-sm text-gray-600">
          {new Date(course.created_at).toLocaleDateString('tr-TR', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
          })}
        </div>
      </td>
      <td className="py-4 px-6">
        <div className="flex items-center space-x-2">
          <button 
            onClick={onAddVideo}
            className="text-green-600 hover:text-green-700 p-2 hover:bg-green-50 rounded-lg transition-colors"
            title="Video Ekle"
          >
            <Plus className="w-4 h-4" />
          </button>
          <button 
            onClick={onViewCourse}
            className="text-blue-600 hover:text-blue-700 p-2 hover:bg-blue-50 rounded-lg transition-colors"
            title="Görüntüle"
          >
            <Eye className="w-4 h-4" />
          </button>
          <button 
            onClick={onEditCourse}
            className="text-orange-600 hover:text-orange-700 p-2 hover:bg-orange-50 rounded-lg transition-colors"
            title="Düzenle"
          >
            <Edit className="w-4 h-4" />
          </button>
          <button 
            onClick={onDeleteCourse}
            className="text-red-600 hover:text-red-700 p-2 hover:bg-red-50 rounded-lg transition-colors"
            title="Sil"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </td>
    </tr>
  )
}

export default CourseTable