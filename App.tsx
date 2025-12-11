import React, { useState, useEffect, useRef, useCallback } from 'react'
import { Hero } from './components/Hero'
import { BackedBy } from './components/BackedBy'
import { TheIssue } from './components/TheIssue'
import { WhatIsTix } from './components/WhatIsTix'
import { Proof } from './components/Proof'
import { Footer } from './components/Footer'
import { FloatingControls } from './components/FloatingControls'
import { QualityPreset, QUALITY_PRESETS } from './types'

// Toggle to show shader controls (set to true for testing)
const SHOW_DEV_CONTROLS = false

// Detect if device is mobile (touch device or narrow viewport)
const detectMobile = (): boolean => {
  if (typeof window === 'undefined') return false
  return (
    'ontouchstart' in window ||
    navigator.maxTouchPoints > 0 ||
    window.innerWidth < 768
  )
}

// Get default quality preset based on device
const getDefaultQuality = (): QualityPreset => {
  if (typeof window === 'undefined') return 'balanced'
  const isMobile = detectMobile()
  // Mobile defaults to 'balanced', desktop to 'high'
  return isMobile ? 'balanced' : 'high'
}

const App: React.FC = () => {
  // Quality preset state - auto-detects mobile vs desktop
  const [qualityPreset, setQualityPreset] = useState<QualityPreset>(() => getDefaultQuality())
  const quality = QUALITY_PRESETS[qualityPreset]
  
  // Footer visibility state for navbar fade
  const footerRef = useRef<HTMLElement>(null)
  const [isFooterVisible, setIsFooterVisible] = useState(false)
  
  // Shader Control States
  const [speed, setSpeed] = useState(0.20)
  const [glow, setGlow] = useState(1.50)
  const [distortion, setDistortion] = useState(0.0)
  const [interaction, setInteraction] = useState(0.0)
  const [enableInteraction, setEnableInteraction] = useState(true)
  
  // Use quality preset for iterations, allow manual override
  const [iterations, setIterations] = useState(quality.iterations)
  const [fbmIterations, setFbmIterations] = useState(quality.fbmIterations)
  const [interactionMin, setInteractionMin] = useState(0.0)
  const [interactionMax, setInteractionMax] = useState(4.2)
  
  // Color adjustment states
  const [brightness, setBrightness] = useState(0.5)
  const [contrast, setContrast] = useState(1.5)
  const [saturation, setSaturation] = useState(1.25)

  // Update quality-dependent values when preset changes
  useEffect(() => {
    setIterations(quality.iterations)
    setFbmIterations(quality.fbmIterations)
  }, [quality])

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

  // RAF-throttled interaction handlers for better mobile performance
  const rafRef = useRef<number>(0)
  const pendingUpdate = useRef<{ interaction?: number; glow?: number }>({})

  const scheduleUpdate = useCallback(() => {
    if (rafRef.current) return // Already scheduled
    
    rafRef.current = requestAnimationFrame(() => {
      if (pendingUpdate.current.interaction !== undefined) {
        setInteraction(pendingUpdate.current.interaction)
      }
      if (pendingUpdate.current.glow !== undefined) {
        setGlow(pendingUpdate.current.glow)
      }
      pendingUpdate.current = {}
      rafRef.current = 0
    })
  }, [])

  // Interaction Logic (Mouse & Scroll) - RAF throttled
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
        pendingUpdate.current.interaction = x
        
        // Normalize Y to 0..1 for glow control (1 to 2)
        const y = e.clientY / window.innerHeight
        pendingUpdate.current.glow = 1.2 + y
        
        scheduleUpdate()
      }
    }

    const handleScroll = () => {
      // Use scroll interaction on mobile - exaggerated effect
      if (window.innerWidth < 768) {
        const scrollNorm = Math.min(window.scrollY / (window.innerHeight * 0.8), 1)
        pendingUpdate.current.interaction = scrollNorm * 1.5
        pendingUpdate.current.glow = 1.0 + scrollNorm * 1.8
        
        scheduleUpdate()
      }
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('scroll', handleScroll)
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }
    }
  }, [enableInteraction, scheduleUpdate])

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
        fbmIterations={fbmIterations}
        interactionMin={interactionMin}
        interactionMax={interactionMax}
        brightness={brightness}
        contrast={contrast}
        saturation={saturation}
        dpr={quality.dpr}
        shadowCount={quality.shadowCount}
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
          fbmIterations={fbmIterations} setFbmIterations={setFbmIterations}
          interactionMin={interactionMin} setInteractionMin={setInteractionMin}
          interactionMax={interactionMax} setInteractionMax={setInteractionMax}
          brightness={brightness} setBrightness={setBrightness}
          contrast={contrast} setContrast={setContrast}
          saturation={saturation} setSaturation={setSaturation}
          qualityPreset={qualityPreset} setQualityPreset={setQualityPreset}
        />
      )}

    </main>
  )
}

export default App
