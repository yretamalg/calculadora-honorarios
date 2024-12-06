import React, { useState } from 'react';

const BaseCalculatorForm = ({ title, children, onCalculate, onClear }) => {
  const [showResults, setShowResults] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowResults(true);
    if (onCalculate) onCalculate();
  };

  const handleClear = () => {
    setShowResults(false);
    if (onClear) onClear();
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="text-slate-300 text-sm mb-6">{title}</div>
      <form onSubmit={handleSubmit} className="bg-slate-800 rounded-lg p-6">
        {typeof children === 'function' ? children(showResults) : children}
        <div className="flex gap-4 mt-6">
          <button
            type="submit"
            className="flex-1 px-4 py-2 text-white bg-orange-700 rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
          >
            Calcular
          </button>
          <button
            type="button"
            onClick={handleClear}
            className="flex-1 px-4 py-2 text-gray-900 bg-slate-300 border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Limpiar
          </button>
        </div>
      </form>
    </div>
  );
};

export default BaseCalculatorForm;