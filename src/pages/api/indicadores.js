// src/pages/api/indicadores.js

const SERIES_CODES = {
  UF: 'F073.UFF.PRE.Z.D',
  DOLAR: 'F073.TCO.PRE.Z.D',
  EURO: 'F072.CLP.EUR.N.O.D',
  UTM: 'F073.UTR.PRE.Z.M'
};

const API_BASE_URL = 'https://si3.bcentral.cl/SieteRestWS/SieteRestWS.ashx';

// Funciones de utilidad para fechas
const isWeekend = (date) => {
  const day = date.getDay();
  return day === 0 || day === 6;
};

const formatDateForAPI = (date) => {
  return date.toISOString().split('T')[0];
};

const formatDateForDisplay = (dateStr) => {
  const [year, month, day] = dateStr.split('-');
  return `${day}-${month}-${year}`;
};

const getPreviousBusinessDay = (date) => {
  const previousDay = new Date(date);
  previousDay.setDate(previousDay.getDate() - 1);
  
  while (isWeekend(previousDay)) {
    previousDay.setDate(previousDay.getDate() - 1);
  }
  
  return previousDay;
};

// Construir URL de la API con manejo de fechas
const buildApiUrl = (code, date) => {
  const params = new URLSearchParams({
    user: process.env.BANCO_CENTRAL_API_USER,
    pass: process.env.BANCO_CENTRAL_API_PASS,
    firstdate: formatDateForAPI(date),
    lastdate: formatDateForAPI(date),
    timeseries: code,
    function: 'GetSeries'
  });

  return `${API_BASE_URL}?${params}`;
};

// Función para obtener datos con reintentos
const fetchWithRetries = async (code, initialDate, maxAttempts = 5) => {
  let currentDate = new Date(initialDate);
  let attempts = 0;

  while (attempts < maxAttempts) {
    try {
      const response = await fetch(buildApiUrl(code, currentDate));
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.Series?.Obs?.length > 0) {
        const observation = data.Series.Obs[0];
        return {
          valor: parseFloat(observation.value),
          fecha: formatDateForAPI(currentDate),
          fechaStr: observation.indexDateString,
          descripcion: data.Series.descripEsp
        };
      }

      // Si no hay datos, probar con el día hábil anterior
      currentDate = getPreviousBusinessDay(currentDate);
      attempts++;
      
    } catch (error) {
      console.error(`Error fetching ${code} for date ${formatDateForAPI(currentDate)}:`, error);
      currentDate = getPreviousBusinessDay(currentDate);
      attempts++;
    }
  }

  throw new Error(`No se encontraron datos para ${code} después de ${maxAttempts} intentos`);
};

// Función específica para UTM (siempre primer día del mes)
const fetchUTM = async (date) => {
  const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
  
  try {
    const response = await fetch(buildApiUrl(SERIES_CODES.UTM, firstDayOfMonth));
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    if (data.Series?.Obs?.length > 0) {
      const observation = data.Series.Obs[0];
      return {
        valor: parseFloat(observation.value),
        fecha: formatDateForAPI(firstDayOfMonth),
        fechaStr: observation.indexDateString,
        descripcion: data.Series.descripEsp
      };
    }
    
    throw new Error('No hay datos de UTM disponibles');
    
  } catch (error) {
    console.error('Error fetching UTM:', error);
    throw error;
  }
};

export async function GET() {
  try {
    const today = new Date();
    
    // Si es fin de semana, usar el último día hábil
    const startDate = isWeekend(today) ? getPreviousBusinessDay(today) : today;

    // Obtener todos los indicadores en paralelo
    const [uf, dolar, euro, utm] = await Promise.all([
      fetchWithRetries(SERIES_CODES.UF, startDate),
      fetchWithRetries(SERIES_CODES.DOLAR, startDate),
      fetchWithRetries(SERIES_CODES.EURO, startDate),
      fetchUTM(startDate)
    ]);

    const response = {
      _metadata: {
        timestamp: new Date().toISOString(),
        currentDate: formatDateForAPI(today),
        isWeekend: isWeekend(today)
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
        'Cache-Control': 'public, max-age=300'
      }
    });

  } catch (error) {
    console.error('Error general en el endpoint:', error);
    
    return new Response(JSON.stringify({
      error: true,
      message: error.message,
      timestamp: new Date().toISOString()
    }), {
      status: 200, // Devolvemos 200 en lugar de 500 para manejar el error en el cliente
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}