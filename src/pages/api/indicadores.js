import { SERIES_CODES } from '../../components/calculadoras/indicadores/constants/indicadores';
import { getDateRange } from '../../components/calculadoras/indicadores/utils/dateUtils';

const API_BASE_URL = 'https://si3.bcentral.cl/SieteRestWS/SieteRestWS.ashx';

export async function GET() {
  try {
    const { firstdate, lastdate } = getDateRange();

    const promises = Object.entries(SERIES_CODES).map(async ([key, seriesCode]) => {
      const params = new URLSearchParams({
        user: process.env.BANCO_CENTRAL_API_USER,
        pass: process.env.BANCO_CENTRAL_API_PASS,
        firstdate,
        lastdate,
        timeseries: seriesCode,
        function: 'GetSeries'
      });

      const response = await fetch(`${API_BASE_URL}?${params}`);
      if (!response.ok) {
        throw new Error(`Error fetching ${key}`);
      }

      const data = await response.json();
      if (!data?.Series?.[0]?.Obs?.[0]) {
        throw new Error(`Invalid data for ${key}`);
      }

      return [key, {
        valor: parseFloat(data.Series[0].Obs[0].value),
        fecha: data.Series[0].Obs[0].DateTime
      }];
    });

    const results = await Promise.all(promises);
    const indicators = Object.fromEntries(results);

    return new Response(JSON.stringify(indicators), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=3600'
      }
    });
  } catch (error) {
    console.error('Error fetching indicators:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}