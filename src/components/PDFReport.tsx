import React from 'react';
import { 
  Document, 
  Page, 
  Text, 
  View, 
  StyleSheet,
  Font 
} from '@react-pdf/renderer';

Font.register({
  family: 'Inter',
  fonts: [
    { src: 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2', fontWeight: 400 },
    { src: 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuI6fAZ9hiA.woff2', fontWeight: 600 }
  ]
});

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: 'Inter'
  },
  header: {
    fontSize: 24,
    fontWeight: 600,
    marginBottom: 30,
    color: '#1e40af',
    textAlign: 'center'
  },
  section: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#f8fafc',
    borderRadius: 8
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 600,
    marginBottom: 15,
    color: '#1e293b'
  },
  row: {
    flexDirection: 'row',
    marginBottom: 8,
    alignItems: 'center'
  },
  label: {
    width: 150,
    fontSize: 12,
    color: '#475569'
  },
  value: {
    flex: 1,
    fontSize: 14,
    color: '#0f172a'
  },
  resultValue: {
    fontSize: 16,
    fontWeight: 600,
    color: '#4f46e5'
  },
  footer: {
    position: 'absolute',
    bottom: 40,
    left: 40,
    right: 40,
    textAlign: 'center',
    fontSize: 10,
    color: '#64748b',
    borderTop: '1 solid #e2e8f0',
    paddingTop: 20
  }
});

interface PDFReportProps {
  data: {
    power: string;
    airflow: string;
    pressureDrop: string;
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
  };
}

export function PDFReport({ data }: PDFReportProps) {
  const units = data.unitSystem === 'metric' 
    ? { power: 'kW', airflow: 'm³/s', pressure: 'Pa', sfp: 'W/(m³/s)' }
    : { power: 'hp', airflow: 'CFM', pressure: 'inWG', sfp: 'W/(m³/s)' };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.header}>Fan System Performance Report</Text>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Input Parameters</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Fan Power:</Text>
            <Text style={styles.value}>{data.power} {units.power}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Air Flow Rate:</Text>
            <Text style={styles.value}>{data.airflow} {units.airflow}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Initial Pressure Drop:</Text>
            <Text style={styles.value}>{data.pressureDrop} {units.pressure}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Clean Filter Results (SFPv)</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Specific Fan Power:</Text>
            <Text style={styles.resultValue}>{data.clean.sfp} {units.sfp}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Performance Rating:</Text>
            <Text style={styles.resultValue}>{data.clean.rating}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>System Efficiency:</Text>
            <Text style={styles.resultValue}>{data.clean.efficiency}%</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Dirty Filter Results (SFPe)</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Specific Fan Power:</Text>
            <Text style={styles.resultValue}>{data.dirty.sfp} {units.sfp}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Performance Rating:</Text>
            <Text style={styles.resultValue}>{data.dirty.rating}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>System Efficiency:</Text>
            <Text style={styles.resultValue}>{data.dirty.efficiency}%</Text>
          </View>
        </View>

        <Text style={styles.footer}>
          Generated on {new Date().toLocaleDateString()} | Contact: Hbradroc@uwo.ca
        </Text>
      </Page>
    </Document>
  );
}