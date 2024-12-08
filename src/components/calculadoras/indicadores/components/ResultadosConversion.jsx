import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

const ResultadosConversion = ({ resultado }) => {
  const [copiadoOriginal, setCopiadoOriginal] = useState(false);
  const [copiadoConvertido, setCopiadoConvertido] = useState(false);

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

  const copiarAlPortapapeles = async (texto, setCopied) => {
    try {
      await navigator.clipboard.writeText(texto);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Error al copiar:', err);
    }
  };

  const handleCopiarOriginal = () => {
    const texto = resultado.tipoIndicador === 'UF' 
      ? formatearMoneda(resultado.montoOriginal)
      : formatearMoneda(resultado.montoOriginal, resultado.tipoIndicador);
    copiarAlPortapapeles(texto, setCopiadoOriginal);
  };

  const handleCopiarConvertido = () => {
    const texto = resultado.tipoIndicador === 'UF'
      ? formatearNumero(resultado.montoConvertido)
      : formatearMoneda(resultado.montoConvertido);
    copiarAlPortapapeles(texto, setCopiadoConvertido);
  };

  const getLabelOrigen = () => {
    if (resultado.direccion === 'to_clp') {
      return `Valor en ${resultado.tipoIndicador}:`;
    }
    return 'Valor en Pesos (CLP):';
  };

  const getLabelDestino = () => {
    if (resultado.direccion === 'to_clp') {
      return 'Valor en Pesos (CLP):';
    }
    return `Valor en ${resultado.tipoIndicador}:`;
  };

  return (
    <div className="bg-slate-700 rounded-lg p-6">
      <h2 className="text-lg font-medium text-slate-300 mb-4">Resultado</h2>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-slate-400">{getLabelOrigen()}</span>
          <div className="flex items-center gap-3">
            <span className="text-xl font-semibold text-white">
              {resultado.tipoIndicador === 'UF' 
                ? formatearMoneda(resultado.montoOriginal)
                : formatearMoneda(resultado.montoOriginal, resultado.tipoIndicador)}
            </span>
            <button
              onClick={handleCopiarOriginal}
              className="p-1.5 hover:bg-slate-600 rounded-md transition-colors"
            >
              {copiadoOriginal ? (
                <Check className="w-4 h-4 text-green-500" />
              ) : (
                <Copy className="w-4 h-4 text-slate-400" />
              )}
            </button>
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-slate-400">{getLabelDestino()}</span>
          <div className="flex items-center gap-3">
            <span className="text-2xl font-bold text-orange-500">
              {resultado.tipoIndicador === 'UF'
                ? formatearNumero(resultado.montoConvertido)
                : formatearMoneda(resultado.montoConvertido)}
            </span>
            <button
              onClick={handleCopiarConvertido}
              className="p-1.5 hover:bg-slate-600 rounded-md transition-colors"
            >
              {copiadoConvertido ? (
                <Check className="w-4 h-4 text-green-500" />
              ) : (
                <Copy className="w-4 h-4 text-slate-400" />
              )}
            </button>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-600">
          <div className="flex justify-between items-center text-sm">
            <span className="text-slate-400">
              Valor {resultado.tipoIndicador} ({format(new Date(), "dd 'de' MMMM", { locale: es })}):
            </span>
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