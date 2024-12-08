import React, { useState, useMemo } from 'react';
import { Copy, Check, Download } from 'lucide-react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import ResultadosPDF from './ResultadosPDF';

const ResultadosConversion = ({ resultado }) => {
  const [copiadoOriginal, setCopiadoOriginal] = useState(false);
  const [copiadoConvertido, setCopiadoConvertido] = useState(false);

  const formatearNumero = (numero, tipo = 'CLP') => {
    if (numero === null || numero === undefined) numero = 0;

    const opciones = {
      maximumFractionDigits: 2,
      minimumFractionDigits: tipo === 'CLP' ? 0 : 2
    };

    if (tipo === 'CLP') {
      return Math.round(numero).toLocaleString('es-CL');
    }

    return new Intl.NumberFormat('es-CL', opciones).format(numero);
  };

  const formatearMoneda = (numero, tipo = 'CLP') => {
    if (numero === null || numero === undefined) numero = 0;
    const formateado = formatearNumero(numero, tipo);

    switch (tipo) {
      case 'CLP':
        return `$ ${formateado}`;
      case 'DOLAR':
        return `US$ ${formateado}`;
      case 'EURO':
        return `€ ${formateado}`;
      case 'UF':
      case 'UTM':
        return formateado;
      default:
        return formateado;
    }
  };

  // Memoizar el documento PDF para evitar re-renders innecesarios
  const PDFDocument = useMemo(() => (
    <ResultadosPDF 
      resultado={resultado}
      formatearMoneda={formatearMoneda}
      formatearNumero={formatearNumero}
    />
  ), [resultado]);

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
    const valor = resultado?.montoOriginal || 0;
    const tipoFormato = resultado?.direccion === 'from_clp' ? 'CLP' : resultado?.tipoIndicador || 'CLP';
    const texto = formatearMoneda(valor, tipoFormato);
    copiarAlPortapapeles(texto, setCopiadoOriginal);
  };

  const handleCopiarConvertido = () => {
    const valor = resultado?.montoConvertido || 0;
    const tipoFormato = resultado?.direccion === 'to_clp' ? 'CLP' : resultado?.tipoIndicador || 'CLP';
    const texto = formatearMoneda(valor, tipoFormato);
    copiarAlPortapapeles(texto, setCopiadoConvertido);
  };

  const getLabelOrigen = () => {
    if (!resultado) return 'Valor Original:';
    if (resultado.direccion === 'to_clp') {
      return `Valor en ${resultado.tipoIndicador}:`;
    }
    return 'Valor en Pesos (CLP):';
  };

  const getLabelDestino = () => {
    if (!resultado) return 'Valor Convertido:';
    if (resultado.direccion === 'to_clp') {
      return 'Valor en Pesos (CLP):';
    }
    return `Valor en ${resultado.tipoIndicador}:`;
  };

  const formatearValorSegunDireccion = (valor, esPrimero) => {
    if (!resultado) return formatearMoneda(0, 'CLP');

    const tipoFormato = esPrimero
      ? (resultado.direccion === 'from_clp' ? 'CLP' : resultado.tipoIndicador)
      : (resultado.direccion === 'to_clp' ? 'CLP' : resultado.tipoIndicador);

    return formatearMoneda(valor, tipoFormato);
  };

  return (
    <div className="bg-slate-700 rounded-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium text-slate-300">Resultado</h2>
        {resultado && (
          <PDFDownloadLink
            document={PDFDocument}
            fileName={`conversion-${resultado?.tipoIndicador?.toLowerCase() || 'default'}-${format(new Date(), 'yyyyMMdd-HHmm')}.pdf`}
            className="flex items-center gap-2 px-3 py-1.5 text-sm bg-orange-600 text-white rounded-md hover:bg-orange-500 transition-colors"
          >
            {({ loading }) => (
              <>
                <Download className="w-4 h-4" />
                <span>{loading ? 'Preparando...' : 'Exportar PDF'}</span>
              </>
            )}
          </PDFDownloadLink>
        )}
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-slate-400">{getLabelOrigen()}</span>
          <div className="flex items-center gap-3">
            <span className="text-xl font-semibold text-white">
              {formatearValorSegunDireccion(resultado?.montoOriginal || 0, true)}
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
              {formatearValorSegunDireccion(resultado?.montoConvertido || 0, false)}
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
              Valor {resultado?.tipoIndicador || 'Indicador'} ({format(new Date(), "dd 'de' MMMM", { locale: es })}):
            </span>
            <span className="text-slate-300">
              {resultado
                ? formatearMoneda(resultado.valorIndicador, resultado.tipoIndicador)
                : formatearMoneda(0, 'CLP')}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultadosConversion;