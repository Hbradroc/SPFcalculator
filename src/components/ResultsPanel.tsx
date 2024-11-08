import React from 'react';
import { CheckCircle, AlertTriangle } from 'lucide-react';
import type { CalculationResults } from '../utils/calculations';

interface ResultsPanelProps {
  results: CalculationResults;
  isMetric: boolean;
}

export const ResultsPanel: React.FC<ResultsPanelProps> = ({ results, isMetric }) => {
  const getEfficiencyColor = (value: number) => {
    if (value < 1.5) return 'text-green-600';
    if (value < 2.5) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getEfficiencyIcon = (value: number) => {
    if (value < 2.5) {
      return <CheckCircle className="h-5 w-5 text-green-500" />;
    }
    return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
  };

  const formatNumber = (value: number): string => {
    return value.toLocaleString(undefined, { 
      minimumFractionDigits: 2,
      maximumFractionDigits: 2 
    });
  };

  return (
    <div className="mt-6 p-4 bg-gray-50 rounded-md space-y-4">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">Results</h3>
        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-1">
              {isMetric ? 'Metric SPF' : 'Imperial SPF'}
            </h4>
            <div className="flex items-baseline space-x-2">
              <span className={`text-3xl font-bold ${getEfficiencyColor(isMetric ? results.spf : results.spfImperial)}`}>
                {formatNumber(isMetric ? results.spf : results.spfImperial)}
              </span>
              <span className="text-gray-600">{isMetric ? 'kW/(m³/s)' : 'HP/CFM'}</span>
              {getEfficiencyIcon(isMetric ? results.spf : results.spfImperial)}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-4 border-t">
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-1">Power</h4>
              <div className="space-y-1">
                <p className="text-gray-600">
                  {formatNumber(results.power.metric)} kW
                </p>
                <p className="text-gray-600">
                  {formatNumber(results.power.imperial)} HP
                </p>
              </div>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-1">Flow Rate</h4>
              <div className="space-y-1">
                <p className="text-gray-600">
                  {formatNumber(results.flow.metric)} m³/s
                </p>
                <p className="text-gray-600">
                  {formatNumber(results.flow.imperial)} CFM
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {results.pressureDrop && (
        <div className="border-t pt-4">
          <h3 className="text-lg font-medium text-gray-900 mb-2">System Analysis</h3>
          <div className="space-y-2">
            <div className="flex justify-between items-baseline">
              <span className="text-gray-600">Total Pressure Drop:</span>
              <span className="font-semibold">
                {isMetric 
                  ? `${formatNumber(results.pressureDrop.totalPressure)} Pa`
                  : `${formatNumber(results.pressureDrop.totalPressure * 0.004014631)} in.w.g`}
              </span>
            </div>
            <div className="flex justify-between items-baseline">
              <span className="text-gray-600">Fan Efficiency:</span>
              <span className="font-semibold">
                {(results.pressureDrop.efficiency * 100).toFixed(1)}%
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};