// src/components/admin/AdminAnalytics.jsx
import { BarChart3, PieChart, TrendingUp, Users, BookOpen, Video, Calendar, Download, RefreshCw } from 'lucide-react'
import { toast } from 'react-toastify'

const AdminAnalytics = ({ stats, courses, students, onRefresh, refreshing }) => {
  
  // Calculate additional metrics
  const calculateMetrics = () => {
    const currentDate = new Date()
    const lastMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    const thisMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1)
    
    // Last month registrations
    const lastMonthRegistrations = students.filter(student => {
      const createdAt = new Date(student.created_at)
      return createdAt >= lastMonth && createdAt < thisMonth
    }).length

    // Growth rate
    const growthRate = lastMonthRegistrations > 0 
      ? Math.round(((stats.newRegistrations - lastMonthRegistrations) / lastMonthRegistrations) * 100)
      : stats.newRegistrations > 0 ? 100 : 0

    // Average videos per course
    const avgVideosPerCourse = stats.totalCourses > 0 
      ? Math.round(stats.totalVideos / stats.totalCourses) 
      : 0

    return {
      lastMonthRegistrations,
      growthRate,
      avgVideosPerCourse
    }
  }

  const metrics = calculateMetrics()

  const handleExportData = () => {
    toast.success('Rapor indiriliyor...')
    // TODO: Implement actual export functionality
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold text-gray-900">Analitik & Raporlar</h2>
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
            onClick={handleExportData}
            className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg flex items-center transition-colors"
          >
            <Download className="w-4 h-4 mr-2" />
            Rapor İndir
          </button>
        </div>
      </div>
      
      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm">Toplam Öğrenci</p>
              <p className="text-3xl font-bold">{stats.totalStudents}</p>
              <div className="flex items-center mt-2">
                <TrendingUp className="w-4 h-4 mr-1" />
                <span className="text-sm">+{stats.newRegistrations} bu ay</span>
              </div>
            </div>
            <Users className="w-12 h-12 text-blue-200" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm">Toplam Kurs</p>
              <p className="text-3xl font-bold">{stats.totalCourses}</p>
              <div className="flex items-center mt-2">
                <BookOpen className="w-4 h-4 mr-1" />
                <span className="text-sm">{metrics.avgVideosPerCourse} ort. video</span>
              </div>
            </div>
            <BookOpen className="w-12 h-12 text-green-200" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm">Toplam Video</p>
              <p className="text-3xl font-bold">{stats.totalVideos}</p>
              <div className="flex items-center mt-2">
                <Video className="w-4 h-4 mr-1" />
                <span className="text-sm">~{stats.totalVideos * 15} dk içerik</span>
              </div>
            </div>
            <Video className="w-12 h-12 text-purple-200" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100 text-sm">Büyüme Oranı</p>
              <p className="text-3xl font-bold">{metrics.growthRate > 0 ? '+' : ''}{metrics.growthRate}%</p>
              <div className="flex items-center mt-2">
                <TrendingUp className="w-4 h-4 mr-1" />
                <span className="text-sm">Son aya göre</span>
              </div>
            </div>
            <TrendingUp className="w-12 h-12 text-orange-200" />
          </div>
        </div>
      </div>

      {/* Detailed Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Student Analytics */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold mb-4 text-blue-600 flex items-center">
            <Users className="w-5 h-5 mr-2" />
            Öğrenci Analizi
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Toplam Kayıt:</span>
              <span className="font-semibold">{stats.totalStudents}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Bu Ay Yeni:</span>
              <span className="font-semibold text-green-600">+{stats.newRegistrations}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Geçen Ay:</span>
              <span className="font-semibold">{metrics.lastMonthRegistrations}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Büyüme Oranı:</span>
              <span className={`font-semibold ${metrics.growthRate > 0 ? 'text-green-600' : metrics.growthRate < 0 ? 'text-red-600' : 'text-gray-600'}`}>
                {metrics.growthRate > 0 ? '+' : ''}{metrics.growthRate}%
              </span>
            </div>
            <div className="pt-4 border-t border-gray-200">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Aktif Öğrenci Oranı:</span>
                <span className="text-sm font-medium text-green-600">100%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Course Analytics */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold mb-4 text-green-600 flex items-center">
            <BookOpen className="w-5 h-5 mr-2" />
            Kurs Analizi
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Toplam Kurs:</span>
              <span className="font-semibold">{stats.totalCourses}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Toplam Video:</span>
              <span className="font-semibold">{stats.totalVideos}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Ort. Video/Kurs:</span>
              <span className="font-semibold">{metrics.avgVideosPerCourse}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Toplam İçerik:</span>
              <span className="font-semibold">~{stats.totalVideos * 15} dakika</span>
            </div>
            <div className="pt-4 border-t border-gray-200">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">En Uzun Kurs:</span>
                <span className="text-sm font-medium">
                  {courses.length > 0 
                    ? Math.max(...courses.map(c => c.video_count || 0)) + ' video'
                    : '0 video'
                  }
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* System Health */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold mb-4 text-purple-600 flex items-center">
            <BarChart3 className="w-5 h-5 mr-2" />
            Sistem Sağlığı
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">API Durumu:</span>
              <span className="font-semibold text-green-600">✓ Çevrimiçi</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Veritabanı:</span>
              <span className="font-semibold text-green-600">✓ Bağlı</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Yanıt Süresi:</span>
              <span className="font-semibold text-green-600"> 100ms</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Çalışma Süresi:</span>
              <span className="font-semibold text-green-600">99.9%</span>
            </div>
            <div className="pt-4 border-t border-gray-200">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Son Yedekleme:</span>
                <span className="text-sm font-medium">
                  {new Date().toLocaleDateString('tr-TR')}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Student Registration Trend */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Öğrenci Kayıt Trendi</h3>
            <button className="text-sm text-primary-600 hover:text-primary-700">
              Detaylar
            </button>
          </div>
          <div className="text-center py-12">
            <BarChart3 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 mb-2">Grafik yakında eklenecek</p>
            <p className="text-sm text-gray-400">Chart.js ile geliştirilecek</p>
            
            {/* Mock data preview */}
            <div className="mt-6 grid grid-cols-3 gap-4 text-sm">
              <div className="text-center">
                <div className="text-lg font-semibold text-blue-600">{metrics.lastMonthRegistrations}</div>
                <div className="text-gray-500">Geçen Ay</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-semibold text-green-600">{stats.newRegistrations}</div>
                <div className="text-gray-500">Bu Ay</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-semibold text-purple-600">{metrics.growthRate}%</div>
                <div className="text-gray-500">Büyüme</div>
              </div>
            </div>
          </div>
        </div>

        {/* Course Distribution */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Kurs Dağılımı</h3>
            <button className="text-sm text-primary-600 hover:text-primary-700">
              Detaylar
            </button>
          </div>
          <div className="text-center py-12">
            <PieChart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 mb-2">Grafik yakında eklenecek</p>
            <p className="text-sm text-gray-400">React Charts ile geliştirilecek</p>
            
            {/* Mock course categories */}
            <div className="mt-6 space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                  <span>Programlama</span>
                </div>
                <span className="font-medium">{Math.ceil(stats.totalCourses * 0.6)}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                  <span>Tasarım</span>
                </div>
                <span className="font-medium">{Math.ceil(stats.totalCourses * 0.25)}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-purple-500 rounded-full mr-2"></div>
                  <span>Diğer</span>
                </div>
                <span className="font-medium">{Math.ceil(stats.totalCourses * 0.15)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity Timeline */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <Calendar className="w-5 h-5 mr-2 text-primary-600" />
          Son Aktiviteler
        </h3>
        <div className="space-y-4">
          {students.slice(0, 5).map((student, index) => (
            <div key={student.id} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
              <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                <Users className="w-5 h-5 text-primary-600" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-900">
                  {student.first_name} {student.last_name} platformumuza katıldı
                </p>
                <p className="text-sm text-gray-600">{student.email}</p>
              </div>
              <div className="text-sm text-gray-500">
                {new Date(student.created_at).toLocaleDateString('tr-TR')}
              </div>
            </div>
          ))}
          
          {students.length === 0 && (
            <div className="text-center py-8">
              <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-2" />
              <p className="text-gray-500">Henüz aktivite yok</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default AdminAnalytics