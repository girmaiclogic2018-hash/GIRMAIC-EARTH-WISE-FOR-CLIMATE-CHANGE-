'use client';

import React, { useState, useEffect } from 'react';
import { WeatherDataPayload } from '@/lib/demonstration-data';
import { SupportedLanguage, UI_TRANSLATIONS } from '@/lib/translations';
import { Sparkles, ShieldAlert, AlertTriangle, RefreshCw, CheckCircle, Info, UserCheck, HelpCircle } from 'lucide-react';

interface ClimateExplanationPanelProps {
  weatherData: WeatherDataPayload;
  language: SupportedLanguage;
}

interface AIAdvisoryResult {
  observedDataSummary: string;
  aiInterpretation: string;
  agronomicalRisks: string[];
  cautiousActionTips: string[];
  uncertaintyRating: 'High Confidence' | 'Moderate Uncertainty' | 'High Uncertainty';
  keyUncertainties: string[];
  daReferralNote: string;
}

export const ClimateExplanationPanel: React.FC<ClimateExplanationPanelProps> = ({
  weatherData,
  language
}) => {
  const t = UI_TRANSLATIONS[language] || UI_TRANSLATIONS.en;

  const [aiResult, setAiResult] = useState<AIAdvisoryResult | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAIExplanation = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/app/api/advisory', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ weatherData, language })
      });

      if (!res.ok) {
        const errJson = await res.json().catch(() => ({}));
        throw new Error(errJson.details || errJson.error || 'Failed to generate AI advisory.');
      }

      const data = await res.json();
      if (data.success && data.explanation) {
        setAiResult(data.explanation);
      } else {
        throw new Error('Invalid advisory response structure received.');
      }
    } catch (err: any) {
      console.warn('AI Advisory endpoint error:', err);
      setError(err.message || 'Unable to connect to Gemini AI explanation service.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let ignore = false;
    const execute = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch('/app/api/advisory', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ weatherData, language })
        });

        if (!res.ok) {
          const errJson = await res.json().catch(() => ({}));
          throw new Error(errJson.details || errJson.error || 'Failed to generate AI advisory.');
        }

        const data = await res.json();
        if (!ignore) {
          if (data.success && data.explanation) {
            setAiResult(data.explanation);
          } else {
            throw new Error('Invalid advisory response structure received.');
          }
        }
      } catch (err: any) {
        if (!ignore) {
          console.warn('AI Advisory endpoint error:', err);
          setError(err.message || 'Unable to connect to Gemini AI explanation service.');
        }
      } finally {
        if (!ignore) setLoading(false);
      }
    };

    execute();
    return () => { ignore = true; };
  }, [weatherData, language]);

  return (
    <div className="bg-white rounded-2xl p-6 border border-emerald-200/80 shadow-md space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-stone-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 bg-gradient-to-br from-amber-500 to-emerald-600 text-white rounded-lg shadow-sm">
              <Sparkles className="w-5 h-5" />
            </span>
            <h2 className="text-xl font-bold text-stone-900">
              {t.aiExplanationHeader}
            </h2>
          </div>
          <p className="text-xs text-stone-500 mt-1">
            Grounded in Gemini AI reasoning, regional atmospheric patterns, and Ethiopian agro-ecological knowledge.
          </p>
        </div>

        <button
          onClick={fetchAIExplanation}
          disabled={loading}
          className="px-3.5 py-2 text-xs font-semibold bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl transition-all shadow-sm flex items-center gap-2 disabled:opacity-50 self-start sm:self-auto"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          <span>{loading ? 'Analyzing Telemetry...' : 'Refresh AI Analysis'}</span>
        </button>
      </div>

      {/* Loading state */}
      {loading && (
        <div className="bg-emerald-50/60 p-8 rounded-2xl border border-emerald-100 text-center space-y-3">
          <div className="w-10 h-10 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-sm font-semibold text-emerald-900">
            Synthesizing weather metrics with crop moisture stress models for {weatherData.location.name}...
          </p>
          <p className="text-xs text-emerald-700">
            Applying Section 4 Responsible AI Disclosures & Cautious Decision Boundaries.
          </p>
        </div>
      )}

      {/* Error state */}
      {error && !loading && (
        <div className="bg-red-50 p-5 rounded-xl border border-red-200 text-red-900 text-xs space-y-3">
          <div className="flex items-center gap-2 text-red-700 font-bold text-sm">
            <AlertTriangle className="w-5 h-5" />
            <span>AI Service Note</span>
          </div>
          <p>{error}</p>
          <p className="text-stone-600">
            You can still inspect the reviewed agronomic rulebook and observed weather metrics in the adjacent tabs.
          </p>
          <button
            onClick={fetchAIExplanation}
            className="px-3 py-1.5 bg-red-800 text-white font-medium rounded-lg hover:bg-red-900 transition-colors"
          >
            Retry AI Synthesis
          </button>
        </div>
      )}

      {/* Rendered AI Explanation Content */}
      {aiResult && !loading && (
        <div className="space-y-6">
          {/* Uncertainty Badge & Data Summary Row */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-stone-50 p-4 rounded-xl border border-stone-200">
            <div className="text-xs text-stone-700 font-medium">
              <strong className="text-stone-900">Observed Basis:</strong> {aiResult.observedDataSummary}
            </div>

            <div className="flex items-center gap-2 whitespace-nowrap">
              <span className="text-xs text-stone-500">Uncertainty Rating:</span>
              <span
                className={`text-xs font-bold px-3 py-1 rounded-full border ${
                  aiResult.uncertaintyRating === 'High Confidence'
                    ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                    : aiResult.uncertaintyRating === 'Moderate Uncertainty'
                    ? 'bg-amber-100 text-amber-900 border-amber-300'
                    : 'bg-orange-100 text-orange-900 border-orange-300'
                }`}
              >
                {aiResult.uncertaintyRating}
              </span>
            </div>
          </div>

          {/* Core AI Explanation */}
          <div className="bg-gradient-to-br from-emerald-950 via-stone-900 to-emerald-950 text-white p-5 rounded-2xl shadow-inner border border-emerald-800/60 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-300">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Climate & Agro-Ecological Explanation</span>
            </div>
            <p className="text-sm leading-relaxed text-emerald-50">
              {aiResult.aiInterpretation}
            </p>
          </div>

          {/* Risks & Action Tips Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Agronomical Risks */}
            <div className="bg-amber-50/70 p-4 rounded-2xl border border-amber-200 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-950 uppercase tracking-wider">
                <ShieldAlert className="w-4 h-4 text-amber-700" />
                <span>Identified Agronomic Risks</span>
              </div>
              <ul className="space-y-2 text-xs text-stone-800">
                {aiResult.agronomicalRisks.map((risk, idx) => (
                  <li key={idx} className="flex items-start gap-2 bg-white/80 p-2.5 rounded-lg border border-amber-100">
                    <span className="text-amber-600 font-bold">•</span>
                    <span>{risk}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Cautious Action Tips */}
            <div className="bg-emerald-50/70 p-4 rounded-2xl border border-emerald-200 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-950 uppercase tracking-wider">
                <CheckCircle className="w-4 h-4 text-emerald-700" />
                <span>Cautious Moisture & Field Tips</span>
              </div>
              <ul className="space-y-2 text-xs text-stone-800">
                {aiResult.cautiousActionTips.map((tip, idx) => (
                  <li key={idx} className="flex items-start gap-2 bg-white/80 p-2.5 rounded-lg border border-emerald-100">
                    <span className="text-emerald-600 font-bold">✓</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Key Uncertainties & Unknowns */}
          <div className="bg-stone-50 p-4 rounded-xl border border-stone-200 space-y-2 text-xs text-stone-700">
            <div className="flex items-center gap-2 font-bold text-stone-900">
              <HelpCircle className="w-4 h-4 text-stone-600" />
              <span>Unmeasured Variables & Climate Limits</span>
            </div>
            <ul className="list-disc list-inside space-y-1 text-stone-600">
              {aiResult.keyUncertainties.map((u, idx) => (
                <li key={idx}>{u}</li>
              ))}
            </ul>
          </div>

          {/* Mandatory Development Agent (DA) Referral Box */}
          <div className="bg-gradient-to-r from-amber-500/10 via-amber-500/20 to-amber-500/10 border-l-4 border-amber-600 p-4 rounded-r-xl border border-amber-200 flex items-start gap-3">
            <UserCheck className="w-6 h-6 text-amber-800 shrink-0 mt-0.5" />
            <div className="text-xs text-amber-950 space-y-1">
              <strong className="block font-bold text-amber-900">
                Local Agricultural Officer Referral Notice
              </strong>
              <p>{aiResult.daReferralNote || t.consultDA}</p>
              <p className="text-[11px] text-amber-800 italic font-mono mt-1">
                {t.guaranteeWarning}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Responsible AI Transparency Footer */}
      <div className="pt-3 border-t border-stone-100 text-[11px] text-stone-500 flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5">
          <Info className="w-3.5 h-3.5 text-stone-400" />
          <span>{t.aiDisclaimerNote}</span>
        </div>
      </div>
    </div>
  );
};
