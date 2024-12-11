/**
 * Formatea un número como moneda chilena
 * @param {number} numero - Número a formatear
 * @returns {string} Número formateado con formato de moneda chilena
 */
export const formatearMonto = (numero) => {
  if (typeof numero !== 'number' || isNaN(numero)) {
    return '$ 0';
  }
  
  try {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
      maximumFractionDigits: 0
    }).format(numero);
  } catch (error) {
    console.error('Error al formatear monto:', error);
    return '$ 0';
  }
};

/**
 * Parsea un texto con formato de moneda a número
 * @param {string} texto - Texto a parsear (ej: "$ 1.234")
 * @returns {number} Número parseado
 */
export const parsearMonto = (texto) => {
  if (!texto) return 0;
  
  try {
    // Remover signos de moneda, puntos y espacios
    const numeroLimpio = texto.replace(/[$\s.]/g, '');
    
    // Validar que solo contenga números
    if (!/^\d+$/.test(numeroLimpio)) {
      return 0;
    }
    
    // Convertir a número
    const numero = parseInt(numeroLimpio, 10);
    
    // Validar rango
    if (numero < 0 || numero > Number.MAX_SAFE_INTEGER) {
      return 0;
    }
    
    return numero;
  } catch (error) {
    console.error('Error al parsear monto:', error);
    return 0;
  }
};

/**
 * Formatea el input mientras el usuario escribe
 * @param {string} valor - Valor actual del input
 * @returns {string} Valor formateado para mostrar en el input
 */
export const formatearInput = (valor) => {
  try {
    // Remover todo excepto números
    let numero = valor.replace(/\D/g, '');
    
    // Si no hay número, retornar vacío
    if (!numero) {
      return '';
    }
    
    // Convertir a número
    const numeroInt = parseInt(numero, 10);
    
    // Si es un número válido, formatear con separadores de miles
    if (!isNaN(numeroInt)) {
      return `$ ${new Intl.NumberFormat('es-CL').format(numeroInt)}`;
    }
    
    return '';
  } catch (error) {
    console.error('Error al formatear input:', error);
    return '';
  }
};

/**
 * Valida un monto
 * @param {number} monto - Monto a validar
 * @returns {boolean} True si el monto es válido
 */
export const validarMonto = (monto) => {
  return (
    typeof monto === 'number' &&
    !isNaN(monto) &&
    monto >= 0 &&
    monto <= Number.MAX_SAFE_INTEGER
  );
};

export default {
  formatearMonto,
  parsearMonto,
  formatearInput,
  validarMonto
};