import React from 'react'

export const WhatIsTix = () => (
  
  <section className="py-12 bg-black relative">
    
      <div 
        className="mb-12 text-center rounded-4xl py-6 md:py-6 px-6 md:px-12 "
      >
                <div className="w-16 h-16 mb-6 mx-auto hidden">
          <svg viewBox="0 0 161 175" className="w-full h-full fill-white" xmlns="http://www.w3.org/2000/svg">
            <path d="M62.8729 53.1962C63.0522 53.3825 63.1511 53.6324 63.1568 53.8909C63.3697 63.6503 71.2616 71.5116 81.0303 71.6877C90.1432 70.8273 97.3028 63.2553 97.5054 53.9659C97.511 53.7074 97.6099 53.4577 97.7892 53.2714L148.686 0.383796C149.31 -0.264822 150.406 0.177025 150.406 1.07721V42.6568C150.406 42.9315 150.293 43.1942 150.094 43.383L121.927 70.0468C121.27 70.6683 121.71 71.7729 122.614 71.773L145.506 71.7756C153.877 71.7771 160.662 78.5635 160.662 86.9348C160.662 95.3071 153.875 102.094 145.503 102.094L122.499 102.091C121.61 102.091 121.163 103.163 121.787 103.794L150.117 132.452C150.302 132.639 150.406 132.892 150.406 133.155V173.596C150.406 174.495 149.312 174.938 148.687 174.291L97.7903 121.572C97.6104 121.386 97.5109 121.135 97.5056 120.876C97.302 111.051 89.7125 103.045 80.0652 102.175C79.9962 102.169 79.9259 102.171 79.8572 102.179C70.565 103.381 63.3556 111.227 63.1566 120.798C63.1512 121.057 63.0518 121.308 62.8718 121.494L11.9753 174.215C11.3506 174.862 10.2559 174.42 10.2559 173.521V133.077C10.2559 132.814 10.3597 132.561 10.5447 132.374L38.8748 103.72C39.4992 103.088 39.0518 102.017 38.1637 102.017H15.1592C6.78706 102.017 3.99775e-07 95.229 0 86.8567C0.000833247 78.4861 6.78573 71.699 15.1562 71.6975L38.0478 71.6957C38.9519 71.6957 39.3918 70.5911 38.7351 69.9695L10.5684 43.3078C10.3689 43.119 10.2559 42.8563 10.2559 42.5816V1.00202C10.2559 0.101832 11.3522 -0.340018 11.9764 0.3086L62.8729 53.1962Z" />
          </svg>
        </div>
        <p className="subhead mb-2">WHAT IS TIX</p>
        <h2 className="serif text-6xl gradient-text-hero mb-4">Programmable Tickets</h2>
        
        <img 
          src={`${import.meta.env.BASE_URL}tix_circular.png`} 
          alt="TIX circular illustration" 
          className="w-full max-w-lg md:max-w-4xl mx-auto my-8"
        />
        
        <div className="gradient-text-body max-w-3xl mx-auto space-y-6 max-w-xl">
          <p>
            TIX introduces a new financing layer: <strong className="font-semibold">on-chain, transparent, venue-friendly capital</strong> powered by programmable tickets. Instead of borrowing from the ticketing platform, venues raise liquidity directly from the value of their own ticket inventory.
          </p>
          <p><span className="font-medium">The result:</span><br/>
            Venues keep control.<br />
            Artists recover revenue and data.<br />
            Fans stop paying the price for a broken financial model.
          </p>
        </div>
        
      </div>
     
    <div className="section-container">
      <div className="mb-6 text-center">
        <h2 className="serif text-5xl md:text-6xl gradient-text-hero mb-0">For venues, artists, and fans.</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { title: "Liquidity & Yield", desc: "Access upfront capital from onchain liquidity pools.", img: "liquidity_b.png" },
          { title: "Programmable", desc: "Programmable pricing, automated revenue distribution, and enforceable resale on your terms.", img: "programmable_b.png" },
          { title: "Fraud-Proof", desc: "On-chain settlement and cross market validation that limits chargebacks and fraudulent listings.", img: "fraud-proof_a.png" }
        ].map((item, i) => (
          <div key={i} className="group cursor-default">
            <div className="aspect-[4/3] w-full rounded-xl overflow-hidden border border-white/30 bg-transparent mb-6 relative flex items-center justify-center">
              <img src={`${import.meta.env.BASE_URL}${item.img}`} alt={item.title} className="h-full w-auto object-contain opacity-100 group-hover:opacity-80 group-hover:scale-105 transition-all duration-700" />
            </div>
            <h3 className="serif font-thin text-4xl text-white mb-2 group-hover:text-blue-200 transition-colors">{item.title}</h3>
            <p className="text-white/70 text-md">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
)

