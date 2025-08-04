// src/components/admin/AdminHeader.jsx
import { Settings } from 'lucide-react'

const AdminHeader = ({ user, stats }) => {
  return (
    <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-xl p-8 text-white">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">
            Admin Panel 🛠️
          </h1>
          <p className="text-gray-300 text-lg">
            Hoş geldin, {user?.first_name}! Platform yönetimi için gerekli araçlar burada.
          </p>
        </div>
        <div className="hidden md:block">
          <div className="bg-white/20 rounded-lg p-4">
            <Settings className="w-12 h-12 text-white" />
          </div>
        </div>
      </div>
      
      {/* Quick Stats */}
      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white/10 rounded-lg p-4">
          <div className="text-2xl font-bold">{stats.totalStudents}</div>
          <div className="text-sm text-gray-300">Öğrenci</div>
        </div>
        <div className="bg-white/10 rounded-lg p-4">
          <div className="text-2xl font-bold">{stats.totalCourses}</div>
          <div className="text-sm text-gray-300">Kurs</div>
        </div>
        <div className="bg-white/10 rounded-lg p-4">
          <div className="text-2xl font-bold">{stats.totalVideos}</div>
          <div className="text-sm text-gray-300">Video</div>
        </div>
        <div className="bg-white/10 rounded-lg p-4">
          <div className="text-2xl font-bold">{stats.newRegistrations}</div>
          <div className="text-sm text-gray-300">Yeni Kayıt</div>
        </div>
      </div>
    </div>
  )
}

export default AdminHeader
