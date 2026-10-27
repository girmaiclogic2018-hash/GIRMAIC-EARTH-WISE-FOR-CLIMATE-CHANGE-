import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";
import { WeatherDataPayload } from "@/lib/demonstration-data";

export async function POST(req: NextRequest) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "GEMINI_API_KEY is not configured on the server environment." },
        { status: 500 }
      );
    }

    const { weatherData, language = 'en' }: { weatherData: WeatherDataPayload; language: string } = await req.json();

    if (!weatherData || !weatherData.location) {
      return NextResponse.json(
        { error: "Invalid weather payload supplied." },
        { status: 400 }
      );
    }

    const ai = new GoogleGenAI({ apiKey });

    const systemPrompt = `You are the AI Climate Explanation Engine for "GIRMAIC EarthWise AI — Climate Advisor" (Founder: Girma Haile Bunaro).
Your mission is to convert raw weather telemetry and regional agro-ecological contexts into cautious, practical, highly transparent decision-support explanations for Ethiopian agricultural communities.

STRICT RESPONSIBLE AI RULES (SECTION 4):
1. SEPARATION: Explicitly distinguish observed weather telemetry, 7-day forecast trends, reviewed agronomic knowledge, and your AI explanation.
2. NO GUARANTEES: NEVER guarantee rainfall occurrence, specific millimetres of precipitation, crop yields, water availability, or immunity from losses.
3. UNCERTAINTY: Explicitly state the level of confidence (High/Medium/Low) and list key unknown microclimate variables (e.g., local soil variation, unmeasured wind gusts, hyper-local convective shifts).
4. HIGH-RISK REFERRAL: Direct any consequential or high-cost decisions (such as bulk planting, heavy fertilizer top-dressing, or chemical pesticide applications) to local Kebele Development Agents (DAs) and Woreda Agriculture Extension officers.
5. NO FABRICATION: Do NOT invent scientific paper citations, fake government decrees, or unverified awards.
6. LANGUAGE: Generate your response primarily in English, but include brief primary terms or headers translated in ${language === 'am' ? 'Amharic' : language === 'om' ? 'Afaan Oromoo' : language === 'ti' ? 'Tigrinya' : 'English'} where appropriate.

Respond STRICTLY with a valid JSON object with the following schema:
{
  "observedDataSummary": "String summarizing current temperature, rain, soil moisture, and provider mode clearly.",
  "aiInterpretation": "String explaining what these conditions mean for soil moisture, evapotranspiration, and crop development.",
  "agronomicalRisks": [
    "String 1 describing specific risk (e.g. waterlogging, fungal leaf rust, heat shock, or seed rot)",
    "String 2 describing secondary risk"
  ],
  "cautiousActionTips": [
    "String 1 offering practical, low-cost moisture or land preparation step",
    "String 2 offering crop stage check advice"
  ],
  "uncertaintyRating": "High Confidence" | "Moderate Uncertainty" | "High Uncertainty",
  "keyUncertainties": [
    "String describing unmeasured variable or forecast uncertainty"
  ],
  "daReferralNote": "Explicit statement reminding the user to consult local Kebele DAs for field verification."
}`;

    const prompt = `Location: ${weatherData.location.name} (${weatherData.location.region}, ${weatherData.location.woreda})
Agro-ecological Zone: ${weatherData.location.agroZone}
Primary Crops: ${weatherData.location.primaryCrops.join(', ')}
Current Season: ${weatherData.location.currentSeasonContext}
Data Mode: ${weatherData.isDemonstrationMode ? 'DEMONSTRATION BENCHMARK (Not live)' : 'LIVE METEOROLOGICAL API'}
Provider: ${weatherData.providerName}
Last Updated: ${weatherData.fetchedAtIso}

Current Weather Telemetry:
- Temperature: ${weatherData.current.tempCelsius}°C (Min: ${weatherData.current.tempMin}°C, Max: ${weatherData.current.tempMax}°C)
- Rain Today: ${weatherData.current.precipitationMm} mm (Probability: ${weatherData.current.precipitationProbability}%)
- Condition: ${weatherData.current.weatherConditionText}
- Relative Humidity: ${weatherData.current.relativeHumidity}%
- Wind Speed: ${weatherData.current.windSpeedKmH} km/h
- Topsoil Moisture: ${weatherData.current.soilMoistureRatio !== undefined ? `${weatherData.current.soilMoistureRatio} m³/m³` : 'Unmonitored / Missing'}
- Missing Data Fields: ${weatherData.missingFields.length > 0 ? weatherData.missingFields.join(', ') : 'None'}

7-Day Outlook Overview:
${weatherData.dailyForecast.map(f => `${f.dayOfWeek} (${f.date}): Max ${f.tempMax}°C, Rain ${f.precipitationMm}mm (${f.precipitationProbability}%), ${f.conditionText}`).join('\n')}

Analyze this meteorological scenario and return JSON as specified.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: "application/json"
      }
    });

    const text = response.text || "{}";
    const parsedData = JSON.parse(text);

    return NextResponse.json({
      success: true,
      explanation: parsedData,
      generatedAtIso: new Date().toISOString()
    });
  } catch (error: any) {
    console.error("Error generating Gemini AI advisory:", error);
    return NextResponse.json(
      {
        error: "Failed to generate AI climate explanation.",
        details: error.message || String(error)
      },
      { status: 500 }
    );
  }
}
