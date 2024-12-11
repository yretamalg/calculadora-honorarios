import React, { useState } from 'react';
import NavigationMenu from '@/layouts/components/NavigationMenu';
import ShareButtons from '@/layouts/components/ShareButtons';
import CalculatorGrid from './components/CalculatorGrid';
import {
  Calculator1Form,
  Calculator2Form,
  Calculator3Form,
  Calculator4Form,
  Calculator5Form,
  Calculator6Form,
  Calculator7Form
} from './components';
import { calculatorDescriptions } from './config/calculatorConfig';

const initialFormData = {
  calculator1: { percentage: '', amount: '' },
  calculator2: { percentage: '', knownAmount: '' },
  calculator3: { knownPercentage: '', knownValue: '', targetPercentage: '' },
  calculator4: { total: '', amount: '' },
  calculator5: { initialPrice: '', discount: '' },
  calculator6: { initialPrice: '', increase: '' },
  calculator7: { initialValue: '', finalValue: '' }
};

const CalculadoraPorcentajes = () => {
  const [activeCalculator, setActiveCalculator] = useState(1);
  const [formData, setFormData] = useState(initialFormData);
  const [resultado, setResultado] = useState(null);

  const getCurrentCalculator = () => {
    const props = {
      formData,
      setFormData,
      resultado,
      setResultado
    };

    switch (activeCalculator) {
      case 1: return <Calculator1Form {...props} />;
      case 2: return <Calculator2Form {...props} />;
      case 3: return <Calculator3Form {...props} />;
      case 4: return <Calculator4Form {...props} />;
      case 5: return <Calculator5Form {...props} />;
      case 6: return <Calculator6Form {...props} />;
      case 7: return <Calculator7Form {...props} />;
      default: return null;
    }
  };

  // Verifica si hay datos ingresados en el calculador activo
  const hayDatosIngresados = () => {
    const data = formData[`calculator${activeCalculator}`];
    return Object.values(data).some(value => value !== '');
  };

  return (
    <div className="flex flex-col min-h-screen">
      <NavigationMenu />
      <div className="flex-grow container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-slate-800 rounded-lg shadow-xl p-6 mb-6">
            <h1 className="text-slate-300 text-2xl font-bold text-center mb-1">
              Calculadora de Porcentajes
            </h1>
            <p className="text-slate-300 text-xs font-bold text-center mb-6">
              Selecciona la calculadora, según el problema que desees resolver.
            </p>
            <CalculatorGrid 
              activeCalculator={activeCalculator}
              setActiveCalculator={setActiveCalculator}
            />

            <div className="bg-slate-700 p-6 rounded-lg">
              <h2 className="text-lg font-semibold text-slate-300 mb-4">
                {calculatorDescriptions[activeCalculator]?.title || 'Calculadora'}
              </h2>
              {getCurrentCalculator()}
            </div>
          </div>
          
          <div className="mb-6">
            <ShareButtons />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalculadoraPorcentajes;