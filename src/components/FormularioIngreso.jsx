import React from 'react';

const FormularioIngreso = ({ monto, tasaRetencion, onMontoChange, onTasaChange, tasasRetencion }) => {
  const formatearMonto = (valor) => {
    // Eliminar todo excepto números
    let numero = valor.replace(/\D/g, '');
    // Convertir a número y formatear con separadores de miles
    if (numero) {
      numero = new Intl.NumberFormat('es-CL').format(parseInt(numero));
    }
    return numero ? `$ ${numero}` : '';
  };

  const handleMontoChange = (e) => {
    let valor = e.target.value;
    // Si el usuario intenta borrar el símbolo $, lo mantenemos
    if (valor === '') {
      onMontoChange('');
      return;
    }
    // Formatear el valor
    const montoFormateado = formatearMonto(valor);
    onMontoChange(montoFormateado);
  };

  const handleFocus = (e) => {
    // Si no hay valor, agregamos el símbolo $ al focusear
    if (!e.target.value) {
      onMontoChange('$ ');
    }
    // Mover el cursor al final
    const temp = e.target.value;
    e.target.value = '';
    e.target.value = temp;
  };

  const handleBlur = (e) => {
    // Si solo está el símbolo $, limpiamos el campo
    if (e.target.value === '$ ') {
      onMontoChange('');
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="monto" className="block text-sm font-medium text-slate-300 mb-2">
          Ingresa el monto:
        </label>
        <input
          type="text"
          id="monto"
          value={monto}
          onChange={handleMontoChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm bg-slate-700 text-white"
          placeholder="$ 0"
        />
      </div>
      
      <div>
        <label htmlFor="tasaRetencion" className="block text-sm font-medium text-slate-300 mb-2">
          Selecciona la tasa de retención:
        </label>
        <select
          id="tasaRetencion"
          value={tasaRetencion}
          onChange={(e) => onTasaChange(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm bg-slate-700 text-white"
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

export default FormularioIngreso;