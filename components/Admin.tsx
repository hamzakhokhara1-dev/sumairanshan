import React, { useEffect, useState } from 'react';
import { Booking, PurchasedVoucher, Service, Staff, AdminUser, ActivityLog, ServiceVoucher } from '../types';
import { MENS_SERVICES, WOMENS_SERVICES, STAFF, SERVICE_VOUCHERS, MENS_PACKAGES, WOMENS_PACKAGES } from '../constants';
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, CartesianGrid 
} from 'recharts';
import { 
  LayoutDashboard, Calendar, Ticket, Scissors, Users, Settings, LogOut, 
  Menu, X, Plus, Search, Filter, Download, CheckCircle, AlertCircle, 
  ChevronRight, DollarSign, Clock, CreditCard, Trash2, Edit, Star, Package as PackageIcon
} from 'lucide-react';
import { supabase } from '../supabase';

// --- COMPONENTS ---

const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
  const colors: Record<string, string> = {
    confirmed: 'bg-green-100 text-green-800',
    completed: 'bg-blue-100 text-blue-800',
    pending: 'bg-yellow-100 text-yellow-800',
    cancelled: 'bg-gray-100 text-gray-800',
    'no-show': 'bg-red-100 text-red-800',
    paid: 'bg-green-100 text-green-800',
    unpaid: 'bg-red-50 text-red-600',
    deposit: 'bg-blue-50 text-blue-600',
    refunded: 'bg-gray-200 text-gray-700',
    unused: 'bg-green-100 text-green-800',
    redeemed: 'bg-gray-100 text-gray-500',
    'partially-used': 'bg-blue-100 text-blue-800',
    expired: 'bg-red-100 text-red-800'
  };
  
  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium uppercase ${colors[status] || 'bg-gray-100'}`}>
      {status.replace('-', ' ')}
    </span>
  );
};

const Admin: React.FC = () => {
  // --- STATE ---
  const [user, setUser] = useState<AdminUser | null>(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  
  // Data State
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [vouchers, setVouchers] = useState<PurchasedVoucher[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [staff, setStaff] = useState<Staff[]>([]);
  const [logs, setLogs] = useState<ActivityLog[]>([]);

  // UI State
  const [searchTerm, setSearchTerm] = useState('');
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [editingBooking, setEditingBooking] = useState<Booking | null>(null);
  const [showVoucherModal, setShowVoucherModal] = useState(false); // Sell Voucher
  
  // --- INIT ---
  useEffect(() => {
    // Static Data
    setServices([...MENS_SERVICES, ...WOMENS_SERVICES]);
    setStaff(STAFF);

    // Initial Fetch & Subscription for Real-time Data
    const fetchAndSubscribe = async () => {
        // Fetch Initial Data
        const { data: bData } = await supabase.from('bookings').select('*').order('createdAt', { ascending: false });
        if (bData) setBookings(bData as Booking[]);

        const { data: vData } = await supabase.from('purchased_vouchers').select('*').order('purchaseDate', { ascending: false });
        if (vData) setVouchers(vData as PurchasedVoucher[]);

        const { data: lData } = await supabase.from('admin_logs').select('*').order('timestamp', { ascending: false }).limit(20);
        if (lData) setLogs(lData as ActivityLog[]);

        // Realtime Subscription
        const channel = supabase.channel('admin-dashboard')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'bookings' }, (payload) => {
                 // Simple strategy: refetch or manually update state. For simplicity, we manually update.
                 if (payload.eventType === 'INSERT') setBookings(prev => [payload.new as Booking, ...prev]);
                 else if (payload.eventType === 'UPDATE') setBookings(prev => prev.map(b => b.id === (payload.new as Booking).id ? (payload.new as Booking) : b));
                 else if (payload.eventType === 'DELETE') setBookings(prev => prev.filter(b => b.id !== (payload.old as Booking).id));
            })
            .on('postgres_changes', { event: '*', schema: 'public', table: 'purchased_vouchers' }, (payload) => {
                 if (payload.eventType === 'INSERT') setVouchers(prev => [payload.new as PurchasedVoucher, ...prev]);
                 else if (payload.eventType === 'UPDATE') setVouchers(prev => prev.map(v => v.id === (payload.new as PurchasedVoucher).id ? (payload.new as PurchasedVoucher) : v));
            })
            .on('postgres_changes', { event: '*', schema: 'public', table: 'admin_logs' }, (payload) => {
                 if (payload.eventType === 'INSERT') setLogs(prev => [payload.new as ActivityLog, ...prev]);
            })
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    };

    fetchAndSubscribe();
  }, []);

  const getPackageName = (id?: string) => {
    if (!id) return null;
    const pkg = [...MENS_PACKAGES, ...WOMENS_PACKAGES].find(p => p.id === id);
    return pkg ? pkg.name : id;
  };

  const logActivity = async (action: string, details: string) => {
    if (!user) return;
    try {
        await supabase.from('admin_logs').insert([{
            action,
            details,
            user: user.name,
            timestamp: new Date().toISOString()
        }]);
    } catch (e) {
        console.error("Failed to log activity", e);
    }
  };

  // --- ACTIONS ---

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const identifier = (form.elements.namedItem('username') as HTMLInputElement).value;
    const password = (form.elements.namedItem('password') as HTMLInputElement).value;
    
    if (identifier === 'SNS' && password === 'SNS') {
        setUser({ id: '1', name: 'Sumaira n Shan Admin', email: 'admin@sns.com', role: 'superadmin' });
    } else if (identifier.includes('admin')) {
        setUser({ id: '1', name: 'Super Admin', email: identifier, role: 'superadmin' });
    } else if (identifier.includes('manager')) {
        setUser({ id: '2', name: 'Manager Jane', email: identifier, role: 'manager' });
    } else if (identifier.includes('reception')) {
        setUser({ id: '3', name: 'Receptionist', email: identifier, role: 'receptionist' });
    }
  };

  const handleExport = (data: any[], filename: string) => {
    if (!data || data.length === 0) return;
    const csvContent = "data:text/csv;charset=utf-8," 
        + Object.keys(data[0]).join(",") + "\n" 
        + data.map(row => Object.values(row).map(v => typeof v === 'string' ? `"${v}"` : v).join(",")).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `${filename}.csv`);
    document.body.appendChild(link);
    link.click();
    logActivity('Export Data', `Exported ${filename}`);
  };

  const handleBookingUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingBooking) return;
    
    try {
        const { id, ...dataToUpdate } = editingBooking; // Remove ID from payload to avoid PK conflict errors if any
        const { error } = await supabase
            .from('bookings')
            .update(dataToUpdate)
            .eq('id', id);

        if (error) throw error;

        await logActivity('Update Booking', `Updated status for ${editingBooking.id}`);
        setShowBookingModal(false);
        setEditingBooking(null);
    } catch (e) {
        console.error("Error updating booking", e);
        alert("Failed to update booking.");
    }
  };
  
  const handleDeleteBooking = async () => {
      if (!editingBooking) return;
      if (confirm("Are you sure you want to delete this booking? This cannot be undone.")) {
          try {
            const { error } = await supabase
                .from('bookings')
                .delete()
                .eq('id', editingBooking.id);

            if (error) throw error;

            await logActivity('Delete Booking', `Deleted booking ${editingBooking.id}`);
            setShowBookingModal(false);
            setEditingBooking(null);
          } catch (e) {
              console.error("Error deleting booking", e);
              alert("Failed to delete booking.");
          }
      }
  };

  const handleSellVoucher = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const amount = Number((form.elements.namedItem('amount') as HTMLInputElement).value);
    const buyer = (form.elements.namedItem('buyer') as HTMLInputElement).value;
    
    const newVoucher = {
      code: `V-POS-${Math.floor(Math.random() * 10000)}`,
      voucherId: 'custom',
      voucherTitle: 'Custom Store Credit',
      price: amount,
      value: amount,
      remainingBalance: amount,
      buyerName: buyer,
      buyerEmail: 'pos@store.com',
      buyerPhone: '',
      purchaseDate: new Date().toISOString(),
      expiryDate: new Date(Date.now() + 180 * 86400000).toISOString(),
      status: 'unused',
      history: []
    };

    try {
        const { error } = await supabase.from('purchased_vouchers').insert([newVoucher]);
        if (error) throw error;

        await logActivity('Sell Voucher', `Sold voucher ${newVoucher.code} for ${amount}`);
        setShowVoucherModal(false);
    } catch (e) {
        console.error("Error selling voucher", e);
        alert("Failed to create voucher.");
    }
  };

  // --- RENDER HELPERS ---

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 font-sans text-slate-800">
        <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-serif font-bold text-slate-900 mb-2">Sumaira n Shan Admin</h1>
            <p className="text-gray-500">Secure Dashboard Login</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Username or Email</label>
              <input name="username" type="text" defaultValue="SNS" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-900 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <input name="password" type="password" defaultValue="SNS" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-900 outline-none" />
            </div>
            <button type="submit" className="w-full bg-slate-900 text-white py-3 rounded-lg font-bold hover:bg-slate-800 transition">Login</button>
          </form>
          <div className="mt-6 text-xs text-gray-400 text-center">
            <p>Demo Credentials:</p>
            <p>Superadmin: SNS / SNS</p>
          </div>
        </div>
      </div>
    );
  }

  const SidebarItem = ({ id, icon: Icon, label }: any) => (
    <button 
      onClick={() => { setActiveTab(id); setSidebarOpen(false); }}
      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${activeTab === id ? 'bg-slate-800 text-white' : 'text-gray-400 hover:bg-slate-800/50 hover:text-white'}`}
    >
      <Icon size={20} />
      <span className="font-medium">{label}</span>
    </button>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex font-sans text-slate-800">
      
      {/* SIDEBAR */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 text-white transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transition-transform duration-300 shadow-2xl`}>
        <div className="p-6 border-b border-slate-800 flex justify-between items-center">
          <div>
            <h1 className="text-xl font-serif font-bold">Sumaira n Shan Admin</h1>
            <p className="text-xs text-slate-400 uppercase tracking-widest">{user.role}</p>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="md:hidden text-gray-400"><X size={20}/></button>
        </div>
        
        <nav className="p-4 space-y-2 overflow-y-auto max-h-[calc(100vh-80px)]">
          <SidebarItem id="dashboard" icon={LayoutDashboard} label="Dashboard" />
          <SidebarItem id="bookings" icon={Calendar} label="Bookings" />
          <SidebarItem id="vouchers" icon={Ticket} label="Vouchers" />
          <SidebarItem id="services" icon={Scissors} label="Services" />
          <SidebarItem id="staff" icon={Users} label="Staff" />
          {user.role === 'superadmin' && <SidebarItem id="settings" icon={Settings} label="Settings" />}
        </nav>

        <div className="absolute bottom-0 w-full p-4 border-t border-slate-800">
          <button onClick={() => setUser(null)} className="flex items-center space-x-2 text-red-400 hover:text-red-300 text-sm">
            <LogOut size={16} /> <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <div className="flex-1 md:ml-64 flex flex-col min-h-screen">
        
        {/* TOP BAR */}
        <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-4 sticky top-0 z-40">
          <button onClick={() => setSidebarOpen(true)} className="md:hidden text-gray-600"><Menu size={24}/></button>
          <div className="flex items-center space-x-4 ml-auto">
             <div className="text-right hidden sm:block">
               <p className="text-sm font-bold text-slate-900">{user.name}</p>
               <p className="text-xs text-gray-500">{new Date().toLocaleDateString()}</p>
             </div>
             <div className="h-8 w-8 bg-indigo-100 text-indigo-700 rounded-full flex items-center justify-center font-bold">
               {user.name.charAt(0)}
             </div>
          </div>
        </header>

        {/* CONTENT AREA */}
        <main className="flex-1 p-4 md:p-8 overflow-y-auto">
          
          {/* --- DASHBOARD VIEW --- */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6 animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                 {/* KPI Cards */}
                 {[
                   { label: 'Total Revenue', val: `Rs. ${(bookings.reduce((a,b) => a + (b.status !== 'cancelled' ? b.totalPrice : 0), 0) + vouchers.reduce((a,b) => a + b.price, 0)).toLocaleString()}`, icon: DollarSign, color: 'text-green-600' },
                   { label: 'Bookings Today', val: bookings.filter(b => b.date === new Date().toISOString().split('T')[0]).length, icon: Calendar, color: 'text-blue-600' },
                   { label: 'Vouchers Sold', val: vouchers.length, icon: Ticket, color: 'text-purple-600' },
                   { label: 'Active Staff', val: staff.filter(s => true).length, icon: Users, color: 'text-orange-600' },
                 ].map((kpi, i) => (
                   <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center">
                      <div className={`p-4 rounded-full bg-gray-50 mr-4 ${kpi.color}`}><kpi.icon size={24} /></div>
                      <div>
                        <p className="text-gray-500 text-sm">{kpi.label}</p>
                        <p className="text-2xl font-bold text-slate-900">{kpi.val}</p>
                      </div>
                   </div>
                 ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                 <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h2 className="text-lg font-bold mb-4">Revenue Overview</h2>
                    <div className="h-64">
                       <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={[{name: 'Mon', uv: 4000}, {name: 'Tue', uv: 3000}, {name: 'Wed', uv: 2000}, {name: 'Thu', uv: 2780}, {name: 'Fri', uv: 1890}, {name: 'Sat', uv: 2390}, {name: 'Sun', uv: 3490}]}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="uv" fill="#1e293b" radius={[4, 4, 0, 0]} />
                          </BarChart>
                       </ResponsiveContainer>
                    </div>
                 </div>
                 
                 <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h2 className="text-lg font-bold mb-4">Recent Activity</h2>
                    <div className="space-y-4 max-h-64 overflow-y-auto">
                       {logs.slice(0, 5).map(log => (
                         <div key={log.id} className="flex items-start text-sm border-b border-gray-50 pb-3 last:border-0">
                            <div className="bg-gray-100 p-2 rounded-full mr-3 text-gray-500"><Clock size={14}/></div>
                            <div>
                               <p className="font-medium text-slate-900">{log.action}</p>
                               <p className="text-gray-500 text-xs">{log.details}</p>
                               <p className="text-gray-400 text-[10px] mt-1">{new Date(log.timestamp).toLocaleTimeString()} by {log.user}</p>
                            </div>
                         </div>
                       ))}
                       {logs.length === 0 && <p className="text-gray-400 text-sm">No recent activity.</p>}
                    </div>
                 </div>
              </div>
            </div>
          )}

          {/* --- BOOKINGS VIEW --- */}
          {activeTab === 'bookings' && (
            <div className="space-y-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                 <h2 className="text-2xl font-bold font-serif">Bookings Management</h2>
                 <div className="flex space-x-2">
                    <button onClick={() => handleExport(bookings, 'bookings')} className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm hover:bg-gray-50">
                       <Download size={16} className="mr-2" /> Export
                    </button>
                    {/* Add Booking simulated via create modal opening */}
                 </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                {/* Filters */}
                <div className="p-4 border-b border-gray-100 flex flex-col md:flex-row gap-4">
                   <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                      <input 
                        type="text" 
                        placeholder="Search customer, email..." 
                        className="w-full pl-10 pr-4 py-2 bg-gray-50 border-transparent rounded-lg focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition"
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                      />
                   </div>
                   <select className="p-2 bg-gray-50 rounded-lg border-transparent focus:bg-white text-sm">
                      <option value="all">All Status</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="pending">Pending</option>
                   </select>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                   <table className="w-full text-left text-sm">
                      <thead className="bg-gray-50 text-gray-500 uppercase text-xs">
                         <tr>
                            <th className="px-6 py-4 font-semibold">Booking ID</th>
                            <th className="px-6 py-4 font-semibold">Customer</th>
                            <th className="px-6 py-4 font-semibold">Type</th>
                            <th className="px-6 py-4 font-semibold">Date & Time</th>
                            <th className="px-6 py-4 font-semibold">Item</th>
                            <th className="px-6 py-4 font-semibold">Total</th>
                            <th className="px-6 py-4 font-semibold">Status</th>
                            <th className="px-6 py-4 font-semibold">Action</th>
                         </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                         {bookings.filter(b => b.customerName.toLowerCase().includes(searchTerm.toLowerCase())).map(booking => (
                            <tr key={booking.id} className="hover:bg-gray-50 transition-colors">
                               <td className="px-6 py-4 font-mono text-xs text-gray-500">{booking.id.slice(0, 8)}...</td>
                               <td className="px-6 py-4">
                                  <div className="font-medium text-slate-900">{booking.customerName}</div>
                                  <div className="text-gray-400 text-xs">{booking.customerPhone}</div>
                               </td>
                               <td className="px-6 py-4">
                                  {booking.bookingType === 'deal' ? (
                                     <span className="flex items-center text-xs text-purple-600 font-bold uppercase"><PackageIcon size={12} className="mr-1"/> Deal</span>
                                  ) : (
                                     <span className="flex items-center text-xs text-blue-600 font-bold uppercase"><Scissors size={12} className="mr-1"/> Service</span>
                                  )}
                               </td>
                               <td className="px-6 py-4 text-gray-600">
                                  {booking.date} <br/> <span className="text-xs">{booking.time}</span>
                               </td>
                               <td className="px-6 py-4 max-w-xs truncate">
                                  {booking.bookingType === 'deal' 
                                    ? getPackageName(booking.packageId) 
                                    : (services.find(s => s.id === booking.serviceId)?.name || 'Service')}
                               </td>
                               <td className="px-6 py-4 font-bold text-slate-900">
                                  Rs. {booking.totalPrice}
                                  {booking.paymentStatus === 'paid' && <CheckCircle size={12} className="inline ml-1 text-green-500"/>}
                               </td>
                               <td className="px-6 py-4">
                                  <StatusBadge status={booking.status} />
                               </td>
                               <td className="px-6 py-4">
                                  <button 
                                    onClick={() => { setEditingBooking(booking); setShowBookingModal(true); }}
                                    className="text-indigo-600 hover:text-indigo-800 font-medium text-xs"
                                  >
                                    Edit
                                  </button>
                               </td>
                            </tr>
                         ))}
                      </tbody>
                   </table>
                </div>
              </div>
            </div>
          )}

          {/* --- VOUCHERS VIEW --- */}
          {activeTab === 'vouchers' && (
            <div className="space-y-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                 <h2 className="text-2xl font-bold font-serif">Voucher Sales</h2>
                 <div className="flex space-x-2">
                    <button onClick={() => setShowVoucherModal(true)} className="flex items-center px-4 py-2 bg-slate-900 text-white rounded-lg text-sm hover:bg-slate-800">
                       <Plus size={16} className="mr-2" /> Sell Voucher
                    </button>
                    <button onClick={() => handleExport(vouchers, 'vouchers')} className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm hover:bg-gray-50">
                       <Download size={16} className="mr-2" /> Export
                    </button>
                 </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                 {vouchers.map(v => (
                    <div key={v.id} className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-between hover:shadow-md transition-shadow">
                       <div className="flex justify-between items-start mb-4">
                          <div>
                            <span className="bg-indigo-50 text-indigo-700 px-2 py-1 rounded text-xs font-mono font-bold tracking-wider">{v.code}</span>
                            <h3 className="font-bold text-slate-900 mt-2">{v.voucherTitle}</h3>
                          </div>
                          <StatusBadge status={v.status} />
                       </div>
                       
                       <div className="text-sm text-gray-500 space-y-1 mb-4">
                          <p>Buyer: {v.buyerName}</p>
                          <p>Exp: {new Date(v.expiryDate).toLocaleDateString()}</p>
                       </div>

                       <div className="border-t border-gray-100 pt-3 flex justify-between items-center">
                          <div>
                            <p className="text-xs text-gray-400">Balance</p>
                            <p className="font-bold text-lg text-slate-800">Rs. {v.remainingBalance}</p>
                          </div>
                          {v.status === 'unused' && (
                            <button className="text-xs bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded text-gray-700">Redeem</button>
                          )}
                       </div>
                    </div>
                 ))}
              </div>
            </div>
          )}

          {/* --- STAFF VIEW --- */}
          {activeTab === 'staff' && (
             <div className="space-y-6">
                <h2 className="text-2xl font-bold font-serif">Staff Management</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                   {staff.map(s => (
                      <div key={s.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden group">
                         <div className="h-40 overflow-hidden relative">
                            <img src={s.image} alt={s.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                            <div className="absolute top-2 right-2 bg-white/90 px-2 py-1 rounded-full text-xs font-bold text-slate-900 flex items-center">
                               <Star size={10} className="mr-1 text-yellow-500 fill-yellow-500" /> {s.rating}
                            </div>
                         </div>
                         <div className="p-4 text-center">
                            <h3 className="font-bold text-slate-900">{s.name}</h3>
                            <p className="text-sm text-gray-500">{s.role}</p>
                            <p className="text-xs text-indigo-600 mt-1 font-medium">{s.specialty}</p>
                         </div>
                      </div>
                   ))}
                   <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center p-6 cursor-pointer hover:border-indigo-400 transition-colors">
                      <div className="text-center text-gray-400">
                         <Plus size={32} className="mx-auto mb-2" />
                         <p className="text-sm font-medium">Add Staff Member</p>
                      </div>
                   </div>
                </div>
             </div>
          )}

        </main>
      </div>

      {/* --- MODALS --- */}

      {/* Edit Booking Modal */}
      {showBookingModal && editingBooking && (
         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-scale-in">
               <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                  <h3 className="text-xl font-bold font-serif">Edit Booking</h3>
                  <button onClick={() => setShowBookingModal(false)} className="text-gray-400 hover:text-gray-600"><X size={20}/></button>
               </div>
               <form onSubmit={handleBookingUpdate} className="p-6 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                    <select 
                      className="w-full p-2 border border-gray-300 rounded-lg"
                      value={editingBooking.status}
                      onChange={e => setEditingBooking({...editingBooking, status: e.target.value as any})}
                    >
                       <option value="confirmed">Confirmed</option>
                       <option value="pending">Pending</option>
                       <option value="completed">Completed</option>
                       <option value="cancelled">Cancelled</option>
                       <option value="no-show">No Show</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Payment Status</label>
                    <select 
                      className="w-full p-2 border border-gray-300 rounded-lg"
                      value={editingBooking.paymentStatus}
                      onChange={e => setEditingBooking({...editingBooking, paymentStatus: e.target.value as any})}
                    >
                       <option value="unpaid">Unpaid</option>
                       <option value="paid">Paid</option>
                       <option value="deposit">Deposit Paid</option>
                       <option value="refunded">Refunded</option>
                    </select>
                  </div>
                  <div>
                     <label className="block text-sm font-medium text-gray-700 mb-1">Internal Notes</label>
                     <textarea 
                       className="w-full p-2 border border-gray-300 rounded-lg h-24 text-sm" 
                       placeholder="Private notes for staff..."
                       value={editingBooking.internalNotes || ''}
                       onChange={e => setEditingBooking({...editingBooking, internalNotes: e.target.value})}
                     ></textarea>
                  </div>
                  <div className="flex gap-3 pt-4">
                     <button type="button" onClick={handleDeleteBooking} className="flex-1 py-2 text-red-600 font-medium hover:bg-red-50 rounded-lg flex items-center justify-center">
                         <Trash2 size={16} className="mr-2" /> Delete
                     </button>
                     <button type="submit" className="flex-1 py-2 bg-slate-900 text-white font-medium rounded-lg hover:bg-slate-800">Save Changes</button>
                  </div>
               </form>
            </div>
         </div>
      )}

      {/* Sell Voucher Modal */}
      {showVoucherModal && (
         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-scale-in">
               <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-slate-50">
                  <h3 className="text-xl font-bold font-serif">Quick Sell Voucher</h3>
                  <button onClick={() => setShowVoucherModal(false)} className="text-gray-400 hover:text-gray-600"><X size={20}/></button>
               </div>
               <form onSubmit={handleSellVoucher} className="p-6 space-y-4">
                  <div className="bg-yellow-50 border border-yellow-200 p-3 rounded-lg text-xs text-yellow-800">
                     This creates a general store credit voucher that can be emailed to the client immediately.
                  </div>
                  <div>
                     <label className="block text-sm font-medium text-gray-700 mb-1">Buyer Name</label>
                     <input name="buyer" type="text" required className="w-full p-2 border border-gray-300 rounded-lg" placeholder="John Doe" />
                  </div>
                  <div>
                     <label className="block text-sm font-medium text-gray-700 mb-1">Amount (PKR)</label>
                     <input name="amount" type="number" required className="w-full p-2 border border-gray-300 rounded-lg font-bold" placeholder="5000" />
                  </div>
                  <button type="submit" className="w-full py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 mt-4 flex justify-center items-center">
                     <CreditCard size={18} className="mr-2" /> Charge & Issue
                  </button>
               </form>
            </div>
         </div>
      )}

    </div>
  );
};

export default Admin;