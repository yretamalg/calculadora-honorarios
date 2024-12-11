import React from 'react';
import { ArrowRightLeft } from 'lucide-react';
import AutoSizingInput from '@/shared/ui/AutoSizingInput';

const ConversionForm = ({ 
  valor, 
  onChange, 
  tipoIndicador,
  direccion,
  onDireccionChange,
  disabled,
  onCalcular,
  onLimpiar
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

  // Obtener las etiquetas de conversión
  const { from, to } = getConversionLabel();

  const getSimboloMoneda = (tipo, direccionConversion) => {
    if (direccionConversion === 'to_clp') {
      switch (tipo) {
        case 'DOLAR':
          return 'US$';
        case 'EURO':
          return '€';
        case 'UF':
          return 'UF';
        case 'UTM':
          return 'UTM';
        default:
          return '$';
      }
    } else {
      return '$';
    }
  };

  const permitirDecimales = () => {
    if (tipoIndicador === 'DOLAR' || tipoIndicador === 'EURO') return true;
    if (tipoIndicador === 'UF' || tipoIndicador === 'UTM') {
      return direccion === 'to_clp';
    }
    return false;
  };

  const formatearMonto = (valor) => {
    if (!valor) return '';

    let numero = valor.replace(/[^0-9,]/g, '');
    let partes = numero.split(',');
    if (partes.length > 2) {
      numero = partes[0] + ',' + partes[1];
    }

    let [parteEntera, parteDecimal] = numero.split(',');
    parteEntera = parteEntera?.replace(/^0+/, '') || '0';
    parteEntera = parteEntera.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

    const simbolo = getSimboloMoneda(tipoIndicador, direccion);
    const espacioSimbolo = simbolo ? ' ' : '';
    const debenPermitirseDecimales = permitirDecimales();

    if (parteDecimal && debenPermitirseDecimales) {
      parteDecimal = parteDecimal.slice(0, 2);
      return `${simbolo}${espacioSimbolo}${parteEntera},${parteDecimal}`;
    }

    if (valor.endsWith(',') && debenPermitirseDecimales) {
      return `${simbolo}${espacioSimbolo}${parteEntera},`;
    }
    
    return `${simbolo}${espacioSimbolo}${parteEntera}`;
  };

  const handleKeyDown = (e) => {
    const { key, target: { value } } = e;
    if (['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'].includes(key)) return;
    if (/\d/.test(key)) return;
    
    const debenPermitirseDecimales = permitirDecimales();
    if (key === ',' && !value.includes(',') && debenPermitirseDecimales) return;
    
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

  const placeholderSimbolo = getSimboloMoneda(tipoIndicador, direccion);
  const placeholder = `${placeholderSimbolo} 0`;

  return (
    <form 
      onSubmit={(e) => {
        e.preventDefault();
        if (!disabled && valor) onCalcular?.();
      }}
      className="bg-slate-800 rounded-lg p-6 space-y-6"
    >
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
          placeholder={placeholder}
          inputMode="text"
          autoComplete="off"
          className="block w-full text-2xl h-14 border border-gray-300 rounded-md 
                  shadow-sm py-2 px-3 bg-slate-700 text-white text-right 
                  focus:outline-none focus:ring-2 focus:ring-orange-500 
                  focus:border-orange-500 disabled:opacity-50 
                  disabled:cursor-not-allowed"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
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

        <button
          type="button"
          onClick={() => onLimpiar?.()}
          disabled={disabled || !valor}
          className="w-full px-4 py-2 text-slate-300 bg-slate-700 rounded-md 
                   hover:bg-slate-600 focus:outline-none focus:ring-2 
                   focus:ring-slate-500 focus:ring-offset-2 
                   disabled:opacity-50 disabled:cursor-not-allowed
                   border border-slate-600"
        >
          Limpiar
        </button>
      </div>
    </form>
  );
};

export default ConversionForm;