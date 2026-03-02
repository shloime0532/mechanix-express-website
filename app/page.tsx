"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

/* ------------------------------------------------------------------ */
/*  INTERSECTION OBSERVER HOOK                                         */
/* ------------------------------------------------------------------ */
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

/* ------------------------------------------------------------------ */
/*  DATA                                                                */
/* ------------------------------------------------------------------ */
const PHONE = "(732) 730-7712";
const PHONE_HREF = "tel:+17327307712";
const ADDRESS = "100 Madison Ave, Lakewood, NJ 08701";
const HOURS = "Mon\u2013Fri: 8 AM \u2013 6 PM";
const MAP_LINK = "https://maps.google.com/?q=100+Madison+Ave+Lakewood+NJ+08701";

const SERVICES = [
  { num: "01", title: "Engine Diagnostics & Repair", desc: "Advanced computer diagnostics to pinpoint issues fast. We fix it right the first time \u2014 no guesswork." },
  { num: "02", title: "Brake Service", desc: "Pads, rotors, calipers, and complete brake system overhauls. Your safety is non-negotiable." },
  { num: "03", title: "Transmission Repair", desc: "From fluid flushes to full rebuilds. We handle automatic and manual transmissions with precision." },
  { num: "04", title: "Oil Change & Maintenance", desc: "Quick, thorough oil changes with multi-point inspections. Keep your engine running smooth." },
  { num: "05", title: "Tire Service & Alignment", desc: "Rotations, balancing, new tires, and laser alignment. Better handling, longer tire life." },
  { num: "06", title: "AC & Heating", desc: "Stay comfortable year-round. Full climate system diagnosis, repair, and recharge." },
  { num: "07", title: "Electrical Systems", desc: "Batteries, alternators, starters, and complex wiring. Modern cars demand modern expertise." },
  { num: "08", title: "State Inspection", desc: "Fast, hassle-free NJ state inspections. Drive in, drive out \u2014 we make it easy." },
];

const PROCESS = [
  { step: "01", title: "Book Online", desc: "Call or schedule in seconds" },
  { step: "02", title: "Drop Off", desc: "Convenient drop-off any morning" },
  { step: "03", title: "Expert Repair", desc: "ASE-certified technicians" },
  { step: "04", title: "Drive Happy", desc: "Back on the road fast" },
];

const STATS = [
  { value: "10+", label: "Years Experience" },
  { value: "5,000+", label: "Cars Serviced" },
  { value: "5.0", label: "Google Rating" },
  { value: "ASE", label: "Certified Mechanics" },
];

const TESTIMONIALS = [
  { name: "David R.", text: "Quick and reliable service! They diagnosed my engine issue in minutes and had me back on the road the same day. Honest pricing too.", rating: 5 },
  { name: "Sarah M.", text: "Amazing and friendly service! Michael explained everything clearly. No upselling, just honest work. I won't go anywhere else.", rating: 5 },
  { name: "James K.", text: "Best mechanic in Lakewood, hands down. They fixed my transmission when two other shops couldn't figure it out. True experts.", rating: 5 },
  { name: "Rachel P.", text: "Brought my car in for an oil change and they caught a brake issue I didn't know about. Saved me from a dangerous situation. Trust these guys.", rating: 5 },
];

const FAQS = [
  { q: "Do I need an appointment?", a: "Walk-ins are welcome for quick services like oil changes and inspections. For larger repairs, we recommend calling ahead at (732) 730-7712 so we can prepare for your vehicle." },
  { q: "How long does a typical repair take?", a: "Most standard services (oil changes, brake pads, inspections) are done same-day. Complex repairs like transmission work may take 2\u20133 days. We'll give you an honest timeline upfront." },
  { q: "Do you offer warranties on repairs?", a: "Yes. All our repairs come with a 12-month / 12,000-mile warranty on parts and labor. We stand behind every job we do." },
  { q: "What brands and vehicles do you work on?", a: "We service all makes and models \u2014 domestic, import, and luxury. Our diagnostic equipment handles everything from Honda to BMW." },
  { q: "How do I get a repair estimate?", a: "Call us at (732) 730-7712 or bring your vehicle in for a free diagnostic assessment. We'll explain exactly what's needed and give you a transparent quote before any work begins." },
  { q: "Do you offer a shuttle or loaner car?", a: "We offer complimentary local drop-off while your vehicle is in the shop. Just ask when you schedule your appointment." },
];

