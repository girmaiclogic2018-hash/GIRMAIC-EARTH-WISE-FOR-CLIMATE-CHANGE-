'use client';

import React, { useState } from 'react';
import { REVIEWED_AGRONOMIC_KNOWLEDGE, CropGuidanceRule } from '@/lib/agronomic-knowledge';
import { SupportedLanguage, UI_TRANSLATIONS } from '@/lib/translations';
import { Sprout, ShieldAlert, BookOpen, Layers, Droplet, Bug, Sun, AlertTriangle, CheckCircle2 } from 'lucide-react';

interface AgriculturalGuidancePanelProps {
  language: SupportedLanguage;
  selectedCropHint?: string;
}

export const AgriculturalGuidancePanel: React.FC<AgriculturalGuidancePanelProps> = ({
  language,
  selectedCropHint
}) => {
  const t = UI_TRANSLATIONS[language] || UI_TRANSLATIONS.en;

  const crops = Object.keys(REVIEWED_AGRONOMIC_KNOWLEDGE.cropGuidance);
  const [activeCropKey, setActiveCropKey] = useState<string>(crops[0]);

  const activeGuidance: CropGuidanceRule = REVIEWED_AGRONOMIC_KNOWLEDGE.cropGuidance[activeCropKey];

  return (
    <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-md space-y-6">
      {/* Panel Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-stone-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 bg-emerald-700 text-white rounded-lg shadow-sm">
              <Sprout className="w-5 h-5" />
            </span>
            <h2 className="text-xl font-bold text-stone-900">
              {t.navAgronomy}
            </h2>
          </div>
          <p className="text-xs text-stone-500 mt-1">
            Grounded in reviewed Ethiopian Institute of Agricultural Research (EIAR) & Agricultural Transformation Institute (ATI) frameworks.
          </p>
        </div>

        <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200">
          <BookOpen className="w-4 h-4 text-emerald-600" />
          <span>Reviewed Knowledge Base</span>
        </div>
      </div>

      {/* General Rules Box */}
      <div className="bg-stone-50 p-4 rounded-xl border border-stone-200 space-y-2">
        <h3 className="text-xs font-bold uppercase tracking-wider text-stone-700 flex items-center gap-1.5">
          <Layers className="w-4 h-4 text-emerald-700" />
          <span>General Agro-Ecological Principles for Ethiopian Smallholders</span>
        </h3>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-stone-700 mt-2">
          {REVIEWED_AGRONOMIC_KNOWLEDGE.generalRules.map((rule, idx) => (
            <li key={idx} className="flex items-start gap-2 bg-white p-2.5 rounded-lg border border-stone-200">
              <span className="text-emerald-700 font-bold">▪</span>
              <span>{rule}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Crop Selection Tabs */}
      <div className="space-y-3">
        <label className="block text-xs font-bold uppercase tracking-wider text-stone-500">
          Select Crop for Specialized Guidance:
        </label>
        <div className="flex flex-wrap gap-2">
          {crops.map((cropKey) => {
            const crop = REVIEWED_AGRONOMIC_KNOWLEDGE.cropGuidance[cropKey];
            const isActive = activeCropKey === cropKey;
            return (
              <button
                key={cropKey}
                onClick={() => setActiveCropKey(cropKey)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                  isActive
                    ? 'bg-emerald-900 text-amber-300 shadow-md ring-2 ring-emerald-700'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                }`}
              >
                <Sprout className={`w-3.5 h-3.5 ${isActive ? 'text-amber-300' : 'text-emerald-700'}`} />
                <span>{crop.cropName} ({crop.amharicName})</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Crop Guidance Details Card */}
      {activeGuidance && (
        <div className="bg-gradient-to-br from-stone-900 via-emerald-950 to-stone-900 text-white p-6 rounded-2xl shadow-xl space-y-5 border border-emerald-800">
          <div className="flex items-center justify-between border-b border-emerald-800/80 pb-3">
            <div>
              <span className="text-xs uppercase font-bold text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/30">
                {activeGuidance.seasonContext}
              </span>
              <h3 className="text-xl font-bold text-white mt-1">
                {activeGuidance.cropName} <span className="text-emerald-300 font-normal">({activeGuidance.amharicName})</span>
              </h3>
            </div>
            <span className="text-xs text-stone-400 font-mono">
              EIAR Baseline Advisory
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            {/* Sowing Advice */}
            <div className="bg-stone-800/70 p-4 rounded-xl border border-stone-700 space-y-1.5">
              <div className="flex items-center gap-2 text-amber-300 font-bold uppercase">
                <Sprout className="w-4 h-4 text-amber-400" />
                <span>Seedbed & Sowing Window</span>
              </div>
              <p className="text-stone-200 leading-relaxed">
                {activeGuidance.sowingWindowAdvice}
              </p>
            </div>

            {/* Moisture Management */}
            <div className="bg-stone-800/70 p-4 rounded-xl border border-stone-700 space-y-1.5">
              <div className="flex items-center gap-2 text-sky-300 font-bold uppercase">
                <Droplet className="w-4 h-4 text-sky-400" />
                <span>Moisture Conservation & Drainage</span>
              </div>
              <p className="text-stone-200 leading-relaxed">
                {activeGuidance.moistureManagement}
              </p>
            </div>

            {/* Pest & Disease */}
            <div className="bg-stone-800/70 p-4 rounded-xl border border-stone-700 space-y-1.5">
              <div className="flex items-center gap-2 text-rose-300 font-bold uppercase">
                <Bug className="w-4 h-4 text-rose-400" />
                <span>Pest & Disease Scouting</span>
              </div>
              <p className="text-stone-200 leading-relaxed">
                {activeGuidance.pestDiseaseWatch}
              </p>
            </div>

            {/* Harvest & Drying */}
            <div className="bg-stone-800/70 p-4 rounded-xl border border-stone-700 space-y-1.5">
              <div className="flex items-center gap-2 text-amber-300 font-bold uppercase">
                <Sun className="w-4 h-4 text-amber-400" />
                <span>Harvest Drying & Airtight Storage</span>
              </div>
              <p className="text-stone-200 leading-relaxed">
                {activeGuidance.harvestingStorageAdvice}
              </p>
            </div>
          </div>

          {/* Cautionary Warning */}
          <div className="bg-amber-500/20 border border-amber-500/40 p-3.5 rounded-xl text-xs text-amber-200 flex items-start gap-2.5">
            <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <strong className="block text-amber-300 font-bold uppercase">Agro-Ecological Cautionary Note</strong>
              <p>{activeGuidance.cautionaryWarning}</p>
            </div>
          </div>
        </div>
      )}

      {/* Disclaimers Footer */}
      <div className="bg-stone-50 p-4 rounded-xl border border-stone-200 text-xs text-stone-600 space-y-1">
        <strong className="block text-stone-800 font-bold">Standard Non-Guarantee & Governance Note:</strong>
        <ul className="list-disc list-inside space-y-1 text-stone-500">
          {REVIEWED_AGRONOMIC_KNOWLEDGE.disclaimers.map((disc, idx) => (
            <li key={idx}>{disc}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};
