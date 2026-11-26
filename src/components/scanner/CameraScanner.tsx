import React, { useState, useRef, useEffect } from 'react';
import { Camera, QrCode, Barcode, Upload, RefreshCw, Check, Sparkles, AlertCircle, FileSearch, Zap, Eye, Lock, LogIn } from 'lucide-react';
import { ScannedProduct } from '../../types';
import { SAMPLE_PRODUCTS } from '../../data/mockRecalls';
import { scanPackagingImageWithGroqVision } from '../../services/groqVisionService';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';

interface CameraScannerProps {
  onProductIdentified: (product: ScannedProduct) => void;
  onInstantVerifyReport?: (product: ScannedProduct) => void;
  isAnalyzing: boolean;
}

export const CameraScanner: React.FC<CameraScannerProps> = ({ 
  onProductIdentified,
  onInstantVerifyReport,
  isAnalyzing
}) => {
  const { user, setIsAuthModalOpen } = useAuth();
  const { addToast } = useApp();

  const [activeMode, setActiveMode] = useState<'camera' | 'upload'>('upload');
  const [cameraActive, setCameraActive] = useState<boolean>(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [isVisionScanning, setIsVisionScanning] = useState<boolean>(false);
  const [visionStatusText, setVisionStatusText] = useState<string>('');
  const [previewImage, setPreviewImage] = useState<string>(SAMPLE_PRODUCTS[0].image);
  const [dragOver, setDragOver] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedPresetIndex, setSelectedPresetIndex] = useState<number>(0);

  // Guard function to ensure only authenticated users can upload or scan packaging photos
  const requireAuth = (actionDescription: string = 'upload or scan packaging photos'): boolean => {
    if (!user) {
      addToast(
        'Authentication Required',
        `Please sign in or register to ${actionDescription}.`,
        'warning'
      );
      setIsAuthModalOpen(true);
      return false;
    }
    return true;
  };

  // Initialize webcam if camera mode selected
  useEffect(() => {
    let stream: MediaStream | null = null;
    if (activeMode === 'camera') {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
          .then((s) => {
            stream = s;
            if (videoRef.current) {
              videoRef.current.srcObject = s;
              setCameraActive(true);
              setCameraError(null);
            }
          })
          .catch((err) => {
            setCameraActive(false);
            setCameraError('Camera inactive. Switch to OCR Image Upload or select test presets below.');
          });
      } else {
        setCameraActive(false);
        setCameraError('Video hardware stream unavailable.');
      }
    }

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [activeMode]);

  // Core Groq Vision AI scan execution
  const processImageWithAI = async (imageDataUrl: string, fallbackSample?: ScannedProduct, autoVerify: boolean = false) => {
    if (!requireAuth('run AI vision packaging analysis')) {
      return;
    }

    setIsVisionScanning(true);
    setVisionStatusText('Groq Vision AI (qwen/qwen3.8-27b) analyzing packaging...');

    try {
      setVisionStatusText('Reading packaging typography, logos & barcode stamps...');
      const result = await scanPackagingImageWithGroqVision(imageDataUrl, fallbackSample);
      
      onProductIdentified(result.product);
      setPreviewImage(result.product.image);

      if (autoVerify && onInstantVerifyReport) {
        setVisionStatusText('Cross-referencing FDA & CPSC bulletins with Groq RAG...');
        onInstantVerifyReport(result.product);
      }
    } catch (err) {
      console.error("AI Vision extraction failed:", err);
    } finally {
      setIsVisionScanning(false);
    }
  };

  // Preset Selection
  const handleSelectPreset = (index: number) => {
    setSelectedPresetIndex(index);
    const prod = SAMPLE_PRODUCTS[index];
    if (prod) {
      setPreviewImage(prod.image);
      processImageWithAI(prod.image, prod, false);
    }
  };

  // Capture current webcam frame
  const handleCaptureCamera = () => {
    if (!requireAuth('capture live camera image')) {
      return;
    }
    if (videoRef.current && cameraActive) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth || 640;
      canvas.height = videoRef.current.videoHeight || 480;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0);
        const dataUrl = canvas.toDataURL('image/jpeg', 0.9);
        setPreviewImage(dataUrl);
        processImageWithAI(dataUrl, SAMPLE_PRODUCTS[selectedPresetIndex], false);
      }
    } else {
      // Trigger scan on the current preview image
      processImageWithAI(previewImage, SAMPLE_PRODUCTS[selectedPresetIndex], false);
    }
  };

  // Image Upload handler
  const handleFileUpload = (file: File) => {
    if (!requireAuth('upload packaging images')) {
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      setPreviewImage(dataUrl);
      processImageWithAI(dataUrl, SAMPLE_PRODUCTS[selectedPresetIndex], false);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="bg-charcoal-900 border border-charcoal-700 rounded-xs overflow-hidden shadow-technical-lg text-ivory-100 font-sans">
      {/* Scanner Mode Tabs & AI Status */}
      <div className="bg-charcoal-800 p-2 border-b border-charcoal-700 flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-1">
          <button
            onClick={() => setActiveMode('upload')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xs text-xs font-mono transition-colors ${
              activeMode === 'upload' 
                ? 'bg-safety-orange text-white font-bold' 
                : 'text-ivory-300 hover:text-white hover:bg-charcoal-700'
            }`}
          >
            <Upload className="w-3.5 h-3.5" />
            <span>AI IMAGE UPLOAD / OCR</span>
          </button>

          <button
            onClick={() => setActiveMode('camera')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xs text-xs font-mono transition-colors ${
              activeMode === 'camera' 
                ? 'bg-safety-orange text-white font-bold' 
                : 'text-ivory-300 hover:text-white hover:bg-charcoal-700'
            }`}
          >
            <Camera className="w-3.5 h-3.5" />
            <span>LIVE CAMERA VIEWFINDER</span>
          </button>
        </div>

        <div className="text-[11px] font-mono text-ivory-300 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-forest-green animate-pulse"></span>
          <span className="text-safety-orange font-bold flex items-center gap-1">
            <Zap className="w-3 h-3 text-safety-orange" />
            GROQ VISION AI: LIVE
          </span>
        </div>
      </div>

      {/* Main Viewfinder Workspace */}
      <div className="relative min-h-[380px] sm:min-h-[440px] bg-charcoal-900 flex items-center justify-center overflow-hidden">
        {/* Technical Target Grid */}
        <div className="absolute inset-0 bg-tech-grid opacity-20 pointer-events-none" />

        {activeMode === 'camera' && (
          <div className="relative w-full h-full min-h-[440px] flex items-center justify-center">
            {cameraActive ? (
              <video 
                ref={videoRef} 
                autoPlay 
                playsInline 
                muted 
                className="w-full h-full object-cover min-h-[440px]"
              />
            ) : (
              <div className="relative w-full h-full flex flex-col items-center justify-center p-6 text-center">
                <img 
                  src={previewImage} 
                  alt="Packaging preview" 
                  className="w-72 h-56 object-cover rounded-xs border border-charcoal-600 shadow-technical-md brightness-90"
                />
                {cameraError && (
                  <p className="mt-3 text-[11px] font-mono text-ivory-400 bg-charcoal-800/80 px-3 py-1 rounded-xs border border-charcoal-700 max-w-md">
                    {cameraError}
                  </p>
                )}
              </div>
            )}

            {/* Target Brackets & Laser Scanline */}
            <div className="absolute inset-8 sm:inset-14 border border-safety-orange/40 rounded-xs pointer-events-none flex flex-col justify-between p-4">
              <div className="flex justify-between">
                <div className="w-6 h-6 border-t-2 border-l-2 border-safety-orange"></div>
                <div className="w-6 h-6 border-t-2 border-r-2 border-safety-orange"></div>
              </div>

              <div className="self-center flex flex-col items-center gap-1.5 text-center">
                <div className="px-3 py-1 bg-charcoal-900/85 backdrop-blur-xs border border-charcoal-600 rounded-xs text-[11px] font-mono text-ivory-200">
                  ALIGN PACKAGING TEXT / BARCODE IN FRAME
                </div>
                <div className="text-[10px] font-mono text-safety-orange tracking-widest uppercase font-bold">
                  GROQ VISION SENSOR: READY
                </div>
              </div>

              <div className="flex justify-between">
                <div className="w-6 h-6 border-b-2 border-l-2 border-safety-orange"></div>
                <div className="w-6 h-6 border-b-2 border-r-2 border-safety-orange"></div>
              </div>

              <div className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-safety-orange to-transparent animate-scanline shadow-[0_0_8px_#F05A36]"></div>
            </div>
          </div>
        )}

        {activeMode === 'upload' && (
          <div 
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDragOver(false);
              if (!requireAuth('upload packaging images')) {
                return;
              }
              const file = e.dataTransfer.files?.[0];
              if (file) handleFileUpload(file);
            }}
            className="w-full h-full min-h-[440px] flex flex-col items-center justify-center p-6 text-center"
          >
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={(e) => {
                if (!requireAuth('upload packaging images')) {
                  e.target.value = '';
                  return;
                }
                const file = e.target.files?.[0];
                if (file) handleFileUpload(file);
              }} 
              accept="image/*" 
              className="hidden" 
            />

            <div className="max-w-md w-full flex flex-col items-center">
              {/* Image Preview Box with Auth Guard */}
              <div 
                className="relative mb-4 group cursor-pointer" 
                onClick={() => {
                  if (requireAuth('upload packaging images')) {
                    fileInputRef.current?.click();
                  }
                }}
              >
                <img 
                  src={previewImage} 
                  alt="Packaging preview" 
                  className={`w-64 h-48 object-cover rounded-xs border-2 transition-all shadow-technical-md ${
                    dragOver ? 'border-safety-orange scale-102' : 'border-charcoal-600 hover:border-safety-orange'
                  } ${!user ? 'opacity-70 grayscale-30' : ''}`}
                />

                {!user ? (
                  <div className="absolute inset-0 bg-charcoal-900/80 backdrop-blur-xs flex flex-col items-center justify-center p-4 rounded-xs text-center z-10">
                    <div className="w-10 h-10 rounded-full bg-safety-orange/20 border border-safety-orange/40 flex items-center justify-center text-safety-orange mb-2">
                      <Lock className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-mono font-bold text-white uppercase tracking-wider mb-1">
                      Image Upload Locked
                    </span>
                    <span className="text-[11px] font-mono text-charcoal-300 mb-3">
                      Sign in required to upload packaging photos
                    </span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsAuthModalOpen(true);
                      }}
                      className="px-3 py-1.5 bg-safety-orange hover:bg-safety-orange-hover text-white text-xs font-mono font-bold uppercase rounded-xs transition-colors flex items-center gap-1.5"
                    >
                      <LogIn className="w-3.5 h-3.5" />
                      <span>Sign In to Upload</span>
                    </button>
                  </div>
                ) : (
                  <div className="absolute inset-0 bg-charcoal-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-xs">
                    <span className="text-xs font-mono font-bold text-white bg-charcoal-900/80 px-3 py-1.5 rounded-xs border border-charcoal-500">
                      CLICK TO CHANGE IMAGE
                    </span>
                  </div>
                )}
              </div>

              <h4 className="text-base font-bold text-white mb-1">
                {user ? 'Drop Packaging Photo or Click to Upload' : 'Packaging Image Upload (Auth Required)'}
              </h4>
              <p className="text-xs text-charcoal-400 mb-4 leading-relaxed max-w-sm">
                {user ? (
                  <>RecallIQ&rsquo;s Groq Vision AI scans the physical box or bottle, extracts the brand, model, batch/lot code, and cross-checks recalls instantly.</>
                ) : (
                  <>You must be signed in to upload custom packaging photos. Once signed in, all your image scans are saved to your dedicated database row in JSON format.</>
                )}
              </p>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => {
                    if (requireAuth('upload packaging images')) {
                      fileInputRef.current?.click();
                    }
                  }}
                  className="px-4 py-2 bg-charcoal-800 hover:bg-charcoal-700 text-xs font-mono text-white rounded-xs border border-charcoal-600 transition-colors flex items-center gap-1.5"
                >
                  {user ? <Upload className="w-3.5 h-3.5" /> : <Lock className="w-3.5 h-3.5 text-safety-orange" />}
                  <span>{user ? 'SELECT IMAGE FILE' : 'SIGN IN TO UPLOAD'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    if (requireAuth('run AI vision packaging analysis')) {
                      processImageWithAI(previewImage, SAMPLE_PRODUCTS[selectedPresetIndex], false);
                    }
                  }}
                  className="px-4 py-2 bg-safety-orange hover:bg-safety-orange-hover text-xs font-mono font-bold text-white rounded-xs transition-colors flex items-center gap-1.5"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>SCAN WITH GROQ VISION</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Live Vision Processing Overlay */}
        {(isVisionScanning || isAnalyzing) && (
          <div className="absolute inset-0 bg-charcoal-900/90 backdrop-blur-xs flex flex-col items-center justify-center p-6 text-center z-20">
            <RefreshCw className="w-10 h-10 text-safety-orange animate-spin mb-4" />
            <h4 className="text-base font-bold text-white mb-1 font-mono uppercase tracking-wider">
              {visionStatusText || 'PROCESSING NEURAL VISION OCR'}
            </h4>
            <p className="text-xs text-charcoal-300 font-mono max-w-sm leading-relaxed">
              Extracting brand, model, lot numbers and executing RAG recall verification...
            </p>
          </div>
        )}
      </div>

      {/* Quick Interactive Presets */}
      <div className="bg-charcoal-800 p-4 border-t border-charcoal-700">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-mono font-bold text-ivory-300 uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-safety-orange" />
            Packaging Presets to Test AI Vision:
          </span>
          <span className="text-[10px] font-mono text-charcoal-400">CLICK TO LOAD & SCAN</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {SAMPLE_PRODUCTS.map((prod, idx) => {
            const isRecalled = idx === 0 || idx === 1;
            const isPossible = idx === 2;
            return (
              <button
                key={prod.id}
                onClick={() => handleSelectPreset(idx)}
                className={`p-2 rounded-xs border text-left transition-all font-mono text-xs flex flex-col justify-between ${
                  selectedPresetIndex === idx
                    ? 'border-safety-orange bg-charcoal-700 text-white'
                    : 'border-charcoal-700 bg-charcoal-900/60 text-charcoal-300 hover:border-charcoal-500 hover:text-white'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] uppercase font-bold text-charcoal-400 truncate">
                    {prod.brand}
                  </span>
                  <span className={`text-[9px] px-1 py-0.2 rounded-xs font-bold ${
                    isRecalled ? 'bg-status-confirmed text-white' : isPossible ? 'bg-status-possible text-white' : 'bg-forest-green text-white'
                  }`}>
                    {isRecalled ? 'RECALLED' : isPossible ? 'POSSIBLE' : 'CLEAR'}
                  </span>
                </div>
                <div className="text-[11px] font-sans font-semibold text-ivory-100 truncate">
                  {prod.name}
                </div>
                <div className="text-[10px] text-charcoal-400 mt-1">
                  Lot: <strong className="text-ivory-200">{prod.batchNumber}</strong>
                </div>
              </button>
            );
          })}
        </div>

        {/* Action Row */}
        <div className="mt-3 flex items-center justify-between pt-2 border-t border-charcoal-700/60">
          <div className="text-[11px] font-mono text-charcoal-400">
            Selected: <span className="text-ivory-100 font-bold">{SAMPLE_PRODUCTS[selectedPresetIndex].name}</span>
          </div>
          <button
            onClick={() => {
              if (!requireAuth('run AI scan & extraction')) return;
              if (activeMode === 'camera' && cameraActive) handleCaptureCamera();
              else processImageWithAI(previewImage, SAMPLE_PRODUCTS[selectedPresetIndex], false);
            }}
            disabled={isVisionScanning || isAnalyzing}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-safety-orange hover:bg-safety-orange-hover text-white text-xs font-mono font-bold rounded-xs transition-colors disabled:opacity-50"
          >
            <Barcode className="w-3.5 h-3.5" />
            <span>AI SCAN & EXTRACT</span>
          </button>
        </div>
      </div>
    </div>
  );
};
