import React, { useState } from 'react';
import { CheckCircle2, Download } from 'lucide-react';
import { exportUsersToCSV } from '../utils/userStorage';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) { setSubscribed(true); setEmail(''); }
  };

  return (
    <footer className="bg-gray-900 text-gray-300 pt-12 pb-8 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">

          {/* Brand */}
          <div className="md:col-span-4 space-y-4">
            <div className="flex items-center gap-2">
              <svg viewBox="0 0 100 100" className="w-10 h-10 flex-shrink-0">
                <circle cx="50" cy="50" r="42" fill="none" stroke="#dc2626" strokeWidth="8" />
                <path fill="#ffffff" d="M 45 22 C 42 22 40 24 40 27 L 40 36 C 38 34 35 34 34 36 C 32 38 32 42 34 44 C 32 45 31 49 33 52 C 34 56 38 57 40 58 L 40 78 L 62 78 L 62 58 C 67 54 68 46 68 40 L 68 27 C 68 24 66 22 63 22 C 60 22 58 24 57 26 C 56 24 54 22 51 22 C 49 22 47 24 46 26 C 45.5 24 45 22 45 22 Z" />
              </svg>
              <div>
                <div className="font-black text-white text-sm uppercase tracking-tight leading-tight">RESERVATION REFORM</div>
                <div className="font-black text-red-500 text-sm uppercase tracking-tight leading-none">MOVEMENT INDIA</div>
              </div>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed max-w-xs">
              Building a just and equal India through reforms, awareness and collective citizen action.
            </p>
            <div className="flex items-center gap-3 pt-1">
              <a href="#" className="p-2 rounded-full bg-gray-800 hover:bg-red-600 text-gray-400 hover:text-white transition">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
              <a href="#" className="p-2 rounded-full bg-gray-800 hover:bg-red-600 text-gray-400 hover:text-white transition">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
              </a>
              <a href="#" className="p-2 rounded-full bg-gray-800 hover:bg-red-600 text-gray-400 hover:text-white transition">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>
              </a>
              <a href="#" className="p-2 rounded-full bg-gray-800 hover:bg-red-600 text-gray-400 hover:text-white transition">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-1.96C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.4 19.54C5.12 20 12 20 12 20s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white"/></svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2 text-xs text-gray-400">
              {['Home', 'About Us', 'Our Vision', 'Manifesto', 'Reform Proposal', 'Research & Stats'].map(l => (
                <li key={l}><a href="#hero" className="hover:text-white hover:text-red-400 transition">{l}</a></li>
              ))}
            </ul>
          </div>

          {/* Get Involved */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Get Involved</h4>
            <ul className="space-y-2 text-xs text-gray-400">
              {['Join Movement', 'Volunteer', 'Events', 'Citizen Voices', 'Contact Us'].map(l => (
                <li key={l}><a href="#hero" className="hover:text-white hover:text-red-400 transition">{l}</a></li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Stay Updated</h4>
            <p className="text-xs text-gray-400">Subscribe to our newsletter for policy updates and campaign progress.</p>
            {subscribed ? (
              <div className="flex items-center gap-2 text-green-400 text-xs font-semibold bg-green-900/30 p-3 rounded-lg border border-green-800">
                <CheckCircle2 className="w-4 h-4" />
                Thank you for subscribing to RRMI Updates!
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex items-center gap-2">
                <input
                  type="email"
                  required
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-red-500 transition"
                />
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-500 text-white font-bold text-xs transition flex-shrink-0 cursor-pointer"
                >
                  Subscribe
                </button>
              </form>
            )}

          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-3">
          <div>© 2024 Reservation Reform Movement India. All Rights Reserved.</div>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-gray-300 transition">Privacy Policy</a>
            <span>|</span>
            <a href="#" className="hover:text-gray-300 transition">Terms & Conditions</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
