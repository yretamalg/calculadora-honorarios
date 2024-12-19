import React, { useState } from 'react';
import { useAnalytics } from '@/hooks/useAnalytics';
import { generarPDFPorcentaje } from '@/core/pdf';

const BotonExportarPorcentajes = ({ datos, onExport }) => {
  const [exportando, setExportando] = useState(false);
  const { trackCalculator, trackError } = useAnalytics();

  const handleExport = async () => {
    try {
      setExportando(true);

      trackCalculator('percentage_pdf_start', {
        calculator_type: datos.tipo,
        has_complete_data: Boolean(datos.resultado),
        timestamp: new Date().toISOString()
      });

      const resultado = await generarPDFPorcentaje(datos);
      
      if (resultado) {
        trackCalculator('percentage_pdf_success', {
          calculator_type: datos.tipo,
          timestamp: new Date().toISOString()
        });

        if (onExport) onExport();
      }
    } catch (error) {
      console.error('Error al exportar:', error);
      
      trackError(error, {
        component: 'BotonExportarPorcentajes',
        action: 'exportar_pdf',
        calculator_type: datos.tipo,
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
      className="px-4 py-2 text-sm bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 
                transition-colors rounded-md border border-slate-600 flex items-center gap-2
                disabled:opacity-50 disabled:cursor-not-allowed"
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

export default BotonExportarPorcentajes;