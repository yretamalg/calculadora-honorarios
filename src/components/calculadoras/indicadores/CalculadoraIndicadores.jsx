import React, { useState } from 'react';
import NavigationMenu from '@/components/shared/NavigationMenu';
import ShareButtons from '@/components/shared/ShareButtons';
import TipoIndicadorSelector from './components/TipoIndicadorSelector';
import ConversionForm from './components/ConversionForm';
import ResultadosConversion from './components/ResultadosConversion';
import IndicadoresDisplay from './components/IndicadoresDisplay';
import { useIndicadores } from './hooks/useIndicadores';
import { parsearMonto } from './utils/formatters';
import { formatDate } from './utils/dateUtils';
import DataSourceInfo from './DataSourceInfo';


const CalculadoraIndicadores = () => {
  const { data: indicadores, loading, error, lastUpdate } = useIndicadores();
  const [tipoIndicador, setTipoIndicador] = useState('UF');
  const [direccion, setDireccion] = useState('to_clp');
  const [monto, setMonto] = useState('');
  const [resultado, setResultado] = useState(null);

  const calcular = () => {
    if (!monto || !indicadores) return;

    const montoNumerico = parsearMonto(monto);
    const valorIndicador = indicadores[tipoIndicador]?.valor;

    if (!valorIndicador) return;

    let resultadoCalculo;
    if (direccion === 'to_clp') {
      // Convertir a CLP (multiplicar por el valor del indicador)
      resultadoCalculo = montoNumerico * valorIndicador;
    } else {
      // Convertir desde CLP (dividir por el valor del indicador)
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
  };

  const getConversionLabel = () => {
    const indicadorLabel = {
      'UF': 'UF',
      'DOLAR': 'Dólares',
      'EURO': 'Euros',
      'UTM': 'UTM'
    }[tipoIndicador];

    return direccion === 'to_clp'
      ? `${indicadorLabel} a Pesos`
      : `Pesos a ${indicadorLabel}`;
  };

  const handleTipoChange = (nuevoTipo) => {
    setTipoIndicador(nuevoTipo);
    setResultado(null);
    setMonto('');
  };

  const toggleDireccion = () => {
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
              Calculadora de Indicadores Económicos
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
                  onChange={handleTipoChange}
                  disabled={loading}
                />
                
                <button
                  onClick={toggleDireccion}
                  className="w-full p-3 text-sm font-medium rounded-lg
                           bg-slate-700 text-slate-300 hover:bg-slate-600
                           transition-colors"
                >
                  {getConversionLabel()}
                  <span className="ml-2 text-slate-400">↔</span>
                </button>

                <ConversionForm
                  valor={monto}
                  onChange={setMonto}
                  tipoIndicador={tipoIndicador}
                  direccion={direccion}
                  disabled={loading || !indicadores}
                  onCalcular={calcular}
                />

                {resultado && (
                  <ResultadosConversion
                    resultado={resultado}
                  />
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