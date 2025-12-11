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
        <div className="flex items-center gap-1">
          <a 
            href="https://x.com/tixprotocol"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-11 h-11 text-white/75 hover:text-white hover:bg-white/5 rounded-lg transition-colors duration-200"
            aria-label="Follow on X"
            tabIndex={0}
          >
            <FaXTwitter size={20} />
          </a>
          <a 
            href="#" 
            className="hidden flex items-center justify-center w-11 h-11 text-white/75 hover:text-white hover:bg-white/5 rounded-lg transition-colors duration-200"
            aria-label="Join Telegram"
            tabIndex={0}
          >
            <TbBrandTelegram size={20} />
          </a>
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
