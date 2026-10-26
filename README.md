# 🌍 NomadX — India's Digital Nomad Launchpad
### *"Earn Where You Explore"* · Banjaare Nomad Movement

[![React](https://img.shields.io/badge/React-18.3.1-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Vitest](https://img.shields.io/badge/Vitest-43%20Passed-brightgreen)](https://vitest.dev/)
[![PWA Ready](https://img.shields.io/badge/PWA-Offline%20Capable-orange)](#offline-pwa-architecture)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

---

## 📌 Executive Summary

Traditional travel platforms tell you **where to go**. Job boards tell you **where to work**.  
**NomadX (Banjaare)** is the world's first life architecture platform designed to help modern knowledge workers **do both at the same time** — sustainably, transparently, and profitably.

Built for the growing generation of Indian and international professionals escaping the 9-to-5 loop, NomadX matches freelance and remote contracts with 54 audited global workation hubs, projects live net financial surplus, architectures balanced 4-hour deep focus routines, coordinates shared coliving villas, and computes tax write-offs under Section 44ADA of the Indian Income Tax Act.

---

## 🎨 Design Philosophy & Aesthetics

NomadX is crafted in the editorial luxury tradition of **Vita Travel** and **Eloura Journeys**:

- **Light Luxury Theme (Default):** Warm linen and natural parchment background (`#FAF8F5`), crisp elevated cards (`#FFFFFF`), warm stone borders (`#E5E0D8`), and deep charcoal typography (`#141A1E`).
- **Dark Forest Obsidian (Toggleable):** Deep night forest backdrop (`#071317`, `#0F262E`), obsidian card surfaces (`#14313B`), and gold glow accents (`#C98833`, `#FBA13A`).
- **Pure Vector Iconography:** 100% Lucide SVG icons with zero cheap or playful emojis.
- **Dedicated Page Views:** Clean multi-page architecture with URL hash synchronization (`#home`, `#gigs`, `#destinations`, `#planner`, `#coliving`, `#itinerary`, `#gear`, `#community`, `#passport`, `#residence`, `#about`).

---

## 🏛️ Comprehensive Feature Breakdown

### 1. 🔍 Discovery Showcase (`#home`)
- Editorial manifesto highlighting the escape from the corporate commuter loop.
- Live platform stats: 54 audited hubs, 180+ Mbps tested Wi-Fi, 12+ live contracts.
- Spotlight retreats in Goa, Manali, Varkala, Rishikesh, and Bali.

### 2. 💼 Remote Gig Opportunity Board & Surplus Simulator (`#gigs`)
- 12+ verified remote contracts across Tech, Creative/Design, Content, and Growth Marketing.
- **Interactive Net Surplus Simulator:** Calculates monthly income vs. living costs (accommodation, dining, transit, coworking) to project exact monthly savings.
- Instant application pitch modal.

### 3. 🧭 Curated Destination Directory & Nomad Score Engine (`#destinations`)
- 54 hand-audited destinations (44 in India across 5 regions + 10 international nomad havens).
- **Nomad Score Engine:** 5-dimension weighted scoring algorithm:
  $$\text{Nomad Score} = 0.35 \times \text{Wi-Fi} + 0.20 \times \text{Coworking} + 0.25 \times \text{Cost} + 0.10 \times \text{Community} + 0.10 \times \text{Beauty} + \text{Bonus}$$
- Sorters: Highest Match Score, Top Nomad Score, Trip Cost (Low to High), Rating.
- Filters: Region, state, hostel-only dormitories, and profession bonus.

### 4. 📐 Trip & Budget Architect (`#planner`)
- 26 Indian departure cities with real ground transit estimates (Sleeper train, 3AC/2AC train, flight, road cab).
- Transparent cost breakdown: Lodging, dining, activities, local transit, long-distance transit, and 10% contingency buffer.
- Dynamic category multipliers and local storage persistence.

### 5. 🏡 Vetted Coliving & Desks Directory (`#coliving`)
- Curated properties across Goa, Manali, Dharamkot, Varkala, Bir Billing, and Jaipur.
- Speed-tested Wi-Fi (140 to 350 Mbps redundant connections), generator backup status, and direct booking inquiry modal.

### 6. 📅 Work-Life Routine Studio & `.ics` Exporter (`#itinerary`)
- Daily routines engineered around 4-hour morning deep focus blocks, cafe syncs, and golden hour exploration.
- Timezone Cadence Modes: *IST Standard*, *US Client Overlap*, *EU Sync*, *Early Maker*.
- **RFC 5545 `.ics` Exporter:** Generates standardized calendar files for 1-click import into Google Calendar, Apple iCal, and Outlook.
- **Custom Time-Block Builder:** Create and append custom focus slots and local adventures.

### 7. 🎒 Tech & Workstation Gear Studio (`#gear`)
- Audited packing checklist categorized into: *Tech & Connectivity*, *Workstation Ergonomics*, *Permits & Banking*, and *Climate Essentials*.
- Departure readiness progress bar with local storage state saving.
- Custom gear item creator and 1-click text manifest clipboard exporter.

### 8. 🤝 Community Hub & Tribe Matching (`#community`)
- Member directory of active nomads in town with skills and current city.
- Weekly events (bonfire demo nights, breathwork circles, sunset swims).
- Interactive Coffee / Cowork invite modal.
- Villa-split companion requests board.

### 9. 💰 Financial Passport & Tax Intelligence (`#passport`)
- **Section 44ADA Presumptive Taxation Calculator:** Evaluates Indian Income Tax Act benefits for freelance professionals earning up to ₹75 Lakhs/year:
  - 50% deemed expense write-off without book audits under Sec 44AA/AB.
  - Section 87A rebate calculation (₹0 tax liability up to ₹14L annual gross billing under New Tax Regime).
  - Monthly in-hand cashflow projections.
- **Earn-to-Travel Break-Even Meter:** Computes exact billable days required to fund 30 days of travel living.
- **Live Workation Micro-Ledger:** Record real-time on-ground daily expenses against projected surplus.
- **Stay & Tax Residency Intelligence:** 182-day Indian tax residency safe-zone tracker and permit rules (Ladakh ILP, Bali B211A, Thailand DTV).

### 10. 🏨 Nomad-in-Residence Exchange Portal (`#residence`)
- Boutique eco-resorts, tea plantations, and heritage homestays offering free private villa suites + meals + ₹40k–₹65k/mo stipends in exchange for 10–15 hrs/wk of skilled creative work.
- "Apply for Residency" interactive submission modal.
- "Host a Nomad-in-Residence" listing portal for property owners.

---

## 💻 Tech Stack & Architecture

| Layer | Technologies |
|---|---|
| **Core Framework** | React 18.3, TypeScript 5.5, Vite 5.4 |
| **Backend & Auth** | Supabase JS client (`@supabase/supabase-js`), PostgreSQL schema with RLS, zero-crash local fallback |
| **Styling & Theme** | Tailwind CSS 3.4, Vanilla CSS variables, Glassmorphism |
| **Typography** | Playfair Display (Serif Editorial), Outfit & Inter (Modern Sans) |
| **Icons** | Lucide React (100% crisp SVGs) |
| **Testing** | Vitest 2.1 (43 unit tests passing) |
| **Offline & PWA** | Service Worker (`sw.js`), Web App Manifest (`manifest.webmanifest`) |
| **Data Architecture** | Supabase Cloud PostgreSQL with seamless local offline demo fallback |

---

## 🧪 Testing & Validation

The codebase includes 43 automated unit tests covering all core financial, recommendation, and tax algorithms:

```bash
npm test
```

### Test Suites:
1. `src/utils/__tests__/taxCalculator.test.ts` — Section 44ADA 50% presumptive income, 87A rebate, and Earn-to-Travel ratios.
2. `src/utils/__tests__/nomadScoreEngine.test.ts` — Composite formula, profession boosts, and rating benchmarks.
3. `src/utils/__tests__/budgetCalculator.test.ts` — Lodging tiers, room calculations, contingency reserves, and validation rules.
4. `src/utils/__tests__/indiaRecommendations.test.ts` — Indian transit models, hostel overrides, and regional filters.
5. `src/utils/__tests__/recommendationEngine.test.ts` — Duration compatibility, budget fitting, and sorting logic.

---

## 🔒 Privacy & Security Guarantee

- **100% Client-Side Execution:** All calculations, income forecasts, and itineraries execute exclusively inside the user's browser.
- **Zero Sensitive Data Ingestion:** No credit cards, passwords, or personal identifiable information collected.
- **Zero Third-Party Telemetry:** No tracking pixels, ad networks, or data resale.

---

## 📖 Quick Start & Run Instructions

Please refer to [RUN_GUIDE.md](RUN_GUIDE.md) for detailed commands to run development servers, portable Node environments, and production builds.

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev

# 3. Run test suite
npm test

# 4. Build production bundle
npm run build
```

---

## 🗄️ Optional Supabase Backend Setup

Banjaare functions out of the box with zero setup using an in-memory & local fallback mode (demo nomad profile: Kabir Sharma).

To enable persistent live cloud database & authentication:
1. Create a free project at [supabase.com](https://supabase.com).
2. Go to the SQL Editor and run the SQL script located in [`supabase/schema.sql`](supabase/schema.sql).
3. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
4. Fill in your project URL and public anon key in `.env`:
   ```env
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-public-key
   ```
5. Restart the development server (`npm run dev`). Your app will now persist live profiles, community messages, companion travel posts, residency applications, and expenses directly to Supabase with PostgreSQL Row Level Security (RLS)!

---

## 🤝 Project Repository

- **GitHub Remote:** [https://github.com/AdilRahman80/BANJAARE-A-STEP-TOWRDS-A-NOMAD-LIFE.git](https://github.com/AdilRahman80/BANJAARE-A-STEP-TOWRDS-A-NOMAD-LIFE.git)
- **Branch:** `main`
