// src/components/calculadoras/indicadores/utils/ufUtils.js

export const obtenerUFValida = (indicadores, fechaHoraChile) => {
  if (!indicadores?.UF || !fechaHoraChile) {
    return null;
  }

  try {
    const fechaUF = new Date(indicadores.UF.fecha);
    const fechaActualChile = new Date(fechaHoraChile);
    
    // Resetear las horas para comparar solo fechas
    fechaUF.setHours(0, 0, 0, 0);
    fechaActualChile.setHours(0, 0, 0, 0);

    // La UF es válida si corresponde a la fecha actual
    if (fechaUF.getTime() === fechaActualChile.getTime()) {
      return indicadores.UF;
    }
    
    return null; // La UF no corresponde al día actual
  } catch (error) {
    console.error('Error al validar UF:', error);
    return null;
  }
};

export const mostrarUFSiguiente = (fechaHoraChile) => {
  if (!fechaHoraChile) return false;
  
  // Obtener solo la fecha (sin hora) de la UF
  const fechaActualChile = new Date(fechaHoraChile);
  fechaActualChile.setHours(0, 0, 0, 0);
  
  // Si la fecha de la UF es mayor que la fecha actual, es la UF de mañana
  return false; // Por defecto, no mostrar indicador de "mañana"
};