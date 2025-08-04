// src/components/admin/modals/CourseDetailModal.jsx
import React, { useState, useEffect } from 'react'
import { X, BookOpen, Video, Calendar, User, Plus, Edit, Trash2, Play, ExternalLink } from 'lucide-react'
import { courseService } from '../../../../services/courseService'
import { adminService } from '../../../../services/adminService'
import { toast } from 'react-toastify'

const CourseDetailModal = ({ course, onClose, onAddVideo, onEditCourse, onDeleteCourse }) => {
  const [courseDetails, setCourseDetails] = useState(null)
  const [loading, setLoading] = useState(true)
  const [deletingVideo, setDeletingVideo] = useState(null)

  useEffect(() => {
    fetchCourseDetails()
  }, [course.id])

  const fetchCourseDetails = async () => {
    try {
      setLoading(true)
      const response = await courseService.getCourseById(course.id)
      if (response.success) {
        setCourseDetails(response.data)
      }
    } catch (error) {
      console.error('Fetch course details error:', error)
      toast.error('Kurs detayları yüklenirken hata oluştu!')
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteVideo = async (videoId, videoTitle) => {
    if (!window.confirm(`"${videoTitle}" videosunu silmek istediğinizden emin misiniz?`)) {
      return
    }

    try {
      setDeletingVideo(videoId)
      const result = await adminService.deleteVideo(videoId)
      
      if (result.success) {
        toast.success('Video başarıyla silindi!')
        fetchCourseDetails() // Refresh data
      } else {
        toast.error(result.message || 'Video silinirken hata oluştu!')
      }
    } catch (error) {
      console.error('Delete video error:', error)
      toast.error('Video silinirken hata oluştu!')
    } finally {
      setDeletingVideo(null)
    }
  }

  const formatVideoUrl = (url) => {
    if (url.includes('youtube.com/watch?v=')) {
      const videoId = url.split('v=')[1]?.split('&')[0]
      return `https://www.youtube.com/embed/${videoId}`
    }
    return url
  }

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-xl max-w-4xl w-full h-96 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="text-gray-600 mt-4">Kurs detayları yükleniyor...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900">{course.title}</h3>
              <p className="text-sm text-gray-600">
                {courseDetails?.course?.first_name} {courseDetails?.course?.last_name} • 
                {new Date(course.created_at).toLocaleDateString('tr-TR')}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button 
              onClick={() => onAddVideo(course)}
              className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg flex items-center text-sm"
            >
              <Plus className="w-4 h-4 mr-1" />
              Video Ekle
            </button>
            <button 
              onClick={() => onEditCourse(course)}
              className="bg-orange-600 hover:bg-orange-700 text-white px-3 py-2 rounded-lg flex items-center text-sm"
            >
              <Edit className="w-4 h-4 mr-1" />
              Düzenle
            </button>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Course Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="md:col-span-2">
              <h4 className="font-semibold text-gray-900 mb-2">Kurs Açıklaması</h4>
              <p className="text-gray-600">
                {courseDetails?.course?.description || 'Bu kurs için henüz açıklama eklenmemiş.'}
              </p>
            </div>
            <div className="space-y-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Video className="w-5 h-5 text-purple-600" />
                  <span className="font-medium text-gray-900">Video Sayısı</span>
                </div>
                <p className="text-2xl font-bold text-gray-900">{courseDetails?.videos?.length || 0}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Calendar className="w-5 h-5 text-green-600" />
                  <span className="font-medium text-gray-900">Toplam Süre</span>
                </div>
                <p className="text-2xl font-bold text-gray-900">
                  ~{(courseDetails?.videos?.length || 0) * 15} dk
                </p>
              </div>
            </div>
          </div>

          {/* Videos List */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-semibold text-gray-900">Kurs Videoları</h4>
              <button 
                onClick={() => onAddVideo(course)}
                className="text-green-600 hover:text-green-700 text-sm flex items-center"
              >
                <Plus className="w-4 h-4 mr-1" />
                Yeni Video Ekle
              </button>
            </div>

            {courseDetails?.videos?.length === 0 ? (
              <div className="text-center py-12 bg-gray-50 rounded-lg">
                <Video className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h5 className="text-lg font-medium text-gray-600 mb-2">Henüz video yok</h5>
                <p className="text-gray-500 mb-4">Bu kursa ilk videosunu ekleyerek başlayın.</p>
                <button 
                  onClick={() => onAddVideo(course)}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
                >
                  İlk Video Ekle
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {courseDetails?.videos?.map((video, index) => (
                  <div key={video.id} className="bg-gray-50 rounded-lg p-4 flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                        <span className="text-sm font-medium text-purple-600">
                          {video.order_number || index + 1}
                        </span>
                      </div>
                      <div>
                        <h6 className="font-medium text-gray-900">{video.title}</h6>
                        <p className="text-sm text-gray-500">
                          {new Date(video.created_at).toLocaleDateString('tr-TR')}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <a
                        href={video.video_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-700 p-2 hover:bg-blue-50 rounded-lg"
                        title="Videoyu Aç"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                      <button 
                        onClick={() => handleDeleteVideo(video.id, video.title)}
                        disabled={deletingVideo === video.id}
                        className="text-red-600 hover:text-red-700 p-2 hover:bg-red-50 rounded-lg disabled:opacity-50"
                        title="Videoyu Sil"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CourseDetailModal