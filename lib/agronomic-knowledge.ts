export interface CropGuidanceRule {
  cropName: string;
  amharicName: string;
  seasonContext: string;
  sowingWindowAdvice: string;
  moistureManagement: string;
  pestDiseaseWatch: string;
  harvestingStorageAdvice: string;
  cautionaryWarning: string;
}

export interface AgroRulebook {
  generalRules: string[];
  disclaimers: string[];
  cropGuidance: Record<string, CropGuidanceRule>;
}

export const REVIEWED_AGRONOMIC_KNOWLEDGE: AgroRulebook = {
  generalRules: [
    "Always align field operations with observed topsoil moisture (upper 5-10 cm) rather than calendar dates alone.",
    "For vertisol (black soil) areas like Bishoftu, avoid planting teff into saturated standing water to prevent seed rot.",
    "In drought-sensitive rift valley locations (e.g. Ziway), apply crop residue mulching or tied-ridging to preserve moisture during dry spells.",
    "During intense convective rain events, ensure field drainage channels (Maresha furrows / Shuruba) are open to limit waterlogging.",
    "Consult local Kebele Development Agents (DAs) and Woreda Agriculture Extension officers before applying high-cost fertilizers or agrochemicals."
  ],
  disclaimers: [
    "Advisory output is purely decision-support information based on regional meteorological patterns and reviewed agronomic research.",
    "No guarantee of crop yield, rainfall duration, or financial protection against climate extremes is expressed or implied.",
    "Local microclimates, soil fertility variations, and seed strain characteristics require on-ground field validation."
  ],
  cropGuidance: {
    'Teff (Quncho)': {
      cropName: 'Teff (Quncho & Local Strains)',
      amharicName: 'ጤፍ (ቁንጮ)',
      seasonContext: 'Meher Main Season',
      sowingWindowAdvice: 'Prepare fine, firm seedbed (3-4 ploughings with Maresha). Sow when soil moisture is steady and light rain is anticipated.',
      moistureManagement: 'Teff requires adequate moisture at germination (0-14 days). Excessive heavy downpours immediately after broadcasting can wash fine seeds away.',
      pestDiseaseWatch: 'Monitor for Teff Shoot Fly and Head Bug during early vegetative growth. Check for lodging (collapse) if nitrogen fertilizer was heavy.',
      harvestingStorageAdvice: 'Harvest when panicles turn golden straw color. Dry thoroughly on clean threshing ground (Wa\'ima) before storage to prevent mold.',
      cautionaryWarning: 'Do not broadcast teff seed when heavy convective storm warnings are active for the same afternoon.'
    },
    'Bread Wheat': {
      cropName: 'Bread Wheat & Durum Wheat',
      amharicName: 'ስንዴ',
      seasonContext: 'Highland / Midland Meher',
      sowingWindowAdvice: 'Optimum sowing occurs when topsoil moisture extends 15 cm deep. Row sowing at 25-30 cm spacing improves yield over broadcasting.',
      moistureManagement: 'Critical water stages: Tillering, Flowering, and Grain Filling. Prolonged dry spells during flowering drastically reduce head filling.',
      pestDiseaseWatch: 'High relative humidity (>75%) coupled with warm daytime temperatures increases risk of Yellow (Stripe) Rust and Stem Rust.',
      harvestingStorageAdvice: 'Harvest when grain moisture drops below 13-14%. Store in airtight Purdue Improved Crop Storage (PICS) bags or sealed Gotera.',
      cautionaryWarning: 'If rust symptoms (yellow or reddish pustules on leaves) appear, notify local Development Agents immediately for fungicide guidance.'
    },
    'Maize': {
      cropName: 'Hybrids & Open-Pollinated Maize',
      amharicName: 'በቆሎ',
      seasonContext: 'Belg & Meher Seasons',
      sowingWindowAdvice: 'Sow at onset of consistent seasonal rains into moist soil at 5 cm depth with 75 cm row spacing.',
      moistureManagement: 'High water requirement from silking to milk stage. Use tied ridges in semi-arid zones to capture rainfall.',
      pestDiseaseWatch: 'Scout weekly for Fall Armyworm (FAW) egg masses and leaf-whorl frass damage. Check for Maize Lethal Necrosis Disease (MLND).',
      harvestingStorageAdvice: 'Ensure cobs are dry before shelling to prevent aflatoxin contamination.',
      cautionaryWarning: 'Early dry spells during silking severely impede cob formation. Do not apply top-dressing urea during severe drought stress.'
    },
    'Arabica Coffee': {
      cropName: 'Ethiopian Garden Arabica Coffee',
      amharicName: 'ቡና',
      seasonContext: 'Sub-humid / Forest Zones',
      sowingWindowAdvice: 'Pruning and shade tree management should be synchronized with early rainfall transitions.',
      moistureManagement: 'Mulching with vetiver grass or banana leaves reduces root zone moisture evaporation by up to 40%.',
      pestDiseaseWatch: 'Watch for Coffee Berry Disease (CBD) during prolonged humid rainy periods and Coffee Leaf Rust (CLR) in warmer mid-altitudes.',
      harvestingStorageAdvice: 'Pick only fully ripe red cherries. Dry on raised African drying beds with frequent turnings.',
      cautionaryWarning: 'Avoid over-clearing shade trees, as intense solar exposure combined with mid-season heat stress wilts flower buds.'
    }
  }
};
