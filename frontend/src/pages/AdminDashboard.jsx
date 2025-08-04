// src/pages/AdminDashboard.jsx - Main Page
import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { adminService } from '../services/adminService'
import { courseService } from '../services/courseService'
import { toast } from 'react-toastify'

// Import Components
import AdminHeader from '../components/admin/AdminHeader'
import AdminTabs from '../components/admin/AdminTabs'
import AdminOverview from '../components/admin/AdminOverview'
import AdminCourses from '../components/admin/courses/AdminCourses'
import AdminStudents from '../components/admin/AdminStudents'
import AdminAnalytics from '../components/admin/AdminAnalytics'
import AdminSettings from '../components/admin/AdminSettings'
import AdminFooter from '../components/admin/AdminFooter'

const AdminDashboard = () => {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState('overview')
  const [loading, setLoading] = useState(false)
  const [refreshing, setRefreshing] = useState(false)
  
  // Real Data States
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalCourses: 0,
    totalVideos: 0,
    newRegistrations: 0
  })
  const [courses, setCourses] = useState([])
  const [students, setStudents] = useState([])

  useEffect(() => {
    fetchDashboardData()
  }, [])

  // REAL API CALLS
  const fetchDashboardData = async () => {
    setLoading(true)
    try {
      await Promise.all([
        fetchCourses(),
        fetchStudents()
      ])
    } catch (error) {
      toast.error('Dashboard verileri yüklenirken hata oluştu!')
    } finally {
      setLoading(false)
    }
  }

  const fetchCourses = async () => {
    try {
      const result = await courseService.getAllCourses()
      if (result.success) {
        setCourses(result.data.courses)
      }
    } catch (error) {
      console.error('Fetch courses error:', error)
    }
  }

  const fetchStudents = async () => {
    try {
      const result = await adminService.getStudents()
      if (result.success) {
        setStudents(result.data.students)
      }
    } catch (error) {
      console.error('Fetch students error:', error)
    }
  }

  // Calculate stats when data changes
  useEffect(() => {
    const totalVideos = courses.reduce((total, course) => total + (course.video_count || 0), 0)
    const oneMonthAgo = new Date()
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1)
    const newRegistrations = students.filter(student => {
      const createdAt = new Date(student.created_at)
      return createdAt > oneMonthAgo
    }).length

    setStats({
      totalStudents: students.length,
      totalCourses: courses.length,
      totalVideos: totalVideos,
      newRegistrations: newRegistrations
    })
  }, [courses, students])

  const refreshData = async () => {
    setRefreshing(true)
    await fetchDashboardData()
    setRefreshing(false)
    toast.success('Veriler güncellendi!')
  }

  // Shared props for all admin components
  const sharedProps = {
    stats,
    courses,
    students,
    refreshing,
    onRefresh: refreshData,
    onCoursesUpdate: fetchCourses,
    onStudentsUpdate: fetchStudents
  }

  const renderTabContent = () => {
    if (loading) {
      return (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        </div>
      )
    }

    switch (activeTab) {
      case 'overview':
        return <AdminOverview {...sharedProps} />
      case 'courses':
        return <AdminCourses {...sharedProps} />
      case 'students':
        return <AdminStudents {...sharedProps} />
      case 'analytics':
        return <AdminAnalytics {...sharedProps} />
      case 'settings':
        return <AdminSettings {...sharedProps} user={user} />
      default:
        return <AdminOverview {...sharedProps} />
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <AdminHeader user={user} stats={stats} />

      {/* Tabs */}
      <AdminTabs activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Tab Content */}
      <div className="bg-white rounded-b-xl shadow-sm border border-gray-200 border-t-0">
        <div className="p-6">
          {renderTabContent()}
        </div>
      </div>

      {/* Footer */}
      <AdminFooter stats={stats} onRefresh={refreshData} refreshing={refreshing} />
    </div>
  )
}

export default AdminDashboard
