import React, { useState } from 'react';
import { X, Flame, ShieldCheck, Sparkles, MapPin, User, Phone, Briefcase, MessageSquare, Check, Copy, Share2 } from 'lucide-react';
import { INDIA_STATES } from '../data/indiaStatesData';
import {
  generateReferralLink,
  saveMyVoice,
  shareOnWhatsApp,
  shareNative,
  copyReferralLink,
  getReferredBy,
  incrementReferralCount,
} from '../utils/referral';
import { saveUserData } from '../utils/userStorage';
import { submitVoiceRealtime } from '../utils/supabaseClient';

export default function AddVoiceModal({ isOpen, onClose, onSubmitVoice, currentVoiceCount }) {
  // Form state
  const [name, setName] = useState('');
  const [stateName, setStateName] = useState('Maharashtra');
  const [contact, setContact] = useState('');       // mobile or email
  const [profession, setProfession] = useState('Student / Aspirant');
  const [pledge, setPledge] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Post-submission state
  const [submittedVoice, setSubmittedVoice] = useState(null);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const newVoiceNo = currentVoiceCount + 1;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    setIsSubmitting(true);

    setTimeout(() => {
      const voice = {
        id: newVoiceNo,
        voiceNo: `Voice #${newVoiceNo}`,
        name: name.trim(),
        state: stateName,
        city: stateName,
        profession,
        contact: contact.trim(),
        quote: pledge.trim() || 'I stand for equal opportunity, transparency and economic affirmative action for every young Indian.',
        timeAgo: 'Just now',
        verified: true,
        date: new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' }),
      };

      // 1. Permanently store the user's full details in local storage
      saveUserData(voice);

      // 2. Submit to Supabase realtime backend & broadcast to other tabs
      submitVoiceRealtime(voice);

      // 3. Save this person's voice number for badges
      saveMyVoice(newVoiceNo);

      // 4. If they came via a referral link, credit that referrer
      const referredBy = getReferredBy();
      if (referredBy) incrementReferralCount(referredBy);

      onSubmitVoice(voice);
      setSubmittedVoice(voice);
      setIsSubmitting(false);
    }, 500);
  };

  const handleClose = () => {
    onClose();
    // Reset after close
    setTimeout(() => {
      setSubmittedVoice(null);
      setName(''); setContact(''); setPledge('');
      setStateName('Maharashtra'); setProfession('Student / Aspirant');
      setCopied(false);
    }, 300);
  };

  const referralLink = submittedVoice ? generateReferralLink(submittedVoice.id) : '';

  const handleCopy = async () => {
    const ok = await copyReferralLink(referralLink);
    if (ok) { setCopied(true); setTimeout(() => setCopied(false), 2500); }
  };

  const handleWhatsApp = () => shareOnWhatsApp(submittedVoice.id, referralLink);
  const handleShare = () => shareNative(submittedVoice.id, referralLink);

  // ── SUCCESS SCREEN ──────────────────────────────────────────────────────────
  if (submittedVoice) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
        <div className="relative w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl bg-white border border-gray-200">
          {/* Top colored bar */}
          <div className="h-1.5 w-full bg-gradient-to-r from-red-600 via-orange-500 to-amber-500" />

          <div className="p-7 sm:p-9 text-center">
            {/* Close */}
            <button onClick={handleClose}
              className="absolute top-4 right-4 p-2 rounded-full text-gray-400 hover:text-gray-700 bg-gray-100 hover:bg-gray-200 transition">
              <X className="w-4 h-4" />
            </button>

            {/* Flag + check */}
            <div className="text-5xl mb-3 animate-bounce">🇮🇳</div>

            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-3 bg-green-50 border border-green-200 text-green-700">
              <Check className="w-3.5 h-3.5 text-green-600" /> YOUR VOICE HAS BEEN RECORDED
            </div>

            {/* Voice number */}
            <div className="mb-1">
              <span className="text-6xl sm:text-7xl font-black font-mono text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-orange-500 to-amber-600">
                #{submittedVoice.id.toLocaleString('en-IN')}
              </span>
            </div>
            <p className="text-sm text-gray-500 font-semibold mb-5">VOICE #{submittedVoice.id} — {submittedVoice.name}</p>

            <p className="text-gray-700 text-sm sm:text-base leading-relaxed mb-6">
              You are now part of{' '}
              <strong className="text-gray-900 font-black">2,026 citizens</strong>{' '}
              building <span className="text-red-600 font-bold">The Next India.</span>
            </p>

            {/* Progress snippet */}
            <div className="rounded-2xl p-4 mb-6 text-left space-y-2 bg-gray-50 border border-gray-200">
              <div className="flex justify-between text-xs font-mono text-gray-600">
                <span>Your Voice ID</span>
                <span className="text-red-600 font-black">#{submittedVoice.id}</span>
              </div>
              <div className="flex justify-between text-xs font-mono text-gray-600">
                <span>Recorded Status</span>
                <span className="text-green-600 font-bold">✓ Stored & Verified</span>
              </div>
              <div className="flex justify-between text-xs font-mono text-gray-600">
                <span>National Voices</span>
                <span className="text-gray-900 font-bold">{submittedVoice.id.toLocaleString()} / 2,026</span>
              </div>
            </div>

            {/* Share CTA label */}
            <p className="text-gray-900 font-black text-base mb-4 tracking-wide">
              Bring another voice with you.
            </p>

            {/* Share buttons */}
            <div className="space-y-3">
              <button
                onClick={handleWhatsApp}
                className="w-full py-3.5 px-5 rounded-xl font-bold text-white flex items-center justify-center gap-3 transition hover:scale-[1.01] shadow-md"
                style={{ background: '#25D366' }}
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Share on WhatsApp
              </button>

              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={handleShare}
                  className="py-3 px-4 rounded-xl font-bold text-gray-800 bg-gray-100 hover:bg-gray-200 border border-gray-200 flex items-center justify-center gap-2 transition hover:scale-[1.01]"
                >
                  <Share2 className="w-4 h-4 text-red-600" /> Share
                </button>
                <button
                  onClick={handleCopy}
                  className={`py-3 px-4 rounded-xl font-bold flex items-center justify-center gap-2 transition hover:scale-[1.01] border ${
                    copied
                      ? 'bg-green-50 text-green-700 border-green-200'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-800 border-gray-200'
                  }`}
                >
                  {copied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4 text-gray-600" />}
                  {copied ? 'Copied!' : 'Copy Invite'}
                </button>
              </div>
            </div>

            <button onClick={handleClose} className="mt-5 text-xs text-gray-500 hover:text-gray-800 transition font-medium">
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── REGISTRATION FORM ───────────────────────────────────────────────────────
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
      <div className="relative w-full max-w-md rounded-3xl shadow-2xl overflow-hidden bg-white border border-gray-200">
        {/* Red top strip */}
        <div className="h-1.5 w-full bg-gradient-to-r from-red-600 to-orange-500" />

        <div className="p-6 sm:p-8">
          {/* Close */}
          <button onClick={handleClose}
            className="absolute top-4 right-4 p-2 rounded-full text-gray-400 hover:text-gray-700 bg-gray-100 hover:bg-gray-200 transition">
            <X className="w-4 h-4" />
          </button>

          {/* Header */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 bg-gradient-to-br from-red-600 to-orange-500 shadow-md">
              <Flame className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-black text-gray-900">Add Your Voice</h3>
              <p className="text-xs text-gray-500">
                You will be{' '}
                <span className="text-red-600 font-black">Voice #{newVoiceNo.toLocaleString('en-IN')}</span>
                {' '}registered for reform
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div>
              <label className="flex items-center gap-1.5 text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                <User className="w-3.5 h-3.5 text-red-600" /> Full Name *
              </label>
              <input type="text" required placeholder="e.g. Aarav Sharma" value={name}
                onChange={e => setName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl text-sm text-gray-900 placeholder-gray-400 bg-gray-50 border border-gray-200 focus:bg-white focus:border-red-500 focus:ring-2 focus:ring-red-100 focus:outline-none transition"
              />
            </div>

            {/* State + Profession */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="flex items-center gap-1.5 text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  <MapPin className="w-3.5 h-3.5 text-red-600" /> State / UT *
                </label>
                <select value={stateName} onChange={e => setStateName(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl text-sm text-gray-900 bg-gray-50 border border-gray-200 focus:bg-white focus:border-red-500 focus:outline-none transition">
                  {INDIA_STATES.map(st => <option key={st.id} value={st.name}>{st.name}</option>)}
                </select>
              </div>
              <div>
                <label className="flex items-center gap-1.5 text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  <Briefcase className="w-3.5 h-3.5 text-red-600" /> Profession *
                </label>
                <select value={profession} onChange={e => setProfession(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl text-sm text-gray-900 bg-gray-50 border border-gray-200 focus:bg-white focus:border-red-500 focus:outline-none transition">
                  {['Student / Aspirant', 'Software Engineer', 'Civil Services Aspirant', 'Research Scholar', 'Lawyer / Legal Professional', 'Medical Professional', 'Entrepreneur', 'Teacher / Educator', 'Concerned Young Citizen'].map(p =>
                    <option key={p} value={p}>{p}</option>)}
                </select>
              </div>
            </div>

            {/* Mobile/Email */}
            <div>
              <label className="flex items-center gap-1.5 text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                <Phone className="w-3.5 h-3.5 text-red-600" /> Mobile / Email *
              </label>
              <input type="text" required placeholder="For verification & registration" value={contact}
                onChange={e => setContact(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl text-sm text-gray-900 placeholder-gray-400 bg-gray-50 border border-gray-200 focus:bg-white focus:border-red-500 focus:ring-2 focus:ring-red-100 focus:outline-none transition"
              />
            </div>

            {/* Pledge */}
            <div>
              <label className="flex items-center gap-1.5 text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                <MessageSquare className="w-3.5 h-3.5 text-red-600" /> My Pledge Statement
              </label>
              <textarea rows={2} placeholder="Why do you support equal opportunity & reservation reform?"
                value={pledge} onChange={e => setPledge(e.target.value)}
                className="w-full px-4 py-2 rounded-xl text-sm text-gray-900 placeholder-gray-400 bg-gray-50 border border-gray-200 focus:bg-white focus:border-red-500 focus:ring-2 focus:ring-red-100 focus:outline-none transition resize-none"
              />
            </div>

            {/* Trust note */}
            <div className="flex items-start gap-2 text-[11px] text-gray-600 px-3 py-2.5 rounded-xl bg-gray-50 border border-gray-200">
              <ShieldCheck className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
              <span>Your data is securely stored. You'll receive a verified invite link to share.</span>
            </div>

            {/* Submit */}
            <button type="submit" disabled={isSubmitting}
              className="btn-rrmi w-full justify-center py-3.5 text-sm rounded-xl cursor-pointer">
              {isSubmitting ? (
                <>
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Registering your voice…
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  ADD MY VOICE
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
