const fetch = require('node-fetch');

const handler = async (event, context) => {
  try {
    const API_BASE_URL = 'https://si3.bcentral.cl/SieteRestWS/SieteRestWS.ashx';
    const API_USER = process.env.BANCO_CENTRAL_API_USER;
    const API_PASS = process.env.BANCO_CENTRAL_API_PASS;

    if (!API_USER || !API_PASS) {
      throw new Error('Credenciales del Banco Central no configuradas');
    }

    // Obtener la fecha actual en Chile
    const now = new Date();
    const formatter = new Intl.DateTimeFormat('en-CA', { // formato YYYY-MM-DD
      timeZone: 'America/Santiago',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
    
    const today = formatter.format(now);

    // Series que queremos obtener
    const series = [
      { code: 'F073.UFF.PRE.Z.D', key: 'UF' },
      { code: 'F073.TCO.PRE.Z.D', key: 'DOLAR' },
      { code: 'F072.CLP.EUR.N.O.D', key: 'EURO' },
      { code: 'F073.UTR.PRE.Z.M', key: 'UTM' }
    ];

    const results = await Promise.all(
      series.map(async ({ code, key }) => {
        const params = new URLSearchParams({
          user: API_USER,
          pass: API_PASS,
          firstdate: today,
          lastdate: today,
          timeseries: code,
          function: 'GetSeries'
        });

        const response = await fetch(`${API_BASE_URL}?${params}`);
        
        if (!response.ok) {
          throw new Error(`Error al obtener ${key}: ${response.status}`);
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

    const indicators = Object.fromEntries(results);

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache'
      },
      body: JSON.stringify(indicators)
    };

  } catch (error) {
    console.error('Function error:', error);
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        error: 'Error al obtener indicadores',
        message: error.message
      })
    };
  }
};

module.exports = { handler };