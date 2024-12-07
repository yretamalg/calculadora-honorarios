import { useState, useEffect } from 'react';

export const useIndicadores = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdate, setLastUpdate] = useState(null);
  const [metadata, setMetadata] = useState(null);

  const fetchIndicadores = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch('/api/indicadores');
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Error al obtener indicadores');
      }

      // Extraer metadata y datos
      const { _metadata, ...indicatorsData } = result;

      setMetadata(_metadata);
      setData(indicatorsData);
      setLastUpdate(new Date());
      setError(null);

    } catch (err) {
      console.error('Error fetching indicadores:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIndicadores();
    
    // Actualizar cada 5 minutos
    const interval = setInterval(fetchIndicadores, 300000);
    return () => clearInterval(interval);
  }, []);

  // Helper para verificar si un indicador está actualizado
  const isIndicadorActualizado = (fecha, tipo) => {
    if (!metadata) return true;
    
    const fechaIndicador = new Date(fecha).toISOString().split('T')[0];
    const { currentDate, lastBusinessDay, isBusinessDay } = metadata;

    if (tipo === 'UF' || tipo === 'UTM') {
      return fechaIndicador === currentDate;
    }

    return isBusinessDay 
      ? fechaIndicador === currentDate 
      : fechaIndicador === lastBusinessDay;
  };

  return {
    data,
    loading,
    error,
    lastUpdate,
    metadata,
    isIndicadorActualizado,
    refresh: fetchIndicadores
  };
};