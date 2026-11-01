import React, { useState, useEffect, useCallback } from 'react'
import { FaRedo, FaPlay, FaPause } from 'react-icons/fa'

const SnakeGame = () => {
    const gridSize = 20
    const [snake, setSnake] = useState([[10, 10]])
    const [food, setFood] = useState([15, 15])
    const [direction, setDirection] = useState('RIGHT')
    const [gameOver, setGameOver] = useState(false)
    const [score, setScore] = useState(0)
    const [isPaused, setIsPaused] = useState(false)
    const [highScore, setHighScore] = useState(0)

    const generateFood = useCallback(() => {
        const newFood = [
            Math.floor(Math.random() * gridSize),
            Math.floor(Math.random() * gridSize)
        ]
        setFood(newFood)
    }, [])

    const resetGame = () => {
        setSnake([[10, 10]])
        setDirection('RIGHT')
        setGameOver(false)
        setScore(0)
        setIsPaused(false)
        generateFood()
    }

    useEffect(() => {
        const handleKeyPress = (e) => {
            if (gameOver) return
            
            switch(e.key) {
                case 'ArrowUp':
                    if (direction !== 'DOWN') setDirection('UP')
                    break
                case 'ArrowDown':
                    if (direction !== 'UP') setDirection('DOWN')
                    break
                case 'ArrowLeft':
                    if (direction !== 'RIGHT') setDirection('LEFT')
                    break
                case 'ArrowRight':
                    if (direction !== 'LEFT') setDirection('RIGHT')
                    break
                case ' ':
                    setIsPaused(prev => !prev)
                    break
                default:
                    break
            }
        }

        window.addEventListener('keydown', handleKeyPress)
        return () => window.removeEventListener('keydown', handleKeyPress)
    }, [direction, gameOver])

    useEffect(() => {
        if (gameOver || isPaused) return

        const moveSnake = () => {
            const newSnake = [...snake]
            const head = [...newSnake[0]]

            switch(direction) {
                case 'UP':
                    head[0] -= 1
                    break
                case 'DOWN':
                    head[0] += 1
                    break
                case 'LEFT':
                    head[1] -= 1
                    break
                case 'RIGHT':
                    head[1] += 1
                    break
                default:
                    break
            }

            // Check wall collision
            if (head[0] < 0 || head[0] >= gridSize || head[1] < 0 || head[1] >= gridSize) {
                setGameOver(true)
                if (score > highScore) setHighScore(score)
                return
            }

            // Check self collision
            if (newSnake.some(segment => segment[0] === head[0] && segment[1] === head[1])) {
                setGameOver(true)
                if (score > highScore) setHighScore(score)
                return
            }

            newSnake.unshift(head)

            // Check food collision
            if (head[0] === food[0] && head[1] === food[1]) {
                setScore(prev => prev + 10)
                generateFood()
            } else {
                newSnake.pop()
            }

            setSnake(newSnake)
        }

        const gameLoop = setInterval(moveSnake, 150)
        return () => clearInterval(gameLoop)
    }, [snake, direction, food, gameOver, isPaused, generateFood, score, highScore])

    return (
        <div className="p-6">
            <div className="max-w-2xl mx-auto">
                {/* Score */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="glass-panel p-4 rounded-xl text-center border border-white/10">
                        <div className="text-2xl font-bold text-green-400">{score}</div>
                        <div className="text-sm text-white/70">Score</div>
                    </div>
                    <div className="glass-panel p-4 rounded-xl text-center border border-white/10">
                        <div className="text-2xl font-bold text-yellow-400">{highScore}</div>
                        <div className="text-sm text-white/70">High Score</div>
                    </div>
                </div>

                {/* Game Board */}
                <div className="glass-panel p-4 rounded-xl mb-4 border border-white/10">
                    <div className="grid gap-0.5 bg-white/5 p-2 rounded-lg"
                        style={{
                            gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
                            aspectRatio: '1/1'
                        }}
                    >
                        {Array.from({ length: gridSize }).map((_, row) =>
                            Array.from({ length: gridSize }).map((_, col) => {
                                const isSnake = snake.some(segment => segment[0] === row && segment[1] === col)
                                const isFood = food[0] === row && food[1] === col
                                const isHead = snake[0][0] === row && snake[0][1] === col

                                return (
                                    <div
                                        key={`${row}-${col}`}
                                        className={`rounded-sm ${
                                            isHead ? 'bg-green-400' :
                                            isSnake ? 'bg-green-500' :
                                            isFood ? 'bg-red-500' :
                                            'bg-white/5'
                                        }`}
                                    />
                                )
                            })
                        )}
                    </div>
                </div>

                {/* Controls */}
                <div className="grid grid-cols-2 gap-4">
                    <button
                        onClick={() => setIsPaused(!isPaused)}
                        disabled={gameOver}
                        className="glass-panel p-3 rounded-xl text-white hover:bg-white/10 transition-all flex items-center justify-center gap-2 border border-white/10 disabled:opacity-50"
                    >
                        {isPaused ? <FaPlay /> : <FaPause />}
                        {isPaused ? 'Resume' : 'Pause'}
                    </button>
                    <button
                        onClick={resetGame}
                        className="glass-panel p-3 rounded-xl text-white hover:bg-white/10 transition-all flex items-center justify-center gap-2 border border-white/10"
                    >
                        <FaRedo /> Reset
                    </button>
                </div>

                {gameOver && (
                    <div className="glass-panel p-6 rounded-xl mt-4 text-center border border-red-500/30">
                        <h3 className="text-2xl font-bold text-red-400 mb-2">Game Over!</h3>
                        <p className="text-white/70">Final Score: {score}</p>
                    </div>
                )}

                <div className="text-center text-white/50 text-sm mt-4">
                    Use arrow keys to move • Space to pause
                </div>
            </div>
        </div>
    )
}

export default SnakeGame
