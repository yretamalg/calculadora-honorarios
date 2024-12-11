// Configuración de formatos locales
const CHILE_LOCALE = 'es-CL';

// Formateadores predefinidos
const CURRENCY_FORMATTER = new Intl.NumberFormat(CHILE_LOCALE, {
  style: 'currency',
  currency: 'CLP',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0
});

const DECIMAL_FORMATTER = new Intl.NumberFormat(CHILE_LOCALE, {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
});

const PERCENT_FORMATTER = new Intl.NumberFormat(CHILE_LOCALE, {
  style: 'percent',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
});

/**
 * Limpia un texto de caracteres no numéricos
 * @param {string} texto - Texto a limpiar
 * @returns {string} Texto limpio
 */
const limpiarTextoNumerico = (texto) => {
  if (!texto) return '';
  return texto.replace(/[^\d.-]/g, '');
};

/**
 * Formatea un número como moneda chilena
 * @param {number} numero - Número a formatear
 * @returns {string} Número formateado con formato de moneda chilena
 */
export const formatearMonto = (numero) => {
  if (typeof numero !== 'number' || isNaN(numero)) return '$ 0';
  
  try {
    return CURRENCY_FORMATTER.format(numero);
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
  const numeroLimpio = texto.replace(/[$.\s]/g, '');
  return parseInt(numeroLimpio) || 0;
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
        return new Intl.NumberFormat(CHILE_LOCALE, {
          style: 'currency',
          currency: 'USD',
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        }).format(valor).replace('USD', 'US$');
      case 'EUR':
        return new Intl.NumberFormat(CHILE_LOCALE, {
          style: 'currency',
          currency: 'EUR',
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        }).format(valor);
      case 'UF':
      case 'UTM':
        return DECIMAL_FORMATTER.format(valor);
      default:
        return formatearMonto(valor);
    }
  } catch (error) {
    console.error('Error al formatear indicador:', error);
    return tipo === 'CLP' ? '$ 0' : '0,00';
  }
};

/**
 * Formatea un número con separadores de miles
 * @param {number} numero - Número a formatear
 * @param {boolean} includeDecimals - Incluir decimales en el formato
 * @returns {string} Número formateado
 */
export const formatearNumero = (numero, includeDecimals = true) => {
  if (!numero && numero !== 0) return '0';

  try {
    if (Number.isInteger(numero) && !includeDecimals) {
      return new Intl.NumberFormat(CHILE_LOCALE).format(numero);
    }
    return DECIMAL_FORMATTER.format(numero);
  } catch (error) {
    console.error('Error al formatear número:', error);
    return '0';
  }
};

/**
 * Formatea un porcentaje
 * @param {number} numero - Número a formatear como porcentaje
 * @param {boolean} includeSymbol - Incluir símbolo de porcentaje
 * @returns {string} Porcentaje formateado
 */
export const formatearPorcentaje = (numero, includeSymbol = true) => {
  if (!numero && numero !== 0) return includeSymbol ? '0%' : '0';

  try {
    if (includeSymbol) {
      return PERCENT_FORMATTER.format(numero / 100);
    }
    return DECIMAL_FORMATTER.format(numero);
  } catch (error) {
    console.error('Error al formatear porcentaje:', error);
    return includeSymbol ? '0%' : '0';
  }
};

/**
 * Calcula el porcentaje entre dos números
 * @param {number} valor - Valor a calcular
 * @param {number} total - Total para calcular el porcentaje
 * @returns {number} Porcentaje calculado
 */
export const calcularPorcentaje = (valor, total) => {
  if (!total) return 0;
  return (valor / total) * 100;
};

/**
 * Calcula el valor desde un porcentaje
 * @param {number} porcentaje - Porcentaje a calcular
 * @param {number} total - Total sobre el cual calcular
 * @returns {number} Valor calculado
 */
export const calcularValorDesdePorcentaje = (porcentaje, total) => {
  return (porcentaje * total) / 100;
};

// Objeto con formateadores de moneda predefinidos
export const formatCurrency = {
  CLP: (value) => formatearMonto(value),
  USD: (value) => formatearIndicador(value, 'USD'),
  EUR: (value) => formatearIndicador(value, 'EUR'),
  INDICATOR: (value) => DECIMAL_FORMATTER.format(value)
};

// Exportación por defecto con todos los formateadores
export default {
  formatearMonto,
  parsearMonto,
  formatearIndicador,
  formatearNumero,
  formatearPorcentaje,
  calcularPorcentaje,
  calcularValorDesdePorcentaje,
  formatCurrency
};
