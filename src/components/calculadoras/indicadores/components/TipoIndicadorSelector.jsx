import React from 'react';
import { useAnalytics } from '@/hooks/useAnalytics';

const TipoIndicadorSelector = ({ tipoSeleccionado, onChange, disabled }) => {
  const { trackCalculator } = useAnalytics();

  const tipos = [
    { id: 'UF', nombre: 'UF' },
    { id: 'DOLAR', nombre: 'Dólar' },
    { id: 'EURO', nombre: 'Euro' },
    { id: 'UTM', nombre: 'UTM' }
  ];

  const handleChange = (tipo) => {
    trackCalculator('indicador_type_change', {
      previous_type: tipoSeleccionado,
      new_type: tipo,
      timestamp: new Date().toISOString()
    });
    
    onChange(tipo);
  };

  return (
    <div> 
      <h3 className="text-lg text-slate-300 font-semibold mb-2">Selecciona el Indicador</h3> 
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2"> 
        {tipos.map(tipo => (
          <button 
            key={tipo.id} 
            onClick={() => handleChange(tipo.id)} 
            disabled={disabled} 
            className={`p-3 rounded-lg text-sm font-medium transition-colors 
              ${tipoSeleccionado === tipo.id 
                ? 'bg-orange-700 text-white hover:bg-orange-500' 
                : 'bg-slate-400 text-slate-900 hover:bg-slate-300'
              } 
              disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {tipo.nombre}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TipoIndicadorSelector;