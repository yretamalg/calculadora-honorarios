export const agregarFooter = (doc) => {
    const pageWidth = doc.internal.pageSize.width;
    const pageHeight = doc.internal.pageSize.height;
  
    // Disclaimer
    doc.setFontSize(9);
    doc.setTextColor(128);
    const disclaimer = [
      'No nos hacemos responsable por decisiones tomadas basadas en los cálculos de esta herramienta.',
      'Siempre consulte con un profesional tributario para confirmación.',
      'Para más información lea nuestros Términos de Uso en www.vbox.pro/terminos-de-uso'
    ];
  
    let y = 260;
    disclaimer.forEach(line => {
      const textWidth = doc.getTextWidth(line);
      const startX = (pageWidth - textWidth) / 2;
      doc.text(line, startX, y);
      y += 6;
    });
  
    // Logo
    const logoWidth = 30;
    doc.addImage(
      '/logoyr_b.svg',
      'SVG',
      (pageWidth - logoWidth) / 2,
      pageHeight - 45,
      logoWidth,
      logoWidth
    );
  };