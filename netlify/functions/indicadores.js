// netlify/functions/indicadores.js

const SERIES_CODES = {
  UF: 'F073.UFF.PRE.Z.D',
  DOLAR: 'F073.TCO.PRE.Z.D',
  EURO: 'F072.CLP.EUR.N.O.D',
  UTM: 'F073.UTR.PRE.Z.M'
};

const API_BASE_URL = 'https://si3.bcentral.cl/SieteRestWS/SieteRestWS.ashx';
const TIMEOUT_MS = 8000; // 8 segundos de timeout

// Función para implementar timeout en fetch
const fetchWithTimeout = async (url, options = {}) => {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal
    });
    clearTimeout(timeout);
    return response;
  } catch (error) {
    clearTimeout(timeout);
    throw error;
  }
};

const getLastBusinessDay = (date = new Date()) => {
  const previousDay = new Date(date);
  previousDay.setDate(previousDay.getDate() - 1);
  
  while (previousDay.getDay() === 0 || previousDay.getDay() === 6) {
    previousDay.setDate(previousDay.getDate() - 1);
  }
  
  return previousDay;
};

const formatDate = (date) => {
  return date.toISOString().split('T')[0];
};

// Función con reintentos
const fetchWithRetry = async (url, retries = 3) => {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetchWithTimeout(url);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Validación básica de la estructura de datos
      if (!data || !data.Series || !Array.isArray(data.Series.Obs)) {
        throw new Error('Invalid data structure from API');
      }
      
      return data;
    } catch (error) {
      if (i === retries - 1) throw error; // Si es el último intento, propaga el error
      await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1))); // Espera exponencial
    }
  }
};

const getIndicatorWithRetry = async (code, initialDate, usePreviousDay = true) => {
  let currentDate = new Date(initialDate);
  let error = null;
  let data = null;

  try {
    const params = new URLSearchParams({
      user: process.env.BANCO_CENTRAL_API_USER,
      pass: process.env.BANCO_CENTRAL_API_PASS,
      firstdate: formatDate(currentDate),
      lastdate: formatDate(currentDate),
      timeseries: code,
      function: 'GetSeries'
    });

    data = await fetchWithRetry(`${API_BASE_URL}?${params}`);

    // Si no hay datos y es un indicador que usa días hábiles, intentar con el último día hábil
    if ((!data?.Series?.Obs?.[0]?.value) && usePreviousDay) {
      currentDate = getLastBusinessDay(currentDate);
      params.set('firstdate', formatDate(currentDate));
      params.set('lastdate', formatDate(currentDate));
      data = await fetchWithRetry(`${API_BASE_URL}?${params}`);
    }

    return {
      valor: data?.Series?.Obs?.[0]?.value ? parseFloat(data.Series.Obs[0].value) : null,
      fecha: data?.Series?.Obs?.[0]?.indexDateString || null,
      descripcion: data?.Series?.descripEsp || null,
      error: null
    };

  } catch (err) {
    console.error(`Error fetching ${code}:`, err);
    return {
      valor: null,
      fecha: null,
      descripcion: null,
      error: err.message
    };
  }
};

exports.handler = async function(event, context) {
  try {
    // Validar credenciales
    if (!process.env.BANCO_CENTRAL_API_USER || !process.env.BANCO_CENTRAL_API_PASS) {
      throw new Error('API credentials not configured');
    }

    const today = new Date();
    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

    // Obtener todos los indicadores
    const [ufData, dolarData, euroData, utmData] = await Promise.all([
      getIndicatorWithRetry(SERIES_CODES.UF, today, false),
      getIndicatorWithRetry(SERIES_CODES.DOLAR, today, true),
      getIndicatorWithRetry(SERIES_CODES.EURO, today, true),
      getIndicatorWithRetry(SERIES_CODES.UTM, firstDayOfMonth, false)
    ]);

    // Verificar si todos los indicadores fallaron
    const allFailed = [ufData, dolarData, euroData, utmData]
      .every(data => data.error !== null);

    if (allFailed) {
      throw new Error('Failed to fetch all indicators');
    }

    const response = {
      _metadata: {
        timestamp: new Date().toISOString(),
        date: formatDate(today),
        isWeekend: today.getDay() === 0 || today.getDay() === 6,
        hasErrors: [ufData, dolarData, euroData, utmData]
          .some(data => data.error !== null)
      },
      UF: ufData,
      DOLAR: dolarData,
      EURO: euroData,
      UTM: utmData
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
    
    // Enviar respuesta con error pero manteniendo la estructura
    return {
      statusCode: 200, // Mantenemos 200 para manejar el error en el cliente
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        _metadata: {
          timestamp: new Date().toISOString(),
          error: true,
          errorMessage: error.message
        },
        UF: { valor: null, fecha: null, error: 'Service unavailable' },
        DOLAR: { valor: null, fecha: null, error: 'Service unavailable' },
        EURO: { valor: null, fecha: null, error: 'Service unavailable' },
        UTM: { valor: null, fecha: null, error: 'Service unavailable' }
      })
    };
  }
};