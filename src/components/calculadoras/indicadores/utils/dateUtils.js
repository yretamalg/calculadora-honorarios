// src/utils/dateUtils.js

const CHILE_TZ = 'America/Santiago';

export const getChileDateTime = () => {
  return new Date().toLocaleString('es-CL', { timeZone: CHILE_TZ });
};

export const getChileDate = () => {
  return new Date().toLocaleDateString('es-CL', { timeZone: CHILE_TZ });
};

export const isBusinessDay = (date) => {
  // Convertir la fecha a zona horaria de Chile
  const chileDate = new Date(date.toLocaleString('en-US', { timeZone: CHILE_TZ }));
  const day = chileDate.getDay();
  return day !== 0 && day !== 6; // 0 = Domingo, 6 = Sábado
};

export const getLastBusinessDay = () => {
  // Obtener fecha actual en Chile
  const chileDate = new Date(getChileDateTime());
  chileDate.setHours(0, 0, 0, 0);
  
  while (!isBusinessDay(chileDate)) {
    chileDate.setDate(chileDate.getDate() - 1);
  }
  
  return chileDate.toISOString().split('T')[0];
};

export const getCurrentDate = () => {
  const chileDate = new Date(getChileDateTime());
  chileDate.setHours(0, 0, 0, 0);
  return chileDate.toISOString().split('T')[0];
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
      const chileDate = new Date(getChileDateTime());
      chileDate.setDate(1);
      const firstDayStr = chileDate.toISOString().split('T')[0];
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
    timeZone: CHILE_TZ,
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

export const getUpdateMessage = (fecha, tipo) => {
  if (!fecha) return 'Fecha no disponible';
  
  const fechaIndicador = new Date(fecha);
  const chileDate = new Date(getChileDateTime());
  
  // Establecer horas en 0 para comparar solo fechas
  fechaIndicador.setHours(0, 0, 0, 0);
  chileDate.setHours(0, 0, 0, 0);
  
  // Para UTM
  if (tipo === 'UTM') {
    return `Valor para ${fechaIndicador.toLocaleDateString('es-CL', { 
      timeZone: CHILE_TZ,
      month: 'long', 
      year: 'numeric' 
    })}`;
  }
  
  // Para UF
  if (tipo === 'UF') {
    if (fechaIndicador.getTime() === chileDate.getTime()) {
      return 'Valor de hoy';
    }
    return `Valor para ${formatDate(fecha)}`;
  }
  
  // Para dólar y euro
  if (!isBusinessDay(chileDate)) {
    return `Último valor disponible (${formatDate(fecha)})`;
  }
  
  if (fechaIndicador.getTime() === chileDate.getTime()) {
    return 'Valor de hoy';
  }
  
  return `Valor del ${formatDate(fecha)}`;
};