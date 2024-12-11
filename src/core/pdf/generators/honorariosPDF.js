// src/core/pdf/generators/honorariosPDF.js

import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { agregarFooter, generarEncabezado } from '../components/common';
import { formatearMonto } from '../../formatters/formatters';

const generarPDFHonorarios = (resultados, tasaRetencion, añoRetencion) => {
  const doc = new jsPDF();

  generarEncabezado(doc, { 
    titulo: 'Cálculo de Retención de Honorarios',
    subtitulo: `Tasa de Retención: ${tasaRetencion}% (año ${añoRetencion})`
  });

  // Valores Líquidos
  doc.autoTable({
    startY: 60,
    head: [['Desde valores líquidos', 'Monto']],
    body: [
      ['Monto Bruto (Boleta)', formatearMonto(resultados.desdeValoresLiquidos.bruto)],
      ['Retención', formatearMonto(resultados.desdeValoresLiquidos.retencion)],
      ['Monto Líquido', formatearMonto(resultados.desdeValoresLiquidos.liquido)]
    ],
    theme: 'grid',
    headStyles: { fillColor: [255, 87, 34] },
    styles: { 
      halign: 'left', 
      fontSize: 11,
      cellPadding: 5
    },
    columnStyles: {
      0: { cellWidth: 'auto' },
      1: { cellWidth: 'auto', halign: 'right' }
    },
    margin: { left: 20, right: 20 }
  });

  // Valores Brutos
  doc.autoTable({
    startY: doc.lastAutoTable.finalY + 15,
    head: [['Desde valores brutos', 'Monto']],
    body: [
      ['Monto Bruto (Boleta)', formatearMonto(resultados.desdeValoresBrutos.bruto)],
      ['Retención', formatearMonto(resultados.desdeValoresBrutos.retencion)],
      ['Monto Líquido', formatearMonto(resultados.desdeValoresBrutos.liquido)]
    ],
    theme: 'grid',
    headStyles: { fillColor: [255, 87, 34] },
    styles: { 
      halign: 'left', 
      fontSize: 11,
      cellPadding: 5
    },
    columnStyles: {
      0: { cellWidth: 'auto' },
      1: { cellWidth: 'auto', halign: 'right' }
    },
    margin: { left: 20, right: 20 }
  });

  agregarFooter(doc);
  doc.save('calculo-retencion.pdf');
};

export default generarPDFHonorarios;