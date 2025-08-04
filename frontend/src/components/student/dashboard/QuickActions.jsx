// src/components/student/dashboard/QuickActions.jsx
import React from 'react'
import { ChevronRight } from 'lucide-react'

const QuickActions = () => {
  const actions = [
    {
      title: 'Profili Güncelle',
      description: 'Kişisel bilgilerinizi düzenleyin',
      onClick: () => console.log('Profile update')
    },
    {
      title: 'Sertifikalarım',
      description: 'Kazandığınız sertifikaları görün',
      onClick: () => console.log('Certificates')
    },
    {
      title: 'Destek',
      description: 'Yardım ve destek alın',
      onClick: () => console.log('Support')
    }
  ]

  return (
    <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Hızlı Eylemler</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {actions.map((action, index) => (
          <button 
            key={index}
            onClick={action.onClick}
            className="bg-white hover:bg-gray-50 border border-gray-200 rounded-lg p-4 text-left transition-colors"
          >
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-gray-900">{action.title}</h4>
                <p className="text-sm text-gray-600 mt-1">{action.description}</p>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}

export default QuickActions