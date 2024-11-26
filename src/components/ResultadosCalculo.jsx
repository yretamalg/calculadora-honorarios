import React from 'react';
import { TASAS_RETENCION, formatearMonto } from '../constants/config';

const ResultadosCalculo = ({ resultados, tasaRetencion }) => {
  const tasaActual = TASAS_RETENCION.find(t => t.valor.toString() === tasaRetencion);
  const añoRetencion = tasaActual?.año || '2024';

  return (
    <div className="space-y-4 bg-slate-800 p-6 rounded-lg">
      <div 
        className="border border-slate-700 rounded-lg p-4 mb-4"
        style={{ boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.1)' }}
      >
        <div className="text-slate-300 text-2xl mb-2 font-bold">
          Si lo pactado fue en valores líquidos
        </div>
        <div className="h-[40px]"></div>
        <div className="flex justify-between items-center">
          <p className="text-slate-300 text-sm leading-none">Este es el monto por el cual debes hacer tu boleta:</p>
          <p className="text-slate-100 text-2xl font-bold leading-none">{formatearMonto(resultados.bruto)}</p>
        </div>
        <div className="flex justify-between items-center border-t border-slate-700 pt-4 mt-4">
          <p className="text-slate-300 text-sm leading-none">
            La retención del {tasaRetencion}% corresponde al año {añoRetencion} es de:
          </p>
          <p className="text-red-400 text-2xl font-bold leading-none">
            {formatearMonto(resultados.retencion)}
          </p>
        </div>
        <div className="flex justify-between items-center border-t border-slate-700 pt-4 mt-4 leading-none">
          <p className="text-slate-300 text-sm leading-none">Recibirás un monto líquido a tu cuenta:</p>
          <p className="text-green-400 text-4xl font-bold leading-none">
            {formatearMonto(resultados.liquido)}
          </p>
        </div>
      </div>

      <div 
        className="border border-slate-700 rounded-lg p-4"
        style={{ boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.1)' }}
      >
        <div className="text-slate-300 text-2xl mb-2 font-bold">
          Si lo pactado fue en valores brutos
        </div>
        <div className="h-[40px]"></div>
        <div className="flex justify-between items-center">
          <p className="text-slate-300 text-sm leading-none">Este es el monto por el cual debes hacer tu boleta:</p>
          <p className="text-slate-100 text-2xl font-bold leading-none">{formatearMonto(resultados.liquido)}</p>
        </div>
        <div className="flex justify-between items-center border-t border-slate-700 pt-4 mt-4">
          <p className="text-slate-300 text-sm leading-none">
            La retención del {tasaRetencion}% corresponde al año {añoRetencion} es de:
          </p>
          <p className="text-red-400 text-2xl font-bold leading-none">
            {formatearMonto(resultados.liquido * (parseFloat(tasaRetencion) / 100))}
          </p>
        </div>
        <div className="flex justify-between items-center border-t border-slate-700 pt-4 mt-4">
          <p className="text-slate-300 text-sm leading-none">Recibirás un monto líquido a tu cuenta:</p>
          <p className="text-green-400 text-4xl font-bold leading-none">
            {formatearMonto(resultados.liquido * (1 - parseFloat(tasaRetencion) / 100))}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResultadosCalculo;