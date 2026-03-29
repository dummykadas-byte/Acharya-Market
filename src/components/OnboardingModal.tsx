import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronRight, Check, Upload, User, Briefcase, Star, Image as ImageIcon, Award, FileText, Palette, Rocket, Sparkles } from 'lucide-react';

export default function OnboardingModal({ onClose, onComplete }: { onClose: () => void, onComplete?: () => void }) {
  const [step, setStep] = useState(1);
  const [role, setRole] = useState<'creator' | 'buyer' | 'both' | null>(null);

  // If buyer, skip steps 4 (Gig) and 5 (Portfolio)
  const isBuyerOnly = role === 'buyer';
  const totalSteps = isBuyerOnly ? 7 : 9;

  const getActualStep = (currentStep: number) => {
    if (isBuyerOnly && currentStep > 3) {
      return currentStep + 2; // Skip 4 and 5
    }
    return currentStep;
  };

  const nextStep = () => setStep(s => Math.min(s + 1, totalSteps));
  const prevStep = () => setStep(s => Math.max(s - 1, 1));

  const handleComplete = () => {
    if (onComplete) onComplete();
    else onClose();
  };

  const actualStep = getActualStep(step);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <motion.div 
        className="absolute inset-0 bg-[#0F172A]/80 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />
      
      <motion.div 
        className="relative w-full max-w-2xl bg-[#1E293B] rounded-3xl border border-slate-700 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-800">
          <h2 className="text-2xl font-bold text-white">Join Acharya Market</h2>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-white rounded-full hover:bg-slate-800 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress */}
        <div className="bg-slate-800/50 px-6 py-4 flex items-center gap-2">
          {[...Array(totalSteps)].map((_, i) => (
            <div key={i} className="flex-1 h-1.5 rounded-full bg-slate-700 overflow-hidden">
              <motion.div 
                className="h-full bg-gradient-to-r from-blue-500 to-pink-500"
                initial={{ width: 0 }}
                animate={{ width: step > i ? '100%' : '0%' }}
                transition={{ duration: 0.3 }}
              />
            </div>
          ))}
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-grow custom-scrollbar">
          <AnimatePresence mode="wait">
            {actualStep === 1 && (
              <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-blue-500/20 text-blue-400 rounded-lg"><User className="w-6 h-6" /></div>
                  <h3 className="text-2xl font-bold text-white">Basic Information</h3>
                </div>
                <p className="text-slate-400 mb-6">Let's establish your identity to personalize your experience.</p>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-400 mb-1">Full Name *</label>
                      <input type="text" className="w-full bg-slate-900 border border-slate-700 rounded-xl py-3 px-4 text-white focus:border-blue-500 focus:outline-none transition-colors" placeholder="John Doe" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-400 mb-1">Email *</label>
                      <input type="email" className="w-full bg-slate-900 border border-slate-700 rounded-xl py-3 px-4 text-white focus:border-blue-500 focus:outline-none transition-colors" placeholder="john@example.com" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-400 mb-1">Password *</label>
                    <input type="password" className="w-full bg-slate-900 border border-slate-700 rounded-xl py-3 px-4 text-white focus:border-blue-500 focus:outline-none transition-colors" placeholder="••••••••" />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-400 mb-1">Location (Optional)</label>
                      <input type="text" className="w-full bg-slate-900 border border-slate-700 rounded-xl py-3 px-4 text-white focus:border-blue-500 focus:outline-none transition-colors" placeholder="City, Country" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-400 mb-1">Education (Optional)</label>
                      <input type="text" className="w-full bg-slate-900 border border-slate-700 rounded-xl py-3 px-4 text-white focus:border-blue-500 focus:outline-none transition-colors" placeholder="University / Background" />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {actualStep === 2 && (
              <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-purple-500/20 text-purple-400 rounded-lg"><Briefcase className="w-6 h-6" /></div>
                  <h3 className="text-2xl font-bold text-white">Your Intent</h3>
                </div>
                <p className="text-slate-400 mb-6">How do you plan to use Acharya Market?</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[
                    { id: 'creator', title: 'Offer Services', desc: 'I want to sell my skills and find gigs.', icon: Star },
                    { id: 'buyer', title: 'Hire Talent', desc: 'I need to hire freelancers for my projects.', icon: User },
                    { id: 'both', title: 'Both', desc: 'I want to do both.', icon: Briefcase }
                  ].map(r => (
                    <div 
                      key={r.id} 
                      onClick={() => setRole(r.id as any)}
                      className={`p-5 rounded-2xl border cursor-pointer transition-all ${role === r.id ? 'bg-blue-600/20 border-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.3)]' : 'bg-slate-900 border-slate-700 hover:border-slate-500'}`}
                    >
                      <r.icon className={`w-8 h-8 mb-3 ${role === r.id ? 'text-blue-400' : 'text-slate-400'}`} />
                      <h4 className="text-white font-bold mb-1">{r.title}</h4>
                      <p className="text-xs text-slate-400">{r.desc}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {actualStep === 3 && (
              <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-pink-500/20 text-pink-400 rounded-lg"><Star className="w-6 h-6" /></div>
                  <h3 className="text-2xl font-bold text-white">Skills & Identity</h3>
                </div>
                <p className="text-slate-400 mb-6">Define your professional identity and core expertise.</p>
                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-slate-400 mb-1">Primary Skill</label>
                    <select className="w-full bg-slate-900 border border-slate-700 rounded-xl py-3 px-4 text-white focus:border-blue-500 focus:outline-none transition-colors appearance-none">
                      <option>Video Editing</option>
                      <option>UI/UX Design</option>
                      <option>Web Development</option>
                      <option>Content Writing</option>
                      <option>Digital Marketing</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-400 mb-1">Secondary Skills</label>
                    <input type="text" className="w-full bg-slate-900 border border-slate-700 rounded-xl py-3 px-4 text-white focus:border-blue-500 focus:outline-none transition-colors" placeholder="e.g. After Effects, Figma, React (comma separated)" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-400 mb-1">Professional Tagline</label>
                    <input type="text" className="w-full bg-slate-900 border border-slate-700 rounded-xl py-3 px-4 text-white focus:border-blue-500 focus:outline-none transition-colors" placeholder="e.g. Visual Storyteller & Motion Designer" />
                    <p className="text-xs text-slate-500 mt-2">This will appear prominently on your profile.</p>
                  </div>
                </div>
              </motion.div>
            )}

            {actualStep === 4 && (
              <motion.div key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-amber-500/20 text-amber-400 rounded-lg"><Briefcase className="w-6 h-6" /></div>
                  <h3 className="text-2xl font-bold text-white">Create Your First Gig</h3>
                </div>
                <p className="text-slate-400 mb-6">Set up a service so you can start getting hired immediately.</p>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-400 mb-1">Gig Title</label>
                    <input type="text" className="w-full bg-slate-900 border border-slate-700 rounded-xl py-3 px-4 text-white focus:border-blue-500 focus:outline-none transition-colors" placeholder="I will create a cinematic video for your brand" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-400 mb-1">Description</label>
                    <textarea rows={3} className="w-full bg-slate-900 border border-slate-700 rounded-xl py-3 px-4 text-white focus:border-blue-500 focus:outline-none transition-colors resize-none" placeholder="Describe what you offer in detail..." />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-400 mb-1">Tools Used</label>
                      <input type="text" className="w-full bg-slate-900 border border-slate-700 rounded-xl py-3 px-4 text-white focus:border-blue-500 focus:outline-none transition-colors" placeholder="e.g. Premiere Pro, Figma" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-400 mb-1">Deliverables</label>
                      <input type="text" className="w-full bg-slate-900 border border-slate-700 rounded-xl py-3 px-4 text-white focus:border-blue-500 focus:outline-none transition-colors" placeholder="e.g. 4K Video, Source Files" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-400 mb-2">Pricing Tiers (Optional)</label>
                    <div className="flex gap-2">
                      {['Basic', 'Standard', 'Premium'].map(tier => (
                        <div key={tier} className="flex-1 bg-slate-800 border border-slate-700 rounded-xl p-3 text-center">
                          <span className="text-xs text-slate-400 block mb-1">{tier}</span>
                          <input type="number" placeholder="$" className="w-full bg-transparent text-center text-white focus:outline-none" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {actualStep === 5 && (
              <motion.div key="step5" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-green-500/20 text-green-400 rounded-lg"><ImageIcon className="w-6 h-6" /></div>
                  <h3 className="text-2xl font-bold text-white">Portfolio & Proof of Work</h3>
                </div>
                <p className="text-slate-400 mb-6">Upload images, videos, or links to previous projects to build credibility.</p>
                <div className="space-y-6">
                  <div className="border-2 border-dashed border-slate-700 rounded-2xl p-8 text-center hover:border-blue-500 hover:bg-slate-800/50 transition-colors cursor-pointer group">
                    <Upload className="w-10 h-10 text-slate-500 mx-auto mb-3 group-hover:text-blue-400 transition-colors" />
                    <p className="text-white font-medium mb-1">Click to upload or drag and drop</p>
                    <p className="text-xs text-slate-400">SVG, PNG, JPG, MP4 or GIF (max. 10MB)</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-400 mb-2">External Portfolio Links</label>
                    <div className="space-y-3">
                      <input type="url" className="w-full bg-slate-900 border border-slate-700 rounded-xl py-3 px-4 text-white focus:border-blue-500 focus:outline-none transition-colors" placeholder="https://dribbble.com/yourprofile" />
                      <input type="url" className="w-full bg-slate-900 border border-slate-700 rounded-xl py-3 px-4 text-white focus:border-blue-500 focus:outline-none transition-colors" placeholder="https://github.com/yourprofile" />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {actualStep === 6 && (
              <motion.div key="step6" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-yellow-500/20 text-yellow-400 rounded-lg"><Award className="w-6 h-6" /></div>
                  <h3 className="text-2xl font-bold text-white">Experience & Credibility</h3>
                </div>
                <p className="text-slate-400 mb-6">Add your achievements to stand out to potential buyers.</p>
                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-slate-400 mb-2">Years of Experience</label>
                    <div className="grid grid-cols-4 gap-2">
                      {['< 1', '1-3', '3-5', '5+'].map(y => (
                        <button key={y} className="py-2 rounded-xl border border-slate-700 bg-slate-800/50 hover:bg-slate-700 text-slate-300 focus:bg-blue-600 focus:text-white focus:border-blue-500 transition-colors">
                          {y} yrs
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-400 mb-1">Certifications & Courses</label>
                    <input type="text" className="w-full bg-slate-900 border border-slate-700 rounded-xl py-3 px-4 text-white focus:border-blue-500 focus:outline-none transition-colors" placeholder="e.g. Google UX Design Certificate" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-400 mb-1">Awards & Hackathons</label>
                    <input type="text" className="w-full bg-slate-900 border border-slate-700 rounded-xl py-3 px-4 text-white focus:border-blue-500 focus:outline-none transition-colors" placeholder="e.g. 1st Place Global Hackathon 2023" />
                  </div>
                </div>
              </motion.div>
            )}

            {actualStep === 7 && (
              <motion.div key="step7" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-indigo-500/20 text-indigo-400 rounded-lg"><FileText className="w-6 h-6" /></div>
                  <h3 className="text-2xl font-bold text-white">About Me</h3>
                </div>
                <p className="text-slate-400 mb-6">Write a compelling bio. This is your personal introduction.</p>
                <div className="space-y-4">
                  <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 mb-4">
                    <h4 className="text-sm font-bold text-blue-400 mb-2 flex items-center gap-1"><Sparkles className="w-4 h-4" /> Pro Tips</h4>
                    <ul className="text-xs text-slate-300 space-y-2 list-disc pl-4">
                      <li>Highlight your unique approach or philosophy.</li>
                      <li>Mention who you typically work with (e.g. startups, agencies).</li>
                      <li>Keep it conversational but professional.</li>
                    </ul>
                  </div>
                  <div>
                    <textarea rows={6} className="w-full bg-slate-900 border border-slate-700 rounded-xl py-3 px-4 text-white focus:border-blue-500 focus:outline-none transition-colors resize-none" placeholder="Hi, I'm [Name]. I specialize in..." />
                  </div>
                </div>
              </motion.div>
            )}

            {actualStep === 8 && (
              <motion.div key="step8" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-rose-500/20 text-rose-400 rounded-lg"><Palette className="w-6 h-6" /></div>
                  <h3 className="text-2xl font-bold text-white">Profile Personalization</h3>
                </div>
                <p className="text-slate-400 mb-6">Complete your visual identity and link your social accounts.</p>
                <div className="space-y-6">
                  <div className="flex items-center gap-6">
                    <div className="w-24 h-24 rounded-full bg-slate-800 border-2 border-dashed border-slate-600 flex items-center justify-center text-slate-500 hover:border-blue-500 hover:text-blue-400 cursor-pointer transition-colors">
                      <Upload className="w-8 h-8" />
                    </div>
                    <div>
                      <h4 className="text-white font-medium mb-1">Profile Picture</h4>
                      <p className="text-xs text-slate-400">Upload a professional headshot or logo.</p>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-400 mb-3">Theme Accent</label>
                    <div className="flex gap-3">
                      {['bg-blue-500', 'bg-purple-500', 'bg-pink-500', 'bg-green-500', 'bg-amber-500'].map((color, i) => (
                        <button key={color} className={`w-10 h-10 rounded-full ${color} ring-2 ring-offset-2 ring-offset-slate-900 ${i === 0 ? 'ring-white' : 'ring-transparent hover:ring-slate-500'} transition-all`} />
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="block text-sm font-medium text-slate-400">Social Links</label>
                    <input type="url" className="w-full bg-slate-900 border border-slate-700 rounded-xl py-2.5 px-4 text-white focus:border-blue-500 focus:outline-none transition-colors text-sm" placeholder="LinkedIn URL" />
                    <input type="url" className="w-full bg-slate-900 border border-slate-700 rounded-xl py-2.5 px-4 text-white focus:border-blue-500 focus:outline-none transition-colors text-sm" placeholder="Twitter URL" />
                  </div>
                </div>
              </motion.div>
            )}

            {actualStep === 9 && (
              <motion.div key="step9" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-8">
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1, rotate: 360 }}
                  transition={{ type: "spring", duration: 1, delay: 0.2 }}
                  className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(59,130,246,0.5)]"
                >
                  <Rocket className="w-12 h-12 text-white" />
                </motion.div>
                <h3 className="text-3xl font-extrabold text-white mb-2">Your Profile is Live 🚀</h3>
                <p className="text-slate-400 mb-8 max-w-sm mx-auto">Your structured profile{isBuyerOnly ? '' : ', portfolio, and first gig '} have been successfully generated.</p>
                
                <div className="bg-slate-800/50 rounded-2xl p-5 mb-8 text-left border border-slate-700/50">
                  <h4 className="text-sm font-bold text-white mb-3 flex items-center gap-2"><Award className="w-4 h-4 text-yellow-400" /> Loyalty Progress</h4>
                  <div className="flex justify-between text-xs text-slate-400 mb-2">
                    <span>0 Orders</span>
                    <span>10 Orders for 'Trusted' Badge</span>
                  </div>
                  <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-yellow-500 to-amber-500 w-[5%]" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 text-left">
                  <div className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-4">
                    <Check className="w-5 h-5 text-green-400 mb-2" />
                    <p className="text-sm text-white font-medium">Profile Created</p>
                  </div>
                  {!isBuyerOnly && (
                    <div className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-4">
                      <Check className="w-5 h-5 text-green-400 mb-2" />
                      <p className="text-sm text-white font-medium">Gig Published</p>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-slate-800 flex justify-between bg-slate-900/50">
          {step > 1 && step < totalSteps ? (
            <button onClick={prevStep} className="px-6 py-2 rounded-xl text-slate-400 hover:text-white transition-colors font-medium">
              Back
            </button>
          ) : <div></div>}
          
          {step < totalSteps ? (
            <button 
              onClick={nextStep} 
              disabled={step === 2 && !role}
              className={`px-6 py-2 rounded-xl font-medium transition-all flex items-center gap-2 ml-auto ${
                step === 2 && !role 
                  ? 'bg-slate-800 text-slate-500 cursor-not-allowed' 
                  : 'bg-blue-600 hover:bg-blue-500 text-white hover-glow-blue'
              }`}
            >
              Continue <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button onClick={handleComplete} className="px-8 py-3 w-full rounded-xl bg-gradient-primary hover:opacity-90 text-white font-bold transition-all hover-glow flex items-center justify-center gap-2">
              Go to Live Profile <ChevronRight className="w-5 h-5" />
            </button>
          )}
        </div>
      </motion.div>
    </div>
  );
}
