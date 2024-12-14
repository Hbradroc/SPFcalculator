import { FanData } from './calculations';

export interface ValidationConditions {
  designLoad: number; // Percentage of design load (0-100)
  filterPressure: number; // Initial filter pressure drop in Pa
}

export interface ValidationResult {
  sfpv: number;
  isValid: boolean;
  validationNotes: string[];
  designAirflow: number;
  actualPower: number;
}

const VALIDATION_LIMITS = {
  minLoad: 70, // Minimum percentage of design load
  maxLoad: 100,
  pressureTolerancePercent: 10
};

export const validateSFPv = (
  fan: FanData,
  conditions: ValidationConditions
): ValidationResult => {
  const notes: string[] = [];
  
  // Calculate design airflow at validation conditions
  const designAirflow = fan.airflow * (conditions.designLoad / 100);
  
  // Calculate actual power consumption
  const actualPower = fan.power * 1000; // Convert to Watts
  
  // Calculate SFPv
  const sfpv = actualPower / designAirflow;
  
  // Validation checks
  let isValid = true;
  
  // Check load conditions
  if (conditions.designLoad < VALIDATION_LIMITS.minLoad) {
    isValid = false;
    notes.push(`Load condition ${conditions.designLoad}% is below minimum ${VALIDATION_LIMITS.minLoad}%`);
  }
  
  if (conditions.designLoad > VALIDATION_LIMITS.maxLoad) {
    isValid = false;
    notes.push(`Load condition ${conditions.designLoad}% exceeds maximum ${VALIDATION_LIMITS.maxLoad}%`);
  }
  
  // Check pressure conditions
  const pressureDifference = Math.abs(conditions.filterPressure - fan.pressureDrop);
  const pressureTolerance = fan.pressureDrop * (VALIDATION_LIMITS.pressureTolerancePercent / 100);
  
  if (pressureDifference > pressureTolerance) {
    isValid = false;
    notes.push(`Pressure difference exceeds ${VALIDATION_LIMITS.pressureTolerancePercent}% tolerance`);
  }
  
  if (notes.length === 0) {
    notes.push('All validation conditions met');
  }
  
  return {
    sfpv: Number(sfpv.toFixed(2)),
    isValid,
    validationNotes: notes,
    designAirflow: Number(designAirflow.toFixed(3)),
    actualPower: Number(actualPower.toFixed(2))
  };
};