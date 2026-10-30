import { useState, useEffect, useCallback } from 'react'
import Desktop from './components/Desktop'
import Taskbar from './components/Taskbar'
import WindowModal from './components/WindowModal'
import BootScreen from './components/BootScreen'
import { wallpapers, themeColors } from './data/wallpapers'

const App = () => {
  const [isBooting, setIsBooting] = useState(() => {
    // Check if user has already seen boot screen in this session
    return !sessionStorage.getItem('hasBooted')
  })
  const [activeWindow, setActiveWindow] = useState(null)
  const [windows, setWindows] = useState([])
  const [selectedWallpaper, setSelectedWallpaper] = useState(() => {
    return localStorage.getItem('selectedWallpaper') || 'default'
  })
  const [selectedTheme, setSelectedTheme] = useState(() => {
    return localStorage.getItem('selectedTheme') || 'blue'
  })

  // Save wallpaper preference
  useEffect(() => {
    localStorage.setItem('selectedWallpaper', selectedWallpaper)
  }, [selectedWallpaper])

  // Save theme preference
  useEffect(() => {
    localStorage.setItem('selectedTheme', selectedTheme)
  }, [selectedTheme])

  // Global right-click prevention
  useEffect(() => {
    const handleContextMenu = (e) => {
      e.preventDefault()
    }

    document.addEventListener('contextmenu', handleContextMenu)

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu)
    }
  }, [])

  // Close active window on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && activeWindow) {
        if (['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName)) return
        setWindows(prev => prev.filter(w => w.id !== activeWindow))
        setActiveWindow(null)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [activeWindow])

  const openWindow = useCallback((windowData) => {
    const newWindow = {
      id: Date.now(),
      ...windowData,
      isMinimized: false,
      isMaximized: false
    }
    setWindows(prev => [...prev, newWindow])
    setActiveWindow(newWindow.id)
  }, [])

  const closeWindow = useCallback((windowId) => {
    setWindows(prev => prev.filter(w => w.id !== windowId))
    setActiveWindow(null)
  }, [])

  const minimizeWindow = useCallback((windowId) => {
    setWindows(prev => prev.map(w =>
      w.id === windowId ? { ...w, isMinimized: true } : w
    ))
    setActiveWindow(null)
  }, [])

  const maximizeWindow = useCallback((windowId) => {
    setWindows(prev => prev.map(w =>
      w.id === windowId ? { ...w, isMaximized: !w.isMaximized } : w
    ))
  }, [])

  const restoreWindow = useCallback((windowId) => {
    setWindows(prev => prev.map(w =>
      w.id === windowId ? { ...w, isMinimized: false } : w
    ))
    setActiveWindow(windowId)
  }, [])

  const focusWindow = useCallback((windowId) => {
    setActiveWindow(windowId)
  }, [])

  const changeWallpaper = useCallback((wallpaperId) => {
    setSelectedWallpaper(wallpaperId)
  }, [])

  const changeTheme = useCallback((themeId) => {
    setSelectedTheme(themeId)
  }, [])

  const handleBootComplete = useCallback(() => {
    setIsBooting(false)
    sessionStorage.setItem('hasBooted', 'true')
  }, [])

  // Get current wallpaper
  const currentWallpaper = wallpapers.find(w => w.id === selectedWallpaper) || wallpapers[0]
  const currentTheme = themeColors.find(t => t.id === selectedTheme) || themeColors[0]

  // Show boot screen if booting
  if (isBooting) {
    return <BootScreen onBootComplete={handleBootComplete} />
  }

  return (
    <div className="h-screen w-screen overflow-hidden relative">
      {/* Modern Gradient Background */}
      {currentWallpaper.type === 'image' ? (
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-700"
          style={{ backgroundImage: `url(${currentWallpaper.image})` }}
        >
          {/* Overlay for depth */}
          <div className="absolute inset-0 bg-gradient-to-br from-black/20 via-transparent to-black/40"></div>
        </div>
      ) : (
        <div
          className="absolute inset-0 transition-all duration-700"
          style={{
            background: `linear-gradient(135deg, #000000 0%, #1a1a2e 50%, #0f0f1e 100%)`
          }}
        >
          {/* Radial glow effect */}
          <div className="absolute inset-0 bg-gradient-radial from-blue-500/10 via-transparent to-transparent"></div>
          {/* Mesh gradient overlay */}
          <div className="absolute inset-0 opacity-30" style={{
            backgroundImage: `radial-gradient(circle at 20% 50%, ${currentTheme.color}20 0%, transparent 50%), radial-gradient(circle at 80% 80%, ${currentTheme.dark}30 0%, transparent 50%)`
          }}></div>
        </div>
      )}

      <Desktop onOpenWindow={openWindow} onChangeWallpaper={changeWallpaper} onChangeTheme={changeTheme} currentTheme={currentTheme} />

      {windows.map(window => (
        <WindowModal
          key={window.id}
          window={window}
          isActive={activeWindow === window.id}
          onClose={() => closeWindow(window.id)}
          onMinimize={() => minimizeWindow(window.id)}
          onMaximize={() => maximizeWindow(window.id)}
          onFocus={() => focusWindow(window.id)}
        />
      ))}

      <Taskbar
        windows={windows}
        activeWindow={activeWindow}
        onRestoreWindow={restoreWindow}
      />
    </div>
  )
}

export default App