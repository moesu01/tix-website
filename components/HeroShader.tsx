import React, { useRef } from 'react';
import { Canvas, useFrame, extend, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { ShaderMaterial } from 'three';
import { ShaderControlProps } from '../types';

// Shader code adapted with full-screen vertex mapping and safe UV scaling
const fragmentShader = `
precision mediump float;
uniform float uTime;
uniform vec2 uResolution;
uniform float uSpeed;
uniform float uGlow;
uniform float uDistortion; // Base distortion
uniform float uInteraction; // 0.0 to 1.0 from mouse/scroll
uniform float uIterations; // Dynamic iteration count
uniform float uFbmIterations; // FBM loop iterations (2-4)
uniform float uInteractionMin; 
uniform float uInteractionMax;
uniform float uBrightness;
uniform float uContrast;
uniform float uSaturation;

varying vec2 vUv;

#define PI 3.141596
#define MAX_ITERATIONS 30.0
#define MAX_FBM_ITERATIONS 4.0

mat2 rotate(float a){
  float s = sin(a);
  float c = cos(a);
  return mat2(c,-s,s,c);
}

// FBM with configurable iterations for mobile optimization
float fbm(vec3 p, float maxIter){
  float n = 0.;
  for(float i = 0.; i < MAX_FBM_ITERATIONS; i++){
    if (i >= maxIter) break;
    n += abs(dot(cos(p), vec3(.1)));
    p *= 2.0; // frequency doubling baked in
  }
  return n;
}

float sdSphere(vec3 p, float r){
    return length(p)-r;
}

// Reinhard tone mapping - cheaper than tanh for mobile
vec3 reinhardTonemap(vec3 col) {
  return col / (1.0 + col);
}

// Color adjustment: brightness, contrast, saturation
vec3 adjustColor(vec3 color, float brightness, float contrast, float saturation) {
  // Brightness - simple multiply
  color *= brightness;
  
  // Contrast - pivot around mid-gray
  color = (color - 0.5) * contrast + 0.5;
  
  // Saturation - lerp toward luminance
  float luminance = dot(color, vec3(0.2126, 0.7152, 0.0722));
  color = mix(vec3(luminance), color, saturation);
  
  return clamp(color, 0.0, 1.0);
}

void main() {
  // Normalize UVs to -1.0 to 1.0
  vec2 uv = vUv * 2.0 - 1.0;
  
  // Aspect Ratio Correction
  float aspect = uResolution.x / uResolution.y;
  if (aspect > 1.0) {
    uv.x *= aspect; // Landscape: widen X space
  } else {
    uv.y *= 1.0 / aspect; // Portrait: tall Y space
  }
  
  vec3 ro = vec3(0., 0., -7.);
  vec3 rd = normalize(vec3(uv, 1.));

  float zMax = 50.;
  float z = .1;

  vec3 col = vec3(0);
  
  // Dynamic time based on speed uniform
  float time = uTime * uSpeed;

  // Interaction Logic
  // Map the 0-1 mouse input to the range [uInteractionMin, uInteractionMax]
  float mouseFactor = mix(uInteractionMin, uInteractionMax, uInteraction);
  float totalDistortion = uDistortion + mouseFactor;

  for(float i=0.; i<MAX_ITERATIONS; i++){
    // Break early based on user quality setting
    if (i >= uIterations) break;

    vec3 p = ro + rd * z;

    p.xz = rotate(time + i * 2.3) * p.xz;
    p.yz = rotate(time + i * 2.3) * p.yz;

    float d = abs(sdSphere(p, 4.) * .9) + .01;

    // Incorporate distortion and interaction into the noise
    d += fbm(p * (1.8 + totalDistortion), uFbmIterations) * 0.2;

    // Color accumulation with Glow control
    vec3 glowColor = (1.1 + sin(vec3(3., 2., 1.) + dot(p, vec3(1.)) + time));
    col += glowColor / d * (0.2 * uGlow); 
    
    if(d < 0.001 || z > zMax) break;
    z += d;
  }

  // Tone mapping - Reinhard (cheaper than tanh, single vectorized call)
  col = reinhardTonemap(col / 20.0);
  
  // Apply brightness, contrast, saturation adjustments
  col = adjustColor(col, uBrightness, uContrast, uSaturation);
  
  // Vignette
  float dist = length(vUv * 2.0 - 1.0);
  float vignette = 1.0 - smoothstep(0.5, 1.5, dist);
  col *= vignette;

  // Calculate alpha based on brightness so background shows through dark areas
  float brightness = (col.r + col.g + col.b) / 3.0;
  float alpha = smoothstep(0.0, 0.15, brightness);

  gl_FragColor = vec4(col, alpha);
}
`;

const vertexShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position.xy * 2.0, 0.0, 1.0);
}
`;

// Create a custom shader material
class TixShaderMaterial extends ShaderMaterial {
  constructor() {
    super({
      vertexShader,
      fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uResolution: { value: new THREE.Vector2(1, 1) },
        uSpeed: { value: 1.0 },
        uGlow: { value: 1.0 },
        uDistortion: { value: 0.0 },
        uInteraction: { value: 0.0 },
        uIterations: { value: 10.0 },
        uFbmIterations: { value: 4.0 },
        uInteractionMin: { value: 0.0 },
        uInteractionMax: { value: 3.0 },
        uBrightness: { value: 1.0 },
        uContrast: { value: 1.0 },
        uSaturation: { value: 1.0 },
      },
    });
  }
}

extend({ TixShaderMaterial });

const ScreenQuad: React.FC<ShaderControlProps> = ({ 
  speed, 
  glow, 
  distortion, 
  interaction, 
  iterations, 
  fbmIterations,
  interactionMin, 
  interactionMax,
  brightness,
  contrast,
  saturation,
}) => {
  const materialRef = useRef<TixShaderMaterial>(null);
  const { size } = useThree();
  const lastSize = useRef({ width: 0, height: 0 });
  
  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
      
      // Only update resolution when it actually changes (optimization)
      if (lastSize.current.width !== size.width || lastSize.current.height !== size.height) {
        materialRef.current.uniforms.uResolution.value.set(size.width, size.height);
        lastSize.current = { width: size.width, height: size.height };
      }
      
      // Lerp values for smoothness
      materialRef.current.uniforms.uSpeed.value = THREE.MathUtils.lerp(materialRef.current.uniforms.uSpeed.value, speed, 0.1);
      materialRef.current.uniforms.uGlow.value = THREE.MathUtils.lerp(materialRef.current.uniforms.uGlow.value, glow, 0.1);
      materialRef.current.uniforms.uDistortion.value = THREE.MathUtils.lerp(materialRef.current.uniforms.uDistortion.value, distortion, 0.1);
      materialRef.current.uniforms.uInteraction.value = THREE.MathUtils.lerp(materialRef.current.uniforms.uInteraction.value, interaction, 0.1);
      
      // These can be set directly or lerped. Direct is usually fine for sliders.
      materialRef.current.uniforms.uIterations.value = iterations;
      materialRef.current.uniforms.uFbmIterations.value = fbmIterations;
      materialRef.current.uniforms.uInteractionMin.value = interactionMin;
      materialRef.current.uniforms.uInteractionMax.value = interactionMax;
      
      // Color adjustments - lerped for smooth transitions
      materialRef.current.uniforms.uBrightness.value = THREE.MathUtils.lerp(materialRef.current.uniforms.uBrightness.value, brightness, 0.1);
      materialRef.current.uniforms.uContrast.value = THREE.MathUtils.lerp(materialRef.current.uniforms.uContrast.value, contrast, 0.1);
      materialRef.current.uniforms.uSaturation.value = THREE.MathUtils.lerp(materialRef.current.uniforms.uSaturation.value, saturation, 0.1);
    }
  });

  return (
    <mesh>
      <planeGeometry args={[1, 1]} />
      {/* @ts-ignore */}
      <tixShaderMaterial ref={materialRef} />
    </mesh>
  );
};

// Shadow presets ordered by importance - more shadows = higher quality
const SHADOW_PRESETS = [
  'drop-shadow(0 0 12px #B6D4FF)',                    // Core glow (always)
  'drop-shadow(0 0 30px #B6D4FF)',                    // Medium spread
  'drop-shadow(0 0 8px rgba(255, 255, 255, 0.8))',    // White highlight
  'drop-shadow(0 0 50px rgba(255, 255, 255, 0.6))',   // Large soft glow
]

// Glow filter style - configurable shadow count for mobile optimization
const getGlowFilterStyle = (shadowCount: number): React.CSSProperties => ({
  filter: SHADOW_PRESETS.slice(0, Math.min(shadowCount, SHADOW_PRESETS.length)).join(' '),
})

const getSvgContainerStyle = (): React.CSSProperties => ({
  background: `
    radial-gradient(
      80% 380% at 10% 32%,
      rgba(132, 59, 100, 0.2) 0%,
      rgba(83, 116, 210, 0.2) 24%,
      rgba(102, 179, 210, 0.2) 43%,
      rgba(219, 190, 133, 0.2) 61%,
      rgba(149, 186, 188, 0.2) 81%,
      rgba(162, 228, 255, 0.2) 100%
    ),
    #FFFFFF
  `,
  WebkitMaskImage: `url(${import.meta.env.BASE_URL}tix.svg)`,
  WebkitMaskRepeat: 'no-repeat',
  WebkitMaskPosition: 'center',
  WebkitMaskSize: 'contain',
  maskImage: `url(${import.meta.env.BASE_URL}tix.svg)`,
  maskRepeat: 'no-repeat',
  maskPosition: 'center',
  maskSize: 'contain',
})

export const HeroShader: React.FC<ShaderControlProps & { className?: string }> = ({ 
  className, 
  dpr,
  shadowCount,
  ...props 
}) => {
  return (
    <div className={`${className || 'w-full h-full'} relative`}>
      <Canvas
        dpr={[1, dpr]}
        gl={{ 
          antialias: false, 
          alpha: true,
          powerPreference: "high-performance"
        }}
      >
        <ScreenQuad {...props} dpr={dpr} shadowCount={shadowCount} />
      </Canvas>

      {/* Logo overlay - centered absolutely */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {/* Glow wrapper - applies drop-shadow filter that follows the SVG shape */}
        {/* SVG ratio is 161:175 (w:h), 120px on mobile, 180px on desktop */}
        <div 
          className="h-[120px] w-[110px] md:h-[180px] md:w-[165px]"
          style={getGlowFilterStyle(shadowCount)}
        >
          {/* SVG container - applies background gradient as fill via mask */}
          <div 
            className="w-full h-full"
            style={getSvgContainerStyle()}
            aria-label="TIX Logo"
            role="img"
          />
        </div>
      </div>
    </div>
  );
};