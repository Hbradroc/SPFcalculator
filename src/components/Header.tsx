import React from 'react';
import { Fan } from 'lucide-react';

export function Header() {
  return (
    <header className="text-center mb-12">
      <div className="flex items-center justify-center gap-2 mb-4">
        <Fan className="w-8 h-8 text-indigo-600 animate-spin-slow" />
        <h1 className="text-4xl font-bold text-gray-800">SFP Calculator</h1>
      </div>
      <p className="text-gray-600 max-w-2xl mx-auto">
        Calculate Specific Fan Power (SFP) - a key metric for fan system efficiency in HVAC systems
      </p>
    </header>
  );
}