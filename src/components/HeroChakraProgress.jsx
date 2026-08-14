import React from 'react';
import { Shield, ArrowRight, Lock, Unlock, Flame, Users, CheckCircle } from 'lucide-react';

export default function HeroChakraProgress({ voiceCount, targetCount = 2026, onOpenModal, isUnlocked }) {
  const percentage = Math.min(100, Math.round((voiceCount / targetCount) * 100));
  const remaining = Math.max(0, targetCount - voiceCount);

  // ASCII progress bar
  const totalBlocks = 16;
  const filledBlocks = Math.min(totalBlocks, Math.round((voiceCount / targetCount) * totalBlocks));
  const emptyBlocks = totalBlocks - filledBlocks;
  const asciiBar = "█".repeat(filledBlocks) + "░".repeat(emptyBlocks);

  // Ashoka Chakra spokes (24)
  const spokes = Array.from({ length: 24 }, (_, i) => i * 15);

  // Circumference of progress ring
  const RADIUS = 44;
  const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
  const offset = CIRCUMFERENCE - (CIRCUMFERENCE * percentage) / 100;

  return (
    <section id="hero" className="bg-white border-b border-gray-100">
      {/* Hero Top */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">

          {/* Left: Manifesto Headline */}
          <div className="lg:col-span-7 space-y-6">

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-50 border border-red-200 text-red-600 text-xs font-bold">
              <Shield className="w-4 h-4 text-red-600" />
              <span>RESERVATION REFORM MOVEMENT INDIA (RRMI)</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 tracking-tight leading-tight">
              The Next India –{' '}
              <span className="text-red-600">A Young Citizen's Manifesto</span>
            </h1>

            <p className="text-base sm:text-lg text-gray-600 max-w-2xl leading-relaxed font-normal">
              We are uniting <strong className="text-gray-900">2,026 voices</strong> across India to pioneer constitutional equality, data-driven reforms, and time-bound socio-economic empowerment. Every citizen lighting up a node on our nationwide map moves us closer to unlocking the public charter.
            </p>

            {/* ASCII / Constitutional Progress Bar */}
            <div id="chakra-progress" className="bg-gray-50 border border-gray-200 rounded-xl p-5 space-y-3">
              <div className="flex items-center justify-between text-xs font-semibold text-gray-500 uppercase tracking-wider">
                <div className="flex items-center gap-2">
                  <Flame className="w-4 h-4 text-red-600" />
                  <span>Constitutional Progress</span>
                </div>
                <span className="text-red-600">{percentage}% Complete</span>
              </div>

              {/* Monospace ASCII bar */}
              <div className="bg-white border border-gray-200 rounded-lg p-3 flex flex-wrap items-center justify-between gap-3 font-mono shadow-inner">
                <span className="text-red-600 font-black tracking-widest text-sm sm:text-base select-none">
                  {asciiBar}
                </span>
                <span className="text-gray-900 font-extrabold text-sm">
                  <span className="text-red-600 font-mono">{voiceCount.toLocaleString()}</span>
                  <span className="text-gray-400 mx-1">/</span>
                  <span className="text-gray-700 font-mono">{targetCount.toLocaleString()}</span>
                  <span className="text-gray-500 ml-1 font-sans text-xs">Voices</span>
                </span>
              </div>

              <div className="flex items-center justify-between text-xs text-gray-400">
                {isUnlocked ? (
                  <strong className="text-green-600 flex items-center gap-1">
                    <Unlock className="w-3.5 h-3.5" /> Manifesto 100% Publicly Unlocked!
                  </strong>
                ) : (
                  <span>
                    <strong className="text-red-600">{remaining.toLocaleString()}</strong> more voices needed to unlock manifesto
                  </span>
                )}
                <span className="font-medium">Goal: 2,026 Voices</span>
              </div>
            </div>

            {/* Value Props (matching reference) */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-red-600" />
                <span className="font-medium">Equal Opportunity For Every Citizen</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-red-600" />
                <span className="font-medium">Social Justice For All</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-red-600" />
                <span className="font-medium">Transparent & Accountable</span>
              </div>
            </div>

            {/* CTA Buttons (matching reference style) */}
            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={onOpenModal}
                className="btn-rrmi text-base px-6 py-3 rounded-lg shadow-md hover:shadow-red-200"
              >
                <Flame className="w-5 h-5 text-white" />
                Join the Movement
              </button>
              <a
                href="#manifesto-reader"
                className="btn-outline text-base px-6 py-3 rounded-lg"
              >
                Learn More
              </a>
            </div>

          </div>

          {/* Right: Ashoka Chakra Progress Wheel */}
          <div className="lg:col-span-5 flex flex-col items-center">

            <div className="relative w-64 h-64 sm:w-80 sm:h-80">
              {/* Outer energy ring */}
              <div className="absolute inset-0 rounded-full bg-red-50 border-2 border-red-100" />

              {/* SVG Progress Ring */}
              <svg className="absolute inset-0 w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                {/* Track */}
                <circle
                  cx="50" cy="50" r={RADIUS}
                  className="progress-ring-track"
                  strokeWidth="6"
                />
                {/* Fill */}
                <circle
                  cx="50" cy="50" r={RADIUS}
                  className="progress-ring-fill"
                  strokeWidth="6"
                  strokeDasharray={CIRCUMFERENCE}
                  strokeDashoffset={offset}
                  stroke="#dc2626"
                />
              </svg>

              {/* Center Ashoka Chakra */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div
                  className={`w-40 h-40 sm:w-52 sm:h-52 relative flex items-center justify-center ${
                    isUnlocked ? 'animate-chakra-fast' : 'animate-chakra-spin'
                  }`}
                >
                  <svg viewBox="0 0 100 100" className="w-full h-full" style={{ color: '#1d4ed8' }}>
                    {/* Outer circle */}
                    <circle cx="50" cy="50" r="46" fill="none" stroke="currentColor" strokeWidth="3" />
                    {/* Hub circle */}
                    <circle cx="50" cy="50" r="9" fill="none" stroke="currentColor" strokeWidth="2.5" />
                    {/* Center dot */}
                    <circle cx="50" cy="50" r="3.5" fill="currentColor" />
                    {/* 24 spokes */}
                    {spokes.map((angle) => (
                      <line
                        key={angle}
                        x1="50" y1="50"
                        x2={50 + 37 * Math.cos((angle * Math.PI) / 180)}
                        y2={50 + 37 * Math.sin((angle * Math.PI) / 180)}
                        stroke="currentColor"
                        strokeWidth="1.5"
                      />
                    ))}
                  </svg>
                </div>

                {/* Status Badge on top of chakra */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center px-3 py-1.5 bg-white border border-gray-200 rounded-full shadow-sm">
                  <div className="text-xs font-mono font-black text-red-600 whitespace-nowrap">
                    {voiceCount.toLocaleString()} / {targetCount.toLocaleString()}
                  </div>
                  <div className="text-[9px] text-gray-500 font-semibold uppercase tracking-wider">
                    {isUnlocked ? 'UNLOCKED ✓' : 'PROGRESS'}
                  </div>
                </div>
              </div>
            </div>

            <p className="mt-4 text-xs text-gray-400 font-semibold uppercase tracking-wider text-center">
              Ashoka Chakra Progress Wheel • 2,026 Voice Goal
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
