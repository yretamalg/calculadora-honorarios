export const SERIES_CODES = {
    UF: 'F073.UFF.PRE.Z.D',    // UF diaria
    DOLAR: 'F073.TCO.PRE.Z.D', // Dólar observado
    EURO: 'F072.CLP.EUR.N.O.D', // Euro
    UTM: 'F073.UTR.PRE.Z.M'    // UTM mensual
  };
  
  // Tiempo de caché en milisegundos (1 hora)
  export const CACHE_DURATION = 3600000;
  
  // Configuración para el formateo de los indicadores
  export const INDICATOR_FORMAT = {
    UF: {
      decimals: 2,
      prefix: '$'
    },
    DOLAR: {
      decimals: 2,
      prefix: '$'
    },
    EURO: {
      decimals: 2,
      prefix: '€'
    },
    UTM: {
      decimals: 0,
      prefix: '$'
    }
  };
  
  // Datos de ejemplo para desarrollo
  export const MOCK_DATA = {
    UF: {
      valor: 35864.21,
      fecha: new Date().toISOString()
    },
    DOLAR: {
      valor: 968.32,
      fecha: new Date().toISOString()
    },
    EURO: {
      valor: 1042.15,
      fecha: new Date().toISOString()
    },
    UTM: {
      valor: 64513,
      fecha: new Date().toISOString()
    }
  };