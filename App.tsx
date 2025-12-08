import React, { useState, useEffect, useRef } from 'react'
import { Hero } from './components/Hero'
import { BackedBy } from './components/BackedBy'
import { TheIssue } from './components/TheIssue'
import { WhatIsTix } from './components/WhatIsTix'
import { Proof } from './components/Proof'
import { Footer } from './components/Footer'
import { FloatingControls } from './components/FloatingControls'

// Toggle to show shader controls (set to true for testing)
const SHOW_DEV_CONTROLS = false

const App: React.FC = () => {
  // Footer visibility state for navbar fade
  const footerRef = useRef<HTMLElement>(null)
  const [isFooterVisible, setIsFooterVisible] = useState(false)
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
  
  // Color adjustment states
  const [brightness, setBrightness] = useState(0.6)
  const [contrast, setContrast] = useState(1.0)
  const [saturation, setSaturation] = useState(1.15)

  // Footer visibility observer for navbar fade
  useEffect(() => {
    const footer = footerRef.current
    if (!footer) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsFooterVisible(entry.isIntersecting)
      },
      { threshold: 0.1 }
    )

    observer.observe(footer)
    return () => observer.disconnect()
  }, [])

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
      // Use scroll interaction on mobile - exaggerated effect
      if (window.innerWidth < 768) {
        const scrollNorm = Math.min(window.scrollY / (window.innerHeight * 0.8), 1) // Faster ramp - full effect at 0.8 screens
        setInteraction(scrollNorm * 1.5) // Push interaction beyond desktop range
        
        // Exaggerated glow: 1.0 - 2.8 range (wider than desktop)
        const glowValue = 1.0 + scrollNorm * 1.8
        setGlow(glowValue)
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
    <main 
      className="relative min-h-screen bg-black text-white overflow-x-hidden selection:bg-white/20"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='1' cy='1' r='1' fill='rgba(255,255,255,0.15)'/%3E%3C/svg%3E")`,
        backgroundSize: '16px 16px',
        backgroundRepeat: 'repeat',
      }}
    >
      
      <Hero 
        speed={speed}
        glow={glow}
        distortion={distortion}
        interaction={interaction}
        enableInteraction={enableInteraction}
        iterations={iterations}
        interactionMin={interactionMin}
        interactionMax={interactionMax}
        brightness={brightness}
        contrast={contrast}
        saturation={saturation}
        isFooterVisible={isFooterVisible}
      />

      {/* Content Sections */}
      <div className="relative z-20 bg-black">
        <BackedBy />
        <TheIssue />
        <WhatIsTix />
        <Proof />
        <Footer ref={footerRef} />
      </div>

      {/* Floating Controls - Hidden for production, set SHOW_DEV_CONTROLS = true to enable */}
      {SHOW_DEV_CONTROLS && (
        <FloatingControls 
          speed={speed} setSpeed={setSpeed}
          glow={glow} setGlow={setGlow}
          distortion={distortion} setDistortion={setDistortion}
          enableInteraction={enableInteraction}
          setEnableInteraction={setEnableInteraction}
          iterations={iterations} setIterations={setIterations}
          interactionMin={interactionMin} setInteractionMin={setInteractionMin}
          interactionMax={interactionMax} setInteractionMax={setInteractionMax}
          brightness={brightness} setBrightness={setBrightness}
          contrast={contrast} setContrast={setContrast}
          saturation={saturation} setSaturation={setSaturation}
        />
      )}

    </main>
  )
}

export default App
