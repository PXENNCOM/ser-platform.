// src/components/admin/modals/AssignCourseModal.jsx
import { useState, useEffect } from 'react'
import { X, User, BookOpen, Plus, Search } from 'lucide-react'
import { adminService } from '../../../services/adminService'
import { toast } from 'react-toastify'

const AssignCourseModal = ({ 
  courses, 
  students, 
  selectedStudent = null, 
  selectedCourse = null,
  onClose, 
  onSuccess 
}) => {
  const [loading, setLoading] = useState(false)
  const [currentStudent, setCurrentStudent] = useState(selectedStudent)
  const [currentCourse, setCurrentCourse] = useState(selectedCourse)
  const [searchStudent, setSearchStudent] = useState('')
  const [searchCourse, setSearchCourse] = useState('')

  // Filter students and courses based on search
  const filteredStudents = students.filter(student =>
    `${student.first_name} ${student.last_name}`.toLowerCase().includes(searchStudent.toLowerCase()) ||
    student.email.toLowerCase().includes(searchStudent.toLowerCase())
  )

  const filteredCourses = courses.filter(course =>
    course.title.toLowerCase().includes(searchCourse.toLowerCase()) ||
    course.description?.toLowerCase().includes(searchCourse.toLowerCase())
  )

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!currentStudent || !currentCourse) {
      toast.error('Öğrenci ve kurs seçimi gerekli!')
      return
    }

    setLoading(true)
    try {
      const result = await adminService.assignCourse(currentStudent.id, currentCourse.id)
      if (result.success) {
        toast.success(`${currentCourse.title} kursu ${currentStudent.first_name} ${currentStudent.last_name}'a başarıyla atandı!`)
        onClose()
        onSuccess()
      } else {
        toast.error(result.message || 'Kurs atanırken hata oluştu!')
      }
    } catch (error) {
      console.error('Assign course error:', error)
      toast.error('Kurs atanırken hata oluştu!')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-2xl h-[90vh] flex flex-col overflow-hidden">
        {/* Header - Sabit */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200 flex-shrink-0">
          <h3 className="text-xl font-semibold text-gray-900">Kurs Atama</h3>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto min-h-0">
          <div className="p-6 space-y-6 pb-8">
            {/* Student Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                <User className="w-4 h-4 inline mr-2" />
                Öğrenci Seç *
              </label>
              
              {/* Search Student */}
              <div className="relative mb-3">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Öğrenci ara..."
                  value={searchStudent}
                  onChange={(e) => setSearchStudent(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                />
              </div>

              {/* Student List */}
              <div className="border border-gray-300 rounded-lg max-h-48 overflow-y-auto">
                {filteredStudents.length === 0 ? (
                  <div className="p-4 text-center text-gray-500">
                    {searchStudent ? 'Öğrenci bulunamadı' : 'Öğrenci listesi boş'}
                  </div>
                ) : (
                  filteredStudents.map((student) => (
                    <div
                      key={student.id}
                      onClick={() => setCurrentStudent(student)}
                      className={`p-3 cursor-pointer transition-colors border-b border-gray-100 last:border-b-0 hover:bg-gray-50 ${
                        currentStudent?.id === student.id ? 'bg-primary-50 border-primary-200' : ''
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                          <span className="text-primary-600 font-medium text-sm">
                            {student.first_name[0]}{student.last_name[0]}
                          </span>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">
                            {student.first_name} {student.last_name}
                          </h4>
                          <p className="text-sm text-gray-600">{student.email}</p>
                        </div>
                        {currentStudent?.id === student.id && (
                          <div className="ml-auto">
                            <div className="w-5 h-5 bg-primary-600 rounded-full flex items-center justify-center">
                              <Plus className="w-3 h-3 text-white" />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Course Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                <BookOpen className="w-4 h-4 inline mr-2" />
                Kurs Seç *
              </label>
              
              {/* Search Course */}
              <div className="relative mb-3">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Kurs ara..."
                  value={searchCourse}
                  onChange={(e) => setSearchCourse(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                />
              </div>

              {/* Course List */}
              <div className="border border-gray-300 rounded-lg max-h-48 overflow-y-auto">
                {filteredCourses.length === 0 ? (
                  <div className="p-4 text-center text-gray-500">
                    {searchCourse ? 'Kurs bulunamadı' : 'Kurs listesi boş'}
                  </div>
                ) : (
                  filteredCourses.map((course) => (
                    <div
                      key={course.id}
                      onClick={() => setCurrentCourse(course)}
                      className={`p-3 cursor-pointer transition-colors border-b border-gray-100 last:border-b-0 hover:bg-gray-50 ${
                        currentCourse?.id === course.id ? 'bg-primary-50 border-primary-200' : ''
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-gray-900">{course.title}</h4>
                          {course.description && (
                            <p className="text-sm text-gray-600 mt-1">{course.description}</p>
                          )}
                          <div className="flex items-center space-x-2 mt-2">
                            <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full">
                              {course.video_count || 0} video
                            </span>
                            <span className="text-xs text-gray-500">
                              {new Date(course.created_at).toLocaleDateString('tr-TR')}
                            </span>
                          </div>
                        </div>
                        {currentCourse?.id === course.id && (
                          <div className="w-5 h-5 bg-primary-600 rounded-full flex items-center justify-center">
                            <Plus className="w-3 h-3 text-white" />
                          </div>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Selection Summary */}
            {currentStudent && currentCourse && (
              <div className="bg-primary-50 border border-primary-200 rounded-lg p-4">
                <h4 className="font-medium text-primary-900 mb-2">Atama Özeti:</h4>
                <div className="text-sm text-primary-800 space-y-1">
                  <p><span className="font-medium">Öğrenci:</span> {currentStudent.first_name} {currentStudent.last_name}</p>
                  <p><span className="font-medium">Kurs:</span> {currentCourse.title}</p>
                  <p><span className="font-medium">Video Sayısı:</span> {currentCourse.video_count || 0}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons - Sabit Alt Kısım */}
        <div className="flex-shrink-0 p-6 border-t border-gray-200 bg-gray-50">
          <form onSubmit={handleSubmit}>
            <div className="flex space-x-3">
              <button
                type="button"
                onClick={onClose}
                disabled={loading}
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 py-3 px-4 rounded-lg transition-colors font-medium"
              >
                İptal
              </button>
              <button
                type="submit"
                disabled={loading || !currentStudent || !currentCourse}
                className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-300 text-white py-3 px-4 rounded-lg transition-colors font-medium"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Atanıyor...
                  </div>
                ) : (
                  'Kursu Ata'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AssignCourseModal