import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

// Estilos para el PDF
const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 12,
    fontFamily: 'Helvetica',
    color: '#333333'
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  infoSection: {
    marginBottom: 20,
  },
  tableHeader: {
    backgroundColor: '#FF5722',
    color: 'white',
    padding: 8,
    flexDirection: 'row',
    marginBottom: 1,
  },
  tableHeaderText: {
    color: 'white',
    fontWeight: 'bold',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottom: 1,
    borderColor: '#E5E5E5',
    backgroundColor: 'white',
    padding: 8,
  },
  tableCell: {
    flex: 1,
  },
  tableCellAmount: {
    flex: 1,
    textAlign: 'right',
  },
  footer: {
    position: 'absolute',
    bottom: 40,
    left: 40,
    right: 40,
    textAlign: 'center',
    color: '#666666',
    fontSize: 10,
  },
  disclaimer: {
    marginBottom: 8,
    textAlign: 'center',
  }
});

const ResultadosPDF = ({ resultado }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.title}>Cálculo de Retención de Honorarios</Text>
      
      <View style={styles.infoSection}>
        <Text>Tasa de Retención: 13.75% (año 2024)</Text>
        <Text>Fecha de cálculo: {format(new Date(), 'dd-MM-yyyy')}</Text>
      </View>

      {/* Desde valores líquidos */}
      <View style={styles.tableHeader}>
        <Text style={[styles.tableCell, styles.tableHeaderText]}>Desde valores líquidos</Text>
        <Text style={[styles.tableCellAmount, styles.tableHeaderText]}>Monto</Text>
      </View>
      <View style={styles.tableRow}>
        <Text style={styles.tableCell}>Monto Bruto (Boleta)</Text>
        <Text style={styles.tableCellAmount}>${resultado.brutoLiquido.toLocaleString('es-CL')}</Text>
      </View>
      <View style={styles.tableRow}>
        <Text style={styles.tableCell}>Retención</Text>
        <Text style={styles.tableCellAmount}>${resultado.retencionLiquido.toLocaleString('es-CL')}</Text>
      </View>
      <View style={styles.tableRow}>
        <Text style={styles.tableCell}>Monto Líquido</Text>
        <Text style={styles.tableCellAmount}>${resultado.liquidoLiquido.toLocaleString('es-CL')}</Text>
      </View>

      {/* Espacio entre tablas */}
      <View style={{ height: 20 }} />

      {/* Desde valores brutos */}
      <View style={styles.tableHeader}>
        <Text style={[styles.tableCell, styles.tableHeaderText]}>Desde valores brutos</Text>
        <Text style={[styles.tableCellAmount, styles.tableHeaderText]}>Monto</Text>
      </View>
      <View style={styles.tableRow}>
        <Text style={styles.tableCell}>Monto Bruto (Boleta)</Text>
        <Text style={styles.tableCellAmount}>${resultado.brutoBruto.toLocaleString('es-CL')}</Text>
      </View>
      <View style={styles.tableRow}>
        <Text style={styles.tableCell}>Retención</Text>
        <Text style={styles.tableCellAmount}>${resultado.retencionBruto.toLocaleString('es-CL')}</Text>
      </View>
      <View style={styles.tableRow}>
        <Text style={styles.tableCell}>Monto Líquido</Text>
        <Text style={styles.tableCellAmount}>${resultado.liquidoBruto.toLocaleString('es-CL')}</Text>
      </View>

      {/* Footer con disclaimers */}
      <View style={styles.footer}>
        <Text style={styles.disclaimer}>
          No nos hacemos responsable por decisiones tomadas basadas en los cálculos de esta herramienta.
        </Text>
        <Text style={styles.disclaimer}>
          Siempre consulte con un profesional tributario para confirmación.
        </Text>
        <Text style={styles.disclaimer}>
          Para más información lea nuestros Términos de Uso.
        </Text>
      </View>
    </Page>
  </Document>
);

export default ResultadosPDF;