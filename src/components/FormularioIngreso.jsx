// components/CalculadoraRetencion.jsx
import React, { useState } from 'react';
import { FormularioIngreso } from './FormularioIngreso';
import { BotonesControl } from './BotonesControl';
import { ResultadosCalculo } from './ResultadosCalculo';
import { Footer } from './Footer';

export const CalculadoraRetencion = () => {
  // Definir las tasas de retención como constante para consistencia
  const tasasRetencion = [
    { valor: '13.75', etiqueta: '13,75% (año 2024)', año: 2024 },
    { valor: '14.50', etiqueta: '14,50% (año 2025)', año: 2025 },
    { valor: '15.25', etiqueta: '15,25% (año 2026)', año: 2026 },
    { valor: '16.00', etiqueta: '16,00% (año 2027)', año: 2027 },
    { valor: '17.00', etiqueta: '17,00% (año 2028)', año: 2028 }
  ];

  const [monto, setMonto] = useState('');
  const [tasaRetencion, setTasaRetencion] = useState(tasasRetencion[0].valor);
  const [resultados, setResultados] = useState({
    bruto: 0,
    retencion: 0,
    liquido: 0
  });

  const calcular = () => {
    const montoNumerico = parseFloat(monto.replace(/\D/g, ''));
    if (!montoNumerico || isNaN(montoNumerico)) return;

    const tasa = parseFloat(tasaRetencion) / 100;
    
    // Calcular monto bruto usando la fórmula inversa
    const montoBruto = montoNumerico / (1 - tasa);
    const retencion = montoBruto * tasa;

    setResultados({
      bruto: montoBruto,        // Monto total de la boleta
      retencion: retencion,     // Monto de la retención
      liquido: montoNumerico    // Monto líquido recibido
    });
  };

  const limpiar = () => {
    setMonto('');
    setTasaRetencion(tasasRetencion[0].valor);
    setResultados({
      bruto: 0,
      retencion: 0,
      liquido: 0
    });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow container max-w-2xl mx-auto p-6 bg-slate-800 rounded-lg shadow-xl">
        <h1 className="text-slate-300 text-2xl font-bold text-center mb-6">
          Calculadora de Retención de Honorarios
        </h1>
        <div className="space-y-6">
          <FormularioIngreso
            monto={monto}
            tasaRetencion={tasaRetencion}
            onMontoChange={setMonto}
            onTasaChange={setTasaRetencion}
          />
          <BotonesControl
            onCalcular={calcular}
            onLimpiar={limpiar}
          />
          <ResultadosCalculo
            resultados={resultados}
            tasaRetencion={tasaRetencion}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CalculadoraRetencion;