// src/components/admin/AdminFooter.jsx
import { RefreshCw, Download, Users } from 'lucide-react'
import { toast } from 'react-toastify'

const AdminFooter = ({ stats, onRefresh, refreshing }) => {
  return (
    <div className="bg-gray-50 rounded-xl p-6">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-gray-600">Sistem Çevrimiçi</span>
          </div>
          <div className="flex items-center space-x-2">
            <RefreshCw className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-600">
              Son güncelleme: {new Date().toLocaleTimeString('tr-TR')}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <Users className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-600">{stats.totalStudents} aktif kullanıcı</span>
          </div>
        </div>
        <div className="flex space-x-2">
          <button 
            onClick={() => toast.success('Rapor indiriliyor...')}
            className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg text-sm transition-colors flex items-center"
          >
            <Download className="w-4 h-4 mr-2" />
            Rapor İndir
          </button>
          <button 
            onClick={onRefresh}
            disabled={refreshing}
            className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg text-sm transition-colors flex items-center"
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
            {refreshing ? 'Yenileniyor...' : 'Yenile'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default AdminFooter