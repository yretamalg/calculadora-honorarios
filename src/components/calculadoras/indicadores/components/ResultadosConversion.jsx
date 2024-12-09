import React, { useState } from 'react';
import { Copy, Check, Download } from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { formatCurrency } from '@/core/formatters/formatters';
import { formatearMonto, parsearMonto, formatearNumero } from '@/core/formatters/formatters';
import generarPDFIndicadores from '@/core/pdf/generators/indicadoresPDF';

const ResultadosConversion = ({ resultado }) => {
  const [copiadoOriginal, setCopiadoOriginal] = useState(false);
  const [copiadoConvertido, setCopiadoConvertido] = useState(false);
  const [exportando, setExportando] = useState(false);

  const formatearResultado = (valor, tipo, esDestino = false) => {
    if (!resultado) return formatCurrency.CLP(0);

    // Si es conversión a pesos (desde cualquier indicador a CLP)
    if (esDestino && resultado.direccion === 'to_clp') {
      return formatCurrency.CLP(valor);
    }

    // Si es conversión desde pesos (origen en CLP)
    if (!esDestino && resultado.direccion === 'from_clp') {
      return formatCurrency.CLP(valor);
    }

    // Para otros casos según el tipo
    switch (tipo) {
      case 'UF':
        return `UF ${formatearNumero(valor, true)}`; // Con decimales
      case 'UTM':
        return `UTM ${formatearNumero(valor, true)}`; // Con decimales
      case 'DOLAR':
        return formatCurrency.USD(valor);
      case 'EURO':
        return formatCurrency.EUR(valor);
      default:
        return formatCurrency.CLP(valor);
    }
  };

  const copiarAlPortapapeles = async (valor, tipo) => {
    try {
      const valorFormateado = formatearResultado(valor, tipo);
      await navigator.clipboard.writeText(valorFormateado);
      if (tipo === 'original') {
        setCopiadoOriginal(true);
        setTimeout(() => setCopiadoOriginal(false), 2000);
      } else {
        setCopiadoConvertido(true);
        setTimeout(() => setCopiadoConvertido(false), 2000);
      }
    } catch (err) {
      console.error('Error al copiar:', err);
    }
  };

  const exportarPDF = async () => {
    try {
      setExportando(true);
      await generarPDFIndicadores(resultado);
    } catch (error) {
      console.error('Error al exportar PDF:', error);
    } finally {
      setExportando(false);
    }
  };

  const getLabelOrigen = () => {
    if (!resultado) return 'Valor Original:';
    return resultado.direccion === 'to_clp' 
      ? `Valor en ${resultado.tipoIndicador}:` 
      : 'Valor en Pesos:';
  };

  const getLabelDestino = () => {
    if (!resultado) return 'Valor Convertido:';
    return resultado.direccion === 'to_clp'
      ? 'Valor en Pesos:'
      : `Valor en ${resultado.tipoIndicador}:`;
  };

  return (
    <div className="bg-slate-700 rounded-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium text-slate-300">Resultado</h2>
        <button
          onClick={exportarPDF}
          disabled={exportando}
          className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium 
                   text-white bg-orange-700 rounded-md hover:bg-orange-600 
                   transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Download className="w-4 h-4" />
          {exportando ? 'Exportando...' : 'Exportar PDF'}
        </button>
      </div>

      <div className="space-y-4">
        {/* Valor Original */}
        <div className="flex justify-between items-center">
          <span className="text-slate-400">{getLabelOrigen()}</span>
          <div className="flex items-center gap-3">
            <span className="text-xl font-semibold text-white">
              {formatearResultado(
                resultado?.montoOriginal,
                resultado?.tipoIndicador,
                false
              )}
            </span>
            <button
              onClick={() => copiarAlPortapapeles(resultado?.montoOriginal, 'original')}
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

        {/* Valor Convertido */}
        <div className="flex justify-between items-center">
          <span className="text-slate-400">{getLabelDestino()}</span>
          <div className="flex items-center gap-3">
            <span className="text-2xl font-bold text-orange-500">
              {formatearResultado(
                resultado?.montoConvertido,
                resultado?.tipoIndicador,
                true
              )}
            </span>
            <button
              onClick={() => copiarAlPortapapeles(resultado?.montoConvertido, 'convertido')}
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

        {/* Valor del Indicador */}
        <div className="pt-4 border-t border-slate-600">
          <div className="flex justify-between items-center text-sm">
            <span className="text-slate-400">
              Valor {resultado?.tipoIndicador || 'Indicador'} ({format(new Date(), "dd 'de' MMMM", { locale: es })}):
            </span>
            <span className="text-slate-300">
              {formatearResultado(resultado?.valorIndicador, resultado?.tipoIndicador)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultadosConversion;