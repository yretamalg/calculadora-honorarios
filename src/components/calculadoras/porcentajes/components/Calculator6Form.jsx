import React, { useState } from 'react';
import FormulaDisplay from './FormulaDisplay';
import BaseCalculatorForm from './BaseCalculatorForm';
import { useAnalytics } from '@/hooks/useAnalytics';
import { formatChileanNumber, parseChileanNumber } from '../utils/calculatorUtils';
import BotonExportarPorcentajes from './BotonExportarPorcentajes';

const Calculator6Form = ({ formData, setFormData }) => {
  const [result, setResult] = useState(null);
  const { trackCalculator, trackError } = useAnalytics();

  const handleInputChange = (field, value) => {
    trackCalculator('percentage_input_change', {
      calculator_type: 6,
      field,
      value_length: value.length,
      has_other_value: field === 'initialPrice' ? Boolean(formData.calculator6.increase) 
                                               : Boolean(formData.calculator6.initialPrice)
    });

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
    trackCalculator('percentage_clear', {
      calculator_type: 6,
      had_result: result !== null,
      had_values: Boolean(formData.calculator6.initialPrice || formData.calculator6.increase)
    });

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
    try {
      const { initialPrice, increase } = formData.calculator6;
      const priceValue = parseChileanNumber(initialPrice);
      const increaseValue = parseChileanNumber(increase);

      const increaseAmount = (priceValue * increaseValue) / 100;
      const calculatedResult = priceValue + increaseAmount;
      const formattedResult = formatChileanNumber(calculatedResult);
      
      setResult(formattedResult);

      trackCalculator('percentage_calculate_success', {
        calculator_type: 6,
        initial_price: priceValue,
        increase: increaseValue,
        result: calculatedResult,
        increase_amount: increaseAmount
      });

      return formattedResult;
    } catch (error) {
      trackError(error, {
        component: 'Calculator6Form',
        action: 'calculate',
        values: formData.calculator6
      });
      console.error('Error en cálculo:', error);
    }
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
            <>
              <FormulaDisplay
                activeCalculator={6}
                data={formData.calculator6}
                result={result}
              />
              <div className="mt-6 flex justify-center">
                <BotonExportarPorcentajes 
                  datos={{
                    titulo: "Calcular precio con aumento",
                    precioInicial: parseChileanNumber(formData.calculator6.initialPrice),
                    aumento: parseChileanNumber(formData.calculator6.increase),
                    montoAumento: (parseChileanNumber(formData.calculator6.initialPrice) * 
                                 parseChileanNumber(formData.calculator6.increase)) / 100,
                    resultado: parseChileanNumber(result),
                    tipo: 6
                  }}
                  onExport={() => {
                    trackCalculator('percentage_export_pdf', {
                      calculator_type: 6,
                      initial_price: formData.calculator6.initialPrice,
                      increase: formData.calculator6.increase,
                      result: result
                    });
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

export default Calculator6Form;