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

  const getConversionLabel = () => {
    const from = direccion === 'to_clp' ? getNombreIndicador(tipoIndicador) : 'Pesos';
    const to = direccion === 'to_clp' ? 'Pesos' : getNombreIndicador(tipoIndicador);
    return { from, to };
  };

  const formatearMonto = (valor) => {
    if (!valor) return '';

    // Remover todo excepto números, punto y coma
    let numero = valor.replace(/[^\d.,]/g, '');
    
    // Convertir puntos a nada (removemos puntos de miles temporalmente)
    numero = numero.replace(/\./g, '');
    
    // Si hay más de una coma, dejar solo la primera
    if ((numero.match(/,/g) || []).length > 1) {
      const partes = numero.split(',');
      numero = partes[0] + ',' + partes[1];
    }

    // Separar parte entera y decimal
    let [parteEntera, parteDecimal] = numero.split(',');
    
    // Limpiar parte entera y aplicar formato de miles
    parteEntera = parteEntera.replace(/^0+/, '') || '0';
    parteEntera = parteEntera.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

    // Manejar decimales según la dirección
    if (direccion === 'to_clp') {
      // Permitir decimales solo cuando se convierte a pesos
      if (parteDecimal) {
        parteDecimal = parteDecimal.slice(0, 2); // Máximo 2 decimales
        return `$ ${parteEntera},${parteDecimal}`;
      }
    } else {
      // No permitir decimales cuando se convierte desde pesos
      parteDecimal = '';
    }
    
    return `$ ${parteEntera}${parteDecimal ? `,${parteDecimal}` : ''}`;
  };

  const handleChange = (e) => {
    const formateado = formatearMonto(e.target.value);
    onChange(formateado);
  };

  const handleKeyDown = (e) => {
    // Permitir teclas de control
    if (['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'].includes(e.key)) {
      return;
    }

    // Permitir números
    if (/\d/.test(e.key)) {
      return;
    }

    // Permitir coma para decimales solo cuando se convierte a pesos (to_clp)
    if (e.key === ',' && direccion === 'to_clp' && !e.target.value.includes(',')) {
      return;
    }

    // Bloquear cualquier otra tecla
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
      {/* Botón de dirección */}
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