const CHILE_TZ = 'America/Santiago';

export const getChileDateTime = () => {
  try {
    return new Date().toLocaleString('es-CL', { timeZone: CHILE_TZ });
  } catch (error) {
    console.error('Error getting Chile datetime:', error);
    return new Date().toISOString();
  }
};

export const formatDate = (date) => {
  if (!date) return '';
  
  try {
    return new Date(date).toLocaleDateString('es-CL', {
      timeZone: CHILE_TZ,
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  } catch (error) {
    console.error('Error formatting date:', error);
    return date.toString();
  }
};

export const isBusinessDay = (date) => {
  if (!date) return false;
  try {
    const chileDate = new Date(date.toLocaleString('en-US', { timeZone: CHILE_TZ }));
    const day = chileDate.getDay();
    return day !== 0 && day !== 6; // 0 = Domingo, 6 = Sábado
  } catch (error) {
    console.error('Error checking business day:', error);
    return false;
  }
};

export const getLastBusinessDay = () => {
  try {
    const chileDate = new Date(getChileDateTime());
    chileDate.setHours(0, 0, 0, 0);
    
    while (!isBusinessDay(chileDate)) {
      chileDate.setDate(chileDate.getDate() - 1);
    }
    
    return chileDate.toISOString().split('T')[0];
  } catch (error) {
    console.error('Error getting last business day:', error);
    const today = new Date();
    return today.toISOString().split('T')[0];
  }
};

export const getCurrentDate = () => {
  try {
    const chileDate = new Date(getChileDateTime());
    chileDate.setHours(0, 0, 0, 0);
    return chileDate.toISOString().split('T')[0];
  } catch (error) {
    console.error('Error getting current date:', error);
    return new Date().toISOString().split('T')[0];
  }
};

export const getDateRange = (indicadorType = 'default') => {
  try {
    const today = getCurrentDate();
    
    switch (indicadorType) {
      case 'UF':
        // UF siempre usa el día actual, tanto para firstdate como lastdate
        return { firstdate: today, lastdate: today };
        
      case 'UTM':
        // UTM usa el primer día del mes
        const chileDate = new Date(getChileDateTime());
        chileDate.setDate(1);
        const firstDayStr = chileDate.toISOString().split('T')[0];
        return { firstdate: firstDayStr, lastdate: firstDayStr };
        
      default:
        // Dólar y Euro usan el último día hábil
        const lastBusinessDay = getLastBusinessDay();
        return { firstdate: lastBusinessDay, lastdate: lastBusinessDay };
    }
  } catch (error) {
    console.error('Error getting date range:', error);
    const today = new Date().toISOString().split('T')[0];
    return { firstdate: today, lastdate: today };
  }
};

export const getUpdateMessage = (fecha, tipo) => {
  if (!fecha) return 'Fecha no disponible';
  
  try {
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
  } catch (error) {
    console.error('Error getting update message:', error);
    return 'Fecha no disponible';
  }
};