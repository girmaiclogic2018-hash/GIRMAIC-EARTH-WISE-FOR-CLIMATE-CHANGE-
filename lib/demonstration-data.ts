import { EthiopianLocation } from './ethiopia-locations';

export interface WeatherMetric {
  tempCelsius: number;
  tempMin: number;
  tempMax: number;
  precipitationMm: number;
  precipitationProbability: number;
  relativeHumidity: number;
  windSpeedKmH: number;
  soilMoistureRatio?: number; // e.g. 0.28 m³/m³
  weatherConditionCode: string;
  weatherConditionText: string;
}

export interface DailyForecast {
  date: string; // YYYY-MM-DD
  dayOfWeek: string;
  tempMax: number;
  tempMin: number;
  precipitationMm: number;
  precipitationProbability: number;
  conditionText: string;
}

export interface WeatherDataPayload {
  isDemonstrationMode: boolean;
  providerName: string;
  providerType: 'static_demonstration' | 'open_meteo_live' | 'simulated_stale' | 'simulated_missing';
  location: EthiopianLocation;
  fetchedAtIso: string;
  forecastPeriodStart: string;
  forecastPeriodEnd: string;
  current: WeatherMetric;
  dailyForecast: DailyForecast[];
  qualityConfidenceScore: number; // 0 to 100
  missingFields: string[];
  disclaimerNote: string;
}

export const DEMONSTRATION_WEATHER_MAP: Record<string, WeatherDataPayload> = {
  bishoftu: {
    isDemonstrationMode: true,
    providerName: 'GIRMAIC Benchmark Demonstration Service v0.1',
    providerType: 'static_demonstration',
    location: {
      id: 'bishoftu',
      name: 'Bishoftu / Ada\'a',
      amharicName: 'ቢሾፍቱ / አዳዓ',
      oromooName: 'Bishooftuu / Ada\'aa',
      tigrinyaName: 'ቢሾፍቱ / ኣዳዓ',
      region: 'Oromia',
      woreda: 'Ada\'a Woreda',
      latitude: 8.75,
      longitude: 38.98,
      elevationMeters: 1920,
      agroZone: 'Midland (Weyna Dega)',
      primaryCrops: ['Teff (Quncho)', 'Bread Wheat', 'Chickpea', 'Lentils'],
      currentSeasonContext: 'Meher (Main Rains)',
      description: 'Premier teff and pulse producing hub in Central Ethiopia with vertisol soils.'
    },
    fetchedAtIso: new Date().toISOString(),
    forecastPeriodStart: new Date().toISOString().split('T')[0],
    forecastPeriodEnd: new Date(Date.now() + 6 * 86400000).toISOString().split('T')[0],
    current: {
      tempCelsius: 22.4,
      tempMin: 14.1,
      tempMax: 26.8,
      precipitationMm: 12.5,
      precipitationProbability: 65,
      relativeHumidity: 72,
      windSpeedKmH: 11.2,
      soilMoistureRatio: 0.34,
      weatherConditionCode: 'moderate_rain',
      weatherConditionText: 'Moderate Afternoon Showers'
    },
    dailyForecast: [
      { date: '2026-10-27', dayOfWeek: 'Today', tempMax: 26.8, tempMin: 14.1, precipitationMm: 12.5, precipitationProbability: 65, conditionText: 'Showers' },
      { date: '2026-10-28', dayOfWeek: 'Wed', tempMax: 25.5, tempMin: 13.8, precipitationMm: 18.0, precipitationProbability: 80, conditionText: 'Heavy Rain' },
      { date: '2026-10-29', dayOfWeek: 'Thu', tempMax: 24.2, tempMin: 13.5, precipitationMm: 14.2, precipitationProbability: 70, conditionText: 'Showers' },
      { date: '2026-10-30', dayOfWeek: 'Fri', tempMax: 26.0, tempMin: 14.0, precipitationMm: 4.1, precipitationProbability: 35, conditionText: 'Light Rain' },
      { date: '2026-10-31', dayOfWeek: 'Sat', tempMax: 27.2, tempMin: 14.2, precipitationMm: 0.8, precipitationProbability: 15, conditionText: 'Partly Cloudy' },
      { date: '2026-11-01', dayOfWeek: 'Sun', tempMax: 27.8, tempMin: 14.5, precipitationMm: 0.0, precipitationProbability: 10, conditionText: 'Sunny' },
      { date: '2026-11-02', dayOfWeek: 'Mon', tempMax: 28.1, tempMin: 15.0, precipitationMm: 0.0, precipitationProbability: 5, conditionText: 'Clear Sky' }
    ],
    qualityConfidenceScore: 92,
    missingFields: [],
    disclaimerNote: 'DEMONSTRATION MODE: This is a static reference record used for interface testing. It is not live atmospheric observation.'
  },

  hawassa: {
    isDemonstrationMode: true,
    providerName: 'GIRMAIC Benchmark Demonstration Service v0.1',
    providerType: 'static_demonstration',
    location: {
      id: 'hawassa',
      name: 'Hawassa / Sidama',
      amharicName: 'ሀዋሳ / ሲዳማ',
      oromooName: 'Hawaasaa / Sidama',
      tigrinyaName: 'ሀዋሳ / ሲዳማ',
      region: 'Sidama Region',
      woreda: 'Hawassa Zuria',
      latitude: 7.06,
      longitude: 38.47,
      elevationMeters: 1708,
      agroZone: 'Midland (Weyna Dega)',
      primaryCrops: ['Maize', 'Garden Coffee', 'Enset', 'Common Beans'],
      currentSeasonContext: 'Meher (Main Rains)',
      description: 'Rift valley basin with mixed cereal-enset farming and sub-humid climate.'
    },
    fetchedAtIso: new Date().toISOString(),
    forecastPeriodStart: new Date().toISOString().split('T')[0],
    forecastPeriodEnd: new Date(Date.now() + 6 * 86400000).toISOString().split('T')[0],
    current: {
      tempCelsius: 24.1,
      tempMin: 15.3,
      tempMax: 27.5,
      precipitationMm: 8.2,
      precipitationProbability: 50,
      relativeHumidity: 68,
      windSpeedKmH: 9.8,
      soilMoistureRatio: 0.29,
      weatherConditionCode: 'light_rain',
      weatherConditionText: 'Light Scattered Rain'
    },
    dailyForecast: [
      { date: '2026-10-27', dayOfWeek: 'Today', tempMax: 27.5, tempMin: 15.3, precipitationMm: 8.2, precipitationProbability: 50, conditionText: 'Scattered Showers' },
      { date: '2026-10-28', dayOfWeek: 'Wed', tempMax: 26.8, tempMin: 15.0, precipitationMm: 11.4, precipitationProbability: 60, conditionText: 'Thunderstorms' },
      { date: '2026-10-29', dayOfWeek: 'Thu', tempMax: 27.0, tempMin: 15.1, precipitationMm: 5.0, precipitationProbability: 40, conditionText: 'Light Showers' },
      { date: '2026-10-30', dayOfWeek: 'Fri', tempMax: 28.1, tempMin: 15.5, precipitationMm: 1.2, precipitationProbability: 20, conditionText: 'Partly Cloudy' },
      { date: '2026-10-31', dayOfWeek: 'Sat', tempMax: 28.5, tempMin: 15.8, precipitationMm: 0.0, precipitationProbability: 10, conditionText: 'Sunny' },
      { date: '2026-11-01', dayOfWeek: 'Sun', tempMax: 29.0, tempMin: 16.0, precipitationMm: 0.0, precipitationProbability: 5, conditionText: 'Sunny' },
      { date: '2026-11-02', dayOfWeek: 'Mon', tempMax: 28.8, tempMin: 15.9, precipitationMm: 2.1, precipitationProbability: 25, conditionText: 'Cloudy' }
    ],
    qualityConfidenceScore: 90,
    missingFields: [],
    disclaimerNote: 'DEMONSTRATION MODE: Static demonstration record. Do not use for real field operational decisions.'
  }
};
