import React, { useState, useEffect } from 'react'
import { FaRedo, FaPlay } from 'react-icons/fa'

const SimonSays = () => {
    const [sequence, setSequence] = useState([])
    const [playerSequence, setPlayerSequence] = useState([])
    const [isPlaying, setIsPlaying] = useState(false)
    const [isPlayerTurn, setIsPlayerTurn] = useState(false)
    const [score, setScore] = useState(0)
    const [highScore, setHighScore] = useState(0)
    const [activeButton, setActiveButton] = useState(null)
    const [gameOver, setGameOver] = useState(false)

    const colors = [
        { id: 0, name: 'Red', color: 'bg-red-500', activeColor: 'bg-red-300' },
        { id: 1, name: 'Blue', color: 'bg-blue-500', activeColor: 'bg-blue-300' },
        { id: 2, name: 'Green', color: 'bg-green-500', activeColor: 'bg-green-300' },
        { id: 3, name: 'Yellow', color: 'bg-yellow-500', activeColor: 'bg-yellow-300' }
    ]

    const startGame = () => {
        setSequence([])
        setPlayerSequence([])
        setScore(0)
        setGameOver(false)
        setIsPlaying(true)
        nextRound([])
    }

    const nextRound = (currentSequence) => {
        const newSequence = [...currentSequence, Math.floor(Math.random() * 4)]
        setSequence(newSequence)
        setPlayerSequence([])
        setIsPlayerTurn(false)
        playSequence(newSequence)
    }

    const playSequence = async (seq) => {
        for (let i = 0; i < seq.length; i++) {
            await new Promise(resolve => setTimeout(resolve, 500))
            setActiveButton(seq[i])
            await new Promise(resolve => setTimeout(resolve, 500))
            setActiveButton(null)
        }
        setIsPlayerTurn(true)
    }

    const handleButtonClick = (colorId) => {
        if (!isPlayerTurn || gameOver) return

        const newPlayerSequence = [...playerSequence, colorId]
        setPlayerSequence(newPlayerSequence)

        setActiveButton(colorId)
        setTimeout(() => setActiveButton(null), 300)

        // Check if player is correct
        if (newPlayerSequence[newPlayerSequence.length - 1] !== sequence[newPlayerSequence.length - 1]) {
            setGameOver(true)
            setIsPlaying(false)
            if (score > highScore) setHighScore(score)
            return
        }

        // Check if round is complete
        if (newPlayerSequence.length === sequence.length) {
            setScore(prev => prev + 1)
            setIsPlayerTurn(false)
            setTimeout(() => nextRound(sequence), 1000)
        }
    }

    return (
        <div className="p-6">
            <div className="max-w-2xl mx-auto">
                {/* Score */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="glass-panel p-4 rounded-xl text-center border border-white/10">
                        <div className="text-2xl font-bold text-blue-400">{score}</div>
                        <div className="text-sm text-white/70">Level</div>
                    </div>
                    <div className="glass-panel p-4 rounded-xl text-center border border-white/10">
                        <div className="text-2xl font-bold text-yellow-400">{highScore}</div>
                        <div className="text-sm text-white/70">Best</div>
                    </div>
                </div>

                {/* Game Board */}
                <div className="glass-panel p-8 rounded-xl mb-6 border border-white/10">
                    <div className="grid grid-cols-2 gap-4 aspect-square max-w-md mx-auto">
                        {colors.map((color) => (
                            <button
                                key={color.id}
                                onClick={() => handleButtonClick(color.id)}
                                disabled={!isPlayerTurn}
                                className={`rounded-2xl transition-all duration-200 cursor-pointer disabled:cursor-not-allowed ${
                                    activeButton === color.id ? color.activeColor : color.color
                                } ${activeButton === color.id ? 'scale-95' : 'hover:scale-105'}`}
                            />
                        ))}
                    </div>
                </div>

                {/* Status */}
                <div className="text-center mb-4">
                    {isPlaying && !gameOver && (
                        <div className="text-white text-lg">
                            {isPlayerTurn ? '👆 Your Turn!' : '👀 Watch...'}
                        </div>
                    )}
                    {gameOver && (
                        <div className="glass-panel p-4 rounded-xl border border-red-500/30">
                            <h3 className="text-xl font-bold text-red-400 mb-2">Game Over!</h3>
                            <p className="text-white/70">You reached level {score}</p>
                        </div>
                    )}
                </div>

                {/* Controls */}
                <button
                    onClick={startGame}
                    className="w-full glass-panel p-4 rounded-xl text-white hover:bg-white/10 transition-all flex items-center justify-center gap-2 border border-white/10 font-semibold"
                >
                    {isPlaying ? <FaRedo /> : <FaPlay />}
                    {isPlaying ? 'Restart' : 'Start Game'}
                </button>
            </div>
        </div>
    )
}

export default SimonSays
