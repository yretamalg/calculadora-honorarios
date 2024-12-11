// src/pages/api/indicadores.js
import { MOCK_DATA } from '@/features/indicadores/constants/mockindicadores';

const SERIES_CODES = {
  UF: 'F073.UFF.PRE.Z.D',
  DOLAR: 'F073.TCO.PRE.Z.D',
  EURO: 'F072.CLP.EUR.N.O.D',
  UTM: 'F073.UTR.PRE.Z.M'
};

const API_BASE_URL = 'https://si3.bcentral.cl/SieteRestWS/SieteRestWS.ashx';

const getCredentials = () => {
  if (process.env.BANCO_CENTRAL_API_USER && process.env.BANCO_CENTRAL_API_PASS) {
    return {
      user: process.env.BANCO_CENTRAL_API_USER,
      pass: process.env.BANCO_CENTRAL_API_PASS
    };
  }
  
  return {
    user: import.meta.env.PUBLIC_BANCO_CENTRAL_API_USER,
    pass: import.meta.env.PUBLIC_BANCO_CENTRAL_API_PASS
  };
};

const getDates = () => {
  const now = new Date();
  const chileDate = new Date(now.toLocaleString('en-US', { timeZone: 'America/Santiago' }));
  const isWeekend = chileDate.getDay() === 0 || chileDate.getDay() === 6;
  
  const firstDayOfMonth = new Date(chileDate.getFullYear(), chileDate.getMonth(), 1);
  
  let currentDate = new Date(chileDate);
  if (isWeekend) {
    currentDate.setDate(currentDate.getDate() - (currentDate.getDay() === 0 ? 2 : 1));
  }

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  return {
    currentDate: formatDate(currentDate),
    firstDayOfMonth: formatDate(firstDayOfMonth),
    isWeekend,
    chileTime: chileDate.toLocaleString('es-CL', { timeZone: 'America/Santiago' })
  };
};

const fetchFromAPI = async (url) => {
  try {
    const logUrl = url.replace(/user=.*?&pass=.*?&/, 'user=***&pass=***&');
    console.log('Fetching from URL:', logUrl);
    
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log('API Response structure:', {
      hasSeries: !!data?.Series,
      observationsCount: data?.Series?.[0]?.Obs?.length || 0
    });
    return data;
  } catch (error) {
    console.error('Error in fetchFromAPI:', error);
    throw error;
  }
};

const fetchDailyIndicator = async (code, date) => {
  try {
    const credentials = getCredentials();
    console.log(`Fetching indicator ${code} for date ${date}`);
    
    const params = new URLSearchParams({
      user: credentials.user,
      pass: credentials.pass,
      firstdate: date,
      lastdate: date,
      timeseries: code,
      function: 'GetSeries'
    });

    const data = await fetchFromAPI(`${API_BASE_URL}?${params}`);
    
    if (!data?.Series?.[0]?.Obs?.[0]) {
      console.error('Invalid data structure for', code, ':', data);
      throw new Error(`No data available for ${code}`);
    }

    return {
      valor: parseFloat(data.Series[0].Obs[0].value),
      fecha: data.Series[0].Obs[0].DateTime,
      descripcion: data.Series[0].descripEsp
    };
  } catch (error) {
    console.error(`Error fetching ${code}:`, error);
    return {
      valor: null,
      fecha: null,
      error: error.message
    };
  }
};

const fetchUTM = async (firstDayOfMonth) => {
  try {
    const credentials = getCredentials();
    console.log(`Fetching UTM for date ${firstDayOfMonth}`);
    
    const params = new URLSearchParams({
      user: credentials.user,
      pass: credentials.pass,
      firstdate: firstDayOfMonth,
      lastdate: firstDayOfMonth,
      timeseries: SERIES_CODES.UTM,
      function: 'GetSeries'
    });

    const data = await fetchFromAPI(`${API_BASE_URL}?${params}`);
    
    if (!data?.Series?.[0]?.Obs?.[0]) {
      console.error('Invalid UTM data structure:', data);
      throw new Error('No UTM data available');
    }

    return {
      valor: parseFloat(data.Series[0].Obs[0].value),
      fecha: data.Series[0].Obs[0].DateTime,
      descripcion: data.Series[0].descripEsp
    };
  } catch (error) {
    console.error('Error fetching UTM:', error);
    return {
      valor: null,
      fecha: null,
      error: error.message
    };
  }
};

export async function GET() {
  try {
    const credentials = getCredentials();
    console.log('Credentials configured:', !!credentials.user && !!credentials.pass);

    if (!credentials.user || !credentials.pass) {
      console.log('No credentials found, using mock data');
      return new Response(JSON.stringify({
        ...MOCK_DATA,
        _metadata: {
          isMock: true,
          timestamp: new Date().toISOString()
        }
      }), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache',
          'Access-Control-Allow-Origin': '*'
        }
      });
    }

    const { currentDate, firstDayOfMonth, isWeekend, chileTime } = getDates();
    console.log('Using dates:', { 
      currentDate, 
      firstDayOfMonth, 
      isWeekend,
      chileTime
    });
    
    const [uf, dolar, euro, utm] = await Promise.all([
      fetchDailyIndicator(SERIES_CODES.UF, currentDate),
      fetchDailyIndicator(SERIES_CODES.DOLAR, currentDate),
      fetchDailyIndicator(SERIES_CODES.EURO, currentDate),
      fetchUTM(firstDayOfMonth)
    ]);

    const hasErrors = [uf, dolar, euro, utm].some(ind => ind.error);
    if (hasErrors) {
      console.log('Some indicators failed, using mock data');
      return new Response(JSON.stringify({
        ...MOCK_DATA,
        _metadata: {
          isMock: true,
          timestamp: new Date().toISOString(),
          errors: {
            uf: uf.error,
            dolar: dolar.error,
            euro: euro.error,
            utm: utm.error
          }
        }
      }), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache',
          'Access-Control-Allow-Origin': '*'
        }
      });
    }

    const response = {
      _metadata: {
        timestamp: new Date().toISOString(),
        isWeekend,
        date: currentDate,
        utmDate: firstDayOfMonth,
        chileTime,
        isMock: false
      },
      UF: uf,
      DOLAR: dolar,
      EURO: euro,
      UTM: utm
    };

    return new Response(JSON.stringify(response), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=300',
        'Access-Control-Allow-Origin': '*'
      }
    });

  } catch (error) {
    console.error('Error in indicadores endpoint:', error);
    
    return new Response(JSON.stringify({
      ...MOCK_DATA,
      _metadata: {
        error: true,
        errorMessage: error.message,
        timestamp: new Date().toISOString(),
        isMock: true
      }
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  }
}