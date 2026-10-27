'use client';

import React, { useState, useEffect } from 'react';
import { ETHIOPIAN_PILOT_LOCATIONS, EthiopianLocation } from '@/lib/ethiopia-locations';
import { fetchWeatherData, WeatherFetchMode } from '@/lib/weather-service';
import { WeatherDataPayload } from '@/lib/demonstration-data';
import { SupportedLanguage, UI_TRANSLATIONS } from '@/lib/translations';

// Components
import { Header } from '@/components/Header';
import { ModeBanner } from '@/components/ModeBanner';
import { LocationSelector } from '@/components/LocationSelector';
import { WeatherPanel } from '@/components/WeatherPanel';
import { ClimateExplanationPanel } from '@/components/ClimateExplanationPanel';
import { AgriculturalGuidancePanel } from '@/components/AgriculturalGuidancePanel';
import { DataQualityInspector } from '@/components/DataQualityInspector';
import { FeedbackForm } from '@/components/FeedbackForm';
import { AboutModal } from '@/components/AboutModal';
import { PrivacyModal } from '@/components/PrivacyModal';
import { TestSimulatorModal } from '@/components/TestSimulatorModal';

import { Sprout, Globe2, Sparkles, ShieldAlert, AlertTriangle, ArrowRight, RefreshCw, UserCheck, CheckCircle2, MessageSquare } from 'lucide-react';

