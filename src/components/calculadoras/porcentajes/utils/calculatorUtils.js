export const parseChileanNumber = (value) => {
  if (!value) return 0;
  if (typeof value === 'number') return value;
  
  try {
    // Limpia el string, manteniendo números, punto, coma y signo negativo
    const cleanValue = value.toString()
      .replace(/[^\d.,\-]/g, '')
      .replace(/\./g, '')
      .replace(',', '.');

    const number = parseFloat(cleanValue);
    
    // Si el valor es un número entero (no tiene decimales), redondear
    if (Number.isInteger(number)) {
      return number;
    }
    
    return isNaN(number) ? 0 : number;
  } catch (error) {
    console.error('Error parsing number:', error);
    return 0;
  }
};

export const formatChileanNumber = (number) => {
  if (typeof number !== 'number') {
    number = parseChileanNumber(number);
  }

  try {
    // Si es un número entero, no mostrar decimales
    if (Number.isInteger(number)) {
      return number.toLocaleString('es-CL', {
        maximumFractionDigits: 0
      });
    }

    // Si tiene decimales, mostrar dos decimales
    return number.toLocaleString('es-CL', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  } catch (error) {
    console.error('Error formatting number:', error);
    return '0';
  }
};