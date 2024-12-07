/**
 * Utilidades para el manejo de fechas en el contexto de los indicadores
 */

// Obtener la fecha actual en formato YYYY-MM-DD
export const getCurrentDate = () => {
    return new Date().toISOString().split('T')[0];
  };
  
  // Formatear fecha para display
  export const formatDate = (date) => {
    return new Intl.DateTimeFormat('es-CL', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(new Date(date));
  };
  
  // Formatear fecha y hora para display
  export const formatDateTime = (date) => {
    return new Intl.DateTimeFormat('es-CL', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(new Date(date));
  };
  
  // Verificar si una fecha es día hábil
  export const isBusinessDay = (date) => {
    const day = new Date(date).getDay();
    return day !== 0 && day !== 6; // 0 = Domingo, 6 = Sábado
  };
  
  // Obtener el último día hábil
  export const getLastBusinessDay = () => {
    let date = new Date();
    while (!isBusinessDay(date)) {
      date.setDate(date.getDate() - 1);
    }
    return date.toISOString().split('T')[0];
  };
  
  // Obtener rango de fechas para la API
  export const getDateRange = () => {
    const today = getCurrentDate();
    const lastBusinessDay = getLastBusinessDay();
    
    return {
      firstdate: lastBusinessDay,
      lastdate: today
    };
  };
  
  // Validar si los indicadores están actualizados
  export const isIndicadorActualizado = (fechaIndicador) => {
    if (!fechaIndicador) return false;
  
    const fechaActual = new Date();
    const fecha = new Date(fechaIndicador);
  
    // Si es el mismo día
    if (fecha.toISOString().split('T')[0] === fechaActual.toISOString().split('T')[0]) {
      return true;
    }
  
    // Si es día no hábil, verificar que sea el último día hábil
    if (!isBusinessDay(fechaActual)) {
      const ultimoDiaHabil = getLastBusinessDay();
      return fecha.toISOString().split('T')[0] === ultimoDiaHabil;
    }
  
    return false;
  };