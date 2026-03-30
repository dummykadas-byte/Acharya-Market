import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Marketplace from './components/Marketplace';
import GigDetail from './components/GigDetail';
import Profile from './components/Profile';
import OnboardingModal from './components/OnboardingModal';
import AdminDashboard from './components/AdminDashboard';

export type ViewState = 
  | { type: 'home' }
  | { type: 'gig'; id: string }
  | { type: 'profile'; id: string }
  | { type: 'admin' };

export default function App() {
  const [view, setView] = useState<ViewState>({ type: 'home' });
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#0F172A] text-white selection:bg-pink-500/30">
      {view.type !== 'admin' && (
        <Navbar 
          onExplore={() => {
            setView({ type: 'home' });
            setTimeout(() => {
              document.getElementById('marketplace')?.scrollIntoView({ behavior: 'smooth' });
            }, 100);
          }} 
          onJoin={() => setIsJoinModalOpen(true)}
          onHome={() => setView({ type: 'home' })}
          onAdmin={() => setView({ type: 'admin' })}
        />
      )}

      <main className={view.type === 'admin' ? '' : 'pt-20'}>
        <AnimatePresence mode="wait">
          {view.type === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Hero 
                onExplore={() => document.getElementById('marketplace')?.scrollIntoView({ behavior: 'smooth' })}
                onJoin={() => setIsJoinModalOpen(true)}
              />
              <div id="marketplace">
                <Marketplace onGigClick={(id) => setView({ type: 'gig', id })} />
              </div>
            </motion.div>
          )}

          {view.type === 'gig' && (
            <motion.div
              key={`gig-${view.id}`}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              <GigDetail 
                gigId={view.id} 
                onBack={() => setView({ type: 'home' })}
                onCreatorClick={(id) => setView({ type: 'profile', id })}
              />
            </motion.div>
          )}

          {view.type === 'profile' && (
            <motion.div
              key={`profile-${view.id}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Profile 
                creatorId={view.id} 
                onBack={() => setView({ type: 'home' })}
                onGigClick={(id) => setView({ type: 'gig', id })}
              />
            </motion.div>
          )}

          {view.type === 'admin' && (
            <motion.div
              key="admin"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              <AdminDashboard onBack={() => setView({ type: 'home' })} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <AnimatePresence>
        {isJoinModalOpen && (
          <OnboardingModal 
            onClose={() => setIsJoinModalOpen(false)} 
            onComplete={() => {
              setIsJoinModalOpen(false);
              setView({ type: 'profile', id: 'new-user' });
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
