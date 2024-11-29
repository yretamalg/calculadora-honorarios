import React from 'react';

const BotonExportar = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="px-4 py-2 text-sm bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors rounded-md border border-slate-600 flex items-center gap-2"
    >
      <svg 
        className="w-4 h-4" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" 
        />
      </svg>
      Exportar PDF
    </button>
  );
};

export default BotonExportar;