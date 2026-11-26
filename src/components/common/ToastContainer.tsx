import React from 'react';
import { useApp } from '../../context/AppContext';
import { AlertCircle, CheckCircle2, Info, AlertTriangle, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useApp();

  if (toasts.length === 0) return null;

  return (
    <aside aria-label="Notifications" className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => {
        const icon = {
          danger: <AlertCircle className="w-4 h-4 text-status-confirmed shrink-0 mt-0.5" />,
          warning: <AlertTriangle className="w-4 h-4 text-status-possible shrink-0 mt-0.5" />,
          success: <CheckCircle2 className="w-4 h-4 text-forest-green shrink-0 mt-0.5" />,
          info: <Info className="w-4 h-4 text-charcoal-700 shrink-0 mt-0.5" />
        }[toast.type];

        const border = {
          danger: 'border-status-confirmed bg-status-confirmed-bg',
          warning: 'border-status-possible bg-status-possible-bg',
          success: 'border-forest-green bg-forest-light',
          info: 'border-warmgrey-300 bg-ivory-50'
        }[toast.type];

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto p-3.5 rounded-xs border shadow-technical-md font-sans transition-all flex items-start justify-between gap-3 ${border}`}
          >
            <div className="flex items-start gap-2.5">
              {icon}
              <div>
                <h5 className="text-xs font-bold text-charcoal-900 leading-tight">
                  {toast.title}
                </h5>
                <p className="text-[11px] text-charcoal-700 mt-0.5 leading-snug">
                  {toast.message}
                </p>
              </div>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-charcoal-400 hover:text-charcoal-900 p-0.5 transition-colors"
              aria-label="Dismiss notification"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })}
    </aside>
  );
};
