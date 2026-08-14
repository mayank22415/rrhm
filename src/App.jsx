import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import LandingHero from './components/LandingHero';
import VisionSection from './components/VisionSection';
import ManifestoReader from './components/ManifestoReader';
import VoicesWall from './components/VoicesWall';
import RRMIMission from './components/RRMIMission';
import Footer from './components/Footer';
import AddVoiceModal from './components/AddVoiceModal';
import VoiceBadgeCard from './components/VoiceBadgeCard';
import CinematicUnlock from './components/CinematicUnlock';
import CelebrationPage from './components/CelebrationPage';
import TricolorWatermarks from './components/TricolorWatermarks';

import { INDIA_STATES, TOTAL_INITIAL_VOICES, TARGET_VOICES } from './data/indiaStatesData';
import { INITIAL_VOICES_LIST } from './data/initialVoices';
import { getReferredBy, incrementReferralCount } from './utils/referral';
import {
  getStoredUsers,
  getStoredUnlockedPhase,
  setStoredUnlockedPhase,
  isMovementUnlocked,
} from './utils/userStorage';
import {
  subscribeToRealtimeVoices,
  fetchRemoteVoices,
  isSupabaseConfigured,
} from './utils/supabaseClient';

const PHASE = {
  CAMPAIGN:    'campaign',
  CINEMATIC:   'cinematic',
  CELEBRATION: 'celebration',
  WEBSITE:     'website',
};

