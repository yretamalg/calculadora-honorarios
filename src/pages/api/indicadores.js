import fetch from 'node-fetch';

export async function GET() {
  try {
    const API_BASE_URL = 'https://si3.bcentral.cl/SieteRestWS/SieteRestWS.ashx';
    
    // Obtener fecha actual en Chile
    const today = new Date().toLocaleString('en-CA', {
      timeZone: 'America/Santiago',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    }).split(',')[0];

    // Series a consultar
    const series = [
      { code: 'F073.UFF.PRE.Z.D', key: 'UF' },
      { code: 'F073.TCO.PRE.Z.D', key: 'DOLAR' },
      { code: 'F072.CLP.EUR.N.O.D', key: 'EURO' },
      { code: 'F073.UTR.PRE.Z.M', key: 'UTM' }
    ];

    // Consultar cada serie
    const results = await Promise.all(
      series.map(async ({ code, key }) => {
        const params = new URLSearchParams({
          user: import.meta.env.BANCO_CENTRAL_API_USER,
          pass: import.meta.env.BANCO_CENTRAL_API_PASS,
          firstdate: today,
          lastdate: today,
          timeseries: code,
          function: 'GetSeries'
        });

        const response = await fetch(`${API_BASE_URL}?${params.toString()}`);
        if (!response.ok) {
          throw new Error(`Error al obtener ${key}`);
        }

        const data = await response.json();
        if (!data?.Series?.[0]?.Obs?.[0]) {
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

    // Construir objeto de respuesta
    const indicators = Object.fromEntries(results);

    return new Response(
      JSON.stringify(indicators),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache',
          'Access-Control-Allow-Origin': '*'
        }
      }
    );

  } catch (error) {
    console.error('API Error:', error);
    return new Response(
      JSON.stringify({
        error: 'Error al obtener indicadores',
        message: error.message
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      }
    );
  }
}