import React, { useState } from 'react';
import { Calculator, Info, Fan } from 'lucide-react';
import { SFPCalculator } from './components/SFPCalculator';
import { InfoPanel } from './components/InfoPanel';

function App() {
  const [showInfo, setShowInfo] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100">
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Fan className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">SFP Calculator</h1>
            </div>
            <button
              onClick={() => setShowInfo(!showInfo)}
              className="flex items-center space-x-1 text-gray-600 hover:text-blue-600 transition-colors"
            >
              <Info className="h-5 w-5" />
              <span>Guide</span>
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="order-2 md:order-1">
            <SFPCalculator />
          </div>
          <div className={`order-1 md:order-2 ${showInfo ? 'block' : 'hidden md:block'}`}>
            <InfoPanel />
          </div>
        </div>
      </main>

      <footer className="bg-white mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-gray-600">
            © {new Date().getFullYear()} SFP Calculator - hbradroc@uwo.ca
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;