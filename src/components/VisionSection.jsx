import React from 'react';

export default function VisionSection() {
  return (
    <section
      id="vision"
      className="py-16 sm:py-24 border-t border-gray-200 relative overflow-hidden"
      style={{ background: '#f5f5f0' }}
    >
      {/* ── SECTION WATERMARK PATTERNS (Ashoka Chakras & Tricolor accents) ── */}
      <div
        className="absolute inset-0 pointer-events-none select-none overflow-hidden"
        style={{ zIndex: 0 }}
        aria-hidden="true"
      >
        {/* Ashoka Chakra watermark background left */}
        <svg
          viewBox="0 0 200 200"
          className="absolute -top-12 -left-12 w-80 h-80 opacity-[0.05] text-slate-800"
        >
          <circle cx="100" cy="100" r="90" fill="none" stroke="currentColor" strokeWidth="3" />
          <circle cx="100" cy="100" r="22" fill="none" stroke="currentColor" strokeWidth="2.5" />
          <circle cx="100" cy="100" r="8" fill="currentColor" />
          {[...Array(24)].map((_, i) => (
            <line
              key={i}
              x1="100"
              y1="100"
              x2={100 + 88 * Math.cos((i * 15 * Math.PI) / 180)}
              y2={100 + 88 * Math.sin((i * 15 * Math.PI) / 180)}
              stroke="currentColor"
              strokeWidth="2"
            />
          ))}
        </svg>

        {/* Ashoka Chakra watermark right bottom */}
        <svg
          viewBox="0 0 200 200"
          className="absolute -bottom-16 right-10 w-96 h-96 opacity-[0.05] text-slate-800"
        >
          <circle cx="100" cy="100" r="90" fill="none" stroke="currentColor" strokeWidth="3" />
          <circle cx="100" cy="100" r="22" fill="none" stroke="currentColor" strokeWidth="2.5" />
          <circle cx="100" cy="100" r="8" fill="currentColor" />
          {[...Array(24)].map((_, i) => (
            <line
              key={i}
              x1="100"
              y1="100"
              x2={100 + 88 * Math.cos((i * 15 * Math.PI) / 180)}
              y2={100 + 88 * Math.sin((i * 15 * Math.PI) / 180)}
              stroke="currentColor"
              strokeWidth="2"
            />
          ))}
        </svg>

        {/* Repeating text watermarks */}
        {['RHA', 'सत्यमेव जयते', 'RHA', 'MERIT & JUSTICE'].map((t, i) => (
          <span
            key={`wt-${i}`}
            className="absolute font-black text-2xl text-gray-500/10 uppercase tracking-widest"
            style={{
              top: `${15 + (i * 22)}%`,
              left: `${8 + ((i % 2) * 45)}%`,
              transform: 'rotate(-12deg)',
            }}
          >
            {t}
          </span>
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* ── Two-column layout matching reference site ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">

          {/* LEFT — Text Content (cols 1-6) */}
          <div className="lg:col-span-6 space-y-6">

            {/* Section Heading — BLACK vertical bar exactly like reference */}
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-9 bg-gray-950 rounded-full flex-shrink-0" />
              <h2 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight uppercase">
                OUR VISION
              </h2>
            </div>

            {/* Body text — "16,000+ voices" is bold */}
            <div className="space-y-4 text-gray-700 text-sm sm:text-base leading-relaxed">
              <p>
                We didn't start in a political war room. We started on your feeds.
                What began as a community of young Indians frustrated by a divided
                system has grown into a network of over <strong>16,000+ voices</strong>.
              </p>
              <p>
                For decades, the narrative has been stuck: society debates
                reservations while ignoring the root cause—caste discrimination
                itself. We realized that you cannot fight division with more
                division.
              </p>
            </div>

            {/* Blockquote — red left border, AND in red bold uppercase */}
            <div className="border-l-4 border-red-600 bg-white/90 p-5 sm:p-6 rounded-r-2xl shadow-xs">
              <p className="text-gray-900 text-sm sm:text-base font-bold italic leading-relaxed">
                "If true equality is the goal, we must destroy the social evils
                of caste discrimination{' '}
                <span className="text-red-600 font-black uppercase not-italic">AND</span>
                {' '}reform the systems that keep us boxed into categories."
              </p>
            </div>

            <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
              We are not just a hashtag anymore. We are a generation demanding a
              fair start, equal resources, and a system that recognizes merit
              while aggressively protecting everyone from prejudice.
            </p>
          </div>

          {/* RIGHT — Exact 3D Scale Illustration from user's screenshot (cols 7-12) */}
          <div className="lg:col-span-6 relative flex items-center justify-center">
            <div className="relative w-full max-w-lg rounded-2xl overflow-hidden shadow-2xl border border-gray-300/80 bg-white group">
              <img
                src="/vision-scale-img.png"
                alt="RRMI Scale of Justice — Unity in Merit vs Caste-Based System"
                className="w-full h-auto object-cover block rounded-2xl transition-transform duration-500 group-hover:scale-[1.01]"
              />

              {/* Floating "SHARE YOUR STORY +" badge in bottom right corner */}
              <a
                href="#voices"
                className="absolute -bottom-2 -right-2 sm:bottom-3 sm:right-3 w-18 h-18 sm:w-20 sm:h-20 rounded-full bg-red-600 hover:bg-red-700 text-white flex flex-col items-center justify-center text-center shadow-2xl shadow-red-600/50 cursor-pointer transition-all duration-300 hover:scale-110 border-2 border-white/80 z-20"
                style={{ textDecoration: 'none' }}
              >
                <span className="text-[7px] sm:text-[8px] font-black uppercase tracking-widest leading-tight">
                  SHARE YOUR STORY
                </span>
                <span className="text-lg sm:text-xl font-black leading-none mt-0.5">+</span>
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
