export interface EthiopianLocation {
  id: string;
  name: string;
  amharicName: string;
  oromooName: string;
  tigrinyaName: string;
  region: string;
  woreda: string;
  latitude: number;
  longitude: number;
  elevationMeters: number;
  agroZone: 'Highland (Dega)' | 'Midland (Weyna Dega)' | 'Lowland (Kolla)';
  primaryCrops: string[];
  currentSeasonContext: 'Belg (Short Rains)' | 'Meher (Main Rains)' | 'Bega (Dry Season)';
  description: string;
}

export const ETHIOPIAN_PILOT_LOCATIONS: EthiopianLocation[] = [
  {
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
  {
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
  {
    id: 'ziway',
    name: 'Ziway / Adami Tullu',
    amharicName: 'ዝዋይ / አዳሚ തുሉ',
    oromooName: 'Zway / Adaamii Tulluu',
    tigrinyaName: 'ዝዋይ / ኣዳሚ ቱሉ',
    region: 'Oromia',
    woreda: 'Adami Tullu Jido Kombolcha',
    latitude: 7.93,
    longitude: 38.72,
    elevationMeters: 1640,
    agroZone: 'Midland (Weyna Dega)',
    primaryCrops: ['Maize', 'Haricot Bean', 'Irrigated Tomatoes', 'Onions'],
    currentSeasonContext: 'Meher (Main Rains)',
    description: 'Rift valley lake zone susceptible to mid-season dry spells and heat stress.'
  },
  {
    id: 'bahir-dar',
    name: 'Bahir Dar / Zenzelma',
    amharicName: 'ባህር ዳር / ዘንዘልማ',
    oromooName: 'Baahir Daar / Zenzelma',
    tigrinyaName: 'ባሕር ዳር / ዘንዘልማ',
    region: 'Amhara',
    woreda: 'Bahir Dar Zuria',
    latitude: 11.59,
    longitude: 37.39,
    elevationMeters: 1800,
    agroZone: 'Midland (Weyna Dega)',
    primaryCrops: ['Teff', 'Finger Millet', 'Maize', 'Rice'],
    currentSeasonContext: 'Meher (Main Rains)',
    description: 'Lake Tana basin with high summer precipitation and red clay soils.'
  },
  {
    id: 'mekelle',
    name: 'Mekelle / Enderta',
    amharicName: 'መቀሌ / እንደርታ',
    oromooName: 'Meqelle / Enderta',
    tigrinyaName: 'መቐለ / እንደርታ',
    region: 'Tigray',
    woreda: 'Enderta Woreda',
    latitude: 13.49,
    longitude: 39.47,
    elevationMeters: 2250,
    agroZone: 'Highland (Dega)',
    primaryCrops: ['Barley', 'Durum Wheat', 'Teff', 'Sorghum'],
    currentSeasonContext: 'Bega (Dry Season)',
    description: 'Semi-arid highland catchment with erratic rainfall and moisture conservation priorities.'
  },
  {
    id: 'jimma',
    name: 'Jimma / Seka Chekorsa',
    amharicName: 'ጂማ / ሰቃ ጨቆርሳ',
    oromooName: 'Jimmaa / Saqaa Caqorsaa',
    tigrinyaName: 'ጂማ / ሰቃ ጨቆርሳ',
    region: 'Oromia',
    woreda: 'Seka Chekorsa',
    latitude: 7.67,
    longitude: 36.83,
    elevationMeters: 1780,
    agroZone: 'Midland (Weyna Dega)',
    primaryCrops: ['Arabica Coffee', 'Maize', 'Enset', 'Teff'],
    currentSeasonContext: 'Meher (Main Rains)',
    description: 'High-rainfall southwestern forest agro-ecosystem and coffee origin zone.'
  },
  {
    id: 'robe-bale',
    name: 'Robe / Bale Highlands',
    amharicName: 'ሮቤ / ባሌ',
    oromooName: 'Roobee / Baalee',
    tigrinyaName: 'ሮቤ / ባሌ',
    region: 'Oromia',
    woreda: 'Sinana Woreda',
    latitude: 7.12,
    longitude: 40.00,
    elevationMeters: 2480,
    agroZone: 'Highland (Dega)',
    primaryCrops: ['Highland Wheat', 'Barley', 'Faba Beans', 'Field Peas'],
    currentSeasonContext: 'Meher (Main Rains)',
    description: 'Ethiopia\'s major wheat basket with bimodal rainfall and cool temperatures.'
  }
];
