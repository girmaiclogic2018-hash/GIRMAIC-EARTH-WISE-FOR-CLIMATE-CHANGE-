'use client';

import React from 'react';
import { WeatherDataPayload } from '@/lib/demonstration-data';
import { SupportedLanguage, UI_TRANSLATIONS } from '@/lib/translations';
import { ShieldAlert, Clock, CheckCircle2, AlertTriangle, Database, Activity, FileSearch, Server } from 'lucide-react';

interface DataQualityInspectorProps {
  weatherData: WeatherDataPayload;
  language: SupportedLanguage;
}

export const DataQualityInspector: React.FC<DataQualityInspectorProps> = ({ weatherData, language }) => {
  const t = UI_TRANSLATIONS[language] || UI_TRANSLATIONS.en;

  const now = new Date();
  const fetchedTime = new Date(weatherData.fetchedAtIso);
  const ageInHours = Math.round((now.getTime() - fetchedTime.getTime()) / (1000 * 3600));

  const isStale = ageInHours > 24;

  return (
    <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-md space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-stone-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 bg-stone-900 text-amber-300 rounded-lg shadow-sm">
              <FileSearch className="w-5 h-5" />
            </span>
            <h2 className="text-xl font-bold text-stone-900">
              {t.navDataQuality}
            </h2>
          </div>
          <p className="text-xs text-stone-500 mt-1">
            Transparently audit data freshness, missing atmospheric variables, and provider confidence scores.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-stone-500">Quality Index:</span>
          <span
            className={`text-sm font-extrabold px-3 py-1 rounded-full border ${
              weatherData.qualityConfidenceScore >= 85
                ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                : weatherData.qualityConfidenceScore >= 60
                ? 'bg-amber-100 text-amber-900 border-amber-300'
                : 'bg-red-100 text-red-900 border-red-300'
            }`}
          >
            {weatherData.qualityConfidenceScore} / 100
          </span>
        </div>
      </div>

      {/* Primary Audit Matrix Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Freshness Audit */}
        <div className={`p-4 rounded-xl border space-y-2 ${isStale ? 'bg-amber-50 border-amber-300' : 'bg-emerald-50/70 border-emerald-200'}`}>
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-700 flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-emerald-700" />
              <span>Data Freshness</span>
            </span>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${isStale ? 'bg-amber-200 text-amber-900' : 'bg-emerald-200 text-emerald-900'}`}>
              {isStale ? 'STALE (>24h)' : 'FRESH'}
            </span>
          </div>

          <div className="text-sm font-bold text-stone-900">
            {ageInHours <= 0 ? 'Less than 1 hour ago' : `${ageInHours} hours old`}
          </div>
          <p className="text-xs text-stone-600 font-mono">
            Timestamp: {fetchedTime.toISOString()}
          </p>

          {isStale && (
            <p className="text-xs text-amber-800 font-medium mt-1">
              ⚠️ Warning: Outdated meteorological inputs reduce advisory accuracy.
            </p>
          )}
        </div>

        {/* Missing Fields Audit */}
        <div className={`p-4 rounded-xl border space-y-2 ${weatherData.missingFields.length > 0 ? 'bg-orange-50 border-orange-300' : 'bg-emerald-50/70 border-emerald-200'}`}>
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-700 flex items-center gap-1.5">
              <Activity className="w-4 h-4 text-orange-700" />
              <span>Missing Variables</span>
            </span>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${weatherData.missingFields.length > 0 ? 'bg-orange-200 text-orange-900' : 'bg-emerald-200 text-emerald-900'}`}>
              {weatherData.missingFields.length} Missing
            </span>
          </div>

          {weatherData.missingFields.length === 0 ? (
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 pt-1">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>{t.allFieldsPresent}</span>
            </div>
          ) : (
            <div className="space-y-1">
              <p className="text-xs text-orange-900 font-bold">Unmonitored / Missing Parameters:</p>
              <ul className="list-disc list-inside text-xs text-orange-800 font-mono">
                {weatherData.missingFields.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Data Provider Audit */}
        <div className="p-4 rounded-xl border bg-stone-50 border-stone-200 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-700 flex items-center gap-1.5">
              <Server className="w-4 h-4 text-indigo-700" />
              <span>Data Provider</span>
            </span>
            <span className="text-[10px] font-bold bg-stone-200 text-stone-800 px-2 py-0.5 rounded font-mono">
              {weatherData.providerType}
            </span>
          </div>

          <div className="text-xs font-bold text-stone-900">
            {weatherData.providerName}
          </div>
          <p className="text-[11px] text-stone-500">
            {weatherData.isDemonstrationMode
              ? 'Static benchmark payload used for testing UI flows.'
              : 'Live open meteorological telemetry synced with Ethiopian coordinates.'}
          </p>
        </div>
      </div>

      {/* Detailed Field Audit Table */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold text-stone-900 flex items-center gap-2">
          <Database className="w-4 h-4 text-emerald-700" />
          <span>Telemetry Field Integrity Verification</span>
        </h3>

        <div className="overflow-x-auto rounded-xl border border-stone-200">
          <table className="w-full text-left text-xs text-stone-800">
            <thead className="bg-stone-100 text-stone-700 font-semibold border-b border-stone-200">
              <tr>
                <th className="p-3">Variable Name</th>
                <th className="p-3">Observed Value</th>
                <th className="p-3">Audit Status</th>
                <th className="p-3">Confidence Impact</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              <tr>
                <td className="p-3 font-medium">Ambient Temperature (°C)</td>
                <td className="p-3 font-mono">{weatherData.current.tempCelsius}°C</td>
                <td className="p-3 text-emerald-700 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Verified
                </td>
                <td className="p-3 text-stone-500">High Reliability</td>
              </tr>
              <tr>
                <td className="p-3 font-medium">Precipitation Accumulation (mm)</td>
                <td className="p-3 font-mono">{weatherData.current.precipitationMm} mm</td>
                <td className="p-3 text-emerald-700 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Verified
                </td>
                <td className="p-3 text-stone-500">Subject to local topography</td>
              </tr>
              <tr>
                <td className="p-3 font-medium">Topsoil Moisture (m³/m³)</td>
                <td className="p-3 font-mono">
                  {weatherData.current.soilMoistureRatio !== undefined
                    ? `${weatherData.current.soilMoistureRatio} m³/m³`
                    : <span className="text-red-600 font-bold">MISSING</span>}
                </td>
                <td className="p-3">
                  {weatherData.current.soilMoistureRatio !== undefined ? (
                    <span className="text-emerald-700 font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Measured
                    </span>
                  ) : (
                    <span className="text-red-600 font-bold flex items-center gap-1">
                      <AlertTriangle className="w-3.5 h-3.5" /> Unmonitored
                    </span>
                  )}
                </td>
                <td className="p-3 text-stone-500">
                  {weatherData.current.soilMoistureRatio !== undefined
                    ? 'Root zone model active'
                    : 'Reduces soil dryness precision (-15 points)'}
                </td>
              </tr>
              <tr>
                <td className="p-3 font-medium">Relative Humidity (%)</td>
                <td className="p-3 font-mono">
                  {weatherData.current.relativeHumidity ? `${weatherData.current.relativeHumidity}%` : <span className="text-red-600 font-bold">MISSING</span>}
                </td>
                <td className="p-3">
                  {weatherData.current.relativeHumidity ? (
                    <span className="text-emerald-700 font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Verified
                    </span>
                  ) : (
                    <span className="text-red-600 font-bold flex items-center gap-1">
                      <AlertTriangle className="w-3.5 h-3.5" /> Missing
                    </span>
                  )}
                </td>
                <td className="p-3 text-stone-500">Required for crop rust risk analysis</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
