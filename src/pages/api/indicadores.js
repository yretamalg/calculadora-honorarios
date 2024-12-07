// src/pages/api/indicadores.js
import { SERIES_CODES, MOCK_DATA } from '../../components/calculadoras/indicadores/constants/indicadores';
import { getDateRange, getCurrentDate, isBusinessDay, getLastBusinessDay } from '../../components/calculadoras/indicadores/utils/dateUtils';

const API_USER = process.env.BANCO_CENTRAL_API_USER;
const API_PASS = process.env.BANCO_CENTRAL_API_PASS;
const API_BASE_URL = 'https://si3.bcentral.cl/SieteRestWS/SieteRestWS.ashx';

const buildApiUrl = (timeseries, firstdate, lastdate) => {
  const params = new URLSearchParams({
    user: API_USER,
    pass: API_PASS,
    firstdate,
    lastdate,
    timeseries,
    function: 'GetSeries'
  });

  return `${API_BASE_URL}?${params.toString()}`;
};

const fetchIndicator = async (code, indicadorType) => {
  try {
    const dates = getDateRange(indicadorType);
    const response = await fetch(buildApiUrl(code, dates.firstdate, dates.lastdate));
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (!data?.Series?.[0]?.Obs?.[0]) {
      throw new Error('No data available');
    }

    return {
      valor: parseFloat(data.Series[0].Obs[0].value),
      fecha: data.Series[0].Obs[0].DateTime
    };
  } catch (error) {
    console.error(`Error fetching ${code}:`, error);
    return null;
  }
};

const getCurrentMetadata = () => {
  const currentDate = getCurrentDate();
  const lastBusinessDay = getLastBusinessDay();
  const now = new Date();
  
  return {
    currentDate,
    lastBusinessDay,
    isBusinessDay: isBusinessDay(now),
    timestamp: now.toISOString()
  };
};

export async function GET() {
  try {
    const metadata = getCurrentMetadata();
    const results = {};

    // Procesar cada indicador
    const indicadores = [
      { key: 'UF', type: 'UF' },
      { key: 'DOLAR', type: 'default' },
      { key: 'EURO', type: 'default' },
      { key: 'UTM', type: 'UTM' }
    ];

    for (const { key, type } of indicadores) {
      const code = SERIES_CODES[key];
      const data = await fetchIndicator(code, type);

      results[key] = data || {
        ...MOCK_DATA[key],
        isMock: true
      };
    }

    const response = {
      _metadata: metadata,
      ...results
    };

    return new Response(JSON.stringify(response), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=300'
      }
    });

  } catch (error) {
    console.error('Error in indicadores endpoint:', error);
    
    const fallbackResponse = {
      _metadata: getCurrentMetadata(),
      ...MOCK_DATA
    };

    return new Response(JSON.stringify(fallbackResponse), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=300'
      }
    });
  }
}