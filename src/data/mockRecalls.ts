import { RecallRecord } from '../types';

/**
 * Clearly labeled Demonstration Records for RecallIQ.
 * Sourced structurally based on real historical FDA, CPSC, EU RAPEX, and Health Canada bulletin patterns.
 * Explicitly marked as isDemonstrationRecord: true to maintain strict data integrity.
 */
export const DEMO_RECALLS: RecallRecord[] = [
  {
    id: 'REC-2024-FDA-0881',
    bulletinId: 'FDA-CBER-2024-0881',
    title: 'Infant Formula Powder Recall Due to Cronobacter Sakazakii Detection',
    productName: 'NutraCare Pro-Advance Infant Formula (400g)',
    brand: 'NutraCare Nutritionals',
    category: 'Infant & Child Care',
    affectedBatches: ['NC-8849-B1', 'NC-8849-B2', 'NC-8910-X', 'L3901'],
    affectedModels: ['NC-PRO-400G', 'NC-PRO-800G'],
    mfgDateRange: {
      start: '2023-11-01',
      end: '2024-02-15'
    },
    country: 'United States',
    countryCode: 'US',
    agency: 'U.S. FDA (Food & Drug Administration)',
    recallDate: '2024-03-12',
    hazardType: 'Bacterial Contamination (Pathogenic Cronobacter)',
    severity: 'Class I (High Risk)',
    description: 'Routine batch testing at the manufacturing facility identified the presence of Cronobacter sakazakii in dry blended infant formula powder. Consumption by infants under 12 months may lead to severe gastrointestinal distress or systemic infection.',
    consumerDirective: 'DO NOT FEED TO INFANTS. Check the bottom of the can for lot number NC-8849 or L3901. Immediately cease use and return to retailer for full cash refund or call consumer hotlines.',
    remedyAction: 'Immediate Return / Full Refund',
    officialSourceUrl: 'https://www.fda.gov/safety/recalls-market-withdrawals-safety-alerts',
    sourceCredibility: 'Verified Government Agency',
    isDemonstrationRecord: true,
    lastUpdated: '2024-03-15T14:30:00Z',
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'REC-2024-CPSC-1492',
    bulletinId: 'CPSC-PUB-2024-1492',
    title: 'Fast-Charging USB-C 65W GaN Wall Adapter Fire & Burn Hazard',
    productName: 'VoltCharge Pro 65W GaN Travel Charger',
    brand: 'VoltCharge Labs',
    category: 'Consumer Electronics',
    affectedBatches: ['VC-65-2023Q3', 'VC-65-2023Q4', 'VC-BATCH-890'],
    affectedModels: ['VC-65W-GAN', 'VC-65W-DUAL'],
    mfgDateRange: {
      start: '2023-08-01',
      end: '2023-12-30'
    },
    country: 'United States & Canada',
    countryCode: 'US/CA',
    agency: 'U.S. CPSC & Health Canada',
    recallDate: '2024-02-08',
    hazardType: 'Overheating, Internal Short Circuit & Fire Risk',
    severity: 'Class I (High Risk)',
    description: 'The internal capacitor in early hardware revisions may fail under prolonged sustained high-wattage load, resulting in melting of the plastic enclosure and risk of flame ignition.',
    consumerDirective: 'Immediately unplug from AC outlets. Do not leave unattended while connected. Register serial or batch number for an authorized redesigned replacement unit.',
    remedyAction: 'Free Replacement',
    officialSourceUrl: 'https://www.cpsc.gov/Recalls',
    sourceCredibility: 'Verified Government Agency',
    isDemonstrationRecord: true,
    lastUpdated: '2024-02-10T09:15:00Z',
    image: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'REC-2024-RAPEX-0442',
    bulletinId: 'EU-RAPEX-A12/00442/24',
    title: 'Organic Almond Milk Drink - Unlabeled Peanut Cross-Contact Alert',
    productName: 'BioPure Organic Unsweetened Almond Drink (1 Litre)',
    brand: 'BioPure Organics',
    category: 'Food & Beverages',
    affectedBatches: ['BP-ALM-4412', 'BP-ALM-4413', 'LOT-9981-A'],
    affectedModels: ['1L-TETRA', '6X1L-PACK'],
    mfgDateRange: {
      start: '2024-01-10',
      end: '2024-01-28'
    },
    country: 'European Union',
    countryCode: 'EU',
    agency: 'EU Safety Gate (RAPEX)',
    recallDate: '2024-01-31',
    hazardType: 'Severe Undeclared Allergen (Arachis hypogaea / Peanut)',
    severity: 'Class I (High Risk)',
    description: 'Trace peanut proteins were detected during facility inspection on a shared production line. Individuals with peanut allergies risk severe life-threatening anaphylactic reaction.',
    consumerDirective: 'Persons with peanut allergy must not consume this product. Return any unopened or opened cartons to supermarkets for full reimbursement.',
    remedyAction: 'Immediate Return / Full Refund',
    officialSourceUrl: 'https://ec.europa.eu/safety-gate-alerts',
    sourceCredibility: 'Verified Government Agency',
    isDemonstrationRecord: true,
    lastUpdated: '2024-02-02T11:00:00Z',
    image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'REC-2024-FSA-0199',
    bulletinId: 'FSA-PR-2024-0199',
    title: 'Child Convertible Car Seat Harness Buckle Latch Disengagement',
    productName: 'SafeRide Aero 360 All-Stage Child Safety Seat',
    brand: 'SafeRide Dynamics',
    category: 'Automotive & Travel',
    affectedBatches: ['SR-360-JAN23', 'SR-360-APR23', 'LOT-88219'],
    affectedModels: ['SR-360-AERO-BLK', 'SR-360-AERO-GRY'],
    mfgDateRange: {
      start: '2023-01-01',
      end: '2023-06-30'
    },
    country: 'United Kingdom',
    countryCode: 'GB',
    agency: 'UK Food Standards & Safety / Trading Standards',
    recallDate: '2024-02-22',
    hazardType: 'Restraint Structural Failure during Crash Deceleration',
    severity: 'Class I (High Risk)',
    description: 'Under severe frontal collision deceleration testing, certain central harness release mechanisms experienced partial detachment from the bottom anchor plate.',
    consumerDirective: 'Cease transportation use. Contact SafeRide customer care for a free certified mobile technician buckle replacement kit.',
    remedyAction: 'Repair by Technician',
    officialSourceUrl: 'https://www.gov.uk/product-safety-alerts-reports-recalls',
    sourceCredibility: 'Verified Government Agency',
    isDemonstrationRecord: true,
    lastUpdated: '2024-02-25T16:00:00Z',
    image: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'REC-2024-FDA-1044',
    bulletinId: 'FDA-CDER-2024-1044',
    title: 'Pediatric Cough & Cold Oral Suspension Dosage Cap Inaccuracy',
    productName: 'CoughRelief Pediatric Liquid Suspension 120ml',
    brand: 'PharmaCure Laboratories',
    category: 'Pharmaceuticals & OTC',
    affectedBatches: ['PC-CR-904', 'PC-CR-905', 'EXP-2025-11'],
    affectedModels: ['120ML-BERRY'],
    mfgDateRange: {
      start: '2023-09-15',
      end: '2023-11-20'
    },
    country: 'United States',
    countryCode: 'US',
    agency: 'U.S. FDA',
    recallDate: '2024-03-01',
    hazardType: 'Overdose Risk due to Defective Measuring Cup Markings',
    severity: 'Class II (Moderate Risk)',
    description: 'The supplied plastic measuring cup features misprinted volumetric gradients (5ml mark corresponds to 8.2ml actual liquid volume), introducing potential accidental over-dosage.',
    consumerDirective: 'Do not use the bundled dosage cup. Pharmacists will supply a standardized oral syringe and cup replacement free of charge upon presentation of lot numbers.',
    remedyAction: 'Free Replacement',
    officialSourceUrl: 'https://www.fda.gov/drugs/drug-safety-and-availability',
    sourceCredibility: 'Verified Government Agency',
    isDemonstrationRecord: true,
    lastUpdated: '2024-03-04T10:00:00Z',
    image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'REC-2024-CPSC-2101',
    bulletinId: 'CPSC-RECALL-2024-2101',
    title: 'Cordless Precision Steam Iron Auto-Shutoff Sensor Malfunction',
    productName: 'GlideMaster Cordless Steam Iron Pro 2400W',
    brand: 'GlideMaster Home',
    category: 'Home Appliances',
    affectedBatches: ['GM-ST24-B8', 'GM-ST24-B9'],
    affectedModels: ['GM-2400-CORDLESS'],
    mfgDateRange: {
      start: '2023-10-01',
      end: '2024-01-15'
    },
    country: 'United States & Europe',
    countryCode: 'US/EU',
    agency: 'U.S. CPSC & EU Safety Gate',
    recallDate: '2024-03-08',
    hazardType: 'Burn Hazard & Continuous Thermal Heating',
    severity: 'Class II (Moderate Risk)',
    description: 'In rare circumstances when placed horizontally for over 8 minutes, the motion sensor fails to trip the emergency safety thermal cutoff.',
    consumerDirective: 'Stop utilizing the iron without attending supervision. Request updated base charging station from manufacturer portal.',
    remedyAction: 'Free Replacement',
    officialSourceUrl: 'https://www.cpsc.gov/Recalls',
    sourceCredibility: 'Official Manufacturer Gazette',
    isDemonstrationRecord: true,
    lastUpdated: '2024-03-10T15:20:00Z',
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=600&q=80'
  }
];

