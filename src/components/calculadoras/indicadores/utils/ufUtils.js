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
    return indicadores.UF;
  } catch (error) {
    console.error('Error al validar UF:', error);
    return null;
  }
};

export const mostrarUFSiguiente = () => {
  return false; // Nunca mostrar indicador de "mañana"
};