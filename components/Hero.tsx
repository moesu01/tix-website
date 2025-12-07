import React from 'react'
import { HeroShader } from './HeroShader'
import { Menu } from 'lucide-react'

interface HeroProps {
  speed: number
  glow: number
  distortion: number
  interaction: number
  enableInteraction: boolean
  iterations: number
  interactionMin: number
  interactionMax: number
}

export const Hero = ({
  speed,
  glow,
  distortion,
  interaction,
  enableInteraction,
  iterations,
  interactionMin,
  interactionMax,
}: HeroProps) => {
  return (
    <>
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 py-6 mix-blend-difference">
        <div className="section-container flex justify-between items-center">
          <div className="flex items-center gap-2">
             <div className="w-8 h-8 border border-white flex items-center justify-center">
               <div className="w-4 h-4 bg-white transform rotate-45"></div>
             </div>
             <span className="text-2xl font-bold tracking-widest">TIX</span>
          </div>
          <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <Menu className="w-6 h-6 text-white" />
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative w-full min-h-screen flex flex-col md:block bg-black">
        
        {/* Left Column: Content */}
        {/* Transparent background (inherited from section) */}
        <div className="w-full md:w-[60%] md:min-w-[600px] flex flex-col justify-center px-6 md:px-12 lg:px-20 pt-0 pb-24 md:py-0 order-2 md:order-none relative z-20 md:min-h-screen -mt-[60px] md:mt-0">
            <div className="max-w-xl text-center md:text-left space-y-8 mx-auto md:mx-0">
              <h1 className="serif text-6xl md:text-8xl leading-[0.9] gradient-text-hero pt-2 overflow-visible">
                The standard <br /> for tickets
              </h1>
              <p className="text-[18px] md:text-[20px] font-light leading-[1.3] max-w-[350px] mx-auto md:mx-0 gradient-text-hero tracking-[0.01em]">
                Live event ticketing, modernized through onchain infrastructure.
              </p>
              <div className="flex flex-col md:flex-row gap-4 items-center justify-center md:justify-start">
                <button className="cta-gradient px-6 py-3 font-semibold transition-all hover:opacity-90">
                  <span className="text-white/75">Join Waitlist</span>
                </button>
              </div>
            </div>
            <div className="text-xs text-white/40 uppercase tracking-widest text-center md:text-left max-w-xl mx-auto md:mx-0 mt-16 md:mt-20 mb-8 md:mb-12">
              Built for builders from:<br/>
              <span className="text-white/80">Live Nation, Ticketmaster, Vividseats</span>
            </div>
        </div>

        {/* Right Column: Shader */}
        {/* Absolutely positioned on desktop, right-aligned and vertically centered */}
        <div className="w-full h-[65vh] order-1 md:order-none relative md:absolute md:right-0 md:top-1/2 md:-translate-y-1/2 md:w-[55%] md:h-[80%] z-10">
          <HeroShader 
            speed={speed} 
            glow={glow} 
            distortion={distortion} 
            interaction={interaction}
            enableInteraction={enableInteraction}
            iterations={iterations}
            interactionMin={interactionMin}
            interactionMax={interactionMax}
            className="w-full h-full absolute inset-0"
          />
          
          {/* Desktop gradient overlay - Fade left edge more to blend smoothly with overlapping text */}
          <div className="absolute inset-y-0 left-0 w-48 bg-gradient-to-r from-black via-black/50 to-transparent pointer-events-none hidden md:block" />
          {/* Desktop gradient overlay - Fade top/bottom slightly to match section edges */}
          <div className="absolute top-0 inset-x-0 h-16 bg-gradient-to-b from-black to-transparent pointer-events-none hidden md:block" />
          <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-black to-transparent pointer-events-none hidden md:block" />
        </div>

      </section>
    </>
  )
}

