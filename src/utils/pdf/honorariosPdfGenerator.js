import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { formatearMonto } from '../formatters';

const generarPDFHonorarios = (resultados, tasaRetencion, añoRetencion) => {
  try {
    console.log('Iniciando generación de PDF...');
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.width;

    // Título
    doc.setFontSize(20);
    doc.setTextColor(33, 37, 41);
    const titulo = 'Cálculo de Retención de Honorarios';
    const tituloWidth = doc.getTextDimensions(titulo).w;
    doc.text(titulo, (pageWidth - tituloWidth) / 2, 20);

    // Información del cálculo
    doc.setFontSize(12);
    doc.text(`Tasa de Retención: ${tasaRetencion}% (año ${añoRetencion})`, 14, 40);
    doc.text(`Fecha de cálculo: ${new Date().toLocaleDateString('es-CL')}`, 14, 48);

    // Valores Líquidos
    doc.autoTable({
      startY: 60,
      head: [['Desde valores líquidos', 'Monto']],
      body: [
        ['Monto Bruto (monto de tu boleta)', formatearMonto(resultados.desdeValoresLiquidos.bruto)],
        ['Retención', formatearMonto(resultados.desdeValoresLiquidos.retencion)],
        ['Monto Líquido', formatearMonto(resultados.desdeValoresLiquidos.liquido)]
      ],
      theme: 'grid',
      headStyles: { fillColor: [255, 87, 34] },
      styles: { halign: 'left', fontSize: 11 },
      columnStyles: {
        0: { cellWidth: 100 },
        1: { cellWidth: 80, halign: 'right' }
      }
    });

    // Valores Brutos
    doc.autoTable({
      startY: doc.lastAutoTable.finalY + 15,
      head: [['Desde valores brutos', 'Monto']],
      body: [
        ['Monto Bruto (monto de tu boleta)', formatearMonto(resultados.desdeValoresBrutos.bruto)],
        ['Retención', formatearMonto(resultados.desdeValoresBrutos.retencion)],
        ['Monto Líquido', formatearMonto(resultados.desdeValoresBrutos.liquido)]
      ],
      theme: 'grid',
      headStyles: { fillColor: [255, 87, 34] },
      styles: { halign: 'left', fontSize: 11 },
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
      'Siempre consulte con un profesional tributario para confirmación.',
      'Para más información lea nuestros Términos de Uso.'
    ];

    let y = 260;
    disclaimer.forEach(line => {
      const textWidth = doc.getTextWidth(line);
      const startX = (pageWidth - textWidth) / 2;
      doc.text(line, startX, y);
      y += 6;
    });

    // Guardar PDF
    doc.save('calculo-retencion.pdf');
    console.log('PDF generado exitosamente');
  } catch (error) {
    console.error('Error al generar PDF:', error);
  }
};

export default generarPDFHonorarios;