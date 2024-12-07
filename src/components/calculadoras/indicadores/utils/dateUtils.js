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
  
  return date.toISOString().split('T')[0];
};

export const getCurrentDate = () => {
  const date = new Date();
  date.setHours(0, 0, 0, 0);
  return date.toISOString().split('T')[0];
};

export const getDateRange = (indicadorType = 'default') => {
  const today = getCurrentDate();
  const lastBusinessDay = getLastBusinessDay();

  switch (indicadorType) {
    case 'UF':
      // UF siempre usa la fecha actual
      return {
        firstdate: today,
        lastdate: today
      };
      
    case 'UTM':
      // UTM usa el primer día del mes
      const firstDayOfMonth = new Date();
      firstDayOfMonth.setDate(1);
      const firstDayStr = firstDayOfMonth.toISOString().split('T')[0];
      return {
        firstdate: firstDayStr,
        lastdate: firstDayStr
      };
      
    default:
      // Dólar y Euro usan el último día hábil
      return {
        firstdate: lastBusinessDay,
        lastdate: lastBusinessDay
      };
  }
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
  const today = new Date();
  
  // Establecer horas en 0 para comparar solo fechas
  fechaIndicador.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);
  
  // Para UTM
  if (tipo === 'UTM') {
    return `Valor para ${fechaIndicador.toLocaleDateString('es-CL', { 
      month: 'long', 
      year: 'numeric' 
    })}`;
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