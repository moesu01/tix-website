import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HeroShader } from './HeroShader'
import { LuGlobe } from 'react-icons/lu'
import { TbBrandTelegram } from 'react-icons/tb'
import { FaXTwitter } from 'react-icons/fa6'
import { HiOutlineMenuAlt3, HiX } from 'react-icons/hi'

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
  const [isMenuOpen, setIsMenuOpen] = useState(false)

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

  // Body scroll lock when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isMenuOpen])

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
        <div className="max-w-[1500px] mx-auto flex items-center relative">
          {/* Left: Social Links (hidden on mobile) */}
          <div className="flex-1 hidden md:flex items-center gap-5">
            <a 
              href="https://x.com/tixprotocol"
              target="_blank"
              rel="noopener noreferrer"
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

          {/* Center: Logo */}
          <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2">
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

          {/* Right: CTA button - fades in from blur after scrolling past hero (hidden on mobile) */}
          <div 
            className="flex-1 hidden md:flex justify-end"
            style={{
              opacity: isPastHero ? 1 : 0,
              filter: isPastHero ? 'blur(0px)' : 'blur(4px)',
              transition: 'opacity 500ms ease-out, filter 500ms ease-out',
              pointerEvents: isPastHero ? 'auto' : 'none',
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

          {/* Mobile Menu Button (right side) */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden flex items-center justify-center w-11 h-11 -mr-2 ml-auto text-white/75 hover:text-white transition-colors"
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <HiX size={24} /> : <HiOutlineMenuAlt3 size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-30 md:hidden"
          >
            {/* Backdrop */}
            <div 
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              onClick={() => setIsMenuOpen(false)}
              aria-hidden="true"
            />
            {/* Menu Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="absolute right-0 top-0 h-full w-72 bg-black/95 border-l border-white/10 p-6 pt-20"
            >
              <nav className="flex flex-col gap-2" aria-label="Mobile navigation">
                {/* Social Links - 48px min touch target */}
                <a 
                  href="https://x.com/tixprotocol"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-4 py-3 min-h-[48px] text-white/75 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                  aria-label="Follow on X"
                  tabIndex={0}
                >
                  <FaXTwitter size={20} />
                  <span>Follow on X</span>
                </a>
                <a 
                  href="#" 
                  className="flex items-center gap-3 px-4 py-3 min-h-[48px] text-white/75 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                  aria-label="Join Telegram"
                  tabIndex={0}
                >
                  <TbBrandTelegram size={20} />
                  <span>Join Telegram</span>
                </a>
                {/* CTA Button */}
                <div className="mt-4 relative">
                  <div className="cta-glow" aria-hidden="true" />
                  <button 
                    className="cta-gradient w-full px-4 py-3 min-h-[48px] text-sm font-semibold flex items-center justify-center gap-2"
                    aria-label="Get Early Access"
                  >
                    <LuGlobe size={20} className="text-white/75 relative z-10" />
                    <span className="text-white/75">Get Early Access</span>
                  </button>
                </div>
              </nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section 
        className={[
          // Layout
          'relative flex flex-col content-center',
          // Sizing
          'w-full h-auto py-12',
          'min-h-[600px] max-w-[1500px]',
          // Spacing
          'mx-auto',
        ].join(' ')}
      >
        
        {/* Content */}
        <div 
          id="hero-content"
          className="w-full h-full flex flex-col justify-center gap-12 px-6 md:px-12 lg:px-20 order-2 relative z-20 -mt-[3vh]"
        >
            <div id="hero-main" className="max-w-xl text-center space-y-4 mx-auto">
              <h1 className="serif text-6xl md:text-7xl lg:text-8xl leading-[0.9] gradient-text-hero pt-2 overflow-visible">
              The Standard <br /> for Tickets
              </h1>
              <p className="text-[18px] lg:text-[20px] font-light leading-[1.3] max-w-[300px] lg:max-w-[350px] mx-auto gradient-text-body tracking-[0.01em] md:mb-8">
              A Ticket Standard that turns tickets into capital through $TIX. 
              </p>
              <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
                <div className="relative">
                  <div className="cta-glow" aria-hidden="true" />
                  <button className="cta-gradient px-6 py-3 text-sm font-semibold transition-all hover:opacity-90 flex items-center gap-2 relative z-10">
                    <LuGlobe size={20} className="text-white/75 relative z-10" />
                    <span className="text-white/75">Get Early Access</span>
                  </button>
                </div>
                <a 
                  href="https://x.com/tixprotocol"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 text-sm font-semibold transition-transform duration-200 hover:scale-105 flex items-center gap-2 border border-white/20 rounded-lg"
                  aria-label="Follow us on X"
                >
                  <FaXTwitter size={20} className="text-white/75" />
                  <span className="text-white/75">Follow us on X</span>
                </a>
              </div>
            </div>
            <div id="hero-social-proof" className="text-s text-white/50 leading-[1.6] uppercase tracking-widest text-center max-w-xl mx-auto">
              <p className="mb-3">Built by builders from and for:</p>
              <div className="flex items-center justify-center gap-6 md:gap-8">
                <img 
                  src={`${import.meta.env.BASE_URL}backed/live-nation.png`} 
                  alt="Live Nation" 
                  className="h-5 w-auto opacity-50"
                />
                <img 
                  src={`${import.meta.env.BASE_URL}backed/tm.svg`} 
                  alt="Ticketmaster" 
                  className="h-5 w-auto opacity-50"
                />
                <img 
                  src={`${import.meta.env.BASE_URL}backed/vivid seats.png`} 
                  alt="Vivid Seats" 
                  className="h-5 w-auto opacity-50"
                />
              </div>
            </div>
        </div>

        {/* Shader */}
        <div 
          className={[
            // Mobile (< 640px) - Full bleed immersive
            'relative w-[120vw] -ml-[10vw] aspect-square',
            // Small tablets (640-768px) - Scaled down to prevent balloon
            'sm:w-[50vh] sm:max-w-[400px] sm:ml-auto sm:mr-auto',
            // Desktop (768px+) - Original sizing
            'md:w-[40vh] md:max-w-[500px]',
            'order-1',
            'z-10',
            'overflow-visible',
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
            className="w-full h-full absolute inset-0"
          />
        </div>

      </section>
    </>
  )
}

