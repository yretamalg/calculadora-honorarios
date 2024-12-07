export async function GET({ request }) {
  try {
    const API_BASE_URL = 'https://si3.bcentral.cl/SieteRestWS/SieteRestWS.ashx';
    const API_USER = import.meta.env.BANCO_CENTRAL_API_USER;
    const API_PASS = import.meta.env.BANCO_CENTRAL_API_PASS;

    // Obtener solo la fecha de hoy
    const today = new Date();
    const formattedToday = today.toISOString().split('T')[0];

    // Verificar si estamos en un día hábil
    const isWeekend = today.getDay() === 0 || today.getDay() === 6;
    
    if (isWeekend) {
      return new Response(JSON.stringify({
        error: 'No hay datos disponibles en días no hábiles'
      }), {
        status: 503,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }

    const series = [
      { code: 'F073.UFF.PRE.Z.D', key: 'UF' },      // UF diaria
      { code: 'F073.TCO.PRE.Z.D', key: 'DOLAR' },   // Dólar observado
      { code: 'F072.CLP.EUR.N.O.D', key: 'EURO' },  // Euro
      { code: 'F073.UTR.PRE.Z.M', key: 'UTM' }      // UTM mensual
    ];

    const results = await Promise.all(
      series.map(async ({ code, key }) => {
        const params = new URLSearchParams({
          user: API_USER,
          pass: API_PASS,
          firstdate: formattedToday,
          lastdate: formattedToday,
          timeseries: code,
          function: 'GetSeries'
        });

        const url = `${API_BASE_URL}?${params}`;
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`No hay datos disponibles para ${key} hoy`);
        }

        const data = await response.json();
        
        if (!data?.Series?.[0]?.Obs?.[0]) {
          throw new Error(`No hay datos disponibles para ${key} hoy`);
        }

        const fecha = new Date(data.Series[0].Obs[0].DateTime);
        // Verificar que el dato sea de hoy
        if (fecha.toISOString().split('T')[0] !== formattedToday) {
          throw new Error(`Los datos de ${key} no están actualizados para hoy`);
        }

        return [
          key,
          {
            valor: parseFloat(data.Series[0].Obs[0].value),
            fecha: data.Series[0].Obs[0].DateTime
          }
        ];
      })
    ).catch(error => {
      throw new Error(`Error obteniendo indicadores: ${error.message}`);
    });

    const indicators = Object.fromEntries(results);

    return new Response(JSON.stringify(indicators), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store' // Deshabilitar caché para siempre obtener datos frescos
      }
    });

  } catch (error) {
    console.error('API Error:', error);
    
    return new Response(
      JSON.stringify({
        error: 'Datos no disponibles para hoy',
        details: error.message
      }),
      {
        status: 503,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  }
}