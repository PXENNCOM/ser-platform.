// src/pages/RegisterPage.jsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import DatePicker, { registerLocale } from 'react-datepicker';
import tr from 'date-fns/locale/tr';
import 'react-datepicker/dist/react-datepicker.css';
import {
  Mail, Lock, User, Phone, MapPin, Calendar, Eye, EyeOff,
  UserPlus, Check, ChevronLeft
} from 'lucide-react';

// Türkçe locale'i kaydetme
registerLocale('tr', tr);

const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  const { register: registerUser } = useAuth();
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const password = watch('password');

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const formattedData = {
        ...data,
        date_of_birth: selectedDate ? selectedDate.toISOString().split('T')[0] : null
      };

      const result = await registerUser(formattedData);
      if (result.success) {
        toast.success('Kayıt başarılı! Hoş geldiniz!');
        navigate('/dashboard');
      } else {
        toast.error(result.message || 'Kayıt başarısız!');
      }
    } catch (error) {
      toast.error('Kayıt sırasında hata oluştu!');
      console.error('Register error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="relative w-full max-w-2xl mx-auto p-8 md:p-10 bg-white rounded-xl shadow-2xl">
        
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
        <div className="text-center mt-8 mb-8">
          <div className="mx-auto h-16 w-16 flex items-center justify-center rounded-full bg-emerald-100 mb-4">
            <UserPlus className="h-8 w-8 text-emerald-600" />
          </div>
          <h2 className="text-3xl font-extrabold text-gray-800">
            Hesap Oluşturun
          </h2>
          <p className="mt-2 text-base text-gray-500">
            Öğrenme yolculuğunuza başlayın
          </p>
        </div>

        {/* Form */}
        <div>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Ad Soyad */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="first_name" className="block text-sm font-medium text-gray-700 mb-1">
                  Ad <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    id="first_name"
                    type="text"
                    className={`
                      w-full pl-10 py-3 pr-3 border rounded-lg placeholder-gray-400 text-gray-900 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all
                      ${errors.first_name ? 'border-red-400 bg-red-50' : 'border-gray-300'}
                    `}
                    placeholder="Adınız"
                    {...register('first_name', {
                      required: 'Ad gerekli',
                      minLength: { value: 2, message: 'Ad en az 2 karakter olmalı' }
                    })}
                  />
                </div>
                {errors.first_name && (
                  <p className="mt-1 text-sm text-red-600">{errors.first_name.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="last_name" className="block text-sm font-medium text-gray-700 mb-1">
                  Soyad <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    id="last_name"
                    type="text"
                    className={`
                      w-full pl-10 py-3 pr-3 border rounded-lg placeholder-gray-400 text-gray-900 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all
                      ${errors.last_name ? 'border-red-400 bg-red-50' : 'border-gray-300'}
                    `}
                    placeholder="Soyadınız"
                    {...register('last_name', {
                      required: 'Soyad gerekli',
                      minLength: { value: 2, message: 'Soyad en az 2 karakter olmalı' }
                    })}
                  />
                </div>
                {errors.last_name && (
                  <p className="mt-1 text-sm text-red-600">{errors.last_name.message}</p>
                )}
              </div>
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                E-posta <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  id="email"
                  type="email"
                  className={`
                    w-full pl-10 py-3 pr-3 border rounded-lg placeholder-gray-400 text-gray-900 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all
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

            {/* Şifre */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Şifre <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  className={`
                    w-full pl-10 pr-10 py-3 border rounded-lg placeholder-gray-400 text-gray-900 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all
                    ${errors.password ? 'border-red-400 bg-red-50' : 'border-gray-300'}
                  `}
                  placeholder="En az 6 karakter"
                  {...register('password', {
                    required: 'Şifre gerekli',
                    minLength: { value: 6, message: 'Şifre en az 6 karakter olmalı' }
                  })}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
              )}
              
              {/* Password strength indicator */}
              {password && (
                <div className="mt-2">
                  <div className="flex items-center space-x-2 text-xs">
                    <div className={`h-1 w-full rounded ${password.length >= 6 ? 'bg-emerald-500' : 'bg-gray-300'}`}></div>
                    <span className={password.length >= 6 ? 'text-emerald-600' : 'text-gray-500'}>
                      {password.length >= 6 ? 'Güçlü' : 'Zayıf'}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Telefon ve Doğum Tarihi */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Telefon
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    id="phone"
                    type="tel"
                    className="w-full pl-10 py-3 pr-3 border border-gray-300 rounded-lg placeholder-gray-400 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                    placeholder="0555 123 45 67"
                    {...register('phone')}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="date_of_birth" className="block text-sm font-medium text-gray-700 mb-1">
                  Doğum Tarihi
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 z-10" />
                  <DatePicker
                    id="date_of_birth"
                    selected={selectedDate}
                    onChange={(date) => setSelectedDate(date)}
                    className="w-full pl-10 py-3 pr-3 border border-gray-300 rounded-lg placeholder-gray-400 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                    placeholderText="Tarih seçin"
                    dateFormat="dd/MM/yyyy"
                    maxDate={new Date()}
                    showYearDropdown
                    yearDropdownItemNumber={50}
                    locale="tr"
                  />
                </div>
              </div>
            </div>

            {/* Cinsiyet ve Şehir */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">
                  Cinsiyet
                </label>
                <div className="relative">
                  <select
                    id="gender"
                    className="w-full pl-3 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all appearance-none bg-white"
                    {...register('gender')}
                  >
                    <option value="">Seçin</option>
                    <option value="male">Erkek</option>
                    <option value="female">Kadın</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                  Şehir
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    id="city"
                    type="text"
                    className="w-full pl-10 py-3 pr-3 border border-gray-300 rounded-lg placeholder-gray-400 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                    placeholder="İstanbul"
                    {...register('city')}
                  />
                </div>
              </div>
            </div>

            {/* Adres */}
            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                Adres
              </label>
              <textarea
                id="address"
                rows={3}
                className="w-full px-3 py-3 border border-gray-300 rounded-lg placeholder-gray-400 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all resize-none"
                placeholder="Mahalle, sokak, apartman no..."
                {...register('address')}
              />
            </div>

            {/* Submit Button */}
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
                  Kayıt yapılıyor...
                </div>
              ) : (
                <div className="flex items-center">
                  <Check className="mr-2 h-5 w-5" />
                  Hesap Oluştur
                </div>
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">Zaten hesabınız var mı?</p>
            <Link
              to="/login"
              className="font-semibold text-emerald-600 hover:text-emerald-500 transition-colors mt-1 inline-block"
            >
              Giriş yapın →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
