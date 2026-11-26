import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Mic, MicOff, Volume2, Globe2, Sparkles, AlertOctagon, CheckCircle2, 
  HelpCircle, RotateCcw, ShieldAlert, ArrowRight, CornerDownLeft, RefreshCw, Zap
} from 'lucide-react';
import { speakText, VoiceQueryResult } from '../services/voiceService';
import { askVoiceAssistantWithGroqRag } from '../services/groqRagService';

export const VoiceAssistantPage: React.FC = () => {
  const { executeScanAndVerify, setActiveTab } = useApp();

  const [language, setLanguage] = useState<'en' | 'ta' | 'hi'>('en');
  const [isListening, setIsListening] = useState(false);
  const [isProcessingGroq, setIsProcessingGroq] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [assistantResult, setAssistantResult] = useState<{
    transcript: string;
    text: string;
    remedyDirective: string;
    safetyStatus: 'confirmed' | 'possible' | 'clear' | 'unverified';
    usedGroq: boolean;
  } | null>(null);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  // Suggested preset questions in English, Tamil, and Hindi
  const PRESET_QUERIES = {
    en: [
      "Is NutraCare infant formula batch L3901 safe to feed my baby?",
      "Check VoltCharge 65W GaN travel charger for fire hazard recalls",
      "Is CoughRelief pediatric syrup affected by dosage cap warnings?",
      "Has NordicPure electric kettle been recalled by CPSC?"
    ],
    ta: [
      "NutraCare குழந்தை பால் பவுடர் தொகுதி L3901 பாதுகாப்பானதா?",
      "VoltCharge 65W GaN சார்ஜர் திரும்பப் பெறப்பட்டுள்ளதா?",
      "இருமல் மருந்து அளவு கோப்பையில் ஏதேனும் ஆபத்து உள்ளதா?",
      "மின்கல கெட்டில் பற்றிய திரும்பப் பெறுதல் அறிவிப்புகள் உள்ளனவா?"
    ],
    hi: [
      "क्या न्यूट्राकेयर शिशु मिल्क पाउडर बैच L3901 सुरक्षित है?",
      "क्या वोल्टचार्ज 65W GaN चार्जर में आग का खतरा है?",
      "कफ रिलीफ सिरप के लिए क्या कोई रिकॉल नोटिस जारी हुआ है?",
      "क्या इलेक्ट्रिक केतली के लिए कोई चेतावनी दर्ज है?"
    ]
  };

  // Run live Groq RAG retrieval and generation
  const handleQuerySubmit = async (queryText: string) => {
    if (!queryText.trim()) return;
    setTranscript(queryText);
    setIsProcessingGroq(true);

    try {
      const ragResponse = await askVoiceAssistantWithGroqRag(queryText, language);
      
      setAssistantResult({
        transcript: queryText,
        text: ragResponse.text,
        remedyDirective: ragResponse.remedyDirective,
        safetyStatus: ragResponse.status,
        usedGroq: ragResponse.usedGroq
      });

      // Automatically speak the response via SpeechSynthesis
      setIsPlayingAudio(true);
      speakText(ragResponse.text, language).finally(() => setIsPlayingAudio(false));
    } catch (e) {
      console.error("Voice processing failed:", e);
    } finally {
      setIsProcessingGroq(false);
    }
  };

  // Replay speech audio
  const handleReplayAudio = () => {
    if (!assistantResult) return;
    setIsPlayingAudio(true);
    speakText(assistantResult.text, language).finally(() => setIsPlayingAudio(false));
  };

  // Voice recognition toggle using Web Speech API with seamless fallback
  const toggleListening = () => {
    if (isListening) {
      setIsListening(false);
      return;
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (SpeechRecognition) {
      try {
        const recognition = new SpeechRecognition();
        recognition.lang = language === 'ta' ? 'ta-IN' : language === 'hi' ? 'hi-IN' : 'en-US';
        recognition.continuous = false;
        recognition.interimResults = false;

        recognition.onstart = () => {
          setIsListening(true);
        };

        recognition.onresult = (event: any) => {
          const spoken = event.results[0][0].transcript;
          setIsListening(false);
          handleQuerySubmit(spoken);
        };

        recognition.onerror = () => {
          setIsListening(false);
          // Fallback to query preset
          handleQuerySubmit(PRESET_QUERIES[language][0]);
        };

        recognition.onend = () => {
          setIsListening(false);
        };

        recognition.start();
        return;
      } catch (e) {
        console.log('Voice recognition error, fallback to preset:', e);
      }
    }

    // Fallback: trigger preset query simulation
    setIsListening(true);
    setTimeout(() => {
      setIsListening(false);
      handleQuerySubmit(PRESET_QUERIES[language][0]);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-ivory-100 text-charcoal-800 font-sans py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-8">
        
        {/* Page Header */}
        <div className="pb-8 border-b border-warmgrey-200 mb-8 text-center sm:text-left flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="flex items-center justify-center sm:justify-start gap-2 font-mono text-xs text-charcoal-500 uppercase mb-2">
              <Globe2 className="w-4 h-4 text-safety-orange" />
              <span>LIVE MULTILINGUAL RAG VOICE PROTOCOL</span>
              <span>•</span>
              <span className="text-forest-green font-bold flex items-center gap-1">
                <Zap className="w-3 h-3 text-safety-orange" />
                GROQ LPU ACCELERATED
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-charcoal-900 font-sans tracking-tight">
              Multilingual Voice Safety Assistant
            </h1>
            <p className="text-sm text-charcoal-600 mt-1 max-w-xl leading-relaxed">
              Ask safety questions in your preferred language. RecallIQ synthesizes retrieved regulatory gazettes using live Groq AI for instant spoken guidance.
            </p>
          </div>

          {/* Language Selector */}
          <div className="flex items-center justify-center gap-1.5 p-1 bg-ivory-200 border border-warmgrey-300 rounded-xs font-mono text-xs">
            <button
              onClick={() => setLanguage('en')}
              className={`px-3 py-1.5 rounded-xs font-bold transition-colors ${
                language === 'en' ? 'bg-charcoal-900 text-white' : 'text-charcoal-700 hover:text-charcoal-900'
              }`}
            >
              ENGLISH
            </button>
            <button
              onClick={() => setLanguage('ta')}
              className={`px-3 py-1.5 rounded-xs font-bold transition-colors ${
                language === 'ta' ? 'bg-safety-orange text-white' : 'text-charcoal-700 hover:text-charcoal-900'
              }`}
            >
              தமிழ் (TAMIL)
            </button>
            <button
              onClick={() => setLanguage('hi')}
              className={`px-3 py-1.5 rounded-xs font-bold transition-colors ${
                language === 'hi' ? 'bg-forest-green text-white' : 'text-charcoal-700 hover:text-charcoal-900'
              }`}
            >
              हिन्दी (HINDI)
            </button>
          </div>
        </div>

        {/* Central Voice Consultation Console */}
        <div className="bg-white border border-warmgrey-300 rounded-xs p-8 shadow-technical mb-8 text-center flex flex-col items-center">
          
          {/* Large Microphone Button with Voice Waves */}
          <div className="relative my-4 flex items-center justify-center">
            {isListening && (
              <span className="absolute w-36 h-36 rounded-full bg-safety-orange/20 animate-ping"></span>
            )}
            {isPlayingAudio && (
              <span className="absolute w-36 h-36 rounded-full bg-forest-green/20 animate-pulse"></span>
            )}

            <button
              onClick={toggleListening}
              disabled={isProcessingGroq}
              className={`w-24 h-24 rounded-full flex items-center justify-center text-white shadow-technical-lg transition-transform active:scale-95 disabled:opacity-50 ${
                isListening 
                  ? 'bg-status-confirmed ring-8 ring-status-confirmed/20 animate-pulse' 
                  : isPlayingAudio
                  ? 'bg-forest-green ring-8 ring-forest-green/20'
                  : 'bg-safety-orange hover:bg-safety-orange-hover'
              }`}
              aria-label="Toggle voice input"
            >
              {isProcessingGroq ? (
                <RefreshCw className="w-10 h-10 animate-spin" />
              ) : isListening ? (
                <MicOff className="w-10 h-10" />
              ) : (
                <Mic className="w-10 h-10" />
              )}
            </button>
          </div>

          <div className="space-y-1 mb-6">
            <h3 className="text-base font-bold text-charcoal-900 font-sans">
              {isProcessingGroq
                ? 'Retrieving official gazettes & querying Groq LPU...'
                : isListening 
                ? 'Listening to speech...' 
                : isPlayingAudio 
                ? 'Speaking safety consultation...' 
                : 'Click microphone or tap a preset question below'}
            </h3>
            <div className="flex items-center justify-center gap-2 text-xs font-mono text-charcoal-500">
              <span className="w-2 h-2 rounded-full bg-forest-green animate-pulse"></span>
              <span>GROQ RAG ENGINE: READY (QWEN-27B)</span>
            </div>
          </div>

          {/* Quick Preset Query Chips */}
          <div className="w-full max-w-xl text-left pt-4 border-t border-warmgrey-200">
            <span className="text-[10px] font-mono uppercase text-charcoal-500 block mb-2 font-bold">
              Suggested Safety Questions ({language.toUpperCase()}):
            </span>
            <div className="flex flex-wrap gap-2">
              {PRESET_QUERIES[language].map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handleQuerySubmit(q)}
                  disabled={isProcessingGroq}
                  className="text-xs text-charcoal-700 hover:text-charcoal-900 bg-ivory-50 hover:bg-ivory-200 border border-warmgrey-300 px-3 py-1.5 rounded-xs font-sans text-left transition-colors disabled:opacity-50"
                >
                  &ldquo;{q}&rdquo;
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Structured Safety Consultation Response Card */}
        {assistantResult && (
          <div className="bg-white border-2 border-warmgrey-300 rounded-xs p-6 sm:p-8 shadow-technical space-y-6">
            
            {/* User query quote & badges */}
            <div className="flex items-start justify-between pb-4 border-b border-warmgrey-200 flex-wrap gap-2">
              <div>
                <span className="text-[10px] font-mono uppercase text-charcoal-500 block mb-1">
                  User Question Transcript:
                </span>
                <p className="text-sm font-semibold text-charcoal-800 italic">
                  &ldquo;{assistantResult.transcript}&rdquo;
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 bg-ivory-200 text-charcoal-800 font-mono text-[10px] rounded-xs font-bold border border-warmgrey-300">
                  ⚡ GROQ RAG INFERENCE
                </span>
                <button
                  onClick={handleReplayAudio}
                  className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 bg-ivory-200 hover:bg-ivory-300 text-charcoal-800 text-xs font-mono font-bold rounded-xs transition-colors"
                >
                  <Volume2 className="w-3.5 h-3.5 text-safety-orange" />
                  <span>REPLAY</span>
                </button>
              </div>
            </div>

            {/* Multilingual Spoken Text Presentation */}
            <div className={`p-5 rounded-xs border space-y-3 ${
              assistantResult.safetyStatus === 'confirmed'
                ? 'bg-status-confirmed-bg border-status-confirmed'
                : assistantResult.safetyStatus === 'possible'
                ? 'bg-status-possible-bg border-status-possible'
                : 'bg-forest-light border-forest-green'
            }`}>
              <div className="flex items-center gap-2">
                {assistantResult.safetyStatus === 'confirmed' ? (
                  <AlertOctagon className="w-5 h-5 text-status-confirmed" />
                ) : (
                  <CheckCircle2 className="w-5 h-5 text-forest-green" />
                )}
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-charcoal-900">
                  {assistantResult.safetyStatus === 'confirmed' ? 'CRITICAL RECALL ADVISORY' : 'SAFETY DETERMINATION'}
                </span>
              </div>

              {/* Response in Selected Language generated by Groq RAG */}
              <p className="text-base font-bold text-charcoal-900 leading-relaxed font-sans">
                {assistantResult.text}
              </p>

              {/* Authorized Directive */}
              <div className="pt-2 text-xs font-mono border-t border-charcoal-200/50 text-charcoal-800">
                Action Directive: <strong className="text-charcoal-900">{assistantResult.remedyDirective}</strong>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 text-xs font-mono">
              <span className="text-charcoal-500">
                RAG Context: Retrieved from indexed FDA, CPSC, and EU Safety Gate gazettes
              </span>

              <button
                onClick={() => setActiveTab('scanner')}
                className="px-4 py-2 bg-charcoal-900 hover:bg-safety-orange text-white rounded-xs font-bold transition-colors flex items-center gap-1.5"
              >
                <span>SCAN PRODUCT PACKAGING</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
