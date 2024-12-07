// netlify/functions/indicadores.js
const SERIES_CODES = {
  UF: 'F073.UFF.PRE.Z.D',
  DOLAR: 'F073.TCO.PRE.Z.D',
  EURO: 'F072.CLP.EUR.N.O.D',
  UTM: 'F073.UTR.PRE.Z.M'
};

const API_BASE_URL = 'https://si3.bcentral.cl/SieteRestWS/SieteRestWS.ashx';

const getDateInfo = () => {
  const today = new Date();
  const isWeekend = today.getDay() === 0 || today.getDay() === 6;
  
  // Si es fin de semana, retroceder al viernes
  if (isWeekend) {
    today.setDate(today.getDate() - (today.getDay() === 0 ? 2 : 1));
  }
  
  const formatDate = (date) => {
    return date.toISOString().split('T')[0];
  };

  return {
    date: formatDate(today),
    isWeekend
  };
};

const fetchIndicator = async (code, date) => {
  const params = new URLSearchParams({
    user: process.env.BANCO_CENTRAL_API_USER,
    pass: process.env.BANCO_CENTRAL_API_PASS,
    firstdate: date,
    lastdate: date,
    timeseries: code,
    function: 'GetSeries'
  });

  const url = `${API_BASE_URL}?${params}`;
  
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (!data.Series?.Obs?.[0]) {
      throw new Error('No data available');
    }

    return {
      valor: parseFloat(data.Series.Obs[0].value),
      fecha: data.Series.Obs[0].indexDateString,
      descripcion: data.Series.descripEsp
    };
  } catch (error) {
    console.error(`Error fetching ${code}:`, error);
    throw error;
  }
};

exports.handler = async function(event, context) {
  try {
    const { date, isWeekend } = getDateInfo();
    
    const results = await Promise.all([
      fetchIndicator(SERIES_CODES.UF, date),
      fetchIndicator(SERIES_CODES.DOLAR, date),
      fetchIndicator(SERIES_CODES.EURO, date),
      fetchIndicator(SERIES_CODES.UTM, date)
    ]);

    const response = {
      UF: results[0],
      DOLAR: results[1],
      EURO: results[2],
      UTM: results[3],
      _metadata: {
        timestamp: new Date().toISOString(),
        isWeekend,
        date
      }
    };

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=300'
      },
      body: JSON.stringify(response)
    };

  } catch (error) {
    console.error('Error in indicadores function:', error);
    
    return {
      statusCode: 200, // Usar 200 incluso para errores
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        error: true,
        message: error.message,
        timestamp: new Date().toISOString()
      })
    };
  }
};