export const SAMPLE_PRODUCTS: ScannedProduct[] = [
  {
    id: 'prod-infant-formula-danger',
    name: 'NutraCare Pro-Advance Infant Formula (400g)',
    brand: 'NutraCare Nutritionals',
    model: 'NC-PRO-400G',
    barcode: '8901030456128',
    batchNumber: 'NC-8849-B1',
    mfgDate: '2023-11-20',
    expiryDate: '2025-11-19',
    category: 'Infant & Child Care',
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80',
    notes: 'Preserved batch sample with high priority recall match.'
  },
  {
    id: 'prod-gan-charger-danger',
    name: 'VoltCharge Pro 65W GaN Travel Charger',
    brand: 'VoltCharge Labs',
    model: 'VC-65W-GAN',
    barcode: '0712345678901',
    batchNumber: 'VC-65-2023Q3',
    mfgDate: '2023-09-12',
    expiryDate: 'N/A',
    category: 'Consumer Electronics',
    image: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=600&q=80',
    notes: 'Purchased online marketplace October 2023.'
  },
  {
    id: 'prod-cough-syrup-possible',
    name: 'CoughRelief Pediatric Liquid Suspension 120ml',
    brand: 'PharmaCure Laboratories',
    model: '120ML-BERRY',
    barcode: '8904012398451',
    batchNumber: 'PC-CR-904',
    mfgDate: '2023-10-05',
    expiryDate: '2025-10-04',
    category: 'Pharmaceuticals & OTC',
    image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=600&q=80',
    notes: 'Dosage cup markings subject to FDA investigation.'
  },
  {
    id: 'prod-kettle-clear',
    name: 'NordicPure Stainless Steel Electric Pour-Over Kettle (1.0L)',
    brand: 'NordicPure Appliances',
    model: 'NP-EK-100',
    barcode: '7350012349812',
    batchNumber: 'NP-2024-C09',
    mfgDate: '2024-01-14',
    expiryDate: 'N/A',
    category: 'Home Appliances',
    image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=600&q=80',
    notes: 'Standard household kettle tested with no active recall records.'
  }
];
