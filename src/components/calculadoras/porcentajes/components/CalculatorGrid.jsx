import React from 'react';
import { calculatorDescriptions } from '../config/calculatorConfig';

const CalculatorGrid = ({ activeCalculator, setActiveCalculator }) => {
  const handleCalculatorClick = (newActiveCalculator) => {
    setActiveCalculator(newActiveCalculator);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
      {Object.entries(calculatorDescriptions).map(([num, { title, description }]) => (
        <button
          key={num}
          onClick={() => handleCalculatorClick(parseInt(num))}
          className={`flex flex-col h-[140px] p-4 rounded-lg transition-colors relative ${
            activeCalculator === parseInt(num)
              ? 'bg-orange-700 text-white'
              : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
          }`}
        >
          <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-slate-600 flex items-center justify-center text-xs font-medium">
            {num}
          </div>
          
          <div className="flex flex-col h-full">
            <div className="mb-2">
              <h3 className="text-left font-bold text-sm">
                {title}
              </h3>
            </div>
            <p className="text-xs opacity-80 text-left">
              {description}
            </p>
          </div>
        </button>
      ))}
    </div>
  );
};

export default CalculatorGrid;