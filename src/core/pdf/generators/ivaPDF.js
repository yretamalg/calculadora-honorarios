// src/core/pdf/generators/ivaPDF.js

import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { agregarFooter, generarEncabezado } from '../components/common';
import { formatearMonto } from '../../formatters/formatters';

const generarPDFIva = (items, resultados) => {
  const doc = new jsPDF();

  generarEncabezado(doc, { 
    titulo: 'Cálculo de IVA'
  });

  // Tabla de items
  const itemsParaTabla = items.map(item => [
    item.descripcion || 'Sin descripción',
    item.cantidad.toString(),
    formatearMonto(parseFloat(item.valorUnitario.replace(/[^\d]/g, ''))),
    formatearMonto(item.cantidad * parseFloat(item.valorUnitario.replace(/[^\d]/g, '')))
  ]).filter(item => parseFloat(item[2].replace(/[^\d]/g, '')) > 0);

  doc.autoTable({
    startY: 45,
    head: [['Descripción', 'Cantidad', 'Valor Unitario', 'Subtotal']],
    body: itemsParaTabla,
    theme: 'grid',
    headStyles: { fillColor: [255, 87, 34] },
    styles: { fontSize: 10 },
    columnStyles: {
      0: { cellWidth: 80 },
      1: { cellWidth: 30, halign: 'center' },
      2: { cellWidth: 40, halign: 'right' },
      3: { cellWidth: 40, halign: 'right' }
    }
  });

  // Tabla de totales
  doc.autoTable({
    startY: doc.lastAutoTable.finalY + 15,
    body: [
      ['Neto', formatearMonto(resultados.subtotal)],
      ['IVA (19%)', formatearMonto(resultados.iva)],
      ['Total', formatearMonto(resultados.total)]
    ],
    theme: 'plain',
    styles: { fontSize: 12, fontStyle: 'bold' },
    columnStyles: {
      0: { cellWidth: 100 },
      1: { cellWidth: 80, halign: 'right' }
    }
  });

  agregarFooter(doc);
  doc.save('calculo-iva.pdf');
};

export default generarPDFIva;