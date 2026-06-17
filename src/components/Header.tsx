import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Printer, 
  Menu, 
  X, 
  LayoutDashboard, 
  Compass, 
  Sparkles, 
  FolderHeart, 
  Info, 
  Contact, 
  BookOpen,
  ArrowRight,
  ArrowUpRight,
  Sparkle,
  Layers,
  Paintbrush,
  Layout,
  ChevronDown
} from 'lucide-react';
import { SERVICES_DATA } from '../data/servicesData';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isAdminLoggedIn: boolean;
  isServicesHovered: boolean;
  setIsServicesHovered: (hovered: boolean) => void;
  onSelectSubService?: (id: string) => void;
}

export default function Header({ 
  activeTab, 
  setActiveTab, 
  isAdminLoggedIn,
  isServicesHovered,
  setIsServicesHovered,
  onSelectSubService
}: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  
  // Hover & Mega-Menu alignment tracking
  const [hoveredCatId, setHoveredCatId] = useState('offset');
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsServicesHovered(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsServicesHovered(false);
    }, 180); // Slight delay for reliable fluid movement across mouse threshold
  };

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

  const navItems = [
    { id: 'home', label: 'Home', icon: Compass },
    { id: 'services', label: 'Services', icon: BookOpen },
    { id: 'gallery', label: 'Pinterest Album', icon: FolderHeart },
    { id: 'custom', label: 'AI c-card Custom Design', icon: Sparkles },
    { id: 'contact', label: 'Contact', icon: Contact },
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled || isServicesHovered ? 'py-3 bg-[#05070c]/95 backdrop-blur-xl border-b border-purple-500/10' : 'py-5 bg-transparent'}`} id="navbar">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between relative">
        {/* Logo */}
        <div 
          onClick={() => { setActiveTab('home'); setIsOpen(false); setIsServicesHovered(false); }}
          className="flex items-center gap-3 cursor-pointer group"
          id="nav-logo"
        >
          <div className="w-10 h-10 rounded-xl overflow-hidden bg-black/45 border border-purple-500/30 flex items-center justify-center transition-all duration-300 group-hover:scale-105 group-hover:rotate-4 shadow-lg shadow-purple-500/10 shrink-0">
            <img 
              src="/src/assets/images/kalbhairav_logo_1781630281528.jpg" 
              alt="Kalbhairav Logo" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-heading font-bold text-xl tracking-wide bg-gradient-to-r from-white via-slate-100 to-purple-400 bg-clip-text text-transparent group-hover:text-purple-300">
              KALBHAIRAV
            </span>
            <span className="text-[10px] font-mono tracking-widest text-purple-400 font-bold -mt-1 uppercase">
              Digital Printing Press
            </span>
          </div>
        </div>

        {/* Desktop Nav Actions */}
        <div className="hidden lg:flex items-center gap-1.5" id="nav-desktop-menu">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            const isServicesBtn = item.id === 'services';
            
            return (
              <button
                key={item.id}
                onClick={() => {
                  if (isServicesBtn) {
                    setIsServicesHovered(!isServicesHovered);
                  } else {
                    setActiveTab(item.id);
                    setIsServicesHovered(false);
                  }
                }}
                onMouseEnter={isServicesBtn ? handleMouseEnter : undefined}
                onMouseLeave={isServicesBtn ? handleMouseLeave : undefined}
                className={`relative px-4 py-2 rounded-full font-heading text-[13.5px] font-medium tracking-wide transition-all duration-300 flex items-center gap-2 hover:text-white ${isActive ? 'text-white' : 'text-slate-400 hover:bg-white/5'}`}
              >
                {isActive && (
                  <motion.span
                    layoutId="activeBubble"
                    className="absolute inset-0 bg-gradient-to-r from-purple-950 to-indigo-950/80 border border-purple-500/30 rounded-full -z-10"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}
                <Icon className={`w-4 h-4 ${isActive ? 'text-purple-400' : 'text-slate-500 group-hover:text-purple-400'}`} />
                <span className="capitalize">{item.label.split(' ')[1] || item.label}</span>
              </button>
            );
          })}

          <div className="h-6 w-px bg-slate-800 mx-3" />

          {/* Admin Dashboard Quick Access Button */}
          <button 
            type="button"
            onClick={() => { setActiveTab('admin'); setIsServicesHovered(false); }}
            className={`px-4.5 py-2 rounded-full font-heading text-[13.5px] font-bold tracking-wide transition-all duration-300 flex items-center gap-2 border border-purple-500/30 text-purple-300 hover:text-white hover:bg-purple-600 hover:border-purple-600 box-glow-purple ${activeTab === 'admin' ? 'bg-purple-600 text-white' : 'bg-transparent'}`}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>{isAdminLoggedIn ? 'Dashboard' : 'Admin'}</span>
          </button>
        </div>

        {/* Mobile Menu Trigger */}
        <div className="lg:hidden flex items-center gap-4">
          <button
            onClick={() => setActiveTab('admin')}
            className={`p-2 rounded-lg border border-purple-500/15 text-purple-400 hover:bg-white/5 ${activeTab === 'admin' ? 'bg-purple-950/50' : ''}`}
            aria-label="Admin console"
          >
            <LayoutDashboard className="w-5 h-5" />
          </button>
          
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-lg border border-purple-500/15 text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
            id="mobile-menu-btn"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-5.5 h-5.5" /> : <Menu className="w-5.5 h-5.5" />}
          </button>
        </div>

        {/* Modern Dropdown Portal (Inspired by Real Corporate Bank Layout) */}
        <AnimatePresence>
          {isServicesHovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              className="absolute top-full right-0 z-50 w-[840px] max-w-[calc(100vw-3rem)] mt-3 bg-[#03050c]/98 border border-purple-500/25 backdrop-blur-2xl rounded-2xl shadow-2xl overflow-hidden p-5 flex gap-5 box-glow-purple-strong select-none"
              id="mega-menu-popup"
            >
              {/* Left Column Section: 4 departments (like the Bank tabs list) */}
              <div className="w-[185px] border-r border-purple-500/10 pr-3 flex flex-col justify-start shrink-0 text-left">
                <span className="font-mono text-purple-400/60 font-bold uppercase tracking-widest text-[10px] pl-2 block mb-3">
                  Live Division
                </span>
                <div className="space-y-1.5 flex-grow">
                  {SERVICES_DATA.map((catItem) => {
                    const isActive = hoveredCatId === catItem.id;
                    return (
                      <button
                        key={catItem.id}
                        onMouseEnter={() => setHoveredCatId(catItem.id)}
                        onClick={() => {
                          setHoveredCatId(catItem.id);
                        }}
                        className={`w-full text-left p-2.5 rounded-xl font-heading transition-all duration-200 flex items-center justify-between group outline-none ${
                          isActive 
                            ? 'bg-gradient-to-r from-purple-900/40 to-indigo-900/40 border border-purple-500/20 text-white' 
                            : 'bg-transparent border border-transparent text-slate-400 hover:text-white hover:bg-white/5'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <div className={`p-2 rounded-lg border transition-all ${
                            isActive
                              ? 'bg-purple-600/20 border-purple-400/40 text-purple-300'
                              : 'bg-zinc-900/30 border-white/5 text-slate-500 group-hover:text-purple-400'
                          }`}>
                            {getCategoryIcon(catItem.iconName)}
                          </div>
                          <div>
                            <h4 className="font-extrabold text-[12px] uppercase tracking-wide">
                              {catItem.title.split(' ')[0]}
                            </h4>
                            <span className="text-[9px] text-slate-500 block font-light -mt-0.5">
                              {catItem.items.length} Options
                            </span>
                          </div>
                        </div>
                        <ArrowRight className={`w-3.5 h-3.5 ${
                          isActive 
                            ? 'text-purple-400' 
                            : 'text-slate-600 opacity-0 group-hover:opacity-100'
                        }`} />
                      </button>
                    );
                  })}
                </div>

                {/* Bottom Assistance widget */}
                <div className="mt-4 p-3 rounded-xl bg-purple-950/10 border border-purple-500/5">
                  <div className="flex items-center gap-1.5 mb-1 text-emerald-400 font-bold font-mono text-[9px] uppercase tracking-wider">
                    <Sparkle className="w-3 h-3 animate-spin duration-3000" />
                    <span>Quality Desk</span>
                  </div>
                  <p className="text-[10px] text-slate-400 font-light leading-relaxed">
                    Heavy Heidelberg print-rollers synchronized under custom client specs.
                  </p>
                </div>
              </div>

              {/* Right Column Section: Subservices Grid list */}
              <div className="flex-grow flex flex-col justify-between" id="mega-menu-grid">
                <div>
                  <div className="mb-4 pb-2 border-b border-purple-500/5 flex items-center justify-between text-left">
                    <div>
                      <span className="text-[9px] font-mono font-bold tracking-widest text-[#a855f7] uppercase block">
                        DEPARTMENT Blueprints
                      </span>
                      <h3 className="font-heading font-black text-sm text-white uppercase tracking-wider">
                        {(SERVICES_DATA.find(c => c.id === hoveredCatId) || SERVICES_DATA[0]).title} Services
                      </h3>
                    </div>
                    <span className="text-[9px] font-mono text-purple-400 font-medium tracking-wide bg-purple-950/40 px-2 py-0.5 rounded border border-purple-500/10 uppercase">
                      Inspect Demo on Click
                    </span>
                  </div>

                  {/* High Quality Bento Grid of Sub Services */}
                  <div className="grid grid-cols-2 gap-3.5">
                    {(SERVICES_DATA.find(c => c.id === hoveredCatId) || SERVICES_DATA[0]).items.map((sub, idx) => (
                      <div
                        key={sub.id}
                        onClick={() => {
                          onSelectSubService?.(sub.id);
                          setIsServicesHovered(false);
                        }}
                        className="group bg-[#04060d]/60 hover:bg-[#0c0f1e]/90 border border-purple-500/5 hover:border-purple-500/35 rounded-xl p-3.5 transition-all duration-300 cursor-pointer flex flex-col justify-between text-left relative overflow-hidden"
                      >
                        <div>
                          <div className="flex items-center gap-1.5 mb-1">
                            <span className="text-[8px] font-mono tracking-widest text-[#a855f7]/60 uppercase font-bold">
                              SPEC {String(idx + 1).padStart(2, '0')}
                            </span>
                          </div>
                          <h4 className="font-heading font-bold text-xs sm:text-[13px] text-white tracking-wide group-hover:text-purple-300 transition-colors">
                            {sub.name}
                          </h4>
                        </div>

                        <div className="mt-3.5 pt-2 border-t border-purple-500/5 flex items-center justify-between text-[10px] font-mono font-bold text-slate-500 group-hover:text-white transition-colors">
                          <span className="uppercase tracking-wider text-[9px]">View Album</span>
                          <ArrowUpRight className="w-3 h-3 text-[#a855f7]" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-purple-500/5 text-left flex items-center justify-between">
                  <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">
                    ★ click any option above to view catalog albums
                  </span>
                  <div className="flex items-center gap-1.5 text-[10px] font-mono text-purple-400 font-bold uppercase">
                    <Sparkle className="w-3.5 h-3.5 animate-pulse text-[#a855f7]" />
                    <span>Professional Albums</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-black/95 backdrop-blur-xl border-b border-purple-500/15"
          >
             <div className="px-6 py-5 flex flex-col gap-3">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                const isServices = item.id === 'services';
                
                return (
                  <div key={item.id} className="flex flex-col w-full">
                    <button
                      onClick={() => {
                        if (isServices) {
                          setMobileServicesOpen(!mobileServicesOpen);
                        } else {
                          setActiveTab(item.id);
                          setIsOpen(false);
                        }
                      }}
                      className={`w-full px-4 py-3 rounded-xl flex items-center justify-between text-left font-heading text-sm font-semibold tracking-wide transition-all ${isActive ? 'bg-gradient-to-r from-purple-900/40 to-indigo-900/20 border border-purple-500/20 text-white' : 'text-slate-400 hover:bg-white/5'}`}
                    >
                      <div className="flex items-center gap-3.5">
                        <Icon className={`w-4.5 h-4.5 ${isActive ? 'text-purple-400' : 'text-slate-500'}`} />
                        <span className="capitalize">{item.label}</span>
                      </div>
                      {isServices && (
                        <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${mobileServicesOpen ? 'rotate-180 text-purple-400' : 'text-slate-500'}`} />
                      )}
                    </button>
                    
                    {isServices && mobileServicesOpen && (
                      <div className="pl-8 pr-4 py-2 flex flex-col gap-2">
                        {SERVICES_DATA.map((catItem) => (
                          <div key={catItem.id} className="space-y-1">
                            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-purple-400/80 block mt-2">
                              {catItem.title}
                            </span>
                            <div className="flex flex-col gap-1.5 pl-2 mt-1">
                              {catItem.items.map((sub) => (
                                <button
                                  key={sub.id}
                                  onClick={() => {
                                    onSelectSubService?.(sub.id);
                                    setIsOpen(false);
                                  }}
                                  className="text-left text-xs text-slate-400 hover:text-white py-1 font-heading"
                                >
                                  {sub.name}
                                </button>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
