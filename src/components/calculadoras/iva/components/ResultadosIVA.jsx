import React, { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { formatearMonto } from '../../../../core/formatters/formatters';
import BotonExportarIVA from './BotonExportarIVA';
import generarPDFIva from '../../../../core/pdf/generators/ivaPDF';
import { agregarFooter } from '../../../../core/pdf/components/common';

const ResultadosIVA = ({ resultados, items }) => {
  const [copiado, setCopiado] = useState('');

  const copiarAlPortapapeles = async (valor, tipo) => {
    try {
      // Formateamos el valor antes de copiarlo
      const valorFormateado = formatearMonto(valor);
      await navigator.clipboard.writeText(valorFormateado);
      setCopiado(tipo);
      setTimeout(() => setCopiado(''), 2000);
    } catch (error) {
      console.error('Error al copiar:', error);
    }
  };

  const handleExportPDF = async () => {
    try {
      const { jsPDF } = await import('jspdf');
      await import('jspdf-autotable');
      
      const doc = new jsPDF();
      const pageWidth = doc.internal.pageSize.width;

      // Título
      doc.setFontSize(20);
      doc.setTextColor(33, 37, 41);
      const titulo = 'Cálculo de IVA';
      doc.text(titulo, pageWidth/2, 20, { align: 'center' });

      // Fecha
      doc.setFontSize(12);
      doc.text(`Fecha de cálculo: ${new Date().toLocaleDateString('es-CL')}`, 14, 35);

      // Tabla de items
      const itemsParaTabla = items.map(item => {
        const valorUnitarioNumerico = parseFloat(item.valorUnitario.replace(/[^\d]/g, ''));
        const subtotal = item.cantidad * valorUnitarioNumerico;
        return [
          item.descripcion || 'Sin descripción',
          item.cantidad.toString(),
          formatearMonto(valorUnitarioNumerico),
          formatearMonto(subtotal)
        ];
      }).filter(item => parseFloat(item[2].replace(/[^\d]/g, '')) > 0);

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
        'Siempre consulte con un profesional tributario para confirmación.',
        'Para más información lea nuestros Términos de Uso.'
      ];

      let y = 260;
      disclaimer.forEach(line => {
        doc.text(line, pageWidth/2, y, { align: 'center' });
        y += 6;
      });

      // Guardar PDF
      doc.save('calculo-iva.pdf');
    } catch (error) {
      console.error('Error al generar PDF:', error);
    }
  };

  return (
    <div className="space-y-4 bg-slate-800 p-6 rounded-lg">
      <div className="flex justify-between items-center">
        <p className="text-slate-300 text-sm">Neto:</p>
        <div className="flex items-center gap-2">
          <p className="text-slate-100 text-2xl font-bold">
            {formatearMonto(resultados.subtotal)}
          </p>
          <button
            onClick={() => copiarAlPortapapeles(resultados.subtotal, "neto")}
            className="text-slate-400 hover:text-slate-300 transition-colors p-1"
            title="Copiar valor"
          >
            {copiado === "neto" ? (
              <Check className="w-4 h-4 text-green-400" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>

      <div className="flex justify-between items-center border-t border-slate-700 pt-4">
        <p className="text-slate-300 text-sm">IVA (19%):</p>
        <div className="flex items-center gap-2">
          <p className="text-orange-400 text-2xl font-bold">
            {formatearMonto(resultados.iva)}
          </p>
          <button
            onClick={() => copiarAlPortapapeles(resultados.iva, "iva")}
            className="text-slate-400 hover:text-slate-300 transition-colors p-1"
            title="Copiar valor"
          >
            {copiado === "iva" ? (
              <Check className="w-4 h-4 text-green-400" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>

      <div className="flex justify-between items-center border-t border-slate-700 pt-4">
        <p className="text-slate-300 text-sm">Total:</p>
        <div className="flex items-center gap-2">
          <p className="text-green-400 text-4xl font-bold">
            {formatearMonto(resultados.total)}
          </p>
          <button
            onClick={() => copiarAlPortapapeles(resultados.total, "total")}
            className="text-slate-400 hover:text-slate-300 transition-colors p-1"
            title="Copiar valor"
          >
            {copiado === "total" ? (
              <Check className="w-4 h-4 text-green-400" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>

      <div className="mt-6 flex justify-center">
        <BotonExportarIVA 
          items={items} 
          resultados={resultados}
        />
      </div>
    </div>
  );
};

export default ResultadosIVA;