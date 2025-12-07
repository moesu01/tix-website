import React from 'react'

export const WhatIsTix = () => (
  <section className="py-24 bg-black relative">
    <div className="section-container">
      <div className="mb-16">
        <div className="w-16 h-16 mb-6">
          {/* Logo Mark Placeholder */}
          <svg viewBox="0 0 100 100" className="w-full h-full fill-white">
            <path d="M50 0 L60 40 L100 50 L60 60 L50 100 L40 60 L0 50 L40 40 Z" />
          </svg>
        </div>
        <p className="subhead mb-2">WHAT IS TIX</p>
        <h2 className="serif text-6xl text-white mb-4">Programmable Tickets</h2>
        <p className="text-zinc-400">With built-in royalties, liquidity, and investor yield.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { title: "Liquidity & Yield", desc: "Automated market making for ticket inventory.", img: "https://picsum.photos/600/400?grayscale&blur=2" },
          { title: "Fraud-Proof", desc: "Cryptographic verification eliminates counterfeits.", img: "https://picsum.photos/600/401?grayscale&blur=2" },
          { title: "Programmable", desc: "Smart contracts pair capital with infrastructure.", img: "https://picsum.photos/600/402?grayscale&blur=2" }
        ].map((item, i) => (
          <div key={i} className="group cursor-default">
            <div className="aspect-video w-full rounded-xl overflow-hidden border border-white/10 bg-zinc-900 mb-6 relative">
              <img src={item.img} alt={item.title} className="w-full h-full object-cover opacity-60 group-hover:opacity-80 group-hover:scale-105 transition-all duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              {/* Overlay graphics simulation */}
              <div className="absolute bottom-4 left-4 right-4 h-1/2 border border-dashed border-white/20 rounded-lg" />
            </div>
            <h3 className="serif text-3xl text-white mb-2 group-hover:text-blue-200 transition-colors">{item.title}</h3>
            <p className="text-zinc-500 text-sm">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
)

