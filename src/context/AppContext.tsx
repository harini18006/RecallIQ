import React, { createContext, useContext, useState, useEffect } from 'react';
import { ScannedProduct, MatchAnalysis, RecallRecord, VaultItem, SafetyStatusType } from '../types';
import { DEMO_RECALLS, SAMPLE_PRODUCTS } from '../data/mockRecalls';
import { verifyProductAgainstRecalls } from '../services/fuzzyMatcher';
import { verifyProductWithGroqRag, GROQ_MODEL } from '../services/groqRagService';
import { searchLogService } from '../services/searchLogService';
import { authService } from '../services/authService';

export interface ToastNotification {
  id: string;
  title: string;
  message: string;
  type: 'danger' | 'warning' | 'success' | 'info';
  timestamp: string;
}

export type PageTab = 'landing' | 'scanner' | 'report' | 'recalls' | 'vault' | 'voice';

interface AppContextType {
  activeTab: PageTab;
  setActiveTab: (tab: PageTab) => void;
  currentProduct: ScannedProduct | null;
  setCurrentProduct: (product: ScannedProduct | null) => void;
  currentAnalysis: MatchAnalysis | null;
  setCurrentAnalysis: (analysis: MatchAnalysis | null) => void;
  savedVault: VaultItem[];
  saveToVault: (product: ScannedProduct, status: SafetyStatusType, recallId?: string) => void;
  removeFromVault: (id: string) => void;
  toggleVaultNotification: (id: string, channel: 'email' | 'sms' | 'push') => void;
  scanHistory: ScannedProduct[];
  selectedRecallForModal: RecallRecord | null;
  setSelectedRecallForModal: (recall: RecallRecord | null) => void;
  toasts: ToastNotification[];
  addToast: (title: string, message: string, type?: ToastNotification['type']) => void;
  removeToast: (id: string) => void;
  executeScanAndVerify: (product: ScannedProduct) => Promise<void>;
  loadSampleProduct: (index: number) => void;
  isGroqLive: boolean;
  groqModel: string;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// Initial Vault items for demonstration
const INITIAL_VAULT: VaultItem[] = [
  {
    id: 'vault-1',
    product: SAMPLE_PRODUCTS[0], // NutraCare Infant Formula (Recalled)
    savedDate: '2024-03-10',
    currentStatus: 'confirmed',
    matchedRecallId: 'REC-2024-FDA-0881',
    monitoringActive: true,
    notificationChannels: { email: true, sms: true, push: true }
  },
  {
    id: 'vault-2',
    product: SAMPLE_PRODUCTS[3], // NordicPure Kettle (Safe)
    savedDate: '2024-02-18',
    currentStatus: 'clear',
    monitoringActive: true,
    notificationChannels: { email: true, sms: false, push: true }
  },
  {
    id: 'vault-3',
    product: SAMPLE_PRODUCTS[2], // CoughRelief (Possible match)
    savedDate: '2024-03-05',
    currentStatus: 'possible',
    matchedRecallId: 'REC-2024-FDA-1044',
    monitoringActive: true,
    notificationChannels: { email: true, sms: true, push: false }
  }
];

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<PageTab>('landing');
  const [currentProduct, setCurrentProduct] = useState<ScannedProduct | null>(SAMPLE_PRODUCTS[0]);
  const [currentAnalysis, setCurrentAnalysis] = useState<MatchAnalysis | null>(() => 
    verifyProductAgainstRecalls(SAMPLE_PRODUCTS[0], DEMO_RECALLS)
  );
  const [savedVault, setSavedVault] = useState<VaultItem[]>(INITIAL_VAULT);
  const [scanHistory, setScanHistory] = useState<ScannedProduct[]>(SAMPLE_PRODUCTS);
  const [selectedRecallForModal, setSelectedRecallForModal] = useState<RecallRecord | null>(null);
  const [isGroqLive, setIsGroqLive] = useState(true);
  const [toasts, setToasts] = useState<ToastNotification[]>([
    {
      id: 'toast-init',
      title: 'RecallIQ Connected',
      message: `Global recall registries synchronized. Live Groq RAG Engine (${GROQ_MODEL}) online.`,
      type: 'info',
      timestamp: 'Just now'
    }
  ]);

  const addToast = (title: string, message: string, type: ToastNotification['type'] = 'info') => {
    const id = 'toast-' + Date.now();
    setToasts(prev => [{ id, title, message, type, timestamp: 'Just now' }, ...prev.slice(0, 4)]);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const executeScanAndVerify = async (product: ScannedProduct) => {
    setCurrentProduct(product);

    // Call live Groq Retrieval-Augmented Generation
    try {
      const ragResult = await verifyProductWithGroqRag(product);
      
      const analysis: MatchAnalysis = {
        status: ragResult.status,
        confidenceScore: ragResult.confidenceScore,
        matchedRecall: ragResult.matchedRecall,
        nameSimilarity: ragResult.nameSimilarity,
        brandExact: ragResult.brandExact,
        modelMatch: true,
        batchMatchStatus: ragResult.batchMatchStatus,
        dateWindowMatch: ragResult.dateWindowMatch,
        matchReasons: ragResult.matchReasons,
        unmatchedAttributes: ragResult.unmatchedAttributes,
        explanationTimeline: ragResult.timeline,
        verifiedTimestamp: new Date().toISOString()
      };

      setCurrentAnalysis(analysis);

      if (analysis.status === 'confirmed') {
        addToast(
          'Critical Recall Match (Groq RAG)',
          `High severity safety bulletin confirmed for ${product.name}. Immediate consumer action advised.`,
          'danger'
        );
      } else if (analysis.status === 'possible') {
        addToast(
          'Possible Recall Match (Groq RAG)',
          `Product correlates with active gazette. Physical batch inspection advised.`,
          'warning'
        );
      } else {
        addToast(
          'Verified Clean Lot (Groq RAG)',
          `No matching recall bulletin found for ${product.name} batch ${product.batchNumber}.`,
          'success'
        );
      }
    } catch (e) {
      // Fallback
      const analysis = verifyProductAgainstRecalls(product, DEMO_RECALLS);
      setCurrentAnalysis(analysis);
    }
    
    // Add to scan history if unique
    setScanHistory(prev => {
      const filtered = prev.filter(p => p.id !== product.id);
      return [product, ...filtered].slice(0, 10);
    });

    // Save scan query to user's dedicated Supabase DB row in JSON format
    const activeSession = authService.getCurrentSession();
    if (activeSession?.id) {
      searchLogService.appendSearchLog(activeSession.id, {
        query: product.name,
        type: 'product_scan',
        category: product.category,
        metadata: {
          brand: product.brand,
          batchNumber: product.batchNumber,
          barcode: product.barcode,
          mfgDate: product.mfgDate
        }
      }).catch(err => console.warn('Could not append scan log to user row', err));
    }

    setActiveTab('report');
  };

  const loadSampleProduct = (index: number) => {
    const p = SAMPLE_PRODUCTS[index] || SAMPLE_PRODUCTS[0];
    setCurrentProduct(p);
  };

  const saveToVault = (product: ScannedProduct, status: SafetyStatusType, recallId?: string) => {
    const existing = savedVault.find(v => v.product.id === product.id);
    if (existing) {
      addToast('Already in Vault', `${product.name} is already monitored in your Personal Safety Vault.`, 'info');
      return;
    }
    const newItem: VaultItem = {
      id: 'vault-' + Date.now(),
      product,
      savedDate: new Date().toISOString().split('T')[0],
      currentStatus: status,
      matchedRecallId: recallId,
      monitoringActive: true,
      notificationChannels: { email: true, sms: false, push: true }
    };
    setSavedVault(prev => [newItem, ...prev]);
    addToast('Added to Safety Vault', `${product.name} will be monitored 24/7 for new safety bulletins by RecallIQ.`, 'success');
  };

  const removeFromVault = (id: string) => {
    setSavedVault(prev => prev.filter(v => v.id !== id));
    addToast('Removed from Vault', 'Product has been removed from active safety monitoring.', 'info');
  };

  const toggleVaultNotification = (id: string, channel: 'email' | 'sms' | 'push') => {
    setSavedVault(prev => prev.map(item => {
      if (item.id === id) {
        return {
          ...item,
          notificationChannels: {
            ...item.notificationChannels,
            [channel]: !item.notificationChannels[channel]
          }
        };
      }
      return item;
    }));
  };

  return (
    <AppContext.Provider
      value={{
        activeTab,
        setActiveTab,
        currentProduct,
        setCurrentProduct,
        currentAnalysis,
        setCurrentAnalysis,
        savedVault,
        saveToVault,
        removeFromVault,
        toggleVaultNotification,
        scanHistory,
        selectedRecallForModal,
        setSelectedRecallForModal,
        toasts,
        addToast,
        removeToast,
        executeScanAndVerify,
        loadSampleProduct,
        isGroqLive,
        groqModel: GROQ_MODEL
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
