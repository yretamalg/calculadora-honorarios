// netlify/functions/indicadores.js

const SERIES_CODES = {
  UF: 'F073.UFF.PRE.Z.D',
  DOLAR: 'F073.TCO.PRE.Z.D',
  EURO: 'F072.CLP.EUR.N.O.D',
  UTM: 'F073.UTR.PRE.Z.M'
};

const API_BASE_URL = 'https://si3.bcentral.cl/SieteRestWS/SieteRestWS.ashx';

// Función para obtener fechas relevantes
const getDates = () => {
  const today = new Date();
  const isWeekend = today.getDay() === 0 || today.getDay() === 6;
  
  // Para UTM: primer día del mes actual
  const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  
  // Si es fin de semana, usar el último día hábil
  if (isWeekend) {
    today.setDate(today.getDate() - (today.getDay() === 0 ? 2 : 1));
  }

  const formatDate = (date) => {
    return date.toISOString().split('T')[0];
  };

  return {
    today: formatDate(today),
    firstDayOfMonth: formatDate(firstDayOfMonth),
    isWeekend
  };
};

// Función genérica para obtener datos de la API
const fetchFromAPI = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching from API:', error);
    throw error;
  }
};

// Función específica para indicador diario (UF, Dólar, Euro)
const fetchDailyIndicator = async (code, date) => {
  const params = new URLSearchParams({
    user: process.env.BANCO_CENTRAL_API_USER,
    pass: process.env.BANCO_CENTRAL_API_PASS,
    firstdate: date,
    lastdate: date,
    timeseries: code,
    function: 'GetSeries'
  });

  const data = await fetchFromAPI(`${API_BASE_URL}?${params}`);
  
  if (!data.Series?.Obs?.[0]) {
    throw new Error(`No data available for ${code}`);
  }

  return {
    valor: parseFloat(data.Series.Obs[0].value),
    fecha: data.Series.Obs[0].indexDateString,
    descripcion: data.Series.descripEsp
  };
};

// Función específica para UTM
const fetchUTM = async (firstDayOfMonth) => {
  const params = new URLSearchParams({
    user: process.env.BANCO_CENTRAL_API_USER,
    pass: process.env.BANCO_CENTRAL_API_PASS,
    firstdate: firstDayOfMonth,
    lastdate: firstDayOfMonth,
    timeseries: SERIES_CODES.UTM,
    function: 'GetSeries'
  });

  const data = await fetchFromAPI(`${API_BASE_URL}?${params}`);
  
  if (!data.Series?.Obs?.[0]) {
    throw new Error('No UTM data available');
  }

  return {
    valor: parseFloat(data.Series.Obs[0].value),
    fecha: data.Series.Obs[0].indexDateString,
    descripcion: data.Series.descripEsp
  };
};

exports.handler = async function(event, context) {
  try {
    const { today, firstDayOfMonth, isWeekend } = getDates();
    
    // Obtener todos los indicadores en paralelo
    const [uf, dolar, euro, utm] = await Promise.all([
      fetchDailyIndicator(SERIES_CODES.UF, today),
      fetchDailyIndicator(SERIES_CODES.DOLAR, today),
      fetchDailyIndicator(SERIES_CODES.EURO, today),
      fetchUTM(firstDayOfMonth)
    ]);

    const response = {
      _metadata: {
        timestamp: new Date().toISOString(),
        isWeekend,
        date: today,
        utmDate: firstDayOfMonth
      },
      UF: uf,
      DOLAR: dolar,
      EURO: euro,
      UTM: utm
    };

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=300',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify(response)
    };

  } catch (error) {
    console.error('Error in indicadores function:', error);
    
    return {
      statusCode: 200, // Mantenemos 200 para manejar el error en el cliente
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        error: true,
        message: error.message,
        timestamp: new Date().toISOString()
      })
    };
  }
};