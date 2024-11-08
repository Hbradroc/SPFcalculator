import React, { useState } from 'react';
import { Calculator, RefreshCw, Download } from 'lucide-react';
import { InputField } from './InputField';
import { ResultsPanel } from './ResultsPanel';
import { calculateSPF, calculatePressureDrop, type CalculationResults } from '../utils/calculations';
import { generatePDF } from '../utils/pdfGenerator';

export const SPFCalculator: React.FC = () => {
  const [isMetric, setIsMetric] = useState(true);
  const [fanPower, setFanPower] = useState('');
  const [airflow, setAirflow] = useState('');
  const [pressureDrop, setPressureDrop] = useState('');
  const [results, setResults] = useState<CalculationResults | null>(null);

  const handleCalculate = () => {
    const power = parseFloat(fanPower);
    const flow = parseFloat(airflow);
    const pressure = parseFloat(pressureDrop);
    
    if (power && flow && power > 0 && flow > 0) {
      const results = calculateSPF(power, flow, isMetric);
      
      if (pressure > 0) {
        results.pressureDrop = calculatePressureDrop(power, flow, pressure, isMetric);
        results.efficiency = results.pressureDrop.efficiency;
      }
      
      setResults(results);
    } else {
      setResults(null);
    }
  };

  const toggleUnits = () => {
    setIsMetric(!isMetric);
    setFanPower('');
    setAirflow('');
    setPressureDrop('');
    setResults(null);
  };

  const handleExportPDF = () => {
    if (results) {
      generatePDF(results, isMetric);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Calculator className="h-6 w-6 text-blue-600" />
          <h2 className="text-xl font-semibold text-gray-900">SPF Calculator</h2>
        </div>
        <div className="flex items-center space-x-4">
          {results && (
            <button
              onClick={handleExportPDF}
              className="flex items-center space-x-1 text-sm font-medium text-green-600 hover:text-green-800 transition-colors"
            >
              <Download className="h-4 w-4" />
              <span>Export PDF</span>
            </button>
          )}
          <button
            onClick={toggleUnits}
            className="flex items-center space-x-1 text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
          >
            <RefreshCw className="h-4 w-4" />
            <span>{isMetric ? 'Switch to Imperial' : 'Switch to Metric'}</span>
          </button>
        </div>
      </div>

      <div className="space-y-4">
        <InputField
          label="Fan Power"
          value={fanPower}
          onChange={setFanPower}
          unit={isMetric ? 'kW' : 'HP'}
          placeholder={`Enter fan power in ${isMetric ? 'kilowatts' : 'horsepower'}`}
        />

        <InputField
          label="Air Flow Rate"
          value={airflow}
          onChange={setAirflow}
          unit={isMetric ? 'm³/s' : 'CFM'}
          placeholder={`Enter air flow rate in ${isMetric ? 'cubic meters per second' : 'cubic feet per minute'}`}
        />

        <InputField
          label="Total Pressure Drop (optional)"
          value={pressureDrop}
          onChange={setPressureDrop}
          unit={isMetric ? 'Pa' : 'in.w.g'}
          placeholder={`Enter pressure drop in ${isMetric ? 'Pascals' : 'inches of water gauge'}`}
        />

        <button
          onClick={handleCalculate}
          className="w-full bg-blue-600 text-white rounded-md py-2 px-4 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
        >
          Calculate
        </button>

        {results && <ResultsPanel results={results} isMetric={isMetric} />}
      </div>
    </div>
  );
};