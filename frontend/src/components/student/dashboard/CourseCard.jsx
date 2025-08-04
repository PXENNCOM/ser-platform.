// src/components/student/dashboard/CourseCard.jsx
import React from 'react'
import { User, Calendar, Play, BookText, Clock } from 'lucide-react' // Ek ikonlar

const CourseCard = ({ course, onPlay }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('tr-TR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  // TODO: Backend'den gelecek progress bilgisi - Örnek olarak rastgele bir değer atayalım
  const progress = course.progress || Math.floor(Math.random() * 101); // Eğer progress yoksa rastgele atama

  return (
    <div className="relative bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"> {/* Daha belirgin gölge, geçiş ve hafif yukarı kayma efekti */}
      {/* Kartın Sağ Üst Köşesinde İlerleme Yüzdesi */}
      <div className="absolute top-4 right-4 bg-indigo-100 text-indigo-700 text-xs font-bold px-3 py-1 rounded-full shadow-md">
        %{progress}
      </div>

      <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
        <div className="flex-1 md:pr-4 mb-4 md:mb-0">
          <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-3 mb-2">
            <h3 className="text-xl font-bold text-gray-800 line-clamp-2 leading-snug"> {/* Daha büyük başlık */}
              {course.title}
            </h3>
            <span className="text-sm font-semibold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full whitespace-nowrap mt-2 sm:mt-0"> {/* Daha belirgin video sayısı */}
              <BookText className="w-4 h-4 inline-block mr-1 text-indigo-500" />
              {course.video_count || 0} Ders
            </span>
          </div>

          {course.description && (
            <p className="text-gray-600 text-base mb-4 line-clamp-2"> {/* Daha büyük metin */}
              {course.description}
            </p>
          )}

          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-500 mt-4"> {/* Boşluk ve düzenleme */}
            <div className="flex items-center">
              <User className="w-4 h-4 mr-1 text-gray-400" />
              <span>
                {course.instructor_first_name || course.first_name} {course.instructor_last_name || course.last_name}
              </span>
            </div>
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-1 text-gray-400" />
              <span>
                {formatDate(course.assigned_at || course.created_at)}
              </span>
            </div>
            {/* Süre bilgisi eklenebilir (örneğin course.duration) */}
            {course.duration && (
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-1 text-gray-400" />
                <span>
                  {course.duration} dakika
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="flex-shrink-0 flex flex-col items-center md:items-end space-y-3"> {/* Ortalanmış buton ve metin */}
          <button
            onClick={onPlay}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-full text-base font-semibold transition-all duration-300 flex items-center shadow-md transform hover:scale-105" // Daha büyük ve yuvarlak buton
          >
            <Play className="w-5 h-5 mr-2" /> {/* İkon boyutu büyüdü */}
            {progress > 0 && progress < 100 ? 'Devam Et' : (progress === 100 ? 'Tekrar Başla' : 'Hemen Başla')} {/* Dinamik metin */}
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mt-6"> {/* Daha fazla üst boşluk */}
        <div className="bg-gray-200 rounded-full h-2.5 overflow-hidden"> {/* Daha kalın progress bar */}
          <div
            className="bg-gradient-to-r from-blue-500 to-indigo-600 h-full rounded-full transition-all duration-500 ease-out" // Gradyanlı progress bar
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
    </div>
  )
}

export default CourseCard