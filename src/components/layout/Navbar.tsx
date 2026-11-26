import React, { useState } from 'react';
import { ShieldAlert, Scan, Database, Archive, Mic, Menu, X, ArrowUpRight, Radio } from 'lucide-react';
import { useApp, PageTab } from '../../context/AppContext';

export const Navbar: React.FC = () => {
  const { activeTab, setActiveTab, savedVault } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const recalledVaultCount = savedVault.filter(i => i.currentStatus === 'confirmed' || i.currentStatus === 'possible').length;

  const handleNavClick = (tab: PageTab) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-ivory-100/90 backdrop-blur-md border-b border-warmgrey-200">
      {/* Top Technical Status Ticker */}
      <div className="bg-charcoal-900 text-ivory-300 text-[11px] font-mono py-1.5 px-4 sm:px-8 border-b border-charcoal-700">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-safety-orange opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-safety-orange"></span>
            </span>
            <span className="tracking-wider text-ivory-100 font-semibold">RECALLIQ INTELLIGENCE FEED</span>
            <span className="hidden md:inline text-charcoal-400">|</span>
            <span className="hidden md:inline text-charcoal-300">SYNCHRONIZED WITH FDA • CPSC • EU SAFETY GATE • HEALTH CANADA • FSA</span>
          </div>
          <div className="flex items-center gap-3 text-charcoal-300">
            <span className="hidden sm:inline">RAG ENGINE: GROQ LPU (QWEN-27B)</span>
            <span className="text-safety-orange font-semibold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-forest-green animate-pulse"></span>
              LIVE RAG ACTIVE
            </span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 h-18 flex items-center justify-between">
        {/* Brand / Logo */}
        <button 
          onClick={() => handleNavClick('landing')}
          className="flex items-center gap-3 group text-left focus:outline-none"
        >
          <div className="w-10 h-10 bg-charcoal-900 rounded-sm flex items-center justify-center text-ivory-100 border border-charcoal-700 transition-colors group-hover:bg-safety-orange">
            <ShieldAlert className="w-5 h-5 text-safety-orange group-hover:text-white transition-colors" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-xl tracking-tight text-charcoal-900 font-sans">RecallIQ</span>
              <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 bg-ivory-200 text-charcoal-700 border border-warmgrey-200 font-medium rounded-xs">
                PRO v1.0
              </span>
            </div>
            <p className="text-[10px] text-charcoal-500 font-mono tracking-wider uppercase">
              Recall & Safety Intelligence
            </p>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 font-sans">
          <button
            onClick={() => handleNavClick('landing')}
            className={`px-3.5 py-2 text-sm font-medium transition-colors rounded-sm ${
              activeTab === 'landing' 
                ? 'text-charcoal-900 bg-ivory-200/80 font-semibold' 
                : 'text-charcoal-600 hover:text-charcoal-900 hover:bg-ivory-200/40'
            }`}
          >
            Discover
          </button>

          <button
            onClick={() => handleNavClick('scanner')}
            className={`flex items-center gap-1.5 px-3.5 py-2 text-sm font-medium transition-colors rounded-sm ${
              activeTab === 'scanner' || activeTab === 'report'
                ? 'text-charcoal-900 bg-ivory-200/80 font-semibold' 
                : 'text-charcoal-600 hover:text-charcoal-900 hover:bg-ivory-200/40'
            }`}
          >
            <Scan className="w-4 h-4 text-safety-orange" />
            Product Scanner
          </button>

          <button
            onClick={() => handleNavClick('recalls')}
            className={`flex items-center gap-1.5 px-3.5 py-2 text-sm font-medium transition-colors rounded-sm ${
              activeTab === 'recalls' 
                ? 'text-charcoal-900 bg-ivory-200/80 font-semibold' 
                : 'text-charcoal-600 hover:text-charcoal-900 hover:bg-ivory-200/40'
            }`}
          >
            <Database className="w-4 h-4 text-forest-green" />
            Global Recalls
          </button>

          <button
            onClick={() => handleNavClick('vault')}
            className={`flex items-center gap-1.5 px-3.5 py-2 text-sm font-medium transition-colors rounded-sm relative ${
              activeTab === 'vault' 
                ? 'text-charcoal-900 bg-ivory-200/80 font-semibold' 
                : 'text-charcoal-600 hover:text-charcoal-900 hover:bg-ivory-200/40'
            }`}
          >
            <Archive className="w-4 h-4 text-charcoal-700" />
            Safety Vault
            {recalledVaultCount > 0 && (
              <span className="ml-1 px-1.5 py-0.2 bg-safety-orange text-white text-[10px] font-mono rounded-full font-bold">
                {recalledVaultCount}
              </span>
            )}
          </button>

          <button
            onClick={() => handleNavClick('voice')}
            className={`flex items-center gap-1.5 px-3.5 py-2 text-sm font-medium transition-colors rounded-sm ${
              activeTab === 'voice' 
                ? 'text-charcoal-900 bg-ivory-200/80 font-semibold' 
                : 'text-charcoal-600 hover:text-charcoal-900 hover:bg-ivory-200/40'
            }`}
          >
            <Mic className="w-4 h-4 text-safety-orange" />
            Voice Assistant
          </button>
        </nav>

        {/* Action Button */}
        <div className="hidden sm:flex items-center gap-3">
          <button
            onClick={() => handleNavClick('scanner')}
            className="flex items-center gap-2 px-4 py-2.5 bg-safety-orange text-white text-sm font-semibold rounded-sm hover:bg-safety-orange-hover transition-all shadow-sm active:translate-y-0.5"
          >
            <Scan className="w-4 h-4" />
            <span>Scan Product</span>
            <ArrowUpRight className="w-3.5 h-3.5 opacity-80" />
          </button>
        </div>

        {/* Mobile Hamburger */}
        <div className="lg:hidden flex items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-charcoal-800 hover:bg-ivory-200 rounded-sm"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-ivory-50 border-b border-warmgrey-200 px-4 py-4 space-y-2">
          <button
            onClick={() => handleNavClick('landing')}
            className="w-full text-left px-3 py-2 text-sm font-medium text-charcoal-800 rounded-sm hover:bg-ivory-200"
          >
            Discover Overview
          </button>
          <button
            onClick={() => handleNavClick('scanner')}
            className="w-full text-left px-3 py-2 text-sm font-medium text-charcoal-800 rounded-sm hover:bg-ivory-200 flex items-center justify-between"
          >
            <span className="flex items-center gap-2">
              <Scan className="w-4 h-4 text-safety-orange" />
              Universal Product Scanner
            </span>
            <span className="text-xs font-mono text-safety-orange uppercase">Scan</span>
          </button>
          <button
            onClick={() => handleNavClick('recalls')}
            className="w-full text-left px-3 py-2 text-sm font-medium text-charcoal-800 rounded-sm hover:bg-ivory-200 flex items-center gap-2"
          >
            <Database className="w-4 h-4 text-forest-green" />
            Global Recalls Intelligence
          </button>
          <button
            onClick={() => handleNavClick('vault')}
            className="w-full text-left px-3 py-2 text-sm font-medium text-charcoal-800 rounded-sm hover:bg-ivory-200 flex items-center justify-between"
          >
            <span className="flex items-center gap-2">
              <Archive className="w-4 h-4 text-charcoal-700" />
              Personal Safety Vault
            </span>
            <span className="text-xs font-mono px-2 py-0.5 bg-ivory-300 rounded-full">
              {savedVault.length} items
            </span>
          </button>
          <button
            onClick={() => handleNavClick('voice')}
            className="w-full text-left px-3 py-2 text-sm font-medium text-charcoal-800 rounded-sm hover:bg-ivory-200 flex items-center gap-2"
          >
            <Mic className="w-4 h-4 text-safety-orange" />
            Voice Safety Assistant (Tamil / Hindi / English)
          </button>
          <div className="pt-2 border-t border-warmgrey-200">
            <button
              onClick={() => handleNavClick('scanner')}
              className="w-full py-2.5 bg-safety-orange text-white text-sm font-semibold rounded-sm text-center flex items-center justify-center gap-2"
            >
              <Scan className="w-4 h-4" />
              <span>Start Camera Scanner</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
