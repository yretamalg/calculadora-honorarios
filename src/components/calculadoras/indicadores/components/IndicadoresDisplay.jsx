import React from 'react';
import { RefreshCw } from 'lucide-react';

const IndicadoresDisplay = ({ data, loading, error, lastUpdate, onRefresh }) => {
  const formatValue = (value) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  };

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500 mx-auto"></div>
        <p className="text-slate-300 mt-2">Cargando indicadores...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-400">Error al cargar los indicadores</p>
        <button
          onClick={onRefresh}
          className="mt-2 px-4 py-2 bg-orange-700 text-white rounded-md hover:bg-orange-600 transition-colors"
        >
          Reintentar
        </button>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="bg-slate-700 rounded-lg p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-slate-300">
          Indicadores del día
        </h2>
        <button
          onClick={onRefresh}
          className="p-2 text-slate-400 hover:text-slate-300 transition-colors"
          title="Actualizar valores"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Object.entries(data).map(([key, value]) => (
          <div key={key} className="bg-slate-800 p-4 rounded-lg">
            <div className="text-sm text-slate-400">{key}</div>
            <div className="text-xl font-bold text-orange-500">
              {formatValue(value.valor)}
            </div>
          </div>
        ))}
      </div>
      
      {lastUpdate && (
        <div className="text-xs text-slate-400 mt-4 text-right">
          Última actualización: {lastUpdate.toLocaleTimeString()}
        </div>
      )}
    </div>
  );
};

export default IndicadoresDisplay;