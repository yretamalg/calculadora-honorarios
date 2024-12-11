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

const DECIMAL_FORMATTER_NO_DECIMALS = new Intl.NumberFormat(CHILE_LOCALE, {
  minimumFractionDigits: 0,
  maximumFractionDigits: 0
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
  
  // Remover todo excepto números, comas y puntos, y símbolos de moneda
  const textoLimpio = texto.replace(/[^0-9,.]/g, '');
  
  // Remover los puntos (separadores de miles)
  const sinPuntos = textoLimpio.replace(/\./g, '');
  
  // Reemplazar la coma decimal por punto para el parseFloat
  const numeroNormalizado = sinPuntos.replace(',', '.');
  
  // Convertir a número usando parseFloat en lugar de parseInt
  const numero = parseFloat(numeroNormalizado);
  
  return isNaN(numero) ? 0 : numero;
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
    const numero = Math.abs(valor);
    switch (tipo) {
      case 'CLP':
        return `$ ${DECIMAL_FORMATTER_NO_DECIMALS.format(numero)}`;
      case 'USD':
        return `US$ ${DECIMAL_FORMATTER.format(numero)}`;
      case 'EURO':
      case 'EUR':
        return `€ ${DECIMAL_FORMATTER.format(numero)}`;
      case 'UF':
        return `UF ${DECIMAL_FORMATTER.format(numero)}`;
      case 'UTM':
        return `UTM ${DECIMAL_FORMATTER_NO_DECIMALS.format(numero)}`;
      default:
        return `$ ${DECIMAL_FORMATTER_NO_DECIMALS.format(numero)}`;
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
  CLP: (value) => `$ ${DECIMAL_FORMATTER_NO_DECIMALS.format(value)}`,
  USD: (value) => `US$ ${DECIMAL_FORMATTER.format(value)}`,
  EUR: (value) => `€ ${DECIMAL_FORMATTER.format(value)}`,
  UF: (value) => `UF ${DECIMAL_FORMATTER.format(value)}`,
  UTM: (value) => `UTM ${DECIMAL_FORMATTER_NO_DECIMALS.format(value)}`,
  INDICATOR: (value, tipo) => {
    if (tipo === 'UTM') {
      return `UTM ${DECIMAL_FORMATTER_NO_DECIMALS.format(value)}`;
    } else if (tipo === 'UF') {
      return `UF ${DECIMAL_FORMATTER.format(value)}`;
    }
    return DECIMAL_FORMATTER.format(value);
  }
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