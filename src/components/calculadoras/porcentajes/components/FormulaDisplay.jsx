import React, { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { useAnalytics } from '@/hooks/useAnalytics';

const CopyButton = ({ valor, tipo, copiado, onCopy }) => (
  <button
    onClick={() => onCopy(valor, tipo)}
    className="text-slate-400 hover:text-slate-300 transition-colors p-1"
    title="Copiar valor"
  >
    {copiado === tipo ? (
      <Check className="w-4 h-4 text-green-400" />
    ) : (
      <Copy className="w-4 h-4" />
    )}
  </button>
);

const FormulaDisplay = ({ activeCalculator, data = {}, result }) => {
  const [copiado, setCopiado] = useState('');
  const { trackCalculator, trackError } = useAnalytics();

  // Función auxiliar para parsear números con manejo de errores
  const parseNumber = (value, defaultValue = 0) => {
    if (!value) return defaultValue;
    try {
      const cleaned = value.toString()
        .replace(/[^0-9,.-]/g, '')
        .replace(/\./g, '')
        .replace(',', '.');
      
      const number = parseFloat(cleaned);
      return isNaN(number) ? defaultValue : number;
    } catch (error) {
      console.error('Error parsing number:', error);
      trackError(error, {
        component: 'FormulaDisplay',
        action: 'parseNumber',
        value
      });
      return defaultValue;
    }
  };

  const formatLocaleNumber = (number) => {
    try {
      return number.toLocaleString('es-CL');
    } catch (error) {
      trackError(error, {
        component: 'FormulaDisplay',
        action: 'formatLocaleNumber',
        number
      });
      return '0';
    }
  };

  const copiarAlPortapapeles = async (valor, tipo) => {
    try {
      const numeroParseado = parseNumber(valor);
      const valorFormateado = formatLocaleNumber(numeroParseado);
      await navigator.clipboard.writeText(valorFormateado);
      setCopiado(tipo);
      setTimeout(() => setCopiado(''), 2000);

      trackCalculator('formula_copy_value', {
        calculator_type: activeCalculator,
        value_type: tipo,
        value: numeroParseado
      });
    } catch (error) {
      console.error('Error al copiar:', error);
      trackError(error, {
        component: 'FormulaDisplay',
        action: 'copiarAlPortapapeles',
        value_type: tipo
      });
    }
  };

  const calculateBarPercentage = () => {
    try {
      switch (activeCalculator) {
        case 1: {
          const percentage = parseNumber(data?.percentage);
          return Math.min(Math.max(percentage, 0), 100);
        }
        case 2: {
          const percentage = parseNumber(data?.percentage);
          return Math.min(Math.max(percentage, 0), 100);
        }
        case 3: {
          const targetPerc = parseNumber(data?.targetPercentage);
          return Math.min(Math.max(targetPerc, 0), 100);
        }
        case 4: {
          const percentage = parseNumber(result?.toString().replace('%', ''));
          return Math.min(Math.max(percentage, 0), 100);
        }
        case 5: {
          const discount = parseNumber(data?.discount);
          return Math.min(Math.max(discount, 0), 100);
        }
        case 6: {
          const increase = parseNumber(data?.increase);
          return Math.min(Math.max(increase, 0), 100);
        }
        default:
          return 0;
      }
    } catch (error) {
      trackError(error, {
        component: 'FormulaDisplay',
        action: 'calculateBarPercentage',
        calculator_type: activeCalculator
      });
      return 0;
    }
  };

  const getBaseValue = () => {
    if (!data) return 0;
    const knownPerc = parseNumber(data.knownPercentage);
    const knownVal = parseNumber(data.knownValue);
    
    if (knownPerc === 0) return 0;
    return knownVal / (knownPerc / 100);
  };

  const getFormula = () => {
    switch (activeCalculator) {
      case 1: {
        const percentage = parseNumber(data.percentage);
        const amount = parseNumber(data.amount);
        const parsedResult = parseNumber(result);
        
        return (
          <div className="flex items-center justify-center">
            <span>x = </span>
            <div className="mx-2 text-center">
              <div className="border-b border-slate-400">
                {`${formatLocaleNumber(percentage)} · ${formatLocaleNumber(amount)}`}
              </div>
              <div>100</div>
            </div>
            <span>= {formatLocaleNumber(parsedResult)}</span>
          </div>
        );
      }

      case 2: {
        const knownAmount = parseNumber(data.knownAmount);
        const percentage = parseNumber(data.percentage);
        const parsedResult = parseNumber(result);
        
        return (
          <div className="flex items-center justify-center">
            <span>x = </span>
            <div className="mx-2 text-center">
              <div className="border-b border-slate-400">
                {`${formatLocaleNumber(knownAmount)} · 100`}
              </div>
              <div>{formatLocaleNumber(percentage)}</div>
            </div>
            <span>= {formatLocaleNumber(parsedResult)}</span>
          </div>
        );
      }

      case 3: {
        const knownVal = parseNumber(data.knownValue);
        const knownPerc = parseNumber(data.knownPercentage);
        const targetPerc = parseNumber(data.targetPercentage);
        const parsedResult = parseNumber(result);
        
        return (
          <div className="flex items-center justify-center">
            <span>x = </span>
            <div className="mx-2 text-center">
              <div className="border-b border-slate-400">
                {`${formatLocaleNumber(knownVal)} · ${formatLocaleNumber(targetPerc)}`}
              </div>
              <div>{formatLocaleNumber(knownPerc)}</div>
            </div>
            <span>= {formatLocaleNumber(parsedResult)}</span>
          </div>
        );
      }

      case 4: {
        const amount = parseNumber(data.amount);
        const total = parseNumber(data.total);
        const parsedResult = parseNumber(result);
        
        return (
          <div className="flex items-center justify-center">
            <span>x = </span>
            <div className="mx-2 text-center">
              <div className="border-b border-slate-400">
                {`${formatLocaleNumber(amount)} · 100`}
              </div>
              <div>{formatLocaleNumber(total)}</div>
            </div>
            <span>= {parsedResult}%</span>
          </div>
        );
      }

      case 5: {
        const discount = parseNumber(data.discount);
        const price = parseNumber(data.initialPrice);
        const discountAmount = Math.round((price * discount) / 100);
        const finalPrice = price - discountAmount;
        const fillPercentage = ((price - discountAmount) / price) * 100;
      
        return (
          <div className="flex flex-col items-center space-y-4">
            <div className="flex items-center">
              <span>x = </span>
              <div className="mx-2 text-center">
                <div className="border-b border-slate-400">
                  {`${formatLocaleNumber(100 - discount)} · $${formatLocaleNumber(price)}`}
                </div>
                <div>100</div>
              </div>
              <span className="flex items-center gap-2">
                = <span className="text-orange-400">${formatLocaleNumber(finalPrice)}</span>
                <CopyButton
                  valor={finalPrice}
                  tipo="resultado5"
                  copiado={copiado}
                  onCopy={copiarAlPortapapeles}
                />
              </span>
            </div>
            <div className="text-slate-400">
              Descuento: ${formatLocaleNumber(discountAmount)}
            </div>
      
            <div className="bg-slate-800 rounded-lg p-4 mt-4 w-full">
              <div className="text-center text-slate-300 mb-2">Representación del precio final</div>
              <div className="relative pt-6 pb-2">
                <div className="absolute top-0 left-0 w-full">
                  <span 
                    className="absolute text-xs text-slate-300"
                    style={{ 
                      left: `${fillPercentage}%`,
                      transform: 'translateX(-50%)'
                    }}
                  >
                    ${formatLocaleNumber(finalPrice)}
                  </span>
                </div>
      
                <div className="h-6 bg-slate-900 rounded-full overflow-hidden relative">
                  <div
                    className="h-full bg-orange-600 transition-all duration-500 ease-out relative"
                    style={{ width: `${fillPercentage}%` }}
                  >
                    <span 
                      className="absolute text-xs text-white"
                      style={{ 
                        right: 0,
                        top: '50%',
                        transform: 'translate(50%, -50%)'
                      }}
                    >
                      {(100 - discount).toFixed(1)}%
                    </span>
                  </div>
                </div>
      
                <div className="absolute top-0 left-0 w-full flex justify-between text-xs text-slate-400">
                  <span>$0</span>
                  <span>${formatLocaleNumber(price)}</span>
                </div>
              </div>
            </div>
          </div>
        );
      }

      case 6: {
        const increase = parseNumber(data.increase);
        const price = parseNumber(data.initialPrice);
        const increaseAmount = Math.round((price * increase) / 100);
        const finalPrice = price + increaseAmount;

        return (
          <div className="flex flex-col items-center space-y-4">
            <div className="flex items-center">
              <span>x = </span>
              <div className="mx-2 text-center">
                <div className="border-b border-slate-400">
                  {`${formatLocaleNumber(increase + 100)} · $${formatLocaleNumber(price)}`}
                </div>
                <div>100</div>
              </div>
              <span className="flex items-center gap-2">
                = <span className="text-orange-400">${formatLocaleNumber(finalPrice)}</span>
                <CopyButton
                  valor={finalPrice}
                  tipo="resultado6"
                  copiado={copiado}
                  onCopy={copiarAlPortapapeles}
                />
              </span>
            </div>
            <div className="text-slate-400">
              Aumento: ${formatLocaleNumber(increaseAmount)}
            </div>
          </div>
        );
      }

      case 7: {
        const initialValue = parseNumber(data.initialValue);
        const finalValue = parseNumber(data.finalValue);
        const difference = finalValue - initialValue;
        
        return (
          <div className="flex flex-col items-center space-y-4">
            <div className="flex items-center">
              <span>x = </span>
              <div className="mx-2 text-center">
                <div className="border-b border-slate-400">
                  {`${formatLocaleNumber(finalValue)} - ${formatLocaleNumber(initialValue)}`}
                </div>
                <div>{formatLocaleNumber(initialValue)}</div>
              </div>
              <span>· 100 = {result}%</span>
            </div>
            <div className="text-slate-400">
              Aplicado: {result}%
              <br />
              Diferencia: {difference >= 0 ? '+' : ''}{formatLocaleNumber(difference)}
            </div>
          </div>
        );
      }

      default:
        return null;
    }
  };

  const getProgressBar = () => {
    if ([1, 2, 3, 4].includes(activeCalculator)) {
      const percentage = calculateBarPercentage();
      let leftValue, rightValue;
  
      switch (activeCalculator) {
        case 1:
          leftValue = formatLocaleNumber(parseNumber(result));
          rightValue = formatLocaleNumber(parseNumber(data.amount));
          break;
        case 2:
          leftValue = formatLocaleNumber(parseNumber(data.knownAmount));
          rightValue = formatLocaleNumber(parseNumber(result));
          break;
        case 3: {
          const baseValue = getBaseValue();
          leftValue = formatLocaleNumber(parseNumber(result));
          rightValue = formatLocaleNumber(baseValue);
          break;
        }
        case 4: {
          leftValue = formatLocaleNumber(parseNumber(data.amount));
          rightValue = formatLocaleNumber(parseNumber(data.total));
          break;
        }
        default:
          leftValue = '0';
          rightValue = '0';
      }
  
      return (
        <>
          <div className="text-center text-slate-300 mb-2">Representación</div>
          <div className="relative pt-6 pb-2">
            <div className="absolute top-0 left-0 w-full">
              <span 
                className="absolute text-xs text-slate-300"
                style={{ 
                  left: `${percentage}%`,
                  transform: 'translateX(-50%)'
                }}
              >
                {leftValue}
              </span>
            </div>
  
            <div className="h-6 bg-slate-900 rounded-full overflow-hidden relative">
              <div
                className="h-full bg-orange-600 transition-all duration-500 ease-out relative"
                style={{ width: `${percentage}%` }}
              >
                {percentage >= 5 && (
                  <span 
                    className="absolute text-xs text-white"
                    style={{ 
                      left: '50%',
                      top: '50%',
                      transform: 'translate(-50%, -50%)'
                    }}
                  >
                    {percentage.toFixed(1)}%
                  </span>
                )}
              </div>
              {percentage < 5 && (
                <div className="absolute w-full text-center mt-2">
                  <span className="text-xs text-slate-300">
                    {percentage.toFixed(1)}%
                  </span>
                </div>
              )}
            </div>
  
            <div className="absolute top-0 left-0 w-full flex justify-between text-xs text-slate-400">
              <span>0</span>
              <span>{rightValue}</span>
            </div>
          </div>
        </>
      );
    }
  
    return null;
  };

  React.useEffect(() => {
    if (result) {
      trackCalculator('formula_display_view', {
        calculator_type: activeCalculator,
        has_result: true,
        has_progress_bar: [1, 2, 3, 4].includes(activeCalculator)
      });
    }
  }, [result, activeCalculator]);

  return (
    <div className="bg-slate-700 rounded-lg p-4 mt-4 text-slate-300">
      <div className="text-sm font-medium mb-2">Fórmula:</div>
      {getFormula()}
      {![5, 6, 7].includes(activeCalculator) && (
        <div className="bg-slate-800 rounded-lg p-4 mt-4">
          {getProgressBar()}
        </div>
      )}
    </div>
  );
};

export default FormulaDisplay;