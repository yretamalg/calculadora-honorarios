// src/components/calculadoras/porcentajes/styles/commonStyles.js

export const styles = {
  // Container and layout
  form: "max-w-3xl mx-auto space-y-6",
  description: "text-slate-300 text-sm mb-6",
  inputContainer: "bg-slate-800 rounded-lg p-6 space-y-6",
  
  // Input rows and fields
  inputRow: "flex flex-wrap md:flex-nowrap items-center gap-3 text-slate-300",
  input: "w-24 bg-slate-700 border border-slate-600 rounded-md py-2 px-3 text-center text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500",
  inputWide: "w-32 bg-slate-700 border border-slate-600 rounded-md py-2 px-3 text-center text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500",
  
  // Results and highlights
  result: "bg-slate-700 text-orange-400 px-3 py-2 rounded-md font-bold",
  
  // Buttons
  button: "w-full md:w-auto px-4 py-2 text-white bg-orange-700 rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition-colors",
  
  // Operations section
  operations: "mt-8 bg-slate-700/30 rounded-lg p-6",
  operationsTitle: "text-lg font-semibold text-orange-500 mb-4",
  
  // Table styles
  table: "w-full text-center mb-6",
  tableHeader: "bg-slate-700 text-slate-300 px-4 py-2 text-sm font-medium",
  tableCell: "px-4 py-2 text-slate-300",
  tableRow: "border-t border-slate-600",
  explanation: "text-slate-300 text-sm space-y-1",
  
  // Visual representation
  representation: "mt-8 bg-slate-700/30 rounded-lg p-6",
  representationTitle: "text-lg font-semibold text-orange-500 mb-4",
  progressContainer: "relative h-8 bg-slate-700 rounded-lg overflow-hidden",
  progressBar: "absolute h-full bg-orange-600/50 transition-all duration-300 ease-out",
  progressValue: "absolute text-xs text-slate-300 -top-6",
  scale: "flex justify-between text-xs text-slate-400 mt-2",
  scaleValue: "text-xs text-slate-400",
  
  // Results section
  resultsContainer: "mt-8 bg-slate-800 rounded-lg p-6",
  resultTitle: "text-lg font-semibold text-slate-300 mb-4",
  resultValue: "text-3xl font-bold text-orange-500",
  
  // Responsive adjustments
  responsiveContainer: "px-4 py-6 md:px-6",
  gridContainer: "grid md:grid-cols-2 gap-6"
};

// Helper functions for dynamic styling
export const getProgressBarColor = (value, type = 'default') => {
  const colors = {
    default: 'bg-orange-600/50',
    increase: 'bg-green-600/50',
    decrease: 'bg-red-600/50'
  };
  return colors[type] || colors.default;
};

export const getResultTextColor = (value, type = 'default') => {
  const colors = {
    default: 'text-orange-500',
    positive: 'text-green-500',
    negative: 'text-red-500'
  };
  return colors[type] || colors.default;
};