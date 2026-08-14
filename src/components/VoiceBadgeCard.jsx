import React, { useState } from 'react';
import { X, Download, Share2, Check, Copy, MapPin, Users, TrendingUp, Award } from 'lucide-react';
import { downloadBadgeAsImage } from '../utils/pdfExport';
import {
  generateReferralLink,
  getMyReferralCount,
  shareOnWhatsApp,
  shareNative,
  copyReferralLink,
} from '../utils/referral';

export default function VoiceBadgeCard({ voice, voiceCount, targetCount = 2026, onClose }) {
  const [copied, setCopied] = useState(false);

  if (!voice) return null;

  const referralLink = generateReferralLink(voice.id);
  const referralCount = getMyReferralCount(voice.id);
  const percentage = Math.min(100, ((voiceCount || voice.id) / targetCount) * 100).toFixed(1);

  const handleCopy = async () => {
    const ok = await copyReferralLink(referralLink);
    if (ok) { setCopied(true); setTimeout(() => setCopied(false), 2500); }
  };

  const handleDownload = () =>
    downloadBadgeAsImage('supporter-badge', `${voice.name.replace(/\s+/g, '-')}-Voice-${voice.id}.png`);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="relative w-full max-w-sm flex flex-col gap-3">

        {/* Close */}
        <button onClick={onClose}
          className="absolute -top-10 right-0 p-2 rounded-full text-white/70 hover:text-white bg-white/10 hover:bg-white/20 transition">
          <X className="w-4 h-4" />
        </button>

        {/* BADGE CERTIFICATE */}
        <div
          id="supporter-badge"
          className="rounded-3xl overflow-hidden bg-white border-2 border-red-600 shadow-2xl"
        >
          {/* Gold top bar */}
          <div className="h-1.5 w-full bg-gradient-to-r from-red-600 via-orange-500 to-amber-500" />

          <div className="p-6 text-center">
            {/* RRMI badge tag */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider mb-3 bg-red-50 border border-red-200 text-red-700">
              <Award className="w-3.5 h-3.5 text-red-600" /> Official Citizen Voice Certificate
            </div>

            {/* Voice number */}
            <div className="text-5xl sm:text-6xl font-black font-mono text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-orange-500 to-amber-600 mb-1">
              #{voice.id}
            </div>
            <div className="text-xs font-bold text-gray-400 tracking-widest uppercase mb-4">Verified Founding Voice</div>

            {/* Supporter info */}
            <div className="rounded-2xl p-4 text-left space-y-1.5 mb-4 bg-gray-50 border border-gray-200">
              <h4 className="text-base font-black text-gray-900 text-center">{voice.name}</h4>
              <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
                <span className="flex items-center gap-1 text-red-600 font-semibold">
                  <MapPin className="w-3 h-3" /> {voice.state}
                </span>
                <span>·</span>
                <span className="text-gray-600">{voice.profession}</span>
              </div>
              {voice.quote && (
                <p className="text-xs text-gray-600 italic text-center pt-1.5 border-t border-gray-200">
                  "{voice.quote}"
                </p>
              )}
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-2 mb-4">
              {[
                { icon: <Award className="w-4 h-4" />, val: `#${voice.id}`, label: 'Your Voice', color: '#ea580c' },
                { icon: <Users className="w-4 h-4" />, val: referralCount, label: 'Invited', color: '#16a34a' },
                { icon: <TrendingUp className="w-4 h-4" />, val: `${percentage}%`, label: 'National', color: '#dc2626' },
              ].map(s => (
                <div key={s.label} className="rounded-xl p-2 text-center bg-gray-50 border border-gray-200">
                  <div className="flex justify-center mb-0.5" style={{ color: s.color }}>{s.icon}</div>
                  <div className="text-sm font-black font-mono text-gray-900">{s.val}</div>
                  <div className="text-[9px] text-gray-500 uppercase tracking-wider font-semibold">{s.label}</div>
                </div>
              ))}
            </div>

            {/* Verified seal */}
            <div className="flex items-center justify-between text-[11px] text-gray-500 border-t border-gray-100 pt-3">
              <span className="flex items-center gap-1 text-green-700 font-semibold"><Check className="w-3.5 h-3.5 text-green-600" /> RRMI Verified</span>
              <span className="font-mono">{voice.date}</span>
            </div>
          </div>
        </div>

        {/* ACTION BUTTONS */}
        <div className="space-y-2">
          {/* WhatsApp */}
          <button onClick={() => shareOnWhatsApp(voice.id, referralLink)}
            className="w-full py-3 rounded-xl font-bold text-white flex items-center justify-center gap-2 transition hover:scale-[1.01] shadow-md"
            style={{ background: '#25D366' }}>
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Share on WhatsApp
          </button>

          <div className="grid grid-cols-3 gap-2">
            <button onClick={() => shareNative(voice.id, referralLink)}
              className="py-2.5 rounded-xl font-bold text-gray-800 bg-white hover:bg-gray-50 border border-gray-200 flex items-center justify-center gap-1.5 text-xs transition hover:scale-[1.01] shadow-xs">
              <Share2 className="w-3.5 h-3.5 text-red-600" /> Share
            </button>
            <button onClick={handleCopy}
              className={`py-2.5 rounded-xl font-bold flex items-center justify-center gap-1.5 text-xs transition hover:scale-[1.01] border shadow-xs ${
                copied ? 'bg-green-50 text-green-700 border-green-200' : 'bg-white hover:bg-gray-50 text-gray-800 border-gray-200'
              }`}>
              {copied ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5 text-gray-600" />}
              {copied ? 'Done' : 'Copy'}
            </button>
            <button onClick={handleDownload}
              className="py-2.5 rounded-xl font-bold text-gray-800 bg-white hover:bg-gray-50 border border-gray-200 flex items-center justify-center gap-1.5 text-xs transition hover:scale-[1.01] shadow-xs">
              <Download className="w-3.5 h-3.5 text-red-600" /> Badge
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
