// src/components/admin/AdminStudents.jsx
import { useState } from 'react'
import { Plus, RefreshCw, Search, Users, Eye, Edit } from 'lucide-react'
import AssignCourseModal from './modals/AssignCourseModal'

const AdminStudents = ({ students, courses, refreshing, onRefresh, onStudentsUpdate }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [showAssignCourseModal, setShowAssignCourseModal] = useState(false)
  const [selectedStudent, setSelectedStudent] = useState(null)

  const filteredStudents = students.filter(student =>
    `${student.first_name} ${student.last_name}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold text-gray-900">Öğrenci Yönetimi</h2>
        <div className="flex space-x-2">
          <button 
            onClick={onRefresh}
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg flex items-center transition-colors"
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
            Yenile
          </button>
          <button 
            onClick={() => setShowAssignCourseModal(true)}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center transition-colors"
          >
            <Plus className="w-4 h-4 mr-2" />
            Kurs Ata
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Öğrenci ara..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="text-sm text-gray-600 flex items-center">
            {filteredStudents.length} öğrenci
          </div>
        </div>
      </div>
      
      {/* Students List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        {filteredStudents.length === 0 ? (
          <div className="text-center py-12">
            <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-600 mb-2">
              {searchTerm ? 'Öğrenci bulunamadı' : 'Henüz öğrenci yok'}
            </h3>
            <p className="text-gray-500">
              {searchTerm ? 'Arama kriterlerinize uygun öğrenci bulunamadı.' : 'Öğrenciler kayıt oldukça burada görünecek.'}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left py-3 px-6 font-medium text-gray-700">Öğrenci</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-700">E-posta</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-700">Telefon</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-700">Kurs Sayısı</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-700">Kayıt Tarihi</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-700">İşlemler</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredStudents.map((student) => (
                  <tr key={student.id} className="hover:bg-gray-50">
                    <td className="py-4 px-6">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center mr-3">
                          <span className="text-primary-600 font-medium text-sm">
                            {student.first_name[0]}{student.last_name[0]}
                          </span>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">
                            {student.first_name} {student.last_name}
                          </h4>
                          {student.city && (
                            <p className="text-xs text-gray-500">{student.city}</p>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-600">
                      {student.email}
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-600">
                      {student.phone || '-'}
                    </td>
                    <td className="py-4 px-6">
                      <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full">
                        {student.course_count || 0} kurs
                      </span>
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-600">
                      {new Date(student.created_at).toLocaleDateString('tr-TR')}
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex space-x-2">
                        <button 
                          onClick={() => {
                            setSelectedStudent(student)
                            setShowAssignCourseModal(true)
                          }}
                          className="text-green-600 hover:text-green-700 p-1"
                          title="Kurs Ata"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                        <button 
                          className="text-blue-600 hover:text-blue-700 p-1"
                          title="Detay Görüntüle"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button 
                          className="text-orange-600 hover:text-orange-700 p-1"
                          title="Düzenle"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal */}
      {showAssignCourseModal && (
        <AssignCourseModal 
          courses={courses}
          students={students}
          selectedStudent={selectedStudent}
          onClose={() => {
            setShowAssignCourseModal(false)
            setSelectedStudent(null)
          }}
          onSuccess={onStudentsUpdate}
        />
      )}
    </div>
  )
}

export default AdminStudents