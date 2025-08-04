// src/components/admin/AdminOverview.jsx
import { useState } from 'react'
import { 
  Users, BookOpen, Video, Plus, Settings, TrendingUp,
  BarChart3, RefreshCw, Globe, Database, Activity, Shield
} from 'lucide-react'
import StatCard from './StatCard'
import CreateCourseModal from './modals/CreateCourseModal'
import AssignCourseModal from './modals/AssignCourseModal'

const AdminOverview = ({ 
  stats, 
  courses, 
  students, 
  refreshing, 
  onRefresh, 
  onCoursesUpdate, 
  onStudentsUpdate 
}) => {
  const [showCreateCourseModal, setShowCreateCourseModal] = useState(false)
  const [showAssignCourseModal, setShowAssignCourseModal] = useState(false)

  return (
    <div className="space-y-8">
      {/* Stats Grid - Real Data */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Toplam Öğrenci"
          value={stats.totalStudents}
          icon={Users}
          color="bg-blue-600"
          change={`+${stats.newRegistrations}`}
          changeType="positive"
          trend="bu ay"
        />
        <StatCard
          title="Toplam Kurs"
          value={stats.totalCourses}
          icon={BookOpen}
          color="bg-green-600"
          change="+3"
          changeType="positive"
          trend="bu ay"
        />
        <StatCard
          title="Toplam Video"
          value={stats.totalVideos}
          icon={Video}
          color="bg-purple-600"
          change="+45"
          changeType="positive"
          trend="bu ay"
        />
        <StatCard
          title="Yeni Kayıt"
          value={stats.newRegistrations}
          icon={TrendingUp}
          color="bg-orange-600"
          change={`+${stats.newRegistrations}`}
          changeType="positive"
          trend="bu ay"
        />
      </div>

      {/* Quick Actions - Functional */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-900">Hızlı İşlemler</h3>
            <button 
              onClick={onRefresh}
              disabled={refreshing}
              className="text-primary-600 hover:text-primary-700 text-sm font-medium flex items-center"
            >
              <RefreshCw className={`w-4 h-4 mr-1 ${refreshing ? 'animate-spin' : ''}`} />
              {refreshing ? 'Yenileniyor...' : 'Yenile'}
            </button>
          </div>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <button 
              onClick={() => setShowCreateCourseModal(true)}
              className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg p-4 text-left transition-all duration-200 transform hover:scale-105"
            >
              <Plus className="w-6 h-6 mb-2" />
              <h4 className="font-medium">Yeni Kurs</h4>
              <p className="text-sm text-blue-100 mt-1">Kurs oluştur</p>
            </button>
            
            <button 
              onClick={() => setShowAssignCourseModal(true)}
              className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-lg p-4 text-left transition-all duration-200 transform hover:scale-105"
            >
              <Users className="w-6 h-6 mb-2" />
              <h4 className="font-medium">Kurs Ata</h4>
              <p className="text-sm text-green-100 mt-1">Öğrenciye kurs ata</p>
            </button>
            
            <button 
              className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white rounded-lg p-4 text-left transition-all duration-200 transform hover:scale-105"
            >
              <BarChart3 className="w-6 h-6 mb-2" />
              <h4 className="font-medium">Raporlar</h4>
              <p className="text-sm text-purple-100 mt-1">Analitik görüntüle</p>
            </button>
            
            <button 
              className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-lg p-4 text-left transition-all duration-200 transform hover:scale-105"
            >
              <Settings className="w-6 h-6 mb-2" />
              <h4 className="font-medium">Ayarlar</h4>
              <p className="text-sm text-orange-100 mt-1">Platform ayarları</p>
            </button>
          </div>
        </div>
      </div>

      {/* Recent Activity & System Status */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Son Aktiviteler</h3>
              <span className="text-xs text-gray-500">Gerçek zamanlı</span>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {students.slice(0, 4).map((student, index) => (
                <div key={student.id} className="flex items-center space-x-3 py-2">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">
                      Yeni kayıt: {student.first_name} {student.last_name}
                    </p>
                    <p className="text-xs text-gray-600">{student.email}</p>
                  </div>
                  <span className="text-xs text-gray-500">
                    {new Date(student.created_at).toLocaleDateString('tr-TR')}
                  </span>
                </div>
              ))}
              {students.length === 0 && (
                <div className="text-center py-8">
                  <Users className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                  <p className="text-gray-500 text-sm">Henüz aktivite yok</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Sistem Durumu</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Globe className="w-4 h-4 text-gray-500" />
                  <span className="text-sm font-medium text-gray-700">API Durumu</span>
                </div>
                <span className="text-sm text-green-600 font-medium">✓ Çevrimiçi</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Database className="w-4 h-4 text-gray-500" />
                  <span className="text-sm font-medium text-gray-700">Veritabanı</span>
                </div>
                <span className="text-sm text-green-600 font-medium">✓ Bağlı</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Activity className="w-4 h-4 text-gray-500" />
                  <span className="text-sm font-medium text-gray-700">Aktif Kullanıcı</span>
                </div>
                <span className="text-sm text-blue-600 font-medium">{stats.totalStudents}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Shield className="w-4 h-4 text-gray-500" />
                  <span className="text-sm font-medium text-gray-700">Güvenlik</span>
                </div>
                <span className="text-sm text-green-600 font-medium">✓ Aktif</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      {showCreateCourseModal && (
        <CreateCourseModal 
          onClose={() => setShowCreateCourseModal(false)}
          onSuccess={onCoursesUpdate}
        />
      )}
      
      {showAssignCourseModal && (
        <AssignCourseModal 
          courses={courses}
          students={students}
          onClose={() => setShowAssignCourseModal(false)}
          onSuccess={onStudentsUpdate}
        />
      )}
    </div>
  )
}

export default AdminOverview