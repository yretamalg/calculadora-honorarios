// src/core/pdf/generators/indicadoresPDF.js

import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { agregarFooter, generarEncabezado } from '../components/common';
import { formatearIndicador } from '../../formatters/formatters';

const generarPDFIndicadores = (resultado) => {
  const doc = new jsPDF();

  const getTipoConversion = () => {
    const nombreIndicador = {
      'UF': 'UF',
      'DOLAR': 'Dólar',
      'EURO': 'Euro',
      'UTM': 'UTM'
    }[resultado.tipoIndicador] || resultado.tipoIndicador;

    return resultado.direccion === 'to_clp' 
      ? `${nombreIndicador} a Pesos`
      : `Pesos a ${nombreIndicador}`;
  };

  generarEncabezado(doc, { 
    titulo: `Conversión de ${getTipoConversion()}`
  });

  // Tabla de conversión
  doc.autoTable({
    startY: 45,
    head: [['Detalle', 'Valor']],
    body: [
      ['Valor Original', formatearIndicador(resultado.montoOriginal, resultado.tipoIndicador)],
      ['Valor Convertido', formatearIndicador(resultado.montoConvertido, resultado.tipoIndicador)],
      [`Valor ${resultado.tipoIndicador}`, formatearIndicador(resultado.valorIndicador, resultado.tipoIndicador)]
    ],
    theme: 'grid',
    headStyles: { fillColor: [255, 87, 34] },
    styles: { fontSize: 12 },
    columnStyles: {
      0: { cellWidth: 100 },
      1: { cellWidth: 80, halign: 'right' }
    }
  });

  agregarFooter(doc);
  doc.save('conversion-indicadores.pdf');
};

export default generarPDFIndicadores;