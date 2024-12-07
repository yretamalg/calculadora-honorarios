// src/components/calculadoras/indicadores/utils/dateUtils.js

export const isBusinessDay = (date) => {
  const day = date.getDay();
  return day !== 0 && day !== 6; // 0 = Domingo, 6 = Sábado
};

export const getLastBusinessDay = () => {
  let date = new Date();
  date.setHours(0, 0, 0, 0);
  
  while (!isBusinessDay(date)) {
    date.setDate(date.getDate() - 1);
  }
  return date;
};

export const getDateRange = (seriesCode) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  // Para la UF, usar siempre la fecha actual
  if (seriesCode.includes('UFF')) {
    return {
      firstdate: today.toISOString().split('T')[0],
      lastdate: today.toISOString().split('T')[0]
    };
  }
  
  // Para UTM, usar el primer día del mes actual
  if (seriesCode.includes('UTR')) {
    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    return {
      firstdate: firstDayOfMonth.toISOString().split('T')[0],
      lastdate: firstDayOfMonth.toISOString().split('T')[0]
    };
  }
  
  // Para dólar y euro, usar el último día hábil
  const lastBusinessDay = getLastBusinessDay();
  return {
    firstdate: lastBusinessDay.toISOString().split('T')[0],
    lastdate: lastBusinessDay.toISOString().split('T')[0]
  };
};

export const formatDate = (date) => {
  if (!date) return '';
  return new Date(date).toLocaleDateString('es-CL', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

export const getUpdateMessage = (fecha, tipo) => {
  if (!fecha) return 'Fecha no disponible';
  
  const fechaIndicador = new Date(fecha);
  fechaIndicador.setHours(0, 0, 0, 0);
  
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  // Para UTM
  if (tipo === 'UTM') {
    return `Valor para ${fechaIndicador.toLocaleDateString('es-CL', { month: 'long', year: 'numeric' })}`;
  }
  
  // Para UF
  if (tipo === 'UF') {
    if (fechaIndicador.getTime() === today.getTime()) {
      return 'Valor de hoy';
    }
    return `Valor para ${formatDate(fecha)}`;
  }
  
  // Para dólar y euro
  if (!isBusinessDay(today)) {
    return `Último valor disponible (${formatDate(fecha)})`;
  }
  
  if (fechaIndicador.getTime() === today.getTime()) {
    return 'Valor de hoy';
  }
  return `Valor del ${formatDate(fecha)}`;
};