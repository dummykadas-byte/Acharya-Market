import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Star, CheckCircle2, Clock, RotateCcw, MessageSquare, ThumbsUp, Phone, ShieldCheck, Zap, Users, BookOpen, ChevronDown, Filter, Paperclip, PlayCircle, Award, TrendingUp, HelpCircle, Lock, X, ArrowRight } from 'lucide-react';
import { GIGS } from '../data';

export default function GigDetail({ gigId, onBack, onCreatorClick }: { gigId: string, onBack: () => void, onCreatorClick: (id: string) => void }) {
  const gig = GIGS.find(g => g.id === gigId) || GIGS[0];
  const recommendations = GIGS.filter(g => g.category === gig.category && g.id !== gig.id).slice(0, 3);

  const [pricingTab, setPricingTab] = useState<'Basic' | 'Standard' | 'Premium'>('Standard');
  const [reviewFilter, setReviewFilter] = useState('Most Recent');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Modal states
  const [showGroupOrder, setShowGroupOrder] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);

  const pricingData = {
    Basic: { price: gig.price, delivery: '5 Days', revisions: '1 Revision', desc: 'Essential features for simple projects.', bestFor: false },
    Standard: { price: gig.price * 1.5, delivery: '3 Days', revisions: '2 Revisions', desc: 'High quality delivery with all standard features included. Perfect for most projects.', bestFor: true },
    Premium: { price: gig.price * 2.5, delivery: '24 Hours', revisions: 'Unlimited', desc: 'VIP support, fastest delivery, and all premium source files.', bestFor: false }
  };

  const currentPrice = pricingData[pricingTab].price;

  const faqs = [
    { q: "Do you provide a plagiarism report?", a: "Yes, all premium and standard orders come with a detailed Copyscape report." },
    { q: "Can you meet a 24-hour deadline?", a: "Absolutely! Select the Premium package or add the 'Extra Fast Delivery' add-on." },
    { q: "Do you offer bulk discounts?", a: "Yes, for orders of 5 or more items, please contact me directly for a custom quote." }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
      <button onClick={onBack} className="flex items-center gap-2 text-slate-400 hover:text-white mb-8 transition-colors group">
        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
        <span className="font-medium">Back to Explore</span>
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* Left Column: Details */}
        <div className="lg:col-span-8 space-y-10">
          
          {/* Header */}
          <div className="space-y-6">
            <div className="flex flex-wrap items-center gap-3">
              <span className="px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" /> Premium Service
              </span>
              <span className="px-3 py-1.5 rounded-full bg-pink-500/10 border border-pink-500/30 text-pink-400 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                <TrendingUp className="w-3.5 h-3.5" /> Top Rated
              </span>
            </div>
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight text-white">
              {gig.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-6 text-sm text-slate-400 pb-6 border-b border-slate-800/60">
              <div className="flex items-center gap-3 cursor-pointer hover:bg-slate-800/50 p-2 -ml-2 rounded-xl transition-colors" onClick={() => onCreatorClick(gig.creator.id)}>
                <img src={gig.creator.avatar} alt="" className="w-10 h-10 rounded-full border-2 border-slate-700" referrerPolicy="no-referrer" />
                <div>
                  <span className="block font-bold text-slate-200 text-base">{gig.creator.name}</span>
                  <span className="text-xs text-blue-400">{gig.creator.level}</span>
                </div>
              </div>
              
              <div className="w-px h-8 bg-slate-800 hidden sm:block"></div>
              
              <div className="flex items-center gap-1.5">
                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-yellow-500/10">
                  <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                </div>
                <span className="text-white font-bold text-base">{gig.rating}</span>
                <span className="underline decoration-slate-600 underline-offset-4 hover:text-slate-300 cursor-pointer transition-colors">
                  ({gig.reviews} reviews)
                </span>
              </div>
            </div>
          </div>

          {/* Media Carousel */}
          <div className="relative aspect-video rounded-3xl overflow-hidden border border-slate-700/50 shadow-2xl group cursor-pointer bg-slate-900">
            <img src={gig.thumbnail} alt={gig.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100" referrerPolicy="no-referrer" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 group-hover:scale-110 transition-transform shadow-2xl">
                <PlayCircle className="w-10 h-10 text-white translate-x-0.5" />
              </div>
            </div>
          </div>

          {/* About & What You'll Get */}
          <section className="glass p-8 md:p-10 rounded-3xl border border-slate-800/60 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 text-white">
              <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400">
                <Zap className="w-5 h-5" />
              </div>
              About This Gig
            </h2>
            
            <p className="text-slate-300 leading-relaxed mb-10 text-lg font-medium">
              {gig.tagline} <br/><br/>
              <span className="text-slate-400 font-normal">Are you looking for a highly skilled professional to bring your vision to life? I specialize in creating engaging and high-quality deliverables optimized for your specific needs.</span>
            </p>
            
            <div className="grid sm:grid-cols-2 gap-8 pt-8 border-t border-slate-800/50">
              <div>
                <h3 className="text-lg font-bold mb-5 text-white flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-400" /> What You'll Get
                </h3>
                <ul className="space-y-4">
                  {['1000+ Words SEO Optimized', 'Keyword Research Included', 'Zero Plagiarism Guarantee', 'Grammarly Premium Checked'].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-slate-300">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-400 mt-2 shrink-0 shadow-[0_0_8px_rgba(74,222,128,0.6)]" />
                      <span className="font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-bold mb-5 text-white flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-blue-400" /> Best Use Cases
                </h3>
                <ul className="space-y-4">
                  {['Professional Reports', 'Tech Startup Blogs', 'Personal Branding Articles', 'LinkedIn Thought Leadership'].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-slate-300">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 shrink-0 shadow-[0_0_8px_rgba(96,165,250,0.6)]" />
                      <span className="font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* Interactive Skills & Tools */}
          <section>
            <h2 className="text-2xl font-bold mb-6 text-white">Skills & Expertise</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {gig.tags.map((tag, i) => (
                <div key={tag} className="glass p-5 rounded-2xl border border-slate-800/60 flex items-center justify-between group hover:border-blue-500/40 hover:bg-slate-800/40 transition-all">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-slate-900/80 border border-slate-700/50 flex items-center justify-center text-blue-400 group-hover:scale-110 group-hover:text-blue-300 transition-all shadow-inner">
                      <Award className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="font-bold text-slate-200 text-base">{tag}</p>
                      <p className="text-sm text-slate-400">{i % 2 === 0 ? 'Expert Level' : 'Intermediate'}</p>
                    </div>
                  </div>
                  <ShieldCheck className="w-5 h-5 text-green-500/40 group-hover:text-green-400 transition-colors" />
                </div>
              ))}
            </div>
          </section>

          {/* Seller Stats */}
          <section className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: 'Orders Completed', value: '124' },
              { label: 'Response Time', value: '< 1 hr' },
              { label: 'On-time Delivery', value: '99%' },
              { label: 'Repeat Clients', value: '32%' }
            ].map((stat, i) => (
              <div key={i} className="glass p-6 rounded-3xl text-center border border-slate-800/50 hover:bg-slate-800/30 transition-colors">
                <p className="text-3xl font-extrabold text-white mb-2">{stat.value}</p>
                <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold">{stat.label}</p>
              </div>
            ))}
          </section>

          {/* Project Preview Samples */}
          <section>
            <h2 className="text-2xl font-bold mb-6 text-white">Portfolio Samples</h2>
            <div className="flex gap-5 overflow-x-auto pb-6 snap-x scrollbar-hide">
              {[1, 2, 3].map((i) => (
                <div key={i} className="min-w-[280px] sm:min-w-[320px] glass rounded-3xl p-4 border border-slate-800/60 snap-center group hover:border-slate-600 transition-colors cursor-pointer">
                  <div className="aspect-video bg-slate-900 rounded-2xl mb-5 overflow-hidden relative border border-slate-800">
                    <img src={`https://picsum.photos/seed/sample${i * 10}/400/225`} alt="Sample" className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-all duration-500 group-hover:scale-105" referrerPolicy="no-referrer" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40">
                      <span className="px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-sm font-bold text-white border border-white/20 shadow-xl">
                        View Details
                      </span>
                    </div>
                  </div>
                  <h4 className="font-bold text-base text-slate-200 px-1">Tech Blog Post - AI Trends</h4>
                  <p className="text-sm text-slate-400 mt-1 px-1">1,200 words • Ranked #1 on Google</p>
                </div>
              ))}
            </div>
          </section>

          {/* FAQ */}
          <section>
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 text-white">
              <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400">
                <HelpCircle className="w-5 h-5" />
              </div>
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <div key={i} className="glass rounded-2xl border border-slate-800/60 overflow-hidden transition-colors hover:border-slate-700">
                  <button 
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left bg-transparent"
                  >
                    <span className="font-bold text-slate-200 text-base pr-8">{faq.q}</span>
                    <div className={`p-1 rounded-full transition-colors ${openFaq === i ? 'bg-blue-500/20 text-blue-400' : 'bg-slate-800 text-slate-400'}`}>
                      <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${openFaq === i ? 'rotate-180' : ''}`} />
                    </div>
                  </button>
                  <AnimatePresence>
                    {openFaq === i && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="px-6 pb-5 text-slate-400 text-base leading-relaxed"
                      >
                        <div className="pt-2 border-t border-slate-800/50 mt-2">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </section>

          {/* Enhanced Reviews */}
          <section className="pt-10 border-t border-slate-800/60">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-10">
              <div>
                <h2 className="text-3xl font-bold text-white mb-2">
                  Client Reviews
                </h2>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    <Star className="w-6 h-6 text-yellow-400 fill-yellow-400" />
                    <span className="text-2xl font-extrabold text-white">{gig.rating}</span>
                  </div>
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-700"></div>
                  <span className="text-base text-slate-400 font-medium">{gig.reviews} total reviews</span>
                </div>
              </div>
              
              <div className="flex items-center gap-3 bg-slate-900/50 p-1.5 rounded-xl border border-slate-800">
                <div className="pl-3 text-slate-400"><Filter className="w-4 h-4" /></div>
                <select 
                  value={reviewFilter}
                  onChange={(e) => setReviewFilter(e.target.value)}
                  className="bg-transparent text-sm font-medium pr-8 py-2 text-white outline-none cursor-pointer appearance-none"
                >
                  <option className="bg-slate-900">Most Recent</option>
                  <option className="bg-slate-900">Highest Rated</option>
                  <option className="bg-slate-900">Verified Buyers</option>
                </select>
              </div>
            </div>

            {/* Rating Breakdown */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-10 p-8 rounded-3xl glass border border-slate-800/50">
              <div className="space-y-3">
                {[5, 4, 3, 2, 1].map((star) => (
                  <div key={star} className="flex items-center gap-4 text-sm font-medium">
                    <span className="w-12 text-slate-300 flex items-center gap-1">{star} <Star className="w-3 h-3 text-slate-500 fill-slate-500" /></span>
                    <div className="flex-1 h-2.5 bg-slate-800 rounded-full overflow-hidden shadow-inner">
                      <div className="h-full bg-yellow-400 rounded-full" style={{ width: star === 5 ? '85%' : star === 4 ? '10%' : '2%' }} />
                    </div>
                    <span className="w-8 text-right text-slate-400">{star === 5 ? '105' : star === 4 ? '12' : '2'}</span>
                  </div>
                ))}
              </div>
              <div className="flex flex-col justify-center items-center sm:items-start sm:pl-8 sm:border-l border-slate-800/50">
                <h4 className="font-bold text-white mb-2">Rating Breakdown</h4>
                <p className="text-sm text-slate-400 mb-4 text-center sm:text-left">Based on {gig.reviews} reviews from verified buyers across all packages.</p>
                <div className="flex gap-2">
                  <span className="px-3 py-1 rounded-lg bg-green-500/10 text-green-400 text-xs font-bold border border-green-500/20">98% Recommended</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              {gig.reviewsList?.map((review: any) => (
                <div key={review.id} className="glass p-8 rounded-3xl border border-slate-800/50 hover:border-slate-700 transition-colors">
                  <div className="flex justify-between items-start mb-5">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center font-bold text-xl text-white shadow-lg border-2 border-slate-800">
                        {review.user.charAt(0)}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-bold text-slate-200 text-base">{review.user}</p>
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-green-500/10 text-green-400 border border-green-500/20 flex items-center gap-1">
                            <ShieldCheck className="w-3 h-3" /> Verified
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 font-medium">{review.date} • Premium Package</p>
                      </div>
                    </div>
                    <div className="flex gap-1 bg-slate-900/50 px-2 py-1 rounded-lg border border-slate-800">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-slate-700'}`} />
                      ))}
                    </div>
                  </div>
                  <p className="text-slate-300 leading-relaxed text-base">{review.comment}</p>
                  
                  {/* Mock Attachment */}
                  {review.rating === 5 && (
                    <div className="mt-5 flex items-center gap-2 text-sm font-medium text-blue-400 bg-blue-500/10 w-fit px-4 py-2 rounded-xl border border-blue-500/20 cursor-pointer hover:bg-blue-500/20 transition-colors">
                      <Paperclip className="w-4 h-4" />
                      <span>View Delivery Sample</span>
                    </div>
                  )}

                  <div className="mt-6 pt-5 border-t border-slate-800/50 flex items-center gap-6 text-sm text-slate-400 font-medium">
                    <button className="flex items-center gap-2 hover:text-blue-400 transition-colors">
                      <ThumbsUp className="w-4 h-4" /> Helpful (12)
                    </button>
                    <button className="flex items-center gap-2 hover:text-slate-200 transition-colors">
                      Share
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right Column: Pricing & Actions */}
        <div className="lg:col-span-4">
          <div className="sticky top-24 space-y-6">
            
            {/* Pricing Card */}
            <div className="glass-card rounded-[2rem] p-1.5 border border-slate-700/60 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
              
              <div className="flex p-1.5 bg-slate-900/90 rounded-3xl mb-4 relative mx-2 mt-4">
                {(['Basic', 'Standard', 'Premium'] as const).map((tier) => (
                  <button 
                    key={tier}
                    onClick={() => setPricingTab(tier)}
                    className={`flex-1 py-3.5 text-sm font-bold rounded-2xl transition-all relative z-10 ${pricingTab === tier ? 'text-white shadow-xl' : 'text-slate-400 hover:text-slate-200'}`}
                  >
                    {pricingTab === tier && (
                      <motion.div layoutId="activeTab" className="absolute inset-0 bg-slate-800 border border-slate-700 rounded-2xl -z-10" />
                    )}
                    {tier}
                  </button>
                ))}
              </div>
              
              <div className="p-6 pt-2">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-2xl font-extrabold text-white mb-1">{pricingTab}</h3>
                    {pricingData[pricingTab].bestFor && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-pink-500/10 border border-pink-500/20 text-pink-400 text-[10px] font-bold uppercase tracking-wider">
                        <Star className="w-3 h-3 fill-pink-400" /> Most Popular
                      </span>
                    )}
                  </div>
                  <div className="text-right">
                    <span className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-white to-slate-400">
                      ${currentPrice.toFixed(2)}
                    </span>
                  </div>
                </div>
                
                <p className="text-slate-300 text-base font-medium mb-8 min-h-[48px] leading-relaxed">
                  {pricingData[pricingTab].desc}
                </p>
                
                <div className="space-y-5 mb-8">
                  <div className="flex items-center gap-4 text-base text-white font-bold bg-slate-800/50 p-3 rounded-xl border border-slate-700/50">
                    <Clock className="w-5 h-5 text-blue-400" />
                    <span>{pricingData[pricingTab].delivery} Delivery</span>
                  </div>
                  <div className="flex items-center gap-4 text-base text-white font-bold bg-slate-800/50 p-3 rounded-xl border border-slate-700/50">
                    <RotateCcw className="w-5 h-5 text-purple-400" />
                    <span>{pricingData[pricingTab].revisions}</span>
                  </div>
                  
                  <div className="pt-6 space-y-4">
                    <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">What's Included</h4>
                    {['SEO Optimization', 'Keyword Research', 'Plagiarism Report', 'Source Files'].map((feature, i) => (
                      <div key={i} className="flex items-center justify-between text-sm font-medium">
                        <span className={i < (pricingTab === 'Basic' ? 2 : pricingTab === 'Standard' ? 3 : 4) ? "text-slate-200" : "text-slate-500"}>{feature}</span>
                        {i < (pricingTab === 'Basic' ? 2 : pricingTab === 'Standard' ? 3 : 4) ? (
                          <CheckCircle2 className="w-5 h-5 text-green-400" />
                        ) : (
                          <span className="w-5 h-5 text-slate-700 flex items-center justify-center">-</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Add-ons */}
                <div className="mb-8 space-y-3">
                  <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">Available Add-ons</h4>
                  <label className="flex items-center gap-4 p-4 rounded-2xl border border-slate-700/60 hover:bg-slate-800/40 cursor-pointer transition-colors group">
                    <div className="relative flex items-center justify-center">
                      <input type="checkbox" className="peer appearance-none w-5 h-5 rounded border-2 border-slate-600 checked:border-blue-500 checked:bg-blue-500 transition-colors cursor-pointer" />
                      <CheckCircle2 className="w-3.5 h-3.5 text-white absolute opacity-0 peer-checked:opacity-100 pointer-events-none" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-bold text-slate-200 group-hover:text-white transition-colors">Extra Fast 24h Delivery</p>
                      <p className="text-xs text-slate-400 font-medium mt-0.5">+ $15.00</p>
                    </div>
                  </label>
                </div>

                <button 
                  onClick={() => setShowCheckout(true)}
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold text-lg transition-all hover-glow mb-4 shadow-[0_0_20px_rgba(59,130,246,0.3)] flex items-center justify-center gap-2"
                >
                  Continue (${currentPrice.toFixed(2)}) <ArrowRight className="w-5 h-5" />
                </button>

                <div className="flex items-center justify-center gap-2 text-xs font-medium text-slate-400 mb-6">
                  <Lock className="w-3.5 h-3.5" /> Secure SSL Payment
                </div>

                <div className="flex gap-3">
                  <button className="flex-1 py-3.5 rounded-xl glass border border-slate-700 hover:bg-slate-800 text-white font-bold transition-all flex items-center justify-center gap-2 text-sm">
                    <MessageSquare className="w-4 h-4" />
                    Contact Seller
                  </button>
                  {gig.creator.phone && (
                    <a href={`tel:${gig.creator.phone}`} className="flex-1 py-3.5 rounded-xl bg-green-500/10 text-green-400 hover:bg-green-500/20 border border-green-500/30 font-bold transition-all flex items-center justify-center gap-2 text-sm">
                      <Phone className="w-4 h-4" />
                      Call Now
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Group Order Option */}
            <div 
              onClick={() => setShowGroupOrder(true)}
              className="glass p-6 rounded-3xl border border-slate-700/60 flex items-start gap-5 cursor-pointer hover:border-purple-500/50 hover:bg-slate-800/30 transition-all group shadow-lg"
            >
              <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 shrink-0 group-hover:scale-110 group-hover:bg-purple-500/20 transition-all">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-white text-base mb-1 group-hover:text-purple-300 transition-colors">Start a Group Order</h4>
                <p className="text-sm text-slate-400 font-medium leading-relaxed">Split the cost with classmates. Invite friends to pay their share securely.</p>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="flex items-center justify-center gap-8 pt-6 pb-4">
              <div className="flex flex-col items-center gap-2 text-slate-400">
                <div className="w-10 h-10 rounded-full bg-slate-800/50 flex items-center justify-center border border-slate-700/50">
                  <ShieldCheck className="w-5 h-5 text-slate-300" />
                </div>
                <span className="text-[10px] uppercase tracking-wider font-bold">Money Back</span>
              </div>
              <div className="flex flex-col items-center gap-2 text-slate-400">
                <div className="w-10 h-10 rounded-full bg-slate-800/50 flex items-center justify-center border border-slate-700/50">
                  <CheckCircle2 className="w-5 h-5 text-slate-300" />
                </div>
                <span className="text-[10px] uppercase tracking-wider font-bold">Quality Assured</span>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Similar Gigs Section */}
      {recommendations.length > 0 && (
        <div className="mt-24 pt-12 border-t border-slate-800/50">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold">Similar Premium Gigs</h2>
            <button className="text-sm text-blue-400 hover:text-blue-300 font-medium">View All</button>
          </div>
          <div className="flex gap-6 overflow-x-auto pb-8 snap-x">
            {recommendations.map((rec) => (
              <motion.div
                key={rec.id}
                whileHover={{ y: -8 }}
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="min-w-[300px] sm:min-w-[350px] glass-card rounded-2xl overflow-hidden cursor-pointer group flex flex-col snap-center border border-slate-800/50 hover:border-slate-700"
              >
                <div className="relative aspect-video overflow-hidden">
                  <img src={rec.thumbnail} alt={rec.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" referrerPolicy="no-referrer" />
                  <div className="absolute top-3 left-3 px-2 py-1 bg-black/60 backdrop-blur-md rounded text-[10px] font-bold uppercase tracking-wider text-white">
                    {rec.category}
                  </div>
                </div>
                <div className="p-5 flex flex-col flex-grow">
                  <div className="flex items-center gap-3 mb-3">
                    <img src={rec.creator.avatar} alt={rec.creator.name} className="w-8 h-8 rounded-full object-cover" referrerPolicy="no-referrer" />
                    <p className="text-sm font-medium text-slate-200">{rec.creator.name}</p>
                    <div className="ml-auto flex items-center gap-1 text-xs font-medium text-yellow-400">
                      <Star className="w-3 h-3 fill-yellow-400" /> {rec.rating}
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold mb-2 group-hover:text-blue-400 transition-colors line-clamp-2">{rec.title}</h3>
                  <div className="pt-4 border-t border-slate-800/50 flex justify-between items-center mt-auto">
                    <span className="text-slate-400 text-xs uppercase tracking-wider font-semibold">Starting at</span>
                    <span className="text-xl font-bold text-white">${rec.price}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Modals */}
      <AnimatePresence>
        {showGroupOrder && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
              className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-md w-full relative"
            >
              <button onClick={() => setShowGroupOrder(false)} className="absolute top-4 right-4 text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
              <div className="w-12 h-12 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center mb-4">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Start a Group Order</h3>
              <p className="text-slate-400 text-sm mb-6">Invite classmates to split the cost of this gig. They will receive an email to pay their share.</p>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">Classmate Emails (comma separated)</label>
                  <textarea placeholder="friend1@uni.edu, friend2@uni.edu" className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors h-24 resize-none" />
                </div>
                <div className="p-4 rounded-xl bg-purple-500/10 border border-purple-500/20">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-slate-300">Total Price</span>
                    <span className="text-white font-medium">${currentPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-purple-400">Your Share (Estimated)</span>
                    <span className="text-purple-400 font-bold">${(currentPrice / 3).toFixed(2)}</span>
                  </div>
                </div>
                <button 
                  onClick={() => setShowGroupOrder(false)}
                  className="w-full py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold transition-colors"
                >
                  Send Invites & Continue
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}

        {showCheckout && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
              className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-md w-full relative"
            >
              <button onClick={() => setShowCheckout(false)} className="absolute top-4 right-4 text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
              <div className="w-12 h-12 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center mb-4">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Order Summary</h3>
              <p className="text-slate-400 text-sm mb-6">Review your order details before proceeding to secure payment.</p>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center pb-4 border-b border-slate-800">
                  <div>
                    <p className="font-medium text-white">{gig.title}</p>
                    <p className="text-sm text-slate-400">{pricingTab} Package</p>
                  </div>
                  <span className="font-bold text-white">${pricingData[pricingTab].price.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center pt-2">
                  <p className="font-bold text-white text-lg">Total</p>
                  <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 text-2xl">
                    ${currentPrice.toFixed(2)}
                  </span>
                </div>
              </div>
              
              <button 
                onClick={() => {
                  alert("Redirecting to secure payment gateway...");
                  setShowCheckout(false);
                }}
                className="w-full py-4 rounded-xl bg-gradient-primary hover:opacity-90 text-white font-bold transition-all hover-glow shadow-lg shadow-blue-500/25 flex justify-center items-center gap-2"
              >
                <Lock className="w-4 h-4" /> Pay Securely
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
