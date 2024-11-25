import React from 'react';

export const FormularioIngreso = ({ monto, tasaRetencion, onMontoChange, onTasaChange }) => {
  const tasasRetencion = [
    { valor: '13.75', etiqueta: '13,75% (año 2024)' },
    { valor: '14.50', etiqueta: '14,50% (año 2025)' },
    { valor: '15.25', etiqueta: '15,25% (año 2026)' },
    { valor: '16.00', etiqueta: '16,00% (año 2027)' },
    { valor: '17.00', etiqueta: '17,00% (año 2028)' }
  ];

  const handleMontoChange = (e) => {
    const valor = e.target.value.replace(/\D/g, '');
    if (valor === '') {
      onMontoChange('');
      return;
    }
    const numero = parseInt(valor);
    onMontoChange(numero.toLocaleString('es-CL'));
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="block text-sm font-medium text-slate-300">
          Ingresa aquí el monto a calcular.
        </label>
        <input
          type="text"
          value={monto}
          onChange={handleMontoChange}
          placeholder="Ingrese el monto"
          className="w-full px-3 py-2 border bg-slate-600 text-slate-300 border-slate-100 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-700 focus:border-orange-600"
        />
      </div>

      <div className="space-y-1">
        <label className="block text-sm font-medium text-slate-300">
          Tasa de Retención <a href="https://www.sii.cl/destacados/boletas_honorarios/aumenta_retencion.html" className="text-sm font-medium text-slate-500 hover:text-orange-600" target="_blank" title="Servicio de Impuestos Internos" >(Indicación SII)</a>
        </label>
        <select
          value={tasaRetencion}
          onChange={(e) => onTasaChange(e.target.value)}
          className="w-full px-3 py-2 border bg-slate-600 text-slate-300 border-slate-100 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-700 focus:border-orange-600"
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
