'use client';

import React from 'react';
import { X, ShieldCheck, Lock, EyeOff, Server, Info } from 'lucide-react';

interface PrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivacyModal: React.FC<PrivacyModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-stone-950/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-xl w-full border border-stone-200 shadow-2xl overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-emerald-950 text-white p-6 relative flex items-center justify-between border-b border-emerald-800">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-800 text-amber-300 rounded-xl">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Privacy & Security Notice</h2>
              <p className="text-xs text-emerald-300 font-mono">GIRMAIC EarthWise AI v0.1 Policy</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4 text-xs text-stone-700 leading-relaxed max-h-[70vh] overflow-y-auto">
          <div className="bg-stone-50 p-4 rounded-xl border border-stone-200 space-y-2">
            <h3 className="font-bold text-stone-900 text-sm flex items-center gap-2">
              <EyeOff className="w-4 h-4 text-emerald-700" />
              <span>1. Zero Precise Location Tracking</span>
            </h3>
            <p>
              GIRMAIC EarthWise AI v0.1 does not request or track precise GPS coordinates, IP locations, or mobile device telemetry. All region selections are made explicitly via preset agricultural woreda dropdowns.
            </p>
          </div>

          <div className="bg-stone-50 p-4 rounded-xl border border-stone-200 space-y-2">
            <h3 className="font-bold text-stone-900 text-sm flex items-center gap-2">
              <Lock className="w-4 h-4 text-amber-600" />
              <span>2. Credential & API Key Protection</span>
            </h3>
            <p>
              All AI model credentials (e.g. Gemini API keys) are held strictly on the server backend environment (<code className="bg-stone-200 px-1 py-0.5 rounded text-[11px] font-mono">process.env.GEMINI_API_KEY</code>). No API keys or credentials are ever exposed to the client browser.
            </p>
          </div>

          <div className="bg-stone-50 p-4 rounded-xl border border-stone-200 space-y-2">
            <h3 className="font-bold text-stone-900 text-sm flex items-center gap-2">
              <Server className="w-4 h-4 text-indigo-700" />
              <span>3. No Accounts, Payments, or Private Profiling</span>
            </h3>
            <p>
              Version 0.1 collects no personal identifiers, names, phone numbers, or passwords. No payment processing, public registration, or advertisement tracking exists in this applet.
            </p>
          </div>

          <div className="bg-amber-50 p-4 rounded-xl border border-amber-200 text-amber-900 space-y-1">
            <strong className="block font-bold">4. Voluntary Feedback Submissions:</strong>
            <p className="text-[11px]">
              Feedback ratings and comments submitted via the Feedback panel are strictly optional and stored solely to improve prompt engineering and UI clarity.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-stone-100 p-4 border-t border-stone-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-emerald-900 hover:bg-emerald-950 text-amber-300 font-bold text-xs rounded-xl transition-colors"
          >
            Acknowledge Privacy Notice
          </button>
        </div>
      </div>
    </div>
  );
};
