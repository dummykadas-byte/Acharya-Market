import { motion } from 'motion/react';
import { Sparkles, ArrowRight, Zap } from 'lucide-react';

export default function Hero({ onExplore, onJoin }: { onExplore: () => void, onJoin: () => void }) {
  // Generate floating orbs for the background
  const orbs = Array.from({ length: 5 }).map((_, i) => ({
    id: i,
    size: Math.random() * 300 + 100,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 20 + 20,
    color: i % 2 === 0 ? 'bg-blue-500/10' : 'bg-purple-500/10',
  }));

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-20 pb-16">
      {/* Dynamic Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-[#0F172A] to-[#0F172A]"></div>
        
        {/* Animated Orbs */}
        {orbs.map((orb) => (
          <motion.div
            key={orb.id}
            className={`absolute rounded-full blur-[80px] ${orb.color}`}
            style={{
              width: orb.size,
              height: orb.size,
              left: `${orb.x}%`,
              top: `${orb.y}%`,
            }}
            animate={{
              x: [0, Math.random() * 100 - 50, 0],
              y: [0, Math.random() * 100 - 50, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: orb.duration,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjU1LCAyNTUsIDI1NSwgMC4wNSkiLz48L3N2Zz4=')] opacity-50 mask-image:linear-gradient(to_bottom,white,transparent)"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto flex flex-col items-center">
        
        <motion.div 
          className="mb-8 inline-flex items-center gap-2 px-4 py-2 rounded-full glass border-white/10 text-sm font-medium text-slate-300"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <Sparkles className="w-4 h-4 text-purple-400" />
          <span>Empowering creators to build their future, today.</span>
        </motion.div>

        <motion.h1 
          className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-8 leading-[1.1]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
        >
          Turn Your Skills Into <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 animate-gradient-x">
            Opportunities
          </span>
        </motion.h1>
        
        <motion.p 
          className="text-lg md:text-xl text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
        >
          The premium platform to showcase your portfolio, monetize your talents, and connect with real-world gigs.
        </motion.p>

        <motion.div 
          className="flex flex-col sm:flex-row items-center justify-center gap-6 w-full sm:w-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
        >
          <button 
            onClick={onExplore}
            className="group relative w-full sm:w-auto px-8 py-4 rounded-2xl glass border border-white/10 hover:border-white/20 text-white font-semibold transition-all duration-300 flex items-center justify-center gap-3 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <span className="relative z-10 flex items-center gap-2">
              Explore Market <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
          </button>
          
          <button 
            onClick={onJoin}
            className="group relative w-full sm:w-auto px-8 py-4 rounded-2xl bg-white text-slate-900 font-semibold transition-all duration-300 flex items-center justify-center gap-3 hover:scale-[1.02] hover:shadow-[0_0_40px_-10px_rgba(255,255,255,0.5)]"
          >
            <span className="relative z-10 flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-500" /> Join as Creator
            </span>
          </button>
        </motion.div>
      </div>
      
      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#0F172A] via-[#0F172A]/80 to-transparent pointer-events-none" />
    </section>
  );
}
