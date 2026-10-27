'use client';

import React from 'react';
import { SupportedLanguage, UI_TRANSLATIONS } from '@/lib/translations';
import { X, Sprout, ShieldCheck, User, Info, CheckCircle2, AlertTriangle, FileText } from 'lucide-react';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: SupportedLanguage;
}

export const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose, language }) => {
  if (!isOpen) return null;

  const t = UI_TRANSLATIONS[language] || UI_TRANSLATIONS.en;

  return (
    <div className="fixed inset-0 z-50 bg-stone-950/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full border border-stone-200 shadow-2xl overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-emerald-950 via-stone-900 to-emerald-950 text-white p-6 relative flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-gradient-to-br from-amber-500 to-emerald-600 text-white rounded-2xl shadow-inner font-bold">
              <Sprout className="w-7 h-7 text-amber-200" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">{t.aboutTitle}</h2>
              <p className="text-xs text-amber-300 font-medium">
                Founder & Project Lead: Girma Haile Bunaro
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto text-xs text-stone-700 leading-relaxed">
          {/* Mission Box */}
          <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-200 space-y-2">
            <h3 className="font-bold text-emerald-950 text-sm flex items-center gap-2">
              <Sprout className="w-4 h-4 text-emerald-700" />
              <span>Project Mission</span>
            </h3>
            <p className="text-stone-800">{t.missionStatement}</p>
          </div>

          {/* Founder Statement */}
          <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200 space-y-2">
            <h3 className="font-bold text-stone-900 text-sm flex items-center gap-2">
              <User className="w-4 h-4 text-amber-600" />
              <span>Founder & Vision — Girma Haile Bunaro</span>
            </h3>
            <p className="text-stone-700">{t.founderBio}</p>
            <p className="text-stone-600 text-[11px] italic">
              Initiated to bridge localized agricultural extension with modern digital climate intelligence, empowering smallholders with transparent, cautious decision support.
            </p>
          </div>

          {/* Version 0.1 Scope & Non-Claims */}
          <div className="bg-amber-50 p-4 rounded-2xl border border-amber-200 space-y-2">
            <h3 className="font-bold text-amber-950 text-sm flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-700" />
              <span>Prototype Scope & Explicit Disclaimers</span>
            </h3>
            <ul className="list-disc list-inside space-y-1.5 text-stone-800">
              <li>
                <strong>Version 0.1 Prototype Status:</strong> This software is a technological and architectural prototype designed for demonstration and evaluation on mobile and desktop web platforms.
              </li>
              <li>
                <strong>Non-Claim Disclosures:</strong> We do NOT claim that this prototype has been formally tested with farmers, endorsed by Ethiopian government institutions or ministries, or proven to improve crop yield outcomes.
              </li>
              <li>
                <strong>Data Mode Clarity:</strong> Demonstration benchmark data is clearly labeled as non-live. Live meteorological data is fetched from public open models and must be cross-verified on the ground.
              </li>
            </ul>
          </div>

          {/* Responsible AI Framework */}
          <div className="space-y-2">
            <h3 className="font-bold text-stone-900 text-sm flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
              <span>Responsible AI Principles (Section 4 Compliance)</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
              <div className="bg-stone-50 p-2.5 rounded-xl border border-stone-200">
                <strong className="block text-stone-800 font-bold mb-0.5">Strict Uncertainty Labeling</strong>
                Explicitly flags unmonitored fields, convective rain variance, and confidence ratings.
              </div>
              <div className="bg-stone-50 p-2.5 rounded-xl border border-stone-200">
                <strong className="block text-stone-800 font-bold mb-0.5">No Yield Guarantees</strong>
                Never promises specific rainfall totals or guarantees protection from weather losses.
              </div>
              <div className="bg-stone-50 p-2.5 rounded-xl border border-stone-200">
                <strong className="block text-stone-800 font-bold mb-0.5">Extension Officer Referral</strong>
                Directs high-consequence planting and agrochemical decisions to local Kebele Development Agents (DAs).
              </div>
              <div className="bg-stone-50 p-2.5 rounded-xl border border-stone-200">
                <strong className="block text-stone-800 font-bold mb-0.5">Zero Citation Fabrication</strong>
                Uses reviewed agronomic research and never invents fake citations or decrees.
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-stone-100 p-4 border-t border-stone-200 flex items-center justify-between text-xs text-stone-500">
          <span className="font-mono">GIRMAIC EarthWise AI v0.1</span>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-emerald-900 hover:bg-emerald-950 text-amber-300 font-bold rounded-xl transition-colors"
          >
            Close Dialog
          </button>
        </div>
      </div>
    </div>
  );
};
