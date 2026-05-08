import { useState, useEffect, useRef } from 'react';
import {
  motion, AnimatePresence, useInView, useScroll, useTransform, useSpring, useMotionValueEvent,
} from 'framer-motion';
import {
  MapPin, Star, Menu, X, Heart, Sun, Moon,
  Phone, Mail, CheckCircle, Globe, ChevronDown,
  Users, ShieldCheck, Target, Clock,
} from 'lucide-react';
import { cn } from './utils/cn';
import { destinations, experiences, hotels, services, stats, categories } from './data/mockData';
import type { Destination } from './data/mockData';

/* ─── Constants ─── */
const WA = '971553232817';
const wa = (msg: string) => window.open(`https://wa.me/${WA}?text=${encodeURIComponent(msg)}`, '_blank');
const fmt = (usd: number, aed: number, inr: number, cur: string) =>
  cur === 'AED' ? `AED ${aed.toLocaleString()}` : cur === 'INR' ? `₹${inr.toLocaleString()}` : `$${usd.toLocaleString()}`;

const heroImages = [
  'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1920&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1518684079-3c830dcef090?w=1920&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1451337516015-6b6e9a44a8a3?w=1920&auto=format&fit=crop',
];

/* ═══════════════════════════════════════════════
   SCROLL EFFECT COMPONENTS
   ═══════════════════════════════════════════════ */

/** Fade-up reveal on scroll — the workhorse */
function Reveal({ children, className = '', delay = 0, direction = 'up' }: {
  children: React.ReactNode; className?: string; delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const dirs = { up: { y: 50 }, down: { y: -50 }, left: { x: 60 }, right: { x: -60 } };
  const initial = { opacity: 0, ...dirs[direction] };
  const animate = inView ? { opacity: 1, x: 0, y: 0 } : {};
  return (
    <motion.div ref={ref} initial={initial} animate={animate}
      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay }} className={className}>
      {children}
    </motion.div>
  );
}

/** Parallax wrapper — moves child at a different scroll rate */
function Parallax({ children, speed = 0.3, className = '' }: { children: React.ReactNode; speed?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [speed * -100, speed * 100]);
  return (
    <div ref={ref} className={cn('overflow-hidden', className)}>
      <motion.div style={{ y }}>{children}</motion.div>
    </div>
  );
}

/** Animated counter — counts from 0 to value on scroll */
function Counter({ value, suffix = '', className = '' }: { value: number; suffix?: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1800;
    const step = (ts: number) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
      setCount(Math.floor(eased * value));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, value]);
  return <span ref={ref} className={className}>{count}{suffix}</span>;
}

/** Scale-in on scroll — subtle scale + fade for images */
function ScaleIn({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, scale: 0.92 }} animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }} className={className}>
      {children}
    </motion.div>
  );
}

/* ─── Logo SVG ─── */
function Logo({ dark }: { dark: boolean }) {
  return (
    <svg viewBox="0 0 52 52" className="w-10 h-10 sm:w-11 sm:h-11 shrink-0" fill="none">
      <path d="M12 44C12 44 8 36 8 26C8 16 14 8 26 8" stroke="#D4A017" strokeWidth="3" strokeLinecap="round" fill="none" />
      <path d="M16 44C16 44 13 36 13 28C13 18 18 12 26 12" stroke={dark ? '#fff' : '#0A1628'} strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <rect x="24" y="14" width="4" height="28" rx="2" fill="#D4A017" />
      <rect x="24" y="18" width="18" height="3.5" rx="1.5" fill={dark ? '#fff' : '#0A1628'} />
      <rect x="24" y="26" width="14" height="3" rx="1.5" fill="#D4A017" />
    </svg>
  );
}

function WhatsAppIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="currentColor" aria-hidden="true">
      <path d="M16.004 3.2C9.007 3.2 3.32 8.886 3.32 15.883c0 2.237.584 4.42 1.694 6.346L3.2 28.8l6.766-1.776A12.644 12.644 0 0016.004 28.6c6.997 0 12.684-5.687 12.684-12.684S23 3.2 16.004 3.2zm0 23.167a10.44 10.44 0 01-5.33-1.46l-.382-.227-3.964 1.04 1.058-3.862-.249-.396a10.413 10.413 0 01-1.6-5.579c0-5.774 4.7-10.473 10.475-10.473 5.774 0 10.473 4.7 10.473 10.473 0 5.775-4.707 10.484-10.481 10.484zm5.747-7.843c-.316-.158-1.867-.921-2.157-1.026-.29-.106-.5-.158-.712.158-.21.316-.818 1.026-1.003 1.237-.184.21-.369.237-.685.079-.316-.158-1.334-.491-2.54-1.566-.94-.838-1.573-1.872-1.758-2.188-.184-.316-.02-.487.138-.644.143-.143.316-.369.474-.553.158-.184.21-.316.316-.527.106-.21.053-.395-.026-.553-.079-.158-.712-1.716-.976-2.348-.257-.618-.518-.534-.712-.544-.184-.01-.395-.012-.606-.012a1.162 1.162 0 00-.843.395c-.29.316-1.104 1.079-1.104 2.632s1.13 3.052 1.288 3.262c.158.21 2.225 3.395 5.39 4.76.753.325 1.341.519 1.8.664.756.24 1.444.207 1.989.126.606-.091 1.867-.763 2.13-1.5.264-.737.264-1.368.184-1.5-.079-.132-.29-.21-.606-.369z" />
    </svg>
  );
}

