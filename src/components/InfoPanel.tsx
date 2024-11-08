import React from 'react';
import { BookOpen, CheckCircle, AlertTriangle } from 'lucide-react';

export const InfoPanel: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center space-x-2 mb-6">
        <BookOpen className="h-6 w-6 text-blue-600" />
        <h2 className="text-xl font-semibold text-gray-900">Guide</h2>
      </div>

      <div className="space-y-6">
        <section>
          <h3 className="text-lg font-medium text-gray-900 mb-2">What is SPF?</h3>
          <p className="text-gray-600">
            Specific Fan Power (SPF) is a measure of fan efficiency that represents the power required to move air through a ventilation system. It can be calculated in both metric (kW/(m³/s)) and imperial (HP/CFM) units.
          </p>
        </section>

        <section>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Unit Conversions</h3>
          <div className="space-y-2 text-gray-600">
            <p>• 1 CFM = 0.000471947443 m³/s</p>
            <p>• 1 HP = 0.745699872 kW</p>
            <p>• 1 in.w.g = 249.088908333 Pa</p>
          </div>
        </section>

        <section>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Typical Values</h3>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <div className="text-gray-600">
                <p>Excellent (Metric): &lt; 1.5 kW/(m³/s)</p>
                <p>Excellent (Imperial): &lt; 0.000746 HP/CFM</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-yellow-500" />
              <div className="text-gray-600">
                <p>Poor (Metric): &gt; 2.5 kW/(m³/s)</p>
                <p>Poor (Imperial): &gt; 0.001243 HP/CFM</p>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Efficiency Factors</h3>
          <ul className="list-disc list-inside space-y-2 text-gray-600">
            <li>Regular maintenance of fan systems</li>
            <li>Optimize ductwork design</li>
            <li>Minimize pressure drops</li>
            <li>Use energy-efficient motors</li>
            <li>Proper sizing of components</li>
          </ul>
        </section>
      </div>
    </div>
  );
};