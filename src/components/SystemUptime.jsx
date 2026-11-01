import React, { useState, useEffect } from 'react'
import { FaClock } from 'react-icons/fa'

const SystemUptime = () => {
    const [uptime, setUptime] = useState(0)

    useEffect(() => {
        const startTime = Date.now()
        const interval = setInterval(() => {
            setUptime(Math.floor((Date.now() - startTime) / 1000))
        }, 1000)

        return () => clearInterval(interval)
    }, [])

    const formatUptime = (seconds) => {
        const hrs = Math.floor(seconds / 3600)
        const mins = Math.floor((seconds % 3600) / 60)
        const secs = seconds % 60
        return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
    }

    return (
        <div className="glass-panel p-4 rounded-2xl flex items-center justify-between">
            <div className="flex items-center">
                <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-xl flex items-center justify-center mr-3">
                    <FaClock className="text-white text-lg" />
                </div>
                <div>
                    <div className="text-xs text-white/70">System Uptime</div>
                    <div className="text-xl font-bold text-white font-mono">{formatUptime(uptime)}</div>
                </div>
            </div>
            <div className="flex items-center text-white/60">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                <span className="text-xs">Active</span>
            </div>
        </div>
    )
}

export default SystemUptime
