'use client';

import React from 'react';
import { WeatherDataPayload } from '@/lib/demonstration-data';
import { SupportedLanguage, UI_TRANSLATIONS } from '@/lib/translations';
import { Thermometer, CloudRain, Droplets, Wind, Waves, Calendar, Clock, Database, CheckCircle2, AlertCircle } from 'lucide-react';

interface WeatherPanelProps {
  weatherData: WeatherDataPayload;
  language: SupportedLanguage;
}

export const WeatherPanel: React.FC<WeatherPanelProps> = ({ weatherData, language }) => {
  const t = UI_TRANSLATIONS[language] || UI_TRANSLATIONS.en;
  const { current, dailyForecast, location } = weatherData;

  const formattedDate = new Date(weatherData.fetchedAtIso).toLocaleString('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short'
  });

  return (
    <div className="space-y-6">
      {/* Primary Weather Telemetry Card */}
      <div className="bg-gradient-to-br from-stone-900 via-emerald-950 to-stone-900 text-white rounded-2xl p-6 shadow-xl border border-emerald-800/50 relative overflow-hidden">
        {/* Background ambient shine */}
        <div className="absolute -right-10 -bottom-10 w-60 h-60 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-emerald-800/60 pb-5">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase font-bold text-amber-400 tracking-wider bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/30">
                {location.region} • {location.woreda}
              </span>
              <span className="text-xs text-stone-400 font-mono">
                {weatherData.isDemonstrationMode ? '[DEMO]' : '[LIVE]'}
              </span>
            </div>
            <h2 className="text-2xl font-bold text-white mt-1">
              {location.name}
            </h2>
            <p className="text-xs text-stone-300 mt-0.5 flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-amber-300" />
              <span>{t.lastUpdated} {formattedDate}</span>
            </p>
          </div>

          <div className="flex items-center gap-3 bg-stone-800/80 px-4 py-2.5 rounded-xl border border-emerald-700/40">
            <div className="p-2 bg-amber-500/20 text-amber-300 rounded-lg">
              <Thermometer className="w-6 h-6" />
            </div>
            <div>
              <span className="text-3xl font-extrabold text-white tracking-tight">
                {current.tempCelsius}°C
              </span>
              <span className="text-xs text-stone-300 block font-mono">
                Min {current.tempMin}°C • Max {current.tempMax}°C
              </span>
            </div>
          </div>
        </div>

        {/* Current Weather Condition Badge */}
        <div className="mt-4 flex items-center justify-between bg-emerald-900/40 px-4 py-2.5 rounded-xl border border-emerald-700/30">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-sm font-semibold text-emerald-200">
              Condition: {current.weatherConditionText}
            </span>
          </div>
          <span className="text-xs text-emerald-300 font-mono">
            {location.agroZone}
          </span>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-5">
          {/* Rainfall today */}
          <div className="bg-stone-800/60 p-3.5 rounded-xl border border-stone-700/60">
            <div className="flex items-center gap-2 text-sky-400 text-xs font-semibold mb-1">
              <CloudRain className="w-4 h-4" />
              <span>{t.rainLabel}</span>
            </div>
            <span className="text-xl font-bold text-white block">
              {current.precipitationMm} mm
            </span>
            <span className="text-[11px] text-stone-400 block mt-0.5 font-mono">
              Prob: {current.precipitationProbability}%
            </span>
          </div>

          {/* Topsoil Moisture */}
          <div className="bg-stone-800/60 p-3.5 rounded-xl border border-stone-700/60">
            <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold mb-1">
              <Waves className="w-4 h-4" />
              <span>{t.soilMoistureLabel}</span>
            </div>
            <span className="text-xl font-bold text-white block">
              {current.soilMoistureRatio !== undefined ? `${current.soilMoistureRatio} m³/m³` : 'Unmonitored'}
            </span>
            <span className="text-[11px] text-stone-400 block mt-0.5">
              Upper 0-7 cm layer
            </span>
          </div>

          {/* Humidity */}
          <div className="bg-stone-800/60 p-3.5 rounded-xl border border-stone-700/60">
            <div className="flex items-center gap-2 text-teal-400 text-xs font-semibold mb-1">
              <Droplets className="w-4 h-4" />
              <span>{t.humidityLabel}</span>
            </div>
            <span className="text-xl font-bold text-white block">
              {current.relativeHumidity ? `${current.relativeHumidity}%` : 'N/A'}
            </span>
            <span className="text-[11px] text-stone-400 block mt-0.5">
              Relative humidity
            </span>
          </div>

          {/* Wind Speed */}
          <div className="bg-stone-800/60 p-3.5 rounded-xl border border-stone-700/60">
            <div className="flex items-center gap-2 text-indigo-400 text-xs font-semibold mb-1">
              <Wind className="w-4 h-4" />
              <span>{t.windLabel}</span>
            </div>
            <span className="text-xl font-bold text-white block">
              {current.windSpeedKmH} km/h
            </span>
            <span className="text-[11px] text-stone-400 block mt-0.5">
              Surface wind (10m)
            </span>
          </div>
        </div>
      </div>

      {/* 7-Day Forecast Section */}
      <div className="bg-white rounded-2xl p-5 border border-stone-200 shadow-sm">
        <div className="flex items-center justify-between mb-4 pb-2 border-b border-stone-100">
          <h3 className="text-base font-bold text-stone-900 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-emerald-700" />
            <span>{t.sevenDayForecast}</span>
          </h3>
          <span className="text-xs text-stone-500 font-mono">
            {weatherData.forecastPeriodStart} to {weatherData.forecastPeriodEnd}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5">
          {dailyForecast.map((day, idx) => (
            <div
              key={day.date}
              className={`p-3 rounded-xl border transition-all text-center ${
                idx === 0
                  ? 'bg-amber-50/80 border-amber-300 ring-1 ring-amber-400/50'
                  : 'bg-stone-50 border-stone-200 hover:border-emerald-300'
              }`}
            >
              <span className="text-xs font-bold text-stone-900 block">
                {day.dayOfWeek}
              </span>
              <span className="text-[10px] text-stone-500 font-mono block mb-2">
                {day.date.substring(5)}
              </span>

              <div className="text-sm font-extrabold text-stone-800 my-1">
                {day.tempMax}° / <span className="text-stone-500 text-xs font-normal">{day.tempMin}°</span>
              </div>

              <div className="mt-2 text-xs font-semibold text-sky-700 bg-sky-50 py-1 rounded border border-sky-100 flex items-center justify-center gap-1">
                <CloudRain className="w-3 h-3 text-sky-500" />
                <span>{day.precipitationMm} mm</span>
              </div>

              <span className="text-[10px] text-stone-500 mt-1.5 block line-clamp-1" title={day.conditionText}>
                {day.conditionText}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Source Metadata & Reliability Indicator Footer */}
      <div className="bg-stone-50 p-4 rounded-xl border border-stone-200 text-xs text-stone-600 flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Database className="w-4 h-4 text-emerald-700" />
          <span>
            <strong>{t.dataSource}</strong> {weatherData.providerName}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1 font-semibold text-stone-800">
            {weatherData.qualityConfidenceScore > 80 ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            ) : (
              <AlertCircle className="w-4 h-4 text-amber-600" />
            )}
            Score: {weatherData.qualityConfidenceScore}/100
          </span>
          <span className="text-stone-400">|</span>
          <span className="text-stone-500 italic">
            {weatherData.disclaimerNote}
          </span>
        </div>
      </div>
    </div>
  );
};
