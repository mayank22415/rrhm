import React, { useState } from 'react';
import { Users, Search, CheckCircle2, MapPin, Briefcase, Sparkles } from 'lucide-react';

export default function VoicesWall({ voicesList, selectedState, onSelectState, onOpenModal }) {
  const [search, setSearch] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');

  const filtered = voicesList.filter((v) => {
    const matchesState = !selectedState || v.state === selectedState;
    const matchesSearch =
      v.name.toLowerCase().includes(search.toLowerCase()) ||
      v.state.toLowerCase().includes(search.toLowerCase()) ||
      v.city.toLowerCase().includes(search.toLowerCase()) ||
      v.profession.toLowerCase().includes(search.toLowerCase()) ||
      v.quote.toLowerCase().includes(search.toLowerCase());
    const matchesCat =
      filterCategory === 'all' ||
      (filterCategory === 'student' && (v.profession.includes('Student') || v.profession.includes('Aspirant'))) ||
      (filterCategory === 'professional' && (v.profession.includes('Engineer') || v.profession.includes('Lawyer') || v.profession.includes('Entrepreneur'))) ||
      (filterCategory === 'scholar' && (v.profession.includes('Scholar') || v.profession.includes('Teacher')));
    return matchesState && matchesSearch && matchesCat;
  });

  const pillars = [
    { label: 'All', value: 'all' },
    { label: 'Students & Aspirants', value: 'student' },
    { label: 'Professionals', value: 'professional' },
    { label: 'Scholars & Educators', value: 'scholar' },
  ];

  return (
    <section id="voices-wall" className="py-12 border-t" style={{ background: 'rgba(255,255,255,0.02)', borderColor: 'rgba(255,255,255,0.06)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold text-red-600 bg-red-50 px-3 py-1 rounded-full border border-red-200 mb-3">
              <Users className="w-3.5 h-3.5" />
              LIVE SUPPORTERS WALL
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-gray-900">
              Voices Across the Nation
            </h2>
            <p className="text-gray-500 text-sm mt-1">
              Real-time pledges from young citizens standing for equal opportunity.
            </p>
          </div>
          <button onClick={onOpenModal} className="btn-rrmi text-xs py-2.5 px-5 rounded-lg w-fit">
            <Sparkles className="w-3.5 h-3.5" />
            Add My Voice Card
          </button>
        </div>

        {/* Filter Bar */}
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Search by name, state, quote..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-lg bg-white border border-gray-200 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-red-400 transition"
            />
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {pillars.map((p) => (
              <button
                key={p.value}
                onClick={() => setFilterCategory(p.value)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition border ${
                  filterCategory === p.value
                    ? 'bg-red-600 text-white border-red-600'
                    : 'bg-white text-gray-600 border-gray-200 hover:border-red-300 hover:text-red-600'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* Voice Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((voice, idx) => (
            <div
              key={voice.id ? `voice-${voice.id}-${idx}` : `voice-idx-${idx}`}
              className="card-panel p-5 rounded-xl flex flex-col justify-between space-y-4 group"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-extrabold text-red-600 bg-red-50 px-2.5 py-1 rounded-md border border-red-200">
                  {voice.voiceNo}
                </span>
                <div className="flex items-center gap-1 text-[11px] text-green-600 font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Verified
                </div>
              </div>

              <p className="text-sm text-gray-700 italic leading-relaxed">
                "{voice.quote}"
              </p>

              <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
                <div>
                  <div className="font-bold text-gray-900 group-hover:text-red-600 transition">
                    {voice.name}
                  </div>
                  <div className="text-[11px] text-gray-400 flex items-center gap-1 mt-0.5">
                    <Briefcase className="w-3 h-3" />
                    {voice.profession}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[11px] font-semibold text-red-500 flex items-center justify-end gap-1">
                    <MapPin className="w-3 h-3" />
                    {voice.state}
                  </div>
                  <div className="text-[10px] text-gray-400 font-mono mt-0.5">{voice.timeAgo}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
