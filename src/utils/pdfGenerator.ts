import { PDFReport } from '../components/PDFReport';
import { createElement } from 'react';
import { pdf } from '@react-pdf/renderer';

interface PDFData {
  supplyFan: {
    power: string;
    airflow: string;
    pressureDrop: string;
  };
  extractFan: {
    power: string;
    airflow: string;
    pressureDrop: string;
  };
  clean: {
    sfp: number;
    efficiency: number;
    rating: string;
  };
  dirty: {
    sfp: number;
    efficiency: number;
    rating: string;
  };
  unitSystem: 'metric' | 'imperial';
}

export const generatePDF = async (data: PDFData) => {
  try {
    const blob = await pdf(createElement(PDFReport, { data })).toBlob();
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `fan-performance-report-${new Date().toISOString().split('T')[0]}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Error generating PDF:', error);
  }
};