import React, { useState, useEffect } from 'react'
import { BsCpu } from 'react-icons/bs'
import { FaMemory, FaHdd, FaNetworkWired } from 'react-icons/fa'

const SystemMonitor = () => {
    const [stats, setStats] = useState({
        cpu: 23,
        memory: 67,
        storage: 45,
        network: 89
    })

    useEffect(() => {
        // CPU updates every 1.5-3 seconds
        const cpuInterval = setInterval(() => {
            setStats(prev => ({
                ...prev,
                cpu: Math.floor(Math.random() * 40) + 15
            }))
        }, Math.random() * 1500 + 1500)

        // Memory updates every 2-4 seconds
        const memoryInterval = setInterval(() => {
            setStats(prev => ({
                ...prev,
                memory: Math.floor(Math.random() * 30) + 50
            }))
        }, Math.random() * 2000 + 2000)

        // Storage updates every 3-5 seconds
        const storageInterval = setInterval(() => {
            setStats(prev => ({
                ...prev,
                storage: Math.floor(Math.random() * 20) + 35
            }))
        }, Math.random() * 2000 + 3000)

        // Network updates every 1-2.5 seconds
        const networkInterval = setInterval(() => {
            setStats(prev => ({
                ...prev,
                network: Math.floor(Math.random() * 30) + 70
            }))
        }, Math.random() * 1500 + 1000)

        return () => {
            clearInterval(cpuInterval)
            clearInterval(memoryInterval)
            clearInterval(storageInterval)
            clearInterval(networkInterval)
        }
    }, [])

    const StatCard = ({ icon: Icon, label, value, color, gradient }) => (
        <div className="glass-panel p-5 lg:p-6 rounded-2xl">
            <div className="flex items-center justify-between mb-4">
                <div>
                    <div className="text-xs lg:text-sm text-white/70 mb-1">{label}</div>
                    <div className="text-2xl lg:text-3xl font-bold text-white transition-all duration-500">
                        {value}%
                    </div>
                </div>
                <div className={`w-14 h-14 lg:w-16 lg:h-16 bg-gradient-to-br ${gradient} rounded-2xl flex items-center justify-center shadow-lg`}>
                    <Icon className="text-white text-2xl lg:text-3xl" />
                </div>
            </div>
            <div className="w-full bg-white/10 rounded-full h-2.5 overflow-hidden">
                <div 
                    className={`bg-gradient-to-r ${color} h-2.5 rounded-full transition-all duration-1000 ease-out relative`}
                    style={{ width: `${value}%` }}
                >
                    <div className="absolute inset-0 bg-white/30 animate-pulse"></div>
                </div>
            </div>
            <div className="flex items-center justify-between mt-3">
                <div className="text-xs text-white/50">Real-time</div>
                <div className="flex items-center text-white/60">
                    <div className="w-1.5 h-1.5 bg-green-400 rounded-full mr-1.5 animate-pulse"></div>
                    <span className="text-xs">Live</span>
                </div>
            </div>
        </div>
    )

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
                icon={BsCpu}
                label="CPU Usage"
                value={stats.cpu}
                color="from-blue-400 to-blue-500"
                gradient="from-blue-500 to-blue-600"
            />
            <StatCard
                icon={FaMemory}
                label="Memory"
                value={stats.memory}
                color="from-green-400 to-green-500"
                gradient="from-green-500 to-green-600"
            />
            <StatCard
                icon={FaHdd}
                label="Storage"
                value={stats.storage}
                color="from-purple-400 to-purple-500"
                gradient="from-purple-500 to-purple-600"
            />
            <StatCard
                icon={FaNetworkWired}
                label="Network"
                value={stats.network}
                color="from-orange-400 to-orange-500"
                gradient="from-orange-500 to-orange-600"
            />
        </div>
    )
}

export default SystemMonitor
