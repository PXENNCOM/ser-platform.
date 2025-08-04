// =============================================

// src/pages/HomePage.jsx
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { 
  BookOpen, Users, Award, ArrowRight, Play, Star, 
  CheckCircle, TrendingUp, Globe, Clock 
} from 'lucide-react'

const HomePage = () => {
  const { isAuthenticated, isAdmin, user } = useAuth()

  const features = [
    {
      icon: BookOpen,
      title: 'Kaliteli İçerik',
      description: 'Uzman eğitmenler tarafından hazırlanan güncel ve kapsamlı eğitim materyalleri.',
      color: 'text-blue-600'
    },
    {
      icon: Users,
      title: 'Topluluk Desteği',
      description: 'Binlerce öğrenci ile birlikte öğrenin, deneyimlerinizi paylaşın ve network oluşturun.',
      color: 'text-green-600'
    },
    {
      icon: Award,
      title: 'Sertifika Programı',
      description: 'Tamamladığınız kurslar için geçerli sertifikalar alın, kariyerinize değer katın.',
      color: 'text-purple-600'
    },
    {
      icon: Clock,
      title: 'Esnek Öğrenme',
      description: 'İstediğiniz zaman, istediğiniz yerden, kendi hızınızda öğrenme imkanı.',
      color: 'text-orange-600'
    },
    {
      icon: TrendingUp,
      title: 'İlerleme Takibi',
      description: 'Öğrenme sürecinizi takip edin, güçlü ve gelişim alanlarınızı keşfedin.',
      color: 'text-red-600'
    },
    {
      icon: Globe,
      title: 'Global Erişim',
      description: 'Dünya standartlarında eğitim içeriklerine her yerden erişim sağlayın.',
      color: 'text-indigo-600'
    }
  ]

  const stats = [
    { number: '10,000+', label: 'Aktif Öğrenci' },
    { number: '500+', label: 'Uzman Eğitmen' },
    { number: '1,200+', label: 'Video Ders' },
    { number: '50+', label: 'Farklı Kategori' }
  ]

  return (
    <div className="space-y-20">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-600 via-green-700 to-green-800 text-white py-20 rounded-2xl overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Geleceğinizi
              <span className="block text-green-300">Şekillendirin</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-blue-100">
              Kaliteli eğitim içerikleriyle kendinizi geliştirin. Uzman eğitmenlerden öğrenin, 
              sertifika kazanın ve kariyerinizde fark yaratın.
            </p>
            
            {!isAuthenticated ? (
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link 
                  to="/register" 
                  className="bg-green-500 hover:bg-green-400 text-gray-900 font-bold py-4 px-8 rounded-lg text-lg transition-all duration-200 transform hover:scale-105 flex items-center"
                >
                  <Play className="mr-2 h-5 w-5" />
                  Video İzle
                </Link>
                <Link 
                  to="/login" 
                  className="bg-transparent border-2 border-white hover:bg-white hover:text-primary-700 text-white font-medium py-4 px-8 rounded-lg text-lg transition-all duration-200"
                >
                  Giriş Yap
                </Link>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <p className="text-blue-100 mb-4">
                  Hoş geldin, <span className="font-semibold">{user?.first_name}</span>! 👋
                </p>
                <Link 
                  to={isAdmin ? "/admin" : "/dashboard"} 
                  className="bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-bold py-4 px-8 rounded-lg text-lg transition-all duration-200 transform hover:scale-105 flex items-center"
                >
                  <span>{isAdmin ? "Admin Panel" : "Dashboard'a Git"}</span>
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Neden Bizi Seçmelisiniz?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Modern eğitim yöntemleri ve teknoloji ile desteklenen öğrenme deneyimi
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
              >
                <div className="flex items-center mb-4">
                  <feature.icon className={`w-8 h-8 ${feature.color} mr-3`} />
                  <h3 className="text-xl font-semibold text-gray-900">
                    {feature.title}
                  </h3>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default HomePage