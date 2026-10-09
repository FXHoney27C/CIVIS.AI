import React, { useState } from 'react';
import { MessageSquare, Sparkles, TrendingUp, AlertTriangle, ShieldCheck, Heart, Radio, RefreshCw } from 'lucide-react';
import { SOCIAL_SENTIMENT_FEEDS } from '../data/urbanData.ts';
import { SocialFeedItem } from '../types/index.ts';

export const VibeEngine: React.FC = () => {
  const [feedItems, setFeedItems] = useState<SocialFeedItem[]>(SOCIAL_SENTIMENT_FEEDS);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedNeighborhood, setSelectedNeighborhood] = useState('FC Road & Deccan, Pune');

  const handleRefreshFeed = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      // Simulate incoming micro-feed update
      const newUpdate: SocialFeedItem = {
        id: `feed-${Date.now()}`,
        location: selectedNeighborhood,
        timestamp: 'Just now',
        content: `CIVIS NLP stream updated for ${selectedNeighborhood}: pedestrian count stable, ambient noise comfortable, high positive sentiment detected.`,
        sentiment: 'Peaceful',
        sentimentConfidence: 95,
        verifiedLocal: true
      };
      setFeedItems([newUpdate, ...feedItems.slice(0, 3)]);
    }, 600);
  };

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/10">
      
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 text-xs tracking-wider text-slate-400 uppercase font-mono mb-3">
          <span className="text-[#FFD700]">Natural Language Processing</span>
          <span aria-hidden="true" className="text-slate-600">·</span>
          <span>Social Vibe Scoring</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-display mb-4">
          Real-Time Vibe Scoring
        </h2>
        <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
          Forget static reviews written eight months ago. CIVIS deploys continuous NLP models on geolocated social media, micro-posts, and smart city feeds to compute live <strong className="text-white">Hectic vs. Peaceful</strong> scores right now.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Live Vibe Heatmap & Metric Cards */}
        <div className="lg:col-span-5 space-y-6">
          
          <div className="tactical-glass p-6 rounded-2xl border border-white/10 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <span className="text-xs font-mono text-slate-400 uppercase">Neighborhood Pulse Meter</span>
              <button 
                onClick={handleRefreshFeed}
                disabled={isRefreshing}
                className="text-xs font-mono text-[#00E5FF] hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
                <span>Sync NLP Stream</span>
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between text-xs font-mono text-slate-300 mb-1.5">
                  <span>Peaceful Atmosphere (North Beach & Waterfront)</span>
                  <span className="text-[#00E5FF] font-bold">92%</span>
                </div>
                <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-[#00E5FF] rounded-full transition-all duration-500" style={{ width: '92%' }} />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between text-xs font-mono text-slate-300 mb-1.5">
                  <span>Electric / Bustling (Mission & Chinatown)</span>
                  <span className="text-[#FFD700] font-bold">78%</span>
                </div>
                <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-[#FFD700] rounded-full transition-all duration-500" style={{ width: '78%' }} />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between text-xs font-mono text-slate-300 mb-1.5">
                  <span>Hectic / Congested (Silk Board & Dadar TT Choke)</span>
                  <span className="text-[#FF3366] font-bold">84%</span>
                </div>
                <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-[#FF3366] rounded-full transition-all duration-500" style={{ width: '84%' }} />
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 text-xs text-slate-400 leading-relaxed">
              CIVIS continuously normalizes sentiment polarity, geofence radius, and poster credibility to prevent malicious bot spam from skewing city safety.
            </div>
          </div>

          {/* Quick Filter Sector Selector */}
          <div className="tactical-glass p-5 rounded-2xl border border-white/10 space-y-3">
            <div className="text-xs font-mono text-slate-400 uppercase">Select Urban Sector Feed</div>
            <div className="flex flex-wrap gap-2">
              {['FC Road & Deccan, Pune', 'Marine Drive Promenade, Mumbai', 'Koramangala 80ft Rd, Bengaluru', 'Cyber Towers Hitec City, Hyderabad'].map((loc) => (
                <button
                  key={loc}
                  onClick={() => {
                    setSelectedNeighborhood(loc);
                    handleRefreshFeed();
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                    selectedNeighborhood === loc
                      ? 'bg-[#FFD700] text-[#0B0F19] font-bold glow-gold'
                      : 'bg-white/5 hover:bg-white/10 text-slate-300'
                  }`}
                >
                  {loc}
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column: Live NLP Feed Stream */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between px-2 text-xs font-mono text-slate-400">
            <div className="flex items-center gap-2">
              <Radio className="w-3.5 h-3.5 text-[#00E5FF] animate-pulse" />
              <span>Live NLP Sentiment Stream (Aggregated & Geolocated)</span>
            </div>
            <span>4 Active Streams</span>
          </div>

          <div className="space-y-3">
            {feedItems.map((item) => {
              const isPeaceful = item.sentiment === 'Peaceful';
              const isBustling = item.sentiment === 'Bustling';
              const isCaution = item.sentiment === 'Caution';

              return (
                <div
                  key={item.id}
                  className="tactical-glass-elevated p-4 sm:p-5 rounded-2xl border border-white/10 hover:border-white/20 transition-all space-y-2.5"
                >
                  <div className="flex items-center justify-between text-xs font-mono">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white">{item.location}</span>
                      <span className="text-slate-500">·</span>
                      <span className="text-slate-400">{item.timestamp}</span>
                    </div>

                    <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                      isPeaceful 
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                        : isBustling 
                        ? 'bg-[#FFD700]/10 text-[#FFD700] border border-[#FFD700]/20' 
                        : 'bg-[#FF3366]/10 text-[#FF3366] border border-[#FF3366]/20'
                    }`}>
                      {item.sentiment} ({item.sentimentConfidence}%)
                    </span>
                  </div>

                  <p className="text-sm text-slate-200 leading-relaxed font-sans">
                    "{item.content}"
                  </p>

                  <div className="flex items-center justify-between pt-2 border-t border-white/10 text-[11px] font-mono text-slate-400">
                    <span className="flex items-center gap-1.5 text-slate-400">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#00E5FF]" />
                      <span>Verified Local Geofence Signal</span>
                    </span>
                    <span className="text-slate-500">NLP Entity Tagged</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

    </section>
  );
};
