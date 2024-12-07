import React from 'react';

const ConversionForm = ({ 
  valor, 
  onChange, 
  tipoIndicador,
  disabled,
  onCalcular 
}) => {
  const formatearMonto = (valor) => {
    // Remover todo excepto números y coma
    let numero = valor.replace(/[^\d,]/g, '');
    
    // Separar parte entera y decimal
    let [parteEntera, parteDecimal] = numero.split(',');
    
    // Remover ceros iniciales
    parteEntera = parteEntera.replace(/^0+/, '') || '0';
    
    // Aplicar separadores de miles
    parteEntera = parteEntera.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    
    // Reconstruir el número con decimales limitados a 2
    let montoFormateado = parteEntera;
    if (parteDecimal) {
      parteDecimal = parteDecimal.slice(0, 2);
      montoFormateado += ',' + parteDecimal;
    }
    
    return montoFormateado ? `$ ${montoFormateado}` : '';
  };

  const handleChange = (e) => {
    onChange?.(formatearMonto(e.target.value));
  };

  const handleKeyDown = (e) => {
    // Permitir solo números, coma, y teclas de control
    const permitidos = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', ',', 'Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'];
    if (!permitidos.includes(e.key)) {
      e.preventDefault();
    }
    
    // Permitir solo una coma
    if (e.key === ',' && e.target.value.includes(',')) {
      e.preventDefault();
    }

    // Permitir Enter para calcular
    if (e.key === 'Enter' && !disabled && valor) {
      e.preventDefault();
      onCalcular?.();
    }
  };

  const handleFocus = (e) => {
    if (!e.target.value) {
      onChange?.('$ ');
    }
  };

  const handleBlur = (e) => {
    if (e.target.value === '$ ') {
      onChange?.('');
    }
  };

  return (
    <form 
      onSubmit={(e) => {
        e.preventDefault();
        if (!disabled && valor) onCalcular?.();
      }} 
      className="bg-slate-800 rounded-lg p-6"
    >
      <div className="space-y-4">
        <div className="space-y-2">
          <label 
            htmlFor="monto" 
            className="block text-sm font-medium text-slate-300"
          >
            Ingresa el monto en {tipoIndicador === 'UF' ? 'Pesos (CLP)' : tipoIndicador}:
          </label>
          <input
            type="text"
            id="monto"
            value={valor || ''}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            onFocus={handleFocus}
            onBlur={handleBlur}
            disabled={disabled}
            placeholder="$ 0"
            className="block w-full text-2xl h-14 border border-gray-300 rounded-md 
                     shadow-sm py-2 px-3 bg-slate-700 text-white text-right 
                     focus:outline-none focus:ring-2 focus:ring-orange-500 
                     focus:border-orange-500 disabled:opacity-50 
                     disabled:cursor-not-allowed"
          />
        </div>

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
      </div>
    </form>
  );
};

export default ConversionForm;