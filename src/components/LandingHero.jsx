import React, { useState } from 'react';
import { Flame, ChevronDown, ShieldCheck, MapPin, Sparkles } from 'lucide-react';

const SVG_W = 620;
const SVG_H = 700;

// Tricolor zone: North = Saffron/Red, Middle band = White, South = Green
// This mirrors the Indian flag horizontally across the map
function getStateZoneColor(nodeY) {
  // North (top third) — Saffron / Red
  if (nodeY <= 215) {
    return {
      hex: '#ff6b35',       // saffron-red
      rgb: '255,107,53',
      glowRgb: '220,38,38', // red glow
      ring: '#dc2626',
      label: '#991b1b',
      badge: 'bg-red-600',
      name: 'North',
      coreBright: 'rgba(255,200,150,0.95)',
    };
  // Middle band — White / near-white
  } else if (nodeY <= 370) {
    return {
      hex: '#f0f0f0',       // near white
      rgb: '240,240,240',
      glowRgb: '255,255,255', // white glow
      ring: '#d1d5db',
      label: '#374151',
      badge: 'bg-gray-400',
      name: 'Central',
      coreBright: 'rgba(255,255,255,1)',
    };
  // South (bottom third) — Green
  } else {
    return {
      hex: '#16a34a',       // green
      rgb: '22,163,74',
      glowRgb: '22,163,74',
      ring: '#15803d',
      label: '#14532d',
      badge: 'bg-green-600',
      name: 'South',
      coreBright: 'rgba(150,255,180,0.95)',
    };
  }
}

// Convert voice count → intensity (0.0 to 1.0) using logarithmic scale
function getVoiceIntensity(voices, maxVoices = 215) {
  if (!voices || voices === 0) return 0;
  return Math.min(1, Math.log(voices + 1) / Math.log(maxVoices + 1));
}

