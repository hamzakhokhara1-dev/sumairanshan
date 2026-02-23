

export type Gender = 'mens' | 'womens';

export interface Service {
  id: string;
  category: string;
  name: string;
  description: string;
  price: number;
  durationMin: number;
  image: string;
}

export interface Staff {
  id: string;
  name: string;
  role: string;
  specialty: string;
  image: string;
  rating: number;
  active: boolean;
}

export interface Booking {
  id: string;
  gender: Gender;
  bookingType: 'service' | 'deal';
  serviceId?: string;
  packageId?: string;
  staffId?: string;
  date: string; // ISO date string
  time: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  status: 'confirmed' | 'pending' | 'cancelled' | 'completed' | 'no-show';
  paymentStatus: 'unpaid' | 'deposit' | 'paid' | 'refunded';
  totalPrice: number;
  discountApplied?: number;
  voucherCode?: string;
  notes?: string;
  internalNotes?: string;
  createdBy?: string;
  createdAt: string;
}

export interface ThemeConfig {
  bg: string;
  text: string;
  accent: string;
  accentHover: string;
  cardBg: string;
  font: string;
}

export interface Voucher {
  id: string;
  code: string;
  value: number;
  type: 'fixed' | 'percentage';
  description: string;
}

export interface ServiceVoucher {
  id: string;
  title: string;
  price: number;
  services: string[];
  validity: string;
  perfectFor: string;
  category: 'spa' | 'face' | 'hair' | 'essentials' | 'student';
  gender?: Gender;
  image?: string;
}

export interface CartItem extends ServiceVoucher {
  cartId: string; // Unique ID for the cart instance
}

export interface PurchasedVoucher {
  id: string;
  code: string;
  voucherId: string;
  voucherTitle: string;
  price: number;
  value: number; // Original value
  remainingBalance: number;
  buyerName: string;
  buyerEmail: string;
  buyerPhone: string;
  recipientName?: string;
  message?: string;
  purchaseDate: string;
  expiryDate: string;
  status: 'unused' | 'partially-used' | 'redeemed' | 'expired';
  history: { date: string; action: string; amount: number; bookingId?: string }[];
}

export interface Package {
  id: string;
  name: string;
  price: string;
  items: string[];
  category?: string;
  image?: string;
}

export type AdminRole = 'superadmin' | 'manager' | 'receptionist';

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: AdminRole;
}

export interface ActivityLog {
  id: string;
  action: string; // e.g., "Created Booking", "Redeemed Voucher"
  details: string;
  user: string;
  timestamp: string;
}