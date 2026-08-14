# 🇮🇳 The Next India — RRMI Civic Movement Platform

<div align="center">

[![Live Demo](https://img.shields.io/badge/Live_Demo-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://rrhm-pi.vercel.app/)
[![React](https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-Realtime-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

**A high-performance, real-time nationwide civic platform uniting 2,026+ verified young citizens across all 36 Indian States & Union Territories.**

[🚀 Explore Live App](https://rrhm-pi.vercel.app/) • [📖 Read the Manifesto](https://rrhm-pi.vercel.app/#manifesto-reader) • [✨ Cinematic Unlock](https://rrhm-pi.vercel.app/?unlocked=cinematic)

</div>

---

## 🌟 Key Engineering Features

### 1. 🗺️ High-Precision Cartography & 3-Pass SVG Layering
* **All 36 States & UTs Represented**: Custom SVG geometry calibrated to geographic coordinates with guaranteed non-overlapping touch targets (`>18px` clearance).
* **3-Pass SVG Rendering Engine**: Separates base state polygon fills, dynamic typography labels, and interactive beacon dots into independent rendering layers to eliminate visual occlusion.
* **Tricolor Dynamic Heatmap**: Geographic regional illumination (Saffron North ➔ Pure White Central ➔ Emerald South) dynamically scales glow intensity based on real-time voice density.

### 2. ⚡ Real-Time Multi-Device Concurrency (WebSockets + Supabase)
* **Live Nationwide Counter**: Instant synchronization across thousands of concurrent devices powered by Supabase PostgreSQL Realtime (`postgres_changes`).
* **Cross-Tab Local Broadcast**: Native `BroadcastChannel` synchronization updates browser tabs in real-time with zero API overhead.
* **Resilient Offline Architecture**: Automatic failover to local memory and defensive error handling ensures 100% uptime even on fluctuating mobile connections.

### 3. 🎬 6-Phase Cinematic Milestone Unlock
* The moment the **2,026th verified citizen** joins:
  $$\text{2,026 / 2,026 COMPLETE} \longrightarrow \text{Blackout} \longrightarrow \text{Tricolor Map Bloom} \longrightarrow \text{Ashoka Chakra Spin} \longrightarrow \text{Celebration} \longrightarrow \text{Website Launch}$$
* **Seamless State Transformation**: The launch gateway morphs directly into the full production website without URL redirects.
* **Session Persistence**: Page reloads preserve the unlocked website phase via persistent local state machines.

### 4. 📄 Interactive Manifesto & PDF Export
* Full 5-pillar constitutional manifesto reader with real-time state filter search.
* Direct in-browser client-side high-resolution PDF document generator.

---

## 🛠️ Architecture & Tech Stack

```
┌─────────────────────────────────────────────────────────┐
│                      Client Layer                       │
│  React 19 • Vite • TailwindCSS v4 • Lucide • Confetti   │
└────────────────────────────┬────────────────────────────┘
                             │
            ┌────────────────┴────────────────┐
            ▼                                 ▼
┌───────────────────────┐         ┌───────────────────────┐
│ Supabase Realtime WS  │         │   BroadcastChannel    │
│  PostgreSQL Database  │         │  (Cross-Tab Sync API) │
└───────────────────────┘         └───────────────────────┘
            │                                 │
            └────────────────┬────────────────┘
                             ▼
┌─────────────────────────────────────────────────────────┐
│                   Global Edge Network                   │
│          Vercel High-Availability Static Edge           │
└─────────────────────────────────────────────────────────┘
```

| Layer | Technology | Purpose |
|---|---|---|
| **Frontend Framework** | React 19 + Vite | High-speed rendering & optimized bundle size |
| **Styling & Motion** | TailwindCSS v4 + CSS3 Transforms | Hardware-accelerated animations & responsive layout |
| **Cloud Database** | Supabase PostgreSQL | Real-time voice registration & persistence |
| **Realtime Engine** | WebSocket Realtime + `BroadcastChannel` | Nationwide instant multi-user synchronization |
| **Deployment** | Vercel Edge Network | Global low-latency CDN delivery |

---

## 🚀 Local Development Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/mayank22415/rrhm.git
   cd rrhm
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env` file in the root directory:
   ```env
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
   ```

4. **Start Development Server:**
   ```bash
   npm run dev
   ```

5. **Build Production Bundle:**
   ```bash
   npm run build
   ```

---

## 👤 Author

**Mayank**  
* GitHub: [@mayank22415](https://github.com/mayank22415)  
* Project: [The Next India — RRMI](https://github.com/mayank22415/rrhm)

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
