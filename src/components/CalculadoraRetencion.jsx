import React, { useState } from 'react';
import FormularioIngreso from './FormularioIngreso';
import BotonesControl from './BotonesControl';
import ResultadosCalculo from './ResultadosCalculo';
import Footer from './Footer';
import { TASAS_RETENCION, parsearMonto } from '../constants/config';

const CalculadoraRetencion = () => {
  const [monto, setMonto] = useState('');
  const [tasaRetencion, setTasaRetencion] = useState(TASAS_RETENCION[0].valor.toString());
  const [resultados, setResultados] = useState({
    bruto: 0,
    retencion: 0,
    liquido: 0
  });

  const calcular = () => {
    const montoNumerico = parsearMonto(monto);
    if (!montoNumerico) return;

    const tasa = parseFloat(tasaRetencion) / 100;
    const montoBruto = montoNumerico / (1 - tasa);
    const retencion = montoBruto * tasa;

    setResultados({
      bruto: montoBruto,
      retencion: retencion,
      liquido: montoNumerico
    });
  };

  const limpiar = () => {
    setMonto('');
    setTasaRetencion(TASAS_RETENCION[0].valor.toString());
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
            tasasRetencion={TASAS_RETENCION.map(t => ({
              valor: t.valor.toString(),
              etiqueta: t.etiqueta
            }))}
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