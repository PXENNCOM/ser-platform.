// src/pages/LoginPage.jsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import { Mail, Lock, Eye, EyeOff, LogIn, ChevronLeft } from 'lucide-react'; // Yeni ikonlar eklendi

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const result = await login(data);
      if (result.success) {
        toast.success('Giriş başarılı!');
        navigate('/dashboard');
      } else {
        toast.error(result.message || 'Giriş başarısız!');
      }
    } catch (error) {
      toast.error('Giriş sırasında hata oluştu!');
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="relative w-full max-w-lg mx-auto p-8 md:p-10 bg-white rounded-xl shadow-2xl">
        
        {/* Ana Sayfaya Dön Butonu */}
        <div className="absolute top-4 left-4">
          <Link
            to="/"
            className="flex items-center text-sm font-medium text-gray-500 hover:text-emerald-600 transition-colors"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Ana sayfaya dön
          </Link>
        </div>

        {/* Header */}
        <div className="text-center mt-8">
          <div className="mx-auto h-16 w-16 flex items-center justify-center rounded-full bg-emerald-100 mb-4">
            <LogIn className="h-8 w-8 text-emerald-600" />
          </div>
          <h2 className="text-3xl font-extrabold text-gray-800">
            Hesabınıza giriş yapın
          </h2>
          <p className="mt-2 text-base text-gray-500">
            Eğitim yolculuğunuza devam edin
          </p>
        </div>

        {/* Form */}
        <div className="mt-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                E-posta adresi
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  className={`
                    appearance-none relative block w-full pl-10 pr-3 py-3 border rounded-lg placeholder-gray-400 text-gray-900 
                    focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all
                    ${errors.email ? 'border-red-400 bg-red-50' : 'border-gray-300'}
                  `}
                  placeholder="ornek@email.com"
                  {...register('email', {
                    required: 'E-posta adresi gerekli',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Geçerli bir e-posta adresi girin'
                    }
                  })}
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Şifre
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  className={`
                    appearance-none relative block w-full pl-10 pr-10 py-3 border rounded-lg placeholder-gray-400 text-gray-900 
                    focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all
                    ${errors.password ? 'border-red-400 bg-red-50' : 'border-gray-300'}
                  `}
                  placeholder="••••••••"
                  {...register('password', {
                    required: 'Şifre gerekli',
                    minLength: {
                      value: 6,
                      message: 'Şifre en az 6 karakter olmalı'
                    }
                  })}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                disabled={loading}
                className={`
                  group relative w-full flex justify-center py-3 px-4 border border-transparent text-lg font-bold rounded-lg text-white transition-all duration-300 transform hover:scale-105 shadow-lg
                  ${loading
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500'
                  }
                `}
              >
                {loading ? (
                  <div className="flex items-center">
                    <div className="animate-spin -ml-1 mr-3 h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
                    Giriş yapılıyor...
                  </div>
                ) : (
                  <div className="flex items-center">
                    <LogIn className="mr-2 h-5 w-5" />
                    Giriş Yap
                  </div>
                )}
              </button>
            </div>
          </form>

          {/* Footer Links */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">Hesabınız yok mu?</p>
            <Link
              to="/register"
              className="font-semibold text-emerald-600 hover:text-emerald-500 transition-colors mt-1 inline-block"
            >
              Hemen kayıt olun →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
