'use client';

import React from 'react';
import { WeatherFetchMode } from '@/lib/weather-service';
import { SupportedLanguage, UI_TRANSLATIONS } from '@/lib/translations';
import { AlertTriangle, CheckCircle2, Radio, Clock, ShieldAlert, RefreshCw } from 'lucide-react';

interface ModeBannerProps {
  mode: WeatherFetchMode;
  language: SupportedLanguage;
  onModeChange: (newMode: WeatherFetchMode) => void;
  isRefreshing?: boolean;
  onRefreshData?: () => void;
}

export const ModeBanner: React.FC<ModeBannerProps> = ({
  mode,
  language,
  onModeChange,
  isRefreshing,
  onRefreshData
}) => {
  const t = UI_TRANSLATIONS[language] || UI_TRANSLATIONS.en;

  if (mode === 'open_meteo_live') {
    return (
      <div className="bg-emerald-900/10 border-l-4 border-emerald-600 p-4 rounded-r-xl border border-emerald-200/60 shadow-sm text-stone-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
        <div className="flex items-start gap-3">
          <div className="p-2 bg-emerald-100 rounded-lg text-emerald-700 mt-0.5">
            <Radio className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-emerald-950 text-sm">{t.liveBadge}</span>
              <span className="text-[10px] font-semibold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full border border-emerald-300">
                Open-Meteo Global Sync
              </span>
            </div>
            <p className="text-xs text-stone-600 mt-0.5">
              Fetching active atmospheric observations and 7-day numerical weather predictions for your selected location.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto justify-end">
          {onRefreshData && (
            <button
              onClick={onRefreshData}
              disabled={isRefreshing}
              className="px-3 py-1.5 text-xs font-medium bg-emerald-800 hover:bg-emerald-900 text-white rounded-lg transition-colors flex items-center gap-1.5 shadow-sm disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
              <span>Refresh Feed</span>
            </button>
          )}
          <button
            onClick={() => onModeChange('demonstration')}
            className="px-3 py-1.5 text-xs font-medium bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-300 rounded-lg transition-colors"
          >
            Switch to Demo Benchmark
          </button>
        </div>
      </div>
    );
  }

  if (mode === 'simulated_stale') {
    return (
      <div className="bg-amber-500/10 border-l-4 border-amber-600 p-4 rounded-r-xl border border-amber-300/80 shadow-sm text-amber-950 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
        <div className="flex items-start gap-3">
          <div className="p-2 bg-amber-100 text-amber-800 rounded-lg">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <span className="font-bold text-sm text-amber-900 flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-amber-600" />
              {t.staleBadge}
            </span>
            <p className="text-xs text-amber-800/90 mt-0.5">
              TEST MODE ACTIVE: Data timestamp is over 48 hours old. The Data Quality Inspector flags this risk automatically.
            </p>
          </div>
        </div>
        <button
          onClick={() => onModeChange('demonstration')}
          className="px-3 py-1.5 text-xs font-medium bg-amber-800 text-white rounded-lg hover:bg-amber-900 transition-colors whitespace-nowrap"
        >
          Reset to Demo Mode
        </button>
      </div>
    );
  }

  if (mode === 'simulated_missing') {
    return (
      <div className="bg-orange-500/10 border-l-4 border-orange-600 p-4 rounded-r-xl border border-orange-300/80 shadow-sm text-orange-950 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
        <div className="flex items-start gap-3">
          <div className="p-2 bg-orange-100 text-orange-800 rounded-lg">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <span className="font-bold text-sm text-orange-950">{t.missingBadge}</span>
            <p className="text-xs text-orange-900/90 mt-0.5">
              TEST MODE ACTIVE: Topsoil moisture and relative humidity sensors are unmonitored for this simulation.
            </p>
          </div>
        </div>
        <button
          onClick={() => onModeChange('demonstration')}
          className="px-3 py-1.5 text-xs font-medium bg-orange-800 text-white rounded-lg hover:bg-orange-900 transition-colors whitespace-nowrap"
        >
          Reset to Demo Mode
        </button>
      </div>
    );
  }

  // Default: Demonstration Mode
  return (
    <div className="bg-amber-500/10 border-l-4 border-amber-500 p-4 rounded-r-xl border border-amber-200 shadow-sm text-stone-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
      <div className="flex items-start gap-3">
        <div className="p-2 bg-amber-100 text-amber-800 rounded-lg mt-0.5">
          <AlertTriangle className="w-5 h-5 text-amber-700" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="font-bold text-amber-950 text-sm">{t.demoBadge}</span>
            <span className="text-[10px] font-semibold bg-amber-200/80 text-amber-900 px-2 py-0.5 rounded-full border border-amber-300">
              Benchmark Reference Mode
            </span>
          </div>
          <p className="text-xs text-stone-600 mt-0.5">
            You are viewing static demonstration data for interface evaluation. No live satellite connection is used in this mode.
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 w-full md:w-auto justify-end">
        <button
          onClick={() => onModeChange('open_meteo_live')}
          className="px-3.5 py-1.5 text-xs font-semibold bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg transition-all flex items-center gap-1.5 shadow-sm"
        >
          <Radio className="w-3.5 h-3.5 text-emerald-300 animate-pulse" />
          <span>Connect Live API</span>
        </button>
      </div>
    </div>
  );
};
