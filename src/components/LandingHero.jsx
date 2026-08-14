import React, { useState, useEffect } from 'react';
import { Flame, ShieldCheck, Sparkles, Users, Lock, Unlock } from 'lucide-react';
import { INDIA_VIEWBOX } from '../data/indiaStatesData';

const SVG_W = 620;
const SVG_H = 700;

// Tricolor zone: North = Saffron/Red, Middle band = White, South = Green
function getStateZoneColor(nodeY) {
  if (nodeY <= 215) {
    return {
      hex: '#ea580c',
      rgb: '234,88,12',
      glowRgb: '220,38,38',
      ring: '#ea580c',
      label: '#9a3412',
      badge: 'bg-orange-600',
      name: 'North (Saffron)',
      coreBright: 'rgba(255,200,150,0.95)',
    };
  } else if (nodeY <= 370) {
    return {
      hex: '#f8fafc',
      rgb: '248,250,252',
      glowRgb: '255,255,255',
      ring: '#cbd5e1',
      label: '#334155',
      badge: 'bg-slate-300',
      name: 'Central (White)',
      coreBright: 'rgba(255,255,255,1)',
    };
  } else {
    return {
      hex: '#16a34a',
      rgb: '22,163,74',
      glowRgb: '22,163,74',
      ring: '#15803d',
      label: '#14532d',
      badge: 'bg-green-600',
      name: 'South (Green)',
      coreBright: 'rgba(150,255,180,0.95)',
    };
  }
}

function stateLabel(name) {
  const abbr = {
    'Jammu & Kashmir': 'J&K',
    'Himachal Pradesh': 'HP',
    'Uttar Pradesh': 'UP',
    'Madhya Pradesh': 'MP',
    'Andhra Pradesh': 'AP',
    'Arunachal Pradesh': 'AR',
    'Tamil Nadu': 'TN',
    'West Bengal': 'WB',
    'Andaman & Nicobar': 'A&N',
    'D&NH and D&D': 'D&D',
    'Lakshadweep': 'LD',
    'Chandigarh': 'CH',
    'Puducherry': 'PY'
  };
  return abbr[name] || name;
}

