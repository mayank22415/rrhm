import React, { useState, useRef, useMemo } from 'react';
import { INDIA_STATES, INDIA_VIEWBOX } from '../data/indiaStatesData';
import { MapPin, Flame, Eye, EyeOff, Sparkles, X } from 'lucide-react';

// Tricolor zone based on node Y position (SVG coords out of ~700 height)
// North ≤ 215 → Saffron/Red  |  215–370 → White/Silver  |  > 370 → Green
function getTricolorZone(nodeY) {
  if (nodeY <= 215) return { primary: '#dc2626', mid: '#ef4444', faint: '#fca5a5', glow: '#dc2626', isWhite: false };
  if (nodeY <= 370) return { primary: '#e5e7eb', mid: '#d1d5db', faint: '#f3f4f6', glow: '#ffffff', isWhite: true };
  return { primary: '#16a34a', mid: '#22c55e', faint: '#bbf7d0', glow: '#16a34a', isWhite: false };
}

function getStateFillOpacity(voices, isUnlocked, isHovered, isSelected) {
  if (isSelected) return 0.55;
  if (isHovered) return 0.45;
  if (voices >= 150) return 0.42;
  if (voices >= 80)  return 0.35;
  if (voices >= 40)  return 0.25;
  if (voices >= 15)  return 0.16;
  if (voices >= 5)   return 0.10;
  return 0.04;
}

function getStateFillColor(nodeY, voices, isUnlocked, isHovered, isSelected) {
  const zone = getTricolorZone(nodeY);
  if (isSelected) return zone.primary;
  if (isHovered)  return zone.mid;
  if (isUnlocked) return '#f59e0b';
  if (voices >= 80)  return zone.primary;
  if (voices >= 30)  return zone.mid;
  if (voices >= 10)  return zone.mid;
  return zone.faint;
}

function stateLabel(name) {
  const abbr = { 'Jammu & Kashmir': 'J&K', 'Himachal Pradesh': 'HP', 'Uttar Pradesh': 'UP', 'Madhya Pradesh': 'MP', 'Andhra Pradesh': 'AP', 'Arunachal Pradesh': 'AR', 'Tamil Nadu': 'TN', 'West Bengal': 'WB', 'Andaman & Nicobar': 'A&N', 'D&NH and D&D': 'D&D', 'Lakshadweep': 'LSP', 'Chandigarh': 'CH', 'Puducherry': 'PY' };
  return abbr[name] || name;
}

