import React, { useState, useEffect } from 'react'
import { Hero } from './components/Hero'
import { BackedBy } from './components/BackedBy'
import { TheIssue } from './components/TheIssue'
import { WhatIsTix } from './components/WhatIsTix'
import { Proof } from './components/Proof'
import { Footer } from './components/Footer'
import { FloatingControls } from './components/FloatingControls'

const App: React.FC = () => {
  // Shader Control States
  const [speed, setSpeed] = useState(0.20)
  const [glow, setGlow] = useState(1.50)
  const [distortion, setDistortion] = useState(0.0)
  const [interaction, setInteraction] = useState(0.0)
  const [enableInteraction, setEnableInteraction] = useState(true)
  
  // New States
  const [iterations, setIterations] = useState(12)
  const [interactionMin, setInteractionMin] = useState(0.0)
  const [interactionMax, setInteractionMax] = useState(4.2)

  // Interaction Logic (Mouse & Scroll)
  useEffect(() => {
    if (!enableInteraction) {
      setInteraction(0)
      return
    }

    const handleMouseMove = (e: MouseEvent) => {
      // Only use mouse interaction on larger screens
      if (window.innerWidth >= 768) {
        // Normalize X to 0..1 for distortion interaction
        const x = e.clientX / window.innerWidth
        setInteraction(x)
        
        // Normalize Y to 0..1 for glow control (1 to 2)
        const y = e.clientY / window.innerHeight
        const glowValue = 1.2 + y // Maps 0..1 to 1..2
        setGlow(glowValue)
      }
    }

    const handleScroll = () => {
      // Use scroll interaction on mobile
      if (window.innerWidth < 768) {
        const scrollMax = document.documentElement.scrollHeight - window.innerHeight
        const scrollNorm = Math.min(window.scrollY / (window.innerHeight * 1.5), 1) // Cap effect at 1.5 screens
        setInteraction(scrollNorm)
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [enableInteraction])

  return (
    <main className="relative min-h-screen bg-black text-white overflow-x-hidden selection:bg-white/20">
      
      <Hero 
        speed={speed}
        glow={glow}
        distortion={distortion}
        interaction={interaction}
        enableInteraction={enableInteraction}
        iterations={iterations}
        interactionMin={interactionMin}
        interactionMax={interactionMax}
      />

      {/* Content Sections */}
      <div className="relative z-20 bg-black">
        <BackedBy />
        <TheIssue />
        <WhatIsTix />
        <Proof />
        <Footer />
      </div>

      {/* Floating Controls */}
      <FloatingControls 
        speed={speed} setSpeed={setSpeed}
        glow={glow} setGlow={setGlow}
        distortion={distortion} setDistortion={setDistortion}
        enableInteraction={enableInteraction}
        setEnableInteraction={setEnableInteraction}
        iterations={iterations} setIterations={setIterations}
        interactionMin={interactionMin} setInteractionMin={setInteractionMin}
        interactionMax={interactionMax} setInteractionMax={setInteractionMax}
      />

    </main>
  )
}

export default App
