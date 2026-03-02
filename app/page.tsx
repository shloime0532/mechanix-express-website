"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

/* ─── CONSTANTS ─── */
const PHONE = "(855) 946-2923";
const PHONE_HREF = "tel:+18559462923";
const ADDRESS = "100 Madison Avenue, Lakewood, NJ 08701";
const HOURS = "Mon\u2013Fri 8AM\u20136PM";
const MAP_LINK =
  "https://www.google.com/maps/search/?api=1&query=Mechanix+Express+100+Madison+Avenue+Lakewood+NJ+08701";

/* ─── INTERSECTION OBSERVER HOOK ─── */
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
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

/* ─── ICONS ─── */
function PhoneIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
  );
}

function Stars({ count = 5 }: { count?: number }) {
  return (
    <span className="inline-flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </span>
  );
}

/* ─── DATA ─── */
const NAV_LINKS = [
  { label: "How It Works", href: "#process" },
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Reviews", href: "#reviews" },
];

const PROCESS = [
  { step: 1, title: "Book Online or Call", desc: "Schedule your visit by phone or just drive in" },
  { step: 2, title: "Drop Off Your Vehicle", desc: "Convenient drop-off, free Wi-Fi in waiting area" },
  { step: 3, title: "Complete Diagnostic Scan", desc: "Advanced equipment pinpoints the exact issue" },
  { step: 4, title: "Expert Repair & Parts", desc: "Quality parts, clear quote before work begins" },
  { step: 5, title: "Quality Check & Pickup", desc: "Every repair passes our quality inspection" },
];

const SERVICES = [
  { num: "01", title: "Engine Diagnostics & Repair", desc: "Advanced computer diagnostics to pinpoint issues fast. Complete engine repair and performance tuning for all makes and models." },
  { num: "02", title: "Brake System Service", desc: "Pad replacement, rotor resurfacing, brake fluid flush, and complete brake system inspection. Your safety is non-negotiable." },
  { num: "03", title: "Transmission Service", desc: "Fluid changes, rebuilds, and complete transmission service. We handle automatic and manual transmissions with precision." },
  { num: "04", title: "Electrical & Battery", desc: "Battery testing, alternator repair, starter replacement, and full electrical system diagnostics for modern vehicles." },
  { num: "05", title: "Preventive Maintenance", desc: "Oil changes, filter replacements, fluid flushes, tire rotations, and scheduled maintenance to keep your engine running smooth." },
  { num: "06", title: "State Inspection & Emissions", desc: "Fast, hassle-free NJ state vehicle inspection and emissions testing. Pass or we fix it \u2014 drive in, drive out." },
];

const STATS = [
  { value: "10+", label: "Years Experience" },
  { value: "1,000+", label: "Cars Repaired" },
  { value: "5.0", label: "Google Rating" },
  { value: "ASE", label: "Certified Techs" },
];

