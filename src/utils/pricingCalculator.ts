
interface Configuration {
  width: { cm: number; mm: number };
  height: { cm: number; mm: number };
  measurementGuarantee: boolean;
  controlType: string;
  additionalRemote: boolean;
  smartHubQuantity: number;
}

interface PricingBreakdown {
  basePrice: number;
  measurementGuarantee: number;
  motorised: number;
  additionalRemote: number;
  smartHub: number;
  total: number;
}

export const calculatePrice = (config: Configuration): PricingBreakdown => {
  // Convert dimensions to millimeters for calculation
  const widthMm = (config.width?.cm || 0) * 10 + (config.width?.mm || 0);
  const heightMm = (config.height?.cm || 0) * 10 + (config.height?.mm || 0);
  
  // Base price calculation: width × height × rate
  const basePrice = Math.round((widthMm * heightMm * 0.000042) * 100) / 100;
  
  // Add-ons
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
