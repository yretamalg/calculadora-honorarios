// src/components/calculadoras/porcentajes/utils/numberUtils.js
export const formatNumber = (number) => {
    const parsed = parseFloat(number);
    if (isNaN(parsed)) return '0';
    
    // Determinar si el número es entero
    const isInteger = Number.isInteger(parsed);
    
    // Formatear con separadores de miles y decimales según sea necesario
    const formatted = new Intl.NumberFormat('es-CL', {
      minimumFractionDigits: isInteger ? 0 : 2,
      maximumFractionDigits: isInteger ? 0 : 2
    }).format(parsed);
    
    return formatted;
  };
  
  export const calcularPorcentaje = (porcentaje, numero) => {
    const p = parseFloat(porcentaje);
    const n = parseFloat(numero);
    if (isNaN(p) || isNaN(n)) return 0;
    return (p * n) / 100;
  };
  
  // Otras funciones de cálculo comunes
  export const calcularTotal = (parte, porcentaje) => {
    const p = parseFloat(parte);
    const perc = parseFloat(porcentaje);
    if (isNaN(p) || isNaN(perc) || perc === 0) return 0;
    return (p * 100) / perc;
  };
  
  export const calcularVariacionPorcentual = (inicial, final) => {
    const i = parseFloat(inicial);
    const f = parseFloat(final);
    if (isNaN(i) || isNaN(f) || i === 0) return 0;
    return ((f - i) / i) * 100;
  };