import React, { useState } from 'react';
import FormulaDisplay from './FormulaDisplay';
import BaseCalculatorForm from './BaseCalculatorForm';
import { useAnalytics } from '@/hooks/useAnalytics';
import { formatChileanNumber, parseChileanNumber } from '../utils/calculatorUtils';
import BotonExportarPorcentajes from './BotonExportarPorcentajes';

const Calculator7Form = ({ formData, setFormData }) => {
  const [result, setResult] = useState(null);
  const { trackCalculator, trackError } = useAnalytics();

  const handleInputChange = (field, value) => {
    trackCalculator('percentage_input_change', {
      calculator_type: 7,
      field,
      value_length: value.length,
      has_other_value: field === 'initialValue' ? Boolean(formData.calculator7.finalValue) 
                                               : Boolean(formData.calculator7.initialValue)
    });

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
    trackCalculator('percentage_clear', {
      calculator_type: 7,
      had_result: result !== null,
      had_values: Boolean(formData.calculator7.initialValue || formData.calculator7.finalValue)
    });

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
    try {
      const { initialValue, finalValue } = formData.calculator7;
      const initialNum = parseChileanNumber(initialValue);
      const finalNum = parseChileanNumber(finalValue);
      
      if (initialNum === 0) return '0';

      const calculatedResult = ((finalNum - initialNum) / initialNum) * 100;
      const formattedResult = formatChileanNumber(calculatedResult);
      
      setResult(formattedResult);

      trackCalculator('percentage_calculate_success', {
        calculator_type: 7,
        initial_value: initialNum,
        final_value: finalNum,
        result: calculatedResult,
        absolute_change: finalNum - initialNum
      });

      return formattedResult;
    } catch (error) {
      trackError(error, {
        component: 'Calculator7Form',
        action: 'calculate',
        values: formData.calculator7
      });
      console.error('Error en cálculo:', error);
    }
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
                    titulo: "Calcular variación porcentual",
                    valorInicial: parseChileanNumber(formData.calculator7.initialValue),
                    valorFinal: parseChileanNumber(formData.calculator7.finalValue),
                    variacionAbsoluta: getVariacionAbsoluta(),
                    resultado: parseChileanNumber(result),
                    tipo: 7
                  }}
                  onExport={() => {
                    trackCalculator('percentage_export_pdf', {
                      calculator_type: 7,
                      initial_value: formData.calculator7.initialValue,
                      final_value: formData.calculator7.finalValue,
                      result: result,
                      absolute_change: getVariacionAbsoluta()
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

export default Calculator7Form;