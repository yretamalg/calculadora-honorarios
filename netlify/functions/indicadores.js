// netlify/functions/indicadores.js

const SERIES_CODES = {
  UF: 'F073.UFF.PRE.Z.D',
  DOLAR: 'F073.TCO.PRE.Z.D',
  EURO: 'F072.CLP.EUR.N.O.D',
  UTM: 'F073.UTR.PRE.Z.M'
};

const API_BASE_URL = 'https://si3.bcentral.cl/SieteRestWS/SieteRestWS.ashx';

const formatDate = (date) => {
  return date.toISOString().split('T')[0];
};

const getLastBusinessDay = (date = new Date()) => {
  const previousDay = new Date(date);
  previousDay.setDate(previousDay.getDate() - 1);
  while (previousDay.getDay() === 0 || previousDay.getDay() === 6) {
    previousDay.setDate(previousDay.getDate() - 1);
  }
  return previousDay;
};

const buildApiUrl = (code, date) => {
  const params = new URLSearchParams({
    user: process.env.BANCO_CENTRAL_API_USER,
    pass: process.env.BANCO_CENTRAL_API_PASS,
    firstdate: date,
    lastdate: date,
    timeseries: code,
    function: 'GetSeries'
  });
  return `${API_BASE_URL}?${params}`;
};

const fetchIndicator = async (code, date) => {
  const response = await fetch(buildApiUrl(code, formatDate(date)));
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
};

const processIndicatorData = (data) => {
  if (!data.Series?.Obs?.[0]) {
    return null;
  }

  return {
    valor: parseFloat(data.Series.Obs[0].value),
    fecha: data.Series.Obs[0].indexDateString,
    descripcion: data.Series.descripEsp
  };
};

const getIndicatorWithRetry = async (code, initialDate, isBusinessDay = true) => {
  let currentDate = new Date(initialDate);
  let data = await fetchIndicator(code, currentDate);
  let processedData = processIndicatorData(data);

  // Si no hay datos y es un indicador que usa días hábiles, intentar con el último día hábil
  if (!processedData && isBusinessDay) {
    currentDate = getLastBusinessDay(currentDate);
    data = await fetchIndicator(code, currentDate);
    processedData = processIndicatorData(data);
  }

  return {
    ...data,
    processedData
  };
};

exports.handler = async function(event, context) {
  try {
    const today = new Date();
    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

    // Obtener todos los indicadores
    const [ufData, dolarData, euroData, utmData] = await Promise.all([
      getIndicatorWithRetry(SERIES_CODES.UF, today, false),
      getIndicatorWithRetry(SERIES_CODES.DOLAR, today, true),
      getIndicatorWithRetry(SERIES_CODES.EURO, today, true),
      getIndicatorWithRetry(SERIES_CODES.UTM, firstDayOfMonth, false)
    ]);

    const response = {
      _metadata: {
        timestamp: new Date().toISOString(),
        date: formatDate(today),
        isWeekend: today.getDay() === 0 || today.getDay() === 6
      },
      UF: {
        ...ufData,
        valor: ufData.processedData?.valor,
        fecha: ufData.processedData?.fecha
      },
      DOLAR: {
        ...dolarData,
        valor: dolarData.processedData?.valor,
        fecha: dolarData.processedData?.fecha
      },
      EURO: {
        ...euroData,
        valor: euroData.processedData?.valor,
        fecha: euroData.processedData?.fecha
      },
      UTM: {
        ...utmData,
        valor: utmData.processedData?.valor,
        fecha: utmData.processedData?.fecha
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
      statusCode: 200,
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