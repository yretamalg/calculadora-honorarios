export async function GET() {
  try {
    const API_BASE_URL = 'https://si3.bcentral.cl/SieteRestWS/SieteRestWS.ashx';
    const API_USER = import.meta.env.BANCO_CENTRAL_API_USER;
    const API_PASS = import.meta.env.BANCO_CENTRAL_API_PASS;

    if (!API_USER || !API_PASS) {
      throw new Error('Credenciales no configuradas');
    }

    // Fechas en zona horaria de Chile
    const now = new Date();
    const chileanDate = new Date(now.toLocaleString('en-US', { timeZone: 'America/Santiago' }));
    
    // Fecha actual para UF
    const today = chileanDate.toISOString().split('T')[0];
    
    // Último día hábil para divisas
    const getLastBusinessDay = (date) => {
      const d = new Date(date);
      while (d.getDay() === 0 || d.getDay() === 6) {
        d.setDate(d.getDate() - 1);
      }
      return d.toISOString().split('T')[0];
    };
    
    // Primer día del mes para UTM
    const firstDayOfMonth = new Date(
      chileanDate.getFullYear(),
      chileanDate.getMonth(),
      1
    ).toISOString().split('T')[0];

    const lastBusinessDay = getLastBusinessDay(chileanDate);

    // Configurar las series con sus fechas correspondientes
    const series = [
      { 
        code: 'F073.UFF.PRE.Z.D', 
        key: 'UF',
        date: today,
        isDaily: true
      },
      { 
        code: 'F073.TCO.PRE.Z.D', 
        key: 'DOLAR',
        date: lastBusinessDay,
        isDaily: true
      },
      { 
        code: 'F072.CLP.EUR.N.O.D', 
        key: 'EURO',
        date: lastBusinessDay,
        isDaily: true
      },
      { 
        code: 'F073.UTR.PRE.Z.M', 
        key: 'UTM',
        date: firstDayOfMonth,
        isDaily: false
      }
    ];

    // Obtener datos para cada serie
    const results = await Promise.all(
      series.map(async ({ code, key, date, isDaily }) => {
        const params = new URLSearchParams({
          user: API_USER,
          pass: API_PASS,
          firstdate: date,
          lastdate: date,
          timeseries: code,
          function: 'GetSeries'
        });

        console.log(`Fetching ${key} for date:`, date);

        const response = await fetch(`${API_BASE_URL}?${params}`);
        
        if (!response.ok) {
          console.error(`Error fetching ${key}:`, await response.text());
          throw new Error(`Error al obtener ${key}`);
        }

        const data = await response.json();

        if (!data?.Series?.[0]?.Obs?.[0]) {
          console.error(`No data for ${key}:`, data);
          throw new Error(`No hay datos disponibles para ${key}`);
        }

        return [
          key,
          {
            valor: parseFloat(data.Series[0].Obs[0].value),
            fecha: data.Series[0].Obs[0].DateTime,
            isDaily
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
          firstDayOfMonth,
          isBusinessDay: ![0, 6].includes(chileanDate.getDay())
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