export type SupportedLanguage = 'en' | 'am' | 'om' | 'ti';

export interface LanguageMeta {
  code: SupportedLanguage;
  label: string;
  nativeName: string;
  flag: string;
}

export const SUPPORTED_LANGUAGES: LanguageMeta[] = [
  { code: 'en', label: 'English', nativeName: 'English', flag: '🇬🇧' },
  { code: 'am', label: 'Amharic', nativeName: 'አማርኛ', flag: '🇪🇹' },
  { code: 'om', label: 'Afaan Oromoo', nativeName: 'Afaan Oromoo', flag: '🇪🇹' },
  { code: 'ti', label: 'Tigrinya', nativeName: 'ትግርኛ', flag: '🇪🇹' }
];

export const UI_TRANSLATIONS: Record<SupportedLanguage, Record<string, string>> = {
  en: {
    appTitle: "GIRMAIC EarthWise AI",
    appSubtitle: "Climate Advisory & Agricultural Decision Support Prototype for Ethiopia",
    founderCredit: "Founder & Lead: Girma Haile Bunaro",
    demoBadge: "DEMONSTRATION MODE — Not a Live Forecast",
    liveBadge: "LIVE METEOROLOGICAL API ACTIVE",
    staleBadge: "WARNING: Stale Data (>48h Old)",
    missingBadge: "WARNING: Partial Sensor Feed",
    errorBadge: "CONNECTION ERROR",
    
    // Navigation
    navOverview: "Overview",
    navWeather: "Weather Panel",
    navClimateAI: "Climate AI Explanation",
    navAgronomy: "Agricultural Guidance",
    navDataQuality: "Data Quality Inspector",
    navFeedback: "Feedback",
    navAbout: "About & Principles",
    navTestRoom: "Test Simulator",

    // Hero & Controls
    selectLocationLabel: "Select Agricultural Location:",
    currentAgroZone: "Agro-ecological Zone:",
    primaryCropsLabel: "Primary Local Crops:",
    seasonContextLabel: "Seasonal Context:",
    
    // Mode switcher
    dataSourceModeLabel: "Data Source Mode:",
    modeDemo: "Demonstration Benchmark Data",
    modeLive: "Open-Meteo Live API",
    modeStale: "Test: Stale Data Alert (48h old)",
    modeMissing: "Test: Missing Field Feed",
    modeError: "Test: Network Error Simulation",

    // Weather Metrics
    tempLabel: "Temperature",
    minMaxTemp: "Min / Max",
    rainLabel: "Rainfall",
    rainProbLabel: "Rain Probability",
    humidityLabel: "Relative Humidity",
    windLabel: "Wind Speed",
    soilMoistureLabel: "Topsoil Moisture",
    sevenDayForecast: "7-Day Meteorological Outlook",

    // Responsible AI & Disclaimers
    aiExplanationHeader: "Gemini AI Climate Explanation",
    aiDisclaimerNote: "CAUTIOUS ADVISORY DISCLOSURE: Generated explanations interpret regional meteorological patterns and reviewed agronomic research. They are not guaranteed weather forecasts or official government declarations.",
    guaranteeWarning: "No guarantee of rainfall, crop yields, or loss protection is expressed or implied.",
    consultDA: "For high-risk decisions (e.g. major chemical application or bulk planting), consult your local Kebele Development Agent (DA).",

    // Data Quality
    qualityScore: "Data Freshness & Completeness Score:",
    lastUpdated: "Last Updated:",
    dataSource: "Data Source Provider:",
    missingFieldsDetected: "Missing or Unmonitored Data Fields:",
    allFieldsPresent: "All primary parameters (temperature, rain, humidity, soil moisture) present.",

    // Feedback
    feedbackTitle: "Community & Evaluator Feedback",
    feedbackDesc: "Help us refine clarity, local terminology, and agricultural usefulness.",
    clarityRatingLabel: "How clear is the advisory language?",
    usefulnessLabel: "How useful is this for decision making?",
    commentsLabel: "Suggestions or local observations:",
    submitFeedback: "Submit Feedback",
    feedbackThankYou: "Thank you! Your feedback helps refine future iterations of GIRMAIC EarthWise AI.",

    // About Page
    aboutTitle: "About GIRMAIC EarthWise AI",
    missionStatement: "Developing practical, accessible climate-information tools that help Ethiopian communities make better-informed agricultural decisions.",
    founderBio: "GIRMAIC EarthWise AI is initiated and led by Girma Haile Bunaro. The vision combines modern scientific climate intelligence with responsible artificial intelligence and Ethiopian agro-ecological knowledge.",
    disclaimerText: "Version 0.1 is an engineering prototype. It is not endorsed by government agencies or weather authorities, nor claimed to have undergone completed field trials."
  },

  am: {
    appTitle: "ጊርማይክ ኢርዝዋይዝ ኤአይ",
    appSubtitle: "የአየር ንብረት ምክርና የእርሻ ውሳኔ ድጋፍ ፕሮቶታይፕ - ኢትዮጵያ",
    founderCredit: "መሥራችና መሪ፦ ግርማ ሀይሌ ቡናሮ",
    demoBadge: "የማሳያ ሁነታ — የቀጥታ ትንበያ አይደለም",
    liveBadge: "የቀጥታ አየር ንብረት መረጃ ንቁ ነው",
    staleBadge: "ማስጠንቀቂያ፦ የቆየ መረጃ (>48 ሰዓት)",
    missingBadge: "ማስጠንቀቂያ፦ ያልተሟላ መረጃ",
    errorBadge: "የግንኙነት ስህተት",

    navOverview: "አጠቃላይ እይታ",
    navWeather: "የአየር ንብረት ሰሌዳ",
    navClimateAI: "የኤአይ አየር ንብረት ማብራሪያ",
    navAgronomy: "የግብርና መመሪያ",
    navDataQuality: "የመረጃ ጥራት መመርመሪያ",
    navFeedback: "አስተያየት",
    navAbout: "ስለ ፕሮጀክቱ",
    navTestRoom: "የሙከራ ክፍለ ጊዜ",

    selectLocationLabel: "የግብርና ቦታ ይምረጡ፦",
    currentAgroZone: "የስነ-ምህዳር ዞን፦",
    primaryCropsLabel: "ዋና የሀገር በቀል ሰብሎች፦",
    seasonContextLabel: "ወቅታዊ ሁኔታ፦",

    dataSourceModeLabel: "የመረጃ ምንጭ ሁነታ፦",
    modeDemo: "የማሳያ ማጣቀሻ መረጃ",
    modeLive: "ኦፕን-ሜቴኦ የቀጥታ ኤፒአይ",
    modeStale: "ሙከራ፦ የቆየ መረጃ ማስጠንቀቂያ",
    modeMissing: "ሙከራ፦ የጎደለ መረጃ",
    modeError: "ሙከራ፦ የስህተት ሁኔታ",

    tempLabel: "ሙቀት",
    minMaxTemp: "ዝቅተኛ / ከፍተኛ",
    rainLabel: "የዝናብ መጠን",
    rainProbLabel: "የዝናብ ዕድል",
    humidityLabel: "የአየር እርጥበት",
    windLabel: "የነፋስ ፍጥነት",
    soilMoistureLabel: "የአፈር እርጥበት",
    sevenDayForecast: "የ 7 ቀን የአየር ንብረት እይታ",

    aiExplanationHeader: "የጄሚናይ ኤአይ አየር ንብረት ማብራሪያ",
    aiDisclaimerNote: "ጥንቃቄ የተሞላበት ምክር፦ የተፈጠሩት ማብራሪያዎች ክልላዊ የአየር ንብረት ሁኔታዎችንና የተገመገሙ የግብርና ምርምሮችን መሠረት ያደረጉ ናቸው። ኦፊሴላዊ የመንግሥት መግለጫ አይደሉም።",
    guaranteeWarning: "የዝናብ፣ የሰብል ምርት ወይም የጉዳት መከላከያ ዋስትና አይሰጥም።",
    consultDA: "ከፍተኛ አደጋ ላላቸው ውሳኔዎች (እንደ ኬሚካል ረጨት ወይም ሰፊ ዘር) ከአካባቢዎ የቀበሌ ግብርና ልማት ጣቢያ ባለሙያ (DA) ጋር ይመካከሩ።",

    qualityScore: "የመረጃ አዲስነትና ሙሉነት ነጥብ፦",
    lastUpdated: "መጨረሻ የተሻሻለው፦",
    dataSource: "የመረጃ ምንጭ አቅራቢ፦",
    missingFieldsDetected: "የጎደሉ ወይም ያልተለኩ መረጃዎች፦",
    allFieldsPresent: "ሁሉም ዋና የመረጃ መለኪያዎች የተሟሉ ናቸው።",

    feedbackTitle: "የህብረተሰብና የተገምጋሚዎች አስተያየት",
    feedbackDesc: "የምክሩን ግልጽነትና የግብርና ጠቃሚነት ለማሻሻል አስተያየትዎን ያካፍሉ።",
    clarityRatingLabel: "የምክሩ ቋንቋ ምን ያህል ግልጽ ነው?",
    usefulnessLabel: "ለእርሻ ውሳኔ ምን ያህል ጠቃሚ ነው?",
    commentsLabel: "ተጨማሪ አስተያየቶች ወይም የአካባቢ ምልከታዎች፦",
    submitFeedback: "አስተያየት ላክ",
    feedbackThankYou: "እናመሰግናለን! አስተያየትዎ የጊርማይክ ኢርዝዋይዝ ኤአይ ቀጣይ ስራዎችን ለማሻሻል ይረዳል።",

    aboutTitle: "ስለ ጊርማይክ ኢርዝዋይዝ ኤአይ",
    missionStatement: "ለኢትዮጵያ ማህበረሰቦች የተሻለ የግብርና ውሳኔ እንዲወስዱ የሚረዱ ተግባራዊና ተደራሽ የአየር ንብረት መረጃ መሳሪያዎችን ማልማት።",
    founderBio: "ጊርማይክ ኢርዝዋይዝ ኤአይ በግርማ ሀይሌ ቡናሮ የተመሰረተና የሚመራ ነው። ራዕዩ ዘመናዊ ሳይንሳዊ የአየር ንብረት መረጃን፣ ኃላፊነት የተሞላበት ኤአይ እና የኢትዮጵያ ግብርና እውቀትን ያጣምራል።",
    disclaimerText: "ስሪት 0.1 የቴክኖሎጂ ማሳያ ፕሮቶታይፕ ነው። በይፋዊ የመንግስት መስሪያ ቤቶች ገና አልጸደቀም።"
  },

  om: {
    appTitle: "GIRMAIC EarthWise AI",
    appSubtitle: "Gorsa Qilleensaa fi Deeggarsa Murtee Qonnaa Itoophiyaa Prototype",
    founderCredit: "Hundeessaa fi Geggeessaa: Girma Haile Bunaro",
    demoBadge: "HAALA AGARSIISA — Raaga Qabatamaa Mitii",
    liveBadge: "ODEEFFANNOO QILLEENSAA KALLATTIIN HOJIRRA JIRA",
    staleBadge: "OOFEE: Odeeffannoo Ture (>Saa'a 48)",
    missingBadge: "OOFEE: Odeeffannoo Hanqatu",
    errorBadge: "DOGOGGORA WAL-QABSIISA",

    navOverview: "Walii-gala",
    navWeather: "Gubbaa Qilleensaa",
    navClimateAI: "Ibso Qilleensaa AI",
    navAgronomy: "Qajeelfama Qonnaa",
    navDataQuality: "Qorannoo Qulqullina Dataa",
    navFeedback: "Yaada",
    navAbout: "Sagalantaa Finfinne",
    navTestRoom: "Chamber Qorannoo",

    selectLocationLabel: "Bakka Qonnaa Filadhu:",
    currentAgroZone: "Aanaa Qilleensa Qonnaa:",
    primaryCropsLabel: "Midhaan Biqiltuu Isaa:",
    seasonContextLabel: "Haala Waqtii:",

    dataSourceModeLabel: "Madda Odeeffannoo:",
    modeDemo: "Dataa Agarsiisaa Baseline",
    modeLive: "Open-Meteo Live API",
    modeStale: "Qorannoo: Dataa Ture",
    modeMissing: "Qorannoo: Dataa Hanqatu",
    modeError: "Qorannoo: Dogoggora Wal-qabsiisaa",

    tempLabel: "Ho'ina",
    minMaxTemp: "Xiqqaa / Guddaa",
    rainLabel: "Rooba",
    rainProbLabel: "Carraa Roobaa",
    humidityLabel: "Jiidhinsa Qilleensaa",
    windLabel: "Qilleensa Ariitii",
    soilMoistureLabel: "Jiidhinsa Biyyoo",
    sevenDayForecast: "Raaga Qilleensaa Guyyaa 7",

    aiExplanationHeader: "Ibso Qilleensaa Gemini AI",
    aiDisclaimerNote: "GORSA OFFANNOO: Ibsawwan kanneen haala qilleensa naannoo fi qorannoo qonnaa irratti kan hudaa'anidha. Raaga mootummaa rasmia miti.",
    guaranteeWarning: "Wabiin roobaa, oomisha midhaanii, ykn kisaaraa ittisuu hin kennamu.",
    consultDA: "Murteewwan eeggannoo guddaa barbaadaniif (fkn, faalama keemikaalaa ykn sanyii fachuuf), ogeessa qonnaa ganda keessanii (DA) mariisisaa.",

    qualityScore: "Qabxii Qulqullina Dataa:",
    lastUpdated: "Yeroo Maayyi Haara'oome:",
    dataSource: "Madda Dataa:",
    missingFieldsDetected: "Odeeffannoo Hanqate:",
    allFieldsPresent: "Odeeffannoon gurguddoon guutuu dha.",

    feedbackTitle: "Yaada Uummataa fi Qorattootaa",
    feedbackDesc: "Gorsa qulqulleessuuf yaada keessan nuuf ergaa.",
    clarityRatingLabel: "Afaan gorsaa hammam ifa?",
    usefulnessLabel: "Murtee qonnaaf hammam fayyadaa?",
    commentsLabel: "Yaada dabalataa:",
    submitFeedback: "Yaada Ergi",
    feedbackThankYou: "Galatoomaa! Yaadni keessan GIRMAIC EarthWise AI fooyyessuuf ni gargaara.",

    aboutTitle: "Muxannoo GIRMAIC EarthWise AI",
    missionStatement: "Meeshaalee odeeffannoo qilleensaa gargaaran uummata Itoophiyaatiif dhiyeessuu.",
    founderBio: "GIRMAIC EarthWise AI kan hundeeffame Girma Haile Bunaro tiin.",
    disclaimerText: "Mul'ata 0.1 dha. Mootummaadhaan hin mirkanaagrre."
  },

  ti: {
    appTitle: "ጊርማይክ ኢርዝዋይዝ ኤአይ",
    appSubtitle: "ምክሪ አየር ንብረትን ደገፍ ውሳነ ሕረሻን - ኢትዮጵያ",
    founderCredit: "መስራችን መራሕን፦ ግርማ ሀይሌ ቡናሮ",
    demoBadge: "ናይ መርኣያ ኩነታት — ናይ ብሓቂ ትንበያ አይኮነን",
    liveBadge: "ቀጥታ ሓበሬታ አየር ንብረት ንቁሕ እዩ",
    staleBadge: "ማስጠንቀቕታ፦ ዝፀንሐ ሓበሬታ (>48 ሰዓት)",
    missingBadge: "ማስጠንቀቕታ፦ ዘይተማልአ ሓበሬታ",
    errorBadge: "ናይ ምትእስሳር ጌጋ",

    navOverview: "ሓፈሻዊ ትሕዝቶ",
    navWeather: "ሰሌዳ አየር ንብረት",
    navClimateAI: "መብርሂ አየር ንብረት ኤአይ",
    navAgronomy: "መመርሒ ሕረሻ",
    navDataQuality: "መመርመሪ ጥራት ሓበሬታ",
    navFeedback: "ርኢቶ",
    navAbout: "ብዛዕባ ፕሮጀክት",
    navTestRoom: "ክፍሊ ፈተነ",

    selectLocationLabel: "ቦታ ሕረሻ ሕረዩ፦",
    currentAgroZone: "ዞባ ስነ-ምህዳር፦",
    primaryCropsLabel: "ቀንድታት ዝራእቲ፦",
    seasonContextLabel: "ወቕታዊ ኩነታት፦",

    dataSourceModeLabel: "ምንጪ ሓበሬታ፦",
    modeDemo: "ናይ መርኣያ መወከሲ ሓበሬታ",
    modeLive: "ኦፕን-ሜቴኦ ቀጥታ ኤፒአይ",
    modeStale: "ፈተነ፦ ዝፀንሐ ሓበሬታ",
    modeMissing: "ፈተነ፦ ዝጎደለ ሓበሬታ",
    modeError: "ፈተነ፦ ናይ ጌጋ ኩነታት",

    tempLabel: "ሙቐት",
    minMaxTemp: "ትሑት / ልዑል",
    rainLabel: "መጠን ዝናብ",
    rainProbLabel: "ዕድል ዝናብ",
    humidityLabel: "ርጥበት አየር",
    windLabel: "ፍጥነት ንፋስ",
    soilMoistureLabel: "ርጥበት ሓመድ",
    sevenDayForecast: "ናይ 7 መዓልቲ ትንበያ አየር",

    aiExplanationHeader: "መብርሂ አየር ንብረት ጄሚናይ ኤአይ",
    aiDisclaimerNote: "ጥንቃቐ ዝመልኦ ምክሪ፦ እቶም ዝተፈጠሩ መብርሂታት ናይ ከባቢ አየር ንብረትን ዝተገምገሙ ናይ ሕረሻ ምርምራትን መሠረት ዝገበሩ እዮም።",
    guaranteeWarning: "ናይ ዝናብ ወይም ፍርያት ዋሕስ አይወሃብን።",
    consultDA: "ንዓበይቲ ውሳነታት ምስ ናይ ከባቢኹም ክኢላ ሕረሻ (DA) ተማኸሩ።",

    qualityScore: "ነጥቢ ጥራት ሓበሬታ፦",
    lastUpdated: "መወዳእታ ዝተመሓየሸሉ፦",
    dataSource: "ምንጪ ሓበሬታ፦",
    missingFieldsDetected: "ዝጎደሉ ሓበሬታታት፦",
    allFieldsPresent: "ኩሎም ዋና መለክኢታት ተማሊኦም እዮም።",

    feedbackTitle: "ርኢቶ ህዝብን ገምገምትን",
    feedbackDesc: "ነቲ ምክሪ ንምምሕያሽ ርኢቶኹም ሃቡ።",
    clarityRatingLabel: "እቲ ቋንቋ ክንደይ ዝኣክል ግልፂ እዩ?",
    usefulnessLabel: "ንውሳነ ሕረሻ ክንደይ ይሕግዝ?",
    commentsLabel: "ተወሳኺ ርኢቶ፦",
    submitFeedback: "ርኢቶ ስደድ",
    feedbackThankYou: "የቐንየልና! ርኢቶኹም ንጊርማይክ ኢርዝዋይዝ ኤአይ ንምምሕያሽ ይሕግዝ።",

    aboutTitle: "ብዛዕባ ጊርማይክ ኢርዝዋይዝ ኤአይ",
    missionStatement: "ንማሕበረሰብ ኢትዮጵያ ዝሕግዙ ናይ አየር ንብረት ሓበሬታ መሳርሒታት ምልማዕ።",
    founderBio: "ጊርማይክ ኢርዝዋይዝ ኤአይ ብግርማ ሀይሌ ቡናሮ ዝተመሠረተ እዩ።",
    disclaimerText: "ቨርዥን 0.1 ናይ ቴክኖሎጂ መርኣያ እዩ።"
  }
};
