// src/pages/api/indicadores.js

const SERIES_CODES = {
  UF: 'F073.UFF.PRE.Z.D',
  DOLAR: 'F073.TCO.PRE.Z.D',
  EURO: 'F072.CLP.EUR.N.O.D',
  UTM: 'F073.UTR.PRE.Z.M'
};

const API_BASE_URL = 'https://si3.bcentral.cl/SieteRestWS/SieteRestWS.ashx';

// Utilidad para obtener fechas
const getDates = () => {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  const formatDate = (date) => {
    return date.toISOString().split('T')[0];
  };

  return {
    today: formatDate(today),
    yesterday: formatDate(yesterday)
  };
};

// Construir URL de la API
const buildApiUrl = (timeseries, date) => {
  const params = new URLSearchParams({
    user: process.env.BANCO_CENTRAL_API_USER,
    pass: process.env.BANCO_CENTRAL_API_PASS,
    firstdate: date,
    lastdate: date,
    timeseries: timeseries,
    function: 'GetSeries'
  });

  return `${API_BASE_URL}?${params}`;
};

// Obtener datos de un indicador específico
const fetchIndicator = async (code, date) => {
  try {
    const response = await fetch(buildApiUrl(code, date));
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Verificar si hay datos
    if (data.Series?.Obs?.length > 0) {
      const observation = data.Series.Obs[0];
      return {
        valor: parseFloat(observation.value),
        fecha: observation.indexDateString,
        descripcion: data.Series.descripEsp
      };
    }
    
    return null;
  } catch (error) {
    console.error(`Error fetching ${code}:`, error);
    return null;
  }
};

// Función específica para indicadores que requieren día hábil
const fetchWithBusinessDay = async (code) => {
  const { today, yesterday } = getDates();
  
  // Intentar con la fecha actual
  const currentData = await fetchIndicator(code, today);
  if (currentData) {
    return currentData;
  }
  
  // Si no hay datos, intentar con el día anterior
  const yesterdayData = await fetchIndicator(code, yesterday);
  if (yesterdayData) {
    return yesterdayData;
  }
  
  return null;
};

export async function GET() {
  try {
    const dates = getDates();
    
    // Obtener datos en paralelo
    const [ufData, utmData, dolarData, euroData] = await Promise.all([
      // UF siempre usa fecha actual
      fetchIndicator(SERIES_CODES.UF, dates.today),
      // UTM siempre usa fecha actual
      fetchIndicator(SERIES_CODES.UTM, dates.today),
      // Dólar puede requerir día hábil anterior
      fetchWithBusinessDay(SERIES_CODES.DOLAR),
      // Euro puede requerir día hábil anterior
      fetchWithBusinessDay(SERIES_CODES.EURO)
    ]);

    // Verificar si tenemos todos los datos necesarios
    if (!ufData || !utmData || !dolarData || !euroData) {
      throw new Error('No se pudieron obtener todos los indicadores');
    }

    const response = {
      UF: ufData,
      UTM: utmData,
      DOLAR: dolarData,
      EURO: euroData,
      _metadata: {
        lastUpdate: new Date().toISOString(),
        date: dates.today
      }
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
    
    return new Response(JSON.stringify({
      error: 'Error al obtener los indicadores',
      message: error.message
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}