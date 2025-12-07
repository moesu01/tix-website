import React from 'react'

export const BackedBy = () => (
  <div className="w-full py-16 border-t border-white/5 bg-gradient-to-b from-black to-zinc-950">
    <div className="section-container">
      <p className="subhead text-center mb-8">BACKED BY THE BEST</p>
      <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
         {/* Placeholder Logos using Text for simplicity, in real app use SVGs */}
         <div className="text-xl font-bold tracking-tighter">Comcast Ventures</div>
         <div className="text-xl font-bold italic">a16z</div>
         <div className="text-xl font-bold">NBCUniversal</div>
         <div className="text-xl font-bold tracking-widest">CAA</div>
         <div className="text-xl font-bold font-serif">UTA</div>
      </div>
    </div>
  </div>
)

