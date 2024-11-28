import React, { useState } from 'react';
import { TASAS_RETENCION } from '../../../constants/config';
import { formatearMonto } from '../../../utils/formatters';

const ResultadosCalculo = ({ resultados, tasaRetencion }) => {
  const [copiado, setCopiado] = useState('');
  const tasaActual = TASAS_RETENCION.find(t => t.valor.toString() === tasaRetencion);
  const añoRetencion = tasaActual?.año || '2024';

  const copiarAlPortapapeles = (monto, tipo) => {
    navigator.clipboard.writeText(monto.toString().replace(/[^\d]/g, ''));
    setCopiado(tipo);
    setTimeout(() => setCopiado(''), 2000);
  };

  return (
    <div className="space-y-4 bg-slate-800 p-6 rounded-lg">
      {/* Desde valores líquidos */}
      <div className="border border-slate-700 rounded-lg p-4 mb-4">
        <div className="text-slate-300 text-2xl mb-2 font-bold">
          Si lo pactado fue en valores líquidos
        </div>
        <div className="h-[40px]">
          {copiado === 'brutoLiquido' && (
            <div className="text-green-400 text-sm">¡Monto copiado al portapapeles!</div>
          )}
        </div>
        <div className="flex justify-between items-center">
          <p className="text-slate-300 text-sm leading-none">Este es el monto por el cual debes hacer tu boleta:</p>
          <div className="flex items-center space-x-2">
            <p className="text-slate-100 text-2xl font-bold leading-none">
              {formatearMonto(resultados.desdeValoresLiquidos.bruto)}
            </p>
            <button
              onClick={() => copiarAlPortapapeles(resultados.desdeValoresLiquidos.bruto, 'brutoLiquido')}
              className="text-slate-400 hover:text-white p-1"
              title="Copiar monto"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
              </svg>
            </button>
          </div>
        </div>
        <div className="flex justify-between items-center border-t border-slate-700 pt-4 mt-4">
          <p className="text-slate-300 text-sm leading-none">
            La retención del {tasaRetencion}% corresponde al año {añoRetencion} es de:
          </p>
          <p className="text-red-400 text-2xl font-bold leading-none">
            {formatearMonto(resultados.desdeValoresLiquidos.retencion)}
          </p>
        </div>
        <div className="flex justify-between items-center border-t border-slate-700 pt-4 mt-4">
          <p className="text-slate-300 text-sm leading-none">Recibirás un monto líquido a tu cuenta:</p>
          <p className="text-green-400 text-4xl font-bold leading-none">
            {formatearMonto(resultados.desdeValoresLiquidos.liquido)}
          </p>
        </div>
      </div>

      {/* Desde valores brutos */}
      <div className="border border-slate-700 rounded-lg p-4">
        <div className="text-slate-300 text-2xl mb-2 font-bold">
          Si lo pactado fue en valores brutos
        </div>
        <div className="h-[40px]">
          {copiado === 'brutoBruto' && (
            <div className="text-green-400 text-sm">¡Monto copiado al portapapeles!</div>
          )}
        </div>
        <div className="flex justify-between items-center">
          <p className="text-slate-300 text-sm leading-none">Este es el monto por el cual debes hacer tu boleta:</p>
          <div className="flex items-center space-x-2">
            <p className="text-slate-100 text-2xl font-bold leading-none">
              {formatearMonto(resultados.desdeValoresBrutos.bruto)}
            </p>
            <button
              onClick={() => copiarAlPortapapeles(resultados.desdeValoresBrutos.bruto, 'brutoBruto')}
              className="text-slate-400 hover:text-white p-1"
              title="Copiar monto"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
              </svg>
            </button>
          </div>
        </div>
        <div className="flex justify-between items-center border-t border-slate-700 pt-4 mt-4">
          <p className="text-slate-300 text-sm leading-none">
            La retención del {tasaRetencion}% corresponde al año {añoRetencion} es de:
          </p>
          <p className="text-red-400 text-2xl font-bold leading-none">
            {formatearMonto(resultados.desdeValoresBrutos.retencion)}
          </p>
        </div>
        <div className="flex justify-between items-center border-t border-slate-700 pt-4 mt-4">
          <p className="text-slate-300 text-sm leading-none">Recibirás un monto líquido a tu cuenta:</p>
          <p className="text-green-400 text-4xl font-bold leading-none">
            {formatearMonto(resultados.desdeValoresBrutos.liquido)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResultadosCalculo;