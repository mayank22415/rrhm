import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Trophy, Unlock, Download, BookOpen, X, ShieldCheck, ArrowRight, Sparkles } from 'lucide-react';
import { exportManifestoToPDF } from '../utils/pdfExport';

export default function MilestoneCelebrationModal({ isOpen, onClose, onReadManifesto }) {
  useEffect(() => {
    if (isOpen) {
      const duration = 4000;
      const end = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 100 };
      const interval = setInterval(() => {
        const timeLeft = end - Date.now();
        if (timeLeft <= 0) return clearInterval(interval);
        const count = 50 * (timeLeft / duration);
        confetti({ ...defaults, particleCount: count, origin: { x: 0.2, y: 0.5 }, colors: ['#dc2626', '#f59e0b', '#1d4ed8', '#ffffff'] });
        confetti({ ...defaults, particleCount: count, origin: { x: 0.8, y: 0.5 }, colors: ['#dc2626', '#f59e0b', '#1d4ed8', '#ffffff'] });
      }, 250);
      return () => clearInterval(interval);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const spokes = Array.from({ length: 24 }, (_, i) => i * 15);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-white/80 backdrop-blur-md">
      <div className="relative w-full max-w-xl bg-white rounded-3xl border-2 border-red-600 p-8 text-center shadow-2xl">

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 rounded-full bg-gray-100 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Trophy Tag */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-50 border border-red-200 text-red-600 text-xs font-bold uppercase tracking-wider mb-6">
          <Trophy className="w-4 h-4 animate-bounce" />
          HISTORIC 2,026 VOICES MILESTONE ACHIEVED!
        </div>

        {/* Rotating Golden Ashoka Chakra */}
        <div className="flex justify-center mb-6">
          <div className="relative w-32 h-32 flex items-center justify-center">
            <div className="absolute inset-0 rounded-full bg-amber-50 border-4 border-amber-200 animate-pulse" />
            <div className="w-28 h-28 relative animate-chakra-fast">
              <svg viewBox="0 0 100 100" className="w-full h-full" style={{ color: '#d97706' }}>
                <circle cx="50" cy="50" r="46" fill="none" stroke="currentColor" strokeWidth="3" />
                <circle cx="50" cy="50" r="9" fill="none" stroke="currentColor" strokeWidth="2.5" />
                <circle cx="50" cy="50" r="3.5" fill="currentColor" />
                {spokes.map((angle) => (
                  <line key={angle} x1="50" y1="50"
                    x2={50 + 37 * Math.cos((angle * Math.PI) / 180)}
                    y2={50 + 37 * Math.sin((angle * Math.PI) / 180)}
                    stroke="currentColor" strokeWidth="1.5"
                  />
                ))}
              </svg>
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Unlock className="w-8 h-8 text-white drop-shadow-lg" />
            </div>
          </div>
        </div>

        <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-3 leading-tight">
          The Next India Manifesto<br />
          is Now <span className="text-red-600">Publicly Unlocked!</span>
        </h2>

        <p className="text-gray-600 text-sm sm:text-base max-w-lg mx-auto leading-relaxed mb-8">
          With <strong>2,026 verified young citizens</strong> united across all Indian states, our vision for equal opportunity and data-driven reservation reform is officially inaugurated into the public domain.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => { onClose(); onReadManifesto(); }}
            className="btn-rrmi w-full sm:w-auto px-6 py-3 rounded-xl text-base justify-center"
          >
            <BookOpen className="w-4 h-4" />
            Read Manifesto Charter
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={exportManifestoToPDF}
            className="btn-outline w-full sm:w-auto px-6 py-3 rounded-xl text-base flex items-center justify-center gap-2"
          >
            <Download className="w-4 h-4 text-red-600" />
            Download Official PDF
          </button>
        </div>

        <div className="mt-6 flex items-center justify-center gap-1 text-xs text-gray-400">
          <ShieldCheck className="w-3.5 h-3.5 text-green-500" />
          Endorsed by Reservation Reform Movement India (RRMI)
        </div>
      </div>
    </div>
  );
}
