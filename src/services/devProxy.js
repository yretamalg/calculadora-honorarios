import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';

const app = express();
app.use(cors());

const API_USER = process.env.BANCO_CENTRAL_API_USER;
const API_PASS = process.env.BANCO_CENTRAL_API_PASS;
const API_BASE_URL = 'https://si3.bcentral.cl/SieteRestWS/SieteRestWS.ashx';

const buildApiUrl = (timeseries) => {
  const today = new Date().toISOString().split('T')[0];
  
  const params = new URLSearchParams({
    user: API_USER,
    pass: API_PASS,
    firstdate: today,
    lastdate: today,
    timeseries,
    function: 'GetSeries'
  });

  return `${API_BASE_URL}?${params.toString()}`;
};

const SERIES_CODES = {
  UF: 'F073.UFF.PRE.Z.D',
  DOLAR: 'F073.TCO.PRE.Z.D',
  EURO: 'F072.CLP.EUR.N.O.D',
  UTM: 'F073.UTR.PRE.Z.M'
};

app.get('/api/indicadores', async (req, res) => {
  try {
    const promises = Object.entries(SERIES_CODES).map(async ([key, series]) => {
      const response = await fetch(buildApiUrl(series));
      const data = await response.json();
      return [key, data];
    });

    const results = await Promise.all(promises);
    const indicators = Object.fromEntries(results);

    res.json(indicators);
  } catch (error) {
    console.error('Error fetching indicators:', error);
    res.status(500).json({ error: 'Failed to fetch indicators' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Proxy server running on http://localhost:${PORT}`);
});