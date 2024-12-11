import React, { useState } from 'react';
import FormulaDisplay from './FormulaDisplay';
import BaseCalculatorForm from './BaseCalculatorForm';
import { formatChileanNumber, parseChileanNumber } from '../utils/calculatorUtils';
import BotonExportarPorcentajes from './BotonExportarPorcentajes';

const Calculator1Form = ({ formData, setFormData }) => {
  const [result, setResult] = useState(null);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      calculator1: {
        ...prev.calculator1,
        [field]: value
      }
    }));
    setResult(null);
  };

  const handleClear = () => {
    setFormData(prev => ({
      ...prev,
      calculator1: {
        percentage: '',
        amount: ''
      }
    }));
    setResult(null);
  };

  const handleCalculate = () => {
    const { percentage, amount } = formData.calculator1;
    const percentageValue = parseChileanNumber(percentage);
    const amountValue = parseChileanNumber(amount);
    
    const calculatedResult = (percentageValue * amountValue) / 100;
    const formattedResult = formatChileanNumber(calculatedResult);
    setResult(formattedResult);
    return formattedResult;
  };

  return (
    <BaseCalculatorForm
      title="Calcular el porcentaje de una cantidad"
      onCalculate={handleCalculate}
      onClear={handleClear}
    >
      {(showResults) => (
        <>
          <div className="flex flex-wrap md:flex-nowrap items-center gap-3 text-slate-300">
            <span>El</span>
            <input
              type="text"
              value={formData.calculator1.percentage}
              onChange={(e) => handleInputChange('percentage', e.target.value)}
              className="w-24 bg-slate-700 border border-slate-600 rounded-md py-2 px-3 text-center text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              placeholder="0"
            />
            <span>% de</span>
            <input
              type="text"
              value={formData.calculator1.amount}
              onChange={(e) => handleInputChange('amount', e.target.value)}
              className="w-24 bg-slate-700 border border-slate-600 rounded-md py-2 px-3 text-center text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              placeholder="0"
            />
            <span>es</span>
            {showResults && result && (
              <span className="bg-slate-700 text-orange-400 px-3 py-2 rounded-md font-bold">
                {result}
              </span>
            )}
          </div>

          {showResults && result && (
            <>
              <FormulaDisplay
                activeCalculator={1}
                data={formData.calculator1}
                result={result}
                calculatorType="calculator1"
              />
              
              <div className="mt-6 flex justify-center">
              <BotonExportarPorcentajes 
                  datos={{
                    titulo: "Calcular Porcentaje",
                    porcentaje: parseChileanNumber(formData.calculator1.percentage),
                    cantidad: parseChileanNumber(formData.calculator1.amount),
                    resultado: parseChileanNumber(result),
                    tipo: 1  // Este es importante! Faltaba especificar el tipo
                  }}
                />
              </div>
            </>
          )}
        </>
      )}
    </BaseCalculatorForm>
  );
};

export default Calculator1Form;