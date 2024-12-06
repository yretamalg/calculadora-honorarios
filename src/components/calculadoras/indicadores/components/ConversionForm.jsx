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

    // Remover caracteres inválidos, pero preservar la última coma
    let numero = valor.replace(/[^0-9,]/g, '');
    
    // Asegurarse de mantener solo una coma
    let partes = numero.split(',');
    if (partes.length > 2) {
      numero = partes[0] + ',' + partes[1];
    }

    // Separar parte entera y decimal
    let [parteEntera, parteDecimal] = numero.split(',');

    // Limpiar ceros iniciales
    parteEntera = parteEntera?.replace(/^0+/, '') || '0';

    // Aplicar separador de miles
    parteEntera = parteEntera.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

    if (direccion === 'to_clp') {
      // Permitir máximo 2 decimales
      if (parteDecimal) {
        parteDecimal = parteDecimal.slice(0, 2);
        return `$ ${parteEntera},${parteDecimal}`;
      }
      // Si el último carácter era una coma, preservarla
      if (valor.endsWith(',')) {
        return `$ ${parteEntera},`;
      }
    }
    
    return `$ ${parteEntera}`;
  };

  const handleKeyDown = (e) => {
    const { key, target: { value } } = e;

    // Permitir teclas de control y navegación
    if (['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'].includes(key)) return;

    // Permitir números
    if (/\d/.test(key)) return;

    // Permitir coma solo si aún no existe y estamos en modo to_clp
    if (direccion === 'to_clp' && key === ',' && !value.includes(',')) return;

    // Bloquear cualquier otra tecla
    e.preventDefault();
  };

  const handleChange = (e) => {
    const valorFormateado = formatearMonto(e.target.value);
    onChange(valorFormateado);
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const texto = e.clipboardData.getData('text');
    const valorFormateado = formatearMonto(texto);
    onChange(valorFormateado);
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
          onPaste={handlePaste}
          onDrop={(e) => e.preventDefault()}
          disabled={disabled}
          placeholder="$ 0"
          inputMode="text"
          autoComplete="off"
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