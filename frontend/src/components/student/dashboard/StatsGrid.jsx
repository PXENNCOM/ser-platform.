// src/components/student/dashboard/StatsGrid.jsx
import React from 'react';
import {
  BookOpen, Clock, User, Trophy, Calendar, // Calendar ikonu geri geldi
  Video
} from 'lucide-react';

const StatsGrid = ({ stats, user }) => { // user prop'ı tekrar eklendi

  const formatDate = (dateString) => { // formatDate fonksiyonu geri geldi
    return new Date(dateString).toLocaleDateString('tr-TR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // İstatistik kartları için renk paleti ve ikonlar
  const statsData = [
    {
      title: 'Aktif Kurslar',
      value: stats.totalCourses,
      icon: BookOpen,
      bgColorClass: 'bg-gradient-to-br from-blue-500 to-blue-600', // Mavi gradyan
      iconColorClass: 'text-black', // İkon rengini beyaz yap
    },
    {
      title: 'Toplam Video',
      value: stats.totalVideos,
      icon: Video,
      bgColorClass: 'bg-gradient-to-br from-purple-500 to-purple-600', // Mor gradyan
      iconColorClass: 'text-black',
    },
    {
      title: 'Tamamlanan',
      value: stats.completedCourses,
      icon: Trophy,
      bgColorClass: 'bg-gradient-to-br from-green-500 to-green-600', // Yeşil gradyan
      iconColorClass: 'text-black',
    },
    {
      title: 'Üyelik Durumu', // Başlık: "Üyelik Durumu"
      value: 'Aktif', // Değer: "Aktif"
      icon: User,
      bgColorClass: 'bg-gradient-to-br from-orange-500 to-orange-600', // Turuncu gradyan
      iconColorClass: 'text-black', // İkon rengini siyah yap
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statsData.map((stat, index) => (
        <div
          key={index}
          className={`${stat.bgColorClass} rounded-2xl p-6 shadow-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-xl relative overflow-hidden`}
        >
          {/* Arka plan deseni veya vurgu elemanı */}
          <div className="absolute top-0 right-0 -mr-4 -mt-4 opacity-10">
            <stat.icon className={`w-24 h-24 ${stat.iconColorClass}`} />
          </div>

          <div className="relative z-10">
            <div className="flex items-start justify-between mb-0">
              <div>
                <p className="text-lg font-medium text-white opacity-80 mb-1">{stat.title}</p>
                <p className="text-4xl font-bold text-white leading-none">
                  {stat.title === 'Üyelik Durumu' ? ( // Sadece "Üyelik Durumu" için özel gösterim
                    <>
                      {stat.value}
                    </>
                  ) : (
                    stat.value
                  )}
                </p>
              </div>
              <div className="bg-white bg-opacity-30 rounded-full p-3 flex-shrink-0">
                <stat.icon className={`w-8 h-8 ${stat.iconColorClass}`} />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsGrid;