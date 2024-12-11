import React, { useState } from 'react';
import FormulaDisplay from './FormulaDisplay';
import BaseCalculatorForm from './BaseCalculatorForm';
import { formatChileanNumber, parseChileanNumber } from '../utils/calculatorUtils';
import AutoSizingInput from '@/shared/ui/AutoSizingInput';

const Calculator4Form = ({ formData, setFormData }) => {
  const [result, setResult] = useState(null);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      calculator4: {
        ...prev.calculator4,
        [field]: value
      }
    }));
    setResult(null);
  };

  const handleClear = () => {
    setFormData(prev => ({
      ...prev,
      calculator4: {
        amount: '',
        total: ''
      }
    }));
    setResult(null);
  };

  const handleCalculate = () => {
    const { amount, total } = formData.calculator4;
    const amountValue = parseChileanNumber(amount);
    const totalValue = parseChileanNumber(total);
    if (!totalValue) return '0';

    const calculatedResult = (amountValue / totalValue) * 100;
    const formattedResult = formatChileanNumber(calculatedResult);
    setResult(formattedResult);
    return formattedResult;
  };

  return (
    <BaseCalculatorForm
      title="Si el Total es [200], entonces [40] es el 20%"
      onCalculate={handleCalculate}
      onClear={handleClear}
    >
      {(showResults) => (
        <>
          <div className="flex flex-wrap md:flex-nowrap items-center gap-3 text-slate-300">
            <span>Si el Total es</span>
            <input
              type="text"
              value={formData.calculator4.total}
              onChange={(e) => handleInputChange('total', e.target.value)}
              className="w-24 bg-slate-700 border border-slate-600 rounded-md py-2 px-3 text-center text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              placeholder="0"
            />
            <span>entonces</span>
            <input
              type="text"
              value={formData.calculator4.amount}
              onChange={(e) => handleInputChange('amount', e.target.value)}
              className="w-24 bg-slate-700 border border-slate-600 rounded-md py-2 px-3 text-center text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              placeholder="0"
            />
            <span>es el</span>
            {showResults && result && (
              <span className="bg-slate-700 text-orange-400 px-3 py-2 rounded-md font-bold">
                {result}%
              </span>
            )}
          </div>
          {showResults && result && (
            <FormulaDisplay
              activeCalculator={4}
              data={formData.calculator4}
              result={result}
            />
          )}
        </>
      )}
    </BaseCalculatorForm>
  );
};

export default Calculator4Form;