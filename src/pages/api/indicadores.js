export async function GET() {
  try {
    const API_BASE_URL = 'https://si3.bcentral.cl/SieteRestWS/SieteRestWS.ashx';
    const API_USER = import.meta.env.BANCO_CENTRAL_API_USER;
    const API_PASS = import.meta.env.BANCO_CENTRAL_API_PASS;

    if (!API_USER || !API_PASS) {
      throw new Error('Credenciales no configuradas');
    }

    // Función para obtener fecha en formato YYYY-MM-DD
    const formatDate = (date) => {
      return date.toISOString().split('T')[0];
    };

    // Función para retroceder días hasta encontrar datos válidos
    const fetchWithFallback = async (code, key, startDate, maxAttempts = 5) => {
      let attempts = 0;
      let currentDate = new Date(startDate);
      
      while (attempts < maxAttempts) {
        try {
          const dateStr = formatDate(currentDate);
          const params = new URLSearchParams({
            user: API_USER,
            pass: API_PASS,
            firstdate: dateStr,
            lastdate: dateStr,
            timeseries: code,
            function: 'GetSeries'
          });

          const response = await fetch(`${API_BASE_URL}?${params}`);
          const data = await response.json();

          if (data?.Series?.[0]?.Obs?.[0]) {
            return {
              valor: parseFloat(data.Series[0].Obs[0].value),
              fecha: data.Series[0].Obs[0].DateTime
            };
          }
        } catch (error) {
          console.warn(`Attempt ${attempts + 1} failed for ${key}`);
        }

        // Retroceder un día
        currentDate.setDate(currentDate.getDate() - 1);
        attempts++;
      }

      throw new Error(`No se encontraron datos para ${key} en los últimos ${maxAttempts} días`);
    };

    // Obtener fecha actual en Chile
    const now = new Date();
    const chileanNow = new Date(now.toLocaleString('en-US', { timeZone: 'America/Santiago' }));
    
    // Configurar los indicadores
    const indicators = {
      UF: {
        code: 'F073.UFF.PRE.Z.D',
        date: chileanNow,
        maxAttempts: 1 // UF debe ser del día actual
      },
      DOLAR: {
        code: 'F073.TCO.PRE.Z.D',
        date: chileanNow,
        maxAttempts: 5
      },
      EURO: {
        code: 'F072.CLP.EUR.N.O.D',
        date: chileanNow,
        maxAttempts: 5
      },
      UTM: {
        code: 'F073.UTR.PRE.Z.M',
        date: new Date(chileanNow.getFullYear(), chileanNow.getMonth(), 1),
        maxAttempts: 10
      }
    };

    // Obtener datos para cada indicador
    const results = await Promise.all(
      Object.entries(indicators).map(async ([key, config]) => {
        const data = await fetchWithFallback(
          config.code,
          key,
          config.date,
          config.maxAttempts
        );
        return [key, data];
      })
    );

    const indicatorsData = Object.fromEntries(results);

    return new Response(
      JSON.stringify({
        ...indicatorsData,
        _metadata: {
          currentDate: formatDate(chileanNow),
          timestamp: new Date().toISOString(),
          timezone: 'America/Santiago'
        }
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-store'
        }
      }
    );

  } catch (error) {
    console.error('API Error:', {
      message: error.message,
      stack: error.stack
    });

    return new Response(
      JSON.stringify({
        error: 'Error al obtener indicadores',
        message: error.message,
        timestamp: new Date().toISOString()
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  }
}