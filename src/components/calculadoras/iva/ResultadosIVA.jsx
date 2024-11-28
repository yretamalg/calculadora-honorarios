import React from 'react';
import { formatearMonto } from '../../../utils/formatters';

const ResultadosIVA = ({ resultados }) => {
  return (
    <div className="space-y-4 bg-slate-800 p-6 rounded-lg">
      <div className="flex justify-between items-center">
        <p className="text-slate-300 text-sm">Neto:</p>
        <p className="text-slate-100 text-2xl font-bold">
          {formatearMonto(resultados.subtotal)}
        </p>
      </div>
      <div className="flex justify-between items-center border-t border-slate-700 pt-4">
        <p className="text-slate-300 text-sm">
          IVA (19%):
        </p>
        <p className="text-orange-400 text-2xl font-bold">
          {formatearMonto(resultados.iva)}
        </p>
      </div>
      <div className="flex justify-between items-center border-t border-slate-700 pt-4">
        <p className="text-slate-300 text-sm">Total:</p>
        <p className="text-green-400 text-4xl font-bold">
          {formatearMonto(resultados.total)}
        </p>
      </div>
    </div>
  );
};

export default ResultadosIVA;