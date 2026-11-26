import React from 'react';
import { AlertOctagon, AlertTriangle, CheckCircle2, HelpCircle } from 'lucide-react';
import { SafetyStatusType } from '../../types';

interface StatusBadgeProps {
  status: SafetyStatusType;
  size?: 'sm' | 'md' | 'lg';
  showDescription?: boolean;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ 
  status, 
  size = 'md',
  showDescription = false
}) => {
  const config = {
    confirmed: {
      label: 'Confirmed Recall Match',
      shortLabel: 'Confirmed Recall',
      description: 'Reliable product and batch identifiers match an official safety bulletin.',
      bg: 'bg-status-confirmed-bg',
      border: 'border-status-confirmed',
      text: 'text-status-confirmed',
      badgeBg: 'bg-status-confirmed',
      icon: AlertOctagon
    },
    possible: {
      label: 'Possible Recall Match',
      shortLabel: 'Possible Match',
      description: 'Some attributes match an active bulletin; physical batch check recommended.',
      bg: 'bg-status-possible-bg',
      border: 'border-status-possible',
      text: 'text-status-possible',
      badgeBg: 'bg-status-possible',
      icon: AlertTriangle
    },
    clear: {
      label: 'No Matching Recall Found',
      shortLabel: 'No Recall Match',
      description: 'No active bulletins found in official gazettes. Green does not guarantee total absence of uncataloged risks.',
      bg: 'bg-status-clear-bg',
      border: 'border-status-clear',
      text: 'text-status-clear',
      badgeBg: 'bg-status-clear',
      icon: CheckCircle2
    },
    unverified: {
      label: 'Unable to Verify',
      shortLabel: 'Unverified Data',
      description: 'Insufficient identifiers or incomplete barcode / packaging details extracted.',
      bg: 'bg-status-unverified-bg',
      border: 'border-status-unverified',
      text: 'text-status-unverified',
      badgeBg: 'bg-status-unverified',
      icon: HelpCircle
    }
  }[status];

  const Icon = config.icon;

  if (size === 'sm') {
    return (
      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xs font-mono text-[11px] font-semibold border ${config.bg} ${config.border} ${config.text}`}>
        <Icon className="w-3.5 h-3.5" />
        <span>{config.shortLabel}</span>
      </span>
    );
  }

  if (size === 'lg') {
    return (
      <div className={`p-4 rounded-xs border-2 ${config.bg} ${config.border}`}>
        <div className="flex items-center gap-3">
          <div className={`w-9 h-9 rounded-xs ${config.badgeBg} text-white flex items-center justify-center shrink-0`}>
            <Icon className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-[11px] uppercase tracking-wider text-charcoal-500 font-semibold">
                DETERMINATION RESULT
              </span>
              <span className={`font-mono text-xs font-bold px-2 py-0.5 rounded-xs text-white ${config.badgeBg}`}>
                {status.toUpperCase()}
              </span>
            </div>
            <h3 className={`text-xl font-bold font-sans tracking-tight ${config.text}`}>
              {config.label}
            </h3>
          </div>
        </div>
        {showDescription && (
          <p className="mt-2.5 text-xs text-charcoal-700 leading-relaxed font-sans border-t border-charcoal-200/40 pt-2.5">
            {config.description}
          </p>
        )}
      </div>
    );
  }

  // Medium default
  return (
    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xs font-sans text-xs font-semibold border ${config.bg} ${config.border} ${config.text}`}>
      <Icon className="w-4 h-4 shrink-0" />
      <span>{config.label}</span>
    </div>
  );
};
