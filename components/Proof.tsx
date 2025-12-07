import React from 'react'

export const Proof = () => (
  <section className="py-24 bg-zinc-950 border-t border-white/10">
    <div className="section-container flex flex-col md:flex-row items-center justify-between gap-12">
      <div className="md:w-1/2">
        <p className="subhead mb-4">ALREADY WORKING</p>
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
)

