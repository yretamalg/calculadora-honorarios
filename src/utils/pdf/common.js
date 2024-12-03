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

  // Logo
  try {
    const logoWidth = 30;
    doc.addImage(
      'logoyr_b.png', // Removed leading slash
      'PNG',
      (pageWidth - logoWidth) / 2,
      280, // Fixed position instead of dynamic
      logoWidth,
      logoWidth
    );
  } catch (error) {
    console.error('Error al agregar logo:', error);
  }
};