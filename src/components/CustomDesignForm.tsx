import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Upload, Phone, CheckCircle, RefreshCw, Paperclip, AlertCircle, ShoppingBag, Sparkles } from 'lucide-react';

interface CustomDesignFormProps {
  prefilledSpecDescription: string;
  prefilledBudget: string;
  onClearPrefilledSpec: () => void;
  onSubmitSuccess: () => void;
}

export default function CustomDesignForm({ 
  prefilledSpecDescription, 
  prefilledBudget, 
  onClearPrefilledSpec, 
  onSubmitSuccess 
}: CustomDesignFormProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [describeDesign, setDescribeDesign] = useState(prefilledSpecDescription || '');
  const [quantity, setQuantity] = useState(250);
  const [budget, setBudget] = useState(prefilledBudget || '₹80 - ₹150 per piece');
  
  const [referenceBase64, setReferenceBase64] = useState<string | null>(null);
  const [imageName, setImageName] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  
  const [busy, setBusy] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errMessage, setErrMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Prefill effect sync
  if (prefilledSpecDescription && describeDesign === '') {
    setDescribeDesign(prefilledSpecDescription);
  }
  if (prefilledBudget && budget === '₹80 - ₹150 per piece') {
    setBudget(prefilledBudget);
  }

  // Handle Drag Events
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  // Convert uploaded image file to lightweight Base64
  const processImageFile = (file: File) => {
    if (!file.type.match('image.*')) {
      setErrMessage("Please upload a valid image file (.PNG, .JPG).");
      return;
    }
    setImageName(file.name);
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setReferenceBase64(event.target.result as string);
        setErrMessage(null);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processImageFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !describeDesign) {
      setErrMessage("Please enter your name, Indian mobile number, and outline your printing vision.");
      return;
    }
    
    setBusy(true);
    setErrMessage(null);

    try {
      const response = await fetch('/api/requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          phone,
          email,
          describeDesign,
          quantity,
          budget,
          referenceImage: referenceBase64
        }),
      });

      const data = await response.json();
      if (response.ok && data.success) {
        setSuccess(true);
        // Reset form inputs
        setName('');
        setPhone('');
        setEmail('');
        setDescribeDesign('');
        setReferenceBase64(null);
        setImageName(null);
        onClearPrefilledSpec();
        onSubmitSuccess();
      } else {
        setErrMessage(data.error || "A submission error occurred, please check parameters.");
      }
    } catch (err) {
      console.error(err);
      setErrMessage("Could not communicate with the database backend at this time.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-6 py-12" id="custom-design-form-panel">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Left Information Column */}
        <div className="lg:col-span-4 flex flex-col justify-between p-6 sm:p-8 bg-purple-950/20 border border-purple-500/10 rounded-2xl relative">
          <div className="absolute top-2 right-2 w-36 h-36 bg-purple-600/5 blur-3xl pointer-events-none" />
          
          <div className="space-y-5">
            <span className="text-[10px] font-mono tracking-widest text-[#a855f7] uppercase font-bold bg-purple-950/50 border border-purple-500/20 px-2.5 py-1 rounded inline-block">
              PHYSICAL DRAWING BOARD
            </span>
            <h3 className="font-heading font-extrabold text-2xl text-white leading-tight">
              Submit Custom Print Request
            </h3>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed font-light">
              Submit your bespoke printing concept, upload draft vector templates or reference samples, set the volume quotas, and we'll reply over WhatsApp with custom quote pricing boards.
            </p>
          </div>

          <div className="mt-8 border-t border-purple-500/10 pt-5 space-y-4">
            <div className="flex gap-3 text-xs sm:text-sm">
              <CheckCircle className="w-5 h-5 text-purple-400 shrink-0" />
              <span className="text-slate-400">100% Free Consultation</span>
            </div>
            <div className="flex gap-3 text-xs sm:text-sm">
              <CheckCircle className="w-5 h-5 text-purple-400 shrink-0" />
              <span className="text-slate-400">Digital Paper Spec Match</span>
            </div>
            <div className="flex gap-3 text-xs sm:text-sm">
              <CheckCircle className="w-5 h-5 text-purple-400 shrink-0" />
              <span className="text-slate-400">Response in &lt; 2 Hours</span>
            </div>
          </div>
        </div>

        {/* Right Form Input Column */}
        <div className="lg:col-span-8 bg-zinc-950/30 border border-purple-500/10 p-6 sm:p-8 rounded-2xl relative">
          
          <AnimatePresence mode="wait">
            {!success ? (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-5"
              >
                {/* Title badge if prefilled by AI Recommender */}
                {prefilledSpecDescription && (
                  <div className="p-3.5 bg-purple-950/40 border border-purple-500/30 text-purple-200 rounded-xl flex items-center justify-between text-xs font-mono mb-4 animate-pulse">
                    <span className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-purple-400" />
                      <span>AI Recommender template applied!</span>
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        onClearPrefilledSpec();
                        setDescribeDesign('');
                      }}
                      className="text-slate-400 hover:text-white underline font-bold uppercase transition"
                    >
                      Clear
                    </button>
                  </div>
                )}

                {/* Name & Phone Info Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-wider text-purple-300 font-bold mb-1.5">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g., Ramesh S. Chavan"
                      className="w-full p-3 bg-black border border-purple-500/15 focus:border-purple-500/80 rounded-xl text-sm text-slate-100 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-wider text-purple-300 font-bold mb-1.5">
                      WhatsApp Mobile Number *
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                      <input
                        type="text"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="e.g., +91 70281 11712"
                        className="w-full pl-10 pr-3 py-3 bg-black border border-purple-500/15 focus:border-purple-500/80 rounded-xl text-sm text-slate-100 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Email (Optional) */}
                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-purple-300 font-bold mb-1.5">
                    Email Address (Optional)
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g., ramesh@corporate.com"
                    className="w-full p-3 bg-black border border-purple-500/15 focus:border-purple-500/80 rounded-xl text-sm text-slate-100 focus:outline-none"
                  />
                </div>

                {/* Describe Concept */}
                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-purple-300 font-bold mb-1.5">
                    Describe design specifications / preferences *
                  </label>
                  <textarea
                    required
                    value={describeDesign}
                    onChange={(e) => setDescribeDesign(e.target.value)}
                    placeholder="Provide card folding count, texture requests, spot UV wishes, wedding envelope style or sweet box alignment..."
                    rows={4}
                    className="w-full p-3.5 bg-black border border-purple-500/15 focus:border-purple-500/80 rounded-xl text-sm text-slate-100 focus:outline-none placeholder:text-slate-700"
                  />
                </div>

                {/* Volumetric quantity & Budget Tier */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-wider text-purple-300 font-bold mb-1.5 flex justify-between">
                      <span>Required Quantity</span>
                      <span className="text-purple-400 font-extrabold">{quantity} PIECES</span>
                    </label>
                    <input
                      type="range"
                      min={50}
                      max={5000}
                      step={50}
                      value={quantity}
                      onChange={(e) => setQuantity(Number(e.target.value))}
                      className="w-full h-1.5 bg-zinc-900 rounded-lg appearance-none cursor-pointer accent-purple-500"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-wider text-purple-300 font-bold mb-1.5">
                      Desired Price/Budget Target
                    </label>
                    <input
                      type="text"
                      value={budget}
                      onChange={(e) => setBudget(e.target.value)}
                      placeholder="e.g., ₹100 - ₹250 per piece"
                      className="w-full p-3 bg-black border border-purple-500/15 focus:border-purple-500/80 rounded-xl text-sm text-slate-100 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Advanced Drag & Drop reference Image System */}
                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-purple-300 font-bold mb-2 flex items-center gap-1.5">
                    <Paperclip className="w-3.5 h-3.5" /> Upload Reference Design Or Sample
                  </label>
                  <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                    className={`w-full py-6 px-4 rounded-xl border border-dashed text-center cursor-pointer transition-all ${isDragging ? 'bg-purple-950/30 border-purple-400' : 'bg-black/50 border-purple-500/15 hover:border-purple-500/45 hover:bg-white/5'}`}
                  >
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileInputChange}
                      accept="image/*"
                      className="hidden"
                    />
                    
                    <Upload className="w-8 h-8 text-slate-500 mx-auto mb-2 animate-bounce" />
                    <p className="text-xs text-slate-300 font-medium">
                      Drag & Drop reference image, or <span className="text-purple-400 underline decoration-purple-500">browse folders</span>
                    </p>
                    <span className="text-[10px] text-slate-500 tracking-wider">
                      PNG, JPG supported (Auto Compressed on frontend)
                    </span>
                  </div>

                  {/* Attachment Preview rendering */}
                  {referenceBase64 && (
                    <div className="flex items-center justify-between p-3.5 bg-purple-950/25 border border-purple-500/15 rounded-xl mt-3">
                      <div className="flex items-center gap-3">
                        <img 
                          src={referenceBase64} 
                          alt="preview" 
                          className="w-12 h-12 rounded object-cover border border-purple-500/30" 
                        />
                        <div className="text-left">
                          <span className="text-xs text-white block truncate max-w-xs">{imageName || "Reference Attachment"}</span>
                          <span className="text-[10px] text-emerald-400 uppercase font-mono font-bold tracking-wider">Attached Successfully</span>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setReferenceBase64(null);
                          setImageName(null);
                        }}
                        className="text-xs text-red-400 font-mono font-bold uppercase underline hover:text-red-300"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>

                {/* Error Banner */}
                {errMessage && (
                  <div className="p-4 bg-red-950/40 border border-red-500/30 text-rose-300 text-xs sm:text-sm rounded-xl flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 shrink-0 text-red-400" />
                    <span>{errMessage}</span>
                  </div>
                )}

                {/* Action Submit */}
                <button
                  type="submit"
                  disabled={busy}
                  className="w-full py-4.5 bg-gradient-to-r from-purple-600 via-fuchsia-600 to-indigo-600 rounded-xl text-white font-heading text-sm font-bold tracking-wider hover:from-purple-500 hover:to-indigo-500 transition-all flex items-center justify-center gap-2 shadow-lg disabled:opacity-50"
                >
                  {busy ? <RefreshCw className="w-4 h-4 animate-spin" /> : <ShoppingBag className="w-4 h-4" />}
                  <span>{busy ? "Registering Request..." : "Submit Bespoke Concept Sheet"}</span>
                </button>
              </motion.form>
            ) : (
              // Breathtaking confirmation success state panel
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-16 text-center text-slate-300"
              >
                <div className="w-20 h-20 rounded-full bg-emerald-950/50 border border-emerald-500/40 flex items-center justify-center mx-auto mb-6">
                  <motion.div
                    initial={{ rotate: -90 }}
                    animate={{ rotate: 0 }}
                    className="p-3"
                  >
                    <CheckCircle className="w-10 h-10 text-emerald-400" />
                  </motion.div>
                </div>

                <h3 className="font-heading font-extrabold text-2xl sm:text-3xl text-white mb-3">
                  Printing Request Confirmed!
                </h3>
                <p className="max-w-md mx-auto text-slate-400 text-sm leading-relaxed mb-8">
                  Thank you! Your custom drawing specification sheet and matching attachments have been sent safely to Piyush and the Bhairavnath pre-press team.
                </p>

                <button
                  type="button"
                  onClick={() => setSuccess(false)}
                  className="px-6 py-3 border border-purple-500/20 hover:border-purple-500 text-purple-300 hover:text-white rounded-xl font-heading text-xs font-bold tracking-wide transition-colors uppercase bg-[#180e22]/50"
                >
                  Submit Another Request
                </button>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </div>
    </div>
  );
}
