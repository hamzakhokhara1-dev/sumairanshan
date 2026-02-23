import React from 'react';
import { CartItem, Gender } from '../types';
import { Button } from './Shared';
import { X, Trash2, ShoppingCart, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { TextReveal, Typewriter } from './TextAnimations';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onRemoveItem: (cartId: string) => void;
  onCheckout: () => void;
  gender: Gender;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ 
  isOpen, onClose, cartItems, onRemoveItem, onCheckout, gender 
}) => {
  const accentColor = gender === 'mens' ? 'text-mens-accent' : 'text-womens-accent';
  const total = cartItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
          />
          
          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 w-full max-w-md bg-neutral-900 border-l border-gray-800 z-50 shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-gray-800 flex justify-between items-center">
              <div className="flex items-center">
                <ShoppingCart className={`${accentColor} mr-3`} size={24} />
                <h2 className="text-xl font-serif font-bold text-white"><TextReveal text="Your Cart" type="char" /></h2>
                <span className="ml-3 bg-gray-800 text-gray-400 text-xs px-2 py-1 rounded-full">
                  {cartItems.length} items
                </span>
              </div>
              <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors">
                <X size={24} />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {cartItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center text-gray-500 space-y-4">
                  <ShoppingCart size={48} className="opacity-20" />
                  <p className="text-lg"><Typewriter text="Your cart is empty." delay={0.2} /></p>
                  <Button gender={gender} variant="outline" onClick={onClose}>
                    Browse Vouchers
                  </Button>
                </div>
              ) : (
                cartItems.map((item) => (
                  <div key={item.cartId} className="bg-black/40 border border-gray-800 rounded-xl p-4 flex justify-between items-start group">
                    <div className="flex-1 pr-4">
                      <h3 className="font-bold text-white mb-1">{item.title}</h3>
                      <p className="text-xs text-gray-400 mb-2">{item.category} • {item.validity}</p>
                      <div className={`font-bold ${accentColor}`}>PKR {item.price.toLocaleString()}</div>
                    </div>
                    <button 
                      onClick={() => onRemoveItem(item.cartId)}
                      className="text-gray-600 hover:text-red-500 transition-colors p-2"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {cartItems.length > 0 && (
              <div className="p-6 border-t border-gray-800 bg-neutral-900">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-gray-400">Total Amount</span>
                  <span className={`text-2xl font-bold ${accentColor}`}>
                    PKR {total.toLocaleString()}
                  </span>
                </div>
                <Button gender={gender} fullWidth onClick={onCheckout} className="flex justify-center items-center">
                  Checkout Now <ArrowRight size={18} className="ml-2" />
                </Button>
                <p className="text-xs text-center text-gray-500 mt-4">
                  Secure checkout powered by Sumaira n Shan Studio
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;