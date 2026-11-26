import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { StatusBadge } from '../components/common/StatusBadge';
import { 
  Archive, ShieldAlert, Plus, Trash2, Bell, BellOff, ExternalLink, 
  Calendar, Hash, CheckCircle2, AlertOctagon, Sparkles, RefreshCw, Smartphone
} from 'lucide-react';
import { DEMO_RECALLS } from '../data/mockRecalls';

export const SafetyVaultPage: React.FC = () => {
  const { 
    savedVault, 
    removeFromVault, 
    toggleVaultNotification, 
    executeScanAndVerify, 
    setActiveTab, 
    addToast, 
    setSelectedRecallForModal 
  } = useApp();

  const [filterTab, setFilterTab] = useState<'all' | 'flagged' | 'clear'>('all');

  // Metrics
  const totalCount = savedVault.length;
  const flaggedCount = savedVault.filter(i => i.currentStatus === 'confirmed' || i.currentStatus === 'possible').length;
  const clearCount = savedVault.filter(i => i.currentStatus === 'clear').length;

  const filteredItems = savedVault.filter(item => {
    if (filterTab === 'flagged') return item.currentStatus === 'confirmed' || item.currentStatus === 'possible';
    if (filterTab === 'clear') return item.currentStatus === 'clear';
    return true;
  });

  // Dynamic simulation of a new recall alert triggered on an existing vault product
  const handleSimulateNewAlert = () => {
    addToast(
      'ALERT TRIGGERED: New Recall Notification',
      'CPSC published urgent safety bulletin #2024-1492 for VoltCharge GaN Charger. Push and SMS alerts dispatched.',
      'danger'
    );
  };

  return (
    <div className="min-h-screen bg-ivory-100 text-charcoal-800 font-sans py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Page Header */}
        <div className="pb-8 border-b border-warmgrey-200 mb-8">
          <div className="flex items-center gap-2 font-mono text-xs text-charcoal-500 uppercase mb-2">
            <Archive className="w-4 h-4 text-safety-orange" />
            <span>PERSONAL PRODUCT RECALL SURVEILLANCE</span>
            <span>•</span>
            <span className="text-forest-green font-bold">24/7 ACTIVE MONITORING</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-charcoal-900 font-sans tracking-tight">
                Personal Safety Vault
              </h1>
              <p className="text-sm text-charcoal-600 mt-1 max-w-2xl leading-relaxed">
                Your private inventory of monitored household products. RecallIQ continuously scans newly published gazettes against your registered batch codes.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleSimulateNewAlert}
                className="px-3.5 py-2 bg-white border border-warmgrey-300 hover:bg-ivory-200 text-charcoal-800 text-xs font-mono font-bold rounded-xs flex items-center gap-1.5 transition-colors"
                title="Test how RecallIQ proactively dispatches real-time recall notifications"
              >
                <Sparkles className="w-3.5 h-3.5 text-safety-orange" />
                <span>SIMULATE RECALL ALERT</span>
              </button>

              <button
                onClick={() => setActiveTab('scanner')}
                className="px-4 py-2 bg-safety-orange hover:bg-safety-orange-hover text-white text-xs font-mono font-bold rounded-xs flex items-center gap-1.5 transition-colors shadow-sm"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>ADD NEW PRODUCT</span>
              </button>
            </div>
          </div>
        </div>

        {/* 4-Metric Institutional Summary Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <div className="bg-white border border-warmgrey-200 p-4 rounded-xs shadow-technical">
            <span className="text-[11px] font-mono text-charcoal-500 uppercase block mb-1">
              Total Monitored Products
            </span>
            <div className="text-2xl font-bold font-mono text-charcoal-900">
              {totalCount}
            </div>
            <span className="text-[10px] font-mono text-charcoal-400">Pantry & Electronics</span>
          </div>

          <div className="bg-white border border-warmgrey-200 p-4 rounded-xs shadow-technical">
            <span className="text-[11px] font-mono text-status-confirmed uppercase block mb-1 font-bold">
              Active Recall Matches
            </span>
            <div className="text-2xl font-bold font-mono text-status-confirmed">
              {flaggedCount}
            </div>
            <span className="text-[10px] font-mono text-charcoal-400">Immediate Action Advised</span>
          </div>

          <div className="bg-white border border-warmgrey-200 p-4 rounded-xs shadow-technical">
            <span className="text-[11px] font-mono text-forest-green uppercase block mb-1 font-bold">
              Verified Clean Lots
            </span>
            <div className="text-2xl font-bold font-mono text-forest-green">
              {clearCount}
            </div>
            <span className="text-[10px] font-mono text-charcoal-400">No Bulletins Found</span>
          </div>

          <div className="bg-white border border-warmgrey-200 p-4 rounded-xs shadow-technical">
            <span className="text-[11px] font-mono text-charcoal-500 uppercase block mb-1">
              Surveillance Status
            </span>
            <div className="text-xs font-bold font-mono text-forest-green flex items-center gap-1.5 mt-2">
              <span className="w-2 h-2 rounded-full bg-forest-green animate-pulse"></span>
              <span>SYNCHRONIZED</span>
            </div>
            <span className="text-[10px] font-mono text-charcoal-400">Refreshed: Just now</span>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 border-b border-warmgrey-200 pb-3 mb-6 font-mono text-xs">
          <button
            onClick={() => setFilterTab('all')}
            className={`px-3 py-1.5 rounded-xs transition-colors font-semibold ${
              filterTab === 'all' 
                ? 'bg-charcoal-900 text-white' 
                : 'text-charcoal-600 hover:text-charcoal-900 hover:bg-ivory-200'
            }`}
          >
            All Tracked Items ({totalCount})
          </button>

          <button
            onClick={() => setFilterTab('flagged')}
            className={`px-3 py-1.5 rounded-xs transition-colors font-semibold flex items-center gap-1.5 ${
              filterTab === 'flagged' 
                ? 'bg-status-confirmed text-white' 
                : 'text-charcoal-600 hover:text-charcoal-900 hover:bg-ivory-200'
            }`}
          >
            <span>Flagged Recalls ({flaggedCount})</span>
          </button>

          <button
            onClick={() => setFilterTab('clear')}
            className={`px-3 py-1.5 rounded-xs transition-colors font-semibold ${
              filterTab === 'clear' 
                ? 'bg-forest-green text-white' 
                : 'text-charcoal-600 hover:text-charcoal-900 hover:bg-ivory-200'
            }`}
          >
            Verified Clear ({clearCount})
          </button>
        </div>

        {/* Product Inventory Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => {
            const isRecalled = item.currentStatus === 'confirmed';
            const isPossible = item.currentStatus === 'possible';

            return (
              <div
                key={item.id}
                className={`bg-white border rounded-xs p-5 shadow-technical flex flex-col justify-between transition-all ${
                  isRecalled 
                    ? 'border-status-confirmed shadow-status-confirmed/10' 
                    : isPossible
                    ? 'border-status-possible'
                    : 'border-warmgrey-200'
                }`}
              >
                <div>
                  {/* Top status & removal */}
                  <div className="flex items-center justify-between pb-3 border-b border-warmgrey-200 mb-3">
                    <StatusBadge status={item.currentStatus} size="sm" />
                    <button
                      onClick={() => removeFromVault(item.id)}
                      className="text-charcoal-400 hover:text-status-confirmed transition-colors p-1"
                      title="Remove from Vault"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Product photo and titles */}
                  <div className="flex gap-3.5 items-start mb-4">
                    <img 
                      src={item.product.image} 
                      alt={item.product.name} 
                      className="w-16 h-16 object-cover rounded-xs border border-warmgrey-300 shrink-0 bg-ivory-50"
                    />
                    <div className="min-w-0">
                      <span className="text-[10px] font-mono uppercase text-safety-orange font-bold tracking-wider">
                        {item.product.brand}
                      </span>
                      <h4 className="text-sm font-bold text-charcoal-900 leading-snug line-clamp-2">
                        {item.product.name}
                      </h4>
                    </div>
                  </div>

                  {/* Technical Metadata Specs */}
                  <div className="bg-ivory-50 border border-warmgrey-200 p-2.5 rounded-xs space-y-1.5 font-mono text-xs mb-4">
                    <div className="flex justify-between">
                      <span className="text-charcoal-500">Tracked Batch:</span>
                      <strong className="text-charcoal-900">{item.product.batchNumber || 'Unassigned'}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-charcoal-500">Model Rev:</span>
                      <strong className="text-charcoal-900">{item.product.model || 'Standard'}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-charcoal-500">Added to Vault:</span>
                      <span className="text-charcoal-700">{item.savedDate}</span>
                    </div>
                  </div>

                  {/* Notification Channels Toggle */}
                  <div className="pt-2 border-t border-warmgrey-200 mb-4">
                    <span className="text-[10px] font-mono text-charcoal-500 uppercase block mb-1.5">
                      Proactive Alert Channels:
                    </span>
                    <div className="flex items-center gap-2 font-mono text-[11px]">
                      <button
                        onClick={() => toggleVaultNotification(item.id, 'email')}
                        className={`px-2 py-0.5 rounded-xs border transition-colors ${
                          item.notificationChannels.email 
                            ? 'bg-ivory-200 border-charcoal-600 font-bold text-charcoal-900' 
                            : 'border-warmgrey-300 text-charcoal-400'
                        }`}
                      >
                        EMAIL
                      </button>
                      <button
                        onClick={() => toggleVaultNotification(item.id, 'sms')}
                        className={`px-2 py-0.5 rounded-xs border transition-colors ${
                          item.notificationChannels.sms 
                            ? 'bg-ivory-200 border-charcoal-600 font-bold text-charcoal-900' 
                            : 'border-warmgrey-300 text-charcoal-400'
                        }`}
                      >
                        SMS
                      </button>
                      <button
                        onClick={() => toggleVaultNotification(item.id, 'push')}
                        className={`px-2 py-0.5 rounded-xs border transition-colors ${
                          item.notificationChannels.push 
                            ? 'bg-ivory-200 border-charcoal-600 font-bold text-charcoal-900' 
                            : 'border-warmgrey-300 text-charcoal-400'
                        }`}
                      >
                        PUSH
                      </button>
                    </div>
                  </div>
                </div>

                {/* Audit Action */}
                <button
                  onClick={() => executeScanAndVerify(item.product)}
                  className="w-full py-2 bg-charcoal-900 hover:bg-safety-orange text-white text-xs font-mono font-bold rounded-xs flex items-center justify-center gap-1.5 transition-colors"
                >
                  <span>VIEW FULL SAFETY REPORT</span>
                </button>
              </div>
            );
          })}
        </div>

        {filteredItems.length === 0 && (
          <div className="p-12 text-center bg-white border border-warmgrey-200 rounded-xs">
            <Archive className="w-8 h-8 text-charcoal-400 mx-auto mb-2" />
            <h3 className="text-sm font-bold text-charcoal-900 font-mono">No Items in This Filter View</h3>
            <p className="text-xs text-charcoal-500 mt-1">
              Scan additional products or adjust the tab filter above.
            </p>
          </div>
        )}

      </div>
    </div>
  );
};
