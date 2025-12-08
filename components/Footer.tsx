import React from 'react'

export const Footer = React.forwardRef<HTMLElement>((_, ref) => (
  <footer ref={ref} className="py-12 border-t border-white/10">
    <div className="section-container">
      {/* Mirror of navbar */}
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-2">
          <img 
            src={`${import.meta.env.BASE_URL}tix_symbol.png`} 
            alt="Tix Logo" 
            className="h-8 w-auto"
          />
          <img 
            src={`${import.meta.env.BASE_URL}tix_word.svg`} 
            alt="TIX" 
            className="h-8 w-auto"
          />
        </div>
        
        <div className="relative">
          <div className="cta-glow" aria-hidden="true" />
          <button 
            className="cta-gradient px-4 py-2 text-sm font-semibold hover:opacity-90"
            aria-label="Join Waitlist"
            tabIndex={0}
          >
            <span className="text-white/75">Join TGE Waitlist</span>
          </button>
        </div>
      </div>

      {/* Copyright line */}
      <div className="text-center text-zinc-500 text-xs">
        © {new Date().getFullYear()} TIX Protocol. All rights reserved.
      </div>
    </div>
  </footer>
))

Footer.displayName = 'Footer'
