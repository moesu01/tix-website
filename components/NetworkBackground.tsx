import React, { useRef, useEffect, useState } from 'react'

interface Dot {
  x: number
  y: number
  baseOpacity: number
  currentOpacity: number
  targetOpacity: number
  glowPhase: number
  glowSpeed: number
  isGlowing: boolean
  glowTimer: number
}

// SVG fallback background style
const fallbackBgStyle: React.CSSProperties = {
  backgroundImage: `url("data:image/svg+xml,%3Csvg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='1' cy='1' r='1' fill='rgba(255,255,255,0.15)'/%3E%3C/svg%3E")`,
  backgroundSize: '16px 16px',
  backgroundRepeat: 'repeat',
}

export const NetworkBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const dotsRef = useRef<Dot[]>([])
  const animationRef = useRef<number>(0)
  const [isCanvasReady, setIsCanvasReady] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      initDots()
    }

    const initDots = () => {
      dotsRef.current = []
      
      // Grid-based arrangement for geometric network look
      const gridSpacing = 48 // Denser grid (was effectively ~100+ with random)
      const jitter = 8 // Small offset for organic feel without looking random
      
      const cols = Math.ceil(canvas.width / gridSpacing) + 1
      const rows = Math.ceil(canvas.height / gridSpacing) + 1

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          // Base grid position with small jitter
          const x = col * gridSpacing + (Math.random() - 0.5) * jitter
          const y = row * gridSpacing + (Math.random() - 0.5) * jitter
          
          dotsRef.current.push({
            x,
            y,
            baseOpacity: 0.12 + Math.random() * 0.08, // 0.12 - 0.20 (more visible)
            currentOpacity: 0.12 + Math.random() * 0.08,
            targetOpacity: 0.12 + Math.random() * 0.08,
            glowPhase: Math.random() * Math.PI * 2,
            glowSpeed: 0.02 + Math.random() * 0.03,
            isGlowing: false,
            glowTimer: Math.random() * 500,
          })
        }
      }
    }

    const drawDot = (dot: Dot) => {
      if (!ctx) return

      // Glow effect for brighter dots (reduced intensity)
      if (dot.currentOpacity > 0.25) {
        const glowRadius = 4 + (dot.currentOpacity - 0.25) * 8
        const gradient = ctx.createRadialGradient(dot.x, dot.y, 0, dot.x, dot.y, glowRadius)
        gradient.addColorStop(0, `rgba(199, 231, 255, ${dot.currentOpacity * 0.2})`)
        gradient.addColorStop(0.5, `rgba(255, 254, 236, ${dot.currentOpacity * 0.08})`)
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)')
        
        ctx.beginPath()
        ctx.arc(dot.x, dot.y, glowRadius, 0, Math.PI * 2)
        ctx.fillStyle = gradient
        ctx.fill()
      }

      // Core dot
      ctx.beginPath()
      ctx.arc(dot.x, dot.y, 1.5, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(255, 254, 236, ${dot.currentOpacity})`
      ctx.fill()
    }

    const drawLines = () => {
      if (!ctx) return

      const connectionDistance = 70 // Slightly larger than grid spacing to connect neighbors
      const dots = dotsRef.current

      for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
          const dx = dots[i].x - dots[j].x
          const dy = dots[i].y - dots[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < connectionDistance) {
            // Higher base opacity for more visible lines
            const proximityOpacity = 1 - distance / connectionDistance
            const brightnessBoost = Math.max(dots[i].currentOpacity, dots[j].currentOpacity)
            const lineOpacity = 0.025 + proximityOpacity * brightnessBoost * 0.5 // Base 0.08 + dynamic

            ctx.beginPath()
            ctx.moveTo(dots[i].x, dots[i].y)
            ctx.lineTo(dots[j].x, dots[j].y)
            ctx.strokeStyle = `rgba(255, 255, 255, ${lineOpacity})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }
    }

    const updateDots = () => {
      const dots = dotsRef.current

      dots.forEach((dot) => {
        dot.glowTimer--

        // Start glowing randomly (reduced intensity)
        if (!dot.isGlowing && dot.glowTimer <= 0) {
          dot.isGlowing = true
          dot.targetOpacity = 0.15 + Math.random() * 0.25 // 0.25 - 0.40 (50% less)
          dot.glowTimer = 100 + Math.random() * 200 // Glow duration
        }

        // Stop glowing
        if (dot.isGlowing && dot.glowTimer <= 0) {
          dot.isGlowing = false
          dot.targetOpacity = dot.baseOpacity
          dot.glowTimer = 200 + Math.random() * 600 // Time until next glow
        }

        // Smooth transition to target opacity
        const opacityDiff = dot.targetOpacity - dot.currentOpacity
        dot.currentOpacity += opacityDiff * 0.05

        // Add subtle pulsing for glowing dots
        if (dot.isGlowing) {
          dot.glowPhase += dot.glowSpeed
          const pulse = Math.sin(dot.glowPhase) * 0.1
          dot.currentOpacity = Math.max(dot.baseOpacity, dot.currentOpacity + pulse * 0.02)
        }
      })
    }

    const animate = () => {
      if (!ctx || !canvas) return

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw connecting lines first (behind dots)
      drawLines()

      // Update and draw dots
      updateDots()
      dotsRef.current.forEach(drawDot)

      animationRef.current = requestAnimationFrame(animate)
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)
    animate()
    setIsCanvasReady(true)

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      cancelAnimationFrame(animationRef.current)
    }
  }, [])

  return (
    <div 
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ ...(!isCanvasReady ? fallbackBgStyle : {}), zIndex: 0 }}
      aria-hidden="true"
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full"
      />
    </div>
  )
}
