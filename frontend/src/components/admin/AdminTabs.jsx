// src/components/admin/AdminTabs.jsx
import { BarChart3, BookOpen, Users, PieChart, Settings } from 'lucide-react'

const AdminTabs = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'overview', label: 'Genel Bakış', icon: BarChart3 },
    { id: 'courses', label: 'Kurs Yönetimi', icon: BookOpen },
    { id: 'students', label: 'Öğrenci Yönetimi', icon: Users },
    { id: 'analytics', label: 'Analitik', icon: PieChart },
    { id: 'settings', label: 'Ayarlar', icon: Settings },
  ]

  return (
    <div className="border-b border-gray-200 bg-white rounded-t-xl shadow-sm">
      <nav className="flex space-x-8 px-6">
        {tabs.map((tab) => {
          const Icon = tab.icon
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-primary-500 text-primary-600 bg-primary-50'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          )
        })}
      </nav>
    </div>
  )
}

export default AdminTabs
