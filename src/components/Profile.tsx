import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, MapPin, Calendar, Star, Award, Phone, Instagram, Linkedin, Twitter,
  CheckCircle, Flame, Trophy, BookOpen, Target, Briefcase, Users, MessageSquare,
  GraduationCap, Zap, Activity, ChevronRight, ExternalLink, Rocket, PlusCircle
} from 'lucide-react';
import { GIGS } from '../data';

export default function Profile({ creatorId, onBack, onGigClick }: { creatorId: string, onBack: () => void, onGigClick: (id: string) => void }) {
  const [activeTab, setActiveTab] = useState<'overview' | 'portfolio'>('overview');
  const [showSuccess, setShowSuccess] = useState(false);
  
  const isNewUser = creatorId === 'new-user';

  useEffect(() => {
    if (isNewUser) {
      setShowSuccess(true);
      const timer = setTimeout(() => setShowSuccess(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [isNewUser]);
  
  // Mock finding creator
  const baseCreator = GIGS.find(g => g.creator.id === creatorId)?.creator || GIGS[0].creator;
  
  const creator = isNewUser ? {
    ...baseCreator,
    name: "John Doe",
    tagline: "Creative Video Editor & Motion Designer",
    rating: 0,
    reviews: 0,
    avatar: "https://picsum.photos/seed/newuser/200/200",
    verified: true,
    memberSince: "2026",
    location: "New York, USA",
    languages: ["English"],
    skills: ["Video Editing", "After Effects", "Premiere Pro", "Color Grading"],
    about: "Hi, I'm John. I specialize in creating cinematic videos and motion graphics that help brands tell their unique stories. I'm excited to start my journey on Acharya Market and collaborate with amazing clients.",
    education: "B.A. Film Production",
    certifications: ["Google UX Design Certificate"],
    achievements: ["1st Place Global Hackathon 2023"]
  } : baseCreator;

  const creatorGigs = isNewUser ? [
    {
      ...GIGS[0],
      id: 'new-gig-1',
      title: "I will create a cinematic video for your brand",
      price: 50,
      rating: 0,
      reviews: 0,
      image: "https://picsum.photos/seed/newgig/800/600"
    }
  ] : GIGS.filter(g => g.creator.id === creatorId || true).slice(0, 3); // Mock

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <AnimatePresence>
        {showSuccess && (
          <motion.div 
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-24 left-1/2 -translate-x-1/2 z-50 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-3 border border-white/20"
          >
            <Rocket className="w-5 h-5" />
            <span className="font-bold">Your Profile is Live!</span>
          </motion.div>
        )}
      </AnimatePresence>

      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-slate-400 hover:text-white mb-8 transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        <span>Back</span>
      </button>

      {isNewUser && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-5 flex items-start gap-4 hover:bg-slate-800 transition-colors cursor-pointer group">
            <div className="p-3 bg-blue-500/20 text-blue-400 rounded-xl group-hover:scale-110 transition-transform"><Target className="w-6 h-6" /></div>
            <div>
              <h4 className="text-white font-bold mb-1">Complete your first order</h4>
              <p className="text-xs text-slate-400">Get your first client and start building your reputation.</p>
            </div>
          </div>
          <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-5 flex items-start gap-4 hover:bg-slate-800 transition-colors cursor-pointer group">
            <div className="p-3 bg-yellow-500/20 text-yellow-400 rounded-xl group-hover:scale-110 transition-transform"><Star className="w-6 h-6" /></div>
            <div>
              <h4 className="text-white font-bold mb-1">Get your first review</h4>
              <p className="text-xs text-slate-400">Deliver great work to earn a 5-star rating.</p>
            </div>
          </div>
          <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-5 flex items-start gap-4 hover:bg-slate-800 transition-colors cursor-pointer group">
            <div className="p-3 bg-pink-500/20 text-pink-400 rounded-xl group-hover:scale-110 transition-transform"><PlusCircle className="w-6 h-6" /></div>
            <div>
              <h4 className="text-white font-bold mb-1">Add more portfolio items</h4>
              <p className="text-xs text-slate-400">Showcase your best work to attract more buyers.</p>
            </div>
          </div>
        </div>
      )}

      {/* Header Profile Card */}
      <div className="glass-card rounded-3xl p-8 mb-8 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20" />
        
        <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start md:items-center mt-12">
          <div className="relative">
            <img 
              src={creator.avatar} 
              alt={creator.name} 
              className="w-32 h-32 rounded-full border-4 border-[#0F172A] object-cover shadow-xl"
              referrerPolicy="no-referrer"
            />
            {creator.verified && (
              <div className="absolute bottom-2 right-2 bg-blue-500 text-white p-1 rounded-full border-2 border-[#0F172A]" title="Verified Creator">
                <CheckCircle className="w-4 h-4" />
              </div>
            )}
          </div>
          
          <div className="flex-grow">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2">
              <div>
                <h1 className="text-3xl font-bold text-white flex items-center gap-3 flex-wrap">
                  {creator.name}
                  {creator.verified && (
                    <span className="text-sm px-2 py-1 bg-blue-500/20 text-blue-400 rounded-lg border border-blue-500/30 flex items-center gap-1">
                      <CheckCircle className="w-4 h-4" /> Verified Creator
                    </span>
                  )}
                  {creator.badges?.[0] && (
                    <span className="text-sm px-2 py-1 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 text-yellow-400 rounded-lg border border-yellow-500/30 flex items-center gap-1">
                      {creator.badges[0].icon} {creator.badges[0].name}
                    </span>
                  )}
                </h1>
                <p className="text-lg text-pink-400 font-medium">{creator.tagline}</p>
              </div>
              
              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3">
                {creator.phone && (
                  <a 
                    href={`tel:${creator.phone}`}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-green-600/20 text-green-400 hover:bg-green-600/30 transition-colors font-medium border border-green-500/30"
                  >
                    <Phone className="w-4 h-4" />
                    Call
                  </a>
                )}
                <button className="px-4 py-2 rounded-xl glass hover:bg-slate-800 transition-colors font-medium flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Collab
                </button>
                {creator.phone ? (
                  <a 
                    href={`https://wa.me/${creator.phone.replace(/\D/g, '')}?text=${encodeURIComponent(`Hi ${creator.name}, I found your profile on Acharya Market and I'm interested in hiring you for a project.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 transition-colors font-medium hover-glow-blue flex items-center gap-2"
                  >
                    <Briefcase className="w-4 h-4" />
                    Hire Me
                  </a>
                ) : (
                  <button 
                    onClick={() => alert("This creator hasn't provided a contact number.")}
                    className="px-6 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 transition-colors font-medium hover-glow-blue flex items-center gap-2 opacity-50 cursor-not-allowed"
                  >
                    <Briefcase className="w-4 h-4" />
                    Hire Me
                  </button>
                )}
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mt-4">
              <div className="flex flex-wrap gap-4 text-sm text-slate-400">
                <span className="flex items-center gap-1"><MapPin className="w-4 h-4"/> New York, USA</span>
                <span className="flex items-center gap-1"><Briefcase className="w-4 h-4"/> {creator.academics?.branch || 'Professional'}</span>
                <span className="flex items-center gap-1"><Star className="w-4 h-4 text-yellow-400"/> 4.9 (124 Reviews)</span>
              </div>
              
              {creator.socials && (
                <div className="flex items-center gap-3">
                  {creator.socials.instagram && (
                    <a href={creator.socials.instagram} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full glass hover:bg-pink-500/20 hover:text-pink-400 transition-colors text-slate-400">
                      <Instagram className="w-4 h-4" />
                    </a>
                  )}
                  {creator.socials.twitter && (
                    <a href={creator.socials.twitter} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full glass hover:bg-blue-400/20 hover:text-blue-400 transition-colors text-slate-400">
                      <Twitter className="w-4 h-4" />
                    </a>
                  )}
                  {creator.socials.linkedin && (
                    <a href={creator.socials.linkedin} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full glass hover:bg-blue-600/20 hover:text-blue-500 transition-colors text-slate-400">
                      <Linkedin className="w-4 h-4" />
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Gamification Stats Row */}
        {creator.stats && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-6 border-t border-slate-800/50">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-orange-500/10 text-orange-400">
                <Flame className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xl font-bold text-white">{creator.stats.streak} Days</p>
                <p className="text-xs text-slate-400">Active Streak</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-purple-500/10 text-purple-400">
                <Target className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xl font-bold text-white">7/10</p>
                <p className="text-xs text-slate-400">Orders to Next Badge</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-blue-500/10 text-blue-400">
                <Briefcase className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xl font-bold text-white">{creator.stats.projectsCompleted}</p>
                <p className="text-xs text-slate-400">Projects Done</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-green-500/10 text-green-400">
                <CheckCircle className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xl font-bold text-white">{creator.stats.endorsements}</p>
                <p className="text-xs text-slate-400">Peer Endorsements</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Tab Navigation */}
      <div className="flex overflow-x-auto gap-2 mb-8 p-1 bg-slate-800/50 rounded-2xl w-fit">
        {(['overview', 'portfolio'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-2.5 rounded-xl font-medium text-sm transition-all capitalize ${
              activeTab === tab 
                ? 'bg-blue-600 text-white shadow-lg' 
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/50'
            }`}
          >
            {tab === 'overview' ? 'Identity & Skills' : 'Portfolio & Services'}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="min-h-[500px]">
        <AnimatePresence mode="wait">
          {activeTab === 'overview' && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-8"
            >
              {/* Left Col: Bio & Skills */}
              <div className="lg:col-span-2 space-y-8">
                <section className="glass-card p-6 rounded-2xl">
                  <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-blue-400" /> About Me
                  </h2>
                  <p className="text-slate-300 leading-relaxed">
                    Hi! I'm a passionate creator specializing in digital experiences. I've been honing my skills for over 4 years, working with various clients and personal projects. I specialize in delivering high-quality work that exceeds expectations and keeps audiences engaged. Always eager to collaborate on innovative projects!
                  </p>
                </section>

                <section className="glass-card p-6 rounded-2xl">
                  <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                    <Target className="w-5 h-5 text-pink-400" /> Verified Skills
                  </h2>
                  <div className="space-y-6">
                    {[
                      { name: 'Primary Skill', level: 95, endorsements: 12 },
                      { name: 'Secondary Skill', level: 85, endorsements: 8 },
                      { name: 'Creative Tools', level: 75, endorsements: 5 },
                    ].map(skill => (
                      <div key={skill.name}>
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-slate-200 font-medium">{skill.name}</span>
                          <div className="flex items-center gap-3">
                            <span className="text-xs text-slate-400 flex items-center gap-1">
                              <Users className="w-3 h-3" /> {skill.endorsements} endorsements
                            </span>
                            <span className="text-blue-400 font-bold">{skill.level}%</span>
                          </div>
                        </div>
                        <div className="h-2.5 bg-slate-800 rounded-full overflow-hidden">
                          <motion.div 
                            className="h-full bg-gradient-to-r from-blue-500 to-pink-500"
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, ease: "easeOut" }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
                
                {/* Achievements */}
                {creator.achievements && creator.achievements.length > 0 && (
                  <section className="glass-card p-6 rounded-2xl">
                    <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                      <Trophy className="w-5 h-5 text-yellow-400" /> Achievements & Certifications
                    </h2>
                    <div className="space-y-4">
                      {creator.achievements.map((ach: any, i: number) => (
                        <div key={i} className="flex items-start gap-4 p-4 rounded-xl bg-slate-800/30 border border-slate-700/50">
                          <div className="p-2 bg-yellow-500/10 rounded-lg text-yellow-400">
                            <Award className="w-6 h-6" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-white">{ach.title}</h3>
                            <p className="text-sm text-slate-400">{ach.issuer} • {ach.date}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                )}
              </div>

              {/* Right Col: Badges & Interests */}
              <div className="space-y-8">
                <section className="glass-card p-6 rounded-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 blur-3xl rounded-full" />
                  <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Award className="w-5 h-5 text-purple-400" /> Loyalty & Status
                  </h2>
                  
                  {/* Current Status */}
                  <div className="mb-6">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center shadow-lg shadow-purple-500/20">
                        <Award className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-bold text-white text-lg">Trusted Buyer</h3>
                        <p className="text-xs text-slate-400">Level 2 Member</p>
                      </div>
                    </div>
                    <p className="text-sm text-slate-300 mt-2">
                      You are recognized as a reliable partner on Acharya Market. Creators prioritize your requests.
                    </p>
                  </div>

                  {/* Progress to Next Tier */}
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-slate-400">Next: <span className="text-slate-200 font-semibold">Pro Collaborator</span></span>
                      <span className="text-purple-400 font-bold">7/10 Orders</span>
                    </div>
                    <div className="h-2.5 bg-slate-800 rounded-full overflow-hidden mb-2">
                      <motion.div 
                        className="h-full bg-gradient-to-r from-purple-500 to-blue-500"
                        initial={{ width: 0 }}
                        whileInView={{ width: '70%' }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: "easeOut" }}
                      />
                    </div>
                    <p className="text-xs text-slate-500">Complete 3 more orders to unlock priority support and exclusive discounts.</p>
                  </div>
                </section>

                {creator.badges && (
                  <section className="glass-card p-6 rounded-2xl">
                    <h2 className="text-lg font-semibold mb-4">Earned Badges</h2>
                    <div className="flex flex-wrap gap-3">
                      {creator.badges.map((badge: any, i: number) => (
                        <div key={i} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-800/50 border border-slate-700 text-sm">
                          <span>{badge.icon}</span>
                          <span className="text-slate-200">{badge.name}</span>
                        </div>
                      ))}
                      <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-purple-500/10 border border-purple-500/30 text-sm">
                        <Award className="w-4 h-4 text-purple-400" />
                        <span className="text-purple-300 font-medium">Trusted Buyer</span>
                      </div>
                    </div>
                  </section>
                )}

                {creator.learningInterests && (
                  <section className="glass-card p-6 rounded-2xl">
                    <h2 className="text-lg font-semibold mb-4">Learning Interests</h2>
                    <div className="flex flex-wrap gap-2">
                      {creator.learningInterests.map((interest: string, i: number) => (
                        <span key={i} className="px-3 py-1.5 rounded-full bg-blue-500/10 text-blue-400 text-xs font-medium border border-blue-500/20">
                          {interest}
                        </span>
                      ))}
                    </div>
                  </section>
                )}
                
                <section className="glass-card p-6 rounded-2xl">
                  <h2 className="text-lg font-semibold mb-4">Peer Endorsements</h2>
                  <div className="flex -space-x-2 overflow-hidden mb-3">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <img key={i} className="inline-block h-8 w-8 rounded-full ring-2 ring-[#0F172A]" src={`https://picsum.photos/seed/peer${i}/100/100`} alt="" />
                    ))}
                  </div>
                  <p className="text-sm text-slate-400">Endorsed by 45+ peers and professors.</p>
                  <button className="mt-4 w-full py-2 rounded-lg border border-slate-700 text-sm font-medium hover:bg-slate-800 transition-colors">
                    Endorse {creator.name.split(' ')[0]}
                  </button>
                </section>
              </div>
            </motion.div>
          )}

          {activeTab === 'portfolio' && (
            <motion.div
              key="portfolio"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="space-y-12"
            >
              {/* Portfolio Grid */}
              <section>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold flex items-center gap-2">
                    <Briefcase className="w-6 h-6 text-blue-400" /> Portfolio Projects
                  </h2>
                  <button className="text-sm text-blue-400 hover:text-blue-300 flex items-center gap-1">
                    View All <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
                
                {creator.portfolio && creator.portfolio.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {creator.portfolio.map((item: any) => (
                      <div key={item.id} className="group relative rounded-2xl overflow-hidden glass-card cursor-pointer">
                        <div className="aspect-video">
                          <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
                          <span className="text-xs font-bold text-pink-400 mb-1">{item.type}</span>
                          <h3 className="text-lg font-bold text-white flex items-center justify-between">
                            {item.title}
                            <ExternalLink className="w-4 h-4" />
                          </h3>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-8 text-center glass-card rounded-2xl text-slate-400">
                    No portfolio projects added yet.
                  </div>
                )}
              </section>

              {/* Services / Gigs */}
              <section>
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <Zap className="w-6 h-6 text-yellow-400" /> Services Offered
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {creatorGigs.map((gig, i) => (
                    <motion.div
                      key={gig.id + i}
                      whileHover={{ y: -4 }}
                      onClick={() => onGigClick(gig.id)}
                      className="glass-card rounded-2xl overflow-hidden cursor-pointer group flex flex-col h-full"
                    >
                      <div className="aspect-video relative">
                        <img src={gig.thumbnail} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      </div>
                      <div className="p-5 flex flex-col flex-grow">
                        <h3 className="font-semibold mb-2 group-hover:text-blue-400 transition-colors line-clamp-2">{gig.title}</h3>
                        <div className="flex justify-between items-center text-sm mt-auto pt-4 border-t border-slate-800">
                          <span className="text-yellow-400 flex items-center gap-1"><Star className="w-3 h-3 fill-current"/> {gig.rating}</span>
                          <span className="font-bold text-white">From ${gig.price}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </section>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
