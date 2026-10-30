import { useState, useEffect } from 'react'
import { GoSearch } from "react-icons/go";
import { FaBatteryHalf } from "react-icons/fa";
import {
    FaWindows,
    FaWifi,
    FaVolumeUp,
    FaChevronUp,
    FaGlobe,
    FaExternalLinkAlt
} from 'react-icons/fa'
import { BsGlobe2 } from 'react-icons/bs'
import StartMenu from './StartMenu'

const Taskbar = ({ windows, activeWindow, onRestoreWindow }) => {
    const [currentTime, setCurrentTime] = useState(new Date())
    const [showBatteryTooltip, setShowBatteryTooltip] = useState(false)
    const [showWifiTooltip, setShowWifiTooltip] = useState(false)
    const [showVolumeTooltip, setShowVolumeTooltip] = useState(false)
    const [isStartMenuOpen, setIsStartMenuOpen] = useState(false)
    const [showNotifications, setShowNotifications] = useState(false)

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date())
        }, 1000)

        return () => clearInterval(timer)
    }, [])

    const formatTime = (date) => {
        return date.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        })
    }

    const formatDate = (date) => {
        const options = {
            day: '2-digit',
            month: 'short',
            year: '2-digit'
        }
        return date.toLocaleDateString('en-GB', options)
    }

    // Mobile-friendly short date format
    const formatMobileDate = (date) => {
        const options = {
            day: '2-digit',
            month: '2-digit',
            year: '2-digit'
        }
        return date.toLocaleDateString('en-GB', options)
    }



    return (
        <>
            <StartMenu
                isOpen={isStartMenuOpen}
                onClose={() => setIsStartMenuOpen(false)}
            />
            
            {/* Notification Panel - Modern Glass */}
            {showNotifications && (
                <>
                    <div className="fixed bottom-14 right-2 w-80 sm:w-96 glass rounded-2xl shadow-2xl z-50 overflow-hidden">
                        {/* Personal Site Widget */}
                        <div className="p-6">
                            {/* Header */}
                            <div className="flex items-center gap-4 mb-5">
                                <div className="w-14 h-14 glass-panel rounded-2xl flex items-center justify-center">
                                    <BsGlobe2 className="text-white text-2xl" />
                                </div>
                                <div>
                                    <h3 className="text-white font-bold text-base">
                                        Personal Site
                                    </h3>
                                    <p className="text-white/60 text-sm">Live Portfolio</p>
                                </div>
                            </div>

                            {/* Visit Button */}
                            <button
                                onClick={() => window.open('https://iamthomas.vercel.app/', '_blank', 'noopener,noreferrer')}
                                className="w-full glass-panel hover:bg-white/15 text-white font-semibold py-3.5 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer hover-glow"
                            >
                                <FaGlobe className="text-lg" />
                                Visit My Site
                                <FaExternalLinkAlt className="text-sm" />
                            </button>
                        </div>
                        
                        {/* Bottom Arrow Pointer */}
                        <div className="absolute -bottom-2 right-10 w-4 h-4 glass border-r border-b border-white/10 transform rotate-45"></div>
                    </div>
                </>
            )}
            
            <div className="fixed bottom-0 left-0 right-0 h-12 glass-dark flex items-center justify-between px-2 z-50 border-t border-white/10">
                {/* Left Side - Start Button and Search */}
                <div className="flex items-center gap-0.5 flex-1 min-w-0">
                    {/* Windows Start Button */}
                    <button
                        onClick={() => setIsStartMenuOpen(!isStartMenuOpen)}
                        className={`w-10 sm:w-12 h-10 rounded-lg cursor-pointer flex items-center justify-center transition-all duration-200 group flex-shrink-0 ${isStartMenuOpen ? 'bg-white/15' : 'hover:bg-white/10'
                            }`}
                    >
                        <FaWindows className="w-4 sm:w-5 h-4 sm:h-5 text-white" />
                    </button>

                    {/* Search Icon */}
                    <button className="w-10 sm:w-12 h-10 rounded-lg cursor-pointer hover:bg-white/10 flex items-center justify-center transition-all duration-200 flex-shrink-0">
                        <GoSearch className="w-4 sm:w-5 h-4 sm:h-5 rotate-90 text-white" />
                    </button>

                    {/* Open Windows */}
                    <div className="flex items-center gap-0.5 overflow-hidden">
                        {windows.map(window => (
                            <button
                                key={window.id}
                                onClick={() => onRestoreWindow(window.id)}
                                className={`
                w-12 sm:w-14 h-10 transition-all duration-200 rounded-lg flex items-center justify-center flex-shrink-0
                ${activeWindow === window.id && !window.isMinimized
                                        ? 'bg-white/15 border border-white/20'
                                        : 'hover:bg-white/10 border border-transparent'
                                    }
                ${window.isMinimized ? 'bg-white/5' : ''}
              `}
                                title={window.title}
                            >
                                <div className="w-5 sm:w-6 h-5 sm:h-6 flex items-center justify-center">
                                    {window.icon ? (
                                        <img
                                            src={window.icon}
                                            alt={window.title}
                                            className="w-4 sm:w-5 h-4 sm:h-5 object-contain"
                                            loading='lazy'
                                        />
                                    ) : (
                                        <div className="w-4 sm:w-5 h-4 sm:h-5 bg-white/20 rounded"></div>
                                    )}
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Right Side - System Tray */}
                <div className="flex items-center gap-0.5 sm:gap-0 flex-shrink-0">
                    {/* Notification Area */}
                    <button 
                        onClick={() => setShowNotifications(!showNotifications)}
                        className={`flex w-8 sm:w-10 h-8 sm:h-10 rounded-lg cursor-pointer items-center justify-center transition-all duration-200 ${
                            showNotifications ? 'bg-white/15' : 'hover:bg-white/10'
                        }`}
                    >
                        <FaChevronUp className="w-2.5 sm:w-3 h-2.5 sm:h-3 text-white" />
                    </button>

                    {/* Language - Hide on very small screens */}
                    <button className="hidden md:flex hover:bg-white/10 rounded-lg flex-col items-center justify-center transition-all duration-200 px-2 sm:px-3 py-1">
                        <span className="text-white text-xs font-medium leading-tight">ENG</span>
                        <span className="text-white text-xs font-medium leading-tight">IN</span>
                    </button>

                    {/* System Icons */}
                    <div className="flex items-center gap-0.5">
                        {/* WiFi Icon */}
                        <div className="relative">
                            <button
                                className="w-7 sm:w-9 h-7 sm:h-9 rounded-lg hover:bg-white/10 flex items-center justify-center transition-all duration-200"
                                onMouseEnter={() => setShowWifiTooltip(true)}
                                onMouseLeave={() => setShowWifiTooltip(false)}
                            >
                                <FaWifi className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-white" />
                            </button>

                            {/* WiFi Tooltip */}
                            {showWifiTooltip && (
                                <div className="absolute bottom-14 right-0 glass-panel text-white p-3 rounded-xl shadow-lg min-w-[140px] hidden sm:block">
                                    <div className="text-xs font-medium mb-1">
                                        BSNL
                                    </div>
                                    <div className="text-xs text-white/60">
                                        Internet access
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Volume Icon */}
                        <div className="relative">
                            <button
                                className="w-7 sm:w-9 h-7 sm:h-9 rounded-lg hover:bg-white/10 flex items-center justify-center transition-all duration-200"
                                onMouseEnter={() => setShowVolumeTooltip(true)}
                                onMouseLeave={() => setShowVolumeTooltip(false)}
                            >
                                <FaVolumeUp className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-white" />
                            </button>

                            {/* Volume Tooltip */}
                            {showVolumeTooltip && (
                                <div className="absolute bottom-14 right-0 glass-panel text-white p-4 rounded-xl shadow-lg min-w-[200px] hidden sm:block">
                                    <div className="text-xs mb-2 font-medium">
                                        Speakers: 75%
                                    </div>
                                    <div className="w-full bg-white/20 rounded-full h-2">
                                        <div className="bg-white h-2 rounded-full" style={{ width: '75%' }}></div>
                                    </div>
                                    <div className="text-xs text-white/60 mt-2">
                                        Realtek Audio
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Battery Icon */}
                        <div className="relative">
                            <button
                                className="w-7 sm:w-9 h-7 sm:h-9 rounded-lg hover:bg-white/10 flex items-center justify-center transition-all duration-200"
                                onMouseEnter={() => setShowBatteryTooltip(true)}
                                onMouseLeave={() => setShowBatteryTooltip(false)}
                            >
                                <FaBatteryHalf className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-white" />
                            </button>

                            {/* Battery Tooltip */}
                            {showBatteryTooltip && (
                                <div className="absolute bottom-14 right-0 glass-panel text-white p-4 rounded-xl shadow-lg min-w-[240px] hidden sm:block">
                                    <div className="text-sm mb-1 font-medium">
                                        Battery status: 81% remaining
                                    </div>
                                    <div className="text-sm text-white/70">
                                        2h 16min
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Date and Time - Responsive */}
                    <button className="text-white text-right hover:bg-white/10 rounded-lg px-2 sm:px-3 py-1.5 transition-all duration-200 min-w-0 flex-shrink-0">
                        <div className="text-xs font-medium leading-tight whitespace-nowrap">{formatTime(currentTime)}</div>
                        <div className="text-xs opacity-70 leading-tight whitespace-nowrap">
                            <span className="xs:hidden">{formatMobileDate(currentTime)}</span>
                            <span className="hidden xs:inline">{formatDate(currentTime)}</span>
                        </div>
                    </button>

                    {/* Show Desktop Button */}
                    {/* <button className="w-2 h-8 bg-transparent hover:bg-gray-600 border-l border-gray-700 transition-colors">
                </button> */}
                </div>
            </div>
        </>
    )
}

export default Taskbar