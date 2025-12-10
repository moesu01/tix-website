import React, { useState } from 'react';
import { LuSettings2, LuX } from 'react-icons/lu';
import { QualityPreset, QUALITY_PRESETS } from '../types';

interface FloatingControlsProps {
  speed: number;
  setSpeed: (v: number) => void;
  glow: number;
  setGlow: (v: number) => void;
  distortion: number;
  setDistortion: (v: number) => void;
  enableInteraction: boolean;
  setEnableInteraction: (v: boolean) => void;
  iterations: number;
  setIterations: (v: number) => void;
  fbmIterations: number;
  setFbmIterations: (v: number) => void;
  interactionMin: number;
  setInteractionMin: (v: number) => void;
  interactionMax: number;
  setInteractionMax: (v: number) => void;
  brightness: number;
  setBrightness: (v: number) => void;
  contrast: number;
  setContrast: (v: number) => void;
  saturation: number;
  setSaturation: (v: number) => void;
  qualityPreset: QualityPreset;
  setQualityPreset: (v: QualityPreset) => void;
}

export const FloatingControls: React.FC<FloatingControlsProps> = ({
  speed,
  setSpeed,
  glow,
  setGlow,
  distortion,
  setDistortion,
  enableInteraction,
  setEnableInteraction,
  iterations,
  setIterations,
  fbmIterations,
  setFbmIterations,
  interactionMin,
  setInteractionMin,
  interactionMax,
  setInteractionMax,
  brightness,
  setBrightness,
  contrast,
  setContrast,
  saturation,
  setSaturation,
  qualityPreset,
  setQualityPreset,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 bg-white/10 backdrop-blur-md border border-white/20 p-3 rounded-full text-white hover:bg-white/20 transition-all shadow-lg"
      >
        <LuSettings2 size={24} />
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 w-80 bg-black/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl text-white max-h-[80vh] overflow-y-auto custom-scrollbar">
      <div className="flex justify-between items-center mb-6 sticky top-0 bg-black/0 backdrop-blur-sm z-10">
        <h3 className="text-sm font-semibold tracking-wider text-white/90 flex items-center gap-2">
          <LuSettings2 size={16} />
          SHADER CONFIG
        </h3>
        <button
          onClick={() => setIsOpen(false)}
          className="text-white/50 hover:text-white transition-colors"
        >
          <LuX size={18} />
        </button>
      </div>

      <div className="space-y-6">
        {/* Quality Preset Selector */}
        <div className="space-y-3 border-b border-white/10 pb-4">
          <p className="text-[10px] uppercase tracking-widest text-white/40">Quality Preset (Mobile Optimization)</p>
          <div className="flex gap-2">
            {(['high', 'balanced', 'low'] as QualityPreset[]).map((preset) => (
              <button
                key={preset}
                onClick={() => setQualityPreset(preset)}
                className={`flex-1 px-3 py-2 text-xs uppercase tracking-wider rounded-lg transition-all ${
                  qualityPreset === preset
                    ? 'bg-blue-600 text-white'
                    : 'bg-white/10 text-white/60 hover:bg-white/20'
                }`}
              >
                {preset}
              </button>
            ))}
          </div>
          <div className="text-[10px] text-white/40 space-y-1">
            <p>DPR: {QUALITY_PRESETS[qualityPreset].dpr} | Shadows: {QUALITY_PRESETS[qualityPreset].shadowCount}</p>
            <p>Iterations: {QUALITY_PRESETS[qualityPreset].iterations} | FBM: {QUALITY_PRESETS[qualityPreset].fbmIterations}</p>
          </div>
        </div>

        {/* Core Settings */}
        <div className="space-y-4 border-b border-white/10 pb-4">
          <div className="space-y-2">
            <div className="flex justify-between text-xs uppercase tracking-wider text-white/60">
              <label>Speed</label>
              <span>{speed.toFixed(2)}</span>
            </div>
            <input
              type="range"
              min="0.1"
              max="3.0"
              step="0.1"
              value={speed}
              onChange={(e) => setSpeed(parseFloat(e.target.value))}
              className="w-full h-1 bg-white/20 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:rounded-full"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-xs uppercase tracking-wider text-white/60">
              <label>Glow</label>
              <span>{glow.toFixed(2)}</span>
            </div>
            <input
              type="range"
              min="0.5"
              max="5.0"
              step="0.1"
              value={glow}
              onChange={(e) => setGlow(parseFloat(e.target.value))}
              className="w-full h-1 bg-white/20 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:rounded-full"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-xs uppercase tracking-wider text-white/60">
              <label>Base Distortion</label>
              <span>{distortion.toFixed(2)}</span>
            </div>
            <input
              type="range"
              min="0.0"
              max="2.0"
              step="0.1"
              value={distortion}
              onChange={(e) => setDistortion(parseFloat(e.target.value))}
              className="w-full h-1 bg-white/20 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:rounded-full"
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-xs uppercase tracking-wider text-white/60">
              <label>Ray Iterations</label>
              <span>{iterations}</span>
            </div>
            <input
              type="range"
              min="1"
              max="20"
              step="1"
              value={iterations}
              onChange={(e) => setIterations(parseInt(e.target.value))}
              className="w-full h-1 bg-white/20 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-blue-400 [&::-webkit-slider-thumb]:rounded-full"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-xs uppercase tracking-wider text-white/60">
              <label>FBM Iterations</label>
              <span>{fbmIterations}</span>
            </div>
            <input
              type="range"
              min="1"
              max="4"
              step="1"
              value={fbmIterations}
              onChange={(e) => setFbmIterations(parseInt(e.target.value))}
              className="w-full h-1 bg-white/20 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-green-400 [&::-webkit-slider-thumb]:rounded-full"
            />
          </div>
        </div>

        {/* Color Adjustments */}
        <div className="space-y-4 border-b border-white/10 pb-4">
          <p className="text-[10px] uppercase tracking-widest text-white/40 mb-2">Color Adjustments</p>
          
          <div className="space-y-2">
            <div className="flex justify-between text-xs uppercase tracking-wider text-white/60">
              <label>Brightness</label>
              <span>{brightness.toFixed(2)}</span>
            </div>
            <input
              type="range"
              min="0.5"
              max="1.5"
              step="0.05"
              value={brightness}
              onChange={(e) => setBrightness(parseFloat(e.target.value))}
              className="w-full h-1 bg-white/20 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-yellow-400 [&::-webkit-slider-thumb]:rounded-full"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-xs uppercase tracking-wider text-white/60">
              <label>Contrast</label>
              <span>{contrast.toFixed(2)}</span>
            </div>
            <input
              type="range"
              min="0.5"
              max="1.5"
              step="0.05"
              value={contrast}
              onChange={(e) => setContrast(parseFloat(e.target.value))}
              className="w-full h-1 bg-white/20 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-orange-400 [&::-webkit-slider-thumb]:rounded-full"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-xs uppercase tracking-wider text-white/60">
              <label>Saturation</label>
              <span>{saturation.toFixed(2)}</span>
            </div>
            <input
              type="range"
              min="0.0"
              max="2.0"
              step="0.05"
              value={saturation}
              onChange={(e) => setSaturation(parseFloat(e.target.value))}
              className="w-full h-1 bg-white/20 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-pink-400 [&::-webkit-slider-thumb]:rounded-full"
            />
          </div>
        </div>

        {/* Interaction Settings */}
        <div className="space-y-4">
           <div className="flex items-center justify-between">
             <label className="text-xs uppercase tracking-wider text-white/60">Mouse Interaction</label>
             <button 
               onClick={() => setEnableInteraction(!enableInteraction)}
               className={`w-10 h-5 rounded-full relative transition-colors ${enableInteraction ? 'bg-blue-600' : 'bg-white/20'}`}
             >
               <div className={`absolute top-1 left-1 w-3 h-3 bg-white rounded-full transition-transform ${enableInteraction ? 'translate-x-5' : 'translate-x-0'}`} />
             </button>
          </div>

          {enableInteraction && (
            <div className="space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
               <div className="space-y-2">
                <div className="flex justify-between text-xs uppercase tracking-wider text-white/60">
                  <label>Interaction Min</label>
                  <span>{interactionMin.toFixed(1)}</span>
                </div>
                <input
                  type="range"
                  min="0.0"
                  max="5.0"
                  step="0.1"
                  value={interactionMin}
                  onChange={(e) => setInteractionMin(parseFloat(e.target.value))}
                  className="w-full h-1 bg-white/20 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-blue-400 [&::-webkit-slider-thumb]:rounded-full"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs uppercase tracking-wider text-white/60">
                  <label>Interaction Max</label>
                  <span>{interactionMax.toFixed(1)}</span>
                </div>
                <input
                  type="range"
                  min="0.0"
                  max="5.0"
                  step="0.1"
                  value={interactionMax}
                  onChange={(e) => setInteractionMax(parseFloat(e.target.value))}
                  className="w-full h-1 bg-white/20 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-blue-400 [&::-webkit-slider-thumb]:rounded-full"
                />
              </div>
            </div>
          )}
        </div>
      </div>
      
      <div className="mt-6 pt-4 border-t border-white/10 text-[10px] text-white/40 leading-relaxed">
        {enableInteraction 
          ? "Move mouse horizontally to warp energy between Min and Max values."
          : "Interaction disabled."}
      </div>
    </div>
  );
};