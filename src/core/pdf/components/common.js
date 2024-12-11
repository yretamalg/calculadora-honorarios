// src/core/pdf/components/common.js

export const agregarFooter = (doc) => {
  const pageWidth = doc.internal.pageSize.width;
  
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

};

export const generarEncabezado = (doc, { titulo, subtitulo }) => {
  const pageWidth = doc.internal.pageSize.width;

  // Título
  doc.setFontSize(20);
  doc.setTextColor(33, 37, 41);
  doc.text(titulo, pageWidth/2, 20, { align: 'center' });

  if (subtitulo) {
    doc.setFontSize(12);
    doc.text(subtitulo, pageWidth/2, 35, { align: 'center' });
  }

  // Fecha
  doc.setFontSize(12);
  doc.text(`Fecha de cálculo: ${new Date().toLocaleDateString('es-CL')}`, 14, subtitulo ? 48 : 35);
};