import { FanData, FanCalculationResult } from './types';
import { FILTER_STATES } from './constants';

export * from './types';

export const calculateSystemSFP = (
  supplyFan: FanData,
  extractFan: FanData | undefined,
  filterState: 'clean' | 'dirty' = 'clean'
): FanCalculationResult => {
  const { pressureDropFactor, efficiencyFactor } = FILTER_STATES[filterState];
  
  const totalPower = supplyFan.power + (extractFan?.power || 0);
  const maxAirflow = Math.max(supplyFan.airflow, extractFan?.airflow || 0);
  
  const sfp = (totalPower * 1000) / maxAirflow;
  
  const supplyTheoretical = supplyFan.pressureDrop * pressureDropFactor * supplyFan.airflow;
  const extractTheoretical = extractFan 
    ? extractFan.pressureDrop * pressureDropFactor * extractFan.airflow 
    : 0;
  
  const totalTheoretical = supplyTheoretical + extractTheoretical;
  const totalActual = totalPower * 1000;
  
  const efficiency = (totalTheoretical / totalActual) * 100 * efficiencyFactor;

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