/* ─── WhatsApp FAB ─── */
function WhatsAppFab() {
  const { scrollYProgress } = useScroll();
  const [show, setShow] = useState(false);
  useMotionValueEvent(scrollYProgress, 'change', v => setShow(v > 0.05));
  return (
    <AnimatePresence>
      {show && (
        <motion.button initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0, opacity: 0 }}
          onClick={() => wa('Hello Gulf Axis Consultancy, I would like to know more about your services.')}
          className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center shadow-2xl shadow-green-500/30 transition-colors hover:scale-110 animate-pulse-ring text-green-500"
          aria-label="Chat on WhatsApp">
          <svg viewBox="0 0 32 32" className="w-7 h-7 fill-white">
            <path d="M16.004 3.2C9.007 3.2 3.32 8.886 3.32 15.883c0 2.237.584 4.42 1.694 6.346L3.2 28.8l6.766-1.776A12.644 12.644 0 0016.004 28.6c6.997 0 12.684-5.687 12.684-12.684S23 3.2 16.004 3.2zm5.747 15.324c-.316-.158-1.867-.921-2.157-1.026-.29-.106-.5-.158-.712.158-.21.316-.818 1.026-1.003 1.237-.184.21-.369.237-.685.079-.316-.158-1.334-.491-2.54-1.566-.94-.838-1.573-1.872-1.758-2.188-.184-.316-.02-.487.138-.644.143-.143.316-.369.474-.553.158-.184.21-.316.316-.527.106-.21.053-.395-.026-.553-.079-.158-.712-1.716-.976-2.348-.257-.618-.518-.534-.712-.544-.184-.01-.395-.012-.606-.012a1.162 1.162 0 00-.843.395c-.29.316-1.104 1.079-1.104 2.632s1.13 3.052 1.288 3.262c.158.21 2.225 3.395 5.39 4.76.753.325 1.341.519 1.8.664.756.24 1.444.207 1.989.126.606-.091 1.867-.763 2.13-1.5.264-.737.264-1.368.184-1.5-.079-.132-.29-.21-.606-.369z"/>
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  );
}

/* ─── Scroll Progress Bar ─── */
function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });
  return <motion.div style={{ scaleX }} className="fixed top-0 left-0 right-0 h-[3px] bg-amber-500 origin-left z-[60]" />;
}

/* ════════════════════════════════════════════════════════════════
   MAIN APP
   ════════════════════════════════════════════════════════════════ */
export default function App() {
  const [dark, setDark] = useState(false);
  const [cur, setCur] = useState<'AED' | 'USD' | 'INR'>('AED');
  const [curOpen, setCurOpen] = useState(false);
  const [mobMenu, setMobMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [cat, setCat] = useState('all');
  const [favs, setFavs] = useState<string[]>([]);
  const [modal, setModal] = useState<Destination | null>(null);
  const [booking, setBooking] = useState<{ name: string; id: string } | null>(null);
  const [bName, setBName] = useState('');
  const [bEmail, setBEmail] = useState('');
  const [bDate, setBDate] = useState('');
  const [bLoading, setBLoading] = useState(false);
  const [bDone, setBDone] = useState(false);
  const [heroName, setHeroName] = useState('');
  const [heroPhone, setHeroPhone] = useState('');
  const [heroService, setHeroService] = useState('');
  const [heroSent, setHeroSent] = useState(false);
  const [cName, setCName] = useState('');
  const [cEmail, setCEmail] = useState('');
  const [cPhone, setCPhone] = useState('');
  const [cMessage, setCMessage] = useState('');
  const [cSent, setCSent] = useState(false);
  const [heroImageIndex, setHeroImageIndex] = useState(0);

  // Hero parallax
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroImgY = useTransform(heroProgress, [0, 1], [0, 200]);
  const heroOpacity = useTransform(heroProgress, [0, 0.8], [1, 0]);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', h);
    return () => window.removeEventListener('scroll', h);
  }, []);
  useEffect(() => {
    const timer = window.setInterval(() => {
      setHeroImageIndex((current) => (current + 1) % heroImages.length);
    }, 4200);
    return () => window.clearInterval(timer);
  }, []);
  useEffect(() => { const d = new Date(); d.setDate(d.getDate() + 2); setBDate(d.toISOString().split('T')[0]); }, []);

  const filtered = cat === 'all' ? destinations : destinations.filter(dd => dd.category === cat);
  const toggleFav = (id: string, e: React.MouseEvent) => { e.stopPropagation(); setFavs(p => p.includes(id) ? p.filter(x => x !== id) : [...p, id]); };

  const handleBook = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bName || !bEmail || !bDate || !booking) return;
    setBLoading(true);
    const msg = `Hello Gulf Axis Consultancy,\n\nI'm interested in: ${booking.name}\nPreferred Date: ${bDate}\nName: ${bName}\nEmail: ${bEmail}\n\nPlease get back to me. Thank you.`;
    setTimeout(() => { setBLoading(false); setBDone(true); setTimeout(() => { wa(msg); setBooking(null); setBDone(false); setBName(''); setBEmail(''); }, 1000); }, 800);
  };
  const handleHeroForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!heroName || !heroPhone) return;
    const msg = `Hello Gulf Axis Consultancy,\n\nName: ${heroName}\nPhone: ${heroPhone}\nService: ${heroService || 'General Enquiry'}\n\nPlease contact me. Thank you.`;
    setHeroSent(true);
    setTimeout(() => { wa(msg); setHeroSent(false); setHeroName(''); setHeroPhone(''); setHeroService(''); }, 1200);
  };
  const handleContactForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cName || !cEmail || !cMessage) return;
    const msg = `Hello Gulf Axis Consultancy,\n\nName: ${cName}\nEmail: ${cEmail}\nPhone: ${cPhone || 'Not provided'}\nMessage: ${cMessage}\n\nThank you.`;
    setCSent(true);
    setTimeout(() => { wa(msg); setCSent(false); setCName(''); setCEmail(''); setCPhone(''); setCMessage(''); }, 1200);
  };

  const d = dark;
  const navLinks = [
    { label: 'Services', href: '#services' }, { label: 'Destinations', href: '#destinations' },
    { label: 'Experiences', href: '#experiences' }, { label: 'Hotels', href: '#hotels' },
    { label: 'About', href: '#about' }, { label: 'Contact', href: '#contact' },
  ];
  const inputCls = cn('w-full px-4 py-3 rounded-xl text-sm outline-none transition-all border',
    d ? 'bg-slate-900 border-slate-700 text-white placeholder-slate-500 focus:border-amber-500'
      : 'bg-white border-slate-200 text-slate-900 placeholder-slate-400 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/10');

  return (
    <div className={cn('min-h-screen transition-colors duration-300', d ? 'bg-[#0a1628] text-slate-100' : 'bg-white text-slate-900')}>
      <ScrollProgress />
      <WhatsAppFab />

      {/* ═══ TOP BAR ═══ */}
      <div className="text-xs py-2 px-4 bg-[#060e1a] text-slate-400">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-1.5">
          <span className="hidden sm:inline font-medium">Professional Solutions · Real Results</span>
          <div className="flex items-center gap-3 sm:gap-5 flex-wrap justify-center">
            <a href="tel:+971553232817" className="flex items-center gap-1.5 hover:text-amber-400 transition-colors"><Phone className="w-3 h-3" /> +971 55 323 2817</a>
            <a href="tel:+971568815281" className="hidden sm:flex items-center gap-1.5 hover:text-amber-400 transition-colors"><Phone className="w-3 h-3" /> +971 56 881 5281</a>
            <a href="mailto:Gulfaxis2026@Gmail.com" className="flex items-center gap-1.5 hover:text-amber-400 transition-colors"><Mail className="w-3 h-3" /> Gulfaxis2026@Gmail.com</a>
          </div>
        </div>
      </div>

      {/* ═══ NAV ═══ */}
      <nav className={cn('sticky top-0 z-40 transition-all duration-300 border-b',
        scrolled ? d ? 'bg-[#0a1628]/95 backdrop-blur-xl border-slate-800 shadow-lg' : 'bg-white/95 backdrop-blur-xl border-slate-200 shadow-sm'
          : d ? 'bg-[#0a1628] border-slate-800' : 'bg-white border-slate-200')}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16 sm:h-[72px]">
          <a href="#" className="flex items-center gap-2.5 shrink-0">
            <Logo dark={d} />
            <div className="leading-tight">
              <span className={cn('text-sm sm:text-lg font-black tracking-tight', d ? 'text-white' : 'text-[#0a1628]')}>GULF AXIS CONSULTANCY</span>
              <span className="block text-[8px] sm:text-[10px] font-bold tracking-[1.5px] text-amber-500">YOUR TRUSTED PARTNER FOR SUCCESS</span>
            </div>
          </a>
          <div className="hidden xl:flex items-center gap-6">
            {navLinks.map(l => <a key={l.label} href={l.href} className={cn('text-sm font-semibold hover:text-amber-500 transition-colors', d ? 'text-slate-300' : 'text-slate-700')}>{l.label}</a>)}
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="relative">
              <button onClick={() => setCurOpen(!curOpen)} className={cn('flex items-center gap-1 text-xs font-bold px-3 py-2 rounded-lg transition-all', d ? 'bg-slate-800 text-white' : 'bg-slate-100 text-slate-700')}>
                {cur} <ChevronDown className="w-3 h-3" />
              </button>
              <AnimatePresence>
                {curOpen && (
                  <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 6 }}
                    className={cn('absolute right-0 mt-2 rounded-xl shadow-2xl overflow-hidden border z-50', d ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200')}>
                    {(['AED', 'USD', 'INR'] as const).map(c => (
                      <button key={c} onClick={() => { setCur(c); setCurOpen(false); }}
                        className={cn('block w-full text-left px-5 py-2.5 text-xs font-bold transition-colors', cur === c ? 'bg-amber-500 text-[#0a1628]' : d ? 'text-slate-300 hover:bg-slate-700' : 'text-slate-700 hover:bg-slate-100')}>
                        {c === 'AED' ? '🇦🇪 AED' : c === 'USD' ? '🇺🇸 USD' : '🇮🇳 INR'}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <button onClick={() => setDark(!dark)} className={cn('p-2 rounded-lg transition-all', d ? 'bg-slate-800 text-amber-400' : 'bg-slate-100 text-slate-700')} aria-label="Toggle theme">
              {d ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <a href="#contact" className="hidden sm:flex px-5 py-2.5 bg-[#25D366] hover:bg-[#1ebe5d] text-white text-xs font-bold rounded-lg transition-all hover:scale-105 shadow-lg shadow-green-500/20 items-center gap-1.5">
              <WhatsAppIcon className="w-4 h-4 text-white" /> WhatsApp Us
            </a>
            <button onClick={() => setMobMenu(!mobMenu)} className="xl:hidden p-2" aria-label="Menu">
              {mobMenu ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
        <AnimatePresence>
          {mobMenu && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
              className={cn('xl:hidden overflow-hidden border-t', d ? 'bg-[#0a1628] border-slate-800' : 'bg-white border-slate-200')}>
              <div className="px-4 py-4 space-y-1">
                {navLinks.map(l => <a key={l.label} href={l.href} onClick={() => setMobMenu(false)} className={cn('block px-4 py-3 rounded-lg font-semibold text-sm', d ? 'hover:bg-slate-800 text-slate-300' : 'hover:bg-slate-50 text-slate-700')}>{l.label}</a>)}
                <a href="#contact" onClick={() => setMobMenu(false)} className="flex w-full mt-3 py-3 bg-[#25D366] text-white font-bold text-sm rounded-lg items-center justify-center gap-2">
                  <WhatsAppIcon className="w-4 h-4 text-white" /> WhatsApp Us
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* ═══ HERO — Parallax ═══ */}
      <section ref={heroRef} className="relative min-h-[92vh] flex items-center overflow-hidden">
        <motion.div style={{ y: heroImgY }} className="absolute inset-0">
          <AnimatePresence initial={false} mode="sync">
            <motion.img
              key={heroImages[heroImageIndex]}
              src={heroImages[heroImageIndex]}
              alt="UAE skyline and travel atmosphere"
              initial={{ opacity: 0, scale: 1.12, x: 28, filter: 'blur(8px)' }}
              animate={{ opacity: 1, scale: 1.04, x: 0, filter: 'blur(2px)' }}
              exit={{ opacity: 0, scale: 1.08, x: -28, filter: 'blur(7px)' }}
              transition={{ duration: 1.35, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 w-full h-[120%] object-cover"
            />
          </AnimatePresence>
          <div className="absolute inset-0 bg-[#0a1628]/35 backdrop-blur-[1px]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a1628]/95 via-[#0a1628]/82 to-[#0a1628]/45" />
          <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#0a1628] to-transparent" />
        </motion.div>
        <motion.div style={{ opacity: heroOpacity }} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-28 sm:py-32 w-full">
          <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }} className="lg:col-span-3">
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 text-amber-400 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest mb-6">
                <Globe className="w-3.5 h-3.5" /> GULF AXIS CONSULTANCY
              </motion.div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[1.05] tracking-tight">
                <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="block">Your Goals,</motion.span>
                <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="block text-amber-400">Our Commitment</motion.span>
              </h1>
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }} className="text-base sm:text-lg text-slate-300 mt-5 max-w-xl leading-relaxed">
                We make it possible — Business Setup, Visas, Employment, Documentation &amp; Travel. All under one roof in the UAE.
              </motion.p>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }} className="mt-10 flex flex-wrap gap-8 sm:gap-12">
                {stats.map((s, i) => {
                  const numericVal = parseInt(s.value.replace(/[^0-9]/g, ''));
                  const suffix = s.value.replace(/[0-9]/g, '');
                  return (
                    <div key={i}>
                      <span className="block text-3xl sm:text-4xl font-black text-amber-400"><Counter value={numericVal} suffix={suffix} /></span>
                      <span className="text-xs text-slate-400 font-medium">{s.label}</span>
                    </div>
                  );
                })}
              </motion.div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }} className="lg:col-span-2 w-full max-w-md lg:ml-auto">
              <div className="relative overflow-hidden rounded-3xl bg-white/95 backdrop-blur-2xl border border-white/60 p-6 sm:p-8 shadow-2xl shadow-black/30">
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#25D366] via-amber-400 to-[#25D366]" />
                <h3 className="text-[#0a1628] font-black text-xl mb-1">Quick Enquiry</h3>
                <p className="text-slate-500 text-xs mb-6">Fill in your details and we'll reach out immediately.</p>
                {heroSent ? (
                  <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center py-8">
                    <CheckCircle className="w-14 h-14 text-green-400 mx-auto mb-3" />
                    <p className="text-[#0a1628] font-bold">Thank you!</p>
                    <p className="text-slate-500 text-xs mt-1">Redirecting to WhatsApp...</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleHeroForm} className="space-y-4">
                    <input type="text" placeholder="Your Name *" value={heroName} onChange={e => setHeroName(e.target.value)} required className="w-full bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 px-4 py-3 rounded-xl text-sm outline-none focus:border-[#25D366] focus:ring-2 focus:ring-green-500/10 transition-colors" />
                    <input type="tel" placeholder="Phone Number *" value={heroPhone} onChange={e => setHeroPhone(e.target.value)} required className="w-full bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 px-4 py-3 rounded-xl text-sm outline-none focus:border-[#25D366] focus:ring-2 focus:ring-green-500/10 transition-colors" />
                    <select value={heroService} onChange={e => setHeroService(e.target.value)} className="w-full bg-slate-50 border border-slate-200 text-slate-900 px-4 py-3 rounded-xl text-sm outline-none focus:border-[#25D366] focus:ring-2 focus:ring-green-500/10 transition-colors appearance-none">
                      <option value="" className="text-slate-900">Select a Service</option>
                      {services.map(s => <option key={s.title} value={s.title} className="text-slate-900">{s.title}</option>)}
                    </select>
                    <button type="submit" className="w-full py-3.5 bg-[#25D366] hover:bg-[#1ebe5d] text-white font-bold rounded-xl text-sm transition-all flex items-center justify-center gap-2 hover:scale-[1.02] shadow-lg shadow-green-500/20">
                      <WhatsAppIcon className="w-5 h-5 text-white" /> Send on WhatsApp
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* ═══ SERVICES ═══ */}
      <section id="services" className={cn('py-20 sm:py-28 scroll-mt-20', d ? 'bg-[#0d1b30]' : 'bg-slate-50')}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <Reveal>
            <div className="text-center mb-14">
              <span className="text-xs font-black text-amber-500 tracking-[3px] uppercase">What We Offer</span>
              <h2 className={cn('text-3xl sm:text-4xl md:text-5xl font-black mt-3 tracking-tight', d ? 'text-white' : 'text-[#0a1628]')}>Our Core Services</h2>
              <p className={cn('mt-3 max-w-lg mx-auto text-sm', d ? 'text-slate-400' : 'text-slate-600')}>Professional solutions tailored for success in the United Arab Emirates.</p>
            </div>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {services.map((s, i) => (
              <Reveal key={i} delay={i * 0.07} direction={i % 2 === 0 ? 'up' : 'right'}>
                <div className={cn('group rounded-2xl overflow-hidden border transition-all duration-300 hover:shadow-2xl h-full flex flex-col hover:-translate-y-1',
                  d ? 'bg-[#0a1628] border-slate-800 hover:border-amber-500/40' : 'bg-white border-slate-200 hover:border-amber-400')}>
                  <div className="relative h-44 overflow-hidden">
                    <img src={s.image} alt={s.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <h3 className="absolute bottom-4 left-4 right-4 text-white font-bold text-base">{s.title}</h3>
                  </div>
                  <div className="p-5 sm:p-6 flex flex-col flex-1">
                    <p className={cn('text-sm flex-1 leading-relaxed', d ? 'text-slate-400' : 'text-slate-600')}>{s.desc}</p>
                    <button onClick={() => wa(`Hello Gulf Axis Consultancy,\n\nI am interested in: ${s.title}\n\nPlease provide details.`)}
                      className="mt-5 w-full py-2.5 text-sm font-bold rounded-xl bg-[#25D366] hover:bg-[#1ebe5d] text-white transition-all flex items-center justify-center gap-2 hover:scale-[1.02] shadow-lg shadow-green-500/10">
                      <WhatsAppIcon className="w-4 h-4 text-white" /> Enquire on WhatsApp
                    </button>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ DESTINATIONS ═══ */}
      <section id="destinations" className={cn('py-20 sm:py-28 scroll-mt-20', d ? 'bg-[#0a1628]' : 'bg-white')}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <Reveal>
            <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-6">
              <div>
                <span className="text-xs font-black text-amber-500 tracking-[3px] uppercase">Premium Packages</span>
                <h2 className={cn('text-3xl sm:text-4xl md:text-5xl font-black mt-3 tracking-tight', d ? 'text-white' : 'text-[#0a1628]')}>Curated UAE Experiences</h2>
              </div>
              <div className={cn('flex flex-wrap gap-1.5 p-1 rounded-xl self-start lg:self-auto', d ? 'bg-slate-800/60' : 'bg-slate-100')}>
                {categories.map(c => (
                  <button key={c.id} onClick={() => setCat(c.id)} className={cn('px-4 py-2 text-xs font-bold rounded-lg transition-all', cat === c.id ? 'bg-amber-500 text-[#0a1628] shadow-md' : d ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-slate-900')}>{c.label}</button>
                ))}
              </div>
            </div>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
            <AnimatePresence mode="popLayout">
              {filtered.map((dest, i) => (
                <motion.div key={dest.id} layout initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.45, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                  className={cn('group rounded-2xl overflow-hidden border cursor-pointer transition-all duration-300 hover:shadow-2xl hover:-translate-y-1',
                    d ? 'bg-[#0d1b30] border-slate-800 hover:border-amber-500/30' : 'bg-white border-slate-200 hover:border-amber-300')}
                  onClick={() => setModal(dest)}>
                  <div className="relative h-52 sm:h-56 overflow-hidden">
                    <img src={dest.image} alt={dest.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy" />
                    <button onClick={(e) => toggleFav(dest.id, e)} className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm p-2 rounded-full text-white hover:text-amber-400 transition-colors">
                      <Heart className={cn('w-4 h-4 transition-all', favs.includes(dest.id) && 'fill-amber-400 text-amber-400 scale-110')} />
                    </button>
                    <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-sm px-3 py-1 rounded-full text-[11px] text-white font-medium">{dest.emirate}</div>
                  </div>
                  <div className="p-5 sm:p-6">
                    <div className="flex items-center gap-1.5 text-xs text-amber-500 mb-1.5"><Star className="w-3.5 h-3.5 fill-amber-500" /> {dest.rating} <span className={cn('mx-1', d ? 'text-slate-600' : 'text-slate-300')}>·</span> {dest.duration}</div>
                    <h3 className={cn('font-bold text-lg tracking-tight', d ? 'text-white' : 'text-slate-900')}>{dest.name}</h3>
                    <p className={cn('text-sm mt-1.5 line-clamp-2', d ? 'text-slate-400' : 'text-slate-600')}>{dest.description}</p>
                    <div className={cn('flex justify-between items-center mt-5 pt-4 border-t', d ? 'border-slate-700/50' : 'border-slate-100')}>
                      <div><span className={cn('text-[10px] block', d ? 'text-slate-500' : 'text-slate-400')}>From</span><span className="text-xl font-black text-amber-500">{fmt(dest.priceUSD, dest.priceAED, dest.priceINR, cur)}</span></div>
                      <button onClick={(e) => { e.stopPropagation(); setBooking({ name: dest.name, id: dest.id }); }} className="px-5 py-2 bg-amber-500 hover:bg-amber-600 text-xs font-bold text-[#0a1628] rounded-lg transition-all hover:scale-105">Book Now</button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* ═══ EXPERIENCES — with Parallax images ═══ */}
      <section id="experiences" className={cn('py-20 sm:py-28 scroll-mt-20', d ? 'bg-[#0d1b30]' : 'bg-slate-50')}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <Reveal><div className="text-center mb-14">
            <span className="text-xs font-black text-amber-500 tracking-[3px] uppercase">Signature</span>
            <h2 className={cn('text-3xl sm:text-4xl md:text-5xl font-black mt-3 tracking-tight', d ? 'text-white' : 'text-[#0a1628]')}>Exclusive Experiences</h2>
          </div></Reveal>
          <div className="grid md:grid-cols-3 gap-7">
            {experiences.map((exp, i) => (
              <Reveal key={exp.id} delay={i * 0.1} direction={i === 0 ? 'left' : i === 2 ? 'right' : 'up'}>
                <div className={cn('rounded-2xl overflow-hidden border transition-all hover:shadow-2xl h-full flex flex-col group hover:-translate-y-1',
                  d ? 'bg-[#0a1628] border-slate-800' : 'bg-white border-slate-200')}>
                  <Parallax speed={0.15} className="h-52">
                    <img src={exp.image} alt={exp.title} className="w-full h-[130%] object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
                    <div className="absolute top-3 right-3 bg-amber-500 text-[11px] px-2.5 py-0.5 font-bold text-[#0a1628] rounded-md z-10">{exp.category}</div>
                  </Parallax>
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className={cn('font-bold text-lg', d ? 'text-white' : 'text-slate-900')}>{exp.title}</h3>
                    <p className={cn('text-sm mt-1.5 flex-1', d ? 'text-slate-400' : 'text-slate-600')}>{exp.description}</p>
                    <div className={cn('flex justify-between items-center mt-5 pt-4 border-t', d ? 'border-slate-700/50' : 'border-slate-100')}>
                      <span className="font-black text-amber-500 text-lg">{fmt(exp.priceUSD, exp.priceAED, exp.priceINR, cur)}</span>
                      <button onClick={() => setBooking({ name: exp.title, id: exp.id })} className="px-4 py-2 text-xs font-bold bg-amber-500 hover:bg-amber-600 text-[#0a1628] rounded-lg transition-all">Reserve</button>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ HOTELS ═══ */}
      <section id="hotels" className={cn('py-20 sm:py-28 scroll-mt-20', d ? 'bg-[#0a1628]' : 'bg-white')}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <Reveal><div className="text-center mb-14">
            <span className="text-xs font-black text-amber-500 tracking-[3px] uppercase">Luxury Stays</span>
            <h2 className={cn('text-3xl sm:text-4xl md:text-5xl font-black mt-3 tracking-tight', d ? 'text-white' : 'text-[#0a1628]')}>Partner Hotels &amp; Resorts</h2>
          </div></Reveal>
          <div className="grid md:grid-cols-3 gap-7">
            {hotels.map((h) => (
              <ScaleIn key={h.id}>
                <div className={cn('rounded-2xl overflow-hidden border transition-all hover:shadow-2xl group h-full flex flex-col hover:-translate-y-1',
                  d ? 'bg-[#0d1b30] border-slate-800' : 'bg-white border-slate-200')}>
                  <div className="relative h-52 overflow-hidden">
                    <img src={h.image} alt={h.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy" />
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-lg flex items-center gap-1"><Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" /><span className="text-xs font-bold text-slate-900">{h.rating}</span></div>
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-0.5 mb-2">{Array.from({ length: h.stars }).map((_, j) => <Star key={j} className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />)}</div>
                    <h3 className={cn('font-bold text-lg', d ? 'text-white' : 'text-slate-900')}>{h.name}</h3>
                    <div className={cn('flex items-center gap-1 text-xs mt-1', d ? 'text-slate-400' : 'text-slate-500')}><MapPin className="w-3 h-3" /> {h.location}</div>
                    <div className="flex flex-wrap gap-1.5 mt-3">{h.amenities.map(a => <span key={a} className={cn('text-[10px] px-2 py-0.5 rounded-md font-medium', d ? 'bg-slate-800 text-slate-300' : 'bg-slate-100 text-slate-600')}>{a}</span>)}</div>
                    <div className={cn('flex justify-between items-center mt-auto pt-5 border-t', d ? 'border-slate-700/50' : 'border-slate-100')}>
                      <div><span className={cn('text-[10px] block', d ? 'text-slate-500' : 'text-slate-400')}>From / night</span><span className="text-xl font-black text-amber-500">{fmt(h.pricePerNightUSD, h.pricePerNightAED, h.pricePerNightINR, cur)}</span></div>
                      <button onClick={() => setBooking({ name: h.name, id: h.id })} className="px-4 py-2 text-xs font-bold bg-amber-500 hover:bg-amber-600 text-[#0a1628] rounded-lg transition-all">Book Stay</button>
                    </div>
                  </div>
                </div>
              </ScaleIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ ABOUT — with parallax image ═══ */}
      <section id="about" className={cn('py-20 sm:py-28 scroll-mt-20', d ? 'bg-[#0d1b30]' : 'bg-slate-50')}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <Reveal direction="left">
              <div className="relative">
                <Parallax speed={0.2} className="rounded-2xl overflow-hidden h-80 sm:h-[420px]">
                  <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&auto=format&fit=crop" alt="Gulf Axis Office" className="w-full h-[130%] object-cover" />
                </Parallax>
                <motion.div initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
                  className={cn('absolute -bottom-6 -right-4 sm:-right-6 rounded-2xl p-5 sm:p-6 shadow-xl border', d ? 'bg-[#0a1628] border-slate-700' : 'bg-white border-slate-200')}>
                  <div className="text-3xl sm:text-4xl font-black text-amber-500"><Counter value={12} suffix="+" /></div>
                  <div className={cn('text-xs font-bold mt-0.5', d ? 'text-slate-400' : 'text-slate-600')}>Years of Excellence</div>
                </motion.div>
              </div>
            </Reveal>
            <Reveal direction="right" delay={0.15}>
              <div>
                <span className="text-xs font-black text-amber-500 tracking-[3px] uppercase">About Us</span>
                <h2 className={cn('text-3xl sm:text-4xl font-black mt-3 tracking-tight', d ? 'text-white' : 'text-[#0a1628]')}>Who We Are</h2>
                <p className={cn('mt-4 leading-relaxed', d ? 'text-slate-400' : 'text-slate-600')}>
                  <strong className={d ? 'text-white' : 'text-slate-900'}>Gulf Axis Consultancy</strong> is a UAE-based professional services firm led by <strong className={d ? 'text-white' : 'text-slate-900'}>Mr. Mohd Javed</strong>. With over 12 years of experience, we help businesses and individuals navigate the complexities of setting up and thriving in the UAE.
                </p>
                <p className={cn('mt-3 leading-relaxed', d ? 'text-slate-400' : 'text-slate-600')}>
                  From company formation and documentation to visa processing and travel — we are your single point of contact for everything in the Emirates. Our commitment is simple: your goals become our mission.
                </p>
                <div className="grid grid-cols-2 gap-4 mt-8">
                  {[{ icon: ShieldCheck, label: 'Trusted Support', desc: 'Licensed & certified' }, { icon: Target, label: 'Result-Driven', desc: '98% success rate' },
                    { icon: Clock, label: 'Fast Processing', desc: 'Priority handling' }, { icon: Users, label: 'Global Clients', desc: '50+ nationalities' }].map((item, i) => (
                    <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 + i * 0.1 }}
                      className={cn('flex items-start gap-3 p-4 rounded-xl border', d ? 'bg-[#0a1628] border-slate-800' : 'bg-white border-slate-200')}>
                      <div className="w-9 h-9 rounded-lg bg-amber-500/10 flex items-center justify-center shrink-0"><item.icon className="w-4 h-4 text-amber-500" /></div>
                      <div><div className={cn('text-sm font-bold', d ? 'text-white' : 'text-slate-900')}>{item.label}</div><div className={cn('text-xs', d ? 'text-slate-500' : 'text-slate-500')}>{item.desc}</div></div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══ CONTACT ═══ */}
      <section id="contact" className={cn('py-20 sm:py-28 scroll-mt-20', d ? 'bg-[#0a1628]' : 'bg-white')}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <Reveal><div className="text-center mb-14">
            <span className="text-xs font-black text-amber-500 tracking-[3px] uppercase">Get In Touch</span>
            <h2 className={cn('text-3xl sm:text-4xl md:text-5xl font-black mt-3 tracking-tight', d ? 'text-white' : 'text-[#0a1628]')}>Contact Us</h2>
            <p className={cn('mt-3 max-w-lg mx-auto text-sm', d ? 'text-slate-400' : 'text-slate-600')}>Ready to get started? Fill in the form or reach out directly. We respond within hours.</p>
          </div></Reveal>
          <div className="grid lg:grid-cols-5 gap-10">
            <Reveal className="lg:col-span-3" direction="left">
              <div className={cn('rounded-2xl p-6 sm:p-8 border', d ? 'bg-[#0d1b30] border-slate-800' : 'bg-slate-50 border-slate-200')}>
                {cSent ? (
                  <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center py-12">
                    <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
                    <p className={cn('font-bold text-xl', d ? 'text-white' : 'text-slate-900')}>Message Sent!</p>
                    <p className={cn('text-sm mt-1', d ? 'text-slate-400' : 'text-slate-600')}>Redirecting to WhatsApp...</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleContactForm} className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div><label className={cn('block text-xs font-bold mb-1.5', d ? 'text-slate-300' : 'text-slate-700')}>Full Name *</label><input type="text" placeholder="John Doe" value={cName} onChange={e => setCName(e.target.value)} required className={inputCls} /></div>
                      <div><label className={cn('block text-xs font-bold mb-1.5', d ? 'text-slate-300' : 'text-slate-700')}>Email Address *</label><input type="email" placeholder="john@example.com" value={cEmail} onChange={e => setCEmail(e.target.value)} required className={inputCls} /></div>
                    </div>
                    <div><label className={cn('block text-xs font-bold mb-1.5', d ? 'text-slate-300' : 'text-slate-700')}>Phone Number</label><input type="tel" placeholder="+971 XX XXX XXXX" value={cPhone} onChange={e => setCPhone(e.target.value)} className={inputCls} /></div>
                    <div><label className={cn('block text-xs font-bold mb-1.5', d ? 'text-slate-300' : 'text-slate-700')}>Message *</label><textarea placeholder="Tell us about your requirements..." rows={5} value={cMessage} onChange={e => setCMessage(e.target.value)} required className={cn(inputCls, 'resize-none')} /></div>
                    <button type="submit" className="w-full py-3.5 bg-[#25D366] hover:bg-[#1ebe5d] text-white font-bold rounded-xl text-sm transition-all flex items-center justify-center gap-2 hover:scale-[1.01] shadow-lg shadow-green-500/20"><WhatsAppIcon className="w-5 h-5 text-white" /> Send Message via WhatsApp</button>
                  </form>
                )}
              </div>
            </Reveal>
            <Reveal delay={0.1} direction="right" className="lg:col-span-2 space-y-5">
              {[{ icon: Phone, label: 'Phone', values: ['+971 55 323 2817', '+971 56 881 5281'], hrefs: ['tel:+971553232817', 'tel:+971568815281'] },
                { icon: Mail, label: 'Email', values: ['Gulfaxis2026@Gmail.com'], hrefs: ['mailto:Gulfaxis2026@Gmail.com'] },
                { icon: MapPin, label: 'Office', values: ['Dubai, United Arab Emirates'], hrefs: ['#'] },
                { icon: Clock, label: 'Working Hours', values: ['Mon – Sat: 9:00 AM – 9:00 PM', 'Sunday: By Appointment'], hrefs: ['#', '#'] },
              ].map((item, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  className={cn('flex items-start gap-4 p-5 rounded-xl border transition-all', d ? 'bg-[#0d1b30] border-slate-800' : 'bg-slate-50 border-slate-200')}>
                  <div className="w-11 h-11 rounded-xl bg-amber-500/10 flex items-center justify-center shrink-0"><item.icon className="w-5 h-5 text-amber-500" /></div>
                  <div><div className={cn('text-xs font-bold mb-1', d ? 'text-slate-400' : 'text-slate-500')}>{item.label}</div>
                    {item.values.map((v, j) => <a key={j} href={item.hrefs[j]} className={cn('block text-sm font-semibold hover:text-amber-500 transition-colors', d ? 'text-white' : 'text-slate-900')}>{v}</a>)}</div>
                </motion.div>
              ))}
              <button onClick={() => wa('Hello Gulf Axis Consultancy, I have a question.')}
                className="w-full py-4 bg-green-500 hover:bg-green-600 text-white font-bold rounded-xl text-sm transition-all flex items-center justify-center gap-2 shadow-lg shadow-green-500/20 hover:scale-[1.02]">
                <svg viewBox="0 0 32 32" className="w-5 h-5 fill-white"><path d="M16.004 3.2C9.007 3.2 3.32 8.886 3.32 15.883c0 2.237.584 4.42 1.694 6.346L3.2 28.8l6.766-1.776A12.644 12.644 0 0016.004 28.6c6.997 0 12.684-5.687 12.684-12.684S23 3.2 16.004 3.2zm5.747 15.324c-.316-.158-1.867-.921-2.157-1.026-.29-.106-.5-.158-.712.158-.21.316-.818 1.026-1.003 1.237-.184.21-.369.237-.685.079-.316-.158-1.334-.491-2.54-1.566-.94-.838-1.573-1.872-1.758-2.188-.184-.316-.02-.487.138-.644.143-.143.316-.369.474-.553.158-.184.21-.316.316-.527.106-.21.053-.395-.026-.553-.079-.158-.712-1.716-.976-2.348-.257-.618-.518-.534-.712-.544-.184-.01-.395-.012-.606-.012a1.162 1.162 0 00-.843.395c-.29.316-1.104 1.079-1.104 2.632s1.13 3.052 1.288 3.262c.158.21 2.225 3.395 5.39 4.76.753.325 1.341.519 1.8.664.756.24 1.444.207 1.989.126.606-.091 1.867-.763 2.13-1.5.264-.737.264-1.368.184-1.5-.079-.132-.29-.21-.606-.369z"/></svg>
                Chat on WhatsApp
              </button>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer className="bg-[#060e1a] border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
            <div>
              <div className="flex items-center gap-2.5 mb-4"><Logo dark={true} /><div><span className="text-base font-black text-white">GULF AXIS CONSULTANCY</span><span className="block text-[9px] font-bold tracking-[1.5px] text-amber-500">YOUR TRUSTED PARTNER FOR SUCCESS</span></div></div>
              <p className="text-slate-500 text-sm leading-relaxed mt-3">Professional business solutions for companies and individuals across the UAE and beyond.</p>
            </div>
            <div><h4 className="font-bold text-white text-sm mb-5">Services</h4><ul className="space-y-2.5 text-sm text-slate-400">{services.map(s => <li key={s.title}><button onClick={() => wa(`I'm interested in: ${s.title}`)} className="hover:text-amber-400 transition-colors text-left">{s.title}</button></li>)}</ul></div>
            <div><h4 className="font-bold text-white text-sm mb-5">Quick Links</h4><ul className="space-y-2.5 text-sm text-slate-400">{navLinks.map(l => <li key={l.label}><a href={l.href} className="hover:text-amber-400 transition-colors">{l.label}</a></li>)}</ul></div>
            <div><h4 className="font-bold text-white text-sm mb-5">Contact</h4><div className="space-y-3 text-sm text-slate-400">
              <a href="tel:+971553232817" className="flex items-center gap-2 hover:text-amber-400 transition-colors"><Phone className="w-3.5 h-3.5 shrink-0" /> +971 55 323 2817</a>
              <a href="tel:+971568815281" className="flex items-center gap-2 hover:text-amber-400 transition-colors"><Phone className="w-3.5 h-3.5 shrink-0" /> +971 56 881 5281</a>
              <a href="mailto:Gulfaxis2026@Gmail.com" className="flex items-center gap-2 hover:text-amber-400 transition-colors"><Mail className="w-3.5 h-3.5 shrink-0" /> Gulfaxis2026@Gmail.com</a>
              <div className="flex items-center gap-2"><MapPin className="w-3.5 h-3.5 shrink-0" /> Dubai, UAE</div>
            </div></div>
          </div>
          <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-slate-600">
            <span>© {new Date().getFullYear()} Gulf Axis Consultancy. All rights reserved.</span>
            <span className="flex items-center gap-1.5">Designed with <Heart className="w-3 h-3 text-red-500 fill-red-500 inline" /> by <a href="mailto:amansh9596@gmail.com" className="text-amber-500 hover:text-amber-400 transition-colors font-semibold">Aman Singh</a></span>
          </div>
        </div>
      </footer>

      {/* ═══ DESTINATION MODAL ═══ */}
      <AnimatePresence>
        {modal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setModal(null)}>
            <motion.div initial={{ scale: 0.9, y: 30, opacity: 0 }} animate={{ scale: 1, y: 0, opacity: 1 }} exit={{ scale: 0.9, y: 30, opacity: 0 }} transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={e => e.stopPropagation()} className={cn('rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl max-h-[90vh] overflow-y-auto', d ? 'bg-[#0d1b30]' : 'bg-white')}>
              <div className="relative h-56 shrink-0"><img src={modal.image} alt={modal.name} className="w-full h-full object-cover" /><button onClick={() => setModal(null)} className="absolute top-4 right-4 bg-black/50 text-white p-2 rounded-full hover:bg-black/70"><X className="w-4 h-4" /></button></div>
              <div className="p-6">
                <div className="flex items-center gap-2 text-xs text-amber-500 mb-2"><Star className="w-3.5 h-3.5 fill-amber-500" /> {modal.rating} · {modal.emirate} · {modal.duration}</div>
                <h3 className={cn('text-xl font-black', d ? 'text-white' : 'text-slate-900')}>{modal.name}</h3>
                <p className={cn('text-sm mt-2 leading-relaxed', d ? 'text-slate-400' : 'text-slate-600')}>{modal.description}</p>
                <div className="flex flex-wrap gap-2 mt-4">{modal.highlights.map(h => <span key={h} className={cn('text-[11px] px-2.5 py-1 rounded-full font-medium', d ? 'bg-slate-800 text-slate-300' : 'bg-slate-100 text-slate-600')}>{h}</span>)}</div>
                <div className={cn('flex justify-between items-center mt-6 pt-4 border-t', d ? 'border-slate-700' : 'border-slate-200')}>
                  <span className="text-2xl font-black text-amber-500">{fmt(modal.priceUSD, modal.priceAED, modal.priceINR, cur)}</span>
                  <button onClick={() => { setModal(null); setBooking({ name: modal.name, id: modal.id }); }} className="px-6 py-2.5 bg-amber-500 hover:bg-amber-600 text-[#0a1628] font-bold rounded-xl text-sm transition-all">Book Now</button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ═══ BOOKING MODAL ═══ */}
      <AnimatePresence>
        {booking && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => { if (!bLoading) { setBooking(null); setBDone(false); } }}>
            <motion.div initial={{ scale: 0.9, y: 30, opacity: 0 }} animate={{ scale: 1, y: 0, opacity: 1 }} exit={{ scale: 0.9, y: 30, opacity: 0 }} transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={e => e.stopPropagation()} className="bg-[#0a1628] text-white rounded-2xl max-w-md w-full overflow-hidden border border-slate-800 shadow-2xl">
              <div className="p-5 border-b border-slate-800 flex justify-between items-center">
                <div><span className="text-amber-400 text-[10px] font-bold tracking-widest">GULF AXIS CONSULTANCY</span><div className="font-bold text-sm mt-0.5">{booking.name}</div></div>
                <button onClick={() => { if (!bLoading) { setBooking(null); setBDone(false); } }} className="text-slate-400 hover:text-white"><X className="w-5 h-5" /></button>
              </div>
              {bDone ? (
                <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="p-10 text-center">
                  <CheckCircle className="w-14 h-14 text-green-400 mx-auto mb-4" /><div className="font-bold text-lg">Thank you!</div><p className="text-slate-400 text-sm mt-1">Redirecting to WhatsApp...</p>
                </motion.div>
              ) : (
                <form onSubmit={handleBook} className="p-5 space-y-4">
                  <div><label className="text-xs font-medium text-slate-400 mb-1 block">Preferred Date</label><input type="date" value={bDate} onChange={e => setBDate(e.target.value)} required className="w-full bg-slate-900 border border-slate-700 p-3 rounded-xl text-sm focus:border-amber-500 outline-none transition-colors" /></div>
                  <div><label className="text-xs font-medium text-slate-400 mb-1 block">Full Name</label><input type="text" placeholder="Your full name" value={bName} onChange={e => setBName(e.target.value)} required className="w-full bg-slate-900 border border-slate-700 p-3 rounded-xl text-sm focus:border-amber-500 outline-none placeholder-slate-600 transition-colors" /></div>
                  <div><label className="text-xs font-medium text-slate-400 mb-1 block">Email Address</label><input type="email" placeholder="your@email.com" value={bEmail} onChange={e => setBEmail(e.target.value)} required className="w-full bg-slate-900 border border-slate-700 p-3 rounded-xl text-sm focus:border-amber-500 outline-none placeholder-slate-600 transition-colors" /></div>
                  <button type="submit" disabled={bLoading} className="w-full bg-amber-500 hover:bg-amber-600 py-3.5 text-[#0a1628] font-bold rounded-xl transition-all flex items-center justify-center gap-2 mt-2">
                    {bLoading ? <div className="w-5 h-5 border-2 border-[#0a1628]/30 border-t-[#0a1628] rounded-full animate-spin" /> : <>Confirm &amp; Send via WhatsApp</>}
                  </button>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
