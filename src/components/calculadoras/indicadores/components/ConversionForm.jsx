import React from 'react';
import { ArrowRightLeft } from 'lucide-react';

const ConversionForm = ({ 
  valor, 
  onChange, 
  tipoIndicador,
  direccion,
  onDireccionChange,
  disabled,
  onCalcular 
}) => {
  // Mapeo de nombres de indicadores
  const getNombreIndicador = (tipo) => ({
    'UF': 'UF',
    'DOLAR': 'Dólares',
    'EURO': 'Euros',
    'UTM': 'UTM'
  }[tipo] || tipo);

  // Función unificada para obtener la etiqueta de conversión
  const getConversionLabel = () => {
    const from = direccion === 'to_clp' ? getNombreIndicador(tipoIndicador) : 'Pesos';
    const to = direccion === 'to_clp' ? 'Pesos' : getNombreIndicador(tipoIndicador);
    return { from, to };
  };

  const formatearMonto = (valor) => {
    if (!valor) return '';

    let numero = valor.replace(/[^\d.,]/g, '');
    
    if ((numero.match(/\./g) || []).length > 1) {
      numero = numero.replace(/\./g, '');
    }

    let [parteEntera, parteDecimal] = numero.split(',');
    
    parteEntera = parteEntera.replace(/\./g, '');
    parteEntera = parteEntera.replace(/^0+/, '') || '0';
    parteEntera = parteEntera.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    
    if (direccion === 'to_clp') {
      if (parteDecimal) {
        parteDecimal = parteDecimal.slice(0, 2);
        return `$ ${parteEntera},${parteDecimal}`;
      }
    } else {
      parteDecimal = '';
    }
    
    return parteDecimal ? `$ ${parteEntera},${parteDecimal}` : `$ ${parteEntera}`;
  };

  const handleChange = (e) => {
    const formateado = formatearMonto(e.target.value);
    onChange(formateado);
  };

  const handleKeyDown = (e) => {
    if (['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'].includes(e.key)) {
      return;
    }

    if (/\d/.test(e.key)) {
      return;
    }

    if (e.key === ',' && direccion === 'to_clp' && !e.target.value.includes(',')) {
      return;
    }

    e.preventDefault();
  };

  const { from, to } = getConversionLabel();
  
  return (
    <form 
      onSubmit={(e) => {
        e.preventDefault();
        if (!disabled && valor) onCalcular?.();
      }}
      className="bg-slate-800 rounded-lg p-6 space-y-6"
    >
      {/* Botón unificado de dirección */}
      <button
        type="button"
        onClick={onDireccionChange}
        disabled={disabled}
        className="w-full py-4 px-6 flex items-center justify-center gap-4 
                 bg-slate-700 rounded-lg hover:bg-slate-600 
                 transition-colors text-slate-300 disabled:opacity-50 
                 disabled:cursor-not-allowed"
      >
        <span className="font-medium">{from}</span>
        <ArrowRightLeft className="w-6 h-6" />
        <span className="font-medium">{to}</span>
      </button>

      {/* Input de monto */}
      <div>
        <label 
          htmlFor="monto" 
          className="block text-sm font-medium text-slate-300 mb-2"
        >
          {`Ingrese monto en ${from}:`}
        </label>
        <input
          type="text"
          id="monto"
          value={valor}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          placeholder="$ 0"
          className="block w-full text-2xl h-14 border border-gray-300 rounded-md 
                   shadow-sm py-2 px-3 bg-slate-700 text-white text-right 
                   focus:outline-none focus:ring-2 focus:ring-orange-500 
                   focus:border-orange-500 disabled:opacity-50 
                   disabled:cursor-not-allowed"
        />
      </div>

      {/* Botón calcular */}
      <button
        type="submit"
        disabled={disabled || !valor}
        className="w-full px-4 py-2 text-white bg-orange-700 rounded-md 
                 hover:bg-orange-600 focus:outline-none focus:ring-2 
                 focus:ring-orange-500 focus:ring-offset-2 
                 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Calcular
      </button>
    </form>
  );
};

export default ConversionForm;