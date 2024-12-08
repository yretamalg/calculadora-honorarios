// src/components/calculadoras/indicadores/hooks/useIndicadores.js

import { useState, useEffect, useCallback } from 'react';

export const useIndicadores = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdate, setLastUpdate] = useState(null);
  const [retryCount, setRetryCount] = useState(0);
  const MAX_RETRIES = 3;

  const fetchIndicadores = useCallback(async (isRetry = false) => {
    try {
      setLoading(true);
      if (!isRetry) setError(null);

      const response = await fetch('/api/indicadores');
      const result = await response.json();

      // Verificar si hay un error en los metadatos
      if (result._metadata?.error) {
        throw new Error(result._metadata.errorMessage || 'Error al obtener indicadores');
      }

      // Verificar si hay datos válidos
      const hasValidData = Object.values(result).some(
        indicator => indicator?.valor !== null && indicator?.fecha !== null
      );

      if (!hasValidData) {
        throw new Error('No se obtuvieron datos válidos');
      }

      setData(result);
      setLastUpdate(new Date());
      setError(null);
      setRetryCount(0);

    } catch (err) {
      console.error('Error fetching indicadores:', err);
      setError(err.message);

      // Lógica de reintento
      if (retryCount < MAX_RETRIES) {
        setRetryCount(prev => prev + 1);
        setTimeout(() => {
          fetchIndicadores(true);
        }, 2000 * (retryCount + 1)); // Backoff exponencial
      }
    } finally {
      setLoading(false);
    }
  }, [retryCount]);

  useEffect(() => {
    fetchIndicadores();
    
    // Actualizar cada 5 minutos si no hay errores
    const interval = setInterval(() => {
      if (!error) fetchIndicadores();
    }, 300000);

    return () => clearInterval(interval);
  }, [fetchIndicadores, error]);

  const refresh = useCallback(() => {
    setRetryCount(0);
    return fetchIndicadores();
  }, [fetchIndicadores]);

  // Helper para verificar si un indicador está actualizado
  const isIndicadorActualizado = useCallback((fecha, tipo) => {
    if (!fecha) return false;
    
    const fechaIndicador = new Date(fecha);
    const hoy = new Date();
    
    // Para UTM, considerar actualizado si es del mes actual
    if (tipo === 'UTM') {
      return fechaIndicador.getMonth() === hoy.getMonth() &&
             fechaIndicador.getFullYear() === hoy.getFullYear();
    }
    
    // Para otros indicadores, verificar si es del día actual o último día hábil
    const diffDays = Math.floor((hoy - fechaIndicador) / (1000 * 60 * 60 * 24));
    return diffDays <= (hoy.getDay() === 0 || hoy.getDay() === 6 ? 3 : 1);
  }, []);

  return {
    data,
    loading,
    error,
    lastUpdate,
    refresh,
    isIndicadorActualizado,
    retryCount
  };
};