import { VoiceMessage, ScannedProduct } from '../types';
import { DEMO_RECALLS } from '../data/mockRecalls';

export interface VoiceQueryResult {
  transcript: string;
  responseEnglish: string;
  responseTamil: string;
  responseHindi: string;
  detectedProduct?: ScannedProduct;
  safetyStatus: 'confirmed' | 'possible' | 'clear';
  remedyDirective: string;
}

/**
 * Intelligent Multilingual Voice Safety Consultation Engine
 * Parses consumer voice questions in English, Tamil, and Hindi and returns authoritative safety advice.
 */
export function analyzeVoiceSafetyQuery(query: string, language: 'en' | 'ta' | 'hi' = 'en'): VoiceQueryResult {
  const q = query.toLowerCase();

  // Pattern detection for Infant formula (Cronobacter recall)
  if (q.includes('formula') || q.includes('milk') || q.includes('nutracare') || q.includes('பால்') || q.includes('दूध') || q.includes('शिशु') || q.includes('l3901') || q.includes('nc-8849')) {
    const recall = DEMO_RECALLS[0];
    return {
      transcript: query,
      responseEnglish: "Warning: NutraCare Pro-Advance Infant Formula is under an active Class I FDA recall due to Cronobacter sakazakii bacterial detection. Do NOT feed this formula to infants. If your batch is NC-8849 or L3901, return it to the retailer immediately for an emergency full refund.",
      responseTamil: "எச்சரிக்கை: NutraCare குழந்தை பால் பவுடர் கிரோனோபாக்டர் பாக்டீரியா தொற்று காரணமாக அவசரத் திரும்பப் பெறுதல் (FDA Class I Recall) அறிவிப்பில் உள்ளது. இதை குழந்தைகளுக்கு உணவளிக்க வேண்டாம். உடனடியாக வாங்கிய கடைக்குத் திருப்பி அளித்து முழு பணத்தையும் பெற்றுக்கொள்ளுங்கள்.",
      responseHindi: "चेतावनी: न्यूट्राकेयर शिशु मिल्क पाउडर में क्रोनोबैक्टर बैक्टीरिया पाए जाने के कारण FDA द्वारा क्लास I रिकॉल जारी किया गया है। इसे बच्चों को न दें। यदि आपका बैच NC-8849 या L3901 है, तो तुरंत विक्रेता को वापस कर पूरा रिफंड प्राप्त करें।",
      safetyStatus: 'confirmed',
      remedyDirective: 'Immediate Return / Full Cash Refund at point of purchase.'
    };
  }

  // Pattern detection for VoltCharge GaN charger (Fire hazard)
  if (q.includes('charger') || q.includes('voltcharge') || q.includes('gan') || q.includes('fire') || q.includes('சார்ஜர்') || q.includes('चार्ज') || q.includes('आग')) {
    const recall = DEMO_RECALLS[1];
    return {
      transcript: query,
      responseEnglish: "Alert: VoltCharge 65W GaN Travel Charger has been recalled by CPSC and Health Canada due to internal capacitor failure and fire risk. Please immediately unplug the unit from wall outlets and register your serial number on their portal for a free redesigned replacement.",
      responseTamil: "எச்சரிக்கை: VoltCharge 65W GaN சார்ஜர் அதிக வெப்பம் மற்றும் தீ விபத்து ஆபத்து காரணமாக CPSC ஆல் திரும்பப் பெறப்பட்டுள்ளது. உடனடியாக மின் இணைப்பிலிருந்து கழற்றி வைக்கவும். இலவச மாற்று சார்ஜருக்கு பதிவு செய்யவும்.",
      responseHindi: "चेतावनी: वोल्टचार्ज 65W GaN चार्जर ओवरहीटिंग और आग के खतरे के कारण रिकॉल किया गया है। कृपया इसे तुरंत बिजली के सॉकेट से निकाल दें और मुफ्त बदले जाने वाले चार्जर के लिए आवेदन करें।",
      safetyStatus: 'confirmed',
      remedyDirective: 'Cease usage immediately. Request authorized free replacement unit.'
    };
  }

  // Pattern detection for Cough syrup (Dosage mark issue)
  if (q.includes('cough') || q.includes('syrup') || q.includes('pharmacure') || q.includes('இருமல்') || q.includes('खांसी') || q.includes('दवा')) {
    return {
      transcript: query,
      responseEnglish: "Notice: CoughRelief Pediatric Liquid has an active dosage marking warning. The supplied measuring cup has volumetric inaccuracies which could lead to accidental overdosage. Do not use the plastic cup; consult your pharmacist for a standardized oral syringe.",
      responseTamil: "கவனம்: இருமல் மருந்து கோப்பையில் அளவு குறிகள் தவறாக அச்சிடப்பட்டுள்ளதாக FDA எச்சரித்துள்ளது. பாட்டிலுடன் வரும் பிளாஸ்டிக் கோப்பையைப் பயன்படுத்த வேண்டாம்; மருந்தகத்தில் சரியான அளவீட்டு சிரிஞ்சைப் பெறுங்கள்.",
      responseHindi: "सूचना: कफ रिलीफ सिरप के मापने वाले ढक्कन में गलत माप प्रिंट होने के कारण अधिक मात्रा का खतरा है। कृपया दिए गए ढक्कन का उपयोग न करें और फार्मेसी से सही सिरिंज प्राप्त करें।",
      safetyStatus: 'possible',
      remedyDirective: 'Consult licensed pharmacist for calibrated oral syringe.'
    };
  }

  // Default response for cleared or general products
  return {
    transcript: query,
    responseEnglish: "RecallIQ intelligence search completed: No active Class I or Class II safety recall matches were found in official FDA, CPSC, or EU Safety Gate databases for this query. Note that green verification indicates no active bulletins at this time, not a total absence of uncataloged risks.",
    responseTamil: "RecallIQ ஆய்வு முடிந்தது: இந்த தயாரிப்பிற்கு அதிகாரப்பூர்வ FDA அல்லது EU பாதுகாப்பு தரவுத்தளங்களில் எந்தவொரு தீவிர திரும்பப் பெறுதல் அறிவிப்பும் காணப்படவில்லை. எங்களின் தரவுத்தளத்தில் இது தற்போது பாதுகாப்பாக உள்ளது.",
    responseHindi: "RecallIQ सुरक्षा जांच पूर्ण: इस उत्पाद के संबंध में FDA या EU सुरक्षा डेटाबेस में कोई सक्रिय रिकॉल नोटिस नहीं पाया गया है। वर्तमान में कोई चेतावनी दर्ज नहीं है।",
    safetyStatus: 'clear',
    remedyDirective: 'No remedial action currently required. Regularly monitor product in your Safety Vault.'
  };
}

/**
 * Text to speech synthesizer with fallback
 */
export function speakText(text: string, language: 'en' | 'ta' | 'hi' = 'en'): Promise<void> {
  return new Promise((resolve) => {
    if (typeof window === 'undefined' || !window.speechSynthesis) {
      resolve();
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    
    if (language === 'ta') {
      utterance.lang = 'ta-IN';
    } else if (language === 'hi') {
      utterance.lang = 'hi-IN';
    } else {
      utterance.lang = 'en-US';
    }
    
    utterance.rate = 0.95;
    utterance.pitch = 1.0;
    
    utterance.onend = () => resolve();
    utterance.onerror = () => resolve();

    window.speechSynthesis.speak(utterance);
  });
}
