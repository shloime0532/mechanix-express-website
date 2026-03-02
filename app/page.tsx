"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const PHONE = "(855) 946-2923";
const PHONE_HREF = "tel:+18559462923";
const ADDRESS = "100 Madison Avenue, Lakewood, NJ 08701";
const HOURS = "Mon\u2013Thu 9AM\u20136PM | Fri 9AM\u20131PM";
const MAP_LINK =
  "https://www.google.com/maps/search/?api=1&query=Mechanix+Express+100+Madison+Avenue+Lakewood+NJ+08701";

function PhoneIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
  );
}

function MapPinIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
}

function ClockIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

function StarIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 20 20">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );
}

const processSteps = [
  { num: "01", title: "Call Ahead or Drop Off", desc: "Schedule your visit or simply drive in. We offer flexible drop-off service so your car gets fixed on your timeline, not ours." },
  { num: "02", title: "Expert Diagnosis", desc: "Our certified mechanics use advanced diagnostic equipment to pinpoint the exact issue. No guesswork, just precision." },
  { num: "03", title: "Transparent Quote", desc: "You get a clear, upfront price before any work begins. No hidden fees, no surprises. You approve every dollar." },
  { num: "04", title: "Quality Repair", desc: "Done right the first time with quality parts and skilled hands. We stand behind every repair with our satisfaction guarantee." },
];

const services = [
  { name: "Engine Repair", desc: "Complete engine diagnostics, repair, and rebuilds for all makes and models.", icon: "M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" },
  { name: "Brake Service", desc: "Pad replacement, rotor resurfacing, brake fluid flush, and complete brake system repair.", icon: "M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" },
  { name: "Transmission", desc: "Fluid changes, rebuilds, and complete transmission replacement. Manual and automatic.", icon: "M6 13.5V3.75m0 9.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 3.75V16.5m12-3V3.75m0 9.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 3.75V16.5m-6-9V3.75m0 3.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 9.75V10.5" },
  { name: "AC & Heating", desc: "Climate control diagnostics, refrigerant recharge, compressor replacement, and heater repair.", icon: "M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" },
  { name: "Electrical", desc: "Battery testing, alternator repair, starter replacement, and full electrical system diagnostics.", icon: "M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" },
  { name: "Oil Change & Maintenance", desc: "Synthetic and conventional oil changes, filter replacements, and scheduled maintenance.", icon: "M11.42 15.17l-5.1-5.1a2.25 2.25 0 010-3.182l.708-.708a2.25 2.25 0 013.182 0l.707.707 5.102-5.102a2.25 2.25 0 013.182 0l.707.707a2.25 2.25 0 010 3.182L14.8 10.77M11.42 15.17l2.121-2.121m-2.121 2.121l-5.303 5.303a2.25 2.25 0 01-3.182 0l-.707-.707a2.25 2.25 0 010-3.182L7.12 12.07m4.3 3.1l5.303-5.303" },
];

const stats = [
  { value: "5.0", label: "Google Rating" },
  { value: "1000+", label: "Cars Repaired" },
  { value: "12+", label: "Verified Reviews" },
  { value: "Same-Day", label: "Service Available" },
];

const testimonials = [
  { name: "David K.", text: "Best mechanic in Lakewood, hands down. They diagnosed a problem two other shops missed. Fair prices and they explained everything clearly before starting work.", rating: 5 },
  { name: "Sarah M.", text: "Fast, reliable, and honest. Brought my Honda in for a weird noise and they had it fixed same day. The transparent quoting process is refreshing -- no surprises on the bill.", rating: 5 },
  { name: "Yosef R.", text: "I've been bringing all my family's cars here for years. They treat you like family. The express service is a game-changer when you need your car back fast.", rating: 5 },
];

const navLinks = [
  { href: "#process", label: "How It Works" },
  { href: "#services", label: "Services" },
  { href: "#about", label: "About" },
  { href: "#reviews", label: "Reviews" },
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* NAV */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-primary/95 shadow-lg backdrop-blur-sm" : "bg-primary"}`}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 sm:h-20 items-center justify-between">
            <a href="#" className="flex items-center shrink-0">
              <Image src="/images/logo-white.png" alt="Mechanix Express" width={180} height={45} className="h-9 sm:h-11 w-auto" priority />
            </a>
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <a key={link.href} href={link.href} className="text-sm font-medium text-white/80 hover:text-white transition-colors">{link.label}</a>
              ))}
              <a href={PHONE_HREF} className="inline-flex items-center gap-2 bg-accent hover:bg-accent-light text-white font-bold text-sm px-5 py-2.5 rounded-lg transition-all hover:scale-105">
                <PhoneIcon className="w-4 h-4" />{PHONE}
              </a>
            </div>
            <div className="flex md:hidden items-center gap-3">
              <a href={PHONE_HREF} className="inline-flex items-center justify-center w-10 h-10 bg-accent rounded-lg text-white">
                <PhoneIcon className="w-5 h-5" />
              </a>
              <button onClick={() => setMenuOpen(!menuOpen)} className="text-white p-1" aria-label="Toggle menu">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  {menuOpen
                    ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    : <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />}
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div className={`md:hidden overflow-hidden transition-all duration-300 ${menuOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"}`}>
          <div className="px-4 pb-4 space-y-1 bg-primary border-t border-white/10">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} onClick={() => setMenuOpen(false)} className="block py-3 text-white/80 hover:text-white font-medium text-sm">{link.label}</a>
            ))}
            <a href={PHONE_HREF} className="block py-3 text-accent font-bold text-sm">Call {PHONE}</a>
          </div>
        </div>
      </nav>

      <main>
        {/* HERO */}
        <section className="relative bg-primary min-h-[90vh] sm:min-h-screen flex items-center pt-16 sm:pt-20 overflow-hidden">
          <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)", backgroundSize: "40px 40px" }} />
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-20 w-full relative z-10">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
              <div className="order-2 lg:order-1">
                <div className="inline-flex items-center gap-2 bg-accent/20 border border-accent/30 text-accent-light text-xs sm:text-sm font-semibold px-4 py-1.5 rounded-full mb-6">
                  <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                  5-Star Rated in Lakewood, NJ
                </div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight tracking-tight">
                  Expert Auto Repair,{" "}
                  <span className="text-accent">Express Service</span>
                </h1>
                <p className="mt-5 sm:mt-6 text-base sm:text-lg text-white/70 leading-relaxed max-w-lg">
                  Fast, honest, and reliable auto repair by certified mechanics.
                  Same-day service available. Specializing in Honda, Hyundai, Kia,
                  Nissan & Toyota.
                </p>
                <div className="mt-8 flex flex-col sm:flex-row gap-4">
                  <a href={PHONE_HREF} className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent-light text-white font-bold text-base sm:text-lg px-8 py-4 rounded-xl transition-all hover:scale-105 shadow-lg shadow-accent/30">
                    <PhoneIcon className="w-5 h-5" />Call Now
                  </a>
                  <a href="#process" className="inline-flex items-center justify-center gap-2 border-2 border-white/20 text-white hover:border-white/40 font-semibold text-base px-8 py-4 rounded-xl transition-all">
                    How It Works
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                  </a>
                </div>
                <div className="mt-8 flex items-center gap-6 text-white/50 text-sm">
                  <div className="flex items-center gap-2"><MapPinIcon className="w-4 h-4" /><span>Lakewood, NJ</span></div>
                  <div className="flex items-center gap-2"><ClockIcon className="w-4 h-4" /><span>Mon-Thu 9-6</span></div>
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-black/40">
                  <Image src="/images/hero.png" alt="Mechanix Express auto repair shop" width={800} height={500} className="w-full h-[250px] sm:h-[350px] lg:h-[450px] object-cover" priority />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm rounded-xl px-4 py-3 shadow-lg">
                    <div className="flex items-center gap-1 mb-0.5">
                      {[...Array(5)].map((_, i) => (<StarIcon key={i} className="w-4 h-4 text-amber-400" />))}
                    </div>
                    <p className="text-xs font-semibold text-primary">5.0 / 5 from 12+ Reviews</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* NUMBERED PROCESS CARDS (SIGNATURE) */}
        <section id="process" className="py-16 sm:py-24 bg-light">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 sm:mb-16">
              <p className="text-accent font-bold text-sm uppercase tracking-widest mb-3">How It Works</p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-primary">
                Your Repair, <span className="text-accent">Step by Step</span>
              </h2>
              <p className="mt-4 text-text-light text-base sm:text-lg max-w-2xl mx-auto">
                From the moment you contact us to the second you drive away, we keep the process simple, transparent, and fast.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 gap-6 lg:gap-8">
              {processSteps.map((step) => (
                <div key={step.num} className="group relative bg-white rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1 border border-gray-100 overflow-hidden">
                  <span className="absolute -top-2 -right-2 text-[120px] sm:text-[140px] font-black text-primary/[0.03] leading-none select-none pointer-events-none">{step.num}</span>
                  <div className="relative z-10">
                    <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-accent/10 mb-5">
                      <span className="text-2xl sm:text-3xl font-black text-accent">{step.num}</span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-primary mb-3">{step.title}</h3>
                    <p className="text-text-light text-sm sm:text-base leading-relaxed">{step.desc}</p>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-accent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SERVICES */}
        <section id="services" className="py-16 sm:py-24 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 sm:mb-16">
              <p className="text-accent font-bold text-sm uppercase tracking-widest mb-3">What We Do</p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-primary">
                Complete Auto <span className="text-accent">Services</span>
              </h2>
              <p className="mt-4 text-text-light text-base sm:text-lg max-w-2xl mx-auto">
                From routine maintenance to major repairs, our certified technicians handle it all with precision and care.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((svc) => (
                <div key={svc.name} className="group bg-light rounded-2xl p-6 sm:p-8 hover:bg-primary transition-all duration-500 border border-gray-100 hover:border-primary">
                  <svg className="w-10 h-10 text-accent mb-4 group-hover:text-accent-light transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d={svc.icon} />
                    {svc.name === "Engine Repair" && <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />}
                  </svg>
                  <h3 className="text-lg sm:text-xl font-bold text-primary group-hover:text-white mb-2 transition-colors">{svc.name}</h3>
                  <p className="text-sm text-text-light group-hover:text-white/70 leading-relaxed transition-colors">{svc.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* STAT BAR */}
        <section className="bg-primary py-12 sm:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="text-3xl sm:text-4xl lg:text-5xl font-black text-accent">{stat.value}</p>
                  <p className="mt-1 text-sm sm:text-base text-white/60 font-medium">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ABOUT */}
        <section id="about" className="py-16 sm:py-24 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
              <div className="relative rounded-2xl overflow-hidden">
                <Image src="/images/team.png" alt="Mechanix Express team" width={700} height={500} className="w-full h-[300px] sm:h-[400px] lg:h-[480px] object-cover rounded-2xl" />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/40 via-transparent to-transparent rounded-2xl" />
              </div>
              <div>
                <p className="text-accent font-bold text-sm uppercase tracking-widest mb-3">About Us</p>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-primary leading-tight">
                  Lakewood&apos;s Trusted <span className="text-accent">Auto Experts</span>
                </h2>
                <div className="mt-6 space-y-4 text-text-light text-base leading-relaxed">
                  <p>Mechanix Express was built on a simple idea: auto repair shouldn&apos;t be stressful. Founded by Michael Berger, our shop at 100 Madison Avenue has become a trusted name in Lakewood&apos;s automotive community.</p>
                  <p>We specialize in Honda, Hyundai, Kia, Nissan, and Toyota vehicles, but our experienced technicians are equipped to handle any make or model. Every repair comes with a clear explanation, an upfront quote, and our promise to do the job right the first time.</p>
                  <p>With 5-star reviews across the board and a reputation for honest, fast work, we&apos;re not just fixing cars -- we&apos;re earning trust, one repair at a time.</p>
                </div>
                <div className="mt-8 grid grid-cols-2 gap-4">
                  <div className="bg-light rounded-xl p-4">
                    <p className="text-2xl font-black text-accent">5.0</p>
                    <p className="text-sm text-text-light font-medium">Star Rating</p>
                  </div>
                  <div className="bg-light rounded-xl p-4">
                    <p className="text-2xl font-black text-accent">Free</p>
                    <p className="text-sm text-text-light font-medium">Wi-Fi Available</p>
                  </div>
                </div>
                <a href={PHONE_HREF} className="mt-8 inline-flex items-center gap-2 bg-accent hover:bg-accent-light text-white font-bold px-8 py-4 rounded-xl transition-all hover:scale-105 shadow-lg shadow-accent/20">
                  <PhoneIcon className="w-5 h-5" />Schedule Your Visit
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section id="reviews" className="py-16 sm:py-24 bg-light">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 sm:mb-16">
              <p className="text-accent font-bold text-sm uppercase tracking-widest mb-3">Customer Reviews</p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-primary">
                What People <span className="text-accent">Are Saying</span>
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {testimonials.map((t) => (
                <div key={t.name} className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(t.rating)].map((_, j) => (<StarIcon key={j} className="w-5 h-5 text-amber-400" />))}
                  </div>
                  <p className="text-text-light text-sm sm:text-base leading-relaxed mb-6">&ldquo;{t.text}&rdquo;</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold text-sm">{t.name[0]}</div>
                    <div>
                      <p className="font-bold text-primary text-sm">{t.name}</p>
                      <p className="text-xs text-text-light">Verified Customer</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="relative py-16 sm:py-24 bg-primary overflow-hidden">
          <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)", backgroundSize: "40px 40px" }} />
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight">
              Ready to Get Your Car <span className="text-accent">Fixed Right?</span>
            </h2>
            <p className="mt-5 text-lg text-white/60 max-w-2xl mx-auto">
              Don&apos;t wait for that small problem to become a big one. Call Mechanix Express today for fast, honest, expert auto repair.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <a href={PHONE_HREF} className="inline-flex items-center justify-center gap-3 bg-accent hover:bg-accent-light text-white font-bold text-lg px-10 py-5 rounded-xl transition-all hover:scale-105 shadow-lg shadow-accent/30">
                <PhoneIcon className="w-6 h-6" />{PHONE}
              </a>
              <a href={MAP_LINK} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 border-2 border-white/20 text-white hover:border-white/40 font-semibold text-lg px-10 py-5 rounded-xl transition-all">
                <MapPinIcon className="w-5 h-5" />Get Directions
              </a>
            </div>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-white/40">
              <div className="flex items-center gap-2"><MapPinIcon className="w-4 h-4" />{ADDRESS}</div>
              <div className="flex items-center gap-2"><ClockIcon className="w-4 h-4" />{HOURS}</div>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="bg-[#0D0D1A] py-12 sm:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="sm:col-span-2 lg:col-span-1">
                <Image src="/images/logo-white.png" alt="Mechanix Express" width={160} height={40} className="h-8 w-auto mb-4" />
                <p className="text-white/40 text-sm leading-relaxed">Expert auto repair in Lakewood, NJ. Fast service, fair prices, and repairs done right the first time.</p>
              </div>
              <div>
                <h4 className="text-white font-bold text-sm mb-4">Quick Links</h4>
                <ul className="space-y-2">
                  {navLinks.map((link) => (<li key={link.href}><a href={link.href} className="text-white/40 hover:text-white text-sm transition-colors">{link.label}</a></li>))}
                </ul>
              </div>
              <div>
                <h4 className="text-white font-bold text-sm mb-4">Services</h4>
                <ul className="space-y-2">
                  {services.slice(0, 5).map((s) => (<li key={s.name}><span className="text-white/40 text-sm">{s.name}</span></li>))}
                </ul>
              </div>
              <div>
                <h4 className="text-white font-bold text-sm mb-4">Contact</h4>
                <ul className="space-y-3">
                  <li><a href={PHONE_HREF} className="flex items-center gap-2 text-accent hover:text-accent-light text-sm font-semibold transition-colors"><PhoneIcon className="w-4 h-4" />{PHONE}</a></li>
                  <li><a href={MAP_LINK} target="_blank" rel="noopener noreferrer" className="flex items-start gap-2 text-white/40 hover:text-white text-sm transition-colors"><MapPinIcon className="w-4 h-4 mt-0.5 shrink-0" />{ADDRESS}</a></li>
                  <li><div className="flex items-center gap-2 text-white/40 text-sm"><ClockIcon className="w-4 h-4 shrink-0" />{HOURS}</div></li>
                </ul>
              </div>
            </div>
            <div className="mt-10 pt-8 border-t border-white/10 text-center">
              <p className="text-white/30 text-sm">&copy; {new Date().getFullYear()} Mechanix Express. All rights reserved. | Lakewood, NJ</p>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
