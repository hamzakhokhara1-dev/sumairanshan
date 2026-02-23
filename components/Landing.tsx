import React, { Suspense } from 'react';
import { motion } from 'framer-motion';
import { Gender } from '../types';
import { Scissors, Sparkles, ArrowRight, Gift } from 'lucide-react';
import { SceneLoader } from './Scene';
import { TextReveal, GradientText, RotatingText, Typewriter, ScrollReveal, FloatingElement } from './TextAnimations';

// Lazy load the 3D scene to improve FCP
const LandingScene = React.lazy(() => import('./Scene').then(mod => ({ default: mod.LandingScene })));

interface LandingProps {
  onSelect: (gender: Gender) => void;
}

const Landing: React.FC<LandingProps> = ({ onSelect }) => {
  return (
    <div className="h-screen w-full overflow-hidden flex flex-col relative bg-black">
      
      {/* 3D Background Layer */}
      <div className="absolute inset-0 z-0">
         <Suspense fallback={<div className="w-full h-full bg-gradient-to-r from-black via-gray-900 to-black"></div>}>
            <LandingScene />
         </Suspense>
      </div>

      {/* Main Interactive Layer */}
      <div className="flex-1 flex flex-col md:flex-row relative z-10">
        
        {/* Decorative center line */}
        <div className="absolute top-0 bottom-0 left-1/2 w-px bg-gradient-to-b from-transparent via-white/20 to-transparent z-20 hidden md:block transform -translate-x-1/2"></div>
        
        {/* Floating Badge */}
        <motion.div 
            className="absolute top-1/2 left-1/2 z-30 transform -translate-x-1/2 -translate-y-1/2 bg-black/80 backdrop-blur-xl border border-gray-700 rounded-full p-8 shadow-2xl hidden md:block"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1, type: 'spring' }}
        >
            <div className="font-serif font-bold text-xl tracking-widest text-white whitespace-nowrap">Sumaira n Shan</div>
        </motion.div>

        {/* MENS SECTION */}
        <div 
            className="flex-1 relative group cursor-pointer overflow-hidden border-b border-white/10 md:border-b-0 md:border-r"
            onClick={() => onSelect('mens')}
        >
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-700"></div>
            
            <div className="relative h-full flex flex-col items-center justify-center text-center p-8 z-10">
              <div className="mb-8">
                  <FloatingElement delay={0}>
                    <div className="inline-block p-4 rounded-full border border-yellow-500/30 text-yellow-500 mb-6 bg-black/30 backdrop-blur-sm shadow-lg shadow-yellow-500/10">
                        <Scissors size={40} />
                    </div>
                  </FloatingElement>
                  
                  <div className="mb-4">
                     <GradientText 
                       text="MENS" 
                       className="text-6xl md:text-8xl font-bold tracking-tighter font-serif bg-gradient-to-r from-white via-yellow-200 to-yellow-500" 
                     />
                  </div>
                  
                  <div className="h-8 mb-2">
                     <RotatingText 
                        words={['Classic Grooming', 'Precision Cuts', 'Royal Treatment']} 
                        className="text-yellow-500 font-medium tracking-widest uppercase text-sm"
                     />
                  </div>
                  
                  <div className="text-gray-300 max-w-xs mx-auto text-lg font-light tracking-wide">
                     <TextReveal text="Where tradition meets modern style." type="word" delay={0.4} />
                  </div>
              </div>

              <motion.span 
                className="inline-flex items-center text-yellow-500 font-semibold uppercase tracking-[0.2em] text-sm opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500"
              >
                  Enter Saloon <ArrowRight className="ml-2 w-4 h-4" />
              </motion.span>
            </div>
        </div>

        {/* WOMENS SECTION */}
        <div 
            className="flex-1 relative group cursor-pointer overflow-hidden"
            onClick={() => onSelect('womens')}
        >
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-700"></div>

            <div className="relative h-full flex flex-col items-center justify-center text-center p-8 z-10">
              <div className="mb-8">
                  <FloatingElement delay={0.5}>
                    <div className="inline-block p-4 rounded-full border border-pink-500/30 text-pink-500 mb-6 bg-black/30 backdrop-blur-sm shadow-lg shadow-pink-500/10">
                        <Sparkles size={40} />
                    </div>
                  </FloatingElement>
                  
                  <div className="mb-4">
                     <GradientText 
                       text="WOMENS" 
                       className="text-6xl md:text-8xl font-bold tracking-tighter font-serif bg-gradient-to-r from-white via-pink-200 to-pink-500" 
                     />
                  </div>

                  <div className="h-8 mb-2">
                     <RotatingText 
                        words={['Bridal Glow', 'Luxury Spa', 'Expert Makeup']} 
                        className="text-pink-500 font-medium tracking-widest uppercase text-sm"
                     />
                  </div>

                  <div className="text-gray-300 max-w-xs mx-auto text-lg font-light tracking-wide">
                     <TextReveal text="Unveil your radiance with us." type="word" delay={0.6} />
                  </div>
              </div>

              <motion.span 
                className="inline-flex items-center text-pink-500 font-semibold uppercase tracking-[0.2em] text-sm opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500"
              >
                  Enter Studio <ArrowRight className="ml-2 w-4 h-4" />
              </motion.span>
            </div>
        </div>
      </div>
      
      {/* GIFT VOUCHER TEASER */}
      <motion.div 
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ delay: 1.5 }}
        className="bg-black/80 backdrop-blur-md border-t border-gray-800 p-4 text-center z-40"
      >
        <div className="text-gray-500 text-xs mb-2 uppercase tracking-widest">
            <Typewriter text="Looking for the perfect gift?" delay={2} />
        </div>
        <div className="flex justify-center items-center text-white font-bold tracking-widest text-sm cursor-pointer hover:text-yellow-500 transition-colors" onClick={() => onSelect('mens')}>
           <Gift size={16} className="mr-2 animate-pulse" /> <span className="kinetic-underline">BUY GIFT VOUCHERS</span>
        </div>
      </motion.div>
    </div>
  );
};

export default Landing;