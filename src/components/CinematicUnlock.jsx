import React, { useEffect, useState, useRef } from 'react';
import confetti from 'canvas-confetti';

const SPOKES = Array.from({ length: 24 }, (_, i) => i * 15);

// Phase durations (ms)
const PHASES = [
  { id: 0, label: 'counter',    duration: 2800  }, // 2026/2026 COMPLETE counter display
  { id: 1, label: 'blackout',   duration: 1600  }, // everything goes pure dark
  { id: 2, label: 'aura',       duration: 2600  }, // Ambient energy halo ignites
  { id: 3, label: 'chakra',     duration: 3200  }, // Ashoka Chakra appears & rotates
  { id: 4, label: 'text',       duration: 4800  }, // 2,026 Citizens Have Spoken text reveal
  { id: 5, label: 'accelerate', duration: 2400  }, // Chakra accelerates into warp speed
];

export default function CinematicUnlock({ onComplete }) {
  const [phase, setPhase] = useState(0);
  const [textLines, setTextLines] = useState([false, false, false]);
  const [counterFlash, setCounterFlash] = useState(false);
  const confettiFiredRef = useRef(false);

  // Phase sequencer
  useEffect(() => {
    let timer;
    const advance = (current) => {
      if (current >= PHASES.length - 1) {
        timer = setTimeout(onComplete, 500);
        return;
      }
      timer = setTimeout(() => {
        setPhase(current + 1);
        advance(current + 1);
      }, PHASES[current].duration);
    };
    advance(0);
    return () => clearTimeout(timer);
  }, [onComplete]);

  // Flash animation for counter
  useEffect(() => {
    if (phase !== 0) return;
    const t1 = setTimeout(() => setCounterFlash(true), 1200);
    const t2 = setTimeout(() => setCounterFlash(false), 1700);
    const t3 = setTimeout(() => setCounterFlash(true), 1900);
    return () => [t1, t2, t3].forEach(clearTimeout);
  }, [phase]);

  // Text reveal — one line during 'text' phase
  useEffect(() => {
    if (phase !== 4) return;
    const timers = [
      setTimeout(() => setTextLines([true, false, false]), 300),
      setTimeout(() => setTextLines([true, true, false]), 1200),
      setTimeout(() => setTextLines([true, true, true]), 2200),
    ];
    return () => timers.forEach(clearTimeout);
  }, [phase]);

  // Confetti burst when Chakra spins
  useEffect(() => {
    if (phase === 2 && !confettiFiredRef.current) {
      confettiFiredRef.current = true;
      setTimeout(() => {
        const colors = ['#f59e0b', '#dc2626', '#ffffff', '#16a34a', '#3b82f6'];
        confetti({ particleCount: 140, spread: 360, startVelocity: 35, origin: { x: 0.5, y: 0.45 }, colors });
        setTimeout(() => confetti({ particleCount: 90, spread: 360, origin: { x: 0.3, y: 0.4 }, colors }), 500);
        setTimeout(() => confetti({ particleCount: 90, spread: 360, origin: { x: 0.7, y: 0.4 }, colors }), 900);
      }, 700);
    }
  }, [phase]);

  const chakraVisible = phase >= 3;
  const contentFadeOut = phase === 5;

  return (
    <div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden select-none"
      style={{ background: '#000000' }}
    >

      {/* ═══ PHASE 0: 2026 / 2026 — COMPLETE counter ═══ */}
      {phase === 0 && (
        <div
          className="absolute inset-0 bg-black flex flex-col items-center justify-center"
          style={{ animation: 'fadeInCinematic 0.6s ease-in both' }}
        >
          <div className="text-center space-y-6 px-6">
            <div className="space-y-2">
              <div
                className="font-black font-mono tracking-tight leading-none"
                style={{
                  fontSize: 'clamp(3.5rem, 10vw, 7.5rem)',
                  color: counterFlash ? '#ffffff' : '#f59e0b',
                  transition: 'color 0.15s',
                  textShadow: counterFlash
                    ? '0 0 60px rgba(255,255,255,0.9), 0 0 120px rgba(255,255,255,0.4)'
                    : '0 0 40px rgba(245,158,11,0.6)',
                }}
              >
                2,026 / 2,026
              </div>
              <div
                className="text-xl sm:text-2xl font-black uppercase tracking-[0.35em]"
                style={{
                  color: counterFlash ? '#ffffff' : '#22c55e',
                  transition: 'color 0.15s',
                  animation: 'fadeInCinematic 0.5s ease-out 1.2s both',
                }}
              >
                ✓ COMPLETE
              </div>
            </div>

            <div className="w-24 h-px mx-auto" style={{ background: 'rgba(245,158,11,0.35)' }} />

            <div
              className="text-white/40 text-xs sm:text-sm uppercase tracking-[0.5em] font-bold"
              style={{ animation: 'fadeInCinematic 0.6s ease-out 0.8s both' }}
            >
              2,026 Verified Citizens Have Spoken
            </div>
          </div>
        </div>
      )}

      {/* ═══ PHASE 1: Pure Blackout ═══ */}
      {phase === 1 && (
        <div
          className="absolute inset-0 bg-black"
          style={{ animation: 'fadeInCinematic 0.8s ease-in both' }}
        />
      )}

      {/* ═══ PHASE 2+: Dark Background + Majestic Ashoka Chakra ═══ */}
      {phase >= 2 && (
        <div
          className="absolute inset-0 flex flex-col items-center justify-center"
          style={{
            animation: phase === 2 ? 'fadeInCinematic 1.5s ease-out both' : '',
            opacity: contentFadeOut ? 0 : 1,
            transition: contentFadeOut ? 'opacity 2s ease-in' : '',
          }}
        >
          {/* Ambient Energy Glow Halo (Golden Saffron & Royal Navy) */}
          <div
            className="absolute pointer-events-none rounded-full"
            style={{
              width: '650px',
              height: '650px',
              background: 'radial-gradient(circle, rgba(245,158,11,0.22) 0%, rgba(29,78,216,0.18) 45%, transparent 70%)',
              filter: 'blur(80px)',
              animation: 'pulseGlow 2.5s ease-in-out infinite alternate',
            }}
          />

          {/* Central Ashoka Chakra */}
          <div className="relative flex flex-col items-center justify-center">

            {chakraVisible && (
              <div
                className="relative z-10 w-72 h-72 sm:w-96 sm:h-96 flex items-center justify-center select-none"
                style={{
                  animation: phase >= 5
                    ? 'spinFast 0.6s linear infinite'
                    : 'spinSmooth 10s linear infinite',
                  filter: 'drop-shadow(0 0 35px rgba(59,130,246,0.75)) drop-shadow(0 0 60px rgba(245,158,11,0.4))',
                  transition: 'all 0.8s ease-out',
                }}
              >
                <svg viewBox="0 0 100 100" className="w-full h-full text-blue-400">
                  {/* Outer Rim */}
                  <circle cx="50" cy="50" r="46" fill="none" stroke="currentColor" strokeWidth="2.8" />
                  <circle cx="50" cy="50" r="43" fill="none" stroke="currentColor" strokeWidth="0.9" strokeDasharray="1.5 1.5" />
                  
                  {/* Inner Core */}
                  <circle cx="50" cy="50" r="9" fill="#000000" stroke="currentColor" strokeWidth="2.4" />
                  <circle cx="50" cy="50" r="3.5" fill="currentColor" />

                  {/* 24 Exact Spokes */}
                  {SPOKES.map((angle) => (
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
            )}

          </div>

          {/* ═══ TYPOGRAPHY MANIFESTO REVEAL (Phase 4 & 5) ═══ */}
          {phase >= 4 && (
            <div className="relative z-30 text-center px-4 max-w-2xl mx-auto space-y-3 mt-8">
              
              {/* Line 1 */}
              <div
                className="font-mono text-xs sm:text-sm font-bold uppercase tracking-[0.35em] text-amber-400"
                style={{
                  opacity: textLines[0] ? 1 : 0,
                  transform: textLines[0] ? 'translateY(0)' : 'translateY(12px)',
                  transition: 'all 0.6s ease-out',
                }}
              >
                2,026 CITIZENS HAVE SPOKEN.
              </div>

              {/* Line 2 (Big Impact Title) */}
              <div
                className="font-black tracking-tight leading-tight uppercase"
                style={{
                  fontSize: 'clamp(1.75rem, 5vw, 3.2rem)',
                  color: '#ffffff',
                  textShadow: '0 0 35px rgba(255,255,255,0.8), 0 0 70px rgba(59,130,246,0.5)',
                  opacity: textLines[1] ? 1 : 0,
                  transform: textLines[1] ? 'translateY(0)' : 'translateY(14px)',
                  transition: 'all 0.7s ease-out',
                }}
              >
                THE NEXT INDIA IS NOW LIVE
              </div>

              {/* Line 3 (Subtitle) */}
              <div
                className="text-gray-300 text-xs sm:text-base font-medium tracking-wide max-w-lg mx-auto"
                style={{
                  opacity: textLines[2] ? 1 : 0,
                  transform: textLines[2] ? 'translateY(0)' : 'translateY(10px)',
                  transition: 'all 0.6s ease-out',
                }}
              >
                Built by a movement. Opened by 2,026 voices.
              </div>
            </div>
          )}

        </div>
      )}

      {/* CSS Animation Keyframes */}
      <style>{`
        @keyframes fadeInCinematic {
          from { opacity: 0; transform: scale(0.97); }
          to   { opacity: 1; transform: scale(1); }
        }
        @keyframes pulseGlow {
          from { transform: scale(0.9); opacity: 0.7; }
          to   { transform: scale(1.15); opacity: 1; }
        }
        @keyframes spinSmooth {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes spinFast {
          from { transform: rotate(0deg); }
          to   { transform: rotate(1080deg); }
        }
      `}</style>
    </div>
  );
}
