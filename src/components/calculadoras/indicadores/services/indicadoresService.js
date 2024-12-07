/**
 * Servicio para manejar las llamadas a la API de indicadores
 */

const CACHE_KEY = 'indicadores_cache';
const CACHE_DURATION = 3600000; // 1 hora en milisegundos

class IndicadoresService {
    constructor() {
      this.baseUrl = import.meta.env.DEV 
        ? 'http://localhost:3001/api/indicadores'
        : '/.netlify/functions/indicadores';
    }
  
    async getIndicadores() {
      try {
        // Intentar obtener del cache primero
        const cachedData = this.getFromCache();
        if (cachedData) {
          return cachedData;
        }
  
        const response = await fetch(this.baseUrl);
        if (!response.ok) {
          throw new Error('Error fetching indicators');
        }
  
        const data = await response.json();
        
        // Guardar en cache
        this.saveToCache(data);
        
        return data;
      } catch (error) {
        console.error('Error in getIndicadores:', error);
        throw error;
      }
    }

  getFromCache() {
    try {
      const cached = localStorage.getItem(CACHE_KEY);
      if (!cached) return null;

      const { data, timestamp } = JSON.parse(cached);
      const now = Date.now();

      // Verificar si el cache expiró
      if (now - timestamp > CACHE_DURATION) {
        localStorage.removeItem(CACHE_KEY);
        return null;
      }

      return data;
    } catch (error) {
      console.error('Error reading from cache:', error);
      return null;
    }
  }

  saveToCache(data) {
    try {
      const cacheData = {
        data,
        timestamp: Date.now()
      };
      localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));
    } catch (error) {
      console.error('Error saving to cache:', error);
    }
  }

  // Convertir entre diferentes monedas/indicadores
  convertir(monto, desde, hacia, tasas) {
    if (!monto || !desde || !hacia || !tasas) {
      throw new Error('Parámetros inválidos para conversión');
    }

    // Si la conversión es a la misma moneda
    if (desde === hacia) {
      return monto;
    }

    // Convertir a CLP primero si es necesario
    let montoEnCLP = monto;
    if (desde !== 'CLP') {
      if (!tasas[desde]) {
        throw new Error(`Tasa no disponible para ${desde}`);
      }
      montoEnCLP = monto * tasas[desde].valor;
    }

    // Si el destino es CLP, ya tenemos el resultado
    if (hacia === 'CLP') {
      return montoEnCLP;
    }

    // Convertir de CLP a la moneda destino
    if (!tasas[hacia]) {
      throw new Error(`Tasa no disponible para ${hacia}`);
    }
    return montoEnCLP / tasas[hacia].valor;
  }
}

export default new IndicadoresService();