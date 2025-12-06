import React from 'react';
import { motion } from 'framer-motion';

export const LogoGrid = () => (
  <div className="w-full py-16 border-t border-white/5 bg-gradient-to-b from-black to-zinc-950">
    <div className="max-w-7xl mx-auto px-6">
      <p className="text-center text-xs tracking-[0.2em] text-zinc-500 mb-8">BACKED BY THE BEST</p>
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
);

export const ProblemSection = () => (
  <section className="py-24 bg-zinc-950 relative overflow-hidden">
    <div className="max-w-7xl mx-auto px-6 relative z-10">
      <div className="mb-20 text-center">
        <p className="text-xs tracking-[0.2em] text-zinc-400 mb-4">THE HIDDEN UNLOCK</p>
        <h2 className="text-5xl md:text-7xl serif text-white/90">
          Ticketing companies are banks.
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Left Text */}
        <div className="md:col-span-5 flex flex-col justify-center pr-8 space-y-6">
           <h3 className="text-xs tracking-[0.2em] text-zinc-400 uppercase">The Real Issue</h3>
           <h4 className="serif text-4xl text-white">Artists don't choose their ticketing, venues do.</h4>
           <div className="text-zinc-400 space-y-4 text-sm leading-relaxed">
             <p>For years venues have sacrificed their data, resale by giving up their ticketing rights for multiple years to get liquidity to pay artist deposits from the only bank available. Ticketmaster.</p>
             <p>This has left venues without their data, stuck to a ticket standard that has resulted in rampant fraud and ridiculous fees that are actually interest rates.</p>
             <p>Artists lose, fans lose and venues lose.</p>
           </div>
        </div>

        {/* Right Stats Grid */}
        <div className="md:col-span-7 grid grid-cols-1 gap-4">
          {[
            { label: '1.3B+', sub: 'Tickets', desc: 'Global annual ticket volume handled by legacy systems.' },
            { label: '$30-50B', sub: 'Lost', desc: 'Revenue lost to secondary markets and fraud annually.' },
            { label: '>20%', sub: 'Fees', desc: 'Average fees charged per ticket, functioning as hidden interest.' }
          ].map((stat, i) => (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              key={i}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-8 hover:bg-white/10 transition-colors"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-bl-full -mr-8 -mt-8 blur-2xl group-hover:bg-blue-500/20 transition-colors duration-500" />
              <h3 className="serif text-5xl md:text-6xl text-white mb-2">{stat.label}</h3>
              <h4 className="serif text-3xl text-white/60 mb-2">{stat.sub}</h4>
              <p className="text-zinc-500 text-sm">{stat.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export const SolutionSection = () => (
  <section className="py-24 bg-black relative">
    <div className="max-w-7xl mx-auto px-6">
      <div className="mb-16">
        <div className="w-16 h-16 mb-6">
          {/* Logo Mark Placeholder */}
          <svg viewBox="0 0 100 100" className="w-full h-full fill-white">
            <path d="M50 0 L60 40 L100 50 L60 60 L50 100 L40 60 L0 50 L40 40 Z" />
          </svg>
        </div>
        <p className="text-xs tracking-[0.2em] text-zinc-400 mb-2">WHAT IS TIX</p>
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
);

export const TrustedSection = () => (
  <section className="py-24 bg-zinc-950 border-t border-white/10">
    <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-12">
      <div className="md:w-1/2">
        <p className="text-xs tracking-[0.2em] text-zinc-400 mb-4">ALREADY WORKING</p>
        <h2 className="serif text-5xl md:text-6xl text-white mb-8">
          Trusted by the world's biggest artists & venues.
        </h2>
        <p className="text-zinc-400 text-lg leading-relaxed mb-8">
          Over 1,000+ global artists already use programmable ticketing standards that TIX enables, bringing fans closer and value back to creators.
        </p>
        <button className="px-8 py-3 bg-white/10 border border-white/20 hover:bg-white text-white hover:text-black transition-all rounded-lg font-medium text-sm">
          Join Waitlist
        </button>
      </div>
      <div className="md:w-1/2 relative h-[500px] w-full">
         {/* Circular Collage simulation */}
         <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full overflow-hidden border-4 border-zinc-900 z-20">
             <img src="https://picsum.photos/400/400?random=1" className="w-full h-full object-cover" />
         </div>
         <div className="absolute top-20 left-10 w-40 h-40 rounded-full overflow-hidden border-4 border-zinc-900 z-10 opacity-60">
             <img src="https://picsum.photos/400/400?random=2" className="w-full h-full object-cover" />
         </div>
         <div className="absolute bottom-20 right-10 w-48 h-48 rounded-full overflow-hidden border-4 border-zinc-900 z-10 opacity-60">
             <img src="https://picsum.photos/400/400?random=3" className="w-full h-full object-cover" />
         </div>
      </div>
    </div>
  </section>
);
