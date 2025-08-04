// src/components/student/dashboard/MyCourses.jsx
import React from 'react'
import { BookOpen, User, Calendar, Play, RefreshCw, Layers } from 'lucide-react' // Yeni ikonlar eklendi
import EmptyCoursesState from './EmptyCoursesState'
import CourseCard from './CourseCard'

const MyCourses = ({ courses, onPlayCourse, onRefresh }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden"> {/* Daha belirgin gölge ve border */}
      {/* Başlık Bölümü */}
      <div className="p-6 border-b border-gray-100 bg-gray-50 flex items-center justify-between"> {/* Hafif gri arka plan */}
        <div className="flex items-center space-x-3">
          <Layers className="w-7 h-7 text-indigo-600" /> {/* Yeni ikon ve renk */}
          <h2 className="text-2xl font-bold text-gray-800">Kurslarım</h2> {/* Daha koyu metin */}
        </div>
        <div className="flex items-center space-x-3"> {/* Boşluk ayarı */}
          <span className="text-sm font-semibold text-gray-600 bg-indigo-100 px-4 py-2 rounded-full border border-indigo-200"> {/* Daha belirgin etiket */}
            Toplam {courses.length} Kurs
          </span>
          <button
            onClick={onRefresh}
            className="p-2 rounded-full text-gray-500 hover:text-indigo-700 hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200"
            title="Kursları Yenile"
            aria-label="Kursları Yenile"
          >
            <RefreshCw className="w-5 h-5" /> {/* İkon boyutu büyüdü */}
          </button>
        </div>
      </div>

      {/* İçerik Bölümü */}
      <div className="p-6 md:p-8"> {/* Daha fazla padding */}
        {courses.length === 0 ? (
          <EmptyCoursesState />
        ) : (
          <div className="space-y-5"> {/* Daha fazla boşluk */}
            {courses.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                onPlay={() => onPlayCourse(course)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default MyCourses