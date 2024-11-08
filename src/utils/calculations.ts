export interface PressureDropResult {
  totalPressure: number;
  efficiency: number;
}

export interface CalculationResults {
  SFP: number;
  SFPImperial: number;
  pressureDrop: PressureDropResult | null;
  efficiency: number | null;
  flow: {
    metric: number;
    imperial: number;
  };
  power: {
    metric: number;
    imperial: number;
  };
}

// Conversion constants
const CFM_TO_M3S = 0.000471947443;  // 1 CFM = 0.000471947443 m³/s
const HP_TO_KW = 0.745699872;       // 1 HP = 0.745699872 kW
const PA_TO_IN_WG = 0.004014631;    // 1 Pa = 0.004014631 in.w.g

export const convertToMetric = {
  flow: (cfm: number): number => cfm * CFM_TO_M3S,
  power: (hp: number): number => hp * HP_TO_KW,
  pressure: (inWg: number): number => inWg / PA_TO_IN_WG
};

export const convertToImperial = {
  flow: (m3s: number): number => m3s / CFM_TO_M3S,
  power: (kw: number): number => kw / HP_TO_KW,
  pressure: (pa: number): number => pa * PA_TO_IN_WG
};

export const calculateSFP = (power: number, flow: number, isMetric: boolean): CalculationResults => {
  // Convert to metric if imperial values provided
  const powerMetric = isMetric ? power : convertToMetric.power(power);
  const flowMetric = isMetric ? flow : convertToMetric.flow(flow);
  
  // Calculate SFP in both units
  const SFPMetric = parseFloat((powerMetric / flowMetric).toFixed(2));
  const SFPImperial = parseFloat((power / flow).toFixed(2));

  return {
    SFP: SFPMetric,
    SFPImperial,
    pressureDrop: null,
    efficiency: null,
    flow: {
      metric: flowMetric,
      imperial: isMetric ? convertToImperial.flow(flow) : flow
    },
    power: {
      metric: powerMetric,
      imperial: isMetric ? convertToImperial.power(power) : power
    }
  };
};

export const calculatePressureDrop = (
  power: number,
  flow: number,
  pressureDrop: number,
  isMetric: boolean
): PressureDropResult => {
  // Convert to metric if imperial values provided
  const powerMetric = isMetric ? power : convertToMetric.power(power);
  const flowMetric = isMetric ? flow : convertToMetric.flow(flow);
  const pressureMetric = isMetric ? pressureDrop : convertToMetric.pressure(pressureDrop);
  
  // Convert kW to W for calculation
  const powerInWatts = powerMetric * 1000;
  
  // Calculate efficiency
  const theoreticalPower = (flowMetric * pressureMetric);
  const efficiency = theoreticalPower / powerInWatts;

  return {
    totalPressure: pressureMetric,
    efficiency
  };
};