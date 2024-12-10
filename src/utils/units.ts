export const convertUnits = {
  power: {
    kw_to_hp: (kw: number) => kw * 1.34102,
    hp_to_kw: (hp: number) => hp / 1.34102
  },
  airflow: {
    m3s_to_cfm: (m3s: number) => m3s * 2118.88,
    cfm_to_m3s: (cfm: number) => cfm / 2118.88
  },
  pressure: {
    pa_to_inwg: (pa: number) => pa * 0.004014,
    inwg_to_pa: (inwg: number) => inwg / 0.004014
  }
};

export type UnitSystem = 'metric' | 'imperial';

export interface UnitLabels {
  power: string;
  airflow: string;
  pressure: string;
}

export const unitLabels: Record<UnitSystem, UnitLabels> = {
  metric: {
    power: 'kW',
    airflow: 'm³/s',
    pressure: 'Pa'
  },
  imperial: {
    power: 'hp',
    airflow: 'CFM',
    pressure: 'inWG'
  }
};

export const getSFPRating = (sfp: number): {
  label: 'Excellent' | 'Good' | 'Fair' | 'Poor';
  color: string;
  icon: 'CheckCircle' | 'AlertTriangle' | 'XCircle';
} => {
  if (sfp < 1000) {
    return { label: 'Excellent', color: 'text-green-600', icon: 'CheckCircle' };
  } else if (sfp < 2000) {
    return { label: 'Good', color: 'text-green-600', icon: 'CheckCircle' };
  } else if (sfp < 2500) {
    return { label: 'Fair', color: 'text-yellow-600', icon: 'AlertTriangle' };
  } else {
    return { label: 'Poor', color: 'text-red-600', icon: 'XCircle' };
  }
};