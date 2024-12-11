import React, { useState } from 'react';
import FormulaDisplay from './FormulaDisplay';
import BaseCalculatorForm from './BaseCalculatorForm';
import { formatChileanNumber, parseChileanNumber } from '../utils/calculatorUtils';
import AutoSizingInput from '@/shared/ui/AutoSizingInput';

const Calculator6Form = ({ formData, setFormData }) => {
  const [result, setResult] = useState(null);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      calculator6: {
        ...prev.calculator6,
        [field]: value
      }
    }));
    setResult(null);
  };

  const handleClear = () => {
    setFormData(prev => ({
      ...prev,
      calculator6: {
        initialPrice: '',
        increase: ''
      }
    }));
    setResult(null);
  };

  const handleCalculate = () => {
    const { initialPrice, increase } = formData.calculator6;
    const priceValue = parseChileanNumber(initialPrice);
    const increaseValue = parseChileanNumber(increase);

    const increaseAmount = (priceValue * increaseValue) / 100;
    const calculatedResult = priceValue + increaseAmount;
    const formattedResult = formatChileanNumber(calculatedResult);
    setResult(formattedResult);
    return formattedResult;
  };

  return (
    <BaseCalculatorForm
      title="Calcular el precio final con aumento"
      onCalculate={handleCalculate}
      onClear={handleClear}
    >
      {(showResults) => (
        <>
          <div className="flex flex-wrap md:flex-nowrap items-center gap-3 text-slate-300">
            <span>Si el precio es $</span>
            <input
              type="text"
              value={formData.calculator6.initialPrice}
              onChange={(e) => handleInputChange('initialPrice', e.target.value)}
              className="w-24 bg-slate-700 border border-slate-600 rounded-md py-2 px-3 text-center text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              placeholder="0"
            />
            <span>con</span>
            <input
              type="text"
              value={formData.calculator6.increase}
              onChange={(e) => handleInputChange('increase', e.target.value)}
              className="w-24 bg-slate-700 border border-slate-600 rounded-md py-2 px-3 text-center text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              placeholder="0"
            />
            <span>% de aumento el valor sería</span>
            {showResults && result && (
              <span className="bg-slate-700 text-orange-400 px-3 py-2 rounded-md font-bold">
                {result}
              </span>
            )}
          </div>
          {showResults && result && (
            <FormulaDisplay
              activeCalculator={6}
              data={formData.calculator6}
              result={result}
            />
          )}
        </>
      )}
    </BaseCalculatorForm>
  );
};

export default Calculator6Form;