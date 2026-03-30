import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { Search, Filter, Star, TrendingUp, Award, Instagram, Linkedin, Twitter, ChevronDown } from 'lucide-react';
import { CATEGORIES, GIGS } from '../data';

export default function Marketplace({ onGigClick }: { onGigClick: (id: string) => void }) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('relevance');

  const filteredGigs = useMemo(() => {
    let result = GIGS.filter(gig => {
      const matchesCategory = activeCategory === 'All' || gig.category === activeCategory;
      const matchesSearch = gig.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            gig.tags.some((t: string) => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
                            gig.creator.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });

    if (sortBy === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [activeCategory, searchQuery, sortBy]);

  const trendingGigs = useMemo(() => GIGS.filter(g => g.trending), []);
  
  // Extract unique top creators
  const topCreators = useMemo(() => {
    const creatorsMap = new Map();
    GIGS.filter(g => g.creator.isTopCreator).forEach(g => {
      if (!creatorsMap.has(g.creator.id)) {
        creatorsMap.set(g.creator.id, g.creator);
      }
    });
    return Array.from(creatorsMap.values());
  }, []);

  return (
    <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold mb-2">Discover Talent</h2>
          <p className="text-slate-400">Find the perfect creator for your next project.</p>
        </div>
        
        <div className="w-full md:w-auto flex flex-col sm:flex-row gap-4">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input 
              type="text" 
              placeholder="Search skills like Video Editing..."
              className="w-full bg-slate-800/50 border border-slate-700 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-pink-500 transition-colors"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button className="glass px-4 py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-slate-800 transition-colors">
            <Filter className="w-5 h-5" />
            <span>Filters</span>
          </button>
        </div>
      </div>

      {/* Categories */}
      <div className="flex overflow-x-auto pb-4 mb-12 gap-3 scrollbar-hide">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`whitespace-nowrap px-6 py-2 rounded-full border transition-all ${
              activeCategory === cat 
                ? 'bg-blue-600 border-blue-600 text-white shadow-[0_0_15px_rgba(59,130,246,0.4)]' 
                : 'bg-slate-800/50 border-slate-700 text-slate-300 hover:border-slate-500'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Trending Section (Only show when not searching/filtering) */}
      {activeCategory === 'All' && searchQuery === '' && (
        <div className="mb-16">
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp className="w-6 h-6 text-pink-500" />
            <h2 className="text-2xl font-bold">Trending Gigs</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {trendingGigs.map((gig, index) => (
              <GigCard key={`trending-${gig.id}`} gig={gig} onClick={() => onGigClick(gig.id)} index={index} />
            ))}
          </div>
        </div>
      )}

      {/* Top Creators Section (Only show when not searching/filtering) */}
      {activeCategory === 'All' && searchQuery === '' && (
        <div className="mb-16">
          <div className="flex items-center gap-2 mb-6">
            <Award className="w-6 h-6 text-yellow-400" />
            <h2 className="text-2xl font-bold">Top Creators</h2>
          </div>
          <div className="flex overflow-x-auto gap-6 pb-4 scrollbar-hide">
            {topCreators.map((creator, index) => (
              <motion.div 
                key={creator.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="glass-card rounded-2xl p-6 flex flex-col items-center min-w-[200px] cursor-pointer hover:bg-slate-800/80 transition-colors"
              >
                <img src={creator.avatar} alt={creator.name} className="w-20 h-20 rounded-full mb-4 object-cover border-2 border-blue-500" referrerPolicy="no-referrer" />
                <h3 className="font-bold text-lg text-center">{creator.name}</h3>
                <p className="text-xs text-pink-400 mb-2">{creator.level}</p>
                <p className="text-sm text-slate-400 text-center line-clamp-1">{creator.tagline}</p>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Main Grid */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <h2 className="text-2xl font-bold">{searchQuery ? 'Search Results' : 'Explore All Gigs'}</h2>
        
        <div className="flex items-center gap-2">
          <span className="text-sm text-slate-400">Sort by:</span>
          <div className="relative">
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-slate-800/50 border border-slate-700 rounded-xl py-2 pl-4 pr-10 text-white focus:outline-none focus:border-pink-500 transition-colors appearance-none cursor-pointer"
            >
              <option value="relevance">Relevance</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rating</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredGigs.map((gig, index) => (
          <GigCard key={gig.id} gig={gig} onClick={() => onGigClick(gig.id)} index={index} />
        ))}
      </div>
      
      {filteredGigs.length === 0 && (
        <div className="text-center py-20 text-slate-400">
          No gigs found matching your criteria.
        </div>
      )}
    </section>
  );
}

const GigCard: React.FC<{ gig: any, onClick: () => void, index: number }> = ({ gig, onClick, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ y: -8, scale: 1.02 }}
      onClick={onClick}
      className="glass-card rounded-2xl overflow-hidden cursor-pointer group flex flex-col h-full"
    >
      <div className="relative aspect-video overflow-hidden">
        <img 
          src={gig.thumbnail} 
          alt={gig.title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md px-2 py-1 rounded-lg flex items-center gap-1 text-sm font-medium">
          <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
          <span>{gig.rating}</span>
          <span className="text-slate-400">({gig.reviews})</span>
        </div>
      </div>
      
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <img src={gig.creator.avatar} alt={gig.creator.name} className="w-8 h-8 rounded-full object-cover" referrerPolicy="no-referrer" />
            <div>
              <p className="text-sm font-medium text-slate-200">{gig.creator.name}</p>
              <p className="text-xs text-slate-400">{gig.creator.level}</p>
            </div>
          </div>
          {/* Discreet Social Icons on Hover */}
          {gig.creator.socials && (
            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {gig.creator.socials.instagram && (
                <a href={gig.creator.socials.instagram} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="text-slate-400 hover:text-pink-400 transition-colors">
                  <Instagram className="w-3.5 h-3.5" />
                </a>
              )}
              {gig.creator.socials.twitter && (
                <a href={gig.creator.socials.twitter} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="text-slate-400 hover:text-blue-400 transition-colors">
                  <Twitter className="w-3.5 h-3.5" />
                </a>
              )}
              {gig.creator.socials.linkedin && (
                <a href={gig.creator.socials.linkedin} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="text-slate-400 hover:text-blue-500 transition-colors">
                  <Linkedin className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          )}
        </div>
        
        <h3 className="text-lg font-semibold mb-2 group-hover:text-pink-400 transition-colors line-clamp-2">{gig.title}</h3>
        
        <div className="flex flex-wrap gap-2 mb-4 mt-auto">
          {gig.tags.slice(0, 3).map((tag: string) => (
            <span key={tag} className="text-xs px-2 py-1 rounded-md bg-slate-800 text-slate-300 border border-slate-700">
              {tag}
            </span>
          ))}
        </div>
        
        <div className="pt-4 border-t border-slate-800 flex justify-between items-center mt-auto">
          <span className="text-slate-400 text-sm">Starting at</span>
          <span className="text-xl font-bold text-white">${gig.price}</span>
        </div>
      </div>
    </motion.div>
  );
}
