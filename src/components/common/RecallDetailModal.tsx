import React from 'react';
import { RecallRecord } from '../../types';
import { X, ExternalLink, ShieldAlert, Calendar, MapPin, Tag, AlertOctagon, CheckSquare, Layers } from 'lucide-react';

interface RecallDetailModalProps {
  recall: RecallRecord | null;
  onClose: () => void;
}

export const RecallDetailModal: React.FC<RecallDetailModalProps> = ({ recall, onClose }) => {
  if (!recall) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal-900/70 backdrop-blur-xs font-sans">
      <div 
        className="bg-ivory-100 border border-warmgrey-300 rounded-xs max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-technical-lg text-charcoal-800"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="sticky top-0 bg-charcoal-900 text-ivory-100 p-5 flex items-center justify-between border-b border-charcoal-700 z-10">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xs bg-safety-orange text-white flex items-center justify-center">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono uppercase tracking-wider text-ivory-300">
                  OFFICIAL ENFORCEMENT GAZETTE
                </span>
                <span className="text-[10px] font-mono px-1.5 py-0.2 bg-safety-orange text-white rounded-xs">
                  {recall.severity}
                </span>
              </div>
              <h3 className="text-base font-bold text-white font-sans">
                {recall.bulletinId}
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-ivory-300 hover:text-white hover:bg-charcoal-800 rounded-xs transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6">
          {/* Main Title & Image Header */}
          <div className="flex flex-col sm:flex-row gap-5 items-start">
            <img 
              src={recall.image} 
              alt={recall.productName} 
              className="w-full sm:w-40 h-36 object-cover rounded-xs border border-warmgrey-300 shrink-0" 
            />
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-charcoal-500">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" />
                  {recall.country} ({recall.countryCode})
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  {recall.recallDate}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Tag className="w-3.5 h-3.5 text-forest-green" />
                  {recall.category}
                </span>
              </div>
              <h2 className="text-lg font-bold text-charcoal-900 leading-snug">
                {recall.title}
              </h2>
              <p className="text-xs font-mono text-charcoal-700">
                Brand: <strong className="text-charcoal-900">{recall.brand}</strong> | Model: {recall.affectedModels?.join(', ') || 'All revisions'}
              </p>
            </div>
          </div>

          {/* Hazard & Description Box */}
          <div className="bg-status-confirmed-bg border border-status-confirmed/40 p-4 rounded-xs">
            <div className="flex items-center gap-2 text-status-confirmed font-mono text-xs font-bold uppercase mb-1">
              <AlertOctagon className="w-4 h-4" />
              IDENTIFIED HAZARD SPECIFICATION
            </div>
            <p className="text-sm font-semibold text-charcoal-900 mb-2">
              {recall.hazardType}
            </p>
            <p className="text-xs text-charcoal-700 leading-relaxed">
              {recall.description}
            </p>
          </div>

          {/* Affected Batch Numbers Table */}
          <div className="border border-warmgrey-200 rounded-xs overflow-hidden">
            <div className="bg-ivory-200/70 px-4 py-2 text-xs font-mono font-bold text-charcoal-800 border-b border-warmgrey-200 flex items-center justify-between">
              <span>REGISTERED RECALLED BATCH / LOT CODES</span>
              <span className="text-[10px] text-charcoal-500 font-normal">{recall.affectedBatches.length} SPECIFIC LOTS</span>
            </div>
            <div className="p-4 bg-white flex flex-wrap gap-2">
              {recall.affectedBatches.map((b) => (
                <span key={b} className="font-mono text-xs font-bold px-2.5 py-1 bg-ivory-100 text-charcoal-900 border border-warmgrey-300 rounded-xs">
                  {b}
                </span>
              ))}
            </div>
            {recall.mfgDateRange && (
              <div className="px-4 py-2 bg-ivory-50 border-t border-warmgrey-200 text-xs font-mono text-charcoal-600">
                Manufacturing Date Scope: <span className="font-semibold text-charcoal-900">{recall.mfgDateRange.start}</span> through <span className="font-semibold text-charcoal-900">{recall.mfgDateRange.end}</span>
              </div>
            )}
          </div>

          {/* Consumer Directive & Remedy */}
          <div className="bg-forest-light border border-forest-green/30 p-4 rounded-xs space-y-2">
            <div className="flex items-center gap-2 text-forest-green font-mono text-xs font-bold uppercase">
              <CheckSquare className="w-4 h-4" />
              AUTHORIZED CONSUMER ACTION DIRECTIVE
            </div>
            <p className="text-xs text-charcoal-800 leading-relaxed">
              {recall.consumerDirective}
            </p>
            <div className="pt-2 text-xs font-mono text-forest-green font-semibold">
              Official Remedy: {recall.remedyAction}
            </div>
          </div>

          {/* Verification Source Citation */}
          <div className="bg-ivory-50 border border-warmgrey-200 p-3.5 rounded-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs font-mono">
            <div>
              <div className="text-charcoal-500 text-[10px] uppercase">Official Publishing Authority</div>
              <div className="font-bold text-charcoal-900">{recall.agency}</div>
              <div className="text-[10px] text-charcoal-400">Bulletin Verification: {recall.sourceCredibility}</div>
            </div>
            <a
              href={recall.officialSourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 bg-charcoal-900 text-white rounded-xs hover:bg-safety-orange transition-colors text-[11px]"
            >
              <span>View Source Gazette</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {recall.isDemonstrationRecord && (
            <div className="text-[10px] font-mono text-charcoal-400 italic text-center">
              [RecallIQ Notice: This bulletin is an explicitly labeled structured demonstration record modeled after official regulatory gazettes for evaluation and test integrity.]
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-ivory-200/50 border-t border-warmgrey-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-charcoal-800 text-white text-xs font-semibold rounded-xs hover:bg-charcoal-900 transition-colors"
          >
            Dismiss Bulletin
          </button>
        </div>
      </div>
    </div>
  );
};
