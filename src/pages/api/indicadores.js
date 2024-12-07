export async function GET() {
  try {
    const API_BASE_URL = 'https://si3.bcentral.cl/SieteRestWS/SieteRestWS.ashx';
    const API_USER = import.meta.env.BANCO_CENTRAL_API_USER;
    const API_PASS = import.meta.env.BANCO_CENTRAL_API_PASS;

    if (!API_USER || !API_PASS) {
      throw new Error('Credenciales no configuradas');
    }

    // Función para obtener fecha formateada
    const formatDate = (date) => date.toISOString().split('T')[0];

    // Función para obtener datos de un indicador
    const fetchIndicador = async (code, date) => {
      const params = new URLSearchParams({
        user: API_USER,
        pass: API_PASS,
        firstdate: formatDate(date),
        lastdate: formatDate(date),
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
      return null;
    };

    // Obtener fecha actual en Chile
    const now = new Date();
    const chileanNow = new Date(now.toLocaleString('en-US', { timeZone: 'America/Santiago' }));

    // Función específica para obtener UTM
    const fetchUTM = async () => {
      // Intentar obtener UTM del mes actual
      const firstDayOfMonth = new Date(chileanNow.getFullYear(), chileanNow.getMonth(), 1);
      let utmData = await fetchIndicador('F073.UTR.PRE.Z.M', firstDayOfMonth);

      if (!utmData) {
        // Si no hay datos del mes actual, obtener del mes anterior
        const firstDayOfLastMonth = new Date(chileanNow.getFullYear(), chileanNow.getMonth() - 1, 1);
        utmData = await fetchIndicador('F073.UTR.PRE.Z.M', firstDayOfLastMonth);
      }

      if (!utmData) {
        throw new Error('No se pudo obtener el valor de la UTM');
      }

      return utmData;
    };

    // Función para obtener último día hábil
    const getLastBusinessDay = (date) => {
      const d = new Date(date);
      while (d.getDay() === 0 || d.getDay() === 6) {
        d.setDate(d.getDate() - 1);
      }
      return d;
    };

    // Obtener los datos de todos los indicadores
    const [ufData, dolarData, euroData, utmData] = await Promise.all([
      // UF - usar fecha actual
      fetchIndicador('F073.UFF.PRE.Z.D', chileanNow),
      // Dólar - usar último día hábil si es necesario
      fetchIndicador('F073.TCO.PRE.Z.D', getLastBusinessDay(chileanNow)),
      // Euro - usar último día hábil si es necesario
      fetchIndicador('F072.CLP.EUR.N.O.D', getLastBusinessDay(chileanNow)),
      // UTM - lógica especial
      fetchUTM()
    ]);

    if (!ufData || !dolarData || !euroData || !utmData) {
      throw new Error('No se pudieron obtener todos los indicadores');
    }

    const indicators = {
      UF: ufData,
      DOLAR: dolarData,
      EURO: euroData,
      UTM: utmData
    };

    return new Response(
      JSON.stringify({
        ...indicators,
        _metadata: {
          currentDate: formatDate(chileanNow),
          timestamp: new Date().toISOString(),
          timezone: 'America/Santiago',
          currentMonth: chileanNow.getMonth() + 1
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