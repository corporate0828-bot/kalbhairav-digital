import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Paperclip, Coins, Wrench, Calendar, Copy, ChevronRight, Check, Heart, Lightbulb, UserCheck, HelpCircle } from 'lucide-react';

interface RecommendationSpec {
  aestheticConcept: string;
  paperType: string;
  printFinishes: string[];
  expertRationale: string;
  estimatedCost: string;
  productionTurnaround: string;
  complementaryPieces: string[];
}

interface AICardRecommenderProps {
  onUseAISpec: (specDescription: string, budget: string) => void;
}

const CONSTANT_OCCASIONS = [
  { id: 'wedding', label: 'Royal Wedding (Shadi)', desc: 'Luxury invitation folders & rigid boxes' },
  { id: 'corporate', label: 'Corporate Identity', desc: 'Premium spot UV cards & letterheads' },
  { id: 'festival', label: 'Festival Greetings', desc: 'Embossed sweets box & custom gifts' },
  { id: 'specialty', label: 'Luxury Packaging', desc: 'Rigid cardboard cases & sleeve folds' },
  { id: 'custom', label: 'Custom Artwork', desc: 'Bespoke posters & boutique flyers' },
];

const COLOR_THEMES = [
  { id: 'burgundy-gold', label: 'Burgundy & 24k Gold Foil', hex: 'bg-gradient-to-r from-red-950 via-amber-600 to-amber-950' },
  { id: 'black-silver', label: 'Imperial Black & Matte Silver', hex: 'bg-gradient-to-r from-zinc-950 via-slate-600 to-slate-900' },
  { id: 'emerald-copper', label: 'Emerald Green & Rich Copper', hex: 'bg-gradient-to-r from-emerald-950 via-amber-700 to-emerald-900' },
  { id: 'royal-purple', label: 'Velvet Purple & Metallic Pearl', hex: 'bg-gradient-to-r from-purple-950 via-fuchsia-600 to-violet-950' },
  { id: 'classic-ivory', label: 'Elegant Ivory & Pearl Shimmer', hex: 'bg-gradient-to-r from-slate-100 via-yellow-200 to-slate-300' },
];

