export const TASAS_RETENCION = [
    { valor: 13.75, etiqueta: '13,75% (año 2024)', año: 2024 },
    { valor: 14.50, etiqueta: '14,50% (año 2025)', año: 2025 },
    { valor: 15.25, etiqueta: '15,25% (año 2026)', año: 2026 },
    { valor: 16.00, etiqueta: '16,00% (año 2027)', año: 2027 },
    { valor: 17.00, etiqueta: '17,00% (año 2028)', año: 2028 }
  ];
  
  export const LIMITES = {
    MIN_MONTO: 0,
    MAX_MONTO: 999999999999
  };
  
  export const APP_CONFIG = {
    nombre: 'vBox Pro',
    version: '1.1.8',
    domain: 'https://www.vbox.pro'
  };
  
  export const formatearMonto = (numero) => {
    if (typeof numero !== 'number' || isNaN(numero)) return 'CLP 0';
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
      maximumFractionDigits: 0
    }).format(numero);
  };
  
  export const parsearMonto = (texto) => {
    if (!texto) return 0;
    const numero = parseFloat(texto.replace(/[^\d,-]/g, ''));
    if (isNaN(numero) || numero < LIMITES.MIN_MONTO) return 0;
    if (numero > LIMITES.MAX_MONTO) return LIMITES.MAX_MONTO;
    return numero;
  };