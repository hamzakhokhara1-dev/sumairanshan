import React, { useState } from 'react';
import { ServiceVoucher, PurchasedVoucher, Gender, CartItem } from '../types';
import { Button } from './Shared';
import { CheckCircle, CreditCard, Lock, Gift, ArrowLeft } from 'lucide-react';
import { MaskReveal, GradientText, ScrollReveal } from './TextAnimations';
import { supabase } from '../supabase';

interface VoucherCheckoutProps {
  items: CartItem[];
  gender: Gender;
  onClose: () => void;
  onSuccess: () => void;
}

const VoucherCheckout: React.FC<VoucherCheckoutProps> = ({ items, gender, onClose, onSuccess }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    buyerName: '',
    buyerEmail: '',
    buyerPhone: '',
    recipientName: '',
    message: ''
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [purchasedVouchers, setPurchasedVouchers] = useState<PurchasedVoucher[]>([]);

  const accentColor = gender === 'mens' ? 'text-mens-accent' : 'text-womens-accent';
  const totalPrice = items.reduce((sum, item) => sum + item.price, 0);
  
  const handlePurchase = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    try {
        // Simulate Payment Processing
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Generate Vouchers Data
        const newVouchersData = items.map(item => ({
          code: `V-${Math.random().toString(36).substr(2, 4).toUpperCase()}-${Math.random().toString(36).substr(2, 4).toUpperCase()}`,
          voucherId: item.id,
          voucherTitle: item.title,
          price: item.price,
          value: item.price,
          remainingBalance: item.price,
          buyerName: formData.buyerName,
          buyerEmail: formData.buyerEmail,
          buyerPhone: formData.buyerPhone,
          recipientName: formData.recipientName,
          message: formData.message,
          purchaseDate: new Date().toISOString(),
          expiryDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString(),
          status: 'unused',
          history: []
        }));

        // Save each voucher to Supabase
        const { data, error } = await supabase
            .from('purchased_vouchers')
            .insert(newVouchersData)
            .select();

        if (error) throw error;

        if (data) {
             setPurchasedVouchers(data as PurchasedVoucher[]);
        }
        
        setIsProcessing(false);
        setStep(2);

    } catch (error) {
        console.error("Error purchasing vouchers:", error);
        alert("Transaction failed. Please try again.");
        setIsProcessing(false);
    }
  };

  if (step === 2 && purchasedVouchers.length > 0) {
    return (
      <div className="max-w-2xl mx-auto py-12 px-4 text-center">
        <div className={`mx-auto w-20 h-20 rounded-full flex items-center justify-center mb-6 ${gender === 'mens' ? 'bg-mens-accent/20 text-mens-accent' : 'bg-womens-accent/20 text-womens-accent'}`}>
          <CheckCircle size={40} />
        </div>
        <div className="mb-2">
            <GradientText text="Purchase Successful!" className={`text-3xl font-bold font-serif ${gender === 'mens' ? 'from-white via-yellow-200 to-yellow-500' : 'from-white via-pink-200 to-pink-500'}`} />
        </div>
        <p className="text-gray-400 mb-8">We have generated {purchasedVouchers.length} vouchers and emailed them to {formData.buyerEmail}.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
           {purchasedVouchers.map(pv => (
             <ScrollReveal key={pv.id} className="bg-neutral-900 border border-gray-800 p-6 rounded-xl relative overflow-hidden text-left">
                <div className={`absolute top-0 left-0 w-1 h-full ${gender === 'mens' ? 'bg-mens-accent' : 'bg-womens-accent'}`}></div>
                <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">Code</p>
                <div className={`text-xl font-mono font-bold ${accentColor} tracking-widest mb-2`}>{pv.code}</div>
                <p className="text-white font-bold text-sm truncate">{pv.voucherTitle}</p>
                <p className="text-xs text-gray-400">Value: PKR {pv.price}</p>
             </ScrollReveal>
           ))}
        </div>

        <Button gender={gender} onClick={onSuccess}>Return to Store</Button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <button onClick={onClose} className="text-gray-400 hover:text-white flex items-center mb-6">
        <ArrowLeft size={16} className="mr-2" /> Back to Cart
      </button>

      <div className="bg-neutral-950 border border-gray-800 rounded-2xl shadow-xl overflow-hidden">
        <div className="p-6 md:p-8 border-b border-gray-800">
           <div className="flex items-start justify-between">
              <div>
                <h2 className={`text-2xl font-bold font-serif mb-2 ${accentColor}`}><MaskReveal text="Checkout" /></h2>
                <p className="text-gray-400 text-sm">Secure Payment for {items.length} Voucher{items.length !== 1 ? 's' : ''}</p>
              </div>
              <Lock className="text-gray-600" size={24} />
           </div>
        </div>

        <div className="p-6 md:p-8 grid md:grid-cols-2 gap-8">
           {/* Summary */}
           <div className="order-2 md:order-1">
              <h3 className="text-white font-bold mb-4 flex items-center"><Gift size={18} className="mr-2 text-gray-400" /> Order Summary</h3>
              <div className="bg-neutral-900 rounded-xl border border-gray-800 overflow-hidden">
                 <div className="max-h-60 overflow-y-auto p-4 space-y-3">
                   {items.map(item => (
                     <div key={item.cartId} className="flex justify-between items-center text-sm">
                        <div>
                          <p className="text-white font-medium">{item.title}</p>
                          <p className="text-xs text-gray-500">{item.validity}</p>
                        </div>
                        <p className="text-white">PKR {item.price}</p>
                     </div>
                   ))}
                 </div>
                 <div className="p-4 bg-neutral-800/50 border-t border-gray-800 flex justify-between items-center">
                    <p className="text-gray-400">Total</p>
                    <p className={`text-xl font-bold ${accentColor}`}>PKR {totalPrice.toLocaleString()}</p>
                 </div>
              </div>
              <div className="mt-4 text-xs text-gray-500 bg-blue-900/10 border border-blue-900/30 p-3 rounded">
                Note: This is a digital purchase. You will receive codes to redeem these services during booking.
              </div>
           </div>

           {/* Form */}
           <div className="order-1 md:order-2">
              <form onSubmit={handlePurchase} className="space-y-4">
                 <h3 className="text-white font-bold mb-4 flex items-center"><CreditCard size={18} className="mr-2 text-gray-400" /> Payment Details</h3>
                 
                 <ScrollReveal className="space-y-4">
                    <input 
                      type="text" 
                      placeholder="Your Name" 
                      required 
                      className="w-full p-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:border-yellow-500 outline-none"
                      value={formData.buyerName}
                      onChange={e => setFormData({...formData, buyerName: e.target.value})}
                    />
                    <input 
                      type="email" 
                      placeholder="Email Address (for receipt)" 
                      required 
                      className="w-full p-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:border-yellow-500 outline-none"
                      value={formData.buyerEmail}
                      onChange={e => setFormData({...formData, buyerEmail: e.target.value})}
                    />
                    <input 
                      type="tel" 
                      placeholder="Phone Number" 
                      required 
                      className="w-full p-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:border-yellow-500 outline-none"
                      value={formData.buyerPhone}
                      onChange={e => setFormData({...formData, buyerPhone: e.target.value})}
                    />
                 </ScrollReveal>

                 <div className="pt-4 border-t border-gray-800">
                    <p className="text-sm text-gray-400 mb-3">Gift Details (Optional)</p>
                    <input 
                      type="text" 
                      placeholder="Recipient Name" 
                      className="w-full p-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:border-yellow-500 outline-none mb-3"
                      value={formData.recipientName}
                      onChange={e => setFormData({...formData, recipientName: e.target.value})}
                    />
                    <textarea 
                      placeholder="Gift Message" 
                      className="w-full p-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:border-yellow-500 outline-none h-20"
                      value={formData.message}
                      onChange={e => setFormData({...formData, message: e.target.value})}
                    ></textarea>
                 </div>

                 <Button gender={gender} fullWidth type="submit" disabled={isProcessing}>
                    {isProcessing ? 'Processing...' : 'Order Confirm'}
                 </Button>
              </form>
           </div>
        </div>
      </div>
    </div>
  );
};

export default VoucherCheckout;