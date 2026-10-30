import { useState, useEffect, useRef } from 'react'
import Lenis from 'lenis'
import {
    FaFigma,
    FaHtml5,
    FaCss3Alt,
    FaJs,
    FaReact,
    FaNodeJs,
    FaGitAlt,
    FaGithub,
    FaFolder,
    FaChevronDown,
    FaChevronRight,
    FaRecycle,
    FaBriefcase,
    FaUser,
    FaFileAlt,
    FaImages,
    FaCog,
    FaPowerOff,
    FaGitlab,
    FaCode,
    FaTimes
} from 'react-icons/fa'
import {
    SiTypescript,
    SiNextdotjs,
    SiRedux,
    SiExpress,
    SiMongodb,
    SiMysql,
    SiOpenai
} from 'react-icons/si'
import { VscCode } from 'react-icons/vsc'
import { TbBrandVscode, TbSparkles } from 'react-icons/tb'
import { RiRobot2Fill } from 'react-icons/ri'

const StartMenu = ({ isOpen, onClose }) => {
    const [expandedFolders, setExpandedFolders] = useState({
        'UI/UX': false,
        'Frontend Development': true,
        'Backend Development': true,
        'Databases': true,
        'Version Control & Collaboration': true,
        'IDE & Tools': true
    })
    const [isMobile, setIsMobile] = useState(false)
    const skillsScrollRef = useRef(null)

    useEffect(() => {
        const checkDevice = () => {
            setIsMobile(window.innerWidth < 768) // md breakpoint
        }

        checkDevice()
        window.addEventListener('resize', checkDevice)
        return () => window.removeEventListener('resize', checkDevice)
    }, [])

    // Close on Escape key
    useEffect(() => {
        if (!isOpen) return
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') onClose()
        }
        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [isOpen, onClose])

    // Lenis smooth scroll for skills section with proper RAF cleanup
    useEffect(() => {
        if (!skillsScrollRef.current || !isOpen) return

        const lenis = new Lenis({
            wrapper: skillsScrollRef.current,
            duration: 1.0,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smoothWheel: true,
            wheelMultiplier: 1,
            touchMultiplier: 1.5,
        })

        let rafId = null

        function raf(time) {
            lenis.raf(time)
            rafId = requestAnimationFrame(raf)
        }

        rafId = requestAnimationFrame(raf)

        return () => {
            if (rafId) cancelAnimationFrame(rafId)
            lenis.destroy()
        }
    }, [isOpen])

    const toggleFolder = (folderName) => {
        setExpandedFolders(prev => ({
            ...prev,
            [folderName]: !prev[folderName]
        }))
    }

    if (!isOpen) return null

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 z-40"
                onClick={onClose}
            />

            {/* Start Menu - Modern Glass Design */}
            <div
                className={`fixed bottom-12 left-0 glass-dark shadow-2xl z-50 animate-slideInUp flex overflow-hidden ${isMobile
                    ? 'w-full h-full inset-0 bottom-0 rounded-none'
                    : 'w-[640px] rounded-tr-2xl'
                    }`}
                style={!isMobile ? { height: '85vh' } : {}}
            >

                {/* Desktop Layout */}
                {!isMobile && (
                    <>
                        {/* Far Left - System Icons */}
                        <div className="w-16 bg-black/30 backdrop-blur-sm flex flex-col items-center py-6 space-y-4 border-r border-white/10">
                            <div className="flex items-center justify-center w-12 h-12 hover:bg-white/10 cursor-pointer rounded-xl transition-all duration-200 hover-glow">
                                <FaUser className="text-white text-xl" />
                            </div>
                            <div className="flex items-center justify-center w-12 h-12 hover:bg-white/10 cursor-pointer rounded-xl transition-all duration-200 hover-glow">
                                <FaFileAlt className="text-white text-xl" />
                            </div>
                            <div className="flex items-center justify-center w-12 h-12 hover:bg-white/10 cursor-pointer rounded-xl transition-all duration-200 hover-glow">
                                <FaImages className="text-white text-xl" />
                            </div>
                            <div className="flex items-center justify-center w-12 h-12 hover:bg-white/10 cursor-pointer rounded-xl transition-all duration-200 hover-glow">
                                <FaCog className="text-white text-xl" />
                            </div>
                            <div className="flex-1"></div>
                            <div className="flex items-center justify-center w-12 h-12 hover:bg-red-500/20 cursor-pointer rounded-xl transition-all duration-200 hover-glow">
                                <FaPowerOff className="text-white text-xl" />
                            </div>
                        </div>

                        {/* Middle - Skills List */}
                        <div className="w-80 bg-black/20 backdrop-blur-sm flex flex-col border-r border-white/10">
                            {/* Header */}
                            <div className="px-5 py-4 flex items-center border-b border-white/10">
                                <div className="flex flex-col space-y-1 mr-3">
                                    <div className="w-4 h-0.5 bg-white rounded-full"></div>
                                    <div className="w-4 h-0.5 bg-white rounded-full"></div>
                                    <div className="w-4 h-0.5 bg-white rounded-full"></div>
                                </div>
                                <span className="text-white text-sm font-medium">My Skills</span>
                            </div>

                            {/* Skills List */}
                            <div ref={skillsScrollRef} className="flex-1 overflow-y-auto start-menu-scroll p-2">
                                {/* 1) UI/UX Folder */}
                                <div
                                    className="flex items-center px-4 py-2.5 hover:bg-white/10 cursor-pointer rounded-xl transition-all duration-200 mx-1"
                                    onClick={() => toggleFolder('UI/UX')}
                                >
                                    <FaFolder className="text-yellow-400 text-base mr-3" size={23} />
                                    <span className="text-white text-sm flex-1 font-medium">UI/UX</span>
                                    {expandedFolders['UI/UX'] ? (
                                        <FaChevronDown className="text-white/60 text-xs" />
                                    ) : (
                                        <FaChevronRight className="text-white/60 text-xs" />
                                    )}
                                </div>

                                {/* UI/UX Skills */}
                                <div className={`grid transition-all duration-300 ease-in-out ${expandedFolders['UI/UX'] ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                                    <div className="overflow-hidden">
                                        <div className="ml-6">
                                            <div className="flex items-center px-4 py-2 hover:bg-white/10 cursor-pointer rounded-lg transition-all duration-200">
                                                <FaFigma className="text-purple-400 text-base mr-3" size={22} />
                                                <span className="text-white text-sm">Figma</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* 2) Frontend Development Folder */}
                                <div
                                    className="flex items-center px-4 py-2.5 hover:bg-white/10 cursor-pointer rounded-xl transition-all duration-200 mx-1"
                                    onClick={() => toggleFolder('Frontend Development')}
                                >
                                    <FaFolder className="text-yellow-400 text-base mr-3" size={23} />
                                    <span className="text-white text-sm flex-1 font-medium">Frontend Development</span>
                                    {expandedFolders['Frontend Development'] ? (
                                        <FaChevronDown className="text-white/60 text-xs" />
                                    ) : (
                                        <FaChevronRight className="text-white/60 text-xs" />
                                    )}
                                </div>

                                {/* Frontend Development Skills */}
                                <div className={`grid transition-all duration-300 ease-in-out ${expandedFolders['Frontend Development'] ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                                    <div className="overflow-hidden">
                                        <div className="ml-6 space-y-1">
                                            <div className="flex items-center px-4 py-2 hover:bg-white/10 cursor-pointer rounded-lg transition-all duration-200">
                                                <FaHtml5 className="text-orange-400 text-base mr-3" size={22} />
                                                <span className="text-white text-sm">HTML</span>
                                            </div>
                                            <div className="flex items-center px-4 py-2 hover:bg-white/10 cursor-pointer rounded-lg transition-all duration-200">
                                                <FaCss3Alt className="text-blue-400 text-base mr-3" size={22} />
                                                <span className="text-white text-sm">CSS</span>
                                            </div>
                                            <div className="flex items-center px-4 py-2 hover:bg-white/10 cursor-pointer rounded-lg transition-all duration-200">
                                                <FaJs className="text-yellow-400 text-base mr-3" size={22} />
                                                <span className="text-white text-sm">JavaScript</span>
                                            </div>
                                            <div className="flex items-center px-4 py-2 hover:bg-white/10 cursor-pointer rounded-lg transition-all duration-200">
                                                <SiTypescript className="text-blue-500 text-base mr-3" size={22} />
                                                <span className="text-white text-sm">TypeScript</span>
                                            </div>
                                            <div className="flex items-center px-4 py-2 hover:bg-white/10 cursor-pointer rounded-lg transition-all duration-200">
                                                <FaReact className="text-cyan-400 text-base mr-3" size={22} />
                                                <span className="text-white text-sm">React.js</span>
                                            </div>
                                            <div className="flex items-center px-4 py-2 hover:bg-white/10 cursor-pointer rounded-lg transition-all duration-200">
                                                <SiNextdotjs className="text-white text-base mr-3" size={22} />
                                                <span className="text-white text-sm">Next.js</span>
                                            </div>
                                            <div className="flex items-center px-4 py-2 hover:bg-white/10 cursor-pointer rounded-lg transition-all duration-200">
                                                <SiRedux className="text-purple-400 text-base mr-3" size={22} />
                                                <span className="text-white text-sm">Redux</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* 3) Backend Development Folder */}
                                <div
                                    className="flex items-center px-4 py-2.5 hover:bg-white/10 cursor-pointer rounded-xl transition-all duration-200 mx-1"
                                    onClick={() => toggleFolder('Backend Development')}
                                >
                                    <FaFolder className="text-yellow-400 text-base mr-3" size={23} />
                                    <span className="text-white text-sm flex-1 font-medium">Backend Development</span>
                                    {expandedFolders['Backend Development'] ? (
                                        <FaChevronDown className="text-white/60 text-xs" />
                                    ) : (
                                        <FaChevronRight className="text-white/60 text-xs" />
                                    )}
                                </div>

                                {/* Backend Development Skills */}
                                <div className={`grid transition-all duration-300 ease-in-out ${expandedFolders['Backend Development'] ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                                    <div className="overflow-hidden">
                                        <div className="ml-6 space-y-1">
                                            <div className="flex items-center px-4 py-2 hover:bg-white/10 cursor-pointer rounded-lg transition-all duration-200">
                                                <FaNodeJs className="text-green-500 text-base mr-3" size={22} />
                                                <span className="text-white text-sm">Node.js</span>
                                            </div>
                                            <div className="flex items-center px-4 py-2 hover:bg-white/10 cursor-pointer rounded-lg transition-all duration-200">
                                                <SiExpress className="text-white/80 text-base mr-3" size={22} />
                                                <span className="text-white text-sm">Express.js</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* 4) Databases Folder */}
                                <div
                                    className="flex items-center px-4 py-2.5 hover:bg-white/10 cursor-pointer rounded-xl transition-all duration-200 mx-1"
                                    onClick={() => toggleFolder('Databases')}
                                >
                                    <FaFolder className="text-yellow-400 text-base mr-3" size={23} />
                                    <span className="text-white text-sm flex-1 font-medium">Databases</span>
                                    {expandedFolders['Databases'] ? (
                                        <FaChevronDown className="text-white/60 text-xs" />
                                    ) : (
                                        <FaChevronRight className="text-white/60 text-xs" />
                                    )}
                                </div>

                                {/* Database Skills */}
                                <div className={`grid transition-all duration-300 ease-in-out ${expandedFolders['Databases'] ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                                    <div className="overflow-hidden">
                                        <div className="ml-6 space-y-1">
                                            <div className="flex items-center px-4 py-2 hover:bg-white/10 cursor-pointer rounded-lg transition-all duration-200">
                                                <SiMongodb className="text-green-400 text-base mr-3" size={22} />
                                                <span className="text-white text-sm">MongoDB</span>
                                            </div>
                                            <div className="flex items-center px-4 py-2 hover:bg-white/10 cursor-pointer rounded-lg transition-all duration-200">
                                                <SiMysql className="text-blue-500 text-base mr-3" size={22} />
                                                <span className="text-white text-sm">MySQL</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* 5) Version Control & Collaboration Folder */}
                                <div
                                    className="flex items-center px-4 py-2.5 hover:bg-white/10 cursor-pointer rounded-xl transition-all duration-200 mx-1"
                                    onClick={() => toggleFolder('Version Control & Collaboration')}
                                >
                                    <FaFolder className="text-yellow-400 text-base mr-3" size={23} />
                                    <span className="text-white text-sm flex-1 font-medium">Version Control & Collaboration</span>
                                    {expandedFolders['Version Control & Collaboration'] ? (
                                        <FaChevronDown className="text-white/60 text-xs" />
                                    ) : (
                                        <FaChevronRight className="text-white/60 text-xs" />
                                    )}
                                </div>

                                {/* Version Control Skills */}
                                <div className={`grid transition-all duration-300 ease-in-out ${expandedFolders['Version Control & Collaboration'] ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                                    <div className="overflow-hidden">
                                        <div className="ml-6 space-y-1">
                                            <div className="flex items-center px-4 py-2 hover:bg-white/10 cursor-pointer rounded-lg transition-all duration-200">
                                                <FaGitAlt className="text-orange-500 text-base mr-3" size={22} />
                                                <span className="text-white text-sm">Git</span>
                                            </div>

                                            <div className="flex items-center px-4 py-2 hover:bg-white/10 cursor-pointer rounded-lg transition-all duration-200">
                                                <FaGithub className="text-white text-base mr-3" size={22} />
                                                <span className="text-white text-sm">GitHub</span>
                                            </div>

                                            <div className="flex items-center px-4 py-2 hover:bg-white/10 cursor-pointer rounded-lg transition-all duration-200">
                                                <FaGitlab className="text-orange-600 text-base mr-3" size={22} />
                                                <span className="text-white text-sm">GitLab</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* 6) IDE & Tools Folder */}
                                <div
                                    className="flex items-center px-4 py-2.5 hover:bg-white/10 cursor-pointer rounded-xl transition-all duration-200 mx-1"
                                    onClick={() => toggleFolder('IDE & Tools')}
                                >
                                    <FaFolder className="text-yellow-400 text-base mr-3" size={23} />
                                    <span className="text-white text-sm flex-1 font-medium">IDE & Tools</span>
                                    {expandedFolders['IDE & Tools'] ? (
                                        <FaChevronDown className="text-white/60 text-xs" />
                                    ) : (
                                        <FaChevronRight className="text-white/60 text-xs" />
                                    )}
                                </div>

                                {/* IDE & Tools Skills */}
                                <div className={`grid transition-all duration-300 ease-in-out ${expandedFolders['IDE & Tools'] ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                                    <div className="overflow-hidden">
                                        <div className="ml-6 space-y-1">
                                            <div className="flex items-center px-4 py-2 hover:bg-white/10 cursor-pointer rounded-lg transition-all duration-200">
                                                <VscCode className="text-blue-500 text-base mr-3" size={22} />
                                                <span className="text-white text-sm">VS Code</span>
                                            </div>

                                            <div className="flex items-center px-4 py-2 hover:bg-white/10 cursor-pointer rounded-lg transition-all duration-200">
                                                <TbBrandVscode className="text-cyan-400 text-base mr-3" size={22} />
                                                <span className="text-white text-sm">Cursor</span>
                                            </div>

                                            <div className="flex items-center px-4 py-2 hover:bg-white/10 cursor-pointer rounded-lg transition-all duration-200">
                                                <FaCode className="text-purple-400 text-base mr-3" size={22} />
                                                <span className="text-white text-sm">Kiro</span>
                                            </div>

                                            <div className="flex items-center px-4 py-2 hover:bg-white/10 cursor-pointer rounded-lg transition-all duration-200">
                                                <TbSparkles className="text-pink-400 text-base mr-3" size={22} />
                                                <span className="text-white text-sm">Antigravity</span>
                                            </div>

                                            <div className="flex items-center px-4 py-2 hover:bg-white/10 cursor-pointer rounded-lg transition-all duration-200">
                                                <TbSparkles className="text-blue-400 text-base mr-3" size={22} />
                                                <span className="text-white text-sm">Gemini</span>
                                            </div>

                                            <div className="flex items-center px-4 py-2 hover:bg-white/10 cursor-pointer rounded-lg transition-all duration-200">
                                                <SiOpenai className="text-green-400 text-base mr-3" size={22} />
                                                <span className="text-white text-sm">ChatGPT</span>
                                            </div>

                                            <div className="flex items-center px-4 py-2 hover:bg-white/10 cursor-pointer rounded-lg transition-all duration-200">
                                                <RiRobot2Fill className="text-orange-400 text-base mr-3" size={22} />
                                                <span className="text-white text-sm">Claude</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>

                        {/* Right Side - Tiles */}
                        <div className="flex-1 bg-black/10 backdrop-blur-sm p-6">
                            <div className="grid grid-cols-2 gap-4">
                                {/* Row 1 */}
                                <div className="glass-panel hover:bg-white/15 cursor-pointer transition-all duration-200 flex flex-col items-center justify-center p-5 rounded-2xl h-24 hover-glow">
                                    <FaRecycle className="text-2xl text-white/80 mb-2" />
                                    <span className="text-white text-xs text-center font-medium">Recycle</span>
                                </div>
                                <div className="glass-panel hover:bg-white/15 cursor-pointer transition-all duration-200 flex flex-col items-center justify-center p-5 rounded-2xl h-24 hover-glow">
                                    <FaBriefcase className="text-2xl text-orange-400 mb-2" />
                                    <span className="text-white text-xs text-center font-medium">Works</span>
                                </div>

                                {/* Row 2 */}
                                <div className="glass-panel hover:bg-white/15 cursor-pointer transition-all duration-200 flex flex-col items-center justify-center p-5 rounded-2xl h-24 hover-glow">
                                    <FaFileAlt className="text-2xl text-amber-400 mb-2" />
                                    <span className="text-white text-xs text-center font-medium">Careers</span>
                                </div>
                                <div className="glass-panel hover:bg-white/15 cursor-pointer transition-all duration-200 flex flex-col items-center justify-center p-5 rounded-2xl h-24 hover-glow">
                                    <FaCog className="text-2xl text-cyan-400 mb-2" />
                                    <span className="text-white text-xs text-center font-medium">Vision</span>
                                </div>

                                {/* Row 3 */}
                                <div className="glass-panel hover:bg-white/15 cursor-pointer transition-all duration-200 flex flex-col items-center justify-center p-5 rounded-2xl h-24 hover-glow">
                                    <FaFileAlt className="text-2xl text-purple-400 mb-2" />
                                    <span className="text-white text-xs text-center font-medium">Resume</span>
                                </div>
                                <div className="glass-panel hover:bg-white/15 cursor-pointer transition-all duration-200 flex flex-col items-center justify-center p-5 rounded-2xl h-24 hover-glow">
                                    <FaUser className="text-2xl text-red-400 mb-2" />
                                    <span className="text-white text-xs text-center font-medium">Profile</span>
                                </div>

                                {/* Row 4 */}
                                <div className="col-span-1 glass-panel hover:bg-white/15 cursor-pointer transition-all duration-200 flex flex-col items-center justify-center p-5 rounded-2xl h-24 hover-glow">
                                    <FaImages className="text-2xl text-blue-400 mb-2" />
                                    <span className="text-white text-xs text-center font-medium">Gallery</span>
                                </div>
                            </div>
                        </div>
                    </>
                )}

                {/* Mobile Layout - Just Skills Section */}
                {isMobile && (
                    <div className="w-full bg-gray-900/95 backdrop-blur-xl flex flex-col h-full">
                        {/* Header */}
                        <div className="px-4 py-3 flex items-center justify-between border-b border-white/10">
                            <div className="flex items-center">
                                <div className="flex flex-col space-y-1 mr-3">
                                    <div className="w-4 h-0.5 bg-white"></div>
                                    <div className="w-4 h-0.5 bg-white"></div>
                                    <div className="w-4 h-0.5 bg-white"></div>
                                </div>
                                <span className="text-white text-base font-semibold">My Skills</span>
                            </div>
                            <button
                                onClick={onClose}
                                className="w-8 h-8 rounded-lg bg-white/10 hover:bg-red-500/80 flex items-center justify-center text-white transition-colors cursor-pointer"
                                title="Close"
                            >
                                <FaTimes className="text-sm" />
                            </button>
                        </div>

                        {/* Skills List - Mobile Optimized */}
                        <div className="flex-1 overflow-y-auto start-menu-scroll p-2">
                            {/* 1) UI/UX Folder */}
                            <div
                                className="flex items-center px-4 py-3 hover:bg-gray-700 hover:bg-opacity-50 cursor-pointer rounded"
                                onClick={() => toggleFolder('UI/UX')}
                            >
                                <FaFolder className="text-yellow-500 text-lg mr-4" />
                                <span className="text-white text-base flex-1">UI/UX</span>
                                {expandedFolders['UI/UX'] ? (
                                    <FaChevronDown className="text-gray-400 text-sm" />
                                ) : (
                                    <FaChevronRight className="text-gray-400 text-sm" />
                                )}
                            </div>

                            {/* UI/UX Skills */}
                            <div className={`grid transition-all duration-300 ease-in-out ${expandedFolders['UI/UX'] ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                                <div className="overflow-hidden">
                                    <div className="ml-8">
                                        <div className="flex items-center px-4 py-3 hover:bg-gray-700 hover:bg-opacity-50 cursor-pointer rounded">
                                            <FaFigma className="text-purple-500 text-lg mr-4" />
                                            <span className="text-white text-base">Figma</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* 2) Frontend Development Folder */}
                            <div
                                className="flex items-center px-4 py-3 hover:bg-gray-700 hover:bg-opacity-50 cursor-pointer rounded"
                                onClick={() => toggleFolder('Frontend Development')}
                            >
                                <FaFolder className="text-yellow-500 text-lg mr-4" />
                                <span className="text-white text-base flex-1">Frontend Development</span>
                                {expandedFolders['Frontend Development'] ? (
                                    <FaChevronDown className="text-gray-400 text-sm" />
                                ) : (
                                    <FaChevronRight className="text-gray-400 text-sm" />
                                )}
                            </div>

                            {/* Frontend Development Skills */}
                            <div className={`grid transition-all duration-300 ease-in-out ${expandedFolders['Frontend Development'] ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                                <div className="overflow-hidden">
                                    <div className="ml-8">
                                        <div className="flex items-center px-4 py-3 hover:bg-gray-700 hover:bg-opacity-50 cursor-pointer rounded">
                                            <FaHtml5 className="text-orange-500 text-lg mr-4" />
                                            <span className="text-white text-base">HTML</span>
                                        </div>
                                        <div className="flex items-center px-4 py-3 hover:bg-gray-700 hover:bg-opacity-50 cursor-pointer rounded">
                                            <FaCss3Alt className="text-blue-500 text-lg mr-4" />
                                            <span className="text-white text-base">CSS</span>
                                        </div>
                                        <div className="flex items-center px-4 py-3 hover:bg-gray-700 hover:bg-opacity-50 cursor-pointer rounded">
                                            <FaJs className="text-yellow-500 text-lg mr-4" />
                                            <span className="text-white text-base">JavaScript</span>
                                        </div>
                                        <div className="flex items-center px-4 py-3 hover:bg-gray-700 hover:bg-opacity-50 cursor-pointer rounded">
                                            <SiTypescript className="text-blue-600 text-lg mr-4" />
                                            <span className="text-white text-base">TypeScript</span>
                                        </div>
                                        <div className="flex items-center px-4 py-3 hover:bg-gray-700 hover:bg-opacity-50 cursor-pointer rounded">
                                            <FaReact className="text-cyan-500 text-lg mr-4" />
                                            <span className="text-white text-base">React.js</span>
                                        </div>
                                        <div className="flex items-center px-4 py-3 hover:bg-gray-700 hover:bg-opacity-50 cursor-pointer rounded">
                                            <SiNextdotjs className="text-white text-lg mr-4" />
                                            <span className="text-white text-base">Next.js</span>
                                        </div>
                                        <div className="flex items-center px-4 py-3 hover:bg-gray-700 hover:bg-opacity-50 cursor-pointer rounded">
                                            <SiRedux className="text-purple-600 text-lg mr-4" />
                                            <span className="text-white text-base">Redux</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* 3) Backend Development Folder */}
                            <div
                                className="flex items-center px-4 py-3 hover:bg-gray-700 hover:bg-opacity-50 cursor-pointer rounded"
                                onClick={() => toggleFolder('Backend Development')}
                            >
                                <FaFolder className="text-yellow-500 text-lg mr-4" />
                                <span className="text-white text-base flex-1">Backend Development</span>
                                {expandedFolders['Backend Development'] ? (
                                    <FaChevronDown className="text-gray-400 text-sm" />
                                ) : (
                                    <FaChevronRight className="text-gray-400 text-sm" />
                                )}
                            </div>

                            {/* Backend Development Skills */}
                            <div className={`grid transition-all duration-300 ease-in-out ${expandedFolders['Backend Development'] ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                                <div className="overflow-hidden">
                                    <div className="ml-8">
                                        <div className="flex items-center px-4 py-3 hover:bg-gray-700 hover:bg-opacity-50 cursor-pointer rounded">
                                            <FaNodeJs className="text-green-600 text-lg mr-4" />
                                            <span className="text-white text-base">Node.js</span>
                                        </div>
                                        <div className="flex items-center px-4 py-3 hover:bg-gray-700 hover:bg-opacity-50 cursor-pointer rounded">
                                            <SiExpress className="text-gray-300 text-lg mr-4" />
                                            <span className="text-white text-base">Express.js</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* 4) Databases Folder */}
                            <div
                                className="flex items-center px-4 py-3 hover:bg-gray-700 hover:bg-opacity-50 cursor-pointer rounded"
                                onClick={() => toggleFolder('Databases')}
                            >
                                <FaFolder className="text-yellow-500 text-lg mr-4" />
                                <span className="text-white text-base flex-1">Databases</span>
                                {expandedFolders['Databases'] ? (
                                    <FaChevronDown className="text-gray-400 text-sm" />
                                ) : (
                                    <FaChevronRight className="text-gray-400 text-sm" />
                                )}
                            </div>

                            {/* Database Skills */}
                            <div className={`grid transition-all duration-300 ease-in-out ${expandedFolders['Databases'] ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                                <div className="overflow-hidden">
                                    <div className="ml-8">
                                        <div className="flex items-center px-4 py-3 hover:bg-gray-700 hover:bg-opacity-50 cursor-pointer rounded">
                                            <SiMongodb className="text-green-500 text-lg mr-4" />
                                            <span className="text-white text-base">MongoDB</span>
                                        </div>
                                        <div className="flex items-center px-4 py-3 hover:bg-gray-700 hover:bg-opacity-50 cursor-pointer rounded">
                                            <SiMysql className="text-blue-600 text-lg mr-4" />
                                            <span className="text-white text-base">MySQL</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* 5) Version Control & Collaboration Folder */}
                            <div
                                className="flex items-center px-4 py-3 hover:bg-gray-700 hover:bg-opacity-50 cursor-pointer rounded"
                                onClick={() => toggleFolder('Version Control & Collaboration')}
                            >
                                <FaFolder className="text-yellow-500 text-lg mr-4" />
                                <span className="text-white text-base flex-1">Version Control & Collaboration</span>
                                {expandedFolders['Version Control & Collaboration'] ? (
                                    <FaChevronDown className="text-gray-400 text-sm" />
                                ) : (
                                    <FaChevronRight className="text-gray-400 text-sm" />
                                )}
                            </div>

                            {/* Version Control Skills */}
                            <div className={`grid transition-all duration-300 ease-in-out ${expandedFolders['Version Control & Collaboration'] ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                                <div className="overflow-hidden">
                                    <div className="ml-8">
                                        <div className="flex items-center px-4 py-3 hover:bg-gray-700 hover:bg-opacity-50 cursor-pointer rounded">
                                            <FaGitAlt className="text-orange-600 text-lg mr-4" />
                                            <span className="text-white text-base">Git</span>
                                        </div>
                                        <div className="flex items-center px-4 py-3 hover:bg-gray-700 hover:bg-opacity-50 cursor-pointer rounded">
                                            <FaGithub className="text-white text-lg mr-4" />
                                            <span className="text-white text-base">GitHub</span>
                                        </div>
                                        <div className="flex items-center px-4 py-3 hover:bg-gray-700 hover:bg-opacity-50 cursor-pointer rounded">
                                            <FaGitlab className="text-orange-600 text-lg mr-4" />
                                            <span className="text-white text-base">GitLab</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* 6) IDE & Tools Folder */}
                            <div
                                className="flex items-center px-4 py-3 hover:bg-gray-700 hover:bg-opacity-50 cursor-pointer rounded"
                                onClick={() => toggleFolder('IDE & Tools')}
                            >
                                <FaFolder className="text-yellow-500 text-lg mr-4" />
                                <span className="text-white text-base flex-1">IDE & Tools</span>
                                {expandedFolders['IDE & Tools'] ? (
                                    <FaChevronDown className="text-gray-400 text-sm" />
                                ) : (
                                    <FaChevronRight className="text-gray-400 text-sm" />
                                )}
                            </div>

                            {/* IDE & Tools Skills */}
                            <div className={`grid transition-all duration-300 ease-in-out ${expandedFolders['IDE & Tools'] ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                                <div className="overflow-hidden">
                                    <div className="ml-8">
                                        <div className="flex items-center px-4 py-3 hover:bg-gray-700 hover:bg-opacity-50 cursor-pointer rounded">
                                            <VscCode className="text-blue-500 text-lg mr-4" />
                                            <span className="text-white text-base">VS Code</span>
                                        </div>
                                        <div className="flex items-center px-4 py-3 hover:bg-gray-700 hover:bg-opacity-50 cursor-pointer rounded">
                                            <TbBrandVscode className="text-cyan-400 text-lg mr-4" />
                                            <span className="text-white text-base">Cursor</span>
                                        </div>
                                        <div className="flex items-center px-4 py-3 hover:bg-gray-700 hover:bg-opacity-50 cursor-pointer rounded">
                                            <FaCode className="text-purple-400 text-lg mr-4" />
                                            <span className="text-white text-base">Kiro</span>
                                        </div>
                                        <div className="flex items-center px-4 py-3 hover:bg-gray-700 hover:bg-opacity-50 cursor-pointer rounded">
                                            <TbSparkles className="text-pink-400 text-lg mr-4" />
                                            <span className="text-white text-base">Antigravity</span>
                                        </div>
                                        <div className="flex items-center px-4 py-3 hover:bg-gray-700 hover:bg-opacity-50 cursor-pointer rounded">
                                            <TbSparkles className="text-blue-400 text-lg mr-4" />
                                            <span className="text-white text-base">Gemini</span>
                                        </div>
                                        <div className="flex items-center px-4 py-3 hover:bg-gray-700 hover:bg-opacity-50 cursor-pointer rounded">
                                            <SiOpenai className="text-green-400 text-lg mr-4" />
                                            <span className="text-white text-base">ChatGPT</span>
                                        </div>
                                        <div className="flex items-center px-4 py-3 hover:bg-gray-700 hover:bg-opacity-50 cursor-pointer rounded">
                                            <RiRobot2Fill className="text-orange-400 text-lg mr-4" />
                                            <span className="text-white text-base">Claude</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}

export default StartMenu