import React from 'react';
import { FanCalculationResult } from '../../utils/calculations';
import { FileDown } from 'lucide-react';

interface ResultsProps {
  resultClean: FanCalculationResult | null;
  resultDirty: FanCalculationResult | null;
  onGenerateReport: () => void;
}

export function Results({ resultClean, resultDirty, onGenerateReport }: ResultsProps) {
  if (!resultClean && !resultDirty) return null;

  const getRatingColor = (rating: string) => {
    switch (rating) {
      case 'Excellent':
      case 'Good':
        return 'text-green-600';
      case 'Fair':
        return 'text-yellow-600';
      default:
        return 'text-red-600';
    }
  };

  const renderResult = (result: FanCalculationResult | null, label: string) => {
    if (!result) return null;
    return (
      <div className="space-y-2">
        <h3 className="font-semibold text-gray-800">{label}</h3>
        <div className="flex items-center gap-3">
          <p className="text-2xl font-bold text-indigo-600">
            {result.sfp} W/(m³/s)
          </p>
          <span className={`font-medium ${getRatingColor(result.rating)}`}>
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
    <div className="mt-6 p-4 bg-indigo-50 rounded-lg space-y-6">
      {renderResult(resultClean, "SFPv (Clean Filter)")}
      {renderResult(resultDirty, "SFPe (Dirty Filter)")}
      
      <button
        onClick={onGenerateReport}
        className="w-full mt-4 bg-white text-indigo-600 border border-indigo-600 py-2 rounded-lg hover:bg-indigo-50 transition flex items-center justify-center gap-2"
      >
        <FileDown className="w-5 h-5" />
        Download Report
      </button>
    </div>
  );
}