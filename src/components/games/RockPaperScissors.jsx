import React, { useState } from 'react'
import { FaHandRock, FaHandPaper, FaHandScissors, FaRedo } from 'react-icons/fa'

const RockPaperScissors = () => {
    const [playerChoice, setPlayerChoice] = useState(null)
    const [computerChoice, setComputerChoice] = useState(null)
    const [result, setResult] = useState('')
    const [score, setScore] = useState({ player: 0, computer: 0, draws: 0 })

    const choices = [
        { id: 'rock', name: 'Rock', icon: FaHandRock, emoji: '✊' },
        { id: 'paper', name: 'Paper', icon: FaHandPaper, emoji: '✋' },
        { id: 'scissors', name: 'Scissors', icon: FaHandScissors, emoji: '✌️' }
    ]

    const getWinner = (player, computer) => {
        if (player === computer) return 'draw'
        if (
            (player === 'rock' && computer === 'scissors') ||
            (player === 'paper' && computer === 'rock') ||
            (player === 'scissors' && computer === 'paper')
        ) {
            return 'player'
        }
        return 'computer'
    }

    const play = (choice) => {
        const computerPick = choices[Math.floor(Math.random() * 3)].id
        setPlayerChoice(choice)
        setComputerChoice(computerPick)

        const winner = getWinner(choice, computerPick)
        
        if (winner === 'player') {
            setResult('You Win! 🎉')
            setScore(prev => ({ ...prev, player: prev.player + 1 }))
        } else if (winner === 'computer') {
            setResult('Computer Wins! 🤖')
            setScore(prev => ({ ...prev, computer: prev.computer + 1 }))
        } else {
            setResult("It's a Draw! 🤝")
            setScore(prev => ({ ...prev, draws: prev.draws + 1 }))
        }
    }

    const reset = () => {
        setPlayerChoice(null)
        setComputerChoice(null)
        setResult('')
        setScore({ player: 0, computer: 0, draws: 0 })
    }

    return (
        <div className="p-6">
            <div className="max-w-4xl mx-auto">
                {/* Score Board */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="glass-panel p-4 rounded-xl text-center border border-white/10">
                        <div className="text-2xl font-bold text-blue-400">{score.player}</div>
                        <div className="text-sm text-white/70">You</div>
                    </div>
                    <div className="glass-panel p-4 rounded-xl text-center border border-white/10">
                        <div className="text-2xl font-bold text-yellow-400">{score.draws}</div>
                        <div className="text-sm text-white/70">Draws</div>
                    </div>
                    <div className="glass-panel p-4 rounded-xl text-center border border-white/10">
                        <div className="text-2xl font-bold text-red-400">{score.computer}</div>
                        <div className="text-sm text-white/70">Computer</div>
                    </div>
                </div>

                {/* Result */}
                {result && (
                    <div className="glass-panel p-6 rounded-xl mb-6 text-center border border-white/10">
                        <h3 className="text-2xl font-bold text-white mb-4">{result}</h3>
                        <div className="flex justify-center gap-8 items-center">
                            <div className="text-center">
                                <div className="text-6xl mb-2">{choices.find(c => c.id === playerChoice)?.emoji}</div>
                                <div className="text-white/70">You</div>
                            </div>
                            <div className="text-3xl text-white/50">VS</div>
                            <div className="text-center">
                                <div className="text-6xl mb-2">{choices.find(c => c.id === computerChoice)?.emoji}</div>
                                <div className="text-white/70">Computer</div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Choices */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                    {choices.map((choice) => (
                        <button
                            key={choice.id}
                            onClick={() => play(choice.id)}
                            className="glass-panel p-6 rounded-xl hover:bg-white/10 transition-all cursor-pointer border border-white/10 group"
                        >
                            <div className="text-5xl mb-3 group-hover:scale-110 transition-transform">{choice.emoji}</div>
                            <div className="text-white font-medium">{choice.name}</div>
                        </button>
                    ))}
                </div>

                {/* Reset */}
                <button
                    onClick={reset}
                    className="w-full glass-panel p-3 rounded-xl text-white hover:bg-white/10 transition-all flex items-center justify-center gap-2 border border-white/10"
                >
                    <FaRedo /> Reset Game
                </button>
            </div>
        </div>
    )
}

export default RockPaperScissors
