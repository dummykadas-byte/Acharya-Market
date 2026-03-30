import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LayoutDashboard, Users, Briefcase, DollarSign, ShoppingCart, 
  Star, Award, BarChart2, Tag, Settings, Shield, Bell, Search,
  AlertTriangle, MoreVertical, ArrowUpRight, ArrowDownRight, X
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, BarChart, Bar } from 'recharts';

// Mock Data
const revenueData = [
  { name: 'Jan', revenue: 4000, users: 240 },
  { name: 'Feb', revenue: 3000, users: 139 },
  { name: 'Mar', revenue: 2000, users: 980 },
  { name: 'Apr', revenue: 2780, users: 390 },
  { name: 'May', revenue: 1890, users: 480 },
  { name: 'Jun', revenue: 2390, users: 380 },
  { name: 'Jul', revenue: 3490, users: 430 },
];

const usersData = [
  { id: 1, name: 'Alex Johnson', role: 'Creator', status: 'Active', joined: '2026-01-15' },
  { id: 2, name: 'Sarah Smith', role: 'Buyer', status: 'Pending', joined: '2026-02-20' },
  { id: 3, name: 'Mike Brown', role: 'Creator', status: 'Suspended', joined: '2025-11-05' },
  { id: 4, name: 'Emily Davis', role: 'Buyer', status: 'Active', joined: '2026-03-10' },
];

const gigsData = [
  { id: 1, title: 'Professional Video Editing', creator: 'Alex Johnson', price: 150, status: 'Active', rating: 4.9 },
  { id: 2, title: 'Logo Design & Branding', creator: 'Sarah Smith', price: 80, status: 'Pending', rating: 0 },
  { id: 3, title: 'SEO Optimization', creator: 'Mike Brown', price: 200, status: 'Flagged', rating: 3.2 },
];

export default function AdminDashboard({ onBack }: { onBack: () => void }) {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'gigs', label: 'Gigs', icon: Briefcase },
    { id: 'finances', label: 'Finances', icon: DollarSign },
    { id: 'orders', label: 'Orders', icon: ShoppingCart },
    { id: 'reviews', label: 'Reviews', icon: Star },
    { id: 'badges', label: 'Badges & Loyalty', icon: Award },
    { id: 'analytics', label: 'Analytics', icon: BarChart2 },
    { id: 'categories', label: 'Categories', icon: Tag },
    { id: 'settings', label: 'Settings', icon: Settings },
    { id: 'security', label: 'Security', icon: Shield },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <OverviewTab />;
      case 'users':
        return <UsersTab />;
      case 'gigs':
        return <GigsTab />;
      case 'finances':
        return <FinancesTab />;
      case 'orders':
        return <PlaceholderTab title="Orders" description="Monitor order status, resolve disputes, and manage active deliveries." />;
      case 'reviews':
        return <PlaceholderTab title="Reviews & Ratings" description="Moderate feedback, remove inappropriate reviews, and maintain trust." />;
      case 'badges':
        return <PlaceholderTab title="Badges & Loyalty" description="Define reward rules, assign badges, and manage user progression levels." />;
      case 'analytics':
        return <PlaceholderTab title="Advanced Analytics" description="View top-performing creators, trending skills, user growth, and platform activity." />;
      case 'categories':
        return <PlaceholderTab title="Search & Categories" description="Manage skill tags, categories, and improve discovery algorithms." />;
      case 'settings':
        return <PlaceholderTab title="Customization & Settings" description="Update branding elements like logo, colors, homepage content, and send announcements." />;
      case 'security':
        return <PlaceholderTab title="Security & Access" description="Manage role-based access, view activity tracking, and ensure safe operations." />;
      default:
        return <PlaceholderTab title={tabs.find(t => t.id === activeTab)?.label || 'Tab'} description="This section is under construction." />;
    }
  };

  return (
    <div className="min-h-screen bg-[#0F172A] text-slate-200 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col h-screen sticky top-0">
        <div className="p-6 border-b border-slate-800 flex items-center justify-between">
          <h1 className="text-xl font-bold text-white flex items-center gap-2">
            <Shield className="w-6 h-6 text-pink-500" />
            Admin Panel
          </h1>
        </div>
        <div className="flex-1 overflow-y-auto py-4 scrollbar-hide">
          <nav className="space-y-1 px-3">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-sm font-medium ${
                    activeTab === tab.id 
                      ? 'bg-blue-600/10 text-blue-400' 
                      : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>
        <div className="p-4 border-t border-slate-800">
          <button 
            onClick={onBack}
            className="w-full py-2 px-4 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors text-sm font-medium"
          >
            Exit Admin
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-white capitalize">{tabs.find(t => t.id === activeTab)?.label}</h2>
          <div className="flex items-center gap-4">
            <button className="p-2 bg-slate-800 rounded-full text-slate-400 hover:text-white transition-colors relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-0 right-0 w-2 h-2 bg-pink-500 rounded-full"></span>
            </button>
            <div className="flex items-center gap-3">
              <img src="https://picsum.photos/seed/admin/100/100" alt="Admin" className="w-10 h-10 rounded-full border-2 border-slate-700" referrerPolicy="no-referrer" />
              <div className="hidden md:block">
                <p className="text-sm font-medium text-white">Super Admin</p>
                <p className="text-xs text-slate-400">System Control</p>
              </div>
            </div>
          </div>
        </div>

        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {renderContent()}
        </motion.div>
      </main>
    </div>
  );
}

