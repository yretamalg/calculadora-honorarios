export const parseChileanNumber = (value) => {
  if (!value) return 0;
  if (typeof value === 'number') return value;
  
  try {
    const cleanValue = value.toString()
      .replace(/[^\d.,]/g, '')
      .replace(/\./g, '')
      .replace(',', '.');
      
    const number = parseFloat(cleanValue);
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
    if (Number.isInteger(number)) {
      return number.toLocaleString('es-CL', {
        maximumFractionDigits: 0
      });
    }

    return number.toLocaleString('es-CL', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  } catch (error) {
    console.error('Error formatting number:', error);
    return '0';
  }
};