export default function HomePage() {
  const [language, setLanguage] = useState<SupportedLanguage>('en');
  const [selectedLocation, setSelectedLocation] = useState<EthiopianLocation>(ETHIOPIAN_PILOT_LOCATIONS[0]);
  const [fetchMode, setFetchMode] = useState<WeatherFetchMode>('demonstration');
  const [activeTab, setActiveTab] = useState<string>('overview');

  const [weatherData, setWeatherData] = useState<WeatherDataPayload | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Modals
  const [aboutOpen, setAboutOpen] = useState<boolean>(false);
  const [privacyOpen, setPrivacyOpen] = useState<boolean>(false);
  const [testRoomOpen, setTestRoomOpen] = useState<boolean>(false);

  const t = UI_TRANSLATIONS[language] || UI_TRANSLATIONS.en;

  const loadWeather = React.useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await fetchWeatherData({
        location: selectedLocation,
        mode: fetchMode
      });
      setWeatherData(data);
    } catch (err: any) {
      console.warn('Weather service error:', err.message);
      setError(err.message || 'Failed to fetch weather telemetry.');
    } finally {
      setLoading(false);
    }
  }, [selectedLocation, fetchMode]);

  useEffect(() => {
    let ignore = false;
    const execute = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchWeatherData({
          location: selectedLocation,
          mode: fetchMode
        });
        if (!ignore) setWeatherData(data);
      } catch (err: any) {
        if (!ignore) setError(err.message || 'Failed to fetch weather telemetry.');
      } finally {
        if (!ignore) setLoading(false);
      }
    };
    execute();
    return () => { ignore = true; };
  }, [selectedLocation, fetchMode]);

  return (
    <div className="min-h-screen bg-stone-100 text-stone-900 font-sans flex flex-col antialiased selection:bg-emerald-200 selection:text-emerald-900">
      {/* Top Navigation & Header */}
      <Header
        language={language}
        onLanguageChange={setLanguage}
        fetchMode={fetchMode}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenAbout={() => setAboutOpen(true)}
        onOpenPrivacy={() => setPrivacyOpen(true)}
        onOpenTestRoom={() => setTestRoomOpen(true)}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-6 space-y-6">
        {/* Banner highlighting Data Mode */}
        <ModeBanner
          mode={fetchMode}
          language={language}
          onModeChange={setFetchMode}
          isRefreshing={loading}
          onRefreshData={loadWeather}
        />

        {/* Location & Context Selector */}
        <LocationSelector
          selectedLocation={selectedLocation}
          onSelectLocation={setSelectedLocation}
          language={language}
        />

        {/* Global Loading state */}
        {loading && (
          <div className="bg-white rounded-2xl p-10 text-center border border-stone-200 shadow-sm space-y-3">
            <div className="w-10 h-10 border-4 border-emerald-700 border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-sm font-bold text-stone-800">
              Retrieving atmospheric telemetry for {selectedLocation.name}...
            </p>
            <p className="text-xs text-stone-500 font-mono">
              Mode: {fetchMode}
            </p>
          </div>
        )}

        {/* Error state fallback */}
        {error && !loading && (
          <div className="bg-red-50 rounded-2xl p-6 border border-red-200 text-red-950 space-y-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-100 text-red-700 rounded-xl">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-red-900">Weather Telemetry Connection Note</h3>
                <p className="text-xs text-red-800">{error}</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
              <button
                onClick={loadWeather}
                className="px-4 py-2 bg-red-800 hover:bg-red-900 text-white text-xs font-semibold rounded-xl transition-colors flex items-center gap-2"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Retry Connection</span>
              </button>
              <button
                onClick={() => setFetchMode('demonstration')}
                className="px-4 py-2 bg-amber-100 hover:bg-amber-200 text-amber-950 text-xs font-semibold rounded-xl border border-amber-300 transition-colors"
              >
                Switch to Demonstration Benchmark Data
              </button>
            </div>
          </div>
        )}

        {/* Content Tabs View */}
        {weatherData && !loading && (
          <div>
            {/* OVERVIEW TAB */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Hero / Vision Card */}
                <div className="bg-gradient-to-br from-emerald-950 via-stone-900 to-emerald-950 text-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-emerald-800 relative overflow-hidden">
                  <div className="max-w-2xl space-y-4 relative z-10">
                    <div className="inline-flex items-center gap-2 bg-amber-500/20 text-amber-300 px-3 py-1 rounded-full text-xs font-semibold border border-amber-500/30">
                      <Sprout className="w-3.5 h-3.5 text-amber-300" />
                      <span>Founder & Lead: Girma Haile Bunaro</span>
                    </div>

                    <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white leading-tight">
                      Empowering Ethiopian Agriculture through Transparent Climate Advisory
                    </h2>

                    <p className="text-sm text-emerald-100/90 leading-relaxed">
                      GIRMAIC EarthWise AI integrates localized atmospheric metrics, reviewed agronomic research, and cautious artificial intelligence to support decision-making across Ethiopian communities.
                    </p>

                    <div className="flex flex-wrap gap-3 pt-2">
                      <button
                        onClick={() => setActiveTab('weather')}
                        className="px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-stone-950 font-bold text-xs rounded-xl transition-all shadow-md flex items-center gap-2"
                      >
                        <span>Inspect Weather Telemetry</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setActiveTab('climate_ai')}
                        className="px-5 py-2.5 bg-emerald-800 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl border border-emerald-600 transition-all flex items-center gap-2"
                      >
                        <Sparkles className="w-4 h-4 text-amber-300" />
                        <span>Gemini AI Climate Explanation</span>
                      </button>
                      <button
                        onClick={() => setActiveTab('agronomy')}
                        className="px-5 py-2.5 bg-stone-800 hover:bg-stone-700 text-emerald-200 font-semibold text-xs rounded-xl border border-stone-700 transition-all flex items-center gap-2"
                      >
                        <Sprout className="w-4 h-4 text-emerald-400" />
                        <span>Agronomic Guidance</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Main 2-column Grid: Weather + AI Explanation preview */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <WeatherPanel weatherData={weatherData} language={language} />
                  <ClimateExplanationPanel weatherData={weatherData} language={language} />
                </div>

                {/* Agronomic Guidance Preview */}
                <AgriculturalGuidancePanel language={language} />
              </div>
            )}

            {/* WEATHER TAB */}
            {activeTab === 'weather' && (
              <WeatherPanel weatherData={weatherData} language={language} />
            )}

            {/* CLIMATE AI EXPLANATION TAB */}
            {activeTab === 'climate_ai' && (
              <ClimateExplanationPanel weatherData={weatherData} language={language} />
            )}

            {/* AGRONOMY TAB */}
            {activeTab === 'agronomy' && (
              <AgriculturalGuidancePanel language={language} />
            )}

            {/* DATA QUALITY INSPECTOR TAB */}
            {activeTab === 'quality' && (
              <DataQualityInspector weatherData={weatherData} language={language} />
            )}

            {/* FEEDBACK TAB */}
            {activeTab === 'feedback' && (
              <FeedbackForm
                language={language}
                locationName={selectedLocation.name}
                locationId={selectedLocation.id}
              />
            )}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-stone-900 text-stone-400 border-t border-stone-800 mt-12 py-8 text-xs">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center md:text-left">
            <p className="text-stone-200 font-bold">
              GIRMAIC EarthWise AI — Climate Advisor (Version 0.1)
            </p>
            <p className="text-stone-400">
              Founder and Project Lead: <strong className="text-amber-400 font-normal">Girma Haile Bunaro</strong>
            </p>
            <p className="text-[11px] text-stone-500 max-w-xl">
              Practical climate information tools for Ethiopian agricultural communities. Version 0.1 prototype for technical evaluation.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-stone-300">
            <button
              onClick={() => setAboutOpen(true)}
              className="hover:text-amber-300 transition-colors underline underline-offset-2"
            >
              About Project
            </button>
            <button
              onClick={() => setPrivacyOpen(true)}
              className="hover:text-amber-300 transition-colors underline underline-offset-2"
            >
              Privacy & Security
            </button>
            <button
              onClick={() => setTestRoomOpen(true)}
              className="hover:text-amber-300 transition-colors underline underline-offset-2"
            >
              QA Test Chamber
            </button>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <AboutModal
        isOpen={aboutOpen}
        onClose={() => setAboutOpen(false)}
        language={language}
      />

      <PrivacyModal
        isOpen={privacyOpen}
        onClose={() => setPrivacyOpen(false)}
      />

      <TestSimulatorModal
        isOpen={testRoomOpen}
        onClose={() => setTestRoomOpen(false)}
        currentMode={fetchMode}
        onSelectMode={(mode) => {
          setFetchMode(mode);
          setTestRoomOpen(false);
        }}
      />
    </div>
  );
}