// --- Tab Components ---

function OverviewTab() {
  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Users" value="12,450" trend="+12%" isPositive={true} icon={<Users className="w-6 h-6 text-blue-400" />} />
        <StatCard title="Active Gigs" value="3,820" trend="+5%" isPositive={true} icon={<Briefcase className="w-6 h-6 text-purple-400" />} />
        <StatCard title="Active Orders" value="845" trend="-2%" isPositive={false} icon={<ShoppingCart className="w-6 h-6 text-yellow-400" />} />
        <StatCard title="Total Revenue" value="$145,200" trend="+18%" isPositive={true} icon={<DollarSign className="w-6 h-6 text-green-400" />} />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-white mb-6">Revenue Overview</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" vertical={false} />
                <XAxis dataKey="name" stroke="#64748B" tick={{fill: '#64748B'}} axisLine={false} tickLine={false} />
                <YAxis stroke="#64748B" tick={{fill: '#64748B'}} axisLine={false} tickLine={false} tickFormatter={(value) => `$${value}`} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0F172A', borderColor: '#1E293B', color: '#F8FAFC' }}
                  itemStyle={{ color: '#3B82F6' }}
                />
                <Area type="monotone" dataKey="revenue" stroke="#3B82F6" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-white mb-6">User Growth</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" vertical={false} />
                <XAxis dataKey="name" stroke="#64748B" tick={{fill: '#64748B'}} axisLine={false} tickLine={false} />
                <YAxis stroke="#64748B" tick={{fill: '#64748B'}} axisLine={false} tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0F172A', borderColor: '#1E293B', color: '#F8FAFC' }}
                  cursor={{fill: '#1E293B'}}
                />
                <Bar dataKey="users" fill="#A855F7" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      
      {/* Recent Activity */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Recent Activity</h3>
        <div className="space-y-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-center justify-between p-4 bg-slate-800/50 rounded-xl">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-medium text-white">New dispute raised on Order #4829</p>
                  <p className="text-xs text-slate-400">2 hours ago</p>
                </div>
              </div>
              <button className="text-sm text-blue-400 hover:text-blue-300 font-medium">Review</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function UsersTab() {
  const [users, setUsers] = useState(usersData);
  const [modalConfig, setModalConfig] = useState<{ isOpen: boolean, type: 'suspend' | 'editRole', user: any | null }>({ isOpen: false, type: 'suspend', user: null });
  const [newRole, setNewRole] = useState('');

  const handleActionClick = (type: 'suspend' | 'editRole', user: any) => {
    setModalConfig({ isOpen: true, type, user });
    if (type === 'editRole') setNewRole(user.role);
  };

  const confirmAction = () => {
    if (!modalConfig.user) return;
    setUsers(users.map(u => {
      if (u.id === modalConfig.user.id) {
        if (modalConfig.type === 'suspend') {
          return { ...u, status: u.status === 'Suspended' ? 'Active' : 'Suspended' };
        } else if (modalConfig.type === 'editRole') {
          return { ...u, role: newRole };
        }
      }
      return u;
    }));
    setModalConfig({ isOpen: false, type: 'suspend', user: null });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
          <input 
            type="text" 
            placeholder="Search users by name, email, or ID..."
            className="w-full bg-slate-900 border border-slate-800 rounded-xl py-2.5 pl-10 pr-4 text-white focus:outline-none focus:border-blue-500 transition-colors"
          />
        </div>
        <div className="flex gap-2">
          <select className="bg-slate-900 border border-slate-800 rounded-xl py-2.5 px-4 text-white focus:outline-none focus:border-blue-500">
            <option>All Roles</option>
            <option>Creators</option>
            <option>Buyers</option>
            <option>Admins</option>
          </select>
          <select className="bg-slate-900 border border-slate-800 rounded-xl py-2.5 px-4 text-white focus:outline-none focus:border-blue-500">
            <option>All Status</option>
            <option>Active</option>
            <option>Pending</option>
            <option>Suspended</option>
          </select>
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-800/50 text-slate-400 text-sm border-b border-slate-800">
              <th className="p-4 font-medium">User</th>
              <th className="p-4 font-medium">Role</th>
              <th className="p-4 font-medium">Status</th>
              <th className="p-4 font-medium">Joined</th>
              <th className="p-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-slate-800/20 transition-colors">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-xs font-bold">
                      {user.name.charAt(0)}
                    </div>
                    <span className="font-medium text-white">{user.name}</span>
                  </div>
                </td>
                <td className="p-4 text-slate-300">{user.role}</td>
                <td className="p-4">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                    user.status === 'Active' ? 'bg-green-500/10 text-green-400' :
                    user.status === 'Pending' ? 'bg-yellow-500/10 text-yellow-400' :
                    'bg-red-500/10 text-red-400'
                  }`}>
                    {user.status}
                  </span>
                </td>
                <td className="p-4 text-slate-400 text-sm">{user.joined}</td>
                <td className="p-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button 
                      onClick={() => handleActionClick('editRole', user)}
                      className="px-3 py-1.5 bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 rounded-lg text-xs font-medium transition-colors"
                    >
                      Edit Role
                    </button>
                    <button 
                      onClick={() => handleActionClick('suspend', user)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                        user.status === 'Suspended' 
                          ? 'bg-green-500/10 text-green-400 hover:bg-green-500/20' 
                          : 'bg-red-500/10 text-red-400 hover:bg-red-500/20'
                      }`}
                    >
                      {user.status === 'Suspended' ? 'Unsuspend' : 'Suspend'}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AnimatePresence>
        {modalConfig.isOpen && modalConfig.user && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              className="absolute inset-0 bg-[#0F172A]/80 backdrop-blur-sm" 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              onClick={() => setModalConfig({ ...modalConfig, isOpen: false })} 
            />
            <motion.div 
              className="relative w-full max-w-md bg-[#1E293B] rounded-2xl border border-slate-700 shadow-2xl overflow-hidden p-6" 
              initial={{ opacity: 0, scale: 0.95 }} 
              animate={{ opacity: 1, scale: 1 }} 
              exit={{ opacity: 0, scale: 0.95 }}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-white">
                  {modalConfig.type === 'suspend' 
                    ? (modalConfig.user.status === 'Suspended' ? 'Unsuspend User' : 'Suspend User') 
                    : 'Edit User Role'}
                </h3>
                <button onClick={() => setModalConfig({ ...modalConfig, isOpen: false })} className="text-slate-400 hover:text-white transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              {modalConfig.type === 'suspend' ? (
                <p className="text-slate-400 mb-6">
                  Are you sure you want to {modalConfig.user.status === 'Suspended' ? 'unsuspend' : 'suspend'} <strong className="text-white">{modalConfig.user.name}</strong>? 
                  {modalConfig.user.status !== 'Suspended' && " They will lose access to the platform until unsuspended."}
                </p>
              ) : (
                <div className="mb-6">
                  <label className="block text-sm font-medium text-slate-400 mb-2">Select New Role for <strong className="text-white">{modalConfig.user.name}</strong></label>
                  <select 
                    value={newRole} 
                    onChange={(e) => setNewRole(e.target.value)} 
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-blue-500"
                  >
                    <option value="Creator">Creator</option>
                    <option value="Buyer">Buyer</option>
                    <option value="Admin">Admin</option>
                  </select>
                </div>
              )}

              <div className="flex justify-end gap-3">
                <button 
                  onClick={() => setModalConfig({ ...modalConfig, isOpen: false })} 
                  className="px-4 py-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button 
                  onClick={confirmAction} 
                  className={`px-4 py-2 rounded-xl text-white font-medium transition-colors ${
                    modalConfig.type === 'suspend' 
                      ? (modalConfig.user.status === 'Suspended' ? 'bg-green-600 hover:bg-green-500' : 'bg-red-600 hover:bg-red-500') 
                      : 'bg-blue-600 hover:bg-blue-500'
                  }`}
                >
                  Confirm
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

function GigsTab() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
          <input 
            type="text" 
            placeholder="Search gigs..."
            className="w-full bg-slate-900 border border-slate-800 rounded-xl py-2.5 pl-10 pr-4 text-white focus:outline-none focus:border-blue-500 transition-colors"
          />
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-800/50 text-slate-400 text-sm border-b border-slate-800">
              <th className="p-4 font-medium">Gig Title</th>
              <th className="p-4 font-medium">Creator</th>
              <th className="p-4 font-medium">Price</th>
              <th className="p-4 font-medium">Status</th>
              <th className="p-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {gigsData.map((gig) => (
              <tr key={gig.id} className="hover:bg-slate-800/20 transition-colors">
                <td className="p-4 font-medium text-white">{gig.title}</td>
                <td className="p-4 text-slate-300">{gig.creator}</td>
                <td className="p-4 text-slate-300">${gig.price}</td>
                <td className="p-4">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                    gig.status === 'Active' ? 'bg-green-500/10 text-green-400' :
                    gig.status === 'Pending' ? 'bg-yellow-500/10 text-yellow-400' :
                    'bg-red-500/10 text-red-400'
                  }`}>
                    {gig.status}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <button className="p-1.5 text-slate-400 hover:text-white transition-colors">
                    <MoreVertical className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function FinancesTab() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <h3 className="text-slate-400 text-sm font-medium mb-2">Platform Balance</h3>
          <p className="text-3xl font-bold text-white">$45,230.00</p>
          <div className="mt-4 flex gap-2">
            <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-sm font-medium transition-colors">Withdraw</button>
          </div>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <h3 className="text-slate-400 text-sm font-medium mb-2">Pending Payouts</h3>
          <p className="text-3xl font-bold text-white">$12,450.00</p>
          <div className="mt-4 flex gap-2">
            <button className="flex-1 bg-slate-800 hover:bg-slate-700 text-white py-2 rounded-lg text-sm font-medium transition-colors">Review Payouts</button>
          </div>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <h3 className="text-slate-400 text-sm font-medium mb-2">Commission Rate</h3>
          <p className="text-3xl font-bold text-white">15%</p>
          <div className="mt-4 flex gap-2">
            <button className="flex-1 bg-slate-800 hover:bg-slate-700 text-white py-2 rounded-lg text-sm font-medium transition-colors">Adjust Rate</button>
          </div>
        </div>
      </div>
      
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Recent Transactions</h3>
        <div className="text-center py-12 text-slate-400">
          Transaction history will appear here.
        </div>
      </div>
    </div>
  );
}

function PlaceholderTab({ title, description }: { title: string, description: string }) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-12 text-center">
      <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
        <Settings className="w-8 h-8" />
      </div>
      <h3 className="text-xl font-bold text-white mb-2">{title} Management</h3>
      <p className="text-slate-400 max-w-md mx-auto">
        {description}
      </p>
      <button className="mt-6 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors">
        Coming Soon
      </button>
    </div>
  );
}

const StatCard = ({ title, value, trend, isPositive, icon }: any) => (
  <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
    <div className="flex justify-between items-start mb-4">
      <div className="p-3 bg-slate-800 rounded-xl">
        {icon}
      </div>
      <span className={`flex items-center gap-1 text-sm font-medium px-2 py-1 rounded-full ${
        isPositive ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'
      }`}>
        {isPositive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
        {trend}
      </span>
    </div>
    <div>
      <p className="text-slate-400 text-sm font-medium mb-1">{title}</p>
      <h3 className="text-2xl font-bold text-white">{value}</h3>
    </div>
  </div>
);
