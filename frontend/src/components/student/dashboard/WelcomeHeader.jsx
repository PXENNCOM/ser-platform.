// src/components/student/dashboard/WelcomeHeader.jsx
import React from 'react';
import { Trophy, Award, Sparkles } from 'lucide-react'; // Yeni ikon seçenekleri

const WelcomeHeader = ({ user }) => {
  return (
    <div className="relative bg-gradient-to-br from-green-600 to-green-900 rounded-3xl p-8 md:p-10 text-white shadow-xl overflow-hidden">
      {/* Arka Plan Desenleri/Efektleri (Soyut Dalgalar veya Geometrik Şekiller) */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path
            fill="url(#gradient-wave)"
            d="M0,50 C20,70 40,30 60,50 C80,70 100,30 100,50 L100,100 L0,100 Z"
          ></path>
          <defs>
            <linearGradient id="gradient-wave" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0.05" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between">
        <div className="mb-6 md:mb-0 md:pr-8">
          <p className="text-xl font-semibold text-white mb-2">Merhaba,</p>
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-3 leading-tight animate-fade-in-up">
            <span className="text-yellow-300 drop-shadow-lg">{user?.first_name}</span> Hoş Geldin! 👋
          </h1>
          <p className="text-white text-lg sm:text-xl max-w-lg">
            Öğrenmeye kaldığın yerden devam etmeye ne dersin? Yeni dersler ve başarılar seni bekliyor!
          </p>
        </div>

        {/* Ödül/Motivasyon İkonu */}
        <div className="flex-shrink-0">
          <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-full p-5 md:p-6 border-2 border-white border-opacity-30 transform hover:scale-105 transition-transform duration-300 ease-in-out">
            {/* İkon seçimi: Trophy, Award veya Sparkles */}
            <Award className="w-16 h-16 sm:w-20 sm:h-20 text-green-700 drop-shadow-md" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeHeader;