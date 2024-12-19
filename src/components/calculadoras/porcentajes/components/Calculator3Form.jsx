import React, { useState } from 'react';
import FormulaDisplay from './FormulaDisplay';
import BaseCalculatorForm from './BaseCalculatorForm';
import { useAnalytics } from '@/hooks/useAnalytics';
import { formatChileanNumber, parseChileanNumber } from '../utils/calculatorUtils';
import BotonExportarPorcentajes from './BotonExportarPorcentajes';

const Calculator3Form = ({ formData, setFormData }) => {
  const [result, setResult] = useState(null);
  const { trackCalculator, trackError } = useAnalytics();

  const handleInputChange = (field, value) => {
    trackCalculator('percentage_input_change', {
      calculator_type: 3,
      field,
      value_length: value.length,
      has_all_values: Boolean(formData.calculator3.knownPercentage && 
                            formData.calculator3.knownValue && 
                            formData.calculator3.targetPercentage)
    });

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
    trackCalculator('percentage_clear', {
      calculator_type: 3,
      had_result: result !== null,
      had_values: Boolean(Object.values(formData.calculator3).some(v => v))
    });

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
    try {
      const { knownPercentage, knownValue, targetPercentage } = formData.calculator3;
      const knownPerc = parseChileanNumber(knownPercentage);
      const knownVal = parseChileanNumber(knownValue);
      const targetPerc = parseChileanNumber(targetPercentage);
      
      if (!knownPerc) return '0';
      
      const calculatedResult = (knownVal * targetPerc) / knownPerc;
      const formattedResult = formatChileanNumber(calculatedResult);
      
      setResult(formattedResult);

      trackCalculator('percentage_calculate_success', {
        calculator_type: 3,
        known_percentage: knownPerc,
        known_value: knownVal,
        target_percentage: targetPerc,
        result: calculatedResult
      });

      return formattedResult;
    } catch (error) {
      trackError(error, {
        component: 'Calculator3Form',
        action: 'calculate',
        values: formData.calculator3
      });
      console.error('Error en cálculo:', error);
    }
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
              value={formData.calculator3.knownPercentage}
              onChange={(e) => handleInputChange('knownPercentage', e.target.value)}
              className="w-24 bg-slate-700 border border-slate-600 rounded-md py-2 px-3 text-center text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              placeholder="0"
            />
            <span>% es</span>
            <input
              type="text"
              value={formData.calculator3.knownValue}
              onChange={(e) => handleInputChange('knownValue', e.target.value)}
              className="w-24 bg-slate-700 border border-slate-600 rounded-md py-2 px-3 text-center text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              placeholder="0"
            />
            <span>entonces el</span>
            <input
              type="text"
              value={formData.calculator3.targetPercentage}
              onChange={(e) => handleInputChange('targetPercentage', e.target.value)}
              className="w-24 bg-slate-700 border border-slate-600 rounded-md py-2 px-3 text-center text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              placeholder="0"
            />
            <span>% es</span>
            {showResults && result && (
              <span className="bg-slate-700 text-orange-400 px-3 py-2 rounded-md font-bold">
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
                    titulo: "Porcentaje Entre Números",
                    porcentajeConocido: parseChileanNumber(formData.calculator3.knownPercentage),
                    valorConocido: parseChileanNumber(formData.calculator3.knownValue),
                    porcentajeObjetivo: parseChileanNumber(formData.calculator3.targetPercentage),
                    resultado: parseChileanNumber(result),
                    tipo: 3
                  }}
                  onExport={() => {
                    trackCalculator('percentage_export_pdf', {
                      calculator_type: 3,
                      known_percentage: formData.calculator3.knownPercentage,
                      known_value: formData.calculator3.knownValue,
                      target_percentage: formData.calculator3.targetPercentage,
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

export default Calculator3Form;