export default function App() {
  // Determine initial phase from URL query or localStorage
  const getInitialPhase = () => {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const unlockedParam = urlParams.get('unlocked');
      
      if (unlockedParam === 'true' || unlockedParam === 'website') {
        return PHASE.WEBSITE;
      }
      if (unlockedParam === 'celebration') {
        return PHASE.CELEBRATION;
      }
      if (unlockedParam === 'cinematic') {
        return PHASE.CINEMATIC;
      }

      // Check localStorage for previously unlocked session
      const storedPhase = getStoredUnlockedPhase();
      if (storedPhase === PHASE.WEBSITE || storedPhase === PHASE.CELEBRATION) {
        return storedPhase;
      }
      if (isMovementUnlocked()) {
        return PHASE.WEBSITE;
      }
    } catch (e) {
      console.warn('Error reading initial phase:', e);
    }
    return PHASE.CAMPAIGN;
  };

  const [phase, setPhase] = useState(getInitialPhase);

  const [voiceCount, setVoiceCount] = useState(TOTAL_INITIAL_VOICES);
  const [statesData, setStatesData] = useState(INDIA_STATES);
  const [voicesList, setVoicesList] = useState(INITIAL_VOICES_LIST);
  const [selectedState, setSelectedState] = useState(null);

  // Modals
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [activeBadgeVoice, setActiveBadgeVoice] = useState(null);

  // Helper to incorporate an incoming new voice
  const ingestNewVoice = useCallback((newVoice, isSelf = false) => {
    setVoicesList(prev => {
      // Prevent duplicate insertions
      if (prev.some(v => v.id === newVoice.id || (v.contact && v.contact === newVoice.contact))) {
        return prev;
      }
      return [newVoice, ...prev];
    });

    setVoiceCount(prev => {
      const nextCount = prev + 1;
      return nextCount;
    });

    if (newVoice.state) {
      setStatesData(prev =>
        prev.map(st =>
          st.name.toLowerCase() === newVoice.state.toLowerCase()
            ? { ...st, voices: (st.voices || 0) + 1 }
            : st
        )
      );
    }

    if (isSelf) {
      setActiveBadgeVoice(newVoice);
    }
  }, []);

  // On load: restore local users, handle referrals, fetch remote voices & subscribe to realtime
  useEffect(() => {
    const ref = getReferredBy();
    if (ref) {
      incrementReferralCount(ref);
    }

    // 2. If Supabase configured, load remote cloud voices as the TRUE source of count
    if (isSupabaseConfigured) {
      fetchRemoteVoices().then(remoteVoices => {
        if (remoteVoices && remoteVoices.length > 0) {
          // Set count = seed data + real Supabase submissions (avoids double-count)
          setVoiceCount(TOTAL_INITIAL_VOICES + remoteVoices.length);

          // Update state voice breakdown
          const countMap = {};
          remoteVoices.forEach(rv => {
            if (rv.state) countMap[rv.state] = (countMap[rv.state] || 0) + 1;
          });
          setStatesData(prev =>
            prev.map(st =>
              countMap[st.name]
                ? { ...st, voices: (st.voices || 0) + countMap[st.name] }
                : st
            )
          );

          // Add to voices list for display (deduplicated)
          setVoicesList(prev => {
            const existingIds = new Set(prev.map(v => v.id));
            const newOnes = remoteVoices
              .filter(rv => !existingIds.has(rv.id))
              .map(rv => ({
                id: rv.id,
                voiceNo: `Voice #${rv.id}`,
                name: rv.name,
                state: rv.state,
                city: rv.city || rv.state,
                profession: rv.profession,
                contact: rv.contact,
                quote: rv.quote,
                timeAgo: 'Earlier',
                verified: true,
                date: new Date(rv.created_at).toLocaleDateString('en-IN', {
                  year: 'numeric', month: 'short', day: 'numeric',
                }),
              }));
            return [...newOnes, ...prev];
          });
        }
        // If Supabase returns 0 rows, keep the seed count of 103
      });
    } else {
      // No Supabase: restore from localStorage for offline/dev mode only
      const savedUsers = getStoredUsers();
      if (savedUsers && savedUsers.length > 0) {
        setVoicesList(prev => {
          const unique = savedUsers.filter(su => !prev.some(pv => pv.id === su.id));
          return [...unique, ...prev];
        });
        setVoiceCount(TOTAL_INITIAL_VOICES + savedUsers.length);
      }
    }

    // 3. Realtime multi-user & multi-tab subscription listener
    const unsubscribe = subscribeToRealtimeVoices((incomingVoice) => {
      ingestNewVoice(incomingVoice, false);
    });

    return () => {
      if (typeof unsubscribe === 'function') unsubscribe();
    };
  }, [ingestNewVoice]);

  // Handle reaching the 2,026 target
  useEffect(() => {
    if (voiceCount >= TARGET_VOICES && phase === PHASE.CAMPAIGN) {
      setStoredUnlockedPhase(PHASE.CINEMATIC);
      setTimeout(() => setPhase(PHASE.CINEMATIC), 600);
    }
  }, [voiceCount, phase]);

  const [mapBloomTrigger, setMapBloomTrigger] = useState(null);

  // Self Voice submission
  const handleVoiceSubmitted = (newVoice) => {
    setIsAddModalOpen(false);
    setMapBloomTrigger({ state: newVoice.state, name: newVoice.name, timestamp: Date.now() });
    ingestNewVoice({ ...newVoice, voiceCount: voiceCount + 1 }, true);
  };

  const handleCinematicComplete = () => {
    setStoredUnlockedPhase(PHASE.CELEBRATION);
    setPhase(PHASE.CELEBRATION);
  };

  const handleEnterWebsite = () => {
    setStoredUnlockedPhase(PHASE.WEBSITE);
    setPhase(PHASE.WEBSITE);
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 selection:bg-red-600 selection:text-white relative">

      {/* Global Indian Tricolor, Ashok Chakra, Ashok Stambh, Flag & Kids Watermarks */}
      <TricolorWatermarks />

      {/* Cinematic overlay */}
      {phase === PHASE.CINEMATIC && (
        <CinematicUnlock onComplete={handleCinematicComplete} />
      )}

      {/* Celebration page */}
      {phase === PHASE.CELEBRATION && (
        <CelebrationPage
          voiceCount={voiceCount}
          statesData={statesData}
          onEnterWebsite={handleEnterWebsite}
        />
      )}

      {/* Main site */}
      {(phase === PHASE.CAMPAIGN || phase === PHASE.WEBSITE) && (
        <>
          {/* Header */}
          <Header
            voiceCount={voiceCount}
            targetCount={TARGET_VOICES}
            onOpenModal={() => setIsAddModalOpen(true)}
          />

          {/* Landing Hero with Voice-Density Interactive Map & Center Ashoka Chakra */}
          <LandingHero
            voiceCount={voiceCount}
            targetCount={TARGET_VOICES}
            onOpenModal={() => setIsAddModalOpen(true)}
            isUnlocked={phase === PHASE.WEBSITE}
            statesData={statesData}
            onStateClicked={(stName) => setSelectedState(stName)}
            onTriggerCinematic={() => setPhase(PHASE.CINEMATIC)}
            mapBloomTrigger={mapBloomTrigger}
          />

          {/* Vision Section */}
          <VisionSection />

          {/* The Manifesto Section */}
          <ManifestoReader />

          {/* Voices Wall */}
          <VoicesWall
            voicesList={voicesList}
            selectedState={selectedState}
            onSelectState={setSelectedState}
            onOpenModal={() => setIsAddModalOpen(true)}
          />

          {/* RRMI Mission */}
          <RRMIMission />

          {/* Footer */}
          <Footer />
        </>
      )}

      {/* Modals */}
      <AddVoiceModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmitVoice={handleVoiceSubmitted}
        currentVoiceCount={voiceCount}
      />

      {activeBadgeVoice && (
        <VoiceBadgeCard
          voice={activeBadgeVoice}
          voiceCount={voiceCount}
          targetCount={TARGET_VOICES}
          onClose={() => setActiveBadgeVoice(null)}
        />
      )}
    </div>
  );
}
