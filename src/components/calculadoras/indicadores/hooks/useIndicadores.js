import { useState, useEffect } from 'react';
import { MOCK_DATA } from '../constants/indicadores';

export const useIndicadores = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdate, setLastUpdate] = useState(null);

  const fetchIndicadores = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch('/api/indicadores');
      
      if (!response.ok) {
        const errorData = await response.json();
        console.error('API Error Response:', errorData);
        
        if (import.meta.env.DEV) {
          console.log('Using mock data in development');
          setData(MOCK_DATA);
          setLastUpdate(new Date());
          return;
        }
        
        throw new Error(errorData.details || 'Error al obtener indicadores');
      }

      const result = await response.json();
      console.log('API Success Response:', result);

      setData(result);
      setLastUpdate(new Date());

    } catch (err) {
      console.error('Error in useIndicadores:', err);
      setError(err.message);
      
      // En desarrollo, usar datos mock como fallback
      if (import.meta.env.DEV) {
        console.warn('Using mock data after error in development');
        setData(MOCK_DATA);
        setLastUpdate(new Date());
      }
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

  const refresh = () => fetchIndicadores();

  return {
    data,
    loading,
    error,
    lastUpdate,
    refresh
  };
};