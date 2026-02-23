

import React, { useState, useEffect, Suspense } from 'react';
import Landing from './components/Landing';
import { Header, Footer, WhatsAppWidget, Button } from './components/Shared';
import BookingForm from './components/Booking';
import VoucherCheckout from './components/VoucherCheckout';
import CartDrawer from './components/CartDrawer';
import Admin from './components/Admin';
import { MENS_SERVICES, WOMENS_SERVICES, SERVICE_VOUCHERS, MENS_PACKAGES, WOMENS_PACKAGES, WOMENS_REVIEWS, MENS_REVIEWS } from './constants';
import { Gender, ServiceVoucher, CartItem } from './types';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Gift, Tag, Clock, Check, ArrowRight, MapPin, Phone, Package as PackageIcon, Heart, Snowflake, Sparkles as SparklesIcon, GraduationCap, Sun, ShoppingCart, Calendar, Award } from 'lucide-react';
import { AnimationProvider } from './components/AnimationContext';
import { TextReveal, MaskReveal, ScrollReveal, Typewriter, GradientText, StaggerContainer, StaggerItem, FloatingElement } from './components/TextAnimations';

// Lazy load 3D Home Scene
const HomeScene = React.lazy(() => import('./components/Scene').then(mod => ({ default: mod.HomeScene })));

// --- HERO IMAGES ---
const MENS_HERO_IMAGE = "https://i.pinimg.com/1200x/91/d6/03/91d6037c183ccc9644cdd59a70857524.jpg"; 
const WOMENS_HERO_IMAGE = "https://i.pinimg.com/736x/9e/4a/7d/9e4a7dceccf2db4fa47a39cc6aad4554.jpg";

// Main App Wrapper to provide Context
const App: React.FC = () => {
    return (
        <AnimationProvider>
            <AppContent />
        </AnimationProvider>
    );
};

