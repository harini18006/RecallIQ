# RecallIQ — Universal AI Product Safety & Recall Intelligence Platform

> **"Know What You Own. Stay Safe."**

RecallIQ is a Universal AI Product Scanner and Global Product Recall Intelligence Platform designed with an authoritative Swiss editorial design aesthetic. It enables consumers and compliance professionals to verify whether physical goods they own or purchase are subject to active safety recalls across global regulatory registries.

---

## 🏛️ Visual Identity & Design Direction

Unlike generic AI SaaS dashboards, RecallIQ was constructed with inspiration from international regulatory bodies, industrial product gazettes, and Swiss typography systems:

- **Primary Background:** Warm Ivory (`#F7F6F0`)
- **Primary Text:** Deep Charcoal (`#202421`)
- **Primary Accent:** Safety Orange (`#F05A36`)
- **Secondary Accent:** Forest Green (`#315D48`)
- **Dividers & Borders:** Subtle Warm Grey (`#DEDED5`)
- **Typography:** Instrument Serif + Plus Jakarta Sans + JetBrains Mono
- **Tone:** Authoritative, transparent, explainable, and trustworthy.

---

## ⚡ Six Foundational Innovation Modules

1. **Universal AI Product Scanner**
   - High-framerate optical scanner with live camera viewfinder, laser scanline animation, and alignment crosshair.
   - Support for Barcode UPC/EAN, 2D QR codes, and image packaging uploads.
   - Neural OCR attribute extraction for brand, product name, model number, batch lot code, and manufacturing/expiry dates.
   - Instant manual override capabilities for smudged or worn packaging.

2. **Smart Fuzzy & Deep Batch Matching**
   - Levenshtein distance string similarity combined with Jaccard word-token intersection.
   - Brand entity normalization and alias handling.
   - Critical distinction between product-level matches and specific contaminated lot codes.
   - Four distinct status determinations:
     - 🔴 **Confirmed Recall Match** (Class I / High Risk)
     - 🟠 **Possible Recall Match** (Lot verification needed)
     - 🟢 **No Matching Recall Found** (Absence of active gazettes; not a warranty)
     - ⚪ **Unable to Verify** (Insufficient packaging identifiers)

3. **Cross-Platform Global Recall Gazette**
   - Unified registry integrating public bulletins from **U.S. FDA, U.S. CPSC, European Union Safety Gate (RAPEX), Health Canada, and UK FSA**.
   - Multi-parameter filtering by country/jurisdiction, category, hazard severity, and batch codes.
   - Zero fabricated records; all prototype entries are clearly labeled demonstration records with original source citations.

4. **Multilingual AI Voice Safety Assistant**
   - Audio safety consultation supporting **English, Tamil (தமிழ்), and Hindi (हिन्दी)**.
   - Built on native Web Speech API (`SpeechRecognition` & `SpeechSynthesis`) with instant fallback simulation.
   - Translates complex biochemical and electrical hazard alerts into clear everyday language.

5. **Explainable AI Verification Audit**
   - Detailed attribute-by-attribute comparison table with individual parameter similarity scores.
   - Step-by-step verification chronology timeline.
   - Clear consumer directives (immediate return, cash refund, repair, replacement).

6. **Personal Product Safety Vault**
   - Private personal product inventory monitoring.
   - 24/7 proactive surveillance against newly published government gazettes.
   - Simulated push and SMS alert dispatch for real-time demonstrations.

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Production Build
```bash
npm run build
```

### 4. Preview Production Build
```bash
npm run preview
```

---

## 🛠️ Technology Stack

- **Framework:** React 18 with Vite
- **Language:** TypeScript
- **Styling:** Tailwind CSS with custom Swiss editorial theme
- **Icons:** Lucide React
- **Animations:** Framer Motion & CSS keyframe scanline
- **Speech Engine:** Web Speech API (Recognition + Synthesis)
- **Backend Architecture:** Modular, API-ready architecture structured for Supabase.
