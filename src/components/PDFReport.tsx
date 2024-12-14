import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: 'Helvetica'
  },
  header: {
    fontSize: 24,
    marginBottom: 30,
    textAlign: 'center'
  },
  section: {
    marginBottom: 20,
    padding: 15
  },
  sectionTitle: {
    fontSize: 18,
    marginBottom: 15
  },
  row: {
    flexDirection: 'row',
    marginBottom: 8
  },
  label: {
    width: 150,
    fontSize: 12
  },
  value: {
    flex: 1,
    fontSize: 14
  },
  resultValue: {
    fontSize: 16
  },
  footer: {
    position: 'absolute',
    bottom: 40,
    left: 40,
    right: 40,
    textAlign: 'center',
    fontSize: 10,
    paddingTop: 20
  }
});

interface PDFReportProps {
  data: {
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
          <Text style={styles.sectionTitle}>Supply Fan Parameters</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Fan Power:</Text>
            <Text style={styles.value}>{data.supplyFan.power} {units.power}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Air Flow Rate:</Text>
            <Text style={styles.value}>{data.supplyFan.airflow} {units.airflow}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Initial Pressure Drop:</Text>
            <Text style={styles.value}>{data.supplyFan.pressureDrop} {units.pressure}</Text>
          </View>
        </View>

        {data.extractFan.power && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Extract Fan Parameters</Text>
            <View style={styles.row}>
              <Text style={styles.label}>Fan Power:</Text>
              <Text style={styles.value}>{data.extractFan.power} {units.power}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Air Flow Rate:</Text>
              <Text style={styles.value}>{data.extractFan.airflow} {units.airflow}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Initial Pressure Drop:</Text>
              <Text style={styles.value}>{data.extractFan.pressureDrop} {units.pressure}</Text>
            </View>
          </View>
        )}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Results</Text>
          <View style={styles.row}>
            <Text style={styles.label}>SFPv (Clean Filter):</Text>
            <Text style={styles.resultValue}>{data.clean.sfp} {units.sfp}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Rating:</Text>
            <Text style={styles.resultValue}>{data.clean.rating}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>System Efficiency:</Text>
            <Text style={styles.resultValue}>{data.clean.efficiency}%</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>SFPe (Dirty Filter)</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Specific Fan Power:</Text>
            <Text style={styles.resultValue}>{data.dirty.sfp} {units.sfp}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Rating:</Text>
            <Text style={styles.resultValue}>{data.dirty.rating}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>System Efficiency:</Text>
            <Text style={styles.resultValue}>{data.dirty.efficiency}%</Text>
          </View>
        </View>

        <Text style={styles.footer}>
          Generated on {new Date().toLocaleDateString()}
        </Text>
      </Page>
    </Document>
  );
}