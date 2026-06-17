import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LayoutDashboard, Lock, User, FileSpreadsheet, Eye, Plus, ShoppingBag, FolderHeart, Trash2, Check, RefreshCw, Layers, ShieldAlert, KeyRound, ArrowRight } from 'lucide-react';
import { Product, GalleryItem, CustomRequest } from '../types';

interface AdminDashboardProps {
  products: Product[];
  gallery: GalleryItem[];
  customRequests: CustomRequest[];
  analytics: { pageViews: number; totalRequests: number; completedRequests: number };
  isAdminLoggedIn: boolean;
  onSetAdminLoggedIn: (loggedIn: boolean) => void;
  onAddProduct: (product: Product) => void;
  onDeleteProduct: (id: string) => void;
  onAddGallery: (item: GalleryItem) => void;
  onDeleteRequest: (id: string) => void;
  onStatusChange: (id: string, newStatus: "Pending" | "Approved" | "Printing" | "Completed") => void;
}

export default function AdminDashboard({
  products,
  gallery,
  customRequests,
  analytics,
  isAdminLoggedIn,
  onSetAdminLoggedIn,
  onAddProduct,
  onDeleteProduct,
  onAddGallery,
  onDeleteRequest,
  onStatusChange
}: AdminDashboardProps) {
  
  // Login credentials states
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginErr, setLoginErr] = useState<string | null>(null);
  const [loginBusy, setLoginBusy] = useState(false);

  // New product editor forms states
  const [prodName, setProdName] = useState('');
  const [prodCat, setProdCat] = useState('Wedding Cards');
  const [prodPrice, setProdPrice] = useState('₹100 - ₹350 per piece');
  const [prodDesc, setProdDesc] = useState('');
  const [prodMin, setProdMin] = useState(150);
  const [prodFeats, setProdFeats] = useState('Matte finish, Gold Embossed');
  const [prodPaper, setProdPaper] = useState('350 GSM Import Textured Paper');
  const [prodImg, setProdImg] = useState('https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=800&q=80');

  // New gallery image editor forms states
  const [galTitle, setGalTitle] = useState('');
  const [galCat, setGalCat] = useState('Wedding Cards');
  const [galDesc, setGalDesc] = useState('Exquisite gold stamp lettering detailing.');
  const [galImg, setGalImg] = useState('https://images.unsplash.com/photo-1607344645866-009c320c5ab8?auto=format&fit=crop&w=800&q=80');

  // Active sub-views (requests | products | portfolio)
  const [adminView, setAdminView] = useState<'requests' | 'products' | 'portfolio'>('requests');
  const [isPublishing, setIsPublishing] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginBusy(true);
    setLoginErr(null);

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      if (response.ok && data.success) {
        onSetAdminLoggedIn(true);
      } else {
        setLoginErr(data.error || "Access Denied. Check credentials.");
      }
    } catch (err) {
      setLoginErr("Could not establish connection to the admin server.");
    } finally {
      setLoginBusy(false);
    }
  };

  const handlePostProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prodName || !prodDesc) return;
    setIsPublishing(true);

    try {
      const newProduct = {
        name: prodName,
        category: prodCat,
        priceRange: prodPrice,
        description: prodDesc,
        minOrder: Number(prodMin) || 100,
        features: prodFeats.split(',').map(s => s.trim()),
        paperType: prodPaper,
        image: prodImg
      };

      const response = await fetch('/api/admin/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProduct),
      });

      const data = await response.json();
      if (response.ok && data.success) {
        onAddProduct(data.product);
        // Reset product form elements
        setProdName('');
        setProdDesc('');
        alert("Corporate product published successfully!");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsPublishing(false);
    }
  };

  const handlePostGallery = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!galTitle || !galImg) return;
    setIsPublishing(true);

    try {
      const newItem = {
        title: galTitle,
        category: galCat,
        description: galDesc,
        imageUrl: galImg
      };

      const response = await fetch('/api/admin/gallery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newItem),
      });

      const data = await response.json();
      if (response.ok && data.success) {
        onAddGallery(data.item);
        // Reset gallery form elements
        setGalTitle('');
        setGalDesc('');
        alert("Portfolio image published to Pinterest album successfully!");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsPublishing(false);
    }
  };

  const handleUpdateStatus = async (id: string, newStatus: "Pending" | "Approved" | "Printing" | "Completed") => {
    try {
      const response = await fetch('/api/admin/requests/status', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: newStatus }),
      });
      if (response.ok) {
        onStatusChange(id, newStatus);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteRequest = async (id: string) => {
    if (!confirm("Are you sure you want to permanently delete this customer inquiry?")) return;
    try {
      const response = await fetch(`/api/admin/requests/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        onDeleteRequest(id);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleRemoveProduct = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product from the master list?")) return;
    try {
      const response = await fetch(`/api/admin/products/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        onDeleteProduct(id);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogout = () => {
    onSetAdminLoggedIn(false);
    setUsername('');
    setPassword('');
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-12" id="admin-module-panel">
      
      {/* 1. SECURE LOGIN BARRIER */}
      {!isAdminLoggedIn ? (
        <div className="max-w-md mx-auto py-16" id="admin-login-shield">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-panel rounded-2xl p-6 sm:p-8 border-purple-500/20 box-glow-purple"
          >
            <div className="text-center mb-8 relative">
              <div className="w-12 h-12 rounded-full bg-purple-950/40 border border-purple-500/20 flex items-center justify-center mx-auto mb-4 text-[#a855f7]">
                <KeyRound className="w-5.5 h-5.5" />
              </div>
              <h3 className="font-heading font-extrabold text-2xl text-white tracking-wide">
                Bhairavnath Security
              </h3>
              <p className="text-slate-500 text-xs sm:text-sm mt-1">
                Enter your private administrative keys to open the live database.
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-[10.5px] font-mono uppercase tracking-wider text-purple-400 font-bold mb-1.5 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5" /> Username
                </label>
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="e.g., admin"
                  className="w-full p-3 bg-black border border-purple-500/15 focus:border-purple-500/85 rounded-xl text-sm focus:outline-none text-slate-100"
                />
              </div>

              <div>
                <label className="block text-[10.5px] font-mono uppercase tracking-wider text-purple-400 font-bold mb-1.5 flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5" /> Password
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password keys..."
                  className="w-full p-3 bg-black border border-purple-500/15 focus:border-purple-500/85 rounded-xl text-sm focus:outline-none text-slate-100"
                />
              </div>

              {loginErr && (
                <div className="p-3.5 bg-red-950/40 border border-red-500/20 text-rose-300 text-xs rounded-xl flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 text-red-400" />
                  <span>{loginErr}</span>
                </div>
              )}

              {/* Login hint banner to facilitate seamless inspection without friction */}
              <div className="p-3 bg-fuchsia-950/5 border border-fuchsia-500/10 rounded-xl text-center text-[11px] font-mono text-fuchsia-400 font-medium">
                Admin credentials hint:<br />
                <strong>admin</strong> / <strong>bhairavnath2026</strong>
              </div>

              <button
                type="submit"
                disabled={loginBusy}
                className="w-full py-3.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 rounded-xl text-white font-heading text-xs uppercase font-extrabold tracking-widest hover:scale-[1.01] active:translate-y-0.5 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <span>Authorize Access</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        </div>
      ) : (
        
        // 2. LIVE MANAGEMENT CONSOLE
        <div className="space-y-10 text-left" id="admin-main-dashboard">
          
          {/* Dashboard Header Panel */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-purple-500/10 pb-6">
            <div>
              <span className="text-[11px] font-mono font-bold tracking-widest text-[#a855f7] uppercase">
                BHAIRAVNATH AUTOMATED COMMAND PANEL
              </span>
              <h2 className="font-heading font-extrabold text-3xl text-white tracking-wide mt-1 flex items-center gap-2.5">
                <LayoutDashboard className="w-7 h-7 text-purple-400" /> Administrative Console
              </h2>
            </div>

            <button
              onClick={handleLogout}
              className="px-4.5 py-2 hover:bg-red-950/20 hover:border-red-500/40 text-red-400 rounded-full text-xs font-mono font-bold uppercase tracking-wider border border-purple-500/10 transition-all self-start sm:self-center"
            >
              Sign Out
            </button>
          </div>

          {/* Core Analytics Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6" id="dashboard-analytics-ribbon">
            
            {/* View counter */}
            <div className="glass-panel p-6 rounded-2xl relative">
              <span className="text-[11px] font-mono text-slate-500 font-bold tracking-wider block mb-1">
                LIFETIME PAGE VIEWS
              </span>
              <h4 className="font-heading font-extrabold text-white text-3xl sm:text-4xl text-glow-purple">
                {analytics.pageViews}
              </h4>
              <div className="absolute top-4 right-4 w-12 h-12 bg-purple-500/5 rounded-full flex items-center justify-center">
                <Eye className="w-5.5 h-5.5 text-purple-300" />
              </div>
            </div>

            {/* Total quote request submissions */}
            <div className="glass-panel p-6 rounded-2xl relative">
              <span className="text-[11px] font-mono text-slate-500 font-bold tracking-wider block mb-1">
                INCOMING REQ PIPELINE
              </span>
              <h4 className="font-heading font-extrabold text-white text-3xl sm:text-4xl text-glow-purple">
                {analytics.totalRequests}
              </h4>
              <div className="absolute top-4 right-4 w-12 h-12 bg-purple-500/5 rounded-full flex items-center justify-center">
                <FileSpreadsheet className="w-5.5 h-5.5 text-purple-300" />
              </div>
            </div>

            {/* Completed Requests */}
            <div className="glass-panel p-6 rounded-2xl relative">
              <span className="text-[11px] font-mono text-slate-500 font-bold tracking-wider block mb-1">
                CLOSED CLIENT DEALS
              </span>
              <h4 className="font-heading font-extrabold text-white text-3xl sm:text-4xl text-glow-purple">
                {analytics.completedRequests}
              </h4>
              <div className="absolute top-4 right-4 w-12 h-12 bg-purple-500/5 rounded-full flex items-center justify-center">
                <Check className="w-5.5 h-5.5 text-purple-300" />
              </div>
            </div>
          </div>

          {/* Sub-view Navigation controls */}
          <div className="flex border-b border-purple-500/10">
            <button
              onClick={() => setAdminView('requests')}
              className={`px-6 py-3 font-heading text-xs sm:text-sm font-bold uppercase tracking-wider transition-all border-b-2 ${adminView === 'requests' ? 'border-purple-500 text-purple-400' : 'border-transparent text-slate-400 hover:text-white'}`}
            >
              Custom Quotes ({customRequests.length})
            </button>
            <button
              onClick={() => setAdminView('products')}
              className={`px-6 py-3 font-heading text-xs sm:text-sm font-bold uppercase tracking-wider transition-all border-b-2 ${adminView === 'products' ? 'border-purple-500 text-purple-400' : 'border-transparent text-slate-400 hover:text-white'}`}
            >
              Product Catalog ({products.length})
            </button>
            <button
              onClick={() => setAdminView('portfolio')}
              className={`px-6 py-3 font-heading text-xs sm:text-sm font-bold uppercase tracking-wider transition-all border-b-2 ${adminView === 'portfolio' ? 'border-purple-500 text-purple-400' : 'border-transparent text-slate-400 hover:text-white'}`}
            >
              Pinterest Portfolio ({gallery.length})
            </button>
          </div>

          <div className="min-h-[400px]">
            {/* A. REQUESTS PIPELINE VIEWER */}
            {adminView === 'requests' && (
              <div className="space-y-6" id="requests-pipeline">
                {customRequests.length === 0 ? (
                  <div className="py-12 text-center text-slate-500">
                    No active quote specifications in the live pipeline.
                  </div>
                ) : (
                  customRequests.map((req) => (
                    <div key={req.id} className="glass-panel rounded-2xl p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                      <div className="space-y-2 flex-grow max-w-2xl">
                        <div className="flex items-center flex-wrap gap-2.5">
                          <span className={`text-[10px] font-mono font-bold tracking-widest px-2.5 py-0.5 rounded uppercase border ${req.status === 'Completed' ? 'bg-emerald-950/20 border-emerald-500/30 text-emerald-400' : req.status === 'Printing' ? 'bg-amber-950/20 border-amber-500/30 text-amber-400' : req.status === 'Approved' ? 'bg-sky-950/20 border-sky-500/30 text-sky-400' : 'bg-purple-950/20 border-purple-500/30 text-purple-400'}`}>
                            {req.status}
                          </span>
                          <span className="text-[11px] font-mono text-slate-500">{req.date}</span>
                          <span className="text-[11px] font-mono text-emerald-500 tracking-wide font-semibold">{req.budget}</span>
                        </div>

                        <h4 className="font-heading font-extrabold text-white text-lg tracking-wide">
                          {req.name} ({req.phone})
                        </h4>
                        
                        {req.email && <div className="text-xs font-mono text-slate-400">{req.email}</div>}

                        <p className="text-slate-300 text-xs sm:text-sm leading-relaxed p-3.5 rounded-xl bg-black border border-purple-500/10 italic">
                          "{req.describeDesign}"
                        </p>

                        <div className="text-xs font-mono text-slate-500">
                          TARGET VOLUME QUANTITY: <strong className="text-white">{req.quantity} PIECES</strong>
                        </div>

                        {/* Reference upload visualization attachment */}
                        {req.referenceImage && (
                          <div className="mt-2.5 inline-flex items-center gap-2 px-3 py-1 bg-purple-950/20 border border-purple-500/15 rounded-lg">
                            <span className="text-[11px] font-mono text-purple-300">ATTACHED DRAFT SPEC:</span>
                            <a href={req.referenceImage} target="_blank" rel="noopener noreferrer" className="text-[11.5px] font-bold text-emerald-400 underline uppercase hover:text-emerald-300">
                              View Attachment Image
                            </a>
                          </div>
                        )}
                      </div>

                      {/* Control Panel Status change */}
                      <div className="flex flex-col sm:flex-row md:flex-col items-stretch gap-2 shrink-0 w-full sm:w-auto">
                        <select
                          value={req.status}
                          onChange={(e) => handleUpdateStatus(req.id, e.target.value as any)}
                          className="px-3.5 py-2.5 bg-black border border-purple-500/15 focus:border-purple-500/90 rounded-xl text-xs font-mono font-bold uppercase text-purple-300"
                        >
                          <option value="Pending">Pending Review</option>
                          <option value="Approved">Approve Spec</option>
                          <option value="Printing">In Factory Press</option>
                          <option value="Completed">Deals Closed</option>
                        </select>

                        <button
                          onClick={() => handleDeleteRequest(req.id)}
                          className="px-4 py-2 bg-rose-950/20 border border-rose-500/25 hover:border-red-500 text-red-400 hover:text-white rounded-xl text-xs font-mono font-bold uppercase transition flex items-center justify-center gap-1.5"
                        >
                          <Trash2 className="w-3.5 h-3.5" /> Delete
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* B. PUBLISH PRODUCTS EDITOR */}
            {adminView === 'products' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start" id="products-publish-panel">
                
                {/* Product draft Form */}
                <div className="lg:col-span-5 bg-zinc-950/20 border border-purple-500/10 p-6 rounded-2xl">
                  <h3 className="font-heading font-extrabold text-lg text-white mb-4 flex items-center gap-1.5 ">
                    <Plus className="w-5 h-5 text-purple-400" /> Publish Stock Item
                  </h3>

                  <form onSubmit={handlePostProduct} className="space-y-4">
                    <div>
                      <label className="block text-[10px] font-mono uppercase tracking-wider text-purple-400 font-bold mb-1">
                        Product Name
                      </label>
                      <input
                        type="text"
                        required
                        value={prodName}
                        onChange={(e) => setProdName(e.target.value)}
                        placeholder="e.g., gold spot business card"
                        className="w-full p-2.5 bg-black border border-purple-500/15 focus:border-purple-500/85 rounded-xl text-xs text-slate-100"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-[10px] font-mono uppercase tracking-wider text-purple-400 font-bold mb-1">
                          Category
                        </label>
                        <select
                          value={prodCat}
                          onChange={(e) => setProdCat(e.target.value)}
                          className="w-full p-2 bg-black border border-purple-500/15 focus:border-purple-500/85 rounded-xl text-xs uppercase font-bold text-purple-300"
                        >
                          <option value="Wedding Cards">Wedding Cards</option>
                          <option value="Birthday Cards">Birthday Cards</option>
                          <option value="Business Cards">Business Cards</option>
                          <option value="Posters">Posters</option>
                          <option value="Packaging">Packaging</option>
                          <option value="Bill Books">Bill Books</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[10px] font-mono uppercase tracking-wider text-purple-400 font-bold mb-1">
                          Base MOQ Min
                        </label>
                        <input
                          type="number"
                          value={prodMin}
                          onChange={(e) => setProdMin(Number(e.target.value))}
                          className="w-full p-2 bg-black border border-purple-500/15 focus:border-purple-500/85 rounded-xl text-xs text-slate-100"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono uppercase tracking-wider text-purple-400 font-bold mb-1">
                        Est. Price Scale
                      </label>
                      <input
                        type="text"
                        required
                        value={prodPrice}
                        onChange={(e) => setProdPrice(e.target.value)}
                        placeholder="e.g., ₹5 - ₹15 per piece"
                        className="w-full p-2.5 bg-black border border-purple-500/15 focus:border-purple-500/85 rounded-xl text-xs text-slate-100"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono uppercase tracking-wider text-purple-400 font-bold mb-1">
                        Stock Paper Descriptor
                      </label>
                      <input
                        type="text"
                        value={prodPaper}
                        onChange={(e) => setProdPaper(e.target.value)}
                        className="w-full p-2.5 bg-black border border-purple-500/15 focus:border-purple-500/85 rounded-xl text-xs text-slate-100"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono uppercase tracking-wider text-purple-400 font-bold mb-1">
                        Highlight Features (Comma separated)
                      </label>
                      <input
                        type="text"
                        value={prodFeats}
                        onChange={(e) => setProdFeats(e.target.value)}
                        className="w-full p-2.5 bg-black border border-purple-500/15 focus:border-purple-500/85 rounded-xl text-xs text-slate-100"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono uppercase tracking-wider text-purple-400 font-bold mb-1">
                        Product Photo URL (Unsplash)
                      </label>
                      <input
                        type="text"
                        value={prodImg}
                        onChange={(e) => setProdImg(e.target.value)}
                        className="w-full p-2.5 bg-black border border-purple-500/15 focus:border-purple-500/85 rounded-xl text-xs text-slate-100 font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono uppercase tracking-wider text-purple-400 font-bold mb-1">
                        Product Description
                      </label>
                      <textarea
                        required
                        value={prodDesc}
                        onChange={(e) => setProdDesc(e.target.value)}
                        placeholder="Outline sheet size, layout detail constraints..."
                        rows={3}
                        className="w-full p-2.5 bg-black border border-purple-500/15 focus:border-purple-500/85 rounded-xl text-xs text-slate-100 focus:outline-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isPublishing}
                      className="w-full py-3 bg-purple-600 rounded-xl text-white font-heading text-xs font-bold uppercase tracking-wider hover:bg-purple-500 disabled:opacity-50"
                    >
                      {isPublishing ? "Publishing to db..." : "Publish Product imprints"}
                    </button>
                  </form>
                </div>

                {/* Existing products listing column */}
                <div className="lg:col-span-7 bg-zinc-950/20 border border-purple-500/10 p-6 rounded-2xl max-h-[700px] overflow-y-auto space-y-4">
                  <h3 className="font-heading font-extrabold text-lg text-white mb-2 flex items-center gap-1.5">
                    <Layers className="w-5 h-5 text-purple-400" /> Active Product Records ({products.length})
                  </h3>

                  {products.map((p) => (
                    <div key={p.id} className="p-3.5 bg-black/60 rounded-xl flex items-center justify-between border border-purple-500/5 hover:border-purple-500/15 transition gap-4">
                      <div className="flex items-center gap-3.5 min-w-0">
                        <img src={p.image} alt={p.name} referrerPolicy="no-referrer" className="w-12 h-12 rounded object-cover shrink-0" />
                        <div className="text-left min-w-0">
                          <h5 className="text-xs sm:text-sm font-extrabold text-white truncate max-w-[250px]">{p.name}</h5>
                          <span className="text-[9.5px] font-mono text-purple-400 block uppercase font-bold tracking-widest">{p.category}</span>
                        </div>
                      </div>

                      <button
                        onClick={() => handleRemoveProduct(p.id)}
                        className="p-2 bg-red-950/20 border border-red-500/20 text-red-400 rounded-lg shrink-0 hover:bg-red-500 hover:text-white transition"
                        title="Remove product"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* C. CHOOSE GALLERY PORTFOLIO EDITOR */}
            {adminView === 'portfolio' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start" id="portfolio-publish-panel">
                
                {/* Publish portfolio image Form draft */}
                <div className="lg:col-span-5 bg-zinc-950/20 border border-purple-500/10 p-6 rounded-2xl">
                  <h3 className="font-heading font-extrabold text-lg text-white mb-4 flex items-center gap-1.5">
                    <Plus className="w-5 h-5 text-purple-400" /> Add Portfolio Sample
                  </h3>

                  <form onSubmit={handlePostGallery} className="space-y-4">
                    <div>
                      <label className="block text-[10px] font-mono uppercase tracking-wider text-purple-400 font-bold mb-1">
                        Sample Title
                      </label>
                      <input
                        type="text"
                        required
                        value={galTitle}
                        onChange={(e) => setGalTitle(e.target.value)}
                        placeholder="e.g., Gold Foil RSVP setup"
                        className="w-full p-2.5 bg-black border border-purple-500/15 focus:border-purple-500/85 rounded-xl text-xs text-slate-100 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono uppercase tracking-wider text-purple-400 font-bold mb-1">
                        Album Category
                      </label>
                      <select
                        value={galCat}
                        onChange={(e) => setGalCat(e.target.value)}
                        className="w-full p-2 bg-black border border-purple-500/15 focus:border-purple-500/85 rounded-xl text-xs uppercase font-bold text-purple-300"
                      >
                        <option value="Wedding Cards">Wedding Cards</option>
                        <option value="Business Cards">Business Cards</option>
                        <option value="Posters">Posters</option>
                        <option value="Packaging">Packaging</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono uppercase tracking-wider text-purple-400 font-bold mb-1">
                        Photo Image URL (Unsplash link)
                      </label>
                      <input
                        type="text"
                        required
                        value={galImg}
                        onChange={(e) => setGalImg(e.target.value)}
                        className="w-full p-2.5 bg-black border border-purple-500/15 focus:border-purple-500/85 rounded-xl text-xs text-slate-100 font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono uppercase tracking-wider text-purple-400 font-bold mb-1">
                        Short Crafting Description
                      </label>
                      <textarea
                        required
                        value={galDesc}
                        onChange={(e) => setGalDesc(e.target.value)}
                        placeholder="e.g., Double thick 600 GSM coordinate boards..."
                        rows={3}
                        className="w-full p-2.5 bg-black border border-purple-500/15 focus:border-purple-500/85 rounded-xl text-xs text-slate-100 focus:outline-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isPublishing}
                      className="w-full py-3 bg-purple-600 rounded-xl text-white font-heading text-xs font-bold uppercase tracking-wider hover:bg-purple-500 disabled:opacity-50"
                    >
                      {isPublishing ? "Adding is draft..." : "Publish portfolio item"}
                    </button>
                  </form>
                </div>

                {/* Listing of Existing Gallery samples */}
                <div className="lg:col-span-7 bg-zinc-950/20 border border-purple-500/10 p-6 rounded-2xl max-h-[700px] overflow-y-auto space-y-4">
                  <h3 className="font-heading font-extrabold text-lg text-white mb-2 flex items-center gap-1.5">
                    <FolderHeart className="w-5 h-5 text-purple-400" /> Active Pinterest Records ({gallery.length})
                  </h3>

                  {gallery.map((g) => (
                    <div key={g.id} className="p-3 bg-black/60 rounded-xl flex items-center justify-between border border-purple-500/5 hover:border-purple-500/15 transition gap-4">
                      <div className="flex items-center gap-3.5 min-w-0">
                        <img src={g.imageUrl} alt={g.title} referrerPolicy="no-referrer" className="w-12 h-12 rounded object-cover shrink-0" />
                        <div className="text-left min-w-0">
                          <h5 className="text-xs sm:text-sm font-extrabold text-white truncate max-w-[250px]">{g.title}</h5>
                          <span className="text-[9.5px] font-mono text-slate-500 block uppercase tracking-widest">{g.category} • {g.likes} Likes</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            )}
          </div>

        </div>
      )}
      
    </div>
  );
}
