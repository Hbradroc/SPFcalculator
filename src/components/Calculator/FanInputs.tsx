import React from 'react';
import { UnitSystem, unitLabels } from '../../utils/units';

interface FanInputProps {
  title: string;
  fan: {
    power: string;
    airflow: string;
    pressureDrop: string;
  };
  setFan: (fan: any) => void;
  unitSystem: UnitSystem;
}

export function FanInputs({ title, fan, setFan, unitSystem }: FanInputProps) {
  const units = unitLabels[unitSystem];

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
      <div className="space-y-2">
        <label htmlFor={`${title}-power`} className="block text-sm font-medium text-gray-700">
          Power ({units.power})
        </label>
        <input
          type="number"
          id={`${title}-power`}
          value={fan.power}
          onChange={(e) => setFan({ ...fan, power: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
          placeholder={`Enter ${title.toLowerCase()} power in ${units.power}`}
          step="0.01"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor={`${title}-airflow`} className="block text-sm font-medium text-gray-700">
          Air Flow Rate ({units.airflow})
        </label>
        <input
          type="number"
          id={`${title}-airflow`}
          value={fan.airflow}
          onChange={(e) => setFan({ ...fan, airflow: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
          placeholder={`Enter ${title.toLowerCase()} air flow rate in ${units.airflow}`}
          step="0.001"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor={`${title}-pressure`} className="block text-sm font-medium text-gray-700">
          Initial Pressure Drop ({units.pressure})
        </label>
        <input
          type="number"
          id={`${title}-pressure`}
          value={fan.pressureDrop}
          onChange={(e) => setFan({ ...fan, pressureDrop: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
          placeholder={`Enter ${title.toLowerCase()} pressure drop in ${units.pressure}`}
          step="0.01"
        />
      </div>
    </div>
  );
}