import { useState, memo } from 'react'

const DesktopIcon = ({ icon, onDoubleClick, style }) => {
  const [isSelected, setIsSelected] = useState(false)

  const isSmallScreen = () => window.innerWidth < 1024

  const handleClick = () => {
    setIsSelected(true)
    setTimeout(() => setIsSelected(false), 200)

    // On mobile / small tablet, single tap opens the app
    if (isSmallScreen()) {
      onDoubleClick()
    }
  }

  const handleDoubleClick = () => {
    // On desktop, double click opens the app
    if (!isSmallScreen()) {
      onDoubleClick()
    }
  }

  return (
    <div
      className={`
        flex flex-col items-center justify-center py-2 px-1.5 rounded-xl cursor-pointer w-full h-full transition-all duration-200 group
        ${isSelected ? 'bg-white/20 backdrop-blur-md border border-white/30 shadow-lg' : 'hover:bg-white/10 hover:backdrop-blur-sm border border-transparent hover:border-white/20'}
        animate-fadeInUp hover-glow
      `}
      style={style}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
    >
      <div className="w-11 h-11 mb-1.5 filter drop-shadow-lg flex items-center justify-center transform transition-all duration-200 group-hover:scale-105 group-active:scale-95">
        {typeof icon.icon === 'string' ? (
          <img src={icon.icon} alt={icon.name} className="w-full h-full object-contain" loading='lazy' />
        ) : (
          <div className="text-3xl">{icon.icon}</div>
        )}
      </div>
      <span className="text-white text-xs text-center font-medium drop-shadow-lg line-clamp-2 px-0.5 break-words leading-tight" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.9)' }}>
        {icon.name}
      </span>
    </div>
  )
}

export default memo(DesktopIcon)