// src/services/indicadoresService.js

import { SERIES_CODES } from '../constants/indicadores';
import { getDateRange, getChileDateTime, isBusinessDay } from '../utils/dateUtils';

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
      const metadata = this.getMetadata();
      const { firstdate, lastdate } = getDateRange();

      console.log(`Consultando indicadores desde ${firstdate} hasta ${lastdate}`);

      const promises = Object.entries(SERIES_CODES).map(([key, seriesCode]) =>
        this.fetchSeries(seriesCode, firstdate, lastdate)
          .then(data => [key, this.processSeriesData(data)])
          .catch(error => {
            console.error(`Error fetching ${key}:`, error);
            return [key, { valor: null, fecha: null }];
          })
      );

      const results = await Promise.all(promises);

      return {
        ...Object.fromEntries(results),
        _metadata: metadata
      };
    } catch (error) {
      console.error('Error fetching indicators:', error);

      return {
        UF: { valor: null, fecha: null },
        DOLAR: { valor: null, fecha: null },
        EURO: { valor: null, fecha: null },
        UTM: { valor: null, fecha: null },
        _metadata: this.getMetadata()
      };
    }
  }

  async fetchSeries(seriesCode, firstdate, lastdate) {
    try {
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

      const data = await response.json();
      console.log(`Datos recibidos para ${seriesCode}:`, data);
      return data;
    } catch (error) {
      console.error(`Error in fetchSeries for ${seriesCode}:`, error);
      throw error;
    }
  }

  processSeriesData(data) {
    try {
      if (!data?.Series?.[0]?.Obs?.[0]) {
        throw new Error('Invalid series data format');
      }

      const observation = data.Series[0].Obs[0];
      return {
        valor: parseFloat(observation.value) || null,
        fecha: observation.indexDateString || null
      };
    } catch (error) {
      console.error('Error processing series data:', error);
      return { valor: null, fecha: null };
    }
  }

  getMetadata() {
    try {
      const chileDate = new Date(getChileDateTime());
      return {
        currentDate: chileDate.toISOString().split('T')[0],
        lastUpdate: chileDate.toLocaleString('es-CL', { timeZone: 'America/Santiago' }),
        isBusinessDay: isBusinessDay(chileDate),
        chileTime: chileDate.toLocaleTimeString('es-CL', { timeZone: 'America/Santiago' })
      };
    } catch (error) {
      console.error('Error getting metadata:', error);
      const now = new Date();
      return {
        currentDate: now.toISOString().split('T')[0],
        lastUpdate: now.toISOString(),
        isBusinessDay: false,
        chileTime: now.toLocaleTimeString()
      };
    }
  }
}

export default new IndicadoresService();
