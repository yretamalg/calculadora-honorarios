// src/utils/formatters.js

/**
 * Formatea un número como moneda chilena
 * @param {number} numero - Número a formatear
 * @returns {string} Número formateado con formato de moneda chilena
 */
export const formatearMonto = (numero) => {
  if (typeof numero !== 'number' || isNaN(numero)) return '$ 0';
  
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
 * Convierte un string de moneda a número
 * @param {string} texto - Texto a convertir
 * @returns {number} Número parseado
 */
export const parsearMonto = (texto) => {
  if (!texto) return 0;
  try {
    return parseFloat(texto.replace(/[^\d.-]/g, '')) || 0;
  } catch (error) {
    console.error('Error al parsear monto:', error);
    return 0;
  }
};

/**
 * Formatea un valor según el tipo de indicador
 * @param {number} valor - Valor a formatear
 * @param {string} tipo - Tipo de indicador ('CLP', 'USD', 'EUR', 'UF', 'UTM')
 * @returns {string} Valor formateado según el tipo
 */
export const formatearIndicador = (valor, tipo) => {
  if (!valor && valor !== 0) return tipo === 'CLP' ? '$ 0' : '0,00';

  try {
    switch (tipo) {
      case 'CLP':
        return formatearMonto(valor);
      case 'USD':
        return new Intl.NumberFormat('es-CL', {
          style: 'currency',
          currency: 'USD',
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        }).format(valor).replace('USD', 'US$');
      case 'EUR':
        return new Intl.NumberFormat('es-CL', {
          style: 'currency',
          currency: 'EUR',
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        }).format(valor);
      case 'UF':
      case 'UTM':
        return new Intl.NumberFormat('es-CL', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        }).format(valor);
      default:
        return formatearMonto(valor);
    }
  } catch (error) {
    console.error('Error al formatear indicador:', error);
    return tipo === 'CLP' ? '$ 0' : '0,00';
  }
};

export default {
  formatearMonto,
  parsearMonto,
  formatearIndicador
};