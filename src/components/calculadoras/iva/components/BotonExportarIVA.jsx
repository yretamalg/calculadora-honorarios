import React, { useState } from 'react';
import { useAnalytics } from '@/hooks/useAnalytics';
import generarPDFIva from '@/core/pdf/generators/ivaPDF';

const BotonExportarIVA = ({ items, resultados, onExport }) => {
  const [exportando, setExportando] = useState(false);
  const { trackCalculator, trackError } = useAnalytics();

  const handleExport = async () => {
    try {
      setExportando(true);

      trackCalculator('iva_pdf_start', {
        num_items: items.length,
        subtotal: resultados.subtotal,
        total: resultados.total
      });

      await generarPDFIva(items, resultados);
      onExport?.();

      trackCalculator('iva_pdf_success', {
        num_items: items.length,
        timestamp: new Date().toISOString()
      });

    } catch (error) {
      console.error('Error al generar PDF de IVA:', error);
      
      trackError(error, {
        component: 'BotonExportarIVA',
        action: 'generar_pdf',
        num_items: items.length
      });

    } finally {
      setExportando(false);
    }
  };

  return (
    <button
      onClick={handleExport}
      disabled={exportando}
      className="px-4 py-2 text-sm bg-slate-800 text-slate-300 hover:text-white 
               hover:bg-slate-700 transition-colors rounded-md border border-slate-600 
               flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
      aria-label={exportando ? 'Exportando PDF...' : 'Exportar a PDF'}
    >
      <svg 
        className="w-4 h-4" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" 
        />
      </svg>
      {exportando ? 'Exportando...' : 'Exportar PDF'}
    </button>
  );
};

export default BotonExportarIVA;