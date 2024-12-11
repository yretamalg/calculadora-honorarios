import React, { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import honorariosFormat from '../utils/honorariosFormat';
import { TASAS_RETENCION } from '@/config/config';
import BotonExportarHonorarios from './BotonExportarHonorarios';

const CopyButton = ({ valor, tipo, copiadoActual, onCopy }) => (
  <button
    onClick={() => onCopy(valor, tipo)}
    className="text-slate-400 hover:text-slate-300 transition-colors p-1"
    title="Copiar valor"
  >
    {copiadoActual === tipo ? (
      <Check className="w-4 h-4 text-green-400" />
    ) : (
      <Copy className="w-4 h-4" />
    )}
  </button>
);

const ResultadosCalculo = ({ resultados, tasaRetencion }) => {
  const [copiado, setCopiado] = useState('');
  const tasaActual = TASAS_RETENCION.find(t => t.valor.toString() === tasaRetencion);
  const añoRetencion = tasaActual?.año || '2024';

  const copiarAlPortapapeles = async (valor, tipo) => {
    try {
      const valorFormateado = honorariosFormat.formatearMonto(valor).replace(/\s/g, '');
      await navigator.clipboard.writeText(valorFormateado);
      setCopiado(tipo);
      setTimeout(() => setCopiado(''), 2000);
    } catch (error) {
      console.error('Error al copiar:', error);
    }
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
          <p className="text-slate-300 text-sm leading-none">
            Este es el monto por el cual debes hacer tu boleta:
          </p>
          <div className="flex items-center gap-2">
            <p className="text-slate-100 text-2xl font-bold leading-none">
              {honorariosFormat.formatearMonto(resultados.desdeValoresLiquidos.bruto)}
            </p>
            <CopyButton 
              valor={resultados.desdeValoresLiquidos.bruto} 
              tipo="brutoLiquido"
              copiadoActual={copiado}
              onCopy={copiarAlPortapapeles}
            />
          </div>
        </div>
        <div className="flex justify-between items-center border-t border-slate-700 pt-4 mt-4">
          <p className="text-slate-300 text-sm leading-none">
            La retención del {tasaRetencion}% corresponde al año {añoRetencion} es de:
          </p>
          <div className="flex items-center gap-2">
            <p className="text-red-400 text-2xl font-bold leading-none">
              {honorariosFormat.formatearMonto(resultados.desdeValoresLiquidos.retencion)}
            </p>
            <CopyButton 
              valor={resultados.desdeValoresLiquidos.retencion}
              tipo="retencionLiquido"
              copiadoActual={copiado}
              onCopy={copiarAlPortapapeles}
            />
          </div>
        </div>
        <div className="flex justify-between items-center border-t border-slate-700 pt-4 mt-4">
          <p className="text-slate-300 text-sm leading-none">Recibirás un monto líquido a tu cuenta:</p>
          <div className="flex items-center gap-2">
            <p className="text-green-400 text-4xl font-bold leading-none">
              {honorariosFormat.formatearMonto(resultados.desdeValoresLiquidos.liquido)}
            </p>
            <CopyButton 
              valor={resultados.desdeValoresLiquidos.liquido}
              tipo="liquidoLiquido"
              copiadoActual={copiado}
              onCopy={copiarAlPortapapeles}
            />
          </div>
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
          <p className="text-slate-300 text-sm leading-none">
            Este es el monto por el cual debes hacer tu boleta:
          </p>
          <div className="flex items-center gap-2">
            <p className="text-slate-100 text-2xl font-bold leading-none">
              {honorariosFormat.formatearMonto(resultados.desdeValoresBrutos.bruto)}
            </p>
            <CopyButton 
              valor={resultados.desdeValoresBrutos.bruto}
              tipo="brutoBruto"
              copiadoActual={copiado}
              onCopy={copiarAlPortapapeles}
            />
          </div>
        </div>
        <div className="flex justify-between items-center border-t border-slate-700 pt-4 mt-4">
          <p className="text-slate-300 text-sm leading-none">
            La retención del {tasaRetencion}% corresponde al año {añoRetencion} es de:
          </p>
          <div className="flex items-center gap-2">
            <p className="text-red-400 text-2xl font-bold leading-none">
              {honorariosFormat.formatearMonto(resultados.desdeValoresBrutos.retencion)}
            </p>
            <CopyButton 
              valor={resultados.desdeValoresBrutos.retencion}
              tipo="retencionBruto"
              copiadoActual={copiado}
              onCopy={copiarAlPortapapeles}
            />
          </div>
        </div>
        <div className="flex justify-between items-center border-t border-slate-700 pt-4 mt-4">
          <p className="text-slate-300 text-sm leading-none">Recibirás un monto líquido a tu cuenta:</p>
          <div className="flex items-center gap-2">
            <p className="text-green-400 text-4xl font-bold leading-none">
              {honorariosFormat.formatearMonto(resultados.desdeValoresBrutos.liquido)}
            </p>
            <CopyButton 
              valor={resultados.desdeValoresBrutos.liquido}
              tipo="liquidoBruto"
              copiadoActual={copiado}
              onCopy={copiarAlPortapapeles}
            />
          </div>
        </div>
      </div>

      {/* Botón Exportar PDF */}
      <div className="mt-6 flex justify-center">
        <BotonExportarHonorarios 
          resultados={resultados}
          tasaRetencion={tasaRetencion}
          añoRetencion={añoRetencion}
        />
      </div>
    </div>
  );
};

export default ResultadosCalculo;