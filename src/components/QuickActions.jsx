import React from 'react'
import { FaRocket, FaSync, FaShieldAlt, FaChartBar } from 'react-icons/fa'

const QuickActions = () => {
    const actions = [
        { icon: FaRocket, label: 'Optimize', color: 'from-blue-500 to-blue-600' },
        { icon: FaSync, label: 'Refresh', color: 'from-green-500 to-green-600' },
        { icon: FaShieldAlt, label: 'Security', color: 'from-purple-500 to-purple-600' },
        { icon: FaChartBar, label: 'Analytics', color: 'from-orange-500 to-orange-600' }
    ]

    return (
        <div className="glass-panel p-4 rounded-2xl">
            <div className="text-sm font-semibold text-white mb-3">Quick Actions</div>
            <div className="grid grid-cols-4 gap-2">
                {actions.map((action, index) => (
                    <button
                        key={index}
                        className="group flex flex-col items-center gap-2 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all cursor-pointer border border-white/10"
                    >
                        <div className={`w-10 h-10 bg-gradient-to-br ${action.color} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                            <action.icon className="text-white text-base" />
                        </div>
                        <span className="text-xs text-white/70">{action.label}</span>
                    </button>
                ))}
            </div>
        </div>
    )
}

export default QuickActions
