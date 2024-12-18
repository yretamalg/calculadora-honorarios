import React, { useState } from 'react';
import { useAnalytics } from '../../../../hooks/useAnalytics';
import generarPDFHonorarios from '../../../../core/pdf/generators/honorariosPDF';

const BotonExportarHonorarios = ({ 
  resultados, 
  tasaRetencion, 
  añoRetencion,
  className = ''
}) => {
  const [exportando, setExportando] = useState(false);
  const { trackCalculator, trackError } = useAnalytics();

  const handleExport = async () => {
    setExportando(true);

    try {
      // Track inicio de exportación
      trackCalculator('honorarios_pdf_start', {
        año_retencion: añoRetencion,
        tasa_retencion: tasaRetencion,
        tiene_resultados_liquidos: Boolean(resultados.desdeValoresLiquidos.bruto),
        tiene_resultados_brutos: Boolean(resultados.desdeValoresBrutos.bruto)
      });

      await generarPDFHonorarios(resultados, tasaRetencion, añoRetencion);

      // Track exportación exitosa
      trackCalculator('honorarios_pdf_success', {
        año_retencion: añoRetencion,
        tasa_retencion: tasaRetencion,
        timestamp: new Date().toISOString()
      });

    } catch (error) {
      console.error('Error al generar PDF:', error);
      
      trackError(error, {
        component: 'BotonExportarHonorarios',
        action: 'generar_pdf',
        año_retencion: añoRetencion,
        tasa_retencion: tasaRetencion,
        error_mensaje: error.message
      });

    } finally {
      setExportando(false);
    }
  };

  return (
    <button
      onClick={handleExport}
      disabled={exportando}
      className={`px-4 py-2 text-sm bg-slate-800 text-slate-300 
                hover:text-white hover:bg-slate-700 transition-colors 
                rounded-md border border-slate-600 
                flex items-center gap-2
                disabled:opacity-50 disabled:cursor-not-allowed
                ${className}`}
      aria-label="Exportar resultados a PDF"
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

export default BotonExportarHonorarios;