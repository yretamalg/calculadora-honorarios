import React, { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { useAnalytics } from '@/hooks/useAnalytics';
import { formatearMonto } from '@/core/formatters/formatters';
import BotonExportarIVA from './BotonExportarIVA';

const ResultadosIVA = ({ resultados, items }) => {
  const [copiado, setCopiado] = useState('');
  const { trackCalculator, trackError } = useAnalytics();

  const copiarAlPortapapeles = async (valor, tipo) => {
    try {
      const valorFormateado = formatearMonto(valor);
      await navigator.clipboard.writeText(valorFormateado);
      setCopiado(tipo);
      setTimeout(() => setCopiado(''), 2000);

      trackCalculator('iva_copy_value', {
        tipo_valor: tipo,
        valor: valor,
        num_items: items.length
      });

    } catch (error) {
      console.error('Error al copiar:', error);
      trackError(error, {
        component: 'ResultadosIVA',
        action: 'copiar_valor',
        tipo_valor: tipo
      });
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
          onExport={() => {
            trackCalculator('iva_export_pdf', {
              num_items: items.length,
              total: resultados.total,
              items_con_descripcion: items.filter(i => i.descripcion).length
            });
          }}
        />
      </div>
    </div>
  );
};

export default ResultadosIVA;