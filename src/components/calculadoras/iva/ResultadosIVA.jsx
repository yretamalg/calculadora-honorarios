import React, { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { formatearMonto } from '../../../utils/formatters';
import BotonExportar from '../../shared/BotonExportar';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { generarPDFIva } from '../../../utils/pdf';


const ResultadosIVA = ({ resultados, items }) => {
  const [copiado, setCopiado] = useState('');

  const copiarAlPortapapeles = async (valor, tipo) => {
    await navigator.clipboard.writeText(valor.toString());
    setCopiado(tipo);
    setTimeout(() => setCopiado(''), 2000);
  };

  const handleExportPDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.width;
    
    // Título
    doc.setFontSize(20);
    doc.setTextColor(33, 37, 41);
    const titulo = 'Cálculo de IVA';
    const tituloWidth = doc.getTextWidth(titulo);
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

    // Agregar footer
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

    // Guardar PDF
    doc.save('calculo-iva.pdf');
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
        <BotonExportar onClick={handleExportPDF} />
      </div>
    </div>
  );
};

export default ResultadosIVA;