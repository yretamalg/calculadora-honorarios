/**
 * Utilidades para formateo de valores monetarios y números
 */

// Formatear montos según el tipo de indicador
export const formatearMonto = (valor, tipo = 'CLP') => {
    if (valor === null || valor === undefined || isNaN(valor)) {
      return '0';
    }
  
    const options = {
      maximumFractionDigits: 2,
      minimumFractionDigits: 2
    };
  
    switch (tipo) {
      case 'UF':
        return new Intl.NumberFormat('es-CL', {
          ...options,
          maximumFractionDigits: 4,
          minimumFractionDigits: 4
        }).format(valor);
  
      case 'UTM':
        return new Intl.NumberFormat('es-CL', {
          ...options,
          maximumFractionDigits: 0,
          minimumFractionDigits: 0
        }).format(valor);
  
      case 'CLP':
        return new Intl.NumberFormat('es-CL', {
          style: 'currency',
          currency: 'CLP',
          maximumFractionDigits: 0
        }).format(valor);
  
      case 'USD':
        return new Intl.NumberFormat('es-CL', {
          style: 'currency',
          currency: 'USD',
          ...options
        }).format(valor);
  
      case 'EUR':
        return new Intl.NumberFormat('es-CL', {
          style: 'currency',
          currency: 'EUR',
          ...options
        }).format(valor);
  
      default:
        return new Intl.NumberFormat('es-CL', options).format(valor);
    }
  };
  
  // Parsear un monto ingresado por el usuario
  export const parsearMonto = (texto) => {
    if (!texto) return 0;
    // Remover todo excepto números, punto y coma
    const limpio = texto.replace(/[^\d.,]/g, '');
    // Convertir coma a punto
    const conPunto = limpio.replace(',', '.');
    return parseFloat(conPunto) || 0;
  };
  
  // Formatear variación porcentual
  export const formatearVariacion = (valor) => {
    if (valor === null || valor === undefined || isNaN(valor)) {
      return '0%';
    }
  
    const numero = parseFloat(valor);
    const signo = numero > 0 ? '+' : '';
    return `${signo}${numero.toFixed(2)}%`;
  };
  
  // Formatear fecha para display en la UI
  export const formatearFecha = (fecha) => {
    if (!fecha) return '';
    
    return new Intl.DateTimeFormat('es-CL', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(new Date(fecha));
  };
  
  // Obtener el símbolo de la moneda según el tipo
  export const obtenerSimbolo = (tipo) => {
    switch (tipo) {
      case 'UF':
        return 'UF';
      case 'UTM':
        return 'UTM';
      case 'CLP':
        return '$';
      case 'USD':
        return 'US$';
      case 'EUR':
        return '€';
      default:
        return '';
    }
  };