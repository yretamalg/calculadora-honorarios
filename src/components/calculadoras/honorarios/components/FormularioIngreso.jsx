import React from 'react';
import { useAnalytics } from '@/hooks/useAnalytics';

const FormularioIngreso = ({ 
  monto, 
  tasaRetencion, 
  onMontoChange, 
  onTasaChange, 
  tasasRetencion 
}) => {
  const { trackCalculator } = useAnalytics();

  const formatearMonto = (valor) => {
    // Remover todo excepto números
    let numero = valor.replace(/\D/g, '');
    if (numero) {
      // Convertir a número y formatear con separadores de miles
      numero = new Intl.NumberFormat('es-CL').format(parseInt(numero));
    }
    return numero ? `$ ${numero}` : '';
  };

  const handleMontoChange = (e) => {
    let valor = e.target.value;
    if (valor === '') {
      onMontoChange('');
      trackCalculator('honorarios_input_clear', {
        campo: 'monto'
      });
      return;
    }
    const montoFormateado = formatearMonto(valor);
    onMontoChange(montoFormateado);

    if (montoFormateado && montoFormateado !== '$ 0') {
      trackCalculator('honorarios_monto_input', {
        valor_ingresado: montoFormateado,
        longitud: montoFormateado.replace(/[^\d]/g, '').length
      });
    }
  };

  const handleKeyPress = (e) => {
    // Permitir Enter para el cálculo
    if (e.key === 'Enter') {
      e.preventDefault();
      trackCalculator('honorarios_enter_press', {
        campo: 'monto',
        valor_actual: monto
      });
      document.querySelector('button[type="submit"]')?.click();
    }
  };

  const handleFocus = (e) => {
    if (!e.target.value) {
      onMontoChange('$ ');
    }
    // Posicionar el cursor al final
    const temp = e.target.value;
    e.target.value = '';
    e.target.value = temp;

    trackCalculator('honorarios_input_focus', {
      campo: 'monto',
      valor_actual: monto
    });
  };

  const handleBlur = (e) => {
    if (e.target.value === '$ ') {
      onMontoChange('');
      trackCalculator('honorarios_input_blur_empty', {
        campo: 'monto'
      });
    } else {
      trackCalculator('honorarios_input_blur', {
        campo: 'monto',
        valor_final: e.target.value
      });
    }
  };

  const handleTasaChange = (e) => {
    const nuevaTasa = e.target.value;
    const tasaSeleccionada = tasasRetencion.find(t => t.valor.toString() === nuevaTasa);
    
    onTasaChange(nuevaTasa);
    
    trackCalculator('honorarios_tasa_change', {
      tasa_anterior: tasaRetencion,
      tasa_nueva: nuevaTasa,
      año_tasa: tasaSeleccionada?.año,
      tiene_monto: Boolean(monto && monto !== '$ ')
    });
  };

  return (
    <div className="space-y-3 sm:space-y-4">
      <div>
        <label 
          htmlFor="monto" 
          className="block text-sm font-medium text-slate-300 mb-2"
        >
          Ingresa el monto a calcular:
        </label>
        <input
          type="text"
          id="monto"
          value={monto}
          onChange={handleMontoChange}
          onKeyPress={handleKeyPress}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 
                   focus:outline-none focus:ring-orange-500 focus:border-orange-500 
                   sm:text-sm bg-slate-700 text-white"
          placeholder="$ 0"
          aria-label="Monto a calcular"
        />
      </div>
      
      <div>
        <label 
          htmlFor="tasaRetencion" 
          className="block text-sm font-medium text-slate-300 mb-2"
        >
          Selecciona la tasa de retención:
        </label>
        <select
          id="tasaRetencion"
          value={tasaRetencion}
          onChange={handleTasaChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 
                   focus:outline-none focus:ring-orange-500 focus:border-orange-500 
                   sm:text-sm bg-slate-700 text-white"
          aria-label="Tasa de retención"
        >
          {tasasRetencion.map((tasa) => (
            <option key={tasa.valor} value={tasa.valor}>
              {tasa.etiqueta}
            </option>
          ))}
        </select>
      </div>

      <div className="text-xs text-slate-400 mt-2">
        Los montos calculados son referenciales. Consulta siempre con un profesional contable.
      </div>
    </div>
  );
};

export default FormularioIngreso;