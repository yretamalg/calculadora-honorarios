// src/pages/api/indicadores.js
import { SERIES_CODES, MOCK_DATA } from '../../components/calculadoras/indicadores/constants/indicadores';
import { getDateRange, isBusinessDay } from '../../components/calculadoras/indicadores/utils/dateUtils';

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

const fetchIndicator = async (code, dates) => {
  try {
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
  const now = new Date();
  const currentDate = now.toISOString().split('T')[0];
  const isCurrentBusinessDay = isBusinessDay(now);
  const lastBusinessDate = getDateRange().firstdate;

  return {
    currentDate,
    lastBusinessDay: lastBusinessDate,
    isBusinessDay: isCurrentBusinessDay,
    timestamp: now.toISOString()
  };
};

export async function GET() {
  try {
    const metadata = getCurrentMetadata();
    const results = {};

    // Intentar obtener datos reales para cada indicador
    for (const [key, code] of Object.entries(SERIES_CODES)) {
      const dates = getDateRange(code);
      const data = await fetchIndicator(code, dates);

      if (data) {
        results[key] = data;
      } else {
        // Si no hay datos reales, usar datos de respaldo
        if (MOCK_DATA[key]) {
          results[key] = {
            ...MOCK_DATA[key],
            isMock: true
          };
        } else {
          throw new Error(`No hay datos disponibles para ${key}`);
        }
      }
    }

    // Agregar metadata a la respuesta
    const response = {
      _metadata: metadata,
      ...results
    };

    return new Response(JSON.stringify(response), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=300' // Cache por 5 minutos
      }
    });

  } catch (error) {
    console.error('Error in indicadores endpoint:', error);
    
    // Si hay un error, devolver los datos de respaldo completos
    const fallbackResponse = {
      _metadata: getCurrentMetadata(),
      ...MOCK_DATA
    };

    return new Response(JSON.stringify(fallbackResponse), {
      status: 200, // Devolvemos 200 con datos de respaldo en lugar de 500
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=300'
      }
    });
  }
}