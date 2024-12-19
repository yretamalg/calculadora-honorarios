import React, { useState } from 'react';
import NavigationMenu from '@/layouts/components/NavigationMenu';
import ShareButtons from '@/layouts/components/ShareButtons';
import TipoIndicadorSelector from './components/TipoIndicadorSelector';
import ConversionForm from './components/ConversionForm';
import ResultadosConversion from './components/ResultadosConversion';
import IndicadoresDisplay from './components/IndicadoresDisplay';
import DataSourceInfo from './DataSourceInfo';
import { useIndicadores } from './hooks/useIndicadores';
import { useAnalytics } from '@/hooks/useAnalytics';
import { parsearMonto } from '@/core/formatters/formatters';
import { formatDate } from './utils/dateUtils';

const CalculadoraIndicadores = () => {
  const { data: indicadores, loading, error, lastUpdate } = useIndicadores();
  const [tipoIndicador, setTipoIndicador] = useState('UF');
  const [direccion, setDireccion] = useState('to_clp');
  const [monto, setMonto] = useState('');
  const [resultado, setResultado] = useState(null);
  const { trackCalculator, trackError, trackPage } = useAnalytics();

  React.useEffect(() => {
    trackPage('/indicadores', 'Conversor de Indicadores Económicos');
  }, []);

  const calcular = () => {
    if (!monto || !indicadores) return;

    try {
      const montoNumerico = parsearMonto(monto);
      const valorIndicador = indicadores[tipoIndicador]?.valor;

      if (!valorIndicador) return;

      let resultadoCalculo;
      if (direccion === 'to_clp') {
        resultadoCalculo = montoNumerico * valorIndicador;
      } else {
        resultadoCalculo = montoNumerico / valorIndicador;
      }

      setResultado({
        montoOriginal: montoNumerico,
        montoConvertido: resultadoCalculo,
        tipoIndicador,
        valorIndicador,
        direccion,
        fecha: indicadores[tipoIndicador]?.fecha
      });

      trackCalculator('indicadores_calculate', {
        tipo_indicador: tipoIndicador,
        direccion,
        monto_original: montoNumerico,
        resultado: resultadoCalculo,
        valor_indicador: valorIndicador
      });

    } catch (error) {
      trackError(error, {
        component: 'CalculadoraIndicadores',
        action: 'calcular',
        tipo_indicador: tipoIndicador,
        monto
      });
    }
  };

  const limpiar = () => {
    trackCalculator('indicadores_clear', {
      tipo_indicador: tipoIndicador,
      had_result: Boolean(resultado)
    });
    
    setMonto('');
    setResultado(null);
  };

  const toggleDireccion = () => {
    trackCalculator('indicadores_direction_change', {
      previous_direction: direccion,
      new_direction: direccion === 'to_clp' ? 'from_clp' : 'to_clp',
      tipo_indicador: tipoIndicador
    });

    setDireccion(prev => prev === 'to_clp' ? 'from_clp' : 'to_clp');
    setMonto('');
    setResultado(null);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <NavigationMenu />
      <div className="flex-grow container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-slate-800 rounded-lg shadow-xl p-6 mb-6">
            <h1 className="text-slate-300 text-2xl font-bold text-center mb-2">
              Conversor de Indicadores Económicos
            </h1>
            {lastUpdate && (
              <p className="text-slate-400 text-sm text-center mb-6">
                Última actualización: {formatDate(lastUpdate)}
              </p>
            )}
            
            <IndicadoresDisplay 
              indicadores={indicadores}
              loading={loading}
              error={error}
            />

            <DataSourceInfo />

            <div className="mt-8 border-t border-slate-700 pt-6">
              <div className="space-y-6">
                <TipoIndicadorSelector
                  tipoSeleccionado={tipoIndicador}
                  onChange={setTipoIndicador}
                  disabled={loading}
                />

                <ConversionForm
                  valor={monto}
                  onChange={setMonto}
                  tipoIndicador={tipoIndicador}
                  direccion={direccion}
                  onDireccionChange={toggleDireccion}
                  onCalcular={calcular}
                  onLimpiar={limpiar}
                  disabled={loading || !indicadores}
                />

                {resultado && (
                  <ResultadosConversion resultado={resultado} />
                )}
              </div>
            </div>
          </div>
          
          <div className="mb-6">
            <ShareButtons />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalculadoraIndicadores;