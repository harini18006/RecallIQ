import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CameraScanner } from '../components/scanner/CameraScanner';
import { ProductIdentificationCard } from '../components/scanner/ProductIdentificationCard';
import { ScannedProduct } from '../types';
import { SAMPLE_PRODUCTS } from '../data/mockRecalls';
import { ShieldAlert, ArrowLeft, Info, HelpCircle, CheckCircle2 } from 'lucide-react';

export const ScannerPage: React.FC = () => {
  const { currentProduct, setCurrentProduct, executeScanAndVerify, setActiveTab } = useApp();
  const [isVerifying, setIsVerifying] = useState(false);

  // Active product to edit and inspect
  const activeProduct = currentProduct || SAMPLE_PRODUCTS[0];

  const handleProductIdentified = (product: ScannedProduct) => {
    setCurrentProduct(product);
  };

  const handleUpdateProduct = (updated: ScannedProduct) => {
    setCurrentProduct(updated);
  };

  const handleInitiateVerification = () => {
    setIsVerifying(true);
    // Simulate brief algorithmic cross-correlation animation
    setTimeout(() => {
      setIsVerifying(false);
      executeScanAndVerify(activeProduct);
    }, 1100);
  };

  return (
    <div className="min-h-screen bg-ivory-100 text-charcoal-800 font-sans py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Navigation Breadcrumb & Page Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-warmgrey-200 mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-charcoal-500 uppercase mb-1">
              <button 
                onClick={() => setActiveTab('landing')}
                className="hover:text-charcoal-900 flex items-center gap-1"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Return to Discover</span>
              </button>
              <span>/</span>
              <span className="text-safety-orange font-bold">Universal Product Scanner</span>
            </div>
            <h1 className="text-3xl font-extrabold text-charcoal-900 font-sans tracking-tight">
              Universal AI Product Scanner
            </h1>
            <p className="text-xs sm:text-sm text-charcoal-600 mt-1">
              Align physical packaging or barcode in the live sensor frame to extract batch codes and test against official gazettes.
            </p>
          </div>

          {/* Step Sequence Indicator */}
          <div className="flex items-center gap-1.5 font-mono text-xs overflow-x-auto py-1">
            <div className="flex items-center gap-1 px-2.5 py-1 bg-charcoal-900 text-white rounded-xs font-bold">
              <span>01</span>
              <span className="hidden sm:inline">IDENTIFY</span>
            </div>
            <span className="text-charcoal-400">→</span>
            <div className="flex items-center gap-1 px-2.5 py-1 bg-ivory-200 text-charcoal-800 rounded-xs font-bold border border-warmgrey-300">
              <span>02</span>
              <span className="hidden sm:inline">EXTRACT</span>
            </div>
            <span className="text-charcoal-400">→</span>
            <div className="flex items-center gap-1 px-2.5 py-1 bg-ivory-200 text-charcoal-500 rounded-xs">
              <span>03</span>
              <span className="hidden sm:inline">MATCH</span>
            </div>
            <span className="text-charcoal-400">→</span>
            <div className="flex items-center gap-1 px-2.5 py-1 bg-ivory-200 text-charcoal-500 rounded-xs">
              <span>04</span>
              <span className="hidden sm:inline">VERIFY</span>
            </div>
          </div>
        </div>

        {/* Central Two-Column Scanning Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column (7 cols): Camera / Barcode / OCR Viewfinder */}
          <div className="lg:col-span-7 space-y-4">
            <CameraScanner
              onProductIdentified={handleProductIdentified}
              onInstantVerifyReport={(prod) => {
                handleProductIdentified(prod);
                executeScanAndVerify(prod);
              }}
              isAnalyzing={isVerifying}
            />

            {/* Quick tips box */}
            <div className="bg-ivory-50 border border-warmgrey-200 p-4 rounded-xs text-xs font-sans text-charcoal-600 flex items-start gap-3">
              <Info className="w-4 h-4 text-safety-orange shrink-0 mt-0.5" />
              <div>
                <strong className="text-charcoal-900 font-mono uppercase text-[11px]">AI Vision & Recall Tip:</strong> Upload any product packaging photo or select a preset sample. Groq Vision AI scans the physical box or label, reads the lot number, and generates a full explainable safety report with official FDA/CPSC source citations.
              </div>
            </div>
          </div>

          {/* Right Column (5 cols): Product Identification & Verification Panel */}
          <div className="lg:col-span-5">
            <ProductIdentificationCard
              product={activeProduct}
              onUpdateProduct={handleUpdateProduct}
              onVerify={handleInitiateVerification}
              isVerifying={isVerifying}
            />
          </div>

        </div>

      </div>
    </div>
  );
};
