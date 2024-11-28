export const formatearMonto = (numero) => {
    if (typeof numero !== 'number' || isNaN(numero)) return '$ 0';
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
      maximumFractionDigits: 0
    }).format(numero);
  };
  
  export const parsearMonto = (texto) => {
    if (!texto) return 0;
    return parseFloat(texto.replace(/[^\d]/g, '')) || 0;
  };
  
  export const formatearPorcentaje = (numero) => {
    return `${numero.toFixed(2)}%`;
  };