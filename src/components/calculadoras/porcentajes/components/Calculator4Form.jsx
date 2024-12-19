import React, { useState } from 'react';
import FormulaDisplay from './FormulaDisplay';
import BaseCalculatorForm from './BaseCalculatorForm';
import { useAnalytics } from '@/hooks/useAnalytics';
import { formatChileanNumber, parseChileanNumber } from '../utils/calculatorUtils';
import BotonExportarPorcentajes from './BotonExportarPorcentajes';

const Calculator4Form = ({ formData, setFormData }) => {
  const [result, setResult] = useState(null);
  const { trackCalculator, trackError } = useAnalytics();

  const handleInputChange = (field, value) => {
    trackCalculator('percentage_input_change', {
      calculator_type: 4,
      field,
      value_length: value.length,
      has_other_value: field === 'total' ? Boolean(formData.calculator4.amount) 
                                       : Boolean(formData.calculator4.total)
    });

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
    trackCalculator('percentage_clear', {
      calculator_type: 4,
      had_result: result !== null,
      had_values: Boolean(formData.calculator4.amount || formData.calculator4.total)
    });

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
    try {
      const { amount, total } = formData.calculator4;
      const amountValue = parseChileanNumber(amount);
      const totalValue = parseChileanNumber(total);
      if (!totalValue) return '0';

      const calculatedResult = (amountValue / totalValue) * 100;
      const formattedResult = formatChileanNumber(calculatedResult);
      
      setResult(formattedResult);

      trackCalculator('percentage_calculate_success', {
        calculator_type: 4,
        amount: amountValue,
        total: totalValue,
        result: calculatedResult
      });

      return formattedResult;
    } catch (error) {
      trackError(error, {
        component: 'Calculator4Form',
        action: 'calculate',
        values: formData.calculator4
      });
      console.error('Error en cálculo:', error);
    }
  };

  return (
    <BaseCalculatorForm
      title="Calcular qué porcentaje es un número del total"
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
            <>
              <FormulaDisplay
                activeCalculator={4}
                data={formData.calculator4}
                result={result}
              />
              <div className="mt-6 flex justify-center">
                <BotonExportarPorcentajes 
                  datos={{
                    titulo: "Porcentaje del Total",
                    total: parseChileanNumber(formData.calculator4.total),
                    cantidad: parseChileanNumber(formData.calculator4.amount),
                    resultado: parseChileanNumber(result),
                    tipo: 4
                  }}
                  onExport={() => {
                    trackCalculator('percentage_export_pdf', {
                      calculator_type: 4,
                      total: formData.calculator4.total,
                      amount: formData.calculator4.amount,
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

export default Calculator4Form;