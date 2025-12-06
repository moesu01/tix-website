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
uniform float uInteractionMin; 
uniform float uInteractionMax;

varying vec2 vUv;

#define PI 3.141596
#define MAX_ITERATIONS 30.0

mat2 rotate(float a){
  float s = sin(a);
  float c = cos(a);
  return mat2(c,-s,s,c);
}

float fbm(vec3 p){
  float amp = 1.;
  float fre = 1.;
  float n = 0.;
  for(float i =0.;i<4.;i++){
    n += abs(dot(cos(p), vec3(.1)));
    amp *= .5;
    fre *= 2.;
  }
  return n;
}

float sdSphere(vec3 p, float r){
    return length(p)-r;
}

// Hyperbolic tangent polyfill
float tanh_approx(float x) {
  float e2x = exp(2.0 * clamp(x, -5.0, 5.0));
  return (e2x - 1.0) / (e2x + 1.0);
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
    d += fbm(p * (1.8 + totalDistortion)) * 0.2;

    // Color accumulation with Glow control
    vec3 glowColor = (1.1 + sin(vec3(3., 2., 1.) + dot(p, vec3(1.)) + time));
    col += glowColor / d * (0.2 * uGlow); 
    
    if(d < 0.001 || z > zMax) break;
    z += d;
  }

  // Tone mapping
  col = vec3(
    tanh_approx(col.r / 20.0), 
    tanh_approx(col.g / 20.0), 
    tanh_approx(col.b / 20.0)
  );
  
  // Vignette
  float dist = length(vUv * 2.0 - 1.0);
  float vignette = 1.0 - smoothstep(0.5, 1.5, dist);
  col *= vignette;

  gl_FragColor = vec4(col, 1.0);
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
        uInteractionMin: { value: 0.0 },
        uInteractionMax: { value: 3.0 },
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
  interactionMin, 
  interactionMax 
}) => {
  const materialRef = useRef<TixShaderMaterial>(null);
  
  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
      materialRef.current.uniforms.uResolution.value.set(state.size.width, state.size.height);
      
      // Lerp values for smoothness
      materialRef.current.uniforms.uSpeed.value = THREE.MathUtils.lerp(materialRef.current.uniforms.uSpeed.value, speed, 0.1);
      materialRef.current.uniforms.uGlow.value = THREE.MathUtils.lerp(materialRef.current.uniforms.uGlow.value, glow, 0.1);
      materialRef.current.uniforms.uDistortion.value = THREE.MathUtils.lerp(materialRef.current.uniforms.uDistortion.value, distortion, 0.1);
      materialRef.current.uniforms.uInteraction.value = THREE.MathUtils.lerp(materialRef.current.uniforms.uInteraction.value, interaction, 0.1);
      
      // These can be set directly or lerped. Direct is usually fine for sliders.
      materialRef.current.uniforms.uIterations.value = iterations;
      materialRef.current.uniforms.uInteractionMin.value = interactionMin;
      materialRef.current.uniforms.uInteractionMax.value = interactionMax;
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

export const HeroShader: React.FC<ShaderControlProps & { className?: string }> = ({ className, ...props }) => {
  return (
    <div className={className || 'w-full h-full'}>
      <Canvas
        dpr={[1, 2]}
        gl={{ 
          antialias: false, 
          alpha: true,
          powerPreference: "high-performance"
        }}
      >
        <ScreenQuad {...props} />
      </Canvas>
    </div>
  );
};