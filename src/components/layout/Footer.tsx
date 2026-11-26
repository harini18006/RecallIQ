import React from 'react';
import { ShieldAlert, ExternalLink, Globe, Lock, FileText, AlertCircle } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-charcoal-900 text-ivory-300 border-t border-charcoal-700 pt-16 pb-12 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Institutional Integrity Banner */}
        <div className="bg-charcoal-800 border border-charcoal-700 p-6 rounded-sm mb-14 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-safety-orange shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-bold text-ivory-100 uppercase tracking-wider font-mono">
                Institutional Safety Verification Standard
              </h4>
              <p className="text-xs text-charcoal-300 mt-1 max-w-3xl leading-relaxed">
                RecallIQ synthesizes published recall gazettes from official enforcement authorities including the U.S. FDA, U.S. CPSC, European Commission Safety Gate, Health Canada, and UK FSA. A &ldquo;No Matching Recall Found&rdquo; determination denotes the absence of registered public hazard bulletins at the time of query; it is not a commercial certification or absolute warranty of safety.
              </p>
            </div>
          </div>
          <div className="shrink-0 flex items-center gap-2 font-mono text-[11px] text-ivory-400 border border-charcoal-600 px-3 py-1.5 rounded-xs">
            <span className="w-2 h-2 rounded-full bg-forest-green"></span>
            INTEGRITY AUDIT: 100% RECALL TRANSPARENCY
          </div>
        </div>

        {/* 4 Column Editorial Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-charcoal-800">
          {/* Col 1: Identity */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 bg-safety-orange text-white rounded-xs flex items-center justify-center">
                <ShieldAlert className="w-4 h-4" />
              </div>
              <span className="font-bold text-lg text-white font-sans tracking-tight">RecallIQ</span>
            </div>
            <p className="text-xs text-charcoal-400 font-mono uppercase tracking-wider">
              Universal AI Product Safety & Recall Intelligence Platform
            </p>
            <p className="text-xs text-charcoal-300 leading-relaxed">
              Empowering consumers and enterprise compliance teams with deep batch-level safety verification, deterministic recall cross-matching, and proactive risk monitoring.
            </p>
            <div className="text-[11px] font-mono text-charcoal-400">
              TAGLINE: <span className="text-ivory-100 italic">Know What You Own. Stay Safe.</span>
            </div>
          </div>

          {/* Col 2: Core Modules */}
          <div>
            <h5 className="text-xs font-mono font-bold text-ivory-100 uppercase tracking-widest mb-4">
              01 / Architecture
            </h5>
            <ul className="space-y-2.5 text-xs text-charcoal-300">
              <li>Universal Optical Packaging Scanner</li>
              <li>Fuzzy & Deep Batch Matcher</li>
              <li>Unified Global Recall Gazette</li>
              <li>Multilingual Voice Safety Engine</li>
              <li>Explainable AI Verification Audit</li>
              <li>Personal Product Safety Vault</li>
            </ul>
          </div>

          {/* Col 3: Official Data Sources */}
          <div>
            <h5 className="text-xs font-mono font-bold text-ivory-100 uppercase tracking-widest mb-4">
              02 / Monitored Gazettes
            </h5>
            <ul className="space-y-2.5 text-xs text-charcoal-300">
              <li className="flex items-center justify-between">
                <span>U.S. FDA Enforcements</span>
                <span className="font-mono text-[10px] text-charcoal-400">Class I/II</span>
              </li>
              <li className="flex items-center justify-between">
                <span>U.S. Consumer Product Safety (CPSC)</span>
                <span className="font-mono text-[10px] text-charcoal-400">Consumer Goods</span>
              </li>
              <li className="flex items-center justify-between">
                <span>EU Safety Gate (RAPEX Alerts)</span>
                <span className="font-mono text-[10px] text-charcoal-400">All 27 EU States</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Health Canada Recalls</span>
                <span className="font-mono text-[10px] text-charcoal-400">Direct Ingestion</span>
              </li>
              <li className="flex items-center justify-between">
                <span>UK Food & Trading Standards</span>
                <span className="font-mono text-[10px] text-charcoal-400">Public Bulletins</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Platform Metadata */}
          <div>
            <h5 className="text-xs font-mono font-bold text-ivory-100 uppercase tracking-widest mb-4">
              03 / System Specifications
            </h5>
            <div className="space-y-2 text-xs font-mono text-charcoal-300">
              <div className="flex justify-between py-1 border-b border-charcoal-800">
                <span>Engine Runtime:</span>
                <span className="text-ivory-200">RecallIQ Core v1.0</span>
              </div>
              <div className="flex justify-between py-1 border-b border-charcoal-800">
                <span>Matching Precision:</span>
                <span className="text-ivory-200">Levenshtein + Lot Regex</span>
              </div>
              <div className="flex justify-between py-1 border-b border-charcoal-800">
                <span>Voice Locales:</span>
                <span className="text-ivory-200">EN-US, TA-IN, HI-IN</span>
              </div>
              <div className="flex justify-between py-1 border-b border-charcoal-800">
                <span>Backend Readiness:</span>
                <span className="text-safety-orange">Modular Supabase Architecture</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Rights & Disclaimers */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-charcoal-400">
          <div>
            &copy; 2024 RecallIQ Global Intelligence Platform. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <span>Security Protocol: TLS 1.3</span>
            <span>Zero Unverified Fabrication Policy</span>
            <span className="text-ivory-200">Made for National Product Safety Intelligence</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