export default function LandingHero({
  voiceCount,
  targetCount = 2026,
  onOpenModal,
  isUnlocked,
  statesData = [],
  onStateClicked,
}) {
  const [hoveredState, setHoveredState] = useState(null);

  const percentage = Math.min(100, (voiceCount / targetCount) * 100);
  const remaining = Math.max(0, targetCount - voiceCount);

  // Build a lookup map of stateId → voices from live statesData
  const voiceMap = {};
  statesData.forEach(st => { voiceMap[st.id] = st.voices || 0; });

  // Max voices across all states for relative scaling
  const maxVoices = Math.max(1, ...statesData.map(s => s.voices || 0));

  return (
    <section
      id="hero"
      className="relative min-h-[calc(100vh-4rem)] flex flex-col justify-between overflow-hidden bg-white border-b border-gray-100"
    >
      {/* Ambient background */}
      <div
        className="absolute top-0 right-0 w-[550px] h-[550px] pointer-events-none rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(254,226,226,0.3) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

      {/* Main grid */}
      <div className="relative z-10 flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 lg:py-14 flex flex-col lg:grid lg:grid-cols-12 gap-8 items-center">

        {/* LEFT PANEL */}
        <div className="lg:col-span-5 space-y-6 text-gray-900 order-2 lg:order-1">

          {/* Campaign badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-red-50 border border-red-200 text-red-700">
            <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
            RESERVATION REFORM MOVEMENT INDIA
          </div>

          {/* Headline */}
          <div className="space-y-1.5">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-gray-500">THE CAMPAIGN</p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-none text-gray-900">
              <span className="block text-gray-900">THE NEXT INDIA</span>
              <span
                className="block text-2xl sm:text-3xl lg:text-4xl font-extrabold text-transparent bg-clip-text mt-2"
                style={{
                  backgroundImage: 'linear-gradient(135deg, #dc2626 0%, #ea580c 50%, #d97706 100%)',
                }}
              >
                RRMI website launch
              </span>
            </h1>
          </div>

          {/* Voice counter card */}
          <div className="rounded-2xl p-5 space-y-4 bg-gray-50/80 border border-gray-200 shadow-sm">
            <div className="flex items-baseline gap-2">
              <span className="font-black font-mono tabular-nums text-gray-900" style={{ fontSize: '3rem', lineHeight: 1 }}>
                {voiceCount.toLocaleString('en-IN')}
              </span>
              <span className="text-2xl text-gray-400 font-bold">/</span>
              <span className="text-xl font-black font-mono text-gray-500">{targetCount.toLocaleString('en-IN')}</span>
              <span className="text-sm font-semibold text-gray-500 ml-1">Voices</span>
            </div>

            <div className="space-y-1.5">
              <div className="h-3 rounded-full overflow-hidden bg-gray-200/80 shadow-inner">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${percentage}%`,
                    background: 'linear-gradient(90deg, #dc2626 0%, #ea580c 55%, #f59e0b 100%)',
                    transition: 'width 1.2s cubic-bezier(0.4,0,0.2,1)',
                  }}
                />
              </div>
              <div className="flex justify-between text-xs font-semibold">
                <span className={isUnlocked ? 'text-amber-600 font-bold' : 'text-red-600 font-bold'}>
                  {isUnlocked
                    ? '🎉 THE NEXT INDIA IS NOW LIVE!'
                    : `${remaining.toLocaleString()} more voices needed`}
                </span>
                <span className="text-gray-500 font-mono">{percentage.toFixed(1)}%</span>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-2.5 flex items-center justify-between font-mono text-xs shadow-xs">
              <span className="text-red-600 font-bold tracking-widest">
                {'█'.repeat(Math.min(16, Math.round((percentage / 100) * 16)))}
                {'░'.repeat(16 - Math.min(16, Math.round((percentage / 100) * 16)))}
              </span>
              <span className="text-gray-700 font-bold ml-2 font-sans">{percentage.toFixed(1)}% UNLOCKED</span>
            </div>
          </div>

          {/* CTA */}
          <div className="space-y-3">
            <button
              onClick={onOpenModal}
              className="group relative w-full py-4 px-8 rounded-xl font-black text-lg text-white overflow-hidden flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-red-500/25 cursor-pointer transition-transform duration-200"
              style={{ background: 'linear-gradient(135deg, #dc2626 0%, #f97316 100%)' }}
            >
              <Flame className="w-5 h-5 animate-pulse flex-shrink-0" />
              ADD MY VOICE
              <span
                className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"
                style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent)' }}
              />
            </button>
            <div className="flex items-center justify-center gap-4 text-xs text-gray-500 font-medium">
              <span className="flex items-center gap-1 text-green-700">
                <ShieldCheck className="w-3.5 h-3.5 text-green-600" /> Verified Participation
              </span>
              <span>·</span>
              <span>States glow brighter as more voices join</span>
            </div>
          </div>

          {/* Value props */}
          <div className="flex flex-wrap gap-2 text-xs text-gray-700">
            {['Equal Opportunity', 'Social Justice', 'Data-Driven Reform', 'Constitutional Rights'].map(v => (
              <span key={v} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gray-100/80 border border-gray-200 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-red-600" />
                {v}
              </span>
            ))}
          </div>
        </div>

        {/* RIGHT PANEL — Dynamic India Map with Tricolor Glow */}
        <div className="lg:col-span-7 relative flex flex-col items-center justify-center order-1 lg:order-2">

          <div className="relative w-full max-w-[560px] bg-white rounded-3xl p-4 sm:p-6 shadow-sm border border-gray-200">

            {/* Map header */}
            <div className="flex items-center justify-between mb-3 text-xs">
              <span className="font-bold uppercase tracking-wider text-gray-500 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-red-600" />
                Live Voice Map of India
              </span>
              <span className="font-bold flex items-center gap-1 text-gray-700">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                {statesData.filter(s => s.voices > 0).length} states active
              </span>
            </div>

            {/* Map + SVG overlay */}
            <div className="relative w-full overflow-hidden rounded-2xl bg-slate-50 border border-gray-100">

              {/* Base India map — desaturated white/grey */}
              <img
                src="/india-map.png"
                alt="Map of India"
                className="w-full h-auto select-none block"
                style={{
                  filter: 'grayscale(100%) brightness(1.18) contrast(1.1)',
                  opacity: 0.92,
                }}
                draggable="false"
              />

              {/* Tricolor voice-density glow blobs
                  North states → Red/Saffron glow
                  Middle states → Pure White bright glow
                  South states → Green glow
                  Each blob: radial gradient from bright core → colored outer ring */}
              <div className="absolute inset-0 pointer-events-none">
                {statesData.filter(st => (voiceMap[st.id] || 0) > 0).map(st => {
                  const px = (st.nodePos.x / SVG_W) * 100;
                  const py = (st.nodePos.y / SVG_H) * 100;
                  const zone = getStateZoneColor(st.nodePos.y);
                  const intensity = getVoiceIntensity(voiceMap[st.id] || 0, maxVoices);
                  // Glow radius grows from 35px (1 voice) to 95px (max)
                  const glowSize = 35 + intensity * 70;
                  // Core white flash then zone color
                  const coreOpacity = (0.6 + intensity * 0.4).toFixed(2);
                  const midOpacity  = (0.2 + intensity * 0.55).toFixed(2);
                  const outerOpacity = (0.04 + intensity * 0.2).toFixed(2);

                  return (
                    <div
                      key={`glow-${st.id}`}
                      className="absolute rounded-full pointer-events-none"
                      style={{
                        left: `${px}%`,
                        top: `${py}%`,
                        width: `${glowSize}px`,
                        height: `${glowSize}px`,
                        transform: 'translate(-50%, -50%)',
                        // Tricolor radial: white hot core → zone color mid → transparent outer
                        background: `radial-gradient(circle,
                          rgba(255,255,255,${coreOpacity}) 0%,
                          rgba(${zone.glowRgb},${midOpacity}) 45%,
                          rgba(${zone.glowRgb},${outerOpacity}) 70%,
                          transparent 100%)`,
                        filter: `blur(${5 + intensity * 9}px)`,
                        transition: 'all 1s ease-out',
                        mixBlendMode: 'screen',
                      }}
                    />
                  );
                })}
              </div>

              {/* Interactive SVG node beacons — all 36 states always visible */}
              <svg
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                className="absolute inset-0 w-full h-full"
                onMouseLeave={() => setHoveredState(null)}
              >
                {statesData.map((st) => {
                  const px = (st.nodePos.x / SVG_W) * 100;
                  const py = (st.nodePos.y / SVG_H) * 100;
                  const voices = voiceMap[st.id] || 0;
                  const intensity = getVoiceIntensity(voices, maxVoices);
                  const isActive = voices > 0;
                  const isHovered = hoveredState?.id === st.id;
                  const zone = getStateZoneColor(st.nodePos.y);
                  const isMiddle = st.nodePos.y > 215 && st.nodePos.y <= 370;

                  // Always show a visible dot — minimum r=2.2, scales up with voices
                  const dotRadius = isHovered ? 3.5 : (isActive ? 2.2 + intensity * 1.8 : 2.2);
                  const dotColor = isActive
                    ? (isMiddle ? '#e5e7eb' : zone.hex)
                    : (isMiddle ? '#cbd5e1' : '#94a3b8');
                  const ringColor = isMiddle ? '#9ca3af' : zone.ring;
                  const dotOpacity = isHovered ? 1 : (isActive ? 0.7 + intensity * 0.3 : 0.5);

                  return (
                    <g
                      key={st.id}
                      className="cursor-pointer"
                      onMouseEnter={() => setHoveredState(st)}
                      onMouseLeave={() => setHoveredState(null)}
                      onClick={() => { if (onStateClicked) onStateClicked(st.name); }}
                    >
                      {/* Large invisible hit target — r=6 for easy clicking */}
                      <circle cx={px} cy={py} r={6} fill="transparent" />

                      {/* Outer ring — ALL states, grows with voices */}
                      <circle
                        cx={px} cy={py}
                        r={dotRadius + 1.5}
                        fill="none"
                        stroke={ringColor}
                        strokeWidth="0.6"
                        opacity={isHovered ? 1 : (isActive ? 0.4 + intensity * 0.5 : 0.3)}
                      />

                      {/* Main beacon dot */}
                      <circle
                        cx={px} cy={py}
                        r={dotRadius}
                        fill={dotColor}
                        stroke={isMiddle ? '#64748b' : '#ffffff'}
                        strokeWidth="0.6"
                        opacity={dotOpacity}
                        style={{ transition: 'all 0.6s ease-out' }}
                      />

                      {/* White core — always present */}
                      <circle cx={px} cy={py} r={0.9} fill="#ffffff" opacity="0.9" />

                      {/* Label when hovered */}
                      {isHovered && (
                        <text
                          x={px}
                          y={py - (dotRadius + 2.5)}
                          textAnchor="middle"
                          fill={isMiddle ? '#374151' : zone.label}
                          fontSize="2.6"
                          fontWeight="900"
                          fontFamily="Inter, sans-serif"
                          style={{
                            paintOrder: 'stroke',
                            stroke: '#ffffff',
                            strokeWidth: '1.2px',
                            strokeLinejoin: 'round',
                            userSelect: 'none',
                          }}
                        >
                          {st.name}
                        </text>
                      )}
                    </g>
                  );
                })}
              </svg>

              {/* Hover tooltip */}
              {hoveredState && (() => {
                const voices = voiceMap[hoveredState.id] || 0;
                const intensity = getVoiceIntensity(voices, maxVoices);
                const zone = getStateZoneColor(hoveredState.nodePos.y);
                const pct = (intensity * 100).toFixed(0);
                const isMiddle = hoveredState.nodePos.y > 215 && hoveredState.nodePos.y <= 370;

                return (
                  <div
                    className="absolute z-30 pointer-events-none rounded-xl p-3 bg-gray-950/96 text-white border border-gray-700 shadow-xl text-xs"
                    style={{
                      left: `${Math.min(Math.max((hoveredState.nodePos.x / SVG_W) * 100 - 12, 2), 62)}%`,
                      top: `${Math.max((hoveredState.nodePos.y / SVG_H) * 100 - 16, 3)}%`,
                      minWidth: '165px',
                    }}
                  >
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="font-bold text-white flex items-center gap-1">
                        <MapPin className="w-3 h-3 flex-shrink-0" style={{ color: isMiddle ? '#d1d5db' : zone.hex }} />
                        {hoveredState.name}
                      </span>
                      <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded text-white ${zone.badge}`}>
                        {zone.name}
                      </span>
                    </div>
                    <div className="text-gray-400 text-[10px] mb-1.5">
                      {hoveredState.capital}
                    </div>
                    {/* Density bar */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-[10px]">
                        <span className="text-gray-400">Voice density</span>
                        <span className="font-bold" style={{ color: isMiddle ? '#d1d5db' : zone.hex }}>
                          {voices} voice{voices !== 1 ? 's' : ''}
                        </span>
                      </div>
                      <div className="h-1.5 rounded-full bg-gray-700 overflow-hidden">
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${pct}%`,
                            background: isMiddle
                              ? 'linear-gradient(90deg, #9ca3af, #ffffff)'
                              : zone.hex,
                            transition: 'width 0.5s',
                          }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>

            {/* Tricolor Legend */}
            <div className="mt-3 pt-3 border-t border-gray-100 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[11px] text-gray-500">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-300" />
                No voices yet
              </span>
              <span className="flex items-center gap-1.5 font-semibold" style={{ color: '#dc2626' }}>
                <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: '#dc2626', opacity: 0.8 }} />
                North — Saffron
              </span>
              <span className="flex items-center gap-1.5 text-gray-600 font-semibold">
                <span className="w-2.5 h-2.5 rounded-full border border-gray-400 bg-white flex-shrink-0" />
                Central — White
              </span>
              <span className="flex items-center gap-1.5 text-green-600 font-semibold">
                <span className="w-2.5 h-2.5 rounded-full bg-green-600 opacity-80 flex-shrink-0" />
                South — Green
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="relative z-10 flex justify-center pb-6">
        <div
          className="flex flex-col items-center gap-1 cursor-pointer text-gray-500 hover:text-red-600 transition"
          onClick={() => document.getElementById('vision')?.scrollIntoView({ behavior: 'smooth' })}
        >
          <span className="text-[10px] uppercase tracking-[0.25em] font-semibold">Explore Vision & Manifesto</span>
          <ChevronDown className="w-4 h-4 animate-bounce" />
        </div>
      </div>
    </section>
  );
}
