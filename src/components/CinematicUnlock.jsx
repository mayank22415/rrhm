import React, { useEffect, useState, useRef } from 'react';
import confetti from 'canvas-confetti';

const SPOKES = Array.from({ length: 24 }, (_, i) => i * 15);

// Phase durations (ms)
const PHASES = [
  { id: 0, label: 'counter',    duration: 3000  }, // 2026/2026 COMPLETE counter display
  { id: 1, label: 'blackout',   duration: 1800  }, // everything goes dark
  { id: 2, label: 'bloom',      duration: 3200  }, // tricolor map illuminates
  { id: 3, label: 'chakra',     duration: 3000  }, // chakra appears rotating slowly
  { id: 4, label: 'text',       duration: 4500  }, // text lines reveal
  { id: 5, label: 'accelerate', duration: 2500  }, // chakra spins fast + fades out
];

export default function CinematicUnlock({ onComplete }) {
  const [phase, setPhase] = useState(0);
  const [textLines, setTextLines] = useState([false, false, false, false]);
  const [counterFlash, setCounterFlash] = useState(false);
  const confettiFiredRef = useRef(false);

  // Phase sequencer
  useEffect(() => {
    let timer;
    const advance = (current) => {
      if (current >= PHASES.length - 1) {
        timer = setTimeout(onComplete, 600);
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
    const t1 = setTimeout(() => setCounterFlash(true), 1400);
    const t2 = setTimeout(() => setCounterFlash(false), 1900);
    const t3 = setTimeout(() => setCounterFlash(true), 2100);
    return () => [t1, t2, t3].forEach(clearTimeout);
  }, [phase]);

  // Text reveal — one line every 800ms during 'text' phase
  useEffect(() => {
    if (phase !== 4) return;
    const timers = [
      setTimeout(() => setTextLines([true, false, false, false]), 300),
      setTimeout(() => setTextLines([true, true, false, false]), 1000),
      setTimeout(() => setTextLines([true, true, true, false]), 2000),
      setTimeout(() => setTextLines([true, true, true, true]), 3000),
    ];
    return () => timers.forEach(clearTimeout);
  }, [phase]);

  // Confetti burst when map fully lights
  useEffect(() => {
    if (phase === 2 && !confettiFiredRef.current) {
      confettiFiredRef.current = true;
      setTimeout(() => {
        const colors = ['#f59e0b', '#dc2626', '#ffffff', '#16a34a', '#f97316'];
        confetti({ particleCount: 130, spread: 360, startVelocity: 35, origin: { x: 0.5, y: 0.5 }, colors });
        setTimeout(() => confetti({ particleCount: 80, spread: 360, origin: { x: 0.25, y: 0.4 }, colors }), 600);
        setTimeout(() => confetti({ particleCount: 80, spread: 360, origin: { x: 0.75, y: 0.4 }, colors }), 1000);
      }, 900);
    }
  }, [phase]);

  // Map tricolor filter: gradually lights up from dark → tricolor bloom
  const mapBrightness = phase >= 2 ? (phase >= 3 ? 1.9 : 1.5) : 0.05;
  const mapSaturation = phase >= 2 ? (phase >= 3 ? 2.8 : 2.2) : 0.0;
  const mapFilter = `brightness(${mapBrightness}) saturate(${mapSaturation})`;

  const chakraVisible = phase >= 3;
  const chakraSpeed = phase >= 5 ? '0.5s' : '2.6s';

  // Fade out on phase 5 (accelerate → complete)
  const contentFadeOut = phase === 5;

  return (
    <div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden"
      style={{ background: '#000000' }}
    >

      {/* ═══ PHASE 0: 2026 / 2026 — COMPLETE counter ═══ */}
      {phase === 0 && (
        <div
          className="absolute inset-0 bg-black flex flex-col items-center justify-center"
          style={{ animation: 'fadeInCinematic 0.6s ease-in both' }}
        >
          <div className="text-center space-y-6 px-6">
            {/* Progress counter */}
            <div className="space-y-2">
              <div
                className="font-black font-mono tracking-tight leading-none"
                style={{
                  fontSize: 'clamp(3.5rem, 10vw, 7rem)',
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

            {/* Thin divider */}
            <div className="w-24 h-px mx-auto" style={{ background: 'rgba(245,158,11,0.35)' }} />

            {/* Subtitle */}
            <div
              className="text-white/40 text-xs sm:text-sm uppercase tracking-[0.5em] font-bold"
              style={{ animation: 'fadeInCinematic 0.6s ease-out 0.8s both' }}
            >
              2,026 Verified Citizens Have Spoken
            </div>
          </div>
        </div>
      )}

      {/* ═══ PHASE 1: Pure blackout transition ═══ */}
      {phase === 1 && (
        <div
          className="absolute inset-0 bg-black"
          style={{ animation: 'fadeInCinematic 0.8s ease-in both' }}
        />
      )}

      {/* ═══ PHASE 2+: Tricolor map blooms ═══ */}
      {phase >= 2 && (
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{
            animation: phase === 2 ? 'fadeInCinematic 1.8s ease-out both' : '',
            opacity: contentFadeOut ? 0 : 1,
            transition: contentFadeOut ? 'opacity 2.2s ease-in' : '',
          }}
        >
          {/* Tricolor radial ambient — three stacked glows */}
          {/* Saffron/Red — top */}
          <div
            className="absolute pointer-events-none"
            style={{
              width: '90vw', height: '50vh',
              top: 0, left: '50%', transform: 'translateX(-50%)',
              background: 'radial-gradient(ellipse at 50% 0%, rgba(220,38,38,0.45) 0%, rgba(234,88,12,0.2) 40%, transparent 75%)',
              filter: 'blur(60px)',
              animation: 'bloomGlow 3s ease-out both',
            }}
          />
          {/* White — center */}
          <div
            className="absolute pointer-events-none"
            style={{
              width: '80vw', height: '40vh',
              top: '30%', left: '50%', transform: 'translateX(-50%)',
              background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0.1) 40%, transparent 75%)',
              filter: 'blur(70px)',
              animation: 'bloomGlow 3.5s ease-out 0.3s both',
            }}
          />
          {/* Green — bottom */}
          <div
            className="absolute pointer-events-none"
            style={{
              width: '90vw', height: '50vh',
              bottom: 0, left: '50%', transform: 'translateX(-50%)',
              background: 'radial-gradient(ellipse at 50% 100%, rgba(22,163,74,0.40) 0%, rgba(16,185,129,0.15) 45%, transparent 75%)',
              filter: 'blur(60px)',
              animation: 'bloomGlow 3s ease-out 0.2s both',
            }}
          />

          {/* India map image with tricolor filter effect */}
          <div className="relative flex items-center justify-center" style={{ width: '100vw', height: '100vh' }}>
            {/* Tricolor overlay blended on top of the map */}
            <div
              className="absolute pointer-events-none"
              style={{
                width: '60vw',
                maxWidth: '520px',
                height: '100vh',
                left: '50%',
                transform: 'translateX(-50%)',
                background: `linear-gradient(
                  to bottom,
                  rgba(220,38,38,0.18) 0%,
                  rgba(255,165,0,0.08) 25%,
                  rgba(255,255,255,0.20) 45%,
                  rgba(255,255,255,0.22) 55%,
                  rgba(22,163,74,0.12) 75%,
                  rgba(22,163,74,0.22) 100%
                )`,
                mixBlendMode: 'screen',
                zIndex: 2,
              }}
            />

            <img
              src="/india-map.png"
              alt="India"
              style={{
                maxHeight: '88vh',
                maxWidth: '75vw',
                objectFit: 'contain',
                filter: mapFilter,
                mixBlendMode: 'screen',
                transition: 'filter 2.2s ease-out',
                position: 'relative',
                zIndex: 1,
              }}
            />

            {/* Ashoka Chakra — centered on India (slightly upper-center) */}
            {chakraVisible && (
              <div
                className="absolute"
                style={{
                  top: '50%', left: '50%',
                  transform: 'translate(-50%, -54%)',
                  animation: 'fadeInCinematic 1s ease-out both',
                  zIndex: 3,
                }}
              >
                {/* Outer golden bloom halo */}
                <div
                  className="absolute rounded-full pointer-events-none"
                  style={{
                    width: '300px', height: '300px',
                    top: '50%', left: '50%',
                    transform: 'translate(-50%, -50%)',
                    background: 'radial-gradient(circle, rgba(245,158,11,0.3) 0%, rgba(255,255,255,0.1) 40%, transparent 70%)',
                    animation: 'pulse-bloom 2.2s ease-in-out infinite',
                  }}
                />

                {/* Chakra SVG */}
                <div
                  style={{
                    width: '140px',
                    height: '140px',
                    animation: `chakra-spin ${chakraSpeed} linear infinite`,
                    transition: 'animation-duration 0.8s ease-in',
                  }}
                >
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    <defs>
                      <filter id="chakraGlowCinematic">
                        <feGaussianBlur stdDeviation="2.5" result="blur" />
                        <feMerge>
                          <feMergeNode in="blur" />
                          <feMergeNode in="SourceGraphic" />
                        </feMerge>
                      </filter>
                    </defs>
                    {/* Outer ring */}
                    <circle cx="50" cy="50" r="46" fill="none" stroke="#f59e0b" strokeWidth="2.5" opacity="0.9"
                      filter="url(#chakraGlowCinematic)" />
                    {/* Inner hub ring */}
                    <circle cx="50" cy="50" r="10" fill="none" stroke="#f59e0b" strokeWidth="2" />
                    {/* Center dot */}
                    <circle cx="50" cy="50" r="4" fill="#f59e0b" />
                    {/* 24 Spokes — gold lit */}
                    {SPOKES.map(angle => {
                      const rad = (angle * Math.PI) / 180;
                      return (
                        <line key={angle}
                          x1={50 + 10 * Math.cos(rad)} y1={50 + 10 * Math.sin(rad)}
                          x2={50 + 38 * Math.cos(rad)} y2={50 + 38 * Math.sin(rad)}
                          stroke="#f59e0b" strokeWidth="2"
                          filter="url(#chakraGlowCinematic)"
                        />
                      );
                    })}
                  </svg>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ═══ PHASE 4: Text lines reveal ═══ */}
      {phase === 4 && (
        <div
          className="absolute inset-0 flex flex-col items-center justify-end pb-[7%] px-6 text-center pointer-events-none"
        >
          <div className="space-y-4 max-w-2xl">
            <CinematicLine visible={textLines[0]} delay={0}
              text="2,026 CITIZENS HAVE SPOKEN."
              size="text-3xl sm:text-5xl" color="text-white" weight="font-black" />
            <CinematicLine visible={textLines[1]} delay={0}
              text="THE NEXT INDIA IS NOW LIVE"
              size="text-2xl sm:text-4xl" color="text-yellow-400" weight="font-black" />
            <CinematicLine visible={textLines[2]} delay={0}
              text="Built by a movement."
              size="text-base sm:text-xl" color="text-gray-300" weight="font-semibold" />
            <CinematicLine visible={textLines[3]} delay={0}
              text="Opened by 2,026 voices."
              size="text-base sm:text-xl" color="text-gray-400" weight="font-medium" />
          </div>
        </div>
      )}

      {/* ═══ PHASE 5: Fade to white → celebration ═══ */}
      {phase === 5 && (
        <div
          className="absolute inset-0 bg-black"
          style={{ animation: 'fadeInCinematic 2.2s ease-in both' }}
        />
      )}
    </div>
  );
}

function CinematicLine({ visible, text, size, color, weight }) {
  return (
    <div
      className={`${size} ${color} ${weight} tracking-tight leading-tight transition-all duration-700 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
    >
      {text}
    </div>
  );
}
