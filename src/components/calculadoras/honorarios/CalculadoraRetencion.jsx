import React, { useState } from 'react';
import FormularioIngreso from './components/FormularioIngreso';
import BotonesControl from '@/shared/ui/BotonesControl';
import ResultadosCalculo from './components/ResultadosCalculo';
import NavigationMenu from '@/layouts/components/NavigationMenu';
import ShareButtons from '@/layouts/components/ShareButtons';
import { TASAS_RETENCION, calcularMontos } from '@/config/config';
import { useAnalytics } from '../../../hooks/useAnalytics';
import { ANALYTICS_CONFIG } from '@/core/analytics/analytics';

const CalculadoraRetencion = () => {
  const [monto, setMonto] = useState('');
  const [tasaRetencion, setTasaRetencion] = useState(TASAS_RETENCION[0].valor.toString());
  const [resultados, setResultados] = useState({
    desdeValoresLiquidos: {
      bruto: 0,
      retencion: 0,
      liquido: 0
    },
    desdeValoresBrutos: {
      bruto: 0,
      retencion: 0,
      liquido: 0
    }
  });

  const { trackCalculator, trackError } = useAnalytics();

  const parsearMonto = (texto) => {
    if (!texto) return 0;
    // Remover el signo peso, los puntos y los espacios
    const numeroLimpio = texto.replace(/[$\s.]/g, '');
    return parseInt(numeroLimpio) || 0;
  };

  const calcular = () => {
    try {
      const montoNumerico = parsearMonto(monto);
      if (!montoNumerico) return;

      const resultadosCalculados = calcularMontos(montoNumerico, tasaRetencion);
      setResultados(resultadosCalculados);

      // Track del cálculo exitoso
      trackCalculator(ANALYTICS_CONFIG.CUSTOM_EVENTS.HONORARIOS_CALCULATE, {
        monto: montoNumerico,
        tasa: tasaRetencion,
        tipo_calculo: 'retencion_honorarios'
      });

    } catch (error) {
      console.error('Error en el cálculo:', error);
      trackError(error, {
        component: 'CalculadoraRetencion',
        action: 'calcular'
      });
    }
  };

  const limpiar = () => {
    setMonto('');
    setTasaRetencion(TASAS_RETENCION[0].valor.toString());
    setResultados({
      desdeValoresLiquidos: {
        bruto: 0,
        retencion: 0,
        liquido: 0
      },
      desdeValoresBrutos: {
        bruto: 0,
        retencion: 0,
        liquido: 0
      }
    });

    // Track de limpieza del formulario
    trackCalculator('honorarios_reset', {
      action: 'reset_form'
    });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <NavigationMenu />
      <div className="flex-grow container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-slate-800 rounded-lg shadow-xl p-6 mb-6">
            <h1 className="text-slate-300 text-2xl font-bold text-center mb-6">
              Retención Boleta Honorarios 2024-2028
            </h1>
            <div className="space-y-6">
              <FormularioIngreso
                monto={monto}
                tasaRetencion={tasaRetencion}
                onMontoChange={setMonto}
                onTasaChange={(tasa) => {
                  setTasaRetencion(tasa);
                  // Track de cambio de tasa
                  trackCalculator('honorarios_tasa_change', {
                    nueva_tasa: tasa,
                    año: TASAS_RETENCION.find(t => t.valor.toString() === tasa)?.año
                  });
                }}
                tasasRetencion={TASAS_RETENCION}
              />

              <BotonesControl
                onCalcular={calcular}
                onLimpiar={limpiar}
              />

              {resultados.desdeValoresLiquidos.bruto > 0 && (
                <ResultadosCalculo
                  resultados={resultados}
                  tasaRetencion={tasaRetencion}
                  onExportPdf={() => {
                    trackCalculator('honorarios_export_pdf', {
                      monto: parsearMonto(monto),
                      tasa: tasaRetencion
                    });
                  }}
                />
              )}
            </div>
          </div>

          <div className="mb-6">
            <ShareButtons 
              onShare={(platform) => {
                trackCalculator('honorarios_share', {
                  platform,
                  has_results: resultados.desdeValoresLiquidos.bruto > 0
                });
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalculadoraRetencion;