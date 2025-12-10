import React from 'react'
import { FaXTwitter } from 'react-icons/fa6'
import { TbBrandTelegram } from 'react-icons/tb'

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
        
        {/* Social icons */}
        <div className="flex items-center gap-5">
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
