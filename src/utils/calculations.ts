export interface FilterState {
  pressureDrop: number;
  efficiency: number;
}

export interface FanData {
  power: number; // kW
  airflow: number; // m³/s
  pressureDrop: number; // Pa
}

export interface FanCalculationResult {
  sfp: number;
  efficiency: number;
  rating: 'Excellent' | 'Good' | 'Fair' | 'Poor';
  totalPower: number;
  validationDetails?: {
    isValid: boolean;
    notes: string[];
    designAirflow: number;
  };
}

export const FILTER_STATES = {
  clean: {
    pressureDropFactor: 1,
    efficiencyFactor: 1
  },
  dirty: {
    pressureDropFactor: 2, // Eurovent assumes double pressure drop for dirty filters
    efficiencyFactor: 0.9 // 10% reduction in efficiency for dirty filters
  }
};

const DEFAULT_VALIDATION_CONDITIONS = {
  designLoad: 100,
  filterPressure: 0
};

export const calculateSystemSFP = (
  supplyFan: FanData,
  extractFan: FanData | undefined,
  filterState: 'clean' | 'dirty' = 'clean'
): FanCalculationResult => {
  const { pressureDropFactor, efficiencyFactor } = FILTER_STATES[filterState];
  
  // Calculate total power and maximum airflow
  const totalPower = supplyFan.power + (extractFan?.power || 0);
  const maxAirflow = Math.max(supplyFan.airflow, extractFan?.airflow || 0);
  
  // Calculate SFP (W/(m³/s)) for the entire system
  const sfp = (totalPower * 1000) / maxAirflow;
  
  // Calculate system efficiency considering both fans if present
  const supplyTheoretical = supplyFan.pressureDrop * pressureDropFactor * supplyFan.airflow;
  const extractTheoretical = extractFan 
    ? extractFan.pressureDrop * pressureDropFactor * extractFan.airflow 
    : 0;
  
  const totalTheoretical = supplyTheoretical + extractTheoretical;
  const totalActual = totalPower * 1000; // Convert kW to W
  
  const efficiency = (totalTheoretical / totalActual) * 100 * efficiencyFactor;

  // Determine rating based on SFP
  let rating: FanCalculationResult['rating'];
  if (sfp < 1000) rating = 'Excellent';
  else if (sfp < 2000) rating = 'Good';
  else if (sfp < 2500) rating = 'Fair';
  else rating = 'Poor';

  return {
    sfp: Number(sfp.toFixed(2)),
    efficiency: Number(efficiency.toFixed(1)),
    rating,
    totalPower
  };
};