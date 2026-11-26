import React, { useState, useEffect } from 'react';
import { ScannedProduct } from '../../types';
import { Edit3, Check, ArrowRight, ShieldCheck, Hash, Calendar, Tag, Layers, RefreshCw } from 'lucide-react';

interface ProductIdentificationCardProps {
  product: ScannedProduct;
  onUpdateProduct: (updated: ScannedProduct) => void;
  onVerify: () => void;
  isVerifying: boolean;
}

export const ProductIdentificationCard: React.FC<ProductIdentificationCardProps> = ({
  product,
  onUpdateProduct,
  onVerify,
  isVerifying
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<ScannedProduct>(product);

  useEffect(() => {
    setFormData(product);
  }, [product]);

  const handleChange = (field: keyof ScannedProduct, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    onUpdateProduct(formData);
    setIsEditing(false);
  };

  return (
    <div className="bg-ivory-50 border border-warmgrey-200 rounded-xs shadow-technical-md p-6 font-sans flex flex-col justify-between">
      <div>
        {/* Step Indicator Header */}
        <div className="flex items-center justify-between pb-4 border-b border-warmgrey-200 mb-5">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-bold px-2 py-0.5 bg-charcoal-900 text-white rounded-xs">
              STEP 02
            </span>
            <h3 className="text-sm font-bold text-charcoal-900 uppercase font-mono tracking-wider">
              Extracted Product Identification
            </h3>
          </div>
          <button
            onClick={() => {
              if (isEditing) handleSave();
              else setIsEditing(true);
            }}
            className="flex items-center gap-1 text-xs font-mono text-charcoal-600 hover:text-charcoal-900 transition-colors"
          >
            {isEditing ? (
              <>
                <Check className="w-3.5 h-3.5 text-forest-green" />
                <span className="font-bold text-forest-green">SAVE EDITS</span>
              </>
            ) : (
              <>
                <Edit3 className="w-3.5 h-3.5" />
                <span>MANUAL OVERRIDE</span>
              </>
            )}
          </button>
        </div>

        {/* Product Snapshot & Metadata Form */}
        <div className="flex gap-4 items-start mb-6">
          <img 
            src={formData.image} 
            alt={formData.name} 
            className="w-20 h-20 object-cover rounded-xs border border-warmgrey-300 shrink-0 bg-white" 
          />
          <div className="flex-1 min-w-0">
            {isEditing ? (
              <div className="space-y-2">
                <div>
                  <label className="text-[10px] font-mono text-charcoal-500 uppercase">Product Title</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    className="w-full text-xs font-semibold p-1.5 border border-warmgrey-300 rounded-xs bg-white text-charcoal-900 focus:outline-none focus:border-safety-orange"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-mono text-charcoal-500 uppercase">Brand / Manufacturer</label>
                  <input
                    type="text"
                    value={formData.brand}
                    onChange={(e) => handleChange('brand', e.target.value)}
                    className="w-full text-xs font-semibold p-1.5 border border-warmgrey-300 rounded-xs bg-white text-charcoal-900 focus:outline-none focus:border-safety-orange"
                  />
                </div>
              </div>
            ) : (
              <div>
                <span className="text-[11px] font-mono uppercase text-safety-orange font-bold tracking-wider">
                  {formData.brand}
                </span>
                <h4 className="text-base font-bold text-charcoal-900 leading-snug line-clamp-2">
                  {formData.name}
                </h4>
                <div className="mt-1 text-xs font-mono text-charcoal-500">
                  Barcode: <span className="font-semibold text-charcoal-800">{formData.barcode}</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Technical Attributes Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
          {/* Batch / Lot */}
          <div className="bg-ivory-100 border border-warmgrey-200 p-2.5 rounded-xs">
            <div className="flex items-center gap-1.5 text-[10px] font-mono text-charcoal-500 uppercase mb-1">
              <Hash className="w-3.5 h-3.5 text-safety-orange" />
              <span>Lot / Batch Number</span>
            </div>
            {isEditing ? (
              <input
                type="text"
                value={formData.batchNumber}
                onChange={(e) => handleChange('batchNumber', e.target.value)}
                className="w-full text-xs font-mono font-bold p-1 border border-warmgrey-300 rounded-xs bg-white"
              />
            ) : (
              <div className="text-xs font-mono font-bold text-charcoal-900">
                {formData.batchNumber || 'Unassigned / Unscanned'}
              </div>
            )}
          </div>

          {/* Model Number */}
          <div className="bg-ivory-100 border border-warmgrey-200 p-2.5 rounded-xs">
            <div className="flex items-center gap-1.5 text-[10px] font-mono text-charcoal-500 uppercase mb-1">
              <Layers className="w-3.5 h-3.5 text-forest-green" />
              <span>Model / Revision</span>
            </div>
            {isEditing ? (
              <input
                type="text"
                value={formData.model}
                onChange={(e) => handleChange('model', e.target.value)}
                className="w-full text-xs font-mono font-bold p-1 border border-warmgrey-300 rounded-xs bg-white"
              />
            ) : (
              <div className="text-xs font-mono font-bold text-charcoal-900">
                {formData.model || 'Standard Hardware Rev'}
              </div>
            )}
          </div>

          {/* Manufacturing Date */}
          <div className="bg-ivory-100 border border-warmgrey-200 p-2.5 rounded-xs">
            <div className="flex items-center gap-1.5 text-[10px] font-mono text-charcoal-500 uppercase mb-1">
              <Calendar className="w-3.5 h-3.5 text-charcoal-600" />
              <span>Mfg Date</span>
            </div>
            {isEditing ? (
              <input
                type="date"
                value={formData.mfgDate}
                onChange={(e) => handleChange('mfgDate', e.target.value)}
                className="w-full text-xs font-mono font-bold p-1 border border-warmgrey-300 rounded-xs bg-white"
              />
            ) : (
              <div className="text-xs font-mono font-bold text-charcoal-900">
                {formData.mfgDate || 'N/A'}
              </div>
            )}
          </div>

          {/* Expiry Date */}
          <div className="bg-ivory-100 border border-warmgrey-200 p-2.5 rounded-xs">
            <div className="flex items-center gap-1.5 text-[10px] font-mono text-charcoal-500 uppercase mb-1">
              <Calendar className="w-3.5 h-3.5 text-charcoal-600" />
              <span>Expiry Date</span>
            </div>
            {isEditing ? (
              <input
                type="text"
                value={formData.expiryDate}
                onChange={(e) => handleChange('expiryDate', e.target.value)}
                className="w-full text-xs font-mono font-bold p-1 border border-warmgrey-300 rounded-xs bg-white"
              />
            ) : (
              <div className="text-xs font-mono font-bold text-charcoal-900">
                {formData.expiryDate || 'N/A'}
              </div>
            )}
          </div>
        </div>

        {/* OCR Integrity Note */}
        <div className="text-[11px] font-mono text-charcoal-500 bg-ivory-100/70 p-2.5 border border-warmgrey-200 rounded-xs mb-6">
          <span className="font-semibold text-charcoal-800">GROQ VISION OCR:</span> All parameters extracted via neural vision model. You may manually edit any field if physical packaging markings are worn or smudged.
        </div>
      </div>

      {/* Primary Verification Action */}
      <button
        onClick={onVerify}
        disabled={isVerifying}
        className="w-full py-3.5 px-4 bg-safety-orange hover:bg-safety-orange-hover text-white text-sm font-bold font-mono uppercase tracking-wider rounded-xs flex items-center justify-center gap-2 shadow-technical transition-all active:translate-y-0.5 disabled:opacity-50"
      >
        {isVerifying ? (
          <>
            <RefreshCw className="w-4 h-4 animate-spin" />
            <span>ANALYZING & GENERATING AI REPORT...</span>
          </>
        ) : (
          <>
            <ShieldCheck className="w-4 h-4" />
            <span>GENERATE AI SAFETY REPORT</span>
            <ArrowRight className="w-4 h-4" />
          </>
        )}
      </button>
    </div>
  );
};
