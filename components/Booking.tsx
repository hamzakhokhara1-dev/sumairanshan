import React, { useState, useEffect } from 'react';
import { Gender, Service, Booking, PurchasedVoucher, Package } from '../types';
import { MENS_SERVICES, WOMENS_SERVICES, VOUCHERS, MENS_PACKAGES, WOMENS_PACKAGES } from '../constants';
import { Button } from './Shared';
import { CheckCircle, Calendar, Clock, Tag, Info, Package as PackageIcon, ArrowLeft, User, Phone, Mail, FileText, Scissors } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ScrollReveal, StaggerContainer, StaggerItem, FloatingElement, MaskReveal, GradientText, TextReveal } from './TextAnimations';
import { supabase } from '../supabase';

interface BookingProps {
  gender: Gender;
  initialType?: 'service' | 'deal';
  initialId?: string;
}

const BookingForm: React.FC<BookingProps> = ({ gender, initialType = 'service', initialId }) => {
  // Determine initial step based on type
  // service -> Step 1 (Select Service)
  // deal -> Step 2 (Details) directly
  const [step, setStep] = useState(initialType === 'deal' ? 2 : 1);
  
  const [bookingData, setBookingData] = useState<Partial<Booking>>({
    gender,
    bookingType: initialType,
    serviceId: initialType === 'service' ? initialId : undefined,
    packageId: initialType === 'deal' ? initialId : undefined,
    date: new Date().toISOString().split('T')[0],
    time: '',
  });

  const [voucherCode, setVoucherCode] = useState('');
  const [voucherError, setVoucherError] = useState('');
  const [appliedVoucher, setAppliedVoucher] = useState<{code: string, amount: number, id?: string} | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createdBooking, setCreatedBooking] = useState<Booking | null>(null);
  const [agreed, setAgreed] = useState(false);

  // Data Sources
  const services = gender === 'mens' ? MENS_SERVICES : WOMENS_SERVICES;
  const packages = gender === 'mens' ? MENS_PACKAGES : WOMENS_PACKAGES;

  // Derived Info
  const selectedService = services.find(s => s.id === bookingData.serviceId);
  const selectedPackage = packages.find(p => p.id === bookingData.packageId);

  // Reset if gender changes (though likely component unmounts/remounts)
  useEffect(() => {
    setBookingData(prev => ({ ...prev, gender }));
  }, [gender]);

  const handleServiceSelect = (serviceId: string) => {
    setBookingData({ ...bookingData, serviceId, bookingType: 'service' });
    setStep(2);
  };

  const handleVoucherApply = async () => {
    setVoucherError('');
    if (!voucherCode.trim()) return;

    try {
        // 1. Check purchased vouchers from Supabase
        const { data: vouchers, error } = await supabase
            .from('purchased_vouchers')
            .select('*')
            .eq('code', voucherCode.trim())
            .eq('status', 'unused');

        if (error) throw error;

        if (vouchers && vouchers.length > 0) {
            const voucherData = vouchers[0] as PurchasedVoucher;
            setAppliedVoucher({ code: voucherData.code, amount: voucherData.price, id: voucherData.id });
            return;
        }

        // 2. Check generic promo codes (fallback/legacy)
        const promo = VOUCHERS.find(v => v.code === voucherCode.trim());
        if (promo) {
           // Calculation base depends on deal or service
           let basePrice = 0;
           if (bookingData.bookingType === 'deal' && selectedPackage) {
               basePrice = parseInt(selectedPackage.price.replace(/[^0-9]/g, ''));
           } else if (selectedService) {
               basePrice = selectedService.price;
           }

           const discount = promo.type === 'fixed' ? promo.value : (basePrice * promo.value / 100);
           setAppliedVoucher({ code: promo.code, amount: discount });
           return;
        }

        setVoucherError('Invalid or expired voucher code.');
    } catch (err) {
        console.error("Error checking voucher:", err);
        setVoucherError('Error validating voucher. Please try again.');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) {
        alert("Please accept the terms to proceed.");
        return;
    }
    
    setIsSubmitting(true);
    
    try {
        // Update voucher status if used (Supabase)
        if (appliedVoucher && appliedVoucher.id) {
            const { error: updateError } = await supabase
                .from('purchased_vouchers')
                .update({ status: 'redeemed' })
                .eq('id', appliedVoucher.id);
            
            if (updateError) {
                console.warn("Failed to mark voucher as redeemed:", updateError);
            }
        }

        let basePrice = 0;
        if (bookingData.bookingType === 'deal' && selectedPackage) {
            basePrice = parseInt(selectedPackage.price.replace(/[^0-9]/g, ''));
        } else if (selectedService) {
            basePrice = selectedService.price;
        }

        const discount = appliedVoucher ? appliedVoucher.amount : 0;
        const total = Math.max(0, basePrice - discount);

        // Save to Supabase
        const newBookingData = {
          ...bookingData,
          status: 'pending', // Default to pending for Admin review
          paymentStatus: 'unpaid',
          totalPrice: total,
          discountApplied: discount,
          voucherCode: appliedVoucher?.code || null,
          createdAt: new Date().toISOString()
        };
        
        const { data, error } = await supabase
            .from('bookings')
            .insert([newBookingData])
            .select();

        if (error) throw error;
        
        if (data && data.length > 0) {
            // Use the returned object which includes the generated ID
            const newBooking = data[0] as Booking;
            setCreatedBooking(newBooking);
        }
        
        setIsSubmitting(false);

    } catch (error) {
        console.error("Error creating booking:", error);
        alert("There was an error creating your booking. Please check your internet connection and try again.");
        setIsSubmitting(false);
    }
  };

  const accentColor = gender === 'mens' ? 'text-mens-accent' : 'text-womens-accent';
  const accentBg = gender === 'mens' ? 'bg-mens-accent' : 'bg-womens-accent';
  const borderColorSelected = gender === 'mens' ? 'border-mens-accent bg-mens-accent/10' : 'border-womens-accent bg-womens-accent/10';
  const borderColorDefault = 'border-gray-800 bg-gray-900 hover:border-gray-600';

  // Calculate Display Price
  let basePrice = 0;
  if (bookingData.bookingType === 'deal' && selectedPackage) {
      basePrice = parseInt(selectedPackage.price.replace(/[^0-9]/g, ''));
  } else if (selectedService) {
      basePrice = selectedService.price;
  }
  const discount = appliedVoucher ? appliedVoucher.amount : 0;
  const finalPrice = Math.max(0, basePrice - discount);

  if (createdBooking) {
    return (
      <div className="max-w-md mx-auto text-center py-20 px-4 animate-fade-in">
        <motion.div 
            initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring' }}
            className={`mx-auto w-20 h-20 rounded-full flex items-center justify-center mb-6 ${gender === 'mens' ? 'bg-mens-accent/20 text-mens-accent' : 'bg-womens-accent/20 text-womens-accent'}`}
        >
          <CheckCircle size={40} />
        </motion.div>
        <div className="mb-4">
             <GradientText text="Booking Confirmed!" className={`text-3xl font-bold font-serif ${gender === 'mens' ? 'from-white via-yellow-200 to-yellow-500' : 'from-white via-pink-200 to-pink-500'}`} />
        </div>
        <ScrollReveal>
        <div className="bg-neutral-900 p-6 rounded-xl border border-gray-800 mb-8 text-left">
            <p className="text-gray-400 text-xs uppercase tracking-widest mb-2"><TextReveal text="Booking Summary" type="char" /></p>
            {createdBooking.bookingType === 'deal' && selectedPackage ? (
                <div className="mb-4">
                    <span className={`inline-block px-2 py-1 rounded text-[10px] font-bold uppercase mb-1 ${accentBg} text-black`}>Deal</span>
                    <h3 className="text-xl font-bold text-white">{selectedPackage.name}</h3>
                </div>
            ) : selectedService ? (
                <div className="mb-4">
                    <span className="inline-block px-2 py-1 rounded text-[10px] font-bold uppercase mb-1 bg-gray-700 text-white">Service</span>
                    <h3 className="text-xl font-bold text-white">{selectedService.name}</h3>
                </div>
            ) : null}
            
            <div className="flex items-center text-gray-300 mb-2">
                <Calendar size={14} className="mr-2 opacity-70"/> 
                {new Date(createdBooking.date!).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </div>
            <div className="flex items-center text-gray-300">
                <Clock size={14} className="mr-2 opacity-70"/> 
                {createdBooking.time}
            </div>
            <div className="flex items-center text-gray-300 mt-2 border-t border-gray-800 pt-2">
                <span className="font-bold text-white">ID: {createdBooking.id?.toString().slice(0, 8)}...</span>
            </div>
        </div>
        </ScrollReveal>
        <p className="text-gray-400 mb-8 text-sm">A confirmation has been sent to your contact details. Please arrive 10 minutes early.</p>
        <Button gender={gender} onClick={() => window.location.reload()}>Book Another</Button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      {/* Simple Header */}
      <div className="text-center mb-10">
        <h2 className={`text-3xl font-bold font-serif mb-2 ${accentColor}`}>
            <MaskReveal text={bookingData.bookingType === 'deal' ? 'Secure Your Deal' : 'Book an Appointment'} />
        </h2>
        <p className="text-gray-400">
            {bookingData.bookingType === 'deal' 
                ? 'Complete your details to lock in this exclusive package.' 
                : 'Select a service and schedule your visit.'}
        </p>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
        className="bg-neutral-950 border border-gray-800 rounded-2xl shadow-xl overflow-hidden"
      >
        
        {/* STEP 1: SERVICE SELECTION (Only for General Booking) */}
        {step === 1 && bookingData.bookingType === 'service' && (
          <div className="p-6 md:p-10">
             <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-white"><TextReveal text="Select a Service" /></h3>
                <div className="text-xs text-gray-500 bg-gray-900 px-3 py-1 rounded-full border border-gray-800">Step 1 of 2</div>
             </div>
             
             {/* Categories Filter could go here, but listing all for simplicity as requested "Show list of services" */}
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
              {services.map(s => (
                <div 
                  key={s.id}
                  onClick={() => handleServiceSelect(s.id)}
                  className={`p-4 border rounded-xl cursor-pointer transition-all flex items-center space-x-4 hover:border-gray-600 ${bookingData.serviceId === s.id ? borderColorSelected : borderColorDefault}`}
                >
                  <div className="w-full">
                    <div className="flex justify-between items-start">
                        <h3 className="font-bold text-gray-100">{s.name}</h3>
                        <span className={`text-sm font-bold ${accentColor}`}>Rs. {s.price}</span>
                    </div>
                    <p className="text-xs text-gray-400 mt-1">{s.durationMin} min • {s.category}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* STEP 2: PERSONAL INFORMATION & DATE/TIME (Combined) */}
        {step === 2 && (
          <motion.div 
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
            className="flex flex-col md:flex-row"
          >
            {/* Left Panel: Form */}
            <div className="flex-1 p-6 md:p-10 border-b md:border-b-0 md:border-r border-gray-800">
                <div className="mb-6">
                    {bookingData.bookingType === 'service' && (
                        <button onClick={() => setStep(1)} className="text-sm text-gray-500 hover:text-white flex items-center mb-4 transition-colors">
                            <ArrowLeft size={14} className="mr-1" /> Change Service
                        </button>
                    )}
                    <h3 className="text-xl font-bold text-white mb-1"><TextReveal text="Personal Information" /></h3>
                    <p className="text-xs text-gray-500">Please provide your details to confirm booking.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Read-Only Selection Display */}
                    <div className="bg-neutral-900/50 p-4 rounded-lg border border-gray-800 mb-6">
                        {bookingData.bookingType === 'deal' && selectedPackage && (
                            <div className="flex items-start">
                                <PackageIcon size={20} className={`${accentColor} mt-1 mr-3 flex-shrink-0`} />
                                <div>
                                    <p className="text-xs text-gray-400 uppercase tracking-widest font-bold">Selected Deal</p>
                                    <h4 className="font-bold text-white">{selectedPackage.name}</h4>
                                    <p className="text-xs text-gray-500 mt-1">Includes: {selectedPackage.items.join(', ')}</p>
                                    <div className="mt-2 text-xs text-green-500 flex items-center">
                                        <CheckCircle size={10} className="mr-1"/> Pre-selected & Locked
                                    </div>
                                </div>
                            </div>
                        )}
                        {bookingData.bookingType === 'service' && selectedService && (
                            <div className="flex items-start">
                                <Scissors size={20} className={`${accentColor} mt-1 mr-3 flex-shrink-0`} />
                                <div>
                                    <p className="text-xs text-gray-400 uppercase tracking-widest font-bold">Selected Service</p>
                                    <h4 className="font-bold text-white">{selectedService.name}</h4>
                                    <p className="text-xs text-gray-500 mt-1">{selectedService.durationMin} mins</p>
                                </div>
                            </div>
                        )}
                    </div>

                    <ScrollReveal>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="md:col-span-2">
                                <label className="block text-xs font-medium text-gray-400 mb-1.5 ml-1">Full Name *</label>
                                <div className="relative group">
                                    <User size={16} className="absolute left-3 top-3 text-gray-600 transition-colors group-focus-within:text-white" />
                                    <input 
                                        type="text" 
                                        required 
                                        className="w-full pl-10 p-2.5 bg-black border border-gray-800 rounded-lg text-white focus:border-white focus:ring-1 focus:ring-white outline-none transition-all text-sm"
                                        placeholder="Enter your name"
                                        onChange={e => setBookingData({...bookingData, customerName: e.target.value})}
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-gray-400 mb-1.5 ml-1">Phone Number *</label>
                                <div className="relative group">
                                    <Phone size={16} className="absolute left-3 top-3 text-gray-600 transition-colors group-focus-within:text-white" />
                                    <input 
                                        type="tel" 
                                        required 
                                        className="w-full pl-10 p-2.5 bg-black border border-gray-800 rounded-lg text-white focus:border-white focus:ring-1 focus:ring-white outline-none transition-all text-sm"
                                        placeholder="0300-1234567"
                                        onChange={e => setBookingData({...bookingData, customerPhone: e.target.value})}
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-gray-400 mb-1.5 ml-1">Email Address</label>
                                <div className="relative group">
                                    <Mail size={16} className="absolute left-3 top-3 text-gray-600 transition-colors group-focus-within:text-white" />
                                    <input 
                                        type="email" 
                                        className="w-full pl-10 p-2.5 bg-black border border-gray-800 rounded-lg text-white focus:border-white focus:ring-1 focus:ring-white outline-none transition-all text-sm"
                                        placeholder="email@example.com"
                                        onChange={e => setBookingData({...bookingData, customerEmail: e.target.value})}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                            <div>
                                <label className="block text-xs font-medium text-gray-400 mb-1.5 ml-1">Preferred Date *</label>
                                <div className="relative">
                                    <input 
                                        type="date" 
                                        required
                                        min={new Date().toISOString().split('T')[0]}
                                        className="w-full p-2.5 bg-black border border-gray-800 rounded-lg text-white focus:border-white focus:ring-1 focus:ring-white outline-none transition-all text-sm"
                                        value={bookingData.date}
                                        onChange={e => setBookingData({...bookingData, date: e.target.value})}
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-gray-400 mb-1.5 ml-1">Preferred Time *</label>
                                <select 
                                    required
                                    className="w-full p-2.5 bg-black border border-gray-800 rounded-lg text-white focus:border-white focus:ring-1 focus:ring-white outline-none transition-all text-sm"
                                    value={bookingData.time}
                                    onChange={e => setBookingData({...bookingData, time: e.target.value})}
                                >
                                    <option value="">Select Time</option>
                                    <option value="10:00">10:00 AM</option>
                                    <option value="11:00">11:00 AM</option>
                                    <option value="12:00">12:00 PM</option>
                                    <option value="13:00">01:00 PM</option>
                                    <option value="14:00">02:00 PM</option>
                                    <option value="15:00">03:00 PM</option>
                                    <option value="16:00">04:00 PM</option>
                                    <option value="17:00">05:00 PM</option>
                                    <option value="18:00">06:00 PM</option>
                                    <option value="19:00">07:00 PM</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-medium text-gray-400 mb-1.5 ml-1">Special Notes</label>
                            <div className="relative group">
                                <FileText size={16} className="absolute left-3 top-3 text-gray-600 transition-colors group-focus-within:text-white" />
                                <textarea 
                                    className="w-full pl-10 p-2.5 bg-black border border-gray-800 rounded-lg text-white focus:border-white focus:ring-1 focus:ring-white outline-none transition-all text-sm h-20 resize-none"
                                    placeholder="Any allergies, requests, or specific needs?"
                                    onChange={e => setBookingData({...bookingData, notes: e.target.value})}
                                ></textarea>
                            </div>
                        </div>

                        <div className="flex items-start pt-2">
                            <input 
                                type="checkbox" 
                                id="consent"
                                className="mt-1 mr-2 cursor-pointer accent-current"
                                checked={agreed}
                                onChange={e => setAgreed(e.target.checked)}
                            />
                            <label htmlFor="consent" className="text-xs text-gray-400 cursor-pointer">
                                I confirm that the details provided are accurate and I agree to the <span className="underline hover:text-white">Terms of Service</span>.
                            </label>
                        </div>
                    </ScrollReveal>

                    <Button gender={gender} fullWidth type="submit" disabled={isSubmitting || !agreed} className="mt-4">
                        {isSubmitting ? 'Processing...' : 'Confirm Booking'}
                    </Button>
                </form>
            </div>

            {/* Right Panel: Summary */}
            <div className="w-full md:w-80 bg-neutral-900 p-6 md:p-10 flex flex-col">
                <h3 className="text-lg font-bold text-white mb-6"><TextReveal text="Booking Summary" type="char" /></h3>
                
                <div className="space-y-4 flex-1">
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Booking Type</span>
                        <span className="text-white capitalize">{bookingData.bookingType}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Date</span>
                        <span className="text-white">{bookingData.date || '--'}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Time</span>
                        <span className="text-white">{bookingData.time || '--'}</span>
                    </div>
                    
                    <div className="border-t border-gray-800 my-4 pt-4">
                        <div className="flex justify-between text-sm mb-2">
                            <span className="text-gray-400">Subtotal</span>
                            <span className="text-white">Rs. {basePrice.toLocaleString()}</span>
                        </div>
                        {appliedVoucher && (
                            <div className="flex justify-between text-sm text-green-500 mb-2">
                                <span>Voucher ({appliedVoucher.code})</span>
                                <span>- Rs. {appliedVoucher.amount.toLocaleString()}</span>
                            </div>
                        )}
                        <div className="flex justify-between text-lg font-bold mt-4 pt-4 border-t border-gray-800">
                            <span className="text-white">Total</span>
                            <span className={`${accentColor}`}>Rs. {finalPrice.toLocaleString()}</span>
                        </div>
                        <p className="text-[10px] text-gray-500 mt-2 text-right">Payable at Salon</p>
                    </div>
                </div>

                {/* Voucher Field */}
                <div className="mt-8 pt-6 border-t border-gray-800">
                    <label className="block text-xs font-medium text-gray-400 mb-2 flex items-center gap-1">
                        <Tag size={12} /> Gift Voucher / Promo
                    </label>
                    <div className="flex gap-2">
                        <input 
                            type="text" 
                            placeholder="CODE" 
                            className="flex-1 p-2 bg-black border border-gray-700 rounded-white text-white text-xs focus:border-white outline-none uppercase transition-colors"
                            value={voucherCode}
                            onChange={e => setVoucherCode(e.target.value.toUpperCase())}
                        />
                        <button 
                            type="button" 
                            onClick={handleVoucherApply}
                            className="px-3 py-2 bg-gray-800 text-gray-300 rounded text-xs hover:bg-gray-700 hover:text-white transition-colors"
                        >
                            Apply
                        </button>
                    </div>
                    {voucherError && <p className="text-red-500 text-[10px] mt-2">{voucherError}</p>}
                    {appliedVoucher && <p className="text-green-500 text-[10px] mt-2 flex items-center"><CheckCircle size={10} className="mr-1"/> Applied</p>}
                </div>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default BookingForm;