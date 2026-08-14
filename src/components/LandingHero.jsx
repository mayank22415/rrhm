import React from 'react';
import { Flame, ShieldCheck, Sparkles, Users, CheckCircle2 } from 'lucide-react';

export default function LandingHero({
  voiceCount,
  targetCount = 2026,
  onOpenModal,
  isUnlocked,
}) {
  const percentage = Math.min(100, Math.round((voiceCount / targetCount) * 100));
  const remaining = Math.max(0, targetCount - voiceCount);

  // 24 spokes for Ashoka Chakra
  const spokes = Array.from({ length: 24 }, (_, i) => i * 15);

  // Circular progress math
  const RADIUS = 46;
  const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
  const strokeDashoffset = CIRCUMFERENCE - (CIRCUMFERENCE * percentage) / 100;

  return (
    <section
      id="hero"
      className="relative min-h-[calc(100vh-4rem)] flex flex-col justify-center overflow-hidden bg-white border-b border-gray-100 py-12 lg:py-16"
    >
      {/* Subtle ambient tricolor background glows */}
      <div
        className="absolute top-0 right-1/4 w-[500px] h-[500px] pointer-events-none rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(254,215,170,0.25) 0%, transparent 70%)',
          filter: 'blur(70px)',
        }}
      />
      <div
        className="absolute bottom-0 right-10 w-[450px] h-[450px] pointer-events-none rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(187,247,208,0.2) 0%, transparent 70%)',
          filter: 'blur(70px)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

          {/* LEFT COLUMN: Movement Pitch & Action */}
          <div className="lg:col-span-7 space-y-6 text-gray-900">

            {/* Live Campaign Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-red-50 border border-red-200 text-red-700 shadow-xs">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600" />
              </span>
              RESERVATION REFORM MOVEMENT INDIA
            </div>

            {/* Main Headline */}
            <div className="space-y-2">
              <div className="text-xs font-mono font-bold tracking-[0.25em] text-red-600 uppercase">
                THE NATIONWIDE LAUNCH CAMPAIGN
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.08] text-gray-900">
                THE NEXT INDIA <br />
                <span className="text-red-600">RRMI website launch</span>
              </h1>
            </div>

            {/* Subheading */}
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed max-w-2xl">
              Uniting <strong className="text-gray-900 font-bold">2,026 verified citizens</strong> across every state and union territory. 
              The moment the 2,026th voice joins, the completed India map illuminates and the full constitutional manifesto goes live nationwide.
            </p>

            {/* Voice Progress Block */}
            <div className="bg-gray-50 border border-gray-200 rounded-2xl p-5 sm:p-6 space-y-4 shadow-xs max-w-xl">
              <div className="flex items-baseline justify-between">
                <div>
                  <span className="text-3xl sm:text-4xl font-mono font-black text-gray-900">
                    {voiceCount.toLocaleString('en-IN')}
                  </span>
                  <span className="text-gray-400 text-lg font-mono"> / {targetCount.toLocaleString('en-IN')}</span>
                  <span className="ml-2 text-xs font-bold uppercase tracking-wider text-gray-500">Voices Joined</span>
                </div>
                <div className="text-right">
                  <span className="text-xs font-mono font-extrabold text-red-600 bg-red-50 px-2.5 py-1 rounded-lg border border-red-200">
                    {percentage}% BUFFERED
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
                  <strong className="text-red-600 font-bold">{remaining.toLocaleString('en-IN')}</strong> more voices needed to unlock
                </span>
                <span className="font-semibold text-gray-700">Target: 2,026 Voices</span>
              </div>
            </div>

            {/* CTA Button */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                onClick={onOpenModal}
                className="btn-rrmi text-base py-4 px-8 rounded-xl font-bold flex items-center justify-center gap-3 shadow-lg hover:shadow-red-200 transition transform active:scale-98 cursor-pointer"
              >
                <Flame className="w-5 h-5 text-white animate-pulse" />
                <span>ADD MY VOICE & LIGHT UP NODE</span>
              </button>

              <a
                href="#manifesto-reader"
                className="px-6 py-4 rounded-xl border border-gray-300 hover:border-gray-400 text-gray-700 hover:text-gray-900 font-semibold text-sm text-center transition bg-white shadow-xs"
              >
                Explore Manifesto Pillars ↓
              </a>
            </div>

            {/* Micro badges */}
            <div className="flex flex-wrap items-center gap-6 pt-2 text-xs text-gray-500">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-green-600" />
                <span>100% Verified Participation</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>Map lights up at 2,026</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Users className="w-4 h-4 text-blue-600" />
                <span>36 States & UTs</span>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: Mesmerizing Rotating Ashoka Chakra Buffering Wheel */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">

            <div className="relative flex items-center justify-center w-72 h-72 sm:w-96 sm:h-96">

              {/* Pulsing Ambient Background Glow */}
              <div
                className="absolute inset-4 rounded-full pointer-events-none animate-pulse"
                style={{
                  background: 'radial-gradient(circle, rgba(29,78,216,0.12) 0%, rgba(220,38,38,0.06) 50%, transparent 70%)',
                  filter: 'blur(30px)',
                }}
              />

              {/* Outer Decorative Track Ring */}
              <div className="absolute inset-0 rounded-full border border-gray-200/80 shadow-xs" />

              {/* SVG Circular Progress Ring */}
              <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
                {/* Background Ring */}
                <circle
                  cx="50"
                  cy="50"
                  r={RADIUS}
                  fill="none"
                  stroke="#f1f5f9"
                  strokeWidth="5"
                />
                {/* Dynamic Gradient Progress Stroke */}
                <circle
                  cx="50"
                  cy="50"
                  r={RADIUS}
                  fill="none"
                  stroke="url(#chakraGradient)"
                  strokeWidth="5"
                  strokeLinecap="round"
                  strokeDasharray={CIRCUMFERENCE}
                  strokeDashoffset={strokeDashoffset}
                  className="transition-all duration-700 ease-out"
                />
                <defs>
                  <linearGradient id="chakraGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#f59e0b" />
                    <stop offset="50%" stopColor="#dc2626" />
                    <stop offset="100%" stopColor="#16a34a" />
                  </linearGradient>
                </defs>
              </svg>

              {/* ROTATING ASHOKA CHAKRA (The Buffering Spinner) */}
              <div
                className="w-48 h-48 sm:w-64 sm:h-64 relative flex items-center justify-center animate-spin-slow select-none"
                style={{
                  animationDuration: isUnlocked ? '1.5s' : '8s',
                  animationTimingFunction: 'linear',
                  animationIterationCount: 'infinite',
                }}
              >
                <svg viewBox="0 0 100 100" className="w-full h-full text-blue-900 drop-shadow-sm">
                  {/* Outer Wheel Rim */}
                  <circle cx="50" cy="50" r="46" fill="none" stroke="currentColor" strokeWidth="2.8" />
                  <circle cx="50" cy="50" r="43" fill="none" stroke="currentColor" strokeWidth="0.8" strokeDasharray="1.5 1.5" />
                  
                  {/* Center Hub */}
                  <circle cx="50" cy="50" r="9" fill="#ffffff" stroke="currentColor" strokeWidth="2.4" />
                  <circle cx="50" cy="50" r="3.5" fill="currentColor" />

                  {/* 24 Exact Ashoka Chakra Spokes */}
                  {spokes.map((angle) => (
                    <line
                      key={angle}
                      x1="50"
                      y1="50"
                      x2={50 + 39 * Math.cos((angle * Math.PI) / 180)}
                      y2={50 + 39 * Math.sin((angle * Math.PI) / 180)}
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                    />
                  ))}
                </svg>
              </div>

              {/* Center Status Floating Badge */}
              <div className="absolute -bottom-4 bg-white/95 backdrop-blur-xs border border-gray-200 px-4 py-2 rounded-full shadow-md flex items-center gap-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-600" />
                </span>
                <span className="text-xs font-mono font-bold text-gray-900">
                  {isUnlocked ? 'MAP UNLOCKED 100%' : 'BUFFERING THE NEXT INDIA...'}
                </span>
              </div>

            </div>

            {/* Caption below wheel */}
            <p className="mt-8 text-xs text-gray-500 font-semibold uppercase tracking-wider text-center max-w-xs leading-relaxed">
              Ashoka Chakra Rotation • Map Lights Up at 2,026 Voices
            </p>

          </div>

        </div>
      </div>
    </section>
  );
}
