// src/components/admin/modals/CreateCourseModal.jsx
import { useState } from 'react'
import { X } from 'lucide-react'
import { adminService } from '../../../services/adminService'
import { toast } from 'react-toastify'

const CreateCourseModal = ({ onClose, onSuccess }) => {
  const [loading, setLoading] = useState(false)
  const [courseForm, setCourseForm] = useState({
    title: '',
    description: ''
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!courseForm.title.trim()) {
      toast.error('Kurs başlığı gerekli!')
      return
    }

    setLoading(true)
    try {
      const result = await adminService.createCourse(courseForm)
      if (result.success) {
        toast.success('Kurs başarıyla oluşturuldu!')
        onClose()
        onSuccess()
      } else {
        toast.error(result.message)
      }
    } catch (error) {
      toast.error('Kurs oluşturulurken hata oluştu!')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Yeni Kurs Oluştur</h3>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Kurs Başlığı *
            </label>
            <input
              type="text"
              value={courseForm.title}
              onChange={(e) => setCourseForm({...courseForm, title: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              placeholder="Örn: React Fundamentals"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Açıklama
            </label>
            <textarea
              value={courseForm.description}
              onChange={(e) => setCourseForm({...courseForm, description: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 resize-none"
              rows={3}
              placeholder="Kurs hakkında kısa açıklama..."
            />
          </div>
          
          <div className="flex space-x-3">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded-lg transition-colors"
            >
              İptal
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-primary-600 hover:bg-primary-700 text-white py-2 px-4 rounded-lg transition-colors"
            >
              {loading ? 'Oluşturuluyor...' : 'Oluştur'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateCourseModal