import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Phone, Mail, MapPin, Calendar, HardDrive, ShieldCheck, MailCheck, Send, MessageSquare, ChevronRight, Map, ExternalLink } from 'lucide-react';
import { Machine, TeamMember } from '../types';

interface ContactAboutProps {
  machinery: Machine[];
  team: TeamMember[];
}

export default function ContactAbout({ machinery, team }: ContactAboutProps) {
  const [senderName, setSenderName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [senderMessage, setSenderMessage] = useState('');
  
  const [contactSuccess, setContactSuccess] = useState(false);
  const [busy, setBusy] = useState(false);

  const handleSubmitContact = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!senderName || !senderMessage) return;
    setBusy(true);

    try {
      // Simulate/Trigger standard submission stored or piped
      await fetch('/api/requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: senderName,
          phone: "+91 (Contact Form)",
          email: senderEmail || "contact@form.com",
          describeDesign: `General Contact Request: ${senderMessage}`,
          quantity: 1,
          budget: "Inquiry"
        }),
      });

      setContactSuccess(true);
      setSenderName('');
      setSenderEmail('');
      setSenderMessage('');
    } catch (err) {
      console.error(err);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-12" id="about-and-contact-view">
      
      {/* ================= PAGE 5: ABOUT SECTION ================= */}
      <section className="mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          {/* Left Text Story */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <span className="text-[11px] font-mono font-bold tracking-widest text-purple-400 uppercase bg-purple-950/40 border border-purple-500/20 px-3 py-1.5 rounded-full inline-block">
              OUR HERITAGE STORY
            </span>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-tight">
              Crafting Impressions That Stand the Test of Time
            </h2>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed font-light">
              Founded in 2016 by <strong>Nikhil Pisal</strong>, Bhairavnath Digital was born out of a profound passion for exquisite physical typography, paper science, and flawless modern ink layouts. We transitioned from traditional block letter presses into state-of-the-art 4-color offset Heidelberg rigs.
            </p>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed font-light">
              Based in Maharashtra, India, we cater to wedding planners, high-end boutiques, luxury sweet manufacturers, and premium corporates nationwide. Guided by Nishant Pisal, our pre-press digital studio combines generative design alignment with physical hot-gold embossing, guaranteeing award-level aesthetics on every sheet.
            </p>
          </div>

          {/* Right Floating Factory Photo card */}
          <div className="lg:col-span-5" id="factory-curtain">
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3] group border border-purple-500/15">
              <img
                src="https://raw.githubusercontent.com/corporate0828-bot/kalbhairav-digital/90625502b1b8942bf7f9789430d2bc6a0624444c/WhatsApp%20Image%202026-06-16%20at%2022.42.34.jpeg"
                alt="Bhairavnath factory press"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-104"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6">
                <span className="font-mono text-[10px] text-purple-400 tracking-wider">ACTIVE PRESS FLOOR</span>
                <h4 className="font-heading font-extrabold text-white text-base">Your Idea, Our Printing — Your Brand, Our Responsibility.</h4>
              </div>
            </div>
          </div>
        </div>

        {/* Advanced Machinery Showcase */}
        <div className="mb-20">
          <div className="text-left mb-10">
            <h3 className="font-heading font-extrabold text-2xl text-white tracking-tight mb-2 flex items-center gap-2">
              <HardDrive className="w-5.5 h-5.5 text-purple-400" /> Advanced Production Machinery
            </h3>
            <p className="text-slate-500 text-xs sm:text-sm">
              We operate exclusively on world-class German lithographic presses and high-fidelity Japanese color engines to ensure bulletproof laser alignment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8" id="machinery-grid">
            {machinery.map((m) => (
              <div key={m.id} className="glass-panel rounded-2xl p-6 flex flex-col justify-between">
                <div>
                  <div className="rounded-xl overflow-hidden aspect-[2/1] mb-5 border border-purple-500/10">
                    <img src={m.image} alt={m.name} referrerPolicy="no-referrer" className="w-full h-full object-cover grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-300" />
                  </div>
                  <h4 className="font-heading font-extrabold text-white text-lg tracking-wide mb-1">
                    {m.name}
                  </h4>
                  <span className="font-mono text-[10.5px] font-bold text-purple-300 block mb-3 uppercase tracking-widest bg-purple-950/30 border border-purple-500/10 px-2.5 py-0.5 rounded-md w-max">
                    {m.type}
                  </span>
                  <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-4">
                    {m.description}
                  </p>
                </div>
                <div className="border-t border-purple-500/10 pt-3 text-xs font-mono text-slate-500 flex items-center justify-between">
                  <span>MAX SPEEDS</span>
                  <strong className="text-white uppercase font-bold">{m.speed}</strong>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Meets the Executive Team */}
        <div>
          <div className="text-center mb-10">
            <span className="font-mono text-purple-400 font-bold uppercase tracking-widest text-[10px]">CO-FOUNDERS & OPERATORS</span>
            <h3 className="font-heading font-extrabold text-2xl text-white tracking-tight mt-1">
              Meet Our Leadership
            </h3>
          </div>

          <div className="flex flex-wrap justify-center gap-8" id="team-cards">
            {team.map((t) => (
              <div key={t.id} className="w-64 glass-panel rounded-2xl p-5 text-center group transition-transform duration-300 hover:-translate-y-1">
                <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-4 border-2 border-purple-500/20 group-hover:border-purple-500 transition-colors">
                  <img src={t.image} alt={t.name} referrerPolicy="no-referrer" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-300" />
                </div>
                <h4 className="font-heading font-bold text-base text-white">{t.name}</h4>
                <p className="font-mono text-[11px] text-purple-400 tracking-wide mt-1 font-semibold uppercase">{t.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= PAGE 6: CONTACT SECTION ================= */}
      <section className="pt-16 border-t border-purple-500/10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch" id="contact-details-grid">
          
          {/* Left Details Panel */}
          <div className="lg:col-span-5 space-y-8 text-left">
            <div>
              <span className="text-[11px] font-mono font-bold tracking-widest text-[#a855f7] uppercase block mb-2">
                REACH OUT TO US
              </span>
              <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
                Secure Business Location
              </h2>
              <p className="text-slate-500 text-xs sm:text-sm mt-2 leading-relaxed">
                Connect over mobile networks instantly or plan an in-person physical factory visit to inspect cotton card weights and foils.
              </p>
            </div>

            <div className="space-y-6">
              {/* Address MapPin */}
              <div className="flex gap-4">
                <div className="w-11 h-11 rounded-xl bg-purple-950/40 border border-purple-500/15 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <h4 className="text-[10.5px] font-mono text-purple-400 font-bold uppercase tracking-wider">
                    Physical Press Address
                  </h4>
                  <p className="text-sm sm:text-base font-semibold text-white mt-1 leading-relaxed">
                    Bhairavnath Digital, WV7R+8W7, Bavdhan, Maharashtra 412804, India
                  </p>
                  <a 
                    href="https://www.google.com/maps/search/?api=1&query=WV7R%2B8W7,+Bavdhan,+Maharashtra+412804" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="inline-flex items-center gap-1.5 text-xs text-[#a855f7] hover:text-white mt-1.5 font-mono font-bold transition-all duration-300 underline underline-offset-4 decoration-purple-500/40 select-none"
                    id="open-in-maps-btn"
                  >
                    <span>Open in Google Maps</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Call Trigger */}
              <div className="flex gap-4">
                <div className="w-11 h-11 rounded-xl bg-purple-950/40 border border-purple-500/15 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <h4 className="text-[10.5px] font-mono text-purple-400 font-bold uppercase tracking-wider">
                    Direct Operations Mobile Call
                  </h4>
                  <a 
                    href="tel:+917028111712" 
                    className="text-sm sm:text-base font-semibold text-white mt-1 block hover:text-purple-300 transition-all underline decoration-purple-500/30 underline-offset-4"
                  >
                    +91 70281 11712
                  </a>
                </div>
              </div>

              {/* Email Inquiry */}
              <div className="flex gap-4">
                <div className="w-11 h-11 rounded-xl bg-purple-950/40 border border-purple-500/15 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <h4 className="text-[10.5px] font-mono text-purple-400 font-bold uppercase tracking-wider">
                    Official Email Mailbox
                  </h4>
                  <a 
                    href="mailto:graphicspointwai@gmail.com" 
                    className="text-sm sm:text-base font-semibold text-white mt-1 block hover:text-purple-300 transition-all underline decoration-purple-500/30 underline-offset-4"
                  >
                    graphicspointwai@gmail.com
                  </a>
                </div>
              </div>
            </div>

            {/* Standard responsive modern Google Map embedding and rendering */}
            <div className="rounded-xl overflow-hidden aspect-[16/9] border border-purple-500/15 relative" id="contact-gmap-panel">
              <iframe
                title="Bhairavnath Digital Google Map"
                src="https://maps.google.com/maps?q=WV7R%2B8W7,%20Bavdhan,%20Maharashtra%20412804&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'invert(90%) hue-rotate(240deg) brightness(85%) contrast(95%)' }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* Right Direct Dispatch form container */}
          <div className="lg:col-span-7 bg-zinc-950/30 border border-purple-500/10 p-6 sm:p-8 rounded-2xl relative" id="direct-email-delivery">
            <h3 className="font-heading font-extrabold text-xl sm:text-2xl text-white mb-1.5 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-purple-400 animate-pulse" /> Dispatch Quick Message
            </h3>
            <p className="text-slate-500 text-xs sm:text-sm mb-6 leading-relaxed">
              Have a simple product question or feedback query? Share details in the box below for instant email resolution.
            </p>

            {contactSuccess ? (
              <div className="py-16 text-center">
                <div className="w-16 h-16 rounded-full bg-purple-950/50 border border-purple-500/40 flex items-center justify-center mx-auto mb-4">
                  <MailCheck className="w-8 h-8 text-emerald-400 animate-pulse" />
                </div>
                <h4 className="font-heading font-extrabold text-white text-lg mb-1">
                  Mail Dispatched Successfully!
                </h4>
                <p className="text-slate-400 text-xs sm:text-sm max-w-sm mx-auto mb-6">
                  We have cataloged your feedback sheet and will respond over email within standard office shifts.
                </p>
                <button
                  type="button"
                  onClick={() => setContactSuccess(false)}
                  className="px-4.5 py-2 hover:bg-white/5 border border-purple-500/20 text-slate-400 hover:text-white rounded-lg text-xs tracking-wider uppercase font-semibold transition"
                >
                  Write Another Card
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmitContact} className="space-y-4">
                <div>
                  <label className="block text-[10.5px] font-mono uppercase tracking-wider text-purple-300 font-bold mb-1.5">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                    placeholder="e.g., Harish Patil"
                    className="w-full p-3 bg-black border border-purple-500/15 focus:border-purple-500/80 rounded-xl text-sm focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[10.5px] font-mono uppercase tracking-wider text-purple-300 font-bold mb-1.5">
                    Email Index *
                  </label>
                  <input
                    type="email"
                    required
                    value={senderEmail}
                    onChange={(e) => setSenderEmail(e.target.value)}
                    placeholder="e.g., harish@gmail.com"
                    className="w-full p-3 bg-black border border-purple-500/15 focus:border-purple-500/80 rounded-xl text-sm focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[10.5px] font-mono uppercase tracking-wider text-purple-300 font-bold mb-1.5">
                    Message Body *
                  </label>
                  <textarea
                    required
                    value={senderMessage}
                    onChange={(e) => setSenderMessage(e.target.value)}
                    placeholder="Outline your inquiry or physical sample request details here..."
                    rows={4}
                    className="w-full p-3 bg-black border border-purple-500/15 focus:border-purple-500/80 rounded-xl text-sm focus:outline-none placeholder:text-slate-700"
                  />
                </div>

                <button
                  type="submit"
                  disabled={busy}
                  className="w-full py-3.5 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl text-white font-heading text-xs uppercase font-extrabold tracking-widest hover:scale-[1.01] active:translate-y-0.5 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  <span>{busy ? "Dispatching..." : "Send Message"}</span>
                </button>
              </form>
            )}

          </div>
        </div>
      </section>

    </div>
  );
}
