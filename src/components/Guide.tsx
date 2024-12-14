import React from 'react';
import { Lightbulb, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';

export function Guide() {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 h-full">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        <Lightbulb className="w-6 h-6 text-yellow-500" />
        Performance Guide
      </h2>

      <div className="space-y-8">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Typical SFP Values</h3>
          <div className="space-y-4">
            <div className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-green-500 mt-1" />
              <div>
                <p className="font-medium text-gray-700">Excellent: &lt; 1000 W/(m³/s)</p>
                <p className="text-sm text-gray-600">Modern, highly efficient systems</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-green-500 mt-1" />
              <div>
                <p className="font-medium text-gray-700">Good: 1000-2000 W/(m³/s)</p>
                <p className="text-sm text-gray-600">Typical for new installations</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <AlertTriangle className="w-5 h-5 text-yellow-500 mt-1" />
              <div>
                <p className="font-medium text-gray-700">Fair: 2000-2500 W/(m³/s)</p>
                <p className="text-sm text-gray-600">Common in older systems</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <XCircle className="w-5 h-5 text-red-500 mt-1" />
              <div>
                <p className="font-medium text-gray-700">Poor: &gt; 2500 W/(m³/s)</p>
                <p className="text-sm text-gray-600">Needs improvement</p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Performance Factors</h3>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start gap-2">
              <span className="w-2 h-2 bg-indigo-500 rounded-full mt-2 flex-shrink-0"></span>
              <span>Fan selection and sizing relative to duty point</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-2 h-2 bg-indigo-500 rounded-full mt-2 flex-shrink-0"></span>
              <span>Ductwork design and air velocity</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-2 h-2 bg-indigo-500 rounded-full mt-2 flex-shrink-0"></span>
              <span>Filter grade and maintenance schedule</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-2 h-2 bg-indigo-500 rounded-full mt-2 flex-shrink-0"></span>
              <span>Motor and drive efficiency</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-2 h-2 bg-indigo-500 rounded-full mt-2 flex-shrink-0"></span>
              <span>System component pressure drops</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-2 h-2 bg-indigo-500 rounded-full mt-2 flex-shrink-0"></span>
              <span>Control strategy and operation point</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}