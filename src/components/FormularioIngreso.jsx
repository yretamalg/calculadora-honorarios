import React from 'react';

const FormularioIngreso = ({ monto, tasaRetencion, onMontoChange, onTasaChange, tasasRetencion }) => {
  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="monto" className="block text-sm font-medium text-slate-300 mb-2">
          Ingresa el monto:
        </label>
        <input
          type="text"
          id="monto"
          value={monto}
          onChange={(e) => onMontoChange(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm bg-slate-700 text-white"
          placeholder="Ingresa el monto"
        />
      </div>
      
      <div>
        <label htmlFor="tasaRetencion" className="block text-sm font-medium text-slate-300 mb-2">
          Selecciona la tasa de retención:
        </label>
        <select
          id="tasaRetencion"
          value={tasaRetencion}
          onChange={(e) => onTasaChange(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm bg-slate-700 text-white"
        >
          {tasasRetencion.map((tasa) => (
            <option key={tasa.valor} value={tasa.valor}>
              {tasa.etiqueta}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default FormularioIngreso;