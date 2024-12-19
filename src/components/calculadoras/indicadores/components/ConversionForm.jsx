import React from 'react';
import { ArrowRightLeft } from 'lucide-react';
import { useAnalytics } from '@/hooks/useAnalytics';

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
  const { trackCalculator, trackError } = useAnalytics();

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

    try {
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
    } catch (error) {
      trackError(error, {
        component: 'ConversionForm',
        action: 'formatearMonto',
        valor_original: valor
      });
      return '';
    }
  };

  const handleKeyDown = (e) => {
    const { key, target: { value } } = e;
    if (['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'].includes(key)) return;
    if (/\d/.test(key)) return;
    
    const debenPermitirseDecimales = permitirDecimales();
    if (key === ',' && !value.includes(',') && debenPermitirseDecimales) return;
    
    trackCalculator('conversion_key_blocked', {
      key,
      tipo_indicador: tipoIndicador,
      direccion
    });
    
    e.preventDefault();
  };

  const handleChange = (e) => {
    const valorFormateado = formatearMonto(e.target.value);
    
    trackCalculator('conversion_input_change', {
      tipo_indicador: tipoIndicador,
      direccion,
      valor_length: valorFormateado.length,
      has_decimals: valorFormateado.includes(',')
    });

    onChange(valorFormateado);
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const texto = e.clipboardData.getData('text');
    const valorFormateado = formatearMonto(texto);

    trackCalculator('conversion_paste', {
      tipo_indicador: tipoIndicador,
      direccion,
      texto_original_length: texto.length,
      valor_formateado_length: valorFormateado.length
    });

    onChange(valorFormateado);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!disabled && valor) {
      trackCalculator('conversion_submit', {
        tipo_indicador: tipoIndicador,
        direccion,
        valor: valor,
        timestamp: new Date().toISOString()
      });
      onCalcular?.();
    }
  };

  const placeholderSimbolo = getSimboloMoneda(tipoIndicador, direccion);
  const placeholder = `${placeholderSimbolo} 0`;
  const { from, to } = getConversionLabel();

  return (
    <form onSubmit={handleSubmit} className="bg-slate-800 rounded-lg p-6 space-y-2">
      <div className="text-xs flex justify-center text-slate-300">
        Selecciona la dirección de Conversión
      </div> 
      <div className="flex justify-center">      
        <button
          type="button"
          onClick={onDireccionChange}
          disabled={disabled}
          className="place-content-center w-96 py-4 px-6 flex gap-8 
                   bg-slate-400 rounded-lg hover:bg-slate-300 
                   transition-colors text-slate-900 disabled:opacity-50 
                   disabled:cursor-not-allowed"
        >
          <span className="font-medium">{from}</span>
          <ArrowRightLeft className="w-6 h-6" />
          <span className="font-medium">{to}</span>
        </button>
      </div>

      <div>
        <label 
          htmlFor="monto" 
          className="block text-sm font-medium text-slate-300 mb-2"
        >
          <div className='text-sm font-medium'>
            Ingrese monto en <span className="text-sm font-medium text-orange-500 mb-2">{from}</span>
          </div>
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
          onClick={() => {
            onLimpiar?.();
            trackCalculator('conversion_clear', {
              tipo_indicador: tipoIndicador,
              direccion,
              had_value: Boolean(valor)
            });
          }}
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