export default function LandingHero({
  voiceCount,
  targetCount = 2026,
  onOpenModal,
  isUnlocked,
  statesData = [],
  onStateClicked,
  onTriggerCinematic,
}) {
  const [hoveredState, setHoveredState] = useState(null);
  const [justClickedState, setJustClickedState] = useState(null);

  const percentage = Math.min(100, Math.round((voiceCount / targetCount) * 100));
  const remaining = Math.max(0, targetCount - voiceCount);
  const isComplete = voiceCount >= targetCount;

  // Max voices across all states for relative scaling
  const maxVoices = Math.max(1, ...statesData.map(s => s.voices || 0));

  // Ashoka Chakra 24 spokes
  const spokes = Array.from({ length: 24 }, (_, i) => i * 15);

  const handleStateClick = (st) => {
    setJustClickedState(st.id);
    setTimeout(() => setJustClickedState(null), 1200);
    if (onStateClicked) onStateClicked(st.name);
  };

  return (
    <section
      id="hero"
      className="relative min-h-[calc(100vh-4rem)] flex flex-col justify-between overflow-hidden bg-white border-b border-gray-100 py-10 lg:py-12"
    >
      {/* Ambient background glows */}
      <div
        className="absolute top-0 right-0 w-[550px] h-[550px] pointer-events-none rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(254,215,170,0.2) 0%, transparent 70%)',
          filter: 'blur(70px)',
        }}
      />
      <div
        className="absolute bottom-0 right-1/4 w-[500px] h-[500px] pointer-events-none rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(187,247,208,0.2) 0%, transparent 70%)',
          filter: 'blur(70px)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">

          {/* LEFT PANEL: Campaign Manifesto & CTAs */}
          <div className="lg:col-span-5 space-y-6 text-gray-900 order-2 lg:order-1">

            {/* Campaign Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-red-50 border border-red-200 text-red-700">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600" />
              </span>
              RESERVATION REFORM MOVEMENT INDIA
            </div>

            {/* Main Headline */}
            <div className="space-y-2">
              <div className="text-xs font-mono font-bold tracking-[0.25em] text-red-600 uppercase">
                THE CAMPAIGN
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.08] text-gray-900">
                THE NEXT INDIA <br />
                <span className="text-red-600">RRMI website launch</span>
              </h1>
            </div>

            {/* Subheading */}
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
              When any citizen joins, their state lights up on the map. 
              Once <strong className="text-gray-900 font-bold">2,026 voices</strong> are reached, 
              the full India map illuminates with the Ashoka Chakra in the center to unlock the national manifesto.
            </p>

            {/* Live Counter & Progress */}
            <div className="bg-gray-50 border border-gray-200 rounded-2xl p-5 sm:p-6 space-y-4 shadow-xs">
              <div className="flex items-baseline justify-between">
                <div>
                  <span className="text-3xl sm:text-4xl font-mono font-black text-gray-900">
                    {voiceCount.toLocaleString('en-IN')}
                  </span>
                  <span className="text-gray-400 text-lg font-mono"> / {targetCount.toLocaleString('en-IN')} Voices</span>
                </div>
                <div className="text-right">
                  <span className="text-xs font-mono font-extrabold text-red-600 bg-red-50 px-2.5 py-1 rounded-lg border border-red-200">
                    {percentage}% UNLOCKED
                  </span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden p-0.5 shadow-inner">
                <div
                  className="h-full rounded-full transition-all duration-700 bg-gradient-to-r from-amber-500 via-red-600 to-green-600"
                  style={{ width: `${percentage}%` }}
                />
              </div>

              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>
                  {isComplete ? (
                    <strong className="text-green-600 font-bold">✨ 2,026 / 2,026 GOAL REACHED!</strong>
                  ) : (
                    <>
                      <strong className="text-red-600 font-bold">{remaining.toLocaleString('en-IN')}</strong> more voices needed
                    </>
                  )}
                </span>
                <span className="font-semibold text-gray-700">Target: 2,026 Voices</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <button
                onClick={onOpenModal}
                className="btn-rrmi text-base py-4 px-8 rounded-xl font-bold flex items-center justify-center gap-3 shadow-lg hover:shadow-red-200 transition transform active:scale-98 cursor-pointer"
              >
                <Flame className="w-5 h-5 text-white animate-pulse" />
                <span>ADD MY VOICE & LIGHT UP NODE</span>
              </button>

              {/* Instant 2,026 Unlock Test Trigger */}
              <button
                onClick={onTriggerCinematic}
                className="px-5 py-4 rounded-xl border-2 border-amber-500/80 bg-amber-50 hover:bg-amber-100 text-amber-900 font-bold text-xs flex items-center justify-center gap-2 transition cursor-pointer shadow-xs"
                title="Preview the 2026 unlock sequence with Ashoka Chakra"
              >
                <Sparkles className="w-4 h-4 text-amber-600 animate-spin-slow" />
                <span>{isComplete ? 'OPEN ASHOKA CHAKRA UNLOCK' : 'PREVIEW 2026 UNLOCK'}</span>
              </button>
            </div>

            {/* Micro Badges */}
            <div className="flex flex-wrap items-center gap-6 pt-2 text-xs text-gray-500">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-green-600" />
                <span>Verified Participation</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>States glow brighter as more voices join</span>
              </div>
            </div>

          </div>

          {/* RIGHT PANEL: Dynamic Tricolor India Map with Glowing Nodes & 2026 Center Ashoka Chakra */}
          <div className="lg:col-span-7 flex flex-col items-center justify-center order-1 lg:order-2">

            <div className="relative w-full max-w-[540px] bg-white rounded-3xl p-3 sm:p-5 border border-gray-200/80 shadow-xl overflow-hidden group">

              {/* Map Header Status */}
              <div className="flex items-center justify-between px-2 pb-3 border-b border-gray-100">
                <div className="flex items-center gap-2 text-xs font-bold text-gray-800">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-600" />
                  </span>
                  <span>LIVE VOICE MAP OF INDIA</span>
                </div>
                <div className="flex items-center gap-3 text-[11px] text-gray-500 font-medium">
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-orange-500" /> North
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-slate-300 border border-gray-400" /> Central
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-green-600" /> South
                  </span>
                </div>
              </div>

              {/* Interactive Map Box (Aspect Ratio 620/700) */}
              <div className="relative w-full overflow-hidden" style={{ aspectRatio: '620/700' }}>

                {/* Base Map Image with Dynamic Glow/Bloom */}
                <img
                  src="/india-map.png"
                  alt="India Map"
                  className="absolute inset-0 w-full h-full object-contain pointer-events-none transition-all duration-1000"
                  style={{
                    filter: isComplete
                      ? 'brightness(1.18) saturate(1.8) drop-shadow(0 0 20px rgba(245,158,11,0.4))'
                      : 'brightness(0.96) saturate(1.0)',
                  }}
                />

                {/* FULL MAP TRICOLOR BLOOM (When 2,026 is reached) */}
                {isComplete && (
                  <div className="absolute inset-0 pointer-events-none mix-blend-overlay transition-opacity duration-1000 opacity-80">
                    <div className="absolute top-0 inset-x-0 h-1/3 bg-gradient-to-b from-orange-500/40 via-amber-400/20 to-transparent" />
                    <div className="absolute top-1/3 inset-x-0 h-1/3 bg-gradient-to-b from-white/30 via-white/10 to-transparent" />
                    <div className="absolute bottom-0 inset-x-0 h-1/3 bg-gradient-to-t from-green-600/40 via-emerald-400/20 to-transparent" />
                  </div>
                )}

                {/* SVG Overlay: 36 State Beacons & Center Ashoka Chakra */}
                <svg
                  viewBox={INDIA_VIEWBOX}
                  className="absolute inset-0 w-full h-full overflow-visible"
                  style={{ pointerEvents: 'auto' }}
                >
                  {/* PASS 1: Regional Glows behind nodes */}
                  <g className="map-glows">
                    {statesData.map((st) => {
                      const zone = getStateZoneColor(st.nodePos.y);
                      const isHovered = hoveredState === st.id;
                      const wasJustClicked = justClickedState === st.id;
                      const intensity = Math.min(1, Math.log((st.voices || 0) + 1) / Math.log(maxVoices + 1));
                      const glowRadius = isComplete ? 32 : wasJustClicked ? 45 : isHovered ? 30 : 12 + intensity * 16;

                      return (
                        <circle
                          key={`glow-${st.id}`}
                          cx={st.nodePos.x}
                          cy={st.nodePos.y}
                          r={glowRadius}
                          fill={`rgba(${zone.rgb}, ${isComplete ? 0.35 : wasJustClicked ? 0.6 : isHovered ? 0.4 : 0.15})`}
                          style={{
                            filter: 'blur(6px)',
                            transition: 'all 0.3s ease-out',
                          }}
                        />
                      );
                    })}
                  </g>

                  {/* PASS 2: State Labels */}
                  <g className="map-labels">
                    {statesData.map((st) => {
                      const isHovered = hoveredState === st.id;
                      const isLarge = st.voices >= 60 || isHovered;
                      if (!isLarge && st.nodePos.y < 100) return null;

                      return (
                        <text
                          key={`label-${st.id}`}
                          x={st.nodePos.x}
                          y={st.nodePos.y - 7}
                          textAnchor="middle"
                          fontSize={isHovered ? '11' : '8.5'}
                          fontWeight={isHovered ? '900' : '700'}
                          fill="#1e293b"
                          stroke="#ffffff"
                          strokeWidth={isHovered ? '3' : '2'}
                          paintOrder="stroke"
                          className="pointer-events-none select-none transition-all duration-200"
                        >
                          {stateLabel(st.name)}
                        </text>
                      );
                    })}
                  </g>

                  {/* PASS 3: Glowing Beacon Dots & Click Targets */}
                  <g className="map-beacons">
                    {statesData.map((st) => {
                      const zone = getStateZoneColor(st.nodePos.y);
                      const isHovered = hoveredState === st.id;
                      const wasJustClicked = justClickedState === st.id;
                      const intensity = Math.min(1, Math.log((st.voices || 0) + 1) / Math.log(maxVoices + 1));
                      const outerRadius = isComplete ? 7.5 : wasJustClicked ? 12 : isHovered ? 9 : 3.5 + intensity * 4.5;
                      const coreRadius = isComplete ? 3.5 : isHovered ? 3.8 : 2.2;

                      return (
                        <g
                          key={`beacon-${st.id}`}
                          className="cursor-pointer group/node"
                          onMouseEnter={() => setHoveredState(st.id)}
                          onMouseLeave={() => setHoveredState(null)}
                          onClick={() => handleStateClick(st)}
                        >
                          {/* Invisible Large Hit Target */}
                          <circle
                            cx={st.nodePos.x}
                            cy={st.nodePos.y}
                            r="12"
                            fill="transparent"
                          />

                          {/* Outer Beacon Ring */}
                          <circle
                            cx={st.nodePos.x}
                            cy={st.nodePos.y}
                            r={outerRadius}
                            fill={zone.hex}
                            fillOpacity={isComplete ? 0.75 : wasJustClicked ? 0.9 : isHovered ? 0.8 : 0.45}
                            stroke={zone.ring}
                            strokeWidth={isHovered ? '1.8' : '1.2'}
                            className="transition-all duration-300"
                          />

                          {/* Inner Core Bright Dot */}
                          <circle
                            cx={st.nodePos.x}
                            cy={st.nodePos.y}
                            r={coreRadius}
                            fill={zone.coreBright}
                            stroke="#ffffff"
                            strokeWidth="0.6"
                          />

                          {/* Animated Ripple for active states */}
                          {(wasJustClicked || isHovered || isComplete) && (
                            <circle
                              cx={st.nodePos.x}
                              cy={st.nodePos.y}
                              r={outerRadius + 8}
                              fill="none"
                              stroke={zone.hex}
                              strokeWidth="1.2"
                              className="animate-ping opacity-60"
                            />
                          )}
                        </g>
                      );
                    })}
                  </g>

                  {/* ═══════════════════════════════════════════════════════════════════
                      CENTER ASHOKA CHAKRA (Appears in Center of India at x:270, y:300)
                      Clicking this launches the full Ashoka Chakra Cinematic Unlock!
                     ═══════════════════════════════════════════════════════════════════ */}
                  <g
                    className="cursor-pointer group/chakra transition-all duration-500"
                    onClick={onTriggerCinematic}
                  >
                    {/* Pulsing Energy Glow behind Chakra */}
                    <circle
                      cx="270"
                      cy="300"
                      r={isComplete ? "48" : "36"}
                      fill="rgba(59, 130, 246, 0.18)"
                      style={{ filter: 'blur(12px)' }}
                      className="animate-pulse"
                    />

                    {/* Rotating Chakra Body */}
                    <g
                      style={{
                        transformOrigin: '270px 300px',
                        animation: isComplete ? 'spinSmooth 4s linear infinite' : 'spinSmooth 10s linear infinite',
                      }}
                    >
                      {/* Outer Rim */}
                      <circle
                        cx="270"
                        cy="300"
                        r={isComplete ? "34" : "26"}
                        fill="#ffffff"
                        stroke="#1e3a8a"
                        strokeWidth={isComplete ? "2.6" : "2"}
                        className="shadow-lg"
                      />
                      {/* Inner Hub */}
                      <circle
                        cx="270"
                        cy="300"
                        r={isComplete ? "6.5" : "5"}
                        fill="#1e3a8a"
                      />

                      {/* 24 Spokes */}
                      {spokes.map((angle) => (
                        <line
                          key={`center-spoke-${angle}`}
                          x1="270"
                          y1="300"
                          x2={270 + (isComplete ? 28 : 21) * Math.cos((angle * Math.PI) / 180)}
                          y2={300 + (isComplete ? 28 : 21) * Math.sin((angle * Math.PI) / 180)}
                          stroke="#1e3a8a"
                          strokeWidth={isComplete ? "1.4" : "1.1"}
                          strokeLinecap="round"
                        />
                      ))}
                    </g>

                    {/* Interactive Click Banner over Chakra */}
                    <g className="cursor-pointer select-none">
                      <rect
                        x="170"
                        y="342"
                        width="200"
                        height="24"
                        rx="12"
                        fill="#1e3a8a"
                        className="group-hover/chakra:fill-red-600 transition shadow-lg"
                      />
                      <text
                        x="270"
                        y="358"
                        textAnchor="middle"
                        fontSize="9.5"
                        fontWeight="900"
                        fill="#ffffff"
                        letterSpacing="0.5"
                      >
                        {isComplete ? '☸ CLICK TO UNLOCK 2026' : '☸ CLICK TO UNLOCK'}
                      </text>
                    </g>
                  </g>
                </svg>

                {/* State Hover Card Float */}
                {hoveredState && (
                  <div
                    className="absolute top-4 left-4 bg-gray-900/95 text-white px-3 py-2 rounded-xl shadow-xl text-xs z-40 border border-gray-700 pointer-events-none animate-fadeIn"
                  >
                    {(() => {
                      const st = statesData.find(s => s.id === hoveredState);
                      if (!st) return null;
                      const zone = getStateZoneColor(st.nodePos.y);
                      return (
                        <>
                          <div className="font-bold flex items-center gap-1.5">
                            <span className={`w-2 h-2 rounded-full ${zone.badge}`} />
                            <span>{st.name}</span>
                          </div>
                          <div className="text-gray-300 text-[11px] mt-0.5">
                            <strong className="text-amber-400 font-mono">{st.voices || 0}</strong> citizen voices joined
                          </div>
                          <div className="text-[10px] text-gray-400 italic mt-1 max-w-[180px]">
                            "{st.quote}"
                          </div>
                        </>
                      );
                    })()}
                  </div>
                )}

              </div>

              {/* Bottom Map Instruction */}
              <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
                <span>💡 Click any state dot to light it up</span>
                <span className="font-semibold text-blue-900">Click Ashoka Chakra ➔ Unlock</span>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
