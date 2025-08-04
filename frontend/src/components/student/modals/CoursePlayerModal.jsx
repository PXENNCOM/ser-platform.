// src/components/student/modals/CoursePlayerModal.jsx
import React, { useState } from 'react'
import { X, Play, BookOpen, User, Clock, ExternalLink, List } from 'lucide-react'

const CoursePlayerModal = ({ course, onClose }) => {
  const [selectedVideo, setSelectedVideo] = useState(course.videos?.[0] || null)
  const [showVideoList, setShowVideoList] = useState(true)

  const formatVideoUrl = (url) => {
    if (!url) return ''
    
    // YouTube URL'lerini embed formatına çevir
    if (url.includes('youtube.com/watch?v=')) {
      const videoId = url.split('v=')[1]?.split('&')[0]
      return `https://www.youtube.com/embed/${videoId}?autoplay=1`
    }
    if (url.includes('youtu.be/')) {
      const videoId = url.split('youtu.be/')[1]?.split('?')[0]
      return `https://www.youtube.com/embed/${videoId}?autoplay=1`
    }
    
    // Vimeo URLs
    if (url.includes('vimeo.com/')) {
      const videoId = url.split('vimeo.com/')[1]
      return `https://player.vimeo.com/video/${videoId}?autoplay=1`
    }
    
    return url
  }

  const handleVideoSelect = (video) => {
    setSelectedVideo(video)
  }

  if (!course.videos || course.videos.length === 0) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-xl max-w-md w-full p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Kurs Videoları</h3>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <X className="w-6 h-6" />
            </button>
          </div>
          <div className="text-center py-8">
            <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h4 className="text-lg font-medium text-gray-600 mb-2">Bu kursda henüz video yok</h4>
            <p className="text-gray-500">Kurs içeriği hazırlanıyor. Lütfen daha sonra tekrar kontrol edin.</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl w-full max-w-7xl h-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-primary-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{course.course.title}</h3>
              <p className="text-sm text-gray-500">
                {course.course.instructor_first_name} {course.course.instructor_last_name}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button 
              onClick={() => setShowVideoList(!showVideoList)}
              className="text-gray-500 hover:text-gray-700 p-2 hover:bg-gray-100 rounded-lg"
              title={showVideoList ? 'Video listesini gizle' : 'Video listesini göster'}
            >
              <List className="w-5 h-5" />
            </button>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 p-2">
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 flex overflow-hidden">
          {/* Video Player */}
          <div className={`flex-1 flex flex-col ${showVideoList ? 'pr-4' : ''}`}>
            <div className="flex-1 bg-black rounded-lg m-4 overflow-hidden">
              {selectedVideo ? (
                <iframe
                  src={formatVideoUrl(selectedVideo.video_url)}
                  className="w-full h-full"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title={selectedVideo.title}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-center text-white">
                    <Play className="w-20 h-20 mx-auto mb-4 opacity-50" />
                    <p className="text-lg">Video seçin</p>
                  </div>
                </div>
              )}
            </div>
            
            {/* Video Info */}
            {selectedVideo && (
              <div className="px-4 pb-4">
                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                  {selectedVideo.title}
                </h4>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    <span>~15 dakika</span>
                  </div>
                  <div className="flex items-center">
                    <User className="w-4 h-4 mr-1" />
                    <span>{course.course.instructor_first_name} {course.course.instructor_last_name}</span>
                  </div>
                  <a 
                    href={selectedVideo.video_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-primary-600 hover:text-primary-700"
                  >
                    <ExternalLink className="w-4 h-4 mr-1" />
                    <span>Orijinal linki aç</span>
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* Video List Sidebar */}
          {showVideoList && (
            <div className="w-80 border-l border-gray-200 overflow-y-auto">
              <div className="p-4">
                <h4 className="font-semibold text-gray-900 mb-4">
                  Kurs İçeriği ({course.videos.length} video)
                </h4>
                <div className="space-y-2">
                  {course.videos.map((video, index) => (
                    <button
                      key={video.id}
                      onClick={() => handleVideoSelect(video)}
                      className={`w-full text-left p-3 rounded-lg border transition-colors ${
                        selectedVideo?.id === video.id
                          ? 'border-primary-200 bg-primary-50'
                          : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-medium ${
                          selectedVideo?.id === video.id
                            ? 'bg-primary-100 text-primary-600'
                            : 'bg-gray-100 text-gray-600'
                        }`}>
                          {video.order_number || index + 1}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h5 className={`font-medium text-sm line-clamp-2 ${
                            selectedVideo?.id === video.id
                              ? 'text-primary-900'
                              : 'text-gray-900'
                          }`}>
                            {video.title}
                          </h5>
                          <p className="text-xs text-gray-500 mt-1">
                            ~15 dakika
                          </p>
                        </div>
                        {selectedVideo?.id === video.id && (
                          <Play className="w-4 h-4 text-primary-600" />
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default CoursePlayerModal