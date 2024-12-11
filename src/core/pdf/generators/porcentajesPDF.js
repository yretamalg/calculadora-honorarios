// src/core/pdf/generators/porcentajesPDF.js

import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { agregarFooter, generarEncabezado } from '../components/common';
import { formatearMonto } from '../../formatters/formatters';

const generarPDFPorcentaje = (datos) => {
  const doc = new jsPDF();

  generarEncabezado(doc, { 
    titulo: 'Cálculo de Porcentaje'
  });

  // Tabla con el cálculo
  doc.autoTable({
    startY: 45,
    head: [['Detalle del Cálculo', 'Valor']],
    body: [
      ['Porcentaje', `${datos.porcentaje}%`],
      ['Cantidad', formatearMonto(datos.cantidad)],
      ['Resultado', formatearMonto(datos.resultado)]
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
  doc.save('calculo-porcentaje.pdf');
};

export default generarPDFPorcentaje;