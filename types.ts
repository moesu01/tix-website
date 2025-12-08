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