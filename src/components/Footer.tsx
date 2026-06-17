import { Printer, Heart, ArrowUp, Send, MessageSquareText } from 'lucide-react';

interface FooterProps {
  onNavigate: (tab: string) => void;
  onOpenCategoryDemo?: (categoryId: string) => void;
}

export default function Footer({ onNavigate, onOpenCategoryDemo }: FooterProps) {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-[#03050a]/90 backdrop-blur-md border-t border-slate-500/10 pt-16 pb-8 text-left relative z-20" id="footer-section">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-10 mb-12">
        
        {/* Left column branding */}
        <div className="md:col-span-5 space-y-4">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => onNavigate('home')}>
            <div className="w-9 h-9 rounded-xl overflow-hidden bg-black/45 border border-purple-500/20 flex items-center justify-center shadow-lg shadow-purple-500/10 shrink-0">
              <img 
                src="/src/assets/images/kalbhairav_logo_1781630281528.jpg" 
                alt="Kalbhairav Digitial Logo" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-heading font-extrabold text-lg tracking-wide text-white">
                BHAIRAVNATH DIGITAL
              </span>
              <span className="text-[10px] font-mono tracking-widest text-purple-400 -mt-1 font-bold uppercase">
                Artisan Printing Press
              </span>
            </div>
          </div>
          <p className="text-slate-400 text-xs sm:text-sm max-w-sm leading-relaxed font-light">
            Bringing elite weight, touch depth, gold stamping brilliance, and precision Indian calligraphy layouts straight to families and brands across India since 2016.
          </p>
        </div>

        {/* Middle column quick anchors */}
        <div className="md:col-span-3 space-y-3.5">
          <h5 className="font-mono text-slate-400 font-bold tracking-widest text-[11px] uppercase">
            Professional Services
          </h5>
          <ul className="space-y-2 text-xs sm:text-sm">
            {['Offset Printing', 'Digital Printing', 'Screen Printing', 'Flex Printing'].map((label, idx) => {
              const cats = ['offset', 'digital', 'screen', 'flex'];
              return (
                <li key={idx}>
                  <button
                    onClick={() => onOpenCategoryDemo ? onOpenCategoryDemo(cats[idx]) : onNavigate('home')}
                    className="text-slate-500 hover:text-purple-400 font-medium transition text-left"
                  >
                    {label}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Right column schedule */}
        <div className="md:col-span-4 space-y-3.5">
          <h5 className="font-mono text-slate-400 font-bold tracking-widest text-[11px] uppercase">
            Press Operations Hours
          </h5>
          <div className="space-y-1 text-xs sm:text-sm text-slate-500">
            <p className="flex justify-between">
              <span>Monday - Saturday:</span>
              <strong className="text-slate-300">9:00 AM - 9:00 PM</strong>
            </p>
            <p className="flex justify-between">
              <span>Sunday shift:</span>
              <strong className="text-[#a855f7] uppercase font-bold text-[10px]">Closed for Maintenance</strong>
            </p>
            <p className="pt-3 border-t border-purple-500/5 text-[11.5px] leading-relaxed font-light">
              We partner with elite express couriers to deliver custom orders across Maharashtra and greater Indian subcontinents securely.
            </p>
          </div>
        </div>

      </div>

      {/* Extreme bottom copyright and credit */}
      <div className="max-w-7xl mx-auto px-6 border-t border-purple-500/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-600">
        <div className="flex flex-col gap-1 items-center sm:items-start">
          <p className="uppercase text-center sm:text-left">
            © 2026 Bhairavnath Digital. All physical & structural copyrights reserved.
          </p>
          <p className="text-zinc-500 text-[11px] lowercase tracking-wide text-center sm:text-left">
            designed by <strong className="text-zinc-400 font-semibold uppercase tracking-wider">nishant pisal</strong> | full stack mern stack developer | connect: <a href="mailto:corporate0828@gmail.com" className="hover:text-purple-400 underline transition-all">corporate0828@gmail.com</a>
          </p>
        </div>

        <div className="flex items-center gap-4.5">
          <button
            onClick={handleScrollToTop}
            className="flex items-center gap-1.5 hover:text-white transition group focus:outline-none uppercase"
          >
            <span>Retreat to Top</span>
            <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  );
}
