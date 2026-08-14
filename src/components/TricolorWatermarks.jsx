import React from 'react';

export default function TricolorWatermarks() {
  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* ── AMBIENT TRICOLOR GLOW (Saffron top, White middle, Green bottom) ── */}
      <div
        className="absolute -top-40 -left-40 w-[650px] h-[650px] rounded-full opacity-[0.045]"
        style={{
          background: 'radial-gradient(circle, #FF9933 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
      />
      <div
        className="absolute top-1/3 -right-40 w-[700px] h-[700px] rounded-full opacity-[0.035]"
        style={{
          background: 'radial-gradient(circle, #000080 0%, transparent 70%)',
          filter: 'blur(100px)',
        }}
      />
      <div
        className="absolute -bottom-40 left-1/4 w-[800px] h-[800px] rounded-full opacity-[0.045]"
        style={{
          background: 'radial-gradient(circle, #138808 0%, transparent 70%)',
          filter: 'blur(90px)',
        }}
      />

      {/* ── 1. ASHOK CHAKRA WATERMARKS (Navy Blue & Saffron / Green subtle spokes) ── */}
      {/* Large Ashok Chakra Top-Right */}
      <svg
        viewBox="0 0 200 200"
        className="absolute -top-10 right-10 w-96 h-96 opacity-[0.055] text-blue-900 animate-spin-slow"
        style={{ animationDuration: '180s' }}
      >
        <circle cx="100" cy="100" r="90" fill="none" stroke="currentColor" strokeWidth="4" />
        <circle cx="100" cy="100" r="22" fill="none" stroke="currentColor" strokeWidth="3" />
        <circle cx="100" cy="100" r="8" fill="currentColor" />
        {[...Array(24)].map((_, i) => (
          <line
            key={i}
            x1="100"
            y1="100"
            x2={100 + 88 * Math.cos((i * 15 * Math.PI) / 180)}
            y2={100 + 88 * Math.sin((i * 15 * Math.PI) / 180)}
            stroke="currentColor"
            strokeWidth="2.2"
          />
        ))}
      </svg>

      {/* Medium Ashok Chakra Center-Left */}
      <svg
        viewBox="0 0 200 200"
        className="absolute top-[42%] -left-16 w-80 h-80 opacity-[0.045] text-orange-600 animate-spin-slow"
        style={{ animationDuration: '240s', animationDirection: 'reverse' }}
      >
        <circle cx="100" cy="100" r="90" fill="none" stroke="currentColor" strokeWidth="3.5" />
        <circle cx="100" cy="100" r="20" fill="none" stroke="currentColor" strokeWidth="2.5" />
        <circle cx="100" cy="100" r="7" fill="currentColor" />
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

      {/* ── 2. CHARKHA (TRADITIONAL INDIAN SPINNING WHEEL) WATERMARKS ── */}
      {/* Upper-Center Charkha */}
      <svg
        viewBox="0 0 300 180"
        className="absolute top-[16%] left-[38%] w-80 h-48 opacity-[0.045] text-slate-800"
        fill="none"
        stroke="currentColor"
      >
        {/* Base wooden platform */}
        <line x1="20" y1="160" x2="280" y2="160" strokeWidth="6" strokeLinecap="round" />
        <line x1="35" y1="160" x2="35" y2="172" strokeWidth="5" />
        <line x1="265" y1="160" x2="265" y2="172" strokeWidth="5" />
        {/* Main Wheel Post / Support */}
        <line x1="75" y1="160" x2="75" y2="85" strokeWidth="5" />
        {/* Main Large Wheel */}
        <circle cx="75" cy="85" r="55" strokeWidth="3.5" />
        <circle cx="75" cy="85" r="14" strokeWidth="2.5" />
        <circle cx="75" cy="85" r="5" fill="currentColor" />
        {/* Wheel Spokes (8 spokes) */}
        {[...Array(8)].map((_, i) => (
          <line
            key={i}
            x1="75"
            y1="85"
            x2={75 + 54 * Math.cos((i * 45 * Math.PI) / 180)}
            y2={85 + 54 * Math.sin((i * 45 * Math.PI) / 180)}
            strokeWidth="2"
          />
        ))}
        {/* Crank Handle */}
        <line x1="75" y1="85" x2="45" y2="65" strokeWidth="3" />
        <circle cx="45" cy="65" r="4" fill="currentColor" />
        {/* Spindle Post (Right) */}
        <line x1="240" y1="160" x2="240" y2="115" strokeWidth="4" />
        {/* Spindle Small Wheel & Needle */}
        <circle cx="240" cy="115" r="12" strokeWidth="2.5" />
        <line x1="225" y1="115" x2="285" y2="115" strokeWidth="2.5" strokeLinecap="round" />
        {/* Driving Thread / Belt connecting Wheel to Spindle */}
        <line x1="75" y1="30" x2="240" y2="103" strokeWidth="1.5" strokeDasharray="4 2" />
        <line x1="75" y1="140" x2="240" y2="127" strokeWidth="1.5" strokeDasharray="4 2" />
      </svg>

      {/* Lower Charkha (Left Side) */}
      <svg
        viewBox="0 0 300 180"
        className="absolute top-[64%] left-[6%] w-72 h-44 opacity-[0.04] text-orange-900"
        fill="none"
        stroke="currentColor"
      >
        <line x1="20" y1="160" x2="280" y2="160" strokeWidth="6" strokeLinecap="round" />
        <line x1="35" y1="160" x2="35" y2="172" strokeWidth="5" />
        <line x1="265" y1="160" x2="265" y2="172" strokeWidth="5" />
        <line x1="75" y1="160" x2="75" y2="85" strokeWidth="5" />
        <circle cx="75" cy="85" r="55" strokeWidth="3.5" />
        <circle cx="75" cy="85" r="14" strokeWidth="2.5" />
        <circle cx="75" cy="85" r="5" fill="currentColor" />
        {[...Array(8)].map((_, i) => (
          <line
            key={i}
            x1="75"
            y1="85"
            x2={75 + 54 * Math.cos((i * 45 * Math.PI) / 180)}
            y2={85 + 54 * Math.sin((i * 45 * Math.PI) / 180)}
            strokeWidth="2"
          />
        ))}
        <line x1="75" y1="85" x2="45" y2="65" strokeWidth="3" />
        <circle cx="45" cy="65" r="4" fill="currentColor" />
        <line x1="240" y1="160" x2="240" y2="115" strokeWidth="4" />
        <circle cx="240" cy="115" r="12" strokeWidth="2.5" />
        <line x1="225" y1="115" x2="285" y2="115" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="75" y1="30" x2="240" y2="103" strokeWidth="1.5" strokeDasharray="4 2" />
        <line x1="75" y1="140" x2="240" y2="127" strokeWidth="1.5" strokeDasharray="4 2" />
      </svg>

      {/* ── 3. INDIAN CURRENCY NOTE (BANKNOTE) WATERMARKS ── */}
      {/* Upper-Left Currency Note (₹500 Note Motif) */}
      <svg
        viewBox="0 0 340 180"
        className="absolute top-[8%] left-[6%] w-84 h-44 opacity-[0.045] text-slate-800"
        fill="none"
        stroke="currentColor"
      >
        {/* Outer border & guilloche frame */}
        <rect x="10" y="10" width="320" height="160" rx="8" strokeWidth="3" />
        <rect x="16" y="16" width="308" height="148" rx="6" strokeWidth="1" strokeDasharray="4 2" />
        {/* Security thread strip */}
        <line x1="120" y1="10" x2="120" y2="170" strokeWidth="4" strokeDasharray="8 4" stroke="#16a34a" />
        {/* RBI Heading */}
        <text x="170" y="38" textAnchor="middle" fill="currentColor" stroke="none" fontSize="11" fontWeight="900" letterSpacing="1">
          RESERVE BANK OF INDIA
        </text>
        <text x="170" y="52" textAnchor="middle" fill="currentColor" stroke="none" fontSize="9" fontWeight="bold">
          भारतीय रिज़र्व बैंक
        </text>
        {/* Rupee Symbol & Denomination */}
        <text x="45" y="60" fill="currentColor" stroke="none" fontSize="26" fontWeight="900">
          ₹
        </text>
        <text x="65" y="60" fill="currentColor" stroke="none" fontSize="22" fontWeight="900">
          500
        </text>
        {/* Gandhi Watermark Oval Frame */}
        <ellipse cx="270" cy="95" rx="34" ry="46" strokeWidth="2" />
        {/* Mahatma Gandhi Silhouette Profile */}
        <path
          d="M 265 65 Q 285 65 285 85 Q 285 100 275 110 Q 285 125 295 135 L 245 135 Q 255 120 255 105 Q 248 95 252 80 Z"
          fill="currentColor"
          opacity="0.6"
          stroke="none"
        />
        {/* Spectacles */}
        <circle cx="265" cy="85" r="7" strokeWidth="1.5" />
        <circle cx="280" cy="85" r="7" strokeWidth="1.5" />
        <line x1="272" y1="85" x2="273" y2="85" strokeWidth="2" />
        {/* Ashoka Pillar watermark left bottom */}
        <path
          d="M 45 120 Q 52 110 60 110 Q 68 110 75 120 L 78 145 L 42 145 Z"
          fill="currentColor"
          opacity="0.5"
          stroke="none"
        />
        {/* Micro-print promise text line */}
        <line x1="45" y1="80" x2="195" y2="80" strokeWidth="1.5" />
        <line x1="45" y1="92" x2="180" y2="92" strokeWidth="1.5" />
        <text x="45" y="105" fill="currentColor" stroke="none" fontSize="8" fontWeight="bold">
          GUARANTEED BY CENTRAL GOVT
        </text>
        {/* Number 500 right bottom */}
        <text x="285" y="160" fill="currentColor" stroke="none" fontSize="16" fontWeight="900">
          ₹500
        </text>
      </svg>

      {/* Right Side Currency Note (₹2000 Note Motif) */}
      <svg
        viewBox="0 0 340 180"
        className="absolute top-[70%] right-[6%] w-84 h-44 opacity-[0.04] text-slate-800"
        fill="none"
        stroke="currentColor"
      >
        <rect x="10" y="10" width="320" height="160" rx="8" strokeWidth="3" />
        <rect x="16" y="16" width="308" height="148" rx="6" strokeWidth="1" strokeDasharray="4 2" />
        <line x1="120" y1="10" x2="120" y2="170" strokeWidth="4" strokeDasharray="8 4" stroke="#e11d48" />
        <text x="170" y="38" textAnchor="middle" fill="currentColor" stroke="none" fontSize="11" fontWeight="900" letterSpacing="1">
          RESERVE BANK OF INDIA
        </text>
        <text x="45" y="60" fill="currentColor" stroke="none" fontSize="24" fontWeight="900">
          ₹2000
        </text>
        <ellipse cx="270" cy="95" rx="34" ry="46" strokeWidth="2" />
        <circle cx="265" cy="85" r="7" strokeWidth="1.5" />
        <circle cx="280" cy="85" r="7" strokeWidth="1.5" />
        <text x="45" y="105" fill="currentColor" stroke="none" fontSize="8" fontWeight="bold">
          BHARATIYA RESERVE BANK
        </text>
        <text x="275" y="160" fill="currentColor" stroke="none" fontSize="16" fontWeight="900">
          ₹2000
        </text>
      </svg>

      {/* ── 4. INDIAN CURRENCY COIN WATERMARKS ── */}
      {/* Top-Right ₹10 Coin */}
      <svg
        viewBox="0 0 160 160"
        className="absolute top-[22%] right-[8%] w-44 h-44 opacity-[0.05] text-amber-700"
        fill="none"
        stroke="currentColor"
      >
        {/* Outer Coin Ring (Bi-metallic ₹10 coin) */}
        <circle cx="80" cy="80" r="72" strokeWidth="5" />
        <circle cx="80" cy="80" r="66" strokeWidth="1.5" strokeDasharray="5 3" />
        {/* Inner Core */}
        <circle cx="80" cy="80" r="48" strokeWidth="3" fill="#FFF" fillOpacity="0.3" />
        {/* Denomination Number & Rupee Symbol */}
        <text x="80" y="75" textAnchor="middle" fill="currentColor" stroke="none" fontSize="30" fontWeight="900">
          ₹
        </text>
        <text x="80" y="112" textAnchor="middle" fill="currentColor" stroke="none" fontSize="34" fontWeight="900">
          10
        </text>
        {/* Outer Ring Inscriptions */}
        <text x="80" y="24" textAnchor="middle" fill="currentColor" stroke="none" fontSize="10" fontWeight="900" letterSpacing="1">
          भारत INDIA
        </text>
        <text x="80" y="148" textAnchor="middle" fill="currentColor" stroke="none" fontSize="10" fontWeight="900" letterSpacing="1">
          सत्यमेव जयते
        </text>
        {/* Grain sprigs on left and right */}
        <path d="M 22 70 Q 28 80 22 90" strokeWidth="2.5" />
        <path d="M 138 70 Q 132 80 138 90" strokeWidth="2.5" />
      </svg>

      {/* Center-Left ₹5 Coin (Lion Capital Emblem) */}
      <svg
        viewBox="0 0 160 160"
        className="absolute top-[52%] left-[2%] w-44 h-44 opacity-[0.045] text-slate-800"
        fill="none"
        stroke="currentColor"
      >
        <circle cx="80" cy="80" r="72" strokeWidth="5" />
        <circle cx="80" cy="80" r="65" strokeWidth="2" />
        {/* Lion Capital on Coin */}
        <path
          d="M 60 50 Q 70 30 80 30 Q 90 30 100 50 Q 110 65 95 85 Q 85 92 80 92 Q 75 92 65 85 Q 50 65 60 50 Z"
          fill="currentColor"
          opacity="0.7"
          stroke="none"
        />
        <rect x="58" y="94" width="44" height="12" rx="2" fill="currentColor" stroke="none" />
        <text x="80" y="125" textAnchor="middle" fill="currentColor" stroke="none" fontSize="22" fontWeight="900">
          ₹5
        </text>
        <text x="80" y="145" textAnchor="middle" fill="currentColor" stroke="none" fontSize="8" fontWeight="bold">
          सत्यमेव जयते
        </text>
      </svg>

      {/* Bottom Center-Left ₹20 Coin */}
      <svg
        viewBox="0 0 160 160"
        className="absolute top-[84%] right-[32%] w-40 h-40 opacity-[0.045] text-emerald-800"
        fill="none"
        stroke="currentColor"
      >
        <polygon
          points="80,10 120,20 148,48 158,88 148,128 120,150 80,158 40,150 12,128 2,88 12,48 40,20"
          strokeWidth="4"
        />
        <circle cx="80" cy="80" r="48" strokeWidth="2.5" />
        <text x="80" y="75" textAnchor="middle" fill="currentColor" stroke="none" fontSize="28" fontWeight="900">
          ₹
        </text>
        <text x="80" y="112" textAnchor="middle" fill="currentColor" stroke="none" fontSize="32" fontWeight="900">
          20
        </text>
      </svg>

      {/* ── 5. ASHOK STAMBH (LION CAPITAL) MOTIFS ── */}
      <svg
        viewBox="0 0 160 220"
        className="absolute top-24 left-8 w-44 h-60 opacity-[0.045] text-slate-800"
        fill="currentColor"
      >
        <path d="M 40 40 Q 50 15 80 15 Q 110 15 120 40 Q 135 60 120 90 Q 105 105 80 105 Q 55 105 40 90 Q 25 60 40 40 Z" />
        <path d="M 25 50 Q 15 35 30 25 Q 45 25 45 45 Z" />
        <path d="M 135 50 Q 145 35 130 25 Q 115 25 115 45 Z" />
        <rect x="35" y="108" width="90" height="24" rx="4" />
        <circle cx="80" cy="120" r="8" fill="white" />
        <circle cx="80" cy="120" r="2" fill="currentColor" />
        <path d="M 45 136 Q 80 148 115 136 L 125 170 Q 80 185 35 170 Z" />
        <rect x="25" y="175" width="110" height="14" rx="3" />
        <rect x="15" y="192" width="130" height="16" rx="4" />
        <text x="80" y="204" textAnchor="middle" fill="white" fontSize="9" fontWeight="900" letterSpacing="1">
          सत्यमेव जयते
        </text>
      </svg>

      {/* ── 6. INDIAN TRICOLOR WAVING FLAGS & BANNERS ── */}
      <svg
        viewBox="0 0 400 120"
        className="absolute top-[18%] right-[15%] w-96 h-28 opacity-[0.06]"
      >
        <path
          d="M 10 20 Q 100 0 200 25 Q 300 50 390 20 L 390 50 Q 300 80 200 55 Q 100 30 10 50 Z"
          fill="#FF9933"
        />
        <path
          d="M 10 50 Q 100 30 200 55 Q 300 80 390 50 L 390 75 Q 300 105 200 80 Q 100 55 10 75 Z"
          fill="#FFFFFF"
          stroke="#E5E7EB"
          strokeWidth="0.5"
        />
        <path
          d="M 10 75 Q 100 55 200 80 Q 300 105 390 75 L 390 105 Q 300 135 200 110 Q 100 85 10 105 Z"
          fill="#138808"
        />
        <circle cx="200" cy="68" r="9" fill="none" stroke="#000080" strokeWidth="1.2" />
        {[...Array(24)].map((_, i) => (
          <line
            key={i}
            x1="200"
            y1="68"
            x2={200 + 8.5 * Math.cos((i * 15 * Math.PI) / 180)}
            y2={68 + 8.5 * Math.sin((i * 15 * Math.PI) / 180)}
            stroke="#000080"
            strokeWidth="0.8"
          />
        ))}
      </svg>

      {/* ── 7. KIDS / INDIAN STUDENTS SILHOUETTES ── */}
      <svg
        viewBox="0 0 200 240"
        className="absolute top-[34%] left-[4%] w-48 h-60 opacity-[0.045] text-slate-700"
        fill="currentColor"
      >
        <circle cx="90" cy="45" r="22" />
        <polygon points="90,12 125,25 90,38 55,25" />
        <line x1="125" y1="25" x2="128" y2="48" stroke="currentColor" strokeWidth="2.5" />
        <path d="M 60 75 Q 90 68 120 75 L 128 170 L 52 170 Z" />
        <path d="M 115 80 L 155 35 L 168 45 L 125 95 Z" />
        <polygon points="158,25 168,10 178,25 168,40" fill="#ea580c" />
        <rect x="30" y="180" width="130" height="15" rx="3" />
        <rect x="40" y="162" width="110" height="15" rx="3" />
        <rect x="50" y="144" width="90" height="15" rx="3" />
      </svg>

      {/* ── 8. REPEATING PATRIOTIC TEXT WATERMARKS ── */}
      <div
        className="absolute top-[8%] left-1/3 text-4xl font-black text-gray-900 opacity-[0.035] tracking-[0.3em] uppercase select-none"
        style={{ transform: 'rotate(-12deg)' }}
      >
        सत्यमेव जयते
      </div>
      <div
        className="absolute top-[30%] right-1/4 text-5xl font-black text-orange-950 opacity-[0.03] tracking-[0.25em] uppercase select-none"
        style={{ transform: 'rotate(10deg)' }}
      >
        UNITY IN MERIT
      </div>
      <div
        className="absolute top-[50%] left-[22%] text-4xl font-black text-green-950 opacity-[0.035] tracking-[0.3em] uppercase select-none"
        style={{ transform: 'rotate(-8deg)' }}
      >
        RESERVATION REFORM
      </div>
      <div
        className="absolute top-[72%] right-[18%] text-5xl font-black text-slate-900 opacity-[0.03] tracking-[0.3em] uppercase select-none"
        style={{ transform: 'rotate(12deg)' }}
      >
        EQUALITY & JUSTICE
      </div>

    </div>
  );
}
