// src/pages/StudentDashboard.jsx
import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { courseService } from '../services/courseService'
import { toast } from 'react-toastify'
import Loading from '../components/common/Loading'

import WelcomeHeader from '../components/student/dashboard/WelcomeHeader'
import StatsGrid from '../components/student/dashboard/StatsGrid'
import MyCourses from '../components/student/dashboard/MyCourses'
import QuickActions from '../components/student/dashboard/QuickActions'
import CoursePlayerModal from '../components/student/modals/CoursePlayerModal'

const StudentDashboard = () => {
  const { user } = useAuth()
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedCourse, setSelectedCourse] = useState(null)
  const [showPlayerModal, setShowPlayerModal] = useState(false)
  const [stats, setStats] = useState({
    totalCourses: 0,
    totalVideos: 0,
    completedCourses: 0,
    totalWatchTime: 0
  })

  useEffect(() => {
    fetchMyCourses()
  }, [])

  const fetchMyCourses = async () => {
    try {
      const result = await courseService.getMyCourses()
      if (result.success) {
        setCourses(result.data.courses)
        calculateStats(result.data.courses)
      }
    } catch (error) {
      toast.error('Kurslar yüklenirken hata oluştu!')
    } finally {
      setLoading(false)
    }
  }

  const calculateStats = (coursesData) => {
    const totalVideos = coursesData.reduce((total, course) => total + (course.video_count || 0), 0)
    setStats({
      totalCourses: coursesData.length,
      totalVideos: totalVideos,
      completedCourses: 0, // TODO: Backend'den gelecek
      totalWatchTime: totalVideos * 15 // Ortalama 15 dk/video
    })
  }

 const handlePlayCourse = async (course) => {
  console.log('Play course clicked:', course) // Bu log çıkıyor mu?
  
  try {
    console.log('Fetching course detail for ID:', course.id)
    const result = await courseService.getMyCourseDetail(course.id)
    console.log('Course detail result:', result) // Bu log çıkıyor mu?
    
    if (result.success) {
      setSelectedCourse(result.data)
      setShowPlayerModal(true)
    }
  } catch (error) {
    console.error('ERROR:', error) // Hata var mı?
    toast.error('Kurs detayları yüklenirken hata oluştu!')
  }
}

  const closePlayerModal = () => {
    setShowPlayerModal(false)
    setSelectedCourse(null)
  }

  if (loading) {
    return <Loading text="Dashboard yükleniyor..." />
  }

  return (
    <div className="space-y-8 pb-16">
      <WelcomeHeader user={user} />
      
      <StatsGrid 
        stats={stats} 
        courses={courses} 
        user={user} 
      />
      
      <MyCourses 
        courses={courses}
        onPlayCourse={handlePlayCourse}
        onRefresh={fetchMyCourses}
      />
      
      {courses.length > 0 && <QuickActions />}

      {/* Course Player Modal */}
      {showPlayerModal && selectedCourse && (
        <CoursePlayerModal 
          course={selectedCourse}
          onClose={closePlayerModal}
        />
      )}
    </div>
  )
}

export default StudentDashboard