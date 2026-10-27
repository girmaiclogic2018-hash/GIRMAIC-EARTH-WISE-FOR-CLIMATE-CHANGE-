'use client';

import React from 'react';
import { EthiopianLocation, ETHIOPIAN_PILOT_LOCATIONS } from '@/lib/ethiopia-locations';
import { SupportedLanguage, UI_TRANSLATIONS } from '@/lib/translations';
import { MapPin, Mountain, Wheat, Calendar, Layers, Compass } from 'lucide-react';

interface LocationSelectorProps {
  selectedLocation: EthiopianLocation;
  onSelectLocation: (loc: EthiopianLocation) => void;
  language: SupportedLanguage;
}

export const LocationSelector: React.FC<LocationSelectorProps> = ({
  selectedLocation,
  onSelectLocation,
  language
}) => {
  const t = UI_TRANSLATIONS[language] || UI_TRANSLATIONS.en;

  const getLocationDisplayName = (loc: EthiopianLocation) => {
    switch (language) {
      case 'am': return loc.amharicName || loc.name;
      case 'om': return loc.oromooName || loc.name;
      case 'ti': return loc.tigrinyaName || loc.name;
      default: return loc.name;
    }
  };

  return (
    <div className="bg-white rounded-2xl p-5 border border-stone-200 shadow-sm transition-all hover:border-emerald-200">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        {/* Dropdown Selector */}
        <div className="flex-1">
          <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-emerald-700" />
            <span>{t.selectLocationLabel}</span>
          </label>
          <div className="relative">
            <select
              value={selectedLocation.id}
              onChange={(e) => {
                const found = ETHIOPIAN_PILOT_LOCATIONS.find((l) => l.id === e.target.value);
                if (found) onSelectLocation(found);
              }}
              className="w-full bg-stone-50 text-stone-900 font-semibold text-base py-3 px-4 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent transition-all shadow-inner appearance-none cursor-pointer"
            >
              {ETHIOPIAN_PILOT_LOCATIONS.map((loc) => (
                <option key={loc.id} value={loc.id}>
                  {getLocationDisplayName(loc)} — {loc.region} ({loc.woreda})
                </option>
              ))}
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-stone-500">
              ▼
            </div>
          </div>
        </div>

        {/* Location Info Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 flex-1">
          {/* Agro zone */}
          <div className="bg-emerald-50/80 p-3 rounded-xl border border-emerald-100">
            <div className="flex items-center gap-1.5 text-xs font-medium text-emerald-800 mb-0.5">
              <Mountain className="w-3.5 h-3.5 text-emerald-600" />
              <span>{t.currentAgroZone}</span>
            </div>
            <span className="text-xs font-bold text-emerald-950 block">
              {selectedLocation.agroZone}
            </span>
            <span className="text-[10px] text-emerald-700 font-mono">
              Elev. {selectedLocation.elevationMeters}m
            </span>
          </div>

          {/* Primary Crops */}
          <div className="bg-amber-50/80 p-3 rounded-xl border border-amber-100">
            <div className="flex items-center gap-1.5 text-xs font-medium text-amber-800 mb-0.5">
              <Wheat className="w-3.5 h-3.5 text-amber-600" />
              <span>{t.primaryCropsLabel}</span>
            </div>
            <span className="text-xs font-bold text-amber-950 line-clamp-1 block">
              {selectedLocation.primaryCrops.slice(0, 3).join(', ')}
            </span>
            <span className="text-[10px] text-amber-700">
              {selectedLocation.primaryCrops.length} key crops monitored
            </span>
          </div>

          {/* Seasonal Context */}
          <div className="bg-sky-50/80 p-3 rounded-xl border border-sky-100 col-span-2 sm:col-span-1">
            <div className="flex items-center gap-1.5 text-xs font-medium text-sky-800 mb-0.5">
              <Calendar className="w-3.5 h-3.5 text-sky-600" />
              <span>{t.seasonContextLabel}</span>
            </div>
            <span className="text-xs font-bold text-sky-950 block">
              {selectedLocation.currentSeasonContext}
            </span>
            <span className="text-[10px] text-sky-700 font-mono">
              {selectedLocation.latitude.toFixed(2)}°N, {selectedLocation.longitude.toFixed(2)}°E
            </span>
          </div>
        </div>
      </div>

      <div className="mt-3 pt-3 border-t border-stone-100 text-xs text-stone-600 flex items-center justify-between">
        <p className="italic">{selectedLocation.description}</p>
        <div className="flex items-center gap-1 font-mono text-[10px] text-stone-400 bg-stone-100 px-2 py-0.5 rounded">
          <Compass className="w-3 h-3" />
          <span>Kebele Grid ID: ETH-{selectedLocation.id.toUpperCase()}</span>
        </div>
      </div>
    </div>
  );
};
