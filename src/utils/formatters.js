// src/utils/formatters.js

export const formatCurrency = {
  CLP: (value) => {
    if (!value && value !== 0) return '$ 0';
    return `$ ${Math.round(value).toLocaleString('es-CL')}`;
  },

  USD: (value) => {
    if (!value && value !== 0) return 'US$ 0,00';
    return `US$ ${value.toLocaleString('es-CL', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })}`;
  },

  EUR: (value) => {
    if (!value && value !== 0) return '€ 0,00';
    return `€ ${value.toLocaleString('es-CL', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })}`;
  },

  INDICATOR: (value) => {
    if (!value && value !== 0) return '0,00';
    return value.toLocaleString('es-CL', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  }
};