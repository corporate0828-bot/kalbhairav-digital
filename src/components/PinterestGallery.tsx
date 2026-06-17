import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Heart, ZoomIn, Eye, ThumbsUp, X, HeartHandshake, 
  Printer, Layers, Paintbrush, Layout, ChevronDown, ChevronUp, Sparkle, ArrowRight, Compass 
} from 'lucide-react';
import { GalleryItem } from '../types';
import { SERVICES_DATA } from '../data/servicesData';

interface PinterestGalleryProps {
  galleryItems: GalleryItem[];
  onLikeItem: (id: string) => void;
  initialCategoryId?: string | null;
  onClearInitialCategoryId?: () => void;
  initialSubServiceId?: string | null;
  onClearInitialSubService?: () => void;
}

export default function PinterestGallery({ 
  galleryItems, 
  onLikeItem, 
  initialCategoryId,
  onClearInitialCategoryId,
  initialSubServiceId,
  onClearInitialSubService
}: PinterestGalleryProps) {
  const [activeCategoryId, setActiveCategoryId] = useState<string>(initialCategoryId || "all");
  const [activeSubServiceId, setActiveSubServiceId] = useState<string | null>(initialSubServiceId || null);

  React.useEffect(() => {
    if (initialCategoryId) {
      setActiveCategoryId(initialCategoryId);
      if (initialSubServiceId) {
        setActiveSubServiceId(initialSubServiceId);
      } else {
        setActiveSubServiceId(null);
      }
      onClearInitialCategoryId?.();
      onClearInitialSubService?.();
    }
  }, [initialCategoryId, initialSubServiceId, onClearInitialCategoryId, onClearInitialSubService]);
  const [expandedCats, setExpandedCats] = useState<Record<string, boolean>>({
    offset: true,
    digital: true,
    screen: true,
    flex: true
  });
  const [lightboxItem, setLightboxItem] = useState<GalleryItem | null>(null);
  const [likedList, setLikedList] = useState<string[]>([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Printer':
        return <Printer className="w-4 h-4" />;
      case 'Layers':
        return <Layers className="w-4 h-4" />;
      case 'Paintbrush':
        return <Paintbrush className="w-4 h-4" />;
      case 'Layout':
        return <Layout className="w-4 h-4" />;
      default:
        return <Printer className="w-4 h-4" />;
    }
  };

  const handleLike = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (likedList.includes(id)) return; // already liked in current session

    try {
      const response = await fetch('/api/gallery/like', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      if (response.ok) {
        onLikeItem(id);
        setLikedList(prev => [...prev, id]);
      }
    } catch (err) {
      console.error("Failed to post like to server:", err);
    }
  };

  const filteredItems = galleryItems.filter((item) => {
    if (activeCategoryId === "all") return true;

    // Strict direct matching when fields exist
    if (item.subServiceId || item.mainCategoryId) {
      if (activeSubServiceId) {
        return item.subServiceId === activeSubServiceId;
      }
      if (activeCategoryId) {
        return item.mainCategoryId === activeCategoryId;
      }
      return true;
    }
    
    const titleLower = item.title.toLowerCase();
    const descLower = item.description.toLowerCase();
    const catLower = item.category.toLowerCase();
    
    // Fallback keyword-based filtering for custom/uploaded items
    if (activeSubServiceId) {
      const activeSub = SERVICES_DATA.flatMap(c => c.items).find(s => s.id === activeSubServiceId);
      if (!activeSub) return true;
      const subName = activeSub.name.toLowerCase();
      
      if (activeSubServiceId === "offset-wedding" || activeSubServiceId === "screen-wedding" || activeSubServiceId === "digital-wedding") {
        return catLower.includes("wedding") || titleLower.includes("wedding") || descLower.includes("wedding") || titleLower.includes("invit");
      }
      if (activeSubServiceId === "digital-visiting") {
        return catLower.includes("business") || titleLower.includes("business") || titleLower.includes("card") || descLower.includes("card");
      }
      if (activeSubServiceId === "digital-cert") {
        return titleLower.includes("cert") || descLower.includes("cert") || catLower.includes("business") || titleLower.includes("card");
      }
      if (activeSubServiceId === "digital-pamphlet" || activeSubServiceId === "offset-pamphlet") {
        return catLower.includes("poster") || titleLower.includes("poster") || titleLower.includes("flyer") || titleLower.includes("pamphlet");
      }
      if (activeSubServiceId.includes("sticker") || activeSubServiceId.includes("bag") || activeSubServiceId.includes("envelope") || activeSubServiceId.includes("menu")) {
        return catLower.includes("packag") || titleLower.includes("box") || titleLower.includes("hamper") || titleLower.includes("brand") || descLower.includes("envelope");
      }
      if (activeSubServiceId.includes("flex-") || activeSubServiceId.includes("vision") || activeSubServiceId.includes("backlit")) {
        return catLower.includes("poster") || catLower.includes("packag") || titleLower.includes("poster") || titleLower.includes("box") || descLower.includes("diwali") || descLower.includes("brand");
      }
      
      const subKeywords = subName.split(" ");
      return subKeywords.some(kw => {
        if (kw.length < 4) return false;
        if (kw === "printing" || kw === "card") return false;
        return titleLower.includes(kw) || descLower.includes(kw) || catLower.includes(kw);
      });
    }
    
    // Fallback category matching
    if (activeCategoryId === "offset") {
      return catLower.includes("wedding") || titleLower.includes("wedding") || titleLower.includes("invit") || catLower.includes("bill") || catLower.includes("register");
    }
    if (activeCategoryId === "digital") {
      return catLower.includes("business") || catLower.includes("poster") || titleLower.includes("card") || titleLower.includes("poster");
    }
    if (activeCategoryId === "screen") {
      return catLower.includes("wedding") || catLower.includes("packag") || titleLower.includes("wedding") || titleLower.includes("box") || titleLower.includes("hamper");
    }
    if (activeCategoryId === "flex") {
      return catLower.includes("poster") || catLower.includes("packag") || titleLower.includes("poster") || titleLower.includes("box") || descLower.includes("diwali");
    }
    
    return true;
  });

  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-12" id="gallery-pinterest-section">
      {/* Title & Filter Header */}
      <div className="text-center mb-12">
        <span className="text-[11px] font-mono font-bold tracking-widest text-[#a855f7] uppercase block mb-2">
          REAL-TIME DESIGN INSPIRATIONS
        </span>
        <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-white tracking-tight mb-4">
          Bhairavnath Pinterest Portfolio
        </h2>
        <p className="max-w-xl mx-auto text-slate-500 text-xs sm:text-sm mb-8">
          Browse through hundreds of real physical printing projects delivered to esteemed families and businesses, featuring custom gold embossing, spot-UV lacquers, and heavy imported textured cards.
        </p>
      </div>

      {/* Main Responsive Layout Wrapper */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Mobile View: Dropdown Accordion Panel */}
        <div className="block lg:hidden mb-2 w-full">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="w-full p-3.5 bg-zinc-950/80 border border-purple-500/25 text-slate-200 hover:text-white rounded-xl font-heading text-xs uppercase font-extrabold tracking-widest flex items-center justify-between transition-all"
          >
            <span className="flex items-center gap-2">
              <Compass className="w-4 h-4 text-purple-400" />
              Filter Option: {activeCategoryId === 'all' ? 'All Portfolios' : SERVICES_DATA.find(c => c.id === activeCategoryId)?.title}
              {activeSubServiceId ? ` › ${SERVICES_DATA.flatMap(c => c.items).find(s => s.id === activeSubServiceId)?.name}` : ''}
            </span>
            <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${mobileMenuOpen ? 'rotate-180' : ''}`} />
          </button>
          
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden mt-2 p-4 rounded-xl bg-zinc-950 border border-purple-500/20 space-y-4 max-h-[70vh] overflow-y-auto"
              >
                <div className="flex items-center justify-between pb-2 border-b border-purple-500/10">
                  <span className="font-heading text-[10px] uppercase tracking-wider text-purple-400 font-bold">Select Service Group</span>
                  <button
                    onClick={() => {
                      setActiveCategoryId("all");
                      setActiveSubServiceId(null);
                      setMobileMenuOpen(false);
                    }}
                    className="text-[10px] font-mono text-purple-400 hover:text-white font-bold uppercase transition-colors"
                  >
                    Reset & Show All
                  </button>
                </div>
                
                <div className="space-y-4">
                  {SERVICES_DATA.map((cat) => (
                    <div key={cat.id} className="space-y-1.5">
                      <button
                        onClick={() => {
                          setActiveCategoryId(cat.id);
                          setActiveSubServiceId(null);
                          setMobileMenuOpen(false);
                        }}
                        className={`w-full text-left p-2.5 rounded-lg border flex items-center gap-2.5 ${
                          activeCategoryId === cat.id && !activeSubServiceId
                            ? 'bg-purple-900/30 border-purple-500/30 text-purple-300'
                            : 'bg-black/30 border-white/5 text-slate-400'
                        }`}
                      >
                        <div className="p-1 rounded bg-zinc-900">{getCategoryIcon(cat.iconName)}</div>
                        <span className="font-heading text-xs uppercase font-bold tracking-wide">{cat.title}</span>
                      </button>
                      <div className="pl-4 space-y-1.5 border-l border-purple-500/10 ml-3">
                        {cat.items.map((sub) => (
                          <button
                            key={sub.id}
                            onClick={() => {
                              setActiveCategoryId(cat.id);
                              setActiveSubServiceId(sub.id);
                              setMobileMenuOpen(false);
                            }}
                            className={`w-full text-left p-2 rounded-md text-[11px] font-heading font-semibold ${
                              activeSubServiceId === sub.id
                                ? 'bg-purple-950/40 text-purple-300 border border-purple-500/15'
                                : 'text-slate-500 hover:text-slate-300'
                            }`}
                          >
                            {sub.name}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Desktop View Sidebar Panel */}
        <div className="hidden lg:block lg:col-span-3 bg-zinc-950/30 border border-purple-500/10 rounded-2xl p-4.5 space-y-4 lg:sticky lg:top-24 select-none">
          <div className="flex items-center justify-between pb-3.5 border-b border-purple-500/10">
            <span className="font-heading text-xs uppercase font-extrabold tracking-wider text-purple-400">
              Department Grid
            </span>
            <button
              onClick={() => {
                setActiveCategoryId("all");
                setActiveSubServiceId(null);
              }}
              className={`text-[9.5px] font-mono font-extrabold uppercase tracking-widest px-2.5 py-1 rounded transition-all ${
                activeCategoryId === "all"
                  ? "bg-purple-950/40 border border-purple-500/35 text-purple-400"
                  : "text-slate-500 hover:text-white border border-transparent"
              }`}
            >
              All Items
            </button>
          </div>

          <div className="space-y-4 max-h-[65vh] overflow-y-auto pr-1">
            {SERVICES_DATA.map((cat) => {
              const isMainActive = activeCategoryId === cat.id;
              const isExpanded = expandedCats[cat.id];
              return (
                <div key={cat.id} className="space-y-1.5">
                  <div
                    onClick={() => {
                      setActiveCategoryId(cat.id);
                      setActiveSubServiceId(null);
                    }}
                    className={`p-2.5 rounded-xl border flex items-center justify-between cursor-pointer group transition-all duration-300 ${
                      isMainActive && !activeSubServiceId
                        ? 'bg-gradient-to-r from-purple-900/50 to-indigo-900/50 border-purple-500/40 text-white'
                        : 'bg-black/35 border-white/5 text-slate-400 hover:text-white hover:border-purple-500/20'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className={`p-1.5 rounded transition-all ${
                        isMainActive ? 'bg-purple-600/20 text-purple-400' : 'bg-zinc-900 text-slate-500 group-hover:text-purple-400'
                      }`}>
                        {getCategoryIcon(cat.iconName)}
                      </div>
                      <span className="font-heading text-[11.5px] uppercase font-bold tracking-wider truncate">
                        {cat.title.replace(" (Multicolor)", "")}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setExpandedCats(prev => ({ ...prev, [cat.id]: !prev[cat.id] }));
                      }}
                      className="p-1 hover:bg-white/5 rounded text-slate-500 hover:text-white transition-all outline-none"
                    >
                      {isExpanded ? (
                        <ChevronUp className="w-3.5 h-3.5" />
                      ) : (
                        <ChevronDown className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>

                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden pl-3 space-y-1 border-l border-purple-500/10 ml-5"
                      >
                        {cat.items.map((sub) => {
                          const isSubActive = activeSubServiceId === sub.id;
                          return (
                            <button
                              key={sub.id}
                              onClick={() => {
                                setActiveCategoryId(cat.id);
                                setActiveSubServiceId(sub.id);
                              }}
                              className={`w-full text-left p-2 rounded-lg text-[10.5px] font-heading font-semibold tracking-wide flex items-center justify-between transition-all group ${
                                isSubActive
                                  ? 'bg-purple-950/40 border border-purple-500/25 text-purple-300'
                                  : 'text-slate-500 hover:text-slate-300 hover:bg-white/5'
                              }`}
                            >
                              <span className="truncate pr-1.5">{sub.name}</span>
                              <ArrowRight className={`w-3 h-3 shrink-0 transition-transform ${
                                isSubActive ? 'translate-x-0.5 text-purple-400' : 'opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5'
                              }`} />
                            </button>
                          );
                        })}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Gallery Portfolio Shelf */}
        <div className="lg:col-span-9 w-full">
          {filteredItems.length === 0 ? (
            <div className="text-center py-24 bg-zinc-950/40 border border-purple-500/5 rounded-2xl flex flex-col items-center justify-center p-6">
              <Sparkle className="w-8 h-8 text-slate-600 mb-3 animate-spin duration-3000" />
              <h3 className="font-heading font-extrabold text-base text-slate-300">No Prints Catalogued</h3>
              <p className="text-slate-500 text-xs max-w-xs mt-1.5 font-light leading-relaxed">
                We're actively updating our portfolio desk with raw photos of our recent deliveries. Choose another department.
              </p>
            </div>
          ) : (
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6" id="pinterest-masonry-grid">
              {filteredItems.map((item) => {
                const isCurrentlyLiked = likedList.includes(item.id);
                return (
                  <div
                    key={item.id}
                    onClick={() => setLightboxItem(item)}
                    className="break-inside-avoid relative group rounded-2xl overflow-hidden cursor-pointer border border-purple-500/10 p-2.5 bg-zinc-950/20 hover:border-purple-500/30 transition-all duration-300 transform-gpu"
                  >
                    {/* Image Preview */}
                    <div className="overflow-hidden rounded-xl relative bg-zinc-900 aspect-auto">
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        loading="lazy"
                        referrerPolicy="no-referrer"
                        className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-104"
                      />

                      {/* Shimmer layout overlay on hover */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-5">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-[9.5px] font-mono uppercase bg-purple-900 border border-purple-500/30 text-purple-200 px-2 py-0.5 rounded-md font-bold tracking-widest">
                            {item.category}
                          </span>
                          <div className="flex items-center gap-2">
                            <ZoomIn className="w-5 h-5 text-slate-300 hover:text-white transition-colors" />
                          </div>
                        </div>

                        <h4 className="font-heading font-extrabold text-[#f3f4f6] text-base mb-1.5 leading-snug">
                          {item.title}
                        </h4>
                        <p className="text-slate-300 text-xs leading-relaxed font-light mb-4 text-slate-400">
                          {item.description}
                        </p>

                        <div className="flex items-center justify-between border-t border-purple-500/15 pt-3">
                          <span className="text-[11px] font-mono text-slate-500">
                            PHOTO SAMPLE
                          </span>
                          
                          {/* Like Action */}
                          <button
                            onClick={(e) => handleLike(e, item.id)}
                            className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1.5 rounded-full transition-all ${isCurrentlyLiked ? 'bg-fuchsia-950/50 border border-fuchsia-500/40 text-fuchsia-400' : 'bg-white/5 border border-white/10 hover:border-purple-500/30 text-slate-300 hover:text-purple-400'}`}
                          >
                            <Heart className={`w-3.5 h-3.5 ${isCurrentlyLiked ? 'fill-fuchsia-400 text-fuchsia-400 animate-pulse' : ''}`} />
                            <span>{item.likes} Likes</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

      </div>

      {/* Full screen interactive Lightbox Modal component overlay */}
      <AnimatePresence>
        {lightboxItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-6 backdrop-blur-lg"
            onClick={() => setLightboxItem(null)}
          >
            <motion.div
              initial={{ scale: 0.94 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.94 }}
              className="w-full max-w-3xl rounded-2xl glass-panel relative flex flex-col sm:flex-row max-h-[90vh] sm:max-h-[85vh] overflow-y-auto sm:overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setLightboxItem(null)}
                className="absolute top-4 right-4 z-10 p-2 bg-[#1b0e36]/90 border border-purple-500/30 text-slate-400 hover:text-white rounded-xl transition-all"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Zoom Image container */}
              <div className="w-full sm:w-7/12 bg-black flex items-center justify-center">
                <img
                  src={lightboxItem.imageUrl}
                  alt={lightboxItem.title}
                  className="w-full h-auto max-h-[50vh] sm:max-h-[85vh] object-contain"
                />
              </div>

              {/* Spec text details panel */}
              <div className="w-full sm:w-5/12 p-6 sm:p-8 flex flex-col justify-between bg-[#04040a]">
                <div className="space-y-4">
                  <span className="text-[10px] font-mono tracking-widest uppercase font-bold text-purple-400 bg-purple-950/30 border border-purple-500/20 px-2.5 py-1 rounded inline-block">
                    {lightboxItem.category}
                  </span>
                  <h3 className="font-heading font-extrabold text-xl sm:text-2xl text-white tracking-wide leading-tight">
                    {lightboxItem.title}
                  </h3>
                  <p className="text-slate-400 text-xs sm:text-sm leading-relaxed font-light">
                    {lightboxItem.description}
                  </p>
                </div>

                <div className="border-t border-purple-500/10 pt-5 mt-5">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono text-slate-500">
                      COMMUNITY RATING
                    </span>
                    <span className="text-xs font-mono text-[#a855f7] font-bold">
                      {lightboxItem.likes} APPRECIATIONS
                    </span>
                  </div>

                  {/* High Quality verification badge */}
                  <div className="flex items-center gap-3.5 p-3.5 bg-purple-500/5 border border-purple-500/10 rounded-xl mb-4 text-[#a855f7]">
                    <HeartHandshake className="w-5 h-5 shrink-0" />
                    <p className="text-[11.5px] leading-snug">
                      This sample was completely printed on site at our factory press using Heidelberg offsets.
                    </p>
                  </div>

                  <button
                    onClick={(e) => {
                      handleLike(e, lightboxItem.id);
                    }}
                    className="w-full py-3.5 bg-purple-600 rounded-xl font-heading text-xs sm:text-sm font-bold text-white tracking-wide hover:bg-purple-500 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-purple-500/15"
                  >
                    <ThumbsUp className="w-4 h-4" />
                    <span>Appreciate Design</span>
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
