import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { formatearMonto } from '../formatters';

const generarPDFIva = (items, resultados) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.width;

  // Título
  doc.setFontSize(20);
  doc.setTextColor(33, 37, 41);
  const titulo = 'Cálculo de IVA';
  const tituloWidth = doc.getTextDimensions(titulo).w;
  doc.text(titulo, (pageWidth - tituloWidth) / 2, 20);

  // Fecha
  doc.setFontSize(12);
  doc.text(`Fecha de cálculo: ${new Date().toLocaleDateString('es-CL')}`, 14, 35);

  // Tabla de items
  const itemsParaTabla = items.map(item => [
    item.descripcion || 'Sin descripción',
    item.cantidad.toString(),
    formatearMonto(Number(item.valorUnitario)),
    formatearMonto(item.cantidad * Number(item.valorUnitario))
  ]);

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

  // Disclaimer
  doc.setFontSize(9);
  doc.setTextColor(128);
  const disclaimer = [
    'No nos hacemos responsable por decisiones tomadas basadas en los cálculos de esta herramienta.',
    'Siempre consulte con un profesional tributario para confirmación.'
  ];

  let y = 260;
  disclaimer.forEach(line => {
    const textWidth = doc.getTextWidth(line);
    const startX = (pageWidth - textWidth) / 2;
    doc.text(line, startX, y);
    y += 6;
  });

  // Logo
  try {
    const logoWidth = 30;
    doc.addImage(
      'logoyr_b.png',
      'PNG',
      (pageWidth - logoWidth) / 2,
      280,
      logoWidth,
      logoWidth
    );
  } catch (error) {
    console.error('Error al agregar logo:', error);
  }

  // Guardar PDF
  doc.save('calculo-iva.pdf');
};

export default generarPDFIva;