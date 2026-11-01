import React from 'react'
import { FaBriefcase, FaGraduationCap } from 'react-icons/fa'

const Timeline = () => {
    const timeline = [
        {
            type: 'work',
            title: 'Associate Developer',
            company: 'Vatnam Technologies',
            location: 'Kochi (On-site)',
            period: 'February 2026 - Present',
            current: true,
            description: [
                'Building supply-chain management web portal using React.js, TypeScript, and Tailwind CSS',
                'Implemented JWT-based authentication with role-based access control',
                'Designed 50+ pages with lazy loading and code splitting for fast performance'
            ],
            color: 'from-blue-500 to-blue-600'
        },
        {
            type: 'work',
            title: 'Front-End Developer',
            company: 'StratAgile',
            location: 'Kochi (On-site)',
            period: 'March 2024 - February 2026',
            current: false,
            description: [
                'Developed full-featured HRMS web application using React.js and Tailwind CSS',
                'Built AI-powered template generation platform using Next.js and TypeScript',
                'Designed internal platform for team management with React.js and Node.js'
            ],
            color: 'from-green-500 to-green-600'
        },
        {
            type: 'education',
            title: 'Full Stack Development Internship',
            company: 'Luminar TechnoLab',
            location: 'Kochi',
            period: 'July 2023 - January 2024',
            current: false,
            description: [
                'Learned MERN stack development',
                'Built multiple real-world projects',
                'Gained hands-on experience with modern web technologies'
            ],
            color: 'from-purple-500 to-purple-600'
        },
        {
            type: 'education',
            title: 'Bachelor of Computer Application',
            company: 'University of Kerala',
            location: 'Kerala',
            period: 'June 2020 - March 2023',
            current: false,
            description: [
                'Graduated with strong foundation in computer science',
                'Learned programming fundamentals and web development'
            ],
            color: 'from-orange-500 to-orange-600'
        }
    ]

    return (
        <div className="glass-panel p-6 rounded-2xl border border-white/10 mb-6">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                <FaBriefcase className="text-2xl mr-3 text-blue-400" />
                My Journey
            </h3>
            <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-green-500 to-purple-500"></div>

                <div className="space-y-6">
                    {timeline.map((item, index) => (
                        <div key={index} className="relative pl-16">
                            {/* Timeline dot */}
                            <div className={`absolute left-3 top-2 w-6 h-6 rounded-full bg-gradient-to-br ${item.color} flex items-center justify-center shadow-lg ${item.current ? 'animate-pulse' : ''}`}>
                                {item.type === 'work' ? (
                                    <FaBriefcase className="text-white text-xs" />
                                ) : (
                                    <FaGraduationCap className="text-white text-xs" />
                                )}
                            </div>

                            {/* Content */}
                            <div className={`bg-white/5 p-4 rounded-xl border border-white/10 ${item.current ? 'ring-2 ring-blue-400/50' : ''}`}>
                                <div className="flex items-start justify-between mb-2">
                                    <div>
                                        <h4 className="text-lg font-semibold text-white flex items-center gap-2">
                                            {item.title}
                                            {item.current && (
                                                <span className="text-xs px-2 py-1 bg-green-500/20 text-green-400 rounded-full border border-green-500/30">
                                                    Current
                                                </span>
                                            )}
                                        </h4>
                                        <p className="text-sm text-blue-400">{item.company}</p>
                                        <p className="text-xs text-white/60">{item.location}</p>
                                    </div>
                                </div>
                                <p className="text-xs text-white/50 mb-3">{item.period}</p>
                                <ul className="space-y-1">
                                    {item.description.map((desc, i) => (
                                        <li key={i} className="text-sm text-white/70 flex items-start">
                                            <span className="mr-2 text-blue-400">•</span>
                                            <span>{desc}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Timeline
