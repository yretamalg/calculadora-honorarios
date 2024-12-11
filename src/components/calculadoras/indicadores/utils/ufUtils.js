// src/utils/ufUtils.js

const HORA_ACTUALIZACION_UF = 18; // 18:00 hrs Chile

export const obtenerUFValida = (indicadores, fechaHoraChile) => {
  if (!indicadores?.UF || !fechaHoraChile) {
    return null;
  }

  try {
    const horaChile = fechaHoraChile.getHours();
    const fechaUF = new Date(indicadores.UF.fecha);
    const fechaActualChile = new Date(fechaHoraChile);
    
    // Resetear las horas para comparar solo fechas
    fechaUF.setHours(0, 0, 0, 0);
    fechaActualChile.setHours(0, 0, 0, 0);

    // Si es después de las 18:00, debemos mostrar la UF del día siguiente
    if (horaChile >= HORA_ACTUALIZACION_UF) {
      // Si la fecha de la UF es igual a la fecha actual, es correcta
      if (fechaUF.getTime() > fechaActualChile.getTime()) {
        return indicadores.UF;
      }
      return null; // Necesitamos la UF del día siguiente
    }
    
    // Si es antes de las 18:00, debemos mostrar la UF del día actual
    if (fechaUF.getTime() === fechaActualChile.getTime()) {
      return indicadores.UF;
    }
    return null; // La UF no corresponde al día actual
  } catch (error) {
    console.error('Error al validar UF:', error);
    return null;
  }
};

export const mostrarUFSiguiente = (horaChile) => {
  return horaChile >= HORA_ACTUALIZACION_UF;
};