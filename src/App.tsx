import React, { useState } from 'react';
import { Header } from './components/Header';
import { Calculator } from './components/Calculator';
import { Guide } from './components/Guide';
import { Footer } from './components/Footer';
import { generatePDF } from './utils/pdfGenerator';
import { convertUnits, UnitSystem } from './utils/units';
import { calculateSystemSFP, FanData } from './utils/calculations';

interface FanInputs {
  power: string;
  airflow: string;
  pressureDrop: string;
}

function App() {
  const [supplyFan, setSupplyFan] = useState<FanInputs>({
    power: '',
    airflow: '',
    pressureDrop: ''
  });
  const [extractFan, setExtractFan] = useState<FanInputs>({
    power: '',
    airflow: '',
    pressureDrop: ''
  });
  const [resultClean, setResultClean] = useState<ReturnType<typeof calculateSystemSFP> | null>(null);
  const [resultDirty, setResultDirty] = useState<ReturnType<typeof calculateSystemSFP> | null>(null);
  const [unitSystem, setUnitSystem] = useState<UnitSystem>('metric');

  const convertFanData = (fan: FanInputs, system: UnitSystem): FanData | null => {
    const power = parseFloat(fan.power);
    const airflow = parseFloat(fan.airflow);
    const pressureDrop = parseFloat(fan.pressureDrop);

    if (isNaN(power) || isNaN(airflow) || isNaN(pressureDrop)) {
      return null;
    }

    if (system === 'imperial') {
      return {
        power: convertUnits.power.hp_to_kw(power),
        airflow: convertUnits.airflow.cfm_to_m3s(airflow),
        pressureDrop: convertUnits.pressure.inwg_to_pa(pressureDrop)
      };
    }

    return { power, airflow, pressureDrop };
  };

  const calculateSFP = () => {
    const supplyData = convertFanData(supplyFan, unitSystem);
    const extractData = convertFanData(extractFan, unitSystem);
    
    if (supplyData) {
      const clean = calculateSystemSFP(supplyData, extractData, 'clean');
      const dirty = calculateSystemSFP(supplyData, extractData, 'dirty');
      
      setResultClean(clean);
      setResultDirty(dirty);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 py-8">
        <Header />
        <div className="grid lg:grid-cols-2 gap-8 mt-8">
          <Calculator
            supplyFan={supplyFan}
            extractFan={extractFan}
            resultClean={resultClean}
            resultDirty={resultDirty}
            setSupplyFan={setSupplyFan}
            setExtractFan={setExtractFan}
            calculateSFP={calculateSFP}
            unitSystem={unitSystem}
            setUnitSystem={setUnitSystem}
            onGenerateReport={() => {
              if (resultClean && resultDirty) {
                generatePDF({
                  supplyFan,
                  extractFan,
                  clean: resultClean,
                  dirty: resultDirty,
                  unitSystem
                });
              }
            }}
          />
          <Guide />
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default App;