export default function IndiaMapGlow({ statesData, selectedState, onSelectState, onOpenModal, isUnlocked, voiceCount = 0, targetCount = 2026 }) {
  const [hoveredState, setHoveredState] = useState(null);
  const [showNodes, setShowNodes] = useState(true);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  const currentTotal = useMemo(() => statesData.reduce((a, s) => a + s.voices, 0), [statesData]);
  const percentage = Math.min(100, (voiceCount / targetCount) * 100);

  // Image filter based on voice progress
  const brightness = isUnlocked ? 1.05 : 0.88 + (percentage / 100) * 0.15;
  const saturation = isUnlocked ? 1.4 : 0.7 + (percentage / 100) * 0.5;
  const mapFilter = `brightness(${brightness.toFixed(2)}) saturate(${saturation.toFixed(2)})`;

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <section id="map-section" className="py-14 bg-gray-50 border-t border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold px-3.5 py-1.5 rounded-full border mb-3 text-red-700 bg-red-50 border-red-200">
              <Flame className="w-3.5 h-3.5 animate-pulse text-red-600" />
              LIVE NATIONWIDE VOICE MAP — INDIA
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-gray-900 tracking-tight">Every Supporter Lights Up India</h2>
            <p className="text-gray-500 text-sm mt-1 max-w-xl">
              All 28 States & 8 Union Territories. Click any state to filter supporters.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button onClick={() => setShowNodes(!showNodes)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-white border border-gray-300 text-gray-700 hover:border-red-300 hover:text-red-600 transition shadow-xs">
              {showNodes ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              {showNodes ? 'Hide Nodes' : 'Show Nodes'}
            </button>
            {selectedState && (
              <button onClick={() => onSelectState(null)}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-red-50 border border-red-200 text-red-700 hover:bg-red-100 transition shadow-xs">
                <X className="w-3 h-3" /> Clear: {selectedState}
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

          {/* MAP PANEL */}
          <div className="lg:col-span-8">
            <div
              ref={containerRef}
              className="rounded-2xl p-4 sm:p-6 relative overflow-visible bg-white border border-gray-200 shadow-sm"
              onMouseMove={handleMouseMove}
            >
              {/* Unlocked banner */}
              {isUnlocked && (
                <div className="absolute top-3 left-3 right-3 z-20 flex items-center justify-center gap-2 font-bold text-xs py-2.5 px-4 rounded-xl shadow-md text-white"
                  style={{ background: 'linear-gradient(90deg, #dc2626, #ea580c, #d97706)' }}>
                  <Sparkles className="w-4 h-4" />
                  ALL INDIA ILLUMINATED — 2,026 VOICES UNITED!
                </div>
              )}

              <div className="text-center mb-3">
                <span className="text-xs font-bold uppercase tracking-widest text-gray-400">
                  Republic of India — All States & Union Territories
                </span>
              </div>

              {/* Map container: image + SVG overlay stacked
                  Key fix: SVG uses the SAME viewBox as the map image and is sized
                  100% width & 100% height so paths align perfectly with the img. */}
              <div
                className="relative w-full"
                style={{ maxWidth: '580px', margin: '0 auto', aspectRatio: '620/700' }}
              >

                {/* Base map IMAGE — fill the aspect-ratio container */}
                <img
                  src="/india-map.png"
                  alt="Map of India"
                  className="absolute inset-0 w-full h-full select-none rounded-xl"
                  style={{
                    objectFit: 'fill',
                    filter: mapFilter,
                    transition: 'filter 1.5s ease-out',
                  }}
                  draggable="false"
                />

                {/* SVG OVERLAY — same viewBox=620×700, fills container exactly */}
                <svg
                  viewBox={INDIA_VIEWBOX}
                  className="absolute inset-0 w-full h-full"
                  onMouseLeave={() => setHoveredState(null)}
                >
                  <defs>
                    <filter id="mapStateGlowLight" x="-40%" y="-40%" width="180%" height="180%">
                      <feGaussianBlur stdDeviation="4" result="blur" />
                      <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                    </filter>
                    <filter id="nodeDotGlowLightMap" x="-100%" y="-100%" width="300%" height="300%">
                      <feGaussianBlur stdDeviation="2" result="blur" />
                      <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                    </filter>
                  </defs>

                  {/* ── PASS 1: All state paths (fills + borders) ── */}
                  {statesData.map((st) => {
                    const isHovered  = hoveredState?.id === st.id;
                    const isSelected = selectedState === st.name;
                    const zone = getTricolorZone(st.nodePos.y);
                    const fillColor  = getStateFillColor(st.nodePos.y, st.voices, isUnlocked, isHovered, isSelected);
                    const fillOpacity = getStateFillOpacity(st.voices, isUnlocked, isHovered, isSelected);
                    const strokeColor = isHovered || isSelected
                      ? fillColor
                      : zone.isWhite ? 'rgba(156,163,175,0.35)' : `rgba(${zone.primary === '#16a34a' ? '22,163,74' : '220,38,38'},0.25)`;

                    return (
                      <path
                        key={`path-${st.id}`}
                        d={st.path}
                        fill={fillColor}
                        fillOpacity={fillOpacity}
                        stroke={strokeColor}
                        strokeWidth={isHovered || isSelected ? 1.5 : 0.6}
                        style={{
                          cursor: 'pointer',
                          transition: 'fill 0.4s ease, fill-opacity 0.4s ease',
                          filter: isHovered ? 'url(#mapStateGlowLight)' : isSelected ? 'url(#mapStateGlowLight)' : 'none',
                        }}
                        onMouseEnter={() => setHoveredState(st)}
                        onMouseLeave={() => setHoveredState(null)}
                        onClick={() => onSelectState(selectedState === st.name ? null : st.name)}
                      />
                    );
                  })}

                  {/* ── PASS 2: State labels (above paths, below dots) ── */}
                  {statesData.map((st) => {
                    const isHovered  = hoveredState?.id === st.id;
                    const isSelected = selectedState === st.name;
                    const zone = getTricolorZone(st.nodePos.y);
                    if (st.voices < 22) return null;
                    return (
                      <text key={`lbl-${st.id}`}
                        x={st.nodePos.x} y={st.nodePos.y + 16}
                        textAnchor="middle"
                        fill={isSelected || isHovered ? zone.primary : '#374151'}
                        fontSize={st.voices >= 80 ? 8 : 7}
                        fontWeight="800"
                        fontFamily="Inter, sans-serif"
                        pointerEvents="none"
                        style={{ userSelect: 'none' }}
                      >
                        {stateLabel(st.name)}
                      </text>
                    );
                  })}

                  {/* ── PASS 3: ALL dots rendered last — ALWAYS on top of every path ──
                      Every single state/UT gets a visible, clickable dot here. */}
                  {showNodes && statesData.map((st) => {
                    const isHovered  = hoveredState?.id === st.id;
                    const isSelected = selectedState === st.name;
                    const zone = getTricolorZone(st.nodePos.y);
                    const dotColor = isUnlocked ? '#f59e0b' : (zone.isWhite ? '#d1d5db' : zone.primary);
                    const ringColor = isUnlocked ? '#f59e0b' : zone.mid;

                    return (
                      <g
                        key={`dot-${st.id}`}
                        transform={`translate(${st.nodePos.x}, ${st.nodePos.y})`}
                        onMouseEnter={() => setHoveredState(st)}
                        onMouseLeave={() => setHoveredState(null)}
                        onClick={() => onSelectState(selectedState === st.name ? null : st.name)}
                        style={{ cursor: 'pointer' }}
                        filter="url(#nodeDotGlowLightMap)"
                      >
                        {/* Large invisible hit target — all 36 states easily clickable */}
                        <circle r="10" fill="transparent" />
                        {/* Pulse ring */}
                        <circle r="6"
                          fill={isUnlocked ? '#d97706' : zone.primary}
                          opacity="0.18"
                          style={{ animation: 'ping 2.2s cubic-bezier(0,0,0.2,1) infinite', transformOrigin: 'center' }}
                        />
                        {/* Outer ring */}
                        <circle r="4" fill="none"
                          stroke={ringColor}
                          strokeWidth="1.2"
                          opacity={isHovered || isSelected ? 1 : 0.8}
                        />
                        {/* Main solid dot */}
                        <circle r="2.7"
                          fill={isSelected ? '#ffffff' : dotColor}
                          stroke={zone.isWhite ? '#9ca3af' : zone.primary}
                          strokeWidth="0.8"
                          opacity={isHovered || isSelected ? 1 : 0.95}
                        />
                        {/* Bright white core pip */}
                        <circle r="1.1" fill="#ffffff" opacity="0.98" />
                      </g>
                    );
                  })}
                </svg>

                {/* Floating Tooltip */}
                {hoveredState && (
                  <div
                    className="map-tooltip absolute z-30 pointer-events-none rounded-xl p-3 bg-white border border-gray-200 shadow-xl"
                    style={{
                      left: Math.min(mousePos.x + 15, (containerRef.current?.clientWidth || 500) - 210),
                      top: Math.max(mousePos.y - 90, 10),
                      minWidth: '195px',
                    }}
                  >
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="font-bold text-gray-900 text-sm flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-red-600 flex-shrink-0" />
                        {hoveredState.name}
                      </span>
                      <span className="font-mono font-black text-xs px-2 py-0.5 rounded-full text-red-600 bg-red-50 border border-red-100">
                        {hoveredState.voices} voices
                      </span>
                    </div>
                    <div className="text-[11px] text-gray-500 mb-1.5">
                      🏛 {hoveredState.capital} · {hoveredState.zone}
                    </div>
                    <p className="text-[11px] text-gray-700 italic border-t border-gray-100 pt-1.5 leading-snug">
                      "{hoveredState.quote}"
                    </p>
                    <div className="mt-1.5 text-[10px] text-red-600 font-bold">Click to filter supporters ↓</div>
                  </div>
                )}
              </div>

              {/* Legend */}
              <div className="mt-4 flex flex-wrap items-center justify-between text-xs border-t border-gray-100 pt-3 gap-3 text-gray-500">
                <div className="flex flex-wrap items-center gap-4">
                  {[
                    { color: 'rgba(220,38,38,0.5)',   border: '#dc2626', label: 'North — Saffron' },
                    { color: 'rgba(229,231,235,0.7)', border: '#9ca3af', label: 'Central — White' },
                    { color: 'rgba(22,163,74,0.5)',   border: '#16a34a', label: 'South — Green' },
                  ].map(l => (
                    <span key={l.label} className="flex items-center gap-1.5">
                      <span className="w-3 h-3 rounded-sm flex-shrink-0" style={{ background: l.color, border: `1.5px solid ${l.border}` }} />
                      {l.label}
                    </span>
                  ))}
                </div>
                <span className="font-mono text-gray-500 font-semibold">
                  {statesData.length} States & UTs · {currentTotal.toLocaleString()} voices
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT: State Leaderboard */}
          <div className="lg:col-span-4">
            <div className="rounded-2xl p-5 bg-white border border-gray-200 shadow-sm">
              <div className="flex items-center justify-between border-b border-gray-100 pb-3 mb-3">
                <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                  <Flame className="w-4 h-4 text-red-600" /> State Participation
                </h3>
                <span className="text-xs font-mono text-gray-500 font-bold">
                  {currentTotal.toLocaleString()} voices
                </span>
              </div>

              <div className="space-y-2 max-h-[420px] overflow-y-auto pr-1">
                {statesData.slice().sort((a, b) => b.voices - a.voices).map((st, idx) => {
                  const isSelected = selectedState === st.name;
                  const pct = Math.min(100, (st.voices / Math.max(...statesData.map(s => s.voices))) * 100);
                  return (
                    <div key={st.id}
                      onClick={() => onSelectState(isSelected ? null : st.name)}
                      className={`p-2.5 rounded-xl cursor-pointer transition border ${
                        isSelected
                          ? 'bg-red-50 border-red-300 shadow-xs'
                          : 'bg-gray-50 border-gray-200/80 hover:bg-red-50/50 hover:border-red-200'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2 min-w-0">
                          <span className="text-[10px] font-mono font-bold w-5 flex-shrink-0 text-gray-400">#{idx + 1}</span>
                          <div className="min-w-0">
                            <div className="text-xs font-bold text-gray-900 truncate flex items-center gap-1">
                              {st.name}
                              {idx < 3 && <span className="text-[9px] font-bold px-1 rounded flex-shrink-0 text-amber-700 bg-amber-100">TOP</span>}
                            </div>
                            <div className="text-[10px] text-gray-500 truncate">{st.capital}</div>
                          </div>
                        </div>
                        <div className="flex-shrink-0 text-right">
                          <div className="text-xs font-extrabold font-mono text-red-600">{st.voices}</div>
                          <div className="w-14 h-1.5 rounded-full overflow-hidden mt-1 bg-gray-200">
                            <div className="bg-red-500 h-full rounded-full" style={{ width: `${pct}%`, transition: 'width 0.7s' }} />
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <button onClick={onOpenModal}
                className="btn-rrmi w-full justify-center mt-4 text-xs py-3 rounded-xl">
                <Sparkles className="w-3.5 h-3.5" />
                Light Up My State Node
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
