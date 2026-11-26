import React from 'react';
import { useApp } from '../context/AppContext';
import { StatusBadge } from '../components/common/StatusBadge';
import { ConfidenceIndicator } from '../components/common/ConfidenceIndicator';
import { MatchAnalysisBreakdown } from '../components/verification/MatchAnalysisBreakdown';
import { RecallTimeline } from '../components/verification/RecallTimeline';
import { 
  ArrowLeft, Archive, Printer, RotateCcw, ShieldAlert, CheckCircle2, 
  AlertOctagon, AlertTriangle, ExternalLink, Download, Share2, Layers
} from 'lucide-react';

export const VerificationReportPage: React.FC = () => {
  const { 
    currentProduct, 
    currentAnalysis, 
    setActiveTab, 
    saveToVault, 
    setSelectedRecallForModal 
  } = useApp();

  if (!currentProduct || !currentAnalysis) {
    return (
      <div className="min-h-screen bg-ivory-100 flex items-center justify-center p-6 text-center font-sans">
        <div className="bg-white border border-warmgrey-300 p-8 rounded-xs max-w-md space-y-4">
          <ShieldAlert className="w-10 h-10 text-safety-orange mx-auto" />
          <h2 className="text-xl font-bold text-charcoal-900">No Active Verification Session</h2>
          <p className="text-xs text-charcoal-600">
            Please initiate a scan from the Universal Product Scanner to generate an explainable safety verification audit.
          </p>
          <button
            onClick={() => setActiveTab('scanner')}
            className="px-4 py-2 bg-safety-orange text-white text-xs font-mono font-bold rounded-xs uppercase tracking-wider"
          >
            Go to Scanner
          </button>
        </div>
      </div>
    );
  }

  const { status, confidenceScore, matchedRecall } = currentAnalysis;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-ivory-100 text-charcoal-800 font-sans py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-8">
        
        {/* Navigation Breadcrumb & Actions Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-warmgrey-200 mb-8 gap-4">
          <div className="flex items-center gap-2 text-xs font-mono text-charcoal-500 uppercase">
            <button 
              onClick={() => setActiveTab('scanner')}
              className="hover:text-charcoal-900 flex items-center gap-1 font-bold"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Scanner</span>
            </button>
            <span>/</span>
            <span className="text-charcoal-800 font-bold">Safety Verification Audit</span>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => saveToVault(currentProduct, status, matchedRecall?.id)}
              className="px-3.5 py-2 bg-charcoal-900 text-white hover:bg-charcoal-800 text-xs font-mono font-bold rounded-xs flex items-center gap-1.5 transition-colors"
            >
              <Archive className="w-3.5 h-3.5 text-safety-orange" />
              <span>SAVE TO SAFETY VAULT</span>
            </button>

            <button
              onClick={handlePrint}
              className="px-3.5 py-2 bg-white border border-warmgrey-300 hover:bg-ivory-200 text-charcoal-800 text-xs font-mono font-bold rounded-xs flex items-center gap-1.5 transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>PRINT REPORT</span>
            </button>

            <button
              onClick={() => setActiveTab('scanner')}
              className="px-3.5 py-2 bg-white border border-warmgrey-300 hover:bg-ivory-200 text-charcoal-800 text-xs font-mono font-bold rounded-xs flex items-center gap-1.5 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>SCAN ANOTHER</span>
            </button>
          </div>
        </div>

        {/* Certificate / Editorial Report Header */}
        <div className="bg-white border border-warmgrey-300 rounded-xs p-6 sm:p-8 mb-8 shadow-technical">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-warmgrey-200">
            <div>
              <div className="flex items-center gap-2 font-mono text-[11px] text-charcoal-500 uppercase mb-1">
                <span>AUDIT RECORD ID: ST-{currentProduct.id.slice(0, 8).toUpperCase()}</span>
                <span>•</span>
                <span className="text-safety-orange font-bold flex items-center gap-1">
                  ⚡ GROQ RAG VERIFIED
                </span>
                <span>•</span>
                <span>TIMESTAMP: {new Date(currentAnalysis.verifiedTimestamp).toLocaleString()}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-charcoal-900 font-sans tracking-tight">
                Product Safety Verification Report
              </h1>
            </div>

            <div className="shrink-0">
              <ConfidenceIndicator score={confidenceScore} />
            </div>
          </div>

          {/* Primary Status Banner */}
          <div className="mt-6 mb-8">
            <StatusBadge status={status} size="lg" showDescription />
          </div>

          {/* Product Snapshot & Technical Specifications Card */}
          <div className="bg-ivory-50 border border-warmgrey-200 p-6 rounded-xs mb-8">
            <div className="flex flex-col sm:flex-row gap-6 items-start">
              <div className="relative shrink-0">
                <img 
                  src={currentProduct.image} 
                  alt={currentProduct.name} 
                  className="w-32 h-32 object-cover rounded-xs border-2 border-warmgrey-300 bg-white shadow-technical"
                />
                <span className="absolute bottom-1 right-1 text-[9px] font-mono bg-charcoal-900/90 text-white px-1.5 py-0.5 rounded-xs font-bold">
                  AI OCR
                </span>
              </div>
              <div className="flex-1 space-y-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono uppercase text-safety-orange font-bold tracking-wider">
                      {currentProduct.brand}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 bg-ivory-200 text-charcoal-700 border border-warmgrey-300 rounded-xs font-semibold">
                      {currentProduct.category}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-charcoal-900 leading-snug mt-0.5">
                    {currentProduct.name}
                  </h3>
                </div>

                {currentProduct.notes && (
                  <p className="text-xs text-charcoal-600 font-mono bg-white p-2 border border-warmgrey-200 rounded-xs">
                    {currentProduct.notes}
                  </p>
                )}

                {/* 4-cell Technical Spec Table */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1 font-mono text-xs">
                  <div className="bg-white border border-warmgrey-200 p-2 rounded-xs">
                    <span className="text-[10px] text-charcoal-500 uppercase block">Lot Batch</span>
                    <strong className="text-charcoal-900">{currentProduct.batchNumber || 'Unassigned'}</strong>
                  </div>
                  <div className="bg-white border border-warmgrey-200 p-2 rounded-xs">
                    <span className="text-[10px] text-charcoal-500 uppercase block">Model ID</span>
                    <strong className="text-charcoal-900">{currentProduct.model || 'Standard'}</strong>
                  </div>
                  <div className="bg-white border border-warmgrey-200 p-2 rounded-xs">
                    <span className="text-[10px] text-charcoal-500 uppercase block">Mfg Timestamp</span>
                    <strong className="text-charcoal-900">{currentProduct.mfgDate || 'N/A'}</strong>
                  </div>
                  <div className="bg-white border border-warmgrey-200 p-2 rounded-xs">
                    <span className="text-[10px] text-charcoal-500 uppercase block">Barcode UPC/EAN</span>
                    <strong className="text-charcoal-900">{currentProduct.barcode || 'N/A'}</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* If Recalled: Official Hazard & Consumer Action Directives Box */}
          {matchedRecall && (
            <div className="bg-status-confirmed-bg border-2 border-status-confirmed p-6 rounded-xs space-y-4 mb-8">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-2 text-status-confirmed font-mono text-xs font-bold uppercase">
                  <AlertOctagon className="w-5 h-5" />
                  <span>CRITICAL HAZARD & CONSUMER ACTION DIRECTIVE</span>
                </div>
                <button
                  onClick={() => setSelectedRecallForModal(matchedRecall)}
                  className="text-xs font-mono font-bold text-status-confirmed hover:underline flex items-center gap-1"
                >
                  <span>Read Official Gazette Bulletin [{matchedRecall.bulletinId}]</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="space-y-1">
                <h4 className="text-base font-bold text-charcoal-900">
                  Hazard: {matchedRecall.hazardType}
                </h4>
                <p className="text-xs text-charcoal-800 leading-relaxed font-sans">
                  {matchedRecall.description}
                </p>
              </div>

              <div className="p-4 bg-white/80 border border-status-confirmed/30 rounded-xs space-y-2">
                <div className="text-xs font-mono font-bold text-status-confirmed uppercase">
                  Authorized Remedy Action: {matchedRecall.remedyAction}
                </div>
                <p className="text-xs text-charcoal-800 leading-relaxed font-sans">
                  {matchedRecall.consumerDirective}
                </p>
              </div>
            </div>
          )}

          {/* If No Match / Clear: Institutional Transparency Note */}
          {status === 'clear' && (
            <div className="bg-forest-light border border-forest-green/40 p-6 rounded-xs space-y-2 mb-8">
              <div className="flex items-center gap-2 text-forest-green font-mono text-xs font-bold uppercase">
                <CheckCircle2 className="w-5 h-5" />
                <span>No Active Recall Gazette Bulletins Registered</span>
              </div>
              <p className="text-xs text-charcoal-800 leading-relaxed font-sans">
                RecallIQ cross-referenced batch lot <strong>{currentProduct.batchNumber}</strong> against public enforcement registries from FDA, CPSC, EU Safety Gate, and Health Canada. Zero active safety notices, withdrawals, or hazard classifications were matched at the time of query.
              </p>
              <div className="pt-2 text-[11px] font-mono text-charcoal-600">
                Institutional Note: A clear determination indicates no active bulletins at this time, not a total absence of uncataloged risks. Save to your Vault to monitor 24/7.
              </div>
            </div>
          )}

          {/* Two-Column Grid: Match Analysis Breakdown + Timeline */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7">
              <MatchAnalysisBreakdown analysis={currentAnalysis} />
            </div>
            <div className="lg:col-span-5">
              <RecallTimeline timeline={currentAnalysis.explanationTimeline} />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
