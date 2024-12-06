import React, { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { formatChileanNumber } from '../utils/calculatorUtils';

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

  const copiarAlPortapapeles = async (valor, tipo) => {
    try {
      const valorFormateado = formatChileanNumber(valor).replace(/\s/g, '');
      await navigator.clipboard.writeText(valorFormateado);
      setCopiado(tipo);
      setTimeout(() => setCopiado(''), 2000);
    } catch (error) {
      console.error('Error al copiar:', error);
    }
  };

  const calculateBarPercentage = () => {
    try {
      switch (activeCalculator) {
        case 1: {
          const percentage = parseFloat(data?.percentage?.toString()?.replace(',', '.')) || 0;
          return Math.min(Math.max(percentage, 0), 100);
        }
        case 2: {
          const percentage = parseFloat(data?.percentage?.toString()?.replace(',', '.')) || 0;
          return Math.min(Math.max(percentage, 0), 100);
        }
        case 3: {
          const targetPerc = parseFloat(data?.targetPercentage?.toString()?.replace(',', '.')) || 0;
          return Math.min(Math.max(targetPerc, 0), 100);
        }
        case 4: {
          // Corregido: Calcular el porcentaje basado en los valores de amount y total
          const amount = parseFloat(data?.amount?.toString().replace(/[^\d.-]/g, '')) || 0;
          const total = parseFloat(data?.total?.toString().replace(/[^\d.-]/g, '')) || 0;
          if (total === 0) return 0;
          const percentage = (amount / total) * 100;
          return Math.min(Math.max(percentage, 0), 100);
        }
        case 5: {
          const discountStr = data?.discount?.toString().replace(',', '.');
          const percentage = parseFloat(discountStr) || 0;
          return Math.min(Math.max(percentage, 0), 100);
        }
        case 6: {
          const increaseStr = data?.increase?.toString().replace(',', '.');
          const percentage = parseFloat(increaseStr) || 0;
          return Math.min(Math.max(percentage, 0), 100);
        }
        default:
          return 0;
      }
    } catch (error) {
      console.error('Error calculando porcentaje:', error);
      return 0;
    }
  };

  const getFormula = () => {
    switch (activeCalculator) {
      case 1:
        return (
          <div className="flex items-center justify-center">
            <span>x = </span>
            <div className="mx-2 text-center">
              <div className="border-b border-slate-400">{`${data.percentage} · ${data.amount}`}</div>
              <div>100</div>
            </div>
            <span>= {result}</span>
          </div>
        );

      case 2:
        return (
          <div className="flex items-center justify-center">
            <span>x = </span>
            <div className="mx-2 text-center">
              <div className="border-b border-slate-400">{`${data.knownAmount} · 100`}</div>
              <div>{data.percentage}</div>
            </div>
            <span>= {result}</span>
          </div>
        );

      case 3: {
        const baseValue = getBaseValue();
        const targetPerc = parseFloat(data?.targetPercentage?.toString()?.replace(',', '.')) || 0;
        const formattedBaseValue = formatChileanNumber(baseValue);
        
        return (
          <div className="flex flex-col items-center space-y-4">
            <p className="text-sm text-slate-400">
              Si {data.knownPercentage}% es {data.knownValue}, el valor base es {formattedBaseValue}
            </p>
            <div className="flex items-center">
              <span>x = </span>
              <div className="mx-2 text-center">
                <div className="border-b border-slate-400">
                  {`${formattedBaseValue} · ${targetPerc}`}
                </div>
                <div>100</div>
              </div>
              <span>= {result}</span>
            </div>
          </div>
        );
      }

      case 4:
        return (
          <div className="flex items-center justify-center">
            <span>x = </span>
            <div className="mx-2 text-center">
              <div className="border-b border-slate-400">{`${formatChileanNumber(data.amount)} · 100`}</div>
              <div>{formatChileanNumber(data.total)}</div>
            </div>
            <span>= {result}</span>
          </div>
        );

      case 5: {
        const discount = parseFloat(data?.discount) || 0;
        const price = parseFloat(data?.initialPrice?.replace(/\D/g, '')) || 0;
        const discountAmount = Math.round((price * discount) / 100);
        const finalPrice = price - discountAmount;
        const pricePercentage = (finalPrice / price) * 100;

        return (
          <div className="flex flex-col items-center space-y-4">
            <div className="flex items-center">
              <span>x = </span>
              <div className="mx-2 text-center">
                <div className="border-b border-slate-400">{`${100 - discount} · $${price.toLocaleString('es-CL')}`}</div>
                <div>100</div>
              </div>
              <span className="flex items-center gap-2">
                = <span className="text-orange-400">${formatChileanNumber(Math.round(finalPrice))}</span>
                <CopyButton
                  valor={finalPrice}
                  tipo="resultado5"
                  copiado={copiado}
                  onCopy={copiarAlPortapapeles}
                />
              </span>
            </div>
            <div className="text-slate-400">
              Descuento: ${formatChileanNumber(discountAmount)}
            </div>
          </div>
        );
      }

      case 6: {
        const increase = parseFloat(data?.increase) || 0;
        const price = parseFloat(data?.initialPrice?.replace(/\D/g, '')) || 0;
        const increaseAmount = Math.round((price * increase) / 100);
        const finalPrice = price + increaseAmount;

        return (
          <div className="flex flex-col items-center space-y-4">
            <div className="flex items-center">
              <span>x = </span>
              <div className="mx-2 text-center">
                <div className="border-b border-slate-400">
                  {`${increase + 100} · $${price.toLocaleString('es-CL')}`}
                </div>
                <div>100</div>
              </div>
              <span className="flex items-center gap-2">
                = <span className="text-orange-400">${formatChileanNumber(Math.round(finalPrice))}</span>
                <CopyButton
                  valor={finalPrice}
                  tipo="resultado6"
                  copiado={copiado}
                  onCopy={copiarAlPortapapeles}
                />
              </span>
            </div>
            <div className="text-slate-400">
              Aumento: ${formatChileanNumber(increaseAmount)}
            </div>
          </div>
        );
      }

      case 7: {
        const initialValue = parseFloat(data.initialValue?.replace(/\D/g, '')) || 0;
        const finalValue = parseFloat(data.finalValue?.replace(/\D/g, '')) || 0;
        const difference = finalValue - initialValue;
        
        return (
          <div className="flex flex-col items-center space-y-4">
            <div className="flex items-center">
              <span>x = </span>
              <div className="mx-2 text-center">
                <div className="border-b border-slate-400">{`${data.finalValue} - ${data.initialValue}`}</div>
                <div>{data.initialValue}</div>
              </div>
              <span>· 100 = {result}</span>
            </div>
            <div className="text-slate-400">
              Aplicado: {result}
              <br />
              Diferencia: {difference >= 0 ? '+' : ''}{formatChileanNumber(difference)}
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
          leftValue = result;
          rightValue = data.amount;
          break;
        case 2:
          leftValue = data.knownAmount;
          rightValue = result;
          break;
        case 3: {
          const baseValue = getBaseValue();
          leftValue = result;
          rightValue = formatChileanNumber(baseValue);
          break;
        }
        case 4: {
          leftValue = formatChileanNumber(data.amount);
          rightValue = formatChileanNumber(data.total);
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
                <span 
                  className="absolute text-xs text-white"
                  style={{ 
                    right: 0,
                    top: '50%',
                    transform: 'translate(50%, -50%)'
                  }}
                >
                  {percentage.toFixed(1)}%
                </span>
              </div>
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