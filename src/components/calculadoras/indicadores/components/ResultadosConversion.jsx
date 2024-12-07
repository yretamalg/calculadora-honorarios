import React, { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import BotonExportar from '../../../shared/BotonExportar';
import { formatearMonto } from '../utils/formatters';

const ResultadosConversion = ({ resultados, indicadores }) => {
  const [copiado, setCopiado] = useState('');

  const getCurrencySymbol = (tipo) => {
    switch (tipo) {
      case 'UF': return 'UF';
      case 'DOLAR': return 'US$';
      case 'EURO': return '€';
      case 'UTM': return 'UTM';
      default: return '$';
    }
  };

  const copiarAlPortapapeles = async (valor, tipo) => {
    try {
      await navigator.clipboard.writeText(formatearMonto(valor, tipo));
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
      const titulo = 'Conversión de Indicadores';
      doc.text(titulo, pageWidth/2, 20, { align: 'center' });

      // Fecha y hora
      doc.setFontSize(12);
      doc.text(`Fecha de conversión: ${resultados.fecha.toLocaleString('es-CL')}`, 14, 35);

      // Detalles de la conversión
      doc.autoTable({
        startY: 45,
        head: [['Detalle', 'Valor']],
        body: [
          ['Monto Original', formatearMonto(resultados.montoOriginal, resultados.desde)],
          ['Convertido a', formatearMonto(resultados.resultado, resultados.hacia)],
          ['Fecha y Hora', resultados.fecha.toLocaleString('es-CL')]
        ],
        theme: 'grid',
        headStyles: { fillColor: [255, 87, 34] },
        styles: { fontSize: 12 }
      });

      // Valores del día
      doc.autoTable({
        startY: doc.lastAutoTable.finalY + 15,
        head: [['Indicador', 'Valor del Día']],
        body: Object.entries(indicadores).map(([key, value]) => [
          key,
          formatearMonto(value.valor, key)
        ]),
        theme: 'grid',
        headStyles: { fillColor: [255, 87, 34] },
        styles: { fontSize: 12 }
      });

      // Disclaimer
      doc.setFontSize(9);
      doc.setTextColor(128);
      const disclaimer = [
        'Los valores mostrados son referenciales y corresponden a la fecha y hora de la consulta.',
        'Fuente: Banco Central de Chile'
      ];

      let y = doc.lastAutoTable.finalY + 30;
      disclaimer.forEach(line => {
        doc.text(line, pageWidth/2, y, { align: 'center' });
        y += 6;
      });

      doc.save('conversion-indicadores.pdf');
    } catch (error) {
      console.error('Error al generar PDF:', error);
    }
  };

  return (
    <div className="space-y-4 bg-slate-800 p-6 rounded-lg">
      {/* Resultado principal */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <p className="text-slate-300 text-sm">Monto Original:</p>
          <div className="flex items-center gap-2">
            <p className="text-slate-100 text-2xl font-bold">
              {formatearMonto(resultados.montoOriginal, resultados.desde)}
            </p>
            <button
              onClick={() => copiarAlPortapapeles(resultados.montoOriginal, 'original')}
              className="text-slate-400 hover:text-slate-300 transition-colors p-1"
              title="Copiar valor"
            >
              {copiado === 'original' ? (
                <Check className="w-4 h-4 text-green-400" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>

        <div className="flex justify-between items-center border-t border-slate-700 pt-4">
          <p className="text-slate-300 text-sm">Resultado de la conversión:</p>
          <div className="flex items-center gap-2">
            <p className="text-green-400 text-4xl font-bold">
              {formatearMonto(resultados.resultado, resultados.hacia)}
            </p>
            <button
              onClick={() => copiarAlPortapapeles(resultados.resultado, 'resultado')}
              className="text-slate-400 hover:text-slate-300 transition-colors p-1"
              title="Copiar valor"
            >
              {copiado === 'resultado' ? (
                <Check className="w-4 h-4 text-green-400" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Información adicional */}
      <div className="bg-slate-700 rounded-lg p-4 mt-4">
        <div className="text-sm text-slate-300">
          <p>Valores utilizados:</p>
          <ul className="mt-2 space-y-1">
            {resultados.desde !== 'CLP' && (
              <li>
                1 {resultados.desde} = {formatearMonto(indicadores[resultados.desde].valor, 'CLP')}
              </li>
            )}
            {resultados.hacia !== 'CLP' && (
              <li>
                1 {resultados.hacia} = {formatearMonto(indicadores[resultados.hacia].valor, 'CLP')}
              </li>
            )}
          </ul>
        </div>
        <p className="text-xs text-slate-400 mt-2">
          Fecha y hora de la conversión: {resultados.fecha.toLocaleString('es-CL')}
        </p>
      </div>

      {/* Botón Exportar PDF */}
      <div className="mt-6 flex justify-center">
        <BotonExportar onClick={handleExportPDF} />
      </div>
    </div>
  );
};

export default ResultadosConversion;