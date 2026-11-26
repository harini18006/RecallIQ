import React from 'react';
import { MatchAnalysis } from '../../types';
import { Clock, ShieldAlert, CheckCircle, AlertTriangle } from 'lucide-react';

interface RecallTimelineProps {
  timeline: MatchAnalysis['explanationTimeline'];
}

export const RecallTimeline: React.FC<RecallTimelineProps> = ({ timeline }) => {
  return (
    <div className="bg-ivory-50 border border-warmgrey-200 rounded-xs p-6 font-sans">
      <div className="flex items-center gap-2 pb-4 border-b border-warmgrey-200 mb-5">
        <Clock className="w-4 h-4 text-charcoal-700" />
        <h3 className="text-sm font-bold text-charcoal-900 font-mono uppercase tracking-wider">
          Explainable Verification Chronology
        </h3>
      </div>

      <div className="relative border-l-2 border-warmgrey-300 ml-3 space-y-6">
        {timeline.map((item, index) => {
          const typeDot = {
            danger: 'bg-status-confirmed ring-4 ring-status-confirmed/20',
            warning: 'bg-status-possible ring-4 ring-status-possible/20',
            success: 'bg-forest-green ring-4 ring-forest-green/20',
            neutral: 'bg-charcoal-600 ring-4 ring-charcoal-600/20'
          }[item.type];

          return (
            <div key={index} className="relative pl-6">
              {/* Timeline Node Dot */}
              <div className={`absolute -left-[9px] top-1 w-4 h-4 rounded-full ${typeDot} transition-all`} />
              
              <div>
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="font-bold text-charcoal-900 uppercase">
                    {item.stage}
                  </span>
                  <span className="text-[10px] text-charcoal-400">
                    {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                <p className="text-xs text-charcoal-700 mt-1 leading-relaxed font-sans">
                  {item.detail}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
