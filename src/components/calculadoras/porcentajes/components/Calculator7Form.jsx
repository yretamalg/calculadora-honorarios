import React, { useState } from 'react';
import FormulaDisplay from './FormulaDisplay';
import BaseCalculatorForm from './BaseCalculatorForm';
import { formatChileanNumber, parseChileanNumber } from '../utils/calculatorUtils';
import BotonExportarPorcentajes from './BotonExportarPorcentajes';

const Calculator7Form = ({ formData, setFormData }) => {
  const [result, setResult] = useState(null);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      calculator7: {
        ...prev.calculator7,
        [field]: value
      }
    }));
    setResult(null);
  };

  const handleClear = () => {
    setFormData(prev => ({
      ...prev,
      calculator7: {
        initialValue: '',
        finalValue: ''
      }
    }));
    setResult(null);
  };

  const handleCalculate = () => {
    const { initialValue, finalValue } = formData.calculator7;
    const initialNum = parseChileanNumber(initialValue);
    const finalNum = parseChileanNumber(finalValue);
    
    if (initialNum === 0) return '0';

    const calculatedResult = ((finalNum - initialNum) / initialNum) * 100;
    const formattedResult = formatChileanNumber(calculatedResult);
    setResult(formattedResult);
    return formattedResult;
  };

  const getVariacionAbsoluta = () => {
    const initialNum = parseChileanNumber(formData.calculator7.initialValue);
    const finalNum = parseChileanNumber(formData.calculator7.finalValue);
    return finalNum - initialNum;
  };

  return (
    <BaseCalculatorForm
      title="Calcular el porcentaje de variación"
      onCalculate={handleCalculate}
      onClear={handleClear}
    >
      {(showResults) => (
        <>
          <div className="flex flex-wrap md:flex-nowrap items-center gap-3 text-slate-300">
            <span>Si el valor inicial es</span>
            <input
              type="text"
              value={formData.calculator7.initialValue}
              onChange={(e) => handleInputChange('initialValue', e.target.value)}
              className="w-24 bg-slate-700 border border-slate-600 rounded-md py-2 px-3 text-center text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              placeholder="0"
            />
            <span>y el valor final es</span>
            <input
              type="text"
              value={formData.calculator7.finalValue}
              onChange={(e) => handleInputChange('finalValue', e.target.value)}
              className="w-24 bg-slate-700 border border-slate-600 rounded-md py-2 px-3 text-center text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              placeholder="0"
            />
            <span>la variación es del</span>
            {showResults && result && (
              <span className="bg-slate-700 text-orange-400 px-3 py-2 rounded-md font-bold">
                {result}%
              </span>
            )}
          </div>

          {showResults && result && (
            <>
              <FormulaDisplay
                activeCalculator={7}
                data={formData.calculator7}
                result={result}
              />
              <div className="mt-6 flex justify-center">
                <BotonExportarPorcentajes 
                  datos={{
                    titulo: "Calcular porcentaje de variación",
                    valorInicial: parseChileanNumber(formData.calculator7.initialValue),
                    valorFinal: parseChileanNumber(formData.calculator7.finalValue),
                    variacionAbsoluta: getVariacionAbsoluta(),
                    resultado: parseChileanNumber(result),
                    tipo: 7
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

export default Calculator7Form;