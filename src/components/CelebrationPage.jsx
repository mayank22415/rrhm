import React, { useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { Globe, Share2, ArrowRight, Users, MapPin, Send, Sparkles } from 'lucide-react';

export default function CelebrationPage({ voiceCount, statesData = [], onEnterWebsite }) {
  const firedRef = useRef(false);

  // Burst of confetti on mount
  useEffect(() => {
    if (firedRef.current) return;
    firedRef.current = true;
    const colors = ['#f59e0b', '#dc2626', '#ffffff', '#f97316', '#1d4ed8'];
    const burst = (origin, count) =>
      confetti({ particleCount: count, spread: 360, startVelocity: 40, origin, colors, ticks: 80, zIndex: 200 });
    burst({ x: 0.5, y: 0.4 }, 150);
    setTimeout(() => burst({ x: 0.2, y: 0.5 }, 80), 500);
    setTimeout(() => burst({ x: 0.8, y: 0.5 }, 80), 800);
    setTimeout(() => burst({ x: 0.5, y: 0.6 }, 60), 1400);
  }, []);

  const statesRep = statesData.filter(s => s.voices > 0).length;
  const totalInvites = Math.floor(voiceCount * 2.4); // simulated referral invitations

  const handleShare = () => {
    const text = `2,026 citizens just unlocked THE NEXT INDIA! A historic movement for constitutional equality. Be part of what comes next.`;
    if (navigator.share) {
      navigator.share({ title: 'THE NEXT INDIA is Live!', text, url: window.location.href }).catch(() => {});
    } else {
      navigator.clipboard.writeText(`${text} ${window.location.href}`).catch(() => {});
      alert('Share message copied!');
    }
  };

  return (
    <div
      className="fixed inset-0 z-[9000] flex flex-col overflow-y-auto"
      style={{ background: 'linear-gradient(160deg, #050508 0%, #0c0c18 40%, #0a0810 100%)' }}
    >
      {/* Star bg */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 opacity-20"
          style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1px)', backgroundSize: '55px 55px' }}
        />
      </div>

      {/* Golden ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[400px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(245,158,11,0.25) 0%, transparent 70%)', filter: 'blur(80px)' }}
      />

      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 py-20 text-center">

        {/* RRMI Logo */}
        <div className="flex items-center justify-center gap-3 mb-10">
          <img src="/rrmi-logo.png" alt="RRMI" className="w-14 h-14 object-contain" style={{ filter: 'brightness(1.2)' }} />
          <div className="text-left">
            <div className="text-xs font-black text-white/60 uppercase tracking-widest leading-none">RRMI</div>
            <div className="text-xs font-bold text-yellow-500/80 tracking-wider">Reservation Reform Movement India</div>
          </div>
        </div>

        {/* Main headline */}
        <div className="max-w-3xl mx-auto space-y-4 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest mb-2"
            style={{ background: 'rgba(245,158,11,0.15)', border: '1px solid rgba(245,158,11,0.3)', color: '#fbbf24' }}>
            <Sparkles className="w-3.5 h-3.5" />
            2,026 / 2,026 — COMPLETE
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white leading-tight">
            WE DIDN'T LAUNCH
            <br />
            <span className="text-transparent bg-clip-text"
              style={{ backgroundImage: 'linear-gradient(135deg, #f59e0b 0%, #ef4444 50%, #f97316 100%)' }}>
              THIS WEBSITE.
            </span>
          </h1>

          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            2,026 CITIZENS DID.
          </h2>

          <p className="text-gray-400 text-lg sm:text-xl max-w-xl mx-auto leading-relaxed pt-2">
            The Next India is now public. A manifesto built by a movement, opened by the people.
          </p>
        </div>

        {/* Stats grid */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-2xl">
          {[
            {
              icon: <Users className="w-6 h-6" />,
              value: '2,026',
              label: 'Founding Voices',
              color: '#f59e0b',
            },
            {
              icon: <MapPin className="w-6 h-6" />,
              value: `${statesRep}`,
              label: 'States & UTs Represented',
              color: '#ef4444',
            },
            {
              icon: <Send className="w-6 h-6" />,
              value: totalInvites.toLocaleString('en-IN'),
              label: 'Invitations Shared',
              color: '#f97316',
            },
          ].map(stat => (
            <div key={stat.label}
              className="rounded-2xl p-5 text-center"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
            >
              <div className="flex justify-center mb-2" style={{ color: stat.color }}>{stat.icon}</div>
              <div className="text-3xl font-black font-mono text-white">{stat.value}</div>
              <div className="text-xs text-gray-500 font-semibold mt-1 uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Ashoka Chakra divider */}
        <div className="my-10 flex items-center gap-4 w-full max-w-lg">
          <div className="flex-1 h-px" style={{ background: 'rgba(245,158,11,0.2)' }} />
          <div style={{ animation: 'chakra-spin 12s linear infinite', color: '#f59e0b' }}>
            <svg viewBox="0 0 100 100" className="w-8 h-8">
              <circle cx="50" cy="50" r="44" fill="none" stroke="currentColor" strokeWidth="3" opacity="0.7" />
              <circle cx="50" cy="50" r="9" fill="none" stroke="currentColor" strokeWidth="2" />
              <circle cx="50" cy="50" r="3" fill="currentColor" />
              {Array.from({ length: 24 }, (_, i) => i * 15).map(a => {
                const r = (a * Math.PI) / 180;
                return <line key={a} x1={50 + 9 * Math.cos(r)} y1={50 + 9 * Math.sin(r)}
                  x2={50 + 37 * Math.cos(r)} y2={50 + 37 * Math.sin(r)} stroke="currentColor" strokeWidth="1.5" />;
              })}
            </svg>
          </div>
          <div className="flex-1 h-px" style={{ background: 'rgba(245,158,11,0.2)' }} />
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full max-w-md">
          <button
            onClick={onEnterWebsite}
            className="group relative w-full sm:flex-1 py-4 px-8 rounded-xl font-black text-white flex items-center justify-center gap-2 overflow-hidden transition-transform duration-200 hover:scale-[1.02]"
            style={{
              background: 'linear-gradient(135deg, #dc2626 0%, #f97316 100%)',
              boxShadow: '0 0 40px rgba(220,38,38,0.35), 0 6px 20px rgba(0,0,0,0.5)',
            }}
          >
            <Globe className="w-5 h-5 flex-shrink-0" />
            ENTER THE WEBSITE
            <ArrowRight className="w-4 h-4 flex-shrink-0" />
            <span className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"
              style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)' }} />
          </button>

          <button
            onClick={handleShare}
            className="w-full sm:flex-1 py-4 px-8 rounded-xl font-bold text-white flex items-center justify-center gap-2 transition-all duration-200 hover:scale-[1.02]"
            style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.15)' }}
          >
            <Share2 className="w-4 h-4" />
            SHARE THE LAUNCH
          </button>
        </div>

        {/* Sub-note */}
        <p className="mt-8 text-xs text-gray-600 max-w-sm">
          Explore the vision. Read the White Paper. Join what comes next.
        </p>
      </div>
    </div>
  );
}
