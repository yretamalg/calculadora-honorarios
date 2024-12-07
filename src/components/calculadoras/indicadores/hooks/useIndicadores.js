import { useState, useEffect } from 'react';
import { CACHE_DURATION, MOCK_DATA } from '../constants/indicadores';

export const useIndicadores = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdate, setLastUpdate] = useState(null);

  const getCachedData = () => {
    try {
      const cached = localStorage.getItem('indicadores_cache');
      if (!cached) return null;

      const { data, timestamp } = JSON.parse(cached);
      const now = Date.now();
      const cacheAge = now - timestamp;

      if (cacheAge > CACHE_DURATION) {
        localStorage.removeItem('indicadores_cache');
        return null;
      }

      return { data, timestamp };
    } catch (error) {
      console.error('Error reading cache:', error);
      localStorage.removeItem('indicadores_cache');
      return null;
    }
  };

  const cacheData = (data) => {
    try {
      localStorage.setItem('indicadores_cache', JSON.stringify({
        data,
        timestamp: Date.now()
      }));
    } catch (error) {
      console.error('Error caching data:', error);
    }
  };

  const fetchIndicadores = async () => {
    try {
      setLoading(true);
      setError(null);

      // Intentar obtener datos del caché primero
      const cachedData = getCachedData();
      if (cachedData) {
        setData(cachedData.data);
        setLastUpdate(new Date(cachedData.timestamp));
        setLoading(false);
        return;
      }

      // En desarrollo, usar datos de ejemplo
      if (import.meta.env.DEV) {
        setData(MOCK_DATA);
        setLastUpdate(new Date());
        cacheData(MOCK_DATA);
        setLoading(false);
        return;
      }

      // Si no hay caché, hacer la petición
      const response = await fetch('/api/indicadores');
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Error al obtener los indicadores');
      }

      setData(result);
      setLastUpdate(new Date());
      cacheData(result);
    } catch (err) {
      console.error('Error fetching indicadores:', err);
      setError(err.message);
      
      // Si hay un error, usar datos de ejemplo como fallback
      if (!data) {
        setData(MOCK_DATA);
        setLastUpdate(new Date());
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIndicadores();
    
    const interval = setInterval(fetchIndicadores, CACHE_DURATION);
    return () => clearInterval(interval);
  }, []);

  const refresh = () => {
    localStorage.removeItem('indicadores_cache');
    return fetchIndicadores();
  };

  return {
    data,
    loading,
    error,
    lastUpdate,
    refresh
  };
};