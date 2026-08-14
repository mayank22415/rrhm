import React from 'react';
import { BookOpen, Users, Megaphone, HandHeart, ArrowRight } from 'lucide-react';

export default function RRMIMission() {
  const missionCards = [
    { icon: BookOpen, title: "Awareness", description: "Educate and create awareness about ground realities and socio-economic statistics." },
    { icon: Users, title: "Reform", description: "Advocate for just, transparent, and data-driven reservation policy reforms." },
    { icon: Megaphone, title: "Mobilize", description: "Unite citizens across every state in India for a unified, constructive movement." },
    { icon: HandHeart, title: "Empower", description: "Empower deserving individuals through quality skills, coaching, and equal support." }
  ];

  const newsItems = [
    {
      category: "POLICY",
      title: "Supreme Court Seeks Data on Reservation Benefits",
      date: "May 20, 2024",
      image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=600&q=80",
      snippet: "Apex court highlights the need for real-time empirical data to evaluate affirmative action efficiency."
    },
    {
      category: "EDUCATION",
      title: "Rethinking Reservation in Higher Education",
      date: "May 18, 2024",
      image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=600&q=80",
      snippet: "Scholars urge shifting focus from seat quotas to early-stage educational coaching and infrastructure."
    },
    {
      category: "SOCIETY",
      title: "Why Economic Criteria Should Be the Future",
      date: "May 15, 2024",
      image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=600&q=80",
      snippet: "Economists advocate prioritizing household income to target help to true poverty."
    }
  ];

  return (
    <section id="mission" className="py-16 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">

        {/* Our Mission Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900">Our Mission</h2>
          <p className="text-gray-500 text-base leading-relaxed">
            We advocate for a reservation system that is fair, transparent and time-bound, ensuring help reaches the truly deserving and empowers future generations.
          </p>
        </div>

        {/* 4 Mission Cards — Matching reference image */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {missionCards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <div
                key={idx}
                className="card-panel p-6 rounded-xl text-center space-y-3 group"
              >
                <div className="w-14 h-14 rounded-xl bg-red-50 border border-red-100 text-red-600 flex items-center justify-center mx-auto group-hover:bg-red-600 group-hover:text-white transition duration-300">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-gray-900 group-hover:text-red-600 transition">{card.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{card.description}</p>
              </div>
            );
          })}
        </div>

        {/* Latest News — Matching reference image */}
        <div className="space-y-6 pt-2 border-t border-gray-100">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-black text-gray-900">Latest News</h3>
            <a href="#mission" className="text-sm font-bold text-red-600 hover:text-red-700 flex items-center gap-1">
              View All <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {newsItems.map((item, idx) => (
              <div key={idx} className="card-panel rounded-xl overflow-hidden group flex flex-col">
                <div className="h-44 overflow-hidden relative">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-red-600 text-white font-extrabold text-[10px] px-2.5 py-1 rounded uppercase tracking-wider">
                    {item.category}
                  </div>
                </div>
                <div className="p-5 flex-1 flex flex-col space-y-2">
                  <div className="text-[11px] text-gray-400 font-mono">{item.date}</div>
                  <h4 className="text-sm font-bold text-gray-900 group-hover:text-red-600 transition line-clamp-2">
                    {item.title}
                  </h4>
                  <p className="text-xs text-gray-500 leading-relaxed line-clamp-2 flex-1">
                    {item.snippet}
                  </p>
                  <span className="text-xs font-semibold text-red-600 hover:text-red-700 flex items-center gap-1 cursor-pointer pt-2">
                    Read More <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
