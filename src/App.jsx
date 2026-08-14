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

    // 1. Restore local storage users
    const savedUsers = getStoredUsers();
    if (savedUsers && savedUsers.length > 0) {
      setVoicesList(prev => {
        const unique = savedUsers.filter(su => !prev.some(pv => pv.id === su.id));
        return [...unique, ...prev];
      });
      setVoiceCount(prev => prev + savedUsers.length);

      setStatesData(prev => {
        const countMap = {};
        savedUsers.forEach(u => {
          if (u.state) countMap[u.state] = (countMap[u.state] || 0) + 1;
        });
        return prev.map(st =>
          countMap[st.name]
            ? { ...st, voices: (st.voices || 0) + countMap[st.name] }
            : st
        );
      });
    }

    // 2. If Supabase configured, load remote cloud voices
    if (isSupabaseConfigured) {
      fetchRemoteVoices().then(remoteVoices => {
        if (remoteVoices && remoteVoices.length > 0) {
          remoteVoices.forEach(rv => ingestNewVoice(rv, false));
        }
      });
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

  // Self Voice submission
  const handleVoiceSubmitted = (newVoice) => {
    setIsAddModalOpen(false);
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

          {/* Landing Hero with Voice-Density Interactive Map */}
          <LandingHero
            voiceCount={voiceCount}
            targetCount={TARGET_VOICES}
            onOpenModal={() => setIsAddModalOpen(true)}
            isUnlocked={phase === PHASE.WEBSITE}
            statesData={statesData}
            onStateClicked={(stName) => setSelectedState(stName)}
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
