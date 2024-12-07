import { useState, useEffect } from 'react';

export const useIndicadores = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdate, setLastUpdate] = useState(null);

  const fetchIndicadores = async () => {
    try {
      setLoading(true);
      const response = await fetch('/.netlify/functions/indicadores');
      if (!response.ok) throw new Error('Error fetching data');
      
      const result = await response.json();
      setData(result);
      setLastUpdate(new Date());
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIndicadores();
    
    // Actualizar cada hora
    const interval = setInterval(fetchIndicadores, 3600000);
    return () => clearInterval(interval);
  }, []);

  const refresh = () => {
    fetchIndicadores();
  };

  return {
    data,
    loading,
    error,
    lastUpdate,
    refresh
  };
};