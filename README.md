# Smart Trip Planner ✈️🌍

> A modern, client-side travel forecasting application combining an **explainable rule-based destination recommendation engine** with a **real-time, itemized travel budget calculator**.

[![React](https://img.shields.io/badge/React-18.3.1-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Vitest](https://img.shields.io/badge/Vitest-2.1.3-FCC72B?logo=vitest&logoColor=black)](https://vitest.dev/)
[![Tests](https://img.shields.io/badge/Tests-31%20Passed-brightgreen)](https://github.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

---

## 🌟 Overview

**Smart Trip Planner** is a portfolio web application designed to solve one of travel planning's primary pain points: aligning personal travel interests with realistic financial and scheduling constraints.

Users specify their starting origin, target budget, party size, duration, accommodation preferences, and travel style. The platform instantly scores curated global destinations using a multi-factor heuristic algorithm and generates a transparent, interactive financial forecast across flights, stays, dining, experiences, local transit, and emergency reserves.

---

## ✨ Key Features

### 1. 💰 Real-Time Travel Budget Calculator
- Automatically projects 6 core expense categories based on destination unit economics:
  1. **Flights / Long-distance Travel**: Base origin-to-destination estimates scaled by party size.
  2. **Lodging & Accommodation**: Calculated by nights, rooms needed ($\lceil\text{travelers} / 2\rceil$), and selected style (*Budget Hostels*, *Mid-Scale 3–4★ Hotels*, or *5★ Luxury Resorts*).
  3. **Food & Dining**: Daily meal estimates per traveler.
  4. **Activities & Tours**: Guided expeditions, museum passes, and adventure permits.
  5. **Local Transit**: Subways, commuter trains, and ride shares.
  6. **Contingency Buffer**: Recommended 10% safety margin for unexpected delays.
- **Interactive Fine-Tuning Sliders**: Adjust individual category spending allocations on the fly (e.g., save 20% on flights to splurge +30% on luxury dining).
- **Per-Traveler Economics**: Live breakdown of total cost, cost per traveler, and suggested daily spend limits.

### 2. 🧠 Smart Destination Recommendation Engine
- Multi-factor algorithmic scoring that evaluates destinations against the traveler's exact profile.
- **Explainable Recommendations**: Clear, dynamic explanation bullets detailing matched interests, trip duration suitability, and budget surplus or gap.
- **Filter & Sort**: Filter by region (*Asia*, *Europe*, *Americas*, *Africa*, *Oceania*) and sort by *Match Score*, *Price (Low to High)*, *Price (High to Low)*, or *Rating*.
- **Empty State Recovery**: Friendly feedback and one-click filter resets when search queries match zero destinations.

### 3. 💱 Multi-Currency Support
- Real-time conversion across major currencies:
  - **USD ($)** — United States Dollar
  - **EUR (€)** — Euro (0.92x)
  - **GBP (£)** — British Pound (0.79x)
  - **INR (₹)** — Indian Rupee (83.5x)

### 4. 📋 Summary Export & Local Storage Persistence
- **One-Click Clipboard Export**: Formats a clean, readable text overview ready for WhatsApp, email notes, or travel companions.
- **Local Storage Persistence**: Save preferred itineraries directly to browser storage for returning visits.

### 5. 🔒 Secure & Private by Design
- **100% Client-Side Execution**: All financial projections and recommendation scoring run locally in the browser.
- **Zero Sensitive Data Collection**: No credit cards, personal identifiers, passwords, or telemetry harvested.
- **Zero API Secrets**: No exposed tokens or backend keys in client code.

---

## 📐 Recommendation Algorithm Specification

The recommendation engine uses a deterministic, transparent multi-factor heuristic model:

$$\text{MatchScore} = \text{clamp}\Big(\text{round}\big(0.35 \times I + 0.35 \times B + 0.20 \times D + 0.10 \times R\big), 20, 99\Big)$$

### Component Weights & Formulations

| Factor | Weight | Formulation & Logic |
|---|:---:|---|
| **Interest Alignment ($I$)** | **35%** | Measures tag overlap between user preferences and destination tags: <br>$$I = \min\left(100, \text{round}\left(\frac{|T_{\text{dest}} \cap T_{\text{user}}|}{|T_{\text{user}}|} \times 90\right) + 10\right)$$<br>*(Defaults to baseline $75$ when no interests are selected).* |
| **Budget Compatibility ($B$)** | **35%** | Evaluates the ratio $r = \frac{\text{EstimatedCost}}{\text{TargetBudget}}$:<br>• If $r \le 1.0$: $B = \text{round}(85 + (1 - |r - 0.85|) \times 15)$ *(optimal zone: $70\% - 100\%$)*<br>• If $1.0 < r \le 1.2$: moderate penalty $B = \max(35, \text{round}(70 - (r - 1.0) \times 175))$<br>• If $r > 1.2$: heavy deficit penalty $B = \max(15, \text{round}(40 - (r - 1.2) \times 50))$ |
| **Trip Duration Suitability ($D$)** | **20%** | Compares planned days against recommended stay window $[D_{\min}, D_{\max}]$:<br>• If $D_{\min} \le \text{days} \le D_{\max}$: $D = 100$<br>• If $\text{days} < D_{\min}$: distance penalty $D = \max(25, 100 - (D_{\min} - \text{days}) \times 20)$<br>• If $\text{days} > D_{\max}$: relaxed visit adjustment $D = \max(50, 100 - (\text{days} - D_{\max}) \times 8)$ |
| **Traveler Rating ($R$)** | **10%** | Normalized verified traveler rating: $R = \text{round}\left(\frac{\text{Rating}}{5.0} \times 100\right)$ |

---

## ⚠️ Important Disclaimers

> [!NOTE]
> **Pricing Disclaimer**: All flight costs, accommodation rates, dining allowances, and activity fees presented in this application are **benchmark estimates** derived from curated unit economic averages. They do not represent live fluctuating Global Distribution System (GDS) airline airfares or real-time hotel booking availability.
>
> **Algorithm Disclaimer**: The destination recommendation system is **rule-based and heuristic**. It computes explainable multi-factor alignment scores rather than utilizing machine learning models or black-box neural networks.

---

## 🏗️ Architecture & Project Tree

```
smart-trip-planner/
├── index.html                   # HTML5 entry with Google Fonts & meta tags
├── package.json                 # Dependencies & scripts
├── tsconfig.json                # TypeScript compiler configuration (strict)
├── tsconfig.node.json           # Vite node environment typing
├── vite.config.ts               # Vite bundler configuration
├── vitest.config.ts             # Vitest test runner configuration
├── tailwind.config.js           # Custom Tailwind theme & color tokens
├── postcss.config.js            # PostCSS Autoprefixer configuration
├── .gitignore                   # Comprehensive Git exclusions
├── .env.example                 # Optional environment template
├── LICENSE                      # MIT License
├── README.md                    # Project documentation
└── src/
    ├── main.tsx                 # React entry point
    ├── App.tsx                  # Root state coordinator
    ├── index.css                # Tailwind directives & custom CSS
    ├── types/
    │   └── trip.ts              # Strict TypeScript models & interfaces
    ├── data/
    │   └── destinations.ts      # Curated destination dataset & currency rates
    ├── utils/
    │   ├── budgetCalculator.ts  # Pure budget calculation & sanitization functions
    │   ├── recommendationEngine.ts # Heuristic scoring & filtering engine
    │   └── __tests__/
    │       ├── budgetCalculator.test.ts      # 18 unit tests
    │       └── recommendationEngine.test.ts  # 13 unit tests
    └── components/
        ├── layout/
        │   ├── Navbar.tsx       # Responsive navigation bar with currency switcher
        │   └── Footer.tsx       # Tech stack badges, portfolio links, disclaimer
        ├── hero/
        │   └── HeroSection.tsx  # Hero banner, search bar, vibe pills, trust metrics
        ├── preferences/
        │   └── TripPreferencesForm.tsx # Origin, budget, duration, party, stay inputs
        ├── destinations/
        │   ├── DestinationGrid.tsx     # Region tabs, sorting dropdown, empty state
        │   ├── DestinationCard.tsx     # Destination card with score badge & pricing
        │   └── DestinationModal.tsx    # Accessible modal with 3-day itinerary
        ├── budget/
        │   ├── BudgetOverview.tsx      # Target vs. Estimated comparison hero
        │   ├── CostBreakdownCard.tsx   # Itemized cards with interactive sliders
        │   └── BudgetSummaryExport.tsx # Formatted clipboard copy with feedback
        └── cta/
            └── CallToAction.tsx        # Local storage save & comparison CTA
```

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18.0.0 or higher recommended)
- `npm` (v9 or higher)

### Installation
1. **Clone the repository**:
   ```bash
   git clone https://github.com/<your-username>/smart-trip-planner.git
   cd smart-trip-planner
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

### Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Running Unit Tests
```bash
npm test
```
Runs the 31 Vitest unit tests covering budget sanitization, edge cases, duration scoring, and recommendation ranking.

### Production Build
```bash
npm run build
```
Type-checks with `tsc` and compiles optimized assets into `dist/`.

### Preview Production Build
```bash
npm run preview
```

---

## 📦 GitHub Publishing Guide

To initialize and publish this project to your GitHub account:

```powershell
# 1. Navigate to the project root
cd d:\antigravity\smart-trip-planner

# 2. Initialize Git repository
git init

# 3. Stage all clean project files (.gitignore excludes .node, node_modules, and dist)
git add .

# 4. Create the initial commit
git commit -m "feat: complete Smart Trip Planner web application with budget calculator and recommendation engine"

# 5. Rename primary branch to main
git branch -M main

# 6. Add your GitHub remote repository (replace with your repo URL)
git remote add origin https://github.com/<your-username>/smart-trip-planner.git

# 7. Push to GitHub
git push -u origin main
```

---

## 👨‍💻 Author & Portfolio

Designed and developed by a **B.Tech Computer Science & Engineering graduate** specializing in **Artificial Intelligence, Machine Learning, and Modern Full-Stack Web Development**.

- Portfolio: [AIML Graduate Portfolio](../index.html)
- Repository: [Smart Trip Planner](https://github.com/)

---

## 📄 License
This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.
