import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Compass, Sparkles, FolderHeart, Info, Contact, BookOpen, MessageCircle, MessageSquareText,
  ChevronDown, Flame, Globe2, Trophy, Clock, Milestone, ArrowRight, Check, X,
  BadgeAlert, Heart, CalendarHeart, Receipt, Layers, Printer, CalendarClock,
  Paintbrush, Layout, Phone, Instagram
} from 'lucide-react';

// Subcomponents imports
import Header from './components/Header';
import Footer from './components/Footer';
import HomeHero from './components/HomeHero';
import AICardRecommender from './components/AICardRecommender';
import ServicesCatalog from './components/ServicesCatalog';
import PinterestGallery from './components/PinterestGallery';
import CustomDesignForm from './components/CustomDesignForm';
import ContactAbout from './components/ContactAbout';
import AdminDashboard from './components/AdminDashboard';

// Shared interfaces
import { Product, GalleryItem, CustomRequest, FAQItem, Machine, TeamMember, Testimonial } from './types';
import { SERVICES_DATA, SubService } from './data/servicesData';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [selectedGlobalSubService, setSelectedGlobalSubService] = useState<SubService | null>(null);
  const [loading, setLoading] = useState(true);
  const [initialSubServiceId, setInitialSubServiceId] = useState<string | null>(null);
  const [initialGalleryCategoryId, setInitialGalleryCategoryId] = useState<string | null>(null);
  const [initialGallerySubServiceId, setInitialGallerySubServiceId] = useState<string | null>(null);
  const [servicesMenuHovered, setServicesMenuHovered] = useState(false);

  // Database main components loaded from server api
  const [products, setProducts] = useState<Product[]>([]);
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [customRequests, setCustomRequests] = useState<CustomRequest[]>([]);
  const [faqs, setFaqs] = useState<FAQItem[]>([]);
  const [machines, setMachines] = useState<Machine[]>([]);
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [analytics, setAnalytics] = useState({ pageViews: 0, totalRequests: 0, completedRequests: 0 });

  // Admin access validation indicators
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  // Preference specs transfer buffers from AI Recommender
  const [prefilledSpecDescription, setPrefilledSpecDescription] = useState('');
  const [prefilledBudget, setPrefilledBudget] = useState('');

  // Floating WhatsApp Quick Inquiry states
  const [showWhatsAppDrawer, setShowWhatsAppDrawer] = useState(false);
  const [customWhatsAppMsg, setCustomWhatsAppMsg] = useState('Hello Bhairavnath Digital! I am interested in inquiring about your premium indian wedding invitation boxes.');

  // FAQ Expanded items manager
  const [openFaqIdx, setOpenFaqIdx] = useState<string | null>(null);

  // Load data from Express server on mount
  const refreshServerData = async () => {
    try {
      const res = await fetch('/api/data');
      const data = await res.json();
      setProducts(data.products || []);
      setGallery(data.gallery || []);
      setCustomRequests(data.customRequests || []);
      setFaqs(data.faqs || []);
      setMachines(data.machines || []);
      setTeam(data.team || []);
      setTestimonials(data.testimonials || []);
      setAnalytics(data.analytics || { pageViews: 0, totalRequests: 0, completedRequests: 0 });
    } catch (err) {
      console.error("Could not fetch server DB:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshServerData();
  }, []);

  const handleApplyAISpec = (specDescription: string, budget: string) => {
    setPrefilledSpecDescription(specDescription);
    setPrefilledBudget(budget);
    setActiveTab('custom'); // redirect instantly to custom drawing form page!
    // Auto scroll down to form
    setTimeout(() => {
      window.scrollTo({ top: 350, behavior: 'smooth' });
    }, 150);
  };

  const clearPrefillBuffer = () => {
    setPrefilledSpecDescription('');
    setPrefilledBudget('');
  };

  const handleOpenCategoryDemo = (categoryId: string) => {
    const category = SERVICES_DATA.find(c => c.id === categoryId);
    if (category && category.items.length > 0) {
      setSelectedGlobalSubService(category.items[0]);
    }
  };

  const handleOpenGalleryCategory = (categoryId: string, subServiceId?: string | null) => {
    setInitialGalleryCategoryId(categoryId);
    setInitialGallerySubServiceId(subServiceId || null);
    setActiveTab('gallery');
    window.scrollTo({ top: 350, behavior: 'smooth' });
  };

  const handleLikeItemState = (id: string) => {
    setGallery(prev => prev.map(g => g.id === id ? { ...g, likes: g.likes + 1 } : g));
  };

  const handleStatusChangeState = (id: string, newStatus: any) => {
    setCustomRequests(prev => prev.map(r => r.id === id ? { ...r, status: newStatus } : r));
    setAnalytics(prev => ({
      ...prev,
      completedRequests: newStatus === 'Completed' ? prev.completedRequests + 1 : prev.completedRequests
    }));
  };

  const handleAddProductState = (newProduct: Product) => {
    setProducts(prev => [...prev, newProduct]);
  };

  const handleDeleteProductState = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  const handleAddGalleryState = (newItem: GalleryItem) => {
    setGallery(prev => [...prev, newItem]);
  };

  const handleDeleteRequestState = (id: string) => {
    setCustomRequests(prev => prev.filter(r => r.id !== id));
    setAnalytics(prev => ({ ...prev, totalRequests: Math.max(0, prev.totalRequests - 1) }));
  };

  const triggerDirectWhatsApp = (presetMsg?: string) => {
    const text = encodeURIComponent(presetMsg || customWhatsAppMsg);
    window.open(`https://wa.me/917028111712?text=${text}`, '_blank');
  };

  // Luxury landing page quick redirect utilities
  const handleFeaturedQuickInquiry = (productName: string) => {
    const textMsg = `Hello, I would like to quickly inquire about custom specifications and unit costings for the standard premium [${productName}] of Bhairavnath Digital.`;
    triggerDirectWhatsApp(textMsg);
  };

  return (
    <div className="min-h-screen bg-[#020205] text-slate-100 flex flex-col justify-between selection:bg-purple-600/30 selection:text-purple-200">
      
      {/* Dynamic luxury neon atmospheric lighting grids behind */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-30">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-purple-900/10 blur-[130px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] rounded-full bg-indigo-900/10 blur-[150px] animate-pulse" />
      </div>

      {/* Top Header Navigation Panel */}
      <Header 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        isAdminLoggedIn={isAdminLoggedIn} 
        isServicesHovered={servicesMenuHovered}
        setIsServicesHovered={setServicesMenuHovered}
        onSelectSubService={(id) => {
          const category = SERVICES_DATA.find(cat => cat.items.some(sub => sub.id === id));
          if (category) {
            handleOpenGalleryCategory(category.id, id);
          }
        }}
      />

      {/* Mega menu backdrop close/interactive mask layer */}
      {servicesMenuHovered && (
        <div 
          className="fixed inset-0 bg-black/10 backdrop-blur-[1px] z-40 pointer-events-auto cursor-default"
          onMouseEnter={() => setServicesMenuHovered(false)}
          onClick={() => setServicesMenuHovered(false)}
        />
      )}

      <main className={`flex-grow z-10 transition-all duration-300 ${servicesMenuHovered ? 'blur-md brightness-[0.45] saturate-50 pointer-events-none' : 'blur-0'}`}>
        <AnimatePresence mode="wait">
          {loading ? (
            // Exclusive cinematic portal load spinner fallback
            <motion.div
              key="preloader"
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-[#020205] z-100 flex flex-col items-center justify-center text-center select-none"
            >
              <div className="w-16 h-16 relative mb-6">
                <div className="absolute inset-0 border-2 border-purple-500/10 rounded-full animate-pulse" />
                <div className="absolute inset-x-0 inset-y-0 border-t-2 border-purple-500 rounded-full animate-spin" />
                <img 
                  src="/src/assets/images/kalbhairav_logo_1781630281528.jpg" 
                  alt="Kalbhairav Digitial Logo" 
                  className="absolute inset-0 m-auto w-10 h-10 object-cover rounded-xl"
                  referrerPolicy="no-referrer"
                />
              </div>
              <h2 className="font-heading font-extrabold text-2xl tracking-widest text-white uppercase">
                BHAIRAVNATH DIGITAL
              </h2>
              <span className="font-mono text-[10px] text-purple-400 font-bold uppercase tracking-widest mt-1">
                Calibrating factory-line offset controllers...
              </span>
            </motion.div>
          ) : (
            
            // Core Views Routing switchers with beautiful high-end transitions
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.45 }}
              className="pt-20"
            >
              
              {/* ================= VIEW 1: HOME LANDING PAGE ================= */}
              {activeTab === 'home' && (
                <div id="home-view-port">
                  {/* Hero Slider banner with floating papers */}
                  <HomeHero 
                    onExploreServices={() => { setActiveTab('services'); window.scrollTo(0, 0); }}
                    onRequestQuote={() => { setActiveTab('custom'); window.scrollTo(0, 0); }}
                  />

                  {/* SECTION 2: BENTO SERVICES GRID */}
                  <section className="py-24 max-w-7xl mx-auto px-6 text-left" id="services-bento">
                    <div className="text-center mb-16">
                      <span className="text-[11px] font-mono font-bold tracking-widest text-[#a855f7] uppercase block mb-1">
                        UNIFIED PRESS SERVICES
                      </span>
                      <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
                        Artisan Printing Masterpieces
                      </h2>
                      <p className="max-w-xl mx-auto text-slate-500 text-xs sm:text-sm mt-3 leading-relaxed">
                        We leverage four offset cylinders and custom micro-engraving plates to deliver physical dimensions of luxury, thickness, and color depth.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                      {/* Service Item (Offset Printing) */}
                      <div 
                        onClick={() => { handleOpenGalleryCategory('offset'); }}
                        className="glass-panel glass-panel-hover p-5 rounded-2xl flex flex-col justify-between group cursor-pointer transition-all duration-300 hover:border-purple-500/35 hover:shadow-lg hover:shadow-purple-500/10 active:scale-[0.98] select-none text-left"
                      >
                        <div>
                          {/* Logo on the left, Title/Label on the right */}
                          <div className="flex items-center gap-4 mb-4 text-left">
                            <div className="w-12 h-12 rounded-xl bg-purple-950/40 border border-purple-500/15 flex items-center justify-center text-[#a855f7] font-bold shrink-0 shadow-inner group-hover:border-purple-500/30 transition-colors">
                              <Printer className="w-6 h-6" />
                            </div>
                            <div className="text-left">
                              <h4 className="font-heading font-extrabold text-white text-base tracking-wide leading-tight group-hover:text-purple-300 transition-colors">Offset Printing</h4>
                              <span className="text-[9.5px] font-mono text-purple-400 uppercase font-bold tracking-wider">Heavy Heidelberg Cylinders</span>
                            </div>
                          </div>

                          {/* Relative Printing Showcase Image */}
                          <div className="relative rounded-xl overflow-hidden aspect-[16/10] border border-purple-500/10 mb-4 bg-zinc-950/80 group-hover:border-purple-500/25 transition-colors">
                            <img 
                              src="https://raw.githubusercontent.com/corporate0828-bot/kalbhairav-digital/4e428e9ccb0fa3e4657f2d97477ccf8511809f1e/447aeacc-35ef-432d-be4f-bebb81e9a843.jpg" 
                              alt="Offset Wedding Cards and Stationery" 
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-104"
                              referrerPolicy="no-referrer"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                          </div>

                          <div className="flex flex-wrap gap-1.5 pt-1">
                            {['Wedding Cards', 'Pamphlets', 'Bill Books', 'Registers'].map((tag) => (
                              <span key={tag} className="text-[9.5px] font-mono tracking-wider bg-purple-950/40 border border-purple-500/10 text-slate-300 px-2 py-0.5 rounded">
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="mt-6 text-xs font-mono font-bold text-purple-400 group-hover:text-white flex items-center gap-1.5 transition uppercase text-left">
                          <span>View Offset Album</span>
                          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>

                      {/* Service Item (Digital Printing) */}
                      <div 
                        onClick={() => { handleOpenGalleryCategory('digital'); }}
                        className="glass-panel glass-panel-hover p-5 rounded-2xl flex flex-col justify-between group cursor-pointer transition-all duration-300 hover:border-purple-500/35 hover:shadow-lg hover:shadow-purple-500/10 active:scale-[0.98] select-none text-left"
                      >
                        <div>
                          {/* Logo on the left, Title/Label on the right */}
                          <div className="flex items-center gap-4 mb-4 text-left">
                            <div className="w-12 h-12 rounded-xl bg-purple-950/40 border border-purple-500/15 flex items-center justify-center text-[#a855f7] font-bold shrink-0 shadow-inner group-hover:border-purple-500/30 transition-colors">
                              <Layers className="w-6 h-6" />
                            </div>
                            <div className="text-left">
                              <h4 className="font-heading font-extrabold text-white text-base tracking-wide leading-tight group-hover:text-purple-300 transition-colors">Digital Printing</h4>
                              <span className="text-[9.5px] font-mono text-purple-400 uppercase font-bold tracking-wider">Multicolor Laser</span>
                            </div>
                          </div>

                          {/* Relative Printing Showcase Image */}
                          <div className="relative rounded-xl overflow-hidden aspect-[16/10] border border-purple-500/10 mb-4 bg-zinc-950/80 group-hover:border-purple-500/25 transition-colors">
                            <img 
                              src="https://raw.githubusercontent.com/corporate0828-bot/kalbhairav-digital/76a3cff155c0ebfd0f6a59e1b44e05697226ed6e/b3bf5b18-e159-44a6-b606-46888c639772.jpg" 
                              alt="Digital Identity Prints" 
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-104"
                              referrerPolicy="no-referrer"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                          </div>

                          <div className="flex flex-wrap gap-1.5 pt-1">
                            {['Visiting Cards', 'Certificates', 'Stickers', 'Menus'].map((tag) => (
                              <span key={tag} className="text-[9.5px] font-mono tracking-wider bg-purple-950/40 border border-purple-500/10 text-slate-300 px-2 py-0.5 rounded">
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="mt-6 text-xs font-mono font-bold text-purple-400 group-hover:text-white flex items-center gap-1.5 transition uppercase text-left">
                          <span>View Digital Album</span>
                          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>

                      {/* Service Item (Screen Printing) */}
                      <div 
                        onClick={() => { handleOpenGalleryCategory('screen'); }}
                        className="glass-panel glass-panel-hover p-5 rounded-2xl flex flex-col justify-between group cursor-pointer transition-all duration-300 hover:border-purple-500/35 hover:shadow-lg hover:shadow-purple-500/10 active:scale-[0.98] select-none text-left"
                      >
                        <div>
                          {/* Logo on the left, Title/Label on the right */}
                          <div className="flex items-center gap-4 mb-4 text-left">
                            <div className="w-12 h-12 rounded-xl bg-purple-950/40 border border-purple-500/15 flex items-center justify-center text-[#a855f7] font-bold shrink-0 shadow-inner group-hover:border-purple-500/30 transition-colors">
                              <Paintbrush className="w-6 h-6" />
                            </div>
                            <div className="text-left">
                              <h4 className="font-heading font-extrabold text-white text-base tracking-wide leading-tight group-hover:text-purple-300 transition-colors">Screen Printing</h4>
                              <span className="text-[9.5px] font-mono text-purple-400 uppercase font-bold tracking-wider">Artisan Silk & Gold Foils</span>
                            </div>
                          </div>

                          {/* Relative Printing Showcase Image */}
                          <div className="relative rounded-xl overflow-hidden aspect-[16/10] border border-purple-500/10 mb-4 bg-zinc-950/80 group-hover:border-purple-500/25 transition-colors">
                            <img 
                              src="https://raw.githubusercontent.com/corporate0828-bot/kalbhairav-digital/6f8bad143c7d7b19574f73d0deede665599678af/31cd3e64-82e4-4c82-845e-2ac886317b7c.jpg" 
                              alt="Silkscreen Golden Inks" 
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-104"
                              referrerPolicy="no-referrer"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                          </div>

                          <div className="flex flex-wrap gap-1.5 pt-1">
                            {['Premium Invites', 'Carry Bags', 'Envelopes', 'Plates'].map((tag) => (
                              <span key={tag} className="text-[9.5px] font-mono tracking-wider bg-purple-950/40 border border-purple-500/10 text-slate-300 px-2 py-0.5 rounded">
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="mt-6 text-xs font-mono font-bold text-purple-400 group-hover:text-white flex items-center gap-1.5 transition uppercase text-left">
                          <span>View Screen Album</span>
                          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>

                      {/* Service Item (Flex Printing) */}
                      <div 
                        onClick={() => { handleOpenGalleryCategory('flex'); }}
                        className="glass-panel glass-panel-hover p-5 rounded-2xl flex flex-col justify-between group cursor-pointer transition-all duration-300 hover:border-purple-500/35 hover:shadow-lg hover:shadow-purple-500/10 active:scale-[0.98] select-none text-left"
                      >
                        <div>
                          {/* Logo on the left, Title/Label on the right */}
                          <div className="flex items-center gap-4 mb-4 text-left">
                            <div className="w-12 h-12 rounded-xl bg-purple-950/40 border border-purple-500/15 flex items-center justify-center text-[#a855f7] font-bold shrink-0 shadow-inner group-hover:border-purple-500/30 transition-colors">
                              <Layout className="w-6 h-6" />
                            </div>
                            <div className="text-left">
                              <h4 className="font-heading font-extrabold text-white text-base tracking-wide leading-tight group-hover:text-purple-300 transition-colors">Flex Printing</h4>
                              <span className="text-[9.5px] font-mono text-purple-400 uppercase font-bold tracking-wider">Jumbo Weather-Proof Outlets</span>
                            </div>
                          </div>

                          {/* Relative Printing Showcase Image */}
                          <div className="relative rounded-xl overflow-hidden aspect-[16/10] border border-purple-500/10 mb-4 bg-zinc-950/80 group-hover:border-purple-500/25 transition-colors">
                            <img 
                              src="https://raw.githubusercontent.com/corporate0828-bot/kalbhairav-digital/5f735206d545a9801654f9b7ef37335c135bdaad/eec85edd-d706-4d27-9917-88a45c93511d.jpg" 
                              alt="Flex Billboards and Signages" 
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-104"
                              referrerPolicy="no-referrer"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                          </div>

                          <div className="flex flex-wrap gap-1.5 pt-1">
                            {['Star Flex', 'Vinyl Stickers', 'Backlits', 'One Way Vision'].map((tag) => (
                              <span key={tag} className="text-[9.5px] font-mono tracking-wider bg-purple-950/40 border border-purple-500/10 text-slate-300 px-2 py-0.5 rounded">
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="mt-6 text-xs font-mono font-bold text-purple-400 group-hover:text-white flex items-center gap-1.5 transition uppercase text-left">
                          <span>View Flex Album</span>
                          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </section>

                  {/* SECTION 3: WHY CHOOSE US STATS */}
                  <section className="py-20 bg-zinc-950/30 border-t border-b border-purple-500/5 select-none" id="why-choose-us">
                    <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-8">
                      <div className="text-center p-6 bg-black/40 border border-purple-500/5 rounded-2xl">
                        <Flame className="w-8 h-8 text-purple-400 mx-auto mb-2 animate-pulse" />
                        <h4 className="font-heading font-extrabold text-3xl sm:text-4xl text-white">5000+</h4>
                        <p className="text-slate-500 text-xs sm:text-sm uppercase tracking-wider font-mono mt-1 font-semibold">Orders Completed</p>
                      </div>
                      <div className="text-center p-6 bg-black/40 border border-purple-500/5 rounded-2xl">
                        <Trophy className="w-8 h-8 text-purple-400 mx-auto mb-2 animate-pulse" />
                        <h4 className="font-heading font-extrabold text-3xl sm:text-4xl text-white">10+ Years</h4>
                        <p className="text-slate-500 text-xs sm:text-sm uppercase tracking-wider font-mono mt-1 font-semibold">Experience</p>
                      </div>
                      <div className="text-center p-6 bg-black/40 border border-purple-500/5 rounded-2xl">
                        <Globe2 className="w-8 h-8 text-purple-400 mx-auto mb-2 animate-pulse" />
                        <h4 className="font-heading font-extrabold text-3xl sm:text-4xl text-white">1000+</h4>
                        <p className="text-slate-500 text-xs sm:text-sm uppercase tracking-wider font-mono mt-1 font-semibold">Templates</p>
                      </div>
                      <div className="text-center p-6 bg-black/40 border border-purple-500/5 rounded-2xl">
                        <Clock className="w-8 h-8 text-purple-400 mx-auto mb-2 animate-pulse" />
                        <h4 className="font-heading font-extrabold text-3xl sm:text-4xl text-white">24 Hour</h4>
                        <p className="text-slate-500 text-xs sm:text-sm uppercase tracking-wider font-mono mt-1 font-semibold">Fast Delivery</p>
                      </div>
                    </div>
                  </section>

                  {/* SECTION 4: PRODUCTION TIMELINE */}
                  <section className="relative py-28 border-t border-b border-purple-500/10 overflow-hidden select-none" id="process-timeline">
                    {/* Background Image with Dark Vignette/Gradients */}
                    <div className="absolute inset-0 w-full h-full">
                      <img 
                        src="https://raw.githubusercontent.com/corporate0828-bot/kalbhairav-digital/67fdff1010591082f39b4eb802e5288ca529f3c4/018373a6-fc6c-44b9-ae55-31c500f0d23d.jpg" 
                        alt="Kaalbhairav Digital Premium Production Showroom" 
                        className="w-full h-full object-cover opacity-75"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-zinc-950/30 to-zinc-950/90" />
                      <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/80 via-transparent to-zinc-950/80" />
                    </div>

                    <div className="relative z-10 max-w-7xl mx-auto px-6">
                      <div className="text-center mb-16">
                        <span className="text-[11px] font-mono font-bold tracking-widest text-purple-400 uppercase bg-zinc-950/90 border border-purple-500/30 px-3.5 py-1.5 rounded-full inline-block backdrop-blur-md">
                          FACTORY PROCESS
                        </span>
                        <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-white mt-4 drop-shadow-md">
                          Timeline of Bespoke Crafting
                        </h2>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
                        {/* Step 1 */}
                        <div className="space-y-4 p-6 bg-zinc-950/85 backdrop-blur-md border border-white/10 rounded-2xl shadow-2xl shadow-black/80 hover:border-purple-500/40 transition-all duration-300">
                          <div className="flex items-center gap-3">
                            <div className="w-11 h-11 bg-purple-900/30 border border-purple-500/45 rounded-full flex items-center justify-center font-heading font-bold text-purple-300">
                              01
                            </div>
                            <div className="h-px bg-purple-500/20 flex-grow hidden md:block" />
                          </div>
                          <h4 className="font-heading font-extrabold text-white text-base">Select Sample Concept</h4>
                          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-light">
                            Browse thousands of live templates online or run a neural consultant query to match paper stock weight requirements.
                          </p>
                        </div>

                        {/* Step 2 */}
                        <div className="space-y-4 p-6 bg-zinc-950/85 backdrop-blur-md border border-white/10 rounded-2xl shadow-2xl shadow-black/80 hover:border-purple-500/40 transition-all duration-300">
                          <div className="flex items-center gap-3">
                            <div className="w-11 h-11 bg-purple-900/30 border border-purple-500/45 rounded-full flex items-center justify-center font-heading font-bold text-purple-300">
                              02
                            </div>
                            <div className="h-px bg-purple-500/20 flex-grow hidden md:block" />
                          </div>
                          <h4 className="font-heading font-extrabold text-white text-base">Bespoke Fine Tuning</h4>
                          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-light">
                            Our pre-press graphics team creates digital PDF blueprints and adapts custom gold-monogram designs securely.
                          </p>
                        </div>

                        {/* Step 3 */}
                        <div className="space-y-4 p-6 bg-zinc-950/85 backdrop-blur-md border border-white/10 rounded-2xl shadow-2xl shadow-black/80 hover:border-purple-500/40 transition-all duration-300">
                          <div className="flex items-center gap-3">
                            <div className="w-11 h-11 bg-purple-900/30 border border-purple-500/45 rounded-full flex items-center justify-center font-heading font-bold text-purple-300">
                              03
                            </div>
                            <div className="h-px bg-purple-500/20 flex-grow hidden md:block" />
                          </div>
                          <h4 className="font-heading font-extrabold text-white text-base">Heidelberg Press Run</h4>
                          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-light">
                            Traditional lithography, multi-cylinder registration alignment, hot-foil stamping & raised tactile spot UV lacquer coat overlays.
                          </p>
                        </div>

                        {/* Step 4 */}
                        <div className="space-y-4 p-6 bg-zinc-950/85 backdrop-blur-md border border-white/10 rounded-2xl shadow-2xl shadow-black/80 hover:border-purple-500/40 transition-all duration-300">
                          <div className="flex items-center gap-3">
                            <div className="w-11 h-11 bg-purple-900/30 border border-purple-500/45 rounded-full flex items-center justify-center font-heading font-bold text-purple-300">
                              04
                            </div>
                            <div className="h-px bg-purple-500/20 flex-grow hidden md:block" />
                          </div>
                          <h4 className="font-heading font-extrabold text-white text-base">Express Delivery Out</h4>
                          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-light">
                            Rigidly boxed shipments dispatched securely nationwide through air courier services with instant WhatsApp tracking receipts.
                          </p>
                        </div>
                      </div>
                    </div>
                  </section>



                  {/* SECTION 6: FAQ ACCORDION */}
                  <section className="py-24 max-w-4xl mx-auto px-6 text-left" id="faq-accordion">
                    <div className="text-center mb-14">
                      <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-white mt-3 inline-block">
                        Frequently Answered Queries
                      </h2>
                    </div>

                    <div className="space-y-3.5">
                      {faqs.map((faq) => {
                        const isExpanded = openFaqIdx === faq.id;
                        return (
                          <div
                            key={faq.id}
                            className="bg-zinc-950/40 border border-purple-500/10 rounded-2xl overflow-hidden transition-all duration-300"
                          >
                            <button
                              onClick={() => setOpenFaqIdx(isExpanded ? null : faq.id)}
                              className="w-full p-5 flex items-center justify-between text-left font-heading font-bold text-sm sm:text-base text-white hover:text-purple-300 focus:outline-none transition-colors"
                            >
                              <span>{faq.question}</span>
                              <ChevronDown className={`w-5 h-5 text-purple-400 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
                            </button>

                            <AnimatePresence>
                              {isExpanded && (
                                <motion.div
                                  initial={{ height: 0 }}
                                  animate={{ height: 'auto' }}
                                  exit={{ height: 0 }}
                                  className="border-t border-purple-500/5"
                                >
                                  <p className="p-5 text-xs sm:text-sm leading-relaxed text-slate-400 font-light">
                                    {faq.answer}
                                  </p>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        );
                      })}
                    </div>
                  </section>

                </div>
              )}

              {/* ================= VIEW 2: SERVICES PORTAL ================= */}
              {activeTab === 'services' && (
                <ServicesCatalog 
                  onQuickInquiry={handleFeaturedQuickInquiry} 
                  initialSubServiceId={initialSubServiceId}
                  onClearInitialSubService={() => setInitialSubServiceId(null)}
                  onNavigateToGalleryCategory={handleOpenGalleryCategory}
                />
              )}

              {/* ================= VIEW 3: PINTEREST GALLERY ================= */}
              {activeTab === 'gallery' && (
                <PinterestGallery 
                  galleryItems={gallery} 
                  onLikeItem={handleLikeItemState} 
                  initialCategoryId={initialGalleryCategoryId}
                  onClearInitialCategoryId={() => setInitialGalleryCategoryId(null)}
                  initialSubServiceId={initialGallerySubServiceId}
                  onClearInitialSubService={() => setInitialGallerySubServiceId(null)}
                />
              )}

              {/* ================= VIEW 4: CUSTOM DESIGN & AI SPEC ================= */}
              {activeTab === 'custom' && (
                <div id="ai-custom-interface-view">
                  {/* Master AI Spec Builder Panel */}
                  <AICardRecommender onUseAISpec={handleApplyAISpec} />

                  {/* Submission form segment */}
                  <CustomDesignForm
                    prefilledSpecDescription={prefilledSpecDescription}
                    prefilledBudget={prefilledBudget}
                    onClearPrefilledSpec={clearPrefillBuffer}
                    onSubmitSuccess={refreshServerData}
                  />
                </div>
              )}

              {/* ================= VIEW 5: CONTACT & ABOUT DETAILS ================= */}
              {activeTab === 'contact' && (
                <ContactAbout 
                  machinery={machines} 
                  team={team} 
                />
              )}

              {/* ================= VIEW 7: SECURE ADMIN CONTROL PANEL ================= */}
              {activeTab === 'admin' && (
                <AdminDashboard
                  products={products}
                  gallery={gallery}
                  customRequests={customRequests}
                  analytics={analytics}
                  isAdminLoggedIn={isAdminLoggedIn}
                  onSetAdminLoggedIn={setIsAdminLoggedIn}
                  onAddProduct={handleAddProductState}
                  onDeleteProduct={handleDeleteProductState}
                  onAddGallery={handleAddGalleryState}
                  onDeleteRequest={handleDeleteRequestState}
                  onStatusChange={handleStatusChangeState}
                />
              )}

            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Floating interactive global quick actions bar */}
      <div className="fixed bottom-6 left-6 z-40 select-none flex flex-col-reverse items-start gap-3">
        {/* Buttons Row */}
        <div className="flex items-center gap-2">
          {/* WhatsApp Button */}
          <button
            onClick={() => setShowWhatsAppDrawer(!showWhatsAppDrawer)}
            type="button"
            className="w-10 h-10 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40 hover:scale-108 active:scale-95 transition-all outline-none"
            title="Send WhatsApp Inquiry"
          >
            <svg className="w-5 h-5 fill-current text-white animate-pulse" viewBox="0 0 24 24">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.181 1.449 4.825 1.451 5.436 0 9.86-4.42 9.864-9.858.002-2.634-1.013-5.111-2.86-6.961C16.613 1.936 14.135.918 11.5.918c-5.441 0-9.866 4.421-9.87 9.859-.001 1.77.464 3.501 1.346 5.03l-.15.549-1.15 4.197 4.298-1.127.535-.153zm11.332-6.527c-.29-.144-1.714-.847-1.978-.942-.264-.096-.456-.144-.648.144-.192.288-.744.942-.912 1.134-.168.192-.336.216-.626.072-.29-.143-1.222-.45-2.328-1.437-.86-.767-1.442-1.716-1.61-2.003-.168-.288-.018-.443.126-.585.13-.127.29-.336.435-.504.144-.168.192-.288.288-.48.096-.192.048-.36-.024-.504-.072-.144-.648-1.56-.888-2.136-.234-.564-.472-.487-.648-.496-.168-.008-.36-.008-.552-.008s-.504.072-.768.36c-.264.288-1.008.984-1.008 2.399 0 1.416 1.032 2.784 1.176 2.976.144.192 2.031 3.101 4.921 4.348.687.296 1.224.473 1.643.606.69.219 1.319.188 1.815.114.553-.083 1.714-.7 1.954-1.376.24-.676.24-1.256.168-1.376-.072-.12-.264-.192-.555-.336z" />
            </svg>
          </button>
          
          {/* Active Call Button */}
          <a
            href="tel:+917028111712"
            className="w-10 h-10 rounded-full bg-blue-600 hover:bg-blue-500 text-white flex items-center justify-center shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 hover:scale-108 active:scale-95 transition-all outline-none"
            title="Call Phone (7028111712)"
          >
            <Phone className="w-4.5 h-4.5 text-white" />
          </a>

          {/* Instagram Link Button */}
          <a
            href="https://www.instagram.com/kaalbhairavdigital?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-500 via-pink-600 to-purple-600 hover:opacity-95 text-white flex items-center justify-center shadow-lg shadow-pink-600/20 hover:shadow-pink-600/40 hover:scale-108 active:scale-95 transition-all outline-none"
            title="Visit Instagram Page"
          >
            <Instagram className="w-4.5 h-4.5 text-white" />
          </a>
        </div>

        {/* Floating whatsapp overlay panel */}
        <AnimatePresence>
          {showWhatsAppDrawer && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 10 }}
              className="bg-zinc-950/95 backdrop-blur-xl border border-purple-500/20 w-80 p-4.5 rounded-2xl relative shadow-2xl box-glow-purple-strong mt-2"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close pin */}
              <button
                onClick={() => setShowWhatsAppDrawer(false)}
                className="absolute top-3.5 right-3.5 p-1 bg-white/5 text-slate-400 hover:text-white rounded"
              >
                <X className="w-3.5 h-3.5" />
              </button>

              <div className="flex items-center gap-3 border-b border-purple-500/10 pb-3 mb-3 text-left">
                <div className="p-2 bg-emerald-950/40 rounded-xl">
                  <MessageCircle className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <h4 className="font-heading font-extrabold text-sm text-white">Bhairavnath Digital</h4>
                  <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-widest block font-light">Online & Consult Active</span>
                </div>
              </div>

              <p className="text-[11.5px] leading-relaxed text-slate-400 mb-3.5 text-left">
                Type your inquiry details below to transfer the chat session directly to Nishant Pisal over WhatsApp.
              </p>

              <textarea
                value={customWhatsAppMsg}
                onChange={(e) => setCustomWhatsAppMsg(e.target.value)}
                rows={3}
                className="w-full p-2.5 rounded-lg bg-black border border-purple-500/15 focus:border-purple-500/80 focus:outline-none text-xs text-slate-200 mb-3"
              />

              <button
                onClick={() => triggerDirectWhatsApp()}
                className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-heading font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 shadow-md shadow-emerald-500/10"
              >
                <span>Launch WhatsApp Chat</span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Global Blueprint Modal */}
      <AnimatePresence>
        {selectedGlobalSubService && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 sm:p-6 backdrop-blur-md"
            onClick={() => setSelectedGlobalSubService(null)}
          >
            <motion.div
              initial={{ scale: 1, y: 0 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 1, y: 0 }}
              className="glass-panel w-full max-w-2xl rounded-2xl p-5 sm:p-7 relative max-h-[92vh] overflow-y-auto border border-purple-500/30 flex flex-col justify-between"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedGlobalSubService(null)}
                className="absolute top-4 right-4 p-2 bg-purple-950/40 border border-purple-500/20 text-slate-400 hover:text-white rounded-lg hover:bg-purple-900/60 transition-colors z-10"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="space-y-6">
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
                    {selectedGlobalSubService.name}
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-start">
                  <div className="sm:col-span-6 rounded-xl overflow-hidden aspect-[4/3] sm:aspect-square border border-purple-500/20 bg-black/90 relative">
                    <img
                      src={selectedGlobalSubService.demoImage}
                      alt={selectedGlobalSubService.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-black/60 p-2 text-[10px] font-mono text-center text-slate-400 border-t border-white/5 uppercase">
                      © Kalbhairav Factory Floor sample
                    </div>
                  </div>

                  <div className="sm:col-span-6 space-y-4 text-left">
                    <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-light">
                      {selectedGlobalSubService.description}
                    </p>

                    <div className="space-y-2 border-t border-b border-purple-500/10 py-3.5 bg-black/15 p-3 rounded-lg">
                      <h5 className="text-[10px] font-mono text-purple-400 font-extrabold uppercase tracking-widest">
                        Technical Sheet Guidelines
                      </h5>
                      <ul className="space-y-1.5">
                        {selectedGlobalSubService.specs.map((item, id) => (
                          <li key={id} className="text-xs text-slate-300 flex items-start gap-2">
                            <Check className="w-3.5 h-3.5 text-purple-400 shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-purple-500/10">
                  <button
                    onClick={() => {
                      triggerDirectWhatsApp(`Hello, I would like to inquire about: [${selectedGlobalSubService.name}]`);
                      setSelectedGlobalSubService(null);
                    }}
                    className="py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-heading text-xs uppercase font-extrabold tracking-widest transition-all flex items-center justify-center gap-2"
                  >
                    <MessageSquareText className="w-4 h-4 fill-current" />
                    <span>Inquire via WhatsApp</span>
                  </button>
                  <button
                    onClick={() => {
                      setPrefilledSpecDescription(`Inquiry Specification Blueprint:\nType: ${selectedGlobalSubService.name}\nRequirements: Custom luxury sizing with rich inks.`);
                      setActiveTab('custom');
                      setSelectedGlobalSubService(null);
                      setTimeout(() => {
                        window.scrollTo({ top: 350, behavior: 'smooth' });
                      }, 150);
                    }}
                    className="py-3 px-4 rounded-xl bg-purple-900/45 hover:bg-purple-900 border border-purple-500/20 text-white font-heading text-xs uppercase font-extrabold tracking-widest transition-all"
                  >
                    Draw with AI Spec
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Decorative layout footer */}
      <Footer onNavigate={setActiveTab} onOpenCategoryDemo={handleOpenCategoryDemo} />

    </div>
  );
}
