export const SERIES_CODES = {
    UF: 'F073.UFF.PRE.Z.D',    // UF diaria
    DOLAR: 'F073.TCO.PRE.Z.D', // Dólar observado
    EURO: 'F072.CLP.EUR.N.O.D', // Euro
    UTM: 'F073.UTR.PRE.Z.M'    // UTM mensual
  };
  
  export const CACHE_DURATION = 3600000; // 1 hora
  
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
  
  // Datos de ejemplo actualizados
  export const MOCK_DATA = {
    UF: {
      valor: 38367.21,
      fecha: new Date().toISOString()
    },
    DOLAR: {
      valor: 972.43,
      fecha: new Date().toISOString()
    },
    EURO: {
      valor: 1022.10,
      fecha: new Date().toISOString()
    },
    UTM: {
      valor: 64513,
      fecha: new Date().toISOString()
    }
  };