import React, { useState, useEffect } from 'react'
import { HeroShader } from './HeroShader'
import { LuGlobe } from 'react-icons/lu'
import { TbBrandTelegram } from 'react-icons/tb'
import { FaXTwitter } from 'react-icons/fa6'

interface HeroProps {
  speed: number
  glow: number
  distortion: number
  interaction: number
  enableInteraction: boolean
  iterations: number
  fbmIterations: number
  interactionMin: number
  interactionMax: number
  brightness: number
  contrast: number
  saturation: number
  dpr: number
  shadowCount: number
  isFooterVisible: boolean
}

export const Hero = ({
  speed,
  glow,
  distortion,
  interaction,
  enableInteraction,
  iterations,
  fbmIterations,
  interactionMin,
  interactionMax,
  brightness,
  contrast,
  saturation,
  dpr,
  shadowCount,
  isFooterVisible,
}: HeroProps) => {
  const [isPastHero, setIsPastHero] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const heroHeight = window.innerHeight
      setIsPastHero(window.scrollY > heroHeight * 0.7)
    }

    window.addEventListener('scroll', handleScroll)
    window.addEventListener('resize', handleScroll)
    handleScroll() // Check initial state

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [])

  return (
    <>
      {/* Navigation */}
      <nav 
        className="fixed top-0 left-0 right-0 z-40 py-6 px-6 mix-blend-difference"
        style={{
          opacity: isFooterVisible ? 0 : 1,
          filter: isFooterVisible ? 'blur(4px)' : 'blur(0px)',
          transition: 'opacity 500ms ease-out, filter 500ms ease-out',
          pointerEvents: isFooterVisible ? 'none' : 'auto'
        }}
      >
        <div className="max-w-[1500px] mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
             <img 
               src={`${import.meta.env.BASE_URL}tix.svg`} 
               alt="Tix Logo" 
               className="h-8 w-auto"
             />
             <img 
               src={`${import.meta.env.BASE_URL}tix_word.svg`} 
               alt="TIX" 
               className="h-8 w-auto"
             />
          </div>
          
          {/* Social icons and CTA */}
          <div className="flex items-center">
            {/* Social icons - always visible, slide left when CTA appears */}
            <div 
              className="flex items-center gap-5"
              style={{
                transform: isPastHero ? 'translateX(0)' : 'translateX(0)',
                transition: 'transform 500ms ease-out'
              }}
            >
              <a 
                href="#" 
                className="flex items-center gap-2 text-[14px] text-white/75 hover:text-white transition-colors duration-200"
                aria-label="Follow on X"
                tabIndex={0}
              >
                <FaXTwitter size={18} />
                <span>Follow on X</span>
              </a>
              <a 
                href="#" 
                className="flex items-center gap-2 text-[14px] text-white/75 hover:text-white transition-colors duration-200"
                aria-label="Join Telegram"
                tabIndex={0}
              >
                <TbBrandTelegram size={18} />
                <span>Join Telegram</span>
              </a>
            </div>
            
            {/* CTA button - fades in from blur after scrolling past hero */}
            <div 
              className={isPastHero ? 'ml-6' : 'pointer-events-none w-0 overflow-hidden'}
              style={{
                opacity: isPastHero ? 1 : 0,
                filter: isPastHero ? 'blur(0px)' : 'blur(4px)',
                marginLeft: isPastHero ? '24px' : '0px',
                transition: 'opacity 500ms ease-out, filter 500ms ease-out, margin-left 500ms ease-out',
              }}
            >
              <div className="relative">
                <div className="cta-glow" aria-hidden="true" />
                <button 
                  className="cta-gradient px-4 py-2 text-sm font-semibold hover:opacity-90 whitespace-nowrap"
                  aria-label="Get Early Access"
                  aria-hidden={!isPastHero}
                  tabIndex={isPastHero ? 0 : -1}
                >
                  <span className="text-white/75">Get Early Access</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section 
        className={[
          // Layout
          'relative flex flex-col md:block content-center',
          // Sizing
          'w-full h-auto md:h-screen pb-12 md:pb-0',
          'min-h-[600px] lg:max-h-[800px] max-w-[1500px]',
          // Spacing
          'mx-auto',
        ].join(' ')}
      >
        
        {/* Left Column: Content */}
        <div 
          id="hero-content"
          className="w-full md:w-[60%] md:min-w-[600px] h-full flex flex-col justify-center gap-12 px-6 md:px-12 lg:px-20 order-2 md:order-none relative z-20 -mt-[12vh] md:mt-0"
        >
            <div id="hero-main" className="max-w-xl text-center md:text-left space-y-5 md:space-y-8 mx-auto md:mx-0">
              <h1 className="serif text-6xl md:text-7xl lg:text-8xl leading-[0.9] gradient-text-hero pt-2 overflow-visible">
              The Standard <br /> for Tickets
              </h1>
              <p className="text-[18px] lg:text-[20px] font-light leading-[1.3] max-w-[300px] lg:max-w-[350px] mx-auto md:mx-0 gradient-text-body tracking-[0.01em] md:mb-12">
              A Ticket Standard that turns tickets into capital through $TIX. 
              </p>
              <div className="flex flex-col sm:flex-row gap-4 items-center justify-center md:justify-start">
                <div className="relative">
                  <div className="cta-glow" aria-hidden="true" />
                  <button className="cta-gradient px-6 py-3 text-sm font-semibold transition-all hover:opacity-90 flex items-center gap-2 relative z-10">
                    <LuGlobe size={20} className="text-white/75 relative z-10" />
                    <span className="text-white/75">Get Early Access</span>
                  </button>
                </div>
                <a 
                  href="#" 
                  className="px-3 py-3 text-sm font-semibold transition-transform duration-200 hover:scale-105 flex items-center gap-2 border border-white/20 rounded-lg"
                  aria-label="Learn about $TIX Token"
                >
                  <TbBrandTelegram size={20} className="text-white/75" />
                  <span className="text-white/75">Learn about $TIX Token</span>
                </a>
              </div>
            </div>
            <div id="hero-social-proof" className="text-xs text-white/50 leading-[1.6] uppercase tracking-widest text-center md:text-left max-w-xl mx-auto md:mx-0">
              <p className="mb-3">Built by builders from and for:</p>
              <div className="flex items-center justify-center md:justify-start gap-6">
                <img 
                  src={`${import.meta.env.BASE_URL}backed/live-nation.png`} 
                  alt="Live Nation" 
                  className="h-4 w-auto opacity-50"
                />
                <img 
                  src={`${import.meta.env.BASE_URL}backed/tm.svg`} 
                  alt="Ticketmaster" 
                  className="h-4 w-auto opacity-50"
                />
                <img 
                  src={`${import.meta.env.BASE_URL}backed/vivid seats.png`} 
                  alt="Vivid Seats" 
                  className="h-4 w-auto opacity-50"
                />
              </div>
            </div>
        </div>

        {/* Right Column: Shader */}
        {/* Absolutely positioned on desktop, right-aligned and vertically centered */}
        <div 
          className={[
            // Base layout - 120vw on mobile, centered with negative margin, pulled up
            'relative w-[120vw] -ml-[10vw] aspect-square max-lg:max-h-[800px]',
            // Desktop reset
            'md:w-full md:h-full md:ml-0 md:mt-0 md:aspect-auto',
            'order-1 md:order-none',
            // Desktop positioning
            'md:absolute md:-right-0 md:translate-x-1/3 md:top-1/2 md:-translate-y-1/2 lg:-right-0 lg:translate-x-1/5',
            // Z-index
            'z-10',
            
          ].join(' ')}
        >
          <HeroShader 
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
            dpr={dpr}
            shadowCount={shadowCount}
            className="w-full h-full absolute inset-"
          />
          
          {/* Desktop gradient overlay - Fade left edge more to blend smoothly with overlapping text */}
          {/* Desktop gradient overlay - Fade top/bottom slightly to match section edges */}
        </div>

      </section>
    </>
  )
}

