// src/components/common/Navbar.jsx
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { LogOut, LayoutDashboard, Settings } from 'lucide-react'; // Settings ikonu eklendi

const Navbar = () => {
  const { user, logout, isAuthenticated, isAdmin } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <>
      {isAuthenticated && (
        <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 mb-6 z-30">
          <div className="bg-gray-800 bg-opacity-90 backdrop-blur-sm p-3 rounded-full shadow-lg flex items-center space-x-6 border border-gray-700">
            {/* Dashboard İkonu */}
            <Link
              to="/dashboard"
              className="p-3 bg-emerald-600 rounded-full text-white hover:bg-emerald-700 transition duration-200 ease-in-out transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-gray-800"
              aria-label="Kontrol Paneli"
            >
              <LayoutDashboard className="w-6 h-6" />
            </Link>

            {/* Admin Paneli İkonu (Sadece admin kullanıcılar için) */}
            {isAdmin && (
              <Link
                to="/admin"
                className="p-3 bg-gray-600 rounded-full text-white hover:bg-gray-700 transition duration-200 ease-in-out transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-800"
                aria-label="Admin Paneli"
              >
                <Settings className="w-6 h-6" />
              </Link>
            )}

            {/* Çıkış İkonu */}
            <button
              onClick={handleLogout}
              className="p-3 bg-red-600 rounded-full text-white hover:bg-red-700 transition duration-200 ease-in-out transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-800"
              aria-label="Çıkış Yap"
            >
              <LogOut className="w-6 h-6" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;