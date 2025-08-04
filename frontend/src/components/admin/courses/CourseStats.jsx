// src/components/admin/courses/CourseStats.jsx
import React from 'react'
import { BookOpen, Video, Calendar, Users } from 'lucide-react'

const CourseStats = ({ courses }) => {
  const totalVideos = courses.reduce((total, course) => total + (course.video_count || 0), 0)
  const avgVideos = courses.length > 0 ? Math.round(totalVideos / courses.length) : 0
  const maxVideos = courses.length > 0 ? Math.max(...courses.map(c => c.video_count || 0)) : 0

  const stats = [
    {
      title: 'Toplam Kurs',
      value: courses.length,
      icon: BookOpen,
      color: 'blue'
    },
    {
      title: 'Toplam Video',
      value: totalVideos,
      icon: Video,
      color: 'purple'
    },
    {
      title: 'Ortalama Video',
      value: avgVideos,
      icon: Calendar,
      color: 'green'
    },
    {
      title: 'En Uzun Kurs',
      value: `${maxVideos} video`,
      icon: Users,
      color: 'orange'
    }
  ]

  const getColorClasses = (color) => {
    const colors = {
      blue: 'text-blue-600',
      purple: 'text-purple-600',
      green: 'text-green-600',
      orange: 'text-orange-600'
    }
    return colors[color] || 'text-gray-600'
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <div key={index} className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center space-x-2">
            <stat.icon className={`w-5 h-5 ${getColorClasses(stat.color)}`} />
            <span className="text-sm font-medium text-gray-700">{stat.title}</span>
          </div>
          <p className="text-2xl font-bold text-gray-900 mt-2">{stat.value}</p>
        </div>
      ))}
    </div>
  )
}

export default CourseStats