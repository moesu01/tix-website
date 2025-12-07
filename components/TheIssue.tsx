import React from 'react'
import { motion } from 'framer-motion'

export const TheIssue = () => (
  <section className="py-24 bg-zinc-950 relative overflow-hidden">
    <div className="section-container relative z-10">
      <div className="mb-20 text-center">
        <p className="subhead mb-4">THE HIDDEN UNLOCK</p>
        <h2 className="text-5xl md:text-7xl serif text-white/90">
          Ticketing companies are banks.
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Left Text */}
        <div className="md:col-span-6 flex flex-col pr-8">
           <div>
             <p className="subhead mb-6">The Real Issue</p>
             <h2 className="serif text-6xl gradient-text-hero">Artists don't choose their ticketing, venues do.</h2>
           </div>
           <div className="text-zinc-400 space-y-4 text-sm leading-relaxed mt-auto">
             <p>For years venues have sacrificed their data, resale by giving up their ticketing rights for multiple years to get liquidity to pay artist deposits from the only bank available. Ticketmaster.</p>
             <p>This has left venues without their data, stuck to a ticket standard that has resulted in rampant fraud and ridiculous fees that are actually interest rates.</p>
             <p>Artists lose, fans lose and venues lose.</p>
           </div>
         </div>

        {/* Right Stats Grid */}
        <div className="md:col-span-6 grid grid-cols-1 gap-4">
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
)

