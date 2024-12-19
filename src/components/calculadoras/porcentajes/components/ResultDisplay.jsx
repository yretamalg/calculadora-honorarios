import React from 'react';
import { useAnalytics } from '@/hooks/useAnalytics';
import { formatNumber } from '../utils/numberUtils';

const ResultDisplay = ({ result }) => {
  const { trackCalculator } = useAnalytics();

  React.useEffect(() => {
    if (result) {
      trackCalculator('result_display_view', {
        operation: result.operation,
        bar_percentage: result.barPercentage,
        formatted_result: formatNumber(result.barPercentage)
      });
    }
  }, [result]);

  return (
    <div className="mt-6 p-6 bg-slate-700 rounded-lg">
      <h3 className="text-lg font-semibold text-slate-300 mb-4">Resultado:</h3>
      <p className="text-white text-lg mb-4">{result.operation}</p>
      <div className="bg-slate-800 rounded-lg p-4">
        <div className="h-6 bg-slate-900 rounded-full overflow-hidden">
          <div
            className="h-full bg-orange-600 transition-all duration-500 ease-out"
            style={{ width: `${result.barPercentage}%` }}
          />
        </div>
        <p className="text-center text-sm text-slate-400 mt-2">
          {formatNumber(result.barPercentage)}%
        </p>
      </div>
    </div>
  );
};

export default ResultDisplay;