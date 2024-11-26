import React from 'react';

export const ResultadosCalculo = ({ resultados, tasaRetencion }) => {
  const formatearNumero = (numero) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP'
    }).format(numero);
  };

  // Mapeo de tasas de retención a años
  const tasasRetencion = [
    { valor: '13.75', etiqueta: '13,75% (año 2024)' },
    { valor: '14.50', etiqueta: '14,50% (año 2025)' },
    { valor: '15.25', etiqueta: '15,25% (año 2026)' },
    { valor: '16.00', etiqueta: '16,00% (año 2027)' },
    { valor: '17.00', etiqueta: '17,00% (año 2028)' }
  ];

  const añoRetencion = tasasRetencion.find(tasa => tasa.valor === tasaRetencion)?.etiqueta.match(/\d{4}/)[0];

  const calcularMontoBruto = () => {
    const tasa = parseFloat(tasaRetencion) / 100;
    return resultados.liquido / (1 - tasa);
  };

  const montoBrutoCalculado = calcularMontoBruto();
  const montoNumerico = parseFloat(resultados.liquido);
  const retencionEnBruto = montoNumerico * (parseFloat(tasaRetencion) / 100);

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
          <p className="text-slate-100 text-2xl font-bold leading-none">{formatearNumero(montoBrutoCalculado)}</p>
        </div>
        <div className="flex justify-between items-center border-t border-slate-700 pt-4 mt-4">
          <p className="text-slate-300 text-sm leading-none">
            La retención del {tasaRetencion}% corresponde al año {añoRetencion} es de:
          </p>
          <p className="text-red-400 text-2xl font-bold leading-none">
            {formatearNumero(montoBrutoCalculado - resultados.liquido)}
          </p>
        </div>
        <div className="flex justify-between items-center border-t border-slate-700 pt-4 mt-4 leading-none">
          <p className="text-slate-300 text-sm leading-none">Recibirás un monto líquido a tu cuenta:</p>
          <p className="text-green-400 text-4xl font-bold leading-none">
            {formatearNumero(resultados.liquido)}
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
          <p className="text-slate-100 text-2xl font-bold leading-none">{formatearNumero(montoNumerico)}</p>
        </div>
        <div className="flex justify-between items-center border-t border-slate-700 pt-4 mt-4">
          <p className="text-slate-300 text-sm leading-none">
            La retención del {tasaRetencion}% corresponde al año {añoRetencion} es de:
          </p>
          <p className="text-red-400 text-2xl font-bold leading-none">
            {formatearNumero(retencionEnBruto)}
          </p>
        </div>
        <div className="flex justify-between items-center border-t border-slate-700 pt-4 mt-4">
          <p className="text-slate-300 text-sm leading-none">Recibirás un monto líquido a tu cuenta:</p>
          <p className="text-green-400 text-4xl font-bold leading-none">
            {formatearNumero(montoNumerico - retencionEnBruto)}
          </p>
        </div>
      </div>
    </div>
  );
};