const NAV_LINKS = [
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "About", href: "#about" },
  { label: "Reviews", href: "#reviews" },
  { label: "FAQ", href: "#faq" },
];

/* ------------------------------------------------------------------ */
/*  ICONS                                                              */
/* ------------------------------------------------------------------ */
function PhoneIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
  );
}

function Stars({ count = 5 }: { count?: number }) {
  return (
    <span className="inline-flex gap-0.5" aria-label={`${count} stars`}>
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </span>
  );
}

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-gray-200">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between py-5 text-left group cursor-pointer">
        <span className="text-lg font-semibold text-primary pr-4 group-hover:text-accent transition-colors">{q}</span>
        <span className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${open ? "rotate-45 bg-accent text-white" : "bg-light text-accent"}`}>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v12M6 12h12" />
          </svg>
        </span>
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${open ? "max-h-60 opacity-100 pb-5" : "max-h-0 opacity-0"}`}>
        <p className="text-text-light leading-relaxed">{a}</p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  MAIN PAGE                                                          */
/* ------------------------------------------------------------------ */
export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  const hero = useInView(0.1);
  const stats = useInView(0.2);
  const process = useInView(0.15);
  const services = useInView(0.1);
  const about = useInView(0.15);
  const testimonials = useInView(0.1);
  const faqSec = useInView(0.1);
  const ctaSec = useInView(0.2);

  return (
    <main className="overflow-x-hidden">
      {/* ══════════════ NAV (dark-solid) ══════════════ */}
      <nav className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? "bg-primary/95 backdrop-blur-md shadow-lg" : "bg-primary"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-[72px]">
          <a href="#" className="shrink-0">
            <Image src="/images/logo.png" alt="Mechanix Express" width={180} height={48} className="h-10 sm:h-12 w-auto" priority />
          </a>
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((l) => (
              <a key={l.href} href={l.href} className="text-sm font-medium text-white/80 hover:text-white transition-colors">{l.label}</a>
            ))}
            <a href={PHONE_HREF} className="inline-flex items-center gap-2 bg-accent hover:bg-accent-light text-white font-semibold text-sm px-5 py-2.5 rounded-lg transition-all hover:shadow-lg hover:shadow-accent/25">
              <PhoneIcon className="w-4 h-4" />{PHONE}
            </a>
          </div>
          <button className="md:hidden text-white p-2" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen
                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </button>
        </div>
        <div className={`md:hidden overflow-hidden transition-all duration-300 bg-primary ${menuOpen ? "max-h-96 border-t border-white/10" : "max-h-0"}`}>
          <div className="px-4 py-4 space-y-3">
            {NAV_LINKS.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)} className="block text-white/80 hover:text-white font-medium py-2 transition-colors">{l.label}</a>
            ))}
            <a href={PHONE_HREF} className="flex items-center justify-center gap-2 bg-accent hover:bg-accent-light text-white font-semibold px-5 py-3 rounded-lg transition-all mt-2">
              <PhoneIcon className="w-4 h-4" />Call {PHONE}
            </a>
          </div>
        </div>
      </nav>

      {/* ══════════════ HERO SPLIT ══════════════ */}
      <section ref={hero.ref} className="pt-[72px] bg-primary min-h-[90vh] md:min-h-[85vh] flex items-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary-light/30 to-primary" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center py-12 md:py-0">
            {/* Text */}
            <div className={`fade-up ${hero.visible ? "visible" : ""}`} style={{ transitionDelay: "100ms" }}>
              <div className="inline-flex items-center gap-2 bg-blue/10 border border-blue/20 rounded-full px-4 py-1.5 mb-6">
                <span className="w-2 h-2 rounded-full bg-blue animate-pulse" />
                <span className="text-blue-light text-sm font-medium">Now Accepting New Customers</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-[1.1] mb-6">
                Your Car Deserves{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent-light">Expert</span>{" "}Care
              </h1>
              <p className="text-lg sm:text-xl text-white/70 leading-relaxed mb-8 max-w-lg">
                Lakewood&apos;s most trusted auto repair shop. Honest diagnostics, transparent pricing, and ASE-certified mechanics who treat your car like their own.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href={PHONE_HREF} className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent-light text-white font-bold text-lg px-8 py-4 rounded-xl transition-all hover:shadow-xl hover:shadow-accent/30 hover:-translate-y-0.5">
                  <PhoneIcon />Call Now
                </a>
                <a href="#services" className="inline-flex items-center justify-center gap-2 border-2 border-white/20 hover:border-blue text-white font-semibold text-lg px-8 py-4 rounded-xl transition-all hover:bg-white/5">
                  View Services
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </a>
              </div>
            </div>
            {/* Image */}
            <div className={`fade-up ${hero.visible ? "visible" : ""} relative`} style={{ transitionDelay: "300ms" }}>
              <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-black/30">
                <Image src="/images/hero.png" alt="Modern auto repair shop at Mechanix Express" width={700} height={500} className="w-full h-auto object-cover" priority />
                <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-blue/20 rounded-full blur-3xl" />
                <div className="absolute -top-4 -left-4 w-24 h-24 bg-accent/20 rounded-full blur-3xl" />
              </div>
              <div className="absolute -bottom-4 -left-4 sm:bottom-4 sm:-left-6 bg-white rounded-xl shadow-xl p-4 flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                  <svg className="w-6 h-6 text-accent" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                </div>
                <div>
                  <p className="text-2xl font-extrabold text-primary">5.0</p>
                  <p className="text-xs text-text-light font-medium">Google Rating</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════ STAT BAR ══════════════ */}
      <section ref={stats.ref} className="bg-gradient-to-r from-blue via-blue to-blue-light py-6">
        <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0 stagger-children ${stats.visible ? "visible" : ""}`}>
          {STATS.map((s, i) => (
            <div key={i} className={`text-center ${i < 3 ? "md:border-r md:border-white/20" : ""}`}>
              <p className="text-3xl sm:text-4xl font-extrabold text-white">{s.value}</p>
              <p className="text-sm text-white/80 font-medium mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════ PROCESS TIMELINE ══════════════ */}
      <section ref={process.ref} id="process" className="py-20 md:py-28 bg-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-16 fade-up ${process.visible ? "visible" : ""}`}>
            <span className="inline-block text-blue font-bold text-sm tracking-wider uppercase mb-3">How It Works</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-primary">
              Four Steps to{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue to-blue-light">Getting Back on the Road</span>
            </h2>
          </div>
          <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 stagger-children ${process.visible ? "visible" : ""}`}>
            {PROCESS.map((item, i) => (
              <div key={i} className="relative group">
                <div className="bg-white rounded-2xl p-8 text-center shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 relative z-10">
                  <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-blue/10 border-2 border-blue flex items-center justify-center">
                    <span className="text-2xl font-extrabold text-blue">{item.step}</span>
                  </div>
                  <h3 className="text-xl font-bold text-primary mb-2">{item.title}</h3>
                  <p className="text-text-light text-sm">{item.desc}</p>
                </div>
                {i < PROCESS.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -translate-y-1/2 left-[calc(100%-8px)] w-[calc(100%-56px)] z-0">
                    <div className="h-0.5 bg-gradient-to-r from-blue/40 to-blue-light/40 w-full" />
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-blue" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ SERVICES — NUMBERED FEATURE CARDS ══════════════ */}
      <section ref={services.ref} id="services" className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-16 fade-up ${services.visible ? "visible" : ""}`}>
            <span className="inline-block text-accent font-bold text-sm tracking-wider uppercase mb-3">What We Do</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-primary">
              Complete Auto Care,{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent-light">One Shop</span>
            </h2>
            <p className="text-text-light mt-4 max-w-2xl mx-auto text-lg">
              From routine maintenance to complex repairs, our ASE-certified mechanics handle it all with precision and care.
            </p>
          </div>
          <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 stagger-children ${services.visible ? "visible" : ""}`}>
            {SERVICES.map((svc) => (
              <div key={svc.num} className="group relative bg-white border border-gray-100 rounded-2xl p-6 sm:p-8 hover:shadow-xl hover:border-accent/20 transition-all duration-300 hover:-translate-y-1 overflow-hidden">
                <span className="absolute -top-3 -left-1 text-[80px] sm:text-[90px] font-extrabold text-primary/[0.04] leading-none select-none group-hover:text-accent/[0.08] transition-colors duration-300">{svc.num}</span>
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent to-blue scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                <div className="relative z-10">
                  <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-accent/10 text-accent font-bold text-sm mb-4 group-hover:bg-accent group-hover:text-white transition-all duration-300">{svc.num}</div>
                  <h3 className="text-lg font-bold text-primary mb-2 group-hover:text-accent transition-colors">{svc.title}</h3>
                  <p className="text-text-light text-sm leading-relaxed">{svc.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className={`text-center mt-12 fade-up ${services.visible ? "visible" : ""}`}>
            <a href={PHONE_HREF} className="inline-flex items-center gap-2 bg-accent hover:bg-accent-light text-white font-bold px-8 py-4 rounded-xl transition-all hover:shadow-xl hover:shadow-accent/25 hover:-translate-y-0.5 text-lg">
              <PhoneIcon />Schedule Your Service
            </a>
          </div>
        </div>
      </section>

      {/* ══════════════ ABOUT — SPLIT ══════════════ */}
      <section ref={about.ref} id="about" className="py-20 md:py-28 bg-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className={`fade-up ${about.visible ? "visible" : ""} relative`}>
              <div className="rounded-2xl overflow-hidden shadow-xl">
                <Image src="/images/mechanic.png" alt="Michael Berger, owner of Mechanix Express" width={600} height={500} className="w-full h-auto object-cover" />
              </div>
              <div className="absolute -bottom-6 -right-6 w-48 h-48 border-4 border-blue/20 rounded-2xl -z-10" />
              <div className="absolute -top-6 -left-6 w-32 h-32 bg-accent/10 rounded-full -z-10" />
            </div>
            <div className={`fade-up ${about.visible ? "visible" : ""}`} style={{ transitionDelay: "200ms" }}>
              <span className="inline-block text-blue font-bold text-sm tracking-wider uppercase mb-3">About Us</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-primary mb-6 leading-tight">
                Not Just Mechanics.{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue to-blue-light">Car People.</span>
              </h2>
              <p className="text-text-light text-lg leading-relaxed mb-6">
                Michael Berger founded Mechanix Express with a simple belief: auto repair should be honest, fast, and fair. After over a decade working on every make and model on the road, he built a shop where you&apos;re never sold something you don&apos;t need.
              </p>
              <p className="text-text-light text-lg leading-relaxed mb-8">
                We explain the problem, show you the evidence, give you a transparent quote, and get it done right. That&apos;s why our customers keep coming back &mdash; and why we have a perfect 5.0 Google rating.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 shrink-0 rounded-lg bg-accent/10 flex items-center justify-center">
                    <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  </div>
                  <div><p className="font-bold text-primary">ASE Certified</p><p className="text-sm text-text-light">Factory-trained techs</p></div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 shrink-0 rounded-lg bg-blue/10 flex items-center justify-center">
                    <svg className="w-5 h-5 text-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  </div>
                  <div><p className="font-bold text-primary">Same-Day Service</p><p className="text-sm text-text-light">Most repairs done today</p></div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 shrink-0 rounded-lg bg-accent/10 flex items-center justify-center">
                    <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                  </div>
                  <div><p className="font-bold text-primary">Fair Pricing</p><p className="text-sm text-text-light">No hidden fees ever</p></div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 shrink-0 rounded-lg bg-blue/10 flex items-center justify-center">
                    <svg className="w-5 h-5 text-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                  </div>
                  <div><p className="font-bold text-primary">12-Mo Warranty</p><p className="text-sm text-text-light">Parts &amp; labor covered</p></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════ TESTIMONIALS — inline-with-stars ══════════════ */}
      <section ref={testimonials.ref} id="reviews" className="py-20 md:py-28 bg-primary relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/5 rounded-full translate-y-1/2 -translate-x-1/2" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className={`text-center mb-16 fade-up ${testimonials.visible ? "visible" : ""}`}>
            <span className="inline-block text-blue-light font-bold text-sm tracking-wider uppercase mb-3">Customer Reviews</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white">Don&apos;t Take Our Word for It</h2>
          </div>
          <div className={`space-y-8 max-w-4xl mx-auto stagger-children ${testimonials.visible ? "visible" : ""}`}>
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-start">
                <div className="w-14 h-14 shrink-0 rounded-full bg-gradient-to-br from-accent to-blue flex items-center justify-center text-white font-bold text-xl">{t.name.charAt(0)}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-bold text-white text-lg">{t.name}</span>
                    <Stars count={t.rating} />
                  </div>
                  <p className="text-white/70 text-base leading-relaxed italic">&ldquo;{t.text}&rdquo;</p>
                  {i < TESTIMONIALS.length - 1 && <div className="mt-8 h-px bg-white/10" />}
                </div>
              </div>
            ))}
          </div>
          <div className={`text-center mt-12 fade-up ${testimonials.visible ? "visible" : ""}`}>
            <div className="inline-flex items-center gap-3 bg-white/10 border border-white/10 rounded-full px-6 py-3">
              <Stars count={5} />
              <span className="text-white font-semibold">5.0 on Google</span>
              <span className="text-white/50">|</span>
              <span className="text-white/70 text-sm">12+ Verified Reviews</span>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════ FAQ ACCORDION ══════════════ */}
      <section ref={faqSec.ref} id="faq" className="py-20 md:py-28 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-12 fade-up ${faqSec.visible ? "visible" : ""}`}>
            <span className="inline-block text-accent font-bold text-sm tracking-wider uppercase mb-3">FAQ</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-primary">Common Questions</h2>
          </div>
          <div className={`fade-up ${faqSec.visible ? "visible" : ""}`} style={{ transitionDelay: "150ms" }}>
            {FAQS.map((item, i) => <FaqItem key={i} q={item.q} a={item.a} />)}
          </div>
        </div>
      </section>

      {/* ══════════════ CTA ══════════════ */}
      <section ref={ctaSec.ref} className="py-20 md:py-28 bg-gradient-to-br from-primary via-primary-light to-primary relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-blue/5" />
          <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-accent/5" />
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className={`fade-up ${ctaSec.visible ? "visible" : ""}`}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-6">
              Ready to Get Your Car{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent-light">Running Right?</span>
            </h2>
            <p className="text-xl text-white/70 mb-10 max-w-2xl mx-auto">
              Call now for a free estimate. Most repairs done same-day. No appointment needed for oil changes and inspections.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={PHONE_HREF} className="inline-flex items-center justify-center gap-3 bg-accent hover:bg-accent-light text-white font-bold text-xl px-10 py-5 rounded-xl transition-all hover:shadow-xl hover:shadow-accent/30 hover:-translate-y-0.5">
                <PhoneIcon className="w-6 h-6" />{PHONE}
              </a>
              <a href={MAP_LINK} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 border-2 border-white/20 hover:border-blue text-white font-semibold text-lg px-8 py-5 rounded-xl transition-all hover:bg-white/5">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                Get Directions
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════ FOOTER ══════════════ */}
      <footer className="bg-primary border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
            <div>
              <Image src="/images/logo.png" alt="Mechanix Express" width={160} height={42} className="h-10 w-auto mb-4" />
              <p className="text-white/60 text-sm leading-relaxed max-w-xs">Lakewood&apos;s trusted auto repair shop. Honest service, expert mechanics, fair prices.</p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2.5">
                {NAV_LINKS.map((l) => (
                  <li key={l.href}><a href={l.href} className="text-white/60 hover:text-white text-sm transition-colors">{l.label}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Contact</h4>
              <ul className="space-y-3">
                <li><a href={PHONE_HREF} className="flex items-center gap-2 text-white/60 hover:text-accent text-sm transition-colors"><PhoneIcon className="w-4 h-4 shrink-0" />{PHONE}</a></li>
                <li><a href={MAP_LINK} target="_blank" rel="noopener noreferrer" className="flex items-start gap-2 text-white/60 hover:text-blue text-sm transition-colors"><svg className="w-4 h-4 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>{ADDRESS}</a></li>
                <li className="flex items-center gap-2 text-white/60 text-sm"><svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>{HOURS}</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 mt-10 pt-8 text-center">
            <p className="text-white/40 text-sm">
              &copy; {new Date().getFullYear()} Mechanix Express. All rights reserved. | Website by{" "}
              <a href="https://maivenai.com" target="_blank" rel="noopener noreferrer" className="text-blue-light hover:text-white transition-colors">Maiven</a>
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
