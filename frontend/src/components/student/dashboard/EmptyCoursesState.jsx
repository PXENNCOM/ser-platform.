// src/components/student/dashboard/EmptyCoursesState.jsx
import React from 'react'
import { BookOpen, Search, Lightbulb } from 'lucide-react' // Yeni ikonlar

const EmptyCoursesState = () => {
  return (
    <div className="text-center py-16 px-6 bg-gray-50 rounded-lg border border-dashed border-gray-200"> {/* Hafif arka plan ve kesikli border */}
      <div className="bg-indigo-100 rounded-full p-7 w-28 h-28 mx-auto mb-6 flex items-center justify-center shadow-inner"> {/* Daha büyük, renkli ve gölgeli ikon kapsayıcısı */}
        <BookOpen className="w-14 h-14 text-indigo-500" /> {/* Daha büyük ikon */}
      </div>
      <h3 className="text-2xl font-bold text-gray-700 mb-3"> {/* Daha büyük ve koyu başlık */}
        Henüz kayıtlı kursunuz bulunmamaktadır
      </h3>
      <p className="text-gray-500 text-lg mb-8 max-w-lg mx-auto"> {/* Daha büyük ve genişletilmiş açıklama */}
        Admin tarafından size kurs atandığında, başlamaya hazır kurslarınız burada görünecektir.
      </p>
      
      {/* İpucu Kutusu */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 max-w-lg mx-auto text-left shadow-sm"> {/* Daha yuvarlak ve gölgeli ipucu kutusu */}
        <div className="flex items-start space-x-3">
          <Lightbulb className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" /> {/* İpucu ikonu */}
          <div>
            <p className="text-blue-800 text-base font-semibold mb-1">
              Hızlı İpucu:
            </p>
            <p className="text-blue-700 text-sm">
              Kurs atanması için lütfen platform yöneticinizle iletişime geçin veya platformdaki "Yardım" bölümünü ziyaret edin.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EmptyCoursesState