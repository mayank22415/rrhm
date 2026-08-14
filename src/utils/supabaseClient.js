/**
 * Supabase Real-Time Client & Multi-Device Synchronization Layer
 * 
 * To connect your live Supabase cloud database:
 * 1. Create a project at https://supabase.com
 * 2. In SQL Editor, run:
 *    CREATE TABLE rrmi_voices (
 *      id SERIAL PRIMARY KEY,
 *      name TEXT NOT NULL,
 *      state TEXT NOT NULL,
 *      city TEXT,
 *      profession TEXT,
 *      contact TEXT,
 *      quote TEXT,
 *      created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
 *    );
 *    ALTER TABLE rrmi_voices ENABLE ROW LEVEL SECURITY;
 *    CREATE POLICY "Allow public insert and read" ON rrmi_voices FOR ALL USING (true) WITH CHECK (true);
 *    ALTER PUBLICATION supabase_realtime ADD TABLE rrmi_voices;
 * 
 * 3. Add to your .env file:
 *    VITE_SUPABASE_URL=https://your-project.supabase.co
 *    VITE_SUPABASE_ANON_KEY=your-anon-key
 */

import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || '';
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);

export const supabase = isSupabaseConfigured
  ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
  : null;

// Multi-Tab / Local Realtime Broadcast Channel (works instantly in browser even without cloud keys)
let broadcastChannel = null;
try {
  if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
    broadcastChannel = new BroadcastChannel('rrmi_realtime_voices');
  }
} catch (e) {
  console.warn('BroadcastChannel not supported in this environment', e);
}

/**
 * Fetch all verified voices from remote Supabase table
 */
export async function fetchRemoteVoices() {
  if (!isSupabaseConfigured || !supabase) {
    return [];
  }
  try {
    const { data, error } = await supabase
      .from('rrmi_voices')
      .select('*')
      .order('id', { ascending: false });

    if (error) {
      console.warn('Error fetching Supabase voices:', error.message);
      return [];
    }
    return data || [];
  } catch (err) {
    console.warn('Failed to connect to Supabase:', err);
    return [];
  }
}

/**
 * Insert a new verified voice to Supabase and broadcast to all connected tabs
 */
export async function submitVoiceRealtime(voiceData) {
  // Broadcast locally to any open tabs/windows immediately
  if (broadcastChannel) {
    try {
      broadcastChannel.postMessage({ type: 'NEW_VOICE', payload: voiceData });
    } catch (e) {
      console.warn('Broadcast error:', e);
    }
  }

  // If Supabase is connected, persist to cloud
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('rrmi_voices')
        .insert([
          {
            name: voiceData.name,
            state: voiceData.state,
            city: voiceData.city || voiceData.state,
            profession: voiceData.profession,
            contact: voiceData.contact,
            quote: voiceData.quote || voiceData.pledge || '',
          },
        ])
        .select();

      if (error) {
        console.error('Supabase insert error:', error.message);
      }
      return data;
    } catch (err) {
      console.error('Failed to submit voice to cloud database:', err);
    }
  }

  return null;
}

/**
 * Subscribe to realtime incoming voices across all devices & open browser tabs
 */
export function subscribeToRealtimeVoices(onNewVoice) {
  // 1. Listen to Local BroadcastChannel for instant multi-tab sync
  if (broadcastChannel) {
    const handleBroadcast = (event) => {
      if (event.data && event.data.type === 'NEW_VOICE' && event.data.payload) {
        onNewVoice(event.data.payload);
      }
    };
    broadcastChannel.addEventListener('message', handleBroadcast);
  }

  // 2. Listen to Supabase Postgres Changes for worldwide multi-device sync
  let channel = null;
  if (isSupabaseConfigured && supabase) {
    try {
      channel = supabase
        .channel('public:rrmi_voices')
        .on(
          'postgres_changes',
          { event: 'INSERT', schema: 'public', table: 'rrmi_voices' },
          (payload) => {
            if (payload.new) {
              const remoteVoice = {
                id: payload.new.id,
                voiceNo: `Voice #${payload.new.id}`,
                name: payload.new.name,
                state: payload.new.state,
                city: payload.new.city || payload.new.state,
                profession: payload.new.profession,
                contact: payload.new.contact,
                quote: payload.new.quote,
                timeAgo: 'Just now',
                verified: true,
                date: new Date(payload.new.created_at).toLocaleDateString('en-IN', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                }),
              };
              onNewVoice(remoteVoice);
            }
          }
        )
        .subscribe();
    } catch (err) {
      console.warn('Could not establish Supabase Realtime channel:', err);
    }
  }

  // Return unsubscribe cleanup function
  return () => {
    if (channel && supabase) {
      supabase.removeChannel(channel);
    }
  };
}
