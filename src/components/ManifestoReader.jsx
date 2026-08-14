import React from 'react';
import { exportManifestoToPDF } from '../utils/pdfExport';

export const MANIFESTO_PILLARS = [
  {
    num: 1,
    title: "Equity & Justice",
    description: "Prioritize persons with disabilities, economically weaker households, and measurably backward groups."
  },
  {
    num: 2,
    title: "Merit & Competence",
    description: "Equal opportunity at the start line; uncompromised standards in life-critical fields."
  },
  {
    num: 3,
    title: "Efficiency",
    description: "Representation must coexist with organizational efficiency and public safety."
  },
  {
    num: 4,
    title: "Adaptability",
    description: "Independent reviews every decade; policies evolve with evidence."
  },
  {
    num: 5,
    title: "Unity & Dignity",
    description: "No caste, religion, or community is opposed; dignity for every citizen."
  },
  {
    num: 6,
    title: "Transparency",
    description: "Independent commissions, public dashboards, and data-driven reforms."
  }
];

export default function ManifestoReader() {
  return (
    <section
      id="manifesto-reader"
      className="py-16 sm:py-24 border-t border-gray-200 relative overflow-hidden"
      style={{ background: '#ebebeb' }}
    >
      {/* ── SECTION WATERMARKS (Ashok Chakra & Tricolors) ── */}
      <div
        className="absolute inset-0 pointer-events-none select-none overflow-hidden"
        style={{ zIndex: 0 }}
        aria-hidden="true"
      >
        {/* Ashoka Chakra Center Watermark */}
        <svg
          viewBox="0 0 200 200"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] opacity-[0.035] text-slate-800"
        >
          <circle cx="100" cy="100" r="90" fill="none" stroke="currentColor" strokeWidth="3" />
          <circle cx="100" cy="100" r="22" fill="none" stroke="currentColor" strokeWidth="2.5" />
          <circle cx="100" cy="100" r="8" fill="currentColor" />
          {[...Array(24)].map((_, i) => (
            <line
              key={i}
              x1="100"
              y1="100"
              x2={100 + 88 * Math.cos((i * 15 * Math.PI) / 180)}
              y2={100 + 88 * Math.sin((i * 15 * Math.PI) / 180)}
              stroke="currentColor"
              strokeWidth="1.8"
            />
          ))}
        </svg>

        {/* Ashok Stambh Watermark Left */}
        <svg
          viewBox="0 0 160 220"
          className="absolute top-12 left-4 w-40 h-56 opacity-[0.035] text-slate-800"
          fill="currentColor"
        >
          <path d="M 40 40 Q 50 15 80 15 Q 110 15 120 40 Q 135 60 120 90 Q 105 105 80 105 Q 55 105 40 90 Q 25 60 40 40 Z" />
          <rect x="35" y="108" width="90" height="24" rx="4" />
          <circle cx="80" cy="120" r="8" fill="white" />
          <path d="M 45 136 Q 80 148 115 136 L 125 170 Q 80 185 35 170 Z" />
          <rect x="25" y="175" width="110" height="14" rx="3" />
          <rect x="15" y="192" width="130" height="16" rx="4" />
          <text x="80" y="204" textAnchor="middle" fill="white" fontSize="9" fontWeight="900">सत्यमेव जयते</text>
        </svg>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14 relative z-10">

        {/* ── MANIFESTO HEADER — exact match to reference site ── */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 tracking-tight uppercase">
            THE MANIFESTO
          </h2>
          <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
            Designed to dismantle prejudice and build a merit-driven society. Six pillars
            defining our vision.
          </p>
        </div>

        {/* ── 6 PILLARS GRID — 3×2 with large faint background number watermark ── */}
        <div id="manifesto-print-area" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {MANIFESTO_PILLARS.map((pillar) => (
            <div
              key={pillar.num}
              className="relative bg-white rounded-2xl p-6 sm:p-8 border border-gray-200/70 shadow-xs hover:shadow-md transition-shadow duration-300 overflow-hidden"
            >
              {/* Large faint watermark number — top right background (exact match to reference) */}
              <span
                className="absolute top-0 right-3 font-black text-gray-200 select-none pointer-events-none"
                style={{ fontSize: '6rem', lineHeight: 1, zIndex: 0 }}
                aria-hidden="true"
              >
                {pillar.num}
              </span>

              {/* Black rounded-square number badge — exact reference style */}
              <div
                className="relative z-10 w-11 h-11 rounded-xl bg-gray-950 text-white font-black text-base flex items-center justify-center mb-5 flex-shrink-0"
              >
                {pillar.num}
              </div>

              {/* Title */}
              <h3 className="relative z-10 text-base sm:text-lg font-black text-gray-900 mb-2">
                {pillar.title}
              </h3>

              {/* Description */}
              <p className="relative z-10 text-gray-500 text-sm leading-relaxed">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>

        {/* ── DOWNLOAD INTERNAL FRAMEWORK BANNER — exact match ── */}
        <div className="rounded-2xl bg-gray-950 text-white p-7 sm:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border border-gray-800 shadow-xl">
          <div className="space-y-2 max-w-2xl">
            <h3 className="text-xl sm:text-2xl font-black tracking-tight text-white">
              Download Internal Framework
            </h3>
            <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
              Dive deep into the research, legal policies, and economic pipelines
              underpinning the officially launched RRMI Manifesto structure.
            </p>
          </div>

          {/* Flat solid red button — exact match */}
          <button
            onClick={exportManifestoToPDF}
            className="flex-shrink-0 bg-red-600 hover:bg-red-700 text-white font-black uppercase tracking-wider text-sm px-8 py-4 rounded-xl transition-colors duration-200 cursor-pointer shadow-lg shadow-red-600/30 hover:scale-[1.02] active:scale-[0.98]"
          >
            DOWNLOAD MANIFESTO
          </button>
        </div>

      </div>
    </section>
  );
}
