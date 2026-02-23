import React, { useRef, useMemo, useState, useEffect, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Float, Sparkles, Image as DreiImage } from '@react-three/drei';
import * as THREE from 'three';
import { useReducedMotion } from 'framer-motion';

// --- UTILS ---
const isMobile = () => typeof window !== 'undefined' && window.innerWidth < 768;

// Robust WebGL Check
const isWebGLAvailable = () => {
    if (typeof window === 'undefined') return false;
    try {
        const canvas = document.createElement('canvas');
        // Use stricter settings to fail on software renderers or blocked GPUs (like Radeon 3100)
        const opts = { 
            failIfMajorPerformanceCaveat: true,
            alpha: true,
            antialias: false 
        };
        
        // Try WebGL 2 first, then WebGL 1
        const ctx = canvas.getContext('webgl2', opts) || 
                    canvas.getContext('webgl', opts) || 
                    canvas.getContext('experimental-webgl', opts);
        
        if (!ctx) return false;
        
        // Clean up context
        const glCtx = ctx as WebGLRenderingContext;
        const loseContext = glCtx.getExtension('WEBGL_lose_context');
        if (loseContext) loseContext.loseContext();
        
        return true;
    } catch (e) {
        console.warn("WebGL Availability Check Failed:", e);
        return false;
    }
};

interface SceneErrorBoundaryProps {
  children?: React.ReactNode;
  fallback: React.ReactNode;
}

interface SceneErrorBoundaryState {
  hasError: boolean;
}

// --- ERROR BOUNDARY ---
class SceneErrorBoundary extends React.Component<SceneErrorBoundaryProps, SceneErrorBoundaryState> {
  state: SceneErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(error: any): SceneErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: any, errorInfo: any) {
    // Log error but allow fallback to render
    if (process.env.NODE_ENV === 'development') {
      console.warn("3D Scene Error (switching to fallback):", error);
    }
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }

    return this.props.children;
  }
}

// --- IMAGE ASSETS ---
const IMG_MEN_HAIR = "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?auto=format&fit=crop&q=80";
const IMG_SCISSORS = "https://images.unsplash.com/photo-1503951914875-452162b7f304?auto=format&fit=crop&q=80";
const IMG_WOMEN_HERO_1 = "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&q=80"; 
const IMG_WOMEN_HERO_2 = "https://images.unsplash.com/photo-1621786032758-290234a5d091?auto=format&fit=crop&q=80"; 


