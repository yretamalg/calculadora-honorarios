// src/components/calculadoras/indicadores/services/indicadoresService.js

import { SERIES_CODES } from '../constants/indicadores';
import { getDateRange } from '../utils/dateUtils';

class IndicadoresService {
  constructor() {
    this.baseUrl = 'https://si3.bcentral.cl/SieteRestWS/SieteRestWS.ashx';
    this.credentials = {
      user: import.meta.env.BANCO_CENTRAL_API_USER,
      pass: import.meta.env.BANCO_CENTRAL_API_PASS
    };
  }

  async getIndicadores() {
    try {
      // Obtener rango de fechas (hoy o último día hábil)
      const { firstdate, lastdate } = getDateRange();

      // Hacer las peticiones en paralelo para cada indicador
      const promises = Object.entries(SERIES_CODES).map(([key, seriesCode]) => 
        this.fetchSeries(seriesCode, firstdate, lastdate)
          .then(data => [key, this.processSeriesData(data)])
      );

      const results = await Promise.all(promises);
      return Object.fromEntries(results);
    } catch (error) {
      console.error('Error fetching indicators:', error);
      throw error;
    }
  }

  async fetchSeries(seriesCode, firstdate, lastdate) {
    const params = new URLSearchParams({
      user: this.credentials.user,
      pass: this.credentials.pass,
      firstdate,
      lastdate,
      timeseries: seriesCode,
      function: 'GetSeries'
    });

    const response = await fetch(`${this.baseUrl}?${params}`);
    if (!response.ok) {
      throw new Error(`Error fetching series ${seriesCode}`);
    }

    return response.json();
  }

  processSeriesData(data) {
    if (!data?.Series?.[0]?.Obs?.[0]) {
      throw new Error('Invalid series data format');
    }

    const observation = data.Series[0].Obs[0];
    return {
      valor: parseFloat(observation.value),
      fecha: observation.DateTime
    };
  }
}

export default new IndicadoresService();