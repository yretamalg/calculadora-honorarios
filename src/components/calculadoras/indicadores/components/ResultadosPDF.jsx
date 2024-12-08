// src/components/calculadora/ResultadosPDF.jsx
import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

// Estilos para el PDF
const styles = StyleSheet.create({
  page: {
    padding: 30,
    backgroundColor: '#FFFFFF'
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: 'center',
    color: '#1F2937'
  },
  section: {
    marginBottom: 10
  },
  label: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 5
  },
  value: {
    fontSize: 16,
    color: '#1F2937'
  },
  footer: {
    marginTop: 20,
    fontSize: 10,
    color: '#6B7280',
    textAlign: 'center'
  }
});

const ResultadosPDF = ({ resultado, formatearMoneda, formatearNumero }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.title}>Resultado de Conversión</Text>
      
      <View style={styles.section}>
        <Text style={styles.label}>Valor Ingresado:</Text>
        <Text style={styles.value}>
          {resultado.tipoIndicador === 'UF' 
            ? formatearMoneda(resultado.montoOriginal)
            : formatearMoneda(resultado.montoOriginal, resultado.tipoIndicador)}
        </Text>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.label}>
          Valor en {resultado.direccion === 'to_clp' ? 'Pesos (CLP)' : resultado.tipoIndicador}:
        </Text>
        <Text style={styles.value}>
          {resultado.tipoIndicador === 'UF'
            ? formatearNumero(resultado.montoConvertido)
            : formatearMoneda(resultado.montoConvertido)}
        </Text>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.label}>
          Valor {resultado.tipoIndicador} ({format(new Date(), "dd 'de' MMMM',' yyyy", { locale: es })}):
        </Text>
        <Text style={styles.value}>
          {formatearMoneda(resultado.valorIndicador)}
        </Text>
      </View>

      <Text style={styles.footer}>
        Generado el {format(new Date(), "dd 'de' MMMM',' yyyy 'a las' HH:mm", { locale: es })}
      </Text>
    </Page>
  </Document>
);

export default ResultadosPDF;