const TESTIMONIALS = [
  { name: "David K.", text: "Best mechanic in Lakewood, hands down. They diagnosed a problem two other shops missed. Fair prices and they explained everything clearly before starting work.", rating: 5 },
  { name: "Sarah M.", text: "Quick and reliable service! Brought my Honda in for a weird noise and they had it fixed same day. The transparent quoting process means no surprises on the bill.", rating: 5 },
  { name: "Yosef R.", text: "Really nice and helpful staff. I love everything about this place \u2014 the service, the professionalism, the speed. Been bringing all my family cars here for years.", rating: 5 },
  { name: "Rachel P.", text: "Brought my car in for an oil change and they caught a brake issue I didn\u2019t know about. Saved me from a dangerous situation. Trust these guys completely.", rating: 5 },
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  const hero = useInView(0.1);
  const process = useInView(0.1);
  const services = useInView(0.1);
  const statsSec = useInView(0.2);
  const about = useInView(0.15);
  const testimonials = useInView(0.1);
  const ctaSec = useInView(0.2);

  return (
    <main className="overflow-x-hidden">
      {/* NAV (dark-solid) */}
      <nav className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? "bg-primary/95 backdrop-blur-md shadow-lg" : "bg-primary"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-[72px]">
          <a href="#" className="shrink-0">
            <Image src="/images/logo.png" alt="Mechanix Express" width={180} height={48} className="h-10 sm:h-12 w-auto" priority />
          </a>
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((l) => (
              <a key={l.href} href={l.href} className="text-sm font-medium text-white/80 hover:text-white transition-colors">{l.label}</a>
            ))}
            <a href={PHONE_HREF} className="inline-flex items-center gap-2 bg-blue hover:bg-blue-light text-white font-semibold text-sm px-5 py-2.5 rounded-lg transition-all hover:shadow-lg hover:shadow-blue/25">
              <PhoneIcon className="w-4 h-4" />{PHONE}
            </a>
          </div>
          <div className="flex md:hidden items-center gap-3">
            <a href={PHONE_HREF} className="inline-flex items-center justify-center w-10 h-10 bg-blue rounded-lg text-white">
              <PhoneIcon className="w-5 h-5" />
            </a>
            <button className="text-white p-1" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {menuOpen
                  ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
              </svg>
            </button>
          </div>
        </div>
        <div className={`md:hidden overflow-hidden transition-all duration-300 bg-primary ${menuOpen ? "max-h-96 border-t border-white/10" : "max-h-0"}`}>
          <div className="px-4 py-4 space-y-3">
            {NAV_LINKS.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)} className="block text-white/80 hover:text-white font-medium py-2 transition-colors">{l.label}</a>
            ))}
            <a href={PHONE_HREF} className="flex items-center justify-center gap-2 bg-blue text-white font-semibold px-5 py-3 rounded-lg mt-2">
              <PhoneIcon className="w-4 h-4" />Call {PHONE}
            </a>
          </div>
        </div>
      </nav>

      {/* HERO SPLIT */}
      <section ref={hero.ref} className="pt-[72px] bg-primary min-h-[90vh] md:min-h-[85vh] flex items-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "linear-gradient(rgba(14,165,233,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(14,165,233,0.3) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center py-12 md:py-0">
            <div className={`fade-up ${hero.visible ? "visible" : ""}`} style={{ transitionDelay: "100ms" }}>
              <div className="inline-flex items-center gap-2 bg-blue/10 border border-blue/20 rounded-full px-4 py-1.5 mb-6">
                <span className="w-2 h-2 rounded-full bg-blue animate-pulse" />
                <span className="text-blue-light text-sm font-medium">5-Star Rated in Lakewood, NJ</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-[1.1] mb-6">
                Expert Diagnostics.{" "}
                <span className="text-blue-light">Fast Turnaround.</span>
              </h1>
              <p className="text-lg sm:text-xl text-white/70 leading-relaxed mb-8 max-w-lg">
                From diagnostic scan to quality-checked repair, our certified mechanics
                follow a proven 5-step process to get you back on the road right.
                Transparent pricing. No surprises.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href={PHONE_HREF} className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent-light text-white font-bold text-lg px-8 py-4 rounded-xl transition-all hover:shadow-xl hover:shadow-accent/30 hover:-translate-y-0.5">
                  <PhoneIcon />Call Now
                </a>
                <a href="#process" className="inline-flex items-center justify-center gap-2 border-2 border-blue/30 text-blue-light hover:border-blue/50 hover:text-white font-semibold text-lg px-8 py-4 rounded-xl transition-all">
                  See Our Process
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </a>
              </div>
              <div className="mt-8 flex items-center gap-6 text-white/50 text-sm">
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  <span>Lakewood, NJ</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  <span>{HOURS}</span>
                </div>
              </div>
            </div>
            <div className={`fade-up ${hero.visible ? "visible" : ""} relative`} style={{ transitionDelay: "300ms" }}>
              <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-black/30">
                <Image src="/images/hero.png" alt="Mechanic using diagnostic equipment at Mechanix Express" width={700} height={500} className="w-full h-auto object-cover" priority />
                <div className="absolute top-0 right-0 w-20 h-20">
                  <div className="absolute top-0 right-0 w-full h-full bg-blue/20 backdrop-blur-sm" style={{ clipPath: "polygon(100% 0, 0 0, 100% 100%)" }} />
                </div>
              </div>
              <div className="absolute -bottom-4 -left-4 sm:bottom-4 sm:-left-6 bg-white rounded-xl shadow-xl p-4 flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-blue/10 flex items-center justify-center">
                  <svg className="w-6 h-6 text-blue" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                </div>
                <div>
                  <p className="text-2xl font-extrabold text-primary">5.0</p>
                  <p className="text-xs text-text-light font-medium">12+ Verified Reviews</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROCESS TIMELINE - 5 Steps (LEAD SECTION) */}
      <section ref={process.ref} id="process" className="py-20 md:py-28 bg-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-16 fade-up ${process.visible ? "visible" : ""}`}>
            <span className="inline-block text-blue font-bold text-sm tracking-wider uppercase mb-3">Our Proven Process</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-primary">
              Your Repair, <span className="text-blue">Step by Step</span>
            </h2>
            <p className="mt-4 text-text-light text-base sm:text-lg max-w-2xl mx-auto">
              From the moment you contact us to the second you drive away,
              we keep every step simple, transparent, and fast.
            </p>
          </div>
          <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-4 stagger-children ${process.visible ? "visible" : ""}`}>
            {PROCESS.map((item, i) => (
              <div key={i} className="relative group">
                <div className="bg-white rounded-2xl p-6 lg:p-5 text-center shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 relative z-10">
                  <div className="w-14 h-14 lg:w-16 lg:h-16 mx-auto mb-4 rounded-full bg-white border-[3px] border-blue shadow-lg shadow-blue/20 flex items-center justify-center">
                    <span className="text-xl lg:text-2xl font-black text-blue">{item.step}</span>
                  </div>
                  <h3 className="text-lg font-bold text-primary mb-2">{item.title}</h3>
                  <p className="text-text-light text-sm leading-relaxed">{item.desc}</p>
                </div>
                {i < PROCESS.length - 1 && (
                  <div className="hidden lg:block absolute top-[52px] left-[calc(100%-4px)] w-[calc(100%-48px)] z-0">
                    <div className="h-[3px] bg-gradient-to-r from-blue/40 to-blue-light/40 w-full" />
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-blue" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES - NUMBERED FEATURE CARDS (SIGNATURE) */}
      <section ref={services.ref} id="services" className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-16 fade-up ${services.visible ? "visible" : ""}`}>
            <span className="inline-block text-accent font-bold text-sm tracking-wider uppercase mb-3">What We Do</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-primary">
              Complete Auto <span className="text-accent">Services</span>
            </h2>
            <p className="text-text-light mt-4 max-w-2xl mx-auto text-lg">
              From routine maintenance to complex repairs, our certified
              technicians handle it all with precision and care.
            </p>
          </div>
          <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 stagger-children ${services.visible ? "visible" : ""}`}>
            {SERVICES.map((svc) => (
              <div key={svc.num} className="number-card bg-light rounded-2xl p-6 sm:p-8 border border-gray-100">
                <span className="card-number">{svc.num}</span>
                <div className="card-border" />
                <div className="relative z-10">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-blue/10 text-blue font-black text-xl mb-4">
                    {svc.num}
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-primary mb-2">{svc.title}</h3>
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

      {/* STAT BAR */}
      <section ref={statsSec.ref} className="bg-primary py-12 sm:py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "linear-gradient(rgba(14,165,233,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(14,165,233,0.4) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
        <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid grid-cols-2 lg:grid-cols-4 gap-8 stagger-children ${statsSec.visible ? "visible" : ""}`}>
          {STATS.map((s, i) => (
            <div key={i} className="text-center">
              <p className="text-3xl sm:text-4xl lg:text-5xl font-black text-blue">{s.value}</p>
              <p className="mt-1 text-sm sm:text-base text-white/60 font-medium">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ABOUT - Split Layout */}
      <section ref={about.ref} id="about" className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className={`fade-up ${about.visible ? "visible" : ""} relative`}>
              <div className="rounded-2xl overflow-hidden shadow-xl">
                <Image src="/images/about.png" alt="Mechanix Express clean, organized shop interior" width={600} height={500} className="w-full h-auto object-cover" />
              </div>
              <div className="absolute -bottom-4 -right-4 w-32 h-32">
                <div className="w-full h-full border-4 border-blue/20 rounded-2xl" />
              </div>
            </div>
            <div className={`fade-up ${about.visible ? "visible" : ""}`} style={{ transitionDelay: "200ms" }}>
              <span className="inline-block text-blue font-bold text-sm tracking-wider uppercase mb-3">About Us</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-primary mb-6 leading-tight">
                Lakewood&apos;s Trusted{" "}
                <span className="text-blue">Auto Experts</span>
              </h2>
              <p className="text-text-light text-lg leading-relaxed mb-6">
                Mechanix Express was built on a simple idea: auto repair shouldn&apos;t be stressful. Our shop at 100 Madison Avenue has become a trusted name in Lakewood&apos;s automotive community through honest work, transparent pricing, and genuine care for every customer.
              </p>
              <p className="text-text-light text-lg leading-relaxed mb-8">
                We handle every make and model with the same precision &mdash; from Honda and Toyota to Hyundai and Nissan. Every repair comes with a clear explanation, an upfront quote, and our promise to do the job right the first time.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 shrink-0 rounded-lg bg-blue/10 flex items-center justify-center">
                    <svg className="w-5 h-5 text-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  </div>
                  <div><p className="font-bold text-primary">ASE Certified</p><p className="text-sm text-text-light">Factory-trained techs</p></div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 shrink-0 rounded-lg bg-accent/10 flex items-center justify-center">
                    <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  </div>
                  <div><p className="font-bold text-primary">Same-Day Service</p><p className="text-sm text-text-light">Most repairs done today</p></div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 shrink-0 rounded-lg bg-blue/10 flex items-center justify-center">
                    <svg className="w-5 h-5 text-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                  </div>
                  <div><p className="font-bold text-primary">Fair Pricing</p><p className="text-sm text-text-light">No hidden fees ever</p></div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 shrink-0 rounded-lg bg-accent/10 flex items-center justify-center">
                    <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                  </div>
                  <div><p className="font-bold text-primary">12-Mo Warranty</p><p className="text-sm text-text-light">Parts &amp; labor covered</p></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section ref={testimonials.ref} id="reviews" className="py-20 md:py-28 bg-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-16 fade-up ${testimonials.visible ? "visible" : ""}`}>
            <span className="inline-block text-accent font-bold text-sm tracking-wider uppercase mb-3">Customer Reviews</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-primary">
              What People <span className="text-accent">Are Saying</span>
            </h2>
          </div>
          <div className={`grid sm:grid-cols-2 lg:grid-cols-4 gap-6 stagger-children ${testimonials.visible ? "visible" : ""}`}>
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300">
                <Stars count={t.rating} />
                <p className="text-text-light text-sm leading-relaxed my-4">&ldquo;{t.text}&rdquo;</p>
                <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue to-accent flex items-center justify-center text-white font-bold text-sm">{t.name[0]}</div>
                  <div>
                    <p className="font-bold text-primary text-sm">{t.name}</p>
                    <p className="text-xs text-text-light">Verified Customer</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className={`text-center mt-10 fade-up ${testimonials.visible ? "visible" : ""}`}>
            <div className="inline-flex items-center gap-3 bg-white border border-gray-200 rounded-full px-6 py-3 shadow-sm">
              <Stars count={5} />
              <span className="font-semibold text-primary">5.0 on Google</span>
              <span className="text-gray-300">|</span>
              <span className="text-text-light text-sm">12+ Verified Reviews</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section ref={ctaSec.ref} className="py-20 md:py-28 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "linear-gradient(rgba(14,165,233,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(14,165,233,0.4) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-blue/5 rounded-full blur-3xl" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className={`fade-up ${ctaSec.visible ? "visible" : ""}`}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-6">
              Ready to Get Your Car{" "}
              <span className="text-accent">Fixed Right?</span>
            </h2>
            <p className="text-xl text-white/70 mb-10 max-w-2xl mx-auto">
              Don&apos;t wait for that small problem to become a big one. Call
              Mechanix Express today for fast, honest, expert auto repair.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={PHONE_HREF} className="inline-flex items-center justify-center gap-3 bg-accent hover:bg-accent-light text-white font-bold text-xl px-10 py-5 rounded-xl transition-all hover:shadow-xl hover:shadow-accent/30 hover:-translate-y-0.5">
                <PhoneIcon className="w-6 h-6" />{PHONE}
              </a>
              <a href={MAP_LINK} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 border-2 border-blue/30 text-blue-light hover:border-blue/50 hover:text-white font-semibold text-lg px-8 py-5 rounded-xl transition-all">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                Get Directions
              </a>
            </div>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-white/40">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                {ADDRESS}
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                {HOURS}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#0D0D1A] py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="sm:col-span-2 lg:col-span-1">
              <Image src="/images/logo.png" alt="Mechanix Express" width={160} height={40} className="h-8 w-auto brightness-0 invert mb-4" />
              <p className="text-white/40 text-sm leading-relaxed">Expert auto repair in Lakewood, NJ. Fast service, fair prices, and repairs done right the first time.</p>
            </div>
            <div>
              <h4 className="text-white font-bold text-sm mb-4">Quick Links</h4>
              <ul className="space-y-2">
                {NAV_LINKS.map((l) => (
                  <li key={l.href}><a href={l.href} className="text-white/40 hover:text-blue-light text-sm transition-colors">{l.label}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold text-sm mb-4">Services</h4>
              <ul className="space-y-2">
                {SERVICES.map((s) => (
                  <li key={s.num}><span className="text-white/40 text-sm">{s.title}</span></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold text-sm mb-4">Contact</h4>
              <ul className="space-y-3">
                <li><a href={PHONE_HREF} className="flex items-center gap-2 text-blue hover:text-blue-light text-sm font-semibold transition-colors"><PhoneIcon className="w-4 h-4" />{PHONE}</a></li>
                <li><a href={MAP_LINK} target="_blank" rel="noopener noreferrer" className="flex items-start gap-2 text-white/40 hover:text-white text-sm transition-colors"><svg className="w-4 h-4 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>{ADDRESS}</a></li>
                <li className="flex items-center gap-2 text-white/40 text-sm"><svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>{HOURS}</li>
              </ul>
            </div>
          </div>
          <div className="mt-10 pt-8 border-t border-white/10 text-center">
            <p className="text-white/30 text-sm">
              &copy; {new Date().getFullYear()} Mechanix Express. All rights reserved. | Website by{" "}
              <a href="https://maivenai.com" target="_blank" rel="noopener noreferrer" className="text-blue-light hover:text-white transition-colors">Maiven</a>
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
