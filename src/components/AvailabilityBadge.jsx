import React from 'react'
import { FaCheckCircle } from 'react-icons/fa'

const AvailabilityBadge = () => {
    return (
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 border-2 border-green-500/30 rounded-full">
            <div className="relative">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                <div className="absolute inset-0 w-3 h-3 bg-green-400 rounded-full animate-ping"></div>
            </div>
            <span className="text-green-400 font-semibold text-sm">Available for Hire</span>
            <FaCheckCircle className="text-green-400" />
        </div>
    )
}

export default AvailabilityBadge