const AppContent: React.FC = () => {
  const [gender, setGender] = useState<Gender | null>(null);
  const [page, setPage] = useState('home');
  
  // Booking Context
  const [bookingConfig, setBookingConfig] = useState<{ type: 'service' | 'deal', id?: string }>({ type: 'service' });

  // Cart State
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutActive, setIsCheckoutActive] = useState(false);
  
  // Hash Routing for Admin
  const [hash, setHash] = useState(window.location.hash);

  // Load persistence and setup listeners
  useEffect(() => {
    const savedGender = localStorage.getItem('sns_gender') as Gender | null;
    if (savedGender) setGender(savedGender);

    const savedCart = localStorage.getItem('sns_cart');
    if (savedCart) setCart(JSON.parse(savedCart));

    const handleHashChange = () => setHash(window.location.hash);
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Persist Cart
  useEffect(() => {
    localStorage.setItem('sns_cart', JSON.stringify(cart));
  }, [cart]);

  const handleGenderSelect = (g: Gender) => {
    setGender(g);
    localStorage.setItem('sns_gender', g);
    setPage('home');
  };

  const handleSwitch = () => {
    const newGender = gender === 'mens' ? 'womens' : 'mens';
    setGender(newGender);
    localStorage.setItem('sns_gender', newGender);
    setPage('home');
  };

  const handleAddToCart = (voucher: ServiceVoucher) => {
    const newItem: CartItem = { ...voucher, cartId: Math.random().toString(36).substr(2, 9) };
    setCart([...cart, newItem]);
    setIsCartOpen(true);
  };

  const handleRemoveFromCart = (cartId: string) => {
    setCart(cart.filter(item => item.cartId !== cartId));
  };

  const handleStartCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutActive(true);
  };

  const handleCheckoutComplete = () => {
    setCart([]); // Clear cart after successful purchase
    setIsCheckoutActive(false);
  };

  const closeCheckout = () => {
    setIsCheckoutActive(false);
    setIsCartOpen(true); // Return to cart if cancelled
  };

  // Booking Handlers
  const startGeneralBooking = () => {
    setBookingConfig({ type: 'service' });
    setPage('book');
  };

  const startDealBooking = (packageId: string) => {
    setBookingConfig({ type: 'deal', id: packageId });
    setPage('book');
  };

  // Admin Route
  if (hash === '#admin') {
    return <Admin />;
  }

  // --- RENDERING ---

  if (!gender) {
    return <Landing onSelect={handleGenderSelect} />;
  }

  // If checkout is active, show ONLY checkout
  if (isCheckoutActive) {
      return (
          <div className={`min-h-screen ${gender === 'mens' ? 'bg-black text-gray-200' : 'bg-black text-gray-200'} font-sans`}>
            <VoucherCheckout 
              items={cart} 
              gender={gender} 
              onClose={closeCheckout} 
              onSuccess={handleCheckoutComplete}
            />
          </div>
      );
  }

  const themeServices = gender === 'mens' ? MENS_SERVICES : WOMENS_SERVICES;
  const themePackages = gender === 'mens' ? MENS_PACKAGES : WOMENS_PACKAGES;
  const themeBg = gender === 'mens' ? 'bg-mens-bg' : 'bg-womens-bg';
  const themeText = gender === 'mens' ? 'text-mens-text' : 'text-womens-text';
  const themeAccent = gender === 'mens' ? 'text-mens-accent' : 'text-womens-accent';
  const accentHex = gender === 'mens' ? '#D4AF37' : '#EC4899';
  const contactNumber = gender === 'womens' ? '+92 345 2288133' : '+92 370 7350507';

  // Group services by category
  let serviceCategories = Array.from(new Set(themeServices.map(s => s.category)));

  // Filter if a specific sub-page is selected
  let displayedServices = themeServices;
  if (page.startsWith('services-')) {
    const categorySlug = page.replace('services-', '');
    
    // Define separate maps for men and women to avoid duplicate keys in object literal
    const womensMap: Record<string, string> = {
      'hair': 'Hair Services',
      'skin': 'Skin and Facial Services',
      'makeup': 'Makeup Services',
      'nail': 'Nail Services',
      'eyelash': 'Eyelash Services',
      'waxing': 'Waxing Services',
      'threading': 'Threading Services',
      'massage': 'Massage and Spa Services',
      'special': 'Special Services',
    };

    const mensMap: Record<string, string> = {
      'hair': 'HAIR SERVICES',
      'beard': 'BEARD SERVICES',
      'hair-treatments': 'HAIR TREATMENTS',
      'hair-coloring': 'HAIR COLORING',
      'facial': 'FACIAL & SKIN SERVICES',
      'polish': 'POLISH SERVICES',
      'waxing': 'WAXING SERVICES',
      'manipedi': 'MANICURE & PEDICURE',
      'skin-treatments': 'SKIN TREATMENTS',
      'massage': 'MASSAGE SERVICES'
    };

    const slugMap = gender === 'mens' ? mensMap : womensMap;
    let categoryName = slugMap[categorySlug];
    
    if (categoryName) {
      serviceCategories = [categoryName];
      displayedServices = themeServices.filter(s => s.category === categoryName);
    }
  }

  // Filter Deals
  let displayedPackages = themePackages;
  let packageTitle = 'Premium Grooming Deals & Packages';
  let showCategories = false;

  if (page === 'deals' && gender === 'womens') {
    showCategories = true;
    packageTitle = 'Deals & Packages';
  } else if (page === 'deals' && gender === 'mens') {
    showCategories = true;
    packageTitle = 'Premium Deals';
  }

  if (page.startsWith('deals-')) {
    const dealSlug = page.replace('deals-', '');
    const dealSlugMap: Record<string, string> = {
      // Womens
      'bridal': 'Bridal & Wedding Package',
      'day': 'Day Specific Deals',
      'spa': 'Premium SPA Package',
      'winter': 'Winter Special Series',
      'other': 'Other Deals',
      // Mens
      'tiered': 'TIERED GROOMING PACKAGES',
      'themed': 'THEMED PACKAGES',
      'exclusive': 'EXCLUSIVE DEALS'
    };
    const categoryName = dealSlugMap[dealSlug];
    if (categoryName) {
       displayedPackages = themePackages.filter(p => p.category === categoryName);
       packageTitle = categoryName;
    }
  }

  const dealCategories = gender === 'womens' ? [
    { id: 'deals-bridal', label: 'Bridal & Wedding', icon: Heart },
    { id: 'deals-day', label: 'Day Specific', icon: Sun },
    { id: 'deals-spa', label: 'Premium SPA', icon: SparklesIcon },
    { id: 'deals-winter', label: 'Winter Series', icon: Snowflake },
    { id: 'deals-other', label: 'Other Deals', icon: Tag },
  ] : [
    { id: 'deals-tiered', label: 'TIERED GROOMING PACKAGES', icon: Award },
    { id: 'deals-themed', label: 'THEMED PACKAGES', icon: Star },
    { id: 'deals-exclusive', label: 'EXCLUSIVE DEALS', icon: Tag },
  ];

  // Filter Vouchers
  let displayedVouchers = SERVICE_VOUCHERS.filter(v => !v.gender || v.gender === gender);
  let voucherTitle = 'Vouchers';

  if (page.startsWith('vouchers-')) {
    const voucherSlug = page.replace('vouchers-', '');
    if (voucherSlug) {
      const specificVoucher = displayedVouchers.find(v => v.id === voucherSlug);
      if (specificVoucher) {
         displayedVouchers = [specificVoucher];
         voucherTitle = specificVoucher.title;
      } else {
         displayedVouchers = displayedVouchers.filter(v => v.category === voucherSlug);
         const titleMap: Record<string, string> = {
            'spa': 'Relaxation & Spa',
            'face': 'Facial & Glow',
            'hair': 'Hair & Styling',
            'essentials': 'Daily Essentials',
            'student': 'Student Specials'
         };
         voucherTitle = titleMap[voucherSlug] || 'Vouchers';
      }
    }
  }

  return (
    <div className={`min-h-screen ${themeBg} ${themeText} font-sans selection:bg-opacity-30 selection:bg-yellow-500 overflow-x-hidden`}>
      <Header 
        gender={gender} 
        onNavigate={setPage} 
        onSwitchGender={handleSwitch}
        currentPage={page}
        cartCount={cart.length}
        onOpenCart={() => setIsCartOpen(true)}
        onBookNow={startGeneralBooking}
      />
      
      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)}
        cartItems={cart}
        onRemoveItem={handleRemoveFromCart}
        onCheckout={handleStartCheckout}
        gender={gender}
      />

      <main className="min-h-screen">
        <AnimatePresence mode="wait">
          
          {/* HOME PAGE */}
          {page === 'home' && (
            <motion.div 
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Full Screen Hero with Background Image & 3D Overlay */}
              <section className="relative h-screen flex items-center justify-center overflow-hidden">
                 
                 {/* 1. Background Image Layer */}
                 <div className="absolute inset-0 z-0">
                    <motion.div 
                        initial={{ scale: 1.1 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 20, ease: "linear", repeat: Infinity, repeatType: "reverse" }}
                        className="w-full h-full bg-cover bg-center bg-no-repeat"
                        style={{ 
                            backgroundImage: `url(${gender === 'mens' ? MENS_HERO_IMAGE : WOMENS_HERO_IMAGE})`,
                            filter: 'brightness(0.35)' // Dim the image so text pops
                        }}
                    />
                 </div>

                 {/* 2. 3D Scene Layer (Optional Overlay) */}
                 <div className="absolute inset-0 z-10 opacity-60 pointer-events-none mix-blend-screen">
                    <Suspense fallback={null}>
                        <HomeScene gender={gender} />
                    </Suspense>
                 </div>
                 
                 {/* 3. Text & Content Layer */}
                 <div className="relative z-20 text-center text-white px-4 max-w-5xl">
                   <div className={`mb-6 tracking-[0.4em] text-sm uppercase font-bold ${themeAccent}`}>
                     <TextReveal text={gender === 'mens' ? 'Premium Mens Grooming' : 'Luxury Beauty & Makeup'} type="char" />
                   </div>
                   
                   <div className="mb-8">
                      <MaskReveal 
                        text={gender === 'mens' ? 'Master The Craft' : 'Radiate Confidence'}
                        className="text-6xl md:text-8xl font-serif font-bold text-white tracking-tight leading-tight"
                        delay={0.2}
                      />
                   </div>

                   <div className="text-xl md:text-2xl font-light mb-12 text-gray-200 max-w-2xl mx-auto">
                     <TextReveal 
                        text={gender === 'mens' ? 'Precision cuts and traditional shaves in a classic atmosphere.' : 'Expert makeup artistry and salon services for the modern woman.'}
                        type="word"
                        delay={0.6}
                     />
                   </div>

                   <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 1.1 }}
                   >
                     <Button gender={gender} onClick={startGeneralBooking} className="text-lg px-8 py-4">
                        <Calendar size={20} className="inline mr-2" /> Book Appointment
                     </Button>
                   </motion.div>
                 </div>
              </section>

              {/* Quick Features */}
              <ScrollReveal className="py-20 px-4 max-w-7xl mx-auto">
                <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {[
                    { icon: Clock, label: "Today's Deals", action: () => setPage('deals') },
                    { icon: Tag, label: "Services", action: () => setPage('services') },
                    { icon: Gift, label: "Vouchers", action: () => setPage('vouchers') },
                    { icon: Star, label: "Top Rated", action: () => setPage('about') },
                  ].map((item, idx) => (
                    <StaggerItem key={idx}>
                        <motion.div 
                        whileHover={{ y: -10, transition: { duration: 0.2 } }}
                        onClick={item.action}
                        className={`p-8 rounded-2xl cursor-pointer flex flex-col items-center justify-center text-center border border-gray-800 bg-neutral-900/50 hover:bg-neutral-800 hover:border-gray-600 transition-all group`}
                        >
                        <item.icon size={32} className={`mb-4 ${themeAccent} group-hover:scale-110 transition-transform`} />
                        <span className="font-bold text-gray-200">{item.label}</span>
                        </motion.div>
                    </StaggerItem>
                  ))}
                </StaggerContainer>
              </ScrollReveal>
              
              {/* Featured Vouchers Preview */}
              <section className="py-20 bg-neutral-950 relative overflow-hidden">
                 <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
                    <ScrollReveal className="flex justify-between items-end mb-12 px-2">
                      <div>
                        <h2 className={`text-4xl font-serif font-bold ${themeAccent} mb-2`}><MaskReveal text="Exclusive Vouchers" /></h2>
                        <p className="text-gray-400">Gift yourself or loved ones with our premium packages</p>
                      </div>
                      <button onClick={() => setPage('vouchers')} className="hidden md:flex items-center text-sm text-white hover:text-yellow-500 transition-colors uppercase tracking-widest font-bold kinetic-underline">
                        View All <ArrowRight size={16} className="ml-2"/>
                      </button>
                    </ScrollReveal>

                    <div className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory -mx-4 px-4 md:mx-0 md:px-0 no-scrollbar">
                       {SERVICE_VOUCHERS.filter(v => v.gender === gender).map((voucher, i) => (
                          <ScrollReveal 
                            key={voucher.id} 
                            delay={i * 0.1}
                            className="min-w-[85vw] sm:min-w-[60vw] md:min-w-[400px] snap-center bg-neutral-900 border border-gray-800 rounded-2xl overflow-hidden group flex flex-col hover:border-gray-600 transition-colors"
                          >
                             {/* Decorative Header with Image Support */}
                             <div className={`h-48 relative overflow-hidden flex items-center justify-center ${gender === 'mens' ? 'bg-gradient-to-br from-neutral-800 to-black' : 'bg-gradient-to-br from-neutral-800 to-black'}`}>
                                {voucher.image ? (
                                    <>
                                        <img src={voucher.image} alt={voucher.title} className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-110 transition-transform duration-700" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/40 to-transparent"></div>
                                    </>
                                ) : (
                                    <>
                                        <div className={`absolute inset-0 opacity-10 ${gender === 'mens' ? 'bg-yellow-500' : 'bg-pink-500'}`}></div>
                                        <Gift size={56} className={`${themeAccent} opacity-90 z-10 drop-shadow-lg group-hover:scale-110 transition-transform duration-500`} />
                                        <div className={`absolute -bottom-6 -right-6 font-serif text-8xl font-bold opacity-5 ${themeText}`}>GIFT</div>
                                    </>
                                )}
                             </div>
                             
                             <div className="p-8 flex-1 flex flex-col">
                                <h3 className="font-bold text-2xl mb-2 text-white">{voucher.title}</h3>
                                <p className="text-sm text-gray-500 mb-6 italic">Valid for: {voucher.validity}</p>
                                
                                <ul className="space-y-2 mb-8 flex-1">
                                    {voucher.services.slice(0, 3).map((s, i) => (
                                       <li key={i} className="text-sm text-gray-300 flex items-start">
                                          <span className={`mr-3 mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 ${gender === 'mens' ? 'bg-mens-accent' : 'bg-womens-accent'}`}></span>
                                          <span className="truncate">{s}</span>
                                       </li>
                                    ))}
                                    {voucher.services.length > 3 && <li className="text-xs text-gray-500 pl-5 italic">+ {voucher.services.length - 3} more services</li>}
                                </ul>

                                <div className="flex justify-between items-center mt-auto pt-6 border-t border-gray-800">
                                    <FloatingElement delay={0.2}>
                                        <div>
                                        <span className="text-xs text-gray-500 block uppercase tracking-wider mb-1">Price</span>
                                        <span className={`font-bold text-2xl ${themeAccent}`}>
                                           <GradientText text={`Rs. ${voucher.price.toLocaleString()}`} className={`${gender === 'mens' ? 'from-white via-yellow-200 to-yellow-500' : 'from-white via-pink-200 to-pink-500'}`} />
                                        </span>
                                        </div>
                                    </FloatingElement>
                                    <Button gender={gender} onClick={() => handleAddToCart(voucher)} className="text-xs px-6 py-3">
                                       <ShoppingCart size={16} className="mr-2" /> Add
                                    </Button>
                                </div>
                             </div>
                          </ScrollReveal>
                       ))}
                    </div>

                    <div className="text-center mt-8 md:hidden">
                       <Button variant="outline" gender={gender} onClick={() => setPage('vouchers')}>View All Vouchers</Button>
                    </div>
                 </div>
              </section>

              {/* Reviews Section (Shared Component Structure) */}
              {(gender === 'womens' || gender === 'mens') && (
                  <section className="py-20 bg-black border-t border-gray-900">
                      <div className="max-w-7xl mx-auto px-4 md:px-8">
                          <ScrollReveal className="text-center mb-12">
                             <h2 className={`text-4xl font-serif font-bold ${themeAccent} mb-4`}><MaskReveal text="Client Love" /></h2>
                             <p className="text-gray-400">What our clients have to say about us.</p>
                          </ScrollReveal>

                          <StaggerContainer className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-8 -mx-4 px-4 md:mx-0 md:px-0 no-scrollbar">
                              {(gender === 'womens' ? WOMENS_REVIEWS : MENS_REVIEWS).map((review) => (
                                  <StaggerItem key={review.id} className="min-w-[85vw] sm:min-w-[400px] snap-center">
                                      <div className="bg-neutral-900 border border-gray-800 p-8 rounded-2xl h-full flex flex-col hover:border-gray-600 transition-colors">
                                          <div className="flex mb-4">
                                              {[...Array(5)].map((_, i) => (
                                                  <Star key={i} size={16} className={`${i < review.rating ? (gender === 'mens' ? 'text-yellow-500 fill-yellow-500' : 'text-pink-500 fill-pink-500') : 'text-gray-700'} mr-1`} />
                                              ))}
                                          </div>
                                          <p className="text-gray-300 italic mb-6 flex-1 leading-relaxed">"{review.text}"</p>
                                          <div className="flex items-center mt-auto">
                                              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold mr-3 border ${gender === 'mens' ? 'bg-yellow-900/30 text-yellow-500 border-yellow-500/20' : 'bg-pink-900/30 text-pink-500 border-pink-500/20'}`}>
                                                  {review.name.charAt(0)}
                                              </div>
                                              <div>
                                                  <p className="text-white font-bold text-sm">{review.name}</p>
                                                  <p className={`${gender === 'mens' ? 'text-yellow-500' : 'text-pink-500'} text-xs`}>Verified Client</p>
                                              </div>
                                          </div>
                                      </div>
                                  </StaggerItem>
                              ))}
                          </StaggerContainer>
                      </div>
                  </section>
              )}
              
              {/* Gift Section */}
              <section className="py-24 bg-neutral-900 border-t border-gray-800">
                <ScrollReveal className="max-w-4xl mx-auto px-4 text-center">
                   <h2 className={`text-4xl font-serif font-bold mb-6 ${themeAccent}`}><MaskReveal text="Gift Someone a Salon Experience" /></h2>
                   <p className="text-gray-400 mb-10 max-w-lg mx-auto text-lg leading-relaxed"><TextReveal text="Vouchers are prepaid and can be redeemed for any service. Perfect for birthdays, weddings, or just because." type="word" /></p>
                   <Button gender={gender} onClick={() => setPage('vouchers')} variant="outline" className="text-lg px-8 py-4">
                      <Gift size={20} className="mr-3 inline" /> Buy a Voucher
                   </Button>
                   <p className="text-xs text-gray-600 mt-6">Vouchers are purchased online. Appointments are booked separately.</p>
                </ScrollReveal>
              </section>

            </motion.div>
          )}

          {/* SERVICES PAGE */}
          {page.startsWith('services') && (
             <motion.div 
               key="services" 
               initial={{ opacity: 0 }} 
               animate={{ opacity: 1 }}
               className="max-w-7xl mx-auto px-4 py-24"
             >
                <ScrollReveal className="text-center mb-16">
                   <h2 className={`text-5xl font-serif font-bold mb-6 ${themeAccent}`}>
                      <MaskReveal text={page === 'services' ? 'Our Complete Menu' : serviceCategories[0]} />
                   </h2>
                   <p className="text-gray-400 max-w-2xl mx-auto mb-4 text-lg">Explore our extensive range of services designed for your care.</p>
                   <p className="text-xs text-gray-500 uppercase tracking-widest border-t border-gray-800 pt-4 inline-block">Pay at Salon</p>
                </ScrollReveal>
                
                {serviceCategories.map((category) => {
                  const categoryServices = displayedServices.filter(s => s.category === category);
                  if (categoryServices.length === 0) return null;

                  return (
                    <div key={category} className="mb-20 last:mb-0">
                      {page === 'services' && (
                        <h3 className={`text-3xl font-serif font-bold mb-8 px-1 border-l-4 pl-6 ${gender === 'mens' ? 'border-mens-accent text-white' : 'border-womens-accent text-white'}`}>{category}</h3>
                      )}
                      
                      <StaggerContainer className="flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 overflow-x-auto md:overflow-visible pb-8 md:pb-0 snap-x snap-mandatory md:snap-none -mx-4 px-4 md:mx-0 md:px-0 no-scrollbar">
                         {categoryServices.map(service => (
                            <StaggerItem key={service.id} className="min-w-[85vw] sm:min-w-[60vw] md:min-w-0 snap-center h-full">
                                <div className="flex flex-col sm:flex-row bg-neutral-900 rounded-2xl overflow-hidden border border-gray-800 hover:border-gray-600 transition-colors h-full group">
                                {service.image && (
                                    <img src={service.image} alt={service.name} className="w-full sm:w-1/3 object-cover h-48 sm:h-auto group-hover:scale-105 transition-transform duration-700" />
                                )}
                                <div className={`p-8 flex flex-col justify-center flex-1 ${!service.image ? 'w-full' : ''}`}>
                                    <div className="flex justify-between items-start mb-3">
                                        <h3 className="font-bold text-xl text-white leading-tight">{service.name}</h3>
                                        <FloatingElement delay={0.2}><span className={`font-bold whitespace-nowrap ml-3 text-lg ${themeAccent}`}>Rs. {service.price}</span></FloatingElement>
                                    </div>
                                    <p className="text-sm text-gray-400 mb-6 flex-1">{service.description}</p>
                                    <div className="flex items-center justify-between mt-auto">
                                        {service.durationMin > 0 && <p className="text-xs text-gray-500 flex items-center"><Clock size={12} className="mr-1"/> {service.durationMin} mins</p>}
                                        <Button gender={gender} onClick={startGeneralBooking} className="text-xs px-5 py-2 flex items-center">
                                        <Calendar size={14} className="mr-2" /> Book
                                        </Button>
                                    </div>
                                </div>
                                </div>
                            </StaggerItem>
                         ))}
                      </StaggerContainer>
                    </div>
                  );
                })}
             </motion.div>
          )}

           {/* DEALS PAGE */}
           {(page === 'deals' || page.startsWith('deals-')) && (
             <motion.div 
               key="deals" 
               initial={{ opacity: 0 }} 
               animate={{ opacity: 1 }}
               className="max-w-7xl mx-auto px-4 py-24"
             >
                <ScrollReveal className="text-center mb-16">
                   <h2 className={`text-5xl font-serif font-bold mb-6 ${themeAccent}`}><MaskReveal text={packageTitle} /></h2>
                   <p className="text-gray-400 max-w-2xl mx-auto mb-4 text-lg">
                     {showCategories ? "Select a category to view our exclusive deals." : "These are bundled services designed for a complete grooming experience."}
                   </p>
                   {!showCategories && <p className="text-xs text-gray-500 uppercase tracking-widest border-t border-gray-800 pt-4 inline-block">Pay at Salon</p>}
                </ScrollReveal>
                
                {showCategories ? (
                   <StaggerContainer triggerOnMount={true} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {dealCategories.map((cat, i) => (
                        <StaggerItem key={cat.id}>
                          <div
                             onClick={() => setPage(cat.id)}
                             className="bg-neutral-900 border border-gray-800 hover:border-gray-600 p-10 rounded-3xl cursor-pointer transition-all hover:scale-[1.02] group h-full"
                          >
                             <cat.icon size={56} className={`mb-6 ${themeAccent} group-hover:text-white transition-colors`} />
                             <h3 className="text-2xl font-bold text-white mb-3">{cat.label}</h3>
                             <p className="text-gray-400 text-sm font-medium flex items-center">View Packages <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" /></p>
                          </div>
                        </StaggerItem>
                      ))}
                   </StaggerContainer>
                ) : (
                  displayedPackages.length > 0 ? (
                    <StaggerContainer triggerOnMount={true} className="flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-8 overflow-x-auto md:overflow-visible pb-8 md:pb-0 snap-x snap-mandatory md:snap-none -mx-4 px-4 md:mx-0 md:px-0 no-scrollbar">
                      {displayedPackages.map((pkg, idx) => (
                        <StaggerItem key={pkg.id} className="min-w-[85vw] sm:min-w-[60vw] md:min-w-0 snap-center">
                            <div className={`rounded-3xl border bg-neutral-900 flex flex-col h-full overflow-hidden ${idx % 2 === 0 ? 'border-gray-800' : (gender === 'mens' ? 'border-mens-accent/40 bg-neutral-900/80' : 'border-womens-accent/40 bg-neutral-900/80')}`}>
                            {pkg.image ? (
                                <div className="h-56 relative w-full overflow-hidden group">
                                    <img src={pkg.image} alt={pkg.name} className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-transparent to-transparent opacity-80" />
                                </div>
                            ) : (
                                <div className="pt-10 px-10">
                                    <PackageIcon size={40} className={`mb-4 ${themeAccent}`} />
                                </div>
                            )}
                            
                            <div className={`p-8 flex flex-col flex-1 ${!pkg.image ? 'pt-0' : ''}`}>
                                <div className="mb-6">
                                    {!pkg.image && <PackageIcon size={40} className={`mb-4 ${themeAccent}`} />}
                                    <h3 className="text-2xl font-bold text-white leading-tight min-h-[3rem] flex items-center">{pkg.name}</h3>
                                </div>
                                <FloatingElement><div className={`text-3xl font-serif font-bold mb-6 ${themeAccent}`}>{pkg.price}</div></FloatingElement>
                                
                                <div className="flex-1 mb-8">
                                    <ul className="space-y-3">
                                    {pkg.items.slice(0, 5).map((item, i) => (
                                        <li key={i} className="flex items-start text-sm text-gray-300">
                                        <Check size={16} className={`mr-3 mt-0.5 flex-shrink-0 ${themeAccent}`} /> 
                                        <span className="leading-tight">{item}</span>
                                        </li>
                                    ))}
                                    {pkg.items.length > 5 && (
                                        <li className="text-xs text-gray-500 pl-7 italic">+ {pkg.items.length - 5} more items</li>
                                    )}
                                    </ul>
                                </div>
                                
                                <Button gender={gender} fullWidth onClick={() => startDealBooking(pkg.id)} className="py-4 mt-auto">
                                    <Calendar size={18} className="inline mr-2" /> Book Now
                                </Button>
                            </div>
                            </div>
                        </StaggerItem>
                      ))}
                    </StaggerContainer>
                  ) : (
                    <div className="text-center text-gray-500 py-12">
                        <p>No packages found in this category.</p>
                        <button onClick={() => setPage('deals')} className={`mt-4 underline ${themeAccent}`}>View All Packages</button>
                     </div>
                  )
                )}
             </motion.div>
          )}

          {/* BOOKING PAGE */}
          {page === 'book' && (
            <motion.div key="book" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
               <BookingForm 
                  gender={gender} 
                  initialType={bookingConfig.type} 
                  initialId={bookingConfig.id} 
               />
            </motion.div>
          )}

          {/* VOUCHERS PAGE */}
          {(page === 'vouchers' || page.startsWith('vouchers-')) && (
             <motion.div key={page} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="max-w-7xl mx-auto px-4 py-24">
                <ScrollReveal className="text-center mb-16">
                   <h2 className={`text-5xl font-serif font-bold mb-6 ${themeAccent}`}><MaskReveal text={voucherTitle} /></h2>
                   <p className="text-gray-400 max-w-2xl mx-auto mb-4 text-lg">
                      Purchase instantly online and delivered digitally. Perfect for gifts or self-care.
                   </p>
                   <p className="text-xs text-gray-500 uppercase tracking-widest border-t border-gray-800 pt-4 inline-block">Pay Online - Redeem Later</p>
                </ScrollReveal>

                {/* Service Vouchers Grid */}
                <h3 className="text-2xl font-bold text-white mb-8 border-b border-gray-800 pb-4"><TextReveal text="Gift & Service Vouchers" /></h3>
                {displayedVouchers.length > 0 ? (
                  <StaggerContainer triggerOnMount={true} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {displayedVouchers.map((v) => (
                        <StaggerItem key={v.id}>
                            <div className={`flex flex-col rounded-3xl border bg-neutral-900 hover:scale-[1.01] transition-transform ${gender === 'mens' ? 'border-gray-800 hover:border-mens-accent/50' : 'border-gray-800 hover:border-womens-accent/50'} h-full overflow-hidden group`}>
                            {v.image && (
                                <div className="h-48 w-full overflow-hidden relative">
                                    <img src={v.image} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={v.title} />
                                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 to-transparent opacity-80" />
                                </div>
                            )}
                            <div className="p-8 flex flex-col flex-1">
                                <div className="flex justify-between items-start mb-6">
                                    <h3 className="text-2xl font-bold text-white leading-tight">{v.title}</h3>
                                    <Gift size={24} className={`${themeAccent}`} />
                                </div>
                                
                                <FloatingElement delay={0.2}><div className={`text-3xl font-serif font-bold mb-3 ${themeAccent}`}>PKR {v.price}</div></FloatingElement>
                                <div className="text-xs text-gray-500 mb-6 flex items-center uppercase tracking-wider">
                                    <Clock size={12} className="mr-2" /> Validity: {v.validity}
                                </div>

                                <div className="bg-black/30 p-5 rounded-2xl mb-6 border border-gray-800/50">
                                    <p className="text-xs text-gray-400 uppercase font-bold mb-3 tracking-widest">Includes:</p>
                                    <ul className="space-y-2">
                                        {v.services.map((svc, i) => (
                                            <li key={i} className="text-sm text-gray-300 flex items-start">
                                            <span className={`mr-3 mt-1.5 w-1 h-1 rounded-full ${gender === 'mens' ? 'bg-mens-accent' : 'bg-womens-accent'}`}></span>
                                            {svc}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="mt-auto">
                                    <p className="text-xs text-gray-500 mb-6 italic">Perfect for: {v.perfectFor}</p>
                                    <Button 
                                        gender={gender} 
                                        fullWidth 
                                        onClick={() => handleAddToCart(v)}
                                        className="flex items-center justify-center gap-2 py-4"
                                    >
                                        <ShoppingCart size={18} />
                                        Add to Cart
                                    </Button>
                                </div>
                            </div>
                            </div>
                        </StaggerItem>
                    ))}
                  </StaggerContainer>
                ) : (
                  <div className="text-center text-gray-500 py-12">
                     <p>No vouchers found.</p>
                     <button onClick={() => setPage('vouchers')} className={`mt-4 underline ${themeAccent}`}>View All Vouchers</button>
                  </div>
                )}
             </motion.div>
          )}

          {page === 'about' && (
             <motion.div key="about" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-5xl mx-auto px-4 py-24">
                <ScrollReveal className="text-center mb-16">
                   <h2 className={`text-5xl font-serif font-bold mb-8 text-white`}>
                       <MaskReveal text="Our Story" />
                   </h2>
                   <div className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed mb-16">
                     <TextReveal 
                        text="Founded with a vision to redefine grooming and beauty, Sumaira n Shan Studio blends traditional craftsmanship with modern luxury. We believe in the power of a distinct look. Whether you seek the sharp precision of a master barber or the transformative touch of a makeup artist, our dual-studio concept ensures a tailored experience for everyone." 
                        type="word"
                        delay={0.2}
                     />
                   </div>
                </ScrollReveal>

                {(gender === 'womens' || gender === 'mens') && (
                    <section className="mb-20">
                         <h3 className={`text-3xl font-serif font-bold text-center mb-12 ${themeAccent}`}><TextReveal text="What Our Clients Say" /></h3>
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                             {(gender === 'womens' ? WOMENS_REVIEWS : MENS_REVIEWS).map((review) => (
                                 <ScrollReveal key={review.id} className="bg-neutral-900 p-8 rounded-xl border border-gray-800 hover:border-gray-700 transition-colors">
                                     <div className="flex justify-between items-start mb-4">
                                         <div>
                                             <h4 className="font-bold text-white">{review.name}</h4>
                                             <div className="flex mt-1">
                                                 {[...Array(5)].map((_, i) => (
                                                     <Star key={i} size={14} className={`${i < review.rating ? (gender === 'mens' ? 'text-yellow-500 fill-yellow-500' : 'text-pink-500 fill-pink-500') : 'text-gray-700'} mr-0.5`} />
                                                 ))}
                                             </div>
                                         </div>
                                         <div className={`${gender === 'mens' ? 'text-yellow-900/50' : 'text-pink-900/50'}`}>
                                            <Award size={24} />
                                         </div>
                                     </div>
                                     <p className="text-gray-400 italic text-sm leading-relaxed">"{review.text}"</p>
                                 </ScrollReveal>
                             ))}
                         </div>
                    </section>
                )}
             </motion.div>
          )}

          {page === 'contact' && (
             <motion.div key="contact" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-6xl mx-auto px-4 py-24">
                <ScrollReveal>
                   <h2 className={`text-5xl font-serif font-bold mb-16 text-center text-white`}>
                       <MaskReveal text="Get In Touch" />
                   </h2>
                </ScrollReveal>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                   <div className="space-y-8">
                      <div className="bg-neutral-900 border border-gray-800 rounded-3xl shadow-xl overflow-hidden h-96">
                         <iframe 
                            src="https://maps.google.com/maps?q=231-A%20Block%2C%203rd%20Gate%2C%20Central%20Park%2C%20Near%20Central%20Park%20Teaching%20Hospital%2C%20Lahore&t=&z=15&ie=UTF8&iwloc=&output=embed" 
                            width="100%" 
                            height="100%" 
                            style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg)' }} 
                            allowFullScreen 
                            loading="lazy"
                         ></iframe>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                         <div className="bg-neutral-900 p-8 rounded-2xl border border-gray-800">
                            <div className={`mb-6 ${themeAccent}`}><MapPin size={32} /></div>
                            <h3 className="font-bold text-white mb-2 text-lg"><TextReveal text="Visit Us" /></h3>
                            <p className="text-gray-400">231-A Block, 3rd Gate, Central Park, Near Central Park Teaching Hospital, Lahore</p>
                         </div>
                         <div className="bg-neutral-900 p-8 rounded-2xl border border-gray-800">
                            <div className={`mb-6 ${themeAccent}`}><Phone size={32} /></div>
                            <h3 className="font-bold text-white mb-2 text-lg"><TextReveal text="Call Us" /></h3>
                            <p className="text-gray-400">{contactNumber}<br/>hello@snssaloon.com</p>
                         </div>
                      </div>
                   </div>
                   <div className="bg-neutral-900 p-10 rounded-3xl border border-gray-800 h-fit">
                      <h3 className={`text-3xl font-bold mb-8 ${themeAccent}`}><TextReveal text="Send a Message" /></h3>
                      <form className="space-y-6">
                         <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2 uppercase tracking-wide">Your Name</label>
                            <input type="text" className="w-full p-4 bg-black border border-gray-700 rounded-xl text-white focus:border-yellow-500 outline-none transition-colors" placeholder="John Doe" />
                         </div>
                         <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2 uppercase tracking-wide">Email Address</label>
                            <input type="email" className="w-full p-4 bg-black border border-gray-700 rounded-xl text-white focus:border-yellow-500 outline-none transition-colors" placeholder="john@example.com" />
                         </div>
                         <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2 uppercase tracking-wide">Message</label>
                            <textarea className="w-full p-4 bg-black border border-gray-700 rounded-xl text-white focus:border-yellow-500 outline-none h-40 transition-colors" placeholder="How can we help you?"></textarea>
                         </div>
                         <Button gender={gender} fullWidth type="button" className="py-4 text-lg">Send Message</Button>
                      </form>
                   </div>
                </div>
             </motion.div>
          )}

        </AnimatePresence>
      </main>

      <WhatsAppWidget gender={gender} />
      <Footer gender={gender} />
    </div>
  );
};

export default App;