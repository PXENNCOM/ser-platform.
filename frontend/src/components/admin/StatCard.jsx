// src/components/admin/StatCard.jsx
import { TrendingUp } from 'lucide-react'

const StatCard = ({ title, value, icon: Icon, color, change, changeType, trend }) => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-3xl font-bold text-gray-900">{value}</p>
        </div>
        <div className={`${color} rounded-lg p-3`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
      {change && (
        <div className="mt-4 flex items-center text-sm">
          <TrendingUp className={`w-4 h-4 mr-1 ${changeType === 'positive' ? 'text-green-500' : 'text-red-500'}`} />
          <span className={`font-medium ${changeType === 'positive' ? 'text-green-600' : 'text-red-600'}`}>
            {change}
          </span>
          <span className="text-gray-600 ml-1">{trend}</span>
        </div>
      )}
    </div>
  )
}

export default StatCard