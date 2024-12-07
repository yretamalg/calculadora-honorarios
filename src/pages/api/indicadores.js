export async function GET() {
  try {
    const API_BASE_URL = 'https://si3.bcentral.cl/SieteRestWS/SieteRestWS.ashx';
    const API_USER = import.meta.env.BANCO_CENTRAL_API_USER;
    const API_PASS = import.meta.env.BANCO_CENTRAL_API_PASS;

    if (!API_USER || !API_PASS) {
      throw new Error('Credenciales no configuradas');
    }

    // Obtener fecha actual en Chile
    const now = new Date();
    const today = now.toLocaleString('en-CA', { 
      timeZone: 'America/Santiago' 
    }).split(',')[0];

    // Obtener último día hábil
    const getLastBusinessDay = (date) => {
      const d = new Date(date);
      d.setHours(0, 0, 0, 0);
      
      while (d.getDay() === 0 || d.getDay() === 6) {
        d.setDate(d.getDate() - 1);
      }
      
      return d.toLocaleString('en-CA', { timeZone: 'America/Santiago' }).split(',')[0];
    };

    const lastBusinessDay = getLastBusinessDay(now);

    // Configurar las series con sus fechas correspondientes
    const series = [
      { 
        code: 'F073.UFF.PRE.Z.D', 
        key: 'UF',
        date: today  // UF siempre usa la fecha actual
      },
      { 
        code: 'F073.TCO.PRE.Z.D', 
        key: 'DOLAR',
        date: lastBusinessDay  // Dólar usa último día hábil
      },
      { 
        code: 'F072.CLP.EUR.N.O.D', 
        key: 'EURO',
        date: lastBusinessDay  // Euro usa último día hábil
      },
      { 
        code: 'F073.UTR.PRE.Z.M', 
        key: 'UTM',
        date: today  // UTM siempre usa la fecha actual
      }
    ];

    // Obtener datos para cada serie
    const results = await Promise.all(
      series.map(async ({ code, key, date }) => {
        const params = new URLSearchParams({
          user: API_USER,
          pass: API_PASS,
          firstdate: date,
          lastdate: date,
          timeseries: code,
          function: 'GetSeries'
        });

        const response = await fetch(`${API_BASE_URL}?${params}`);
        const data = await response.json();

        if (!response.ok || !data?.Series?.[0]?.Obs?.[0]) {
          throw new Error(`No hay datos disponibles para ${key}`);
        }

        return [
          key,
          {
            valor: parseFloat(data.Series[0].Obs[0].value),
            fecha: data.Series[0].Obs[0].DateTime
          }
        ];
      })
    );

    const indicators = Object.fromEntries(results);

    return new Response(
      JSON.stringify({
        ...indicators,
        _metadata: {
          currentDate: today,
          lastBusinessDay,
          isBusinessDay: !['0', '6'].includes(new Date().getDay().toString())
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
    console.error('API Error:', error);
    
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