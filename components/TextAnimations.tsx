import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView, Variants, AnimatePresence } from 'framer-motion';
import { useAnimationSettings } from './AnimationContext';

// --- Types ---
type TextAnimationProps = {
  text?: string | React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  once?: boolean;
  as?: React.ElementType;
  staggerValue?: number;
  type?: 'word' | 'char';
};

// --- Utilities ---
const isMobileDevice = () => {
    return typeof window !== 'undefined' && window.innerWidth < 768;
};

// --- Variants ---

const staggerVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.03,
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1], // Custom easing
    },
  }),
  reduced: { opacity: 1, y: 0 }
};

const clipVariants: Variants = {
  hidden: { clipPath: 'inset(100% 0 0 0)', y: 20, opacity: 0 },
  visible: {
    clipPath: 'inset(0% 0 0 0)',
    y: 0,
    opacity: 1,
    transition: { duration: 0.8, ease: [0.25, 1, 0.5, 1] }
  },
  reduced: { clipPath: 'inset(0% 0 0 0)', y: 0, opacity: 1 }
};

const scaleVariants: Variants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
};

// --- Components ---

/**
 * Splits text into words or characters and staggers their entry.
 * Auto-switches to 'word' on mobile to save performance.
 * Best for: Hero titles, Section headers.
 */
export const TextReveal: React.FC<TextAnimationProps> = ({
  text,
  className = '',
  delay = 0,
  type = 'word',
  as: Component = 'div'
}) => {
  const { shouldReduceMotion } = useAnimationSettings();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });
  
  // Force word split on mobile for performance unless character split is explicitly critical
  const effectiveType = isMobileDevice() ? 'word' : type;

  if (typeof text !== 'string') {
    return <Component className={className}>{text}</Component>;
  }

  const items = effectiveType === 'word' ? text.split(' ') : text.split('');

  return (
    <Component 
      ref={ref} 
      className={`${className} ${effectiveType === 'word' ? 'flex flex-wrap gap-x-[0.25em]' : 'inline-block'}`}
      aria-label={text}
    >
      {items.map((item, index) => (
        <motion.span
          key={index}
          custom={index + (delay * 10)} // Delay factor
          initial={shouldReduceMotion ? "reduced" : "hidden"}
          animate={isInView ? (shouldReduceMotion ? "reduced" : "visible") : "hidden"}
          variants={staggerVariants}
          className="inline-block"
        >
          {item === ' ' ? '\u00A0' : item}
        </motion.span>
      ))}
    </Component>
  );
};

/**
 * Reveals text using a clip-path mask.
 * Best for: Large, impactful headlines.
 */
export const MaskReveal: React.FC<TextAnimationProps> = ({
  text,
  className = '',
  delay = 0,
  as: Component = 'div'
}) => {
  const { shouldReduceMotion } = useAnimationSettings();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <Component ref={ref} className={`${className} overflow-hidden`}>
      <motion.div
        initial={shouldReduceMotion ? "reduced" : "hidden"}
        animate={isInView ? (shouldReduceMotion ? "reduced" : "visible") : "hidden"}
        variants={clipVariants}
        transition={{ delay }}
      >
        {text}
      </motion.div>
    </Component>
  );
};

/**
 * Typewriter effect for short taglines.
 */
export const Typewriter: React.FC<TextAnimationProps> = ({ 
  text, 
  className = '', 
  delay = 0 
}) => {
  const { shouldReduceMotion } = useAnimationSettings();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  
  if (typeof text !== 'string') return <span className={className}>{text}</span>;

  const characters = text.split("");

  if (shouldReduceMotion) {
      return <span className={className}>{text}</span>;
  }

  return (
    <span ref={ref} className={className}>
      {characters.map((char, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{
            duration: 0.1,
            delay: delay + index * 0.05,
            ease: "linear"
          }}
        >
          {char}
        </motion.span>
      ))}
    </span>
  );
};

/**
 * Rotates through a list of words.
 * Best for: Secondary hero taglines.
 */
export const RotatingText: React.FC<{ words: string[], className?: string, interval?: number }> = ({ 
    words, className = '', interval = 3000 
}) => {
    const [index, setIndex] = useState(0);
    const { shouldReduceMotion } = useAnimationSettings();

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % words.length);
        }, interval);
        return () => clearInterval(timer);
    }, [words.length, interval]);

    if (shouldReduceMotion) return <span className={className}>{words[0]}</span>;

    return (
        <span className={`inline-block relative ${className}`}>
            <AnimatePresence mode="wait">
                <motion.span
                    key={index}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="block"
                >
                    {words[index]}
                </motion.span>
            </AnimatePresence>
        </span>
    );
};

/**
 * Text masked by an animated gradient background.
 * Uses CSS utility .anim-gradient-text for performance.
 */
export const GradientText: React.FC<TextAnimationProps> = ({
    text, className = '', as: Component = 'span'
}) => {
    return (
        <Component className={`anim-gradient-text bg-clip-text text-transparent ${className}`}>
            {text}
        </Component>
    );
};

/**
 * Wrapper for the kinetic underline CSS effect.
 */
export const KineticLink: React.FC<{ children: React.ReactNode, href?: string, onClick?: () => void, className?: string }> = ({ 
    children, href, onClick, className = "" 
}) => {
    const Component = href ? 'a' : 'button';
    return (
        // @ts-ignore
        <Component 
            href={href} 
            onClick={onClick} 
            className={`kinetic-underline ${className}`}
        >
            {children}
        </Component>
    );
};

/**
 * Micro-float animation for badges or prices.
 */
export const FloatingElement: React.FC<{ children: React.ReactNode, className?: string, delay?: number }> = ({
    children, className = '', delay = 0
}) => {
    const { shouldReduceMotion } = useAnimationSettings();
    if (shouldReduceMotion) return <div className={className}>{children}</div>;
    
    return (
        <motion.div
            className={className}
            animate={{ y: [0, -5, 0] }}
            transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: delay
            }}
        >
            {children}
        </motion.div>
    );
};

/**
 * Generic Scroll Reveal Wrapper.
 */
export const ScrollReveal: React.FC<{ children: React.ReactNode, className?: string, delay?: number, width?: '100%' | 'auto' }> = ({ 
    children, className = "", delay = 0, width = 'auto' 
}) => {
    const { shouldReduceMotion } = useAnimationSettings();
    
    return (
        <motion.div
            initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            whileInView={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay }}
            className={className}
            style={{ width }}
        >
            {children}
        </motion.div>
    );
};

/**
 * Staggered container for lists of items (cards, nav items).
 */
export const StaggerContainer: React.FC<{ children: React.ReactNode, className?: string, staggerDelay?: number, triggerOnMount?: boolean }> = ({
    children, className = '', staggerDelay = 0.1, triggerOnMount = false
}) => {
    const { shouldReduceMotion } = useAnimationSettings();
    
    const container = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: staggerDelay
            }
        },
        reduced: { opacity: 1 }
    };

    const motionProps = shouldReduceMotion ? {
        animate: "reduced"
    } : triggerOnMount ? {
        initial: "hidden",
        animate: "visible"
    } : {
        initial: "hidden",
        whileInView: "visible",
        viewport: { once: true, margin: "-10%" }
    };

    return (
        <motion.div
            {...motionProps}
            variants={container}
            className={className}
        >
            {children}
        </motion.div>
    );
};

export const StaggerItem: React.FC<{ children: React.ReactNode, className?: string }> = ({
    children, className = ''
}) => {
    const item = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
        reduced: { opacity: 1, y: 0 }
    };

    return (
        <motion.div variants={item} className={className}>
            {children}
        </motion.div>
    );
};