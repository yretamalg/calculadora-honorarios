import fetch from 'node-fetch';

export const handler = async (event, context) => {
  // Configurar CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET',
    'Content-Type': 'application/json'
  };

  // Manejar OPTIONS para CORS
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers
    };
  }

  try {
    // Verificar credenciales
    if (!process.env.BANCO_CENTRAL_API_USER || !process.env.BANCO_CENTRAL_API_PASS) {
      throw new Error('Credenciales de API no configuradas');
    }

    const API_BASE_URL = 'https://si3.bcentral.cl/SieteRestWS/SieteRestWS.ashx';
    
    // Obtener fecha actual en zona horaria de Chile
    const today = new Date().toLocaleString('en-CA', {
      timeZone: 'America/Santiago',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    }).split(',')[0];

    // Definir las series a consultar
    const indicators = [
      {
        code: 'F073.UFF.PRE.Z.D',
        key: 'UF',
        required: true
      },
      {
        code: 'F073.TCO.PRE.Z.D',
        key: 'DOLAR',
        required: true
      },
      {
        code: 'F072.CLP.EUR.N.O.D',
        key: 'EURO',
        required: true
      },
      {
        code: 'F073.UTR.PRE.Z.M',
        key: 'UTM',
        required: true
      }
    ];

    // Obtener datos para cada indicador
    const results = await Promise.all(
      indicators.map(async ({ code, key }) => {
        const params = new URLSearchParams({
          user: process.env.BANCO_CENTRAL_API_USER,
          pass: process.env.BANCO_CENTRAL_API_PASS,
          firstdate: today,
          lastdate: today,
          timeseries: code,
          function: 'GetSeries'
        });

        const url = `${API_BASE_URL}?${params}`;
        const response = await fetch(url);
        
        if (!response.ok) {
          console.error(`Error fetching ${key}:`, await response.text());
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

    const indicatorsData = Object.fromEntries(results);

    return {
      statusCode: 200,
      headers: {
        ...headers,
        'Cache-Control': 'no-cache'
      },
      body: JSON.stringify(indicatorsData)
    };

  } catch (error) {
    console.error('Function error:', error);
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: 'Error al obtener indicadores',
        message: error.message,
        timestamp: new Date().toISOString()
      })
    };
  }
};