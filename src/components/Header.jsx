import React, { useState } from 'react';
import { Menu, X, Flame } from 'lucide-react';

export default function Header({
  voiceCount,
  targetCount = 2026,
  onOpenModal,
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Home', href: '#hero' },
    { label: 'About', href: '#mission' },
    { label: 'Vision & Manifesto', href: '#manifesto-reader' },
    { label: 'Reform', href: '#manifesto-reader' },
    { label: 'Research', href: '#manifesto-reader' },
    { label: 'Voices', href: '#voices-wall' },
    { label: 'News', href: '#mission' },
    { label: 'Contact', href: '#mission' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-stretch justify-between gap-4">

        {/* RRMI Logo */}
        <a href="#hero" className="flex-shrink-0 flex items-stretch">
          <img
            src="/rrmi-logo.png"
            alt="RRMI Logo"
            style={{ height: '64px', width: 'auto', objectFit: 'cover', objectPosition: 'center', display: 'block' }}
          />
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-6">
          {navLinks.map((link, i) => (
            <a
              key={link.label}
              href={link.href}
              className={`text-sm font-medium transition hover:text-red-600 ${
                i === 0 ? 'nav-link-active text-red-600' : 'text-gray-700'
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right Side: Voice Counter + Join Button */}
        <div className="flex items-center gap-3">

          {/* Live Voice Count Pill */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-gray-50 border border-gray-200">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600" />
            </span>
            <span className="text-red-600 font-mono font-black">{voiceCount.toLocaleString('en-IN')}</span>
            <span className="text-gray-300">/</span>
            <span className="text-gray-600 font-mono">{targetCount.toLocaleString('en-IN')} Voices</span>
          </div>

          {/* Join Movement Button */}
          <button
            onClick={onOpenModal}
            className="btn-rrmi rounded-full px-5 py-2 flex items-center gap-2 text-sm font-bold shadow-sm"
          >
            <Flame className="w-4 h-4 text-white animate-pulse" />
            <span>Join Movement</span>
          </button>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden p-2 rounded-lg border border-gray-200 text-gray-600 hover:text-red-600 transition"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-gray-100 bg-white px-4 py-4 space-y-2 shadow-lg">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-2 text-sm font-medium text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-3 flex gap-3 border-t border-gray-100">
            <button onClick={onOpenModal} className="btn-rrmi flex-1 justify-center text-xs py-2.5">
              <Flame className="w-4 h-4" />
              Add My Voice
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
