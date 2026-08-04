import React from 'react';
import { Flame, ShieldCheck, Mail, Phone, MapPin, Video, Globe, Share2 } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#08090C] border-t border-slate-800 text-slate-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          
          {/* Brand Col */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-600 to-yellow-300 p-0.5">
                <div className="w-full h-full bg-[#0D0F12] rounded-[10px] flex items-center justify-center">
                  <Flame className="w-5 h-5 text-amber-400" />
                </div>
              </div>
              <span className="text-lg font-bold text-white font-display">
                AURA <span className="text-amber-400">VINTAGE</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Global marketplace for authenticated NOS, restored, and casting-verified vintage automobile spare parts.
            </p>
            <div className="flex items-center space-x-3 text-slate-400">
              <a href="#" className="hover:text-amber-400 p-2 rounded-lg bg-slate-900 border border-slate-800"><Video className="w-4 h-4" /></a>
              <a href="#" className="hover:text-amber-400 p-2 rounded-lg bg-slate-900 border border-slate-800"><Globe className="w-4 h-4" /></a>
              <a href="#" className="hover:text-amber-400 p-2 rounded-lg bg-slate-900 border border-slate-800"><Share2 className="w-4 h-4" /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-widest text-white font-bold mb-4">VINTAGE ARCHIVES</h4>
            <ul className="space-y-2 text-xs font-mono">
              <li><a href="#models" className="hover:text-amber-400">Shelby Cobra Jet 428</a></li>
              <li><a href="#models" className="hover:text-amber-400">Mercedes 300SL Gullwing</a></li>
              <li><a href="#models" className="hover:text-amber-400">Jaguar E-Type Series 1</a></li>
              <li><a href="#models" className="hover:text-amber-400">Corvette Stingray Split-Window</a></li>
              <li><a href="#models" className="hover:text-amber-400">Porsche 911 Air-Cooled</a></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-widest text-white font-bold mb-4">PARTS CATEGORIES</h4>
            <ul className="space-y-2 text-xs font-mono">
              <li><a href="#catalog" className="hover:text-amber-400">Dual Holley & SU Carburetors</a></li>
              <li><a href="#catalog" className="hover:text-amber-400">Bosch Mechanical Fuel Injection</a></li>
              <li><a href="#catalog" className="hover:text-amber-400">High-Rise Aluminum Intake Manifolds</a></li>
              <li><a href="#catalog" className="hover:text-amber-400">Autolite Dual-Point Distributors</a></li>
              <li><a href="#catalog" className="hover:text-amber-400">Borg-Warner T-10 Transmissions</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-widest text-white font-bold mb-4">HEADQUARTERS</h4>
            <ul className="space-y-3 text-xs font-mono">
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span>Classic Restorer Way, Detroit, MI 48201</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span>+1 (800) 555-V8-COBRA</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span>concierge@auravintageparts.com</span>
              </li>
            </ul>
          </div>

        </div>

        <div className="pt-8 border-t border-slate-900 text-center text-xs font-mono text-slate-500">
          © {new Date().getFullYear()} Aura Vintage Engineering Ltd. All rights reserved. Casting Code Authenticated.
        </div>
      </div>
    </footer>
  );
}
