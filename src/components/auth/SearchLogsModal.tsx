import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';
import { 
  X, Database, History, Trash2, Code2, List, 
  ExternalLink, Search, Clock, ShieldCheck, Copy, Check 
} from 'lucide-react';

export const SearchLogsModal: React.FC = () => {
  const { isSearchLogsModalOpen, setIsSearchLogsModalOpen, user, searchLogs, clearLogs } = useAuth();
  const { setActiveTab } = useApp();
  const [viewMode, setViewMode] = useState<'formatted' | 'json'>('formatted');
  const [copied, setCopied] = useState(false);

  if (!isSearchLogsModalOpen || !user) return null;

  const handleCopyJson = () => {
    navigator.clipboard.writeText(JSON.stringify(searchLogs, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal-900/75 backdrop-blur-sm animate-fadeIn">
      <div 
        className="bg-ivory-50 border border-warmgrey-300 rounded-sm shadow-technical max-w-2xl w-full max-h-[85vh] flex flex-col overflow-hidden text-charcoal-900"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Header */}
        <div className="bg-charcoal-900 text-ivory-100 px-6 py-4 flex items-center justify-between border-b border-charcoal-700">
          <div className="flex items-center gap-2">
            <History className="w-5 h-5 text-safety-orange" />
            <div>
              <h2 className="font-sans font-bold tracking-tight text-base">User Row Search Log Vault</h2>
              <p className="text-[10px] font-mono text-charcoal-400">
                USER ID: <span className="text-ivory-200">{user.id}</span> • ROW COLUMN: <span className="text-forest-green font-semibold">search_logs (JSONB)</span>
              </p>
            </div>
          </div>
          <button 
            onClick={() => setIsSearchLogsModalOpen(false)}
            className="text-charcoal-400 hover:text-white transition-colors p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Technical Architecture Info Pill */}
        <div className="bg-ivory-200/80 px-6 py-2.5 border-b border-warmgrey-200 flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-charcoal-700">
          <div className="flex items-center gap-2">
            <Database className="w-3.5 h-3.5 text-forest-green" />
            <span>Single-Row JSON: <strong>{searchLogs.length} Searches Saved</strong></span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode(viewMode === 'formatted' ? 'json' : 'formatted')}
              className="flex items-center gap-1.5 px-2.5 py-1 bg-white border border-warmgrey-300 rounded-xs text-[11px] font-mono hover:border-charcoal-600 transition-colors"
            >
              {viewMode === 'formatted' ? (
                <>
                  <Code2 className="w-3.5 h-3.5 text-safety-orange" />
                  <span>View Raw Row JSON</span>
                </>
              ) : (
                <>
                  <List className="w-3.5 h-3.5 text-forest-green" />
                  <span>View Formatted Logs</span>
                </>
              )}
            </button>

            {viewMode === 'json' && (
              <button
                onClick={handleCopyJson}
                className="flex items-center gap-1 px-2.5 py-1 bg-white border border-warmgrey-300 rounded-xs text-[11px] font-mono hover:text-safety-orange transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-forest-green" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy JSON'}</span>
              </button>
            )}

            {searchLogs.length > 0 && (
              <button
                onClick={clearLogs}
                className="flex items-center gap-1 px-2.5 py-1 bg-blood-red/10 text-blood-red border border-blood-red/20 rounded-xs text-[11px] font-mono hover:bg-blood-red/20 transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Reset Logs</span>
              </button>
            )}
          </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 font-sans">
          {searchLogs.length === 0 ? (
            <div className="text-center py-12 text-charcoal-500 font-mono text-xs">
              <Search className="w-8 h-8 mx-auto text-charcoal-300 mb-2" />
              <p>No search history recorded in your user row yet.</p>
              <p className="text-[11px] text-charcoal-400 mt-1">
                Searches performed on Global Recalls and Product Scans will automatically be appended to your row in JSON format.
              </p>
            </div>
          ) : viewMode === 'json' ? (
            <div>
              <div className="mb-2 text-[11px] font-mono text-charcoal-500 flex items-center justify-between">
                <span>ROW DATA PREVIEW [TABLE: public.app_users, COLUMN: search_logs]</span>
                <span>SIZE: {JSON.stringify(searchLogs).length} BYTES</span>
              </div>
              <pre className="p-4 bg-charcoal-900 text-ivory-200 font-mono text-xs rounded-xs overflow-x-auto border border-charcoal-700 leading-relaxed">
                {JSON.stringify(searchLogs, null, 2)}
              </pre>
            </div>
          ) : (
            <div className="space-y-2.5">
              {searchLogs.map((log) => (
                <div 
                  key={log.id}
                  className="p-3.5 bg-white border border-warmgrey-200 rounded-xs flex items-center justify-between gap-3 hover:border-warmgrey-400 transition-colors"
                >
                  <div className="flex items-start gap-3 min-w-0">
                    <div className="w-7 h-7 shrink-0 rounded-xs bg-ivory-200 flex items-center justify-center text-charcoal-700 border border-warmgrey-300 mt-0.5">
                      <Search className="w-3.5 h-3.5 text-safety-orange" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-sm text-charcoal-900 truncate">
                          "{log.query}"
                        </span>
                        <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 bg-ivory-100 border border-warmgrey-200 text-charcoal-600 rounded-xs">
                          {log.type.replace('_', ' ')}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-[11px] font-mono text-charcoal-500 mt-0.5">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-charcoal-400" />
                          {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                        </span>
                        {log.metadata?.category && (
                          <span>Category: {log.metadata.category}</span>
                        )}
                        {log.metadata?.brand && (
                          <span>Brand: {log.metadata.brand}</span>
                        )}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setIsSearchLogsModalOpen(false);
                      setActiveTab('recalls');
                    }}
                    className="text-xs font-mono text-safety-orange hover:underline shrink-0 flex items-center gap-1"
                  >
                    <span>View Gazette</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Modal Footer Note */}
        <div className="bg-ivory-100 border-t border-warmgrey-200 px-6 py-3 flex items-center justify-between text-[11px] font-mono text-charcoal-500">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-forest-green" />
            <span>All logs stored inside row <code className="text-charcoal-700 font-bold">{user.email}</code></span>
          </div>
          <button
            onClick={() => setIsSearchLogsModalOpen(false)}
            className="px-3 py-1 bg-charcoal-900 text-white rounded-xs hover:bg-charcoal-800 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
