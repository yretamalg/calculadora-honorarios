export const formatearMoneda = (numero, tipo = 'CLP') => {
  if (!numero && numero !== 0) return '-';

  const opciones = {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2
  };

  if (tipo === 'CLP') {
    return `$ ${Intl.NumberFormat('es-CL', opciones).format(numero)}`;
  }
  
  return Intl.NumberFormat('es-CL', opciones).format(numero);
};

export const parsearMonto = (texto) => {
  if (!texto) return 0;
  
  // Remover el símbolo de peso y espacios
  let valor = texto.replace(/[$\s]/g, '');
  
  // Reemplazar puntos por nada (separadores de miles)
  valor = valor.replace(/\./g, '');
  
  // Reemplazar coma por punto para decimales
  valor = valor.replace(',', '.');
  
  // Convertir a número
  return parseFloat(valor) || 0;
};