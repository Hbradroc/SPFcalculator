import { PDFReport } from '../components/PDFReport';
import { createElement } from 'react';
import { pdf } from '@react-pdf/renderer';
import { FanCalculationResult } from './calculations';

interface FanInputs {
  power: string;
  airflow: string;
  pressureDrop: string;
}

interface PDFData {
  supplyFan: FanInputs;
  extractFan: FanInputs;
  clean: FanCalculationResult;
  dirty: FanCalculationResult;
  unitSystem: 'metric' | 'imperial';
}

export const generatePDF = async (data: PDFData) => {
  const blob = await pdf(createElement(PDFReport, { data })).toBlob();
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `fan-performance-report-${new Date().toISOString().split('T')[0]}.pdf`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};