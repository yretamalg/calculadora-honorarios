const fetch = require('node-fetch');

// Variables de entorno
const API_USER = process.env.BANCO_CENTRAL_API_USER;
const API_PASS = process.env.BANCO_CENTRAL_API_PASS;
const API_BASE_URL = 'https://si3.bcentral.cl/SieteRestWS/SieteRestWS.ashx';

const buildApiUrl = (timeseries) => {
  // Obtener fecha actual en formato YYYY-MM-DD
  const today = new Date().toISOString().split('T')[0];
  
  const params = new URLSearchParams({
    user: API_USER,
    pass: API_PASS,
    firstdate: today,
    lastdate: today,
    timeseries,
    function: 'GetSeries'
  });

  return `${API_BASE_URL}?${params.toString()}`;
};

const SERIES_CODES = {
  UF: 'F073.UFF.PRE.Z.D',
  DOLAR: 'F073.TCO.PRE.Z.D',
  EURO: 'F072.CLP.EUR.N.O.D',
  UTM: 'F073.UTR.PRE.Z.M'
};

exports.handler = async (event) => {
  // Solo permitir GET requests
  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    // Hacer las llamadas en paralelo
    const promises = Object.entries(SERIES_CODES).map(async ([key, series]) => {
      const response = await fetch(buildApiUrl(series));
      const data = await response.json();
      return [key, data];
    });

    const results = await Promise.all(promises);
    const indicators = Object.fromEntries(results);

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        // Configura el Cache-Control para cachear por 1 hora
        'Cache-Control': 'public, max-age=3600'
      },
      body: JSON.stringify(indicators)
    };

  } catch (error) {
    console.error('Error fetching indicators:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch indicators' })
    };
  }
};