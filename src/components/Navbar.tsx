import { Search, Menu } from 'lucide-react';

export default function Navbar({ onExplore, onJoin, onHome, onAdmin }: { onExplore: () => void, onJoin: () => void, onHome: () => void, onAdmin: () => void }) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-40 glass border-b-0 border-slate-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0 cursor-pointer flex items-center gap-3" onClick={onHome}>
            <span className="text-2xl font-bold tracking-tight hidden sm:block">
              Acharya<span className="text-pink-500">Market</span>
            </span>
          </div>
          
          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <button onClick={onAdmin} className="text-pink-400 hover:text-pink-300 transition-colors font-medium flex items-center gap-1">
              Admin
            </button>
            <button onClick={onExplore} className="text-slate-300 hover:text-white transition-colors font-medium">
              Explore
            </button>
            <button className="text-slate-300 hover:text-white transition-colors font-medium">
              Trending
            </button>
            <div className="w-px h-6 bg-slate-700"></div>
            <button className="text-slate-300 hover:text-white transition-colors font-medium">
              Sign In
            </button>
            <button onClick={onJoin} className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium transition-all hover-glow-blue">
              Join Now
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">
            <button className="text-slate-300 hover:text-white">
              <Search className="w-6 h-6" />
            </button>
            <button className="text-slate-300 hover:text-white">
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
