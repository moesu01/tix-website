// Quality preset system for mobile optimization
export type QualityPreset = 'high' | 'balanced' | 'low'

export interface QualitySettings {
  iterations: number
  fbmIterations: number
  dpr: number
  shadowCount: number
}

export const QUALITY_PRESETS: Record<QualityPreset, QualitySettings> = {
  high: { iterations: 10, fbmIterations: 2, dpr: 2, shadowCount: 4 },
  balanced: { iterations: 8, fbmIterations: 2, dpr: 1.5, shadowCount: 2 },
  low: { iterations: 5, fbmIterations: 2, dpr: 1, shadowCount: 1 },
}

export interface ShaderControlProps {
  speed: number;
  glow: number;
  distortion: number;
  interaction: number; // 0 to 1, derived from mouse or scroll
  enableInteraction: boolean;
  iterations: number;
  interactionMin: number;
  interactionMax: number;
  brightness: number;  // Default: 1.0 (0.5-1.5 range recommended)
  contrast: number;    // Default: 1.0 (0.5-1.5 range recommended)
  saturation: number;  // Default: 1.0 (0.0-2.0 range recommended)
  fbmIterations: number; // FBM loop iterations (2-4, affects noise detail)
  dpr: number;           // Device pixel ratio cap for Canvas
  shadowCount: number;   // Number of drop shadows on logo (1-4)
}

export interface PartnerLogo {
  name: string;
  src?: string; // Placeholder url
}

export interface StatItem {
  label: string;
  value: string;
  subtext: string;
  gridClass?: string;
}

export interface FeatureItem {
  title: string;
  description: string;
  image: string;
}