export default function AICardRecommender({ onUseAISpec }: AICardRecommenderProps) {
  const [occasion, setOccasion] = useState(CONSTANT_OCCASIONS[0].label);
  const [colorTheme, setColorTheme] = useState(COLOR_THEMES[0].label);
  const [papersDescription, setPapersDescription] = useState('');
  const [budgetTier, setBudgetTier] = useState('Luxury Elite');
  
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [result, setResult] = useState<RecommendationSpec | null>(null);
  const [copied, setCopied] = useState(false);
  const [submittedRequest, setSubmittedRequest] = useState(false);

  const loadingPhrases = [
    "Consulting Bhairavnath premium stock catalog...",
    "Analyzing paper weights & cotton grains...",
    "Simulating laser alignment and gold foil presses...",
    "Formulating optimal pricing arrays & curating matching envelopes...",
    "Assembling your custom luxury print draft..."
  ];

  const handleRecommend = async () => {
    setLoading(true);
    setResult(null);
    setSubmittedRequest(false);
    
    // Cycle through custom loading phrases
    const timerInterval = setInterval(() => {
      setLoadingStep(prev => {
        if (prev < loadingPhrases.length - 1) {
          return prev + 1;
        }
        return prev;
      });
    }, 1100);

    try {
      const response = await fetch('/api/ai/recommend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          occasion,
          colorTheme,
          papersDescription: papersDescription || "Traditional regal motifs with deep tactile feel",
          budgetRange: budgetTier,
        }),
      });
      const data = await response.json();
      if (data.success) {
        setResult(data.recommendation);
      }
    } catch (err) {
      console.error("AI recommand endpoint failed:", err);
    } finally {
      clearInterval(timerInterval);
      setLoading(false);
      setLoadingStep(0);
    }
  };

  const handleCopySpec = () => {
    if (!result) return;
    const text = `Bhairavnath Digital AI Specification Draft:
Theme: ${result.aestheticConcept}
Paper: ${result.paperType}
Finishes: ${result.printFinishes.join(', ')}
Expert rationale: ${result.expertRationale}
Cost Range: ${result.estimatedCost}
Accessory pieces: ${result.complementaryPieces.join(', ')}`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const transferToForm = () => {
    if (!result) return;
    const spec = `AI Spec Approved: [Theme: ${result.aestheticConcept}] [Paper: ${result.paperType}] [Finishes: ${result.printFinishes.join(', ')}] Notes: ${result.expertRationale}`;
    onUseAISpec(spec, result.estimatedCost);
    setSubmittedRequest(true);
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-6 py-12" id="ai-recommender-panel">
      {/* Mini Title Section */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-950/40 border border-purple-500/20 text-purple-400 rounded-full text-xs font-mono mb-4">
          <Sparkles className="w-3.5 h-3.5 text-purple-400 rotate-12" />
          <span>NEURAL PRINT CONSULTANT</span>
        </div>
        <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-white tracking-tight mb-3">
          AI-Powered Card Recommender
        </h2>
        <p className="max-w-2xl mx-auto text-slate-400 text-sm sm:text-base">
          Our advanced generative AI aligns traditional craftsmanship with standard weights, textures, and bespoke foils to present your ideal design spec instantly.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Input Configuration Column */}
        <div className="lg:col-span-5 bg-zinc-950/40 border border-purple-500/10 p-6 sm:p-8 rounded-2xl backdrop-blur-md relative" id="ai-inputs">
          <div className="absolute -top-3 -right-3 w-16 h-16 bg-purple-600/5 blur-xl pointer-events-none" />

          {/* 1. Occasion Selector */}
          <div className="mb-6">
            <label className="block text-xs font-mono uppercase tracking-wider text-purple-400 font-bold mb-3 flex items-center gap-2">
              <Calendar className="w-3.5 h-3.5" /> 1. Select Occasion
            </label>
            <div className="flex flex-col gap-2">
              {CONSTANT_OCCASIONS.map((occ) => (
                <button
                  key={occ.id}
                  type="button"
                  onClick={() => setOccasion(occ.label)}
                  className={`w-full p-3.5 rounded-xl text-left border transition-all flex flex-col ${occasion === occ.label ? 'bg-purple-950/30 border-purple-500/60 text-white' : 'bg-transparent border-purple-500/10 text-slate-400 hover:border-purple-500/30 hover:bg-white/5'}`}
                >
                  <span className="font-heading font-medium text-xs sm:text-sm text-white">{occ.label}</span>
                  <span className="text-[11px] text-slate-500 tracking-wide font-light">{occ.desc}</span>
                </button>
              ))}
            </div>
          </div>

          {/* 2. Color Themes */}
          <div className="mb-6">
            <label className="block text-xs font-mono uppercase tracking-wider text-purple-400 font-bold mb-3 flex items-center gap-2">
              <Wrench className="w-3.5 h-3.5" /> 2. Preferred Theme / Palette
            </label>
            <div className="flex flex-col gap-2">
              {COLOR_THEMES.map((theme) => (
                <button
                  key={theme.id}
                  type="button"
                  onClick={() => setColorTheme(theme.label)}
                  className={`w-full p-3 rounded-xl border transition-all flex items-center gap-3.5 ${colorTheme === theme.label ? 'border-purple-500/60 bg-purple-950/20 text-white' : 'border-purple-500/10 bg-transparent text-slate-400 hover:border-purple-500/20'}`}
                >
                  <div className={`w-4 h-4 rounded-full ${theme.hex} border border-white/20`} />
                  <span className="font-sans text-xs font-medium text-left">{theme.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* 3. Materials / Custom Details */}
          <div className="mb-6">
            <label className="block text-xs font-mono uppercase tracking-wider text-purple-400 font-bold mb-2 flex items-center gap-2">
              <Lightbulb className="w-3.5 h-3.5" /> 3. Motifs / Inner Desires (Optional)
            </label>
            <textarea
              value={papersDescription}
              onChange={(e) => setPapersDescription(e.target.value)}
              placeholder="e.g., Traditional Ganesha motif, velvet soft ribbon fold, extremely thick heavy ivory card, royal scent..."
              rows={3}
              className="w-full p-3.5 rounded-xl bg-black border border-purple-500/15 focus:border-purple-500/80 focus:ring-1 focus:ring-purple-500 focus:outline-none text-xs sm:text-sm text-slate-200 transition-colors placeholder:text-slate-650"
            />
          </div>

          {/* 4. Budget Select */}
          <div className="mb-8">
            <label className="block text-xs font-mono uppercase tracking-wider text-purple-400 font-bold mb-3 flex items-center gap-2">
              <Coins className="w-3.5 h-3.5" /> 4. Budget Preference
            </label>
            <div className="grid grid-cols-3 gap-2">
              {['Standard', 'Premium Foil', 'Luxury Elite'].map((tier) => (
                <button
                  key={tier}
                  type="button"
                  onClick={() => setBudgetTier(tier)}
                  className={`py-2 rounded-xl text-xs font-semibold border tracking-wide transition-all ${budgetTier === tier ? 'bg-purple-600 border-purple-500 text-white shadow-lg shadow-purple-500/15' : 'bg-transparent border-purple-500/15 text-slate-400 hover:border-purple-500/30'}`}
                >
                  {tier}
                </button>
              ))}
            </div>
          </div>

          {/* Submit Trigger */}
          <button
            onClick={handleRecommend}
            disabled={loading}
            className="w-full py-4 bg-gradient-to-r from-purple-600 via-fuchsia-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 rounded-xl font-heading text-sm font-bold tracking-wide text-white flex items-center justify-center gap-2.5 shadow-lg hover:scale-[1.01] active:translate-y-0.5 transition-all disabled:opacity-50 disabled:pointer-events-none"
          >
            <Sparkles className="w-4.5 h-4.5 animate-bounce" />
            <span>Consult Neural Designer</span>
          </button>
        </div>

        {/* Right Output Blueprints Column */}
        <div className="lg:col-span-7" id="ai-blueprint-output">
          <AnimatePresence mode="wait">
            {/* 1. Loading screen state */}
            {loading && (
              <motion.div
                key="loading"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="w-full min-h-[500px] border border-purple-500/20 bg-black/40 rounded-2xl p-8 flex flex-col items-center justify-center text-center relative"
              >
                <div className="w-16 h-16 relative mb-6">
                  {/* Outer spinning borders */}
                  <div className="absolute inset-0 border-2 border-purple-500/30 rounded-full animate-pulse" />
                  <div className="absolute inset-2 border-t-2 border-purple-500 rounded-full animate-spin" />
                  <Sparkles className="absolute inset-0 m-auto w-5 h-5 text-purple-400 animate-pulse" />
                </div>
                
                <h4 className="font-heading font-semibold text-lg text-white mb-2 animate-pulse">
                  Drafting Masterpiece Specification
                </h4>
                <p className="text-purple-400 font-mono text-xs max-w-sm tracking-wide h-6 mt-1">
                  {loadingPhrases[loadingStep]}
                </p>

                {/* Simulated blueprint schematic grid on background */}
                <div className="absolute inset-10 border border-purple-500/5 bg-[linear-gradient(rgba(168,85,247,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(168,85,247,0.01)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none -z-10" />
              </motion.div>
            )}

            {/* 2. Empty State */}
            {!loading && !result && (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="w-full min-h-[500px] border border-purple-500/10 bg-zinc-950/20 rounded-2xl p-8 flex flex-col items-center justify-center text-center relative"
              >
                <div className="w-16 h-16 rounded-full bg-purple-950/30 border border-purple-500/15 flex items-center justify-center mb-6">
                  <Sparkles className="w-7 h-7 text-purple-400 animate-pulse" />
                </div>
                <h4 className="font-heading font-bold text-xl text-white mb-2">
                  No Active Consult Draft
                </h4>
                <p className="max-w-md mx-auto text-slate-500 text-sm leading-relaxed">
                  Toggle your occasion type, choose your luxury color theme, and click "Consult Neural Designer" to watch the AI build an elite materials list.
                </p>
                <div className="absolute inset-0 bg-[linear-gradient(rgba(168,85,247,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(168,85,247,0.015)_1px,transparent_1px)] bg-[size:30px_30px] pointer-events-none" />
              </motion.div>
            )}

            {/* 3. Result Spec Blueprint Card */}
            {result && !loading && (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="w-full min-h-[500px] border-[1.5px] border-purple-500/42 bg-zinc-950/70 rounded-2xl p-6 sm:p-8 box-glow-purple relative flex flex-col justify-between"
              >
                <div className="absolute top-0 right-0 w-44 h-44 bg-purple-600/5 blur-3xl pointer-events-none" />
                
                {/* Custom Tech Grid Ribbon */}
                <div className="flex items-center justify-between border-b border-purple-500/15 pb-5 mb-6">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-mono text-purple-400 font-bold uppercase tracking-widest">
                      BHAIRAVNATH DIGITAL DESIGN SPEC
                    </span>
                    <h3 className="font-heading font-extrabold text-2xl text-white mt-1">
                      {result.aestheticConcept}
                    </h3>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={handleCopySpec}
                      className="p-2.5 rounded-lg border border-purple-500/15 text-slate-400 hover:text-purple-400 hover:bg-purple-950/40 hover:border-purple-500/30 transition-all"
                      title="Copy spec details"
                    >
                      {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="space-y-5 flex-grow">
                  {/* Paper Type Spec */}
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-xl bg-purple-900/30 border border-purple-500/20 flex items-center justify-center shrink-0">
                      <Paperclip className="w-4.5 h-4.5 text-purple-400" />
                    </div>
                    <div>
                      <h5 className="text-[11.5px] font-mono text-purple-300 font-bold uppercase tracking-wider">
                        Luxury Stock Media
                      </h5>
                      <p className="text-sm font-semibold text-slate-100 mt-0.5">{result.paperType}</p>
                    </div>
                  </div>

                  {/* Print Finishes Spec */}
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-xl bg-purple-900/30 border border-purple-500/20 flex items-center justify-center shrink-0">
                      <Wrench className="w-4.5 h-4.5 text-purple-400" />
                    </div>
                    <div>
                      <h5 className="text-[11.5px] font-mono text-purple-300 font-bold uppercase tracking-wider">
                        Artisan Print Finishes
                      </h5>
                      <div className="flex flex-wrap gap-1.5 mt-1">
                        {result.printFinishes.map((f, idx) => (
                          <span
                            key={idx}
                            className="text-xs px-2.5 py-1 rounded-full bg-purple-950/60 border border-purple-500/30 text-purple-200"
                          >
                            {f}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Expert Rationale Editorial */}
                  <div className="p-4 rounded-xl bg-purple-500/5 border border-purple-500/10 flex gap-3">
                    <Lightbulb className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
                    <p className="text-xs sm:text-sm text-slate-300 italic leading-relaxed">
                      "{result.expertRationale}"
                    </p>
                  </div>

                  {/* Pricing / Timelines */}
                  <div className="grid grid-cols-2 gap-4 border-t border-b border-purple-500/10 py-4 my-2">
                    <div>
                      <span className="text-[10px] font-mono tracking-widest uppercase text-slate-500 block">
                        Estimated Target Cost
                      </span>
                      <strong className="text-sm sm:text-base text-white font-heading font-bold">{result.estimatedCost}</strong>
                    </div>
                    <div>
                      <span className="text-[10px] font-mono tracking-widest uppercase text-slate-500 block">
                        Bespoke Turnaround
                      </span>
                      <strong className="text-sm sm:text-base text-white font-heading font-semibold">{result.productionTurnaround}</strong>
                    </div>
                  </div>

                  {/* Complementary items */}
                  <div>
                    <h5 className="text-[11px] font-mono text-purple-300 font-bold uppercase tracking-wider mb-2">
                      Suggested Ensemble Additions
                    </h5>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-slate-400">
                      {result.complementaryPieces.map((p, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <Check className="w-3.5 h-3.5 text-purple-500" />
                          <span>{p}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Bottom CTA to transfer spec to form */}
                <div className="mt-8 pt-5 border-t border-purple-500/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-left">
                    <span className="text-[10px] font-mono text-slate-500 tracking-wider block">
                      SPECS GENERATED SECURELY VIA
                    </span>
                    <span className="text-xs font-semibold text-emerald-400 font-mono">
                      ● Google Gemini 3.5 Active
                    </span>
                  </div>

                  <button
                    onClick={transferToForm}
                    disabled={submittedRequest}
                    className="w-full sm:w-auto px-6 py-3 bg-white hover:bg-slate-100 rounded-xl font-heading text-xs sm:text-sm font-bold text-black flex items-center justify-center gap-2 hover:scale-[1.02] active:translate-y-0.5 transition-all disabled:bg-emerald-950/20 disabled:border-emerald-500/20 disabled:text-emerald-400"
                  >
                    {submittedRequest ? (
                      <>
                        <UserCheck className="w-4 h-4 text-emerald-400" />
                        <span>Transferred to Form!</span>
                      </>
                    ) : (
                      <>
                        <span>Apply & Secure Quote</span>
                        <ChevronRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