// --- FALLBACK VISUAL (HTML/CSS Version) ---
const StaticFallback = ({ type = 'neutral' }: { type?: 'mens' | 'womens' | 'neutral' }) => {
  const isMens = type === 'mens';
  
  return (
    <div className={`w-full h-full relative overflow-hidden bg-gradient-to-b from-gray-900 via-black to-black`}>
        {/* Background Ambient Glow */}
        <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-full h-full opacity-30 blur-[100px] ${isMens ? 'bg-yellow-900/20' : 'bg-pink-900/20'}`}></div>

        {/* Content Container */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {isMens ? (
            <div className="relative w-full h-full max-w-7xl mx-auto">
               <img 
                  src={IMG_MEN_HAIR} 
                  className="absolute left-0 md:left-[10%] top-[20%] w-[60vw] md:w-[25vw] opacity-40 grayscale mask-image-fade" 
                  alt="Men's Grooming"
                  style={{ maskImage: 'linear-gradient(to bottom, black, transparent)' }}
               />
               <img 
                  src={IMG_SCISSORS} 
                  className="absolute right-[5%] top-[10%] w-[30vw] md:w-[15vw] opacity-10 rotate-12" 
                  alt="Scissors"
               />
            </div>
          ) : type === 'womens' ? (
            <div className="relative w-full h-full max-w-7xl mx-auto">
               <img 
                  src={IMG_WOMEN_HERO_1} 
                  className="absolute left-[-10%] md:left-[5%] top-[10%] w-[80vw] md:w-[30vw] h-auto object-cover opacity-60 rounded-full blur-[1px]" 
                  alt="Bridal"
                  style={{ maskImage: 'radial-gradient(circle, black 40%, transparent 70%)' }}
               />
               <img 
                  src={IMG_WOMEN_HERO_2} 
                  className="absolute right-[-5%] md:right-[10%] bottom-[10%] md:bottom-[20%] w-[50vw] md:w-[20vw] h-auto object-cover opacity-60 rounded-xl" 
                  alt="Makeup"
                  style={{ maskImage: 'linear-gradient(to top, black, transparent)' }}
               />
            </div>
          ) : (
            <div className="w-full h-full bg-black"></div>
          )}
        </div>
    </div>
  );
};

// --- 3D COMPONENTS ---

const SalonImage = ({ url, position, scale, opacity = 1, color, grayscale = 0, ...props }: any) => {
    return (
      <group position={position} scale={scale} {...props}>
         <DreiImage 
            url={url} 
            transparent 
            opacity={opacity} 
            color={color}
            grayscale={grayscale}
            toneMapped={false}
         />
      </group>
    );
};

const MensVisuals = ({ count = 40 }) => {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const shouldReduceMotion = useReducedMotion();

  const { positions, rotations, scales } = useMemo(() => {
    const positions = [];
    const rotations = [];
    const scales = [];
    for (let i = 0; i < count; i++) {
      positions.push(
        (Math.random() - 0.5) * 10, 
        (Math.random() - 0.5) * 12, 
        (Math.random() - 0.5) * 5
      );
      rotations.push(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);
      scales.push(0.02, Math.random() * 1.5 + 0.5, 0.02); 
    }
    return { positions, rotations, scales };
  }, [count]);

  useFrame((state) => {
    if (!meshRef.current || shouldReduceMotion) return;
    const t = state.clock.getElapsedTime();
    const dummy = new THREE.Object3D();

    for (let i = 0; i < count; i++) {
      const yPos = positions[i * 3 + 1] - (t * 0.5 % 10) + 5;
      dummy.position.set(
        positions[i * 3],
        yPos > -6 ? yPos : yPos + 12, 
        positions[i * 3 + 2]
      );
      dummy.rotation.set(
        rotations[i * 3] + t * 0.2,
        rotations[i * 3 + 1] + t * 0.1,
        rotations[i * 3 + 2]
      );
      dummy.scale.set(scales[i * 3], scales[i * 3 + 1], scales[i * 3 + 2]);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial 
        color="#D4AF37" 
        roughness={0.1} 
        metalness={0.9} 
        envMapIntensity={2}
      />
    </instancedMesh>
  );
};

const WomensVisuals = ({ count = 30 }) => {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const shouldReduceMotion = useReducedMotion();

  const { positions, scales, rotations } = useMemo(() => {
    const positions = [];
    const scales = [];
    const rotations = [];
    for (let i = 0; i < count; i++) {
      positions.push(
        (Math.random() - 0.5) * 14, 
        (Math.random() - 0.5) * 14, 
        (Math.random() - 0.5) * 8
      );
      const s = Math.random() * 0.4 + 0.1;
      scales.push(s, s, s);
      rotations.push(Math.random() * Math.PI, Math.random() * Math.PI, 0);
    }
    return { positions, scales, rotations };
  }, [count]);

  useFrame((state) => {
    if (!meshRef.current || shouldReduceMotion) return;
    const t = state.clock.getElapsedTime();
    const dummy = new THREE.Object3D();

    for (let i = 0; i < count; i++) {
      const yPos = positions[i * 3 + 1] + Math.sin(t * 0.3 + positions[i*3]) * 1.5;
      const xPos = positions[i * 3] + Math.cos(t * 0.2 + positions[i*3+1]) * 0.5;
      
      dummy.position.set(xPos, yPos, positions[i * 3 + 2]);
      dummy.rotation.set(
          rotations[i * 3] + t * 0.2, 
          rotations[i * 3 + 1] + t * 0.1, 
          t * 0.05
      );
      dummy.scale.set(scales[i * 3], scales[i * 3], scales[i * 3]);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <group>
        <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
        <dodecahedronGeometry args={[0.8, 0]} />
        <meshPhysicalMaterial 
            color="#FBCFE8" // Light pink
            roughness={0.2} 
            metalness={0.1} 
            transmission={0.6}
            thickness={1}
            envMapIntensity={2}
            transparent
            opacity={0.6}
        />
        </instancedMesh>
        <Sparkles count={60} scale={15} size={6} speed={0.6} opacity={0.8} color="#FFD1DC" />
    </group>
  );
};

// --- SCENE CONTAINERS ---

export const LandingScene = () => {
  const [isSupported, setIsSupported] = useState(false);
  const [hasChecked, setHasChecked] = useState(false);
  
  useEffect(() => {
    const supported = isWebGLAvailable();
    setIsSupported(supported);
    setHasChecked(true);
  }, []);

  // Immediate fallback for unsupported devices or during check
  if (!hasChecked || !isSupported) return <StaticFallback type="neutral" />;

  const mobile = isMobile();
  const count = mobile ? 20 : 50;
  const mensGroupPos = mobile ? [0, 5, -2] : [-5, 0, 0];
  const womensGroupPos = mobile ? [0, -4, -2] : [5, 0, 0];

  return (
    <SceneErrorBoundary fallback={<StaticFallback type="neutral" />}>
      <Suspense fallback={<StaticFallback type="neutral" />}>
        <Canvas 
            camera={{ position: [0, 0, 10], fov: 45 }} 
            dpr={[1, mobile ? 1.5 : 2]} 
            gl={{ 
                antialias: false, // Disabled for compatibility
                alpha: true, 
                powerPreference: "high-performance",
                failIfMajorPerformanceCaveat: true,
                preserveDrawingBuffer: false,
                depth: true,
                stencil: false
            }}
            onCreated={({ gl }) => {
                gl.domElement.addEventListener('webglcontextlost', (event) => {
                    event.preventDefault();
                    setIsSupported(false);
                });
            }}
        >
            <color attach="background" args={['#050505']} />
            <fog attach="fog" args={['#050505', 8, 25]} />
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} />
            <Environment preset="city" />
            
            <group position={mensGroupPos as any}>
                <Float speed={1} rotationIntensity={0.05} floatIntensity={0.1}>
                    <SalonImage 
                        url={IMG_MEN_HAIR} 
                        position={[-1, 0, -3]} 
                        scale={[8, 10, 1]} 
                        opacity={0.3} 
                        grayscale={1}
                    />
                    <SalonImage 
                        url={IMG_SCISSORS} 
                        position={[2, 2, -1]} 
                        scale={[4, 4, 1]} 
                        opacity={0.15} 
                        color="#D4AF37"
                    />
                </Float>
                <Float speed={2} rotationIntensity={0.2} floatIntensity={0.2}>
                    <MensVisuals count={count} />
                </Float>
            </group>

            <group position={womensGroupPos as any}>
                <Float speed={0.8} rotationIntensity={0.05} floatIntensity={0.1}>
                    {/* Main Bridal Image - High Opacity */}
                    <SalonImage 
                        url={IMG_WOMEN_HERO_1} 
                        position={[0, 0, -1]} 
                        scale={[7, 10, 1]} 
                        opacity={0.9} 
                        grayscale={0} 
                    />
                    {/* Secondary Makeup Image */}
                    <SalonImage 
                        url={IMG_WOMEN_HERO_2} 
                        position={[-3, -2, 1]} 
                        scale={[5, 7, 1]} 
                        opacity={0.8} 
                        grayscale={0}
                    />
                </Float>
                <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.2}>
                    <WomensVisuals count={count} />
                </Float>
            </group>
        </Canvas>
      </Suspense>
    </SceneErrorBoundary>
  );
};

export const BackgroundScene = ({ gender }: { gender: 'mens' | 'womens' }) => {
  const [isSupported, setIsSupported] = useState(false);
  const [hasChecked, setHasChecked] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const isMens = gender === 'mens';
  const mobile = isMobile();
  const count = mobile ? 15 : 40;

  useEffect(() => {
    const supported = isWebGLAvailable();
    setIsSupported(supported);
    setHasChecked(true);
  }, []);

  if (!hasChecked || !isSupported || shouldReduceMotion) return <StaticFallback type={gender} />;

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.4] mix-blend-screen blur-[0px]">
        <SceneErrorBoundary fallback={<StaticFallback type={gender} />}>
          <Suspense fallback={<StaticFallback type={gender} />}>
            <Canvas 
            camera={{ position: [0, 0, 8], fov: 50 }} 
            dpr={[1, mobile ? 1 : 1.5]}
            gl={{ 
                alpha: true, 
                antialias: false,
                powerPreference: "default", 
                failIfMajorPerformanceCaveat: true,
                stencil: false
            }}
            onCreated={({ gl }) => {
                gl.domElement.addEventListener('webglcontextlost', (event) => {
                    event.preventDefault();
                    setIsSupported(false);
                });
            }}
            >
            <ambientLight intensity={0.5} />
            <Environment preset={isMens ? "studio" : "sunset"} />
            
            <group>
                {/* 3D Images Removed - Only Particles remain for full background support */}
                <Float speed={isMens ? 1.5 : 2} rotationIntensity={0.3} floatIntensity={0.4}>
                    {isMens ? (
                        <MensVisuals count={count} />
                    ) : (
                        <WomensVisuals count={count} />
                    )}
                </Float>
            </group>
            </Canvas>
          </Suspense>
        </SceneErrorBoundary>
    </div>
  );
};

export const HomeScene = BackgroundScene; // Alias for consistency

// Fallback for Suspense
export const SceneLoader = () => (
  <div className="w-full h-full bg-neutral-900 animate-pulse flex items-center justify-center">
    <div className="text-gray-600 text-xs tracking-widest uppercase">Loading Visuals...</div>
  </div>
);