// Referral tracking utility for RRMI Voice Campaign

export function generateReferralLink(voiceNo) {
  const base = window.location.origin + window.location.pathname;
  return `${base}?ref=${voiceNo}`;
}

export function getReferredBy() {
  const params = new URLSearchParams(window.location.search);
  return params.get('ref');
}

export function saveMyVoice(voiceNo) {
  localStorage.setItem('rrmi_my_voice', String(voiceNo));
}

export function getMyVoice() {
  return localStorage.getItem('rrmi_my_voice');
}

export function incrementReferralCount(refVoiceNo) {
  const key = `rrmi_referrals_${refVoiceNo}`;
  const current = parseInt(localStorage.getItem(key) || '0', 10);
  localStorage.setItem(key, String(current + 1));
}

export function getMyReferralCount(voiceNo) {
  const key = `rrmi_referrals_${voiceNo}`;
  return parseInt(localStorage.getItem(key) || '0', 10);
}

export async function copyReferralLink(link) {
  try {
    await navigator.clipboard.writeText(link);
    return true;
  } catch {
    return false;
  }
}

export function shareOnWhatsApp(voiceNo, referralLink) {
  const msg = encodeURIComponent(
    `I just added my voice as #${voiceNo} to THE NEXT INDIA movement! ` +
    `Join 2,026 citizens unlocking The Next India — use my link: ${referralLink}`
  );
  window.open(`https://wa.me/?text=${msg}`, '_blank');
}

export function shareNative(voiceNo, referralLink) {
  const title = 'THE NEXT INDIA — 2026 Voices';
  const text = `I'm Voice #${voiceNo} in The Next India movement. Join me!`;
  if (navigator.share) {
    navigator.share({ title, text, url: referralLink }).catch(() => {});
  } else {
    navigator.clipboard.writeText(referralLink).catch(() => {});
    alert('Invite link copied to clipboard!');
  }
}
