import React, { useState, useEffect } from 'react';
import { HeroShader } from './components/HeroShader';
import { FloatingControls } from './components/FloatingControls';
import { LogoGrid, ProblemSection, SolutionSection, TrustedSection } from './components/Features';
import { Menu } from 'lucide-react';

const App: React.FC = () => {
  // Shader Control States
  const [speed, setSpeed] = useState(0.20);
  const [glow, setGlow] = useState(1.50);
  const [distortion, setDistortion] = useState(0.0);
  const [interaction, setInteraction] = useState(0.0);
  const [enableInteraction, setEnableInteraction] = useState(true);
  
  // New States
  const [iterations, setIterations] = useState(12);
  const [interactionMin, setInteractionMin] = useState(0.0);
  const [interactionMax, setInteractionMax] = useState(4.2);

  // Interaction Logic (Mouse & Scroll)
  useEffect(() => {
    if (!enableInteraction) {
      setInteraction(0);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      // Only use mouse interaction on larger screens
      if (window.innerWidth >= 768) {
        // Normalize X to 0..1
        const x = e.clientX / window.innerWidth;
        setInteraction(x);
      }
    };

    const handleScroll = () => {
      // Use scroll interaction on mobile
      if (window.innerWidth < 768) {
        const scrollMax = document.documentElement.scrollHeight - window.innerHeight;
        const scrollNorm = Math.min(window.scrollY / (window.innerHeight * 1.5), 1); // Cap effect at 1.5 screens
        setInteraction(scrollNorm);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [enableInteraction]);

  return (
    <main className="relative min-h-screen bg-black text-white overflow-x-hidden selection:bg-white/20">
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 px-6 py-6 flex justify-between items-center mix-blend-difference">
        <div className="flex items-center gap-2">
           <div className="w-8 h-8 border border-white flex items-center justify-center">
             <div className="w-4 h-4 bg-white transform rotate-45"></div>
           </div>
           <span className="text-2xl font-bold tracking-widest">TIX</span>
        </div>
        <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
          <Menu className="w-6 h-6 text-white" />
        </button>
      </nav>

      {/* Hero Section */}
      <section className="relative w-full min-h-screen flex flex-col md:flex-row bg-black">
        
        {/* Left Column: Content */}
        {/* Transparent background (inherited from section) */}
        <div className="w-full md:w-1/2 flex flex-col justify-center px-6 md:px-12 lg:px-20 py-24 md:py-0 order-2 md:order-1 relative z-20 shrink-0">
            <div className="max-w-xl text-center md:text-left space-y-8 mx-auto md:mx-0">
              <h1 className="serif text-6xl md:text-8xl leading-[0.9] text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-white/50 drop-shadow-2xl">
                The standard <br /> for tickets
              </h1>
              <p className="text-lg text-blue-100/70 font-light leading-relaxed max-w-md mx-auto md:mx-0">
                Live event ticketing, modernized through onchain infrastructure.
                Experience true ownership, liquidity, and yield.
              </p>
              <div className="flex flex-col md:flex-row gap-4 items-center justify-center md:justify-start">
                <button className="px-8 py-3 bg-white text-black font-semibold rounded hover:bg-zinc-200 transition-all shadow-[0_0_20px_rgba(255,255,255,0.3)]">
                  Join Waitlist
                </button>
                <div className="text-xs text-white/40 uppercase tracking-widest border-t border-white/20 pt-4 md:pt-0 md:border-t-0 md:border-l md:pl-4 mt-4 md:mt-0 text-left">
                  Built for builders from:<br/>
                  <span className="text-white/80">Live Nation, Ticketmaster, Vividseats</span>
                </div>
              </div>
            </div>
        </div>

        {/* Right Column: Shader */}
        {/* Removed bg-black to allow transparency if needed, though parent is black. */}
        <div className="w-full md:w-1/2 h-[50vh] md:h-auto order-1 md:order-2 relative overflow-hidden md:shrink-0">
          <HeroShader 
            speed={speed} 
            glow={glow} 
            distortion={distortion} 
            interaction={interaction}
            enableInteraction={enableInteraction}
            iterations={iterations}
            interactionMin={interactionMin}
            interactionMax={interactionMax}
            className="w-full h-full absolute inset-0"
          />
          {/* Mobile gradient overlay for seamless blend */}
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent to-black md:hidden" />
          
          {/* Desktop gradient overlay - Fade left edge to black to blend with text section */}
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-black to-transparent pointer-events-none hidden md:block" />
          {/* Desktop gradient overlay - Fade top/bottom slightly to match section edges */}
          <div className="absolute top-0 inset-x-0 h-24 bg-gradient-to-b from-black to-transparent pointer-events-none hidden md:block" />
          <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-black to-transparent pointer-events-none hidden md:block" />
        </div>

      </section>

      {/* Content Sections */}
      <div className="relative z-20 bg-black">
        <LogoGrid />
        <ProblemSection />
        <SolutionSection />
        <TrustedSection />
        
        <footer className="py-8 border-t border-white/10 text-center text-zinc-600 text-xs">
           © 2024 TIX Protocol. All rights reserved.
        </footer>
      </div>

      {/* Floating Controls */}
      <FloatingControls 
        speed={speed} setSpeed={setSpeed}
        glow={glow} setGlow={setGlow}
        distortion={distortion} setDistortion={setDistortion}
        enableInteraction={enableInteraction}
        setEnableInteraction={setEnableInteraction}
        iterations={iterations} setIterations={setIterations}
        interactionMin={interactionMin} setInteractionMin={setInteractionMin}
        interactionMax={interactionMax} setInteractionMax={setInteractionMax}
      />

    </main>
  );
};

export default App;