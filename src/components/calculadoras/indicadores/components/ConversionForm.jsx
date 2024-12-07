import React, { useState } from 'react';
import AutoSizingInput from '../../../ui/AutoSizingInput';

const MONEDAS = [
  { id: 'CLP', nombre: 'Peso Chileno', prefijo: '$' },
  { id: 'UF', nombre: 'UF', prefijo: 'UF' },
  { id: 'DOLAR', nombre: 'Dólar', prefijo: 'US$' },
  { id: 'EURO', nombre: 'Euro', prefijo: '€' },
  { id: 'UTM', nombre: 'UTM', prefijo: 'UTM' }
];

const ConversionForm = ({ onSubmit, onClear, loading }) => {
  const [valores, setValores] = useState({
    monto: '',
    desde: 'CLP',
    hacia: 'UF'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(valores);
  };

  const handleClear = () => {
    setValores({
      monto: '',
      desde: 'CLP',
      hacia: 'UF'
    });
    onClear();
  };

  const getPrefijo = (id) => {
    return MONEDAS.find(m => m.id === id)?.prefijo || '$';
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex flex-wrap md:flex-nowrap gap-4 items-end">
        <div className="w-full md:w-1/3">
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Monto
          </label>
          <AutoSizingInput
            value={valores.monto}
            onChange={(value) => setValores({ ...valores, monto: value })}
            placeholder="0"
            prefix={getPrefijo(valores.desde)}
            disabled={loading}
          />
        </div>

        <div className="w-full md:w-1/3">
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Desde
          </label>
          <select
            value={valores.desde}
            onChange={(e) => {
              setValores({ 
                ...valores, 
                desde: e.target.value,
                monto: '', // Limpiar el monto al cambiar la moneda
              });
            }}
            className="w-full bg-slate-700 border border-slate-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            disabled={loading}
          >
            {MONEDAS.map((moneda) => (
              <option key={moneda.id} value={moneda.id}>
                {moneda.nombre}
              </option>
            ))}
          </select>
        </div>

        <div className="w-full md:w-1/3">
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Hacia
          </label>
          <select
            value={valores.hacia}
            onChange={(e) => setValores({ ...valores, hacia: e.target.value })}
            className="w-full bg-slate-700 border border-slate-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            disabled={loading}
          >
            {MONEDAS.map((moneda) => (
              <option key={moneda.id} value={moneda.id}>
                {moneda.nombre}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex gap-4">
        <button
          type="submit"
          disabled={loading || !valores.monto}
          className="flex-1 px-4 py-2 text-white bg-orange-700 rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Calcular
        </button>
        <button
          type="button"
          onClick={handleClear}
          disabled={loading}
          className="flex-1 px-4 py-2 text-gray-900 bg-slate-300 border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Limpiar
        </button>
      </div>
    </form>
  );
};

export default ConversionForm;