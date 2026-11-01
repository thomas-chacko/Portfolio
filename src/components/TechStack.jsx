import React from 'react'
import { 
    FaReact, FaNodeJs, FaHtml5, FaCss3Alt, FaJs, FaGitAlt, 
    FaFigma, FaNpm, FaDatabase 
} from 'react-icons/fa'
import { 
    SiTypescript, SiTailwindcss, SiNextdotjs, SiMysql, 
    SiMongodb, SiRedux, SiExpress
} from 'react-icons/si'
import { TbApi } from 'react-icons/tb'

const TechStack = () => {
    const technologies = [
        { name: 'React.js', icon: FaReact, color: '#61DAFB' },
        { name: 'Next.js', icon: SiNextdotjs, color: '#ffffff' },
        { name: 'TypeScript', icon: SiTypescript, color: '#3178C6' },
        { name: 'JavaScript', icon: FaJs, color: '#F7DF1E' },
        { name: 'Tailwind CSS', icon: SiTailwindcss, color: '#06B6D4' },
        { name: 'HTML5', icon: FaHtml5, color: '#E34F26' },
        { name: 'CSS3', icon: FaCss3Alt, color: '#1572B6' },
        { name: 'Node.js', icon: FaNodeJs, color: '#339933' },
        { name: 'Express.js', icon: SiExpress, color: '#ffffff' },
        { name: 'MongoDB', icon: SiMongodb, color: '#47A248' },
        { name: 'MySQL', icon: SiMysql, color: '#4479A1' },
        { name: 'Redux', icon: SiRedux, color: '#764ABC' },
        { name: 'REST API', icon: TbApi, color: '#61DAFB' },
        { name: 'Git', icon: FaGitAlt, color: '#F05032' },
        { name: 'Figma', icon: FaFigma, color: '#F24E1E' },
        { name: 'NPM', icon: FaNpm, color: '#CB3837' }
    ]

    return (
        <div className="glass-panel p-6 rounded-2xl border border-white/10 mb-6">
            <h3 className="text-xl font-bold text-white mb-4">Tech Stack</h3>
            <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-4">
                {technologies.map((tech, index) => (
                    <div
                        key={index}
                        className="group flex flex-col items-center gap-2 p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-all cursor-pointer border border-white/10"
                        title={tech.name}
                    >
                        <tech.icon 
                            className="text-3xl transition-transform group-hover:scale-110"
                            style={{ color: tech.color }}
                        />
                        <span className="text-xs text-white/70 text-center leading-tight">
                            {tech.name}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default TechStack
