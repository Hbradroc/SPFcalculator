export interface FilterState {
  pressureDrop: number;
  efficiency: number;
}

export interface FanData {
  power: number;
  airflow: number;
  pressureDrop: number;
}

export interface FanCalculationResult {
  sfp: number;
  efficiency: number;
  rating: 'Excellent' | 'Good' | 'Fair' | 'Poor';
  totalPower: number;
}

export interface ValidationResult {
  sfpv: number;
  isValid: boolean;
  validationNotes: string[];
  designAirflow: number;
  actualPower: number;
}