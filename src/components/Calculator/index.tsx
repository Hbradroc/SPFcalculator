import React from 'react';
import { Calculator as CalculatorIcon, RefreshCw } from 'lucide-react';
import { FanInputs } from './FanInputs';
import { Results } from './Results';
import { UnitSystem } from '../../utils/units';
import { FanCalculationResult } from '../../utils/calculations';

interface CalculatorProps {
  supplyFan: {
    power: string;
    airflow: string;
    pressureDrop: string;
  };
  extractFan: {
    power: string;
    airflow: string;
    pressureDrop: string;
  };
  resultClean: FanCalculationResult | null;
  resultDirty: FanCalculationResult | null;
  setSupplyFan: (fan: any) => void;
  setExtractFan: (fan: any) => void;
  calculateSFP: () => void;
  unitSystem: UnitSystem;
  setUnitSystem: (system: UnitSystem) => void;
  onGenerateReport: () => void;
}

export function Calculator({
  supplyFan,
  extractFan,
  resultClean,
  resultDirty,
  setSupplyFan,
  setExtractFan,
  calculateSFP,
  unitSystem,
  setUnitSystem,
  onGenerateReport
}: CalculatorProps) {
  return (
    <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-xl p-8">
      <div className="space-y-6">
        <div className="flex justify-end">
          <button
            onClick={() => setUnitSystem(unitSystem === 'metric' ? 'imperial' : 'metric')}
            className="flex items-center gap-2 text-sm text-indigo-600 hover:text-indigo-700 transition"
          >
            <RefreshCw className="w-4 h-4" />
            Switch to {unitSystem === 'metric' ? 'Imperial' : 'Metric'}
          </button>
        </div>

        <FanInputs
          title="Supply Fan"
          fan={supplyFan}
          setFan={setSupplyFan}
          unitSystem={unitSystem}
        />

        <FanInputs
          title="Extract Fan"
          fan={extractFan}
          setFan={setExtractFan}
          unitSystem={unitSystem}
        />

        <button
          onClick={calculateSFP}
          className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition flex items-center justify-center gap-2"
        >
          <CalculatorIcon className="w-5 h-5" />
          Calculate
        </button>

        <Results
          resultClean={resultClean}
          resultDirty={resultDirty}
          onGenerateReport={onGenerateReport}
        />
      </div>
    </div>
  );
}