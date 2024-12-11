import { SERIES_CODES } from '../constants/mockindicadores';
import { getDateRange, getChileDateTime, isBusinessDay } from '../utils/dateUtils';

const API_BASE_URL = 'https://si3.bcentral.cl/SieteRestWS/SieteRestWS.ashx';

export async function fetchIndicadores(credentials) {
  try {
    const metadata = getMetadata();
    const { firstdate, lastdate } = getDateRange();

    const promises = Object.entries(SERIES_CODES).map(([key, seriesCode]) => 
      fetchSeries(seriesCode, firstdate, lastdate, credentials)
        .then(data => [key, processSeriesData(data)])
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
      _metadata: getMetadata()
    };
  }
}

async function fetchSeries(seriesCode, firstdate, lastdate, credentials) {
  const params = new URLSearchParams({
    user: credentials.user,
    pass: credentials.pass,
    firstdate,
    lastdate,
    timeseries: seriesCode,
    function: 'GetSeries'
  });

  const response = await fetch(`${API_BASE_URL}?${params}`);
  if (!response.ok) {
    throw new Error(`Error fetching series ${seriesCode}`);
  }

  return response.json();
}

function processSeriesData(data) {
  if (!data?.Series?.[0]?.Obs?.[0]) {
    throw new Error('Invalid series data format');
  }

  const observation = data.Series[0].Obs[0];
  return {
    valor: parseFloat(observation.value) || null,
    fecha: observation.DateTime || null
  };
}

function getMetadata() {
  const chileDate = new Date(getChileDateTime());
  return {
    currentDate: chileDate.toISOString().split('T')[0],
    lastUpdate: chileDate.toLocaleString('es-CL', { timeZone: 'America/Santiago' }),
    isBusinessDay: isBusinessDay(chileDate),
    chileTime: chileDate.toLocaleTimeString('es-CL', { timeZone: 'America/Santiago' })
  };
}