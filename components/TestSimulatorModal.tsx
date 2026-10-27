'use client';

import React from 'react';
import { WeatherFetchMode } from '@/lib/weather-service';
import { X, SlidersHorizontal, CheckCircle2, AlertTriangle, Clock, Radio, ShieldAlert, Cpu } from 'lucide-react';

interface TestSimulatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentMode: WeatherFetchMode;
  onSelectMode: (mode: WeatherFetchMode) => void;
}

export const TestSimulatorModal: React.FC<TestSimulatorModalProps> = ({
  isOpen,
  onClose,
  currentMode,
  onSelectMode
}) => {
  if (!isOpen) return null;

  const testModes: { id: WeatherFetchMode; title: string; desc: string; icon: any; color: string }[] = [
    {
      id: 'demonstration',
      title: '1. Demonstration Benchmark Mode (Default)',
      desc: 'Static, verified baseline telemetry for Bishoftu, Hawassa, Ziway, and other Ethiopian regions. Guarantees 0 network dependency.',
      icon: CheckCircle2,
      color: 'bg-amber-100 text-amber-900 border-amber-300'
    },
    {
      id: 'open_meteo_live',
      title: '2. Live Open-Meteo API Connection',
      desc: 'Fetches real-time atmospheric observations and 7-day model runs for exact Ethiopian woreda coordinates via Open-Meteo.',
      icon: Radio,
      color: 'bg-emerald-100 text-emerald-900 border-emerald-300'
    },
    {
      id: 'simulated_stale',
      title: '3. Test Stale Data Alert (>48 Hours Old)',
      desc: 'Simulates a telemetry feed whose timestamp is 52 hours old. Tests whether the UI and Data Quality Inspector flag staleness.',
      icon: Clock,
      color: 'bg-amber-100 text-amber-900 border-amber-300'
    },
    {
      id: 'simulated_missing',
      title: '4. Test Partial Sensor Feed (Missing Soil Moisture)',
      desc: 'Simulates a feed where topsoil moisture and relative humidity are missing or unmonitored. Verifies missing-field handling.',
      icon: AlertTriangle,
      color: 'bg-orange-100 text-orange-900 border-orange-300'
    },
    {
      id: 'simulated_error',
      title: '5. Test Network Failure & Retry Error State',
      desc: 'Triggers a simulated server timeout / connection failure to verify graceful error boundaries and retry UI controls.',
      icon: ShieldAlert,
      color: 'bg-red-100 text-red-900 border-red-300'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 bg-stone-950/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full border border-stone-200 shadow-2xl overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-stone-900 text-white p-6 relative flex items-center justify-between border-b border-stone-800">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-amber-500 text-stone-950 rounded-2xl font-bold shadow-md">
              <SlidersHorizontal className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <span>Developer & Evaluator Test Chamber</span>
                <span className="text-[10px] font-mono bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded border border-amber-500/40">
                  Section 7 QA
                </span>
              </h2>
              <p className="text-xs text-stone-400">
                Simulate missing data, stale timestamps, network errors, and live feeds to verify robust system handling.
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

        {/* Content */}
        <div className="p-6 space-y-3 max-h-[70vh] overflow-y-auto">
          {testModes.map((modeItem) => {
            const Icon = modeItem.icon;
            const isSelected = currentMode === modeItem.id;
            return (
              <div
                key={modeItem.id}
                onClick={() => {
                  onSelectMode(modeItem.id);
                }}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start justify-between gap-4 ${
                  isSelected
                    ? 'bg-amber-50/90 border-amber-500 ring-2 ring-amber-400/50 shadow-md'
                    : 'bg-stone-50 border-stone-200 hover:border-emerald-300 hover:bg-stone-100/80'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-xl mt-0.5 ${modeItem.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-stone-900 flex items-center gap-2">
                      <span>{modeItem.title}</span>
                      {isSelected && (
                        <span className="text-[10px] bg-emerald-700 text-white font-bold px-2 py-0.5 rounded-full">
                          ACTIVE NOW
                        </span>
                      )}
                    </h3>
                    <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                      {modeItem.desc}
                    </p>
                  </div>
                </div>

                <div className="shrink-0 self-center">
                  <input
                    type="radio"
                    checked={isSelected}
                    onChange={() => onSelectMode(modeItem.id)}
                    className="w-4 h-4 text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="bg-stone-100 p-4 border-t border-stone-200 flex items-center justify-between text-xs text-stone-600">
          <span className="flex items-center gap-1 font-mono">
            <Cpu className="w-4 h-4 text-emerald-700" /> Current Mode: <strong>{currentMode}</strong>
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-stone-900 hover:bg-stone-950 text-white font-bold rounded-xl transition-colors"
          >
            Apply & Return to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};
