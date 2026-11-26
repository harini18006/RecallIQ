import React from 'react';
import { MatchAnalysis } from '../../types';
import { CheckCircle2, XCircle, AlertTriangle, ShieldCheck, Database, HelpCircle } from 'lucide-react';

interface MatchAnalysisBreakdownProps {
  analysis: MatchAnalysis;
}

export const MatchAnalysisBreakdown: React.FC<MatchAnalysisBreakdownProps> = ({ analysis }) => {
  return (
    <div className="bg-ivory-50 border border-warmgrey-200 rounded-xs p-6 font-sans">
      <div className="flex items-center justify-between pb-4 border-b border-warmgrey-200 mb-5">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-wider text-charcoal-500 font-semibold">
            EXPLAINABLE AI ENGINE
          </span>
          <h3 className="text-base font-bold text-charcoal-900">
            Attribute-by-Attribute Verification Breakdown
          </h3>
        </div>
        <div className="font-mono text-xs text-charcoal-600 bg-ivory-200 px-2.5 py-1 rounded-xs border border-warmgrey-300">
          LEVENSHTEIN + LOT MATRIX
        </div>
      </div>

      {/* Comparison Parameters Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs font-sans border-collapse">
          <thead>
            <tr className="border-b border-warmgrey-300 text-[11px] font-mono uppercase text-charcoal-500">
              <th className="py-2.5 pr-4">Attribute Parameter</th>
              <th className="py-2.5 px-4">Evaluation Result</th>
              <th className="py-2.5 px-4">Similarity Score</th>
              <th className="py-2.5 pl-4">Institutional Impact</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-warmgrey-200 font-mono">
            {/* Product Name */}
            <tr>
              <td className="py-3 pr-4 font-semibold text-charcoal-900">
                Product Title Nomenclature
              </td>
              <td className="py-3 px-4">
                <span className={`inline-flex items-center gap-1 font-bold ${
                  analysis.nameSimilarity > 75 ? 'text-forest-green' : 'text-charcoal-600'
                }`}>
                  {analysis.nameSimilarity > 75 ? (
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  ) : (
                    <HelpCircle className="w-3.5 h-3.5" />
                  )}
                  {analysis.nameSimilarity > 75 ? 'Strong Lexical Match' : 'Ambient Similarity'}
                </span>
              </td>
              <td className="py-3 px-4 font-bold text-charcoal-900">
                {analysis.nameSimilarity}%
              </td>
              <td className="py-3 pl-4 text-charcoal-600 font-sans text-[11px]">
                Calculates token overlap and Levenshtein character distance against published bulletin headings.
              </td>
            </tr>

            {/* Brand Exactness */}
            <tr>
              <td className="py-3 pr-4 font-semibold text-charcoal-900">
                Brand & Manufacturer Entity
              </td>
              <td className="py-3 px-4">
                <span className={`inline-flex items-center gap-1 font-bold ${
                  analysis.brandExact ? 'text-forest-green' : 'text-status-possible'
                }`}>
                  {analysis.brandExact ? (
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  ) : (
                    <AlertTriangle className="w-3.5 h-3.5" />
                  )}
                  {analysis.brandExact ? 'Exact Entity Corroborated' : 'Variant / Alias Form'}
                </span>
              </td>
              <td className="py-3 px-4 font-bold text-charcoal-900">
                {analysis.brandExact ? '100%' : '65%'}
              </td>
              <td className="py-3 pl-4 text-charcoal-600 font-sans text-[11px]">
                Normalizes parent corporate entity and subsidiary consumer trade names.
              </td>
            </tr>

            {/* Batch / Lot Code */}
            <tr>
              <td className="py-3 pr-4 font-semibold text-charcoal-900">
                Batch / Lot Code Registry
              </td>
              <td className="py-3 px-4">
                <span className={`inline-flex items-center gap-1 font-bold ${
                  analysis.batchMatchStatus === 'EXACT_MATCH'
                    ? 'text-status-confirmed'
                    : analysis.batchMatchStatus === 'PATTERN_MATCH'
                    ? 'text-status-possible'
                    : 'text-forest-green'
                }`}>
                  {analysis.batchMatchStatus === 'EXACT_MATCH' && <XCircle className="w-3.5 h-3.5" />}
                  {analysis.batchMatchStatus === 'PATTERN_MATCH' && <AlertTriangle className="w-3.5 h-3.5" />}
                  {analysis.batchMatchStatus === 'NO_MATCH' && <CheckCircle2 className="w-3.5 h-3.5" />}
                  {analysis.batchMatchStatus === 'UNCERTAIN' && <HelpCircle className="w-3.5 h-3.5 text-charcoal-500" />}
                  {analysis.batchMatchStatus.replace('_', ' ')}
                </span>
              </td>
              <td className="py-3 px-4 font-bold text-charcoal-900">
                {analysis.batchMatchStatus === 'EXACT_MATCH' ? 'Deterministic' : 'Pattern Evaluated'}
              </td>
              <td className="py-3 pl-4 text-charcoal-600 font-sans text-[11px]">
                Determines whether packaging batch code falls within the recalled production run.
              </td>
            </tr>

            {/* Date Range Window */}
            <tr>
              <td className="py-3 pr-4 font-semibold text-charcoal-900">
                Manufacturing Date Window
              </td>
              <td className="py-3 px-4">
                <span className={`inline-flex items-center gap-1 font-bold ${
                  analysis.dateWindowMatch === 'WITHIN_WINDOW' 
                    ? 'text-status-confirmed' 
                    : analysis.dateWindowMatch === 'OUTSIDE_WINDOW'
                    ? 'text-forest-green'
                    : 'text-charcoal-500'
                }`}>
                  {analysis.dateWindowMatch.replace('_', ' ')}
                </span>
              </td>
              <td className="py-3 px-4 font-bold text-charcoal-900">
                {analysis.dateWindowMatch === 'WITHIN_WINDOW' ? 'Within Range' : 'Outside / None'}
              </td>
              <td className="py-3 pl-4 text-charcoal-600 font-sans text-[11px]">
                Validates if packaging production timestamp correlates with the regulatory quarantine dates.
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Explanatory Bullet Reasons */}
      <div className="mt-5 pt-4 border-t border-warmgrey-200">
        <h4 className="text-xs font-mono uppercase font-bold text-charcoal-800 mb-2">
          Specific Matching Justifications:
        </h4>
        <ul className="space-y-1.5 text-xs text-charcoal-700">
          {analysis.matchReasons.map((reason, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="text-safety-orange font-bold font-mono">▸</span>
              <span>{reason}</span>
            </li>
          ))}
          {analysis.unmatchedAttributes.map((unmatched, i) => (
            <li key={`un-${i}`} className="flex items-start gap-2 text-charcoal-500">
              <span className="font-mono">▹</span>
              <span>Unmatched parameter: {unmatched}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
