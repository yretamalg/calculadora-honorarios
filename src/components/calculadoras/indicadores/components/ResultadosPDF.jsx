// src/components/calculadoras/indicadores/components/ResultadosPDF.jsx
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

const ResultadosPDF = ({ resultado, formatearMoneda, formatearNumero }) => {
  if (!resultado) return null;

  const getTipoConversion = () => {
    try {
      const nombreIndicador = {
        'UF': 'UF',
        'DOLAR': 'Dólar',
        'EURO': 'Euro',
        'UTM': 'UTM'
      }[resultado.tipoIndicador] || resultado.tipoIndicador;

      return resultado.direccion === 'to_clp' 
        ? `${nombreIndicador} a Pesos`
        : `Pesos a ${nombreIndicador}`;
    } catch (error) {
      console.error('Error getting conversion type:', error);
      return 'Conversión';
    }
  };

  const getFechaActual = () => {
    try {
      return format(new Date(), "dd 'de' MMMM',' yyyy", { locale: es });
    } catch (error) {
      console.error('Error formatting current date:', error);
      return new Date().toLocaleDateString();
    }
  };

  const getValorFormateado = (valor, tipo) => {
    try {
      return resultado.tipoIndicador === 'UF'
        ? formatearNumero(valor)
        : formatearMoneda(valor, tipo);
    } catch (error) {
      console.error('Error formatting value:', error);
      return '0';
    }
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>Conversión de {getTipoConversion()}</Text>
        
        <View style={styles.infoSection}>
          <Text>Fecha: {getFechaActual()}</Text>
        </View>

        {/* Primera tabla */}
        <View style={styles.tableHeader}>
          <Text style={[styles.tableCell, styles.tableHeaderText]}>
            Indicadores
          </Text>
          <Text style={[styles.tableCellAmount, styles.tableHeaderText]}>Monto</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>Valor {resultado.direccion === 'to_clp' ? 
              `Valor en ${resultado.tipoIndicador}` : 
              'Valor en Pesos'}</Text>
          <Text style={styles.tableCellAmount}>
            {getValorFormateado(
              resultado.montoOriginal,
              resultado.direccion === 'to_clp' ? resultado.tipoIndicador : 'CLP'
            )}
          </Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>
            {resultado.direccion === 'to_clp' ? 
              'Valor en Pesos (CLP)' : 
              `Valor en ${resultado.tipoIndicador}`}
          </Text>
          <Text style={styles.tableCellAmount}>
            {getValorFormateado(
              resultado.montoConvertido,
              resultado.direccion === 'to_clp' ? 'CLP' : resultado.tipoIndicador
            )}
          </Text>
        </View>

        {/* Valor del indicador */}
        <View style={{ marginTop: 20 }}>
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>
              Valor {resultado.tipoIndicador} ({getFechaActual()})
            </Text>
            <Text style={styles.tableCellAmount}>
              {formatearMoneda(resultado.valorIndicador, resultado.tipoIndicador)}
            </Text>
          </View>
        </View>

        {/* Footer con disclaimers */}
        <View style={styles.footer}>
          <Text style={styles.disclaimer}>
            Los valores son referenciales y están basados en información del Banco Central de Chile.
          </Text>
          <Text style={styles.disclaimer}>
            Esta conversión es solo para fines informativos.
          </Text>
          <Text style={styles.disclaimer}>
            Generado el {format(new Date(), "dd 'de' MMMM',' yyyy 'a las' HH:mm", { locale: es })} hrs.
          </Text>
        </View>
      </Page>
    </Document>
  );
};

export default ResultadosPDF;