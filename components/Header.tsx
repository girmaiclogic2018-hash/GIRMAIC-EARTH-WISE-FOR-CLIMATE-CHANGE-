'use client';

import React from 'react';
import { SupportedLanguage, SUPPORTED_LANGUAGES, UI_TRANSLATIONS } from '@/lib/translations';
import { WeatherFetchMode } from '@/lib/weather-service';
import { Sprout, Globe2, Info, ShieldAlert, Sparkles, SlidersHorizontal, User } from 'lucide-react';

interface HeaderProps {
  language: SupportedLanguage;
  onLanguageChange: (lang: SupportedLanguage) => void;
  fetchMode: WeatherFetchMode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenAbout: () => void;
  onOpenPrivacy: () => void;
  onOpenTestRoom: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  language,
  onLanguageChange,
  fetchMode,
  activeTab,
  setActiveTab,
  onOpenAbout,
  onOpenPrivacy,
  onOpenTestRoom
}) => {
  const t = UI_TRANSLATIONS[language] || UI_TRANSLATIONS.en;

  return (
    <header className="bg-emerald-950 text-stone-100 border-b border-emerald-800/60 sticky top-0 z-30 shadow-md">
      {/* Top micro banner with founder attribution */}
      <div className="bg-emerald-900/80 px-4 py-1.5 text-xs border-b border-emerald-800/40 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2 font-medium text-emerald-200">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>GIRMAIC EarthWise AI — Version 0.1 Prototype</span>
          <span className="hidden sm:inline text-emerald-400/60">|</span>
          <span className="hidden sm:inline text-amber-300 flex items-center gap-1">
            <User className="w-3 h-3 inline" /> {t.founderCredit}
          </span>
        </div>

        <div className="flex items-center gap-3 ml-auto text-xs">
          <button
            onClick={onOpenAbout}
            className="text-emerald-200 hover:text-amber-300 transition-colors flex items-center gap-1 underline underline-offset-2"
          >
            <Info className="w-3.5 h-3.5" />
            <span>About Project</span>
          </button>
          <button
            onClick={onOpenPrivacy}
            className="text-emerald-200 hover:text-amber-300 transition-colors hidden md:inline underline underline-offset-2"
          >
            Privacy Notice
          </button>
          <button
            onClick={onOpenTestRoom}
            className="bg-amber-500/20 text-amber-300 border border-amber-500/40 px-2 py-0.5 rounded hover:bg-amber-500/30 transition-colors flex items-center gap-1 font-mono text-[11px]"
            title="Open Developer & Evaluator Test Suite"
          >
            <SlidersHorizontal className="w-3 h-3" />
            <span>Test Suite</span>
          </button>
        </div>
      </div>

      {/* Main Header Container */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-600 to-amber-600 flex items-center justify-center text-white shadow-inner font-bold text-xl border border-emerald-400/30">
            <Sprout className="w-6 h-6 text-amber-200" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
              {t.appTitle}
            </h1>
            <p className="text-xs text-emerald-300/90 max-w-lg line-clamp-1">
              {t.appSubtitle}
            </p>
          </div>
        </div>

        {/* Right side controls: Language Selector & Mode Indicator */}
        <div className="flex items-center gap-3 justify-between md:justify-end">
          {/* Language selector */}
          <div className="flex items-center gap-1.5 bg-emerald-900/60 border border-emerald-700/50 rounded-lg p-1 text-xs">
            <Globe2 className="w-3.5 h-3.5 text-emerald-300 ml-1" />
            {SUPPORTED_LANGUAGES.map((lang) => (
              <button
                key={lang.code}
                onClick={() => onLanguageChange(lang.code)}
                className={`px-2 py-1 rounded transition-all font-medium ${
                  language === lang.code
                    ? 'bg-amber-500 text-stone-950 shadow-sm font-semibold'
                    : 'text-emerald-200 hover:text-white hover:bg-emerald-800/50'
                }`}
                title={lang.label}
              >
                <span>{lang.nativeName}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Navigation Tabs Bar */}
      <div className="bg-emerald-900/90 border-t border-emerald-800/80 px-4 overflow-x-auto scrollbar-none">
        <div className="max-w-7xl mx-auto flex items-center gap-1 py-1 text-xs font-medium">
          {[
            { id: 'overview', label: t.navOverview, icon: Sprout },
            { id: 'weather', label: t.navWeather, icon: Globe2 },
            { id: 'climate_ai', label: t.navClimateAI, icon: Sparkles },
            { id: 'agronomy', label: t.navAgronomy, icon: Sprout },
            { id: 'quality', label: t.navDataQuality, icon: ShieldAlert },
            { id: 'feedback', label: t.navFeedback, icon: Info }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-md whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-amber-500 text-stone-950 font-semibold shadow'
                    : 'text-emerald-200 hover:text-white hover:bg-emerald-800/60'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-stone-950' : 'text-emerald-300'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
