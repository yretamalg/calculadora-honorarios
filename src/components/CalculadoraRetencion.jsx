import React, { useState } from 'react';
import { FormularioIngreso } from './FormularioIngreso';
import { BotonesControl } from './BotonesControl';
import { ResultadosCalculo } from './ResultadosCalculo';
import { Footer } from './Footer';

export const CalculadoraRetencion = () => {
  // Definir las tasas de retención con factores precisos nuevo calculo
  const tasasRetencion = [
    { 
      año: 2024, 
      tasa: 13.75, 
      factor: 0.8625, 
      etiqueta: '13,75% (año 2024)' 
    },
    { 
      año: 2025, 
      tasa: 14.50, 
      factor: 0.855, 
      etiqueta: '14,50% (año 2025)' 
    },
    { 
      año: 2026, 
      tasa: 15.25, 
      factor: 0.8475, 
      etiqueta: '15,25% (año 2026)' 
    },
    { 
      año: 2027, 
      tasa: 16.00, 
      factor: 0.84, 
      etiqueta: '16,00% (año 2027)' 
    },
    { 
      año: 2028, 
      tasa: 17.00, 
      factor: 0.83, 
      etiqueta: '17,00% (año 2028)' 
    }
  ];

  const [monto, setMonto] = useState('');
  const [tasaSeleccionada, setTasaSeleccionada] = useState(tasasRetencion[0]);
  const [resultados, setResultados] = useState({
    bruto: 0,
    retencion: 0,
    liquido: 0
  });

  const calcular = () => {
    const montoNumerico = parseFloat(monto.replace(/\D/g, ''));
    if (!montoNumerico || isNaN(montoNumerico)) return;

    // Cálculo con el factor específico para el año
    const montoBruto = montoNumerico / tasaSeleccionada.factor;
    const retencion = montoBruto * (tasaSeleccionada.tasa / 100);

    setResultados({
      bruto: montoBruto,
      retencion: retencion,
      liquido: montoNumerico
    });
  };

  const limpiar = () => {
    setMonto('');
    setTasaSeleccionada(tasasRetencion[0]);
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
            tasaRetencion={tasaSeleccionada.tasa.toString()}
            onMontoChange={setMonto}
            onTasaChange={(valor) => {
              const tasaElegida = tasasRetencion.find(t => t.tasa.toString() === valor);
              setTasaSeleccionada(tasaElegida);
            }}
            tasasRetencion={tasasRetencion.map(t => ({
              valor: t.tasa.toString(), 
              etiqueta: t.etiqueta
            }))}
          />
          <BotonesControl
            onCalcular={calcular}
            onLimpiar={limpiar}
          />
          <ResultadosCalculo
            resultados={resultados}
            tasaRetencion={tasaSeleccionada.tasa.toString()}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CalculadoraRetencion;