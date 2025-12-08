import React from 'react'
import { motion } from 'framer-motion'

export const TheIssue = () => (
  <section className="py-12 md:py-24 bg-zinc-950 relative overflow-hidden">
    <div className="section-container relative z-10">
{/* Hidden for now
      <div 
        className="md:mb-48 mb-24 text-center border border-white/10 rounded-4xl py-6 md:py-12 px-6 md:px-12"
      >
        <p className="subhead mb-4">THE HIDDEN UNLOCK</p>
        <h2 className="text-4xl md:text-7xl serif font-thin gradient-text-hero">
          Ticketing companies are banks.
        </h2>
      </div>
      */}

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Left Text */}
        <div className="md:col-span-7 flex flex-col md:pr-8">
           <div>
             <p className="subhead mb-6">The Real Issue</p>
             <h2 className="serif text-5xl md:text-7xl gradient-text-hero mb-6 md:mb-0">Ticketing companies <br className="hidden md:block" />are banks.</h2>
           </div>
           <div className="space-y-4 text-[16px] lg:text-[18px] font-light gradient-text-body leading-relaxed mt-auto md:max-w-md">
             <p>Legacy ticketing companies control the capital that artists and venues need.</p>
             <p>For decades, venues have relied on ticketing lenders to finance deposits, production costs, and advances, trading away control, fan data, and future revenue for upfront liquidity.</p>
             <p>TIX changes that by separating and upgrading the financing and settlement rails underneath ticketing, giving both sides more choice, transparency, and leverage.</p>
           </div>
         </div>

        {/* Right Stats Grid */}
        <div className="md:col-span-5 grid grid-cols-1 gap-4">
          {[
            { label: '1.3B+', sub: 'Tickets', desc: 'Annual volume handled by legacy systems.' },
            { label: '$30-50B', sub: 'Lost Revenue', desc: 'Lost to secondary markets & fraud annually.' },
            { label: '>20%', sub: 'Fees', desc: 'Avg. fees per ticket, functioning as hidden interest.' }
          ].map((stat, i) => (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              key={i}
              className="group relative overflow-hidden rounded-2xl gradient-border bg-white/3 p-8 hover:bg-white/5 transition-colors"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/0 rounded-bl-full -mr-8 -mt-8 blur-2xl group-hover:bg-blue-500/20 transition-colors duration-500" />
              <h3 className="serif font-thin text-4xl md:text-5xl text-white mb-2">{stat.label}</h3>
              <h4 className="serif font-thin text-4xl md:text-5xl text-white mb-2">{stat.sub}</h4>
              <p className="text-white/70 text-sm">{stat.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </section>
)

