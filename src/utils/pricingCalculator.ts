
interface Configuration {
  width: number; // in mm
  height: number; // in mm
  measurementGuarantee: boolean;
  controlType: string;
  additionalRemote: boolean;
  smartHubQuantity: number;
  fabricType: string;
}

interface PricingBreakdown {
  basePrice: number;
  measurementGuarantee: number;
  motorised: number;
  additionalRemote: number;
  smartHub: number;
  total: number;
}

// Pricing table based on width (columns) and height (rows) in mm
const PRICING_TABLE = {
  // Height ranges (rows)
  heightRanges: [
    { min: 300, max: 600 },
    { min: 601, max: 900 },
    { min: 901, max: 1200 },
    { min: 1201, max: 1500 },
    { min: 1501, max: 1800 },
    { min: 1801, max: 2100 },
    { min: 2101, max: 2400 },
    { min: 2401, max: 2700 },
    { min: 2701, max: 3000 },
    { min: 3001, max: 3300 },
    { min: 3301, max: 3600 },
    { min: 3601, max: 3900 }
  ],
  // Width ranges (columns)
  widthRanges: [
    { min: 530, max: 900 },
    { min: 901, max: 1200 },
    { min: 1201, max: 1500 },
    { min: 1501, max: 1800 },
    { min: 1801, max: 2100 },
    { min: 2101, max: 2400 },
    { min: 2401, max: 2700 },
    { min: 2701, max: 3000 }
  ],
  // Pricing matrix [height][width]
  prices: [
    [560, 595, 625, 655, 690, 740, 790, 840], // 300-600mm height
    [580, 610, 645, 670, 705, 755, 805, 855], // 601-900mm height
    [600, 625, 665, 685, 720, 770, 820, 870], // 901-1200mm height
    [620, 640, 685, 700, 735, 785, 835, 885], // 1201-1500mm height
    [640, 655, 705, 730, 770, 825, 860, 920], // 1501-1800mm height
    [660, 670, 725, 750, 795, 845, 880, 940], // 1801-2100mm height
    [680, 685, 745, 770, 815, 865, 900, 960], // 2101-2400mm height
    [700, 700, 765, 790, 835, 890, 920, 980], // 2401-2700mm height
    [720, 715, 785, 810, 850, 905, 940, 1000], // 2701-3000mm height
    [740, 730, 805, 830, 865, 920, 960, 1020], // 3001-3300mm height
    [760, 745, 825, 850, 880, 935, 980, 1040], // 3301-3600mm height
    [780, 760, 845, 870, 895, 950, 1000, 1060] // 3601-3900mm height
  ]
};

const findPriceIndex = (value: number, ranges: Array<{min: number, max: number}>): number => {
  for (let i = 0; i < ranges.length; i++) {
    if (value >= ranges[i].min && value <= ranges[i].max) {
      return i;
    }
  }
  return -1; // Out of range
};

export const calculatePrice = (config: Configuration): PricingBreakdown => {
  const widthMm = config.width || 0;
  const heightMm = config.height || 0;
  
  // Find the appropriate price from the table
  const heightIndex = findPriceIndex(heightMm, PRICING_TABLE.heightRanges);
  const widthIndex = findPriceIndex(widthMm, PRICING_TABLE.widthRanges);
  
  let basePrice = 0;
  
  // Check if dimensions are within our pricing table ranges
  if (heightIndex >= 0 && widthIndex >= 0) {
    basePrice = PRICING_TABLE.prices[heightIndex][widthIndex];
  } else {
    // Handle out of range dimensions - you might want to show an error or use a default
    basePrice = 50; // Minimum price fallback
  }
  
  // Add-ons (same as before)
  const measurementGuarantee = config.measurementGuarantee ? 40 : 0;
  const motorised = config.controlType === 'motorised' ? 299 : 0;
  const additionalRemote = config.additionalRemote ? 129 : 0;
  const smartHub = (config.smartHubQuantity || 0) * 129;
  
  const total = basePrice + measurementGuarantee + motorised + additionalRemote + smartHub;
  
  return {
    basePrice: Math.max(basePrice, 50), // Minimum base price
    measurementGuarantee,
    motorised,
    additionalRemote,
    smartHub,
    total: Math.max(total, 50), // Minimum total price
  };
};
