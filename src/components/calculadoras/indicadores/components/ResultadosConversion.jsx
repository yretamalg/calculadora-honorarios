import React from 'react';

const ResultadosConversion = ({ resultado }) => {
  if (!resultado) return null;

  const formatearNumero = (numero) => {
    return new Intl.NumberFormat('es-CL', {
      maximumFractionDigits: 2,
      minimumFractionDigits: 2
    }).format(numero);
  };

  const formatearMoneda = (numero, tipo = 'CLP') => {
    const formateado = formatearNumero(Math.abs(numero));
    if (tipo === 'CLP') {
      return `$ ${formateado}`;
    }
    return formateado;
  };

  return (
    <div className="bg-slate-700 rounded-lg p-6">
      <h2 className="text-lg font-medium text-slate-300 mb-4">Resultado:</h2>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-slate-400">Valor Original:</span>
          <span className="text-xl font-semibold text-white">
            {resultado.tipoIndicador === 'UF' 
              ? formatearMoneda(resultado.montoOriginal)
              : formatearMoneda(resultado.montoOriginal, resultado.tipoIndicador)}
          </span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-slate-400">Valor Convertido:</span>
          <span className="text-2xl font-bold text-orange-500">
            {resultado.tipoIndicador === 'UF'
              ? formatearNumero(resultado.montoConvertido)
              : formatearMoneda(resultado.montoConvertido)}
          </span>
        </div>

        <div className="pt-4 border-t border-slate-600">
          <div className="flex justify-between items-center text-sm">
            <span className="text-slate-400">Valor {resultado.tipoIndicador}:</span>
            <span className="text-slate-300">
              {formatearMoneda(resultado.valorIndicador)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultadosConversion;