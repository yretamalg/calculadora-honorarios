import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { TASAS_RETENCION, formatearMonto } from '../constants/config';

const CopyButton = ({ textToCopy }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Error al copiar:', err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="ml-2 p-1 text-slate-400 hover:text-slate-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-slate-800 rounded transition-colors duration-200"
      title="Copiar valor"
    >
      {copied ? (
        <Check className="w-4 h-4 text-green-400" />
      ) : (
        <Copy className="w-4 h-4" />
      )}
    </button>
  );
};

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
          <div className="flex items-center">
            <p className="text-slate-100 text-2xl font-bold leading-none">
              {formatearMonto(resultados.desdeValoresLiquidos.bruto)}
            </p>
            <CopyButton textToCopy={formatearMonto(resultados.desdeValoresLiquidos.bruto)} />
          </div>
        </div>
        <div className="flex justify-between items-center border-t border-slate-700 pt-4 mt-4">
          <p className="text-slate-300 text-sm leading-none">
            La retención del {tasaRetencion}% corresponde al año {añoRetencion} es de:
          </p>
          <div className="flex items-center">
            <p className="text-red-400 text-2xl font-bold leading-none">
              {formatearMonto(resultados.desdeValoresLiquidos.retencion)}
            </p>
            <CopyButton textToCopy={formatearMonto(resultados.desdeValoresLiquidos.retencion)} />
          </div>
        </div>
        <div className="flex justify-between items-center border-t border-slate-700 pt-4 mt-4 leading-none">
          <p className="text-slate-300 text-sm leading-none">Recibirás un monto líquido a tu cuenta:</p>
          <div className="flex items-center">
            <p className="text-green-400 text-4xl font-bold leading-none">
              {formatearMonto(resultados.desdeValoresLiquidos.liquido)}
            </p>
            <CopyButton textToCopy={formatearMonto(resultados.desdeValoresLiquidos.liquido)} />
          </div>
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
          <div className="flex items-center">
            <p className="text-slate-100 text-2xl font-bold leading-none">
              {formatearMonto(resultados.desdeValoresBrutos.bruto)}
            </p>
            <CopyButton textToCopy={formatearMonto(resultados.desdeValoresBrutos.bruto)} />
          </div>
        </div>
        <div className="flex justify-between items-center border-t border-slate-700 pt-4 mt-4">
          <p className="text-slate-300 text-sm leading-none">
            La retención del {tasaRetencion}% corresponde al año {añoRetencion} es de:
          </p>
          <div className="flex items-center">
            <p className="text-red-400 text-2xl font-bold leading-none">
              {formatearMonto(resultados.desdeValoresBrutos.retencion)}
            </p>
            <CopyButton textToCopy={formatearMonto(resultados.desdeValoresBrutos.retencion)} />
          </div>
        </div>
        <div className="flex justify-between items-center border-t border-slate-700 pt-4 mt-4">
          <p className="text-slate-300 text-sm leading-none">Recibirás un monto líquido a tu cuenta:</p>
          <div className="flex items-center">
            <p className="text-green-400 text-4xl font-bold leading-none">
              {formatearMonto(resultados.desdeValoresBrutos.liquido)}
            </p>
            <CopyButton textToCopy={formatearMonto(resultados.desdeValoresBrutos.liquido)} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultadosCalculo;