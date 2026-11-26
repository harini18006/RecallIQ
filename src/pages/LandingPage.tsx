import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  Scan, Database, ShieldAlert, ArrowRight, ShieldCheck, CheckCircle2, 
  AlertTriangle, AlertOctagon, Sparkles, Layers, Cpu, Globe, Search,
  ArrowUpRight, ExternalLink, Activity, Info
} from 'lucide-react';
import { DEMO_RECALLS, SAMPLE_PRODUCTS } from '../data/mockRecalls';

export const LandingPage: React.FC = () => {
  const { setActiveTab, executeScanAndVerify, setSelectedRecallForModal } = useApp();

  return (
    <div className="min-h-screen bg-ivory-100 text-charcoal-800 font-sans">
      {/* 1. HERO SECTION: Swiss Editorial Layout */}
      <section className="relative border-b border-warmgrey-200 pt-12 pb-20 overflow-hidden">
        {/* Subtle grid background */}
        <div className="absolute inset-0 bg-tech-grid opacity-30 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Editorial Headline & Actions */}
            <div className="lg:col-span-7 space-y-6">
              {/* Institution badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-ivory-200/80 border border-warmgrey-300 rounded-xs text-xs font-mono text-charcoal-700">
                <span className="w-2 h-2 rounded-full bg-safety-orange"></span>
                <span>GLOBAL RECALL INTELLIGENCE PROTOCOL</span>
              </div>

              {/* Massive Editorial Headline */}
              <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-charcoal-900 leading-[1.08] font-sans">
                Before You Use It.<br />
                <span className="italic font-serif font-normal text-safety-orange">
                  Know If It&rsquo;s Safe.
                </span>
              </h1>

              {/* Supporting Editorial Paragraph */}
              <p className="text-base sm:text-lg text-charcoal-600 max-w-xl leading-relaxed">
                Scan any product packaging, barcode, or lot stamp. RecallIQ deterministically cross-checks official global recall gazettes to protect your family from hazardous consumer products.
              </p>

              {/* Main CTAs */}
              <div className="pt-2 flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
                <button
                  onClick={() => setActiveTab('scanner')}
                  className="px-6 py-4 bg-safety-orange hover:bg-safety-orange-hover text-white text-sm font-bold font-mono uppercase tracking-wider rounded-xs flex items-center justify-center gap-2 shadow-technical transition-all active:translate-y-0.5 group"
                >
                  <Scan className="w-4 h-4" />
                  <span>Scan a Product Now</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={() => setActiveTab('recalls')}
                  className="px-6 py-4 bg-ivory-50 hover:bg-ivory-200 text-charcoal-800 text-sm font-bold font-mono uppercase tracking-wider rounded-xs border border-warmgrey-300 flex items-center justify-center gap-2 transition-colors"
                >
                  <Database className="w-4 h-4 text-forest-green" />
                  <span>Explore Global Recalls</span>
                </button>
              </div>

              {/* Trust Indicators */}
              <div className="pt-6 border-t border-warmgrey-200 flex flex-wrap items-center gap-6 text-xs font-mono text-charcoal-500">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-forest-green" />
                  <span>Zero Fabricated Bulletins</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-forest-green" />
                  <span>Batch-Level Precision</span>
                </div>
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-safety-orange" />
                  <span>Multi-Agency Cross-Check</span>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Visual - High-Tech Product Packaging Composition */}
            <div className="lg:col-span-5">
              <div className="bg-charcoal-900 border border-charcoal-700 rounded-xs p-6 shadow-technical-lg text-ivory-100 relative overflow-hidden">
                {/* Visual scanline */}
                <div className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-safety-orange to-transparent animate-scanline pointer-events-none"></div>

                {/* Top card bar */}
                <div className="flex items-center justify-between pb-3 border-b border-charcoal-700 text-[11px] font-mono text-charcoal-400">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-safety-orange"></span>
                    <span>OPTICAL BATCH EXTRACTION</span>
                  </div>
                  <span>LIVE RECALL CHECK</span>
                </div>

                {/* Packaging preview with technical overlays */}
                <div className="my-4 relative rounded-xs overflow-hidden border border-charcoal-700">
                  <img 
                    src={SAMPLE_PRODUCTS[0].image} 
                    alt="Sample packaging" 
                    className="w-full h-48 object-cover brightness-90"
                  />
                  
                  {/* Bounding bracket overlays */}
                  <div className="absolute inset-4 border border-safety-orange/50 rounded-xs flex flex-col justify-between p-2 pointer-events-none">
                    <div className="flex justify-between">
                      <span className="text-[10px] font-mono text-white bg-safety-orange px-1.5 py-0.5 rounded-xs font-bold">
                        LOT: NC-8849-B1
                      </span>
                      <span className="text-[10px] font-mono text-ivory-200 bg-charcoal-900/80 px-1.5 py-0.5 rounded-xs">
                        EXP: 2025-11
                      </span>
                    </div>
                    <div className="self-end text-[10px] font-mono text-safety-orange bg-charcoal-900/90 px-2 py-0.5 rounded-xs">
                      BARCODE: 8901030456128
                    </div>
                  </div>
                </div>

                {/* Safety Verification Result Simulation */}
                <div className="bg-charcoal-800 border-2 border-status-confirmed p-3.5 rounded-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono font-bold text-status-confirmed flex items-center gap-1.5">
                      <AlertOctagon className="w-4 h-4 text-status-confirmed" />
                      CONFIRMED RECALL MATCH (CLASS I)
                    </span>
                    <span className="text-[10px] font-mono bg-status-confirmed text-white px-2 py-0.5 rounded-xs font-bold">
                      HIGH RISK
                    </span>
                  </div>
                  <div className="text-xs font-sans text-ivory-200 leading-snug">
                    <strong>NutraCare Infant Formula</strong> lot matches active FDA Cronobacter bulletin. Cease usage immediately.
                  </div>
                  <div className="pt-2 flex items-center justify-between text-[11px] font-mono border-t border-charcoal-700 text-charcoal-400">
                    <span>Source: U.S. FDA Gazette</span>
                    <button 
                      onClick={() => executeScanAndVerify(SAMPLE_PRODUCTS[0])}
                      className="text-safety-orange hover:underline font-bold flex items-center gap-1"
                    >
                      View Full Safety Audit →
                    </button>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. LIVE RECALL INTELLIGENCE BANNER: Official Bulletins */}
      <section className="bg-ivory-50 border-b border-warmgrey-200 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-2 shrink-0">
              <span className="w-2.5 h-2.5 rounded-full bg-safety-orange animate-pulse"></span>
              <span className="text-xs font-mono font-bold uppercase text-charcoal-900 tracking-wider">
                Active Public Recalls Feed:
              </span>
            </div>
            
            <div className="flex-1 overflow-x-auto flex items-center gap-3 py-1">
              {DEMO_RECALLS.slice(0, 3).map((recall) => (
                <button
                  key={recall.id}
                  onClick={() => setSelectedRecallForModal(recall)}
                  className="shrink-0 flex items-center gap-2 px-3 py-1.5 bg-white border border-warmgrey-300 rounded-xs hover:border-safety-orange transition-colors text-left"
                >
                  <span className="text-[10px] font-mono font-bold px-1.5 py-0.2 bg-ivory-200 text-charcoal-800 rounded-xs">
                    {recall.agency.split(' ')[0]}
                  </span>
                  <span className="text-xs font-semibold text-charcoal-900 max-w-[200px] truncate">
                    {recall.productName}
                  </span>
                  <span className="text-[10px] font-mono text-status-confirmed font-bold">
                    [RECALL]
                  </span>
                </button>
              ))}
            </div>

            <button
              onClick={() => setActiveTab('recalls')}
              className="text-xs font-mono font-bold text-charcoal-700 hover:text-safety-orange shrink-0 flex items-center gap-1"
            >
              <span>View All 6 Gazettes</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* 3. HOW RECALLIQ WORKS: 4-Step Technical Workflow */}
      <section className="py-20 border-b border-warmgrey-200 bg-ivory-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="max-w-xl mb-12">
            <div className="text-xs font-mono uppercase text-safety-orange font-bold tracking-widest mb-1">
              01 / Verification Methodology
            </div>
            <h2 className="text-3xl font-extrabold text-charcoal-900 font-sans tracking-tight">
              From Physical Packaging to Deterministic Safety Verification.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Step 1 */}
            <div className="bg-ivory-50 border border-warmgrey-200 p-6 rounded-xs space-y-4">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="w-8 h-8 rounded-xs bg-charcoal-900 text-white font-bold flex items-center justify-center">
                  01
                </span>
                <span className="text-charcoal-500 uppercase">Input Stage</span>
              </div>
              <h3 className="text-base font-bold text-charcoal-900 font-sans">
                Universal Optical Scanning
              </h3>
              <p className="text-xs text-charcoal-600 leading-relaxed">
                Scan UPC barcodes, 2D QR codes, or upload photos of product packaging with our high-framerate optical scanner.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-ivory-50 border border-warmgrey-200 p-6 rounded-xs space-y-4">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="w-8 h-8 rounded-xs bg-charcoal-900 text-white font-bold flex items-center justify-center">
                  02
                </span>
                <span className="text-charcoal-500 uppercase">OCR Extraction</span>
              </div>
              <h3 className="text-base font-bold text-charcoal-900 font-sans">
                Neural Attribute Parsing
              </h3>
              <p className="text-xs text-charcoal-600 leading-relaxed">
                Extracts brand entity, specific model number, production batch code, and manufacturing timestamp with manual override.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-ivory-50 border border-warmgrey-200 p-6 rounded-xs space-y-4">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="w-8 h-8 rounded-xs bg-safety-orange text-white font-bold flex items-center justify-center">
                  03
                </span>
                <span className="text-safety-orange uppercase font-bold">Matching Core</span>
              </div>
              <h3 className="text-base font-bold text-charcoal-900 font-sans">
                Deep Fuzzy & Lot Matrix
              </h3>
              <p className="text-xs text-charcoal-600 leading-relaxed">
                Cross-correlates extracted identifiers against official enforcement gazettes using Levenshtein distance and lot regex matching.
              </p>
            </div>

            {/* Step 4 */}
            <div className="bg-ivory-50 border border-warmgrey-200 p-6 rounded-xs space-y-4">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="w-8 h-8 rounded-xs bg-charcoal-900 text-white font-bold flex items-center justify-center">
                  04
                </span>
                <span className="text-charcoal-500 uppercase">Resolution</span>
              </div>
              <h3 className="text-base font-bold text-charcoal-900 font-sans">
                Directives & Vault Monitoring
              </h3>
              <p className="text-xs text-charcoal-600 leading-relaxed">
                Receive explainable determination, clear consumer refund/replacement directives, and 24/7 proactive vault surveillance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. SIX CORE INNOVATIONS SHOWCASE */}
      <section className="py-20 border-b border-warmgrey-200 bg-ivory-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="max-w-2xl mb-14">
            <div className="text-xs font-mono uppercase text-safety-orange font-bold tracking-widest mb-1">
              02 / Core Platform Architecture
            </div>
            <h2 className="text-3xl font-extrabold text-charcoal-900 font-sans tracking-tight">
              Six Foundational Innovations Built for Public Trust.
            </h2>
            <p className="text-sm text-charcoal-600 mt-2">
              Unlike generic AI SaaS dashboards, RecallIQ was engineered around rigorous international product safety standards.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* 1. Universal Scanner */}
            <div className="p-6 bg-white border border-warmgrey-200 rounded-xs space-y-3 shadow-technical hover:border-safety-orange transition-colors">
              <div className="w-10 h-10 rounded-xs bg-ivory-200 text-charcoal-900 flex items-center justify-center">
                <Scan className="w-5 h-5 text-safety-orange" />
              </div>
              <h3 className="text-base font-bold text-charcoal-900">
                A. Universal AI Product Scanner
              </h3>
              <p className="text-xs text-charcoal-600 leading-relaxed">
                Optical barcode, QR, and packaging image scanner with neural OCR extraction for batch codes, expiry dates, and brand entities with manual correction.
              </p>
            </div>

            {/* 2. Fuzzy Matching */}
            <div className="p-6 bg-white border border-warmgrey-200 rounded-xs space-y-3 shadow-technical hover:border-safety-orange transition-colors">
              <div className="w-10 h-10 rounded-xs bg-ivory-200 text-charcoal-900 flex items-center justify-center">
                <Cpu className="w-5 h-5 text-forest-green" />
              </div>
              <h3 className="text-base font-bold text-charcoal-900">
                B. Smart Fuzzy & Deep Matching
              </h3>
              <p className="text-xs text-charcoal-600 leading-relaxed">
                Resolves brand spelling errors, nomenclature variances, and specifically isolates contaminated lot numbers from clean batches.
              </p>
            </div>

            {/* 3. Global Recalls */}
            <div className="p-6 bg-white border border-warmgrey-200 rounded-xs space-y-3 shadow-technical hover:border-safety-orange transition-colors">
              <div className="w-10 h-10 rounded-xs bg-ivory-200 text-charcoal-900 flex items-center justify-center">
                <Database className="w-5 h-5 text-safety-orange" />
              </div>
              <h3 className="text-base font-bold text-charcoal-900">
                C. Cross-Platform Global Gazette
              </h3>
              <p className="text-xs text-charcoal-600 leading-relaxed">
                Unified cross-governmental database from FDA, CPSC, EU Safety Gate, and Health Canada with original gazette citations and zero fabricated bulletins.
              </p>
            </div>

            {/* 4. Voice Assistant */}
            <div className="p-6 bg-white border border-warmgrey-200 rounded-xs space-y-3 shadow-technical hover:border-safety-orange transition-colors">
              <div className="w-10 h-10 rounded-xs bg-ivory-200 text-charcoal-900 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-safety-orange" />
              </div>
              <h3 className="text-base font-bold text-charcoal-900">
                D. Multilingual Voice Safety Assistant
              </h3>
              <p className="text-xs text-charcoal-600 leading-relaxed">
                Spoken audio consultation in English, Tamil, and Hindi. Explains critical chemical, allergen, or fire hazards in clear everyday language.
              </p>
            </div>

            {/* 5. Explainable AI */}
            <div className="p-6 bg-white border border-warmgrey-200 rounded-xs space-y-3 shadow-technical hover:border-safety-orange transition-colors">
              <div className="w-10 h-10 rounded-xs bg-ivory-200 text-charcoal-900 flex items-center justify-center">
                <Layers className="w-5 h-5 text-forest-green" />
              </div>
              <h3 className="text-base font-bold text-charcoal-900">
                E. Explainable Verification Audit
              </h3>
              <p className="text-xs text-charcoal-600 leading-relaxed">
                Full transparency into why a product was matched: attribute scores, batch range checks, date correlation, and official source timestamps.
              </p>
            </div>

            {/* 6. Vault & Monitoring */}
            <div className="p-6 bg-white border border-warmgrey-200 rounded-xs space-y-3 shadow-technical hover:border-safety-orange transition-colors">
              <div className="w-10 h-10 rounded-xs bg-ivory-200 text-charcoal-900 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5 text-safety-orange" />
              </div>
              <h3 className="text-base font-bold text-charcoal-900">
                F. Personal Safety Vault & Alerts
              </h3>
              <p className="text-xs text-charcoal-600 leading-relaxed">
                Track personal products and pantry inventories. Receive automated push and email notifications the instant a saved batch is recalled.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. PRODUCT CATEGORIES */}
      <section className="py-20 border-b border-warmgrey-200 bg-ivory-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-10 gap-4">
            <div>
              <div className="text-xs font-mono uppercase text-safety-orange font-bold tracking-widest mb-1">
                03 / Monitored Industries
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-charcoal-900 font-sans">
                Comprehensive Coverage Across High-Risk Categories
              </h2>
            </div>
            <button
              onClick={() => setActiveTab('recalls')}
              className="text-xs font-mono text-charcoal-700 hover:text-safety-orange font-bold flex items-center gap-1"
            >
              <span>Explore All Bulletins</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {[
              { title: 'Infant & Child Care', bulletins: '24 Bulletins', icon: '👶' },
              { title: 'Food & Beverages', bulletins: '68 Bulletins', icon: '🥫' },
              { title: 'Consumer Electronics', bulletins: '42 Bulletins', icon: '⚡' },
              { title: 'Pharmaceuticals & OTC', bulletins: '19 Bulletins', icon: '💊' },
              { title: 'Home Appliances', bulletins: '31 Bulletins', icon: '🔌' },
              { title: 'Automotive & Travel', bulletins: '15 Bulletins', icon: '🚗' },
            ].map((cat, idx) => (
              <div 
                key={idx}
                onClick={() => setActiveTab('recalls')}
                className="bg-ivory-50 border border-warmgrey-200 p-4 rounded-xs hover:border-charcoal-600 cursor-pointer transition-all hover:bg-white text-center flex flex-col items-center justify-center space-y-2"
              >
                <span className="text-2xl">{cat.icon}</span>
                <h4 className="text-xs font-bold text-charcoal-900 font-sans leading-tight">
                  {cat.title}
                </h4>
                <span className="text-[10px] font-mono text-charcoal-500">
                  {cat.bulletins}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. RECENTLY REPORTED RECALLS (DEMO DATASET) */}
      <section className="py-20 border-b border-warmgrey-200 bg-ivory-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-10 gap-4">
            <div>
              <div className="text-xs font-mono uppercase text-safety-orange font-bold tracking-widest mb-1">
                04 / Recent Public Bulletins
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-charcoal-900 font-sans">
                Latest Government & Manufacturer Gazettes
              </h2>
            </div>
            <div className="text-xs font-mono text-charcoal-500">
              AUDITED FROM OFFICIAL PORTALS
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {DEMO_RECALLS.slice(0, 3).map((recall) => (
              <div 
                key={recall.id}
                className="bg-white border border-warmgrey-200 rounded-xs overflow-hidden flex flex-col justify-between shadow-technical hover:shadow-technical-md transition-shadow"
              >
                <div>
                  <img 
                    src={recall.image} 
                    alt={recall.productName} 
                    className="w-full h-44 object-cover border-b border-warmgrey-200"
                  />
                  <div className="p-5 space-y-2.5">
                    <div className="flex items-center justify-between text-[11px] font-mono">
                      <span className="px-2 py-0.5 bg-ivory-200 text-charcoal-800 rounded-xs font-bold">
                        {recall.agency.split(' ')[0]}
                      </span>
                      <span className="text-status-confirmed font-bold">
                        {recall.severity}
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-charcoal-900 leading-snug line-clamp-2">
                      {recall.productName}
                    </h4>

                    <p className="text-xs text-charcoal-600 line-clamp-2 leading-relaxed">
                      {recall.description}
                    </p>

                    <div className="pt-2 text-[11px] font-mono text-charcoal-500">
                      Affected Lots: <span className="text-charcoal-900 font-bold">{recall.affectedBatches.slice(0, 2).join(', ')}...</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-ivory-50 border-t border-warmgrey-200 flex items-center justify-between">
                  <span className="text-[10px] font-mono text-charcoal-400">
                    Gazette Date: {recall.recallDate}
                  </span>
                  <button
                    onClick={() => setSelectedRecallForModal(recall)}
                    className="text-xs font-mono font-bold text-safety-orange hover:underline flex items-center gap-1"
                  >
                    <span>Read Bulletin</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. BOTTOM CTA SECTION */}
      <section className="py-20 bg-charcoal-900 text-ivory-100 relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-8 text-center space-y-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-charcoal-800 border border-charcoal-700 rounded-xs text-xs font-mono text-safety-orange font-bold">
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>KNOW WHAT YOU OWN. STAY SAFE.</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-sans text-white">
            Verify Your Products Against Global Safety Records Now.
          </h2>

          <p className="text-sm sm:text-base text-charcoal-300 max-w-xl mx-auto leading-relaxed">
            Protect your household with deterministic batch matching. RecallIQ brings complete transparency to product recalls.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setActiveTab('scanner')}
              className="px-8 py-4 bg-safety-orange hover:bg-safety-orange-hover text-white text-sm font-bold font-mono uppercase tracking-wider rounded-xs flex items-center justify-center gap-2 shadow-technical transition-all active:translate-y-0.5"
            >
              <Scan className="w-4 h-4" />
              <span>Launch Product Scanner</span>
            </button>
            <button
              onClick={() => setActiveTab('voice')}
              className="px-8 py-4 bg-charcoal-800 hover:bg-charcoal-700 text-ivory-100 text-sm font-bold font-mono uppercase tracking-wider rounded-xs border border-charcoal-600 flex items-center justify-center gap-2 transition-colors"
            >
              <span>Try Multilingual Voice Assistant</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
