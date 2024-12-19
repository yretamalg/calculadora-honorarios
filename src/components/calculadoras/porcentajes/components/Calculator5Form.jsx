import React, { useState } from 'react';
import FormulaDisplay from './FormulaDisplay';
import BaseCalculatorForm from './BaseCalculatorForm';
import { useAnalytics } from '@/hooks/useAnalytics';
import { formatChileanNumber, parseChileanNumber } from '../utils/calculatorUtils';
import BotonExportarPorcentajes from './BotonExportarPorcentajes';

const Calculator5Form = ({ formData, setFormData }) => {
  const [result, setResult] = useState(null);
  const { trackCalculator, trackError } = useAnalytics();

  const handleInputChange = (field, value) => {
    trackCalculator('percentage_input_change', {
      calculator_type: 5,
      field,
      value_length: value.length,
      has_other_value: field === 'initialPrice' ? Boolean(formData.calculator5.discount) 
                                               : Boolean(formData.calculator5.initialPrice)
    });

    setFormData(prev => ({
      ...prev,
      calculator5: {
        ...prev.calculator5,
        [field]: value
      }
    }));
    setResult(null);
  };

  const handleClear = () => {
    trackCalculator('percentage_clear', {
      calculator_type: 5,
      had_result: result !== null,
      had_values: Boolean(formData.calculator5.initialPrice || formData.calculator5.discount)
    });

    setFormData(prev => ({
      ...prev,
      calculator5: {
        initialPrice: '',
        discount: ''
      }
    }));
    setResult(null);
  };

  const handleCalculate = () => {
    try {
      const { initialPrice, discount } = formData.calculator5;
      const priceValue = parseChileanNumber(initialPrice);
      const discountValue = parseChileanNumber(discount);

      const discountAmount = (priceValue * discountValue) / 100;
      const calculatedResult = priceValue - discountAmount;
      const formattedResult = formatChileanNumber(calculatedResult);
      
      setResult(formattedResult);

      trackCalculator('percentage_calculate_success', {
        calculator_type: 5,
        initial_price: priceValue,
        discount: discountValue,
        result: calculatedResult,
        discount_amount: discountAmount
      });

      return formattedResult;
    } catch (error) {
      trackError(error, {
        component: 'Calculator5Form',
        action: 'calculate',
        values: formData.calculator5
      });
      console.error('Error en cálculo:', error);
    }
  };

  return (
    <BaseCalculatorForm
      title="Calcular el precio final con descuento"
      onCalculate={handleCalculate}
      onClear={handleClear}
    >
      {(showResults) => (
        <>
          <div className="flex flex-wrap md:flex-nowrap items-center gap-3 text-slate-300">
            <span>Si el precio es $</span>
            <input
              type="text"
              value={formData.calculator5.initialPrice}
              onChange={(e) => handleInputChange('initialPrice', e.target.value)}
              className="w-24 bg-slate-700 border border-slate-600 rounded-md py-2 px-3 text-center text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              placeholder="0"
            />
            <span>con</span>
            <input
              type="text"
              value={formData.calculator5.discount}
              onChange={(e) => handleInputChange('discount', e.target.value)}
              className="w-24 bg-slate-700 border border-slate-600 rounded-md py-2 px-3 text-center text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              placeholder="0"
            />
            <span>% de descuento el valor sería</span>
            {showResults && result && (
              <span className="bg-slate-700 text-orange-400 px-3 py-2 rounded-md font-bold">
                {result}
              </span>
            )}
          </div>

          {showResults && result && (
            <>
              <FormulaDisplay
                activeCalculator={5}
                data={formData.calculator5}
                result={result}
              />
              <div className="mt-6 flex justify-center">
                <BotonExportarPorcentajes 
                  datos={{
                    titulo: "Calcular precio con descuento",
                    precioInicial: parseChileanNumber(formData.calculator5.initialPrice),
                    descuento: parseChileanNumber(formData.calculator5.discount),
                    montoDescuento: (parseChileanNumber(formData.calculator5.initialPrice) * 
                                   parseChileanNumber(formData.calculator5.discount)) / 100,
                    resultado: parseChileanNumber(result),
                    tipo: 5
                  }}
                  onExport={() => {
                    trackCalculator('percentage_export_pdf', {
                      calculator_type: 5,
                      initial_price: formData.calculator5.initialPrice,
                      discount: formData.calculator5.discount,
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

export default Calculator5Form;