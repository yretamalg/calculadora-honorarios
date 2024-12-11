import React, { useState } from 'react';
import FormulaDisplay from './FormulaDisplay';
import BaseCalculatorForm from './BaseCalculatorForm';
import { formatChileanNumber, parseChileanNumber } from '../utils/calculatorUtils';
import BotonExportarPorcentajes from './BotonExportarPorcentajes';

const Calculator3Form = ({ formData = { calculator3: {} }, setFormData }) => {
  const [result, setResult] = useState(null);
  const { knownPercentage = '', knownValue = '', targetPercentage = '' } = formData.calculator3;

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      calculator3: {
        ...prev.calculator3,
        [field]: value
      }
    }));
    setResult(null);
  };

  const handleClear = () => {
    setFormData(prev => ({
      ...prev,
      calculator3: {
        knownPercentage: '',
        knownValue: '',
        targetPercentage: ''
      }
    }));
    setResult(null);
  };

  const handleCalculate = () => {
    const knownPerc = parseChileanNumber(knownPercentage);
    const knownVal = parseChileanNumber(knownValue);
    const targetPerc = parseChileanNumber(targetPercentage);
    
    if (!knownPerc) return '0';
    
    const calculatedResult = (knownVal * targetPerc) / knownPerc;
    const formattedResult = formatChileanNumber(calculatedResult);
    setResult(formattedResult);
    return formattedResult;
  };

  return (
    <BaseCalculatorForm
      title="Si el X% es Y, ¿cuánto es el Z%?"
      onCalculate={handleCalculate}
      onClear={handleClear}
    >
      {(showResults) => (
        <>
          <div className="flex flex-wrap md:flex-nowrap items-center gap-3 text-slate-300">
            <span>Si el</span>
            <input
              type="text"
              value={knownPercentage}
              onChange={(e) => handleInputChange('knownPercentage', e.target.value)}
              className="w-24 bg-slate-700 border border-slate-600 rounded-md py-2 px-3 text-center text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              placeholder="0"
            />
            <span>% es</span>
            <input
              type="text"
              value={knownValue}
              onChange={(e) => handleInputChange('knownValue', e.target.value)}
              className="w-24 bg-slate-700 border border-slate-600 rounded-md py-2 px-3 text-center text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              placeholder="0"
            />
            <span>entonces el</span>
            <input
              type="text"
              value={targetPercentage}
              onChange={(e) => handleInputChange('targetPercentage', e.target.value)}
              className="w-24 bg-slate-700 border border-slate-600 rounded-md py-2 px-3 text-center text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              placeholder="0"
            />
            <span>% es</span>
            {showResults && result && (
              <span className="bg-slate-700 text-orange-400 px-3 py-2 rounded-md font-bold min-w-[100px] text-center">
                {result}
              </span>
            )}
          </div>

          {showResults && result && (
            <>
              <FormulaDisplay
                activeCalculator={3}
                data={formData.calculator3}
                result={result}
              />
              <div className="mt-6 flex justify-center">
              <BotonExportarPorcentajes 
                datos={{
                  titulo: "Porcentaje entre números",
                  porcentajeConocido: parseChileanNumber(formData.calculator3.knownPercentage),
                  valorConocido: parseChileanNumber(formData.calculator3.knownValue),
                  porcentajeObjetivo: parseChileanNumber(formData.calculator3.targetPercentage),
                  resultado: parseChileanNumber(result),
                  tipo: 3
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

export default Calculator3Form;