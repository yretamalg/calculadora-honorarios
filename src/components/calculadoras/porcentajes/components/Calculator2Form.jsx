import React, { useState } from 'react';
import FormulaDisplay from './FormulaDisplay';
import BaseCalculatorForm from './BaseCalculatorForm';
import { formatChileanNumber, parseChileanNumber } from '../utils/calculatorUtils';

const Calculator2Form = ({ formData, setFormData }) => {
  const [result, setResult] = useState(null);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      calculator2: {
        ...prev.calculator2,
        [field]: value
      }
    }));
    setResult(null);
  };

  const handleClear = () => {
    setFormData(prev => ({
      ...prev,
      calculator2: {
        percentage: '',
        knownAmount: ''
      }
    }));
    setResult(null);
  };

  const handleCalculate = () => {
    const { percentage, knownAmount } = formData.calculator2;
    const percentageNum = parseChileanNumber(percentage);
    if (percentageNum === 0) return '0';
    
    const calculatedResult = (parseChileanNumber(knownAmount) * 100) / percentageNum;
    const formattedResult = formatChileanNumber(calculatedResult);
    setResult(formattedResult);
    return formattedResult;
  };

  return (
    <BaseCalculatorForm
      title="Encontrar el total conociendo un porcentaje"
      onCalculate={handleCalculate}
      onClear={handleClear}
    >
      {(showResults) => (
        <>
          <div className="flex flex-wrap md:flex-nowrap items-center gap-3 text-slate-300">
            <span>Si el</span>
            <input
              type="text"
              value={formData.calculator2.percentage}
              onChange={(e) => handleInputChange('percentage', e.target.value)}
              className="w-24 bg-slate-700 border border-slate-600 rounded-md py-2 px-3 text-center text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              placeholder="0"
            />
            <span>% es</span>
            <input
              type="text"
              value={formData.calculator2.knownAmount}
              onChange={(e) => handleInputChange('knownAmount', e.target.value)}
              className="w-24 bg-slate-700 border border-slate-600 rounded-md py-2 px-3 text-center text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              placeholder="0"
            />
            <span>entonces el total es</span>
            {showResults && result && (
              <span className="bg-slate-700 text-orange-400 px-3 py-2 rounded-md font-bold">
                {result}
              </span>
            )}
          </div>
          {showResults && result && (
            <FormulaDisplay
              activeCalculator={2}
              data={formData.calculator2}
              result={result}
              calculatorType="calculator2"
            />
          )}
        </>
      )}
    </BaseCalculatorForm>
  );
};

export default Calculator2Form;