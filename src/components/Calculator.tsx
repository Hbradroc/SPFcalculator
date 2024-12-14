import React from 'react';
import { Calculator as CalculatorIcon, FileDown, Info, RefreshCw } from 'lucide-react';
import { UnitSystem, unitLabels } from '../utils/units';
import { FanCalculationResult } from '../utils/calculations';

interface FanInputs {
  power: string;
  airflow: string;
  pressureDrop: string;
}

interface CalculatorProps {
  supplyFan: FanInputs;
  extractFan: FanInputs;
  resultClean: FanCalculationResult | null;
  resultDirty: FanCalculationResult | null;
  setSupplyFan: (fan: FanInputs) => void;
  setExtractFan: (fan: FanInputs) => void;
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
  const units = unitLabels[unitSystem];

  const renderResult = (result: FanCalculationResult | null, label: string) => {
    if (!result) return null;
    return (
      <div className="space-y-2">
        <h3 className="font-semibold text-gray-800">{label}</h3>
        <div className="flex items-center gap-3">
          <p className="text-2xl font-bold text-indigo-600">
            {result.sfp} W/(m³/s)
          </p>
          <span className={`font-medium ${
            result.rating === 'Excellent' || result.rating === 'Good' 
              ? 'text-green-600' 
              : result.rating === 'Fair' 
                ? 'text-yellow-600' 
                : 'text-red-600'
          }`}>
            {result.rating}
          </span>
        </div>
        <p className="text-gray-600">
          System Efficiency: {result.efficiency}%
        </p>
      </div>
    );
  };

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

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">Supply Fan</h3>
          <div className="space-y-2">
            <label htmlFor="supply-power" className="block text-sm font-medium text-gray-700">
              Power ({units.power})
            </label>
            <input
              type="number"
              id="supply-power"
              value={supplyFan.power}
              onChange={(e) => setSupplyFan({ ...supplyFan, power: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
              placeholder={`Enter supply fan power in ${units.power}`}
              step="0.01"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="supply-airflow" className="block text-sm font-medium text-gray-700">
              Air Flow Rate ({units.airflow})
            </label>
            <input
              type="number"
              id="supply-airflow"
              value={supplyFan.airflow}
              onChange={(e) => setSupplyFan({ ...supplyFan, airflow: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
              placeholder={`Enter supply air flow rate in ${units.airflow}`}
              step="0.001"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="supply-pressure" className="block text-sm font-medium text-gray-700">
              Initial Pressure Drop ({units.pressure})
            </label>
            <input
              type="number"
              id="supply-pressure"
              value={supplyFan.pressureDrop}
              onChange={(e) => setSupplyFan({ ...supplyFan, pressureDrop: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
              placeholder={`Enter supply pressure drop in ${units.pressure}`}
              step="0.01"
            />
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">Extract Fan (Optional)</h3>
          <div className="space-y-2">
            <label htmlFor="extract-power" className="block text-sm font-medium text-gray-700">
              Power ({units.power})
            </label>
            <input
              type="number"
              id="extract-power"
              value={extractFan.power}
              onChange={(e) => setExtractFan({ ...extractFan, power: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
              placeholder={`Enter extract fan power in ${units.power}`}
              step="0.01"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="extract-airflow" className="block text-sm font-medium text-gray-700">
              Air Flow Rate ({units.airflow})
            </label>
            <input
              type="number"
              id="extract-airflow"
              value={extractFan.airflow}
              onChange={(e) => setExtractFan({ ...extractFan, airflow: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
              placeholder={`Enter extract air flow rate in ${units.airflow}`}
              step="0.001"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="extract-pressure" className="block text-sm font-medium text-gray-700">
              Initial Pressure Drop ({units.pressure})
            </label>
            <input
              type="number"
              id="extract-pressure"
              value={extractFan.pressureDrop}
              onChange={(e) => setExtractFan({ ...extractFan, pressureDrop: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
              placeholder={`Enter extract pressure drop in ${units.pressure}`}
              step="0.01"
            />
          </div>
        </div>

        <button
          onClick={calculateSFP}
          className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition flex items-center justify-center gap-2"
        >
          <CalculatorIcon className="w-5 h-5" />
          Calculate
        </button>

        {(resultClean || resultDirty) && (
          <div className="mt-6 p-4 bg-indigo-50 rounded-lg space-y-6">
            {renderResult(resultClean, "SFPv (Clean Filter)")}
            {renderResult(resultDirty, "SFPe (Dirty Filter)")}
            
            <button
              onClick={onGenerateReport}
              className="w-full mt-4 bg-white text-indigo-600 border border-indigo-600 py-2 rounded-lg hover:bg-indigo-50 transition flex items-center justify-center gap-2"
            >
              <FileDown className="w-5 h-5" />
              Generate Report
            </button>
          </div>
        )}
      </div>

      <div className="mt-8 p-4 bg-blue-50 rounded-lg">
        <div className="flex items-start gap-3">
          <Info className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-blue-900 mb-1">Eurovent Requirements</h3>
            <p className="text-sm text-blue-800">
              SFPv represents clean filter conditions, while SFPe accounts for dirty filter conditions with increased pressure drop and reduced efficiency according to Eurovent standards.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}