import React, { useState } from 'react';
import { useAnalytics } from '@/hooks/useAnalytics';
import generarPDFIndicadores from '@/core/pdf/generators/indicadoresPDF';

const BotonExportarIndicadores = ({ resultado }) => {
  const [exportando, setExportando] = useState(false);
  const { trackCalculator, trackError } = useAnalytics();

  const handleExport = async () => {
    try {
      setExportando(true);

      trackCalculator('indicadores_pdf_start', {
        tipo_indicador: resultado?.tipoIndicador,
        monto_original: resultado?.montoOriginal,
        monto_convertido: resultado?.montoConvertido,
        fecha_conversion: new Date().toISOString()
      });

      await generarPDFIndicadores(resultado);

      trackCalculator('indicadores_pdf_success', {
        tipo_indicador: resultado?.tipoIndicador,
        timestamp: new Date().toISOString(),
        valor_indicador: resultado?.valorIndicador
      });
    } catch (error) {
      console.error('Error al generar PDF:', error);
      
      trackError(error, {
        component: 'BotonExportarIndicadores',
        action: 'generar_pdf',
        tipo_indicador: resultado?.tipoIndicador,
        error_message: error.message
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
        aria-hidden="true"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" 
        />
      </svg>
      <span>
        {exportando ? 'Exportando...' : 'Exportar PDF'}
      </span>
    </button>
  );
};

export default BotonExportarIndicadores;