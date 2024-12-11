// src/components/calculadoras/porcentajes/utils/porcentajesPdfGenerator.js

import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { agregarFooter } from '../../honorarios/utils/pdfGenerators/common';

const generarPDFPorcentaje = (porcentaje, cantidad, resultado) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.width;

  // Título
  doc.setFontSize(20);
  doc.setTextColor(33, 37, 41);
  const titulo = 'Cálculo de Porcentaje';
  doc.text(titulo, pageWidth/2, 20, { align: 'center' });

  // Fecha
  doc.setFontSize(12);
  doc.text(`Fecha de cálculo: ${new Date().toLocaleDateString('es-CL')}`, 14, 35);

  // Tabla con el cálculo
  doc.autoTable({
    startY: 45,
    head: [['Detalle del Cálculo', 'Valor']],
    body: [
      ['Porcentaje', `${porcentaje}%`],
      ['Cantidad', cantidad],
      ['Resultado', resultado.toFixed(2)]
    ],
    theme: 'grid',
    headStyles: { fillColor: [255, 87, 34] },
    styles: { fontSize: 12 },
    columnStyles: {
      0: { cellWidth: 100 },
      1: { cellWidth: 80, halign: 'right' }
    }
  });

  // Agregar footer común
  agregarFooter(doc);

  // Guardar PDF
  doc.save('calculo-porcentaje.pdf');
};

export default generarPDFPorcentaje;