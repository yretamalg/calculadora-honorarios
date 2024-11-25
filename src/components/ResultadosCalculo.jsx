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

  return (
    <div className="space-y-4 bg-slate-800 p-6 rounded-lg ">
      <div className="flex justify-between items-center border-b border-slate-700 pb-4">
        <p className="text-slate-300 text-sm">Este es el monto por el cual debes hacer tu boleta:</p>
        <p className="text-slate-100 text-2xl font-bold">{formatearNumero(montoBrutoCalculado)}</p>
      </div>
      <div className="flex justify-between items-center border-b border-slate-700 pb-4">
        <p className="text-slate-300 text-sm">
          La retención del {tasaRetencion}% corresponde al año {añoRetencion} es de:
        </p>
        <p className="text-red-400 text-2xl font-bold">
          {formatearNumero(montoBrutoCalculado - resultados.liquido)}
        </p>
      </div>
      <div className="flex justify-between items-center">
        <p className="text-slate-300 text-sm">Recibirás un monto líquido a tu cuenta:</p>
        <p className="text-green-400 text-4xl font-bold">
          {formatearNumero(resultados.liquido)}
        </p>
      </div>
    </div>
  );
};