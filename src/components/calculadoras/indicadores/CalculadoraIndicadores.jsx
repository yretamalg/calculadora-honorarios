import React, { useState } from 'react';
import { useIndicadores } from './hooks/useIndicadores';
import ConversionForm from './components/ConversionForm';
import IndicadoresDisplay from './components/IndicadoresDisplay';
import ResultadosConversion from './components/ResultadosConversion';
import NavigationMenu from '../../shared/NavigationMenu';
import ShareButtons from '../../shared/ShareButtons';

const CalculadoraIndicadores = () => {
  const { data, loading, error, lastUpdate, refresh } = useIndicadores();
  const [resultados, setResultados] = useState(null);
  const [fetchError, setFetchError] = useState(null);

  const handleCalcular = async (valores) => {
    const { monto, desde, hacia } = valores;
    
    if (!data || !monto) return;

    try {
      let resultado = 0;
      let explicacion = '';

      // Convertir a CLP primero si es necesario
      let montoEnCLP = monto;
      if (desde !== 'CLP') {
        if (!data[desde]?.valor) {
          throw new Error(`No se pudo obtener el valor para ${desde}`);
        }
        montoEnCLP = monto * data[desde].valor;
      }

      // Convertir a moneda destino
      if (hacia === 'CLP') {
        resultado = montoEnCLP;
      } else {
        if (!data[hacia]?.valor) {
          throw new Error(`No se pudo obtener el valor para ${hacia}`);
        }
        resultado = montoEnCLP / data[hacia].valor;
      }

      setResultados({
        montoOriginal: monto,
        resultado,
        desde,
        hacia,
        tasaUsada: data[hacia === 'CLP' ? desde : hacia].valor,
        fecha: new Date()
      });
      setFetchError(null);
    } catch (err) {
      setFetchError(err.message);
      setResultados(null);
    }
  };

  const limpiar = () => {
    setResultados(null);
    setFetchError(null);
  };

  // Manejo de error general
  if (error) {
    return (
      <div className="flex flex-col min-h-screen">
        <NavigationMenu />
        <div className="flex-grow container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-slate-800 rounded-lg shadow-xl p-6 mb-6">
              <div className="text-center py-8">
                <p className="text-red-400 mb-4">
                  Error al cargar los indicadores: {error}
                </p>
                <button
                  onClick={refresh}
                  className="px-4 py-2 bg-orange-700 text-white rounded-md hover:bg-orange-600 transition-colors"
                >
                  Reintentar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <NavigationMenu />
      <div className="flex-grow container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-slate-800 rounded-lg shadow-xl p-6 mb-6">
            <h1 className="text-slate-300 text-2xl font-bold text-center mb-6">
              Conversor de UF, Dólar, Euro y UTM
            </h1>
            <div className="space-y-6">
              <IndicadoresDisplay
                data={data}
                loading={loading}
                error={error}
                lastUpdate={lastUpdate}
                onRefresh={refresh}
              />
              
              {fetchError && (
                <div className="bg-red-900/50 border border-red-500 text-red-300 p-4 rounded-lg">
                  {fetchError}
                </div>
              )}
              
              <ConversionForm
                onSubmit={handleCalcular}
                onClear={limpiar}
                loading={loading}
              />
              
              {resultados && (
                <ResultadosConversion
                  resultados={resultados}
                  indicadores={data}
                />
              )}
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