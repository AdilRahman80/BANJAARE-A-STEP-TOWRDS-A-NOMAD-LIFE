# 🚀 NomadX (Banjaare) — Run & Quickstart Guide

This guide provides simple, step-by-step instructions to run, test, and build the **NomadX** web application on your local machine.

---

## ⚡ Quick Start (Standard Node.js)

If you have Node.js (version 18 or higher) installed on your system:

### 1. Install Dependencies (First time only)
```bash
npm install
```

### 2. Start the Development Server
```bash
npm run dev
```
By default, the server launches on `http://localhost:5173/` (or automatically falls back to `http://localhost:3001/` if port 5173 is occupied).

Open your browser and navigate to:
```
http://localhost:3001/
```

### 3. Run the Automated Unit Test Suite
To execute all 43 automated unit tests:
```bash
npm test
```

### 4. Build for Production
To typecheck and compile the optimized production bundle:
```bash
npm run build
```
Production assets are output to the `dist/` directory.

---

## 💻 Running with Portable Node.js (Windows)

If you are using the portable Node.js binary located inside the project at `.node\node-v20.18.0-win-x64\`:

### PowerShell Command:
```powershell
$env:PATH = "D:\antigravity\smart-trip-planner\.node\node-v20.18.0-win-x64;$env:PATH"
npm run dev
```

### Command Prompt (cmd.exe):
```cmd
set PATH=D:\antigravity\smart-trip-planner\.node\node-v20.18.0-win-x64;%PATH%
npm run dev
```

---

## 🧭 Navigating Application Studios

NomadX is structured with dedicated page views synchronized via URL hashes. You can jump directly to any studio:

| Studio | Direct Hash URL | Description |
|---|---|---|
| **Discovery** | `http://localhost:3001/#home` | Editorial hero, live stats, spotlight retreats, feature hubs |
| **Remote Gigs** | `http://localhost:3001/#gigs` | 12+ verified remote contracts, category filters, and net surplus calculator |
| **Destinations** | `http://localhost:3001/#destinations` | 54 audited destinations with dynamic Nomad Scores & Wi-Fi benchmarks |
| **Trip Architect** | `http://localhost:3001/#planner` | 26 origin cities, budget allocations, transit estimators, and breakdown |
| **Coliving & Desks** | `http://localhost:3001/#coliving` | Verified coliving properties with 140–350 Mbps tested Wi-Fi |
| **Routine Studio** | `http://localhost:3001/#itinerary` | Balanced 4-hr focus blocks, custom block builder, and `.ics` calendar export |
| **Tech & Gear Kit** | `http://localhost:3001/#gear` | Interactive packing checklist, departure readiness, and custom gear items |
| **Community Hub** | `http://localhost:3001/#community` | Nomad directory, weekly meetups, coffee invites, and villa-split requests |
| **Tax & Surplus** | `http://localhost:3001/#passport` | Indian Section 44ADA tax simulator, earn-to-travel meter, and micro-ledger |
| **Residencies** | `http://localhost:3001/#residence` | Luxury stays + cash stipends in exchange for skilled creative work |
| **Manifesto** | `http://localhost:3001/#about` | Origin story, editorial manifesto, and concierge inquiry form |

---

## 🎨 Theme Toggle (Light vs. Dark)

- **Default Theme:** **Bright Luxury** (warm linen/cream aesthetic inspired by Vita Travel & Eloura Journeys).
- **Dark Theme:** Click the **Moon / Sun** button in the navigation bar to toggle to **Night Forest Obsidian**.
- Your preference is automatically remembered in browser `localStorage`.

---

## 📱 Offline PWA Mode

NomadX includes a service worker (`public/sw.js`) and Web App Manifest (`public/manifest.webmanifest`).
- To install as an app on your phone or desktop: Click the install icon in your browser URL bar.
- Offline behavior: If connectivity drops on mountain treks or trains, NomadX continues serving cached itineraries and calculations offline with an active offline status banner.

---

## 🛠️ Troubleshooting & FAQ

1. **Port in use error?**
   Vite automatically attempts the next available port (e.g. 3001, 3002). Check the terminal output for the active URL.
2. **Local storage clear?**
   If you ever want to reset all custom gear, saved itineraries, or expenses, simply clear your browser's site data or use the in-app "Reset" buttons.
