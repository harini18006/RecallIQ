export type SafetyStatusType = 'confirmed' | 'possible' | 'clear' | 'unverified';

export type ProductCategory = 
  | 'Infant & Child Care'
  | 'Food & Beverages'
  | 'Consumer Electronics'
  | 'Pharmaceuticals & OTC'
  | 'Home Appliances'
  | 'Automotive & Travel'
  | 'Cosmetics & Personal';

export interface ScannedProduct {
  id: string;
  name: string;
  brand: string;
  model: string;
  barcode: string;
  batchNumber: string;
  mfgDate: string;
  expiryDate: string;
  category: ProductCategory;
  image: string;
  notes?: string;
}

export interface RecallRecord {
  id: string;
  bulletinId: string;
  title: string;
  productName: string;
  brand: string;
  category: ProductCategory;
  affectedBatches: string[];
  affectedModels: string[];
  mfgDateRange?: {
    start: string;
    end: string;
  };
  country: string;
  countryCode: string;
  agency: string;
  recallDate: string;
  hazardType: string;
  severity: 'Class I (High Risk)' | 'Class II (Moderate Risk)' | 'Class III (Low Risk)';
  description: string;
  consumerDirective: string;
  remedyAction: 'Immediate Return / Full Refund' | 'Free Replacement' | 'Repair by Technician' | 'Safe Disposal';
  officialSourceUrl: string;
  sourceCredibility: 'Verified Government Agency' | 'Official Manufacturer Gazette';
  isDemonstrationRecord: boolean;
  lastUpdated: string;
  image: string;
}

export interface MatchAnalysis {
  status: SafetyStatusType;
  confidenceScore: number;
  matchedRecall?: RecallRecord;
  nameSimilarity: number;
  brandExact: boolean;
  modelMatch: boolean;
  batchMatchStatus: 'EXACT_MATCH' | 'PATTERN_MATCH' | 'NO_MATCH' | 'UNCERTAIN';
  dateWindowMatch: 'WITHIN_WINDOW' | 'OUTSIDE_WINDOW' | 'NO_DATE';
  matchReasons: string[];
  unmatchedAttributes: string[];
  explanationTimeline: {
    stage: string;
    timestamp: string;
    detail: string;
    type: 'danger' | 'warning' | 'success' | 'neutral';
  }[];
  verifiedTimestamp: string;
}

export interface VaultItem {
  id: string;
  product: ScannedProduct;
  savedDate: string;
  currentStatus: SafetyStatusType;
  matchedRecallId?: string;
  monitoringActive: boolean;
  notificationChannels: {
    email: boolean;
    sms: boolean;
    push: boolean;
  };
}

export interface VoiceMessage {
  id: string;
  sender: 'user' | 'assistant';
  timestamp: string;
  text: string;
  language: 'en' | 'ta' | 'hi';
  associatedProduct?: ScannedProduct;
  recallSummary?: string;
  recommendedAction?: string;
}
