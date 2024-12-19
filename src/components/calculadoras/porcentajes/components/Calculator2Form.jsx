import React, { useState } from 'react';
import FormulaDisplay from './FormulaDisplay';
import BaseCalculatorForm from './BaseCalculatorForm';
import { useAnalytics } from '@/hooks/useAnalytics';
import { formatChileanNumber, parseChileanNumber } from '../utils/calculatorUtils';
import BotonExportarPorcentajes from './BotonExportarPorcentajes';

const Calculator2Form = ({ formData, setFormData }) => {
  const [result, setResult] = useState(null);
  const { trackCalculator, trackError } = useAnalytics();

  const handleInputChange = (field, value) => {
    trackCalculator('percentage_input_change', {
      calculator_type: 2,
      field,
      value_length: value.length,
      has_other_value: field === 'percentage' ? Boolean(formData.calculator2.knownAmount) 
                                            : Boolean(formData.calculator2.percentage)
    });

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
    trackCalculator('percentage_clear', {
      calculator_type: 2,
      had_result: result !== null,
      had_values: Boolean(formData.calculator2.percentage || formData.calculator2.knownAmount)
    });

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
    try {
      const { percentage, knownAmount } = formData.calculator2;
      const percentageNum = parseChileanNumber(percentage);
      if (percentageNum === 0) return '0';
      
      const calculatedResult = (parseChileanNumber(knownAmount) * 100) / percentageNum;
      const formattedResult = formatChileanNumber(calculatedResult);
      
      setResult(formattedResult);

      trackCalculator('percentage_calculate_success', {
        calculator_type: 2,
        percentage: percentageNum,
        known_amount: parseChileanNumber(knownAmount),
        result: calculatedResult
      });

      return formattedResult;
    } catch (error) {
      trackError(error, {
        component: 'Calculator2Form',
        action: 'calculate',
        values: formData.calculator2
      });
      console.error('Error en cálculo:', error);
    }
  };

  return (
    <BaseCalculatorForm
      title="Encontrar el total desde un porcentaje conocido"
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
            <>
              <FormulaDisplay
                activeCalculator={2}
                data={formData.calculator2}
                result={result}
              />
              <div className="mt-6 flex justify-center">
                <BotonExportarPorcentajes 
                  datos={{
                    titulo: "Encontrar Total",
                    porcentaje: parseChileanNumber(formData.calculator2.percentage),
                    valorConocido: parseChileanNumber(formData.calculator2.knownAmount),
                    resultado: parseChileanNumber(result),
                    tipo: 2
                  }}
                  onExport={() => {
                    trackCalculator('percentage_export_pdf', {
                      calculator_type: 2,
                      percentage: formData.calculator2.percentage,
                      known_amount: formData.calculator2.knownAmount,
                      result
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

export default Calculator2Form;