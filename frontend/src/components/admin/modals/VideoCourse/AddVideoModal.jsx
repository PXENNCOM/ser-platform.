// src/components/admin/modals/AddVideoModal.jsx
import React, { useState } from 'react'
import { X, Upload, Video, Link, Hash } from 'lucide-react'
import { adminService } from '../../../../services/adminService'
import { toast } from 'react-toastify'

const AddVideoModal = ({ course, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    title: '',
    video_url: '',
    order_number: ''
  })
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.title.trim()) {
      newErrors.title = 'Video başlığı zorunludur'
    }
    
    if (!formData.video_url.trim()) {
      newErrors.video_url = 'Video URL\'si zorunludur'
    } else {
      // Enhanced URL validation for video platforms
      const url = formData.video_url.trim()
      const urlPattern = /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/|vimeo\.com\/|dailymotion\.com\/video\/|[\da-z\.-]+\.[a-z\.]{2,6})/i
      
      if (!urlPattern.test(url)) {
        newErrors.video_url = 'Geçerli bir video URL\'si giriniz (YouTube, Vimeo vb.)'
      }
    }

    if (formData.order_number && formData.order_number < 1) {
      newErrors.order_number = 'Sıra numarası 1\'den büyük olmalıdır'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) return

    setLoading(true)
    try {
      const videoData = {
        title: formData.title.trim(),
        video_url: formData.video_url.trim(),
        ...(formData.order_number && { order_number: parseInt(formData.order_number) })
      }

      const result = await adminService.addVideoToCourse(course.id, videoData)
      
      if (result.success) {
        toast.success('Video başarıyla eklendi!')
        onSuccess()
      } else {
        toast.error(result.message || 'Video eklenirken hata oluştu!')
      }
    } catch (error) {
      console.error('Add video error:', error)
      toast.error('Video eklenirken hata oluştu!')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <Video className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Video Ekle</h3>
              <p className="text-sm text-gray-600">{course.title}</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Video Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Upload className="w-4 h-4 inline mr-1" />
              Video Başlığı *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Örn: Ders 1: HTML Temelleri"
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                errors.title ? 'border-red-300' : 'border-gray-300'
              }`}
            />
            {errors.title && (
              <p className="text-red-600 text-sm mt-1">{errors.title}</p>
            )}
          </div>

          {/* Video URL */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Link className="w-4 h-4 inline mr-1" />
              Video URL *
            </label>
            <input
              type="url"
              name="video_url"
              value={formData.video_url}
              onChange={handleChange}
              placeholder="https://youtube.com/watch?v=... veya video linki"
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                errors.video_url ? 'border-red-300' : 'border-gray-300'
              }`}
            />
            {errors.video_url && (
              <p className="text-red-600 text-sm mt-1">{errors.video_url}</p>
            )}
            <p className="text-gray-500 text-xs mt-1">
              YouTube, Vimeo veya direk video linki ekleyebilirsiniz
            </p>
          </div>

          {/* Order Number */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Hash className="w-4 h-4 inline mr-1" />
              Sıra Numarası (Opsiyonel)
            </label>
            <input
              type="number"
              name="order_number"
              value={formData.order_number}
              onChange={handleChange}
              min="1"
              placeholder="Boş bırakılırsa otomatik sıralanır"
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                errors.order_number ? 'border-red-300' : 'border-gray-300'
              }`}
            />
            {errors.order_number && (
              <p className="text-red-600 text-sm mt-1">{errors.order_number}</p>
            )}
          </div>

          {/* Current Videos Info */}
          <div className="bg-gray-50 rounded-lg p-3">
            <p className="text-sm text-gray-600">
              <Video className="w-4 h-4 inline mr-1" />
              Bu kursta şu anda <span className="font-medium">{course.video_count || 0}</span> video var
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              İptal
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Ekleniyor...' : 'Video Ekle'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddVideoModal