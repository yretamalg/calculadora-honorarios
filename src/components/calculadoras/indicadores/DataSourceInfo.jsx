import React from 'react';

const DataSourceInfo = () => {
  return (
    <div className="text-center text-xs text-slate-400 mt-4">
      Los datos se extraen desde el <span className="font-bold">Banco Central de Chile.</span>{' '}
      <a 
        href="https://si3.bcentral.cl/Indicadoressiete/secure/Indicadoresdiarios.aspx" 
        target="_blank" 
        rel="noopener noreferrer"
        className="text-orange-400 hover:text-orange-300 transition-colors underline"
      >
        Indicadores Banco Central
      </a>
    </div>
  );
};

export default DataSourceInfo;