import { EthiopianLocation } from './ethiopia-locations';
import { DEMONSTRATION_WEATHER_MAP, WeatherDataPayload, WeatherMetric, DailyForecast } from './demonstration-data';

export type WeatherFetchMode = 'demonstration' | 'open_meteo_live' | 'simulated_stale' | 'simulated_missing' | 'simulated_error';

export interface FetchWeatherOptions {
  location: EthiopianLocation;
  mode: WeatherFetchMode;
}

// Convert Open-Meteo weather code into human readable description
function parseWmoWeatherCode(code: number): string {
  switch (code) {
    case 0: return 'Clear Sky';
    case 1: return 'Mainly Clear';
    case 2: return 'Partly Cloudy';
    case 3: return 'Overcast / Cloudy';
    case 45: case 48: return 'Fog / Haze';
    case 51: case 53: case 55: return 'Drizzle';
    case 61: case 63: return 'Moderate Rain Showers';
    case 65: return 'Heavy Rain';
    case 80: case 81: case 82: return 'Localized Convective Rain';
    case 95: case 96: case 99: return 'Thunderstorm with Potential Hail';
    default: return 'Variable Clouds and Showers';
  }
}

export async function fetchWeatherData(options: FetchWeatherOptions): Promise<WeatherDataPayload> {
  const { location, mode } = options;

  // 1. Simulated Error Mode
  if (mode === 'simulated_error') {
    throw new Error(`[SIMULATED FAILURE] Weather service network timeout for location ${location.name}. Test mode active.`);
  }

  // 2. Demonstration Mode
  if (mode === 'demonstration') {
    const demoPayload = DEMONSTRATION_WEATHER_MAP[location.id] || {
      isDemonstrationMode: true,
      providerName: 'GIRMAIC Benchmark Demonstration Service v0.1',
      providerType: 'static_demonstration',
      location,
      fetchedAtIso: new Date().toISOString(),
      forecastPeriodStart: new Date().toISOString().split('T')[0],
      forecastPeriodEnd: new Date(Date.now() + 6 * 86400000).toISOString().split('T')[0],
      current: {
        tempCelsius: 21.8,
        tempMin: 13.5,
        tempMax: 26.2,
        precipitationMm: 6.4,
        precipitationProbability: 55,
        relativeHumidity: 70,
        windSpeedKmH: 10.5,
        soilMoistureRatio: 0.31,
        weatherConditionCode: 'light_rain',
        weatherConditionText: 'Light Rain Showers (Demo)'
      },
      dailyForecast: Array.from({ length: 7 }).map((_, i) => {
        const d = new Date(Date.now() + i * 86400000);
        return {
          date: d.toISOString().split('T')[0],
          dayOfWeek: i === 0 ? 'Today' : d.toLocaleDateString('en-US', { weekday: 'short' }),
          tempMax: 25 + Math.sin(i) * 2,
          tempMin: 13 + Math.cos(i) * 2,
          precipitationMm: i % 2 === 0 ? 8.0 : 1.2,
          precipitationProbability: i % 2 === 0 ? 60 : 20,
          conditionText: i % 2 === 0 ? 'Scattered Rain' : 'Partly Cloudy'
        };
      }),
      qualityConfidenceScore: 88,
      missingFields: [],
      disclaimerNote: 'DEMONSTRATION MODE — Not a live forecast. Data is for system testing only.'
    };

    return {
      ...demoPayload,
      location,
      fetchedAtIso: new Date().toISOString()
    };
  }

  // 3. Simulated Stale Data Mode
  if (mode === 'simulated_stale') {
    const staleTime = new Date(Date.now() - 52 * 3600 * 1000).toISOString(); // 52 hours old
    const demoPayload = DEMONSTRATION_WEATHER_MAP[location.id] || DEMONSTRATION_WEATHER_MAP['bishoftu'];
    return {
      ...demoPayload,
      location,
      isDemonstrationMode: false,
      providerName: 'Simulated Stale Data Provider (Test Mode)',
      providerType: 'simulated_stale',
      fetchedAtIso: staleTime,
      qualityConfidenceScore: 42,
      missingFields: ['live_satellite_pass'],
      disclaimerNote: 'WARNING: Data is stale (>48 hours old). Do not rely on this information for immediate agricultural actions.'
    };
  }

  // 4. Simulated Missing Fields Mode
  if (mode === 'simulated_missing') {
    const demoPayload = DEMONSTRATION_WEATHER_MAP[location.id] || DEMONSTRATION_WEATHER_MAP['bishoftu'];
    return {
      ...demoPayload,
      location,
      isDemonstrationMode: false,
      providerName: 'Simulated Partial Sensor Feed (Test Mode)',
      providerType: 'simulated_missing',
      fetchedAtIso: new Date().toISOString(),
      current: {
        ...demoPayload.current,
        soilMoistureRatio: undefined,
        relativeHumidity: 0,
      },
      qualityConfidenceScore: 55,
      missingFields: ['soilMoistureRatio', 'relativeHumidity'],
      disclaimerNote: 'INCOMPLETE DATA: Soil moisture and air humidity measurements are unmonitored for this region.'
    };
  }

  // 5. Open-Meteo Live Free API Mode
  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&current=temperature_2m,relative_humidity_2m,precipitation,weather_code,wind_speed_10m,soil_moisture_0_to_7cm&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum,precipitation_probability_max&timezone=Africa%2FAddis_Ababa`;

    const res = await fetch(url, { cache: 'no-store' });
    if (!res.ok) {
      throw new Error(`Open-Meteo returned status ${res.status}`);
    }

    const data = await res.json();
    const curr = data.current || {};
    const daily = data.daily || {};

    const missingFields: string[] = [];
    if (curr.soil_moisture_0_to_7cm === undefined || curr.soil_moisture_0_to_7cm === null) {
      missingFields.push('soilMoistureRatio');
    }
    if (curr.relative_humidity_2m === undefined) {
      missingFields.push('relativeHumidity');
    }

    const currentMetric: WeatherMetric = {
      tempCelsius: Math.round((curr.temperature_2m ?? 22) * 10) / 10,
      tempMin: Math.round(((daily.temperature_2m_min?.[0] ?? 14)) * 10) / 10,
      tempMax: Math.round(((daily.temperature_2m_max?.[0] ?? 26)) * 10) / 10,
      precipitationMm: Math.round((curr.precipitation ?? 0) * 10) / 10,
      precipitationProbability: daily.precipitation_probability_max?.[0] ?? 40,
      relativeHumidity: curr.relative_humidity_2m ?? 65,
      windSpeedKmH: Math.round((curr.wind_speed_10m ?? 10) * 10) / 10,
      soilMoistureRatio: curr.soil_moisture_0_to_7cm !== undefined ? Math.round(curr.soil_moisture_0_to_7cm * 100) / 100 : undefined,
      weatherConditionCode: String(curr.weather_code ?? 0),
      weatherConditionText: parseWmoWeatherCode(curr.weather_code ?? 0)
    };

    const dailyForecast: DailyForecast[] = (daily.time || []).slice(0, 7).map((dateStr: string, idx: number) => {
      const d = new Date(dateStr);
      return {
        date: dateStr,
        dayOfWeek: idx === 0 ? 'Today' : d.toLocaleDateString('en-US', { weekday: 'short' }),
        tempMax: Math.round((daily.temperature_2m_max?.[idx] ?? 25) * 10) / 10,
        tempMin: Math.round((daily.temperature_2m_min?.[idx] ?? 13) * 10) / 10,
        precipitationMm: Math.round((daily.precipitation_sum?.[idx] ?? 0) * 10) / 10,
        precipitationProbability: daily.precipitation_probability_max?.[idx] ?? 20,
        conditionText: parseWmoWeatherCode(daily.weather_code?.[idx] ?? 0)
      };
    });

    const confidence = missingFields.length === 0 ? 95 : 80;

    return {
      isDemonstrationMode: false,
      providerName: 'Open-Meteo Global Meteorological API (Addis Ababa Sync)',
      providerType: 'open_meteo_live',
      location,
      fetchedAtIso: new Date().toISOString(),
      forecastPeriodStart: daily.time?.[0] || new Date().toISOString().split('T')[0],
      forecastPeriodEnd: daily.time?.[daily.time.length - 1] || new Date().toISOString().split('T')[0],
      current: currentMetric,
      dailyForecast,
      qualityConfidenceScore: confidence,
      missingFields,
      disclaimerNote: 'LIVE METEOROLOGICAL FEED: Real-time open satellite & station model. High-consequence decisions should be cross-verified with local Woreda Agriculture offices.'
    };
  } catch (err: any) {
    console.warn('Live weather fetch failed, falling back to clear error status:', err.message);
    throw new Error(`Live weather connection failed (${err.message}). Toggle to Demonstration Mode to evaluate UI.`);
  }
}
