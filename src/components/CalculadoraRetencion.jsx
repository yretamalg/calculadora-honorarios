import React, { useState, useEffect } from 'react';
import { FormularioIngreso } from '../components/FormularioIngreso';
import { BotonesControl } from '../components/BotonesControl';
import { ResultadosCalculo } from '../components/ResultadosCalculo';
import { Footer } from '../components/Footer';
import SEO from '../components/SEO';

export const CalculadoraRetencion = () => {
  // (Previous code remains the same)
  // ... (keep all the existing state and logic)

  return (
    <div className="flex flex-col min-h-screen">
      <SEO 
        title="Calculadora de Retención de Honorarios - VBox Pro" 
        description="Calcula fácilmente tu retención de honorarios para profesionales en Chile. Conoce tu monto bruto, líquido y retención según las tasas vigentes."
        keywords="retención de honorarios, calculadora tributaria, impuestos chile, boleta de honorarios, sii chile"
        canonical="https://www.vbox.pro"
      />
      <div className="flex-grow container max-w-2xl mx-auto p-6 bg-slate-800 rounded-lg shadow-xl">
        <h1 className="text-slate-300 text-2xl font-bold text-center mb-6">
          Calculadora de Retención de Honorarios
        </h1>
        <div className="space-y-6">
          {/* (Rest of the existing component remains the same) */}
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