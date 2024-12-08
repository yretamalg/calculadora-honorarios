import React from 'react';
import { ArrowUpDown } from 'lucide-react';

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

  const formatearMonto = (valor) => {
    if (!valor) return '';

    // Remover todo excepto números, punto y coma
    let numero = valor.replace(/[^\d.,]/g, '');
    
    // Convertir comas a puntos si hay más de un punto
    if ((numero.match(/\./g) || []).length > 1) {
      numero = numero.replace(/\./g, '');
    }

    // Separar parte entera y decimal
    let [parteEntera, parteDecimal] = numero.split(',');
    
    // Limpiar parte entera
    parteEntera = parteEntera.replace(/\./g, '');
    parteEntera = parteEntera.replace(/^0+/, '') || '0';
    
    // Aplicar separadores de miles
    parteEntera = parteEntera.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    
    // Manejar decimales según dirección de conversión
    if (direccion === 'to_clp') {
      // Permitir decimales cuando se convierte a pesos
      if (parteDecimal) {
        parteDecimal = parteDecimal.slice(0, 2);
        return `$ ${parteEntera},${parteDecimal}`;
      }
    } else {
      // No permitir decimales cuando se convierte desde pesos
      parteDecimal = '';
    }
    
    return parteDecimal ? `$ ${parteEntera},${parteDecimal}` : `$ ${parteEntera}`;
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

    // Permitir coma para decimales solo en la dirección correcta
    if (e.key === ',' && direccion === 'to_clp' && !e.target.value.includes(',')) {
      return;
    }

    // Bloquear cualquier otra tecla
    e.preventDefault();
  };

  const getEtiquetaConversion = () => {
    if (direccion === 'to_clp') {
      return `Ingrese monto en ${getNombreIndicador(tipoIndicador)}:`;
    }
    return 'Ingrese monto en Pesos (CLP):';
  };

  return (
    <form 
      onSubmit={(e) => {
        e.preventDefault();
        if (!disabled && valor) onCalcular?.();
      }}
      className="bg-slate-800 rounded-lg p-6 space-y-6"
    >
      <div className="space-y-4">
        {/* Botón de dirección */}
        <button
          type="button"
          onClick={onDireccionChange}
          className="w-full flex items-center justify-center p-4 
                   bg-slate-700 rounded-lg hover:bg-slate-600 
                   transition-colors text-slate-300"
        >
          <ArrowUpDown className="w-6 h-6" />
        </button>
      </div>

        {/* Label de conversión */}
        <label 
          htmlFor="monto" 
          className="block text-sm font-medium text-slate-300"
        >
          {getEtiquetaConversion()}
        </label>

        {/* Input de monto */}
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