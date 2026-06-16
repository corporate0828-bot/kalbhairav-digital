import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Printer, 
  Layers, 
  Paintbrush, 
  Layout, 
  MessageSquareText, 
  Check, 
  X, 
  ArrowRight,
  Sparkle,
  PhoneCall,
  Flame,
  Star
} from 'lucide-react';
import { SERVICES_DATA, MainServiceCategory, SubService } from '../data/servicesData';

interface ServicesCatalogProps {
  onQuickInquiry: (productName: string) => void;
  initialSubServiceId?: string | null;
  onClearInitialSubService?: () => void;
}

export default function ServicesCatalog({ onQuickInquiry, initialSubServiceId, onClearInitialSubService }: ServicesCatalogProps) {
  const [activeCategoryId, setActiveCategoryId] = useState<string>("offset");
  const [selectedSubService, setSelectedSubService] = useState<SubService | null>(null);

  useEffect(() => {
    if (initialSubServiceId) {
      for (const cat of SERVICES_DATA) {
        const found = cat.items.find(sub => sub.id === initialSubServiceId);
        if (found) {
          setActiveCategoryId(cat.id);
          setSelectedSubService(found);
          break;
        }
      }
      onClearInitialSubService?.();
    }
  }, [initialSubServiceId, onClearInitialSubService]);

  // Match the icons based on string names dynamically
  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Printer':
        return <Printer className="w-5 h-5" />;
      case 'Layers':
        return <Layers className="w-5 h-5" />;
      case 'Paintbrush':
        return <Paintbrush className="w-5 h-5" />;
      case 'Layout':
        return <Layout className="w-5 h-5" />;
      default:
        return <Printer className="w-5 h-5" />;
    }
  };

  const activeCategory = SERVICES_DATA.find(c => c.id === activeCategoryId) || SERVICES_DATA[0];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-12" id="services-catalog-portal-main">
      
      {/* Title & Slogan */}
      <div className="text-left mb-12">
        <span className="text-[10.5px] font-mono font-bold tracking-widest text-[#a855f7] bg-purple-950/40 border border-purple-500/20 px-3 py-1 rounded inline-block uppercase mb-3">
          Our Unified Production Desk
        </span>
        <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
          Kalbhairav Professional Printing Services
        </h2>
        <p className="max-w-2xl text-slate-400 text-xs sm:text-sm mt-3 leading-relaxed font-light">
          Experience supreme heavyweight paper stocks, hand-registered silkscreens, state-of-the-art German offset Heidelberg cylinders, and weather-proof high-contrast mega flex advertisements.
        </p>
      </div>

      {/* Main Corporate-style Navigation Cards (Reference Photo Inspired Grid-List) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-zinc-950/40 border border-purple-500/10 rounded-2xl overflow-hidden shadow-2xl p-4 sm:p-6 lg:p-8" id="corporate-portal-wrapper">
        
        {/* Left Side Tab Navigation Column - (Like 'Corporate Banking', 'Loans for MSME', etc) */}
        <div className="lg:col-span-4 space-y-3 border-r lg:border-r border-purple-500/5 lg:pr-6 flex flex-col justify-start">
          <span className="font-mono text-purple-400/60 font-bold uppercase tracking-widest text-[10px] pl-2 block mb-2">
            Select Live Department
          </span>
          {SERVICES_DATA.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setActiveCategoryId(cat.id);
                setSelectedSubService(null); // Reset detail preview on category change
              }}
              className={`w-full text-left p-4 rounded-xl font-heading flex items-center justify-between group outline-none ${
                activeCategoryId === cat.id 
                  ? 'bg-gradient-to-r from-purple-900/60 to-indigo-900/60 border border-purple-500/40 text-white shadow-md shadow-purple-500/10' 
                  : 'bg-[#060813]/40 border border-white/5 text-slate-400 hover:text-white hover:border-purple-500/15 hover:bg-[#0c0f24]/50'
              }`}
            >
              <div className="flex items-center gap-4">
                <div className={`p-2.5 rounded-lg border ${
                  activeCategoryId === cat.id
                    ? 'bg-purple-600/20 border-purple-400 text-purple-300'
                    : 'bg-zinc-900/40 border-white/5 text-slate-500 group-hover:text-purple-400'
                }`}>
                  {getCategoryIcon(cat.iconName)}
                </div>
                <div>
                  <h4 className="font-extrabold text-[13.5px] uppercase tracking-wide">
                    {cat.title}
                  </h4>
                  <p className="text-[10px] text-slate-500 line-clamp-1 mt-0.5 group-hover:text-slate-400 font-light">
                    {cat.description}
                  </p>
                </div>
              </div>
              <ArrowRight className={`w-4 h-4 ${
                activeCategoryId === cat.id 
                  ? 'text-purple-400' 
                  : 'text-slate-600 group-hover:text-slate-400'
              }`} />
            </button>
          ))}

          {/* Quick Contact Box on bottom left sidebar */}
          <div className="mt-6 p-4 rounded-xl bg-purple-950/10 border border-purple-500/10 flex flex-col justify-between items-start gap-3">
            <div className="flex items-center gap-2">
              <PhoneCall className="w-4 h-4 text-emerald-400 shrink-0" />
              <span className="text-[10.5px] font-mono uppercase tracking-widest text-slate-300 font-bold">
                Direct Inquiry Active
              </span>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed font-light">
              Need custom volume pricing sheet structures or non-standard size quotes? Transfer the specs now.
            </p>
            <button
              onClick={() => onQuickInquiry("General " + activeCategory.title)}
              className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-heading font-bold text-[10.5px] uppercase tracking-wider flex items-center gap-1.5"
            >
              <span>Instant Call Desk</span>
            </button>
          </div>
        </div>

        {/* Right Side Cards Subsections Area - (Inspired by 'Working Capital', 'Term Finance' Grid Cards) */}
        <div className="lg:col-span-8 flex flex-col justify-between" id="corporate-portal-grid-area">
          <div>
            {/* Header detail of currently active main category */}
            <div className="mb-6 pb-4 border-b border-purple-500/5 flex items-center justify-between gap-4">
              <div className="text-left">
                <span className="text-[9.5px] font-mono font-bold tracking-widest text-[#a855f7] uppercase block mb-0.5">
                  PRINTING DIVISION
                </span>
                <h3 className="font-heading font-black text-xl text-white uppercase tracking-wider">
                  {activeCategory.title} Sub-Services
                </h3>
              </div>
              <div className="px-3 py-1 bg-purple-650/10 rounded-lg border border-purple-500/20 text-[10.5px] font-mono font-extrabold text-[#a855f7] uppercase tracking-widest">
                {activeCategory.items.length} Live Items
              </div>
            </div>

            {/* Sub-Services Grid (Classic Bank Portal Cards) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4" id="subsec-bento-grid">
              {activeCategory.items.map((sub, idx) => (
                <div
                  key={sub.id}
                  onClick={() => setSelectedSubService(sub)}
                  className="group bg-[#04060d]/65 hover:bg-[#0a0d1d]/85 border border-[#3b0764]/20 hover:border-[#a855f7]/60 rounded-xl p-4.5 cursor-pointer flex flex-col justify-between text-left relative overflow-hidden"
                >
                  <div className="space-y-3">
                    {/* Tiny decorative indicator */}
                    <div className="flex items-center justify-between gap-2.5">
                      <div className="flex items-center gap-1.5">
                        <Sparkle className="w-3.5 h-3.5 text-purple-400" />
                        <span className="text-[9.5px] font-mono tracking-widest text-slate-500 uppercase font-semibold">
                          OPTION {String(idx + 1).padStart(2, '0')}
                        </span>
                      </div>
                      <span className="text-[9.5px] font-mono text-purple-400 bg-purple-950/30 px-2 py-0.5 rounded border border-purple-500/10 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                        View Demo Img
                      </span>
                    </div>

                    <div>
                      <h4 className="font-heading font-extrabold text-base text-white tracking-wide group-hover:text-purple-300 transition-colors hidden-scroll-bar">
                        {sub.name}
                      </h4>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-purple-500/5 flex items-center justify-between text-[11px] font-mono font-bold text-slate-500 group-hover:text-white transition-colors">
                    <span className="uppercase tracking-wider">Inspect Blueprint</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#a855f7]" />
                  </div>

                  {/* Absolute gradient bar on right edge */}
                  <div className="absolute right-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-purple-500 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              ))}
            </div>
          </div>

          <p className="text-[11px] font-mono text-slate-600 text-left mt-8 uppercase tracking-widest">
            ★ click any sub-service to inspect high-resolution demo prints, blueprints, paper GSM, and download direct PDF specifications.
          </p>
        </div>
      </div>

      {/* Modern Lightbox Overlay Sub-view with Demo Images and WhatsApp integration */}
      <AnimatePresence>
        {selectedSubService && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 sm:p-6 backdrop-blur-md"
            onClick={() => setSelectedSubService(null)}
          >
            <motion.div
              initial={{ scale: 1, y: 0 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 1, y: 0 }}
              className="glass-panel w-full max-w-2xl rounded-2xl p-5 sm:p-7 relative max-h-[92vh] overflow-y-auto border border-purple-500/30 flex flex-col justify-between"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedSubService(null)}
                className="absolute top-4 right-4 p-2 bg-purple-950/40 border border-purple-500/20 text-slate-400 hover:text-white rounded-lg hover:bg-purple-900/60 transition-colors z-10"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="space-y-6">
                
                {/* Header details */}
                <div className="text-left mt-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono font-bold tracking-widest text-[#a855f7] bg-purple-950/60 px-3 py-1 rounded border border-purple-500/15 uppercase">
                      DEMO BLUEPRINT SHEET
                    </span>
                    <span className="text-[10px] font-mono font-bold tracking-widest text-[#22c55e] bg-emerald-950/60 px-3 py-1 rounded border border-emerald-500/15 uppercase">
                      In-House Production Live
                    </span>
                  </div>
                  <h3 className="font-heading font-black text-2xl text-white tracking-wide uppercase mt-3">
                    {selectedSubService.name}
                  </h3>
                </div>

                {/* Grid image & specifications section */}
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-start">
                  
                  {/* Left Column: Authentic Printing Demo Image */}
                  <div className="sm:col-span-6 rounded-xl overflow-hidden aspect-[4/3] sm:aspect-square border border-purple-500/20 bg-black/90 relative">
                    <img
                      src={selectedSubService.demoImage}
                      alt={selectedSubService.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-black/60 p-2 text-[10px] font-mono text-center text-slate-400 border-t border-white/5 uppercase">
                      © Kalbhairav Factory Floor sample
                    </div>
                  </div>

                  {/* Right Column: Custom specs */}
                  <div className="sm:col-span-6 space-y-4 text-left">
                    <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-light">
                      {selectedSubService.description}
                    </p>

                    <div className="space-y-2 border-t border-b border-purple-500/10 py-3.5 bg-black/15 p-3 rounded-lg">
                      <h5 className="text-[10px] font-mono text-purple-400 font-extrabold uppercase tracking-widest">
                        Technical Sheet Guidelines
                      </h5>
                      <ul className="space-y-1.5">
                        {selectedSubService.specs.map((item, id) => (
                          <li key={id} className="text-xs text-slate-300 flex items-start gap-2">
                            <Check className="w-3.5 h-3.5 text-purple-400 shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Action buttons footer detail */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-purple-500/10">
                  <button
                    onClick={() => {
                      onQuickInquiry(selectedSubService.name);
                      setSelectedSubService(null);
                    }}
                    className="py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-heading text-xs uppercase font-extrabold tracking-widest transition-all flex items-center justify-center gap-2"
                  >
                    <MessageSquareText className="w-4 h-4 fill-current" />
                    <span>Inquire via WhatsApp</span>
                  </button>
                  
                  <button
                    onClick={() => setSelectedSubService(null)}
                    className="py-3 px-4 rounded-xl bg-[#0b0c16]/80 hover:bg-white/5 border border-purple-500/15 hover:border-purple-500/40 text-slate-400 hover:text-white font-heading text-xs uppercase font-bold tracking-widest transition-all"
                  >
                    <span>Back to Portal Shelf</span>
                  </button>
                </div>

              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
