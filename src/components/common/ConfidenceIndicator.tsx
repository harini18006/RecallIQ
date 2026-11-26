import React from 'react';
import { Gauge, Info } from 'lucide-react';

interface ConfidenceIndicatorProps {
  score: number; // 0 to 100
  size?: 'sm' | 'md';
}

export const ConfidenceIndicator: React.FC<ConfidenceIndicatorProps> = ({ score, size = 'md' }) => {
  const getLevel = (s: number) => {
    if (s >= 80) return { label: 'High Deterministic Alignment', color: 'text-forest-green', bar: 'bg-forest-green' };
    if (s >= 50) return { label: 'Moderate Attribute Correlation', color: 'text-status-possible', bar: 'bg-status-possible' };
    return { label: 'Low / Ambient Match', color: 'text-charcoal-500', bar: 'bg-charcoal-400' };
  };

  const level = getLevel(score);

  return (
    <div className="bg-ivory-50 border border-warmgrey-200 p-3 rounded-xs font-mono">
      <div className="flex items-center justify-between text-xs text-charcoal-600 mb-1.5">
        <div className="flex items-center gap-1.5">
          <Gauge className="w-3.5 h-3.5 text-charcoal-700" />
          <span className="font-semibold text-charcoal-900 uppercase">Verification Confidence</span>
        </div>
        <span className="font-bold text-charcoal-900 text-sm">{score}%</span>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-warmgrey-200 h-2 rounded-xs overflow-hidden">
        <div 
          className={`h-full ${level.bar} transition-all duration-700`}
          style={{ width: `${score}%` }}
        />
      </div>

      <div className="flex items-center justify-between text-[11px] text-charcoal-500 mt-2">
        <span className={`font-semibold ${level.color}`}>{level.label}</span>
        <span className="text-[10px] text-charcoal-400 italic">Score != Legal Proof</span>
      </div>
    </div>
  );
};
