

import React, { useState } from 'react';
import { Menu, X, Phone, MapPin, Clock, MessageCircle, ChevronDown, ChevronUp, Lock, ShoppingCart, Zap, ZapOff } from 'lucide-react';
import { Gender } from '../types';
import { motion, AnimatePresence } from 'framer-motion';
import { useAnimationSettings } from './AnimationContext';
import { KineticLink, StaggerContainer, StaggerItem, GradientText, TextReveal, ScrollReveal } from './TextAnimations';

// --- Button ---
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  gender?: Gender;
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, variant = 'primary', gender = 'mens', fullWidth, className = '', ...props 
}) => {
  const { shouldReduceMotion } = useAnimationSettings();
  
  const baseStyles = "relative overflow-hidden px-6 py-3 rounded-full font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed group";
  
  const themeStyles = gender === 'mens' 
    ? {
        primary: "bg-mens-accent text-black shadow-lg shadow-mens-accent/20",
        secondary: "bg-mens-primary text-mens-text border border-gray-800",
        outline: "border-2 border-mens-accent text-mens-accent"
      }
    : {
        primary: "bg-womens-accent text-black shadow-lg shadow-womens-accent/20",
        secondary: "bg-womens-primary text-womens-text border border-gray-800",
        outline: "border-2 border-womens-accent text-womens-accent"
      };

  const animationProps = shouldReduceMotion ? {} : {
      whileHover: { scale: 1.05 },
      whileTap: { scale: 0.95 }
  };

  return (
    <motion.button 
      {...animationProps}
      className={`${baseStyles} ${themeStyles[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props as any}
    >
      <span className="relative z-10 flex items-center justify-center transition-transform group-hover:scale-105 duration-300">{children}</span>
      {/* Shine effect on hover - disabled if reduced motion */}
      {!shouldReduceMotion && (
        <motion.div 
            className="absolute inset-0 bg-white/20 translate-x-[-100%]"
            variants={{
            hover: { translateX: '100%' }
            }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
        />
      )}
    </motion.button>
  );
};

// --- Header ---
interface HeaderProps {
  gender: Gender;
  onNavigate: (page: string) => void;
  onSwitchGender: () => void;
  currentPage: string;
  cartCount: number;
  onOpenCart: () => void;
  onBookNow?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ gender, onNavigate, onSwitchGender, currentPage, cartCount, onOpenCart, onBookNow }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [mobileSubMenuOpen, setMobileSubMenuOpen] = useState<string | null>(null);
  const { shouldReduceMotion, toggleReduceMotion } = useAnimationSettings();
  
  const toggleMobileSubMenu = (id: string) => {
    setMobileSubMenuOpen(mobileSubMenuOpen === id ? null : id);
  };

  const servicesSubMenu = gender === 'womens' ? [
    { id: 'services-hair', label: 'Hair Services' },
    { id: 'services-skin', label: 'Skin and Facial Services' },
    { id: 'services-makeup', label: 'Makeup Services' },
    { id: 'services-nail', label: 'Nail Services' },
    { id: 'services-eyelash', label: 'Eyelash Services' },
    { id: 'services-waxing', label: 'Waxing Services' },
    { id: 'services-threading', label: 'Threading Services' },
    { id: 'services-massage', label: 'Massage and Spa Services' },
    { id: 'services-special', label: 'Special Services' },
  ] : [
    { id: 'services-hair', label: 'HAIR SERVICES' },
    { id: 'services-beard', label: 'BEARD SERVICES' },
    { id: 'services-hair-treatments', label: 'HAIR TREATMENTS' },
    { id: 'services-hair-coloring', label: 'HAIR COLORING' },
    { id: 'services-facial', label: 'FACIAL & SKIN SERVICES' },
    { id: 'services-polish', label: 'POLISH SERVICES' },
    { id: 'services-waxing', label: 'WAXING SERVICES' },
    { id: 'services-manipedi', label: 'MANICURE & PEDICURE' },
    { id: 'services-skin-treatments', label: 'SKIN TREATMENTS' },
    { id: 'services-massage', label: 'MASSAGE SERVICES' },
  ];

  const dealsSubMenu = gender === 'womens' ? [
    { id: 'deals-bridal', label: 'Bridal & Wedding Package' },
    { id: 'deals-day', label: 'Day Specific Deals' },
    { id: 'deals-spa', label: 'Premium SPA Package' },
    { id: 'deals-winter', label: 'Winter Special Series' },
    { id: 'deals-other', label: 'Other Deals' },
  ] : [
    { id: 'deals-tiered', label: 'TIERED GROOMING PACKAGES' },
    { id: 'deals-themed', label: 'THEMED PACKAGES' },
    { id: 'deals-exclusive', label: 'EXCLUSIVE DEALS' },
  ];

  // Vouchers Menu Logic
  const vouchersSubMenu = gender === 'mens' ? [
    { id: 'vouchers-mv4', label: 'Elite Grooming Voucher' },
    { id: 'vouchers-mv5', label: 'Azadi Deal Voucher' },
    { id: 'vouchers-mv3', label: 'Premium Grooming Voucher' },
    { id: 'vouchers-mv2', label: 'Express Grooming Voucher' },
    { id: 'vouchers-mv1', label: 'Basic Grooming Voucher' },
  ] : [
    { id: 'vouchers-spa', label: 'Relaxation & Spa' },
    { id: 'vouchers-face', label: 'Facial & Glow' },
    { id: 'vouchers-hair', label: 'Hair & Styling' },
    { id: 'vouchers-essentials', label: 'Daily Essentials' },
    { id: 'vouchers-student', label: 'Student Specials' },
  ];

  const navItems = [
    { id: 'home', label: 'Home' },
    { 
      id: 'services', 
      label: 'Services', 
      children: servicesSubMenu.length > 0 ? servicesSubMenu : undefined 
    },
    { 
      id: 'deals', 
      label: 'Deals & Packages',
      children: dealsSubMenu.length > 0 ? dealsSubMenu : undefined
    },
    { 
      id: 'vouchers', 
      label: 'Vouchers',
      children: vouchersSubMenu
    },
    { id: 'about', label: 'About Us' },
    { id: 'contact', label: 'Contact' },
  ];

  const bgColor = gender === 'mens' ? 'bg-black/90' : 'bg-black/90';
  const activeColor = gender === 'mens' ? 'text-mens-accent' : 'text-womens-accent';
  const borderColor = gender === 'mens' ? 'border-gray-800' : 'border-gray-800';

  return (
    <header className={`fixed top-0 w-full z-50 backdrop-blur-md border-b ${bgColor} ${borderColor} transition-colors duration-500`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div 
            className={`font-serif text-2xl font-bold tracking-wider cursor-pointer ${gender === 'mens' ? 'text-mens-accent' : 'text-womens-accent'}`}
            onClick={() => onNavigate('home')}
          >
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              Sumaira n Shan <span className={`text-sm font-sans font-light tracking-widest uppercase ml-1 opacity-80 text-white`}>{gender === 'mens' ? 'Mens Saloon' : 'Makeup Studio'}</span>
            </motion.span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-8">
            <StaggerContainer className="flex space-x-8" staggerDelay={0.05}>
            {navItems.map((item) => {
              if (item.children) {
                return (
                  <StaggerItem key={item.id}>
                    <div className="relative group">
                      <button
                        className={`flex items-center text-sm font-medium transition-colors hover:text-white py-2 kinetic-underline ${currentPage.startsWith(item.id) ? activeColor : 'text-gray-400'}`}
                        onClick={() => onNavigate(item.id)}
                      >
                        {item.label}
                        <ChevronDown size={14} className="ml-1" />
                      </button>
                      {/* Dropdown Menu */}
                      <div className="absolute left-0 mt-0 w-64 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 pt-2">
                         <div className="bg-neutral-900 border border-gray-800 rounded-lg shadow-xl overflow-hidden py-2">
                            {item.children.map(subItem => (
                              <button
                                key={subItem.id}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  onNavigate(subItem.id);
                                }}
                                className={`block w-full text-left px-4 py-2 text-sm hover:bg-neutral-800 transition-colors ${currentPage === subItem.id ? activeColor : 'text-gray-300'}`}
                              >
                                {subItem.label}
                              </button>
                            ))}
                         </div>
                      </div>
                    </div>
                  </StaggerItem>
                );
              }

              return (
                <StaggerItem key={item.id}>
                  <button
                    onClick={() => onNavigate(item.id)}
                    className={`text-sm font-medium transition-colors hover:text-white kinetic-underline ${currentPage === item.id ? activeColor : 'text-gray-400'}`}
                  >
                    {item.label}
                  </button>
                </StaggerItem>
              );
            })}
            </StaggerContainer>
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            
             {/* Animation Toggle */}
             <button
               onClick={toggleReduceMotion}
               className="hidden md:flex p-2 text-gray-500 hover:text-white transition-colors"
               title={shouldReduceMotion ? "Enable Animations" : "Reduce Animations"}
             >
               {shouldReduceMotion ? <ZapOff size={18} /> : <Zap size={18} />}
             </button>

             <button 
                onClick={onSwitchGender}
                className={`hidden md:block text-xs px-3 py-1 rounded border opacity-70 hover:opacity-100 hover:text-white transition-all border-gray-600 text-gray-400`}
             >
                Switch to {gender === 'mens' ? 'Women' : 'Men'}
             </button>
             
             {/* Cart Button */}
             <button 
               onClick={onOpenCart}
               className={`relative p-2 rounded-full hover:bg-gray-800 transition-colors ${cartCount > 0 ? activeColor : 'text-gray-400'}`}
             >
               <ShoppingCart size={22} />
               {cartCount > 0 && (
                 <motion.span 
                   initial={{ scale: 0 }}
                   animate={{ scale: 1 }}
                   className={`absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 text-[10px] font-bold rounded-full text-black ${gender === 'mens' ? 'bg-mens-accent' : 'bg-womens-accent'}`}
                 >
                   {cartCount}
                 </motion.span>
               )}
             </button>

             <div className="hidden md:block">
               <Button gender={gender} variant="primary" onClick={onBookNow || (() => onNavigate('book'))}>
                  Book Now
               </Button>
             </div>

             {/* Mobile Menu Button */}
             <div className="md:hidden flex items-center ml-2">
                <button onClick={() => setIsOpen(!isOpen)} className="text-white">
                  {isOpen ? <X /> : <Menu />}
                </button>
             </div>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
      {isOpen && (
        <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className={`md:hidden absolute w-full ${bgColor} border-b ${borderColor} max-h-[90vh] overflow-y-auto`}
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <div key={item.id}>
                {item.children ? (
                  <>
                    <button
                       onClick={() => toggleMobileSubMenu(item.id)}
                       className={`flex items-center justify-between w-full text-left px-3 py-4 text-base font-medium border-b border-gray-800 ${currentPage.startsWith(item.id) ? activeColor : 'text-gray-300'}`}
                    >
                       {item.label}
                       {mobileSubMenuOpen === item.id ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </button>
                    {mobileSubMenuOpen === item.id && (
                       <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="bg-neutral-900/50 px-4 py-2 space-y-2 border-b border-gray-800"
                       >
                          {item.children.map(subItem => (
                             <button
                                key={subItem.id}
                                onClick={() => {
                                   onNavigate(subItem.id);
                                   setIsOpen(false);
                                }}
                                className={`block w-full text-left py-2 text-sm ${currentPage === subItem.id ? activeColor : 'text-gray-400'}`}
                             >
                                {subItem.label}
                             </button>
                          ))}
                       </motion.div>
                    )}
                  </>
                ) : (
                  <button
                    onClick={() => {
                      onNavigate(item.id);
                      setIsOpen(false);
                    }}
                    className={`block w-full text-left px-3 py-4 text-base font-medium border-b border-gray-800 ${currentPage === item.id ? activeColor : 'text-gray-300'}`}
                  >
                    {item.label}
                  </button>
                )}
              </div>
            ))}
             <button
                onClick={() => {
                   if (onBookNow) onBookNow();
                   else onNavigate('book');
                   setIsOpen(false);
                }}
                 className={`block w-full text-left px-3 py-4 text-base font-bold ${activeColor}`}
              >
                Book Appointment
              </button>
             <button
                onClick={() => {
                    toggleReduceMotion();
                }}
                className={`block w-full text-left px-3 py-4 text-sm font-medium opacity-70 text-gray-400 flex items-center`}
              >
                <span className="mr-2">{shouldReduceMotion ? 'Enable Animations' : 'Reduce Animations'}</span>
                {shouldReduceMotion ? <ZapOff size={16} /> : <Zap size={16} />}
              </button>
             <button
                onClick={() => {
                    onSwitchGender();
                    setIsOpen(false);
                }}
                className={`block w-full text-left px-3 py-4 text-sm font-medium opacity-70 text-gray-400`}
              >
                Switch to {gender === 'mens' ? 'Womens Studio' : 'Mens Saloon'}
              </button>
          </div>
        </motion.div>
      )}
      </AnimatePresence>
    </header>
  );
};

// --- Footer ---
export const Footer: React.FC<{ gender: Gender }> = ({ gender }) => {
  const accent = gender === 'mens' ? 'text-mens-accent' : 'text-womens-accent';
  const phoneNumber = gender === 'womens' ? '+92 345 2288133' : '+92 370 7350507';
  const address = "231-A Block, 3rd Gate, Central Park, Near Central Park Teaching Hospital, Lahore";
  const hours = gender === 'mens' ? '10:00 AM - 11:00 PM (Daily)' : '10:00 AM - 09:00 PM (Daily)';
  
  return (
    <footer className="bg-neutral-950 border-t border-gray-900 pt-16 pb-8 text-gray-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
        <StaggerContainer className="col-span-1 md:col-span-4 grid grid-cols-1 md:grid-cols-4 gap-12">
            <StaggerItem>
            <div className={`font-serif text-2xl font-bold text-white mb-6`}>
               <GradientText text="Sumaira n Shan" className="from-white via-gray-200 to-gray-500"/> <span className="text-xs font-sans font-light tracking-widest uppercase ml-1 opacity-80 text-white">Studio</span>
            </div>
            <p className="mb-6">Redefining grooming and beauty standards with premium services and expert care.</p>
            {/* Removed Social Icons */}
            </StaggerItem>
            
            <StaggerItem>
            <h3 className="text-white font-bold mb-6"><TextReveal text="Quick Links" type="char" delay={0.2} /></h3>
            <ul className="space-y-3">
                <li><button className="hover:text-white kinetic-underline">About Us</button></li>
                <li><button className="hover:text-white kinetic-underline">Services</button></li>
                <li><button className="hover:text-white kinetic-underline">Book Appointment</button></li>
                <li><button className="hover:text-white kinetic-underline">Contact</button></li>
            </ul>
            </StaggerItem>

            <StaggerItem>
            <h3 className="text-white font-bold mb-6"><TextReveal text="Contact" type="char" delay={0.2} /></h3>
            <ul className="space-y-3">
                <li className="flex items-start"><MapPin size={16} className={`mr-2 mt-1 flex-shrink-0 ${accent}`} /> <span>{address}</span></li>
                <li className="flex items-center"><Phone size={16} className={`mr-2 ${accent}`} /> {phoneNumber}</li>
                {/* Removed Email */}
            </ul>
            </StaggerItem>

            <StaggerItem>
            <h3 className="text-white font-bold mb-6"><TextReveal text="Hours" type="char" delay={0.2} /></h3>
            <ul className="space-y-3">
                <li className="flex justify-between font-bold text-white"><span>{hours}</span></li>
            </ul>
            </StaggerItem>
        </StaggerContainer>
      </div>
      <div className="max-w-7xl mx-auto px-4 border-t border-gray-900 pt-8 text-center">
        <p>&copy; {new Date().getFullYear()} Sumaira n Shan Studio. All rights reserved.</p>
      </div>
    </footer>
  );
};

// --- WhatsApp Widget ---
export const WhatsAppWidget: React.FC<{ gender: Gender | null }> = ({ gender }) => {
  const { shouldReduceMotion } = useAnimationSettings();
  const phoneNumber = gender === 'womens' ? '923452288133' : '923707350507';

  return (
    <motion.a 
      href={`https://wa.me/${phoneNumber}`} 
      target="_blank" 
      rel="noreferrer"
      className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-2xl z-50 flex items-center justify-center hover:bg-green-600 transition-colors"
      title="Chat with us"
      whileHover={shouldReduceMotion ? {} : { scale: 1.1 }}
      whileTap={shouldReduceMotion ? {} : { scale: 0.9 }}
      initial={shouldReduceMotion ? { scale: 1 } : { scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: 'spring' }}
    >
      <MessageCircle size={28} />
    </motion.a>
  );
};