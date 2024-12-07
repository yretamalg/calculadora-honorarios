export async function GET() {
  try {
    const API_BASE_URL = 'https://si3.bcentral.cl/SieteRestWS/SieteRestWS.ashx';
    
    // Variables de entorno
    const API_USER = import.meta.env.BANCO_CENTRAL_API_USER;
    const API_PASS = import.meta.env.BANCO_CENTRAL_API_PASS;

    if (!API_USER || !API_PASS) {
      throw new Error('Credenciales no configuradas');
    }

    // Fecha actual en Chile
    const today = new Date().toLocaleString('en-CA', { 
      timeZone: 'America/Santiago' 
    }).split(',')[0];

    console.log('Fetching UF for date:', today);

    // Primero intentar obtener solo la UF
    const params = new URLSearchParams({
      user: API_USER,
      pass: API_PASS,
      firstdate: today,
      lastdate: today,
      timeseries: 'F073.UFF.PRE.Z.D',
      function: 'GetSeries'
    });

    const response = await fetch(`${API_BASE_URL}?${params}`);
    const text = await response.text();
    console.log('API Response:', text);

    if (!response.ok) {
      throw new Error(`API responded with status ${response.status}`);
    }

    let data;
    try {
      data = JSON.parse(text);
    } catch (e) {
      console.error('JSON Parse Error:', e);
      throw new Error('Invalid JSON response from API');
    }

    if (!data?.Series?.[0]?.Obs?.[0]) {
      throw new Error('No data available in API response');
    }

    // Por ahora solo devolver la UF para debugging
    const indicators = {
      UF: {
        valor: parseFloat(data.Series[0].Obs[0].value),
        fecha: data.Series[0].Obs[0].DateTime
      }
    };

    return new Response(JSON.stringify(indicators), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store'
      }
    });

  } catch (error) {
    console.error('Detailed API Error:', {
      message: error.message,
      stack: error.stack,
      env: {
        hasUser: !!import.meta.env.BANCO_CENTRAL_API_USER,
        hasPass: !!import.meta.env.BANCO_CENTRAL_API_PASS
      }
    });

    return new Response(
      JSON.stringify({
        error: 'Error al obtener indicadores',
        details: error.message,
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