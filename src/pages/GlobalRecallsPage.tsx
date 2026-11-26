import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { DEMO_RECALLS } from '../data/mockRecalls';
import { ProductCategory, RecallRecord } from '../types';
import { 
  Search, Filter, Database, MapPin, Calendar, Tag, ExternalLink, 
  AlertOctagon, CheckCircle2, ChevronRight, ShieldCheck, ArrowUpDown 
} from 'lucide-react';

export const GlobalRecallsPage: React.FC = () => {
  const { setSelectedRecallForModal, executeScanAndVerify } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedCountry, setSelectedCountry] = useState<string>('All');
  const [selectedSeverity, setSelectedSeverity] = useState<string>('All');

  // Filtered dataset
  const filteredRecalls = useMemo(() => {
    return DEMO_RECALLS.filter((r) => {
      const matchesSearch = 
        r.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.bulletinId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.affectedBatches.some(b => b.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesCat = selectedCategory === 'All' || r.category === selectedCategory;
      const matchesCountry = selectedCountry === 'All' || r.country.includes(selectedCountry);
      const matchesSev = selectedSeverity === 'All' || r.severity.includes(selectedSeverity);

      return matchesSearch && matchesCat && matchesCountry && matchesSev;
    });
  }, [searchTerm, selectedCategory, selectedCountry, selectedSeverity]);

  return (
    <div className="min-h-screen bg-ivory-100 text-charcoal-800 font-sans py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Editorial Heading */}
        <div className="pb-8 border-b border-warmgrey-200 mb-8">
          <div className="flex items-center gap-2 font-mono text-xs text-charcoal-500 uppercase mb-2">
            <span className="w-2 h-2 rounded-full bg-forest-green"></span>
            <span>PUBLIC REGULATORY DATABASE</span>
            <span>•</span>
            <span>MULTI-AGENCY SYNCHRONIZATION</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-charcoal-900 font-sans tracking-tight">
                Global Recall Intelligence Gazette
              </h1>
              <p className="text-sm text-charcoal-600 mt-1 max-w-2xl leading-relaxed">
                Consolidated official enforcement announcements from U.S. FDA, U.S. CPSC, European Safety Gate (RAPEX), Health Canada, and UK FSA.
              </p>
            </div>

            <div className="shrink-0 font-mono text-xs text-charcoal-600 bg-ivory-200/80 px-3.5 py-2 rounded-xs border border-warmgrey-300">
              AUDITED RECORDS: <strong className="text-charcoal-900">{DEMO_RECALLS.length} DEMO BULLETINS</strong>
            </div>
          </div>
        </div>

        {/* Search & Multi-Filter Bar */}
        <div className="bg-ivory-50 border border-warmgrey-200 p-5 rounded-xs mb-8 space-y-4 shadow-technical">
          <div className="relative">
            <Search className="w-4 h-4 text-charcoal-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              placeholder="Search by product name, brand, bulletin ID (e.g. FDA-CBER), or lot number..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-xs font-mono bg-white border border-warmgrey-300 rounded-xs text-charcoal-900 focus:outline-none focus:border-safety-orange"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Category Filter */}
            <div>
              <label className="block text-[10px] font-mono uppercase text-charcoal-500 mb-1">
                Product Category
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full text-xs font-mono bg-white border border-warmgrey-300 rounded-xs p-2 text-charcoal-800 focus:outline-none focus:border-safety-orange"
              >
                <option value="All">All Categories</option>
                <option value="Infant & Child Care">Infant & Child Care</option>
                <option value="Food & Beverages">Food & Beverages</option>
                <option value="Consumer Electronics">Consumer Electronics</option>
                <option value="Pharmaceuticals & OTC">Pharmaceuticals & OTC</option>
                <option value="Home Appliances">Home Appliances</option>
                <option value="Automotive & Travel">Automotive & Travel</option>
              </select>
            </div>

            {/* Jurisdiction / Country */}
            <div>
              <label className="block text-[10px] font-mono uppercase text-charcoal-500 mb-1">
                Jurisdiction / Agency
              </label>
              <select
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
                className="w-full text-xs font-mono bg-white border border-warmgrey-300 rounded-xs p-2 text-charcoal-800 focus:outline-none focus:border-safety-orange"
              >
                <option value="All">All Jurisdictions</option>
                <option value="United States">United States (FDA / CPSC)</option>
                <option value="European Union">European Union (RAPEX)</option>
                <option value="United Kingdom">United Kingdom (FSA)</option>
                <option value="Canada">Health Canada</option>
              </select>
            </div>

            {/* Severity */}
            <div>
              <label className="block text-[10px] font-mono uppercase text-charcoal-500 mb-1">
                Recall Hazard Class
              </label>
              <select
                value={selectedSeverity}
                onChange={(e) => setSelectedSeverity(e.target.value)}
                className="w-full text-xs font-mono bg-white border border-warmgrey-300 rounded-xs p-2 text-charcoal-800 focus:outline-none focus:border-safety-orange"
              >
                <option value="All">All Severity Classes</option>
                <option value="Class I">Class I (High Risk / Severe)</option>
                <option value="Class II">Class II (Moderate Risk)</option>
                <option value="Class III">Class III (Low Risk)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between pb-3 text-xs font-mono text-charcoal-500">
          <span>SHOWING {filteredRecalls.length} OFFICIAL BULLETINS</span>
          <span className="italic text-[11px]">Source references verified</span>
        </div>

        {/* Structured Editorial Bulletin List */}
        <div className="space-y-4">
          {filteredRecalls.map((recall) => (
            <div
              key={recall.id}
              className="bg-white border border-warmgrey-200 rounded-xs p-5 hover:border-charcoal-600 transition-all shadow-technical flex flex-col md:flex-row gap-5 items-start justify-between"
            >
              <div className="flex flex-col sm:flex-row gap-4 items-start flex-1 min-w-0">
                <img 
                  src={recall.image} 
                  alt={recall.productName} 
                  className="w-full sm:w-36 h-28 object-cover rounded-xs border border-warmgrey-300 shrink-0 bg-ivory-50"
                />
                
                <div className="space-y-1.5 flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 text-[11px] font-mono">
                    <span className="px-2 py-0.5 bg-ivory-200 text-charcoal-800 font-bold rounded-xs">
                      {recall.bulletinId}
                    </span>
                    <span className="text-status-confirmed font-bold">
                      {recall.severity}
                    </span>
                    <span>•</span>
                    <span className="text-charcoal-500 flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {recall.country}
                    </span>
                    <span>•</span>
                    <span className="text-charcoal-500">
                      {recall.recallDate}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-charcoal-900 leading-snug">
                    {recall.productName}
                  </h3>

                  <p className="text-xs text-charcoal-600 line-clamp-2 leading-relaxed">
                    {recall.description}
                  </p>

                  <div className="pt-1 flex flex-wrap items-center gap-3 text-xs font-mono">
                    <div className="text-charcoal-700">
                      Brand: <strong className="text-charcoal-900">{recall.brand}</strong>
                    </div>
                    <div className="text-charcoal-500">
                      Affected Lots: <span className="font-bold text-charcoal-800">{recall.affectedBatches.join(', ')}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="shrink-0 flex sm:flex-col gap-2 w-full sm:w-auto">
                <button
                  onClick={() => setSelectedRecallForModal(recall)}
                  className="flex-1 sm:flex-none px-4 py-2 bg-charcoal-900 hover:bg-safety-orange text-white text-xs font-mono font-bold rounded-xs flex items-center justify-center gap-1.5 transition-colors"
                >
                  <span>VIEW BULLETIN</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}

          {filteredRecalls.length === 0 && (
            <div className="p-12 text-center bg-white border border-warmgrey-200 rounded-xs">
              <Database className="w-8 h-8 text-charcoal-400 mx-auto mb-2" />
              <h3 className="text-sm font-bold text-charcoal-900 font-mono">No Matching Bulletins Found</h3>
              <p className="text-xs text-charcoal-500 mt-1">
                Try modifying your keyword search or adjusting the jurisdiction and category filters.
              </p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
