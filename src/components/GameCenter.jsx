import { useState } from 'react'
import TicTacToe from './games/TicTacToe'
import MemoryGame from './games/MemoryGame'
import NumberGuessing from './games/NumberGuessing'
import RockPaperScissors from './games/RockPaperScissors'
import SnakeGame from './games/SnakeGame'
import SimonSays from './games/SimonSays'
import {
  FaGamepad,
  FaArrowLeft,
  FaTh,
  FaBrain,
  FaBullseye,
  FaPlay,
  FaHandRock,
  FaAppleAlt
} from 'react-icons/fa'
import { GiSnake } from 'react-icons/gi'

const GameCenter = () => {
  const [selectedGame, setSelectedGame] = useState(null)

  const games = [
    {
      id: 'tic-tac-toe',
      name: 'Tic Tac Toe',
      description: 'Classic 3x3 strategy game',
      icon: FaTh,
      gradient: 'from-blue-500 to-blue-600',
      component: TicTacToe
    },
    {
      id: 'memory-game',
      name: 'Memory Game',
      description: 'Match card pairs',
      icon: FaBrain,
      gradient: 'from-purple-500 to-purple-600',
      component: MemoryGame
    },
    {
      id: 'number-guessing',
      name: 'Number Guess',
      description: 'Guess 1-100',
      icon: FaBullseye,
      gradient: 'from-green-500 to-green-600',
      component: NumberGuessing
    },
    {
      id: 'rock-paper-scissors',
      name: 'Rock Paper Scissors',
      description: 'Beat the computer',
      icon: FaHandRock,
      gradient: 'from-orange-500 to-orange-600',
      component: RockPaperScissors
    },
    {
      id: 'snake',
      name: 'Snake Game',
      description: 'Classic arcade snake',
      icon: GiSnake,
      gradient: 'from-green-500 to-emerald-600',
      component: SnakeGame
    },
    {
      id: 'simon-says',
      name: 'Simon Says',
      description: 'Color memory challenge',
      icon: FaAppleAlt,
      gradient: 'from-pink-500 to-rose-600',
      component: SimonSays
    }
  ]

  const handleGameSelect = (gameId) => {
    setSelectedGame(gameId)
  }

  const handleBackToMenu = () => {
    setSelectedGame(null)
  }

  if (selectedGame) {
    const game = games.find(g => g.id === selectedGame)
    const GameComponent = game.component

    return (
      <div className="p-4 lg:p-6">
        <div className="flex items-center mb-6">
          <button
            onClick={handleBackToMenu}
            className="glass-panel cursor-pointer hover:bg-white/10 text-white px-4 py-2 rounded-xl transition-all flex items-center mr-4 border border-white/10"
          >
            <FaArrowLeft className="mr-2" />
            Back
          </button>
          <h2 className="text-xl lg:text-2xl font-bold text-white">{game.name}</h2>
        </div>

        <div className="glass-panel rounded-2xl border border-white/10">
          <GameComponent />
        </div>
      </div>
    )
  }

  return (
    <div className="p-4 lg:p-6">
      {/* Header */}
      <div className="glass-panel p-6 rounded-2xl mb-6 border border-white/10">
        <div className="flex items-center">
          <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mr-4 shadow-lg">
            <FaGamepad className="text-white text-2xl" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-white">Game Center</h3>
            <p className="text-sm text-white/60">Choose your game and have fun!</p>
          </div>
        </div>
      </div>

      {/* Games Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {games.map((game) => {
          const IconComponent = game.icon
          return (
            <div
              key={game.id}
              className="glass-panel rounded-2xl p-6 border border-white/10 transition-all"
            >
              <div className={`w-16 h-16 bg-gradient-to-br ${game.gradient} rounded-2xl flex items-center justify-center mb-4 shadow-lg`}>
                <IconComponent className="text-white text-2xl" />
              </div>
              <h4 className="text-lg font-semibold text-white mb-2">{game.name}</h4>
              <p className="text-sm text-white/60 mb-4">{game.description}</p>
              <button
                onClick={() => handleGameSelect(game.id)}
                className="w-full bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-xl text-sm font-medium transition-all flex items-center justify-center cursor-pointer border border-white/20"
              >
                <FaPlay className="mr-2 text-xs" />
                Play Now
              </button>
            </div>
          )
        })}
      </div>

      {/* Upcoming Games */}
      <div className="glass-panel p-6 rounded-2xl mb-6 border border-white/10">
        <h4 className="text-xl font-bold text-white mb-4 flex items-center">
          <span className="w-10 h-10 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-xl flex items-center justify-center mr-3">
            🎮
          </span>
          Coming Soon
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white/5 border border-white/10 border-dashed rounded-xl p-4 text-center">
            <div className="text-4xl mb-3">🎯</div>
            <h5 className="font-semibold text-white mb-1">Whack-a-Mole</h5>
            <p className="text-xs text-white/60 mb-3">Quick reflexes game</p>
            <span className="inline-block bg-yellow-500/20 text-yellow-400 px-3 py-1 rounded-full text-xs border border-yellow-500/30">
              In Progress
            </span>
          </div>
          <div className="bg-white/5 border border-white/10 border-dashed rounded-xl p-4 text-center">
            <div className="text-4xl mb-3">🧩</div>
            <h5 className="font-semibold text-white mb-1">2048 Puzzle</h5>
            <p className="text-xs text-white/60 mb-3">Slide & merge tiles</p>
            <span className="inline-block bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-xs border border-blue-500/30">
              Planned
            </span>
          </div>
          <div className="bg-white/5 border border-white/10 border-dashed rounded-xl p-4 text-center">
            <div className="text-4xl mb-3">🎲</div>
            <h5 className="font-semibold text-white mb-1">Dice Roller</h5>
            <p className="text-xs text-white/60 mb-3">Virtual dice game</p>
            <span className="inline-block bg-purple-500/20 text-purple-400 px-3 py-1 rounded-full text-xs border border-purple-500/30">
              Planned
            </span>
          </div>
          <div className="bg-white/5 border border-white/10 border-dashed rounded-xl p-4 text-center">
            <div className="text-4xl mb-3">🎰</div>
            <h5 className="font-semibold text-white mb-1">Slot Machine</h5>
            <p className="text-xs text-white/60 mb-3">Try your luck!</p>
            <span className="inline-block bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-xs border border-green-500/30">
              Idea
            </span>
          </div>
        </div>
      </div>

      {/* Game Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="glass-panel p-6 rounded-2xl border border-white/10">
          <h4 className="text-lg font-bold text-white mb-4 flex items-center">
            <span className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center mr-3">
              🏆
            </span>
            Features
          </h4>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0 border border-blue-500/30">
                <span className="text-sm">⚡</span>
              </div>
              <div>
                <h5 className="text-white font-medium text-sm">Optimized Performance</h5>
                <p className="text-white/60 text-xs">Smooth 60fps gameplay on all devices</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center flex-shrink-0 border border-green-500/30">
                <span className="text-sm">📱</span>
              </div>
              <div>
                <h5 className="text-white font-medium text-sm">Mobile Responsive</h5>
                <p className="text-white/60 text-xs">Play anywhere on any device</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center flex-shrink-0 border border-purple-500/30">
                <span className="text-sm">🎨</span>
              </div>
              <div>
                <h5 className="text-white font-medium text-sm">Modern Design</h5>
                <p className="text-white/60 text-xs">Clean glassmorphism UI</p>
              </div>
            </div>
          </div>
        </div>

        <div className="glass-panel p-6 rounded-2xl border border-white/10">
          <h4 className="text-lg font-bold text-white mb-4 flex items-center">
            <span className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center mr-3">
              📊
            </span>
            Quick Stats
          </h4>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white/5 p-3 rounded-xl border border-white/10 text-center">
              <div className="text-2xl font-bold text-blue-400">6</div>
              <div className="text-xs text-white/60">Available Games</div>
            </div>
            <div className="bg-white/5 p-3 rounded-xl border border-white/10 text-center">
              <div className="text-2xl font-bold text-green-400">4</div>
              <div className="text-xs text-white/60">Coming Soon</div>
            </div>
            <div className="bg-white/5 p-3 rounded-xl border border-white/10 text-center">
              <div className="text-2xl font-bold text-purple-400">100%</div>
              <div className="text-xs text-white/60">Free to Play</div>
            </div>
            <div className="bg-white/5 p-3 rounded-xl border border-white/10 text-center">
              <div className="text-2xl font-bold text-orange-400">0</div>
              <div className="text-xs text-white/60">Ads</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GameCenter