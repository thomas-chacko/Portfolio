import React, { useState, useEffect, useRef } from 'react'

const PerformanceChart = ({ label, color, gradient }) => {
    const [dataPoints, setDataPoints] = useState(Array(20).fill(50))
    const canvasRef = useRef(null)

    useEffect(() => {
        const interval = setInterval(() => {
            setDataPoints(prev => {
                const newData = [...prev.slice(1), Math.floor(Math.random() * 60) + 20]
                return newData
            })
        }, 1500)

        return () => clearInterval(interval)
    }, [])

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext('2d')
        const width = canvas.width
        const height = canvas.height

        // Clear canvas
        ctx.clearRect(0, 0, width, height)

        // Draw gradient fill
        const gradientFill = ctx.createLinearGradient(0, 0, 0, height)
        gradientFill.addColorStop(0, `${color}40`)
        gradientFill.addColorStop(1, `${color}05`)

        ctx.beginPath()
        ctx.moveTo(0, height)

        dataPoints.forEach((point, index) => {
            const x = (index / (dataPoints.length - 1)) * width
            const y = height - (point / 100) * height
            if (index === 0) {
                ctx.lineTo(x, y)
            } else {
                ctx.lineTo(x, y)
            }
        })

        ctx.lineTo(width, height)
        ctx.closePath()
        ctx.fillStyle = gradientFill
        ctx.fill()

        // Draw line
        ctx.beginPath()
        ctx.strokeStyle = color
        ctx.lineWidth = 2

        dataPoints.forEach((point, index) => {
            const x = (index / (dataPoints.length - 1)) * width
            const y = height - (point / 100) * height
            if (index === 0) {
                ctx.moveTo(x, y)
            } else {
                ctx.lineTo(x, y)
            }
        })

        ctx.stroke()
    }, [dataPoints, color])

    const currentValue = dataPoints[dataPoints.length - 1]

    return (
        <div className={`glass-panel p-4 rounded-2xl bg-gradient-to-br ${gradient}`}>
            <div className="flex items-center justify-between mb-2">
                <div className="text-xs text-white/70">{label}</div>
                <div className="text-lg font-bold text-white">{currentValue}%</div>
            </div>
            <canvas
                ref={canvasRef}
                width={200}
                height={60}
                className="w-full h-14"
                style={{ imageRendering: 'crisp-edges' }}
            />
        </div>
    )
}

export default PerformanceChart
